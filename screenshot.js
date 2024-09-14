const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the Figma prototype URL
  await page.goto('https://www.figma.com/proto/TppRJapvw5I0GIwEJm6N4O/Responsive-Homepage?page-id=0%3A1&node-id=21-52&node-type=frame&viewport=668%2C-551%2C0.45&t=bl4Ln95PQaINRo55-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=26%3A94', {
    waitUntil: 'networkidle2'
  });

  // Wait for a short delay to ensure everything loads properly
  await page.waitForFunction(() => document.readyState === 'complete');

  // Get the height of the page for full-page capture
  const bodyHandle = await page.$('body');
  const { height } = await bodyHandle.evaluate(body => {
    return { height: body.scrollHeight };
  });
  await bodyHandle.dispose();

  // Set viewport to a reasonably large size to ensure full content capture
  await page.setViewport({ width: 1920, height: height });

  // Capture the screenshot of the full page
  await page.screenshot({ path: 'figma_prototype_fullpage.png', fullPage: true });

  await browser.close();
})();
