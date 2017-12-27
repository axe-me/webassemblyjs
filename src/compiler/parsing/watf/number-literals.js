// @flow

export function parse32F( sourceString: string ): number {
  return parseFloat(sourceString);
}

export function parse64F( sourceString: string ): number {
  return parseFloat(sourceString);
}

export function parse32I( sourceString: string ): number {
  let value = 0;
  if (isHexLiteral(sourceString)) {
    value = ~~parseInt(sourceString, 16);
  } else if (isDecimalExponentLiteral(sourceString)) {
    throw new Error( 'This number literal format is yet to be implemented.' );
  } else {
    value = parseInt(sourceString, 10);
  }

  return value;
}

export function parse64I( sourceString: string ): number {
  return parseInt(sourceString);
}

function isDecimalExponentLiteral(sourceString: string): boolean {
  return !isHexLiteral(sourceString) && sourceString.toUpperCase().includes('E');
}

function isHexLiteral( sourceString: string): boolean {
  return sourceString.substring(0,2).toUpperCase() === '0X';
}
