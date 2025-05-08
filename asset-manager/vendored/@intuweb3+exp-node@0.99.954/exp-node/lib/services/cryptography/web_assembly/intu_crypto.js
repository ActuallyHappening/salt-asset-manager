import * as wasm from "./intu_crypto_bg.wasm";
export * from "./intu_crypto_bg.js";
import { __wbg_set_wasm } from "./intu_crypto_bg.js";
__wbg_set_wasm(wasm);
