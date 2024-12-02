import axios from "axios";
import * as cheerio from "cheerio";

// const response = await axios.get("https://web-scraping.dev/product/1");
const response = await axios.get("https://youtube.com");


const selector = cheerio.load(response.data);

console.log({
    "h3": selector("h3").first().text(),    
});

