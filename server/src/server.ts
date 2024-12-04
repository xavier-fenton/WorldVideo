import express, { RequestHandler } from "express"
import ScraperV1 from './middleware/scraper/index'
import { scrapeCache, scrapeCacheMiddleWare } from "./middleware/cache/cache";

import { Router } from "express";

const router = Router(); 
export const server = express();


server.use(router);
// Add headers before the routes are defined
server.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  console.log("API HIT @: ",logEntry); // Log to console
  next();
});

const fetchScraper = async () => {
    try {
      const res = await ScraperV1();
      return res;
      
    } catch (error) {
      
    }
}

const scrapeApi = async (amount: number) => {
  try {

    const result = await fetchScraper();
    if(!result) throw new Error('Error in scrapeApi Func')
    return result.slice(0, amount);

  } catch (err) {
    console.log(err);
    throw err;
  }
};

const scrapeController: RequestHandler = async (req, res) => {
  try {

      const data = await scrapeApi(10);
      scrapeCache.set("scrape-data", data);
      res.send(data);
      res.status(200);

  } catch (err) {

      res.status(500);
      console.log(err);
      throw err;

    }
};

/*
  TODO:
    NOTE: First instance when running this server, the api call takes about 17s - 20s to run and scrape the data.
          I think the caching works, because we can see that the after the first instance the time has dropped to 10s - 12s to fetch data.
          But I'd assume that it should be faster.

*/


router.get('/v1/scrape', scrapeCacheMiddleWare, scrapeController)


server.get('/', (req, res) => {
    res.sendStatus(200)
});