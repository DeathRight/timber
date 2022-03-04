import { objectType } from 'nexus';
import { Server } from 'nexus-prisma';

const s = Server;
export const ServerObject = objectType({
  name: s.$name,
  description: s.$description,
  definition(t) {
    t.field(s.id);
    t.field(s.displayName);
    t.field(s.description);
    t.field(s.start);
    t.field(s.thumbnail);
    t.field(s.createdAt);
    t.field(s.updatedAt);
    t.field(s.owner);
    t.field(s.ownerId);
    t.field(s.users);
    t.field(s.userIds);
    t.field(s.domainIds);
    t.field(s.domains);
  },
});
