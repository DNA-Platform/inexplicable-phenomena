import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, 'package.json'));
const vite = join(dirname(require.resolve('vite/package.json')), 'bin', 'vite.js');

const server = spawn(process.execPath, [vite, '--port', '5199', '--strictPort'], {
    cwd: here,
    stdio: ['ignore', 'pipe', 'pipe'],
});
server.stderr.on('data', data => process.stderr.write(String(data)));

const url = 'http://localhost:5199';

const ready = async () => {
    for (let tries = 0; tries < 120; tries++) {
        try {
            const answer = await fetch(url);
            if (answer.ok) return;
        } catch { }
        await new Promise(r => setTimeout(r, 500));
    }
    throw new Error('vite never answered on 5199');
};

const stop = () => {
    if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/T', '/F']);
    else server.kill();
};

let failed = 0;
const check = (name, ok, saw) => {
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${ok ? '' : '  saw: ' + JSON.stringify(saw)}`);
    if (!ok) failed++;
};

try {
    await ready();
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.on('pageerror', error => console.error('PAGE ERROR:', error.message));

    await page.goto(`${url}/`, { waitUntil: 'networkidle0' });
    let text = await page.evaluate(() => document.body.innerText);
    check('the home page lists the sample book by its title: "Gauge Theory"', text.includes('Gauge Theory'), text);

    const internal = await page.$('a[href="/gauge-theory"]');
    check('the listing holds an internal ref to /gauge-theory', internal !== null, text);

    await page.evaluate(() => { window.__stays = true; });
    await internal.click();
    await page.waitForFunction(() => document.body.innerText.includes('Symmetry'), { timeout: 15000 });
    text = await page.evaluate(() => document.body.innerText);
    check('following it lands on the book: "Symmetry" stands on the page', text.includes('Symmetry'), text);
    check('the chapter titles stand too: "History"', text.includes('History'), text);

    const stayed = await page.evaluate(() => window.__stays === true);
    check('the ref travelled by the router, without a page load', stayed === true, stayed);

    const outward = await page.$eval('a[href="https://en.wikipedia.org/wiki/Gauge_theory"]', a => a.textContent);
    check('the external ref stands as a plain anchor to Wikipedia', outward === 'the original', outward);

    const nested = await page.evaluate(() => document.querySelector('a a') !== null);
    check('no anchor stands inside an anchor', nested === false, nested);

    await page.click('nav a[href="/"]');
    await page.waitForFunction(() => document.body.innerText.includes('the books the library holds'), { timeout: 15000 });
    text = await page.evaluate(() => document.body.innerText);
    check('the nav ref travels back to the home page by the router', text.includes('the books the library holds'), text);

    await browser.close();
} catch (error) {
    console.error('FAIL ', error.message);
    failed++;
} finally {
    stop();
}

process.exit(failed === 0 ? 0 : 1);
