import { objectType } from 'nexus';

import { s } from './constants';

export const ServerObject = objectType({
  name: s.$name,
  description: s.$description,
  definition(t) {
    t.field(s.id);
    t.field(s.displayName);
    t.field(s.description);
    t.field(s.startId);
    t.field(s.start);
    t.url(s.thumbnail.name, {
      description: s.thumbnail.description,
      resolve: s.thumbnail.resolve,
    });
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

export * from "./queries";
export * from "./inputs";
export * from "./mutations";
export * from "./subscriptions";
