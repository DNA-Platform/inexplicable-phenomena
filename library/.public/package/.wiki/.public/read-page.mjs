// READS THE REAL ARTICLE. Wikipedia's REST API serves Alan Turing as Parsoid HTML under CC BY-SA,
// the same licence the footer carries; this maps it into the book's chapter files — Sprint 63, U18.
// A demo is EVIDENCE, and a plausible substitute is what it must not be, so nothing here is invented:
// every paragraph, link, figure, quotation, hatnote and citation mark comes off the served article.
import { writeFile, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'file:///C:/Source/dna-platform/inexplicable-phenomena/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';

const here = dirname(fileURLToPath(import.meta.url));
// ONE READER FOR ANY PAGE: the page it reads and the book it writes are its two arguments.
//   node read-page.mjs https://en.wikipedia.org/wiki/Alan_Turing alan-turing
const page = process.argv[2] ?? 'https://en.wikipedia.org/wiki/Alan_Turing';
const book = join(here, '..', process.argv[3] ?? 'alan-turing');

const named = (heading) => heading.toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-|-$/gu, '');
const classed = (heading) => heading.replace(/[^A-Za-z0-9 ]/gu, '').split(/\s+/u).filter(Boolean)
    .map(one => one[0].toUpperCase() + one.slice(1)).join('');
const NEWLINE = String.fromCharCode(10);
const quoted = (copy) => copy.replace(/\{/gu, '&#123;').replace(/\}/gu, '&#125;');
const held = (tag, pad, inner, attributes = '') => [`${pad}<${tag}${attributes}>`, `${pad}    ${inner}`, `${pad}</${tag}>`].join(NEWLINE);

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const tab = await browser.newPage();
await tab.setViewport({ width: 1280, height: 900 });
await tab.goto(page, { waitUntil: 'networkidle0', timeout: 120000 });

