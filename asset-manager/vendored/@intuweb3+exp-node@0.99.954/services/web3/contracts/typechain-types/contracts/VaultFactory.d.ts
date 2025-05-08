import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../common";
export interface VaultFactoryInterface extends utils.Interface {
    functions: {
        "createVault(address[],bytes32,uint8,uint8,uint8,bytes32,string)": FunctionFragment;
        "feeContractAddress()": FunctionFragment;
        "impl()": FunctionFragment;
        "managerAddress()": FunctionFragment;
        "paused()": FunctionFragment;
        "setPaused(bool)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "createVault" | "feeContractAddress" | "impl" | "managerAddress" | "paused" | "setPaused"): FunctionFragment;
    encodeFunctionData(functionFragment: "createVault", values: [
        PromiseOrValue<string>[],
        PromiseOrValue<BytesLike>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "feeContractAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "impl", values?: undefined): string;
    encodeFunctionData(functionFragment: "managerAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "setPaused", values: [PromiseOrValue<boolean>]): string;
    decodeFunctionResult(functionFragment: "createVault", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeContractAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "impl", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "managerAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPaused", data: BytesLike): Result;
    events: {
        "VaultCreated(address,address[],bytes32,bytes32,string)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "VaultCreated"): EventFragment;
}
export interface VaultCreatedEventObject {
    vaultAddress: string;
    _proposedAddresses: string[];
    name: string;
    _encryptionMessage: string;
    _seed: string;
}
export type VaultCreatedEvent = TypedEvent<[
    string,
    string[],
    string,
    string,
    string
], VaultCreatedEventObject>;
export type VaultCreatedEventFilter = TypedEventFilter<VaultCreatedEvent>;
export interface VaultFactory extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: VaultFactoryInterface;
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
        createVault(_proposedAddresses: PromiseOrValue<string>[], vaultName: PromiseOrValue<BytesLike>, rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, _encryptionMessage: PromiseOrValue<BytesLike>, _seed: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        feeContractAddress(overrides?: CallOverrides): Promise<[string]>;
        impl(overrides?: CallOverrides): Promise<[string]>;
        managerAddress(overrides?: CallOverrides): Promise<[string]>;
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        setPaused(_paused: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    createVault(_proposedAddresses: PromiseOrValue<string>[], vaultName: PromiseOrValue<BytesLike>, rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, _encryptionMessage: PromiseOrValue<BytesLike>, _seed: PromiseOrValue<string>, overrides?: PayableOverrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    feeContractAddress(overrides?: CallOverrides): Promise<string>;
    impl(overrides?: CallOverrides): Promise<string>;
    managerAddress(overrides?: CallOverrides): Promise<string>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    setPaused(_paused: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        createVault(_proposedAddresses: PromiseOrValue<string>[], vaultName: PromiseOrValue<BytesLike>, rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, _encryptionMessage: PromiseOrValue<BytesLike>, _seed: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        feeContractAddress(overrides?: CallOverrides): Promise<string>;
        impl(overrides?: CallOverrides): Promise<string>;
        managerAddress(overrides?: CallOverrides): Promise<string>;
        paused(overrides?: CallOverrides): Promise<boolean>;
        setPaused(_paused: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "VaultCreated(address,address[],bytes32,bytes32,string)"(vaultAddress?: PromiseOrValue<string> | null, _proposedAddresses?: null, name?: null, _encryptionMessage?: null, _seed?: null): VaultCreatedEventFilter;
        VaultCreated(vaultAddress?: PromiseOrValue<string> | null, _proposedAddresses?: null, name?: null, _encryptionMessage?: null, _seed?: null): VaultCreatedEventFilter;
    };
    estimateGas: {
        createVault(_proposedAddresses: PromiseOrValue<string>[], vaultName: PromiseOrValue<BytesLike>, rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, _encryptionMessage: PromiseOrValue<BytesLike>, _seed: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        feeContractAddress(overrides?: CallOverrides): Promise<BigNumber>;
        impl(overrides?: CallOverrides): Promise<BigNumber>;
        managerAddress(overrides?: CallOverrides): Promise<BigNumber>;
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        setPaused(_paused: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        createVault(_proposedAddresses: PromiseOrValue<string>[], vaultName: PromiseOrValue<BytesLike>, rotateThreshold: PromiseOrValue<BigNumberish>, transactionThreshold: PromiseOrValue<BigNumberish>, adminThreshold: PromiseOrValue<BigNumberish>, _encryptionMessage: PromiseOrValue<BytesLike>, _seed: PromiseOrValue<string>, overrides?: PayableOverrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        feeContractAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        impl(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        managerAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setPaused(_paused: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}
