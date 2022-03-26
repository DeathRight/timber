import { Account, Domain, GroupChat, Invite, Room, Server, User } from '@prisma/client';

type Topics = {
  User: Partial<User>;
  Account: Partial<Account>;
  Server: Partial<Server>;
  Domain: Partial<Domain>;
  Room: Partial<Room>;
  GroupChat: Partial<GroupChat>;
  Invite: Partial<Invite>;
};

export enum TopicPayloadType {
  "Deleted",
  "Created",
  "Changed",
}
type TopicPayload<PT extends TopicPayloadType, T extends keyof Topics> = {
  type: PT;
  data: Topics[T];
};
type TopicInput = {
  [t in keyof Omit<Topics, "Account">]: bigint;
} & {
  Account: string;
};

export const topic = <T extends keyof Topics>(t: T) => ({
  id: (_id: TopicInput[T]) => ({
    changed: {
      label: () => `${t}:${_id}:CHANGED`,
      payload: (d: Topics[T]): TopicPayload<TopicPayloadType.Changed, T> => ({
        type: TopicPayloadType.Changed,
        data: d,
      }),
    },
    deleted: {
      label: () => `${t}:${_id}:CHANGED`,
      payload: (d: Topics[T]): TopicPayload<TopicPayloadType.Deleted, T> => ({
        type: TopicPayloadType.Deleted,
        data: d,
      }),
    },
    created: {
      label: () => `${t}:${_id}:CHANGED`,
      payload: (d: Topics[T]): TopicPayload<TopicPayloadType.Created, T> => ({
        type: TopicPayloadType.Created,
        data: d,
      }),
    },
  }),
});
