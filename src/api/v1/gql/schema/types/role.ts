import { objectType } from 'nexus';
import { Role } from 'nexus-prisma';

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
