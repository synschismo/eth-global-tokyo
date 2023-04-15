/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace CommonTypes {
  export type LendInfoStruct = {
    lenderWallet: PromiseOrValue<string>;
    tokenAddress: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    flowRate: PromiseOrValue<BigNumberish>;
  };

  export type LendInfoStructOutput = [string, string, BigNumber, BigNumber] & {
    lenderWallet: string;
    tokenAddress: string;
    tokenId: BigNumber;
    flowRate: BigNumber;
  };

  export type RentInfoStruct = {
    lendId: PromiseOrValue<BigNumberish>;
    tokenAddress: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    renterWallet: PromiseOrValue<string>;
    startedAt: PromiseOrValue<BigNumberish>;
    returnAt: PromiseOrValue<BigNumberish>;
  };

  export type RentInfoStructOutput = [
    BigNumber,
    string,
    BigNumber,
    string,
    BigNumber,
    BigNumber
  ] & {
    lendId: BigNumber;
    tokenAddress: string;
    tokenId: BigNumber;
    renterWallet: string;
    startedAt: BigNumber;
    returnAt: BigNumber;
  };
}

export interface IRentalStorageInterface extends utils.Interface {
  functions: {
    "getLendInfo(uint256)": FunctionFragment;
    "getRentInfo(uint256)": FunctionFragment;
    "list(address,uint256,int96)": FunctionFragment;
    "onReturned(uint256)": FunctionFragment;
    "ownerByWallet(address)": FunctionFragment;
    "registerWallet(address,address)": FunctionFragment;
    "returnScheduledRent(uint256)": FunctionFragment;
    "unList(uint256)": FunctionFragment;
    "validateExecution(address,bytes)": FunctionFragment;
    "walletByOwner(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getLendInfo"
      | "getRentInfo"
      | "list"
      | "onReturned"
      | "ownerByWallet"
      | "registerWallet"
      | "returnScheduledRent"
      | "unList"
      | "validateExecution"
      | "walletByOwner"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getLendInfo",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRentInfo",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "list",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onReturned",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerByWallet",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerWallet",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "returnScheduledRent",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "unList",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "validateExecution",
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "walletByOwner",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "getLendInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRentInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "list", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "onReturned", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownerByWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "returnScheduledRent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unList", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "validateExecution",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "walletByOwner",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IRentalStorage extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IRentalStorageInterface;

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
    getLendInfo(
      _lendId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [CommonTypes.LendInfoStructOutput] & {
        lendInfo: CommonTypes.LendInfoStructOutput;
      }
    >;

    getRentInfo(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [CommonTypes.RentInfoStructOutput] & {
        rentInfo: CommonTypes.RentInfoStructOutput;
      }
    >;

    list(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _flowRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    onReturned(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ownerByWallet(
      _wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string] & { owner: string }>;

    registerWallet(
      _owner: PromiseOrValue<string>,
      _wallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    returnScheduledRent(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unList(
      _lendId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    validateExecution(
      _to: PromiseOrValue<string>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    walletByOwner(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string] & { wallet: string }>;
  };

  getLendInfo(
    _lendId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<CommonTypes.LendInfoStructOutput>;

  getRentInfo(
    _rentId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<CommonTypes.RentInfoStructOutput>;

  list(
    _tokenAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _flowRate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  onReturned(
    _rentId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ownerByWallet(
    _wallet: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  registerWallet(
    _owner: PromiseOrValue<string>,
    _wallet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  returnScheduledRent(
    _rentId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unList(
    _lendId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  validateExecution(
    _to: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  walletByOwner(
    _owner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    getLendInfo(
      _lendId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<CommonTypes.LendInfoStructOutput>;

    getRentInfo(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<CommonTypes.RentInfoStructOutput>;

    list(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _flowRate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onReturned(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    ownerByWallet(
      _wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    registerWallet(
      _owner: PromiseOrValue<string>,
      _wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    returnScheduledRent(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    unList(
      _lendId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    validateExecution(
      _to: PromiseOrValue<string>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    walletByOwner(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    getLendInfo(
      _lendId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRentInfo(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    list(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _flowRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    onReturned(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ownerByWallet(
      _wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerWallet(
      _owner: PromiseOrValue<string>,
      _wallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    returnScheduledRent(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unList(
      _lendId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    validateExecution(
      _to: PromiseOrValue<string>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    walletByOwner(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getLendInfo(
      _lendId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRentInfo(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    list(
      _tokenAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _flowRate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    onReturned(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ownerByWallet(
      _wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    registerWallet(
      _owner: PromiseOrValue<string>,
      _wallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    returnScheduledRent(
      _rentId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unList(
      _lendId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    validateExecution(
      _to: PromiseOrValue<string>,
      _data: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    walletByOwner(
      _owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
