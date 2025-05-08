let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}
const heap = new Array(128).fill(undefined);
heap.push(undefined, null, true, false);
function getObject(idx) { return heap[idx]; }
let heap_next = heap.length;
function addHeapObject(obj) {
    if (heap_next === heap.length)
        heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
}
function handleError(f, args) {
    try {
        return f.apply(this, args);
    }
    catch (e) {
        wasm.__wbindgen_export_0(addHeapObject(e));
    }
}
const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function dropObject(idx) {
    if (idx < 132)
        return;
    heap[idx] = heap_next;
    heap_next = idx;
}
function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}
function isLikeNone(x) {
    return x === undefined || x === null;
}
let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}
function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        }
        else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        }
        else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for (let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    }
    else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        }
        catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
let WASM_VECTOR_LEN = 0;
const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;
let cachedTextEncoder = new lTextEncoder('utf-8');
const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });
function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }
    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;
    const mem = getUint8ArrayMemory0();
    let offset = 0;
    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F)
            break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
 * Returns a dealing for a single user. User only needs to share the list of mega public keys.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `mega_pk_list` - list of all the megaPublicKeys generated from the register function
 * # Returns
 * dealing for a user
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} mega_pk_list
 * @returns {any}
 */
export function compute_pedersen_dealing(seed, threshold, index, mega_pk_list) {
    const ret = wasm.compute_pedersen_dealing(addHeapObject(seed), addHeapObject(threshold), addHeapObject(index), addHeapObject(mega_pk_list));
    return takeObject(ret);
}
/**
 * Returns a opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `dealings_array` - List of dealers
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} dealings_array
 * @returns {any}
 */
export function compute_pedersen_opening(seed, threshold, index, encryption_signature, mega_sk, dealings_array) {
    const ret = wasm.compute_pedersen_opening(addHeapObject(seed), addHeapObject(threshold), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_sk), addHeapObject(dealings_array));
    return takeObject(ret);
}
/**
 * Generate a simple dealing for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_pk_list` - Signature of the unique vault message, retrieved from the smart contract
 * * `opening` - User's opening from compute_opening function
 * * `is_reshare` - If this function should act as reshare of unmasked
 * # Returns
 * unmasked dealing
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_pk_list
 * @param {any} opening
 * @returns {any}
 */
export function compute_simple_dealing(seed, threshold, index, encryption_signature, mega_pk_list, opening) {
    const ret = wasm.compute_simple_dealing(addHeapObject(seed), addHeapObject(threshold), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_pk_list), addHeapObject(opening));
    return takeObject(ret);
}
/**
 * Returns a opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `pedersen_dealings` - List of first-step dealings
 * * `simple_dealings` - List of newer dealings
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} simple_dealings
 * @param {any} pedersen_transcript
 * @returns {any}
 */
export function compute_simple_opening(seed, threshold, index, encryption_signature, mega_sk, simple_dealings, pedersen_transcript) {
    const ret = wasm.compute_simple_opening(addHeapObject(seed), addHeapObject(threshold), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_sk), addHeapObject(simple_dealings), addHeapObject(pedersen_transcript));
    return takeObject(ret);
}
/**
 * Multiply function for a dealing
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_pk_list` - Signature of the unique vault message, retrieved from the smart contract
 * * `simple_openings` - User's opening from compute_opening function
 * * `pedersen_openings` - User's opening from compute_opening function
 * * `dealings_array` - List of dealers
 * # Returns
 * IDkgDealingInternal
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_pk_list
 * @param {any} simple_opening
 * @param {any} pedersen_opening
 * @returns {any}
 */
export function compute_multiply_dealing(seed, threshold, index, encryption_signature, mega_pk_list, simple_opening, pedersen_opening) {
    const ret = wasm.compute_multiply_dealing(addHeapObject(seed), addHeapObject(threshold), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_pk_list), addHeapObject(simple_opening), addHeapObject(pedersen_opening));
    return takeObject(ret);
}
/**
 * Returns a multiplied opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `dealings_unmasked` - List of first-step dealings
 * * `dealings_lambda` - List of newer dealings
 * * `old_dealings_unmasked` - List of newer dealings
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} list_multiply_dealer
 * @param {any} transcript_key_or_kappa
 * @param {any} transcript_lambda
 * @returns {any}
 */
