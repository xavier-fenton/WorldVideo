import { chromium } from 'playwright';


async function main() {
    // Launch a new instance of a Chromium browser with headless mode
    // disabled for visibility
    const browser = await chromium.launch({
        headless: true
    });

    // Create a new Playwright context to isolate browsing session
    const context = await browser.newContext();
    // Open a new page/tab within the context
    const page = await context.newPage();

    // Navigate to the youtube feed 
    await page.goto('https://www.youtube.com/feed/trending');

    let storeLinks: Array<string | null> = [];    

    const locateVideos = page.locator("ytd-thumbnail.style-scope").all()

    const extractedVideos = (await locateVideos).map(async (thumbnail) => 
    {
        const info = await thumbnail.locator('a#thumbnail').getAttribute('href')
        if(info !== null)
        {
            storeLinks.push(info)
        }
    })

    await page.waitForTimeout(5000);
    
    console.log(storeLinks);


    // Close the browser instance after task completion
    await browser.close();
    }

// Execute the main function
main();