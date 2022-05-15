import mercurius from 'mercurius';
import { inputObjectType, list, nullable, objectType, queryField } from 'nexus';
import { Role } from 'nexus-prisma';

import { roleWithIncludes } from '../../util/interfaces';

const r = Role;

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

/* --------------------------------- Inputs --------------------------------- */
export const createRoleInput = inputObjectType({
  name: "RoleCreateInput",
  definition(t) {
    t.field(r.serverId);
    t.field(r.displayName);
    t.nonNull.hex(r.color.name, {
      description: r.color.description,
    });
    t.nullable.boolean(r.owner.name, r.owner.description);
    t.nullable.boolean(r.admin.name, r.admin.description);

    t.field(r.modPerms.name, {
      description: r.modPerms.description,
      type: nullable(list("ModPermission")),
    });

    t.field(r.serverDetails.name, {
      description: r.serverDetails.description,
      type: nullable(list("DetailPermission")),
    });

    t.field(r.domainCrud.name, {
      description: r.domainCrud.description,
      type: nullable(list("Permission")),
    });
    t.field(r.domainDetails.name, {
      description: r.domainDetails.description,
      type: nullable(list("DetailPermission")),
    });

    t.field(r.roomCrud.name, {
      description: r.roomCrud.description,
      type: nullable(list("Permission")),
    });
    t.field(r.roomDetails.name, {
      description: r.roomDetails.description,
      type: nullable(list("DetailPermission")),
    });
  },
});

export const updateRoleInput = inputObjectType({
  name: "RoleUpdateInput",
  definition(t) {
    t.nullable.string(r.displayName.name, {
      description: r.displayName.description,
    });
    t.nullable.hex(r.color.name, {
      description: r.color.description,
    });
    t.nullable.boolean(r.owner.name, r.owner.description);
    t.nullable.boolean(r.admin.name, r.admin.description);

    t.field(r.modPerms.name, {
      description: r.modPerms.description,
      type: nullable(list("ModPermission")),
    });

    t.field(r.serverDetails.name, {
      description: r.serverDetails.description,
      type: nullable(list("DetailPermission")),
    });

    t.field(r.domainCrud.name, {
      description: r.domainCrud.description,
      type: nullable(list("Permission")),
    });
    t.field(r.domainDetails.name, {
      description: r.domainDetails.description,
      type: nullable(list("DetailPermission")),
    });

    t.field(r.roomCrud.name, {
      description: r.roomCrud.description,
      type: nullable(list("Permission")),
    });
    t.field(r.roomDetails.name, {
      description: r.roomDetails.description,
      type: nullable(list("DetailPermission")),
    });
  },
});

/* --------------------------------- Queries -------------------------------- */
export const roleById = queryField("roleById", {
  type: "Role",
  description: "Returns role with `id`",
  args: {
    id: r.id.type,
  },
  async resolve(_, args, ctx) {
    const role = await ctx.prisma.role.findUnique({
      where: { id: args.id },
      ...roleWithIncludes,
    });
    if (!role) throw new mercurius.ErrorWithProps("Invalid ID!");
    if (!ctx.auth.isInServer(role.serverId))
      throw new mercurius.ErrorWithProps("Invalid permissions!");

    return role;
  },
});

/* -------------------------------- Mutations ------------------------------- */
//export const createRole
