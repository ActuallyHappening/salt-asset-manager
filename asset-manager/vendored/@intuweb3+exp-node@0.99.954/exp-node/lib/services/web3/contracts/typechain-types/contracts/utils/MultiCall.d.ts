import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";
export declare namespace MultiCall {
    type CallStruct = {
        target: PromiseOrValue<string>;
        callData: PromiseOrValue<BytesLike>;
    };
    type CallStructOutput = [string, string] & {
        target: string;
        callData: string;
    };
}
export interface MultiCallInterface extends utils.Interface {
    functions: {
        "aggregate((address,bytes)[])": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "aggregate"): FunctionFragment;
    encodeFunctionData(functionFragment: "aggregate", values: [MultiCall.CallStruct[]]): string;
    decodeFunctionResult(functionFragment: "aggregate", data: BytesLike): Result;
    events: {};
}
export interface MultiCall extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MultiCallInterface;
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
        aggregate(calls: MultiCall.CallStruct[], overrides?: CallOverrides): Promise<[
            BigNumber,
            string[]
        ] & {
            blockNumber: BigNumber;
            returnData: string[];
        }>;
    };
    aggregate(calls: MultiCall.CallStruct[], overrides?: CallOverrides): Promise<[
        BigNumber,
        string[]
    ] & {
        blockNumber: BigNumber;
        returnData: string[];
    }>;
    callStatic: {
        aggregate(calls: MultiCall.CallStruct[], overrides?: CallOverrides): Promise<[
            BigNumber,
            string[]
        ] & {
            blockNumber: BigNumber;
            returnData: string[];
        }>;
    };
    filters: {};
    estimateGas: {
        aggregate(calls: MultiCall.CallStruct[], overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        aggregate(calls: MultiCall.CallStruct[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
