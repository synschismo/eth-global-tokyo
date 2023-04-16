/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IWalletFactory,
  IWalletFactoryInterface,
} from "../../contracts/IWalletFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "createWallet",
    outputs: [
      {
        internalType: "contract Wallet",
        name: "wallet",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IWalletFactory__factory {
  static readonly abi = _abi;
  static createInterface(): IWalletFactoryInterface {
    return new utils.Interface(_abi) as IWalletFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWalletFactory {
    return new Contract(address, _abi, signerOrProvider) as IWalletFactory;
  }
}