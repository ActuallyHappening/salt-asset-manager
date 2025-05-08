import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace VaultManager {
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
export interface VaultManagerInterface extends utils.Interface {
    functions: {
        "VAULT_USER_COUNT_LIMIT()": FunctionFragment;
        "transactionVotes(uint256,address)": FunctionFragment;
        "transactions(uint256)": FunctionFragment;
        "userInfos(address)": FunctionFragment;
        "usersMapping(address)": FunctionFragment;
        "vault()": FunctionFragment;
        "vaultInfos()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "VAULT_USER_COUNT_LIMIT" | "transactionVotes" | "transactions" | "userInfos" | "usersMapping" | "vault" | "vaultInfos"): FunctionFragment;
    encodeFunctionData(functionFragment: "VAULT_USER_COUNT_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "transactionVotes", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transactions", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "userInfos", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "usersMapping", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "vault", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultInfos", values?: undefined): string;
    decodeFunctionResult(functionFragment: "VAULT_USER_COUNT_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactionVotes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "usersMapping", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultInfos", data: BytesLike): Result;
    events: {
        "TransactionProposed(uint256,string,string)": EventFragment;
        "TransactionUserConfirmed(uint256,address,string)": EventFragment;
        "VaultCompleted(address[],address)": EventFragment;
        "VaultNewName(string)": EventFragment;
        "VaultUserInitialized(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "TransactionProposed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransactionUserConfirmed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultCompleted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultNewName"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserInitialized"): EventFragment;
}
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
export interface VaultUserInitializedEventObject {
    user: string;
}
export type VaultUserInitializedEvent = TypedEvent<[
    string
], VaultUserInitializedEventObject>;
export type VaultUserInitializedEventFilter = TypedEventFilter<VaultUserInitializedEvent>;
export interface VaultManager extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: VaultManagerInterface;
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
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<[number]>;
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
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            boolean,
            boolean
        ] & {
            isPartOfVault: boolean;
            isRegistered: boolean;
        }>;
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
    };
    VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<number>;
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
    userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
        boolean,
        boolean
    ] & {
        isPartOfVault: boolean;
        isRegistered: boolean;
    }>;
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
    callStatic: {
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<number>;
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
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[
            boolean,
            boolean
        ] & {
            isPartOfVault: boolean;
            isRegistered: boolean;
        }>;
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
    };
    filters: {
        "TransactionProposed(uint256,string,string)"(txId?: PromiseOrValue<BigNumberish> | null, transactionInfo?: null, notes?: null): TransactionProposedEventFilter;
        TransactionProposed(txId?: PromiseOrValue<BigNumberish> | null, transactionInfo?: null, notes?: null): TransactionProposedEventFilter;
        "TransactionUserConfirmed(uint256,address,string)"(txId?: PromiseOrValue<BigNumberish> | null, user?: PromiseOrValue<string> | null, signedTransaction?: null): TransactionUserConfirmedEventFilter;
        TransactionUserConfirmed(txId?: PromiseOrValue<BigNumberish> | null, user?: PromiseOrValue<string> | null, signedTransaction?: null): TransactionUserConfirmedEventFilter;
        "VaultCompleted(address[],address)"(users?: null, _masterPubKey?: null): VaultCompletedEventFilter;
        VaultCompleted(users?: null, _masterPubKey?: null): VaultCompletedEventFilter;
        "VaultNewName(string)"(name?: null): VaultNewNameEventFilter;
        VaultNewName(name?: null): VaultNewNameEventFilter;
        "VaultUserInitialized(address)"(user?: PromiseOrValue<string> | null): VaultUserInitializedEventFilter;
        VaultUserInitialized(user?: PromiseOrValue<string> | null): VaultUserInitializedEventFilter;
    };
    estimateGas: {
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        vault(overrides?: CallOverrides): Promise<BigNumber>;
        vaultInfos(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        vaultInfos(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
