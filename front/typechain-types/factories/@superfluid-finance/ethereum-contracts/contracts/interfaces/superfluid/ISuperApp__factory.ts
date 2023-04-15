/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ISuperApp,
  ISuperAppInterface,
} from "../../../../../../@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperApp";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "agreementData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "cbdata",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "afterAgreementCreated",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "agreementData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "cbdata",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "afterAgreementTerminated",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "agreementData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "cbdata",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "afterAgreementUpdated",
    outputs: [
      {
        internalType: "bytes",
        name: "newCtx",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "agreementData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "beforeAgreementCreated",
    outputs: [
      {
        internalType: "bytes",
        name: "cbdata",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "agreementData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "beforeAgreementTerminated",
    outputs: [
      {
        internalType: "bytes",
        name: "cbdata",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "superToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "agreementClass",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "agreementData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "ctx",
        type: "bytes",
      },
    ],
    name: "beforeAgreementUpdated",
    outputs: [
      {
        internalType: "bytes",
        name: "cbdata",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class ISuperApp__factory {
  static readonly abi = _abi;
  static createInterface(): ISuperAppInterface {
    return new utils.Interface(_abi) as ISuperAppInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ISuperApp {
    return new Contract(address, _abi, signerOrProvider) as ISuperApp;
  }
}
