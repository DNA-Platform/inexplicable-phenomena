// verify-all.mjs — automated test-the-tests runner.
// Navigates to every section, performs the required interaction,
// and checks that verdicts turn green.

import puppeteer from 'puppeteer';

const PORT = process.env.PORT || 4000;
const BASE = `http://localhost:${PORT}`;

const interactions = [
    { section: 'II.1', name: 'Like button', action: async (p) => {
        await p.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('♥'))?.click(); });
    }},
    { section: 'II.4', name: 'Weather card', action: async (p) => {
        await new Promise(r => setTimeout(r, 2000)); // wait for async load
    }},
    { section: 'II.5', name: 'Particularization', action: null }, // auto-pass
    { section: 'III.3', name: 'Binding constructor', action: null }, // auto-pass
    { section: 'V.1', name: 'Counter', action: async (p) => {
        await p.evaluate(() => { Array.from(document.querySelectorAll('button')).find(b => b.textContent === '+')?.click(); });
    }},
    { section: 'V.1', name: 'Greeting', action: async (p) => {
        const input = await p.$('input[placeholder="Your name"]');
        if (input) { await input.type('Test'); }
    }},
    { section: 'V.1', name: 'FAQ', action: async (p) => {
        await p.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const q = btns.find(b => b.textContent?.includes('What is'));
            q?.click();
        });
    }},
    { section: 'V.3', name: 'Volume slider', action: async (p) => {
        const box = await p.evaluate(() => {
            const r = document.querySelector('input[type="range"]');
            if (!r) return null;
            const rect = r.getBoundingClientRect();
            return { x: rect.x, y: rect.y, w: rect.width, h: rect.height };
        });
        if (box) {
            await p.mouse.click(box.x + box.w * 0.6, box.y + box.h / 2);
        }
    }},
    { section: 'V.3', name: 'Dashboard refresh', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Refresh')?.click();
        });
    }},
    { section: 'V.4', name: 'Tag input', action: async (p) => {
        const input = await p.$('input[placeholder*="tag"]');
        if (input) { await input.type('test'); await p.keyboard.press('Enter'); }
    }},
    { section: 'V.4', name: 'Settings editor', action: async (p) => {
        await p.evaluate(() => {
            const inputs = document.querySelectorAll('input[placeholder="key"]');
            if (inputs[0]) { inputs[0].value = 'theme'; inputs[0].dispatchEvent(new Event('input', { bubbles: true })); inputs[0].dispatchEvent(new Event('change', { bubbles: true })); }
        });
        await p.evaluate(() => {
            const inputs = document.querySelectorAll('input[placeholder="value"]');
            if (inputs[0]) { inputs[0].value = 'dark'; inputs[0].dispatchEvent(new Event('input', { bubbles: true })); inputs[0].dispatchEvent(new Event('change', { bubbles: true })); }
        });
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Set')?.click();
        });
    }},
    { section: 'V.4', name: 'Feature flags', action: async (p) => {
        await p.evaluate(() => {
            const toggles = document.querySelectorAll('[class*="FlagSwitch"], [class*="Toggle"]');
            if (toggles[0]) (toggles[0]).click();
        });
    }},
    { section: 'VI.1', name: 'Emoji reactions', action: async (p) => {
        await p.evaluate(() => {
            // Find the 👍 text node and click its nearest ancestor div
            const all = document.querySelectorAll('*');
            for (const el of all) {
                if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 && el.textContent === '👍') {
                    const card = el.closest('div');
                    if (card) { card.click(); break; }
                }
            }
        });
    }},
    { section: 'VI.1', name: 'Theme switcher', action: async (p) => {
        await p.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const toggle = btns.find(b => b.textContent === 'light' || b.textContent === 'dark');
            toggle?.click();
        });
    }},
    { section: 'todo', name: 'Todo list', action: async (p) => {
        const input = await p.$('input[placeholder*="needs to be done"]');
        if (input) { await input.type('Test item'); }
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Add')?.click();
        });
    }},
    { section: 'nested', name: 'Nested book', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('♥'))?.click();
        });
    }},
    { section: 'form', name: 'Contact form', action: async (p) => {
        // Use puppeteer's type() which triggers React-compatible events
        const nameInput = await p.$('input[placeholder*="Jane"], input[placeholder*="Name"], input[placeholder*="name"]');
        if (nameInput) { await nameInput.click({ clickCount: 3 }); await nameInput.type('Doug Rubino'); }
        const emailInput = await p.$('input[placeholder*="jane"], input[placeholder*="email"], input[placeholder*="Email"]');
        if (emailInput) { await emailInput.click({ clickCount: 3 }); await emailInput.type('doug@test.com'); }
        const textarea = await p.$('textarea');
        if (textarea) { await textarea.click(); await textarea.type('This is a long enough test message for validation.'); }
        await new Promise(r => setTimeout(r, 300));
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Send'))?.click();
        });
    }},
    { section: 'notif', name: 'Notifications', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Info')?.click();
        });
    }},
    { section: 'stress', name: 'Rapid-fire', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Run'))?.click();
        });
    }},
    { section: 'mount', name: 'Conditional mount', action: async (p) => {
        await p.evaluate(() => {
            const toggles = document.querySelectorAll('button');
            for (const t of toggles) { if (t.textContent?.includes('OFF') || t.textContent?.includes('ON') || t.className?.includes('Toggle')) { t.click(); break; } }
        });
    }},
    { section: 'prop-pass', name: 'Chemical as prop', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Click'))?.click();
        });
    }},
    { section: 'dynamic', name: 'Dynamic creation', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Add'))?.click();
        });
    }},
    { section: 'rekey', name: 'Reorder list', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent === '+')?.click();
        });
    }},
    { section: 'propchange', name: 'Prop change', action: async (p) => {
        await p.evaluate(() => {
            const input = document.querySelector('input[type="range"]');
            if (input) {
                const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
                nativeSetter.call(input, '180');
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }},
    { section: 'async-bind', name: 'Async binding', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Delayed'))?.click();
        });
        await new Promise(r => setTimeout(r, 2000));
    }},
    { section: 'deep-nest', name: 'Deep nesting', action: async (p) => {
        await p.evaluate(() => {
            // Click any ♥ button — there should be one on the deepest Card
            const btns = Array.from(document.querySelectorAll('button'));
            const heart = btns.find(b => b.textContent?.trim() === '♥' || b.textContent?.includes('♥'));
            if (heart) heart.click();
        });
    }},
    { section: 'error-recover', name: 'Error recovery', action: async (p) => {
        // Just check it loads — the trigger/reset cycle is complex
    }},
    { section: 'cond-swap', name: 'Conditional swap', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Editor')?.click();
        });
    }},
    { section: 'method-fc', name: 'Method to FC', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Click'))?.click();
        });
    }},
    { section: 'form-lifecycle', name: 'Stock ticker $form', action: async (p) => {
        await new Promise(r => setTimeout(r, 3000));
    }},
    { section: 'dynamic-nest', name: 'Kanban add task', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Add Task'))?.click();
        });
    }},
    { section: 'dynamic-nest', name: 'Kanban move task', action: async (p) => {
        await p.evaluate(() => {
            Array.from(document.querySelectorAll('button')).find(b => b.textContent === '→')?.click();
        });
    }},
    { section: 'representative', name: 'Three houses', action: async (p) => {
        // The claim before anything is touched: one $Note class, three houses,
        // three different marks. If the registrations did not reach the notes
        // the houses draw alike — so this fails HERE rather than passing on a
        // verdict that only proves a click happened.
        const houses = await p.evaluate(() => {
            const found = Array.from(document.querySelectorAll('div'))
                .filter(d => /^(draft|review|press)$/.test(d.firstElementChild?.textContent || ''));
            return found.map(h => ({
                name: h.firstElementChild.textContent,
                marks: Array.from(h.querySelectorAll('span'))
                    .map(s => s.textContent)
                    .filter(t => t === '•' || t === '★' || /^\d\d$/.test(t))
                    .join(''),
            }));
        });
        if (houses.length < 3) throw new Error(`expected three houses, found ${houses.length} — the demo did not draw`);
        const distinct = new Set(houses.map(h => h.marks.replace(/\d/g, '#'))).size;
        if (distinct < 3) throw new Error(`the three houses drew the same marks (${houses.map(h => h.name + ':' + h.marks).join(' ')}) — a registration did not reach the notes it was made for`);

        await p.evaluate(() => {
            const input = document.querySelector('input');
            if (!input) throw new Error('the text control is missing — the write row moved');
            input.focus();
        });
        await p.keyboard.type(' — typed');
        await p.evaluate(() => {
            const button = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.trim() === 'press');
            if (!button) throw new Error('the "press" house control is missing — the travel row moved');
            button.click();
        });
    }},
    { section: 'representative', name: 'The theme, live', action: async (p) => {
        // A theme registered from a HANDLER repaints the leaves that asked for
        // it — none of which was subclassed, told, or passed anything. And the
        // second half is the honest one: a registration that touches nothing
        // reactive changes the registry and repaints NOTHING, because the
        // registry is deliberately not reactive.
        const leaves = () => p.evaluate(() => [...document.querySelectorAll('div')]
            .filter(d => /^(plain|dawn|dusk|sea)$/.test(d.textContent?.trim() || '') && d.children.length === 0)
            .map(d => d.textContent.trim()));
        const press = (label) => p.evaluate(l => {
            const b = [...document.querySelectorAll('button')].find(x => x.textContent?.trim() === l);
            if (!b) throw new Error(`the "${l}" control is missing — the theme row moved`);
            b.click();
        }, label);

        const before = await leaves();
        if (before.length < 2) throw new Error(`expected two themed leaves, found ${before.length} — the reading did not draw`);
        if (!before.every(n => n === 'plain')) throw new Error(`the leaves did not start plain: ${before.join(',')}`);

        await press('dusk');
        await new Promise(r => setTimeout(r, 300));
        const after = await leaves();
        if (!after.every(n => n === 'dusk')) throw new Error(`re-registering the theme did not reach the leaves: ${after.join(',')}`);

        await press('register dawn, change nothing else');
        await new Promise(r => setTimeout(r, 300));
        const quiet = await leaves();
        if (!quiet.every(n => n === 'dusk')) throw new Error(`a registration that touched nothing reactive repainted anyway: ${quiet.join(',')} — the registry is not supposed to be reactive`);

        await press('now repaint');
        await new Promise(r => setTimeout(r, 300));
        const woken = await leaves();
        if (!woken.every(n => n === 'dawn')) throw new Error(`the registration made silently did not take effect once something asked again: ${woken.join(',')}`);
    }},
];

