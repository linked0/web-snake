import { getDB } from './db';
import { RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } from './config';
import ethers from 'ethers';
import { JsonRpcProvider, Contract } from "ethers";
import MyToken from "./abis/MyToken.json";

const provider = new JsonRpcProvider(RPC_URL);

if (!CONTRACT_ADDRESS) {
  throw new Error("Missing CONTRACT_ADDRESS!");
}

const contract = new Contract(CONTRACT_ADDRESS, MyToken.abi, provider);

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
    const signer = new ethers.Wallet(PRIVATE_KEY as string);
    const fromAddress = signer.address;

    // nonce
    let currentNonce = await provider.getTransactionCount(fromAddress, "pending");

    // 여러 건을 병렬 처리 (nonce 충돌 주의. 여기서는 간단히 하나씩 +1)
    const promiseList = pending.map(async (item, idx) => {
      const userAddr = item.userAddress;
      const nonce = currentNonce + idx;

      // 3) Prepare tx data
      //    (a) encode mint function call
      const txData = contract.interface.encodeFunctionData("mint", [userAddr]);

      //    (b) fetch gas price
      const feeData = await provider.getFeeData();

      // In Ethers v6, feeData.gasPrice can be a bigint or null
      if (!feeData.gasPrice) {
        throw new Error("No gasPrice returned by getFeeData(). Possibly an EIP-1559 network?");
      }

      //    (c) estimate gas for the mint call
      const gasLimit = await contract.mint.estimateGas(userAddr);

      // 4) Create raw transaction object
      //    Notice Ethers typically uses `gasLimit` instead of `gas`
      const rawTx = {
        from: fromAddress,
        to: CONTRACT_ADDRESS,
        data: txData,
        gasLimit,
        gasPrice: feeData.gasPrice,
        nonce,
        // Optionally specify chainId, value, etc., if needed
        // chainId: 1,
        // value: 0,
      };

      // 5) Send the transaction (if you want to actually execute it)
      //    Or sign it first, depending on your needs.
      //    a) Direct send
      const txResponse = await signer.sendTransaction(rawTx);

      //    b) Wait for it to be mined (optional)
      const txReceipt = await txResponse.wait();
      if (txReceipt) {
        console.log(`Mint tx mined in block ${txReceipt.blockNumber}`);
      } else {
        console.error('Transaction receipt is null');
      }

      // DB에 결과 반영
      await db.run(
        `UPDATE mint_requests
         SET txHash = ?, status = 'SUCCESS'
         WHERE id = ?`,
        [txResponse.hash, item.id]
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
