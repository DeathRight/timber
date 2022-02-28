import * as NexusCore from 'nexus/dist/core'

//
//
// TYPES
// TYPES
// TYPES
// TYPES
//
//

// Models

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `User`.
  *
  * ### ️⚠️ You have not writen documentation for model User
  *
  * Replace this default advisory JSDoc with your own documentation about model User
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model User {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { User } from 'nexus-prisma'
  *
  * objectType({
  *   name: User.$name
  *   description: User.$description
  *   definition(t) {
  *     t.field(User.id)
  *   }
  * })
  */
export interface User {
  $name: 'User'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.id`.
    *
    * Snowflake (simpleflake) based BigInt ID
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'BigInt'>
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.displayName`.
    *
    * Global display name
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.displayName)
    *   }
    * })
    */
  displayName: {
    /**
     * The name of this field.
     */
    name: 'displayName'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'displayName'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.avatar`.
    *
    * URL for user's avatar
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.avatar)
    *   }
    * })
    */
  avatar: {
    /**
     * The name of this field.
     */
    name: 'avatar'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'avatar'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.createdAt`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   createdAt  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.lastSeen`.
    *
    * Timestamp in milliseconds since epoch the user was last active
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.lastSeen)
    *   }
    * })
    */
  lastSeen: {
    /**
     * The name of this field.
     */
    name: 'lastSeen'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'lastSeen'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.authInfo`.
    *
    * JSON {password?: string, ids?: string[]} where `ids` is email or auth provider ID list
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.authInfo)
    *   }
    * })
    */
  authInfo: {
    /**
     * The name of this field.
     */
    name: 'authInfo'
  
    /**
     * The type of this field.
     */
    type: 'Json' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Json'>
    : 'Warning/Error: The type \'Json\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Json\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'authInfo'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.authProvider`.
    *
    * Original/primary auth provider
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.authProvider)
    *   }
    * })
    */
  authProvider: {
    /**
     * The name of this field.
     */
    name: 'authProvider'
  
    /**
     * The type of this field.
     */
    type: 'Provider' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Provider'>
    : 'Warning/Error: The type \'Provider\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Provider\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'authProvider'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.disabled`.
    *
    * Whether user is globally disabled
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.disabled)
    *   }
    * })
    */
  disabled: {
    /**
     * The name of this field.
     */
    name: 'disabled'
  
    /**
     * The type of this field.
     */
    type: 'Boolean' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Boolean'>
    : 'Warning/Error: The type \'Boolean\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Boolean\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'disabled'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.servers`.
    *
    * Prisma client relation to servers user is a member of
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.servers)
    *   }
    * })
    */
  servers: {
    /**
     * The name of this field.
     */
    name: 'servers'
  
    /**
     * The type of this field.
     */
    type: 'Server' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Server'> | NexusCore.NexusNonNullDef<'Server'>)
    : 'Warning/Error: The type \'Server\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Server\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'servers'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.serverIds`.
    *
    * Array of server IDs the user is a member of
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.serverIds)
    *   }
    * })
    */
  serverIds: {
    /**
     * The name of this field.
     */
    name: 'serverIds'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'BigInt'> | NexusCore.NexusNonNullDef<'BigInt'>)
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'serverIds'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.friends`.
    *
    * Array of user IDs the user is friends with
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.friends)
    *   }
    * })
    */
  friends: {
    /**
     * The name of this field.
     */
    name: 'friends'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'BigInt'> | NexusCore.NexusNonNullDef<'BigInt'>)
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'friends'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.groupChatIds`.
    *
    * Array of GroupChat IDs for group chats the user is a member of
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.groupChatIds)
    *   }
    * })
    */
  groupChatIds: {
    /**
     * The name of this field.
     */
    name: 'groupChatIds'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'BigInt'> | NexusCore.NexusNonNullDef<'BigInt'>)
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'groupChatIds'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.groupChats`.
    *
    * Prisma client relation to group chat's the user is a member of
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.groupChats)
    *   }
    * })
    */
  groupChats: {
    /**
     * The name of this field.
     */
    name: 'groupChats'
  
    /**
     * The type of this field.
     */
    type: 'GroupChat' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'GroupChat'> | NexusCore.NexusNonNullDef<'GroupChat'>)
    : 'Warning/Error: The type \'GroupChat\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'GroupChat\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'groupChats'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.updatedAt`.
    *
    * ISO date this row was last updated
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'updatedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.ownedServers`.
    *
    * Prisma client relation to servers user owns
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.ownedServers)
    *   }
    * })
    */
  ownedServers: {
    /**
     * The name of this field.
     */
    name: 'ownedServers'
  
    /**
     * The type of this field.
     */
    type: 'Server' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Server'> | NexusCore.NexusNonNullDef<'Server'>)
    : 'Warning/Error: The type \'Server\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Server\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'ownedServers'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Server`.
  *
  * ### ️⚠️ You have not writen documentation for model Server
  *
  * Replace this default advisory JSDoc with your own documentation about model Server
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Server {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Server } from 'nexus-prisma'
  *
  * objectType({
  *   name: Server.$name
  *   description: Server.$description
  *   definition(t) {
  *     t.field(Server.id)
  *   }
  * })
  */
export interface Server {
  $name: 'Server'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.id`.
    *
    * Snowflake (simpleflake) based BigInt ID
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'BigInt'>
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.displayName`.
    *
    * Global display name
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.displayName)
    *   }
    * })
    */
  displayName: {
    /**
     * The name of this field.
     */
    name: 'displayName'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'displayName'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.description`.
    *
    * Description of server
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.description)
    *   }
    * })
    */
  description: {
    /**
     * The name of this field.
     */
    name: 'description'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'description'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.start`.
    *
    * Starting domain ID
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.start)
    *   }
    * })
    */
  start: {
    /**
     * The name of this field.
     */
    name: 'start'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'start'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.thumbnail`.
    *
    * URL for server's thumbnail
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.thumbnail)
    *   }
    * })
    */
  thumbnail: {
    /**
     * The name of this field.
     */
    name: 'thumbnail'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'thumbnail'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.createdAt`.
    *
    * ISO date the server was created at
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.updatedAt`.
    *
    * ISO date this row was last updated
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'updatedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.owner`.
    *
    * Prisma client relation to user that owns the server
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.owner)
    *   }
    * })
    */
  owner: {
    /**
     * The name of this field.
     */
    name: 'owner'
  
    /**
     * The type of this field.
     */
    type: 'User' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'User'>
    : 'Warning/Error: The type \'User\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'User\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'owner'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.ownerId`.
    *
    * User ID of the owner
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.ownerId)
    *   }
    * })
    */
  ownerId: {
    /**
     * The name of this field.
     */
    name: 'ownerId'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'BigInt'>
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'ownerId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.users`.
    *
    * Prisma client relation to users who are members of this server
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.users)
    *   }
    * })
    */
  users: {
    /**
     * The name of this field.
     */
    name: 'users'
  
    /**
     * The type of this field.
     */
    type: 'User' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'User'> | NexusCore.NexusNonNullDef<'User'>)
    : 'Warning/Error: The type \'User\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'User\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'users'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.userIds`.
    *
    * Array of user IDs that are members of this server
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.userIds)
    *   }
    * })
    */
  userIds: {
    /**
     * The name of this field.
     */
    name: 'userIds'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'BigInt'> | NexusCore.NexusNonNullDef<'BigInt'>)
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'userIds'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.domainIds`.
    *
    * Array of domain IDs that this server contains
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.domainIds)
    *   }
    * })
    */
  domainIds: {
    /**
     * The name of this field.
     */
    name: 'domainIds'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'BigInt'> | NexusCore.NexusNonNullDef<'BigInt'>)
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'domainIds'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Server.domains`.
    *
    * Prisma client relation to domains that this server contains
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Server } from 'nexus-prisma'
    *
    * objectType({
    *   name: Server.$name
    *   description: Server.$description
    *   definition(t) {
    *     t.field(Server.domains)
    *   }
    * })
    */
  domains: {
    /**
     * The name of this field.
     */
    name: 'domains'
  
    /**
     * The type of this field.
     */
    type: 'Domain' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Domain'> | NexusCore.NexusNonNullDef<'Domain'>)
    : 'Warning/Error: The type \'Domain\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Domain\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Server', 'domains'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Domain`.
  *
  * ### ️⚠️ You have not writen documentation for model Domain
  *
  * Replace this default advisory JSDoc with your own documentation about model Domain
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Domain {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Domain } from 'nexus-prisma'
  *
  * objectType({
  *   name: Domain.$name
  *   description: Domain.$description
  *   definition(t) {
  *     t.field(Domain.id)
  *   }
  * })
  */
