// @flow

const constants = require("@webassemblyjs/helper-wasm-bytecode");

export function encodeVersion(v: number): Array<Byte> {
  const bytes = constants.moduleVersion;
  bytes[0] = v;

  return bytes;
}

export function encodeHeader(): Array<Byte> {
  return constants.magicModuleHeader;
}

export function encodeVec(elements: Array<Byte>): Array<Byte> {
  const size = elements.length;
  return [size, ...elements];
}

export function encodeValtype(v: Valtype): Byte {
  const byte = constants.valtypesByString[v];

  if (typeof byte === "undefined") {
    throw new Error("Unknown valtype: " + v);
  }

  return parseInt(byte, 10);
}

export function encodeMutability(v: Mutability): Byte {
  const byte = constants.globalTypesByString[v];

  if (typeof byte === "undefined") {
    throw new Error("Unknown mutability: " + v);
  }

  return parseInt(byte, 10);
}

export function encodeUTF8Vec(str: string): Array<Byte> {
  const charCodes = str.split("").map(x => x.charCodeAt(0));

  return encodeVec(charCodes);
}

export function encodeModuleImport(n: ModuleImport): Array<Byte> {
  const out = [];

  out.push(...encodeUTF8Vec(n.module));
  out.push(...encodeUTF8Vec(n.name));

  if (n.descr.type === "GlobalType") {
    out.push(0x03);
    out.push(encodeValtype(n.descr.valtype));
    out.push(encodeMutability(n.descr.mutability));
  } else {
    throw new Error(
      "Unsupport operation: encode module import of type: " + n.descr.type
    );
  }

  return out;
}
