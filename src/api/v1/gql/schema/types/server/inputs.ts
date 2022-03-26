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
    t.nullable.string(s.start.name, { description: s.start.description });
    t.nullable.string(s.thumbnail.name, {
      description: s.thumbnail.description,
    });
  },
});

export const ServerCreateInput = inputObjectType({
  name: "ServerCreateInput",
  definition(t) {
    t.field(s.description);
    t.field(s.displayName);
    t.field(s.thumbnail);
    t.field(s.start);
  },
});
