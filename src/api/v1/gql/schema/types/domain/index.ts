import { objectType } from 'nexus';

import { d } from './constants';

export const DomainObject = objectType({
  name: d.$name,
  description: d.$description,
  definition(t) {
    t.field(d.id);
    t.field(d.serverId);
    t.field(d.server);
    t.field(d.description);
    t.field(d.displayName);
    t.field(d.startId);
    t.field(d.start);
    t.url(d.thumbnail.name, {
      description: d.thumbnail.description,
      resolve: d.thumbnail.resolve,
    });
    t.field(d.createdAt);
    t.field(d.updatedAt);
    t.field(d.rooms);
    t.field(d.order);
  },
});

export * from "./queries";
export * from "./inputs";
export * from "./mutations";
export * from "./subscriptions";