const { sections: read, infobox, chrome, lists, order } = await tab.evaluate(() => {
    const body = document.querySelector('.mw-content-ltr');
    const absolute = (href) => href ? new URL(href, location.href).href.replace(/\(/gu, '%28').replace(/\)/gu, '%29') : '';
    // A KEY IS WHAT AN ENTRY MAY CARRY: word characters and hyphens. Wikipedia's ids are mostly that
    // and sometimes not, so every id is folded to it once here, for the mark and the entry alike.
    const keyed = (id) => id.replace(/[^\w-]/gu, '_');

    const inline = (node, apart = false) => {
        let said = '';
        for (const part of node.childNodes) {
            if (part.nodeType === 3) { said += part.textContent.replace(/</gu, '&lt;').replace(/>/gu, '&gt;'); continue; }
            if (part.nodeType !== 1) continue;
            const tag = part.tagName.toLowerCase();
            if (tag === 'br') { said += ' '; continue; }
            if (getComputedStyle(part).display === 'none') continue;
            if (tag === 'ul' || tag === 'ol') {
                if (!apart) said += [...part.children].filter(one => one.tagName === 'LI').map(one => inline(one).trim()).filter(Boolean).join(' · ');
                continue;
            }
            if (tag === 'sup' && part.classList.contains('reference')) {
                const key = keyed(part.querySelector('a')?.getAttribute('href')?.replace('#', '') ?? '');
                const mark = part.textContent.replace(/[[\]]/gu, '').trim();
                if (mark && key) said += `<Citation>[${mark}](${key})</Citation>`;
                continue;
            }
            if (part.classList.contains('mw-editsection') || tag === 'style' || tag === 'sup') continue;
            if (tag === 'a') {
                const href = part.getAttribute('href') ?? '';
                const words = part.textContent.replace(/[[\]()]/gu, '').replace(/</gu, '&lt;').replace(/>/gu, '&gt;').trim();
                if (!words.trim()) continue;
                const kind = part.classList.contains('external') ? 'OutwardLink' : 'BookLink';
                said += `<${kind}>[${words}](${absolute(href)})</${kind}>`;
                continue;
            }
            said += inline(part);
        }
        return said;
    };

    // AN ITEM IS ITS OWN WORDS AND THE LIST UNDER IT. The words are read from the item's parts
    // that are not a list; the list under it is read the same way, as deep as the page goes.
    const listed = (list) => [...list.children].filter(one => one.tagName === 'LI').map(item => {
        const under = [...item.children].filter(one => /^(UL|OL)$/u.test(one.tagName)).flatMap(one => listed(one));
        return { said: inline(item, true).replace(/\s+/gu, ' ').trim(), under };
    }).filter(one => one.said !== '' || one.under.length > 0);

    const sections = [];
    let current = { name: '', wrote: [] };
    sections.push(current);
    const wanted = '.mw-heading2, .mw-heading3, .mw-heading4, p, figure, blockquote, .hatnote, ul, ol';
    for (const node of body.querySelectorAll(wanted)) {
        if (node.closest('figure, blockquote, table, .infobox, .navbox, .mw-references-wrap') && !node.matches('figure, blockquote')) continue;
        if (node.matches('ul, ol') && (node.closest('.hatnote, .navbox, .sistersitebox, .side-box, nav') !== null || node.parentElement.closest('ul, ol') !== null)) continue;
        if (node.matches('figure, blockquote') && node.parentElement.closest('figure, blockquote, table, .infobox')) continue;
        const tag = node.tagName.toLowerCase();
        if (node.classList.contains('mw-heading2')) {
            current = { name: node.textContent.trim(), wrote: [] };
            sections.push(current);
            continue;
        }
        if (node.classList.contains('mw-heading3') || node.classList.contains('mw-heading4')) {
            current.wrote.push({ how: 'heading', deep: node.classList.contains('mw-heading4') ? 2 : 1, said: node.textContent.trim() });
            continue;
        }
        if (node.classList.contains('hatnote')) { const said = inline(node).trim(); if (said) current.wrote.push({ how: 'hatnote', said }); continue; }
        if (tag === 'figure') {
            const img = node.querySelector('img');
            if (!img) continue;
            current.wrote.push({
                how: 'figure', source: absolute(img.getAttribute('src')),
                wide: img.getAttribute('width') ?? '', tall: img.getAttribute('height') ?? '',
                said: (caption => caption === null ? '' : inline(caption).replace(/\s+/gu, ' ').trim())(node.querySelector('figcaption')),
            });
            continue;
        }
        if (tag === 'blockquote') { const said = inline(node).trim(); if (said) current.wrote.push({ how: 'quote', said }); continue; }
        if (tag === 'ul' || tag === 'ol') {
            const items = listed(node);
            if (items.length) current.wrote.push({ how: 'list', ordered: tag === 'ol', items });
            continue;
        }
        if (tag === 'p') { const said = inline(node).trim(); if (said) current.wrote.push({ how: 'paragraph', said }); }
    }
    // THE LISTS OF ENTRIES, each under the heading it stands under, and only the text of each — the
    // backlinks Wikipedia draws beside an entry are its own navigation, not the entry.
    const lists = [...document.querySelectorAll('ol.references')].map(ol => ({
        name: ol.closest('section')?.querySelector('.mw-heading2, .mw-heading3')?.textContent.trim() ?? 'References',
        entries: [...ol.querySelectorAll(':scope > li[id^="cite_note-"]')].map(li => {
            const text = li.querySelector('.reference-text, .mw-reference-text');
            return { key: keyed(li.id), said: text === null ? '' : inline(text).replace(/\s+/gu, ' ').trim() };
        }).filter(one => one.said !== ''),
    })).filter(one => one.entries.length > 0);
    const order = [...body.querySelectorAll('.mw-heading2')].map(one => one.textContent.trim());
    const box = document.querySelector('.infobox');
    const shown = box?.querySelector('.infobox-image img');
    const infobox = box === null ? null : {
        name: (box.querySelector('.infobox-above .fn') ?? box.querySelector('.infobox-above'))?.textContent.trim() ?? '',
        said: box.querySelector('.infobox-above .honorific-suffix, .infobox-subheader')?.textContent.trim() ?? '',
        source: absolute(shown?.getAttribute('src')),
        wide: shown?.getAttribute('width') ?? '',
        tall: shown?.getAttribute('height') ?? '',
        caption: box.querySelector('.infobox-caption')?.textContent.trim() ?? '',
        lines: [...box.querySelectorAll('tr')]
            .filter(row => row.querySelector('.infobox-label') && row.querySelector('.infobox-data'))
            .map(row => ({
                label: row.querySelector('.infobox-label').textContent.trim(),
                said: inline(row.querySelector('.infobox-data')).replace(/\s+/gu, ' ').trim(),
            })),
    };

    const linked = (node) => {
        const href = node.getAttribute('href') ?? '';
        const words = node.textContent.replace(/[[\]()]/gu, '').replace(/</gu, '&lt;').replace(/>/gu, '&gt;').replace(/\s+/gu, ' ').trim();
        return { words, where: absolute(href), outward: node.classList.contains('external') || /^https?:/u.test(href) && !href.includes('wikipedia.org') };
    };
    const all = (selector) => {
        const seen = new Set();
        return [...document.querySelectorAll(selector)].map(linked)
            .filter(one => one.words && one.where && !seen.has(one.where) && seen.add(one.where));
    };

    const chrome = {
        wordmark: absolute(document.querySelector('.mw-logo-wordmark')?.getAttribute('src')),
        taglineImage: absolute(document.querySelector('.mw-logo-tagline')?.getAttribute('src')),
        tagline: document.querySelector('.mw-logo-tagline')?.getAttribute('alt')
            ?? document.querySelector('.mw-logo-tagline')?.textContent.trim() ?? '',
        title: document.querySelector('#firstHeading')?.textContent.trim() ?? '',
        said: document.querySelector('#siteSub')?.textContent.trim() ?? '',
        about: document.querySelector('.shortdescription')?.textContent.trim() ?? '',
        menu: all('#vector-main-menu .vector-menu-content-list a, #mw-panel .vector-menu-content-list a'),
        people: all('.vector-user-links a, #p-personal a'),
        tongue: document.querySelector('#p-lang-btn .vector-dropdown-label-text')?.textContent.trim() ?? '',
        languages: all('.interlanguage-link > a'),
        tabs: all('#p-associated-pages a, #p-namespaces a'),
        doing: all('#p-views a'),
        tools: [...document.querySelectorAll('#vector-page-tools .vector-menu')].map(group => ({
            name: group.querySelector('.vector-menu-heading')?.textContent.trim() ?? '',
            links: [...group.querySelectorAll('.vector-menu-content-list a')].map(linked).filter(one => one.words && one.where),
        })).filter(group => group.name && group.links.length),
        foot: [...document.querySelectorAll('#footer-info li')].map(one => one.textContent.replace(/\s+/gu, ' ').trim()).filter(Boolean),
        places: all('#footer-places a'),
    };

    return { sections: sections.filter(one => one.wrote.length > 0), infobox, chrome, lists, order };
});
await browser.close();

