import * as admin from "firebase-admin";
import config from "./config";

const app = admin.initializeApp({
  projectId: config.get("GCP_PROJECT_ID"),
  credential: admin.credential.applicationDefault(),
});

const TENANT_ID = config.get("GCP_IDP_TENANT_ID");

const auth = admin.auth(app).tenantManager().authForTenant(TENANT_ID);

export default auth;
