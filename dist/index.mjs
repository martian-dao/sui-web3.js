// src/cryptography/ed25519-keypair.ts
import nacl2 from "tweetnacl";

// src/serialization/base64.ts
import { fromB64, toB64 } from "@mysten/bcs";
var Base64DataBuffer = class {
  constructor(data) {
    if (typeof data === "string") {
      this.data = fromB64(data);
    } else {
      this.data = data;
    }
  }
  getData() {
    return this.data;
  }
  getLength() {
    return this.data.length;
  }
  toString() {
    return toB64(this.data);
  }
};

// src/cryptography/ed25519-publickey.ts
import sha3 from "js-sha3";
import { fromB64 as fromB642, toB64 as toB642 } from "@mysten/bcs";

// src/cryptography/publickey.ts
function bytesEqual(a, b) {
  if (a === b)
    return true;
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var SIGNATURE_SCHEME_TO_FLAG = {
  ED25519: 0,
  Secp256k1: 1
};

// src/cryptography/ed25519-publickey.ts
var PUBLIC_KEY_SIZE = 32;
var Ed25519PublicKey = class {
  constructor(value) {
    if (typeof value === "string") {
      this.data = fromB642(value);
    } else if (value instanceof Uint8Array) {
      this.data = value;
    } else {
      this.data = Uint8Array.from(value);
    }
    if (this.data.length !== PUBLIC_KEY_SIZE) {
      throw new Error(
        `Invalid public key input. Expected ${PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`
      );
    }
  }
  equals(publicKey) {
    return bytesEqual(this.toBytes(), publicKey.toBytes());
  }
  toBase64() {
    return toB642(this.toBytes());
  }
  toBytes() {
    return this.data;
  }
  toString() {
    return this.toBase64();
  }
  toSuiAddress() {
    let tmp = new Uint8Array(PUBLIC_KEY_SIZE + 1);
    tmp.set([SIGNATURE_SCHEME_TO_FLAG["ED25519"]]);
    tmp.set(this.toBytes(), 1);
    return sha3.sha3_256(tmp).slice(0, 40);
  }
};

// src/cryptography/mnemonics.ts
import { toHEX } from "@mysten/bcs";
import { mnemonicToSeedSync as bip39MnemonicToSeedSync } from "@scure/bip39";
function isValidHardenedPath(path) {
  if (!new RegExp("^m\\/44'\\/784'\\/[0-9]+'\\/[0-9]+'\\/[0-9]+'+$").test(path)) {
    return false;
  }
  return true;
}
function isValidBIP32Path(path) {
  if (!new RegExp("^m\\/54'\\/784'\\/[0-9]+'\\/[0-9]+\\/[0-9]+$").test(path)) {
    return false;
  }
  return true;
}
function mnemonicToSeed(mnemonics) {
  return bip39MnemonicToSeedSync(mnemonics, "");
}
function mnemonicToSeedHex(mnemonics) {
  return toHEX(mnemonicToSeed(mnemonics));
}

// src/utils/ed25519-hd-key.ts
import { sha512 } from "@noble/hashes/sha512";
import { hmac } from "@noble/hashes/hmac";
import nacl from "tweetnacl";
import { fromHEX } from "@mysten/bcs";
var ED25519_CURVE = "ed25519 seed";
var HARDENED_OFFSET = 2147483648;
var pathRegex = new RegExp("^m(\\/[0-9]+')+$");
var replaceDerive = (val) => val.replace("'", "");
var getMasterKeyFromSeed = (seed) => {
  const h = hmac.create(sha512, ED25519_CURVE);
  const I = h.update(fromHEX(seed)).digest();
  const IL = I.slice(0, 32);
  const IR = I.slice(32);
  return {
    key: IL,
    chainCode: IR
  };
};
var CKDPriv = ({ key, chainCode }, index) => {
  const indexBuffer = new ArrayBuffer(4);
  const cv = new DataView(indexBuffer);
  cv.setUint32(0, index);
  const data = new Uint8Array(1 + key.length + indexBuffer.byteLength);
  data.set(new Uint8Array(1).fill(0));
  data.set(key, 1);
  data.set(
    new Uint8Array(indexBuffer, 0, indexBuffer.byteLength),
    key.length + 1
  );
  const I = hmac.create(sha512, chainCode).update(data).digest();
  const IL = I.slice(0, 32);
  const IR = I.slice(32);
  return {
    key: IL,
    chainCode: IR
  };
};
var getPublicKey = (privateKey, withZeroByte = true) => {
  const keyPair = nacl.sign.keyPair.fromSeed(privateKey);
  const signPk = keyPair.secretKey.subarray(32);
  const newArr = new Uint8Array(signPk.length + 1);
  newArr.set([0]);
  newArr.set(signPk, 1);
  return withZeroByte ? newArr : signPk;
};
var isValidPath = (path) => {
  if (!pathRegex.test(path)) {
    return false;
  }
  return !path.split("/").slice(1).map(replaceDerive).some(isNaN);
};
var derivePath = (path, seed, offset = HARDENED_OFFSET) => {
  if (!isValidPath(path)) {
    throw new Error("Invalid derivation path");
  }
  const { key, chainCode } = getMasterKeyFromSeed(seed);
  const segments = path.split("/").slice(1).map(replaceDerive).map((el) => parseInt(el, 10));
  return segments.reduce(
    (parentKeys, segment) => CKDPriv(parentKeys, segment + offset),
    { key, chainCode }
  );
};

// src/cryptography/ed25519-keypair.ts
import { toB64 as toB643 } from "@mysten/bcs";
var DEFAULT_ED25519_DERIVATION_PATH = "m/44'/784'/0'/0'/0'";
var Ed25519Keypair = class {
  constructor(keypair) {
    if (keypair) {
      this.keypair = keypair;
    } else {
      this.keypair = nacl2.sign.keyPair();
    }
  }
  getKeyScheme() {
    return "ED25519";
  }
  static generate() {
    return new Ed25519Keypair(nacl2.sign.keyPair());
  }
  static fromSecretKey(secretKey, options) {
    const secretKeyLength = secretKey.length;
    if (secretKeyLength != 64) {
      if (secretKeyLength == 32) {
        throw new Error(
          "Wrong secretKey size. Expected 64 bytes, got 32. Similar function exists: fromSeed(seed: Uint8Array)"
        );
      }
      throw new Error(
        `Wrong secretKey size. Expected 64 bytes, got ${secretKeyLength}.`
      );
    }
    const keypair = nacl2.sign.keyPair.fromSecretKey(secretKey);
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("sui validation");
      const signature = nacl2.sign.detached(signData, keypair.secretKey);
      if (!nacl2.sign.detached.verify(signData, signature, keypair.publicKey)) {
        throw new Error("provided secretKey is invalid");
      }
    }
    return new Ed25519Keypair(keypair);
  }
  static fromSeed(seed) {
    const seedLength = seed.length;
    if (seedLength != 32) {
      throw new Error(`Wrong seed size. Expected 32 bytes, got ${seedLength}.`);
    }
    return new Ed25519Keypair(nacl2.sign.keyPair.fromSeed(seed));
  }
  getPublicKey() {
    return new Ed25519PublicKey(this.keypair.publicKey);
  }
  getSecretKey() {
    return toB643(this.keypair.secretKey);
  }
  signData(data) {
    return new Base64DataBuffer(
      nacl2.sign.detached(data.getData(), this.keypair.secretKey)
    );
  }
  signBuffer(data) {
    return nacl2.sign.detached(data, this.keypair.secretKey);
  }
  toPrivateKeyObject() {
    const publicKeyHex = Buffer.from(this.getPublicKey().toBytes()).toString(
      "hex"
    );
    const privateKeyHex = Buffer.from(
      this.keypair.secretKey.slice(0, 32)
    ).toString("hex");
    const address = this.getPublicKey().toSuiAddress();
    return {
      address: address.startsWith("0x") ? address : "0x" + address,
      publicKeyHex: publicKeyHex.startsWith("0x") ? publicKeyHex : "0x" + publicKeyHex,
      privateKeyHex: privateKeyHex.startsWith("0x") ? privateKeyHex : "0x" + privateKeyHex
    };
  }
  static deriveKeypair(mnemonics, path) {
    if (path == null) {
      path = DEFAULT_ED25519_DERIVATION_PATH;
    }
    if (!isValidHardenedPath(path)) {
      throw new Error("Invalid derivation path");
    }
    const { key } = derivePath(path, mnemonicToSeedHex(mnemonics));
    const pubkey = getPublicKey(key, false);
    let fullPrivateKey = new Uint8Array(64);
    fullPrivateKey.set(key);
    fullPrivateKey.set(pubkey, 32);
    return new Ed25519Keypair({ publicKey: pubkey, secretKey: fullPrivateKey });
  }
};

// src/cryptography/secp256k1-keypair.ts
import * as secp from "@noble/secp256k1";
import { hmac as hmac2 } from "@noble/hashes/hmac";
import { sha256 } from "@noble/hashes/sha256";

// src/cryptography/secp256k1-publickey.ts
import { fromB64 as fromB643, toB64 as toB644 } from "@mysten/bcs";
import sha32 from "js-sha3";
var SECP256K1_PUBLIC_KEY_SIZE = 33;
var Secp256k1PublicKey = class {
  constructor(value) {
    if (typeof value === "string") {
      this.data = fromB643(value);
    } else if (value instanceof Uint8Array) {
      this.data = value;
    } else {
      this.data = Uint8Array.from(value);
    }
    if (this.data.length !== SECP256K1_PUBLIC_KEY_SIZE) {
      throw new Error(
        `Invalid public key input. Expected ${SECP256K1_PUBLIC_KEY_SIZE} bytes, got ${this.data.length}`
      );
    }
  }
  equals(publicKey) {
    return bytesEqual(this.toBytes(), publicKey.toBytes());
  }
  toBase64() {
    return toB644(this.toBytes());
  }
  toBytes() {
    return this.data;
  }
  toString() {
    return this.toBase64();
  }
  toSuiAddress() {
    let tmp = new Uint8Array(SECP256K1_PUBLIC_KEY_SIZE + 1);
    tmp.set([SIGNATURE_SCHEME_TO_FLAG["Secp256k1"]]);
    tmp.set(this.toBytes(), 1);
    return sha32.sha3_256(tmp).slice(0, 40);
  }
};

// src/cryptography/secp256k1-keypair.ts
import { Signature } from "@noble/secp256k1";
import { HDKey } from "@scure/bip32";
var DEFAULT_SECP256K1_DERIVATION_PATH = "m/54'/784'/0'/0/0";
secp.utils.hmacSha256Sync = (key, ...msgs) => {
  const h = hmac2.create(sha256, key);
  msgs.forEach((msg) => h.update(msg));
  return h.digest();
};
var Secp256k1Keypair = class {
  constructor(keypair) {
    if (keypair) {
      this.keypair = keypair;
    } else {
      const secretKey = secp.utils.randomPrivateKey();
      const publicKey = secp.getPublicKey(secretKey, true);
      this.keypair = { publicKey, secretKey };
    }
  }
  getKeyScheme() {
    return "Secp256k1";
  }
  static generate() {
    const secretKey = secp.utils.randomPrivateKey();
    const publicKey = secp.getPublicKey(secretKey, true);
    return new Secp256k1Keypair({ publicKey, secretKey });
  }
  static fromSecretKey(secretKey, options) {
    const publicKey = secp.getPublicKey(secretKey, true);
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("sui validation");
      const msgHash = sha256(signData);
      const signature = secp.signSync(msgHash, secretKey);
      if (!secp.verify(signature, msgHash, publicKey, { strict: true })) {
        throw new Error("Provided secretKey is invalid");
      }
    }
    return new Secp256k1Keypair({ publicKey, secretKey });
  }
  static fromSeed(seed) {
    let publicKey = secp.getPublicKey(seed, true);
    return new Secp256k1Keypair({ publicKey, secretKey: seed });
  }
  getPublicKey() {
    return new Secp256k1PublicKey(this.keypair.publicKey);
  }
  signData(data) {
    const msgHash = sha256(data.getData());
    const [sig, rec_id] = secp.signSync(msgHash, this.keypair.secretKey, {
      canonical: true,
      recovered: true
    });
    var recoverable_sig = new Uint8Array(65);
    recoverable_sig.set(Signature.fromDER(sig).toCompactRawBytes());
    recoverable_sig.set([rec_id], 64);
    return new Base64DataBuffer(recoverable_sig);
  }
  static deriveKeypair(path, mnemonics) {
    if (!isValidBIP32Path(path)) {
      throw new Error("Invalid derivation path");
    }
    const key = HDKey.fromMasterSeed(mnemonicToSeed(mnemonics)).derive(path);
    if (key.publicKey == null || key.privateKey == null) {
      throw new Error("Invalid key");
    }
    return new Secp256k1Keypair({
      publicKey: key.publicKey,
      secretKey: key.privateKey
    });
  }
};

// src/providers/provider.ts
var Provider = class {
};

// src/rpc/client.ts
import RpcClient from "jayson/lib/client/browser/index.js";
import fetch from "isomorphic-fetch";

// src/rpc/client.guard.ts
function isValidResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.jsonrpc === "2.0" && typeof obj.id === "string";
}
function isErrorResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.jsonrpc === "2.0" && typeof obj.id === "string" && (obj.error !== null && typeof obj.error === "object" || typeof obj.error === "function") && typeof obj.error.message === "string";
}

