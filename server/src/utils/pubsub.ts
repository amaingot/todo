import { GooglePubSub as GqlPubSub } from "@axelspringer/graphql-google-pubsub";
import { PubSub as GooglePubSub } from "@google-cloud/pubsub";
import config from "./config";
import { logger } from "./logger";

const graphqlPubSub = new GqlPubSub({
  projectId: config.get("GCP_PROJECT_ID"),
  credentials: JSON.parse(config.get("GCP_SERVICE_ACCOUNT_KEY")),
});

const googlePubSub = new GooglePubSub({
  projectId: config.get("GCP_PROJECT_ID"),
  credentials: JSON.parse(config.get("GCP_SERVICE_ACCOUNT_KEY")),
});

const TODO_TOPIC_NAME = `todo-app-${config.get("ENVIRONMENT")}`;

export const initPubSub = async () => {
  const [topics] = await googlePubSub.getTopics();

  try {
    if (topics.filter((t) => t.name === TODO_TOPIC_NAME).length > 0) {
      logger.info("Topic initialized");
      return true;
    } else {
      await googlePubSub.createTopic(TODO_TOPIC_NAME);
      logger.info("Created topic");
      return true;
    }
  } catch (e) {
    logger.error("Error initializing pubsub topic", {
      topic: TODO_TOPIC_NAME,
      error: e,
    });
  }
};

interface OnTodoMessage {
  id: string;
}

export const todoSubscription = () =>
  graphqlPubSub.asyncIterator<OnTodoMessage>(TODO_TOPIC_NAME);

export const publishTodoEvent = (id: string) =>
  graphqlPubSub.publish(TODO_TOPIC_NAME, { id });
