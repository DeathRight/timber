import { inputObjectType } from 'nexus';

import { u } from './constants';

export const UserUpdateInput = inputObjectType({
  name: "UserUpdateInput",
  definition(t) {
    t.nullable.url(u.avatar.name, { description: u.avatar.description });
    t.nullable.string(u.displayName.name, {
      description: u.displayName.description,
    });
    t.nullable.timestamp(u.lastSeen.name, {
      description: u.lastSeen.description,
    });
  },
});

export const UserCreateInput = inputObjectType({
  name: "UserCreateInput",
  definition(t) {
    t.field(u.displayName);
    t.url(u.avatar.name, { description: u.avatar.description });
  },
});
