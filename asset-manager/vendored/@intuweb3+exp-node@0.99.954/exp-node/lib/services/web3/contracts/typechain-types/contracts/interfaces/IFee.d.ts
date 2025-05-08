import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../common";
export interface IFeeInterface extends utils.Interface {
    functions: {
        "getCreationFeeETH()": FunctionFragment;
        "getCreationFeeXFI()": FunctionFragment;
        "getFeeCollectorAddress()": FunctionFragment;
        "getTransactionFeeETH()": FunctionFragment;
        "getTransactionFeeXFI()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getCreationFeeETH" | "getCreationFeeXFI" | "getFeeCollectorAddress" | "getTransactionFeeETH" | "getTransactionFeeXFI"): FunctionFragment;
    encodeFunctionData(functionFragment: "getCreationFeeETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCreationFeeXFI", values?: undefined): string;
    encodeFunctionData(functionFragment: "getFeeCollectorAddress", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTransactionFeeETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "getTransactionFeeXFI", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getCreationFeeETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCreationFeeXFI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFeeCollectorAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTransactionFeeETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTransactionFeeXFI", data: BytesLike): Result;
    events: {};
}
export interface IFee extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IFeeInterface;
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
        getCreationFeeETH(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCreationFeeXFI(overrides?: CallOverrides): Promise<[BigNumber]>;
        getFeeCollectorAddress(overrides?: CallOverrides): Promise<[string]>;
        getTransactionFeeETH(overrides?: CallOverrides): Promise<[BigNumber]>;
        getTransactionFeeXFI(overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    getCreationFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
    getCreationFeeXFI(overrides?: CallOverrides): Promise<BigNumber>;
    getFeeCollectorAddress(overrides?: CallOverrides): Promise<string>;
    getTransactionFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
    getTransactionFeeXFI(overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        getCreationFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
        getCreationFeeXFI(overrides?: CallOverrides): Promise<BigNumber>;
        getFeeCollectorAddress(overrides?: CallOverrides): Promise<string>;
        getTransactionFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
        getTransactionFeeXFI(overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        getCreationFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
        getCreationFeeXFI(overrides?: CallOverrides): Promise<BigNumber>;
        getFeeCollectorAddress(overrides?: CallOverrides): Promise<BigNumber>;
        getTransactionFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
        getTransactionFeeXFI(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getCreationFeeETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCreationFeeXFI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getFeeCollectorAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTransactionFeeETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTransactionFeeXFI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
