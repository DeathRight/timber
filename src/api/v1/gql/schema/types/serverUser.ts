import { objectType } from 'nexus';
import { ServerUser } from 'nexus-prisma';

const u = ServerUser;

export const ServerUserObject = objectType({
  name: u.$name,
  description: u.$description,
  definition(t) {
    t.field(u.id);
    t.field(u.displayName);
    t.field(u.serverId);
    t.field(u.server);
    t.field(u.userId);
    t.field(u.user);
    t.field(u.roles);
    t.field(u.createdAt);
    t.field(u.updatedAt);
  },
});
