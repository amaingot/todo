/// <reference types="react-scripts" />

interface Window extends Window {
  App: {
    FIREBASE_CONFIG: string;
    TENANT_ID: string;
  };
}
