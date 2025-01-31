import {
  Contract, JsonRpcProvider, Signer
} from "ethers";
import * as fs from "fs";
import * as path from "path";
import hre from "hardhat";

import type {
  AllBasicContract,
} from "./types";

import {
  abi as AllBasicABI,
} from "./artifacts/web/ex/contracts/AllBasic.sol/AllBasic.json";

export class AllBasic {
  public contract: AllBasicContract;
  private provider: JsonRpcProvider;
  private signer?: Signer;

  public constructor(providerOrSigner: JsonRpcProvider | Signer, address: string) {
    const provider =
      providerOrSigner instanceof JsonRpcProvider
        ? providerOrSigner
        : providerOrSigner.provider;

    this.signer = 'signMessage' in providerOrSigner
      ? (providerOrSigner as Signer)
      : undefined;

    if (!provider) {
      throw new Error(
        "Either a provider or custom signer with provider must be provided"
      );
    }
    this.provider = provider as JsonRpcProvider;

    console.log('provider: ', this.provider);
    console.log('signer: ', this.signer);

    this.contract = new Contract(address, AllBasicABI, this.provider) as unknown as AllBasicContract;
  }

  public async getValue(): Promise<bigint> {
    const value = await this.contract.getValue();
    return value;
  }
}