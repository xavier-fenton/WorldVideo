import express from "express"
import ScraperV1 from './scraper/index'


export const server = express()

server.use('/v1/api', async (req, res) => {
    try {
      const response = await ScraperV1();
      const data = await JSON.parse(response)
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong!' });
    }
})

server.get('/', (req, res) => {
    res.sendStatus(200)
})