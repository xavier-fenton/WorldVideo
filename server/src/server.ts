import express from "express"
import ScraperV1 from './scraper/index'
import { router } from "./router"


export const server = express();

server.use('/', router);

server.get('/', (req, res) => {
    res.sendStatus(200)
});