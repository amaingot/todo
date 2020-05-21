/// <reference types="react-scripts" />

interface Window extends Window {
  App: {
    COOKIE_KEY: string;
    TENANT_ID: string;
  };
}