const aside = infobox === null ? '' : [
    `                <Infobox>`,
    `                    <Heading>${quoted(infobox.name)}</Heading>`,
    ...(infobox.said ? [held('Paragraph', '                    ', quoted(infobox.said))] : []),
    ...(infobox.source ? [held('Illustration', '                    ', quoted(infobox.caption), ` source="${infobox.source}" width="${infobox.wide}" height="${infobox.tall}"`)] : []),
    ...infobox.lines.map(one => held('Line', '                    ', quoted(one.said), ` label="${one.label.replace(/"/gu, '')}"`)),
    `                </Infobox>`,
].join('\n');

const kinds = new Set();
// A LIST IS DRAWN AS DEEP AS IT WAS READ: an item with a list under it holds that list.
const list = (items, pad) => [
    `${pad}<List>`,
    ...items.map(item => item.under.length === 0
        ? `${pad}    <Item>${quoted(item.said)}</Item>`
        : [`${pad}    <Item>`, `${pad}        ${quoted(item.said)}`, list(item.under, `${pad}        `), `${pad}    </Item>`].join(NEWLINE)),
    `${pad}</List>`,
].join(NEWLINE);

const drawn = (one, pad = '                ') => {
    if (one.how === 'hatnote') { kinds.add('Hatnote'); return held('Hatnote', pad, quoted(one.said)); }
    if (one.how === 'quote') { kinds.add('Quote'); return held('Quote', pad, quoted(one.said)); }
    if (one.how === 'list') {
        kinds.add('List');
        return list(one.items, pad);
    }
    if (one.how === 'figure') {
        kinds.add('Illustration');
        return held('Illustration', pad, quoted(one.said), ` source="${one.source}" width="${one.wide}" height="${one.tall}"`);
    }
    return held('Paragraph', pad, quoted(one.said));
};

