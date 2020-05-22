import { GraphQLScalarType } from "graphql";
import { UserInputError } from "apollo-server-express";

import { Resolvers } from "./types";
import * as DB from "../db";
import auth from "../utils/auth";
import { todoSubscription, publishTodoEvent } from "../utils/pubsub";

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
    createTodo: async (_, { input }, context) => {
      const newTodo = await DB.createOne({
        target: DB.Todo,
        item: input,
        context,
      });
      publishTodoEvent(newTodo);
      return newTodo;
    },
    updateTodo: async (_, { id, input }, context) => {
      const updatedTodo = await DB.updateOne({
        target: DB.Todo,
        id,
        updatedItem: input,
        context,
      });
      publishTodoEvent(updatedTodo);

      return updatedTodo;
    },
    deleteTodo: (_, { id }, context) =>
      DB.deleteOne({ target: DB.Todo, id, context }),
  },
  Subscription: {
    onUpdateTodo: {
      subscribe: todoSubscription,
    },
  },
};

export default resolvers;