export function compute_multiply_opening(seed, threshold, index, encryption_signature, mega_sk, list_multiply_dealer, transcript_key_or_kappa, transcript_lambda) {
    const ret = wasm.compute_multiply_opening(addHeapObject(seed), addHeapObject(threshold), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_sk), addHeapObject(list_multiply_dealer), addHeapObject(transcript_key_or_kappa), addHeapObject(transcript_lambda));
    return takeObject(ret);
}
/**
 * Generate a reshared single dealing for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `opening` - User's opening from compute_opening function
 * # Returns
 * masked dealing
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_pk_list
 * @param {any} opening
 * @returns {any}
 */
export function compute_simple_dealing_reshare(seed, threshold, index, encryption_signature, mega_pk_list, opening) {
    const ret = wasm.compute_simple_dealing_reshare(addHeapObject(seed), addHeapObject(threshold), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_pk_list), addHeapObject(opening));
    return takeObject(ret);
}
/**
 * Returns a opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `old_threshold` - Signing threshold value retrieved from the previous DKG
 * * `new_threshold` - Signing threshold value retrieved from the newly proposed DKG
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `masked` - True is this is masked dealing. False if not.
 * * `certificate_list` - list of the certificates posted by the dealers, from the BLS signing
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold_reshare
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} simple_dealings_key_reshared_once_or_twice
 * @param {any} transcript_key_simple_or_reshared_once
 * @returns {any}
 */
export function compute_simple_opening_reshare_once_or_twice(seed, threshold_reshare, index, encryption_signature, mega_sk, simple_dealings_key_reshared_once_or_twice, transcript_key_simple_or_reshared_once) {
    const ret = wasm.compute_simple_opening_reshare_once_or_twice(addHeapObject(seed), addHeapObject(threshold_reshare), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_sk), addHeapObject(simple_dealings_key_reshared_once_or_twice), addHeapObject(transcript_key_simple_or_reshared_once));
    return takeObject(ret);
}
/**
 * Generate a multiply single dealing for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_pk_list` - Signature of the unique vault message, retrieved from the smart contract
 * * `opening` - User's opening from compute_opening function
 * * `is_reshare` - If this function should act as reshare of unmasked
 * # Returns
 * masked dealing
 * @param {any} seed
 * @param {any} threshold
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_pk_list
 * @param {any} opening
 * @returns {any}
 */
export function compute_multiply_dealing_reshare(seed, threshold, index, encryption_signature, mega_pk_list, opening) {
    const ret = wasm.compute_multiply_dealing_reshare(addHeapObject(seed), addHeapObject(threshold), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_pk_list), addHeapObject(opening));
    return takeObject(ret);
}
/**
 * Returns a multiplied opening for a user.
 * # Arguments
 * * `seed` - Seed value retrieved from the vault data
 * * `threshold` - Signing threshold value retrieved from the vault data
 * * `index` - Index of this user's public key in the mega_pk_list
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `mega_sk` - User's encrypted mega secret key
 * * `dealings_unmasked` - List of first-step dealings
 * * `dealings_lambda` - List of newer dealings
 * * `old_dealings_unmasked` - List of newer dealings
 * # Returns
 * share commitment
 * @param {any} seed
 * @param {any} threshold_reshare
 * @param {any} index
 * @param {any} encryption_signature
 * @param {any} mega_sk
 * @param {any} list_multiply_dealer
 * @param {any} dealings_lambda
 * @param {any} simple_transcript
 * @returns {any}
 */
export function compute_multiply_opening_reshare(seed, threshold_reshare, index, encryption_signature, mega_sk, list_multiply_dealer, dealings_lambda, simple_transcript) {
    const ret = wasm.compute_multiply_opening_reshare(addHeapObject(seed), addHeapObject(threshold_reshare), addHeapObject(index), addHeapObject(encryption_signature), addHeapObject(mega_sk), addHeapObject(list_multiply_dealer), addHeapObject(dealings_lambda), addHeapObject(simple_transcript));
    return takeObject(ret);
}
/**
 * Once someone has posted his dealing on-chain, he should wait for other to post their dealing on-chain.
 * Once a dealing is posted on-chain, receiver decrypts it, and sign it if the decryption is valid
 * # Arguments
 * * `ecdsa_dealing_to_verify` - Dealing that a particular receiver is going to verify, retrieved from the smart contract.
 * * `dealer_index` - Index of `dealing_to_verify` . Maybe this can be extracted from `dealing_to_verify` directly?
 * * `receiver_index` - Index of the receiver
 * * `seed` - Seed value retrieved from the vault data
 * * `mega_sk` - receiver's encrypted mega secret key
 * * `encryption_signature` - Signature of the unique vault message, retrieved from the smart contract
 * Returns a boolean according to the result of the verification
 * Signature (if needed)
 * @param {any} ecdsa_dealing_to_verify
 * @param {any} dealer_index
 * @param {any} receiver_index
 * @param {any} seed
 * @param {any} mega_sk
 * @param {any} encryption_signature
 * @returns {boolean}
 */
