import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
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
export interface VaultAddUserInterface extends utils.Interface {
    functions: {
        "VAULT_USER_COUNT_LIMIT()": FunctionFragment;
        "addUserDoneStep1(address,uint256)": FunctionFragment;
        "addUserDoneStep2(address,uint256)": FunctionFragment;
        "addUserDoneStep3(address,uint256)": FunctionFragment;
        "cancelUserToAdd()": FunctionFragment;
        "getUserToAdd()": FunctionFragment;
        "getUserToRemove()": FunctionFragment;
        "registerAllReshareSteps(string,string,string,string,string,string,string,string,string,string)": FunctionFragment;
        "submitUserToAdd(address[])": FunctionFragment;
        "submitUsersToRotate(address,address)": FunctionFragment;
        "totalAddUserStep1Done(uint256)": FunctionFragment;
        "totalAddUserStep2Done(uint256)": FunctionFragment;
        "totalAddUserStep3Done(uint256)": FunctionFragment;
        "transactionVotes(uint256,address)": FunctionFragment;
        "transactions(uint256)": FunctionFragment;
        "userInfos(address)": FunctionFragment;
        "userToAdd(uint256)": FunctionFragment;
        "userToAddCount()": FunctionFragment;
        "userToRemove(uint256)": FunctionFragment;
        "usersMapping(address)": FunctionFragment;
        "vault()": FunctionFragment;
        "vaultInfos()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "VAULT_USER_COUNT_LIMIT" | "addUserDoneStep1" | "addUserDoneStep2" | "addUserDoneStep3" | "cancelUserToAdd" | "getUserToAdd" | "getUserToRemove" | "registerAllReshareSteps" | "submitUserToAdd" | "submitUsersToRotate" | "totalAddUserStep1Done" | "totalAddUserStep2Done" | "totalAddUserStep3Done" | "transactionVotes" | "transactions" | "userInfos" | "userToAdd" | "userToAddCount" | "userToRemove" | "usersMapping" | "vault" | "vaultInfos"): FunctionFragment;
    encodeFunctionData(functionFragment: "VAULT_USER_COUNT_LIMIT", values?: undefined): string;
    encodeFunctionData(functionFragment: "addUserDoneStep1", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep2", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "addUserDoneStep3", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "cancelUserToAdd", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUserToAdd", values?: undefined): string;
    encodeFunctionData(functionFragment: "getUserToRemove", values?: undefined): string;
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
    encodeFunctionData(functionFragment: "submitUserToAdd", values: [PromiseOrValue<string>[]]): string;
    encodeFunctionData(functionFragment: "submitUsersToRotate", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep1Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep2Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalAddUserStep3Done", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transactionVotes", values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "transactions", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "userInfos", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "userToAdd", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "userToAddCount", values?: undefined): string;
    encodeFunctionData(functionFragment: "userToRemove", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "usersMapping", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "vault", values?: undefined): string;
    encodeFunctionData(functionFragment: "vaultInfos", values?: undefined): string;
    decodeFunctionResult(functionFragment: "VAULT_USER_COUNT_LIMIT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep1", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep2", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addUserDoneStep3", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getUserToRemove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerAllReshareSteps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitUserToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "submitUsersToRotate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep1Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep2Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalAddUserStep3Done", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactionVotes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transactions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userInfos", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToAdd", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToAddCount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "userToRemove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "usersMapping", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vaultInfos", data: BytesLike): Result;
    events: {
        "TransactionProposed(uint256,string,string)": EventFragment;
        "TransactionUserConfirmed(uint256,address,string)": EventFragment;
        "VaultAddUserRequested(address[])": EventFragment;
        "VaultCompleted(address[],address)": EventFragment;
        "VaultNewName(string)": EventFragment;
        "VaultRemoveUserRequested(address)": EventFragment;
        "VaultRotateUserRequested(address,address)": EventFragment;
        "VaultUserAdded(address)": EventFragment;
        "VaultUserInitialized(address)": EventFragment;
        "VaultUserRemoved(address)": EventFragment;
        "VaultUserReshareRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "TransactionProposed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "TransactionUserConfirmed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultAddUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultCompleted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultNewName"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultRemoveUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultRotateUserRequested"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserAdded"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserInitialized"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserRemoved"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "VaultUserReshareRegisteredAll"): EventFragment;
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
export interface VaultAddUserRequestedEventObject {
    userToAdd: string[];
}
export type VaultAddUserRequestedEvent = TypedEvent<[
    string[]
], VaultAddUserRequestedEventObject>;
export type VaultAddUserRequestedEventFilter = TypedEventFilter<VaultAddUserRequestedEvent>;
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
export interface VaultAddUser extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: VaultAddUserInterface;
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
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getUserToAdd(overrides?: CallOverrides): Promise<[string[]]>;
        getUserToRemove(overrides?: CallOverrides): Promise<[string[]]>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
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
    };
    VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<number>;
    addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    cancelUserToAdd(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getUserToAdd(overrides?: CallOverrides): Promise<string[]>;
    getUserToRemove(overrides?: CallOverrides): Promise<string[]>;
    registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
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
    callStatic: {
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<number>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        cancelUserToAdd(overrides?: CallOverrides): Promise<void>;
        getUserToAdd(overrides?: CallOverrides): Promise<string[]>;
        getUserToRemove(overrides?: CallOverrides): Promise<string[]>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        submitUserToAdd(usersToAdd: PromiseOrValue<string>[], overrides?: CallOverrides): Promise<void>;
        submitUsersToRotate(addUser: PromiseOrValue<string>, removeUser: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        totalAddUserStep1Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep2Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        totalAddUserStep3Done(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
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
    };
    filters: {
        "TransactionProposed(uint256,string,string)"(txId?: PromiseOrValue<BigNumberish> | null, transactionInfo?: null, notes?: null): TransactionProposedEventFilter;
        TransactionProposed(txId?: PromiseOrValue<BigNumberish> | null, transactionInfo?: null, notes?: null): TransactionProposedEventFilter;
        "TransactionUserConfirmed(uint256,address,string)"(txId?: PromiseOrValue<BigNumberish> | null, user?: PromiseOrValue<string> | null, signedTransaction?: null): TransactionUserConfirmedEventFilter;
        TransactionUserConfirmed(txId?: PromiseOrValue<BigNumberish> | null, user?: PromiseOrValue<string> | null, signedTransaction?: null): TransactionUserConfirmedEventFilter;
        "VaultAddUserRequested(address[])"(userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFilter;
        VaultAddUserRequested(userToAdd?: PromiseOrValue<string>[] | null): VaultAddUserRequestedEventFilter;
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
        "VaultUserRemoved(address)"(userToRemove?: null): VaultUserRemovedEventFilter;
        VaultUserRemoved(userToRemove?: null): VaultUserRemovedEventFilter;
        "VaultUserReshareRegisteredAll(address,string,string,string,string,string,string,string,string,string,string)"(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _simpleOpeningKeyResharedOnce?: null, _pedersenOpeningKappaReshare?: null, _pedersenOpeningLambdaReshare?: null, _simpleDealingKeyReshareTwice?: null, _simpleDealingKappaReshare?: null, _transcriptKeyResharedOnce?: null, _transcriptKappaReshare?: null, _transcriptLambdaReshare?: null, _step3Stuff?: null): VaultUserReshareRegisteredAllEventFilter;
        VaultUserReshareRegisteredAll(user?: PromiseOrValue<string> | null, _step1Dealings?: null, _simpleOpeningKeyResharedOnce?: null, _pedersenOpeningKappaReshare?: null, _pedersenOpeningLambdaReshare?: null, _simpleDealingKeyReshareTwice?: null, _simpleDealingKappaReshare?: null, _transcriptKeyResharedOnce?: null, _transcriptKappaReshare?: null, _transcriptLambdaReshare?: null, _step3Stuff?: null): VaultUserReshareRegisteredAllEventFilter;
    };
    estimateGas: {
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getUserToAdd(overrides?: CallOverrides): Promise<BigNumber>;
        getUserToRemove(overrides?: CallOverrides): Promise<BigNumber>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
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
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        userToAddCount(overrides?: CallOverrides): Promise<BigNumber>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        vault(overrides?: CallOverrides): Promise<BigNumber>;
        vaultInfos(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        VAULT_USER_COUNT_LIMIT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep1(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep2(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addUserDoneStep3(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelUserToAdd(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getUserToAdd(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getUserToRemove(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registerAllReshareSteps(_step1Dealings: PromiseOrValue<string>, _simpleOpeningKeyResharedOnce: PromiseOrValue<string>, _pedersenOpeningKappaReshare: PromiseOrValue<string>, _pedersenOpeningLambdaReshare: PromiseOrValue<string>, _simpleDealingKeyReshareTwice: PromiseOrValue<string>, _simpleDealingKappaReshare: PromiseOrValue<string>, _transcriptKeyResharedOnce: PromiseOrValue<string>, _transcriptKappaReshare: PromiseOrValue<string>, _transcriptLambdaReshare: PromiseOrValue<string>, _step3Stuff: PromiseOrValue<string>, overrides?: Overrides & {
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
        transactionVotes(arg0: PromiseOrValue<BigNumberish>, arg1: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transactions(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userInfos(user: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToAdd(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToAddCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        userToRemove(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        usersMapping(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        vault(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        vaultInfos(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
