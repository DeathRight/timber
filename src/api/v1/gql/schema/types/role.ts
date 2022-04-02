import { DetailPermission, ModPermission, Permission } from '@prisma/client';
import { objectType } from 'nexus';
import { Role } from 'nexus-prisma';

const r = Role;

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

export type RolePermEnumMapReturn<
  T extends keyof RolePermEnumsType,
  B extends boolean | undefined = undefined
> = { [k in RolePermEnumsType[T]]: B | boolean };

export function RolePermEnumMap<
  T extends keyof RolePermEnumsType,
  E extends undefined
>(type: T): RolePermEnumMapReturn<T, false>;

export function RolePermEnumMap<
  T extends keyof RolePermEnumsType,
  E extends RolePermEnumsType[T][] | undefined
>(type: T, enums: E): RolePermEnumMapReturn<T>;

export function RolePermEnumMap<
  T extends keyof RolePermEnumsType,
  E extends RolePermEnumsType[T][] | undefined
>(type: T, enums?: E) {
  if (enums) return Object.fromEntries(enums.map((v) => [v, true]));

  const ret = new Map();
  for (const k in RolePermEnums[type]) {
    ret.set(k, false);
  }
  return Object.fromEntries(ret);
}

export const RoleObject = objectType({
  name: r.$name,
  description: r.$description,
  definition(t) {
    t.field(r.id);
    t.field(r.serverId);
    t.field(r.server);
    t.field(r.displayName);
    t.nonNull.hex(r.color.name, {
      description: r.color.description,
      resolve: r.color.resolve,
    });
    t.field(r.order);
    t.field(r.owner);
    t.field(r.admin);
    t.field(r.members);
    t.field(r.modPerms);
    t.field(r.serverDetails);
    t.field(r.domainCrud);
    t.field(r.domainDetails);
    t.field(r.roomCrud);
    t.field(r.roomDetails);
    t.field(r.createdAt);
    t.field(r.updatedAt);
  },
});
