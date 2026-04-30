import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', msg => {
    if (msg.type() === 'error') errors.push('console.error: ' + msg.text());
});

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1200));

const perspectiveDir = '../../../.claude/team/perspective/cathy';
await page.screenshot({ path: `${perspectiveDir}/lab-default.png`, fullPage: false });

const sidebarLinks = await page.$$eval('nav a', els => els.length);
const headerText = await page.$eval('header', el => el.textContent);

console.log('viewport: 1440x900');
console.log('header:', headerText.trim().replace(/\s+/g, ' '));
console.log('sidebar links:', sidebarLinks);
console.log('errors during load:', errors.length === 0 ? 'none' : errors);

const beforeData = await page.evaluate(() => document.querySelector('[data-section]')?.getAttribute('data-section'));
console.log('before click — data-section attr:', beforeData);

await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a'));
    const target = links.find(a => a.textContent?.includes('III.3'));
    if (target) (target).click();
});
await new Promise(r => setTimeout(r, 800));

const afterPath = await page.evaluate(() => location.pathname);
const afterData = await page.evaluate(() => document.querySelector('[data-section]')?.getAttribute('data-section'));
console.log('after click III.3 — pathname:', afterPath);
console.log('after click III.3 — data-section attr:', afterData);

await page.screenshot({ path: `${perspectiveDir}/lab-iii-3.png`, fullPage: false });

const html = await page.content();
const fs = await import('node:fs/promises');
await fs.writeFile(`${perspectiveDir}/lab-default.html`, html);
console.log('saved to perspective folder');

await browser.close();
