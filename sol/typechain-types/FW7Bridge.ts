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
    "bridget(bytes)": FunctionFragment;
    "claimTokens()": FunctionFragment;
    "depositTokens(uint256)": FunctionFragment;
    "gateway()": FunctionFragment;
    "gatewayUpdate(address)": FunctionFragment;
    "locked()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "returnTokens()": FunctionFragment;
    "token()": FunctionFragment;
    "tokensBridged(address,uint256,bytes32)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "bridget", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "claimTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "depositTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "gateway", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "gatewayUpdate",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "locked", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "returnTokens",
    values?: undefined
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

  decodeFunctionResult(functionFragment: "bridget", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "gateway", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "gatewayUpdate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "locked", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
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

  events: {
    "ClaimTokens(address,uint256)": EventFragment;
    "DepositTokens(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "ReturnTokens(address,uint256)": EventFragment;
    "TokensBridged(address,bytes32,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ClaimTokens"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DepositTokens"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReturnTokens"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensBridged"): EventFragment;
}

export type ClaimTokensEvent = TypedEvent<
  [string, BigNumber],
  { sender: string; _amount: BigNumber }
>;

export type ClaimTokensEventFilter = TypedEventFilter<ClaimTokensEvent>;

export type DepositTokensEvent = TypedEvent<
  [string, BigNumber],
  { sender: string; _amount: BigNumber }
>;

export type DepositTokensEventFilter = TypedEventFilter<DepositTokensEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type ReturnTokensEvent = TypedEvent<
  [string, BigNumber],
  { sender: string; _amount: BigNumber }
>;

export type ReturnTokensEventFilter = TypedEventFilter<ReturnTokensEvent>;

export type TokensBridgedEvent = TypedEvent<
  [string, string, BigNumber],
  { sender: string; mainDepositHash: string; _amount: BigNumber }
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
    bridget(arg0: BytesLike, overrides?: CallOverrides): Promise<[BigNumber]>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositTokens(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    gateway(overrides?: CallOverrides): Promise<[string]>;

    gatewayUpdate(
      _gateway: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    locked(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    returnTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    tokensBridged(
      _requester: string,
      _amount: BigNumberish,
      _sideDepositHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bridget(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

  claimTokens(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositTokens(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  gateway(overrides?: CallOverrides): Promise<string>;

  gatewayUpdate(
    _gateway: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  locked(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  returnTokens(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  tokensBridged(
    _requester: string,
    _amount: BigNumberish,
    _sideDepositHash: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bridget(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    claimTokens(overrides?: CallOverrides): Promise<boolean>;

    depositTokens(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    gateway(overrides?: CallOverrides): Promise<string>;

    gatewayUpdate(_gateway: string, overrides?: CallOverrides): Promise<void>;

    locked(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    returnTokens(overrides?: CallOverrides): Promise<boolean>;

    token(overrides?: CallOverrides): Promise<string>;

    tokensBridged(
      _requester: string,
      _amount: BigNumberish,
      _sideDepositHash: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ClaimTokens(address,uint256)"(
      sender?: string | null,
      _amount?: null
    ): ClaimTokensEventFilter;
    ClaimTokens(sender?: string | null, _amount?: null): ClaimTokensEventFilter;

    "DepositTokens(address,uint256)"(
      sender?: string | null,
      _amount?: null
    ): DepositTokensEventFilter;
    DepositTokens(
      sender?: string | null,
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

    "ReturnTokens(address,uint256)"(
      sender?: string | null,
      _amount?: null
    ): ReturnTokensEventFilter;
    ReturnTokens(
      sender?: string | null,
      _amount?: null
    ): ReturnTokensEventFilter;

    "TokensBridged(address,bytes32,uint256)"(
      sender?: string | null,
      mainDepositHash?: BytesLike | null,
      _amount?: null
    ): TokensBridgedEventFilter;
    TokensBridged(
      sender?: string | null,
      mainDepositHash?: BytesLike | null,
      _amount?: null
    ): TokensBridgedEventFilter;
  };

  estimateGas: {
    bridget(arg0: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositTokens(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    gateway(overrides?: CallOverrides): Promise<BigNumber>;

    gatewayUpdate(
      _gateway: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    locked(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    returnTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    tokensBridged(
      _requester: string,
      _amount: BigNumberish,
      _sideDepositHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bridget(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositTokens(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    gateway(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gatewayUpdate(
      _gateway: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    locked(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    returnTokens(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokensBridged(
      _requester: string,
      _amount: BigNumberish,
      _sideDepositHash: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}