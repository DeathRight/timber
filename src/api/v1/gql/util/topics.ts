import { Account, Domain, GroupChat, Invite, Room, Server, User } from '@prisma/client';
import { assignIfDefined } from '@util';
import { PubSub } from 'mercurius';

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

const createResult = <T extends keyof Topics>(
  pt: TopicPayloadType,
  l: string
) => {
  const ret = {
    label: l,
    payload: (d: Topics[T]): TopicPayload<typeof pt, T> => ({
      type: pt,
      data: d,
    }),
  };
  return {
    ...ret,
    /**
     * First yields `obj` then yields snapshots built from the subscription
     * @param obj Should be the current snapshot of a database object
     */
    snapshot: <O extends Record<string, any>>(obj: O, pubsub: PubSub) =>
      async function (
        this: typeof ret
      ): Promise<AsyncGenerator<O, void, void>> {
        const sub = pubsub.subscribe<Partial<O>>(this.label);
        let snapshot = obj;
        return (async function* () {
          if (obj) yield obj;
          for await (let v of await sub) {
            snapshot = assignIfDefined(snapshot, v);
            yield snapshot;
          }
        })();
      }.call(ret),
  };
};

export const topic = <T extends keyof Topics>(t: T) => ({
  id: (_id: TopicInput[T]) => ({
    changed: createResult<T>(TopicPayloadType.Changed, `${t}:${_id}:CHANGED`),
    deleted: createResult<T>(TopicPayloadType.Deleted, `${t}:${_id}:CHANGED`),
    created: createResult<T>(TopicPayloadType.Created, `${t}:${_id}:CHANGED`),
  }),
});