export function private_ecdsa_verify_dealing(ecdsa_dealing_to_verify, dealer_index, receiver_index, seed, mega_sk, encryption_signature) {
    const ret = wasm.private_ecdsa_verify_dealing(addHeapObject(ecdsa_dealing_to_verify), addHeapObject(dealer_index), addHeapObject(receiver_index), addHeapObject(seed), addHeapObject(mega_sk), addHeapObject(encryption_signature));
    return ret !== 0;
}
/**
 * User sign a message or transaction with their share, needs to pass the transation string, as well as their secret share, and their signature to decrypt their secret share.
 * # Arguments
 * * `openings_kappa_times_lambda` -
 * * `openings_key_times_lambda` -
 * * `openings_lambda` -
 * * `simple_dealings_key` -
 * * `pedersen_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed share
 * @param {any} openings_kappa_times_lambda
 * @param {any} openings_key_times_lambda
 * @param {any} openings_lambda
 * @param {any} message
 * @param {any} seed
 * @param {any} key_transcript
 * @param {any} kappa_transcript
 * @returns {any}
 */
export function user_sign_message(openings_kappa_times_lambda, openings_key_times_lambda, openings_lambda, message, seed, key_transcript, kappa_transcript) {
    const ret = wasm.user_sign_message(addHeapObject(openings_kappa_times_lambda), addHeapObject(openings_key_times_lambda), addHeapObject(openings_lambda), addHeapObject(message), addHeapObject(seed), addHeapObject(key_transcript), addHeapObject(kappa_transcript));
    return takeObject(ret);
}
/**
 * User sign a message or transaction with their share, needs to pass the transation string, as well as their secret share, and their signature to decrypt their secret share.
 * # Arguments
 * * `openings_kappa_times_lambda` -
 * * `openings_key_times_lambda` -
 * * `openings_lambda` -
 * * `simple_dealings_key` -
 * * `pedersen_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed share
 * @param {any} openings_kappa_times_lambda
 * @param {any} openings_key_times_lambda
 * @param {any} openings_lambda
 * @param {any} message
 * @param {any} seed
 * @param {any} key_transcript
 * @param {any} kappa_transcript
 * @returns {any}
 */
export function user_sign_msg(openings_kappa_times_lambda, openings_key_times_lambda, openings_lambda, message, seed, key_transcript, kappa_transcript) {
    const ret = wasm.user_sign_msg(addHeapObject(openings_kappa_times_lambda), addHeapObject(openings_key_times_lambda), addHeapObject(openings_lambda), addHeapObject(message), addHeapObject(seed), addHeapObject(key_transcript), addHeapObject(kappa_transcript));
    return takeObject(ret);
}
/**
 * User sign a message or transaction with their share, needs to pass the transation string, as well as their secret share, and their signature to decrypt their secret share.
 * # Arguments
 * * `openings_kappa` -
 * * `openings_key` -
 * * `simple_dealings_key` -
 * * `pedersen_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed share
 * @param {any} openings_kappa
 * @param {any} openings_key
 * @param {any} message
 * @param {any} seed
 * @param {any} key_transcript
 * @param {any} kappa_transcript
 * @returns {any}
 */
export function user_sign_message_without_lambda(openings_kappa, openings_key, message, seed, key_transcript, kappa_transcript) {
    const ret = wasm.user_sign_message_without_lambda(addHeapObject(openings_kappa), addHeapObject(openings_key), addHeapObject(message), addHeapObject(seed), addHeapObject(key_transcript), addHeapObject(kappa_transcript));
    return takeObject(ret);
}
/**
 * # Arguments
 * * `openings_kappa_times_lambda` -
 * * `openings_key_times_lambda` -
 * * `openings_lambda` -
 * * `transcript_key_reshared_twice` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * @param {any} openings_kappa_times_lambda
 * @param {any} openings_key_times_lambda
 * @param {any} openings_lambda
 * @param {any} transcript_key_reshared_twice
 * @param {any} kappa_transcript
 * @param {any} message
 * @param {any} seed
 * @returns {any}
 */
