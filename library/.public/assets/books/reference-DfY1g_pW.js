var y=Object.defineProperty;var r=(g,w)=>y(g,"name",{value:w,configurable:!0});import{jsxs as n,jsx as e}from"react/jsx-runtime";import{$ as k}from"@dna-platform/chemistry";import{$,C as v,S as x,T}from"./4-the-faces~code-DqeMwwvz.js";import{Chapter as a,Title as i,Author as S,Subject as R,Parenthetical as p,Paragraph as t,Section as s,Heading as l,Content as o,Word as d,Means as u,Append as c,List as f,Line as h}from"@dna-platform/public";import"styled-components";const b=class b extends ${};r(b,"$TheManual");let m=b;const L=r(()=>n(a,{children:[e(v,{}),e(i,{children:"[Subjective Reference](/inexplicable-phenomena/our-reference/)"}),e(S,{children:"[Our Team](/inexplicable-phenomena/our-team/)"}),e(R,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})]}),"Cover"),C=r(()=>n(a,{children:[e(x,{}),n(i,{children:[e(p,{}),"[Synopsis](/inexplicable-phenomena/our-reference/)"]}),e(t,{children:"The least a library needs to bind: the book every other book here extends, the theme it registers, the masthead and the byline it draws from a cover, and the faces a cover, a synopsis and a table wear. Each chapter says what the tool is and the file beside it is the tool. Borrowed, to begin, from the binder's own test library, and rebuilt from here by sketches."})]}),"Synopsis"),j=r(()=>n(a,{children:[e(T,{}),n(i,{children:[e(p,{}),"[Table of Contents](/inexplicable-phenomena/our-reference/#table-of-contents)"]}),n(s,{children:[e(l,{children:"Contents"}),e(t,{children:e(o,{children:"[The Book](/inexplicable-phenomena/our-reference/#the-book)"})}),e(t,{children:e(o,{children:"[The Theme](/inexplicable-phenomena/our-reference/#the-theme)"})}),e(t,{children:e(o,{children:"[The Masthead and the Byline](/inexplicable-phenomena/our-reference/#the-masthead-and-the-byline)"})}),e(t,{children:e(o,{children:"[The Faces](/inexplicable-phenomena/our-reference/#the-faces)"})}),e(t,{children:e(o,{children:"[Developing the Library](/inexplicable-phenomena/our-reference/#developing-the-library)"})}),n(t,{children:[e(p,{}),e(d,{children:e(o,{children:"[Our Reference](/inexplicable-phenomena/our-reference/)"})}),e(d,{children:e(o,{children:"[Synopsis](/inexplicable-phenomena/our-reference/#synopsis)"})}),e(d,{children:e(o,{children:"[Table of Contents](/inexplicable-phenomena/our-reference/#table-of-contents)"})})]})]})]}),"Table"),A=r(()=>n(a,{children:[e(i,{children:"[The Book](/inexplicable-phenomena/our-reference/#the-book)"}),n(s,{children:[e(l,{children:"What a book is here"}),e(t,{children:"Every book in this library extends the library's own, so what a book is here is decided once and a change to it reaches all of them. The book class is the layout: the masthead, the byline drawn from what the book's cover says, then the chapters. Its file is where the library's theme is registered, once, on the class every book extends. A cover's route opens at the top of the page; every other bookmark turns as the framework does."}),n(t,{children:["The class stands beside this chapter as its code, borrowed on 2026-10-30 from the binder's own test library, whose manual the team wrote, and to be rebuilt from here by sketches rather than kept. The theme it registers is ",e(u,{children:"[The Theme](/inexplicable-phenomena/our-reference/#the-theme)"}),"; the masthead and the byline it draws are ",e(u,{children:"[The Masthead and the Byline](/inexplicable-phenomena/our-reference/#the-masthead-and-the-byline)"}),"."]})]}),e(c,{identifier:"code",type:".tsx",children:`import { ReactNode } from 'react';\r
import { $ } from '@dna-platform/chemistry';\r
import { $Book, Theme } from '@dna-platform/public';\r
import { LibraryTheme } from './2-the-theme~code.tsx';\r
import { Byline as byline, RunningHead as runningHead } from './3-the-masthead-and-the-byline~code.tsx';\r
\r
export class $TheLibrary extends $Book {\r
    override write(): ReactNode {\r
        const RunningHead = $(runningHead);\r
        const Byline = $(byline);\r
        return (\r
            <>\r
                <RunningHead chapter={this.cover} />\r
                <Byline chapter={this.cover} />\r
                {super.write()}\r
            </>\r
        );\r
    }\r
\r
    protected override turn(): void {\r
        if (this.bookmark !== undefined && this.bookmark === this.cover) { window.scrollTo(0, 0); return; }\r
        super.turn();\r
    }\r
}\r
\r
export const TheLibrary = $($TheLibrary);\r
$(TheLibrary, Theme)(LibraryTheme);\r
`})]}),"TheBook1"),B=r(()=>n(a,{children:[e(i,{children:"[The Theme](/inexplicable-phenomena/our-reference/#the-theme)"}),n(s,{children:[e(l,{children:"The values and the parts"}),e(t,{children:"A theme is a set of values, the font, the measure, the ink, the paper, the link, and the parts that use them: the page, the levels of a book, the labels, the links, the apparatus and the figures. The file beside this chapter is the one the book registers. It is the test library's theme as borrowed, a serif on warm paper, and it stands only until the sketches say what this library's own looks like."})]}),e(c,{identifier:"code",type:".tsx",children:`import { ElementType } from 'react';\r
import { css, RuleSet } from 'styled-components';\r
import { $, selection } from '@dna-platform/chemistry';\r
import { $Theme } from '@dna-platform/public';\r
\r
declare module 'styled-components' {\r
    export interface DefaultTheme extends $LibraryTheme {}\r
}\r
\r
export class $LibraryTheme extends $Theme {\r
    font = "Georgia, 'Times New Roman', serif";\r
    size = '1rem';\r
    leading = '1.7';\r
    measure = '42rem';\r
    space = '1.25rem';\r
    ink = '#23262a';\r
    paper = '#faf8f4';\r
    link = '#5b2f2a';\r
    style: ElementType = selection.div\`\${this.parts()}\`;\r
\r
    protected parts(): RuleSet[] {\r
        return [this.page(), this.levels(), this.labels(), this.links(), this.apparatus(), this.figures()];\r
    }\r
\r
    protected page(): RuleSet {\r
        return css\`\r
            font-family: \${({ theme }) => theme.font};\r
            font-size: \${({ theme }) => theme.size};\r
            line-height: \${({ theme }) => theme.leading};\r
            color: \${({ theme }) => theme.ink};\r
            background: \${({ theme }) => theme.paper};\r
            max-width: \${({ theme }) => theme.measure};\r
            margin-inline: auto;\r
            padding: \${({ theme }) => theme.space};\r
            @media (min-width: 64rem) { max-width: 52rem; }\r
        \`;\r
    }\r
\r
    protected levels(): RuleSet {\r
        return css\`\r
            .pd-book { margin-block: \${({ theme }) => theme.space}; counter-reset: chapter equation; }\r
            .pd-chapter { margin-block: calc(2 * \${({ theme }) => theme.space}); scroll-margin-block-start: calc(0.5 * \${({ theme }) => theme.space}); }\r
            .pd-section { margin-block: \${({ theme }) => theme.space}; }\r
            .pd-paragraph { margin-block: \${({ theme }) => theme.space}; }\r
            .pa-item { margin-block: calc(\${({ theme }) => theme.space} / 4); }\r
            .pd-title { font-size: calc(1.5 * \${({ theme }) => theme.size}); font-weight: bold; margin-block-end: \${({ theme }) => theme.space}; }\r
            .pd-heading { font-weight: bold; margin-block: \${({ theme }) => theme.space} 0; }\r
            .pd-line { white-space: pre-wrap; }\r
            .pd-word { overflow-wrap: break-word; }\r
            .pd-canonical.pd-chapter { counter-increment: chapter; }\r
            .pd-canonical.pd-chapter:not(.pa-framed) {\r
                border-block-start: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 10%, \${({ theme }) => theme.paper});\r
                padding-block-start: \${({ theme }) => theme.space};\r
            }\r
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(\${({ theme }) => theme.space} / 4); }\r
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }\r
        \`;\r
    }\r
\r
    protected labels(): RuleSet {\r
        return css\`\r
            .pd-label, .pd-chapter .pd-title::before {\r
                font-size: calc(0.7 * \${({ theme }) => theme.size});\r
                font-weight: normal;\r
                letter-spacing: 0.15em;\r
                text-transform: uppercase;\r
                opacity: 0.65;\r
            }\r
        \`;\r
    }\r
\r
    protected links(): RuleSet {\r
        return css\`\r
            .pa-reference { color: \${({ theme }) => theme.link}; text-decoration-color: \${({ theme }) => theme.link}; text-underline-offset: 0.15em; }\r
            .pa-self-reference { color: inherit; text-decoration: none; }\r
            .pa-referent { scroll-margin-block-start: \${({ theme }) => theme.space}; }\r
            .pa-content { color: \${({ theme }) => theme.link}; }\r
        \`;\r
    }\r
\r
    protected apparatus(): RuleSet {\r
        return css\`\r
            .pd-running-head {\r
                font-size: calc(0.75 * \${({ theme }) => theme.size});\r
                letter-spacing: 0.12em;\r
                text-transform: uppercase;\r
                padding-block-end: calc(\${({ theme }) => theme.space} / 2);\r
                border-block-end: 1px solid \${({ theme }) => theme.ink};\r
            }\r
            .pd-byline {\r
                display: grid;\r
                grid-template-columns: max-content 1fr;\r
                column-gap: \${({ theme }) => theme.space};\r
                row-gap: calc(\${({ theme }) => theme.space} / 4);\r
                align-items: baseline;\r
                margin-block: \${({ theme }) => theme.space} 0;\r
                padding: calc(\${({ theme }) => theme.space} / 2) \${({ theme }) => theme.space};\r
                background: color-mix(in srgb, \${({ theme }) => theme.ink} 3%, \${({ theme }) => theme.paper});\r
                border: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 10%, \${({ theme }) => theme.paper});\r
                border-block-start: 3px solid \${({ theme }) => theme.link};\r
            }\r
        \`;\r
    }\r
\r
    protected figures(): RuleSet {\r
        return css\`\r
            .pd-figure { max-width: 100%; }\r
            .pd-code {\r
                font-family: ui-monospace, monospace;\r
                font-size: calc(0.9 * \${({ theme }) => theme.size});\r
                line-height: 1.5;\r
                white-space: pre;\r
                overflow-x: auto;\r
                margin-block: \${({ theme }) => theme.space};\r
                padding: calc(0.75 * \${({ theme }) => theme.space}) \${({ theme }) => theme.space};\r
                background: color-mix(in srgb, \${({ theme }) => theme.ink} 4%, \${({ theme }) => theme.paper});\r
                border-inline-start: 2px solid color-mix(in srgb, \${({ theme }) => theme.ink} 25%, \${({ theme }) => theme.paper});\r
            }\r
            .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }\r
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: \${({ theme }) => theme.space}; }\r
            .pd-math, .pd-date { white-space: nowrap; }\r
            .pd-equation { position: relative; counter-increment: equation; }\r
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }\r
        \`;\r
    }\r
}\r
\r
export const LibraryTheme = $($LibraryTheme);\r
`})]}),"TheTheme2"),P=r(()=>n(a,{children:[e(i,{children:"[The Masthead and the Byline](/inexplicable-phenomena/our-reference/#the-masthead-and-the-byline)"}),n(s,{children:[e(l,{children:"What a cover exposes"}),e(t,{children:"The running head names the library, the book and its table of contents, and the byline says who wrote the book and what it is filed under, both read from the cover and nowhere else. Neither is written in a chapter; the book draws them above its chapters from what the cover says. The file beside this chapter is both, borrowed from the test library and pointed at this library's name."})]}),e(c,{identifier:"code",type:".tsx",children:`import { ReactNode } from 'react';\r
import { $ } from '@dna-platform/chemistry';\r
import { $Paragraph, $Word, Means as means, Reference as reference, Word as word } from '@dna-platform/public';\r
\r
export class $RunningHead extends $Paragraph {\r
    protected override $Define(): void {\r
        super.$Define();\r
        this.classes.add(this, 'pd-running-head');\r
    }\r
\r
    override write(): ReactNode {\r
        const book = this.book;\r
        if (book === undefined) return null;\r
        const table = book.table?.canonical;\r
        const top = book.subject?.means?.identifier === book.title?.means?.identifier;\r
        const Means = $(means);\r
        const Word = $(word);\r
        const Reference = $(reference);\r
        return (\r
            <>\r
                {top ? null : <><Means>$[[ Inexplicable Phenomena ]]</Means> / </>}\r
                <Word>{book.title?.name}</Word>: <Word>\r
                    <Reference>{table?.means?.identifier}</Reference>\r
                    {table?.name}\r
                </Word>\r
            </>\r
        );\r
    }\r
}\r
\r
export class $Label extends $Word {\r
    protected override $Define(): void {\r
        super.$Define();\r
        this.classes.add(this, 'pd-label');\r
    }\r
}\r
\r
export class $Byline extends $Paragraph {\r
    protected override $Define(): void {\r
        super.$Define();\r
        this.classes.add(this, 'pd-byline');\r
    }\r
\r
    override write(): ReactNode {\r
        const book = this.book;\r
        if (book === undefined) return null;\r
        const Label = $(label);\r
        const Word = $(word);\r
        const Reference = $(reference);\r
        return (\r
            <>\r
                <Label>Author</Label> <Word>\r
                    <Reference>{book.author?.means?.identifier}</Reference>\r
                    {book.author?.name}\r
                </Word>\r
                <Label>Filed under</Label> <Word>\r
                    <Reference>{book.subject?.means?.identifier}</Reference>\r
                    {book.subject?.name}\r
                </Word>\r
            </>\r
        );\r
    }\r
}\r
\r
export const RunningHead = $($RunningHead);\r
export const Label = $($Label);\r
const label = Label;\r
export const Byline = $($Byline);\r
`})]}),"TheMastheadAndTheByline3"),W=r(()=>n(a,{children:[e(i,{children:"[The Faces](/inexplicable-phenomena/our-reference/#the-faces)"}),n(s,{children:[e(l,{children:"A cover, a synopsis, a table"}),e(t,{children:"A face is how a book's apparatus looks: the cover a book opens on, the synopsis beside it, the table of contents that answers for its chapters and, when the book is a subject, for what is filed under it. Each is a word of the package dressed here, and every book of this library wears these four from the file beside this chapter, borrowed from the test library until a sketch replaces them."})]}),e(c,{identifier:"code",type:".tsx",children:`import { $, selection } from '@dna-platform/chemistry';\r
import { $Cover, $Synopsis, $Table, $TableOfContents } from '@dna-platform/public';\r
\r
export class $LibraryCover extends $Cover {\r
    override style = selection.header\`\r
        .pd-chapter.pa-cover { margin-block: 0; }\r
        .pd-chapter.pa-cover:not(.pa-framed) {\r
            margin-block-end: calc(1.5 * \${({ theme }) => theme.space});\r
            padding: calc(0.75 * \${({ theme }) => theme.space}) \${({ theme }) => theme.space};\r
            background: color-mix(in srgb, \${({ theme }) => theme.ink} 3%, \${({ theme }) => theme.paper});\r
            border: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 10%, \${({ theme }) => theme.paper});\r
            border-block-start: 0;\r
            scroll-margin-block-start: calc(1.75 * \${({ theme }) => theme.space});\r
        }\r
        .pa-cover .pd-title { margin-block: 0 calc(\${({ theme }) => theme.space} / 2); font-size: calc(2 * \${({ theme }) => theme.size}); }\r
        .pa-cover .pd-title::before { content: 'Cover'; }\r
        .pa-biography .pd-title::before { content: 'Biography'; }\r
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }\r
    \`;\r
}\r
\r
export class $LibrarySynopsis extends $Synopsis {\r
    style = selection.div\`\r
        .pd-chapter.pa-synopsis {\r
            margin-block: calc(1.5 * \${({ theme }) => theme.space});\r
            padding-inline-start: \${({ theme }) => theme.space};\r
            border-inline-start: 2px solid \${({ theme }) => theme.link};\r
        }\r
        .pa-synopsis .pd-paragraph { font-style: italic; }\r
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }\r
    \`;\r
}\r
\r
export class $LibraryTableOfContents extends $TableOfContents {\r
    override style = selection.nav\`\r
        .pd-chapter.pa-table-of-contents { margin-block: 0; }\r
        .pd-chapter.pa-table-of-contents:not(.pa-framed) {\r
            margin-block: calc(1.5 * \${({ theme }) => theme.space});\r
            padding: calc(0.75 * \${({ theme }) => theme.space}) \${({ theme }) => theme.space};\r
            border: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 10%, \${({ theme }) => theme.paper});\r
            scroll-margin-block-start: calc(1.75 * \${({ theme }) => theme.space});\r
        }\r
        .pa-table-of-contents .pd-paragraph { margin-block: calc(\${({ theme }) => theme.space} / 4); }\r
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }\r
        .pa-table-of-contents .pd-heading {\r
            font-size: calc(0.7 * \${({ theme }) => theme.size});\r
            font-weight: normal;\r
            letter-spacing: 0.15em;\r
            text-transform: uppercase;\r
            opacity: 0.65;\r
        }\r
    \`;\r
}\r
\r
export class $LibraryTable extends $Table {\r
    override style = selection(this.style)\`\r
        .pa-table { column-gap: \${({ theme }) => theme.space}; row-gap: calc(\${({ theme }) => theme.space} / 2); }\r
        .pa-table .pd-paragraph { margin-block: 0; }\r
        .pa-col {\r
            padding-block: calc(\${({ theme }) => theme.space} / 3);\r
            border-block-end: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 7%, \${({ theme }) => theme.paper});\r
        }\r
    \`;\r
}\r
\r
export const Cover = $($LibraryCover);\r
export const Synopsis = $($LibrarySynopsis);\r
export const TableOfContents = $($LibraryTableOfContents);\r
export const Table = $($LibraryTable);\r
`})]}),"TheFaces4"),M=r(()=>n(a,{children:[e(i,{children:"[Developing the Library](/inexplicable-phenomena/our-reference/#developing-the-library)"}),n(s,{children:[e(l,{children:"The loop"}),e(t,{children:"A save shows on an open page in under a second; a bind is the gate at the end of a piece of work and never the way to look during one. The workbench beside this chapter is the loop: it serves the library live from its sources, keeps one browser open on it, and answers a look with what it found and a photograph. Borrowed from the librarian's own library on 2026-10-30, its built address this library's."}),n(t,{children:[e(f,{}),e(h,{children:"node library/.reference/5-developing-the-library~workbench.mjs, once, left open"}),e(h,{children:"node library/.reference/5-developing-the-library~workbench.mjs look the-team"}),e(h,{children:"the same with built for the site the last bind made, phone for a phone's width, close at the end"})]})]}),n(s,{children:[e(l,{children:"The bind and the site"}),e(t,{children:"In the binding beside the site, npm run bind binds every book and leaves the site under the base the configuration names, and npm run preview with its port serves what the bind left. The site is committed as it is bound, and what is published is what was committed."}),n(t,{children:[e(f,{}),e(h,{children:"cd library/.public/.binding"}),e(h,{children:"npm run bind"}),e(h,{children:"npm run preview -- --port 4343 --strictPort"})]})]}),e(c,{identifier:"workbench",type:".mjs",children:`// The workbench: the library served live from its sources, a browser kept open on it, and a way to ask that
// browser what a page looks like. Open it once and leave it open:
//
//     node library/.reference/5-developing-the-library~workbench.mjs
//
// Then look at a book from another terminal, as often as needed:
//
//     node library/.reference/5-developing-the-library~workbench.mjs look the-team
//     node library/.reference/5-developing-the-library~workbench.mjs look the-team/#closure phone at=.pd-title
//
// A look waits for the last save to reach the page, prints what it found and says where it put the photograph.
// After the book's address it takes, in any order:
//
//     phone                          a phone's width, where a desk's is the default
//     built                          the site the last bind built, served on 4242, where the live one is the default
//     fresh                          load the page again first, as a reader arriving would
//     whole                          photograph the whole page, where the screen is the default
//     at=<selector>                  photograph that element alone
//     click=<selector>               press it first
//     read=<selector>                print what each match says
//     style=<selector>|<property>    print what each match computes to, the properties separated by commas
//     box=<selector>                 print where each match is
//     tree=<selector>|<depth>        print the elements under the first match, each with its classes and its size
//     after=<selector>               print what is drawn before and after the first match
//     rules=<word>|<property>        print every rule whose selector holds the word, in the order they apply
//     out=<file>                     where the photograph goes
//
// And when the work is done:
//
//     node library/.reference/5-developing-the-library~workbench.mjs close
import { execSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, watch, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const library = dirname(dirname(fileURLToPath(import.meta.url)));
const binding = readdirSync(library).map(name => join(library, name, '.binding')).find(one => existsSync(join(one, 'serving.ts')));
const kept = join(tmpdir(), \`workbench-\${createHash('sha1').update(library).digest('hex').slice(0, 8)}\`);
const note = join(kept, 'open.json');
const devices = { desk: { width: 1280, height: 800 }, phone: { width: 390, height: 844 } };
const built = 'http://localhost:4343/inexplicable-phenomena/';
const [verb, ...words] = process.argv.slice(2);

const asked = async what => {
    if (!existsSync(note)) return null;
    try {
        return await (await fetch(\`http://127.0.0.1:\${JSON.parse(readFileSync(note, 'utf8')).port}/\${what}\`)).text();
    } catch {
        rmSync(note, { force: true });
        return null;
    }
};

const open = async () => {
    if (binding === undefined) throw new Error(\`no folder with a binding is in \${library}\`);
    if (await asked('open') !== null) return console.log('the workbench is already open');
    mkdirSync(kept, { recursive: true });

    const live = spawn('npm run dev', { cwd: binding, shell: true });
    const site = await new Promise((resolve, reject) => {
        let said = '';
        const read = chunk => {
            said += chunk;
            const found = /http:\\/\\/localhost:\\d+\\//u.exec(said.replace(/\\u001b\\[[0-9;]*m/gu, ''));
            if (found === null) return;
            live.stdout.off('data', read);
            live.stderr.off('data', read);
            live.stdout.resume();
            live.stderr.resume();
            resolve(found[0]);
        };
        live.stdout.on('data', read);
        live.stderr.on('data', read);
        live.on('exit', code => reject(new Error(\`the live site stopped with \${code}\\n\${said}\`)));
    });

    const puppeteer = createRequire(join(binding, 'package.json'))('puppeteer');
    const browser = await puppeteer.launch({ headless: true, ignoreDefaultArgs: ['--hide-scrollbars'] });
    const tabs = new Map();
    let saved = 0;
    watch(library, { recursive: true }, () => { saved = Date.now(); });

    // The live site sends a page with nothing printed on it and draws the book once its code arrives, and the
    // built site prints the page and takes it up a moment later. So a page just loaded is waited on until the
    // book's code has taken hold of it and it says something, or until the compiler speaks.
    const drawn = page => page.waitForFunction(() => {
        if (document.querySelector('vite-error-overlay') !== null) return true;
        const root = document.getElementById('root');
        const taken = root !== null && Object.keys(root).some(key => key.startsWith('__reactContainer'));
        return taken && document.body.innerText.trim() !== '';
    }, { timeout: 20000, polling: 50 }).catch(() => undefined);

    // A page behind another draws nothing and cannot be photographed, so the one looked at is brought forward.
    const tab = async (address, device, fresh) => {
        const key = \`\${device} \${address}\`;
        const held = tabs.get(key);
        if (held !== undefined && !held.page.isClosed()) {
            await held.page.bringToFront();
            if (fresh) {
                await held.page.goto('about:blank');
                await held.page.goto(address, { waitUntil: 'load' });
                await drawn(held.page);
            }
            return held;
        }
        const page = await browser.newPage();
        const opened = { page, wrong: [] };
        page.on('pageerror', error => opened.wrong.push(String(error.message ?? error)));
        page.on('console', message => { if (message.type() === 'error') opened.wrong.push(message.text()); });
        await page.setViewport({ ...devices[device], deviceScaleFactor: 1 });
        await page.goto(address, { waitUntil: 'load' });
        await drawn(page);
        tabs.set(key, opened);
        return opened;
    };

    // A save reaches the open page in under a second, so a look waits out that second and then for the page to
    // go quiet.
    const settled = async page => {
        const since = Date.now() - saved;
        if (since < 900) await new Promise(done => setTimeout(done, 900 - since));
        await page.waitForNetworkIdle({ idleTime: 100, timeout: 10000 }).catch(() => undefined);
        for (let tries = 0; tries < 3; tries++) {
            try {
                await page.evaluate(() => new Promise(done => {
                    let finished = false;
                    const finish = () => {
                        if (finished) return;
                        finished = true;
                        watching.disconnect();
                        document.fonts.ready.then(() => done());
                    };
                    let quiet = setTimeout(finish, 120);
                    const watching = new MutationObserver(() => {
                        clearTimeout(quiet);
                        quiet = setTimeout(finish, 120);
                    });
                    watching.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
                    setTimeout(finish, 3000);
                }));
                return;
            } catch {
                await new Promise(done => setTimeout(done, 300));
            }
        }
    };

    const look = async (wanted, doing) => {
        const began = Date.now();
        const device = wanted.has('phone') ? 'phone' : 'desk';
        const [book, mark] = (wanted.get('book') ?? '').split('#');
        const path = book.replace(/^\\/+|\\/+$/gu, '');
        const route = \`\${path === '' ? '' : \`\${path}/\`}\${mark === undefined ? '' : \`#\${mark}\`}\`;
        const address = \`\${wanted.has('built') ? built : site}\${route}\`;
        doing.key = \`\${device} \${address}\`;
        doing.what = 'opening the page';
        const { page, wrong } = await tab(address, device, wanted.has('fresh'));
        // A book turns to the place its address names a moment after it is drawn, so that place is waited for.
        if (mark !== undefined) {
            doing.what = \`waiting for the book to turn to \${mark}\`;
            await page.waitForFunction(to => (document.getElementById(to)?.getBoundingClientRect().height ?? 0) > 0, { timeout: 5000, polling: 50 }, mark).catch(() => undefined);
        }
        doing.what = 'waiting for the page to go quiet';
        await settled(page);
        for (const selector of wanted.getAll('click')) {
            doing.what = \`pressing \${selector}\`;
            await page.click(selector);
            await settled(page);
        }

        doing.what = 'reading the page';
        const says = [];
        const refused = await page.evaluate(() => {
            const overlay = document.querySelector('vite-error-overlay')?.shadowRoot;
            return overlay === undefined || overlay === null ? null : (overlay.querySelector('.message-body') ?? overlay).textContent.trim().slice(0, 700);
        });
        if (refused !== null) says.push(\`refused: \${refused}\`);
        // What runs past the edge inside something that scrolls sideways, as a long line of code does, is not counted.
        says.push(\`\${await page.evaluate(() => {
            const wide = document.documentElement.clientWidth;
            const scrolled = one => {
                for (let above = one.parentElement; above !== null && above !== document.body; above = above.parentElement)
                    if (getComputedStyle(above).overflowX !== 'visible') return true;
                return false;
            };
            return Array.from(document.querySelectorAll('body *')).filter(one => {
                const box = one.getBoundingClientRect();
                return box.width > 0 && box.right > wide + 1 && getComputedStyle(one).position !== 'fixed' && !scrolled(one);
            }).length;
        })} past the right edge\`);
        for (const one of new Set(wrong.splice(0))) says.push(\`wrong: \${one.slice(0, 300)}\`);

        for (const selector of wanted.getAll('read')) {
            const read = await page.$$eval(selector, all => all.slice(0, 12).map(one => one.innerText.replace(/\\s+/gu, ' ').trim().slice(0, 300)));
            says.push(...(read.length === 0 ? [\`nothing matches \${selector}\`] : read.map(text => \`\${selector} says: \${text}\`)));
        }
        for (const pair of wanted.getAll('style')) {
            const [selector, names = ''] = pair.split('|');
            const computed = await page.$$eval(selector, (all, properties) => all.slice(0, 12).map(one => {
                const style = getComputedStyle(one);
                return properties.map(name => \`\${name}: \${style.getPropertyValue(name) || style[name]}\`).join(' · ');
            }), names.split(','));
            says.push(...(computed.length === 0 ? [\`nothing matches \${selector}\`] : computed.map(text => \`\${selector} \${text}\`)));
        }
        for (const selector of wanted.getAll('box')) {
            const boxes = await page.$$eval(selector, all => all.slice(0, 12).map(one => {
                const box = one.getBoundingClientRect();
                return \`\${Math.round(box.x)},\${Math.round(box.y)} \${Math.round(box.width)}×\${Math.round(box.height)}\`;
            }));
            says.push(...(boxes.length === 0 ? [\`nothing matches \${selector}\`] : boxes.map(text => \`\${selector} is at \${text}\`)));
        }

        for (const pair of wanted.getAll('tree')) {
            const [selector, deep = '3'] = pair.split('|');
            const drawn = await page.$eval(selector, (one, depth) => {
                const lines = [];
                const walk = (element, level) => {
                    const box = element.getBoundingClientRect();
                    const classes = [...element.classList].map(name => \`.\${name}\`).join('');
                    lines.push(\`\${'  '.repeat(level)}\${element.tagName.toLowerCase()}\${element.id === '' ? '' : \`#\${element.id}\`}\${classes} \${Math.round(box.width)}×\${Math.round(box.height)}\`);
                    if (level < depth)
                        for (const child of element.children)
                            walk(child, level + 1);
                };
                walk(one, 0);
                return lines;
            }, Number(deep)).catch(() => [\`nothing matches \${selector}\`]);
            says.push(...drawn);
        }
        for (const selector of wanted.getAll('after')) {
            const drawn = await page.$eval(selector, one => ['::before', '::after'].map(which => {
                const style = getComputedStyle(one, which);
                return \`\${which} content \${style.content} · \${style.width} by \${style.height} · display \${style.display} · background \${style.backgroundColor} · border \${style.border}\`;
            })).catch(() => [\`nothing matches \${selector}\`]);
            says.push(...drawn.map(text => \`\${selector} \${text}\`));
        }
        // Which rule wins is read off the page's own sheets, in their order, and never guessed.
        for (const pair of wanted.getAll('rules')) {
            const [named, names = ''] = pair.split('|');
            const rules = await page.evaluate((substring, properties) => {
                const found = [];
                for (const sheet of document.styleSheets) {
                    let rules;
                    try {
                        rules = sheet.cssRules;
                    } catch {
                        continue;
                    }
                    for (const rule of rules) {
                        if (rule.selectorText === undefined || !rule.selectorText.includes(substring)) continue;
                        const declared = properties.filter(name => name !== '').map(name => \`\${name}: \${rule.style.getPropertyValue(name) || 'unsaid'}\`).join(' · ');
                        found.push(\`\${rule.selectorText.slice(0, 120)} { \${declared || rule.style.cssText.slice(0, 200)} }\`);
                    }
                }
                return found;
            }, named, names.split(','));
            says.push(...(rules.length === 0 ? [\`no rule names \${named}\`] : rules.map(text => \`rule: \${text}\`)));
        }

        doing.what = 'photographing the page';
        const photograph = wanted.get('out') ?? join(kept, \`\${(path || 'library').replace(/\\W+/gu, '-')}-\${device}.png\`);
        // An element is photographed by clipping the page to where it is. Asking the element to photograph
        // itself can hang.
        const clip = wanted.has('at') ? await page.$eval(wanted.get('at'), one => {
            const box = one.getBoundingClientRect();
            return { x: Math.max(0, box.left + window.scrollX), y: Math.max(0, box.top + window.scrollY), width: Math.ceil(box.width), height: Math.ceil(box.height) };
        }).catch(() => null) : null;
        if (wanted.has('at') && (clip === null || clip.width === 0 || clip.height === 0)) says.push(\`nothing to photograph at \${wanted.get('at')}\`);
        else if (clip !== null) {
            await page.screenshot({ path: photograph, clip, captureBeyondViewport: true });
            says.push(\`photograph: \${photograph}\`);
        } else {
            // A press leaves the page where the press took it; otherwise the look is at the address asked for.
            if (!wanted.has('click')) await page.evaluate(to => (to === null ? window.scrollTo(0, 0) : document.getElementById(to)?.scrollIntoView()), mark ?? null);
            await page.screenshot({ path: photograph, fullPage: wanted.has('whole') });
            says.push(\`photograph: \${photograph}\`);
        }

        return [\`\${route || 'the library'} at a \${device}, \${wanted.has('built') ? 'built' : 'live'}, in \${Date.now() - began}ms\`, ...says].join('\\n');
    };

    const shut = async () => {
        rmSync(note, { force: true });
        await browser.close().catch(() => undefined);
        if (process.platform === 'win32') {
            try {
                execSync(\`taskkill /pid \${live.pid} /T /F\`, { stdio: 'ignore' });
            } catch { /* it had already stopped */ }
        } else live.kill();
        process.exit(0);
    };

    let turn = Promise.resolve();
    const answering = createServer((request, response) => {
        const wanted = new URL(request.url, 'http://workbench');
        const answer = text => {
            response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
            response.end(text);
        };
        if (wanted.pathname === '/open') return answer('open');
        if (wanted.pathname === '/close') {
            answer('the workbench is closed');
            return void shut();
        }
        // A page that never answers is closed after thirty seconds, so one stuck look does not hold up the next.
        turn = turn.then(async () => {
            const doing = { what: 'starting', key: undefined };
            let late;
            const slow = new Promise(done => { late = setTimeout(done, 30000, null); });
            const found = await Promise.race([look(wanted.searchParams, doing).catch(error => \`the look failed while \${doing.what}: \${error.message}\`), slow]);
            clearTimeout(late);
            if (found !== null) return found;
            const stuck = tabs.get(doing.key);
            tabs.delete(doing.key);
            stuck?.page.close().catch(() => undefined);
            return \`no answer in thirty seconds while \${doing.what}; that page is closed, and the next look opens it again\`;
        }).then(answer);
    });
    answering.listen(0, '127.0.0.1', () => {
        writeFileSync(note, JSON.stringify({ port: answering.address().port, site }));
        console.log(\`the library is live at \${site}\`);
        console.log('look at a book with: look <its address>');
    });
    process.on('SIGINT', shut);
    process.on('SIGTERM', shut);
};

if (verb === undefined) await open();
else if (verb === 'look' || verb === 'close') {
    const wanted = new URLSearchParams();
    if (verb === 'look') wanted.set('book', words[0] ?? '');
    for (const word of words.slice(1)) {
        const cut = word.indexOf('=');
        if (cut === -1) wanted.append(word, '1');
        else wanted.append(word.slice(0, cut), word.slice(cut + 1));
    }
    console.log(await asked(verb === 'look' ? \`look?\${wanted}\` : 'close') ?? 'no workbench is open; open one by running this file with nothing after it');
} else console.log('open the workbench with nothing after the file; then look <a book\\'s address>, or close');
`})]}),"DevelopingTheLibrary5"),q=k(m),N=r(()=>n(q,{children:[L(),C(),j(),A(),B(),P(),W(),M()]}),"book");export{N as book};
