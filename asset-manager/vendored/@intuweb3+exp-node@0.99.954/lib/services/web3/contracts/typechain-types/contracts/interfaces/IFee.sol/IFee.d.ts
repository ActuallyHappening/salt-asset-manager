import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "../../../common";
export interface IFeeInterface extends utils.Interface {
    functions: {
        "getCreationFeeARB()": FunctionFragment;
        "getCreationFeeETH()": FunctionFragment;
        "getCreationFeeUSDC()": FunctionFragment;
        "getFeeCollectorAddress()": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "getCreationFeeARB" | "getCreationFeeETH" | "getCreationFeeUSDC" | "getFeeCollectorAddress"): FunctionFragment;
    encodeFunctionData(functionFragment: "getCreationFeeARB", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCreationFeeETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCreationFeeUSDC", values?: undefined): string;
    encodeFunctionData(functionFragment: "getFeeCollectorAddress", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getCreationFeeARB", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCreationFeeETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCreationFeeUSDC", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getFeeCollectorAddress", data: BytesLike): Result;
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
        getCreationFeeARB(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCreationFeeETH(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCreationFeeUSDC(overrides?: CallOverrides): Promise<[BigNumber]>;
        getFeeCollectorAddress(overrides?: CallOverrides): Promise<[string]>;
    };
    getCreationFeeARB(overrides?: CallOverrides): Promise<BigNumber>;
    getCreationFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
    getCreationFeeUSDC(overrides?: CallOverrides): Promise<BigNumber>;
    getFeeCollectorAddress(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        getCreationFeeARB(overrides?: CallOverrides): Promise<BigNumber>;
        getCreationFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
        getCreationFeeUSDC(overrides?: CallOverrides): Promise<BigNumber>;
        getFeeCollectorAddress(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        getCreationFeeARB(overrides?: CallOverrides): Promise<BigNumber>;
        getCreationFeeETH(overrides?: CallOverrides): Promise<BigNumber>;
        getCreationFeeUSDC(overrides?: CallOverrides): Promise<BigNumber>;
        getFeeCollectorAddress(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getCreationFeeARB(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCreationFeeETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCreationFeeUSDC(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getFeeCollectorAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