// src/rpc/client.ts
import * as LosslessJSON from "lossless-json";
var TYPE_MISMATCH_ERROR = `The response returned from RPC server does not match the TypeScript definition. This is likely because the SDK version is not compatible with the RPC server. Please update your SDK version to the latest. `;
var JsonRpcClient = class {
  constructor(url, httpHeaders) {
    this.rpcClient = this.createRpcClient(url, httpHeaders);
  }
  createRpcClient(url, httpHeaders) {
    const client = new RpcClient(
      async (request, callback) => {
        const options = {
          method: "POST",
          body: request,
          headers: Object.assign(
            {
              "Content-Type": "application/json"
            },
            httpHeaders || {}
          )
        };
        try {
          let res = await fetch(url, options);
          const text = await res.text();
          let result;
          try {
            result = JSON.stringify(
              LosslessJSON.parse(text, (key, value) => {
                if (value == null) {
                  return value;
                }
                if (key === "balance" && typeof value === "number") {
                  return value.toString();
                }
                try {
                  if (value.isLosslessNumber)
                    return value.valueOf();
                } catch {
                  return value.toString();
                }
                return value;
              })
            );
          } catch (e) {
            result = text;
          }
          if (res.ok) {
            callback(null, result);
          } else {
            callback(new Error(`${res.status} ${res.statusText}: ${text}`));
          }
        } catch (err) {
          if (err instanceof Error)
            callback(err);
        }
      },
      {}
    );
    return client;
  }
  async requestWithType(method, args, isT, skipDataValidation = false) {
    const response = await this.request(method, args);
    if (isErrorResponse(response)) {
      throw new Error(`RPC Error: ${response.error.message}`);
    } else if (isValidResponse(response)) {
      const expectedSchema = isT(response.result);
      const errMsg = TYPE_MISMATCH_ERROR + `Result received was: ${JSON.stringify(response.result)}`;
      if (skipDataValidation && !expectedSchema) {
        console.warn(errMsg);
        return response.result;
      } else if (!expectedSchema) {
        throw new Error(`RPC Error: ${errMsg}`);
      }
      return response.result;
    }
    throw new Error(`Unexpected RPC Response: ${response}`);
  }
  async request(method, args) {
    return new Promise((resolve, reject) => {
      this.rpcClient.request(method, args, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }
  async batchRequestWithType(requests, isT, skipDataValidation = false) {
    const responses = await this.batchRequest(requests);
    const validResponses = responses.filter(
      (response) => isValidResponse(response) && (skipDataValidation || isT(response.result))
    );
    if (responses.length > validResponses.length) {
      console.warn(
        `Batch request contains invalid responses. ${responses.length - validResponses.length} of the ${responses.length} requests has invalid schema.`
      );
      const exampleTypeMismatch = responses.find((r) => !isT(r.result));
      const exampleInvalidResponseIndex = responses.findIndex(
        (r) => !isValidResponse(r)
      );
      if (exampleTypeMismatch) {
        console.warn(
          TYPE_MISMATCH_ERROR + `One example mismatch is: ${JSON.stringify(
            exampleTypeMismatch.result
          )}`
        );
      }
      if (exampleInvalidResponseIndex !== -1) {
        console.warn(
          `The request ${JSON.stringify(
            requests[exampleInvalidResponseIndex]
          )} within a batch request returns an invalid response ${JSON.stringify(
            responses[exampleInvalidResponseIndex]
          )}`
        );
      }
    }
    return validResponses.map((response) => response.result);
  }
  async batchRequest(requests) {
    return new Promise((resolve, reject) => {
      if (requests.length === 0)
        resolve([]);
      const batch = requests.map((params) => {
        return this.rpcClient.request(params.method, params.args);
      });
      this.rpcClient.request(batch, (err, response) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }
};

// src/types/index.guard.ts
function isTransactionDigest(obj, _argumentName) {
  return typeof obj === "string";
}
function isSuiAddress(obj, _argumentName) {
  return typeof obj === "string";
}
function isObjectOwner(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.AddressOwner) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.ObjectOwner) || (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.Shared !== null && typeof obj.Shared === "object" || typeof obj.Shared === "function") && isSuiMoveTypeParameterIndex(obj.Shared.initial_shared_version) || obj === "Immutable";
}
function isSuiObjectRef(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.digest) && isTransactionDigest(obj.objectId) && isSuiMoveTypeParameterIndex(obj.version);
}
function isSuiObjectInfo(obj, _argumentName) {
  return isSuiObjectRef(obj) && (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.type) && isObjectOwner(obj.owner) && isTransactionDigest(obj.previousTransaction);
}
function isObjectContentFields(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Object.entries(obj).every(([key, _value]) => isTransactionDigest(key));
}
function isMovePackageContent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Object.entries(obj).every(([key, value]) => isTransactionDigest(value) && isTransactionDigest(key));
}
function isSuiData(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isObjectType(obj.dataType) && isSuiMoveObject(obj) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isObjectType(obj.dataType) && isSuiMovePackage(obj);
}
function isSuiMoveObject(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.type) && isObjectContentFields(obj.fields) && typeof obj.has_public_transfer === "boolean";
}
function isCoinDenominationInfoResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.coinType) && isTransactionDigest(obj.basicUnit) && isSuiMoveTypeParameterIndex(obj.decimalNumber);
}
function isSuiMovePackage(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isMovePackageContent(obj.disassembled);
}
function isSuiMoveFunctionArgTypesResponse(obj, _argumentName) {
  return Array.isArray(obj) && obj.every(
    (e) => isSuiMoveFunctionArgType(e)
  );
}
function isSuiMoveFunctionArgType(obj, _argumentName) {
  return isTransactionDigest(obj) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.Object);
}
function isSuiMoveFunctionArgTypes(obj, _argumentName) {
  return Array.isArray(obj) && obj.every(
    (e) => isSuiMoveFunctionArgType(e)
  );
}
function isSuiMoveNormalizedModules(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Object.entries(obj).every(([key, value]) => isSuiMoveNormalizedModule(value) && isTransactionDigest(key));
}
function isSuiMoveNormalizedModule(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.file_format_version) && isTransactionDigest(obj.address) && isTransactionDigest(obj.name) && Array.isArray(obj.friends) && obj.friends.every(
    (e) => isSuiMoveModuleId(e)
  ) && (obj.structs !== null && typeof obj.structs === "object" || typeof obj.structs === "function") && Object.entries(obj.structs).every(([key, value]) => isSuiMoveNormalizedStruct(value) && isTransactionDigest(key)) && (obj.exposed_functions !== null && typeof obj.exposed_functions === "object" || typeof obj.exposed_functions === "function") && Object.entries(obj.exposed_functions).every(([key, value]) => isSuiMoveNormalizedFunction(value) && isTransactionDigest(key));
}
function isSuiMoveModuleId(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.address) && isTransactionDigest(obj.name);
}
function isSuiMoveNormalizedStruct(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveAbilitySet(obj.abilities) && Array.isArray(obj.type_parameters) && obj.type_parameters.every(
    (e) => isSuiMoveStructTypeParameter(e)
  ) && Array.isArray(obj.fields) && obj.fields.every(
    (e) => isSuiMoveNormalizedField(e)
  );
}
function isSuiMoveStructTypeParameter(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveAbilitySet(obj.constraints) && typeof obj.is_phantom === "boolean";
}
function isSuiMoveNormalizedField(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.name) && isSuiMoveNormalizedType(obj.type_);
}
function isSuiMoveNormalizedFunction(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveVisibility(obj.visibility) && typeof obj.is_entry === "boolean" && Array.isArray(obj.type_parameters) && obj.type_parameters.every(
    (e) => isSuiMoveAbilitySet(e)
  ) && Array.isArray(obj.parameters) && obj.parameters.every(
    (e) => isSuiMoveNormalizedType(e)
  ) && Array.isArray(obj.return_) && obj.return_.every(
    (e) => isSuiMoveNormalizedType(e)
  );
}
function isSuiMoveVisibility(obj, _argumentName) {
  return obj === "Private" || obj === "Public" || obj === "Friend";
}
function isSuiMoveTypeParameterIndex(obj, _argumentName) {
  return typeof obj === "number";
}
function isSuiMoveAbilitySet(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.abilities) && obj.abilities.every(
    (e) => isTransactionDigest(e)
  );
}
function isSuiMoveNormalizedType(obj, _argumentName) {
  return isTransactionDigest(obj) || isSuiMoveNormalizedTypeParameterType(obj) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveNormalizedType(obj.Reference) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveNormalizedType(obj.MutableReference) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveNormalizedType(obj.Vector) || isSuiMoveNormalizedStructType(obj);
}
function isSuiMoveNormalizedTypeParameterType(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.TypeParameter);
}
function isSuiMoveNormalizedStructType(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.Struct !== null && typeof obj.Struct === "object" || typeof obj.Struct === "function") && isTransactionDigest(obj.Struct.address) && isTransactionDigest(obj.Struct.module) && isTransactionDigest(obj.Struct.name) && Array.isArray(obj.Struct.type_arguments) && obj.Struct.type_arguments.every(
    (e) => isSuiMoveNormalizedType(e)
  );
}
function isSuiObject(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiData(obj.data) && isObjectOwner(obj.owner) && isTransactionDigest(obj.previousTransaction) && isSuiMoveTypeParameterIndex(obj.storageRebate) && isSuiObjectRef(obj.reference);
}
function isObjectStatus(obj, _argumentName) {
  return obj === "Exists" || obj === "NotExists" || obj === "Deleted";
}
function isObjectType(obj, _argumentName) {
  return obj === "moveObject" || obj === "package";
}
function isGetOwnedObjectsResponse(obj, _argumentName) {
  return Array.isArray(obj) && obj.every(
    (e) => isSuiObjectInfo(e)
  );
}
function isGetObjectDataResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isObjectStatus(obj.status) && (isTransactionDigest(obj.details) || isSuiObjectRef(obj.details) || isSuiObject(obj.details));
}
function isObjectDigest(obj, _argumentName) {
  return typeof obj === "string";
}
function isObjectId(obj, _argumentName) {
  return typeof obj === "string";
}
function isSequenceNumber(obj, _argumentName) {
  return typeof obj === "number";
}
function isOrder(obj, _argumentName) {
  return obj === "ascending" || obj === "descending";
}
function isMoveEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.packageId) && isTransactionDigest(obj.transactionModule) && isTransactionDigest(obj.sender) && isTransactionDigest(obj.type) && (obj.fields !== null && typeof obj.fields === "object" || typeof obj.fields === "function") && isTransactionDigest(obj.bcs);
}
function isPublishEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.sender) && isTransactionDigest(obj.packageId);
}
function isCoinBalanceChangeEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.packageId) && isTransactionDigest(obj.transactionModule) && isTransactionDigest(obj.sender) && isObjectOwner(obj.owner) && isBalanceChangeType(obj.changeType) && isTransactionDigest(obj.coinType) && isTransactionDigest(obj.coinObjectId) && isSuiMoveTypeParameterIndex(obj.version) && isSuiMoveTypeParameterIndex(obj.amount);
}
function isTransferObjectEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.packageId) && isTransactionDigest(obj.transactionModule) && isTransactionDigest(obj.sender) && isObjectOwner(obj.recipient) && isTransactionDigest(obj.objectType) && isTransactionDigest(obj.objectId) && isSuiMoveTypeParameterIndex(obj.version);
}
function isMutateObjectEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.packageId) && isTransactionDigest(obj.transactionModule) && isTransactionDigest(obj.sender) && isTransactionDigest(obj.objectType) && isTransactionDigest(obj.objectId) && isSuiMoveTypeParameterIndex(obj.version);
}
function isDeleteObjectEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.packageId) && isTransactionDigest(obj.transactionModule) && isTransactionDigest(obj.sender) && isTransactionDigest(obj.objectId) && isSuiMoveTypeParameterIndex(obj.version);
}
function isNewObjectEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.packageId) && isTransactionDigest(obj.transactionModule) && isTransactionDigest(obj.sender) && isObjectOwner(obj.recipient) && isTransactionDigest(obj.objectType) && isTransactionDigest(obj.objectId) && isSuiMoveTypeParameterIndex(obj.version);
}
function isSuiEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isMoveEvent(obj.moveEvent) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isPublishEvent(obj.publish) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isCoinBalanceChangeEvent(obj.coinBalanceChange) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransferObjectEvent(obj.transferObject) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isMutateObjectEvent(obj.mutateObject) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isDeleteObjectEvent(obj.deleteObject) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isNewObjectEvent(obj.newObject) || (obj !== null && typeof obj === "object" || typeof obj === "function") && typeof obj.epochChange === "bigint" || (obj !== null && typeof obj === "object" || typeof obj === "function") && typeof obj.checkpoint === "bigint";
}
function isMoveEventField(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.path) && isSuiJsonValue(obj.value);
}
function isEventQuery(obj, _argumentName) {
  return obj === "All" || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.Transaction) || (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.MoveModule !== null && typeof obj.MoveModule === "object" || typeof obj.MoveModule === "function") && isTransactionDigest(obj.MoveModule.package) && isTransactionDigest(obj.MoveModule.module) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.MoveEvent) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isEventType(obj.EventType) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.Sender) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isObjectOwner(obj.Recipient) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.Object) || (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.TimeRange !== null && typeof obj.TimeRange === "object" || typeof obj.TimeRange === "function") && isSuiMoveTypeParameterIndex(obj.TimeRange.start_time) && isSuiMoveTypeParameterIndex(obj.TimeRange.end_time);
}
function isEventId(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.txSeq) && isSuiMoveTypeParameterIndex(obj.eventSeq);
}
function isPaginatedEvents(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiEvents(obj.data) && isEventId(obj.nextCursor);
}
function isEventType(obj, _argumentName) {
  return obj === "MoveEvent" || obj === "Publish" || obj === "TransferObject" || obj === "MutateObject" || obj === "CoinBalanceChange" || obj === "DeleteObject" || obj === "NewObject" || obj === "EpochChange" || obj === "Checkpoint";
}
function isBalanceChangeType(obj, _argumentName) {
  return obj === "Gas" || obj === "Pay" || obj === "Receive";
}
function isSuiEventFilter(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.Package) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.Module) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.MoveEventType) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isMoveEventField(obj.MoveEventField) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.SenderAddress) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isEventType(obj.EventType) || (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.All) && obj.All.every(
    (e) => isSuiEventFilter(e)
  ) || (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.Any) && obj.Any.every(
    (e) => isSuiEventFilter(e)
  ) || (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.And) && isSuiEventFilter(obj.And[0]) && isSuiEventFilter(obj.And[1]) || (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.Or) && isSuiEventFilter(obj.Or[0]) && isSuiEventFilter(obj.Or[1]);
}
function isSuiEventEnvelope(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.timestamp) && isTransactionDigest(obj.txDigest) && isEventId(obj.id) && isSuiEvent(obj.event);
}
function isSuiEvents(obj, _argumentName) {
  return Array.isArray(obj) && obj.every(
    (e) => isSuiEventEnvelope(e)
  );
}
function isSubscriptionId(obj, _argumentName) {
  return typeof obj === "number";
}
function isSubscriptionEvent(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.subscription) && isSuiEventEnvelope(obj.result);
}
function isTransferObject(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.recipient) && isSuiObjectRef(obj.objectRef);
}
function isSuiTransferSui(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.recipient) && isSuiMoveTypeParameterIndex(obj.amount);
}
function isSuiChangeEpoch(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.epoch) && isSuiMoveTypeParameterIndex(obj.storage_charge) && isSuiMoveTypeParameterIndex(obj.computation_charge);
}
function isPay(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.coins) && obj.coins.every(
    (e) => isSuiObjectRef(e)
  ) && Array.isArray(obj.recipients) && obj.recipients.every(
    (e) => isTransactionDigest(e)
  ) && Array.isArray(obj.amounts) && obj.amounts.every(
    (e) => isSuiMoveTypeParameterIndex(e)
  );
}
function isPaySui(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.coins) && obj.coins.every(
    (e) => isSuiObjectRef(e)
  ) && Array.isArray(obj.recipients) && obj.recipients.every(
    (e) => isTransactionDigest(e)
  ) && Array.isArray(obj.amounts) && obj.amounts.every(
    (e) => isSuiMoveTypeParameterIndex(e)
  );
}
function isPayAllSui(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.coins) && obj.coins.every(
    (e) => isSuiObjectRef(e)
  ) && isTransactionDigest(obj.recipient);
}
function isExecuteTransactionRequestType(obj, _argumentName) {
  return obj === "ImmediateReturn" || obj === "WaitForTxCert" || obj === "WaitForEffectsCert" || obj === "WaitForLocalExecution";
}
function isTransactionKindName(obj, _argumentName) {
  return obj === "Publish" || obj === "TransferObject" || obj === "Pay" || obj === "Call" || obj === "TransferSui" || obj === "ChangeEpoch" || obj === "PaySui" || obj === "PayAllSui";
}
function isSuiTransactionKind(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransferObject(obj.TransferObject) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMovePackage(obj.Publish) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isMoveCall(obj.Call) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiTransferSui(obj.TransferSui) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiChangeEpoch(obj.ChangeEpoch) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isPay(obj.Pay) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isPaySui(obj.PaySui) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isPayAllSui(obj.PayAllSui);
}
function isSuiTransactionData(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.transactions) && obj.transactions.every(
    (e) => isSuiTransactionKind(e)
  ) && isTransactionDigest(obj.sender) && isSuiObjectRef(obj.gasPayment) && isSuiMoveTypeParameterIndex(obj.gasBudget);
}
function isEpochId(obj, _argumentName) {
  return typeof obj === "number";
}
function isGenericAuthoritySignature(obj, _argumentName) {
  return isTransactionDigest(obj) || Array.isArray(obj) && obj.every(
    (e) => isTransactionDigest(e)
  );
}
function isAuthorityQuorumSignInfo(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.epoch) && isGenericAuthoritySignature(obj.signature);
}
function isCertifiedTransaction(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.transactionDigest) && isSuiTransactionData(obj.data) && isTransactionDigest(obj.txSignature) && isAuthorityQuorumSignInfo(obj.authSignInfo);
}
function isGasCostSummary(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.computationCost) && isSuiMoveTypeParameterIndex(obj.storageCost) && isSuiMoveTypeParameterIndex(obj.storageRebate);
}
function isExecutionStatusType(obj, _argumentName) {
  return obj === "success" || obj === "failure";
}
function isExecutionStatus(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isExecutionStatusType(obj.status) && isTransactionDigest(obj.error);
}
function isOwnedObjectRef(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isObjectOwner(obj.owner) && isSuiObjectRef(obj.reference);
}
function isTransactionEffects(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isExecutionStatus(obj.status) && isGasCostSummary(obj.gasUsed) && Array.isArray(obj.sharedObjects) && obj.sharedObjects.every(
    (e) => isSuiObjectRef(e)
  ) && isTransactionDigest(obj.transactionDigest) && Array.isArray(obj.created) && obj.created.every(
    (e) => isOwnedObjectRef(e)
  ) && Array.isArray(obj.mutated) && obj.mutated.every(
    (e) => isOwnedObjectRef(e)
  ) && Array.isArray(obj.unwrapped) && obj.unwrapped.every(
    (e) => isOwnedObjectRef(e)
  ) && Array.isArray(obj.deleted) && obj.deleted.every(
    (e) => isSuiObjectRef(e)
  ) && Array.isArray(obj.wrapped) && obj.wrapped.every(
    (e) => isSuiObjectRef(e)
  ) && isOwnedObjectRef(obj.gasObject) && Array.isArray(obj.events) && Array.isArray(obj.dependencies) && obj.dependencies.every(
    (e) => isTransactionDigest(e)
  );
}
function isSuiTransactionResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isCertifiedTransaction(obj.certificate) && isTransactionEffects(obj.effects) && isSuiMoveTypeParameterIndex(obj.timestamp_ms) && isSuiParsedTransactionResponse(obj.parsed_data);
}
function isSuiCertifiedTransactionEffects(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionEffects(obj.effects);
}
function isSuiExecuteTransactionResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.ImmediateReturn !== null && typeof obj.ImmediateReturn === "object" || typeof obj.ImmediateReturn === "function") && isTransactionDigest(obj.ImmediateReturn.tx_digest) || (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.TxCert !== null && typeof obj.TxCert === "object" || typeof obj.TxCert === "function") && isCertifiedTransaction(obj.TxCert.certificate) || (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.EffectsCert !== null && typeof obj.EffectsCert === "object" || typeof obj.EffectsCert === "function") && isCertifiedTransaction(obj.EffectsCert.certificate) && isSuiCertifiedTransactionEffects(obj.EffectsCert.effects);
}
function isGatewayTxSeqNumber(obj, _argumentName) {
  return typeof obj === "number";
}
function isGetTxnDigestsResponse(obj, _argumentName) {
  return Array.isArray(obj) && obj.every(
    (e) => isTransactionDigest(e)
  );
}
function isPaginatedTransactionDigests(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.data) && obj.data.every(
    (e) => isTransactionDigest(e)
  ) && isTransactionDigest(obj.nextCursor);
}
function isTransactionQuery(obj, _argumentName) {
  return obj === "All" || (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.MoveFunction !== null && typeof obj.MoveFunction === "object" || typeof obj.MoveFunction === "function") && isTransactionDigest(obj.MoveFunction.package) && isTransactionDigest(obj.MoveFunction.module) && isTransactionDigest(obj.MoveFunction.function) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.InputObject) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.MutatedObject) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.FromAddress) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.ToAddress);
}
function isMoveCall(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiObjectRef(obj.package) && isTransactionDigest(obj.module) && isTransactionDigest(obj.function) && Array.isArray(obj.typeArguments) && obj.typeArguments.every(
    (e) => isTransactionDigest(e)
  ) && Array.isArray(obj.arguments) && obj.arguments.every(
    (e) => isSuiJsonValue(e)
  );
}
function isSuiJsonValue(obj, _argumentName) {
  return isTransactionDigest(obj) || isSuiMoveTypeParameterIndex(obj) || obj === false || obj === true || Array.isArray(obj) && obj.every(
    (e) => isSuiJsonValue(e)
  );
}
function isEmptySignInfo(obj, _argumentName) {
  return typeof obj === "object";
}
function isAuthorityName(obj, _argumentName) {
  return typeof obj === "string";
}
function isAuthoritySignature(obj, _argumentName) {
  return typeof obj === "string";
}
function isTransactionBytes(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.txBytes) && isSuiObjectRef(obj.gas);
}
function isSuiParsedMergeCoinResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiObject(obj.updatedCoin) && isSuiObject(obj.updatedGas);
}
function isSuiParsedSplitCoinResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiObject(obj.updatedCoin) && Array.isArray(obj.newCoins) && obj.newCoins.every(
    (e) => isSuiObject(e)
  ) && isSuiObject(obj.updatedGas);
}
function isSuiParsedPublishResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.createdObjects) && obj.createdObjects.every(
    (e) => isSuiObject(e)
  ) && isSuiPackage(obj.package) && isSuiObject(obj.updatedGas);
}
function isSuiPackage(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.digest) && isTransactionDigest(obj.objectId) && isSuiMoveTypeParameterIndex(obj.version);
}
function isSuiParsedTransactionResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiParsedSplitCoinResponse(obj.SplitCoin) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiParsedMergeCoinResponse(obj.MergeCoin) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiParsedPublishResponse(obj.Publish);
}
function isDelegationData(obj, _argumentName) {
  return isSuiMoveObject(obj) && (obj !== null && typeof obj === "object" || typeof obj === "function") && isObjectType(obj.dataType) && (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.type === "0x2::delegation::Delegation" && (obj.fields !== null && typeof obj.fields === "object" || typeof obj.fields === "function") && (isSuiMoveTypeParameterIndex(obj.fields.active_delegation) || (obj.fields.active_delegation !== null && typeof obj.fields.active_delegation === "object" || typeof obj.fields.active_delegation === "function") && (obj.fields.active_delegation.fields !== null && typeof obj.fields.active_delegation.fields === "object" || typeof obj.fields.active_delegation.fields === "function") && obj.fields.active_delegation.fields.vec === "" && isTransactionDigest(obj.fields.active_delegation.type)) && isSuiMoveTypeParameterIndex(obj.fields.delegate_amount) && isSuiMoveTypeParameterIndex(obj.fields.next_reward_unclaimed_epoch) && isTransactionDigest(obj.fields.validator_address) && (obj.fields.info !== null && typeof obj.fields.info === "object" || typeof obj.fields.info === "function") && isTransactionDigest(obj.fields.info.id) && isSuiMoveTypeParameterIndex(obj.fields.info.version) && (isSuiMoveObject(obj.fields.coin_locked_until_epoch) || (obj.fields.coin_locked_until_epoch !== null && typeof obj.fields.coin_locked_until_epoch === "object" || typeof obj.fields.coin_locked_until_epoch === "function") && (obj.fields.coin_locked_until_epoch.fields !== null && typeof obj.fields.coin_locked_until_epoch.fields === "object" || typeof obj.fields.coin_locked_until_epoch.fields === "function") && obj.fields.coin_locked_until_epoch.fields.vec === "" && isTransactionDigest(obj.fields.coin_locked_until_epoch.type)) && (isSuiMoveTypeParameterIndex(obj.fields.ending_epoch) || (obj.fields.ending_epoch !== null && typeof obj.fields.ending_epoch === "object" || typeof obj.fields.ending_epoch === "function") && (obj.fields.ending_epoch.fields !== null && typeof obj.fields.ending_epoch.fields === "object" || typeof obj.fields.ending_epoch.fields === "function") && obj.fields.ending_epoch.fields.vec === "" && isTransactionDigest(obj.fields.ending_epoch.type));
}
function isDelegationSuiObject(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isObjectOwner(obj.owner) && isTransactionDigest(obj.previousTransaction) && isSuiMoveTypeParameterIndex(obj.storageRebate) && isSuiObjectRef(obj.reference) && (obj !== null && typeof obj === "object" || typeof obj === "function") && isDelegationData(obj.data);
}
function isTransferObjectTx(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.TransferObject !== null && typeof obj.TransferObject === "object" || typeof obj.TransferObject === "function") && isTransactionDigest(obj.TransferObject.recipient) && isSuiObjectRef(obj.TransferObject.object_ref);
}
function isTransferSuiTx(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.TransferSui !== null && typeof obj.TransferSui === "object" || typeof obj.TransferSui === "function") && isTransactionDigest(obj.TransferSui.recipient) && ((obj.TransferSui.amount !== null && typeof obj.TransferSui.amount === "object" || typeof obj.TransferSui.amount === "function") && isSuiMoveTypeParameterIndex(obj.TransferSui.amount.Some) || (obj.TransferSui.amount !== null && typeof obj.TransferSui.amount === "object" || typeof obj.TransferSui.amount === "function") && obj.TransferSui.amount.None === null);
}
function isPayTx(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.Pay !== null && typeof obj.Pay === "object" || typeof obj.Pay === "function") && Array.isArray(obj.Pay.coins) && obj.Pay.coins.every(
    (e) => isSuiObjectRef(e)
  ) && Array.isArray(obj.Pay.recipients) && obj.Pay.recipients.every(
    (e) => isTransactionDigest(e)
  ) && Array.isArray(obj.Pay.amounts) && obj.Pay.amounts.every(
    (e) => isSuiMoveTypeParameterIndex(e)
  );
}
function isPaySuiTx(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.PaySui !== null && typeof obj.PaySui === "object" || typeof obj.PaySui === "function") && Array.isArray(obj.PaySui.coins) && obj.PaySui.coins.every(
    (e) => isSuiObjectRef(e)
  ) && Array.isArray(obj.PaySui.recipients) && obj.PaySui.recipients.every(
    (e) => isTransactionDigest(e)
  ) && Array.isArray(obj.PaySui.amounts) && obj.PaySui.amounts.every(
    (e) => isSuiMoveTypeParameterIndex(e)
  );
}
function isPayAllSuiTx(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.PayAllSui !== null && typeof obj.PayAllSui === "object" || typeof obj.PayAllSui === "function") && Array.isArray(obj.PayAllSui.coins) && obj.PayAllSui.coins.every(
    (e) => isSuiObjectRef(e)
  ) && isTransactionDigest(obj.PayAllSui.recipient);
}
function isPublishTx(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.Publish !== null && typeof obj.Publish === "object" || typeof obj.Publish === "function") && (obj.Publish.modules !== null && typeof obj.Publish.modules === "object" || typeof obj.Publish.modules === "function") && isSuiMoveTypeParameterIndex(obj.Publish.modules.length);
}
function isSharedObjectRef(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.objectId) && isSuiMoveTypeParameterIndex(obj.initialSharedVersion);
}
function isObjectArg(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiObjectRef(obj.ImmOrOwned) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isSharedObjectRef(obj.Shared);
}
function isCallArg(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.Pure !== null && typeof obj.Pure === "object" || typeof obj.Pure === "function") && isSuiMoveTypeParameterIndex(obj.Pure.length) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isObjectArg(obj.Object) || (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.ObjVec !== null && typeof obj.ObjVec === "object" || typeof obj.ObjVec === "function") && isSuiMoveTypeParameterIndex(obj.ObjVec.length);
}
function isStructTag(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.address) && isTransactionDigest(obj.module) && isTransactionDigest(obj.name) && Array.isArray(obj.typeParams) && obj.typeParams.every(
    (e) => isTypeTag(e)
  );
}
function isTypeTag(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.bool === null || (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.u8 === null || (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.u64 === null || (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.u128 === null || (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.address === null || (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.signer === null || (obj !== null && typeof obj === "object" || typeof obj === "function") && isTypeTag(obj.vector) || (obj !== null && typeof obj === "object" || typeof obj === "function") && isStructTag(obj.struct) || (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.u16 === null || (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.u32 === null || (obj !== null && typeof obj === "object" || typeof obj === "function") && obj.u256 === null;
}
function isMoveCallTx(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && (obj.Call !== null && typeof obj.Call === "object" || typeof obj.Call === "function") && isSuiObjectRef(obj.Call.package) && isTransactionDigest(obj.Call.module) && isTransactionDigest(obj.Call.function) && Array.isArray(obj.Call.typeArguments) && obj.Call.typeArguments.every(
    (e) => isTypeTag(e)
  ) && Array.isArray(obj.Call.arguments) && obj.Call.arguments.every(
    (e) => isCallArg(e)
  );
}
function isTransaction(obj, _argumentName) {
  return isTransferObjectTx(obj) || isTransferSuiTx(obj) || isPayTx(obj) || isPaySuiTx(obj) || isPayAllSuiTx(obj) || isPublishTx(obj) || isMoveCallTx(obj);
}
function isTransactionKind(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransaction(obj.Single) || (obj !== null && typeof obj === "object" || typeof obj === "function") && Array.isArray(obj.Batch) && obj.Batch.every(
    (e) => isTransaction(e)
  );
}
function isTransactionData(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isTransactionDigest(obj.sender) && isSuiMoveTypeParameterIndex(obj.gasBudget) && isSuiMoveTypeParameterIndex(obj.gasPrice) && isTransactionKind(obj.kind) && isSuiObjectRef(obj.gasPayment);
}
function isRpcApiVersion(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.major) && isSuiMoveTypeParameterIndex(obj.minor) && isSuiMoveTypeParameterIndex(obj.patch);
}
function isFaucetCoinInfo(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isSuiMoveTypeParameterIndex(obj.amount) && isTransactionDigest(obj.id) && isTransactionDigest(obj.transfer_tx_digest);
}
function isFaucetResponse(obj, _argumentName) {
  return (obj !== null && typeof obj === "object" || typeof obj === "function") && isFaucetCoinInfo(obj.transferred_gas_objects) && isTransactionDigest(obj.error);
}

// src/types/common.ts
var TX_DIGEST_LENGTH = 32;
var VALID_BASE64_REGEX = /^(?:[a-zA-Z0-9+\/]{4})*(?:|(?:[a-zA-Z0-9+\/]{3}=)|(?:[a-zA-Z0-9+\/]{2}==)|(?:[a-zA-Z0-9+\/]{1}===))$/;
function isValidTransactionDigest(value) {
  return new Base64DataBuffer(value).getLength() === TX_DIGEST_LENGTH && VALID_BASE64_REGEX.test(value);
}
var SUI_ADDRESS_LENGTH = 20;
function isValidSuiAddress(value) {
  return isHex(value) && getHexByteLength(value) === SUI_ADDRESS_LENGTH;
}
function isValidSuiObjectId(value) {
  return isValidSuiAddress(value);
}
function normalizeSuiAddress(value, forceAdd0x = false) {
  let address = value.toLowerCase();
  if (!forceAdd0x && address.startsWith("0x")) {
    address = address.slice(2);
  }
  return `0x${address.padStart(SUI_ADDRESS_LENGTH * 2, "0")}`;
}
function normalizeSuiObjectId(value, forceAdd0x = false) {
  return normalizeSuiAddress(value, forceAdd0x);
}
function isHex(value) {
  return /^(0x|0X)?[a-fA-F0-9]+$/.test(value) && value.length % 2 === 0;
}
function getHexByteLength(value) {
  return /^(0x|0X)/.test(value) ? (value.length - 2) / 2 : value.length / 2;
}

// src/types/objects.ts
var MIST_PER_SUI = BigInt(1e9);
function getObjectExistsResponse(resp) {
  return resp.status !== "Exists" ? void 0 : resp.details;
}
function getObjectDeletedResponse(resp) {
  return resp.status !== "Deleted" ? void 0 : resp.details;
}
function getObjectNotExistsResponse(resp) {
  return resp.status !== "NotExists" ? void 0 : resp.details;
}
function getObjectReference(resp) {
  var _a;
  return ((_a = getObjectExistsResponse(resp)) == null ? void 0 : _a.reference) || getObjectDeletedResponse(resp);
}
function getObjectId(data) {
  var _a;
  if ("objectId" in data) {
    return data.objectId;
  }
  return ((_a = getObjectReference(data)) == null ? void 0 : _a.objectId) ?? getObjectNotExistsResponse(data);
}
function getObjectVersion(data) {
  var _a;
  if ("version" in data) {
    return data.version;
  }
  return (_a = getObjectReference(data)) == null ? void 0 : _a.version;
}
function getObjectType(resp) {
  var _a;
  return (_a = getObjectExistsResponse(resp)) == null ? void 0 : _a.data.dataType;
}
function getObjectPreviousTransactionDigest(resp) {
  var _a;
  return (_a = getObjectExistsResponse(resp)) == null ? void 0 : _a.previousTransaction;
}
function getObjectOwner(resp) {
  var _a;
  return (_a = getObjectExistsResponse(resp)) == null ? void 0 : _a.owner;
}
function getSharedObjectInitialVersion(resp) {
  const owner = getObjectOwner(resp);
  if (typeof owner === "object" && "Shared" in owner) {
    return owner.Shared.initial_shared_version;
  } else {
    return void 0;
  }
}
function isSharedObject(resp) {
  const owner = getObjectOwner(resp);
  return typeof owner === "object" && "Shared" in owner;
}
function isImmutableObject(resp) {
  const owner = getObjectOwner(resp);
  return owner === "Immutable";
}
function getMoveObjectType(resp) {
  var _a;
  return (_a = getMoveObject(resp)) == null ? void 0 : _a.type;
}
function getObjectFields(resp) {
  var _a;
  if ("fields" in resp) {
    return resp.fields;
  }
  return (_a = getMoveObject(resp)) == null ? void 0 : _a.fields;
}
function getMoveObject(data) {
  const suiObject = "data" in data ? data : getObjectExistsResponse(data);
  if ((suiObject == null ? void 0 : suiObject.data.dataType) !== "moveObject") {
    return void 0;
  }
  return suiObject.data;
}
function hasPublicTransfer(data) {
  var _a;
  return ((_a = getMoveObject(data)) == null ? void 0 : _a.has_public_transfer) ?? false;
}
function getMovePackageContent(data) {
  if ("disassembled" in data) {
    return data.disassembled;
  }
  const suiObject = getObjectExistsResponse(data);
  if ((suiObject == null ? void 0 : suiObject.data.dataType) !== "package") {
    return void 0;
  }
  return suiObject.data.disassembled;
}
function extractMutableReference(normalizedType) {
  return typeof normalizedType === "object" && "MutableReference" in normalizedType ? normalizedType.MutableReference : void 0;
}
function extractReference(normalizedType) {
  return typeof normalizedType === "object" && "Reference" in normalizedType ? normalizedType.Reference : void 0;
}
function extractStructTag(normalizedType) {
  if (typeof normalizedType === "object" && "Struct" in normalizedType) {
    return normalizedType;
  }
  const ref = extractReference(normalizedType);
  const mutRef = extractMutableReference(normalizedType);
  if (typeof ref === "object" && "Struct" in ref) {
    return ref;
  }
  if (typeof mutRef === "object" && "Struct" in mutRef) {
    return mutRef;
  }
  return void 0;
}

// src/types/transactions.ts
function getCertifiedTransaction(tx) {
  if ("certificate" in tx) {
    return tx.certificate;
  } else if ("TxCert" in tx) {
    return tx.TxCert.certificate;
  } else if ("EffectsCert" in tx) {
    return tx.EffectsCert.certificate;
  }
  return void 0;
}
function getTransactionDigest(tx) {
  if ("ImmediateReturn" in tx) {
    return tx.ImmediateReturn.tx_digest;
  }
  if ("transactionDigest" in tx) {
    return tx.transactionDigest;
  }
  const ctxn = getCertifiedTransaction(tx);
  return ctxn.transactionDigest;
}
function getTransactionSignature(tx) {
  return tx.txSignature;
}
function getTransactionAuthorityQuorumSignInfo(tx) {
  return tx.authSignInfo;
}
function getTransactionData(tx) {
  return tx.data;
}
function getTransactionSender(tx) {
  return tx.data.sender;
}
function getTransactionGasObject(tx) {
  return tx.data.gasPayment;
}
function getTransactionGasBudget(tx) {
  return tx.data.gasBudget;
}
function getTransferObjectTransaction(data) {
  return "TransferObject" in data ? data.TransferObject : void 0;
}
function getPublishTransaction(data) {
  return "Publish" in data ? data.Publish : void 0;
}
function getMoveCallTransaction(data) {
  return "Call" in data ? data.Call : void 0;
}
function getTransferSuiTransaction(data) {
  return "TransferSui" in data ? data.TransferSui : void 0;
}
function getPayTransaction(data) {
  return "Pay" in data ? data.Pay : void 0;
}
function getPaySuiTransaction(data) {
  return "PaySui" in data ? data.PaySui : void 0;
}
function getPayAllSuiTransaction(data) {
  return "PayAllSui" in data ? data.PayAllSui : void 0;
}
function getChangeEpochTransaction(data) {
  return "ChangeEpoch" in data ? data.ChangeEpoch : void 0;
}
function getTransactions(data) {
  return data.data.transactions;
}
function getTransferSuiAmount(data) {
  return "TransferSui" in data && data.TransferSui.amount ? BigInt(data.TransferSui.amount) : null;
}
function getTransactionKindName(data) {
  return Object.keys(data)[0];
}
function getExecutionStatusType(data) {
  var _a;
  return (_a = getExecutionStatus(data)) == null ? void 0 : _a.status;
}
function getExecutionStatus(data) {
  var _a;
  return (_a = getTransactionEffects(data)) == null ? void 0 : _a.status;
}
function getExecutionStatusError(data) {
  var _a;
  return (_a = getExecutionStatus(data)) == null ? void 0 : _a.error;
}
function getExecutionStatusGasSummary(data) {
  var _a;
  if (isTransactionEffects(data)) {
    return data.gasUsed;
  }
  return (_a = getTransactionEffects(data)) == null ? void 0 : _a.gasUsed;
}
function getTotalGasUsed(data) {
  const gasSummary = getExecutionStatusGasSummary(data);
  return gasSummary ? gasSummary.computationCost + gasSummary.storageCost - gasSummary.storageRebate : void 0;
}
function getTransactionEffects(data) {
  if ("effects" in data) {
    return data.effects;
  }
  return "EffectsCert" in data ? data.EffectsCert.effects.effects : void 0;
}
function getEvents(data) {
  var _a;
  return (_a = getTransactionEffects(data)) == null ? void 0 : _a.events;
}
function getCreatedObjects(data) {
  var _a;
  return (_a = getTransactionEffects(data)) == null ? void 0 : _a.created;
}
function getTimestampFromTransactionResponse(data) {
  return "timestamp_ms" in data ? data.timestamp_ms ?? void 0 : void 0;
}
function getParsedSplitCoinResponse(data) {
  const parsed = data.parsed_data;
  return parsed && "SplitCoin" in parsed ? parsed.SplitCoin : void 0;
}
function getParsedMergeCoinResponse(data) {
  const parsed = data.parsed_data;
  return parsed && "MergeCoin" in parsed ? parsed.MergeCoin : void 0;
}
function getParsedPublishResponse(data) {
  const parsed = data.parsed_data;
  return parsed && "Publish" in parsed ? parsed.Publish : void 0;
}
function getCoinAfterMerge(data) {
  var _a;
  return (_a = getParsedMergeCoinResponse(data)) == null ? void 0 : _a.updatedCoin;
}
function getCoinAfterSplit(data) {
  var _a;
  return (_a = getParsedSplitCoinResponse(data)) == null ? void 0 : _a.updatedCoin;
}
function getNewlyCreatedCoinsAfterSplit(data) {
  var _a;
  return (_a = getParsedSplitCoinResponse(data)) == null ? void 0 : _a.newCoins;
}
function getNewlyCreatedCoinRefsAfterSplit(data) {
  var _a;
  if ("EffectsCert" in data) {
    const effects = data.EffectsCert.effects.effects;
    return (_a = effects.created) == null ? void 0 : _a.map((c) => c.reference);
  }
  return void 0;
}

// src/types/option.ts
function getOption(option) {
  if (typeof option === "object" && option !== null && "type" in option && option.type.startsWith("0x1::option::Option<")) {
    return void 0;
  }
  return option;
}

// src/types/framework.ts
var SUI_FRAMEWORK_ADDRESS = "0x2";
var MOVE_STDLIB_ADDRESS = "0x1";
var OBJECT_MODULE_NAME = "object";
var UID_STRUCT_NAME = "UID";
var ID_STRUCT_NAME = "ID";
var SUI_TYPE_ARG = `${SUI_FRAMEWORK_ADDRESS}::sui::SUI`;
var COIN_TYPE = `${SUI_FRAMEWORK_ADDRESS}::coin::Coin`;
var PAY_MODULE_NAME = "pay";
var PAY_SPLIT_COIN_VEC_FUNC_NAME = "split_vec";
var PAY_JOIN_COIN_FUNC_NAME = "join";
var COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;
var Coin = class {
  static isCoin(data) {
    var _a;
    return ((_a = Coin.getType(data)) == null ? void 0 : _a.startsWith(COIN_TYPE)) ?? false;
  }
  static getCoinType(type) {
    const [, res] = type.match(COIN_TYPE_ARG_REGEX) ?? [];
    return res || null;
  }
  static getCoinTypeArg(obj) {
    const type = Coin.getType(obj);
    return type ? Coin.getCoinType(type) : null;
  }
  static isSUI(obj) {
    const arg = Coin.getCoinTypeArg(obj);
    return arg ? Coin.getCoinSymbol(arg) === "SUI" : false;
  }
  static getCoinSymbol(coinTypeArg) {
    return coinTypeArg.substring(coinTypeArg.lastIndexOf(":") + 1);
  }
  static getCoinStructTag(coinTypeArg) {
    return {
      address: normalizeSuiObjectId(coinTypeArg.split("::")[0]),
      module: coinTypeArg.split("::")[1],
      name: coinTypeArg.split("::")[2],
      typeParams: []
    };
  }
  static getID(obj) {
    if (isSuiMoveObject(obj)) {
      return obj.fields.id.id;
    }
    return getObjectId(obj);
  }
  static selectCoinsWithBalanceGreaterThanOrEqual(coins, amount, exclude = []) {
    return Coin.sortByBalance(
      coins.filter(
        (c) => !exclude.includes(Coin.getID(c)) && Coin.getBalance(c) >= amount
      )
    );
  }
  static selectCoinWithBalanceGreaterThanOrEqual(coins, amount, exclude = []) {
    return coins.find(
      (c) => !exclude.includes(Coin.getID(c)) && Coin.getBalance(c) >= amount
    );
  }
  static selectCoinSetWithCombinedBalanceGreaterThanOrEqual(coins, amount, exclude = []) {
    const sortedCoins = Coin.sortByBalance(
      coins.filter((c) => !exclude.includes(Coin.getID(c)))
    );
    const total = Coin.totalBalance(sortedCoins);
    if (total < amount) {
      return [];
    } else if (total === amount) {
      return sortedCoins;
    }
    let sum = BigInt(0);
    let ret = [];
    while (sum < total) {
      const target = amount - sum;
      const coinWithSmallestSufficientBalance = sortedCoins.find(
        (c) => Coin.getBalance(c) >= target
      );
      if (coinWithSmallestSufficientBalance) {
        ret.push(coinWithSmallestSufficientBalance);
        break;
      }
      const coinWithLargestBalance = sortedCoins.pop();
      ret.push(coinWithLargestBalance);
      sum += Coin.getBalance(coinWithLargestBalance);
    }
    return Coin.sortByBalance(ret);
  }
  static totalBalance(coins) {
    return coins.reduce(
      (partialSum, c) => partialSum + Coin.getBalance(c),
      BigInt(0)
    );
  }
  static sortByBalance(coins) {
    return coins.sort(
      (a, b) => Coin.getBalance(a) < Coin.getBalance(b) ? -1 : Coin.getBalance(a) > Coin.getBalance(b) ? 1 : 0
    );
  }
  static getBalance(data) {
    var _a;
    if (!Coin.isCoin(data)) {
      return void 0;
    }
    const balance = (_a = getObjectFields(data)) == null ? void 0 : _a.balance;
    return BigInt(balance);
  }
  static getZero() {
    return BigInt(0);
  }
  static getType(data) {
    if ("status" in data) {
      return getMoveObjectType(data);
    }
    return data.type;
  }
  static async transfer(signer, allCoins, coinTypeArg, amountToSend, recipient, gasBudget) {
    const tx = await Coin.newTransferTx(
      signer,
      allCoins,
      coinTypeArg,
      amountToSend,
      recipient,
      gasBudget
    );
    return signer.signAndExecuteTransaction(tx);
  }
  static async newTransferTx(signer, allCoins, coinTypeArg, amountToSend, recipient, gasBudget) {
    const isSuiTransfer = coinTypeArg === SUI_TYPE_ARG;
    const coinsOfTransferType = allCoins.filter(
      (aCoin) => Coin.getCoinTypeArg(aCoin) === coinTypeArg
    );
    const totalAmountIncludingGas = amountToSend + BigInt(isSuiTransfer ? gasBudget : 0);
    const inputCoinObjs = await Coin.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
      coinsOfTransferType,
      totalAmountIncludingGas
    );
    if (!inputCoinObjs.length) {
      const totalBalanceOfTransferType = Coin.totalBalance(coinsOfTransferType);
      const suggestedAmountToSend = totalBalanceOfTransferType - BigInt(isSuiTransfer ? gasBudget : 0);
      throw new Error(
        `Coin balance ${totalBalanceOfTransferType} is not sufficient to cover the transfer amount ${amountToSend}. Try reducing the transfer amount to ${suggestedAmountToSend}.`
      );
    }
    if (!isSuiTransfer) {
      const allGasCoins = allCoins.filter((aCoin) => Coin.isSUI(aCoin));
      const gasCoin = Coin.selectCoinWithBalanceGreaterThanOrEqual(
        allGasCoins,
        BigInt(gasBudget)
      );
      if (!gasCoin) {
        throw new Error(
          `Unable to find a coin to cover the gas budget ${gasBudget}`
        );
      }
    }
    const signerAddress = await signer.getAddress();
    const inputCoins = inputCoinObjs.map(Coin.getID);
    const txCommon = {
      inputCoins,
      recipients: [recipient],
      amounts: [Number(amountToSend)],
      gasBudget: Number(gasBudget)
    };
    if (isSuiTransfer) {
      return signer.serializer.newPaySui(signerAddress, {
        ...txCommon
      });
    }
    return signer.serializer.newPay(signerAddress, {
      ...txCommon
    });
  }
};
var _Delegation = class {
  static isDelegationSuiObject(obj) {
    return "type" in obj.data && obj.data.type === _Delegation.SUI_OBJECT_TYPE;
  }
  constructor(obj) {
    this.suiObject = obj;
  }
  nextRewardUnclaimedEpoch() {
    return this.suiObject.data.fields.next_reward_unclaimed_epoch;
  }
  activeDelegation() {
    return BigInt(getOption(this.suiObject.data.fields.active_delegation) || 0);
  }
  delegateAmount() {
    return this.suiObject.data.fields.delegate_amount;
  }
  endingEpoch() {
    return getOption(this.suiObject.data.fields.ending_epoch);
  }
  validatorAddress() {
    return this.suiObject.data.fields.validator_address;
  }
  isActive() {
    return this.activeDelegation() > 0 && !this.endingEpoch();
  }
  hasUnclaimedRewards(epoch) {
    return this.nextRewardUnclaimedEpoch() <= epoch && (this.isActive() || (this.endingEpoch() || 0) > epoch);
  }
};
var Delegation = _Delegation;
Delegation.SUI_OBJECT_TYPE = "0x2::delegation::Delegation";

// src/types/sui-bcs.ts
import { BCS, decodeStr, encodeStr, getSuiMoveConfig } from "@mysten/bcs";
var bcs = new BCS(getSuiMoveConfig());
bcs.registerType(
  "utf8string",
  (writer, str) => {
    const bytes = Array.from(new TextEncoder().encode(str));
    return writer.writeVec(bytes, (writer2, el) => writer2.write8(el));
  },
  (reader) => {
    let bytes = reader.readVec((reader2) => reader2.read8());
    return new TextDecoder().decode(new Uint8Array(bytes));
  }
).registerType(
  "ObjectDigest",
  (writer, str) => {
    let bytes = Array.from(decodeStr(str, "base64"));
    return writer.writeVec(bytes, (writer2, el) => writer2.write8(el));
  },
  (reader) => {
    let bytes = reader.readVec((reader2) => reader2.read8());
    return encodeStr(new Uint8Array(bytes), "base64");
  }
);
bcs.registerStructType("SuiObjectRef", {
  objectId: "address",
  version: "u64",
  digest: "ObjectDigest"
});
bcs.registerStructType("TransferObjectTx", {
  recipient: "address",
  object_ref: "SuiObjectRef"
});
bcs.registerStructType("PayTx", {
  coins: "vector<SuiObjectRef>",
  recipients: "vector<address>",
  amounts: "vector<u64>"
});
bcs.registerStructType("PaySuiTx", {
  coins: "vector<SuiObjectRef>",
  recipients: "vector<address>",
  amounts: "vector<u64>"
});
bcs.registerStructType("PayAllSuiTx", {
  coins: "vector<SuiObjectRef>",
  recipient: "address"
});
bcs.registerEnumType("Option<T>", {
  None: null,
  Some: "T"
});
bcs.registerStructType("TransferSuiTx", {
  recipient: "address",
  amount: "Option<u64>"
});
bcs.registerStructType("PublishTx", {
  modules: "vector<vector<u8>>"
});
bcs.registerStructType("SharedObjectRef", {
  objectId: "address",
  initialSharedVersion: "u64"
}).registerEnumType("ObjectArg", {
  ImmOrOwned: "SuiObjectRef",
  Shared: "SharedObjectRef"
}).registerEnumType("CallArg", {
  Pure: "vector<u8>",
  Object: "ObjectArg",
  ObjVec: "vector<ObjectArg>"
});
bcs.registerEnumType("TypeTag", {
  bool: null,
  u8: null,
  u64: null,
  u128: null,
  address: null,
  signer: null,
  vector: "TypeTag",
  struct: "StructTag",
  u16: null,
  u32: null,
  u256: null
}).registerStructType("StructTag", {
  address: "address",
  module: "string",
  name: "string",
  typeParams: "vector<TypeTag>"
});
bcs.registerStructType("MoveCallTx", {
  package: "SuiObjectRef",
  module: "string",
  function: "string",
  typeArguments: "vector<TypeTag>",
  arguments: "vector<CallArg>"
});
bcs.registerEnumType("Transaction", {
  TransferObject: "TransferObjectTx",
  Publish: "PublishTx",
  Call: "MoveCallTx",
  TransferSui: "TransferSuiTx",
  Pay: "PayTx",
  PaySui: "PaySuiTx",
  PayAllSui: "PayAllSuiTx"
});
bcs.registerEnumType("TransactionKind", {
  Single: "Transaction",
  Batch: "vector<Transaction>"
});
bcs.registerStructType("TransactionData", {
  kind: "TransactionKind",
  sender: "address",
  gasPayment: "SuiObjectRef",
  gasPrice: "u64",
  gasBudget: "u64"
});

// src/types/version.ts
function parseVersionFromString(version) {
  const versions = version.split(".");
  return {
    major: parseInt(versions[0], 10),
    minor: parseInt(versions[1], 10),
    patch: parseInt(versions[2], 10)
  };
}

// src/rpc/websocket-client.ts
import { Client as WsRpcClient } from "rpc-websockets";
var getWebsocketUrl = (httpUrl, port) => {
  const url = new URL(httpUrl);
  url.protocol = url.protocol.replace("http", "ws");
  url.port = (port ?? 9001).toString();
  return url.toString();
};
var isMinimumSubscriptionMessage = (msg) => msg && "subscription" in msg && typeof msg["subscription"] === "number" && "result" in msg && typeof msg["result"] === "object";
var DEFAULT_CLIENT_OPTIONS = {
  connectTimeout: 15e3,
  callTimeout: 3e4,
  reconnectInterval: 3e3,
  maxReconnects: 5
};
var SUBSCRIBE_EVENT_METHOD = "sui_subscribeEvent";
var UNSUBSCRIBE_EVENT_METHOD = "sui_unsubscribeEvent";
var WebsocketClient = class {
  constructor(endpoint, skipValidation, options = DEFAULT_CLIENT_OPTIONS) {
    this.endpoint = endpoint;
    this.skipValidation = skipValidation;
    this.options = options;
    this.connectionState = 0 /* NotConnected */;
    this.connectionTimeout = null;
    this.isSetup = false;
    this.connectionPromise = null;
    this.eventSubscriptions = /* @__PURE__ */ new Map();
    if (this.endpoint.startsWith("http"))
      this.endpoint = getWebsocketUrl(this.endpoint);
    this.rpcClient = new WsRpcClient(this.endpoint, {
      reconnect_interval: this.options.reconnectInterval,
      max_reconnects: this.options.maxReconnects,
      autoconnect: false
    });
  }
  setupSocket() {
    if (this.isSetup)
      return;
    this.rpcClient.on("open", () => {
      if (this.connectionTimeout) {
        clearTimeout(this.connectionTimeout);
        this.connectionTimeout = null;
      }
      this.connectionState = 2 /* Connected */;
      this.rpcClient.socket.on(
        "message",
        this.onSocketMessage.bind(this)
      );
    });
    this.rpcClient.on("close", () => {
      this.connectionState = 0 /* NotConnected */;
    });
    this.rpcClient.on("error", console.error);
    this.isSetup = true;
  }
  onSocketMessage(rawMessage) {
    const msg = JSON.parse(rawMessage);
    const params = msg.params;
    if (msg.method === SUBSCRIBE_EVENT_METHOD) {
      if (this.skipValidation && isMinimumSubscriptionMessage(params)) {
        const sub = this.eventSubscriptions.get(params.subscription);
        if (sub)
          sub.onMessage(params.result);
      } else if (isSubscriptionEvent(params)) {
        const sub = this.eventSubscriptions.get(params.subscription);
        if (sub)
          sub.onMessage(params.result);
      }
    }
  }
  async connect() {
    if (this.connectionPromise)
      return this.connectionPromise;
    if (this.connectionState === 2 /* Connected */)
      return Promise.resolve();
    this.setupSocket();
    this.rpcClient.connect();
    this.connectionState = 1 /* Connecting */;
    this.connectionPromise = new Promise((resolve, reject) => {
      this.connectionTimeout = setTimeout(
        () => reject(new Error("timeout")),
        this.options.connectTimeout
      );
      this.rpcClient.once("open", () => {
        this.refreshSubscriptions();
        this.connectionPromise = null;
        resolve();
      });
      this.rpcClient.once("error", (err) => {
        this.connectionPromise = null;
        reject(err);
      });
    });
    return this.connectionPromise;
  }
  async refreshSubscriptions() {
    if (this.eventSubscriptions.size === 0)
      return;
    try {
      let newSubs = /* @__PURE__ */ new Map();
      let newSubsArr = await Promise.all(
        Array.from(this.eventSubscriptions.values()).map(async (sub) => {
          const onMessage = sub.onMessage;
          const filter = sub.filter;
          if (!filter || !onMessage)
            return Promise.resolve(null);
          const id = await this.subscribeEvent(filter, onMessage);
          return { id, onMessage, filter };
        })
      );
      newSubsArr.forEach((entry) => {
        if (entry === null)
          return;
        const filter = entry.filter;
        const onMessage = entry.onMessage;
        newSubs.set(entry.id, { filter, onMessage });
      });
      this.eventSubscriptions = newSubs;
    } catch (err) {
      throw new Error(`error refreshing event subscriptions: ${err}`);
    }
  }
  async subscribeEvent(filter, onMessage) {
    try {
      if (this.connectionState != 2 /* Connected */)
        await this.connect();
      let subId = await this.rpcClient.call(
        SUBSCRIBE_EVENT_METHOD,
        [filter],
        this.options.callTimeout
      );
      this.eventSubscriptions.set(subId, { filter, onMessage });
      return subId;
    } catch (err) {
      throw new Error(
        `Error subscribing to event: ${err}, filter: ${JSON.stringify(filter)}`
      );
    }
  }
  async unsubscribeEvent(id) {
    try {
      if (this.connectionState != 2 /* Connected */)
        await this.connect();
      let removedOnNode = await this.rpcClient.call(
        UNSUBSCRIBE_EVENT_METHOD,
        [id],
        this.options.callTimeout
      );
      return this.eventSubscriptions.delete(id) || removedOnNode;
    } catch (err) {
      throw new Error(
        `Error unsubscribing from event: ${err}, subscription: ${id}}`
      );
    }
  }
};

// src/utils/api-endpoints.ts
var Network = /* @__PURE__ */ ((Network2) => {
  Network2["LOCAL"] = "LOCAL";
  Network2["DEVNET"] = "DEVNET";
  return Network2;
})(Network || {});
var NETWORK_TO_API = {
  ["LOCAL" /* LOCAL */]: {
    fullNode: "http://127.0.0.1:9000",
    faucet: "http://127.0.0.1:9123/gas"
  },
  ["DEVNET" /* DEVNET */]: {
    fullNode: "https://fullnode.devnet.sui.io/",
    faucet: "https://faucet.devnet.sui.io/gas"
  }
};

// src/rpc/faucet-client.ts
import fetch2 from "cross-fetch";
var FaucetRateLimitError = class extends Error {
};
async function requestSuiFromFaucet(endpoint, recipient, httpHeaders) {
  const res = await fetch2(endpoint, {
    method: "POST",
    body: JSON.stringify({
      FixedAmountRequest: {
        recipient
      }
    }),
    headers: {
      "Content-Type": "application/json",
      ...httpHeaders || {}
    }
  });
  if (res.status === 429) {
    throw new FaucetRateLimitError(
      `Too many requests from this client have been sent to the faucet. Please retry later`
    );
  }
  let parsed;
  try {
    parsed = await res.json();
  } catch (e) {
    throw new Error(
      `Ecountered error when parsing response from faucet, error: ${e}, status ${res.status}, response ${res}`
    );
  }
  if (parsed.error) {
    throw new Error(`Faucet returns error: ${parsed.error}`);
  }
  return parsed;
}

// src/providers/json-rpc-provider.ts
var isNumber = (val) => typeof val === "number";
var isAny = (_val) => true;
var DEFAULT_OPTIONS = {
  skipDataValidation: true,
  socketOptions: DEFAULT_CLIENT_OPTIONS,
  versionCacheTimoutInSeconds: 600
};
var JsonRpcProvider = class extends Provider {
  constructor(endpoint = "DEVNET" /* DEVNET */, options = DEFAULT_OPTIONS) {
    super();
    this.options = options;
    if (Object.values(Network).includes(endpoint)) {
      this.endpoints = NETWORK_TO_API[endpoint];
    } else {
      this.endpoints = {
        fullNode: endpoint,
        faucet: options.faucetURL
      };
    }
    const opts = { ...DEFAULT_OPTIONS, ...options };
    this.client = new JsonRpcClient(this.endpoints.fullNode);
    this.wsClient = new WebsocketClient(
      this.endpoints.fullNode,
      opts.skipDataValidation,
      opts.socketOptions
    );
  }
  async getRpcApiVersion() {
    if (this.rpcApiVersion && this.cacheExpiry && this.cacheExpiry <= Date.now()) {
      return this.rpcApiVersion;
    }
    try {
      const resp = await this.client.requestWithType(
        "rpc.discover",
        [],
        isAny,
        this.options.skipDataValidation
      );
      this.rpcApiVersion = parseVersionFromString(resp.info.version);
      this.cacheExpiry = Date.now() + (this.options.versionCacheTimoutInSeconds ?? 0);
      return this.rpcApiVersion;
    } catch (err) {
      console.warn("Error fetching version number of the RPC API", err);
    }
    return void 0;
  }
  async requestSuiFromFaucet(recipient, httpHeaders) {
    if (!this.endpoints.faucet) {
      throw new Error("Faucet URL is not specified");
    }
    return requestSuiFromFaucet(this.endpoints.faucet, recipient, httpHeaders);
  }
  async getMoveFunctionArgTypes(packageId, moduleName, functionName) {
    try {
      return await this.client.requestWithType(
        "sui_getMoveFunctionArgTypes",
        [packageId, moduleName, functionName],
        isSuiMoveFunctionArgTypes,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching Move function arg types with package object ID: ${packageId}, module name: ${moduleName}, function name: ${functionName}`
      );
    }
  }
  async getNormalizedMoveModulesByPackage(packageId) {
    try {
      return await this.client.requestWithType(
        "sui_getNormalizedMoveModulesByPackage",
        [packageId],
        isSuiMoveNormalizedModules,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching package: ${err} for package ${packageId}`
      );
    }
  }
  async getNormalizedMoveModule(packageId, moduleName) {
    try {
      return await this.client.requestWithType(
        "sui_getNormalizedMoveModule",
        [packageId, moduleName],
        isSuiMoveNormalizedModule,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching module: ${err} for package ${packageId}, module ${moduleName}}`
      );
    }
  }
  async getNormalizedMoveFunction(packageId, moduleName, functionName) {
    try {
      return await this.client.requestWithType(
        "sui_getNormalizedMoveFunction",
        [packageId, moduleName, functionName],
        isSuiMoveNormalizedFunction,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching function: ${err} for package ${packageId}, module ${moduleName} and function ${functionName}}`
      );
    }
  }
  async getNormalizedMoveStruct(packageId, moduleName, structName) {
    try {
      return await this.client.requestWithType(
        "sui_getNormalizedMoveStruct",
        [packageId, moduleName, structName],
        isSuiMoveNormalizedStruct,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching struct: ${err} for package ${packageId}, module ${moduleName} and struct ${structName}}`
      );
    }
  }
  async getObjectsOwnedByAddress(address) {
    try {
      return await this.client.requestWithType(
        "sui_getObjectsOwnedByAddress",
        [address],
        isGetOwnedObjectsResponse,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching owned object: ${err} for address ${address}`
      );
    }
  }
  async getGasObjectsOwnedByAddress(address) {
    const objects = await this.getObjectsOwnedByAddress(address);
    return objects.filter((obj) => Coin.isSUI(obj));
  }
  getCoinDenominationInfo(coinType) {
    const [packageId, module, symbol] = coinType.split("::");
    if (normalizeSuiAddress(packageId) !== normalizeSuiAddress("0x2") || module != "sui" || symbol !== "SUI") {
      throw new Error(
        "only SUI coin is supported in getCoinDenominationInfo for now."
      );
    }
    return {
      coinType,
      basicUnit: "MIST",
      decimalNumber: 9
    };
  }
  async getCoinBalancesOwnedByAddress(address, typeArg) {
    const objects = await this.getObjectsOwnedByAddress(address);
    const coinIds = objects.filter(
      (obj) => Coin.isCoin(obj) && (typeArg === void 0 || typeArg === Coin.getCoinTypeArg(obj))
    ).map((c) => c.objectId);
    return await this.getObjectBatch(coinIds);
  }
  async selectCoinsWithBalanceGreaterThanOrEqual(address, amount, typeArg = SUI_TYPE_ARG, exclude = []) {
    const coins = await this.getCoinBalancesOwnedByAddress(address, typeArg);
    return await Coin.selectCoinsWithBalanceGreaterThanOrEqual(
      coins,
      amount,
      exclude
    );
  }
  async selectCoinSetWithCombinedBalanceGreaterThanOrEqual(address, amount, typeArg = SUI_TYPE_ARG, exclude = []) {
    const coins = await this.getCoinBalancesOwnedByAddress(address, typeArg);
    return await Coin.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
      coins,
      amount,
      exclude
    );
  }
  async getObjectsOwnedByObject(objectId) {
    try {
      return await this.client.requestWithType(
        "sui_getObjectsOwnedByObject",
        [objectId],
        isGetOwnedObjectsResponse,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching owned object: ${err} for objectId ${objectId}`
      );
    }
  }
  async getObject(objectId) {
    try {
      return await this.client.requestWithType(
        "sui_getObject",
        [objectId],
        isGetObjectDataResponse,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(`Error fetching object info: ${err} for id ${objectId}`);
    }
  }
  async getObjectRef(objectId) {
    const resp = await this.getObject(objectId);
    return getObjectReference(resp);
  }
  async getObjectBatch(objectIds) {
    const requests = objectIds.map((id) => ({
      method: "sui_getObject",
      args: [id]
    }));
    try {
      return await this.client.batchRequestWithType(
        requests,
        isGetObjectDataResponse,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(`Error fetching object info: ${err} for id ${objectIds}`);
    }
  }
  async getTransactions(query, cursor = null, limit = null, order = "descending") {
    try {
      return await this.client.requestWithType(
        "sui_getTransactions",
        [query, cursor, limit, order === "descending"],
        isPaginatedTransactionDigests,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error getting transactions for query: ${err} for query ${query}`
      );
    }
  }
  async getTransactionsForObject(objectID, descendingOrder = true) {
    const requests = [
      {
        method: "sui_getTransactions",
        args: [{ InputObject: objectID }, null, null, descendingOrder]
      },
      {
        method: "sui_getTransactions",
        args: [{ MutatedObject: objectID }, null, null, descendingOrder]
      }
    ];
    try {
      const results = await this.client.batchRequestWithType(
        requests,
        isPaginatedTransactionDigests,
        this.options.skipDataValidation
      );
      return [...results[0].data, ...results[1].data];
    } catch (err) {
      throw new Error(
        `Error getting transactions for object: ${err} for id ${objectID}`
      );
    }
  }
  async getTransactionsForAddress(addressID, descendingOrder = true) {
    const requests = [
      {
        method: "sui_getTransactions",
        args: [{ ToAddress: addressID }, null, null, descendingOrder]
      },
      {
        method: "sui_getTransactions",
        args: [{ FromAddress: addressID }, null, null, descendingOrder]
      }
    ];
    try {
      const results = await this.client.batchRequestWithType(
        requests,
        isPaginatedTransactionDigests,
        this.options.skipDataValidation
      );
      return [...results[0].data, ...results[1].data];
    } catch (err) {
      throw new Error(
        `Error getting transactions for address: ${err} for id ${addressID}`
      );
    }
  }
  async getTransactionWithEffects(digest) {
    try {
      const resp = await this.client.requestWithType(
        "sui_getTransaction",
        [digest],
        isSuiTransactionResponse,
        this.options.skipDataValidation
      );
      return resp;
    } catch (err) {
      throw new Error(
        `Error getting transaction with effects: ${err} for digest ${digest}`
      );
    }
  }
  async getTransactionWithEffectsBatch(digests) {
    const requests = digests.map((d) => ({
      method: "sui_getTransaction",
      args: [d]
    }));
    try {
      return await this.client.batchRequestWithType(
        requests,
        isSuiTransactionResponse,
        this.options.skipDataValidation
      );
    } catch (err) {
      const list = digests.join(", ").substring(0, -2);
      throw new Error(
        `Error getting transaction effects: ${err} for digests [${list}]`
      );
    }
  }
  async executeTransaction(txnBytes, signatureScheme, signature, pubkey, requestType = "WaitForEffectsCert") {
    try {
      const resp = await this.client.requestWithType(
        "sui_executeTransaction",
        [txnBytes, signatureScheme, signature, pubkey, requestType],
        isSuiExecuteTransactionResponse,
        this.options.skipDataValidation
      );
      return resp;
    } catch (err) {
      throw new Error(`Error executing transaction with request type: ${err}}`);
    }
  }
  async getTotalTransactionNumber() {
    try {
      const resp = await this.client.requestWithType(
        "sui_getTotalTransactionNumber",
        [],
        isNumber,
        this.options.skipDataValidation
      );
      return resp;
    } catch (err) {
      throw new Error(`Error fetching total transaction number: ${err}`);
    }
  }
  async getTransactionDigestsInRange(start, end) {
    try {
      return await this.client.requestWithType(
        "sui_getTransactionsInRange",
        [start, end],
        isGetTxnDigestsResponse,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error fetching transaction digests in range: ${err} for range ${start}-${end}`
      );
    }
  }
  async getEvents(query, cursor, limit, order = "descending") {
    try {
      return await this.client.requestWithType(
        "sui_getEvents",
        [query, cursor, limit, order === "descending"],
        isPaginatedEvents,
        this.options.skipDataValidation
      );
    } catch (err) {
      throw new Error(
        `Error getting events for query: ${err} for query ${query}`
      );
    }
  }
  async subscribeEvent(filter, onMessage) {
    return this.wsClient.subscribeEvent(filter, onMessage);
  }
  async unsubscribeEvent(id) {
    return this.wsClient.unsubscribeEvent(id);
  }
  async dryRunTransaction(txBytes) {
    try {
      const resp = await this.client.requestWithType(
        "sui_dryRunTransaction",
        [txBytes],
        isTransactionEffects,
        this.options.skipDataValidation
      );
      return resp;
    } catch (err) {
      throw new Error(`Error dry running transaction with request type: ${err}}`);
    }
  }
};

// src/providers/json-rpc-provider-with-cache.ts
var JsonRpcProviderWithCache = class extends JsonRpcProvider {
  constructor() {
    super(...arguments);
    this.objectRefs = /* @__PURE__ */ new Map();
  }
  async getObjectsOwnedByAddress(address) {
    const resp = await super.getObjectsOwnedByAddress(address);
    resp.forEach((r) => this.updateObjectRefCache(r));
    return resp;
  }
  async getObjectsOwnedByObject(objectId) {
    const resp = await super.getObjectsOwnedByObject(objectId);
    resp.forEach((r) => this.updateObjectRefCache(r));
    return resp;
  }
  async getObject(objectId) {
    const resp = await super.getObject(objectId);
    this.updateObjectRefCache(resp);
    return resp;
  }
  async getObjectRef(objectId, skipCache = false) {
    const normalizedId = normalizeSuiObjectId(objectId);
    if (!skipCache && this.objectRefs.has(normalizedId)) {
      return this.objectRefs.get(normalizedId);
    }
    const ref = await super.getObjectRef(objectId);
    this.updateObjectRefCache(ref);
    return ref;
  }
  async getObjectBatch(objectIds) {
    const resp = await super.getObjectBatch(objectIds);
    resp.forEach((r) => this.updateObjectRefCache(r));
    return resp;
  }
  async executeTransaction(txnBytes, signatureScheme, signature, pubkey, requestType = "WaitForEffectsCert") {
    if (requestType !== "WaitForEffectsCert") {
      console.warn(
        `It's not recommended to use JsonRpcProviderWithCache with the request type other than 'WaitForEffectsCert' for executeTransaction. Using the '${requestType}' may result in stale cache and a failure in subsequent transactions.`
      );
    }
    const resp = await super.executeTransaction(
      txnBytes,
      signatureScheme,
      signature,
      pubkey,
      requestType
    );
    const effects = getTransactionEffects(resp);
    if (effects != null) {
      this.updateObjectRefCacheFromTransactionEffects(effects);
    }
    return resp;
  }
  updateObjectRefCache(newData) {
    if (newData == null) {
      return;
    }
    const ref = isSuiObjectRef(newData) ? newData : getObjectReference(newData);
    if (ref != null) {
      this.objectRefs.set(ref.objectId, ref);
    }
  }
  updateObjectRefCacheFromTransactionEffects(effects) {
    var _a, _b, _c, _d, _e;
    (_a = effects.created) == null ? void 0 : _a.forEach((r) => this.updateObjectRefCache(r.reference));
    (_b = effects.mutated) == null ? void 0 : _b.forEach((r) => this.updateObjectRefCache(r.reference));
    (_c = effects.unwrapped) == null ? void 0 : _c.forEach((r) => this.updateObjectRefCache(r.reference));
    (_d = effects.wrapped) == null ? void 0 : _d.forEach((r) => this.updateObjectRefCache(r));
    (_e = effects.deleted) == null ? void 0 : _e.forEach((r) => this.objectRefs.delete(r.objectId));
  }
};

// src/serialization/hex.ts
import { fromHEX as fromHEX2, toHEX as toHEX2 } from "@mysten/bcs";
var HexDataBuffer = class {
  constructor(data) {
    if (typeof data === "string") {
      this._data = fromHEX2(data);
    } else {
      this._data = data;
    }
  }
  getData() {
    return this._data;
  }
  getLength() {
    return this._data.length;
  }
  toString() {
    return toHEX2(this._data);
  }
};

// src/signers/txn-data-serializers/rpc-txn-data-serializer.ts
var RpcTxnDataSerializer = class {
  constructor(endpoint, skipDataValidation = false) {
    this.skipDataValidation = skipDataValidation;
    this.client = new JsonRpcClient(endpoint);
  }
  async newTransferObject(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_transferObject",
        [signerAddress, t.objectId, t.gasPayment, t.gasBudget, t.recipient],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(
        `Error transferring object: ${err} with args ${JSON.stringify(t)}`
      );
    }
  }
  async newTransferSui(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_transferSui",
        [signerAddress, t.suiObjectId, t.gasBudget, t.recipient, t.amount],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(
        `Error transferring Sui coin: ${err} with args ${JSON.stringify(t)}`
      );
    }
  }
  async newPay(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_pay",
        [
          signerAddress,
          t.inputCoins,
          t.recipients,
          t.amounts,
          t.gasPayment,
          t.gasBudget
        ],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(
        `Error executing Pay transaction: ${err} with args ${JSON.stringify(t)}`
      );
    }
  }
  async newPaySui(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_paySui",
        [signerAddress, t.inputCoins, t.recipients, t.amounts, t.gasBudget],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(
        `Error executing PaySui transaction: ${err} with args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async newPayAllSui(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_payAllSui",
        [signerAddress, t.inputCoins, t.recipient, t.gasBudget],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(
        `Error executing PayAllSui transaction: ${err} with args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async newMoveCall(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_moveCall",
        [
          signerAddress,
          t.packageObjectId,
          t.module,
          t.function,
          t.typeArguments,
          t.arguments,
          t.gasPayment,
          t.gasBudget
        ],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(
        `Error executing a move call: ${err} with args ${JSON.stringify(t)}`
      );
    }
  }
  async newMergeCoin(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_mergeCoins",
        [
          signerAddress,
          t.primaryCoin,
          t.coinToMerge,
          t.gasPayment,
          t.gasBudget
        ],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(`Error merging coin: ${err}`);
    }
  }
  async newSplitCoin(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_splitCoin",
        [
          signerAddress,
          t.coinObjectId,
          t.splitAmounts,
          t.gasPayment,
          t.gasBudget
        ],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(`Error splitting coin: ${err}`);
    }
  }
  async newPublish(signerAddress, t) {
    try {
      const resp = await this.client.requestWithType(
        "sui_publish",
        [signerAddress, t.compiledModules, t.gasPayment, t.gasBudget],
        isTransactionBytes,
        this.skipDataValidation
      );
      return new Base64DataBuffer(resp.txBytes);
    } catch (err) {
      throw new Error(`Error publishing package ${err}`);
    }
  }
};