export function user_sign_message_reshare(openings_kappa_times_lambda, openings_key_times_lambda, openings_lambda, transcript_key_reshared_twice, kappa_transcript, message, seed) {
    const ret = wasm.user_sign_message_reshare(addHeapObject(openings_kappa_times_lambda), addHeapObject(openings_key_times_lambda), addHeapObject(openings_lambda), addHeapObject(transcript_key_reshared_twice), addHeapObject(kappa_transcript), addHeapObject(message), addHeapObject(seed));
    return takeObject(ret);
}
/**
 * # Arguments
 * * `openings_kappa` -
 * * `openings_key` -
 * * `transcript_key_reshared_twice` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * @param {any} openings_kappa
 * @param {any} openings_key
 * @param {any} transcript_key_reshared_twice
 * @param {any} kappa_transcript
 * @param {any} message
 * @param {any} seed
 * @returns {any}
 */
export function user_sign_message_reshare_without_lambda(openings_kappa, openings_key, transcript_key_reshared_twice, kappa_transcript, message, seed) {
    const ret = wasm.user_sign_message_reshare_without_lambda(addHeapObject(openings_kappa), addHeapObject(openings_key), addHeapObject(transcript_key_reshared_twice), addHeapObject(kappa_transcript), addHeapObject(message), addHeapObject(seed));
    return takeObject(ret);
}
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `dealings_key` -
 * * `old_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed transaction, ready to send!
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @param {any} key_transcript_js
 * @param {any} kappa_transcript_js
 * @returns {any}
 */
export function combine_signed_shares(threshold, seed, message, signed_shares, key_transcript_js, kappa_transcript_js) {
    const ret = wasm.combine_signed_shares(addHeapObject(threshold), addHeapObject(seed), addHeapObject(message), addHeapObject(signed_shares), addHeapObject(key_transcript_js), addHeapObject(kappa_transcript_js));
    return takeObject(ret);
}
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `dealings_key` -
 * * `old_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed transaction, ready to send!
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @param {any} key_transcript_js
 * @param {any} kappa_transcript_js
 * @returns {any}
 */
export function combine_signed_shares_without_lambda(threshold, seed, message, signed_shares, key_transcript_js, kappa_transcript_js) {
    const ret = wasm.combine_signed_shares_without_lambda(addHeapObject(threshold), addHeapObject(seed), addHeapObject(message), addHeapObject(signed_shares), addHeapObject(key_transcript_js), addHeapObject(kappa_transcript_js));
    return takeObject(ret);
}
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `simple_dealings_kappa_reshare` -
 * * `pedersen_dealings_kappa_reshare` -
 * * `transcript_key_reshared_twice` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `seed` - Seed value retrieved from the vault data
 * * `message` - message to sign
 * * `signed_shares` - message to sign
 * * `dealings_key` - message to sign
 * * `old_dealings_key` - message to sign
 * #
 * Returns signed transaction, ready to send!
 * @param {any} kappa_transcript_js
 * @param {any} transcript_key_reshared_twice_js
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @returns {any}
 */
export function combine_signed_shares_reshare(kappa_transcript_js, transcript_key_reshared_twice_js, threshold, seed, message, signed_shares) {
    const ret = wasm.combine_signed_shares_reshare(addHeapObject(kappa_transcript_js), addHeapObject(transcript_key_reshared_twice_js), addHeapObject(threshold), addHeapObject(seed), addHeapObject(message), addHeapObject(signed_shares));
    return takeObject(ret);
}
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `simple_dealings_kappa_reshare` -
 * * `pedersen_dealings_kappa_reshare` -
 * * `transcript_key_reshared_twice` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `seed` - Seed value retrieved from the vault data
 * * `message` - message to sign
 * * `signed_shares` - message to sign
 * * `dealings_key` - message to sign
 * * `old_dealings_key` - message to sign
 * #
 * Returns signed transaction, ready to send!
 * @param {any} kappa_transcript_js
 * @param {any} transcript_key_reshared_twice_js
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @returns {any}
 */