export interface Domain {
  $name: 'Domain'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.id`.
    *
    * Snowflake (simpleflake) based BigInt ID
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'BigInt'>
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.serverId`.
    *
    * ID of server that contains this domain
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.serverId)
    *   }
    * })
    */
  serverId: {
    /**
     * The name of this field.
     */
    name: 'serverId'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'BigInt'>
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'serverId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.description`.
    *
    * Description of domain
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.description)
    *   }
    * })
    */
  description: {
    /**
     * The name of this field.
     */
    name: 'description'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'description'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.server`.
    *
    * Prisma client relation to server that contains this domain
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.server)
    *   }
    * })
    */
  server: {
    /**
     * The name of this field.
     */
    name: 'server'
  
    /**
     * The type of this field.
     */
    type: 'Server' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Server'>
    : 'Warning/Error: The type \'Server\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Server\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'server'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.displayName`.
    *
    * Global display name
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.displayName)
    *   }
    * })
    */
  displayName: {
    /**
     * The name of this field.
     */
    name: 'displayName'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'displayName'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.start`.
    *
    * Starting room ID
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.start)
    *   }
    * })
    */
  start: {
    /**
     * The name of this field.
     */
    name: 'start'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'start'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.thumbnail`.
    *
    * URL for domain's thumbnail
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.thumbnail)
    *   }
    * })
    */
  thumbnail: {
    /**
     * The name of this field.
     */
    name: 'thumbnail'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'thumbnail'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.createdAt`.
    *
    * ISO date the domain was created at
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.updatedAt`.
    *
    * ISO date this row was last updated
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'updatedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.roomIds`.
    *
    * Array of room ids that this domain contains
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.roomIds)
    *   }
    * })
    */
  roomIds: {
    /**
     * The name of this field.
     */
    name: 'roomIds'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'BigInt'> | NexusCore.NexusNonNullDef<'BigInt'>)
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'roomIds'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Domain.rooms`.
    *
    * Prisma client relation to rooms that this domain contains
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Domain } from 'nexus-prisma'
    *
    * objectType({
    *   name: Domain.$name
    *   description: Domain.$description
    *   definition(t) {
    *     t.field(Domain.rooms)
    *   }
    * })
    */
  rooms: {
    /**
     * The name of this field.
     */
    name: 'rooms'
  
    /**
     * The type of this field.
     */
    type: 'Room' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Room'> | NexusCore.NexusNonNullDef<'Room'>)
    : 'Warning/Error: The type \'Room\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Room\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Domain', 'rooms'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Room`.
  *
  * ### ️⚠️ You have not writen documentation for model Room
  *
  * Replace this default advisory JSDoc with your own documentation about model Room
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Room {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Room } from 'nexus-prisma'
  *
  * objectType({
  *   name: Room.$name
  *   description: Room.$description
  *   definition(t) {
  *     t.field(Room.id)
  *   }
  * })
  */
