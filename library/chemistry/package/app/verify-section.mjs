import puppeteer from 'puppeteer';

const sectionId = process.argv[2] || 'II.1';
const fileSlug = sectionId.replace(/\./g, '-');

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', msg => {
    if (msg.type() === 'error') errors.push('console.error: ' + msg.text());
});

await page.goto(`http://127.0.0.1:5173/${sectionId}`, { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1000));

const dataSection = await page.evaluate(() => document.querySelector('[data-section]')?.getAttribute('data-section'));
const symbol = await page.evaluate(() => document.querySelector('article span')?.textContent);
const caseIds = await page.evaluate((sid) => {
    const re = new RegExp(`^${sid.replace('.', '\\.')} \\/ \\d+$`);
    return Array.from(document.querySelectorAll('*'))
        .filter(el => re.test(el.textContent?.trim() || '') && el.children.length === 0)
        .map(el => el.textContent.trim());
}, sectionId);

console.log('section:', dataSection);
console.log('symbol on card:', symbol);
console.log('case IDs:', caseIds);
console.log('errors:', errors.length === 0 ? 'none' : errors);

const perspectiveDir = '../../../.claude/team/perspective/cathy';
await page.screenshot({ path: `${perspectiveDir}/lab-${fileSlug}.png`, fullPage: true });
console.log('saved:', `${perspectiveDir}/lab-${fileSlug}.png`);

await browser.close();
