/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface FW7BridgeInterface extends utils.Interface {
  contractName: "FW7Bridge";
  functions: {
    "bridged(address)": FunctionFragment;
    "claimTokens()": FunctionFragment;
    "depositTokens(address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "fee()": FunctionFragment;
    "locked()": FunctionFragment;
    "owner()": FunctionFragment;
    "processedHashes(bytes32)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "returnTokens(address)": FunctionFragment;
    "token()": FunctionFragment;
    "tokensBridged(address,uint256,bytes32)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "bridged", values: [string]): string;
  encodeFunctionData(
    functionFragment: "claimTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositTokens",
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "fee", values?: undefined): string;
  encodeFunctionData(functionFragment: "locked", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "processedHashes",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "returnTokens",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokensBridged",
    values: [string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "bridged", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "processedHashes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "returnTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokensBridged",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "ClaimTokens(address,uint256)": EventFragment;
    "DepositTokens(address,address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ReturnTokens(address,address,uint256)": EventFragment;
    "TokensBridged(address,uint256,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimTokens"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DepositTokens"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReturnTokens"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensBridged"): EventFragment;
}

export type ClaimTokensEvent = TypedEvent<
  [string, BigNumber],
  { _sender: string; _amount: BigNumber }
>;

export type ClaimTokensEventFilter = TypedEventFilter<ClaimTokensEvent>;

export type DepositTokensEvent = TypedEvent<
  [string, string, BigNumber],
  { _sender: string; _receiver: string; _amount: BigNumber }
>;

export type DepositTokensEventFilter = TypedEventFilter<DepositTokensEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type ReturnTokensEvent = TypedEvent<
  [string, string, BigNumber],
  { _sender: string; _receiver: string; _amount: BigNumber }
>;

export type ReturnTokensEventFilter = TypedEventFilter<ReturnTokensEvent>;

export type TokensBridgedEvent = TypedEvent<
  [string, BigNumber, string],
  { _receiver: string; _amount: BigNumber; _otherChainTransactionHash: string }
>;

export type TokensBridgedEventFilter = TypedEventFilter<TokensBridgedEvent>;

export interface FW7Bridge extends BaseContract {
  contractName: "FW7Bridge";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FW7BridgeInterface;

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
    bridged(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    claimTokens(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositTokens(
      _receiver: string,
      _amount: BigNumberish,
      _deadline: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    fee(overrides?: CallOverrides): Promise<[BigNumber]>;

    locked(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    processedHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    returnTokens(
      _receiver: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    tokensBridged(
      _receiver: string,
      _amount: BigNumberish,
      _otherChainTransactionHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bridged(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  claimTokens(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositTokens(
    _receiver: string,
    _amount: BigNumberish,
    _deadline: BigNumberish,
    _v: BigNumberish,
    _r: BytesLike,
    _s: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  fee(overrides?: CallOverrides): Promise<BigNumber>;

  locked(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  processedHashes(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  returnTokens(
    _receiver: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  tokensBridged(
    _receiver: string,
    _amount: BigNumberish,
    _otherChainTransactionHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bridged(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    claimTokens(overrides?: CallOverrides): Promise<void>;

    depositTokens(
      _receiver: string,
      _amount: BigNumberish,
      _deadline: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    locked(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    processedHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    returnTokens(_receiver: string, overrides?: CallOverrides): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    tokensBridged(
      _receiver: string,
      _amount: BigNumberish,
      _otherChainTransactionHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "ClaimTokens(address,uint256)"(
      _sender?: string | null,
      _amount?: null
    ): ClaimTokensEventFilter;
    ClaimTokens(
      _sender?: string | null,
      _amount?: null
    ): ClaimTokensEventFilter;

    "DepositTokens(address,address,uint256)"(
      _sender?: string | null,
      _receiver?: string | null,
      _amount?: null
    ): DepositTokensEventFilter;
    DepositTokens(
      _sender?: string | null,
      _receiver?: string | null,
      _amount?: null
    ): DepositTokensEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "ReturnTokens(address,address,uint256)"(
      _sender?: string | null,
      _receiver?: string | null,
      _amount?: null
    ): ReturnTokensEventFilter;
    ReturnTokens(
      _sender?: string | null,
      _receiver?: string | null,
      _amount?: null
    ): ReturnTokensEventFilter;

    "TokensBridged(address,uint256,bytes32)"(
      _receiver?: string | null,
      _amount?: null,
      _otherChainTransactionHash?: null
    ): TokensBridgedEventFilter;
    TokensBridged(
      _receiver?: string | null,
      _amount?: null,
      _otherChainTransactionHash?: null
    ): TokensBridgedEventFilter;
  };

  estimateGas: {
    bridged(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    claimTokens(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositTokens(
      _receiver: string,
      _amount: BigNumberish,
      _deadline: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    locked(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    processedHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    returnTokens(
      _receiver: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    tokensBridged(
      _receiver: string,
      _amount: BigNumberish,
      _otherChainTransactionHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bridged(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimTokens(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositTokens(
      _receiver: string,
      _amount: BigNumberish,
      _deadline: BigNumberish,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    locked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    processedHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    returnTokens(
      _receiver: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokensBridged(
      _receiver: string,
      _amount: BigNumberish,
      _otherChainTransactionHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
