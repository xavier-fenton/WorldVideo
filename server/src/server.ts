import express from "express"
import ScraperV1 from './scraper/index'


export const server = express();

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