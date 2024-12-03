import { db } from "./db"
import express from "express"
import dotenv from "dotenv"
dotenv.config()

export const router: express.Router = express.Router()

router.use((req, res, next) => {
    res.append('access-control-allow-origin', "*");
    res.append('access-control-allow-methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.append('access-control-allow-headers', 'access-control-allow-origin, Content-Type');
    next();
})

router.get('/getTest', async (req, res) => {
    const database = await db()
    const data = await database.getTest()

    console.log(data);
    
    res.json(data)
})




// async (req, res) => {
//     try {
//       const response = await ScraperV1();
//       const data = await JSON.parse(response)
//       res.json(data);
//     } catch (error) {
//       res.status(500).json({ error: 'Something went wrong!' });
//     }
// }