import expressWinston from "express-winston";
import { LoggingWinston } from "@google-cloud/logging-winston";
import winston from "winston";
import config from "./config";

const transports: any[] = [];

if (config.get("NODE_ENV") === "production") {
  const loggingWinston = new LoggingWinston({
    level: "info",
    credentials: JSON.parse(config.get("GCP_SERVICE_ACCOUNT_KEY")),
  });
  transports.push(loggingWinston);
}
transports.push(new winston.transports.Console());

export const logger = winston.createLogger({
  level: "info",
  transports,
  format:
    config.get("NODE_ENV") !== "production"
      ? winston.format.simple()
      : winston.format.json(),
});

export const appLogger = () =>
  expressWinston.logger({
    winstonInstance: logger,
    level: "info",
    meta: true,
    colorize: config.get("NODE_ENV") !== "production",
  });

export const appErrorLogger = () =>
  expressWinston.errorLogger({
    winstonInstance: logger,
    level: "info",
  });
