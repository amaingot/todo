import fs from "fs";
import path from "path";
import express, { Application } from "express";
import Mustache from "mustache";

import config from "./config";

const renderHtml = (app: Application) => {
  const assetPath =
    process.env.NODE_ENV === "production"
      ? path.join(__dirname, "../../assets")
      : path.join(__dirname, "../../../web/build");

  const rawHtml = fs.readFileSync(`${assetPath}/index.html`, "utf8");

  const TENANT_ID = config.get("GCP_IDP_TENANT_ID");

  const html = Mustache.render(rawHtml, {
    TENANT_ID,
  });

  app.use(express.static(path.join(__dirname, assetPath)));

  app.get("/*", (_req, res) => {
    res.send(html);
  });
};

export default renderHtml;
