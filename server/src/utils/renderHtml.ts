import fs from "fs";
import path from "path";
import express, { Application } from "express";
import Mustache from "mustache";

import config from "./config";

const renderHtml = (app: Application) => {
  const assetPath =
    config.get("NODE_ENV") === "production"
      ? path.join(__dirname, "../../assets")
      : path.join(__dirname, "../../../web/build");

  const rawHtml = fs.readFileSync(`${assetPath}/index.html`, "utf8");

  const TENANT_ID = config.get("GCP_IDP_TENANT_ID");
  const FIREBASE_CONFIG = config.get("FIREBASE_APP_CONFIG");

  const html = Mustache.render(rawHtml, {
    TENANT_ID,
    FIREBASE_CONFIG,
  });

  app.use(express.static(assetPath));

  app.get("/*", (_req, res) => {
    res.send(html);
  });
};

export default renderHtml;
