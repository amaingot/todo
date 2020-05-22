import { GraphQLScalarType } from "graphql";
import { UserInputError } from "apollo-server-express";

import { Resolvers } from "./types";
import * as DB from "../db";
import auth from "../utils/auth";

const resolvers: Partial<Resolvers> = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date time represented as an ISO String",
    parseValue: (value) => {
      try {
        return new Date(value);
      } catch (e) {
        throw new UserInputError("Invalid DateTime input");
      }
    },
    serialize: (value: Date) => {
      return value.toISOString();
    },
  }),
  Query: {
    getTodo: (_, { id }, context) =>
      DB.findOne({ target: DB.Todo, id, context }),
    listTodos: (_, { input }, context) =>
      DB.findMany({ target: DB.Todo, input, context }),
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const user = await auth.createUser({
        email: input.email,
        password: input.password,
        emailVerified: true,
      });
      return user.uid;
    },
    createTodo: (_, { input }, context) =>
      DB.createOne({ target: DB.Todo, item: input, context }),
    updateTodo: (_, { id, input }, context) =>
      DB.updateOne({ target: DB.Todo, id, updatedItem: input, context }),
    deleteTodo: (_, { id }, context) =>
      DB.deleteOne({ target: DB.Todo, id, context }),
  },
};

export default resolvers;