// src/signers/txn-data-serializers/call-arg-serializer.ts
var MOVE_CALL_SER_ERROR = "Move call argument serialization error:";
var STD_ASCII_MODULE_NAME = "ascii";
var STD_ASCII_STRUCT_NAME = "String";
var STD_UTF8_MODULE_NAME = "string";
var STD_UTF8_STRUCT_NAME = "String";
var RESOLVED_SUI_ID = {
  address: SUI_FRAMEWORK_ADDRESS,
  module: OBJECT_MODULE_NAME,
  name: ID_STRUCT_NAME
};
var RESOLVED_ASCII_STR = {
  address: MOVE_STDLIB_ADDRESS,
  module: STD_ASCII_MODULE_NAME,
  name: STD_ASCII_STRUCT_NAME
};
var RESOLVED_UTF8_STR = {
  address: MOVE_STDLIB_ADDRESS,
  module: STD_UTF8_MODULE_NAME,
  name: STD_UTF8_STRUCT_NAME
};
var isTypeFunc = (type) => (t) => typeof t === type;
var isSameStruct = (a, b) => a.address === b.address && a.module === b.module && a.name === b.name;
var CallArgSerializer = class {
  constructor(provider) {
    this.provider = provider;
  }
  async extractObjectIds(txn) {
    const args = await this.serializeMoveCallArguments(txn);
    return args.map(
      (arg) => "ObjVec" in arg ? Array.from(arg.ObjVec).map((a) => ({
        Object: a
      })) : arg
    ).flat().map((arg) => {
      if ("Object" in arg) {
        const objectArg = arg.Object;
        if ("Shared" in objectArg) {
          return objectArg.Shared.objectId;
        } else {
          return objectArg.ImmOrOwned.objectId;
        }
      }
      return null;
    }).filter((a) => a != null);
  }
  async serializeMoveCallArguments(txn) {
    const userParams = await this.extractNormalizedFunctionParams(
      txn.packageObjectId,
      txn.module,
      txn.function
    );
    if (userParams.length !== txn.arguments.length) {
      throw new Error(
        `${MOVE_CALL_SER_ERROR} expect ${userParams.length} arguments, received ${txn.arguments.length} arguments`
      );
    }
    return Promise.all(
      userParams.map(
        async (param, i) => this.newCallArg(param, txn.arguments[i])
      )
    );
  }
  async deserializeCallArgs(txn) {
    const userParams = await this.extractNormalizedFunctionParams(
      txn.Call.package.objectId,
      txn.Call.module,
      txn.Call.function
    );
    return Promise.all(
      userParams.map(
        async (param, i) => this.deserializeCallArg(param, txn.Call.arguments[i])
      )
    );
  }
  async extractNormalizedFunctionParams(packageId, module, functionName) {
    const normalized = await this.provider.getNormalizedMoveFunction(
      normalizeSuiObjectId(packageId),
      module,
      functionName
    );
    const params = normalized.parameters;
    const hasTxContext = params.length > 0 && this.isTxContext(params.at(-1));
    return hasTxContext ? params.slice(0, params.length - 1) : params;
  }
  async newObjectArg(objectId) {
    const object = await this.provider.getObject(objectId);
    const initialSharedVersion = getSharedObjectInitialVersion(object);
    if (initialSharedVersion) {
      return { Shared: { objectId, initialSharedVersion } };
    }
    return { ImmOrOwned: getObjectReference(object) };
  }
  async newCallArg(expectedType, argVal) {
    const serType = this.getPureSerializationType(expectedType, argVal);
    if (serType !== void 0) {
      return {
        Pure: bcs.ser(serType, argVal).toBytes()
      };
    }
    const structVal = extractStructTag(expectedType);
    if (structVal != null || typeof expectedType === "object" && "TypeParameter" in expectedType) {
      if (typeof argVal !== "string") {
        throw new Error(
          `${MOVE_CALL_SER_ERROR} expect the argument to be an object id string, got ${JSON.stringify(
            argVal,
            null,
            2
          )}`
        );
      }
      return { Object: await this.newObjectArg(argVal) };
    }
    if (typeof expectedType === "object" && "Vector" in expectedType && typeof expectedType.Vector === "object" && "Struct" in expectedType.Vector) {
      if (!Array.isArray(argVal)) {
        throw new Error(
          `Expect ${argVal} to be a array, received ${typeof argVal}`
        );
      }
      return {
        ObjVec: await Promise.all(
          argVal.map((arg) => this.newObjectArg(arg))
        )
      };
    }
    throw new Error(
      `Unknown call arg type ${JSON.stringify(expectedType, null, 2)} for value ${JSON.stringify(argVal, null, 2)}`
    );
  }
  extractIdFromObjectArg(arg) {
    if ("ImmOrOwned" in arg) {
      return arg.ImmOrOwned.objectId;
    }
    return arg.Shared.objectId;
  }
  async deserializeCallArg(expectedType, argVal) {
    if ("Object" in argVal) {
      return this.extractIdFromObjectArg(argVal.Object);
    } else if ("ObjVec" in argVal) {
      return Array.from(argVal.ObjVec).map(
        (o) => this.extractIdFromObjectArg(o)
      );
    }
    const serType = this.getPureSerializationType(expectedType, void 0);
    return bcs.de(serType, Uint8Array.from(argVal.Pure));
  }
  getPureSerializationType(normalizedType, argVal) {
    const allowedTypes = [
      "Address",
      "Bool",
      "U8",
      "U16",
      "U32",
      "U64",
      "U128",
      "U256"
    ];
    if (typeof normalizedType === "string" && allowedTypes.includes(normalizedType)) {
      if (normalizedType in ["U8", "U16", "U32", "U64", "U128", "U256"]) {
        this.checkArgVal(isTypeFunc("number"), argVal, "number");
      } else if (normalizedType === "Bool") {
        this.checkArgVal(isTypeFunc("boolean"), argVal, "boolean");
      } else if (normalizedType === "Address") {
        this.checkArgVal(
          (t) => typeof t === "string" && isValidSuiAddress(t),
          argVal,
          "valid SUI address"
        );
      }
      return normalizedType.toLowerCase();
    } else if (typeof normalizedType === "string") {
      throw new Error(
        `${MOVE_CALL_SER_ERROR} unknown pure normalized type ${JSON.stringify(
          normalizedType,
          null,
          2
        )}`
      );
    }
    if ("Vector" in normalizedType) {
      if ((argVal === void 0 || typeof argVal === "string") && normalizedType.Vector === "U8") {
        return "string";
      }
      if (argVal !== void 0 && !Array.isArray(argVal)) {
        throw new Error(
          `Expect ${argVal} to be a array, received ${typeof argVal}`
        );
      }
      const innerType = this.getPureSerializationType(
        normalizedType.Vector,
        argVal ? argVal[0] : void 0
      );
      if (innerType === void 0) {
        return void 0;
      }
      return `vector<${innerType}>`;
    }
    if ("Struct" in normalizedType) {
      if (isSameStruct(normalizedType.Struct, RESOLVED_ASCII_STR)) {
        return "string";
      } else if (isSameStruct(normalizedType.Struct, RESOLVED_UTF8_STR)) {
        return "utf8string";
      } else if (isSameStruct(normalizedType.Struct, RESOLVED_SUI_ID)) {
        return "address";
      }
    }
    return void 0;
  }
  checkArgVal(check, argVal, expectedType) {
    if (argVal === void 0) {
      return;
    }
    if (!check(argVal)) {
      throw new Error(
        `Expect ${argVal} to be ${expectedType}, received ${typeof argVal}`
      );
    }
  }
  isTxContext(param) {
    var _a;
    const struct = (_a = extractStructTag(param)) == null ? void 0 : _a.Struct;
    return extractMutableReference(param) != null && (struct == null ? void 0 : struct.address) === "0x2" && (struct == null ? void 0 : struct.module) === "tx_context" && (struct == null ? void 0 : struct.name) === "TxContext";
  }
};

