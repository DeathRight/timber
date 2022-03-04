import { objectType } from 'nexus';
import { Room } from 'nexus-prisma';

const r = Room;
export const RoomObject = objectType({
  name: r.$name,
  description: r.$description,
  definition(t) {
    t.field(r.id);
    t.field(r.domainId);
    t.field(r.domain);
    t.field(r.displayName);
    t.field(r.thumbnail);
    t.field(r.createdAt);
    t.field(r.updatedAt);
  },
});
