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

// Inspect lab instance directly (lab is exposed on window for debugging)
const labState = await page.evaluate(() => {
    const lab = window.$lab;
    if (!lab) return { error: 'no $lab on window' };
    const desc = Object.getOwnPropertyDescriptor(lab, '$activeSection');
    return {
        section: lab.$activeSection,
        descriptorKind: desc ? (desc.get ? 'accessor' : 'data') : 'inherited',
    };
});
console.log('lab inspection:', labState);

const perspectiveDir = '../../../.claude/team/perspective/cathy';
await page.screenshot({ path: `${perspectiveDir}/lab-default.png`, fullPage: false });

const sidebarLinks = await page.$$eval('nav button', els => els.length);
const headerText = await page.$eval('header', el => el.textContent);
const breadcrumb = await page.$eval('h1', el => el.textContent);

console.log('viewport: 1440x900');
console.log('header:', headerText.trim().replace(/\s+/g, ' '));
console.log('main heading:', breadcrumb.trim().replace(/\s+/g, ' '));
console.log('sidebar buttons:', sidebarLinks);
console.log('errors during load:', errors.length === 0 ? 'none' : errors);

// Inspect data-section before click
const beforeData = await page.evaluate(() => document.querySelector('[data-section]')?.getAttribute('data-section'));
console.log('before click — data-section attr:', beforeData);

// Click § III.3 (the binding constructor) to verify navigation
await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('nav button'));
    const target = buttons.find(b => b.textContent.includes('III.3'));
    if (target) target.click();
});
await new Promise(r => setTimeout(r, 800));

const afterUrl = await page.evaluate(() => location.hash);
const afterData = await page.evaluate(() => document.querySelector('[data-section]')?.getAttribute('data-section'));
const afterHeading = await page.$eval('h1', el => el.textContent);
console.log('after click III.3 — hash:', afterUrl);
console.log('after click III.3 — data-section attr:', afterData);
console.log('after click III.3 — heading:', afterHeading.trim().replace(/\s+/g, ' '));

await page.screenshot({ path: `${perspectiveDir}/lab-iii-3.png`, fullPage: false });

const html = await page.content();
const fs = await import('node:fs/promises');
await fs.writeFile(`${perspectiveDir}/lab-default.html`, html);
console.log('saved to perspective folder');

await browser.close();
