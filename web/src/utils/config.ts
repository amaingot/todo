const config = {
  TENANT_ID:
    process.env.NODE_ENV === "production"
      ? window.App.TENANT_ID
      : process.env.REACT_APP_TENANT_ID || "",
};

export default config;
