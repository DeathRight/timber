/*const u = nexusPrisma.User;
export const UserObject = objectType({
  name: u.$name,
  description: u.$description,
  definition(t) {
    t.field(u.id);
    t.field(u.displayName);
    t.field(u.avatar);
    t.field(u.createdAt);
    t.field(u.lastSeen);
  },
});

export const userByIdQuery = queryField("userById", {
  type: "User",
  args: {
    id: nonNull(arg({ type: "BigInt", description: "UUID of the user" })),
  },
  async resolve(_, args, ctx) {
    return await getUser("id", args.id, ctx.pg);
  },
});

export const userByNameQuery = queryField("userByName", {
  type: "User",
  args: {
    displayName: nonNull(
      stringArg({ description: "Display Name of the user" })
    ),
  },
  async resolve(_, args, ctx) {
    return await getUser("displayName", args.displayName, ctx.pg);
  },
});

/*export const userPaginationQuery = queryField("userPagination", {
  type: nonNull(list("User")),
  args: {
    before: stringArg({
      description: "User UUID to start page before [n-1] (optional)",
    }),
    after: stringArg({
      description: "User UUID to start page after [n+1] (optional)",
    }),
    limit: stringArg({ description: "Maximum number of users in a page" }),
  },
  async resolve(_, args, ctx) {},
});*/
// TODO
