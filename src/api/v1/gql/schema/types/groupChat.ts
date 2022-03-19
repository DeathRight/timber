import { objectType } from 'nexus';
import { GroupChat } from 'nexus-prisma';

const g = GroupChat;
export const GroupChatObject = objectType({
  name: g.$name,
  description: g.$description,
  definition(t) {
    t.field(g.id);
    t.field(g.displayName);
    t.field(g.description);
    t.field(g.thumbnail);
    t.field(g.createdAt);
    t.field(g.updatedAt);
    t.field(g.userIds);
    t.field(g.users);
  },
});
