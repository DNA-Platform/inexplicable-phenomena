import puppeteer from 'puppeteer';

const shots = process.argv[2];
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 1000 });

const console_ = [];
page.on('pageerror', e => console_.push('PAGEERROR: ' + e.message));
page.on('console', msg => {
    const t = msg.type();
    if (t === 'error' || t === 'warn' || t === 'warning') console_.push(t + ': ' + msg.text());
});

const report = {};
const skin = () => page.evaluate(() => document.querySelector('[data-skin]')?.getAttribute('data-skin') ?? null);
const chip = name => page.evaluate(n => {
    const b = [...document.querySelectorAll('button')].find(x => x.textContent?.trim() === n);
    if (b) b.click();
    return !!b;
}, name);
const readWords = () => page.evaluate(() => {
    const c = [...document.querySelectorAll('footer span')].find(s => /words/i.test(s.textContent ?? ''));
    return c ? parseInt(c.querySelector('b')?.textContent ?? '0', 10) : -1;
});

await page.goto('http://127.0.0.1:5199/', { waitUntil: 'networkidle2', timeout: 20000 });
await new Promise(r => setTimeout(r, 1200));
report.root = { skin: await skin(), isFullPage: await page.evaluate(() => !document.querySelector('nav')) };

await page.goto('http://127.0.0.1:5199/page', { waitUntil: 'networkidle2', timeout: 20000 });
await new Promise(r => setTimeout(r, 1000));
report.book = { skin: await skin(), katex: await page.evaluate(() => document.querySelectorAll('.katex').length), words: await readWords() };
if (shots) await page.screenshot({ path: shots + '/page-book.png', fullPage: true });

await chip('github');
await new Promise(r => setTimeout(r, 500));
report.github = { skin: await skin(), words: await readWords() };

await chip('night');
await new Promise(r => setTimeout(r, 500));
report.night = { skin: await skin(), words: await readWords() };

await chip('anatomy');
await new Promise(r => setTimeout(r, 600));
report.anatomy = {
    skin: await skin(),
    rows: await page.evaluate(() => document.querySelectorAll('[data-skin="anatomy"] > div').length),
    words: await readWords(),
    titleRow: await page.evaluate(() => document.body.innerText.includes('the title — parsed, not authored')),
};
if (shots) await page.screenshot({ path: shots + '/page-anatomy.png', fullPage: true });

await chip('edit');
await new Promise(r => setTimeout(r, 500));
const before = await readWords();
await page.click('textarea');
await page.keyboard.down('Control');
await page.keyboard.press('End');
await page.keyboard.up('Control');
await page.keyboard.type(' zebra');
await new Promise(r => setTimeout(r, 700));
report.editInAnatomy = { wordsBefore: before, wordsAfter: await readWords() };

await chip('book');
await new Promise(r => setTimeout(r, 500));
report.backToBook = { skin: await skin(), words: await readWords() };

await chip('the classes');
await new Promise(r => setTimeout(r, 500));
report.classes = { latex: await page.evaluate(() => document.body.innerText.includes('class $Latex')) };

await page.goBack();
await new Promise(r => setTimeout(r, 800));
report.browserBack = { url: page.url(), skin: await skin() };
await page.goForward();
await new Promise(r => setTimeout(r, 800));
report.browserForward = { url: page.url(), skin: await skin() };

await page.goto('http://127.0.0.1:5199/nonsense', { waitUntil: 'networkidle2', timeout: 20000 });
await new Promise(r => setTimeout(r, 600));
report.unknownRoute = { text: await page.evaluate(() => document.body.innerText.slice(0, 80)) };

report.console = console_;
console.log(JSON.stringify(report, null, 1));
await browser.close();
