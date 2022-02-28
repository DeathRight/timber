
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  /**
   * Snowflake (simpleflake) based BigInt ID
   */
  id: bigint
  /**
   * Global display name
   */
  displayName: string
  /**
   * URL for user's avatar
   */
  avatar: string | null
  createdAt: Date
  /**
   * Timestamp in milliseconds since epoch the user was last active
   */
  lastSeen: string
  /**
   * JSON {password?: string, ids?: string[]} where `ids` is email or auth provider ID list
   */
  authInfo: Prisma.JsonValue
  /**
   * Original/primary auth provider
   */
  authProvider: Provider
  /**
   * Whether user is globally disabled
   */
  disabled: boolean
  /**
   * Array of server IDs the user is a member of
   */
  serverIds: bigint[]
  /**
   * Array of user IDs the user is friends with
   */
  friends: bigint[]
  /**
   * Array of GroupChat IDs for group chats the user is a member of
   */
  groupChatIds: bigint[]
  /**
   * ISO date this row was last updated
   */
  updatedAt: Date
}

/**
 * Model Server
 * 
 */
export type Server = {
  /**
   * Snowflake (simpleflake) based BigInt ID
   */
  id: bigint
  /**
   * Global display name
   */
  displayName: string
  /**
   * Description of server
   */
  description: string | null
  /**
   * Starting domain ID
   */
  start: string
  /**
   * URL for server's thumbnail
   */
  thumbnail: string | null
  /**
   * ISO date the server was created at
   */
  createdAt: Date
  /**
   * ISO date this row was last updated
   */
  updatedAt: Date
  /**
   * User ID of the owner
   */
  ownerId: bigint
  /**
   * Array of user IDs that are members of this server
   */
  userIds: bigint[]
  /**
   * Array of domain IDs that this server contains
   */
  domainIds: bigint[]
}

/**
 * Model Domain
 * 
 */
export type Domain = {
  /**
   * Snowflake (simpleflake) based BigInt ID
   */
  id: bigint
  /**
   * ID of server that contains this domain
   */
  serverId: bigint
  /**
   * Description of domain
   */
  description: string | null
  /**
   * Global display name
   */
  displayName: string
  /**
   * Starting room ID
   */
  start: string
  /**
   * URL for domain's thumbnail
   */
  thumbnail: string | null
  /**
   * ISO date the domain was created at
   */
  createdAt: Date
  /**
   * ISO date this row was last updated
   */
  updatedAt: Date
  /**
   * Array of room ids that this domain contains
   */
  roomIds: bigint[]
}

/**
 * Model Room
 * 
 */
export type Room = {
  /**
   * Snowflake (simpleflake) based BigInt ID
   */
  id: bigint
  /**
   * ID of domain that contains this room
   */
  domainId: bigint
  /**
   * Global display name
   */
  displayName: string
  /**
   * URL for room's thumbnail
   */
  thumbnail: string | null
  /**
   * ISO date the room was created at
   */
  createdAt: Date
  /**
   * ISO date this row was last updated
   */
  updatedAt: Date
}

/**
 * Model GroupChat
 * 
 */