export function combine_signed_shares_reshare_without_lambda(kappa_transcript_js, transcript_key_reshared_twice_js, threshold, seed, message, signed_shares) {
    const ret = wasm.combine_signed_shares_reshare_without_lambda(addHeapObject(kappa_transcript_js), addHeapObject(transcript_key_reshared_twice_js), addHeapObject(threshold), addHeapObject(seed), addHeapObject(message), addHeapObject(signed_shares));
    return takeObject(ret);
}
/**
 * Combine signed shares from each participant.
 *
 * Will fail if threshold is not met (threshold defined in the original keygen/DKG process and can be referenced in the smart contract) The result of this function is a signed hash that can be broadcast on the network.
 * First, a number of participants who equal the account’s transaction threshold will need to run the sign_transaction function and store the result with the transaction they are signing.
 * When the ‘combineSignatures’ function is called from the SDK, we aggregate all of the signatures and pass them to this function.
 * Returns a signature struct which contains r and s values of the ECDSA scalars.
 *
 * # Arguments
 * * `dealings_key` -
 * * `old_dealings_key` -
 * * `dealings_kappa` -
 * * `old_dealings_kappa` -
 * * `threshold` - signature threshold from dkg
 * * `message` - message to sign
 * * `seed` - Seed value retrieved from the vault data
 * # Returns
 * signed transaction, ready to send!
 * @param {any} threshold
 * @param {any} seed
 * @param {any} message
 * @param {any} signed_shares
 * @param {any} key_transcript_js
 * @param {any} kappa_transcript_js
 * @returns {any}
 */
export function combine_signed_shares_message(threshold, seed, message, signed_shares, key_transcript_js, kappa_transcript_js) {
    const ret = wasm.combine_signed_shares_message(addHeapObject(threshold), addHeapObject(seed), addHeapObject(message), addHeapObject(signed_shares), addHeapObject(key_transcript_js), addHeapObject(kappa_transcript_js));
    return takeObject(ret);
}
/**
 * Creates an seed (for rng/ad) that can be stored in the vault proposal
 * Returns serialized, encoded string of the seed.
 * # Returns
 * seed in string format for vault storage
 * @returns {any}
 */
export function create_js_seed() {
    const ret = wasm.create_js_seed();
    return takeObject(ret);
}
/**
 * Creates a random string / message that will be used by all the participants for signing to create their paris key.
 * step 0
 * # Returns
 * random string
 * @returns {any}
 */
export function create_random_message() {
    const ret = wasm.create_random_message();
    return takeObject(ret);
}
/**
 * Generate master public key after all registration process is complete
 * # Returns
 * random master public key
 * @param {any} simple_transcript
 * @returns {Array<any>}
 */
export function generate_master_public_key_and_address(simple_transcript) {
    const ret = wasm.generate_master_public_key_and_address(addHeapObject(simple_transcript));
    return takeObject(ret);
}
/**
 * User pre-register function, each user needs to do this before 'first steps' for DKG can be performed.
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * # Returns
 * users public encryption key, public key for storage in known public key vault for all users, encrypted secret key
 * @param {any} signature
 * @returns {Array<any>}
 */
export function pre_register(signature) {
    const ret = wasm.pre_register(addHeapObject(signature));
    return takeObject(ret);
}
/**
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * @param {any} signature
 * @param {number} index
 * @returns {any}
 */
export function get_paris_encryption_key(signature, index) {
    const ret = wasm.get_paris_encryption_key(addHeapObject(signature), index);
    return takeObject(ret);
}
/**
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * @param {any} signature
 * @param {number} index
 * @returns {any}
 */
export function get_unique_hash(signature, index) {
    const ret = wasm.get_unique_hash(addHeapObject(signature), index);
    return takeObject(ret);
}
/**
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * @param {any} signature
 * @param {number} index
 * @returns {any}
 */
export function get_aptos_key(signature, index) {
    const ret = wasm.get_aptos_key(addHeapObject(signature), index);
    return takeObject(ret);
}
/**
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * Create a hardened child key from specific derivation index to be used for encrypting data
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `index` - Index of the key being used, default 0
 * # Returns
 * users public encryption key
 * @param {any} signature
 * @returns {any}
 */
