import firebase, { User as FirebaseUser } from "firebase/app";
import "firebase/auth";

import config from "./config";

firebase.initializeApp(JSON.parse(config.FIREBASE_CONFIG));
firebase.auth().tenantId = config.TENANT_ID;

export type User = FirebaseUser;

export default firebase.auth();
