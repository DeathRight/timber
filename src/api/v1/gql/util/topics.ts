import { Account, Invite, Prisma } from '@prisma/client';
import { PubSub } from 'mercurius';

import {
  DomainWithIncludes,
  GroupChatWithIncludes,
  RoomWithIncludes,
  ServerUserWithIncludes,
  ServerWithIncludes,
  UserWithAllIncludes,
  UserWithIncludes,
} from './interfaces';

type Topics = {
  User:
    | Prisma.UserCreateArgs["data"]
    | Prisma.UserUpdateArgs["data"]
    | Partial<UserWithIncludes>
    | Partial<UserWithAllIncludes>;
  Account: Partial<Account>;
  Server:
    | Prisma.ServerCreateArgs["data"]
    | Prisma.ServerUpdateArgs["data"]
    | Partial<ServerWithIncludes>;
  Domain:
    | Prisma.DomainCreateArgs["data"]
    | Prisma.DomainUpdateArgs["data"]
    | Partial<DomainWithIncludes>;
  Room:
    | Prisma.RoomCreateArgs["data"]
    | Prisma.RoomUpdateArgs["data"]
    | Partial<RoomWithIncludes>;
  GroupChat:
    | Prisma.GroupChatCreateArgs["data"]
    | Prisma.GroupChatUpdateArgs["data"]
    | Partial<GroupChatWithIncludes>;
  Invite:
    | Prisma.InviteCreateArgs["data"]
    | Prisma.InviteUpdateArgs["data"]
    | Partial<Invite>;
  ServerUser:
    | Prisma.ServerUserCreateArgs
    | Prisma.ServerUserUpdateArgs
    | Partial<ServerUserWithIncludes>;
};

export enum TopicPayloadType {
  "Deleted",
  "Created",
  "Changed",
  "ChildAdded",
  "ChildRemoved",
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

/**
 * Merges changes from `obj2` to `obj1` and returns merged object, changing strategy with Arrays based on `t`
 *
 * Otherwise, only merges changes if a `obj2` property is not null or undefined.
 *
 * ---
 *
 * If TopicPayloadType `t` is `ChildAdded` or `ChildRemoved`, strategy expects a single obj in each Array property (where Array property is i.e. users, domains, etc.).
 *
 * If `t` is `ChildAdded`, Array property should contain the full child obj.
 *
 * If `t` is `ChildRemoved`, Array property shape should only be `{id: ...}`.
 */
const mergeChanges = <T extends Record<any, any>>(
  t: TopicPayloadType,
  obj1: T,
  obj2: Partial<T>
) => {
  let ret: Record<any, any> = obj1;
  for (const key in obj2) {
    if (Array.isArray(obj2[key])) {
      const a1 = obj1[key] as Array<{ [k: string]: any; id: number }>;
      const a2 = obj2[key] as typeof a1;

      const sub = a2[0];
      if (t === TopicPayloadType.ChildAdded) {
        if (!a1.find((o) => o.id === sub.id)) {
          a1.push(sub);
          ret[key] = a1;
        }
      } else if (t === TopicPayloadType.ChildRemoved) {
        const found = a1.findIndex((o) => o.id === sub.id);
        if (found >= 0) {
          a1.splice(found, 1);
          ret[key] = a1;
        }
      } else {
        for (const [k, v] of a2.entries()) {
          const fi = a1.findIndex((o) => o.id === v.id);
          if (fi >= 0) {
            a1.splice(fi, 1, v);
          } else {
            a1.push(v);
          }
        }
      }
    } else {
      ret[key] = obj2[key] != null ? obj2[key] : obj1[key];
    }
  }

  return ret as T;
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
            snapshot = mergeChanges(pt, snapshot, v);
            //snapshot = assignIfDefined(snapshot, v);
            yield snapshot;
          }
        })();
      }.call(ret),
  };
};

export const topic = <T extends keyof Topics>(t: T) => ({
  id: (_id: TopicInput[T]) => {
    const label = `${t}:${_id}`;
    const cR = (topic: TopicPayloadType, lbl: string = label) =>
      createResult<T>(topic, lbl);
    return {
      changed: cR(TopicPayloadType.Changed),
      deleted: cR(TopicPayloadType.Deleted),
      created: cR(TopicPayloadType.Created),
      childAdded: cR(TopicPayloadType.ChildAdded),
      childRemoved: cR(TopicPayloadType.ChildRemoved),
    };
  },
});
