/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface BridgeInterface extends utils.Interface {
  contractName: "Bridge";
  functions: {
    "bridged(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "processedHashes(bytes32)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "bridged", values: [string]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "processedHashes",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "bridged", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "processedHashes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

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

export interface Bridge extends BaseContract {
  contractName: "Bridge";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BridgeInterface;

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

    owner(overrides?: CallOverrides): Promise<[string]>;

    processedHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bridged(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  processedHashes(arg0: BytesLike, overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bridged(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    processedHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
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

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    processedHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bridged(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    processedHashes(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
