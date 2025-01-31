//infuria networks
export const infuriaNetworks = [
  {
    name: "Ethereum Mainnet",
    rpc: "mainnet",
  },
  {
    name: "Ethereum Testnet",
    rpc: "goerli",
  },
  {
    name: "Polygon Mainnet",
    rpc: "polygon-mainnet",
  },
  {
    name: "Polygon Mumbai",
    rpc: "polygon-mumbai",
  },
  {
    name: "Optimism Mainnet",
    rpc: "mainnet",
  },
  {
    name: "Optimism Testnet",
    rpc: "testnet",
  },
  {
    name: "Palm Mainnet",
    rpc: "palm-mainnet",
  },
  {
    name: "Palm Testnet",
    rpc: "palm-testnet",
  },
  {
    name: "Avalanche C-Chain Mainnet",
    rpc: "avalanche-mainnet",
  },
  {
    name: "Avalanche C-Chain Fuji",
    rpc: "avalanche-fuji",
  },
  {
    name: "Near Mainnet",
    rpc: "near-mainnet",
  },
  {
    name: "Near Testnet",
    rpc: "near-testnet",
  },
  {
    name: "Starknet Mainnet",
    rpc: "starknet-mainnet",
  },
  {
    name: "Starknet Goerli",
    rpc: "starknet-goerli",
  },
  {
    name: "Aurora Mainnet",
    rpc: "aurora-mainnet",
  },
  {
    name: "Aurora Testnet",
    rpc: "aurora-testnet",
  },
];
//ERC20 Standard ABI for tokens transer method
export const contractABI: any = [
  // transfer
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];
// The minimum ABI required to get the ERC20 Token balance
export const minABI: any = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
export const infuriaKey = `${process.env.REACT_APP_INFURIA_ID}`;
export const ethereumMainnetContractAddress = `0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe`;
