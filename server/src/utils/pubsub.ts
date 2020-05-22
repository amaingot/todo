import { GooglePubSub } from "@axelspringer/graphql-google-pubsub";
import config from "./config";
import { Todo } from "../db";

const pubSub = new GooglePubSub({
  projectId: config.get("GCP_PROJECT_ID"),
  credentials: JSON.parse(config.get("GCP_SERVICE_ACCOUNT_KEY")),
});

const TODO_TOPIC_NAME = `todo-app-${config.get("ENVIRONMENT")}`;

export const todoSubscription = () => pubSub.asyncIterator(TODO_TOPIC_NAME);

export const publishTodoEvent = (todo: Todo) =>
  pubSub.publish(TODO_TOPIC_NAME, todo);
