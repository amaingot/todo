import {
  createConnection,
  getConnection,
  ConnectionOptions,
  Connection,
} from "typeorm";
import config from "../utils/config";
import { logger } from "../utils/logger";

export const CONNECTION_CONFIG: ConnectionOptions = {
  type: "postgres",
  username: config.get("POSTGRES_USERNAME"),
  host: config.get("POSTGRES_HOST"),
  password: config.get("POSTGRES_PASSWORD"),
  database: config.get("POSTGRES_DATABASE"),
  schema: "public",
  entities: ["src/db/entities/**/*.ts"],
  migrations: ["src/db/migrations/**/*.ts"],
  subscribers: ["src/db/subscribers/**/*.ts"],
  cli: {
    entitiesDir: "src/db/entities",
    migrationsDir: "src/db/migrations",
    subscribersDir: "src/db/subscribers",
  },
  logging: "all",
  logger: {
    logQuery: (query, params) =>
      logger.info("[DB] Queried the DB", {
        query,
        params,
      }),
    logQueryError: (error, query, parameters) =>
      logger.error("[DB] Error querying the DB", {
        error,
        query,
        parameters,
      }),
    logQuerySlow: (time, query, parameters) =>
      logger.warn("[DB] Slow DB query", {
        time,
        query,
        parameters,
      }),
    logSchemaBuild: (message) => logger.info(`[DB SCHEMA BUILD] ${message}`),
    logMigration: (message) => logger.info(`[DB MIGRATION] ${message}`),
    log: (level, message) => {
      if (level === "log" || level === "info") logger.info(`[DB] ${message}`);
      if (level === "warn") logger.warn(`[DB] ${message}`);
    },
  },
};

const pollDatabaseConnect = async (connection: Connection) => {
  let attempts = 0;
  while (!connection.isConnected && attempts < 100) {
    try {
      await connection.connect();
      logger.info("Successfully connected to the database", { attempts });
      return true;
    } catch (e) {
      logger.warn("Could not connect to the database, will retry", {
        error: e,
        attempts,
      });
      attempts++;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return connection.isConnected;
};

export const openConnection = async () => {
  const connection = await createConnection(CONNECTION_CONFIG);

  const connected = await pollDatabaseConnect(connection);
  if (connected === false) {
    logger.error("Error connecting to the database");
  }

  try {
    const migrations = await connection.runMigrations({ transaction: "each" });
    logger.info("Successfully ran migrations on the database", { migrations });
  } catch (e) {
    logger.error("Error running migrations on the database", { error: e });
  }
  return connection;
};

export const closeConnection = async () => {
  const connection = getConnection();

  await connection.close();
  logger.info("Disconnected from database");
};
