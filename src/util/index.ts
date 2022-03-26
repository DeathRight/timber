import { simpleflake } from 'simpleflakes';

import { epoch } from './constants';

export const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

export function EnumToObject(e: any) {
  let ret: Record<string, number> = {};
  Object.keys(e)
    .filter((v) => !StringIsNumber(v))
    .map((key) => (ret[key] = e[key]));
  return ret;
}

// https://stackoverflow.com/a/1885766
export function intersectIds(a: BigInt[], b: BigInt[]) {
  if (a.length && b.length) {
    const result = [];
    const map: { [k: string]: boolean } = {};
    for (let i = 0, length = b.length; i < length; ++i) {
      map[b[i].toString()] = true;
    }
    for (let i = 0, length = a.length; i < length; ++i) {
      if (a[i].toString() in map) result.push(a[i]);
    }
    return result;
  } else return [];
}

/**
 * Iterates over all keys of `obj2` and if the values are not null or undefined, overwrites/adds them in `obj1`
 */
export function assignIfDefined<T extends Record<any, any>>(
  obj1: T,
  obj2: Partial<T>
) {
  let ret: Record<any, any> = obj1;
  for (const key in obj2) {
    ret[key] = obj2[key] != null ? obj2[key] : obj1[key];
  }
  return ret as T;
}

export function timberflake() {
  return simpleflake(undefined, undefined, epoch) as bigint;
}