export interface Room {
  $name: 'Room'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Room.id`.
    *
    * Snowflake (simpleflake) based BigInt ID
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Room } from 'nexus-prisma'
    *
    * objectType({
    *   name: Room.$name
    *   description: Room.$description
    *   definition(t) {
    *     t.field(Room.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'BigInt'>
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Room', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Room.domainId`.
    *
    * ID of domain that contains this room
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Room } from 'nexus-prisma'
    *
    * objectType({
    *   name: Room.$name
    *   description: Room.$description
    *   definition(t) {
    *     t.field(Room.domainId)
    *   }
    * })
    */
  domainId: {
    /**
     * The name of this field.
     */
    name: 'domainId'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'BigInt'>
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Room', 'domainId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Room.domain`.
    *
    * Prisma client relation to domain that contains this room
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Room } from 'nexus-prisma'
    *
    * objectType({
    *   name: Room.$name
    *   description: Room.$description
    *   definition(t) {
    *     t.field(Room.domain)
    *   }
    * })
    */
  domain: {
    /**
     * The name of this field.
     */
    name: 'domain'
  
    /**
     * The type of this field.
     */
    type: 'Domain' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Domain'>
    : 'Warning/Error: The type \'Domain\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Domain\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Room', 'domain'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Room.displayName`.
    *
    * Global display name
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Room } from 'nexus-prisma'
    *
    * objectType({
    *   name: Room.$name
    *   description: Room.$description
    *   definition(t) {
    *     t.field(Room.displayName)
    *   }
    * })
    */
  displayName: {
    /**
     * The name of this field.
     */
    name: 'displayName'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Room', 'displayName'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Room.thumbnail`.
    *
    * URL for room's thumbnail
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Room } from 'nexus-prisma'
    *
    * objectType({
    *   name: Room.$name
    *   description: Room.$description
    *   definition(t) {
    *     t.field(Room.thumbnail)
    *   }
    * })
    */
  thumbnail: {
    /**
     * The name of this field.
     */
    name: 'thumbnail'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Room', 'thumbnail'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Room.createdAt`.
    *
    * ISO date the room was created at
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Room } from 'nexus-prisma'
    *
    * objectType({
    *   name: Room.$name
    *   description: Room.$description
    *   definition(t) {
    *     t.field(Room.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Room', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Room.updatedAt`.
    *
    * ISO date this row was last updated
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Room } from 'nexus-prisma'
    *
    * objectType({
    *   name: Room.$name
    *   description: Room.$description
    *   definition(t) {
    *     t.field(Room.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Room', 'updatedAt'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `GroupChat`.
  *
  * ### ️⚠️ You have not writen documentation for model GroupChat
  *
  * Replace this default advisory JSDoc with your own documentation about model GroupChat
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model GroupChat {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { GroupChat } from 'nexus-prisma'
  *
  * objectType({
  *   name: GroupChat.$name
  *   description: GroupChat.$description
  *   definition(t) {
  *     t.field(GroupChat.id)
  *   }
  * })
  */
export interface GroupChat {
  $name: 'GroupChat'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `GroupChat.id`.
    *
    * Snowflake (simpleflake) based BigInt ID
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { GroupChat } from 'nexus-prisma'
    *
    * objectType({
    *   name: GroupChat.$name
    *   description: GroupChat.$description
    *   definition(t) {
    *     t.field(GroupChat.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'BigInt'>
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'GroupChat', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `GroupChat.displayName`.
    *
    * Global display name
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { GroupChat } from 'nexus-prisma'
    *
    * objectType({
    *   name: GroupChat.$name
    *   description: GroupChat.$description
    *   definition(t) {
    *     t.field(GroupChat.displayName)
    *   }
    * })
    */
  displayName: {
    /**
     * The name of this field.
     */
    name: 'displayName'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'GroupChat', 'displayName'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `GroupChat.description`.
    *
    * Description of GroupChat
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { GroupChat } from 'nexus-prisma'
    *
    * objectType({
    *   name: GroupChat.$name
    *   description: GroupChat.$description
    *   definition(t) {
    *     t.field(GroupChat.description)
    *   }
    * })
    */
  description: {
    /**
     * The name of this field.
     */
    name: 'description'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'GroupChat', 'description'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `GroupChat.thumbnail`.
    *
    * URL for group chat's thumbnail
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { GroupChat } from 'nexus-prisma'
    *
    * objectType({
    *   name: GroupChat.$name
    *   description: GroupChat.$description
    *   definition(t) {
    *     t.field(GroupChat.thumbnail)
    *   }
    * })
    */
  thumbnail: {
    /**
     * The name of this field.
     */
    name: 'thumbnail'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'GroupChat', 'thumbnail'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `GroupChat.createdAt`.
    *
    * ISO date the group chat was created at
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { GroupChat } from 'nexus-prisma'
    *
    * objectType({
    *   name: GroupChat.$name
    *   description: GroupChat.$description
    *   definition(t) {
    *     t.field(GroupChat.createdAt)
    *   }
    * })
    */
  createdAt: {
    /**
     * The name of this field.
     */
    name: 'createdAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'GroupChat', 'createdAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `GroupChat.updatedAt`.
    *
    * ISO date this row was last updated
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { GroupChat } from 'nexus-prisma'
    *
    * objectType({
    *   name: GroupChat.$name
    *   description: GroupChat.$description
    *   definition(t) {
    *     t.field(GroupChat.updatedAt)
    *   }
    * })
    */
  updatedAt: {
    /**
     * The name of this field.
     */
    name: 'updatedAt'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'GroupChat', 'updatedAt'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `GroupChat.users`.
    *
    * Prisma client relation to users who are members of this group chat
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { GroupChat } from 'nexus-prisma'
    *
    * objectType({
    *   name: GroupChat.$name
    *   description: GroupChat.$description
    *   definition(t) {
    *     t.field(GroupChat.users)
    *   }
    * })
    */
  users: {
    /**
     * The name of this field.
     */
    name: 'users'
  
    /**
     * The type of this field.
     */
    type: 'User' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'User'> | NexusCore.NexusNonNullDef<'User'>)
    : 'Warning/Error: The type \'User\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'User\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'GroupChat', 'users'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `GroupChat.userIds`.
    *
    * Array of user IDs that are members of this group chat
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { GroupChat } from 'nexus-prisma'
    *
    * objectType({
    *   name: GroupChat.$name
    *   description: GroupChat.$description
    *   definition(t) {
    *     t.field(GroupChat.userIds)
    *   }
    * })
    */
  userIds: {
    /**
     * The name of this field.
     */
    name: 'userIds'
  
    /**
     * The type of this field.
     */
    type: 'BigInt' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'BigInt'> | NexusCore.NexusNonNullDef<'BigInt'>)
    : 'Warning/Error: The type \'BigInt\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'BigInt\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: string
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'GroupChat', 'userIds'>
  }
}

// Enums

/**
  * Generated Nexus `enumType` configuration based on your Prisma schema's enum `Provider`.
  *
  * ### ️⚠️ You have not writen documentation for enum Provider
  *
  * Replace this default advisory JSDoc with your own documentation about enum Provider
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * enum Provider {
  *   EMAIL
  *   GITHUB
  *   GOOGLE
  *   TWITTER
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * Contains these members: EMAIL, GITHUB, GOOGLE, TWITTER
  *
  * @example
  *
  * import { enumType } from 'nexus'
  * import { Provider } from 'nexus-prisma'
  *
  * enumType(Provider)
  */
export interface Provider {
  name: 'Provider'
  description: undefined
  members: ['EMAIL', 'GITHUB', 'GOOGLE', 'TWITTER']
}


//
//
// TERMS
// TERMS
// TERMS
// TERMS
//
//

//
//
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
//
//

export const User: User

export const Server: Server

export const Domain: Domain

export const Room: Room

export const GroupChat: GroupChat

//
//
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
//
//

export const Provider: Provider

//
//
// EXPORTS: OTHER
// EXPORTS: OTHER
// EXPORTS: OTHER
// EXPORTS: OTHER
//
//

import { Runtime } from 'nexus-prisma/dist-cjs/generator/runtime/settingsSingleton'

/**
 * Adjust Nexus Prisma's [runtime settings](https://pris.ly/nexus-prisma/docs/settings/runtime).
 *
 * @example
 *
 *     import { PrismaClient } from '@prisma/client'
 *     import { ApolloServer } from 'apollo-server'
 *     import { makeSchema } from 'nexus'
 *     import { User, Post, $settings } from 'nexus-prisma'
 *
 *     new ApolloServer({
 *       schema: makeSchema({
 *         types: [],
 *       }),
 *       context() {
 *         return {
 *           db: new PrismaClient(), // <-- You put Prisma client on the "db" context property
 *         }
 *       },
 *     })
 *
 *     $settings({
 *       prismaClientContextField: 'db', // <-- Tell Nexus Prisma
 *     })
 *
 * @remarks This is _different_ than Nexus Prisma's [_gentime_ settings](https://pris.ly/nexus-prisma/docs/settings/gentime).
 */
export const $settings: typeof Runtime.changeSettings