// A SUB-HEADING OPENS A SECTION INSIDE THE ONE ABOVE IT, as the article nests them, so a heading's
// level is read off where it stands and never said.
const nested = (wrote) => {
    const lines = [];
    const at = (depth) => '                ' + '    '.repeat(depth);
    let depth = 0;
    for (const one of wrote) {
        if (one.how === 'heading') {
            while (depth >= one.deep) { lines.push(`${at(depth - 1)}</Section>`); depth -= 1; }
            lines.push(`${at(depth)}<Section>`);
            depth += 1;
            lines.push(`${at(depth)}<Heading>${quoted(one.said)}</Heading>`);
            continue;
        }
        lines.push(drawn(one, at(depth)));
    }
    while (depth > 0) { lines.push(`${at(depth - 1)}</Section>`); depth -= 1; }
    return lines.join(NEWLINE);
};

await mkdir(book, { recursive: true });
const made = [];
// THE CHAPTERS STAND IN THE PAGE'S OWN ORDER: the lead, then every section as the article has
// them, whether it is prose or a list of entries. Notes and References are the lists; a citation
// mark finds its entry by the key both carry, and numbers itself by where the entry stands.
const chapters = [read[0], ...order.map(name => read.find(one => one.name === name) ?? lists.find(one => one.name === name)).filter(one => one !== undefined && one !== read[0])];
let at = 0;
for (const section of chapters) {
    if (section.entries !== undefined) {
        at += 1;
        const said = section.entries.map(one => held('Entry', '                    ', `${one.key}: ${quoted(one.said)}`)).join(NEWLINE);
        const listed = section.name === 'Notes' ? 'Notes' : 'References';
        const holds = [...new Set(['Entry', 'Heading', listed, 'Section', ...(said.includes('<Citation>') ? ['Citation'] : [])])].sort();
        const links = [...(said.includes('<BookLink>') ? ['BookLink'] : []), ...(said.includes('<OutwardLink>') ? ['OutwardLink'] : [])];
        const file = `${at}-${named(section.name)}.tsx`;
        await writeFile(join(book, file), [
            `import { ${holds.join(', ')} } from '@dna-platform/public';`,
            ...(links.length ? [`import { ${links.join(', ')} } from '../.chapter';`] : []),
            `import $Chapter from './.chapter';`,
            ``,
            `export default class $${classed(section.name)} extends $Chapter {`,
            `    print() {`,
            `        return (`,
            `            <${listed}>`,
            `                <Section>`,
            `                    <Heading>${quoted(section.name)}</Heading>`,
            said,
            `                </Section>`,
            `            </${listed}>`,
            `        );`,
            `    }`,
            `}`,
            ``,
        ].join(NEWLINE), 'utf8');
        made.push(`${file} — ${section.entries.length} entries`);
        continue;
    }
    at += 1;
    const said = nested(section.wrote);
    const whole = said + (at === 1 ? aside : '');
    const carries = [...new Set(['Document', 'Heading', 'Paragraph', ...(at === 1 && !said.includes('<Section>') ? [] : ['Section']),
        ...(at === 1 ? ['Illustration'] : []),
        ...(whole.includes('<Citation>') ? ['Citation'] : []),
        ...(whole.includes('<Illustration') ? ['Illustration'] : []),
        ...(whole.includes('<Quote>') ? ['Quote'] : []),
        ...(whole.includes('<List>') ? ['Item', 'List'] : [])])].sort();
    const outward = whole.includes('<OutwardLink>') ? ['OutwardLink'] : [];
    const inward = whole.includes('<BookLink>') ? ['BookLink'] : [];
    const file = `${at}-${named(section.name) || 'lead'}.tsx`;
    const lines = [
        `import { $ } from '@dna-platform/chemistry';`,
        `import { ${carries.join(', ')} } from '@dna-platform/public';`,
        ...((whole.includes('<Hatnote>') || at === 1) ? [`import { ${[...(at === 1 ? ['Infobox', 'Line'] : []), ...(whole.includes('<Hatnote>') ? ['Hatnote'] : [])].join(', ')} } from '@dna-platform/public/encyclopedia';`] : []),
        ...(inward.length || outward.length ? [`import { ${[...inward, ...outward].join(', ')} } from '../.chapter';`] : []),
        `import $Chapter from './.chapter';`,
        ``,
        `export default class $${classed(section.name) || 'Lead'} extends $Chapter {`,
        `    print() {`,
        `        return (`,
        `            <Document>`,
        ...(at === 1 ? [aside, said] : [
            `                <Section>`,
            `                <Heading>${quoted(section.name)}</Heading>`,
            said,
            `                </Section>`,
        ]),
        `            </Document>`,
        `        );`,
        `    }`,
        `}`,
        ``,
    ];
    await writeFile(join(book, file), lines.join('\n'), 'utf8');
    made.push(`${file} — ${section.wrote.length} pieces`);
}

