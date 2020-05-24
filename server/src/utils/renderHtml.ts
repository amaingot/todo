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

  app.use(express.static(assetPath, { index: false }));

  app.get("/*", (_req, res) => {
    const rawHtml = fs.readFileSync(`${assetPath}/index.html`, "utf8");

    const html = Mustache.render(rawHtml, {
      TENANT_ID: config.get("GCP_IDP_TENANT_ID"),
      FIREBASE_CONFIG: config.get("FIREBASE_APP_CONFIG"),
    });
    console.log({ html });

    res.status(200).send(html);
  });
};

export default renderHtml;
