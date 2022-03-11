import { Provider } from '@prisma/client';
import { Kind } from 'graphql';
import { asNexusMethod, scalarType } from 'nexus';

export type ProviderInfo = {
  provider: Provider;
  id: string;
};

export type AuthInfo = ProviderInfo[];

export const AuthInfo = scalarType({
  name: "AuthInfo",
  sourceType: {
    module: module.path,
    export: "AuthInfo",
  },
  asNexusMethod: "authinfo",
  description: `AuthInfo JSON object. Format: [{"provider": "TWITTER", "id": "id_here"}]`,
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
