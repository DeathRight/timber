import { inputObjectType } from 'nexus';

import { d } from './constants';

export const DomainUpdateInput = inputObjectType({
  name: "DomainUpdateInput",
  definition(t) {
    t.nullable.string(d.description.name, {
      description: d.description.description,
    });
    t.nullable.string(d.displayName.name, {
      description: d.displayName.description,
    });
    t.nullable.bigInt(d.startId.name, { description: d.startId.description });
    t.nullable.url(d.thumbnail.name, {
      description: d.thumbnail.description,
    });
  },
});

export const DomainCreateInput = inputObjectType({
  name: "DomainCreateInput",
  definition(t) {
    t.field(d.serverId);
    t.field(d.description);
    t.field(d.displayName);
    t.url(d.thumbnail.name, { description: d.thumbnail.description });
    t.string("startName", {
      description: "Display name of first (default) room",
    });
  },
});
