// CallContractButton.tsx
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = import.meta.env.VITE_JAY_SMART_ACCOUNT_ADDRESS || "";
import ContractArtifact from '../abis/JaySmartAccount.json';

function CallContractButton() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [result, setResult] = useState<string>("");  // State for results
  const [inputValue, setInputValue] = useState<string>(""); // State for the input text

  useEffect(() => {
    const init = async () => {
      if ((window as any).ethereum) {
        const _provider = new ethers.BrowserProvider((window as any).ethereum);
        await _provider.send("eth_requestAccounts", []);
        const _signer = await _provider.getSigner();
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

  const callSetFunction = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      // Parse the input text as an integer
      const parsedValue = parseInt(inputValue, 10);
      if (isNaN(parsedValue)) {
        setResult("Invalid input, please enter a valid number.");
        return;
      }
      // Call the setStore function with the parsed value
      const tx = await contract.setStore(parsedValue);
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("setStore transaction successful:", receipt);
      setResult("setStore transaction successful: " + JSON.stringify(receipt));
    } catch (error: any) {
      console.error("Error calling setStore function:", error);
      setResult("Error calling setStore function: " + error.message);
    }
  };

  const callGetFunction = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      // Since getStore is a view function, we simply call it
      const storeValue = await contract.getStore();
      console.log("Current store value:", storeValue);
      // Convert to string in case it's a BigNumber or BigInt
      setResult("Current store value: " + storeValue.toString());
    } catch (error: any) {
      console.error("Error calling getStore function:", error);
      setResult("Error calling getStore function: " + error.message);
    }
  };

  const callContractStaticFunction = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      const ret = await contract.getSigValidationFailed();
      console.log("Static call result:", ret);
      const serialized = JSON.stringify(ret, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
      setResult("Static call result: " + serialized);
    } catch (error: any) {
      console.error("Error calling contract static function:", error);
      setResult("Error calling static function: " + error.message);
    }
  };

  // New function to call getLogs which returns a string[] array
  const callGetLogs = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      // Since getLogs is now a view function, we can call it directly
      const logsArray: string[] = await contract.getLogs();
      console.log("Logs array:", logsArray);
      // Display the logs as a comma-separated list
      setResult("Logs: " + logsArray.join(", "));
    } catch (error: any) {
      console.error("Error calling getLogs function:", error);
      setResult("Error calling getLogs function: " + error.message);
    }
  };

  // New function to call clearLogs
  const callClearLogs = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      // Call the clearLogs function which modifies state
      const tx = await contract.clearLogs();
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("clearLogs transaction successful:", receipt);
      setResult("clearLogs transaction successful: " + JSON.stringify(receipt));
    } catch (error: any) {
      console.error("Error calling clearLogs function:", error);
      setResult("Error calling clearLogs function: " + error.message);
    }
  };

  // --------------------------------------------------
  // NEW: Call multiUserOp
  // --------------------------------------------------
  const callMultiUserOp = async () => {
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }
    try {
      // --------------------------------------------------
      // For demonstration, we build a single userOp in raw bytes:
      //   1) [32 bytes] total length of the rest (call it totalPayloadLength)
      //   2) [20 bytes] address sender
      //   3) [32 bytes] signature length
      //   4) [N bytes ] signature
      //
      // This matches the custom inline assembly approach you had in the original code example.
      // --------------------------------------------------

      // We'll make a trivial example:
      //   sender = 0x1111111111111111111111111111111111111111
      //   signature = 0xDEADBEEF (4 bytes)
      // So totalPayloadLength = 20 + 32 + 4 = 56
      // The entire array = 32 (for the length field) + 56 = 88 bytes.

      const totalPayloadLength = 56; // 20 + 32 + 4
      const fullBytesLength = 32 + totalPayloadLength; // 88
      const array = new Uint8Array(fullBytesLength);
      const dataView = new DataView(array.buffer);

      // Write the totalPayloadLength into the first 32 bytes (at offset 28 for a 32-bit integer)
      dataView.setUint32(28, totalPayloadLength, false);

      let offset = 32; // start of the actual data

      // 1) 20 bytes for sender
      const senderHex = "1111111111111111111111111111111111111111";
      for (let i = 0; i < 20; i++) {
        array[offset + i] = parseInt(senderHex.substr(i * 2, 2), 16);
      }
      offset += 20;

      // 2) 32 bytes for signature length
      dataView.setUint32(offset + 28, 4, false); // set it to 4
      offset += 32;

      // 3) 4 bytes for the actual signature
      array[offset + 0] = 0xde;
      array[offset + 1] = 0xad;
      array[offset + 2] = 0xbe;
      array[offset + 3] = 0xef;
      offset += 4;

      // Convert to hex
      const userOpsHex = ethers.hexlify(array);
      console.log("Encoded userOpsHex:", userOpsHex);

      // Finally, call multiUserOp
      const tx = await contract.multiUserOp(userOpsHex);
      const receipt = await tx.wait();
      console.log("multiUserOp transaction successful:", receipt);
      setResult("multiUserOp transaction successful: " + JSON.stringify(receipt));
    } catch (error: any) {
      console.error("Error calling multiUserOp:", error);
      setResult("Error calling multiUserOp: " + error.message);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter store value" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <br />
      <button onClick={callSetFunction}>
        Call Set Function
      </button>
      <button onClick={callGetFunction}>
        Call Get Function
      </button>
      <button onClick={callContractStaticFunction}>
        Call Contract Static Function
      </button>
      <button onClick={callGetLogs}>
        Call getLogs Function
      </button>
      <button onClick={callClearLogs}>
        Call Clear Logs Function
      </button>
      <button onClick={callMultiUserOp}>
        Call multiUserOp
      </button>

      {/* Result div */}
      {result && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #fff" }}>
          {result}
        </div>
      )}
    </div>
  );
}

export default CallContractButton;
