import puppeteer from 'puppeteer';

const url = process.env.URL || 'http://localhost:5199/styled';
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1500 });
const errors = [];
page.on('console', m => { if (m.type() === 'error' && !m.text().includes('404')) errors.push(m.text()); });
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));

await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForSelector('[data-demo="one"] section', { timeout: 20000 });
await new Promise(r => setTimeout(r, 600));

const checks = [];
const say = (name, ok, detail) => { checks.push({ name, ok }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} :: ${detail}`); };
const read = (sel, props) => page.evaluate((sel, props) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const out = { tag: el.tagName, cls: el.className, style: el.getAttribute('style'), text: el.textContent };
    for (const p of props) out[p] = cs[p];
    return out;
}, sel, props);
const click = async (label) => {
    const [btn] = await page.$$(`xpath///button[normalize-space(text())=${JSON.stringify(label)}]`);
    if (!btn) throw new Error('no button ' + label);
    await btn.click();
    await new Promise(r => setTimeout(r, 350));
};

const card = await read('[data-demo="one"] section', ['backgroundColor', 'borderRadius', 'padding', 'fontFamily', 'color']);
say('the selector is the element, no style attribute', !!card && card.tag === 'SECTION' && card.cls !== '' && card.style === null, `${card?.tag} ${card?.padding} ${card?.backgroundColor}`);

const quote = await read('[data-demo="one"] blockquote', ['fontStyle', 'borderLeftColor']);
say('a different selector is a different element', !!quote && quote.tag === 'BLOCKQUOTE' && quote.fontStyle === 'italic', `${quote?.tag} ${quote?.fontStyle}`);

const warn = await page.evaluate(() => {
    const all = [...document.querySelectorAll('[data-demo="one"] section')];
    const el = all[all.length - 1];
    const cs = getComputedStyle(el);
    return { bg: cs.backgroundColor, color: cs.color, padding: cs.padding, radius: cs.borderRadius, font: cs.fontFamily };
});
say('a subclass inherits what it never declares', warn.padding === card.padding && warn.radius === card.borderRadius && warn.font === card.fontFamily, `padding ${warn.padding} vs ${card.padding}; radius ${warn.radius} vs ${card.borderRadius}; font ${warn.font} vs ${card.fontFamily}`);
say('a subclass replaces what it redeclares', warn.bg !== card.backgroundColor && warn.color !== card.color, `${card.backgroundColor}/${card.color} -> ${warn.bg}/${warn.color}`);

const swatchOf = (prop) => page.evaluate(prop => getComputedStyle(document.querySelector('[data-demo="two"] > div')) [prop], prop);
const bg0 = await swatchOf('backgroundColor');
await click('background');
const bg1 = await swatchOf('backgroundColor');
say('a bare name is live — writing it restyles', bg0 !== bg1, `${bg0} -> ${bg1}`);

const c0 = await swatchOf('color');
await click('$color');
const c1 = await swatchOf('color');
say('a $ name is live too', c0 !== c1, `${c0} -> ${c1}`);

const b0 = await swatchOf('borderLeftColor');
await click('_borderLeft');
const b1 = await swatchOf('borderLeftColor');
say('an _ name is inert — the write does not restyle', b0 === b1, `${b0} -> ${b1}`);

const given = await page.evaluate(() => {
    const el = [...document.querySelectorAll('[data-demo="two"] div')].find(e => e.textContent.includes('given $color'));
    return el ? getComputedStyle(el).color : null;
});
say('a $ name is a prop — given from outside in JSX', given === 'rgb(20, 134, 109)', String(given));

const widths = () => page.evaluate(() => [...document.querySelectorAll('[data-demo="three"] > div')].map(e => getComputedStyle(e).width));
const w0 = await widths();
await click('+');
const w1 = await widths();
say('the baked bar does not move', w0[0] === w1[0], `${w0[0]} -> ${w1[0]}`);
say('the promoted property moves', w0[1] !== w1[1], `${w0[1]} -> ${w1[1]}`);


const tiles = () => page.evaluate(() => [...document.querySelectorAll('[data-demo="four"] article')].map(e => getComputedStyle(e).backgroundColor));
const t0 = await tiles();
say('a scope answers the ask with another theme', t0[0] !== t0[1], `${t0[0]} vs ${t0[1]}`);
await click('switch theme');
const t1 = await tiles();
say('writing the theme repaints the styles', t0[0] !== t1[0], `${t0[0]} -> ${t1[0]}`);
say('the other scope is untouched', t0[1] === t1[1], `${t0[1]} -> ${t1[1]}`);

say('no console errors', errors.length === 0, errors.slice(0, 2).join(' | ') || 'none');

await page.screenshot({ path: process.env.SHOT || 'styled-lab.png', fullPage: true });
const pass = checks.filter(c => c.ok).length;
console.log(`\n${pass} PASS, ${checks.length - pass} FAIL`);
await browser.close();
process.exit(pass === checks.length ? 0 : 1);
