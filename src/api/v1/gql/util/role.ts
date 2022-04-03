import { DetailPermission, ModPermission, Permission } from '@prisma/client';

export const RolePermEnums = {
  modPerms: ModPermission,
  serverDetails: DetailPermission,
  domainCrud: Permission,
  domainDetails: DetailPermission,
  roomCrud: Permission,
  roomDetails: DetailPermission,
};
export type RolePermEnumsType = {
  modPerms: ModPermission;
  serverDetails: DetailPermission;
  domainCrud: Permission;
  domainDetails: DetailPermission;
  roomCrud: Permission;
  roomDetails: DetailPermission;
};

/**
 * Length of possible Enums from every Role permission
 */
export const RolePermEnumsLength = ((): {
  [k in keyof RolePermEnumsType]: number;
} => {
  let ret: { [k: string]: number } = {};
  for (const [k, v] of Object.entries(RolePermEnums)) {
    ret[k] = Object.keys(v).length;
  }
  return ret as { [k in keyof RolePermEnumsType]: number };
})();

/* --------------------- RolePermEnumMap function utils --------------------- */
export type RolePermEnumMapReturn<
  T extends keyof RolePermEnumsType,
  B extends boolean = false
> = { [key in RolePermEnumsType[T]]: B };

/**
 * Returns an object with every permission set to false
 */
export function RolePermEnumMap<
  T extends keyof RolePermEnumsType,
  E extends undefined
>(type: T): RolePermEnumMapReturn<T, false>;

/**
 * Returns with all permissions set to boolean `value`
 */
export function RolePermEnumMap<
  T extends keyof RolePermEnumsType,
  E extends boolean
>(type: T, value: E): RolePermEnumMapReturn<T, E>;

/**
 * Returns with all possible permissions set to either true or false depending on whether or not they are in `enums`
 * @param enums List of permission enums representing those found in ServerUser Roles
 */
export function RolePermEnumMap<
  T extends keyof RolePermEnumsType,
  E extends RolePermEnumsType[T][] | undefined
>(type: T, enums: E): RolePermEnumMapReturn<T, boolean>;

export function RolePermEnumMap<
  T extends keyof RolePermEnumsType,
  E extends RolePermEnumsType[T][] | undefined
>(type: T, enums?: E | boolean) {
  if (enums && typeof enums !== "boolean") {
    const ret = new Map();
    for (const k in RolePermEnums[type]) {
      // Iterate over all possible permissions, and if found in `enums` array, set that permission to true; else, false
      ret.set(k, (enums as string[]).includes(k));
    }
    return Object.fromEntries(ret);
  }

  const ret = new Map();
  for (const k in RolePermEnums[type]) {
    ret.set(k, typeof enums === "boolean" ? enums : false);
  }
  return Object.fromEntries(ret);
}
