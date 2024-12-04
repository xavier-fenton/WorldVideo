import { chromium } from 'playwright';


export default async function ScraperV1() {
    // Launch a new instance of a Chromium browser with headless mode
    const browser = await chromium.launch({
        headless: true
    });

    // Create a new Playwright context to isolate browsing session
    const context = await browser.newContext();
    // Open a new page/tab within the context
    const page = await context.newPage();

    // Navigate to the youtube feed 
    await page.goto('https://www.youtube.com/feed/trending');

    let storeExtracted: Array<string | null> = [];    

    const locateVideos = page.locator("ytd-thumbnail.style-scope").all()

    const extractedAndStoreVideos = (await locateVideos).map(async (thumbnail) => 
    {
        const info = await thumbnail.locator('a#thumbnail').getAttribute('href')
        if(info !== null)
        {
            storeExtracted.push(info)
        }
        return info
    })

    await page.waitForTimeout(5000);
    
    const createDataStructure = storeExtracted.map((item, index) => {
        return {"id": index, "videoSrc": item}
    })


    


    await browser.close();

    

    return createDataStructure

}