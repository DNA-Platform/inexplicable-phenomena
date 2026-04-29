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
await new Promise(r => setTimeout(r, 1000));

// Click § II.5
await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('nav button'));
    const target = buttons.find(b => b.textContent.includes('II.5'));
    if (target) target.click();
});
await new Promise(r => setTimeout(r, 800));

const afterData = await page.evaluate(() => document.querySelector('[data-section]')?.getAttribute('data-section'));
console.log('after click II.5 — data-section:', afterData);

const caseHeadings = await page.$$eval('h2', els => els.map(e => e.textContent.trim()));
console.log('h2 headings on page:');
caseHeadings.forEach(t => console.log('  -', t));

const caseIds = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    return all.filter(el => /^II\.5 \/ \d+$/.test(el.textContent?.trim() || '') && el.children.length === 0)
        .map(el => el.textContent.trim());
});
console.log('case IDs found:', caseIds);

const passFailCount = await page.evaluate(() => ({
    pass: document.querySelectorAll('span').length > 0
        ? Array.from(document.querySelectorAll('*')).filter(e => e.textContent?.startsWith('Pass if')).length
        : 0,
    fail: Array.from(document.querySelectorAll('*')).filter(e => e.textContent?.startsWith('Fail if')).length,
}));
console.log('pass/fail criteria visible:', passFailCount);

const expectedCount = await page.evaluate(() =>
    Array.from(document.querySelectorAll('strong')).filter(e => e.textContent.trim() === 'Expected.').length
);
console.log('"Expected." labels:', expectedCount);

// Click first source toggle to verify it works
const toggleClicked = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('source'));
    if (btn) { btn.click(); return btn.textContent.trim(); }
    return null;
});
console.log('source toggle clicked:', toggleClicked);
await new Promise(r => setTimeout(r, 200));

const sourceVisible = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('pre')).filter(p => p.textContent.includes('$Particle')).length;
});
console.log('<pre> source blocks visible after toggle:', sourceVisible);

const perspectiveDir = '../../../.claude/team/perspective/cathy';
await page.screenshot({ path: `${perspectiveDir}/lab-ii-5.png`, fullPage: true });
console.log('saved screenshot to', `${perspectiveDir}/lab-ii-5.png`);
console.log('errors:', errors.length === 0 ? 'none' : errors);

await browser.close();
