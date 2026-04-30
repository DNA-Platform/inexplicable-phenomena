import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', msg => {
    if (msg.type() === 'error') errors.push('console.error: ' + msg.text());
});

await page.goto('http://127.0.0.1:5173/II.5', { waitUntil: 'networkidle2', timeout: 15000 });
await new Promise(r => setTimeout(r, 1000));

const dataSection = await page.evaluate(() => document.querySelector('[data-section]')?.getAttribute('data-section'));
console.log('data-section:', dataSection);

const caseIds = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll('*'));
    return all.filter(el => /^II\.5 \/ \d+$/.test(el.textContent?.trim() || '') && el.children.length === 0)
        .map(el => el.textContent.trim());
});
console.log('case IDs found:', caseIds);

const expectedCount = await page.evaluate(() =>
    Array.from(document.querySelectorAll('strong')).filter(e => e.textContent.trim() === 'Expected.').length
);
console.log('"Expected." labels:', expectedCount);

const passCount = await page.evaluate(() =>
    Array.from(document.querySelectorAll('*')).filter(e =>
        e.children.length === 0 && e.textContent?.trim().startsWith('Pass if')
    ).length
);
const failCount = await page.evaluate(() =>
    Array.from(document.querySelectorAll('*')).filter(e =>
        e.children.length === 0 && e.textContent?.trim().startsWith('Fail if')
    ).length
);
console.log('pass criteria:', passCount, '· fail criteria:', failCount);

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
console.log('<pre> source blocks visible:', sourceVisible);

const perspectiveDir = '../../../.claude/team/perspective/cathy';
await page.screenshot({ path: `${perspectiveDir}/lab-ii-5.png`, fullPage: true });
console.log('saved screenshot');
console.log('errors:', errors.length === 0 ? 'none' : errors);

await browser.close();