export type GroupChat = {
  /**
   * Snowflake (simpleflake) based BigInt ID
   */
  id: bigint
  /**
   * Global display name
   */
  displayName: string
  /**
   * Description of GroupChat
   */
  description: string
  /**
   * URL for group chat's thumbnail
   */
  thumbnail: string | null
  /**
   * ISO date the group chat was created at
   */
  createdAt: Date
  /**
   * ISO date this row was last updated
   */
  updatedAt: Date
  /**
   * Array of user IDs that are members of this group chat
   */
  userIds: bigint[]
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Provider: {
  EMAIL: 'EMAIL',
  GITHUB: 'GITHUB',
  GOOGLE: 'GOOGLE',
  TWITTER: 'TWITTER'
};

export type Provider = (typeof Provider)[keyof typeof Provider]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.server`: Exposes CRUD operations for the **Server** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servers
    * const servers = await prisma.server.findMany()
    * ```
    */
  get server(): Prisma.ServerDelegate<GlobalReject>;

  /**
   * `prisma.domain`: Exposes CRUD operations for the **Domain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Domains
    * const domains = await prisma.domain.findMany()
    * ```
    */
  get domain(): Prisma.DomainDelegate<GlobalReject>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<GlobalReject>;

  /**
   * `prisma.groupChat`: Exposes CRUD operations for the **GroupChat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupChats
    * const groupChats = await prisma.groupChat.findMany()
    * ```
    */
  get groupChat(): Prisma.GroupChatDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  /**
   * Prisma Client JS version: 3.10.0
   * Query Engine version: 73e60b76d394f8d37d8ebd1f8918c79029f0db86
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    User: 'User',
    Server: 'Server',
    Domain: 'Domain',
    Room: 'Room',
    GroupChat: 'GroupChat'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends boolean
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined; 
  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    servers: number
    groupChats: number
    ownedServers: number
  }

  export type UserCountOutputTypeSelect = {
    servers?: boolean
    groupChats?: boolean
    ownedServers?: boolean
  }

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type ServerCountOutputType
   */


  export type ServerCountOutputType = {
    users: number
    domains: number
  }

  export type ServerCountOutputTypeSelect = {
    users?: boolean
    domains?: boolean
  }

  export type ServerCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ServerCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ServerCountOutputType
    : S extends undefined
    ? never
    : S extends ServerCountOutputTypeArgs
    ?'include' extends U
    ? ServerCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ServerCountOutputType ? ServerCountOutputType[P] : never
  } 
    : ServerCountOutputType
  : ServerCountOutputType




  // Custom InputTypes

  /**
   * ServerCountOutputType without action
   */
  export type ServerCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ServerCountOutputType
     * 
    **/
    select?: ServerCountOutputTypeSelect | null
  }



  /**
   * Count Type DomainCountOutputType
   */


  export type DomainCountOutputType = {
    rooms: number
  }

  export type DomainCountOutputTypeSelect = {
    rooms?: boolean
  }

  export type DomainCountOutputTypeGetPayload<
    S extends boolean | null | undefined | DomainCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? DomainCountOutputType
    : S extends undefined
    ? never
    : S extends DomainCountOutputTypeArgs
    ?'include' extends U
    ? DomainCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DomainCountOutputType ? DomainCountOutputType[P] : never
  } 
    : DomainCountOutputType
  : DomainCountOutputType




  // Custom InputTypes

  /**
   * DomainCountOutputType without action
   */
  export type DomainCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DomainCountOutputType
     * 
    **/
    select?: DomainCountOutputTypeSelect | null
  }



  /**
   * Count Type GroupChatCountOutputType
   */


  export type GroupChatCountOutputType = {
    users: number
  }

  export type GroupChatCountOutputTypeSelect = {
    users?: boolean
  }

  export type GroupChatCountOutputTypeGetPayload<
    S extends boolean | null | undefined | GroupChatCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? GroupChatCountOutputType
    : S extends undefined
    ? never
    : S extends GroupChatCountOutputTypeArgs
    ?'include' extends U
    ? GroupChatCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof GroupChatCountOutputType ? GroupChatCountOutputType[P] : never
  } 
    : GroupChatCountOutputType
  : GroupChatCountOutputType




  // Custom InputTypes

  /**
   * GroupChatCountOutputType without action
   */
  export type GroupChatCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the GroupChatCountOutputType
     * 
    **/
    select?: GroupChatCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    serverIds: number | null
    friends: number | null
    groupChatIds: number | null
  }

  export type UserSumAggregateOutputType = {
    id: bigint | null
    serverIds: bigint[] | null
    friends: bigint[] | null
    groupChatIds: bigint[] | null
  }

  export type UserMinAggregateOutputType = {
    id: bigint | null
    displayName: string | null
    avatar: string | null
    createdAt: Date | null
    lastSeen: string | null
    authProvider: Provider | null
    disabled: boolean | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: bigint | null
    displayName: string | null
    avatar: string | null
    createdAt: Date | null
    lastSeen: string | null
    authProvider: Provider | null
    disabled: boolean | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    displayName: number
    avatar: number
    createdAt: number
    lastSeen: number
    authInfo: number
    authProvider: number
    disabled: number
    serverIds: number
    friends: number
    groupChatIds: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    serverIds?: true
    friends?: true
    groupChatIds?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    serverIds?: true
    friends?: true
    groupChatIds?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    displayName?: true
    avatar?: true
    createdAt?: true
    lastSeen?: true
    authProvider?: true
    disabled?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    displayName?: true
    avatar?: true
    createdAt?: true
    lastSeen?: true
    authProvider?: true
    disabled?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    displayName?: true
    avatar?: true
    createdAt?: true
    lastSeen?: true
    authInfo?: true
    authProvider?: true
    disabled?: true
    serverIds?: true
    friends?: true
    groupChatIds?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: bigint
    displayName: string
    avatar: string | null
    createdAt: Date
    lastSeen: string
    authInfo: JsonValue
    authProvider: Provider
    disabled: boolean
    serverIds: bigint[]
    friends: bigint[]
    groupChatIds: bigint[]
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    displayName?: boolean
    avatar?: boolean
    createdAt?: boolean
    lastSeen?: boolean
    authInfo?: boolean
    authProvider?: boolean
    disabled?: boolean
    servers?: boolean | ServerFindManyArgs
    serverIds?: boolean
    friends?: boolean
    groupChatIds?: boolean
    groupChats?: boolean | GroupChatFindManyArgs
    updatedAt?: boolean
    ownedServers?: boolean | ServerFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    servers?: boolean | ServerFindManyArgs
    groupChats?: boolean | GroupChatFindManyArgs
    ownedServers?: boolean | ServerFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'servers' ? Array < ServerGetPayload<S['include'][P]>>  :
        P extends 'groupChats' ? Array < GroupChatGetPayload<S['include'][P]>>  :
        P extends 'ownedServers' ? Array < ServerGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'servers' ? Array < ServerGetPayload<S['select'][P]>>  :
        P extends 'groupChats' ? Array < GroupChatGetPayload<S['select'][P]>>  :
        P extends 'ownedServers' ? Array < ServerGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    servers<T extends ServerFindManyArgs = {}>(args?: Subset<T, ServerFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Server>>, PrismaPromise<Array<ServerGetPayload<T>>>>;

    groupChats<T extends GroupChatFindManyArgs = {}>(args?: Subset<T, GroupChatFindManyArgs>): CheckSelect<T, PrismaPromise<Array<GroupChat>>, PrismaPromise<Array<GroupChatGetPayload<T>>>>;

    ownedServers<T extends ServerFindManyArgs = {}>(args?: Subset<T, ServerFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Server>>, PrismaPromise<Array<ServerGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User findFirst
   */
  export type UserFindFirstArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Throw an Error if a User can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Server
   */


  export type AggregateServer = {
    _count: ServerCountAggregateOutputType | null
    _avg: ServerAvgAggregateOutputType | null
    _sum: ServerSumAggregateOutputType | null
    _min: ServerMinAggregateOutputType | null
    _max: ServerMaxAggregateOutputType | null
  }

  export type ServerAvgAggregateOutputType = {
    id: number | null
    ownerId: number | null
    userIds: number | null
    domainIds: number | null
  }

  export type ServerSumAggregateOutputType = {
    id: bigint | null
    ownerId: bigint | null
    userIds: bigint[] | null
    domainIds: bigint[] | null
  }

  export type ServerMinAggregateOutputType = {
    id: bigint | null
    displayName: string | null
    description: string | null
    start: string | null
    thumbnail: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: bigint | null
  }

  export type ServerMaxAggregateOutputType = {
    id: bigint | null
    displayName: string | null
    description: string | null
    start: string | null
    thumbnail: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ownerId: bigint | null
  }

  export type ServerCountAggregateOutputType = {
    id: number
    displayName: number
    description: number
    start: number
    thumbnail: number
    createdAt: number
    updatedAt: number
    ownerId: number
    userIds: number
    domainIds: number
    _all: number
  }


  export type ServerAvgAggregateInputType = {
    id?: true
    ownerId?: true
    userIds?: true
    domainIds?: true
  }

  export type ServerSumAggregateInputType = {
    id?: true
    ownerId?: true
    userIds?: true
    domainIds?: true
  }

  export type ServerMinAggregateInputType = {
    id?: true
    displayName?: true
    description?: true
    start?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type ServerMaxAggregateInputType = {
    id?: true
    displayName?: true
    description?: true
    start?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
  }

  export type ServerCountAggregateInputType = {
    id?: true
    displayName?: true
    description?: true
    start?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
    ownerId?: true
    userIds?: true
    domainIds?: true
    _all?: true
  }

  export type ServerAggregateArgs = {
    /**
     * Filter which Server to aggregate.
     * 
    **/
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     * 
    **/
    orderBy?: Enumerable<ServerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Servers
    **/
    _count?: true | ServerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServerMaxAggregateInputType
  }

  export type GetServerAggregateType<T extends ServerAggregateArgs> = {
        [P in keyof T & keyof AggregateServer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServer[P]>
      : GetScalarType<T[P], AggregateServer[P]>
  }




  export type ServerGroupByArgs = {
    where?: ServerWhereInput
    orderBy?: Enumerable<ServerOrderByWithAggregationInput>
    by: Array<ServerScalarFieldEnum>
    having?: ServerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServerCountAggregateInputType | true
    _avg?: ServerAvgAggregateInputType
    _sum?: ServerSumAggregateInputType
    _min?: ServerMinAggregateInputType
    _max?: ServerMaxAggregateInputType
  }


  export type ServerGroupByOutputType = {
    id: bigint
    displayName: string
    description: string | null
    start: string
    thumbnail: string | null
    createdAt: Date
    updatedAt: Date
    ownerId: bigint
    userIds: bigint[]
    domainIds: bigint[]
    _count: ServerCountAggregateOutputType | null
    _avg: ServerAvgAggregateOutputType | null
    _sum: ServerSumAggregateOutputType | null
    _min: ServerMinAggregateOutputType | null
    _max: ServerMaxAggregateOutputType | null
  }

  type GetServerGroupByPayload<T extends ServerGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ServerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServerGroupByOutputType[P]>
            : GetScalarType<T[P], ServerGroupByOutputType[P]>
        }
      >
    >


  export type ServerSelect = {
    id?: boolean
    displayName?: boolean
    description?: boolean
    start?: boolean
    thumbnail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserArgs
    ownerId?: boolean
    users?: boolean | UserFindManyArgs
    userIds?: boolean
    domainIds?: boolean
    domains?: boolean | DomainFindManyArgs
    _count?: boolean | ServerCountOutputTypeArgs
  }

  export type ServerInclude = {
    owner?: boolean | UserArgs
    users?: boolean | UserFindManyArgs
    domains?: boolean | DomainFindManyArgs
    _count?: boolean | ServerCountOutputTypeArgs
  }

  export type ServerGetPayload<
    S extends boolean | null | undefined | ServerArgs,
    U = keyof S
      > = S extends true
        ? Server
    : S extends undefined
    ? never
    : S extends ServerArgs | ServerFindManyArgs
    ?'include' extends U
    ? Server  & {
    [P in TrueKeys<S['include']>]:
        P extends 'owner' ? UserGetPayload<S['include'][P]> :
        P extends 'users' ? Array < UserGetPayload<S['include'][P]>>  :
        P extends 'domains' ? Array < DomainGetPayload<S['include'][P]>>  :
        P extends '_count' ? ServerCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'owner' ? UserGetPayload<S['select'][P]> :
        P extends 'users' ? Array < UserGetPayload<S['select'][P]>>  :
        P extends 'domains' ? Array < DomainGetPayload<S['select'][P]>>  :
        P extends '_count' ? ServerCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Server ? Server[P] : never
  } 
    : Server
  : Server


  type ServerCountArgs = Merge<
    Omit<ServerFindManyArgs, 'select' | 'include'> & {
      select?: ServerCountAggregateInputType | true
    }
  >

  export interface ServerDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Server that matches the filter.
     * @param {ServerFindUniqueArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServerFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ServerFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Server'> extends True ? CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>> : CheckSelect<T, Prisma__ServerClient<Server | null >, Prisma__ServerClient<ServerGetPayload<T> | null >>

    /**
     * Find the first Server that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindFirstArgs} args - Arguments to find a Server
     * @example
     * // Get one Server
     * const server = await prisma.server.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServerFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ServerFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Server'> extends True ? CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>> : CheckSelect<T, Prisma__ServerClient<Server | null >, Prisma__ServerClient<ServerGetPayload<T> | null >>

    /**
     * Find zero or more Servers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servers
     * const servers = await prisma.server.findMany()
     * 
     * // Get first 10 Servers
     * const servers = await prisma.server.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serverWithIdOnly = await prisma.server.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ServerFindManyArgs>(
      args?: SelectSubset<T, ServerFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Server>>, PrismaPromise<Array<ServerGetPayload<T>>>>

    /**
     * Create a Server.
     * @param {ServerCreateArgs} args - Arguments to create a Server.
     * @example
     * // Create one Server
     * const Server = await prisma.server.create({
     *   data: {
     *     // ... data to create a Server
     *   }
     * })
     * 
    **/
    create<T extends ServerCreateArgs>(
      args: SelectSubset<T, ServerCreateArgs>
    ): CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>>

    /**
     * Create many Servers.
     *     @param {ServerCreateManyArgs} args - Arguments to create many Servers.
     *     @example
     *     // Create many Servers
     *     const server = await prisma.server.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ServerCreateManyArgs>(
      args?: SelectSubset<T, ServerCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Server.
     * @param {ServerDeleteArgs} args - Arguments to delete one Server.
     * @example
     * // Delete one Server
     * const Server = await prisma.server.delete({
     *   where: {
     *     // ... filter to delete one Server
     *   }
     * })
     * 
    **/
    delete<T extends ServerDeleteArgs>(
      args: SelectSubset<T, ServerDeleteArgs>
    ): CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>>

    /**
     * Update one Server.
     * @param {ServerUpdateArgs} args - Arguments to update one Server.
     * @example
     * // Update one Server
     * const server = await prisma.server.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServerUpdateArgs>(
      args: SelectSubset<T, ServerUpdateArgs>
    ): CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>>

    /**
     * Delete zero or more Servers.
     * @param {ServerDeleteManyArgs} args - Arguments to filter Servers to delete.
     * @example
     * // Delete a few Servers
     * const { count } = await prisma.server.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServerDeleteManyArgs>(
      args?: SelectSubset<T, ServerDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servers
     * const server = await prisma.server.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServerUpdateManyArgs>(
      args: SelectSubset<T, ServerUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Server.
     * @param {ServerUpsertArgs} args - Arguments to update or create a Server.
     * @example
     * // Update or create a Server
     * const server = await prisma.server.upsert({
     *   create: {
     *     // ... data to create a Server
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Server we want to update
     *   }
     * })
    **/
    upsert<T extends ServerUpsertArgs>(
      args: SelectSubset<T, ServerUpsertArgs>
    ): CheckSelect<T, Prisma__ServerClient<Server>, Prisma__ServerClient<ServerGetPayload<T>>>

    /**
     * Count the number of Servers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerCountArgs} args - Arguments to filter Servers to count.
     * @example
     * // Count the number of Servers
     * const count = await prisma.server.count({
     *   where: {
     *     // ... the filter for the Servers we want to count
     *   }
     * })
    **/
    count<T extends ServerCountArgs>(
      args?: Subset<T, ServerCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Server.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServerAggregateArgs>(args: Subset<T, ServerAggregateArgs>): PrismaPromise<GetServerAggregateType<T>>

    /**
     * Group by Server.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServerGroupByArgs['orderBy'] }
        : { orderBy?: ServerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServerGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Server.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ServerClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | null >, Prisma__UserClient<UserGetPayload<T> | null >>;

    users<T extends UserFindManyArgs = {}>(args?: Subset<T, UserFindManyArgs>): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>;

    domains<T extends DomainFindManyArgs = {}>(args?: Subset<T, DomainFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Domain>>, PrismaPromise<Array<DomainGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Server findUnique
   */
  export type ServerFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Server
     * 
    **/
    select?: ServerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServerInclude | null
    /**
     * Throw an Error if a Server can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Server to fetch.
     * 
    **/
    where: ServerWhereUniqueInput
  }


  /**
   * Server findFirst
   */
  export type ServerFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Server
     * 
    **/
    select?: ServerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServerInclude | null
    /**
     * Throw an Error if a Server can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Server to fetch.
     * 
    **/
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     * 
    **/
    orderBy?: Enumerable<ServerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servers.
     * 
    **/
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servers.
     * 
    **/
    distinct?: Enumerable<ServerScalarFieldEnum>
  }


  /**
   * Server findMany
   */
  export type ServerFindManyArgs = {
    /**
     * Select specific fields to fetch from the Server
     * 
    **/
    select?: ServerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServerInclude | null
    /**
     * Filter, which Servers to fetch.
     * 
    **/
    where?: ServerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servers to fetch.
     * 
    **/
    orderBy?: Enumerable<ServerOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Servers.
     * 
    **/
    cursor?: ServerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ServerScalarFieldEnum>
  }


  /**
   * Server create
   */
  export type ServerCreateArgs = {
    /**
     * Select specific fields to fetch from the Server
     * 
    **/
    select?: ServerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServerInclude | null
    /**
     * The data needed to create a Server.
     * 
    **/
    data: XOR<ServerCreateInput, ServerUncheckedCreateInput>
  }


  /**
   * Server createMany
   */
  export type ServerCreateManyArgs = {
    /**
     * The data used to create many Servers.
     * 
    **/
    data: Enumerable<ServerCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Server update
   */
  export type ServerUpdateArgs = {
    /**
     * Select specific fields to fetch from the Server
     * 
    **/
    select?: ServerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServerInclude | null
    /**
     * The data needed to update a Server.
     * 
    **/
    data: XOR<ServerUpdateInput, ServerUncheckedUpdateInput>
    /**
     * Choose, which Server to update.
     * 
    **/
    where: ServerWhereUniqueInput
  }


  /**
   * Server updateMany
   */
  export type ServerUpdateManyArgs = {
    /**
     * The data used to update Servers.
     * 
    **/
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyInput>
    /**
     * Filter which Servers to update
     * 
    **/
    where?: ServerWhereInput
  }


  /**
   * Server upsert
   */
  export type ServerUpsertArgs = {
    /**
     * Select specific fields to fetch from the Server
     * 
    **/
    select?: ServerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServerInclude | null
    /**
     * The filter to search for the Server to update in case it exists.
     * 
    **/
    where: ServerWhereUniqueInput
    /**
     * In case the Server found by the `where` argument doesn't exist, create a new Server with this data.
     * 
    **/
    create: XOR<ServerCreateInput, ServerUncheckedCreateInput>
    /**
     * In case the Server was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ServerUpdateInput, ServerUncheckedUpdateInput>
  }


  /**
   * Server delete
   */
  export type ServerDeleteArgs = {
    /**
     * Select specific fields to fetch from the Server
     * 
    **/
    select?: ServerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServerInclude | null
    /**
     * Filter which Server to delete.
     * 
    **/
    where: ServerWhereUniqueInput
  }


  /**
   * Server deleteMany
   */
  export type ServerDeleteManyArgs = {
    /**
     * Filter which Servers to delete
     * 
    **/
    where?: ServerWhereInput
  }


  /**
   * Server without action
   */
  export type ServerArgs = {
    /**
     * Select specific fields to fetch from the Server
     * 
    **/
    select?: ServerSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServerInclude | null
  }



  /**
   * Model Domain
   */


  export type AggregateDomain = {
    _count: DomainCountAggregateOutputType | null
    _avg: DomainAvgAggregateOutputType | null
    _sum: DomainSumAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  export type DomainAvgAggregateOutputType = {
    id: number | null
    serverId: number | null
    roomIds: number | null
  }

  export type DomainSumAggregateOutputType = {
    id: bigint | null
    serverId: bigint | null
    roomIds: bigint[] | null
  }

  export type DomainMinAggregateOutputType = {
    id: bigint | null
    serverId: bigint | null
    description: string | null
    displayName: string | null
    start: string | null
    thumbnail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainMaxAggregateOutputType = {
    id: bigint | null
    serverId: bigint | null
    description: string | null
    displayName: string | null
    start: string | null
    thumbnail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DomainCountAggregateOutputType = {
    id: number
    serverId: number
    description: number
    displayName: number
    start: number
    thumbnail: number
    createdAt: number
    updatedAt: number
    roomIds: number
    _all: number
  }


  export type DomainAvgAggregateInputType = {
    id?: true
    serverId?: true
    roomIds?: true
  }

  export type DomainSumAggregateInputType = {
    id?: true
    serverId?: true
    roomIds?: true
  }

  export type DomainMinAggregateInputType = {
    id?: true
    serverId?: true
    description?: true
    displayName?: true
    start?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainMaxAggregateInputType = {
    id?: true
    serverId?: true
    description?: true
    displayName?: true
    start?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DomainCountAggregateInputType = {
    id?: true
    serverId?: true
    description?: true
    displayName?: true
    start?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
    roomIds?: true
    _all?: true
  }

  export type DomainAggregateArgs = {
    /**
     * Filter which Domain to aggregate.
     * 
    **/
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     * 
    **/
    orderBy?: Enumerable<DomainOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Domains
    **/
    _count?: true | DomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DomainAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DomainSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainMaxAggregateInputType
  }

  export type GetDomainAggregateType<T extends DomainAggregateArgs> = {
        [P in keyof T & keyof AggregateDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomain[P]>
      : GetScalarType<T[P], AggregateDomain[P]>
  }




  export type DomainGroupByArgs = {
    where?: DomainWhereInput
    orderBy?: Enumerable<DomainOrderByWithAggregationInput>
    by: Array<DomainScalarFieldEnum>
    having?: DomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainCountAggregateInputType | true
    _avg?: DomainAvgAggregateInputType
    _sum?: DomainSumAggregateInputType
    _min?: DomainMinAggregateInputType
    _max?: DomainMaxAggregateInputType
  }


  export type DomainGroupByOutputType = {
    id: bigint
    serverId: bigint
    description: string | null
    displayName: string
    start: string
    thumbnail: string | null
    createdAt: Date
    updatedAt: Date
    roomIds: bigint[]
    _count: DomainCountAggregateOutputType | null
    _avg: DomainAvgAggregateOutputType | null
    _sum: DomainSumAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  type GetDomainGroupByPayload<T extends DomainGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainGroupByOutputType[P]>
            : GetScalarType<T[P], DomainGroupByOutputType[P]>
        }
      >
    >


  export type DomainSelect = {
    id?: boolean
    serverId?: boolean
    description?: boolean
    server?: boolean | ServerArgs
    displayName?: boolean
    start?: boolean
    thumbnail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roomIds?: boolean
    rooms?: boolean | RoomFindManyArgs
    _count?: boolean | DomainCountOutputTypeArgs
  }

  export type DomainInclude = {
    server?: boolean | ServerArgs
    rooms?: boolean | RoomFindManyArgs
    _count?: boolean | DomainCountOutputTypeArgs
  }

  export type DomainGetPayload<
    S extends boolean | null | undefined | DomainArgs,
    U = keyof S
      > = S extends true
        ? Domain
    : S extends undefined
    ? never
    : S extends DomainArgs | DomainFindManyArgs
    ?'include' extends U
    ? Domain  & {
    [P in TrueKeys<S['include']>]:
        P extends 'server' ? ServerGetPayload<S['include'][P]> :
        P extends 'rooms' ? Array < RoomGetPayload<S['include'][P]>>  :
        P extends '_count' ? DomainCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'server' ? ServerGetPayload<S['select'][P]> :
        P extends 'rooms' ? Array < RoomGetPayload<S['select'][P]>>  :
        P extends '_count' ? DomainCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Domain ? Domain[P] : never
  } 
    : Domain
  : Domain


  type DomainCountArgs = Merge<
    Omit<DomainFindManyArgs, 'select' | 'include'> & {
      select?: DomainCountAggregateInputType | true
    }
  >

  export interface DomainDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Domain that matches the filter.
     * @param {DomainFindUniqueArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DomainFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DomainFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Domain'> extends True ? CheckSelect<T, Prisma__DomainClient<Domain>, Prisma__DomainClient<DomainGetPayload<T>>> : CheckSelect<T, Prisma__DomainClient<Domain | null >, Prisma__DomainClient<DomainGetPayload<T> | null >>

    /**
     * Find the first Domain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DomainFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DomainFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Domain'> extends True ? CheckSelect<T, Prisma__DomainClient<Domain>, Prisma__DomainClient<DomainGetPayload<T>>> : CheckSelect<T, Prisma__DomainClient<Domain | null >, Prisma__DomainClient<DomainGetPayload<T> | null >>

    /**
     * Find zero or more Domains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Domains
     * const domains = await prisma.domain.findMany()
     * 
     * // Get first 10 Domains
     * const domains = await prisma.domain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const domainWithIdOnly = await prisma.domain.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DomainFindManyArgs>(
      args?: SelectSubset<T, DomainFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Domain>>, PrismaPromise<Array<DomainGetPayload<T>>>>

    /**
     * Create a Domain.
     * @param {DomainCreateArgs} args - Arguments to create a Domain.
     * @example
     * // Create one Domain
     * const Domain = await prisma.domain.create({
     *   data: {
     *     // ... data to create a Domain
     *   }
     * })
     * 
    **/
    create<T extends DomainCreateArgs>(
      args: SelectSubset<T, DomainCreateArgs>
    ): CheckSelect<T, Prisma__DomainClient<Domain>, Prisma__DomainClient<DomainGetPayload<T>>>

    /**
     * Create many Domains.
     *     @param {DomainCreateManyArgs} args - Arguments to create many Domains.
     *     @example
     *     // Create many Domains
     *     const domain = await prisma.domain.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DomainCreateManyArgs>(
      args?: SelectSubset<T, DomainCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Domain.
     * @param {DomainDeleteArgs} args - Arguments to delete one Domain.
     * @example
     * // Delete one Domain
     * const Domain = await prisma.domain.delete({
     *   where: {
     *     // ... filter to delete one Domain
     *   }
     * })
     * 
    **/
    delete<T extends DomainDeleteArgs>(
      args: SelectSubset<T, DomainDeleteArgs>
    ): CheckSelect<T, Prisma__DomainClient<Domain>, Prisma__DomainClient<DomainGetPayload<T>>>

    /**
     * Update one Domain.
     * @param {DomainUpdateArgs} args - Arguments to update one Domain.
     * @example
     * // Update one Domain
     * const domain = await prisma.domain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DomainUpdateArgs>(
      args: SelectSubset<T, DomainUpdateArgs>
    ): CheckSelect<T, Prisma__DomainClient<Domain>, Prisma__DomainClient<DomainGetPayload<T>>>

    /**
     * Delete zero or more Domains.
     * @param {DomainDeleteManyArgs} args - Arguments to filter Domains to delete.
     * @example
     * // Delete a few Domains
     * const { count } = await prisma.domain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DomainDeleteManyArgs>(
      args?: SelectSubset<T, DomainDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DomainUpdateManyArgs>(
      args: SelectSubset<T, DomainUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Domain.
     * @param {DomainUpsertArgs} args - Arguments to update or create a Domain.
     * @example
     * // Update or create a Domain
     * const domain = await prisma.domain.upsert({
     *   create: {
     *     // ... data to create a Domain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Domain we want to update
     *   }
     * })
    **/
    upsert<T extends DomainUpsertArgs>(
      args: SelectSubset<T, DomainUpsertArgs>
    ): CheckSelect<T, Prisma__DomainClient<Domain>, Prisma__DomainClient<DomainGetPayload<T>>>

    /**
     * Count the number of Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainCountArgs} args - Arguments to filter Domains to count.
     * @example
     * // Count the number of Domains
     * const count = await prisma.domain.count({
     *   where: {
     *     // ... the filter for the Domains we want to count
     *   }
     * })
    **/
    count<T extends DomainCountArgs>(
      args?: Subset<T, DomainCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DomainAggregateArgs>(args: Subset<T, DomainAggregateArgs>): PrismaPromise<GetDomainAggregateType<T>>

    /**
     * Group by Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainGroupByArgs['orderBy'] }
        : { orderBy?: DomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Domain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DomainClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    server<T extends ServerArgs = {}>(args?: Subset<T, ServerArgs>): CheckSelect<T, Prisma__ServerClient<Server | null >, Prisma__ServerClient<ServerGetPayload<T> | null >>;

    rooms<T extends RoomFindManyArgs = {}>(args?: Subset<T, RoomFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Room>>, PrismaPromise<Array<RoomGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Domain findUnique
   */
  export type DomainFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Domain
     * 
    **/
    select?: DomainSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DomainInclude | null
    /**
     * Throw an Error if a Domain can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Domain to fetch.
     * 
    **/
    where: DomainWhereUniqueInput
  }


  /**
   * Domain findFirst
   */
  export type DomainFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Domain
     * 
    **/
    select?: DomainSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DomainInclude | null
    /**
     * Throw an Error if a Domain can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Domain to fetch.
     * 
    **/
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     * 
    **/
    orderBy?: Enumerable<DomainOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     * 
    **/
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     * 
    **/
    distinct?: Enumerable<DomainScalarFieldEnum>
  }


  /**
   * Domain findMany
   */
  export type DomainFindManyArgs = {
    /**
     * Select specific fields to fetch from the Domain
     * 
    **/
    select?: DomainSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DomainInclude | null
    /**
     * Filter, which Domains to fetch.
     * 
    **/
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     * 
    **/
    orderBy?: Enumerable<DomainOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Domains.
     * 
    **/
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DomainScalarFieldEnum>
  }


  /**
   * Domain create
   */
  export type DomainCreateArgs = {
    /**
     * Select specific fields to fetch from the Domain
     * 
    **/
    select?: DomainSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DomainInclude | null
    /**
     * The data needed to create a Domain.
     * 
    **/
    data: XOR<DomainCreateInput, DomainUncheckedCreateInput>
  }


  /**
   * Domain createMany
   */
  export type DomainCreateManyArgs = {
    /**
     * The data used to create many Domains.
     * 
    **/
    data: Enumerable<DomainCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Domain update
   */
  export type DomainUpdateArgs = {
    /**
     * Select specific fields to fetch from the Domain
     * 
    **/
    select?: DomainSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DomainInclude | null
    /**
     * The data needed to update a Domain.
     * 
    **/
    data: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
    /**
     * Choose, which Domain to update.
     * 
    **/
    where: DomainWhereUniqueInput
  }


  /**
   * Domain updateMany
   */
  export type DomainUpdateManyArgs = {
    /**
     * The data used to update Domains.
     * 
    **/
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     * 
    **/
    where?: DomainWhereInput
  }


  /**
   * Domain upsert
   */
  export type DomainUpsertArgs = {
    /**
     * Select specific fields to fetch from the Domain
     * 
    **/
    select?: DomainSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DomainInclude | null
    /**
     * The filter to search for the Domain to update in case it exists.
     * 
    **/
    where: DomainWhereUniqueInput
    /**
     * In case the Domain found by the `where` argument doesn't exist, create a new Domain with this data.
     * 
    **/
    create: XOR<DomainCreateInput, DomainUncheckedCreateInput>
    /**
     * In case the Domain was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
  }


  /**
   * Domain delete
   */
  export type DomainDeleteArgs = {
    /**
     * Select specific fields to fetch from the Domain
     * 
    **/
    select?: DomainSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DomainInclude | null
    /**
     * Filter which Domain to delete.
     * 
    **/
    where: DomainWhereUniqueInput
  }


  /**
   * Domain deleteMany
   */
  export type DomainDeleteManyArgs = {
    /**
     * Filter which Domains to delete
     * 
    **/
    where?: DomainWhereInput
  }


  /**
   * Domain without action
   */
  export type DomainArgs = {
    /**
     * Select specific fields to fetch from the Domain
     * 
    **/
    select?: DomainSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DomainInclude | null
  }



  /**
   * Model Room
   */


  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    id: number | null
    domainId: number | null
  }

  export type RoomSumAggregateOutputType = {
    id: bigint | null
    domainId: bigint | null
  }

  export type RoomMinAggregateOutputType = {
    id: bigint | null
    domainId: bigint | null
    displayName: string | null
    thumbnail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: bigint | null
    domainId: bigint | null
    displayName: string | null
    thumbnail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    domainId: number
    displayName: number
    thumbnail: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    id?: true
    domainId?: true
  }

  export type RoomSumAggregateInputType = {
    id?: true
    domainId?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    domainId?: true
    displayName?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    domainId?: true
    displayName?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    domainId?: true
    displayName?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs = {
    /**
     * Filter which Room to aggregate.
     * 
    **/
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     * 
    **/
    orderBy?: Enumerable<RoomOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs = {
    where?: RoomWhereInput
    orderBy?: Enumerable<RoomOrderByWithAggregationInput>
    by: Array<RoomScalarFieldEnum>
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }


  export type RoomGroupByOutputType = {
    id: bigint
    domainId: bigint
    displayName: string
    thumbnail: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = PrismaPromise<
    Array<
      PickArray<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect = {
    id?: boolean
    domainId?: boolean
    domain?: boolean | DomainArgs
    displayName?: boolean
    thumbnail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomInclude = {
    domain?: boolean | DomainArgs
  }

  export type RoomGetPayload<
    S extends boolean | null | undefined | RoomArgs,
    U = keyof S
      > = S extends true
        ? Room
    : S extends undefined
    ? never
    : S extends RoomArgs | RoomFindManyArgs
    ?'include' extends U
    ? Room  & {
    [P in TrueKeys<S['include']>]:
        P extends 'domain' ? DomainGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'domain' ? DomainGetPayload<S['select'][P]> :  P extends keyof Room ? Room[P] : never
  } 
    : Room
  : Room


  type RoomCountArgs = Merge<
    Omit<RoomFindManyArgs, 'select' | 'include'> & {
      select?: RoomCountAggregateInputType | true
    }
  >

  export interface RoomDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RoomFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RoomFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Room'> extends True ? CheckSelect<T, Prisma__RoomClient<Room>, Prisma__RoomClient<RoomGetPayload<T>>> : CheckSelect<T, Prisma__RoomClient<Room | null >, Prisma__RoomClient<RoomGetPayload<T> | null >>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RoomFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RoomFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Room'> extends True ? CheckSelect<T, Prisma__RoomClient<Room>, Prisma__RoomClient<RoomGetPayload<T>>> : CheckSelect<T, Prisma__RoomClient<Room | null >, Prisma__RoomClient<RoomGetPayload<T> | null >>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RoomFindManyArgs>(
      args?: SelectSubset<T, RoomFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Room>>, PrismaPromise<Array<RoomGetPayload<T>>>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
    **/
    create<T extends RoomCreateArgs>(
      args: SelectSubset<T, RoomCreateArgs>
    ): CheckSelect<T, Prisma__RoomClient<Room>, Prisma__RoomClient<RoomGetPayload<T>>>

    /**
     * Create many Rooms.
     *     @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     *     @example
     *     // Create many Rooms
     *     const room = await prisma.room.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RoomCreateManyArgs>(
      args?: SelectSubset<T, RoomCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
    **/
    delete<T extends RoomDeleteArgs>(
      args: SelectSubset<T, RoomDeleteArgs>
    ): CheckSelect<T, Prisma__RoomClient<Room>, Prisma__RoomClient<RoomGetPayload<T>>>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RoomUpdateArgs>(
      args: SelectSubset<T, RoomUpdateArgs>
    ): CheckSelect<T, Prisma__RoomClient<Room>, Prisma__RoomClient<RoomGetPayload<T>>>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RoomDeleteManyArgs>(
      args?: SelectSubset<T, RoomDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RoomUpdateManyArgs>(
      args: SelectSubset<T, RoomUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
    **/
    upsert<T extends RoomUpsertArgs>(
      args: SelectSubset<T, RoomUpsertArgs>
    ): CheckSelect<T, Prisma__RoomClient<Room>, Prisma__RoomClient<RoomGetPayload<T>>>

    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RoomClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    domain<T extends DomainArgs = {}>(args?: Subset<T, DomainArgs>): CheckSelect<T, Prisma__DomainClient<Domain | null >, Prisma__DomainClient<DomainGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Room
     * 
    **/
    select?: RoomSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RoomInclude | null
    /**
     * Throw an Error if a Room can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Room to fetch.
     * 
    **/
    where: RoomWhereUniqueInput
  }


  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Room
     * 
    **/
    select?: RoomSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RoomInclude | null
    /**
     * Throw an Error if a Room can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Room to fetch.
     * 
    **/
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     * 
    **/
    orderBy?: Enumerable<RoomOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     * 
    **/
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     * 
    **/
    distinct?: Enumerable<RoomScalarFieldEnum>
  }


  /**
   * Room findMany
   */
  export type RoomFindManyArgs = {
    /**
     * Select specific fields to fetch from the Room
     * 
    **/
    select?: RoomSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RoomInclude | null
    /**
     * Filter, which Rooms to fetch.
     * 
    **/
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     * 
    **/
    orderBy?: Enumerable<RoomOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     * 
    **/
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     * 
    **/
    skip?: number
    distinct?: Enumerable<RoomScalarFieldEnum>
  }


  /**
   * Room create
   */
  export type RoomCreateArgs = {
    /**
     * Select specific fields to fetch from the Room
     * 
    **/
    select?: RoomSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RoomInclude | null
    /**
     * The data needed to create a Room.
     * 
    **/
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }


  /**
   * Room createMany
   */
  export type RoomCreateManyArgs = {
    /**
     * The data used to create many Rooms.
     * 
    **/
    data: Enumerable<RoomCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Room update
   */
  export type RoomUpdateArgs = {
    /**
     * Select specific fields to fetch from the Room
     * 
    **/
    select?: RoomSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RoomInclude | null
    /**
     * The data needed to update a Room.
     * 
    **/
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     * 
    **/
    where: RoomWhereUniqueInput
  }


  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs = {
    /**
     * The data used to update Rooms.
     * 
    **/
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     * 
    **/
    where?: RoomWhereInput
  }


  /**
   * Room upsert
   */
  export type RoomUpsertArgs = {
    /**
     * Select specific fields to fetch from the Room
     * 
    **/
    select?: RoomSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RoomInclude | null
    /**
     * The filter to search for the Room to update in case it exists.
     * 
    **/
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     * 
    **/
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }


  /**
   * Room delete
   */
  export type RoomDeleteArgs = {
    /**
     * Select specific fields to fetch from the Room
     * 
    **/
    select?: RoomSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RoomInclude | null
    /**
     * Filter which Room to delete.
     * 
    **/
    where: RoomWhereUniqueInput
  }


  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs = {
    /**
     * Filter which Rooms to delete
     * 
    **/
    where?: RoomWhereInput
  }


  /**
   * Room without action
   */
  export type RoomArgs = {
    /**
     * Select specific fields to fetch from the Room
     * 
    **/
    select?: RoomSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: RoomInclude | null
  }



  /**
   * Model GroupChat
   */


  export type AggregateGroupChat = {
    _count: GroupChatCountAggregateOutputType | null
    _avg: GroupChatAvgAggregateOutputType | null
    _sum: GroupChatSumAggregateOutputType | null
    _min: GroupChatMinAggregateOutputType | null
    _max: GroupChatMaxAggregateOutputType | null
  }

  export type GroupChatAvgAggregateOutputType = {
    id: number | null
    userIds: number | null
  }

  export type GroupChatSumAggregateOutputType = {
    id: bigint | null
    userIds: bigint[] | null
  }

  export type GroupChatMinAggregateOutputType = {
    id: bigint | null
    displayName: string | null
    description: string | null
    thumbnail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupChatMaxAggregateOutputType = {
    id: bigint | null
    displayName: string | null
    description: string | null
    thumbnail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupChatCountAggregateOutputType = {
    id: number
    displayName: number
    description: number
    thumbnail: number
    createdAt: number
    updatedAt: number
    userIds: number
    _all: number
  }


  export type GroupChatAvgAggregateInputType = {
    id?: true
    userIds?: true
  }

  export type GroupChatSumAggregateInputType = {
    id?: true
    userIds?: true
  }

  export type GroupChatMinAggregateInputType = {
    id?: true
    displayName?: true
    description?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupChatMaxAggregateInputType = {
    id?: true
    displayName?: true
    description?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupChatCountAggregateInputType = {
    id?: true
    displayName?: true
    description?: true
    thumbnail?: true
    createdAt?: true
    updatedAt?: true
    userIds?: true
    _all?: true
  }

  export type GroupChatAggregateArgs = {
    /**
     * Filter which GroupChat to aggregate.
     * 
    **/
    where?: GroupChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupChats to fetch.
     * 
    **/
    orderBy?: Enumerable<GroupChatOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: GroupChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupChats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupChats.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupChats
    **/
    _count?: true | GroupChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupChatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupChatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupChatMaxAggregateInputType
  }

  export type GetGroupChatAggregateType<T extends GroupChatAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupChat[P]>
      : GetScalarType<T[P], AggregateGroupChat[P]>
  }




  export type GroupChatGroupByArgs = {
    where?: GroupChatWhereInput
    orderBy?: Enumerable<GroupChatOrderByWithAggregationInput>
    by: Array<GroupChatScalarFieldEnum>
    having?: GroupChatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupChatCountAggregateInputType | true
    _avg?: GroupChatAvgAggregateInputType
    _sum?: GroupChatSumAggregateInputType
    _min?: GroupChatMinAggregateInputType
    _max?: GroupChatMaxAggregateInputType
  }


  export type GroupChatGroupByOutputType = {
    id: bigint
    displayName: string
    description: string
    thumbnail: string | null
    createdAt: Date
    updatedAt: Date
    userIds: bigint[]
    _count: GroupChatCountAggregateOutputType | null
    _avg: GroupChatAvgAggregateOutputType | null
    _sum: GroupChatSumAggregateOutputType | null
    _min: GroupChatMinAggregateOutputType | null
    _max: GroupChatMaxAggregateOutputType | null
  }

  type GetGroupChatGroupByPayload<T extends GroupChatGroupByArgs> = PrismaPromise<
    Array<
      PickArray<GroupChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupChatGroupByOutputType[P]>
            : GetScalarType<T[P], GroupChatGroupByOutputType[P]>
        }
      >
    >


  export type GroupChatSelect = {
    id?: boolean
    displayName?: boolean
    description?: boolean
    thumbnail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | UserFindManyArgs
    userIds?: boolean
    _count?: boolean | GroupChatCountOutputTypeArgs
  }

  export type GroupChatInclude = {
    users?: boolean | UserFindManyArgs
    _count?: boolean | GroupChatCountOutputTypeArgs
  }

  export type GroupChatGetPayload<
    S extends boolean | null | undefined | GroupChatArgs,
    U = keyof S
      > = S extends true
        ? GroupChat
    : S extends undefined
    ? never
    : S extends GroupChatArgs | GroupChatFindManyArgs
    ?'include' extends U
    ? GroupChat  & {
    [P in TrueKeys<S['include']>]:
        P extends 'users' ? Array < UserGetPayload<S['include'][P]>>  :
        P extends '_count' ? GroupChatCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'users' ? Array < UserGetPayload<S['select'][P]>>  :
        P extends '_count' ? GroupChatCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof GroupChat ? GroupChat[P] : never
  } 
    : GroupChat
  : GroupChat


  type GroupChatCountArgs = Merge<
    Omit<GroupChatFindManyArgs, 'select' | 'include'> & {
      select?: GroupChatCountAggregateInputType | true
    }
  >

  export interface GroupChatDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one GroupChat that matches the filter.
     * @param {GroupChatFindUniqueArgs} args - Arguments to find a GroupChat
     * @example
     * // Get one GroupChat
     * const groupChat = await prisma.groupChat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GroupChatFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, GroupChatFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'GroupChat'> extends True ? CheckSelect<T, Prisma__GroupChatClient<GroupChat>, Prisma__GroupChatClient<GroupChatGetPayload<T>>> : CheckSelect<T, Prisma__GroupChatClient<GroupChat | null >, Prisma__GroupChatClient<GroupChatGetPayload<T> | null >>

    /**
     * Find the first GroupChat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupChatFindFirstArgs} args - Arguments to find a GroupChat
     * @example
     * // Get one GroupChat
     * const groupChat = await prisma.groupChat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GroupChatFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, GroupChatFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'GroupChat'> extends True ? CheckSelect<T, Prisma__GroupChatClient<GroupChat>, Prisma__GroupChatClient<GroupChatGetPayload<T>>> : CheckSelect<T, Prisma__GroupChatClient<GroupChat | null >, Prisma__GroupChatClient<GroupChatGetPayload<T> | null >>

    /**
     * Find zero or more GroupChats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupChatFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupChats
     * const groupChats = await prisma.groupChat.findMany()
     * 
     * // Get first 10 GroupChats
     * const groupChats = await prisma.groupChat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupChatWithIdOnly = await prisma.groupChat.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GroupChatFindManyArgs>(
      args?: SelectSubset<T, GroupChatFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<GroupChat>>, PrismaPromise<Array<GroupChatGetPayload<T>>>>

    /**
     * Create a GroupChat.
     * @param {GroupChatCreateArgs} args - Arguments to create a GroupChat.
     * @example
     * // Create one GroupChat
     * const GroupChat = await prisma.groupChat.create({
     *   data: {
     *     // ... data to create a GroupChat
     *   }
     * })
     * 
    **/
    create<T extends GroupChatCreateArgs>(
      args: SelectSubset<T, GroupChatCreateArgs>
    ): CheckSelect<T, Prisma__GroupChatClient<GroupChat>, Prisma__GroupChatClient<GroupChatGetPayload<T>>>

    /**
     * Create many GroupChats.
     *     @param {GroupChatCreateManyArgs} args - Arguments to create many GroupChats.
     *     @example
     *     // Create many GroupChats
     *     const groupChat = await prisma.groupChat.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GroupChatCreateManyArgs>(
      args?: SelectSubset<T, GroupChatCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a GroupChat.
     * @param {GroupChatDeleteArgs} args - Arguments to delete one GroupChat.
     * @example
     * // Delete one GroupChat
     * const GroupChat = await prisma.groupChat.delete({
     *   where: {
     *     // ... filter to delete one GroupChat
     *   }
     * })
     * 
    **/
    delete<T extends GroupChatDeleteArgs>(
      args: SelectSubset<T, GroupChatDeleteArgs>
    ): CheckSelect<T, Prisma__GroupChatClient<GroupChat>, Prisma__GroupChatClient<GroupChatGetPayload<T>>>

    /**
     * Update one GroupChat.
     * @param {GroupChatUpdateArgs} args - Arguments to update one GroupChat.
     * @example
     * // Update one GroupChat
     * const groupChat = await prisma.groupChat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GroupChatUpdateArgs>(
      args: SelectSubset<T, GroupChatUpdateArgs>
    ): CheckSelect<T, Prisma__GroupChatClient<GroupChat>, Prisma__GroupChatClient<GroupChatGetPayload<T>>>

    /**
     * Delete zero or more GroupChats.
     * @param {GroupChatDeleteManyArgs} args - Arguments to filter GroupChats to delete.
     * @example
     * // Delete a few GroupChats
     * const { count } = await prisma.groupChat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GroupChatDeleteManyArgs>(
      args?: SelectSubset<T, GroupChatDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupChats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupChatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupChats
     * const groupChat = await prisma.groupChat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GroupChatUpdateManyArgs>(
      args: SelectSubset<T, GroupChatUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one GroupChat.
     * @param {GroupChatUpsertArgs} args - Arguments to update or create a GroupChat.
     * @example
     * // Update or create a GroupChat
     * const groupChat = await prisma.groupChat.upsert({
     *   create: {
     *     // ... data to create a GroupChat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupChat we want to update
     *   }
     * })
    **/
    upsert<T extends GroupChatUpsertArgs>(
      args: SelectSubset<T, GroupChatUpsertArgs>
    ): CheckSelect<T, Prisma__GroupChatClient<GroupChat>, Prisma__GroupChatClient<GroupChatGetPayload<T>>>

    /**
     * Count the number of GroupChats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupChatCountArgs} args - Arguments to filter GroupChats to count.
     * @example
     * // Count the number of GroupChats
     * const count = await prisma.groupChat.count({
     *   where: {
     *     // ... the filter for the GroupChats we want to count
     *   }
     * })
    **/
    count<T extends GroupChatCountArgs>(
      args?: Subset<T, GroupChatCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupChat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupChatAggregateArgs>(args: Subset<T, GroupChatAggregateArgs>): PrismaPromise<GetGroupChatAggregateType<T>>

    /**
     * Group by GroupChat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupChatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupChatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupChatGroupByArgs['orderBy'] }
        : { orderBy?: GroupChatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupChatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupChatGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupChat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GroupChatClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    users<T extends UserFindManyArgs = {}>(args?: Subset<T, UserFindManyArgs>): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * GroupChat findUnique
   */
  export type GroupChatFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the GroupChat
     * 
    **/
    select?: GroupChatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupChatInclude | null
    /**
     * Throw an Error if a GroupChat can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which GroupChat to fetch.
     * 
    **/
    where: GroupChatWhereUniqueInput
  }


  /**
   * GroupChat findFirst
   */
  export type GroupChatFindFirstArgs = {
    /**
     * Select specific fields to fetch from the GroupChat
     * 
    **/
    select?: GroupChatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupChatInclude | null
    /**
     * Throw an Error if a GroupChat can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which GroupChat to fetch.
     * 
    **/
    where?: GroupChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupChats to fetch.
     * 
    **/
    orderBy?: Enumerable<GroupChatOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupChats.
     * 
    **/
    cursor?: GroupChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupChats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupChats.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupChats.
     * 
    **/
    distinct?: Enumerable<GroupChatScalarFieldEnum>
  }


  /**
   * GroupChat findMany
   */
  export type GroupChatFindManyArgs = {
    /**
     * Select specific fields to fetch from the GroupChat
     * 
    **/
    select?: GroupChatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupChatInclude | null
    /**
     * Filter, which GroupChats to fetch.
     * 
    **/
    where?: GroupChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupChats to fetch.
     * 
    **/
    orderBy?: Enumerable<GroupChatOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupChats.
     * 
    **/
    cursor?: GroupChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupChats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupChats.
     * 
    **/
    skip?: number
    distinct?: Enumerable<GroupChatScalarFieldEnum>
  }


  /**
   * GroupChat create
   */
  export type GroupChatCreateArgs = {
    /**
     * Select specific fields to fetch from the GroupChat
     * 
    **/
    select?: GroupChatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupChatInclude | null
    /**
     * The data needed to create a GroupChat.
     * 
    **/
    data: XOR<GroupChatCreateInput, GroupChatUncheckedCreateInput>
  }


  /**
   * GroupChat createMany
   */
  export type GroupChatCreateManyArgs = {
    /**
     * The data used to create many GroupChats.
     * 
    **/
    data: Enumerable<GroupChatCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * GroupChat update
   */
  export type GroupChatUpdateArgs = {
    /**
     * Select specific fields to fetch from the GroupChat
     * 
    **/
    select?: GroupChatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupChatInclude | null
    /**
     * The data needed to update a GroupChat.
     * 
    **/
    data: XOR<GroupChatUpdateInput, GroupChatUncheckedUpdateInput>
    /**
     * Choose, which GroupChat to update.
     * 
    **/
    where: GroupChatWhereUniqueInput
  }


  /**
   * GroupChat updateMany
   */
  export type GroupChatUpdateManyArgs = {
    /**
     * The data used to update GroupChats.
     * 
    **/
    data: XOR<GroupChatUpdateManyMutationInput, GroupChatUncheckedUpdateManyInput>
    /**
     * Filter which GroupChats to update
     * 
    **/
    where?: GroupChatWhereInput
  }


  /**
   * GroupChat upsert
   */
  export type GroupChatUpsertArgs = {
    /**
     * Select specific fields to fetch from the GroupChat
     * 
    **/
    select?: GroupChatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupChatInclude | null
    /**
     * The filter to search for the GroupChat to update in case it exists.
     * 
    **/
    where: GroupChatWhereUniqueInput
    /**
     * In case the GroupChat found by the `where` argument doesn't exist, create a new GroupChat with this data.
     * 
    **/
    create: XOR<GroupChatCreateInput, GroupChatUncheckedCreateInput>
    /**
     * In case the GroupChat was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<GroupChatUpdateInput, GroupChatUncheckedUpdateInput>
  }


  /**
   * GroupChat delete
   */
  export type GroupChatDeleteArgs = {
    /**
     * Select specific fields to fetch from the GroupChat
     * 
    **/
    select?: GroupChatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupChatInclude | null
    /**
     * Filter which GroupChat to delete.
     * 
    **/
    where: GroupChatWhereUniqueInput
  }


  /**
   * GroupChat deleteMany
   */
  export type GroupChatDeleteManyArgs = {
    /**
     * Filter which GroupChats to delete
     * 
    **/
    where?: GroupChatWhereInput
  }


  /**
   * GroupChat without action
   */
  export type GroupChatArgs = {
    /**
     * Select specific fields to fetch from the GroupChat
     * 
    **/
    select?: GroupChatSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: GroupChatInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserScalarFieldEnum: {
    id: 'id',
    displayName: 'displayName',
    avatar: 'avatar',
    createdAt: 'createdAt',
    lastSeen: 'lastSeen',
    authInfo: 'authInfo',
    authProvider: 'authProvider',
    disabled: 'disabled',
    serverIds: 'serverIds',
    friends: 'friends',
    groupChatIds: 'groupChatIds',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ServerScalarFieldEnum: {
    id: 'id',
    displayName: 'displayName',
    description: 'description',
    start: 'start',
    thumbnail: 'thumbnail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ownerId: 'ownerId',
    userIds: 'userIds',
    domainIds: 'domainIds'
  };

  export type ServerScalarFieldEnum = (typeof ServerScalarFieldEnum)[keyof typeof ServerScalarFieldEnum]


  export const DomainScalarFieldEnum: {
    id: 'id',
    serverId: 'serverId',
    description: 'description',
    displayName: 'displayName',
    start: 'start',
    thumbnail: 'thumbnail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    roomIds: 'roomIds'
  };

  export type DomainScalarFieldEnum = (typeof DomainScalarFieldEnum)[keyof typeof DomainScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    domainId: 'domainId',
    displayName: 'displayName',
    thumbnail: 'thumbnail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const GroupChatScalarFieldEnum: {
    id: 'id',
    displayName: 'displayName',
    description: 'description',
    thumbnail: 'thumbnail',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userIds: 'userIds'
  };

  export type GroupChatScalarFieldEnum = (typeof GroupChatScalarFieldEnum)[keyof typeof GroupChatScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: 'JsonNull'
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull',
    AnyNull: 'AnyNull'
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: BigIntFilter | bigint | number
    displayName?: StringFilter | string
    avatar?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    lastSeen?: StringFilter | string
    authInfo?: JsonFilter
    authProvider?: EnumProviderFilter | Provider
    disabled?: BoolFilter | boolean
    servers?: ServerListRelationFilter
    serverIds?: BigIntNullableListFilter
    friends?: BigIntNullableListFilter
    groupChatIds?: BigIntNullableListFilter
    groupChats?: GroupChatListRelationFilter
    updatedAt?: DateTimeFilter | Date | string
    ownedServers?: ServerListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    lastSeen?: SortOrder
    authInfo?: SortOrder
    authProvider?: SortOrder
    disabled?: SortOrder
    servers?: ServerOrderByRelationAggregateInput
    serverIds?: SortOrder
    friends?: SortOrder
    groupChatIds?: SortOrder
    groupChats?: GroupChatOrderByRelationAggregateInput
    updatedAt?: SortOrder
    ownedServers?: ServerOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: bigint | number
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    lastSeen?: SortOrder
    authInfo?: SortOrder
    authProvider?: SortOrder
    disabled?: SortOrder
    serverIds?: SortOrder
    friends?: SortOrder
    groupChatIds?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    displayName?: StringWithAggregatesFilter | string
    avatar?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    lastSeen?: StringWithAggregatesFilter | string
    authInfo?: JsonWithAggregatesFilter
    authProvider?: EnumProviderWithAggregatesFilter | Provider
    disabled?: BoolWithAggregatesFilter | boolean
    serverIds?: BigIntNullableListFilter
    friends?: BigIntNullableListFilter
    groupChatIds?: BigIntNullableListFilter
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ServerWhereInput = {
    AND?: Enumerable<ServerWhereInput>
    OR?: Enumerable<ServerWhereInput>
    NOT?: Enumerable<ServerWhereInput>
    id?: BigIntFilter | bigint | number
    displayName?: StringFilter | string
    description?: StringNullableFilter | string | null
    start?: StringFilter | string
    thumbnail?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    owner?: XOR<UserRelationFilter, UserWhereInput>
    ownerId?: BigIntFilter | bigint | number
    users?: UserListRelationFilter
    userIds?: BigIntNullableListFilter
    domainIds?: BigIntNullableListFilter
    domains?: DomainListRelationFilter
  }

  export type ServerOrderByWithRelationInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    ownerId?: SortOrder
    users?: UserOrderByRelationAggregateInput
    userIds?: SortOrder
    domainIds?: SortOrder
    domains?: DomainOrderByRelationAggregateInput
  }

  export type ServerWhereUniqueInput = {
    id?: bigint | number
  }

  export type ServerOrderByWithAggregationInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    userIds?: SortOrder
    domainIds?: SortOrder
    _count?: ServerCountOrderByAggregateInput
    _avg?: ServerAvgOrderByAggregateInput
    _max?: ServerMaxOrderByAggregateInput
    _min?: ServerMinOrderByAggregateInput
    _sum?: ServerSumOrderByAggregateInput
  }

  export type ServerScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ServerScalarWhereWithAggregatesInput>
    OR?: Enumerable<ServerScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ServerScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    displayName?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    start?: StringWithAggregatesFilter | string
    thumbnail?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    ownerId?: BigIntWithAggregatesFilter | bigint | number
    userIds?: BigIntNullableListFilter
    domainIds?: BigIntNullableListFilter
  }

  export type DomainWhereInput = {
    AND?: Enumerable<DomainWhereInput>
    OR?: Enumerable<DomainWhereInput>
    NOT?: Enumerable<DomainWhereInput>
    id?: BigIntFilter | bigint | number
    serverId?: BigIntFilter | bigint | number
    description?: StringNullableFilter | string | null
    server?: XOR<ServerRelationFilter, ServerWhereInput>
    displayName?: StringFilter | string
    start?: StringFilter | string
    thumbnail?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    roomIds?: BigIntNullableListFilter
    rooms?: RoomListRelationFilter
  }

  export type DomainOrderByWithRelationInput = {
    id?: SortOrder
    serverId?: SortOrder
    description?: SortOrder
    server?: ServerOrderByWithRelationInput
    displayName?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roomIds?: SortOrder
    rooms?: RoomOrderByRelationAggregateInput
  }

  export type DomainWhereUniqueInput = {
    id?: bigint | number
  }

  export type DomainOrderByWithAggregationInput = {
    id?: SortOrder
    serverId?: SortOrder
    description?: SortOrder
    displayName?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roomIds?: SortOrder
    _count?: DomainCountOrderByAggregateInput
    _avg?: DomainAvgOrderByAggregateInput
    _max?: DomainMaxOrderByAggregateInput
    _min?: DomainMinOrderByAggregateInput
    _sum?: DomainSumOrderByAggregateInput
  }

  export type DomainScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DomainScalarWhereWithAggregatesInput>
    OR?: Enumerable<DomainScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DomainScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    serverId?: BigIntWithAggregatesFilter | bigint | number
    description?: StringNullableWithAggregatesFilter | string | null
    displayName?: StringWithAggregatesFilter | string
    start?: StringWithAggregatesFilter | string
    thumbnail?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    roomIds?: BigIntNullableListFilter
  }

  export type RoomWhereInput = {
    AND?: Enumerable<RoomWhereInput>
    OR?: Enumerable<RoomWhereInput>
    NOT?: Enumerable<RoomWhereInput>
    id?: BigIntFilter | bigint | number
    domainId?: BigIntFilter | bigint | number
    domain?: XOR<DomainRelationFilter, DomainWhereInput>
    displayName?: StringFilter | string
    thumbnail?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    domainId?: SortOrder
    domain?: DomainOrderByWithRelationInput
    displayName?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomWhereUniqueInput = {
    id?: bigint | number
  }

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    domainId?: SortOrder
    displayName?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: Enumerable<RoomScalarWhereWithAggregatesInput>
    OR?: Enumerable<RoomScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RoomScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    domainId?: BigIntWithAggregatesFilter | bigint | number
    displayName?: StringWithAggregatesFilter | string
    thumbnail?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type GroupChatWhereInput = {
    AND?: Enumerable<GroupChatWhereInput>
    OR?: Enumerable<GroupChatWhereInput>
    NOT?: Enumerable<GroupChatWhereInput>
    id?: BigIntFilter | bigint | number
    displayName?: StringFilter | string
    description?: StringFilter | string
    thumbnail?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    users?: UserListRelationFilter
    userIds?: BigIntNullableListFilter
  }

  export type GroupChatOrderByWithRelationInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    userIds?: SortOrder
  }

  export type GroupChatWhereUniqueInput = {
    id?: bigint | number
  }

  export type GroupChatOrderByWithAggregationInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userIds?: SortOrder
    _count?: GroupChatCountOrderByAggregateInput
    _avg?: GroupChatAvgOrderByAggregateInput
    _max?: GroupChatMaxOrderByAggregateInput
    _min?: GroupChatMinOrderByAggregateInput
    _sum?: GroupChatSumOrderByAggregateInput
  }

  export type GroupChatScalarWhereWithAggregatesInput = {
    AND?: Enumerable<GroupChatScalarWhereWithAggregatesInput>
    OR?: Enumerable<GroupChatScalarWhereWithAggregatesInput>
    NOT?: Enumerable<GroupChatScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    displayName?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    thumbnail?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userIds?: BigIntNullableListFilter
  }

  export type UserCreateInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    servers?: ServerCreateNestedManyWithoutUsersInput
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatCreateNestedManyWithoutUsersInput
    updatedAt?: Date | string
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    servers?: ServerUncheckedCreateNestedManyWithoutUsersInput
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUncheckedCreateNestedManyWithoutUsersInput
    updatedAt?: Date | string
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    servers?: ServerUpdateManyWithoutUsersInput
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUpdateManyWithoutUsersInput
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedServers?: ServerUpdateManyWithoutOwnerInput
  }

  export type UserUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    servers?: ServerUncheckedUpdateManyWithoutUsersInput
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUncheckedUpdateManyWithoutUsersInput
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerInput
  }

  export type UserCreateManyInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServerCreateInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedServersInput
    users?: UserCreateNestedManyWithoutServersInput
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: bigint | number
    users?: UserUncheckedCreateNestedManyWithoutServersInput
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedServersInput
    users?: UserUpdateManyWithoutServersInput
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUpdateManyWithoutServerInput
  }

  export type ServerUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: BigIntFieldUpdateOperationsInput | bigint | number
    users?: UserUncheckedUpdateManyWithoutServersInput
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUncheckedUpdateManyWithoutServerInput
  }

  export type ServerCreateManyInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: bigint | number
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type ServerUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type ServerUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: BigIntFieldUpdateOperationsInput | bigint | number
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type DomainCreateInput = {
    id: bigint | number
    description?: string | null
    server: ServerCreateNestedOneWithoutDomainsInput
    displayName: string
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomIds?: DomainCreateroomIdsInput | Enumerable<bigint> | Enumerable<number>
    rooms?: RoomCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateInput = {
    id: bigint | number
    serverId: bigint | number
    description?: string | null
    displayName: string
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomIds?: DomainCreateroomIdsInput | Enumerable<bigint> | Enumerable<number>
    rooms?: RoomUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    server?: ServerUpdateOneRequiredWithoutDomainsInput
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
    rooms?: RoomUpdateManyWithoutDomainInput
  }

  export type DomainUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serverId?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
    rooms?: RoomUncheckedUpdateManyWithoutDomainInput
  }

  export type DomainCreateManyInput = {
    id: bigint | number
    serverId: bigint | number
    description?: string | null
    displayName: string
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomIds?: DomainCreateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type DomainUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type DomainUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serverId?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type RoomCreateInput = {
    id: bigint | number
    domain: DomainCreateNestedOneWithoutRoomsInput
    displayName: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUncheckedCreateInput = {
    id: bigint | number
    domainId: bigint | number
    displayName: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    domain?: DomainUpdateOneRequiredWithoutRoomsInput
    displayName?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    domainId?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateManyInput = {
    id: bigint | number
    domainId: bigint | number
    displayName: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    domainId?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupChatCreateInput = {
    id: bigint | number
    displayName: string
    description: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutGroupChatsInput
    userIds?: GroupChatCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUncheckedCreateInput = {
    id: bigint | number
    displayName: string
    description: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutGroupChatsInput
    userIds?: GroupChatCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutGroupChatsInput
    userIds?: GroupChatUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutGroupChatsInput
    userIds?: GroupChatUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatCreateManyInput = {
    id: bigint | number
    displayName: string
    description: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userIds?: GroupChatCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userIds?: GroupChatUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userIds?: GroupChatUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type EnumProviderFilter = {
    equals?: Provider
    in?: Enumerable<Provider>
    notIn?: Enumerable<Provider>
    not?: NestedEnumProviderFilter | Provider
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type ServerListRelationFilter = {
    every?: ServerWhereInput
    some?: ServerWhereInput
    none?: ServerWhereInput
  }

  export type BigIntNullableListFilter = {
    equals?: Enumerable<bigint> | Enumerable<number> | null
    has?: bigint | number | null
    hasEvery?: Enumerable<bigint> | Enumerable<number>
    hasSome?: Enumerable<bigint> | Enumerable<number>
    isEmpty?: boolean
  }

  export type GroupChatListRelationFilter = {
    every?: GroupChatWhereInput
    some?: GroupChatWhereInput
    none?: GroupChatWhereInput
  }

  export type ServerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupChatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    lastSeen?: SortOrder
    authInfo?: SortOrder
    authProvider?: SortOrder
    disabled?: SortOrder
    serverIds?: SortOrder
    friends?: SortOrder
    groupChatIds?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    serverIds?: SortOrder
    friends?: SortOrder
    groupChatIds?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    lastSeen?: SortOrder
    authProvider?: SortOrder
    disabled?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    lastSeen?: SortOrder
    authProvider?: SortOrder
    disabled?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    serverIds?: SortOrder
    friends?: SortOrder
    groupChatIds?: SortOrder
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }

  export type EnumProviderWithAggregatesFilter = {
    equals?: Provider
    in?: Enumerable<Provider>
    notIn?: Enumerable<Provider>
    not?: NestedEnumProviderWithAggregatesFilter | Provider
    _count?: NestedIntFilter
    _min?: NestedEnumProviderFilter
    _max?: NestedEnumProviderFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type DomainListRelationFilter = {
    every?: DomainWhereInput
    some?: DomainWhereInput
    none?: DomainWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServerCountOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
    userIds?: SortOrder
    domainIds?: SortOrder
  }

  export type ServerAvgOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    userIds?: SortOrder
    domainIds?: SortOrder
  }

  export type ServerMaxOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type ServerMinOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ownerId?: SortOrder
  }

  export type ServerSumOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    userIds?: SortOrder
    domainIds?: SortOrder
  }

  export type ServerRelationFilter = {
    is?: ServerWhereInput
    isNot?: ServerWhereInput
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainCountOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    description?: SortOrder
    displayName?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roomIds?: SortOrder
  }

  export type DomainAvgOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    roomIds?: SortOrder
  }

  export type DomainMaxOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    description?: SortOrder
    displayName?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainMinOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    description?: SortOrder
    displayName?: SortOrder
    start?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DomainSumOrderByAggregateInput = {
    id?: SortOrder
    serverId?: SortOrder
    roomIds?: SortOrder
  }

  export type DomainRelationFilter = {
    is?: DomainWhereInput
    isNot?: DomainWhereInput
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    displayName?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    displayName?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
    displayName?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    id?: SortOrder
    domainId?: SortOrder
  }

  export type GroupChatCountOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userIds?: SortOrder
  }

  export type GroupChatAvgOrderByAggregateInput = {
    id?: SortOrder
    userIds?: SortOrder
  }

  export type GroupChatMaxOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupChatMinOrderByAggregateInput = {
    id?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupChatSumOrderByAggregateInput = {
    id?: SortOrder
    userIds?: SortOrder
  }

  export type ServerCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<ServerCreateWithoutUsersInput>, Enumerable<ServerUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<ServerCreateOrConnectWithoutUsersInput>
    connect?: Enumerable<ServerWhereUniqueInput>
  }

  export type UserCreateserverIdsInput = {
    set: Enumerable<bigint> | Enumerable<number>
  }

  export type UserCreatefriendsInput = {
    set: Enumerable<bigint> | Enumerable<number>
  }

  export type UserCreategroupChatIdsInput = {
    set: Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<GroupChatCreateWithoutUsersInput>, Enumerable<GroupChatUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<GroupChatCreateOrConnectWithoutUsersInput>
    connect?: Enumerable<GroupChatWhereUniqueInput>
  }

  export type ServerCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ServerCreateWithoutOwnerInput>, Enumerable<ServerUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ServerCreateOrConnectWithoutOwnerInput>
    createMany?: ServerCreateManyOwnerInputEnvelope
    connect?: Enumerable<ServerWhereUniqueInput>
  }

  export type ServerUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<ServerCreateWithoutUsersInput>, Enumerable<ServerUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<ServerCreateOrConnectWithoutUsersInput>
    connect?: Enumerable<ServerWhereUniqueInput>
  }

  export type GroupChatUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<Enumerable<GroupChatCreateWithoutUsersInput>, Enumerable<GroupChatUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<GroupChatCreateOrConnectWithoutUsersInput>
    connect?: Enumerable<GroupChatWhereUniqueInput>
  }

  export type ServerUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ServerCreateWithoutOwnerInput>, Enumerable<ServerUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ServerCreateOrConnectWithoutOwnerInput>
    createMany?: ServerCreateManyOwnerInputEnvelope
    connect?: Enumerable<ServerWhereUniqueInput>
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: Provider
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ServerUpdateManyWithoutUsersInput = {
    create?: XOR<Enumerable<ServerCreateWithoutUsersInput>, Enumerable<ServerUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<ServerCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<ServerUpsertWithWhereUniqueWithoutUsersInput>
    set?: Enumerable<ServerWhereUniqueInput>
    disconnect?: Enumerable<ServerWhereUniqueInput>
    delete?: Enumerable<ServerWhereUniqueInput>
    connect?: Enumerable<ServerWhereUniqueInput>
    update?: Enumerable<ServerUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<ServerUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<ServerScalarWhereInput>
  }

  export type UserUpdateserverIdsInput = {
    set?: Enumerable<bigint> | Enumerable<number>
    push?: bigint | number | Enumerable<bigint> | Enumerable<number>
  }

  export type UserUpdatefriendsInput = {
    set?: Enumerable<bigint> | Enumerable<number>
    push?: bigint | number | Enumerable<bigint> | Enumerable<number>
  }

  export type UserUpdategroupChatIdsInput = {
    set?: Enumerable<bigint> | Enumerable<number>
    push?: bigint | number | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUpdateManyWithoutUsersInput = {
    create?: XOR<Enumerable<GroupChatCreateWithoutUsersInput>, Enumerable<GroupChatUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<GroupChatCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<GroupChatUpsertWithWhereUniqueWithoutUsersInput>
    set?: Enumerable<GroupChatWhereUniqueInput>
    disconnect?: Enumerable<GroupChatWhereUniqueInput>
    delete?: Enumerable<GroupChatWhereUniqueInput>
    connect?: Enumerable<GroupChatWhereUniqueInput>
    update?: Enumerable<GroupChatUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<GroupChatUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<GroupChatScalarWhereInput>
  }

  export type ServerUpdateManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ServerCreateWithoutOwnerInput>, Enumerable<ServerUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ServerCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ServerUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ServerCreateManyOwnerInputEnvelope
    set?: Enumerable<ServerWhereUniqueInput>
    disconnect?: Enumerable<ServerWhereUniqueInput>
    delete?: Enumerable<ServerWhereUniqueInput>
    connect?: Enumerable<ServerWhereUniqueInput>
    update?: Enumerable<ServerUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ServerUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ServerScalarWhereInput>
  }

  export type ServerUncheckedUpdateManyWithoutUsersInput = {
    create?: XOR<Enumerable<ServerCreateWithoutUsersInput>, Enumerable<ServerUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<ServerCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<ServerUpsertWithWhereUniqueWithoutUsersInput>
    set?: Enumerable<ServerWhereUniqueInput>
    disconnect?: Enumerable<ServerWhereUniqueInput>
    delete?: Enumerable<ServerWhereUniqueInput>
    connect?: Enumerable<ServerWhereUniqueInput>
    update?: Enumerable<ServerUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<ServerUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<ServerScalarWhereInput>
  }

  export type GroupChatUncheckedUpdateManyWithoutUsersInput = {
    create?: XOR<Enumerable<GroupChatCreateWithoutUsersInput>, Enumerable<GroupChatUncheckedCreateWithoutUsersInput>>
    connectOrCreate?: Enumerable<GroupChatCreateOrConnectWithoutUsersInput>
    upsert?: Enumerable<GroupChatUpsertWithWhereUniqueWithoutUsersInput>
    set?: Enumerable<GroupChatWhereUniqueInput>
    disconnect?: Enumerable<GroupChatWhereUniqueInput>
    delete?: Enumerable<GroupChatWhereUniqueInput>
    connect?: Enumerable<GroupChatWhereUniqueInput>
    update?: Enumerable<GroupChatUpdateWithWhereUniqueWithoutUsersInput>
    updateMany?: Enumerable<GroupChatUpdateManyWithWhereWithoutUsersInput>
    deleteMany?: Enumerable<GroupChatScalarWhereInput>
  }

  export type ServerUncheckedUpdateManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ServerCreateWithoutOwnerInput>, Enumerable<ServerUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ServerCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ServerUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ServerCreateManyOwnerInputEnvelope
    set?: Enumerable<ServerWhereUniqueInput>
    disconnect?: Enumerable<ServerWhereUniqueInput>
    delete?: Enumerable<ServerWhereUniqueInput>
    connect?: Enumerable<ServerWhereUniqueInput>
    update?: Enumerable<ServerUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ServerUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ServerScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutOwnedServersInput = {
    create?: XOR<UserCreateWithoutOwnedServersInput, UserUncheckedCreateWithoutOwnedServersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedServersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutServersInput = {
    create?: XOR<Enumerable<UserCreateWithoutServersInput>, Enumerable<UserUncheckedCreateWithoutServersInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutServersInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type ServerCreateuserIdsInput = {
    set: Enumerable<bigint> | Enumerable<number>
  }

  export type ServerCreatedomainIdsInput = {
    set: Enumerable<bigint> | Enumerable<number>
  }

  export type DomainCreateNestedManyWithoutServerInput = {
    create?: XOR<Enumerable<DomainCreateWithoutServerInput>, Enumerable<DomainUncheckedCreateWithoutServerInput>>
    connectOrCreate?: Enumerable<DomainCreateOrConnectWithoutServerInput>
    createMany?: DomainCreateManyServerInputEnvelope
    connect?: Enumerable<DomainWhereUniqueInput>
  }

  export type UserUncheckedCreateNestedManyWithoutServersInput = {
    create?: XOR<Enumerable<UserCreateWithoutServersInput>, Enumerable<UserUncheckedCreateWithoutServersInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutServersInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type DomainUncheckedCreateNestedManyWithoutServerInput = {
    create?: XOR<Enumerable<DomainCreateWithoutServerInput>, Enumerable<DomainUncheckedCreateWithoutServerInput>>
    connectOrCreate?: Enumerable<DomainCreateOrConnectWithoutServerInput>
    createMany?: DomainCreateManyServerInputEnvelope
    connect?: Enumerable<DomainWhereUniqueInput>
  }

  export type UserUpdateOneRequiredWithoutOwnedServersInput = {
    create?: XOR<UserCreateWithoutOwnedServersInput, UserUncheckedCreateWithoutOwnedServersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedServersInput
    upsert?: UserUpsertWithoutOwnedServersInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutOwnedServersInput, UserUncheckedUpdateWithoutOwnedServersInput>
  }

  export type UserUpdateManyWithoutServersInput = {
    create?: XOR<Enumerable<UserCreateWithoutServersInput>, Enumerable<UserUncheckedCreateWithoutServersInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutServersInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutServersInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutServersInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutServersInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type ServerUpdateuserIdsInput = {
    set?: Enumerable<bigint> | Enumerable<number>
    push?: bigint | number | Enumerable<bigint> | Enumerable<number>
  }

  export type ServerUpdatedomainIdsInput = {
    set?: Enumerable<bigint> | Enumerable<number>
    push?: bigint | number | Enumerable<bigint> | Enumerable<number>
  }

  export type DomainUpdateManyWithoutServerInput = {
    create?: XOR<Enumerable<DomainCreateWithoutServerInput>, Enumerable<DomainUncheckedCreateWithoutServerInput>>
    connectOrCreate?: Enumerable<DomainCreateOrConnectWithoutServerInput>
    upsert?: Enumerable<DomainUpsertWithWhereUniqueWithoutServerInput>
    createMany?: DomainCreateManyServerInputEnvelope
    set?: Enumerable<DomainWhereUniqueInput>
    disconnect?: Enumerable<DomainWhereUniqueInput>
    delete?: Enumerable<DomainWhereUniqueInput>
    connect?: Enumerable<DomainWhereUniqueInput>
    update?: Enumerable<DomainUpdateWithWhereUniqueWithoutServerInput>
    updateMany?: Enumerable<DomainUpdateManyWithWhereWithoutServerInput>
    deleteMany?: Enumerable<DomainScalarWhereInput>
  }

  export type UserUncheckedUpdateManyWithoutServersInput = {
    create?: XOR<Enumerable<UserCreateWithoutServersInput>, Enumerable<UserUncheckedCreateWithoutServersInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutServersInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutServersInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutServersInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutServersInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type DomainUncheckedUpdateManyWithoutServerInput = {
    create?: XOR<Enumerable<DomainCreateWithoutServerInput>, Enumerable<DomainUncheckedCreateWithoutServerInput>>
    connectOrCreate?: Enumerable<DomainCreateOrConnectWithoutServerInput>
    upsert?: Enumerable<DomainUpsertWithWhereUniqueWithoutServerInput>
    createMany?: DomainCreateManyServerInputEnvelope
    set?: Enumerable<DomainWhereUniqueInput>
    disconnect?: Enumerable<DomainWhereUniqueInput>
    delete?: Enumerable<DomainWhereUniqueInput>
    connect?: Enumerable<DomainWhereUniqueInput>
    update?: Enumerable<DomainUpdateWithWhereUniqueWithoutServerInput>
    updateMany?: Enumerable<DomainUpdateManyWithWhereWithoutServerInput>
    deleteMany?: Enumerable<DomainScalarWhereInput>
  }

  export type ServerCreateNestedOneWithoutDomainsInput = {
    create?: XOR<ServerCreateWithoutDomainsInput, ServerUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: ServerCreateOrConnectWithoutDomainsInput
    connect?: ServerWhereUniqueInput
  }

  export type DomainCreateroomIdsInput = {
    set: Enumerable<bigint> | Enumerable<number>
  }

  export type RoomCreateNestedManyWithoutDomainInput = {
    create?: XOR<Enumerable<RoomCreateWithoutDomainInput>, Enumerable<RoomUncheckedCreateWithoutDomainInput>>
    connectOrCreate?: Enumerable<RoomCreateOrConnectWithoutDomainInput>
    createMany?: RoomCreateManyDomainInputEnvelope
    connect?: Enumerable<RoomWhereUniqueInput>
  }

  export type RoomUncheckedCreateNestedManyWithoutDomainInput = {
    create?: XOR<Enumerable<RoomCreateWithoutDomainInput>, Enumerable<RoomUncheckedCreateWithoutDomainInput>>
    connectOrCreate?: Enumerable<RoomCreateOrConnectWithoutDomainInput>
    createMany?: RoomCreateManyDomainInputEnvelope
    connect?: Enumerable<RoomWhereUniqueInput>
  }

  export type ServerUpdateOneRequiredWithoutDomainsInput = {
    create?: XOR<ServerCreateWithoutDomainsInput, ServerUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: ServerCreateOrConnectWithoutDomainsInput
    upsert?: ServerUpsertWithoutDomainsInput
    connect?: ServerWhereUniqueInput
    update?: XOR<ServerUpdateWithoutDomainsInput, ServerUncheckedUpdateWithoutDomainsInput>
  }

  export type DomainUpdateroomIdsInput = {
    set?: Enumerable<bigint> | Enumerable<number>
    push?: bigint | number | Enumerable<bigint> | Enumerable<number>
  }

  export type RoomUpdateManyWithoutDomainInput = {
    create?: XOR<Enumerable<RoomCreateWithoutDomainInput>, Enumerable<RoomUncheckedCreateWithoutDomainInput>>
    connectOrCreate?: Enumerable<RoomCreateOrConnectWithoutDomainInput>
    upsert?: Enumerable<RoomUpsertWithWhereUniqueWithoutDomainInput>
    createMany?: RoomCreateManyDomainInputEnvelope
    set?: Enumerable<RoomWhereUniqueInput>
    disconnect?: Enumerable<RoomWhereUniqueInput>
    delete?: Enumerable<RoomWhereUniqueInput>
    connect?: Enumerable<RoomWhereUniqueInput>
    update?: Enumerable<RoomUpdateWithWhereUniqueWithoutDomainInput>
    updateMany?: Enumerable<RoomUpdateManyWithWhereWithoutDomainInput>
    deleteMany?: Enumerable<RoomScalarWhereInput>
  }

  export type RoomUncheckedUpdateManyWithoutDomainInput = {
    create?: XOR<Enumerable<RoomCreateWithoutDomainInput>, Enumerable<RoomUncheckedCreateWithoutDomainInput>>
    connectOrCreate?: Enumerable<RoomCreateOrConnectWithoutDomainInput>
    upsert?: Enumerable<RoomUpsertWithWhereUniqueWithoutDomainInput>
    createMany?: RoomCreateManyDomainInputEnvelope
    set?: Enumerable<RoomWhereUniqueInput>
    disconnect?: Enumerable<RoomWhereUniqueInput>
    delete?: Enumerable<RoomWhereUniqueInput>
    connect?: Enumerable<RoomWhereUniqueInput>
    update?: Enumerable<RoomUpdateWithWhereUniqueWithoutDomainInput>
    updateMany?: Enumerable<RoomUpdateManyWithWhereWithoutDomainInput>
    deleteMany?: Enumerable<RoomScalarWhereInput>
  }

  export type DomainCreateNestedOneWithoutRoomsInput = {
    create?: XOR<DomainCreateWithoutRoomsInput, DomainUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutRoomsInput
    connect?: DomainWhereUniqueInput
  }

  export type DomainUpdateOneRequiredWithoutRoomsInput = {
    create?: XOR<DomainCreateWithoutRoomsInput, DomainUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: DomainCreateOrConnectWithoutRoomsInput
    upsert?: DomainUpsertWithoutRoomsInput
    connect?: DomainWhereUniqueInput
    update?: XOR<DomainUpdateWithoutRoomsInput, DomainUncheckedUpdateWithoutRoomsInput>
  }

  export type UserCreateNestedManyWithoutGroupChatsInput = {
    create?: XOR<Enumerable<UserCreateWithoutGroupChatsInput>, Enumerable<UserUncheckedCreateWithoutGroupChatsInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupChatsInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type GroupChatCreateuserIdsInput = {
    set: Enumerable<bigint> | Enumerable<number>
  }

  export type UserUncheckedCreateNestedManyWithoutGroupChatsInput = {
    create?: XOR<Enumerable<UserCreateWithoutGroupChatsInput>, Enumerable<UserUncheckedCreateWithoutGroupChatsInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupChatsInput>
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type UserUpdateManyWithoutGroupChatsInput = {
    create?: XOR<Enumerable<UserCreateWithoutGroupChatsInput>, Enumerable<UserUncheckedCreateWithoutGroupChatsInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupChatsInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutGroupChatsInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutGroupChatsInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutGroupChatsInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type GroupChatUpdateuserIdsInput = {
    set?: Enumerable<bigint> | Enumerable<number>
    push?: bigint | number | Enumerable<bigint> | Enumerable<number>
  }

  export type UserUncheckedUpdateManyWithoutGroupChatsInput = {
    create?: XOR<Enumerable<UserCreateWithoutGroupChatsInput>, Enumerable<UserUncheckedCreateWithoutGroupChatsInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutGroupChatsInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutGroupChatsInput>
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutGroupChatsInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutGroupChatsInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedEnumProviderFilter = {
    equals?: Provider
    in?: Enumerable<Provider>
    notIn?: Enumerable<Provider>
    not?: NestedEnumProviderFilter | Provider
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type NestedEnumProviderWithAggregatesFilter = {
    equals?: Provider
    in?: Enumerable<Provider>
    notIn?: Enumerable<Provider>
    not?: NestedEnumProviderWithAggregatesFilter | Provider
    _count?: NestedIntFilter
    _min?: NestedEnumProviderFilter
    _max?: NestedEnumProviderFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type ServerCreateWithoutUsersInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedServersInput
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutUsersInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: bigint | number
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutUsersInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutUsersInput, ServerUncheckedCreateWithoutUsersInput>
  }

  export type GroupChatCreateWithoutUsersInput = {
    id: bigint | number
    displayName: string
    description: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userIds?: GroupChatCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUncheckedCreateWithoutUsersInput = {
    id: bigint | number
    displayName: string
    description: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userIds?: GroupChatCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatCreateOrConnectWithoutUsersInput = {
    where: GroupChatWhereUniqueInput
    create: XOR<GroupChatCreateWithoutUsersInput, GroupChatUncheckedCreateWithoutUsersInput>
  }

  export type ServerCreateWithoutOwnerInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutServersInput
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainCreateNestedManyWithoutServerInput
  }

  export type ServerUncheckedCreateWithoutOwnerInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutServersInput
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUncheckedCreateNestedManyWithoutServerInput
  }

  export type ServerCreateOrConnectWithoutOwnerInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutOwnerInput, ServerUncheckedCreateWithoutOwnerInput>
  }

  export type ServerCreateManyOwnerInputEnvelope = {
    data: Enumerable<ServerCreateManyOwnerInput>
    skipDuplicates?: boolean
  }

  export type ServerUpsertWithWhereUniqueWithoutUsersInput = {
    where: ServerWhereUniqueInput
    update: XOR<ServerUpdateWithoutUsersInput, ServerUncheckedUpdateWithoutUsersInput>
    create: XOR<ServerCreateWithoutUsersInput, ServerUncheckedCreateWithoutUsersInput>
  }

  export type ServerUpdateWithWhereUniqueWithoutUsersInput = {
    where: ServerWhereUniqueInput
    data: XOR<ServerUpdateWithoutUsersInput, ServerUncheckedUpdateWithoutUsersInput>
  }

  export type ServerUpdateManyWithWhereWithoutUsersInput = {
    where: ServerScalarWhereInput
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyWithoutServersInput>
  }

  export type ServerScalarWhereInput = {
    AND?: Enumerable<ServerScalarWhereInput>
    OR?: Enumerable<ServerScalarWhereInput>
    NOT?: Enumerable<ServerScalarWhereInput>
    id?: BigIntFilter | bigint | number
    displayName?: StringFilter | string
    description?: StringNullableFilter | string | null
    start?: StringFilter | string
    thumbnail?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    ownerId?: BigIntFilter | bigint | number
    userIds?: BigIntNullableListFilter
    domainIds?: BigIntNullableListFilter
  }

  export type GroupChatUpsertWithWhereUniqueWithoutUsersInput = {
    where: GroupChatWhereUniqueInput
    update: XOR<GroupChatUpdateWithoutUsersInput, GroupChatUncheckedUpdateWithoutUsersInput>
    create: XOR<GroupChatCreateWithoutUsersInput, GroupChatUncheckedCreateWithoutUsersInput>
  }

  export type GroupChatUpdateWithWhereUniqueWithoutUsersInput = {
    where: GroupChatWhereUniqueInput
    data: XOR<GroupChatUpdateWithoutUsersInput, GroupChatUncheckedUpdateWithoutUsersInput>
  }

  export type GroupChatUpdateManyWithWhereWithoutUsersInput = {
    where: GroupChatScalarWhereInput
    data: XOR<GroupChatUpdateManyMutationInput, GroupChatUncheckedUpdateManyWithoutGroupChatsInput>
  }

  export type GroupChatScalarWhereInput = {
    AND?: Enumerable<GroupChatScalarWhereInput>
    OR?: Enumerable<GroupChatScalarWhereInput>
    NOT?: Enumerable<GroupChatScalarWhereInput>
    id?: BigIntFilter | bigint | number
    displayName?: StringFilter | string
    description?: StringFilter | string
    thumbnail?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userIds?: BigIntNullableListFilter
  }

  export type ServerUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ServerWhereUniqueInput
    update: XOR<ServerUpdateWithoutOwnerInput, ServerUncheckedUpdateWithoutOwnerInput>
    create: XOR<ServerCreateWithoutOwnerInput, ServerUncheckedCreateWithoutOwnerInput>
  }

  export type ServerUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ServerWhereUniqueInput
    data: XOR<ServerUpdateWithoutOwnerInput, ServerUncheckedUpdateWithoutOwnerInput>
  }

  export type ServerUpdateManyWithWhereWithoutOwnerInput = {
    where: ServerScalarWhereInput
    data: XOR<ServerUpdateManyMutationInput, ServerUncheckedUpdateManyWithoutOwnedServersInput>
  }

  export type UserCreateWithoutOwnedServersInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    servers?: ServerCreateNestedManyWithoutUsersInput
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatCreateNestedManyWithoutUsersInput
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutOwnedServersInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    servers?: ServerUncheckedCreateNestedManyWithoutUsersInput
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUncheckedCreateNestedManyWithoutUsersInput
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutOwnedServersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedServersInput, UserUncheckedCreateWithoutOwnedServersInput>
  }

  export type UserCreateWithoutServersInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatCreateNestedManyWithoutUsersInput
    updatedAt?: Date | string
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutServersInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUncheckedCreateNestedManyWithoutUsersInput
    updatedAt?: Date | string
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutServersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServersInput, UserUncheckedCreateWithoutServersInput>
  }

  export type DomainCreateWithoutServerInput = {
    id: bigint | number
    description?: string | null
    displayName: string
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomIds?: DomainCreateroomIdsInput | Enumerable<bigint> | Enumerable<number>
    rooms?: RoomCreateNestedManyWithoutDomainInput
  }

  export type DomainUncheckedCreateWithoutServerInput = {
    id: bigint | number
    description?: string | null
    displayName: string
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomIds?: DomainCreateroomIdsInput | Enumerable<bigint> | Enumerable<number>
    rooms?: RoomUncheckedCreateNestedManyWithoutDomainInput
  }

  export type DomainCreateOrConnectWithoutServerInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutServerInput, DomainUncheckedCreateWithoutServerInput>
  }

  export type DomainCreateManyServerInputEnvelope = {
    data: Enumerable<DomainCreateManyServerInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedServersInput = {
    update: XOR<UserUpdateWithoutOwnedServersInput, UserUncheckedUpdateWithoutOwnedServersInput>
    create: XOR<UserCreateWithoutOwnedServersInput, UserUncheckedCreateWithoutOwnedServersInput>
  }

  export type UserUpdateWithoutOwnedServersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    servers?: ServerUpdateManyWithoutUsersInput
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUpdateManyWithoutUsersInput
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutOwnedServersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    servers?: ServerUncheckedUpdateManyWithoutUsersInput
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUncheckedUpdateManyWithoutUsersInput
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithWhereUniqueWithoutServersInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutServersInput, UserUncheckedUpdateWithoutServersInput>
    create: XOR<UserCreateWithoutServersInput, UserUncheckedCreateWithoutServersInput>
  }

  export type UserUpdateWithWhereUniqueWithoutServersInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutServersInput, UserUncheckedUpdateWithoutServersInput>
  }

  export type UserUpdateManyWithWhereWithoutServersInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutUsersInput>
  }

  export type UserScalarWhereInput = {
    AND?: Enumerable<UserScalarWhereInput>
    OR?: Enumerable<UserScalarWhereInput>
    NOT?: Enumerable<UserScalarWhereInput>
    id?: BigIntFilter | bigint | number
    displayName?: StringFilter | string
    avatar?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    lastSeen?: StringFilter | string
    authInfo?: JsonFilter
    authProvider?: EnumProviderFilter | Provider
    disabled?: BoolFilter | boolean
    serverIds?: BigIntNullableListFilter
    friends?: BigIntNullableListFilter
    groupChatIds?: BigIntNullableListFilter
    updatedAt?: DateTimeFilter | Date | string
  }

  export type DomainUpsertWithWhereUniqueWithoutServerInput = {
    where: DomainWhereUniqueInput
    update: XOR<DomainUpdateWithoutServerInput, DomainUncheckedUpdateWithoutServerInput>
    create: XOR<DomainCreateWithoutServerInput, DomainUncheckedCreateWithoutServerInput>
  }

  export type DomainUpdateWithWhereUniqueWithoutServerInput = {
    where: DomainWhereUniqueInput
    data: XOR<DomainUpdateWithoutServerInput, DomainUncheckedUpdateWithoutServerInput>
  }

  export type DomainUpdateManyWithWhereWithoutServerInput = {
    where: DomainScalarWhereInput
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyWithoutDomainsInput>
  }

  export type DomainScalarWhereInput = {
    AND?: Enumerable<DomainScalarWhereInput>
    OR?: Enumerable<DomainScalarWhereInput>
    NOT?: Enumerable<DomainScalarWhereInput>
    id?: BigIntFilter | bigint | number
    serverId?: BigIntFilter | bigint | number
    description?: StringNullableFilter | string | null
    displayName?: StringFilter | string
    start?: StringFilter | string
    thumbnail?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    roomIds?: BigIntNullableListFilter
  }

  export type ServerCreateWithoutDomainsInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedServersInput
    users?: UserCreateNestedManyWithoutServersInput
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type ServerUncheckedCreateWithoutDomainsInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownerId: bigint | number
    users?: UserUncheckedCreateNestedManyWithoutServersInput
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type ServerCreateOrConnectWithoutDomainsInput = {
    where: ServerWhereUniqueInput
    create: XOR<ServerCreateWithoutDomainsInput, ServerUncheckedCreateWithoutDomainsInput>
  }

  export type RoomCreateWithoutDomainInput = {
    id: bigint | number
    displayName: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUncheckedCreateWithoutDomainInput = {
    id: bigint | number
    displayName: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutDomainInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutDomainInput, RoomUncheckedCreateWithoutDomainInput>
  }

  export type RoomCreateManyDomainInputEnvelope = {
    data: Enumerable<RoomCreateManyDomainInput>
    skipDuplicates?: boolean
  }

  export type ServerUpsertWithoutDomainsInput = {
    update: XOR<ServerUpdateWithoutDomainsInput, ServerUncheckedUpdateWithoutDomainsInput>
    create: XOR<ServerCreateWithoutDomainsInput, ServerUncheckedCreateWithoutDomainsInput>
  }

  export type ServerUpdateWithoutDomainsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedServersInput
    users?: UserUpdateManyWithoutServersInput
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type ServerUncheckedUpdateWithoutDomainsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: BigIntFieldUpdateOperationsInput | bigint | number
    users?: UserUncheckedUpdateManyWithoutServersInput
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type RoomUpsertWithWhereUniqueWithoutDomainInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutDomainInput, RoomUncheckedUpdateWithoutDomainInput>
    create: XOR<RoomCreateWithoutDomainInput, RoomUncheckedCreateWithoutDomainInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutDomainInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutDomainInput, RoomUncheckedUpdateWithoutDomainInput>
  }

  export type RoomUpdateManyWithWhereWithoutDomainInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutRoomsInput>
  }

  export type RoomScalarWhereInput = {
    AND?: Enumerable<RoomScalarWhereInput>
    OR?: Enumerable<RoomScalarWhereInput>
    NOT?: Enumerable<RoomScalarWhereInput>
    id?: BigIntFilter | bigint | number
    domainId?: BigIntFilter | bigint | number
    displayName?: StringFilter | string
    thumbnail?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type DomainCreateWithoutRoomsInput = {
    id: bigint | number
    description?: string | null
    server: ServerCreateNestedOneWithoutDomainsInput
    displayName: string
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomIds?: DomainCreateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type DomainUncheckedCreateWithoutRoomsInput = {
    id: bigint | number
    serverId: bigint | number
    description?: string | null
    displayName: string
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomIds?: DomainCreateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type DomainCreateOrConnectWithoutRoomsInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutRoomsInput, DomainUncheckedCreateWithoutRoomsInput>
  }

  export type DomainUpsertWithoutRoomsInput = {
    update: XOR<DomainUpdateWithoutRoomsInput, DomainUncheckedUpdateWithoutRoomsInput>
    create: XOR<DomainCreateWithoutRoomsInput, DomainUncheckedCreateWithoutRoomsInput>
  }

  export type DomainUpdateWithoutRoomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    server?: ServerUpdateOneRequiredWithoutDomainsInput
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type DomainUncheckedUpdateWithoutRoomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    serverId?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type UserCreateWithoutGroupChatsInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    servers?: ServerCreateNestedManyWithoutUsersInput
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    updatedAt?: Date | string
    ownedServers?: ServerCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutGroupChatsInput = {
    id: bigint | number
    displayName: string
    avatar?: string | null
    createdAt?: Date | string
    lastSeen: string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: Provider
    disabled?: boolean
    servers?: ServerUncheckedCreateNestedManyWithoutUsersInput
    serverIds?: UserCreateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserCreatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserCreategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    updatedAt?: Date | string
    ownedServers?: ServerUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutGroupChatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupChatsInput, UserUncheckedCreateWithoutGroupChatsInput>
  }

  export type UserUpsertWithWhereUniqueWithoutGroupChatsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutGroupChatsInput, UserUncheckedUpdateWithoutGroupChatsInput>
    create: XOR<UserCreateWithoutGroupChatsInput, UserUncheckedCreateWithoutGroupChatsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutGroupChatsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutGroupChatsInput, UserUncheckedUpdateWithoutGroupChatsInput>
  }

  export type UserUpdateManyWithWhereWithoutGroupChatsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutUsersInput>
  }

  export type ServerCreateManyOwnerInput = {
    id: bigint | number
    displayName: string
    description?: string | null
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userIds?: ServerCreateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerCreatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type ServerUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedServersInput
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUpdateManyWithoutServerInput
  }

  export type ServerUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: BigIntFieldUpdateOperationsInput | bigint | number
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUncheckedUpdateManyWithoutServerInput
  }

  export type ServerUncheckedUpdateManyWithoutServersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: BigIntFieldUpdateOperationsInput | bigint | number
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userIds?: GroupChatUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUncheckedUpdateWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userIds?: GroupChatUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type GroupChatUncheckedUpdateManyWithoutGroupChatsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userIds?: GroupChatUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type ServerUpdateWithoutOwnerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutServersInput
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUpdateManyWithoutServerInput
  }

  export type ServerUncheckedUpdateWithoutOwnerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutServersInput
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
    domains?: DomainUncheckedUpdateManyWithoutServerInput
  }

  export type ServerUncheckedUpdateManyWithoutOwnedServersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userIds?: ServerUpdateuserIdsInput | Enumerable<bigint> | Enumerable<number>
    domainIds?: ServerUpdatedomainIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type DomainCreateManyServerInput = {
    id: bigint | number
    description?: string | null
    displayName: string
    start?: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roomIds?: DomainCreateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type UserUpdateWithoutServersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUpdateManyWithoutUsersInput
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedServers?: ServerUpdateManyWithoutOwnerInput
  }

  export type UserUncheckedUpdateWithoutServersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    groupChats?: GroupChatUncheckedUpdateManyWithoutUsersInput
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerInput
  }

  export type UserUncheckedUpdateManyWithoutUsersInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainUpdateWithoutServerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
    rooms?: RoomUpdateManyWithoutDomainInput
  }

  export type DomainUncheckedUpdateWithoutServerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
    rooms?: RoomUncheckedUpdateManyWithoutDomainInput
  }

  export type DomainUncheckedUpdateManyWithoutDomainsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: StringFieldUpdateOperationsInput | string
    start?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roomIds?: DomainUpdateroomIdsInput | Enumerable<bigint> | Enumerable<number>
  }

  export type RoomCreateManyDomainInput = {
    id: bigint | number
    displayName: string
    thumbnail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateWithoutDomainInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateWithoutDomainInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyWithoutRoomsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutGroupChatsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    servers?: ServerUpdateManyWithoutUsersInput
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedServers?: ServerUpdateManyWithoutOwnerInput
  }

  export type UserUncheckedUpdateWithoutGroupChatsInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    displayName?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSeen?: StringFieldUpdateOperationsInput | string
    authInfo?: JsonNullValueInput | InputJsonValue
    authProvider?: EnumProviderFieldUpdateOperationsInput | Provider
    disabled?: BoolFieldUpdateOperationsInput | boolean
    servers?: ServerUncheckedUpdateManyWithoutUsersInput
    serverIds?: UserUpdateserverIdsInput | Enumerable<bigint> | Enumerable<number>
    friends?: UserUpdatefriendsInput | Enumerable<bigint> | Enumerable<number>
    groupChatIds?: UserUpdategroupChatIdsInput | Enumerable<bigint> | Enumerable<number>
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedServers?: ServerUncheckedUpdateManyWithoutOwnerInput
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}