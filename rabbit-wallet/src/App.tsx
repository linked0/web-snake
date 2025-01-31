import React, { useState } from "react";
import Web3 from "web3";
import "./App.css";
import { etherAddressShortener } from "./utils";
import {
  infuriaNetworks,
  infuriaKey,
  ethereumMainnetContractAddress,
  contractABI,
  minABI,
} from "./config";
import cogoToast from "cogo-toast";
import {
  HeaderComponent,
  PrivateKeyInputComponent,
  BalanceSectionComponent,
  CustomTokenComponent,
  AddTokenModal,
  SendTokenModal,
} from "./components";
// @ts-ignore - for the ethereumjs-tx sake need to ignore ts on line 2 global.buffer
global.Buffer = global.Buffer || require("buffer").Buffer;
const Tx = require("ethereumjs-tx").Transaction;

const App: React.FC = (props) => {
  const [defaultAccount, setDefaultAccount] = useState("");
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [customTokenSymbol, setCustomTokenSymbol] = useState("");
  const [userBalance, setUserBalance] = useState<number | string>();
  const [privateKeyInputValue, setPrivateKeyInputValue] = useState("");
  const [showAddTokenModal, setShowAddTokenModal] = useState(false);
  const [showTokenSendModal, setShowTokenSendModal] = useState(false);
  const [reciepientAddress, setReciepientAddress] = useState("");
  const [transferTokenAddress, setTransferTokenAddress] = useState(
    ethereumMainnetContractAddress
  );
  const [transferAmount, setTransferAmount] = useState("");
  const [rpc, setRpc] = useState<string>("mainnet");
  const [isSending, setIsSending] = useState(false);
  const [networkAddress, setNetworkAddress] = useState<string>(
    `http://localhost:8545`
  );
  const provider = new Web3.providers.HttpProvider(networkAddress);
  const web3 = new Web3(provider);
  const [customToken, setCustomToken] = useState<any>([
    {
      address: "",
      symbol: "",
      ownerAddress: "",
      balance: 0,
    },
  ]);

  const connectwalletHandler = async (rpc: string): Promise<any> => {
    const updatedNetworkAddress = `http://localhost:8545`;
    setNetworkAddress(updatedNetworkAddress);
    setUserBalance("...");
    const provider = new Web3.providers.HttpProvider(updatedNetworkAddress);
    const web3 = new Web3(provider);
    try {
      const wallet = await web3.eth.accounts.privateKeyToAccount(
        privateKeyInputValue
      );
      setDefaultAccount(wallet.address);
      await getBalance(wallet.address, updatedNetworkAddress);
      // getCustomTokenBalance(wallet.address);
    } catch (e) {
      await cogoToast.error("Private key must be 33 bytes long");
    }
  };
  const getBalance = async (
    wallet: string,
    networkadd: string
  ): Promise<any> => {
    // reinitalised web3 to make sure the network ID is updated/rendered properly
    const provider = new Web3.providers.HttpProvider(networkadd);
    const web3 = new Web3(provider);
    await web3.eth.getBalance(wallet, function (error, wei) {
      if (!error) {
        const balance = web3.utils.fromWei(wei, "ether");
        setUserBalance(balance);
      }
    });
  };
  const addCustomToken = async (
    address: string,
    symbol: string,
    ownerAddress: string
  ): Promise<any> => {
    try {
      const balance = await getCustomTokenBalance(ownerAddress, address);
      const newCustomToken = [
        ...customToken,
        { address, symbol, ownerAddress, balance },
      ];
      setCustomToken(newCustomToken);
    } catch (e) {
      const errorMessage = `The Token Address ${address} ${symbol} is not on the ${rpc} network. Make sure the Token is supported by the ${rpc} network before adding`;
      await cogoToast.error(errorMessage, { hideAfter: 5 });
    }
  };
  const removeCustomToken = (index: any): void => {
    const newCustomToken = [...customToken];
    newCustomToken.splice(index, 1);
    setCustomToken(newCustomToken);
  };
  const getCustomTokenBalance = async (
    wallet: string,
    tokenContractAddress: string
  ): Promise<any> => {
    const tokenAddress = tokenContractAddress;
    const walletAddress = wallet;
    const contract = new web3.eth.Contract(minABI, tokenAddress);
    const result = await contract.methods.balanceOf(walletAddress).call();
    const format = await web3.utils.fromWei(result);
    return `${format}`;
  };
  const sendToken = async (
    tokenaddress: string,
    recipient: string,
    amountToken: string
  ) => {
    const tokenAddress = tokenaddress;
    const toAddress = recipient;
    // Use BigNumber
    const amount = web3.utils.toBN(parseInt(amountToken));
    const contract = new web3.eth.Contract(contractABI, tokenAddress, {
      from: defaultAccount,
    });
    await web3.eth.getTransactionCount(defaultAccount).then((count) => {
      const rawTransaction = {
        from: defaultAccount,
        gasPrice: web3.utils.toHex(20 * 1e9),
        gasLimit: web3.utils.toHex(210000),
        to: tokenAddress,
        value: 0x0,
        data: contract.methods.transfer(toAddress, amount).encodeABI(),
        nonce: web3.utils.toHex(count),
      };
      console.log(rawTransaction);
      const transaction = new Tx(rawTransaction, { chain: rpc });
      const privateKeyBuffer = Buffer.from(privateKeyInputValue, "hex");
      transaction.sign(privateKeyBuffer);
      web3.eth
        .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
        .on("transactionHash", (hashtx) => {
          cogoToast.success(`Transaction hash ${hashtx}`, { hideAfter: 5 });
          setIsSending(false);
        })
        .on("error", (Error) => {
          cogoToast.error(Error.message, { hideAfter: 5 });
          setIsSending(false);
        });
    });
  };
  const getTransactionHistory = (oXaddress: string) => {
    window.open(`https://etherscan.io/address/${oXaddress}`, "_blank");
    // for transactions to large blocksize, simply redirect to explorer.
    // Large block size issues.
    /*web3.eth
      .getPastLogs({ fromBlock: "0x0", toBlock: "latest", address: oXaddress })
      .then((res) => {
        res.forEach((rec) => {});
      })
      .catch((err) => {});
    */
  };

  return (
    <div className="App">
      <HeaderComponent
        setDefaultAccount={setDefaultAccount}
        setRpc={setRpc}
        connectwalletHandler={connectwalletHandler}
        infuriaNetworks={infuriaNetworks}
      />
      {defaultAccount === "" && (
        <PrivateKeyInputComponent
          setPrivateKeyInputValue={setPrivateKeyInputValue}
          connectwalletHandler={connectwalletHandler}
          rpc={rpc}
        />
      )}

      {defaultAccount !== "" && (
        <>
          <BalanceSectionComponent
            etherAddressShortener={etherAddressShortener}
            userBalance={userBalance}
            defaultAccount={defaultAccount}
            setShowTokenSendModal={setShowTokenSendModal}
            getTransactionHistory={getTransactionHistory}
          />

          <CustomTokenComponent
            customToken={customToken}
            removeCustomToken={removeCustomToken}
            setShowAddTokenModal={setShowAddTokenModal}
            defaultAccount={defaultAccount}
          />
        </>
      )}

      {showAddTokenModal && (
        <AddTokenModal
          setCustomTokenSymbol={setCustomTokenSymbol}
          setNewTokenAddress={setNewTokenAddress}
          setShowAddTokenModal={setShowAddTokenModal}
          addCustomToken={addCustomToken}
          newTokenAddress={newTokenAddress}
          customTokenSymbol={customTokenSymbol}
          defaultAccount={defaultAccount}
        />
      )}

      {showTokenSendModal && (
        <SendTokenModal
          setTransferTokenAddress={setTransferTokenAddress}
          ethereumMainnetContractAddress={ethereumMainnetContractAddress}
          userBalance={userBalance}
          customToken={customToken}
          defaultAccount={defaultAccount}
          setReciepientAddress={setReciepientAddress}
          setTransferAmount={setTransferAmount}
          setShowTokenSendModal={setShowTokenSendModal}
          isSending={isSending}
          setIsSending={setIsSending}
          sendToken={sendToken}
          transferTokenAddress={transferTokenAddress}
          reciepientAddress={reciepientAddress}
          transferAmount={transferAmount}
        />
      )}
    </div>
  );
};
export default App;