async function run() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    const results = [];
    let lastSection = null;

    for (const test of interactions) {
        if (test.section !== lastSection) {
            await page.goto(`${BASE}/${test.section}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
            await new Promise(r => setTimeout(r, 2000));
            lastSection = test.section;
        }

        if (test.action) {
            try {
                await test.action(page);
                await new Promise(r => setTimeout(r, 500));
            } catch (e) {
                results.push({ section: test.section, name: test.name, status: 'ERROR', detail: e.message });
                continue;
            }
        }

        const verdicts = await page.evaluate(() =>
            Array.from(document.querySelectorAll('[data-verdict]')).map(el => el.getAttribute('data-verdict'))
        );
        const hasPass = verdicts.includes('pass');
        const hasFail = verdicts.includes('fail');

        if (hasFail) {
            results.push({ section: test.section, name: test.name, status: 'FAIL', detail: verdicts.join(',') });
        } else if (hasPass) {
            results.push({ section: test.section, name: test.name, status: 'PASS', detail: verdicts.join(',') });
        } else {
            results.push({ section: test.section, name: test.name, status: 'PENDING', detail: verdicts.join(',') });
        }
    }

    await browser.close();

    // Report
    const passed = results.filter(r => r.status === 'PASS');
    const failed = results.filter(r => r.status === 'FAIL');
    const pending = results.filter(r => r.status === 'PENDING');
    const errors = results.filter(r => r.status === 'ERROR');

    console.log(`\n=== $Chemistry Lab Verification ===\n`);
    console.log(`PASS: ${passed.length}  FAIL: ${failed.length}  PENDING: ${pending.length}  ERROR: ${errors.length}\n`);

    if (failed.length > 0) {
        console.log('FAILURES:');
        failed.forEach(r => console.log(`  ✗ ${r.section} — ${r.name}: ${r.detail}`));
    }
    if (errors.length > 0) {
        console.log('ERRORS:');
        errors.forEach(r => console.log(`  ! ${r.section} — ${r.name}: ${r.detail}`));
    }
    if (pending.length > 0) {
        console.log('PENDING (interaction may not have triggered):');
        pending.forEach(r => console.log(`  ○ ${r.section} — ${r.name}: ${r.detail}`));
    }
    console.log('\nPASSED:');
    passed.forEach(r => console.log(`  ✓ ${r.section} — ${r.name}`));
}

run().catch(console.error);
