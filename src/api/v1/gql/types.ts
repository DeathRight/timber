import { EmailAddressResolver, TimestampResolver } from 'graphql-scalars';
import { asNexusMethod, enumType } from 'nexus';
import path from 'path';

import { ProvidersE } from './provider';

//export const DateScalar = asNexusMethod(DateTimeResolver, "date", "Date");

//export const BigIntScalar = asNexusMethod(BigIntResolver, "bigint", "BigInt");

export const TimestampScalar = asNexusMethod(
  TimestampResolver,
  "timestamp",
  "number"
);

export const EmailScalar = asNexusMethod(
  EmailAddressResolver,
  "email",
  "string"
);

export const ProviderEnum = enumType({
  name: "Provider",
  sourceType: {
    module: require.resolve(path.resolve(__dirname, "provider")),
    export: "ProvidersE",
  },
  asNexusMethod: "providerenum",
  description: "Sign-in provider type",
  members: ProvidersE,
});
