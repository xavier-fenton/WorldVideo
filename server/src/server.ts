import express from "express"
import ScraperV1 from './scraper/index'


export const server = express();

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

  next();
});

server.use('/v1/scrape', async (req, res) => {
    
    
    try {
      const scrapeResponse = await ScraperV1();
      res.json(scrapeResponse);

    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }

});

server.get('/', (req, res) => {
    res.sendStatus(200)
});