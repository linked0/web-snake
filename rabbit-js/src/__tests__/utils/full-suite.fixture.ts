import hre from "hardhat";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import * as fs from "fs";
import * as path from "path";
import { AllBasic } from "../../allbasic";

export async function fullSuiteFixture() {
  let allBasic: AllBasic;

  const [owner] = await hre.ethers.getSigners();

  // get contract factory with abi and bytecode
  const contract = await ethers.deployContract("AllBasic");
  allBasic = new AllBasic(owner, contract.target.toString());

  return {
    accounts: {
      owner,
    },
    suiteBasic: { allBasic },
  };
}