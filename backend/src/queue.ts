import Web3 from 'web3';
import { getDB } from './db';
import { RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } from './config';
import { AbiItem } from 'web3-utils';
import MyToken from './abis/MyToken.json';

const filteredAbi = MyToken.abi.filter(
  (item: any) => item.type === 'function' || item.type === 'event'
) as AbiItem[];

const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL as string));
const contract = new web3.eth.Contract(filteredAbi, CONTRACT_ADDRESS);

export async function processPendingRequests() {
  try {
    const db = await getDB();

    // PENDING 상태인 요청 전부 조회(실무에서는 한번에 너무 많이 가져오지 않도록 주의)
    const pending = await db.all(`
      SELECT id, userAddress
      FROM mint_requests
      WHERE status = 'PENDING'
      ORDER BY createdAt ASC
    `);

    if (!pending || pending.length === 0) return;

    // 민팅에 사용할 계정(Web3에 key 추가)
    const signer = web3.eth.accounts.wallet.add(PRIVATE_KEY as string);
    const fromAddress = signer.address;

    // nonce
    let currentNonce = await web3.eth.getTransactionCount(fromAddress, 'pending');

    // 여러 건을 병렬 처리 (nonce 충돌 주의. 여기서는 간단히 하나씩 +1)
    const promiseList = pending.map(async (item, idx) => {
      const userAddr = item.userAddress;
      const nonce = currentNonce + idx;

      // 트랜잭션 데이터 구성
      const txData = contract.methods.mint(userAddr).encodeABI();
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await contract.methods.mint(userAddr).estimateGas({ from: fromAddress });

      const rawTx = {
        from: fromAddress,
        to: CONTRACT_ADDRESS,
        data: txData,
        gas: gasLimit,
        gasPrice,
        nonce
      };

      // 서명 후 전송
      const signedTx = await web3.eth.accounts.signTransaction(rawTx, PRIVATE_KEY as string);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);

      // DB에 결과 반영
      await db.run(
        `UPDATE mint_requests
         SET txHash = ?, status = 'SUCCESS'
         WHERE id = ?`,
        [receipt.transactionHash, item.id]
      );
    });

    // 병렬 전송
    await Promise.all(promiseList);

  } catch (error) {
    console.error('Error in processPendingRequests:', error);
    // 에러 상황에 대한 재시도 로직 등을 추가 구현 가능
  }
}

/**
 * 주기적으로 processPendingRequests를 실행하는 함수
 */
export function startQueue() {
  // 예시: 5초마다 한번씩 PENDING 처리
  setInterval(processPendingRequests, 5000);
}
