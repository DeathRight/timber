import { EmailAddressResolver, TimestampResolver, URLResolver } from 'graphql-scalars';
import { asNexusMethod, enumType } from 'nexus';
import { InviteType, Provider } from 'nexus-prisma';

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

export const URLScalar = asNexusMethod(URLResolver, "url", "string");

export const ProviderEnum = enumType(Provider);

export const InviteTypeEnum = enumType(InviteType);
