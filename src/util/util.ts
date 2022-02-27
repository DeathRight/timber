export const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

export function EnumToObject(e: any) {
  let ret: Record<string, number> = {};
  Object.keys(e)
    .filter((v) => !StringIsNumber(v))
    .map((key) => (ret[key] = e[key]));
  return ret;
}
