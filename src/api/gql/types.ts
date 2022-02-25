import { Kind } from 'graphql';
import { scalarType } from 'nexus';

export const DateScalar = scalarType({
  name: "Date",
  asNexusMethod: "date",
  description: "Date type, serialized as milliseconds since epoch",
  parseValue(value) {
    return new Date(value as string | number);
  },
  serialize(value) {
    return (value as Date).getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const BigIntScalar = scalarType({
  name: "BigInt",
  asNexusMethod: "bigint",
  description: "BigInt type",
  parseValue(value) {
    return BigInt(value as string);
  },
  serialize(value) {
    return (value as BigInt).toString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return BigInt(ast.value);
    }
  },
});
