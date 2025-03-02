import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = import.meta.env.VITE_JAY_SMART_ACCOUNT_ADDRESS || "";
import ContractArtifact from '../abis/JaySmartAccount.json';

function CallContractButton() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      if ((window as any).ethereum) {
        // Use BrowserProvider from ethers v6
        const _provider = new ethers.BrowserProvider((window as any).ethereum);
        // Request account access
        await _provider.send("eth_requestAccounts", []);
        // Await the signer since it's async in ethers v6
        const _signer = await _provider.getSigner();
        // Create a contract instance with the signer's access
        const _contract = new ethers.Contract(contractAddress, ContractArtifact.abi, _signer);

        setProvider(_provider);
        setSigner(_signer);
        setContract(_contract);
      } else {
        console.error("No Ethereum provider found. Install MetaMask.");
      }
    };

    init();
  }, []);

  const callContractFunction = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      // Replace 'myFunction' with your contract's actual function name and parameters if any
      const tx = await contract.myFunction();
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction successful:", receipt);
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  };

  const callContractStaticFunction = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      // Replace 'myFunction' with your contract's actual function name and parameters if any
      const ret = await contract.getSigValidationFailed();
      console.log("Transaction successful:", ret);
    } catch (error) {
      console.error("Error calling contract function:", error);
    }
  };

  return (
    <div>
      <button onClick={callContractFunction}>
        Call Contract Function
      </button>
      <button onClick={callContractStaticFunction}>
        Call Contract Static Function
      </button>
    </div>
  );
}

export default CallContractButton;