// THE TITLE BLOCK, READ RATHER THAN WRITTEN. Everything above the fold on the real page — the bar,
// the menu, the field, the title, the languages, the tabs and the tools — comes off it here, so the
// demo says nothing the encyclopedia does not say itself.
const say = (one) => {
    const kind = one.outward ? 'OutwardLink' : 'BookLink';
    return `<${kind}>[${quoted(one.words)}](${one.where})</${kind}>`;
};
const holds = (one) => (one.outward ? 'OutwardLink' : 'BookLink');
const listed = (links, pad) => links.map(one => `${pad}${say(one)}`).join('\n');
// A MENU HOLDS PARAGRAPHS. A section written inside one is not a part a section admits — the
// levels say a section holds paragraphs — so the parser folded each group into a paragraph and
// the page drew a heading inside a <p>, sixty hydration errors' worth. A group is its name and
// its links, which is a heading and a paragraph, which is what a menu holds.
const grouped = (name, links, pad) => [
    `${pad}<Heading>${quoted(name)}</Heading>`,
    `${pad}<Paragraph>`,
    listed(links, `${pad}    `),
    `${pad}</Paragraph>`,
].join('\n');

const linkKinds = new Set(chrome.menu.concat(chrome.people, chrome.languages, chrome.tabs, chrome.doing,
    ...chrome.tools.map(one => one.links), chrome.places).map(holds));

const cover = [
    `import { Author, Cover, Description, Heading, Image, Paragraph, Reference, Section, Subject, Title } from '@dna-platform/public';`,
    `import { Header, Menu, Search, Summary, Toolbar } from '@dna-platform/public/application';`,
    `import { ${[...linkKinds].sort().join(', ')} } from '../.chapter';`,
    `import $Chapter from './.chapter';`,
    ``,
    `export default class $Cover extends $Chapter {`,
    `    print() {`,
    `        return (`,
    `            <Cover>`,
    `                <Header>`,
    `                    <Heading>Wikipedia</Heading>`,
    `                    <Menu>`,
    `                        <Summary><Description>Main menu</Description></Summary>`,
    grouped('Navigation', chrome.menu, '                        '),
    `                    </Menu>`,
    `                    <Section>`,
    `                        <Heading>${quoted(chrome.tagline)}</Heading>`,
    `                        <Image source="${chrome.wordmark}" width="140" height="22">Wikipedia</Image>`,
    `                        <Image source="${chrome.taglineImage}" width="140" height="11">${quoted(chrome.tagline)}</Image>`,
    `                    </Section>`,
    `                    <Search said="Search" where="https://en.wikipedia.org/w/index.php">Search Wikipedia</Search>`,
    `                    <Paragraph>`,
    listed(chrome.people, '                        '),
    `                    </Paragraph>`,
    `                </Header>`,
    `                <Title>`,
    `                    ${quoted(chrome.title)}`,
    `                    <Reference>${page}</Reference>`,
    `                </Title>`,
    `                <Author>Wikipedians</Author>`,
    `                <Subject>${quoted(chrome.about)}</Subject>`,
    `                <Menu>`,
    `                    <Summary>${quoted(chrome.tongue || `${chrome.languages.length} languages`)}</Summary>`,
    `                    <Paragraph>`,
    listed(chrome.languages, '                        '),
    `                    </Paragraph>`,
    `                </Menu>`,
    `                <Toolbar>`,
    `                    <Heading>${quoted(chrome.title)}</Heading>`,
    `                    <Paragraph>`,
    listed(chrome.tabs, '                        '),
    `                    </Paragraph>`,
    `                    <Paragraph>`,
    listed(chrome.doing, '                        '),
    `                    </Paragraph>`,
    `                    <Menu>`,
    `                        <Summary><Description>Tools</Description></Summary>`,
    chrome.tools.map(one => grouped(one.name, one.links, '                        ')).join('\n'),
    `                    </Menu>`,
    `                </Toolbar>`,
    `            </Cover>`,
    `        );`,
    `    }`,
    `}`,
    ``,
].join('\n');
await writeFile(join(book, '.cover.tsx'), cover, 'utf8');

