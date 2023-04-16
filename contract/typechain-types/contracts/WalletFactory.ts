/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface WalletFactoryInterface extends utils.Interface {
  functions: {
    "createWallet(address)": FunctionFragment;
    "feeToken()": FunctionFragment;
    "feeTokenX()": FunctionFragment;
    "hostSuperfluid()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rentalStorage()": FunctionFragment;
    "salt()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createWallet"
      | "feeToken"
      | "feeTokenX"
      | "hostSuperfluid"
      | "owner"
      | "renounceOwnership"
      | "rentalStorage"
      | "salt"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createWallet",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "feeToken", values?: undefined): string;
  encodeFunctionData(functionFragment: "feeTokenX", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "hostSuperfluid",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rentalStorage",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "salt", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "createWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "feeToken", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeTokenX", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hostSuperfluid",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rentalStorage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "salt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface WalletFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WalletFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createWallet(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    feeToken(overrides?: CallOverrides): Promise<[string]>;

    feeTokenX(overrides?: CallOverrides): Promise<[string]>;

    hostSuperfluid(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    rentalStorage(overrides?: CallOverrides): Promise<[string]>;

    salt(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  createWallet(
    owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  feeToken(overrides?: CallOverrides): Promise<string>;

  feeTokenX(overrides?: CallOverrides): Promise<string>;

  hostSuperfluid(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  rentalStorage(overrides?: CallOverrides): Promise<string>;

  salt(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createWallet(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    feeToken(overrides?: CallOverrides): Promise<string>;

    feeTokenX(overrides?: CallOverrides): Promise<string>;

    hostSuperfluid(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rentalStorage(overrides?: CallOverrides): Promise<string>;

    salt(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    createWallet(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    feeToken(overrides?: CallOverrides): Promise<BigNumber>;

    feeTokenX(overrides?: CallOverrides): Promise<BigNumber>;

    hostSuperfluid(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    rentalStorage(overrides?: CallOverrides): Promise<BigNumber>;

    salt(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createWallet(
      owner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    feeToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeTokenX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hostSuperfluid(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    rentalStorage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    salt(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}