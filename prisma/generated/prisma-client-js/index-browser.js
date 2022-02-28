
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.10.0
 * Query Engine version: 73e60b76d394f8d37d8ebd1f8918c79029f0db86
 */
Prisma.prismaVersion = {
  client: "3.10.0",
  engine: "73e60b76d394f8d37d8ebd1f8918c79029f0db86"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.UserScalarFieldEnum = makeEnum({
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
});

exports.Prisma.ServerScalarFieldEnum = makeEnum({
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
});

exports.Prisma.DomainScalarFieldEnum = makeEnum({
  id: 'id',
  serverId: 'serverId',
  description: 'description',
  displayName: 'displayName',
  start: 'start',
  thumbnail: 'thumbnail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  roomIds: 'roomIds'
});

exports.Prisma.RoomScalarFieldEnum = makeEnum({
  id: 'id',
  domainId: 'domainId',
  displayName: 'displayName',
  thumbnail: 'thumbnail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.GroupChatScalarFieldEnum = makeEnum({
  id: 'id',
  displayName: 'displayName',
  description: 'description',
  thumbnail: 'thumbnail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userIds: 'userIds'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.JsonNullValueInput = makeEnum({
  JsonNull: 'JsonNull'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.JsonNullValueFilter = makeEnum({
  DbNull: 'DbNull',
  JsonNull: 'JsonNull',
  AnyNull: 'AnyNull'
});
exports.Provider = makeEnum({
  EMAIL: 'EMAIL',
  GITHUB: 'GITHUB',
  GOOGLE: 'GOOGLE',
  TWITTER: 'TWITTER'
});

exports.Prisma.ModelName = makeEnum({
  User: 'User',
  Server: 'Server',
  Domain: 'Domain',
  Room: 'Room',
  GroupChat: 'GroupChat'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
