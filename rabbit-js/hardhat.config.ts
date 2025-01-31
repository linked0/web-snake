import * as dotenv from "dotenv";
import { Wallet, parseEther } from "ethers";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatNetworkAccountUserConfig } from "hardhat/types/config";

dotenv.config({ path: ".env" });

function getAccounts() {
  const accounts: HardhatNetworkAccountUserConfig[] = [];
  const defaultBalance = parseEther("2000000").toString();

  const n = 10;
  for (let i = 0; i < n; ++i) {
    accounts.push({
      privateKey: Wallet.createRandom().privateKey,
      balance: defaultBalance,
    });
  }
  accounts[0].privateKey = process.env.ADMIN_KEY || "";
  accounts[1].privateKey = process.env.USER_KEY || "";

  return accounts;
}

// Dynamically get the test mode from environment variables
const testMode = process.env.TEST_MODE || '';

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // hardfork: "cancun",
      allowUnlimitedContractSize: false,
      accounts: getAccounts(),
      mining: {
        auto: testMode !== 'disableAutoMining'
      }
    },
    localnet: {
      url: process.env.LOCALNET_URL,
      chainId: 12301,
      accounts: [process.env.ADMIN_KEY || "", process.env.USER_KEY || ""],
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      chainId: 11155111,
      accounts: [process.env.ADMIN_KEY || ""],
    },
    testnet: {
      url: process.env.TESTNET_URL,
      chainId: 12301,
      accounts: [process.env.ADMIN_KEY || "", process.env.USER_KEY || ""],
    },
  },
  typechain: {
    outDir: "src/typechain-types",
  },
  paths: {
    tests: "src/__tests__",
    artifacts: "src/artifacts",
    sources: "src/contracts",
  },
};

export default config;
