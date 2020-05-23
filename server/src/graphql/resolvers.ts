import { GraphQLScalarType } from "graphql";
import { UserInputError } from "apollo-server-express";

import { Resolvers } from "./types";
import * as DB from "../db";
import auth from "../utils/auth";
import { todoSubscription, publishTodoEvent } from "../utils/pubsub";

const resolvers: Resolvers = {
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
  TodoEvent: {
    todo: ({ id }, _, context) => DB.findOne({ target: DB.Todo, id, context }),
  },
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
      publishTodoEvent(newTodo.id);
      return newTodo;
    },
    updateTodo: async (_, { id, input }, context) => {
      const updatedTodo = await DB.updateOne({
        target: DB.Todo,
        id,
        updatedItem: input,
        context,
      });
      publishTodoEvent(updatedTodo.id);

      return updatedTodo;
    },
    deleteTodo: (_, { id }, context) =>
      DB.deleteOne({ target: DB.Todo, id, context }),
  },
  Subscription: {
    onTodoEvent: {
      subscribe: todoSubscription as any,
    },
  },
};

export default resolvers;
