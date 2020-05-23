import WebSocket from "ws";
import { Request, Response } from "express";
import admin from "firebase-admin";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

import auth from "../utils/auth";
import { logger } from "../utils/logger";

interface CurrentUser {
  userId?: string;
}

interface GraphqlContextParams {
  expressContext?: ExpressContext;
  webSocket?: WebSocket;
  authToken?: string;
}

export class GraphqlContext {
  public readonly req: Request | undefined;
  public readonly res: Response | undefined;
  public readonly webSocket: WebSocket | undefined;

  private readonly _authToken: string | undefined;
  private _decodedToken: admin.auth.DecodedIdToken | undefined;
  private _currentUser: CurrentUser;

  constructor(params: GraphqlContextParams) {
    const { req, res } = params.expressContext || {};
    this.req = req;
    this.res = res;
    this._currentUser = {};
    this._authToken = params.authToken;
    this.webSocket = params.webSocket;
  }

  private get rawToken() {
    return this.req?.header("Authorization") || this._authToken || undefined;
  }

  public get token() {
    return this._decodedToken;
  }

  public get currentUser() {
    return this._currentUser;
  }
  async parseToken() {
    const rawToken = this.rawToken;

    if (rawToken) {
      try {
        this._decodedToken = await auth.verifyIdToken(rawToken);
        this._currentUser.userId = this._decodedToken?.uid;
      } catch (e) {
        logger.error("Invalid auth token", {
          req: this.req,
          res: this.res,
          rawToken,
        });
      }
    }
  }
}
