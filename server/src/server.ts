import express, { RequestHandler } from "express"

import { router, scrapeController } from "./router";
import { scrapeCacheMiddleWare } from "./middleware/cache/cache";

export const server = express();

server.use(router);




server.get('/', (req, res) => {
    res.sendStatus(200)
});