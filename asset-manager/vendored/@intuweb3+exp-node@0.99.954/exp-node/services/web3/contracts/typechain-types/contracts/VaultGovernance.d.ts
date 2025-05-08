import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export declare namespace VaultGovernance {
    type ProposalStruct = {
        id: PromiseOrValue<BigNumberish>;
        voteForNeeded: PromiseOrValue<BigNumberish>;
        voteForCount: PromiseOrValue<BigNumberish>;
        executed: PromiseOrValue<boolean>;
        cancelled: PromiseOrValue<boolean>;
        _calldata: PromiseOrValue<BytesLike>;
        endTime: PromiseOrValue<BigNumberish>;
        feeValue: PromiseOrValue<BigNumberish>;
        creator: PromiseOrValue<string>;
    };
    type ProposalStructOutput = [
        BigNumber,
        number,
        number,
        boolean,
        boolean,
        string,
        BigNumber,
        BigNumber,
        string
    ] & {
        id: BigNumber;
        voteForNeeded: number;
        voteForCount: number;
        executed: boolean;
        cancelled: boolean;
        _calldata: string;
        endTime: BigNumber;
        feeValue: BigNumber;
        creator: string;
    };
}
export interface VaultGovernanceInterface extends utils.Interface {
    functions: {
        "PROPOSAL_IN_PROCESS()": FunctionFragment;
        "PROPOSAL_VOTE_DURATION()": FunctionFragment;
        "getProposalCounter()": FunctionFragment;
        "proposalInfos(uint256)": FunctionFragment;
        "proposalVoteUserInfos(uint256,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "PROPOSAL_IN_PROCESS" | "PROPOSAL_VOTE_DURATION" | "getProposalCounter" | "proposalInfos" | "proposalVoteUserInfos"): FunctionFragment;
    encodeFunctionData(functionFragment: "PROPOSAL_IN_PROCESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "PROPOSAL_VOTE_DURATION", values?: undefined): string;
    encodeFunctionData(functionFragment: "getProposalCounter", values?: undefined): string;
    encodeFunctionData(functionFragment: "proposalInfos", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "proposalVoteUserInfos", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "PROPOSAL_IN_PROCESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PROPOSAL_VOTE_DURATION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProposalCounter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposalInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposalVoteUserInfos", data: BytesLike): Result;
    events: {
        "ProposalCreated(uint256,uint8,bytes)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "ProposalCreated"): EventFragment;
}
export interface ProposalCreatedEventObject {
    id: BigNumber;
    _type: number;
    data: string;
}
export type ProposalCreatedEvent = TypedEvent<[
    BigNumber,
    number,
    string
], ProposalCreatedEventObject>;
export type ProposalCreatedEventFilter = TypedEventFilter<ProposalCreatedEvent>;
export interface VaultGovernance extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: VaultGovernanceInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<[boolean]>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<[BigNumber]>;
        getProposalCounter(overrides?: CallOverrides): Promise<[BigNumber]>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[VaultGovernance.ProposalStructOutput]>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number]>;
    };
    PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<boolean>;
    PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
    getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
    proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultGovernance.ProposalStructOutput>;
    proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
    callStatic: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<boolean>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
        getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultGovernance.ProposalStructOutput>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
    };
    filters: {
        "ProposalCreated(uint256,uint8,bytes)"(id?: PromiseOrValue<BigNumberish> | null, _type?: null, data?: null): ProposalCreatedEventFilter;
        ProposalCreated(id?: PromiseOrValue<BigNumberish> | null, _type?: null, data?: null): ProposalCreatedEventFilter;
    };
    estimateGas: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<BigNumber>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
        getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getProposalCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
