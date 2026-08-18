// verify-check.mjs — proves check exceptions render as views after the $Exception change.
import puppeteer from 'puppeteer';

const PORT = process.env.PORT || 4199;
const url = `http://localhost:${PORT}/check.html`;

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1000));

const result = await page.evaluate(() => {
    const text = (sel) => document.querySelector(sel)?.textContent || '';
    return {
        control: text('[data-probe="control"]'),
        checkType: text('[data-probe="check-type"]'),
        doorThrow: text('[data-probe="door-throw"]'),
    };
});

await browser.close();

const checks = [
    ['control renders normally', result.control.includes('probe holds: hello')],
    ['check type mismatch renders the exception view', result.checkType.includes('Bond Constructor Failed')],
    ['check message carries the formatted signature', result.checkType.includes('Validation Failed') && result.checkType.includes('$Strict')],
    ['door throw renders the exception view', result.doorThrow.includes('Bond Constructor Failed')],
    ['door prose reaches the view', result.doorThrow.includes('An empty fails validation at the door.')],
    ['no uncaught page errors', errors.length === 0],
];

let pass = true;
for (const [name, ok] of checks) {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}`);
    if (!ok) pass = false;
}
if (!pass) {
    console.log('--- raw ---');
    console.log(JSON.stringify(result, null, 1));
    console.log('page errors:', errors);
}
process.exit(pass ? 0 : 1);
