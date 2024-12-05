import { RequestHandler, Router } from "express";
import ScraperV1 from "./middleware/scraper";
import { scrapeCache, scrapeCacheMiddleWare } from "./middleware/cache/cache";



export const router = Router(); 


// Add headers before the routes are defined
router.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});



const fetchScraper = async () => {
    try {
      const res = await ScraperV1();
      return res;
      
    } catch (error) {
      
        console.log(error);
      
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

/*
  Fix: 

*/

export const scrapeController: RequestHandler = async (req, res) => {
    try {
  
        const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
        console.log("API HIT @: ",logEntry); // Log to console
  
        const data = await scrapeApi(10);
        scrapeCache.set("scrape-data", data);
        
        
        res.status(200);
        res.send(data);
  
    } catch (err) {
  
        res.status(500);
        console.log(err);
        throw err;
  
      }
  };

router.get('/v1/scrape', scrapeCacheMiddleWare, scrapeController)