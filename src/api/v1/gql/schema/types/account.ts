import { objectType } from 'nexus';
import { Account } from 'nexus-prisma';

const a = Account;
export const AccountObject = objectType({
  name: a.$name,
  description: a.$description,
  definition(t) {
    t.field(a.id);
    t.field(a.userIds);
    t.field(a.users);
    t.field(a.createdAt);
    t.field(a.updatedAt);
    t.field(a.disabled);
    t.field(a.authProvider);
    t.authinfo(a.authInfo.name, { description: a.authInfo.description });
    t.email(a.email.name, { description: a.email.description });
    t.field(a.password);
  },
});
