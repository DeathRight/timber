import { objectType } from 'nexus';
import { Domain } from 'nexus-prisma';

const d = Domain;
export const DomainObject = objectType({
  name: d.$name,
  description: d.$description,
  definition(t) {
    t.field(d.id);
    t.field(d.serverId);
    t.field(d.server);
    t.field(d.description);
    t.field(d.displayName);
    t.field(d.start);
    t.field(d.thumbnail);
    t.field(d.createdAt);
    t.field(d.updatedAt);
    t.field(d.roomIds);
    t.field(d.rooms);
  },
});
