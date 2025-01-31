import { expect } from "chai";
import { JsonRpcProvider } from "ethers"; 
import * as hre from 'hardhat'
import { fullSuiteFixture } from "./utils/full-suite.fixture";
import { AllBasic } from "../allbasic";

import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";


const ethers = hre.ethers

describe("Basic test on localnet", () => {
  it("should return true", async () => {
    // get chain id of network and check if it is hardhat network
    const chainId = await ethers.provider.getNetwork().then((network) => network.chainId);
    if (Number(chainId) === 31337) {
      console.error("This test is designed to run on localnet only");
      return;
    }
    let allBasic: AllBasic;
    const [owner] = await ethers.getSigners();
    const provider = ethers.provider as unknown as JsonRpcProvider;
    allBasic = new AllBasic(provider, process.env.ALL_BASIC_CONTRACT || "");
    console.log("getValue:", await allBasic.getValue());
  });
});