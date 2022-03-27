import { inputObjectType } from 'nexus';

import { s } from './constants';

export const ServerUpdateInput = inputObjectType({
  name: "ServerUpdateInput",
  definition(t) {
    t.nullable.string(s.description.name, {
      description: s.description.description,
    });
    t.nullable.string(s.displayName.name, {
      description: s.displayName.description,
    });
    t.nullable.bigInt(s.startId.name, { description: s.startId.description });
    t.nullable.url(s.thumbnail.name, {
      description: s.thumbnail.description,
    });
  },
});

export const ServerCreateInput = inputObjectType({
  name: "ServerCreateInput",
  definition(t) {
    t.field(s.description);
    t.field(s.displayName);
    t.url(s.thumbnail.name, { description: s.thumbnail.description });
    t.string("startName", {
      description: "Display name of first (default) domain",
    });
  },
});
