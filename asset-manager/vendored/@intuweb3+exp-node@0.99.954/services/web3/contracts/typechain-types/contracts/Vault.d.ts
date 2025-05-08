import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export declare namespace VaultManager {
    type TransactionStruct = {
        votesNeeded: PromiseOrValue<BigNumberish>;
        votesFor: PromiseOrValue<BigNumberish>;
        id: PromiseOrValue<BigNumberish>;
    };
    type TransactionStructOutput = [number, number, BigNumber] & {
        votesNeeded: number;
        votesFor: number;
        id: BigNumber;
    };
    type VaultStruct = {
        registeredUsersCount: PromiseOrValue<BigNumberish>;
        rotateThreshold: PromiseOrValue<BigNumberish>;
        transactionThreshold: PromiseOrValue<BigNumberish>;
        adminThreshold: PromiseOrValue<BigNumberish>;
        usersCount: PromiseOrValue<BigNumberish>;
        createdDate: PromiseOrValue<BigNumberish>;
        createdBlock: PromiseOrValue<BigNumberish>;
        transactionCount: PromiseOrValue<BigNumberish>;
        completed: PromiseOrValue<boolean>;
        resharingOccurred: PromiseOrValue<boolean>;
        encryptionMessage: PromiseOrValue<BytesLike>;
        seed: PromiseOrValue<string>;
        name: PromiseOrValue<BytesLike>;
        users: PromiseOrValue<string>[];
        masterPublicKey: PromiseOrValue<string>;
    };
    type VaultStructOutput = [
        number,
        number,
        number,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        boolean,
        string,
        string,
        string,
        string[],
        string
    ] & {
        registeredUsersCount: number;
        rotateThreshold: number;
        transactionThreshold: number;
        adminThreshold: number;
        usersCount: number;
        createdDate: BigNumber;
        createdBlock: BigNumber;
        transactionCount: BigNumber;
        completed: boolean;
        resharingOccurred: boolean;
        encryptionMessage: string;
        seed: string;
        name: string;
        users: string[];
        masterPublicKey: string;
    };
}
export interface VaultInterface extends utils.Interface {
    functions: {
        "PROPOSAL_IN_PROCESS()": FunctionFragment;
        "PROPOSAL_VOTE_DURATION()": FunctionFragment;
        "VAULT_USER_COUNT_LIMIT()": FunctionFragment;
        "addUserDoneStep1(address,uint256)": FunctionFragment;
        "addUserDoneStep2(address,uint256)": FunctionFragment;
        "addUserDoneStep3(address,uint256)": FunctionFragment;
        "cancelProposal(uint256)": FunctionFragment;
        "cancelUserToAdd()": FunctionFragment;
        "completeVault(address[],address)": FunctionFragment;
        "executeProposal(uint256)": FunctionFragment;
        "feeContractAddress()": FunctionFragment;
        "getProposalCounter()": FunctionFragment;
        "getUserToAdd()": FunctionFragment;
        "getUserToRemove()": FunctionFragment;
        "hasUserConfirmedTransaction(uint256,address)": FunctionFragment;
        "initialize(address[],uint8,uint8,uint8,bytes32,string,bytes32,address)": FunctionFragment;
        "messageCount()": FunctionFragment;
        "messages(uint256)": FunctionFragment;
        "messagesSigned(uint256,address)": FunctionFragment;
        "preRegister(string,string,string,string)": FunctionFragment;
        "proposalInfos(uint256)": FunctionFragment;
        "proposalVoteUserInfos(uint256,address)": FunctionFragment;
        "proposeTransaction(string,string)": FunctionFragment;
        "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)": FunctionFragment;
        "registerAllSteps(string,string,string,string,string,string,string,string,string,string)": FunctionFragment;
        "submitUserToAdd(address[])": FunctionFragment;
        "submitUsersToRotate(address,address)": FunctionFragment;
        "totalAddUserStep1Done(uint256)": FunctionFragment;
        "totalAddUserStep2Done(uint256)": FunctionFragment;
        "totalAddUserStep3Done(uint256)": FunctionFragment;
        "transactionInfos(uint256)": FunctionFragment;
        "transactionVotes(uint256,address)": FunctionFragment;
        "transactions(uint256)": FunctionFragment;
        "userConfirmTx(uint256,string)": FunctionFragment;
        "userInfos(address)": FunctionFragment;
        "userToAdd(uint256)": FunctionFragment;
        "userToAddCount()": FunctionFragment;
        "userToRemove(uint256)": FunctionFragment;
        "usersMapping(address)": FunctionFragment;
        "vault()": FunctionFragment;
        "vaultInfos()": FunctionFragment;
        "voteAgainst(uint256)": FunctionFragment;
        "voteFor(uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "PROPOSAL_IN_PROCESS" | "PROPOSAL_VOTE_DURATION" | "VAULT_USER_COUNT_LIMIT" | "addUserDoneStep1" | "addUserDoneStep2" | "addUserDoneStep3" | "cancelProposal" | "cancelUserToAdd" | "completeVault" | "executeProposal" | "feeContractAddress" | "getProposalCounter" | "getUserToAdd" | "getUserToRemove" | "hasUserConfirmedTransaction" | "initialize" | "messageCount" | "messages" | "messagesSigned" | "preRegister" | "proposalInfos" | "proposalVoteUserInfos" | "proposeTransaction" | "registerAllReshareSteps" | "registerAllSteps" | "submitUserToAdd" | "submitUsersToRotate" | "totalAddUserStep1Done" | "totalAddUserStep2Done" | "totalAddUserStep3Done" | "transactionInfos" | "transactionVotes" | "transactions" | "userConfirmTx" | "userInfos" | "userToAdd" | "userToAddCount" | "userToRemove" | "usersMapping" | "vault" | "vaultInfos" | "voteAgainst" | "voteFor"): FunctionFragment;
    encodeFunctionData(functionFragment: "PROPOSAL_IN_PROCESS", values?: undefined): string;
    encodeFunctionData(functionFragment: "PROPOSAL_VOTE_DURATION", values?: undefined): string;
    encodeFunctionData(functionFragment: "VAULT_USER_COUNT_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "addUserDoneStep1", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep2", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep3", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "cancelProposal", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "cancelUserToAdd", values?: undefined): string;
    encodeFunctionData(functionFragment: "completeVault", values: [PromiseOrValue<string>[], PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "executeProposal", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "feeContractAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "getProposalCounter", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUserToAdd", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUserToRemove", values?: undefined): string;
    encodeFunctionData(functionFragment: "hasUserConfirmedTransaction", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "initialize", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "messageCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "messages", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "messagesSigned", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "preRegister", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "proposalInfos", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "proposalVoteUserInfos", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "proposeTransaction", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "registerAllReshareSteps", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "registerAllSteps", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "submitUserToAdd", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "submitUsersToRotate", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep1Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep2Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep3Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transactionInfos", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transactionVotes", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transactions", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "userConfirmTx", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "userInfos", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "userToAdd", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "userToAddCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "userToRemove", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "usersMapping", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "vault", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultInfos", values?: undefined): string;
    encodeFunctionData(functionFragment: "voteAgainst", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "voteFor", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "PROPOSAL_IN_PROCESS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "PROPOSAL_VOTE_DURATION", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "VAULT_USER_COUNT_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep1", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep3", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelProposal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "completeVault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "executeProposal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeContractAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getProposalCounter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserToRemove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasUserConfirmedTransaction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messageCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messages", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "messagesSigned", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "preRegister", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposalInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposalVoteUserInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "proposeTransaction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAllReshareSteps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAllSteps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitUsersToRotate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep1Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep2Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep3Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactionInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactionVotes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userConfirmTx", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToAddCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToRemove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "usersMapping", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "voteAgainst", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "voteFor", data: BytesLike): Result;
    events: {
        "MessageSigned(uint256,address,string)": EventFragment;
        "MessageToSignProposed(uint256,string)": EventFragment;
        "ProposalCreated(uint256,uint8,bytes)": EventFragment;
        "TransactionProposed(uint256,string,string)": EventFragment;
        "TransactionUserConfirmed(uint256,address,string)": EventFragment;
        "VaultAddUserRequested(address[])": EventFragment;
        "VaultAddUserRequestedEventFromCore(address,address[])": EventFragment;
        "VaultCompleted(address[],address)": EventFragment;
        "VaultNewName(string)": EventFragment;
        "VaultRemoveUserRequested(address)": EventFragment;
        "VaultRotateUserRequested(address,address)": EventFragment;
        "VaultUserAdded(address)": EventFragment;
        "VaultUserInitialized(address)": EventFragment;
        "VaultUserPreRegister(address,string,string,string,string)": EventFragment;
        "VaultUserRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)": EventFragment;
        "VaultUserRemoved(address)": EventFragment;
        "VaultUserReshareRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "MessageSigned"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MessageToSignProposed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ProposalCreated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransactionProposed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransactionUserConfirmed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultAddUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultAddUserRequestedEventFromCore"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultCompleted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultNewName"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultRemoveUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultRotateUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserInitialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserPreRegister"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserRegisteredAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserReshareRegisteredAll"): EventFragment;
}
export interface MessageSignedEventObject {
    messId: BigNumber;
    signer: string;
    signedMessage: string;
}
export type MessageSignedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], MessageSignedEventObject>;
export type MessageSignedEventFilter = TypedEventFilter<MessageSignedEvent>;
export interface MessageToSignProposedEventObject {
    messId: BigNumber;
    message: string;
}
export type MessageToSignProposedEvent = TypedEvent<[
    BigNumber,
    string
], MessageToSignProposedEventObject>;
export type MessageToSignProposedEventFilter = TypedEventFilter<MessageToSignProposedEvent>;
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
export interface TransactionProposedEventObject {
    txId: BigNumber;
    transactionInfo: string;
    notes: string;
}
export type TransactionProposedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], TransactionProposedEventObject>;
export type TransactionProposedEventFilter = TypedEventFilter<TransactionProposedEvent>;
export interface TransactionUserConfirmedEventObject {
    txId: BigNumber;
    user: string;
    signedTransaction: string;
}
export type TransactionUserConfirmedEvent = TypedEvent<[
    BigNumber,
    string,
    string
], TransactionUserConfirmedEventObject>;
export type TransactionUserConfirmedEventFilter = TypedEventFilter<TransactionUserConfirmedEvent>;
export interface VaultAddUserRequestedEventObject {
    userToAdd: string[];
}
export type VaultAddUserRequestedEvent = TypedEvent<[
    string[]
], VaultAddUserRequestedEventObject>;
export type VaultAddUserRequestedEventFilter = TypedEventFilter<VaultAddUserRequestedEvent>;
export interface VaultAddUserRequestedEventFromCoreEventObject {
    vaultAddress: string;
    userToAdd: string[];
}
export type VaultAddUserRequestedEventFromCoreEvent = TypedEvent<[
    string,
    string[]
], VaultAddUserRequestedEventFromCoreEventObject>;
export type VaultAddUserRequestedEventFromCoreEventFilter = TypedEventFilter<VaultAddUserRequestedEventFromCoreEvent>;
export interface VaultCompletedEventObject {
    users: string[];
    _masterPubKey: string;
}
export type VaultCompletedEvent = TypedEvent<[
    string[],
    string
], VaultCompletedEventObject>;
export type VaultCompletedEventFilter = TypedEventFilter<VaultCompletedEvent>;
export interface VaultNewNameEventObject {
    name: string;
}
export type VaultNewNameEvent = TypedEvent<[string], VaultNewNameEventObject>;
export type VaultNewNameEventFilter = TypedEventFilter<VaultNewNameEvent>;
export interface VaultRemoveUserRequestedEventObject {
    userToRemove: string;
}
export type VaultRemoveUserRequestedEvent = TypedEvent<[
    string
], VaultRemoveUserRequestedEventObject>;
export type VaultRemoveUserRequestedEventFilter = TypedEventFilter<VaultRemoveUserRequestedEvent>;
export interface VaultRotateUserRequestedEventObject {
    userToAdd: string;
    userToRemove: string;
}
export type VaultRotateUserRequestedEvent = TypedEvent<[
    string,
    string
], VaultRotateUserRequestedEventObject>;
export type VaultRotateUserRequestedEventFilter = TypedEventFilter<VaultRotateUserRequestedEvent>;
export interface VaultUserAddedEventObject {
    userToAdd: string;
}
export type VaultUserAddedEvent = TypedEvent<[
    string
], VaultUserAddedEventObject>;
export type VaultUserAddedEventFilter = TypedEventFilter<VaultUserAddedEvent>;
export interface VaultUserInitializedEventObject {
    user: string;
}
export type VaultUserInitializedEvent = TypedEvent<[
    string
], VaultUserInitializedEventObject>;
export type VaultUserInitializedEventFilter = TypedEventFilter<VaultUserInitializedEvent>;
export interface VaultUserPreRegisterEventObject {
    user: string;
    _parisEncKey: string;
    _megaPublicKey: string;
    _encSharedKey: string;
    _dbKey: string;
}
export type VaultUserPreRegisterEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string
], VaultUserPreRegisterEventObject>;
export type VaultUserPreRegisterEventFilter = TypedEventFilter<VaultUserPreRegisterEvent>;
export interface VaultUserRegisteredAllEventObject {
    user: string;
    _step1Dealings: string;
    _openingKey: string;
    _openingKappa: string;
    _openingLambda: string;
    _simpleDealingKey: string;
    _simpleDealingKappa: string;
    _transcriptKey: string;
    _transcriptKappa: string;
    _transcriptLambda: string;
    _step3Crypto: string;
}
export type VaultUserRegisteredAllEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
], VaultUserRegisteredAllEventObject>;
export type VaultUserRegisteredAllEventFilter = TypedEventFilter<VaultUserRegisteredAllEvent>;
export interface VaultUserRemovedEventObject {
    userToRemove: string;
}
export type VaultUserRemovedEvent = TypedEvent<[
    string
], VaultUserRemovedEventObject>;
export type VaultUserRemovedEventFilter = TypedEventFilter<VaultUserRemovedEvent>;
export interface VaultUserReshareRegisteredAllEventObject {
    user: string;
    _step1Dealings: string;
    _simpleOpeningKeyResharedOnce: string;
    _pedersenOpeningKappaReshare: string;
    _pedersenOpeningLambdaReshare: string;
    _simpleDealingKeyReshareTwice: string;
    _simpleDealingKappaReshare: string;
    _transcriptKeyResharedOnce: string;
    _transcriptKappaReshare: string;
    _transcriptLambdaReshare: string;
    _step3Stuff: string;
}
export type VaultUserReshareRegisteredAllEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
], VaultUserReshareRegisteredAllEventObject>;
export type VaultUserReshareRegisteredAllEventFilter = TypedEventFilter<VaultUserReshareRegisteredAllEvent>;
export interface Vault extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: VaultInterface;
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
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<[number]>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        feeContractAddress(overrides?: CallOverrides): Promise<[string]>;
        getProposalCounter(overrides?: CallOverrides): Promise<[BigNumber]>;
        getUserToAdd(overrides?: CallOverrides): Promise<[string[]]>;
        getUserToRemove(overrides?: CallOverrides): Promise<[string[]]>;
        hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        messageCount(overrides?: CallOverrides): Promise<[BigNumber]>;
        messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[VaultGovernance.ProposalStructOutput]>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[number]>;
        proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[VaultManager.TransactionStructOutput]>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            boolean,
            boolean
        ] & {
            isPartOfVault: boolean;
            isRegistered: boolean;
        }>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        userToAddCount(overrides?: CallOverrides): Promise<[BigNumber]>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            string,
            boolean,
            number
        ] & {
            userAddress: string;
            isRegistered: boolean;
            index: number;
        }>;
        vault(overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean,
            boolean,
            string,
            string,
            string,
            string
        ] & {
            registeredUsersCount: number;
            rotateThreshold: number;
            transactionThreshold: number;
            adminThreshold: number;
            usersCount: number;
            createdDate: BigNumber;
            createdBlock: BigNumber;
            transactionCount: BigNumber;
            completed: boolean;
            resharingOccurred: boolean;
            encryptionMessage: string;
            seed: string;
            name: string;
            masterPublicKey: string;
        }>;
        vaultInfos(overrides?: CallOverrides): Promise<[VaultManager.VaultStructOutput]>;
        voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<boolean>;
    PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
    VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<number>;
    addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    cancelUserToAdd(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    feeContractAddress(overrides?: CallOverrides): Promise<string>;
    getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
    getUserToAdd(overrides?: CallOverrides): Promise<string[]>;
    getUserToRemove(overrides?: CallOverrides): Promise<string[]>;
    hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    messageCount(overrides?: CallOverrides): Promise<BigNumber>;
    messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        number,
        BigNumber
    ] & {
        votesNeeded: number;
        votesFor: number;
        id: BigNumber;
    }>;
    messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultGovernance.ProposalStructOutput>;
    proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
    proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultManager.TransactionStructOutput>;
    transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        number,
        number,
        BigNumber
    ] & {
        votesNeeded: number;
        votesFor: number;
        id: BigNumber;
    }>;
    userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        boolean,
        boolean
    ] & {
        isPartOfVault: boolean;
        isRegistered: boolean;
    }>;
    userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    userToAddCount(overrides?: CallOverrides): Promise<BigNumber>;
    userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        string,
        boolean,
        number
    ] & {
        userAddress: string;
        isRegistered: boolean;
        index: number;
    }>;
    vault(overrides?: CallOverrides): Promise<[
        number,
        number,
        number,
        number,
        number,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        boolean,
        string,
        string,
        string,
        string
    ] & {
        registeredUsersCount: number;
        rotateThreshold: number;
        transactionThreshold: number;
        adminThreshold: number;
        usersCount: number;
        createdDate: BigNumber;
        createdBlock: BigNumber;
        transactionCount: BigNumber;
        completed: boolean;
        resharingOccurred: boolean;
        encryptionMessage: string;
        seed: string;
        name: string;
        masterPublicKey: string;
    }>;
    vaultInfos(overrides?: CallOverrides): Promise<VaultManager.VaultStructOutput>;
    voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<boolean>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<number>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        cancelUserToAdd(overrides?: CallOverrides): Promise<void>;
        completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        feeContractAddress(overrides?: CallOverrides): Promise<string>;
        getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
        getUserToAdd(overrides?: CallOverrides): Promise<string[]>;
        getUserToRemove(overrides?: CallOverrides): Promise<string[]>;
        hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        messageCount(overrides?: CallOverrides): Promise<BigNumber>;
        messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultGovernance.ProposalStructOutput>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<number>;
        proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<VaultManager.TransactionStructOutput>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            number,
            number,
            BigNumber
        ] & {
            votesNeeded: number;
            votesFor: number;
            id: BigNumber;
        }>;
        userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            boolean,
            boolean
        ] & {
            isPartOfVault: boolean;
            isRegistered: boolean;
        }>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        userToAddCount(overrides?: CallOverrides): Promise<BigNumber>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            string,
            boolean,
            number
        ] & {
            userAddress: string;
            isRegistered: boolean;
            index: number;
        }>;
        vault(overrides?: CallOverrides): Promise<[
            number,
            number,
            number,
            number,
            number,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean,
            boolean,
            string,
            string,
            string,
            string
        ] & {
            registeredUsersCount: number;
            rotateThreshold: number;
            transactionThreshold: number;
            adminThreshold: number;
            usersCount: number;
            createdDate: BigNumber;
            createdBlock: BigNumber;
            transactionCount: BigNumber;
            completed: boolean;
            resharingOccurred: boolean;
            encryptionMessage: string;
            seed: string;
            name: string;
            masterPublicKey: string;
        }>;
        vaultInfos(overrides?: CallOverrides): Promise<VaultManager.VaultStructOutput>;
        voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "MessageSigned(uint256,address,string)"(messId?: null, signer?: null, signedMessage?: null): MessageSignedEventFilter;
        MessageSigned(messId?: null, signer?: null, signedMessage?: null): MessageSignedEventFilter;
        "MessageToSignProposed(uint256,string)"(messId?: null, message?: null): MessageToSignProposedEventFilter;
        MessageToSignProposed(messId?: null, message?: null): MessageToSignProposedEventFilter;
        "ProposalCreated(uint256,uint8,bytes)"(id?: PromiseOrValue<BigNumberish> | null, _type?: null, data?: null): ProposalCreatedEventFilter;
        ProposalCreated(id?: PromiseOrValue<BigNumberish> | null, _type?: null, data?: null): ProposalCreatedEventFilter;
        "TransactionProposed(uint256,string,string)"(txId?: PromiseOrValue<BigNumberish> | null, transactionInfo?: null, notes?: null): TransactionProposedEventFilter;
        TransactionProposed(txId?: PromiseOrValue<BigNumberish> | null, transactionInfo?: null, notes?: null): TransactionProposedEventFilter;
        "TransactionUserConfirmed(uint256,address,string)"(txId?: PromiseOrValue<BigNumberish> | null, user?: PromiseOrValue<string> | null, signedTransaction?: null): TransactionUserConfirmedEventFilter;
        TransactionUserConfirmed(txId?: PromiseOrValue<BigNumberish> | null, user?: PromiseOrValue<string> | null, signedTransaction?: null): TransactionUserConfirmedEventFilter;
        "VaultAddUserRequested(address[])"(userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFilter;
        VaultAddUserRequested(userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFilter;
        "VaultAddUserRequestedEventFromCore(address,address[])"(vaultAddress?: null, userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFromCoreEventFilter;
        VaultAddUserRequestedEventFromCore(vaultAddress?: null, userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFromCoreEventFilter;
        "VaultCompleted(address[],address)"(users?: null, _masterPubKey?: null): VaultCompletedEventFilter;
        VaultCompleted(users?: null, _masterPubKey?: null): VaultCompletedEventFilter;
        "VaultNewName(string)"(name?: null): VaultNewNameEventFilter;
        VaultNewName(name?: null): VaultNewNameEventFilter;
        "VaultRemoveUserRequested(address)"(userToRemove?: PromiseOrValue<string> | null): VaultRemoveUserRequestedEventFilter;
        VaultRemoveUserRequested(userToRemove?: PromiseOrValue<string> | null): VaultRemoveUserRequestedEventFilter;
        "VaultRotateUserRequested(address,address)"(userToAdd?: PromiseOrValue<string> | null, userToRemove?: PromiseOrValue<string> | null): VaultRotateUserRequestedEventFilter;
        VaultRotateUserRequested(userToAdd?: PromiseOrValue<string> | null, userToRemove?: PromiseOrValue<string> | null): VaultRotateUserRequestedEventFilter;
        "VaultUserAdded(address)"(userToAdd?: null): VaultUserAddedEventFilter;
        VaultUserAdded(userToAdd?: null): VaultUserAddedEventFilter;
        "VaultUserInitialized(address)"(user?: PromiseOrValue<string> | null): VaultUserInitializedEventFilter;
        VaultUserInitialized(user?: PromiseOrValue<string> | null): VaultUserInitializedEventFilter;
        "VaultUserPreRegister(address,string,string,string,string)"(user?: PromiseOrValue<string> | null, _parisEncKey?: null, _megaPublicKey?: null, _encSharedKey?: null, _dbKey?: null): VaultUserPreRegisterEventFilter;
        VaultUserPreRegister(user?: PromiseOrValue<string> | null, _parisEncKey?: null, _megaPublicKey?: null, _encSharedKey?: null, _dbKey?: null): VaultUserPreRegisterEventFilter;
        "VaultUserRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)"(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _openingKey?: null, _openingKappa?: null, _openingLambda?: null, _simpleDealingKey?: null, _simpleDealingKappa?: null, _transcriptKey?: null, _transcriptKappa?: null, _transcriptLambda?: null, _step3Crypto?: null): VaultUserRegisteredAllEventFilter;
        VaultUserRegisteredAll(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _openingKey?: null, _openingKappa?: null, _openingLambda?: null, _simpleDealingKey?: null, _simpleDealingKappa?: null, _transcriptKey?: null, _transcriptKappa?: null, _transcriptLambda?: null, _step3Crypto?: null): VaultUserRegisteredAllEventFilter;
        "VaultUserRemoved(address)"(userToRemove?: null): VaultUserRemovedEventFilter;
        VaultUserRemoved(userToRemove?: null): VaultUserRemovedEventFilter;
        "VaultUserReshareRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)"(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _simpleOpeningKeyResharedOnce?: null, _pedersenOpeningKappaReshare?: null, _pedersenOpeningLambdaReshare?: null, _simpleDealingKeyReshareTwice?: null, _simpleDealingKappaReshare?: null, _transcriptKeyResharedOnce?: null, _transcriptKappaReshare?: null, _transcriptLambdaReshare?: null, _step3Stuff?: null): VaultUserReshareRegisteredAllEventFilter;
        VaultUserReshareRegisteredAll(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _simpleOpeningKeyResharedOnce?: null, _pedersenOpeningKappaReshare?: null, _pedersenOpeningLambdaReshare?: null, _simpleDealingKeyReshareTwice?: null, _simpleDealingKappaReshare?: null, _transcriptKeyResharedOnce?: null, _transcriptKappaReshare?: null, _transcriptLambdaReshare?: null, _step3Stuff?: null): VaultUserReshareRegisteredAllEventFilter;
    };
    estimateGas: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<BigNumber>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<BigNumber>;
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        feeContractAddress(overrides?: CallOverrides): Promise<BigNumber>;
        getProposalCounter(overrides?: CallOverrides): Promise<BigNumber>;
        getUserToAdd(overrides?: CallOverrides): Promise<BigNumber>;
        getUserToRemove(overrides?: CallOverrides): Promise<BigNumber>;
        hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        messageCount(overrides?: CallOverrides): Promise<BigNumber>;
        messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        userToAddCount(overrides?: CallOverrides): Promise<BigNumber>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        vault(overrides?: CallOverrides): Promise<BigNumber>;
        vaultInfos(overrides?: CallOverrides): Promise<BigNumber>;
        voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        PROPOSAL_IN_PROCESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        PROPOSAL_VOTE_DURATION(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        completeVault(userAddresses: PromiseOrValue<string>[], masterPubKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        executeProposal(proposalId: PromiseOrValue<BigNumberish>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        feeContractAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getProposalCounter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUserToAdd(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUserToRemove(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hasUserConfirmedTransaction(txId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        initialize(proposedAddresses: PromiseOrValue<string>[], rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, encryptionMessage: PromiseOrValue<BytesLike>, seed: PromiseOrValue<string>, name: PromiseOrValue<BytesLike>, feeContract: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        messageCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        messages(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        messagesSigned(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        preRegister(_parisEncKey: PromiseOrValue<string>, _megaPublicKey: PromiseOrValue<string>, _encSharedKey: PromiseOrValue<string>, _dbKey: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        proposalInfos(proposalId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proposalVoteUserInfos(proposalId: PromiseOrValue<BigNumberish>, user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        proposeTransaction(transactionInfo: PromiseOrValue<string>, notes: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        registerAllSteps(step1Dealings: PromiseOrValue<string>, openingKey: PromiseOrValue<string>, openingKappa: PromiseOrValue<string>, openingLambda: PromiseOrValue<string>, simpleDealingKey: PromiseOrValue<string>, simpleDealingKappa: PromiseOrValue<string>, transcriptKey: PromiseOrValue<string>, transcriptKappa: PromiseOrValue<string>, transcriptLambda: PromiseOrValue<string>, step3Crypto: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactionInfos(txId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userConfirmTx(txId: PromiseOrValue<BigNumberish>, signedTransaction: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToAddCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        vaultInfos(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        voteAgainst(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        voteFor(proposalId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
