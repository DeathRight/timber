declare module "simpleflakes" {
  export function SimpleFlakeStruct(
    timestamp: number,
    randomBits: number
  ): SimpleFlakeStruct;
  export class SimpleFlakeStruct {
    constructor(timestamp: number, randomBits: number);
    timestamp: number;
    randomBits: number;
  }
  export function extractBits(
    data: string,
    shift: number | string,
    length: number
  ): BigInt;
  export function parseSimpleflake(flake: BigInt): SimpleFlakeStruct;
  export function binary(value: number, padding?: boolean): number;
  export const SIMPLEFLAKE_EPOCH: 946684800000;
  export function simpleflake(
    ts?: number,
    randomBits?: number,
    epoch?: number
  ): BigInt;
  export { SimpleFlakeStruct as simpleflakeStruct };
}