// src/signers/txn-data-serializers/type-tag-serializer.ts
var VECTOR_REGEX = /^vector<(.+)>$/;
var STRUCT_REGEX = /^([^:]+)::([^:]+)::(.+)/;
var STRUCT_TYPE_TAG_REGEX = /^[^<]+<(.+)>$/;
var TypeTagSerializer = class {
  parseFromStr(str) {
    if (str === "address") {
      return { address: null };
    } else if (str === "bool") {
      return { bool: null };
    } else if (str === "u8") {
      return { u8: null };
    } else if (str === "u64") {
      return { u64: null };
    } else if (str === "signer") {
      return { signer: null };
    }
    const vectorMatch = str.match(VECTOR_REGEX);
    if (vectorMatch) {
      return { vector: this.parseFromStr(vectorMatch[1]) };
    }
    const structMatch = str.match(STRUCT_REGEX);
    if (structMatch) {
      try {
        return {
          struct: {
            address: normalizeSuiAddress(structMatch[1]),
            module: structMatch[2],
            name: structMatch[3].match(/^([^<]+)/)[1],
            typeParams: this.parseStructTypeTag(structMatch[3])
          }
        };
      } catch (e) {
        throw new Error(`Encounter error parsing type args for ${str}`);
      }
    }
    throw new Error(
      `Encounter unexpected token when parsing type args for ${str}`
    );
  }
  parseStructTypeTag(str) {
    const typeTagsMatch = str.match(STRUCT_TYPE_TAG_REGEX);
    if (!typeTagsMatch) {
      return [];
    }
    const typeTags = typeTagsMatch[1].split(",");
    return typeTags.map((tag) => this.parseFromStr(tag));
  }
};

