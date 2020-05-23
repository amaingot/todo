import convict from "convict";

// Let's try to keep this list alphabetized for readability
/* eslint sort-keys: "error" */
const configurationSchema = {
  ENVIRONMENT: {
    default: "local",
    doc: "The current environment",
    env: "ENVIRONMENT",
    format: ["prod", "staging", "local"],
  },
  FIREBASE_APP_CONFIG: {
    default: "",
    doc: "Config for the Firebase App",
    env: "FIREBASE_APP_CONFIG",
    format: String
  },
  GCP_PROJECT_ID: {
    default: "hmm-dev",
    doc: "GCP Project ID for where this will run",
    env: "GCP_PROJECT_ID",
    format: String,
  },
  GCP_BIGQUERY_DATASET_ID: {
    default: "",
    doc: "GCP BigQuery Dataset ID",
    env: "GCP_BIGQUERY_DATASET_ID",
    format: String,
  },
  GCP_SERVICE_ACCOUNT_KEY: {
    default: "",
    doc: "JSON string of the GCP service account key",
    env: "GCP_SERVICE_ACCOUNT_KEY",
    format: String,
    sensitive: true,
  },
  GCP_IDP_TENANT_ID: {
    default: "",
    doc: "Tenant id for GCP Identity Provider",
    env: "GCP_IDP_TENANT_ID",
    format: String,
  },
  NODE_ENV: {
    // ref: http://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
    default: "development",
    doc: "Specifies the environment in which an application is running",
    env: "NODE_ENV",
    format: ["development", "production"],
  },
  POSTGRES_DATABASE: {
    default: "todo-local",
    doc: "Name of the postgres database for the sink job",
    env: "POSTGRES_DATABASE",
    format: String,
  },
  POSTGRES_HOST: {
    default: "localhost",
    doc: "Hostname or IP address of the postgres server",
    env: "POSTGRES_HOST",
    format: String,
  },
  POSTGRES_PASSWORD: {
    default: "",
    doc: "Password for the Postgres sink database",
    env: "POSTGRES_PASSWORD",
    format: String,
    sensitive: true,
  },
  POSTGRES_PORT: {
    default: 5432,
    doc: "Password for the Postgres sink database",
    env: "POSTGRES_PORT",
    format: Number,
  },
  POSTGRES_USERNAME: {
    default: "postgres",
    doc: "Username for the Postgres sink database",
    env: "POSTGRES_USERNAME",
    format: String,
  },

  SHA: {
    default: "no-sha-provided",
    doc: "Specifies the sha of the current version of the application",
    env: "SHA",
    format: String,
  },
};

const configuration = convict(configurationSchema);

type Schema = typeof configuration extends convict.Config<infer T> ? T : never;

// Ensure type safety of keys we `get`.
export default {
  get<K extends keyof Schema>(key: K) {
    return configuration.get(key);
  },
  getSchema: configuration.getSchema.bind(configuration),
  load: configuration.load.bind(configuration),
  set: configuration.set.bind(configuration),
  toString: configuration.toString.bind(configuration),
};
