import { objectType } from 'nexus';

import { u } from './constants';

export const UserObject = objectType({
  name: u.$name,
  description: u.$description,
  definition(t) {
    t.field(u.id);
    t.field(u.accountId);
    t.field(u.account);
    t.field(u.displayName);
    t.url(u.avatar.name, {
      description: u.avatar.description,
      resolve: u.avatar.resolve,
    });
    t.field(u.createdAt);
    t.nonNull.timestamp(u.lastSeen.name, {
      description: u.lastSeen.description,
      resolve: u.lastSeen.resolve,
    });
    t.field(u.disabled);
    t.field(u.servers);
    t.field(u.serverIds);
    t.field(u.friendIds);
    t.field(u.groupChatIds);
    t.field(u.groupChats);
    t.field(u.updatedAt);
    t.field(u.ownedServers);
  },
});

export * from "./queries";
export * from "./inputs";
export * from "./mutations";
export * from "./subscriptions";
