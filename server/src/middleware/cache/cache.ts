import { RequestHandler} from "express";
import Cache from "node-cache"

// Init cache, with opt to set time to run api after 15mins
export const scrapeCache = new Cache({stdTTL: 60 * 15})

/*
  Fix: 
    Cache is suppose to be void but need this return to stop the next func from running.
    Without return statement, next is run, and the whole route file is re-run. Which bugs trying to set headers again.

  Time to scrap:
    Initial time for scraper is about 15s - 20s.

    Once data is cached, it takes around 1ms - 2ms to fetch data. 

    After 15mins the Cache destroys and re-calls the scraper.

    Note:
      Youtube trending page roughly changes every 15mins.

     
    
*/

export const scrapeCacheMiddleWare: RequestHandler = (req, res, next) => {
    try {
        
        if (scrapeCache.has("scrape-data")) {

          console.log("Cache Key exists: ", true);
          res.send(scrapeCache.get("scrape-data"));
          return;
        }
          console.log("Cache Key doesn't exist, will generate now.");
          
          next();

    } catch (err) {
        console.log(err);
        throw err;
    }
}
