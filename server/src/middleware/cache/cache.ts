import { NextFunction, Request, RequestHandler, Response } from "express";
import Cache from "node-cache"

// Init cache, with opt to set time to run api after 10mins
export const scrapeCache = new Cache({stdTTL: 60 * 10})




export const scrapeCacheMiddleWare: RequestHandler = (req, res, next) => {
    try {
        if (scrapeCache.has("scraped-data")) {
          return res.send(scrapeCache.get("crypto-list")).status(200);
        }
        return next();
      } catch (err) {
        console.log(err);
        throw err;
      }
}