// src/signers/txn-data-serializers/local-txn-data-serializer.ts
var TYPE_TAG = Array.from("TransactionData::").map((e) => e.charCodeAt(0));
var LocalTxnDataSerializer = class {
  constructor(provider) {
    this.provider = provider;
  }
  async newTransferObject(signerAddress, t) {
    try {
      const objectRef = await this.provider.getObjectRef(t.objectId);
      const tx = {
        TransferObject: {
          recipient: t.recipient,
          object_ref: objectRef
        }
      };
      return await this.constructTransactionData(
        tx,
        { kind: "transferObject", data: t },
        t.gasPayment,
        signerAddress
      );
    } catch (err) {
      throw new Error(
        `Error constructing a TransferObject transaction: ${err} args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async newTransferSui(signerAddress, t) {
    try {
      const tx = {
        TransferSui: {
          recipient: t.recipient,
          amount: t.amount == null ? { None: null } : { Some: t.amount }
        }
      };
      return await this.constructTransactionData(
        tx,
        { kind: "transferSui", data: t },
        t.suiObjectId,
        signerAddress
      );
    } catch (err) {
      throw new Error(
        `Error constructing a TransferSui transaction: ${err} args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async newPay(signerAddress, t) {
    try {
      const inputCoinRefs = (await Promise.all(
        t.inputCoins.map((coin) => this.provider.getObjectRef(coin))
      )).map((ref) => ref);
      const tx = {
        Pay: {
          coins: inputCoinRefs,
          recipients: t.recipients,
          amounts: t.amounts
        }
      };
      return await this.constructTransactionData(
        tx,
        { kind: "pay", data: t },
        t.gasPayment,
        signerAddress
      );
    } catch (err) {
      throw new Error(
        `Error constructing a Pay transaction: ${err} args ${JSON.stringify(t)}`
      );
    }
  }
  async newPaySui(signerAddress, t) {
    try {
      const inputCoinRefs = (await Promise.all(
        t.inputCoins.map((coin) => this.provider.getObjectRef(coin))
      )).map((ref) => ref);
      const tx = {
        PaySui: {
          coins: inputCoinRefs,
          recipients: t.recipients,
          amounts: t.amounts
        }
      };
      const gas_coin_obj = t.inputCoins[0];
      return await this.constructTransactionData(
        tx,
        { kind: "paySui", data: t },
        gas_coin_obj,
        signerAddress
      );
    } catch (err) {
      throw new Error(
        `Error constructing a PaySui transaction: ${err} args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async newPayAllSui(signerAddress, t) {
    try {
      const inputCoinRefs = (await Promise.all(
        t.inputCoins.map((coin) => this.provider.getObjectRef(coin))
      )).map((ref) => ref);
      const tx = {
        PayAllSui: {
          coins: inputCoinRefs,
          recipient: t.recipient
        }
      };
      const gas_coin_obj = t.inputCoins[0];
      return await this.constructTransactionData(
        tx,
        { kind: "payAllSui", data: t },
        gas_coin_obj,
        signerAddress
      );
    } catch (err) {
      throw new Error(
        `Error constructing a PayAllSui transaction: ${err} args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async newMoveCall(signerAddress, t) {
    try {
      const pkg = await this.provider.getObjectRef(t.packageObjectId);
      const tx = {
        Call: {
          package: pkg,
          module: t.module,
          function: t.function,
          typeArguments: t.typeArguments.map(
            (a) => typeof a === "string" ? new TypeTagSerializer().parseFromStr(a) : a
          ),
          arguments: await new CallArgSerializer(
            this.provider
          ).serializeMoveCallArguments(t)
        }
      };
      return await this.constructTransactionData(
        tx,
        { kind: "moveCall", data: t },
        t.gasPayment,
        signerAddress
      );
    } catch (err) {
      throw new Error(
        `Error constructing a move call: ${err} args ${JSON.stringify(t)}`
      );
    }
  }
  async newMergeCoin(signerAddress, t) {
    try {
      return await this.newMoveCall(signerAddress, {
        packageObjectId: SUI_FRAMEWORK_ADDRESS,
        module: PAY_MODULE_NAME,
        function: PAY_JOIN_COIN_FUNC_NAME,
        typeArguments: [await this.getCoinStructTag(t.coinToMerge)],
        arguments: [t.primaryCoin, t.coinToMerge],
        gasPayment: t.gasPayment,
        gasBudget: t.gasBudget
      });
    } catch (err) {
      throw new Error(
        `Error constructing a MergeCoin Transaction: ${err} args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async newSplitCoin(signerAddress, t) {
    try {
      return await this.newMoveCall(signerAddress, {
        packageObjectId: SUI_FRAMEWORK_ADDRESS,
        module: PAY_MODULE_NAME,
        function: PAY_SPLIT_COIN_VEC_FUNC_NAME,
        typeArguments: [await this.getCoinStructTag(t.coinObjectId)],
        arguments: [t.coinObjectId, t.splitAmounts],
        gasPayment: t.gasPayment,
        gasBudget: t.gasBudget
      });
    } catch (err) {
      throw new Error(
        `Error constructing a SplitCoin Transaction: ${err} args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async newPublish(signerAddress, t) {
    try {
      const tx = {
        Publish: {
          modules: t.compiledModules
        }
      };
      return await this.constructTransactionData(
        tx,
        { kind: "publish", data: t },
        t.gasPayment,
        signerAddress
      );
    } catch (err) {
      throw new Error(
        `Error constructing a newPublish transaction: ${err} with args ${JSON.stringify(
          t
        )}`
      );
    }
  }
  async selectGasPaymentForTransaction(txn, signerAddress, exclude = []) {
    if (txn.kind === "bytes") {
      return void 0;
    }
    const coins = await this.provider.selectCoinsWithBalanceGreaterThanOrEqual(
      signerAddress,
      BigInt(txn.data.gasBudget),
      SUI_TYPE_ARG,
      exclude.concat(await this.extractObjectIds(txn))
    );
    return coins.length > 0 ? Coin.getID(coins[0]) : void 0;
  }
  async extractObjectIds(txn) {
    const ret = await this.extractInputObjectIds(txn);
    if ("gasPayment" in txn.data && txn.data["gasPayment"]) {
      ret.push(txn.data["gasPayment"]);
    }
    return ret;
  }
  async extractInputObjectIds(txn) {
    switch (txn.kind) {
      case "moveCall":
        return await new CallArgSerializer(this.provider).extractObjectIds(
          txn.data
        );
      case "transferSui":
        return [txn.data.suiObjectId];
      case "transferObject":
        return [txn.data.objectId];
      case "mergeCoin":
        return [txn.data.primaryCoin, txn.data.coinToMerge];
      case "splitCoin":
        return [txn.data.coinObjectId];
      case "pay":
        return txn.data.inputCoins;
    }
    return [];
  }
  async getCoinStructTag(coinId) {
    const coin = await this.provider.getObject(coinId);
    const coinTypeArg = Coin.getCoinTypeArg(coin);
    if (coinTypeArg == null) {
      throw new Error(`Object ${coinId} is not a valid coin type`);
    }
    return { struct: Coin.getCoinStructTag(coinTypeArg) };
  }
  async constructTransactionData(tx, originalTx, gasObjectId, signerAddress) {
    if (gasObjectId === void 0) {
      gasObjectId = await this.selectGasPaymentForTransaction(
        originalTx,
        signerAddress
      );
      if (gasObjectId === void 0) {
        throw new Error(
          `Unable to select a gas object with balance greater than or equal to ${originalTx.data.gasBudget}`
        );
      }
    }
    const gasPayment = await this.provider.getObjectRef(gasObjectId);
    const txData = {
      kind: {
        Single: tx
      },
      gasPayment,
      gasPrice: 1,
      gasBudget: originalTx.data.gasBudget,
      sender: signerAddress
    };
    return await this.serializeTransactionData(txData);
  }
  async serializeTransactionData(tx, size = 8192) {
    const format = "TransactionData";
    const dataBytes = bcs.ser(format, tx, size).toBytes();
    const serialized = new Uint8Array(TYPE_TAG.length + dataBytes.length);
    serialized.set(TYPE_TAG);
    serialized.set(dataBytes, TYPE_TAG.length);
    return new Base64DataBuffer(serialized);
  }
  async deserializeTransactionBytesToSignableTransaction(bytes) {
    return this.transformTransactionDataToSignableTransaction(
      await this.deserializeTransactionBytesToTransactionData(bytes)
    );
  }
  async deserializeTransactionBytesToTransactionData(bytes) {
    return bcs.de("TransactionData", bytes.getData().slice(TYPE_TAG.length));
  }
  async transformTransactionDataToSignableTransaction(tx) {
    if ("Single" in tx.kind) {
      return this.transformTransactionToSignableTransaction(
        tx.kind.Single,
        tx.gasBudget,
        tx.gasPayment
      );
    }
    return Promise.all(
      tx.kind.Batch.map(
        (t) => this.transformTransactionToSignableTransaction(
          t,
          tx.gasBudget,
          tx.gasPayment
        )
      )
    );
  }
  async transformTransactionToSignableTransaction(tx, gasBudget, gasPayment) {
    if ("Pay" in tx) {
      return {
        kind: "pay",
        data: {
          inputCoins: tx.Pay.coins.map((c) => c.objectId),
          recipients: tx.Pay.recipients,
          amounts: tx.Pay.amounts,
          gasPayment: gasPayment == null ? void 0 : gasPayment.objectId,
          gasBudget
        }
      };
    } else if ("Call" in tx) {
      return {
        kind: "moveCall",
        data: {
          packageObjectId: tx.Call.package.objectId,
          module: tx.Call.module,
          function: tx.Call.function,
          typeArguments: tx.Call.typeArguments,
          arguments: await new CallArgSerializer(
            this.provider
          ).deserializeCallArgs(tx),
          gasPayment: gasPayment == null ? void 0 : gasPayment.objectId,
          gasBudget
        }
      };
    } else if ("TransferObject" in tx) {
      return {
        kind: "transferObject",
        data: {
          objectId: tx.TransferObject.object_ref.objectId,
          recipient: tx.TransferObject.recipient,
          gasPayment: gasPayment == null ? void 0 : gasPayment.objectId,
          gasBudget
        }
      };
    } else if ("TransferSui" in tx) {
      return {
        kind: "transferSui",
        data: {
          suiObjectId: gasPayment.objectId,
          recipient: tx.TransferSui.recipient,
          amount: "Some" in tx.TransferSui.amount ? tx.TransferSui.amount.Some : null,
          gasBudget
        }
      };
    } else if ("Publish" in tx) {
      return {
        kind: "publish",
        data: {
          compiledModules: tx.Publish.modules,
          gasPayment: gasPayment == null ? void 0 : gasPayment.objectId,
          gasBudget
        }
      };
    }
    throw new Error(`Unsupported transaction type ${tx}`);
  }
};

// src/providers/void-provider.ts
var VoidProvider = class extends Provider {
  async getRpcApiVersion() {
    throw this.newError("getRpcApiVersion");
  }
  async requestSuiFromFaucet(_recipient, _httpHeaders) {
    throw this.newError("requestSuiFromFaucet");
  }
  async getObjectsOwnedByAddress(_address) {
    throw this.newError("getObjectsOwnedByAddress");
  }
  async getGasObjectsOwnedByAddress(_address) {
    throw this.newError("getGasObjectsOwnedByAddress");
  }
  getCoinDenominationInfo(_coin_type) {
    throw this.newError("getCoinDenominationInfo");
  }
  async getCoinBalancesOwnedByAddress(_address, _typeArg) {
    throw this.newError("getCoinBalancesOwnedByAddress");
  }
  async selectCoinsWithBalanceGreaterThanOrEqual(_address, _amount, _typeArg, _exclude = []) {
    throw this.newError("selectCoinsWithBalanceGreaterThanOrEqual");
  }
  async selectCoinSetWithCombinedBalanceGreaterThanOrEqual(_address, _amount, _typeArg, _exclude) {
    throw this.newError("selectCoinSetWithCombinedBalanceGreaterThanOrEqual");
  }
  async getObject(_objectId) {
    throw this.newError("getObject");
  }
  async getObjectRef(_objectId) {
    throw this.newError("getObjectRef");
  }
  async getTransaction(_digest) {
    throw this.newError("getTransaction");
  }
  async executeTransaction(_txnBytes, _signatureScheme, _signature, _pubkey, _requestType) {
    throw this.newError("executeTransaction with request Type");
  }
  dryRunTransaction(_txBytes) {
    throw this.newError("dryRunTransaction");
  }
  async getTotalTransactionNumber() {
    throw this.newError("getTotalTransactionNumber");
  }
  async getTransactionDigestsInRange(_start, _end) {
    throw this.newError("getTransactionDigestsInRange");
  }
  async getMoveFunctionArgTypes(_objectId, _moduleName, _functionName) {
    throw this.newError("getMoveFunctionArgTypes");
  }
  async getNormalizedMoveModulesByPackage(_objectId) {
    throw this.newError("getNormalizedMoveModulesByPackage");
  }
  async getNormalizedMoveModule(_objectId, _moduleName) {
    throw this.newError("getNormalizedMoveModule");
  }
  async getNormalizedMoveFunction(_objectId, _moduleName, _functionName) {
    throw this.newError("getNormalizedMoveFunction");
  }
  async getNormalizedMoveStruct(_objectId, _oduleName, _structName) {
    throw this.newError("getNormalizedMoveStruct");
  }
  async syncAccountState(_address) {
    throw this.newError("syncAccountState");
  }
  async subscribeEvent(_filter, _onMessage) {
    throw this.newError("subscribeEvent");
  }
  async unsubscribeEvent(_id) {
    throw this.newError("unsubscribeEvent");
  }
  newError(operation) {
    return new Error(`Please use a valid provider for ${operation}`);
  }
  async getTransactions(_query, _cursor, _limit, _order) {
    throw this.newError("getTransactions");
  }
  async getEvents(_query, _cursor, _limit, _order) {
    throw this.newError("getEvents");
  }
};

// src/signers/signer-with-provider.ts
var SignerWithProvider = class {
  async requestSuiFromFaucet(httpHeaders) {
    return this.provider.requestSuiFromFaucet(
      await this.getAddress(),
      httpHeaders
    );
  }
  constructor(provider, serializer) {
    this.provider = provider || new VoidProvider();
    let endpoint = "";
    let skipDataValidation = false;
    if (this.provider instanceof JsonRpcProvider) {
      endpoint = this.provider.endpoints.fullNode;
      skipDataValidation = this.provider.options.skipDataValidation;
    }
    this.serializer = serializer || new RpcTxnDataSerializer(endpoint, skipDataValidation);
  }
  async signAndExecuteTransaction(transaction, requestType = "WaitForLocalExecution") {
    if (transaction instanceof Base64DataBuffer || transaction.kind === "bytes") {
      const txBytes = transaction instanceof Base64DataBuffer ? transaction : new Base64DataBuffer(transaction.data);
      const sig = await this.signData(txBytes);
      return await this.provider.executeTransaction(
        txBytes.toString(),
        sig.signatureScheme,
        sig.signature.toString(),
        sig.pubKey.toString(),
        requestType
      );
    }
    switch (transaction.kind) {
      case "moveCall":
        return this.executeMoveCall(transaction.data, requestType);
      case "transferSui":
        return this.transferSui(transaction.data, requestType);
      case "transferObject":
        return this.transferObject(transaction.data, requestType);
      case "mergeCoin":
        return this.mergeCoin(transaction.data, requestType);
      case "splitCoin":
        return this.splitCoin(transaction.data, requestType);
      case "pay":
        return this.pay(transaction.data, requestType);
      case "paySui":
        return this.paySui(transaction.data, requestType);
      case "payAllSui":
        return this.payAllSui(transaction.data, requestType);
      case "publish":
        return this.publish(transaction.data, requestType);
      default:
        throw new Error(
          `Unknown transaction kind: "${transaction.kind}"`
        );
    }
  }
  async dryRunTransaction(tx) {
    const address = await this.getAddress();
    let dryRunTxBytes;
    if (typeof tx === "string") {
      dryRunTxBytes = tx;
    } else if (tx instanceof Base64DataBuffer) {
      dryRunTxBytes = tx.toString();
    } else {
      switch (tx.kind) {
        case "bytes":
          dryRunTxBytes = new Base64DataBuffer(tx.data).toString();
          break;
        case "mergeCoin":
          dryRunTxBytes = (await this.serializer.newMergeCoin(address, tx.data)).toString();
          break;
        case "moveCall":
          dryRunTxBytes = (await this.serializer.newMoveCall(address, tx.data)).toString();
          break;
        case "pay":
          dryRunTxBytes = (await this.serializer.newPay(address, tx.data)).toString();
          break;
        case "payAllSui":
          dryRunTxBytes = (await this.serializer.newPayAllSui(address, tx.data)).toString();
          break;
        case "paySui":
          dryRunTxBytes = (await this.serializer.newPaySui(address, tx.data)).toString();
          break;
        case "publish":
          dryRunTxBytes = (await this.serializer.newPublish(address, tx.data)).toString();
          break;
        case "splitCoin":
          dryRunTxBytes = (await this.serializer.newSplitCoin(address, tx.data)).toString();
          break;
        case "transferObject":
          dryRunTxBytes = (await this.serializer.newTransferObject(address, tx.data)).toString();
          break;
        case "transferSui":
          dryRunTxBytes = (await this.serializer.newTransferSui(address, tx.data)).toString();
          break;
        default:
          throw new Error(`Error, unknown transaction kind ${tx.kind}. Can't dry run transaction.`);
      }
    }
    return this.provider.dryRunTransaction(dryRunTxBytes);
  }
  async transferObject(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newTransferObject(
      signerAddress,
      transaction
    );
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async transferSui(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newTransferSui(
      signerAddress,
      transaction
    );
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async pay(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newPay(signerAddress, transaction);
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async paySui(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newPaySui(signerAddress, transaction);
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async payAllSui(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newPayAllSui(
      signerAddress,
      transaction
    );
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async mergeCoin(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newMergeCoin(
      signerAddress,
      transaction
    );
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async splitCoin(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newSplitCoin(
      signerAddress,
      transaction
    );
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async executeMoveCall(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newMoveCall(
      signerAddress,
      transaction
    );
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async publish(transaction, requestType = "WaitForLocalExecution") {
    const signerAddress = await this.getAddress();
    const txBytes = await this.serializer.newPublish(
      signerAddress,
      transaction
    );
    return await this.signAndExecuteTransaction(txBytes, requestType);
  }
  async getGasCostEstimation(...args) {
    const txEffects = await this.dryRunTransaction(...args);
    const gasEstimation = getTotalGasUsed(txEffects);
    if (typeof gasEstimation === "undefined") {
      throw new Error("Failed to estimate the gas cost from transaction");
    }
    return gasEstimation;
  }
};

// src/signers/raw-signer.ts
var RawSigner = class extends SignerWithProvider {
  constructor(keypair, provider, serializer) {
    super(provider, serializer);
    this.keypair = keypair;
  }
  async getAddress() {
    return this.keypair.getPublicKey().toSuiAddress();
  }
  async signData(data) {
    return {
      signatureScheme: this.keypair.getKeyScheme(),
      signature: this.keypair.signData(data),
      pubKey: this.keypair.getPublicKey()
    };
  }
  connect(provider) {
    return new RawSigner(this.keypair, provider);
  }
};

// src/wallet_client.ts
import * as bip39 from "@scure/bip39";
import * as english from "@scure/bip39/wordlists/english";

// src/nft_client.ts
var DEFAULT_NFT_IMAGE = "ipfs://QmZPWWy5Si54R3d26toaqRiqvCH7HkGdXkxwUgCm2oKKM2?filename=img-sq-01.png";
var ExampleNFT = class {
  static async mintExampleNFT(signer, name, description, imageUrl) {
    return await signer.executeMoveCall({
      packageObjectId: "0x2",
      module: "devnet_nft",
      function: "mint",
      typeArguments: [],
      arguments: [
        name || "Example NFT",
        description || "An NFT created by Sui Wallet",
        imageUrl || DEFAULT_NFT_IMAGE
      ],
      gasBudget: 1e4
    });
  }
  static async TransferNFT(signer, nftId, recipientID, transferCost) {
    return await signer.transferObject({
      objectId: nftId,
      gasBudget: transferCost || 1e4,
      recipient: recipientID
    });
  }
};

// src/wallet_client.ts
var COIN_TYPE2 = 784;
var MAX_ACCOUNTS = 5;
var DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER = 1e3;
var endpoints = NETWORK_TO_API["DEVNET" /* DEVNET */];
var AIRDROP_SENDER = "0xc4173a804406a365e69dfb297d4eaaf002546ebd";
var WalletClient = class {
  constructor(nodeUrl = endpoints.fullNode, faucetUrl = endpoints.faucet) {
    this.provider = new JsonRpcProvider(nodeUrl, {
      skipDataValidation: true,
      socketOptions: DEFAULT_CLIENT_OPTIONS,
      versionCacheTimoutInSeconds: 600,
      faucetURL: faucetUrl
    });
    this.serializer = new RpcTxnDataSerializer(nodeUrl);
  }
  static fromDerivePath(mnemonics) {
    return Ed25519Keypair.deriveKeypair(mnemonics);
  }
  static getAccountFromPrivateKey(privateKey) {
    return Ed25519Keypair.fromSeed(privateKey.slice(0, 32));
  }
  async importWallet(code) {
    let address = "";
    let publicKey = "";
    let derivationPath = "";
    const accountMetaData = [];
    for (let i = 0; i < MAX_ACCOUNTS; i += 1) {
      derivationPath = `m/44'/${COIN_TYPE2}'/${i}'/0'/0'`;
      const keypair = WalletClient.fromDerivePath(code);
      address = keypair.getPublicKey().toSuiAddress();
      publicKey = Buffer.from(keypair.getPublicKey().toBytes()).toString("hex");
      accountMetaData.push({
        derivationPath,
        address: address.startsWith("0x") ? address : "0x" + address,
        publicKey: publicKey.startsWith("0x") ? publicKey : "0x" + publicKey
      });
      break;
    }
    return { code, accounts: accountMetaData };
  }
  async createWallet(code) {
    if (!code) {
      code = bip39.generateMnemonic(english.wordlist);
    }
    const accountMetadata = await this.createNewAccount(code, 0);
    return { code, accounts: [accountMetadata] };
  }
  async createNewAccount(code, index) {
    if (index >= MAX_ACCOUNTS) {
      throw new Error("Max no. of accounts reached");
    }
    const derivationPath = `m/44'/${COIN_TYPE2}'/${index}'/0'/0'`;
    const keypair = WalletClient.fromDerivePath(code);
    const address = keypair.getPublicKey().toSuiAddress();
    const pubKey = Buffer.from(keypair.getPublicKey().toBytes()).toString(
      "hex"
    );
    return {
      derivationPath,
      address: address.startsWith("0x") ? address : "0x" + address,
      publicKey: pubKey.startsWith("0x") ? pubKey : "0x" + pubKey
    };
  }
  async transferSuiMnemonic(amount, suiAccount, receiverAddress, typeArg = SUI_TYPE_ARG) {
    const keypair = suiAccount;
    const senderAddress = keypair.getPublicKey().toSuiAddress();
    if (typeArg === SUI_TYPE_ARG) {
      const coinsNeeded = await this.provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
        senderAddress,
        BigInt(amount + DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER),
        typeArg
      );
      const inputCoins = coinsNeeded.map(
        (coin) => getObjectId(coin)
      );
      const recipients = [receiverAddress];
      const amounts = [amount];
      const payTxn = {
        inputCoins,
        recipients,
        amounts,
        gasBudget: DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER
      };
      const signer = new RawSigner(keypair, this.provider, this.serializer);
      return await signer.pay(payTxn);
    } else {
      const coinsNeeded = await this.provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
        senderAddress,
        BigInt(amount),
        typeArg
      );
      const inputCoins = coinsNeeded.map(
        (coin) => getObjectId(coin)
      );
      const gasObjId = await this.getGasObject(senderAddress, inputCoins);
      const recipients = [receiverAddress];
      const amounts = [amount];
      const payTxn = {
        inputCoins,
        recipients,
        amounts,
        gasPayment: gasObjId,
        gasBudget: DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER
      };
      const signer = new RawSigner(keypair, this.provider, this.serializer);
      return await signer.pay(payTxn);
    }
  }
  async getBalance(address, typeArg = SUI_TYPE_ARG) {
    let objects = await this.provider.getCoinBalancesOwnedByAddress(
      address,
      typeArg
    );
    return Coin.totalBalance(objects);
  }
  async airdrop(address) {
    return await this.provider.requestSuiFromFaucet(address);
  }
  async getCoinsWithRequiredBalance(address, amount, typeArg = SUI_TYPE_ARG) {
    const coinsNeeded = await this.provider.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
      address,
      BigInt(amount),
      typeArg
    );
    const coins = coinsNeeded.map((coin) => getObjectId(coin));
    return coins;
  }
  async getGasObject(address, exclude) {
    const gasObj = await this.provider.selectCoinsWithBalanceGreaterThanOrEqual(
      address,
      BigInt(DEFAULT_GAS_BUDGET_FOR_SUI_TRANSFER),
      SUI_TYPE_ARG,
      exclude
    );
    if (gasObj.length === 0) {
      throw new Error("Not Enough Gas");
    }
    const gasObjId = getObjectId(gasObj[0]);
    return gasObjId;
  }
  async getCustomCoins(address) {
    const objects = await this.provider.getCoinBalancesOwnedByAddress(address);
    const coinIds = objects.map((c) => ({
      Id: Coin.getID(c),
      symbol: Coin.getCoinSymbol(Coin.getCoinTypeArg(c)),
      name: Coin.getCoinSymbol(Coin.getCoinTypeArg(c)),
      balance: Number(Coin.getBalance(c)),
      decimals: 9,
      coinTypeArg: Coin.getCoinTypeArg(c)
    }));
    return coinIds;
  }
  async generateTransaction(address, tx) {
    let dryRunTxBytes;
    if (typeof tx === "string") {
      dryRunTxBytes = tx;
    } else if (tx instanceof Base64DataBuffer) {
      dryRunTxBytes = tx.toString();
    } else {
      switch (tx.kind) {
        case "bytes":
          dryRunTxBytes = new Base64DataBuffer(tx.data).toString();
          break;
        case "mergeCoin":
          dryRunTxBytes = (await this.serializer.newMergeCoin(address, tx.data)).toString();
          break;
        case "moveCall":
          dryRunTxBytes = (await this.serializer.newMoveCall(address, tx.data)).toString();
          break;
        case "pay":
          dryRunTxBytes = (await this.serializer.newPay(address, tx.data)).toString();
          break;
        case "payAllSui":
          dryRunTxBytes = (await this.serializer.newPayAllSui(address, tx.data)).toString();
          break;
        case "paySui":
          dryRunTxBytes = (await this.serializer.newPaySui(address, tx.data)).toString();
          break;
        case "publish":
          dryRunTxBytes = (await this.serializer.newPublish(address, tx.data)).toString();
          break;
        case "splitCoin":
          dryRunTxBytes = (await this.serializer.newSplitCoin(address, tx.data)).toString();
          break;
        case "transferObject":
          dryRunTxBytes = (await this.serializer.newTransferObject(address, tx.data)).toString();
          break;
        case "transferSui":
          dryRunTxBytes = (await this.serializer.newTransferSui(address, tx.data)).toString();
          break;
        default:
          throw new Error(
            `Error, unknown transaction kind ${tx.kind}. Can't dry run transaction.`
          );
      }
    }
    if (typeof dryRunTxBytes === "string") {
      return new Base64DataBuffer(dryRunTxBytes);
    }
    return dryRunTxBytes;
  }
  async dryRunTransaction(address, tx) {
    let dryRunTxBytes;
    if (typeof tx === "string") {
      dryRunTxBytes = tx;
    } else if (tx instanceof Base64DataBuffer) {
      dryRunTxBytes = tx.toString();
    } else {
      switch (tx.kind) {
        case "bytes":
          dryRunTxBytes = new Base64DataBuffer(tx.data).toString();
          break;
        case "mergeCoin":
          dryRunTxBytes = (await this.serializer.newMergeCoin(address, tx.data)).toString();
          break;
        case "moveCall":
          dryRunTxBytes = (await this.serializer.newMoveCall(address, tx.data)).toString();
          break;
        case "pay":
          dryRunTxBytes = (await this.serializer.newPay(address, tx.data)).toString();
          break;
        case "payAllSui":
          dryRunTxBytes = (await this.serializer.newPayAllSui(address, tx.data)).toString();
          break;
        case "paySui":
          dryRunTxBytes = (await this.serializer.newPaySui(address, tx.data)).toString();
          break;
        case "publish":
          dryRunTxBytes = (await this.serializer.newPublish(address, tx.data)).toString();
          break;
        case "splitCoin":
          dryRunTxBytes = (await this.serializer.newSplitCoin(address, tx.data)).toString();
          break;
        case "transferObject":
          dryRunTxBytes = (await this.serializer.newTransferObject(address, tx.data)).toString();
          break;
        case "transferSui":
          dryRunTxBytes = (await this.serializer.newTransferSui(address, tx.data)).toString();
          break;
        default:
          throw new Error(
            `Error, unknown transaction kind ${tx.kind}. Can't dry run transaction.`
          );
      }
    }
    return this.provider.dryRunTransaction(dryRunTxBytes);
  }
  async simulateTransaction(address, tx) {
    return await this.dryRunTransaction(address, tx);
  }
  async getTransactions(address) {
    const transactions = await this.provider.getTransactionsForAddress(address);
    const uniqueTransactions = [...new Set(transactions)];
    const finalTransacationsData = [];
    await Promise.all(
      uniqueTransactions.map(async (digest) => {
        const transactionData = await this.provider.getTransactionWithEffects(
          digest
        );
        if (transactionData.effects.status.status === "success") {
          const events = transactionData.effects.events;
          const coinBalanceReceiveEvents = events == null ? void 0 : events.filter(
            (event) => {
              var _a;
              return event.coinBalanceChange && ((_a = event.coinBalanceChange.owner) == null ? void 0 : _a.AddressOwner) === address && event.coinBalanceChange.changeType !== "Gas" && event.coinBalanceChange.amount >= 0;
            }
          );
          const coinBalanceSendEvents = events == null ? void 0 : events.filter(
            (event) => event.coinBalanceChange && event.coinBalanceChange.sender === address && event.coinBalanceChange.changeType !== "Gas" && event.coinBalanceChange.changeType !== "Pay"
          );
          const transferEvents = events == null ? void 0 : events.filter(
            (event) => event.transferObject
          );
          const moveEvents = events == null ? void 0 : events.filter((event) => event.moveEvent);
          let totalCoinBalanceChange = 0;
          let changeType = {
            type: "",
            from: "",
            to: "",
            resourceType: "",
            changeTextSuffix: ""
          };
          coinBalanceReceiveEvents == null ? void 0 : coinBalanceReceiveEvents.forEach((event) => {
            var _a, _b, _c, _d;
            totalCoinBalanceChange += event.coinBalanceChange.amount;
            if (!changeType.type) {
              if (event.coinBalanceChange.sender === AIRDROP_SENDER) {
                changeType = {
                  type: "Receive",
                  text: "Airdrop",
                  from: event.coinBalanceChange.sender,
                  to: (_a = event.coinBalanceChange.owner) == null ? void 0 : _a.AddressOwner,
                  resourceType: event.coinBalanceChange.coinType,
                  changeTextSuffix: " " + ((_b = event.coinBalanceChange.coinType) == null ? void 0 : _b.split("::")[2])
                };
              } else {
                changeType = {
                  type: "Receive",
                  text: "Received",
                  from: event.coinBalanceChange.sender,
                  to: (_c = event.coinBalanceChange.owner) == null ? void 0 : _c.AddressOwner,
                  resourceType: event.coinBalanceChange.coinType,
                  changeTextSuffix: " " + ((_d = event.coinBalanceChange.coinType) == null ? void 0 : _d.split("::")[2])
                };
              }
            }
          });
          coinBalanceSendEvents == null ? void 0 : coinBalanceSendEvents.forEach((event) => {
            var _a, _b;
            totalCoinBalanceChange += event.coinBalanceChange.amount;
            if (!changeType.type) {
              changeType = {
                type: "Send",
                text: "Sent",
                from: event.coinBalanceChange.sender,
                to: (_a = event.coinBalanceChange.owner) == null ? void 0 : _a.AddressOwner,
                resourceType: event.coinBalanceChange.coinType,
                changeTextSuffix: " " + ((_b = event.coinBalanceChange.coinType) == null ? void 0 : _b.split("::")[2])
              };
            }
          });
          await Promise.all(
            transferEvents == null ? void 0 : transferEvents.map(async (event) => {
              var _a, _b, _c, _d, _e, _f;
              if (event.transferObject.objectType === "0x2::devnet_nft::DevNetNFT") {
                const nftData = await this.provider.getObject(
                  event.transferObject.objectId
                );
                const nftDetails = nftData.details;
                changeType = {
                  nftData: nftDetails,
                  type: ((_a = event.transferObject.recipient) == null ? void 0 : _a.AddressOwner) === address ? "Receive" : "Send",
                  text: ((_b = event.transferObject.recipient) == null ? void 0 : _b.AddressOwner) === address ? "NFT Received" : "NFT Sent",
                  from: event.transferObject.sender,
                  to: (_c = event.transferObject.recipient) == null ? void 0 : _c.AddressOwner,
                  resourceType: event.transferObject.objectType,
                  changeTextSuffix: ` ${(_e = (_d = nftDetails == null ? void 0 : nftDetails.data) == null ? void 0 : _d.fields) == null ? void 0 : _e.name}`
                };
                totalCoinBalanceChange = ((_f = event.transferObject.recipient) == null ? void 0 : _f.AddressOwner) === address ? 1 : -1;
              }
            })
          );
          await Promise.all(
            moveEvents == null ? void 0 : moveEvents.map(async (event) => {
              var _a, _b;
              if (event.moveEvent.type === "0x2::devnet_nft::MintNFTEvent") {
                const nftData = await this.provider.getObject(
                  event.moveEvent.fields.object_id
                );
                const nftDetails = nftData.details;
                changeType = {
                  nftData: nftDetails,
                  type: "Receive",
                  text: "NFT Minted",
                  resourceType: event.moveEvent.type,
                  changeTextSuffix: ` ${(_b = (_a = nftDetails == null ? void 0 : nftDetails.data) == null ? void 0 : _a.fields) == null ? void 0 : _b.name}`
                };
                totalCoinBalanceChange = 1;
              }
            })
          );
          const timestamp = transactionData.timestamp_ms;
          finalTransacationsData.push({
            ...transactionData,
            totalCoinBalanceChange,
            changeType,
            date: new Date(timestamp).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })
          });
        }
      })
    );
    finalTransacationsData.sort((a, b) => b.timestamp_ms - a.timestamp_ms);
    return finalTransacationsData;
  }
  async getNfts(address) {
    let objects = await this.provider.getObjectsOwnedByAddress(address);
    var nfts = [];
    await Promise.all(
      objects.map(async (obj) => {
        let objData = await this.provider.getObject(obj.objectId);
        let moveObj = getMoveObject(objData);
        if (moveObj.fields.name && moveObj.fields.description && moveObj.fields.url) {
          nfts.push(objData);
        } else if (moveObj.fields.metadata) {
          nfts.push(objData);
        }
      })
    );
    return nfts;
  }
  async mintNfts(suiAccount, name, description, imageUrl) {
    const keypair = suiAccount;
    const accountSigner = new RawSigner(
      keypair,
      this.provider,
      this.serializer
    );
    const mintedNft = ExampleNFT.mintExampleNFT(
      accountSigner,
      name,
      description,
      imageUrl
    );
    return mintedNft;
  }
  async transferNft(suiAccount, nftId, recipientID) {
    const keypair = suiAccount;
    const accountSigner = new RawSigner(
      keypair,
      this.provider,
      this.serializer
    );
    const mintedNft = ExampleNFT.TransferNFT(accountSigner, nftId, recipientID);
    return mintedNft;
  }
  static getAccountFromMetaData(mnemonic, _metadata) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    return keypair;
  }
};
export {
  Base64DataBuffer,
  COIN_TYPE,
  COIN_TYPE_ARG_REGEX,
  Coin,
  DEFAULT_ED25519_DERIVATION_PATH,
  DEFAULT_SECP256K1_DERIVATION_PATH,
  Delegation,
  Ed25519Keypair,
  Ed25519PublicKey,
  ExampleNFT,
  HexDataBuffer,
  ID_STRUCT_NAME,
  JsonRpcProvider,
  JsonRpcProviderWithCache,
  LocalTxnDataSerializer,
  MIST_PER_SUI,
  MOVE_STDLIB_ADDRESS,
  NETWORK_TO_API,
  Network,
  OBJECT_MODULE_NAME,
  PAY_JOIN_COIN_FUNC_NAME,
  PAY_MODULE_NAME,
  PAY_SPLIT_COIN_VEC_FUNC_NAME,
  Provider,
  RawSigner,
  RpcTxnDataSerializer,
  SIGNATURE_SCHEME_TO_FLAG,
  SUI_ADDRESS_LENGTH,
  SUI_FRAMEWORK_ADDRESS,
  SUI_TYPE_ARG,
  Secp256k1Keypair,
  Secp256k1PublicKey,
  SignerWithProvider,
  UID_STRUCT_NAME,
  WalletClient,
  bcs,
  bytesEqual,
  extractMutableReference,
  extractReference,
  extractStructTag,
  getCertifiedTransaction,
  getChangeEpochTransaction,
  getCoinAfterMerge,
  getCoinAfterSplit,
  getCreatedObjects,
  getEvents,
  getExecutionStatus,
  getExecutionStatusError,
  getExecutionStatusGasSummary,
  getExecutionStatusType,
  getMoveCallTransaction,
  getMoveObject,
  getMoveObjectType,
  getMovePackageContent,
  getNewlyCreatedCoinRefsAfterSplit,
  getNewlyCreatedCoinsAfterSplit,
  getObjectDeletedResponse,
  getObjectExistsResponse,
  getObjectFields,
  getObjectId,
  getObjectNotExistsResponse,
  getObjectOwner,
  getObjectPreviousTransactionDigest,
  getObjectReference,
  getObjectType,
  getObjectVersion,
  getParsedMergeCoinResponse,
  getParsedPublishResponse,
  getParsedSplitCoinResponse,
  getPayAllSuiTransaction,
  getPaySuiTransaction,
  getPayTransaction,
  getPublishTransaction,
  getSharedObjectInitialVersion,
  getTimestampFromTransactionResponse,
  getTotalGasUsed,
  getTransactionAuthorityQuorumSignInfo,
  getTransactionData,
  getTransactionDigest,
  getTransactionEffects,
  getTransactionGasBudget,
  getTransactionGasObject,
  getTransactionKindName,
  getTransactionSender,
  getTransactionSignature,
  getTransactions,
  getTransferObjectTransaction,
  getTransferSuiAmount,
  getTransferSuiTransaction,
  hasPublicTransfer,
  isAuthorityName,
  isAuthorityQuorumSignInfo,
  isAuthoritySignature,
  isBalanceChangeType,
  isCallArg,
  isCertifiedTransaction,
  isCoinBalanceChangeEvent,
  isCoinDenominationInfoResponse,
  isDelegationData,
  isDelegationSuiObject,
  isDeleteObjectEvent,
  isEmptySignInfo,
  isEpochId,
  isEventId,
  isEventQuery,
  isEventType,
  isExecuteTransactionRequestType,
  isExecutionStatus,
  isExecutionStatusType,
  isFaucetCoinInfo,
  isFaucetResponse,
  isGasCostSummary,
  isGatewayTxSeqNumber,
  isGenericAuthoritySignature,
  isGetObjectDataResponse,
  isGetOwnedObjectsResponse,
  isGetTxnDigestsResponse,
  isImmutableObject,
  isMoveCall,
  isMoveCallTx,
  isMoveEvent,
  isMoveEventField,
  isMovePackageContent,
  isMutateObjectEvent,
  isNewObjectEvent,
  isObjectArg,
  isObjectContentFields,
  isObjectDigest,
  isObjectId,
  isObjectOwner,
  isObjectStatus,
  isObjectType,
  isOrder,
  isOwnedObjectRef,
  isPaginatedEvents,
  isPaginatedTransactionDigests,
  isPay,
  isPayAllSui,
  isPayAllSuiTx,
  isPaySui,
  isPaySuiTx,
  isPayTx,
  isPublishEvent,
  isPublishTx,
  isRpcApiVersion,
  isSequenceNumber,
  isSharedObject,
  isSharedObjectRef,
  isStructTag,
  isSubscriptionEvent,
  isSubscriptionId,
  isSuiAddress,
  isSuiCertifiedTransactionEffects,
  isSuiChangeEpoch,
  isSuiData,
  isSuiEvent,
  isSuiEventEnvelope,
  isSuiEventFilter,
  isSuiEvents,
  isSuiExecuteTransactionResponse,
  isSuiJsonValue,
  isSuiMoveAbilitySet,
  isSuiMoveFunctionArgType,
  isSuiMoveFunctionArgTypes,
  isSuiMoveFunctionArgTypesResponse,
  isSuiMoveModuleId,
  isSuiMoveNormalizedField,
  isSuiMoveNormalizedFunction,
  isSuiMoveNormalizedModule,
  isSuiMoveNormalizedModules,
  isSuiMoveNormalizedStruct,
  isSuiMoveNormalizedStructType,
  isSuiMoveNormalizedType,
  isSuiMoveNormalizedTypeParameterType,
  isSuiMoveObject,
  isSuiMovePackage,
  isSuiMoveStructTypeParameter,
  isSuiMoveTypeParameterIndex,
  isSuiMoveVisibility,
  isSuiObject,
  isSuiObjectInfo,
  isSuiObjectRef,
  isSuiPackage,
  isSuiParsedMergeCoinResponse,
  isSuiParsedPublishResponse,
  isSuiParsedSplitCoinResponse,
  isSuiParsedTransactionResponse,
  isSuiTransactionData,
  isSuiTransactionKind,
  isSuiTransactionResponse,
  isSuiTransferSui,
  isTransaction,
  isTransactionBytes,
  isTransactionData,
  isTransactionDigest,
  isTransactionEffects,
  isTransactionKind,
  isTransactionKindName,
  isTransactionQuery,
  isTransferObject,
  isTransferObjectEvent,
  isTransferObjectTx,
  isTransferSuiTx,
  isTypeTag,
  isValidBIP32Path,
  isValidHardenedPath,
  isValidSuiAddress,
  isValidSuiObjectId,
  isValidTransactionDigest,
  mnemonicToSeed,
  mnemonicToSeedHex,
  normalizeSuiAddress,
  normalizeSuiObjectId,
  parseVersionFromString
};
//# sourceMappingURL=index.mjs.map