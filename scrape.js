const { chromium } = require("playwright");

const seeds = [40,41,42,43,44,45,46,47,48,49];

async function scrape() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // Wait for table to load
    await page.waitForSelector("table");

    // Extract all numbers
    const nums = await page.$$eval("table td", tds =>
      tds.map(td => Number(td.innerText.trim())).filter(n => !isNaN(n))
    );

    const pageSum = nums.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} page sum =`, pageSum);
    grandTotal += pageSum;
  }

  console.log("FINAL TOTAL =", grandTotal);
  await browser.close();
}

scrape();
