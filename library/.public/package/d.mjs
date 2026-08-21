import puppeteer from 'puppeteer';
const OUT = "C:/Users/dougl/AppData/Local/Temp/claude/c--Source-dna-platform-inexplicable-phenomena/4c80c163-7ecb-4781-9b54-907a7529866d/scratchpad";
const b = await puppeteer.launch({ headless: 'new', args: ['--window-size=1380,1000'] });
const p = await b.newPage();
await p.setViewport({ width: 1380, height: 1000 });
const errs = [];
p.on('pageerror', e => errs.push(String(e).slice(0, 220)));
const shots = [];
await p.goto('http://localhost:5310/', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 1200));
for (const name of ['The Algebra of Perspective', 'The Manifold', 'The Team', 'The Build']) {
    await p.goto('http://localhost:5310/', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 900));
    const ok = await p.evaluate(n => { const e = document.querySelector(`[data-book="${n}"]`); if (!e) return false; e.click(); return true; }, name);
    await new Promise(r => setTimeout(r, 2500));
    const t = await p.evaluate(() => document.body.innerText);
    console.log(name.padEnd(30), 'opened:', ok, '| chars:', t.length, '|', t.slice(0, 70).replace(/\n/g, ' '));
    await p.screenshot({ path: `${OUT}/demo-${name.split(' ').pop().toLowerCase()}.png` });
}
if (errs.length) console.log('PAGE ERRORS:', errs.slice(0, 4).join('\n  ~ '));
await b.close();