const synopsis = [
    `import { Paragraph, Synopsis } from '@dna-platform/public';`,
    `import $Chapter from './.chapter';`,
    ``,
    `export default class $Synopsis extends $Chapter {`,
    `    print() {`,
    `        return (`,
    `            <Synopsis print>`,
    `                <Paragraph>${quoted(chrome.said)}</Paragraph>`,
    `            </Synopsis>`,
    `        );`,
    `    }`,
    `}`,
    ``,
].join('\n');
await writeFile(join(book, '.synopsis.tsx'), synopsis, 'utf8');

const foot = [
    `import { Footer, Heading, Paragraph } from '@dna-platform/public';`,
    `import { ${[...new Set(chrome.places.map(holds))].sort().join(', ') || 'OutwardLink'} } from '../.chapter';`,
    `import $Chapter from './.chapter';`,
    ``,
    `export default class $TheFoot extends $Chapter {`,
    `    print() {`,
    `        return (`,
    `            <Footer>`,
    `                <Heading>About this page</Heading>`,
    ...chrome.foot.map(one => `                <Paragraph>${quoted(one)}</Paragraph>`),
    `                <Paragraph>`,
    listed(chrome.places, '                    '),
    `                </Paragraph>`,
    `            </Footer>`,
    `        );`,
    `    }`,
    `}`,
    ``,
].join('\n');
await writeFile(join(book, `${at + 1}-the-foot.tsx`), foot, 'utf8');
made.push(`.cover.tsx — ${chrome.menu.length} menu, ${chrome.languages.length} languages, ${chrome.tabs.length + chrome.doing.length} tabs, ${chrome.tools.reduce((n, g) => n + g.links.length, 0)} tools`);
made.push(`${at + 1}-the-foot.tsx — ${chrome.foot.length} lines, ${chrome.places.length} links`);

const kebab = (said) => said.toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-|-$/gu, '');
const rows = chapters;
const row = (said, pad) => `${pad}<Paragraph><Ref>[${quoted(said)}](#${kebab(said)})</Ref></Paragraph>`;
const contents = [
    `import { $ } from '@dna-platform/chemistry';`,
    `import { Heading, Paragraph, Ref, Section, TableOfContents } from '@dna-platform/public';`,
    `import { Menu, Summary } from '@dna-platform/public/application';`,
    `import $Chapter from './.chapter';`,
    ``,
    `export default class $Contents extends $Chapter {`,
    `    print() {`,
    `        return (`,
    `            <TableOfContents>`,
    `                <Section>`,
    `                    <Heading>Contents</Heading>`,
    `                    <Paragraph><Ref>[(Top)](#)</Ref></Paragraph>`,
    ...rows.slice(1).flatMap(one => {
        const under = (one.wrote ?? []).filter(part => part.how === 'heading' && part.deep === 1);
        if (under.length === 0) return [row(one.name, '                    ')];
        return [
            `                    <Menu>`,
            `                        <Summary><Ref>[${quoted(one.name)}](#${kebab(one.name)})</Ref></Summary>`,
            ...under.map(part => row(part.said, '                        ')),
            `                    </Menu>`,
        ];
    }),
    `                </Section>`,
    `            </TableOfContents>`,
    `        );`,
    `    }`,
    `}`,
    ``,
].join('\n');
await writeFile(join(book, '.table.tsx'), contents, 'utf8');
made.push(`.table.tsx — ${rows.length} rows, ${rows.filter(one => (one.wrote ?? []).some(part => part.how === 'heading' && part.deep === 1)).length} of them opening`);

// WHAT THE READING NO LONGER WRITES IS TAKEN AWAY. The chapters are numbered by what the article
// holds, so a section gained or dropped renumbers them and the old names would be bound twice.
const written = new Set(made.map(one => one.split(' ')[0]));
const stale = (await readdir(book)).filter(one => /^[0-9]/u.test(one) && !written.has(one));
for (const one of stale) await rm(join(book, one), { force: true });
if (stale.length) made.push(`swept ${stale.join(', ')}`);

console.log(`read ${page}`);
for (const one of made) console.log(`  ${one}`);
console.log(`kinds used: ${[...kinds].join(', ')}`);