export function get_polybase_key(signature) {
    const ret = wasm.get_polybase_key(addHeapObject(signature));
    return takeObject(ret);
}
let stack_pointer = 128;
function addBorrowedObject(obj) {
    if (stack_pointer == 1)
        throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
 * Encrypt data using derived BIP32 public key at specified child derivation index
 * # Arguments
 * * `paris_public` - The paris public key derived from pre_register/get_paris_encryption_key
 * * `plaintext` - Message to encrypt
 * # Returns
 * encrypted message
 * @param {any} paris_public
 * @param {any} plaintext
 * @returns {any}
 */
export function encrypt_data(paris_public, plaintext) {
    try {
        const ret = wasm.encrypt_data(addHeapObject(paris_public), addBorrowedObject(plaintext));
        return takeObject(ret);
    }
    finally {
        heap[stack_pointer++] = undefined;
    }
}
/**
 * Decrypt data using derived BIP32 private key at specified child derivation index
 * # Arguments
 * * `signature` - Signature of the unique vault message, retrieved from the smart contract
 * * `message` - Encrypted message
 * * `index` - Index of key to use
 * # Returns
 * decrypted message
 * @param {any} signature
 * @param {any} message
 * @param {number} index
 * @returns {any}
 */
export function decrypt_data(signature, message, index) {
    const ret = wasm.decrypt_data(addHeapObject(signature), addHeapObject(message), index);
    return takeObject(ret);
}
/**
 * Form a transaction for users to sign with their secret share.
 * # Arguments
 * * `to` - public address / EOA of the recipient
 * * `value` - Value/amount of token you want to send
 * * `chain_id` - Chain id of the network the transaction should be sent on
 * * `nonce` - The nonce should be the nonce of the master public key of the intu account dEOA.
 * * `data` - Encoded data to be used in the transaction
 * * `gas_price` - Amount you pay per unit of gas
 * * `gas` - Total gas you are willing to pay for a transaction
 * # Returns [ transaction string for storage, for others to reference and sign]
 * @param {any} to
 * @param {any} value
 * @param {any} chain_id
 * @param {any} nonce
 * @param {any} data
 * @param {any} gas_price
 * @param {any} gas
 * @param {any} decimal
 * @returns {any}
 */
export function form_transaction(to, value, chain_id, nonce, data, gas_price, gas, decimal) {
    const ret = wasm.form_transaction(addHeapObject(to), addHeapObject(value), addHeapObject(chain_id), addHeapObject(nonce), addHeapObject(data), addHeapObject(gas_price), addHeapObject(gas), addHeapObject(decimal));
    return takeObject(ret);
}
/**
 * Form a transaction for users to sign with their secret share.
 * # Arguments
 * * `to` - public address / EOA of the recipient
 * * `value` - Value/amount of token you want to send
 * * `chain_id` - Chain id of the network the transaction should be sent on
 * * `nonce` - The nonce should be the nonce of the master public key of the intu account dEOA.
 * * `data` - Encoded data to be used in the transaction
 * * `gas_price` - Amount you pay per unit of gas
 * * `gas` - Total gas you are willing to pay for a transaction
 * # Returns [ transaction string for storage, for others to reference and sign]
 * @param {any} message
 * @returns {any}
 */
export function message(message) {
    const ret = wasm.message(addHeapObject(message));
    return takeObject(ret);
}
/**
 * Parse a transaction string stored in an Intu vault so that a participant can review the transaction before signing it.
 * # Arguments
 * * `transaction` - string of the transaction, retrieved from the vault
 * # Returns [array of transaction data]
 * @param {any} transaction
 * @returns {Array<any>}
 */
export function parse_transaction(transaction) {
    const ret = wasm.parse_transaction(addHeapObject(transaction));
    return takeObject(ret);
}
export function __wbg_buffer_609cc3eee51ed158(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
}
;
export function __wbg_call_672a4d21634d4a24() {
    return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments);
}
;
export function __wbg_call_7cccdd69e0791ae2() {
    return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments);
}
;
export function __wbg_crypto_dd1b8f71596b161a(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
}
;
export function __wbg_done_769e5ede4b31c67b(arg0) {
    const ret = getObject(arg0).done;
    return ret;
}
;
export function __wbg_entries_3265d4158b33e5dc(arg0) {
    const ret = Object.entries(getObject(arg0));
    return addHeapObject(ret);
}
;
export function __wbg_getRandomValues_760c8e927227643e() {
    return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
}
;
export function __wbg_get_67b2ba62fc30de12() {
    return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments);
}
;
export function __wbg_get_b9b93047fe3cf45b(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
}
;
export function __wbg_instanceof_ArrayBuffer_e14585432e3737fc(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof ArrayBuffer;
    }
    catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
