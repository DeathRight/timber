import { Kind } from 'graphql';
import { asNexusMethod, scalarType } from 'nexus';

export enum ProvidersE {
  EMAIL = 0,
  GOOGLE = 1,
  TWITTER = 2,
  GITHUB = 3,
}

export type AuthInfo = {
  password?: string;
  ids?: string[];
};

export const AuthInfo = scalarType({
  name: "AuthInfo",
  sourceType: {
    module: module.path,
    export: "AuthInfo",
  },
  asNexusMethod: "authinfo",
  description:
    "AuthInfo JSON object, with linked 3rd party provider IDs and/or user email under 'ids'",
  parseValue(value) {
    return JSON.parse(value as string) as AuthInfo;
  },
  serialize(value) {
    return JSON.stringify(value as AuthInfo);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value) as AuthInfo;
    }
  },
});