;
export function __wbg_instanceof_Uint8Array_17156bcf118086a9(arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Uint8Array;
    }
    catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
;
export function __wbg_isArray_a1eab7e0d067391b(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
}
;
export function __wbg_isSafeInteger_343e2beeeece1bb0(arg0) {
    const ret = Number.isSafeInteger(getObject(arg0));
    return ret;
}
;
export function __wbg_iterator_9a24c88df860dc65() {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
}
;
export function __wbg_length_a446193dc22c12f8(arg0) {
    const ret = getObject(arg0).length;
    return ret;
}
;
export function __wbg_length_e2d2a49132c1b256(arg0) {
    const ret = getObject(arg0).length;
    return ret;
}
;
export function __wbg_log_c222819a41e063d3(arg0) {
    console.log(getObject(arg0));
}
;
export function __wbg_msCrypto_60a4979188f6b80b(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
}
;
export function __wbg_new_78feb108b6472713() {
    const ret = new Array();
    return addHeapObject(ret);
}
;
export function __wbg_new_a12002a7f91c75be(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
}
;
export function __wbg_newnoargs_105ed471475aaf50(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
}
;
export function __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
}
;
export function __wbg_newwithlength_a381634e90c276d4(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
}
;
export function __wbg_next_25feadfc0913fea9(arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
}
;
export function __wbg_next_6574e1a8a62d1055() {
    return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments);
}
;
export function __wbg_node_0deadde112ce24bb(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
}
;
export function __wbg_process_0caa4f154b97e834(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
}
;
export function __wbg_push_737cfc8c1432c2c6(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
}
;
export function __wbg_randomFillSync_82e8b56b81896e30() {
    return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments);
}
;
export function __wbg_require_1a22b236558b5786() {
    return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments);
}
;
export function __wbg_set_37837023f3d740e8(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
}
;
export function __wbg_set_65595bdd868b3009(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
}
;
export function __wbg_static_accessor_GLOBAL_88a902d13a557d07() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}
;
export function __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}
;
export function __wbg_static_accessor_SELF_37c5d418e4bf5819() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}
;
export function __wbg_static_accessor_WINDOW_5de37043a91a9c40() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
}
;
export function __wbg_subarray_aa9065fa9dc5df96(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
}
;
export function __wbg_value_cd1ffa7b1ab794f1(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
}
;
export function __wbg_versions_134d8f3c6de79566(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
}
;
export function __wbindgen_bigint_from_i64(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
}
;
export function __wbindgen_bigint_from_u64(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
}
;
export function __wbindgen_bigint_get_as_i64(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof (v) === 'bigint' ? v : undefined;
    getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
;
export function __wbindgen_boolean_get(arg0) {
    const v = getObject(arg0);
    const ret = typeof (v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
}
;
export function __wbindgen_debug_string(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_1, wasm.__wbindgen_export_2);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
;
export function __wbindgen_error_new(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
}
;
export function __wbindgen_in(arg0, arg1) {
    const ret = getObject(arg0) in getObject(arg1);
    return ret;
}
;
export function __wbindgen_is_bigint(arg0) {
    const ret = typeof (getObject(arg0)) === 'bigint';
    return ret;
}
;
export function __wbindgen_is_function(arg0) {
    const ret = typeof (getObject(arg0)) === 'function';
    return ret;
}
;
export function __wbindgen_is_object(arg0) {
    const val = getObject(arg0);
    const ret = typeof (val) === 'object' && val !== null;
    return ret;
}
;
export function __wbindgen_is_string(arg0) {
    const ret = typeof (getObject(arg0)) === 'string';
    return ret;
}
;
export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
}
;
export function __wbindgen_jsval_eq(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
}
;
export function __wbindgen_jsval_loose_eq(arg0, arg1) {
    const ret = getObject(arg0) == getObject(arg1);
    return ret;
}
;
export function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
}
;
export function __wbindgen_number_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof (obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
;
export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
}
;
export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
}
;
export function __wbindgen_string_get(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof (obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_1, wasm.__wbindgen_export_2);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
;
export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
}
;
export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
}
;
