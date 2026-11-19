var y=Object.defineProperty;var h=(b,w)=>y(b,"name",{value:w,configurable:!0});import{jsx as e,jsxs as n}from"react/jsx-runtime";import{$ as k}from"@dna-platform/chemistry";import{$ as v,E as $,C as x,T,a as E,L as m}from"./1-the-book~code-CVo3LYJk.js";import{Chapter as l,Title as p,Author as A,Subject as S,Section as i,Heading as o,Paragraph as a,Content as c,Parenthetical as N,Word as f,List as s,Line as t,Means as r,Append as d}from"@dna-platform/public";import{O as I}from"./.synopsis-BnDplhmu.js";import"styled-components";const u=class u extends v{$Define(){super.$Define(),this.annotations.add(this,e($,{}))}};h(u,"$TheManual");let g=u;const C=h(()=>n(l,{children:[e(x,{}),e(p,{children:"[Subjective Reference](/inexplicable-phenomena/our-reference/)"}),e(A,{children:"[Doug](/inexplicable-phenomena/our-team/)"}),e(S,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"}),e(T,{children:"The least a library needs to bind."})]}),"Cover"),R=h(()=>n(l,{children:[e(E,{}),e(p,{children:"[Table of Contents](/inexplicable-phenomena/our-reference/#table-of-contents)"}),n(i,{children:[e(o,{children:"Contents"}),e(a,{children:e(c,{children:"[The Book](/inexplicable-phenomena/our-reference/#the-book)"})}),e(a,{children:e(c,{children:"[The Theme](/inexplicable-phenomena/our-reference/#the-theme)"})}),e(a,{children:e(c,{children:"[The Running Head and the Byline](/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline)"})}),e(a,{children:e(c,{children:"[The Faces](/inexplicable-phenomena/our-reference/#the-faces)"})}),e(a,{children:e(c,{children:"[Developing the Library](/inexplicable-phenomena/our-reference/#developing-the-library)"})}),e(a,{children:e(c,{children:"[The Paper](/inexplicable-phenomena/our-reference/#the-paper)"})}),e(a,{children:e(c,{children:"[The Reference Manual](/inexplicable-phenomena/our-reference/#the-reference-manual)"})}),e(a,{children:e(c,{children:"[The Specification](/inexplicable-phenomena/our-reference/#the-specification)"})}),e(a,{children:e(c,{children:"[The Content](/inexplicable-phenomena/our-reference/#the-content)"})}),n(a,{children:[e(N,{}),e(f,{children:e(c,{children:"[Our Reference](/inexplicable-phenomena/our-reference/)"})}),e(f,{children:e(c,{children:"[Synopsis](/inexplicable-phenomena/our-reference/#synopsis)"})}),e(f,{children:e(c,{children:"[Table of Contents](/inexplicable-phenomena/our-reference/#table-of-contents)"})})]})]})]}),"Table"),L=h(()=>n(l,{children:[e(p,{children:"[The Book](/inexplicable-phenomena/our-reference/#the-book)"}),n(i,{children:[e(o,{children:"1. What a book is here"}),n(a,{children:[e(s,{}),e(t,{children:"1.1 Every book in this library extends the library's own, so what a book is here is decided once and a change to it reaches all of them."}),e(t,{children:"1.2 The book class is the layout: the running head, the front drawn from what the book's cover says, then the chapters, and after them the file's page the editor shows. Its file is where the library's theme is registered, once, on the class every book extends."}),e(t,{children:"1.3 A cover's route opens at the top of the page; every other bookmark turns as the framework does, and a page opens at its top, never scrolled down, on my word of 16 November 2026."}),e(t,{children:"1.4 Every chapter but the cover is navigated, said by the book at its bond before the bond reaches the chapters: the arrow looking back, the square to the table, the arrow looking on, above and below. On the table itself, on my word of 19 November 2026, the arrow looking back names the cover, and the square is a self the theme keeps in place, grey and unpressable — a door is never a door to the room it stands in."}),e(t,{children:`1.5 A special chapter is a base chapter wearing a word. The cover, the table of contents and the synopsis say what they are; the saying is a format said of the chapter, the book finds each by asking the chapter what it is, and its specification demands exactly one of each. Everything said of chapters — the drawn title, the navigation, the editor's grid — reaches them because they are chapters first, and a book writes no special layout for any of them. On my word of 16 November 2026: "Table of contents can be an attribute to capture polymorphism."`})]})]}),n(i,{children:[e(o,{children:"2. The book's class and what it says of every book"}),n(a,{children:[e(s,{}),e(t,{children:"2.1 The class stands beside this chapter as its code, borrowed on 30 October 2026 from the binder's own test library, whose manual the team wrote, and rebuilt from here by sketches rather than kept."}),n(t,{children:["2.2 The theme it registers is ",e(r,{children:"[The Theme](/inexplicable-phenomena/our-reference/#the-theme)"}),"; the running head it draws is ",e(r,{children:"[The Running Head and the Byline](/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline)"}),"; the front and the navigation are ",e(r,{children:"[The Faces](/inexplicable-phenomena/our-reference/#the-faces)"}),"."]}),n(t,{children:["2.3 It says of every book the editor, the paging and the page mode, in that order, so the editor's layer is the book's nearest and the page is the mode a book opens in unless its own class says the editor after; and at its bond it hangs a branch on every entry of the table of contents, so the table can be the editor's tree. Both are ",e(r,{children:"[The Reference Manual](/inexplicable-phenomena/our-reference/#the-reference-manual)"}),"'s, sections 4 and 5."]})]})]}),e(m,{}),e(d,{identifier:"code",type:".tsx",children:`import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $Chapter, $Cover, $Paragraph, $Section, Paginated, Theme } from '@dna-platform/public';
import { LibraryTheme } from './2-the-theme~code.tsx';
import { RunningHead as runningHead } from './3-the-running-head-and-the-byline~code.tsx';
import { $Navigation, Front as front, Navigated as navigated } from './4-the-faces~code.tsx';
import { $Branch, Branch as branch, Editor, FilePage as filePage, PageMode } from './7-the-reference-manual~code.tsx';

// THE HEADING IS MINIMAL AND THE BYLINE IS NOT DRAWN, Doug, 2026-11-16: first "Why does every chapter need a
// title and author?!?", then "what happened to a minimal heading, at least with the book title" — the running
// head is the book's title alone, a way to the table and, from the table, to the cover; the author lives on the
// front and in the table of contents.
export class $TheLibrary extends $Book {
    override write(): ReactNode {
        const RunningHead = $(runningHead);
        const Front = $(front);
        const FilePage = $(filePage);
        return (
            <>
                <RunningHead chapter={this.cover} />
                <Front chapter={this.cover} />
                {super.write()}
                <FilePage chapter={this.cover} />
            </>
        );
    }

    // A PAGE OPENS AT ITS TOP, Doug, 2026-11-16: "We need pages to open at the top... not scrolled down" — a
    // turn lands on the page's top with the running head in view, never past it.
    protected override turn(): void {
        window.scrollTo(0, 0);
    }

    // EVERY BOOK HAS THE EDITOR AND OPENS ON THE PAGE, Sprint 131, Doug, 2026-11-17: "Reference manuals should
    // default to full but maybe appendix authors can choose?" — the editor stands before Paginated so its layer is the
    // book's nearest and the grid reaches the chapters; the page is the default, and a manual's own class says the
    // editor after this, which suppresses it.
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Editor />,
            <Paginated />,
            <PageMode />
        );
    }

    // EVERY CHAPTER BUT THE COVER IS NAVIGATED, said by the book at its bond and before the bond reaches the
    // chapters, so the lines the format holds are bound with them. The cover's page is the front; a chapter that
    // already says Navigation in its own text keeps its own. Doug, 2026-11-16: "You need next and table of
    // contents and previous on the top and bottom of every chapter in the library."
    protected override $Bound(): void {
        const Navigated = $(navigated);
        const Branch = $(branch);
        // EVERY ENTRY OF THE TABLE IS A BRANCH, Sprint 131: the table is the editor's tree, each row's files hung
        // beneath it as leaves; the branch reads the chapter the row means and draws nothing for a row with none.
        for (const section of this.table?.text.find($Section) ?? [])
            for (const entry of section.text.find($Paragraph))
                if (entry.annotations.expressed($Branch) === undefined) entry.annotations.append(this, <Branch />);
        for (const chapter of this.text.find($Chapter)) {
            // THE TABLE IS NAVIGATED LIKE ANY CHAPTER, Doug, 2026-11-19: "Why doesn't the table have a front back
            // navigation or other controls" — superseding 2026-11-16's "WHAT IS THIS!!!", which had struck the
            // table's navigation whole. The dead door he raged at stays dead: on the table the trio's square is a
            // Self the theme greys and unpresses; the Navigation's own bond carries that case.
            if (chapter.is($Cover) || chapter.text.find($Navigation).length > 0) continue;
            chapter.annotations.add(this, <Navigated />);
            chapter.annotations.define();
        }
        super.$Bound();
    }
}

export const TheLibrary = $($TheLibrary);
$(TheLibrary, Theme)(LibraryTheme);
`})]}),"TheBook1"),D=h(()=>n(l,{children:[e(p,{children:"[The Theme](/inexplicable-phenomena/our-reference/#the-theme)"}),n(i,{children:[e(o,{children:"1. The values and the parts of a theme"}),n(a,{children:[e(s,{}),e(t,{children:"1.1 A theme is a set of values, the font, the size, the leading, the measure, the space, the ink, the slate the headings wear since 19 November 2026 on my word for subtlety, the paper, the link, and the parts that use them: the page, the levels of a book, the labels, the links, the apparatus, the figures, the front, the plate, the navigation and the listing."}),n(t,{children:["1.2 The file beside this chapter is the one the book registers, ",e(r,{children:"[The Book](/inexplicable-phenomena/our-reference/#the-book)"})," 1.2. It began as the test library's theme as borrowed, a serif on warm paper, and has been rewritten part by part as the sketches said what this library's own looks like: white paper, Georgia at seventeen, one hairline under the running head, the link's teal on the running head and the links alone."]}),e(t,{children:"1.3 A theme is composed of parts so that a subclass changes one and keeps the rest; every selector in it is a mark of what a writing is."})]})]}),n(i,{children:[e(o,{children:"2. The theme's listing part"}),n(a,{children:[e(s,{}),n(t,{children:["2.1 The listing part dresses the reference manual's listing in the numbers measured off my own library's manual on 17 November 2026, ",e(r,{children:"[The Reference Manual](/inexplicable-phenomena/our-reference/#the-reference-manual)"})," 3.1: JetBrains Mono at 12px on a 20.4px line, the ink pale on a night of deep teal, keywords sky, strings amber, names mint, comments dimmed, the numbers in a 44px column of brass, and the light palette when the book wears the light switch."]}),n(t,{children:["2.2 The same part lets the sheet's measure go while the book is editing, so the editor's layer may grid the window. The appendix section of a table takes no rule of its own: it is a section of the table like any other, in the same voice, ",e(r,{children:"[The Reference Manual](/inexplicable-phenomena/our-reference/#the-reference-manual)"})," 6.3, on my word of 19 November 2026 against a faded smaller section behind a divider."]})]})]}),e(m,{}),e(d,{identifier:"code",type:".tsx",children:`import { ElementType } from 'react';
import { css, RuleSet } from 'styled-components';
import { $, selection } from '@dna-platform/chemistry';
import { $Theme } from '@dna-platform/public';

declare module 'styled-components' {
    export interface DefaultTheme extends $LibraryTheme {}
}

export class $LibraryTheme extends $Theme {
    font = "Georgia, 'Times New Roman', serif";
    size = '1.0625rem';
    leading = '1.6';
    measure = '40rem';
    space = '1.25rem';
    ink = '#1b1b1b';
    // SLATE, Doug, 2026-11-19: "make headings a bit less drastic, bold less drastic, maybe font color to be a bit
    // slate? I like subtlety in design and thoughtful choices about saliency, accent, comfort on the eyes" — the
    // headings' colour, a slate short of the ink; Georgia has no half-bold, so the colour does the quieting.
    slate = '#3b4a55';
    paper = '#ffffff';
    link = '#1f4e79';
    style: ElementType = selection.div\`\${this.parts()}\`;

    protected parts(): RuleSet[] {
        return [this.page(), this.levels(), this.labels(), this.links(), this.apparatus(), this.figures(), this.front(), this.plate(), this.navigation(), this.listing()];
    }

    // THE LISTING IS HIS, Sprint 131, measured off his manual on 2026-11-17 on Doug's "the code should probably look
    // identical to what's in mine": JetBrains Mono at 12px on a 20.4px line, the ink #d6e1e3 on a night of deep teal,
    // keywords sky, strings amber, names mint, comments dimmed, the numbers in a 44px column of brass, his light
    // palette when the book wears the light switch; the bar his, the file tabs in the face, the words in the page's
    // own label voice. The pane scrolls within seven tenths of the window on the page; the editor's layer lets it
    // take the window. No shading anywhere, his "Not bookish with shading. Paperish as in unfinished"; the light
    // palette alone keeps a hairline inside, since paper on paper needs an edge.
    protected listing(): RuleSet {
        return css\`
            .pd-listing { --night: oklch(0.294 0.028 222.6); --dusk-top: oklch(0.414 0.026 219.3); --dusk: oklch(0.334 0.030 219.3); --bar-line: oklch(0.472 0.042 183.1); --glow: #d6e1e3; --dim: oklch(0.508 0.053 170.2); --brass: #d8c48e; --keyword: #8ad7ff; --string: #ffd48a; --name: #9be3d6; --comment: #5f8a86; display: grid; grid-template-rows: auto minmax(0, 1fr); grid-template-columns: minmax(0, 1fr); min-width: 0; margin-block: \${({ theme }) => theme.space}; background: var(--night); color: var(--glow); }
            .pd-book.pa-light-code .pd-listing { --night: #f6f7f4; --dusk-top: oklch(0.952 0.007 90); --dusk: #eceee8; --bar-line: oklch(0.912 0.027 90); --glow: #2b363c; --dim: oklch(0.738 0.033 88.3); --brass: #5d4a16; --keyword: #5a4fa8; --string: #2f7f6e; --name: #23407a; --comment: #8a94a3; box-shadow: inset 0 0 0 1px color-mix(in srgb, \${({ theme }) => theme.ink} 12%, transparent); }
            .pd-listing-bar { display: flex; flex-wrap: wrap; align-items: stretch; gap: 1px; min-width: 0; margin-block: 0; padding: 0 0 0 2px; background: linear-gradient(180deg, var(--dusk-top), var(--dusk)); border-block-end: thin solid var(--bar-line); }
            .pd-listing-bar .pd-file-tab { display: flex; align-items: center; gap: 7px; padding: 9px 14px 8px 12px; border: 0; border-block-start: 2px solid transparent; background: none; font: 500 12px/1 'JetBrains Mono', ui-monospace, monospace; color: color-mix(in oklch, var(--glow) 62%, var(--night)); cursor: pointer; }
            .pd-listing-bar .pd-file-tab[aria-pressed='true'] { color: var(--glow); background: var(--night); border-block-start-color: var(--brass); }
            .pd-listing-bar .pd-mark { color: #9aa4b3; font-size: 13px; letter-spacing: -1px; }
            .pd-listing-bar .pd-file-tab[aria-pressed='true'] .pd-mark { color: var(--brass); }
            .pd-listing-bar .pd-faces, .pd-listing-bar .pd-options, .pd-listing-bar .pd-modes { display: flex; align-items: center; gap: 2px; padding: 0 8px 0 4px; border-inline-start: thin solid color-mix(in oklch, var(--glow) 12%, transparent); }
            .pd-listing-bar .pd-options { margin-inline-start: auto; }
            .pd-listing-bar .pd-switch, .pd-listing-bar .pd-run-switch { border: 0; background: none; padding: 5px 7px; font-family: \${({ theme }) => theme.font}; font-size: 11.9px; letter-spacing: .15em; text-transform: uppercase; color: color-mix(in oklch, var(--glow) 55%, var(--night)); cursor: pointer; white-space: nowrap; }
            .pd-listing-bar .pd-switch[aria-pressed='true'], .pd-listing-bar .pd-run-switch[aria-pressed='true'] { color: var(--glow); background: color-mix(in oklch, var(--glow) 10%, transparent); }
            .pd-listing-bar .pd-modes .pd-switch, .pd-listing-bar .pd-faces .pd-run-switch { color: var(--brass); }
            .pd-listing-bar .pd-modes .pd-switch[aria-pressed='true'], .pd-listing-bar .pd-faces .pd-run-switch[aria-pressed='true'] { color: var(--glow); background: color-mix(in oklch, var(--glow) 10%, transparent); }
            .pd-listing .pd-pane { max-height: 70vh; min-width: 0; overflow: auto; scrollbar-width: thin; scrollbar-color: transparent transparent; }
            .pd-listing .pd-pane:hover { scrollbar-color: var(--dim) transparent; }
            .pd-listing .pd-pane .pd-code { margin: 0; padding: 14px 0; border: 0; font: 400 12px/20.4px 'JetBrains Mono', ui-monospace, monospace; color: var(--glow); background: transparent; white-space: normal; overflow: visible; }
            .pd-listing .pd-code-line { display: block; white-space: pre; padding-inline-end: 18px; }
            .pd-listing .pd-code-line::before { content: attr(data-line); display: inline-block; width: 44px; margin: 0; padding-inline-end: 14px; text-align: end; color: var(--dim); opacity: 1; user-select: none; }
            .pd-book.pa-unnumbered-code .pd-listing .pd-code-line::before { content: ''; width: 14px; padding: 0; }
            .pd-book.pa-wrapped-code .pd-listing .pd-code-line { white-space: pre-wrap; padding-inline-start: 58px; text-indent: -58px; }
            .pd-book.pa-wrapped-code .pd-listing .pd-code-line::before { text-indent: 0; }
            .pd-listing .hljs-keyword, .pd-listing .hljs-built_in, .pd-listing .hljs-literal { color: var(--keyword); }
            .pd-listing .hljs-string, .pd-listing .hljs-regexp, .pd-listing .hljs-number { color: var(--string); }
            .pd-listing .hljs-title, .pd-listing .hljs-type, .pd-listing .hljs-tag, .pd-listing .hljs-name, .pd-listing .hljs-attr { color: var(--name); }
            .pd-listing .hljs-comment, .pd-listing .hljs-meta { color: var(--comment); }
            .pd-listing .pd-run { display: block; width: 100%; height: 70vh; border: 0; background: #fff; }
            /* THE EDITOR TAKES THE WINDOW: while the book is editing, the sheet lets its measure go and the editor's
               layer grids it. The appendix, a part of the table of contents, is a section of the table like any
               other and takes no rule of its own: Doug, 2026-11-19, on a faded smaller section behind a divider,
               "what is with the small weird fade, non-matching appendix part... Do we need dividers? So much space." */
            &:has(.pd-book.pa-editing) { max-width: none; margin-inline: 0; padding: 0; }
        \`;
    }

    // THE NAVIGATION, one line of apparatus at the top and bottom of a chapter, drawn around the chapter by the book's
    // Navigated format: three glyphs, the arrow looking back on the left, the square for the table of contents in the
    // middle, the arrow looking on at the right, on Doug's "left arrow, square, right arrow for the next previous and
    // table. Visually engaging" (2026-11-16); a self edge, the first or the last chapter's, keeps its place unseen.
    // Doug, the same day: "We need to be able to move easily."
    protected navigation(): RuleSet {
        return css\`
            .pd-navigation { display: flex; justify-content: center; align-items: baseline; gap: .15em; margin-block: calc(\${({ theme }) => theme.space} / 2); }
            *:has(> .pd-navigation:first-child) { position: relative; }
            .pd-navigation:first-child { position: absolute; inset-block-start: .1rem; inset-inline-end: 0; margin-block: 0; z-index: 2; }
            .pd-navigation a { text-decoration: none; }
            .pd-navigation .pd-word { font-size: \${({ theme }) => theme.size}; line-height: 1; color: color-mix(in srgb, \${({ theme }) => theme.ink} 55%, \${({ theme }) => theme.paper}); transition: color .15s ease; }
            .pd-navigation a:hover .pd-word { color: \${({ theme }) => theme.ink}; }
            .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) { pointer-events: none; }
            .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word { color: color-mix(in srgb, \${({ theme }) => theme.ink} 22%, \${({ theme }) => theme.paper}); }
        \`;
    }

    // THE FRONT, the cover drawn as a book, Sprint 125: shown alone while the cover is the open page, the running
    // head, the byline and the cover chapter itself unseen then and back the moment another page opens; a page
    // that opens comes in with a short fade, the library's one transition. Sketch 004, form a.
    protected front(): RuleSet {
        return css\`
            .pd-front { display: none; }
            .pd-book:has(.pa-cover.pa-open) .pd-front { display: flex; }
            .pd-book:has(.pa-cover.pa-open) .pd-running-head, .pd-book:has(.pa-cover.pa-open) .pd-byline, .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open { display: none; }
            /* THE BOARD FILLS THE SCREEN, Doug, 2026-11-17: "make the book bigger... as large as possible given
               that my screen looks like this" — the board stands as tall as the screen allows, the book's upper
               margin above it and the same air below, its width following at a book's proportion and capped at
               the column on a narrow screen; every length on the board is an em of the board's own size, one
               twenty-second of its width, the size the 22rem board of Sprint 125 was drawn at, so the type and the
               frame grow with it as a print enlarges. The seven spaces taken from the screen's height are the
               three above and the three below, and one for the page to breathe at the bottom without a scrollbar. */
            .pd-front { --front-width: min(calc((100vh - 7 * \${({ theme }) => theme.space}) * 2 / 3), calc(min(\${({ theme }) => theme.measure}, 100vw) - 2 * \${({ theme }) => theme.space})); position: relative; box-sizing: border-box; width: var(--front-width); font-size: calc(var(--front-width) / 22); flex-direction: column; align-items: center; text-align: center; aspect-ratio: 2 / 3; margin: 0 auto calc(2 * \${({ theme }) => theme.space}); padding: 3em 2em 1.75em; border: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 50%, \${({ theme }) => theme.paper}); box-shadow: inset 0 0 0 .375em \${({ theme }) => theme.paper}, inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, \${({ theme }) => theme.ink} 35%, \${({ theme }) => theme.paper}), 2px 12px 28px -12px rgba(0, 0, 0, .45); background: \${({ theme }) => theme.paper}; }
            .pd-front::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1.25em; background: linear-gradient(to right, color-mix(in srgb, \${({ theme }) => theme.ink} 22%, transparent), color-mix(in srgb, \${({ theme }) => theme.ink} 5%, transparent) 55%, transparent); z-index: 1; pointer-events: none; }
            .pd-front > a, .pd-front .pd-word { display: block; }
            .pd-front .pa-reference { color: inherit; text-decoration: none; }
            .pd-front a:hover .pd-word { text-decoration: underline; text-underline-offset: 0.15em; }
            .pd-front-name { font-size: 2.4em; line-height: 1.1; font-weight: bold; margin-block: .15em .33em; }
            .pd-front-name::after { content: ''; display: block; width: 1.45em; border-top: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 50%, \${({ theme }) => theme.paper}); margin: .375em auto 0; }
            .pd-front-author { font-size: 1.15em; letter-spacing: .04em; }
            .pd-front-tagline { font-style: italic; opacity: .75; margin-top: 1.15em; font-size: .95em; }
            .pd-front > :nth-last-child(2) { margin-top: auto; }
            .pd-front-imprint { font-size: .74em; letter-spacing: .15em; text-transform: uppercase; opacity: .65; margin-top: .47em; }
            .pa-page.pa-open { animation: come .5s ease; }
            @keyframes come { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: none; } }
        \`;
    }

    // THE PLATE, a publication's small picture at the top left of its page with the text flowing under it, Sprint
    // 125; its opening carries no underline, the picture being the link. Sketch 002, form a.
    protected plate(): RuleSet {
        return css\`
            .pd-plate { float: inline-start; width: 11rem; margin: .25rem 1.5rem 1rem 0; }
            .pd-plate .pd-image img { margin-block: 0; border: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 20%, \${({ theme }) => theme.paper}); box-shadow: 0 1px 3px rgba(0, 0, 0, .12); }
            .pd-plate .pa-opening { text-decoration: none; color: inherit; }
            .pd-plate .pa-opening .pd-word { display: block; font-size: .8rem; margin-top: .4rem; opacity: .75; text-decoration: underline; }
            .pd-chapter:has(> .pd-paragraph > .pd-plate) > .pd-paragraph:first-child { margin-block: 0; }
            @media (max-width: 640px) { .pd-plate { width: 7rem; margin-right: 1rem; } }
        \`;
    }

    protected page(): RuleSet {
        return css\`
            font-family: \${({ theme }) => theme.font};
            font-size: \${({ theme }) => theme.size};
            line-height: \${({ theme }) => theme.leading};
            color: \${({ theme }) => theme.ink};
            background: \${({ theme }) => theme.paper};
            max-width: \${({ theme }) => theme.measure};
            margin-inline: auto;
            padding: \${({ theme }) => theme.space};
        \`;
    }

    protected levels(): RuleSet {
        return css\`
            /* THE UPPER MARGIN STANDS EVERYWHERE, Doug, 2026-11-17: "No upper margin. That should be put back
               everywhere" — every page breathes above its first line. */
            .pd-book { margin-block: calc(2 * \${({ theme }) => theme.space}) \${({ theme }) => theme.space}; counter-reset: chapter equation; }
            .pd-chapter { margin-block: \${({ theme }) => theme.space}; scroll-margin-block-start: \${({ theme }) => theme.space}; }
            .pa-page.pa-open { margin-block-start: calc(\${({ theme }) => theme.space} / 2); }
            /* NO LINE BREAKS, Doug, 2026-11-16: "No line break", then "Still breaks EVERYWHERE!!!" — a section
               carries no rule and no extra padding anywhere in the library; margins alone separate. */
            .pd-section { margin-block: \${({ theme }) => theme.space}; }
            .pd-paragraph { margin-block: \${({ theme }) => theme.space}; }
            .pa-item { margin-block: calc(\${({ theme }) => theme.space} / 4); }
            .pa-list .pa-item { list-style-position: outside; margin-inline-start: 1.2em; }
            .pd-title { font-size: calc(1.5 * \${({ theme }) => theme.size}); font-weight: bold; margin-block-end: \${({ theme }) => theme.space}; }
            .pd-heading { font-weight: bold; font-size: calc(1.15 * \${({ theme }) => theme.size}); margin-block: \${({ theme }) => theme.space} 0; color: \${({ theme }) => theme.slate}; }
            .pd-section > .pd-heading { margin-block-start: 0; }
            .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)) { display: none; }
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(\${({ theme }) => theme.space} / 4); }
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }
        \`;
    }

    protected labels(): RuleSet {
        return css\`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * \${({ theme }) => theme.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        \`;
    }

    protected links(): RuleSet {
        return css\`
            .pa-reference { color: \${({ theme }) => theme.link}; text-decoration-color: \${({ theme }) => theme.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            /* a heading references itself, and the inheriting above would take the headings' slate from it */
            .pd-heading.pa-self-reference { color: \${({ theme }) => theme.slate}; }
            .pa-referent { scroll-margin-block-start: \${({ theme }) => theme.space}; }
            .pa-content { color: \${({ theme }) => theme.link}; }
        \`;
    }

    protected apparatus(): RuleSet {
        return css\`
            /* THE HEADER IS ONE COMPACT BAND, Doug, 2026-11-16: "You need to organize the header in the theme. It
               takes up too much space and isn't used. Look how far down the title of the chapter is. Wait are you
               making every chapter like a cover?!?" — the running head a bordered line with no paragraph margin, the
               byline one small line beneath it, author and subject side by side, not a title block of rows. */
            .pd-running-head {
                font-size: calc(0.7 * \${({ theme }) => theme.size});
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin-block: 0 calc(\${({ theme }) => theme.space} / 2);
                padding-block-end: calc(\${({ theme }) => theme.space} / 4);
                border-block-end: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 30%, \${({ theme }) => theme.paper});
            }
            /* THE RUNNING HEAD IS GREY, not the links' teal: the word inside the anchor wears the reference class, and
               the links' colour beat this rule on it from 16 to 19 November; Doug, 2026-11-19: "Why color on the
               title at the top?... Yeah you can fix that." */
            .pd-running-head a, .pd-running-head .pa-reference { text-decoration: none; color: color-mix(in srgb, \${({ theme }) => theme.ink} 70%, \${({ theme }) => theme.paper}); }
            .pd-running-head a:hover, .pd-running-head a:hover .pa-reference { color: \${({ theme }) => theme.ink}; }
            /* ONE HEADER, EVERY PAGE, ITS TABLE-NESS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of
               contents doesn't have the little square. Why isn't it the same thing as the others? Table of contents
               can be an attribute to capture polymorphism." — the same running head stands on every page, the square
               to the cover everywhere, the table's page included; only the title's destination flips, keyed here
               alone on the open table and the title's own data-to attribute. */
            .pd-running-head .pd-square { margin-inline-start: 0.6em; }
            .pd-running-head .pd-book-title[data-to="cover"] { display: none; }
            .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"] { display: none; }
            .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"] { display: inline; }
        \`;
    }

    protected figures(): RuleSet {
        return css\`
            .pd-figure { max-width: 100%; }
            .pd-code {
                font-family: ui-monospace, monospace;
                font-size: calc(0.85 * \${({ theme }) => theme.size});
                line-height: 1.5;
                white-space: pre;
                overflow-x: auto;
                margin-block: \${({ theme }) => theme.space};
                padding: calc(0.75 * \${({ theme }) => theme.space}) \${({ theme }) => theme.space};
                border-inline-start: 2px solid color-mix(in srgb, \${({ theme }) => theme.ink} 25%, \${({ theme }) => theme.paper});
            }
            .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: \${({ theme }) => theme.space}; }
            .pd-document object { display: block; width: 100%; aspect-ratio: 1 / 1.4142; margin-block: \${({ theme }) => theme.space}; }
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        \`;
    }
}

export const LibraryTheme = $($LibraryTheme);
`})]}),"TheTheme2"),O=h(()=>n(l,{children:[e(p,{children:"[The Running Head and the Byline](/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline)"}),n(i,{children:[e(o,{children:"1. The running head"}),n(a,{children:[e(s,{}),e(t,{children:"1.1 The running head is the book's title alone, the minimal heading in the page's top margin, ruled on 16 November 2026: pressed, it opens the table of contents, except on the table itself, where it opens the cover."}),e(t,{children:"1.2 One running head stands on every page, the title written twice with its destination carried by its own attribute and chosen by the theme in one place; the square to the cover stands beside it everywhere, the table's page like any other, since the table-ness is an attribute and not a different head."})]})]}),n(i,{children:[e(o,{children:"2. The byline"}),n(a,{children:[e(s,{}),e(t,{children:"2.1 The byline, who wrote the book, what it is about when the book is a subject's own, and its subject, is no longer drawn above the chapters; it lives on the front and in the table of contents."}),e(t,{children:"2.2 Both the running head and the byline are read from the cover and nowhere else; neither is written in a chapter. A subject is a book made one by its About, so the four books whose subject is Mathematics resolve to the book that is about it."}),e(t,{children:"2.3 The file beside this chapter is both faces, borrowed from the test library and kept as the sketches confirmed them."})]})]}),e(m,{}),e(d,{identifier:"code",type:".tsx",children:`import { ReactNode } from 'react';\r
import { $ } from '@dna-platform/chemistry';\r
import { $Paragraph, $Word, Reference as reference, Word as word } from '@dna-platform/public';\r
\r
export class $RunningHead extends $Paragraph {\r
    protected override $Define(): void {\r
        super.$Define();\r
        this.classes.add(this, 'pd-running-head');\r
    }\r
\r
    // THE MINIMAL HEADING, Doug, 2026-11-16: "a minimal heading, at least with the book title and if you click it\r
    // it should go to the table of contents except the version on the table and that one takes you to the cover" —\r
    // just the book's title, both destinations bound, the theme showing the one the open page calls for.\r
    // THE TABLE-NESS IS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of contents doesn't have the\r
    // little square. Why isn't it the same thing as the others? Table of contents can be an attribute to capture\r
    // polymorphism." — one running head on every page: the title written twice, its destination carried by its\r
    // own data-to attribute and chosen by the theme in one place; the square to the cover always, the table's\r
    // page like any other.\r
    override write(): ReactNode {\r
        const book = this.book;\r
        if (book === undefined) return null;\r
        const table = book.table?.canonical;\r
        const Word = $(word);\r
        const Reference = $(reference);\r
        return (\r
            <>\r
                <span className="pd-book-title" data-to="table">\r
                    <Word>\r
                        <Reference>{table?.means?.identifier}</Reference>\r
                        {book.title?.name}\r
                    </Word>\r
                </span>\r
                <span className="pd-book-title" data-to="cover">\r
                    <Word>\r
                        <Reference>{book.means?.identifier}</Reference>\r
                        {book.title?.name}\r
                    </Word>\r
                </span>\r
                <span className="pd-square">\r
                    <Word>\r
                        <Reference>{book.means?.identifier}</Reference>\r
                        ☐\r
                    </Word>\r
                </span>\r
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
                {book.about === undefined ? null : <>\r
                    <Label>About</Label> <Word>\r
                        <Reference>{book.about.means?.identifier}</Reference>\r
                        {book.about.name}\r
                    </Word>\r
                </>}\r
                <Label>Subject</Label> <Word>\r
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
`})]}),"TheRunningHeadAndTheByline3"),j=h(()=>n(l,{children:[e(p,{children:"[The Faces](/inexplicable-phenomena/our-reference/#the-faces)"}),n(i,{children:[e(o,{children:"1. The four faces"}),n(a,{children:[e(s,{}),e(t,{children:"1.1 A face is how a book's apparatus looks: the cover a book opens on, the synopsis beside it, the table of contents that answers for its chapters and, when the book is a subject, for the books whose subject it is, and the table drawn inside a chapter."}),e(t,{children:"1.2 Each is a word of the package dressed here, and every book of this library wears these four from the file beside this chapter, borrowed from the test library until a sketch replaced them."}),e(t,{children:"1.3 A tagline is one line of what the book is, said of a cover as its author and its subject are, written in the cover file and drawn on the front; the synopsis is the block, and has its own page, on my word of 12 November 2026."})]})]}),n(i,{children:[e(o,{children:"2. The front"}),n(a,{children:[e(s,{}),e(t,{children:"2.1 Since 10 November 2026 the cover is drawn as a book: the front, in the file beside this chapter, a board of a book's shape standing alone on the page while the cover is the open page, as tall as the screen allows since 17 November 2026, its type growing with it."}),e(t,{children:`2.2 On the board stand the title, the author, the tagline and the imprint, read from what the cover already says, as the byline is; the synopsis's first paragraph stood in the tagline's place until 12 November 2026, when I struck it, "an extensive block is a synopsis", the synopsis being its own page, reached from the table.`}),n(t,{children:["2.3 Its words are its links, the title opening the table of contents, the author and the subject their books, the library's name the library; the running head, the byline and the cover's own title stand unseen behind it until another page opens. The theme draws it and gives a page that opens its one transition, a short fade. Sketch 004 of ",e(r,{children:"[The Paper's Page](/inexplicable-phenomena/mathematical-design/#the-papers-page)"}),", form a, by my number."]})]})]}),n(i,{children:[e(o,{children:"3. The navigation"}),n(a,{children:[e(s,{}),e(t,{children:"3.1 Every chapter but the cover and the table carries one line of apparatus above and below, in the running head's register: the previous chapter's arrow looking back, the square to the table, the next chapter's arrow looking on, three outline characters typed tight at text size, on my words of 16 November 2026; an edge with no neighbour keeps its place and is greyed, never hidden."}),n(t,{children:["3.2 The line is a format said of the chapter by the book, ",e(r,{children:"[The Book](/inexplicable-phenomena/our-reference/#the-book)"})," 1.4, whose layer wraps the chapter's element with the two lines; the words are made at the bond, since a word made at render stood on the page as plain text."]})]})]}),e(m,{}),e(d,{identifier:"code",type:".tsx",children:`import { ElementType, ReactNode } from 'react';
import { $, $check, selection } from '@dna-platform/chemistry';
import { $Annotation, $Chapter, $Cover, $Format, $Paragraph, $Synopsis, $Table, $TableOfContents, $Word, $Writing, AnnotationSpecification, Means as means, Next as nextWord, Previous as previousWord, Reference as reference, Self as selfReference, Word as word, html, specify } from '@dna-platform/public';

// A TAGLINE IS ONE LINE OF WHAT THE BOOK IS, said of a cover as its author and its subject are, written in the cover
// file and drawn on the front; the synopsis is the block, and has its own page. Doug, 2026-11-12, Sprint 127: "You
// can add a one line note about what the book is. That would be a tagline, but an extensive block is a synopsis".
// PROXY name.
export class $Tagline extends $Annotation {
    specification = new TaglineSpecification();
    get line(): string { return html.copy(this.text); }
    override write(): ReactNode { return this.line; }
}
export class TaglineSpecification extends AnnotationSpecification {
    @specify('a tagline is said of a cover')
    $saidOfACover(writing: $Writing): void {
        $check(writing instanceof $Chapter && writing.is($Cover), 'a tagline is said of a cover, and this is not one');
    }
}

// THE FRONT IS THE BOOK'S COVER DRAWN AS A BOOK: the title, the author, the tagline and the imprint on a board of a
// book's shape, standing alone on the page while the cover is open; its words are its links, the title to the table
// of contents, the author and the subject to their books, the library's name to the library. Drawn from what the
// cover already says, as the byline is. The synopsis's first paragraph stood on the board until 2026-11-12,
// Sprint 127, Doug: "get rid of the big wad of text on the cover... those notes are the synopsis, and they aren't
// bad, but then use the synopsis page"; the synopsis is its own chapter, reached from the table, and the tagline
// took its place on the board the same day. Sprint 125, Doug, 2026-11-10: "Give the cover the feel of a book... it
// should have the author and subject on the cover and not have the header", and on the first build, "various things
// should be clickable on the cover - author, subject and getting to the table", and "I don't like this 'Filed under'
// because that isn't about a subject", so the imprint names the subject plainly. Sketch 004 of the design book,
// form a. PROXY names: Front and its four words.
export class $FrontName extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-name'); }
}
export class $FrontAuthor extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-author'); }
}
export class $FrontTagline extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-tagline'); }
}
export class $FrontImprint extends $Word {
    protected override $Define(): void { super.$Define(); this.classes.add(this, 'pd-front-imprint'); }
}

export class $Front extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-front');
    }

    override write(): ReactNode {
        const book = this.book;
        if (book === undefined) return null;
        const Name = $(frontName);
        const Author = $(frontAuthor);
        const Tagline = $(frontTagline);
        const Imprint = $(frontImprint);
        const Means = $(means);
        const Reference = $(reference);
        const tagline = book.cover?.annotations.expressed($Tagline);
        // THE TABLE'S ADDRESS IS ITS TITLE'S, as the running head reads it: a chapter's means is the means its title
        // carries, and the table chapter itself carries none.
        const table = book.table?.canonical;
        return (
            <>
                <Name>
                    <Reference>{table?.means?.identifier}</Reference>
                    {book.title?.name}
                </Name>
                <Author>
                    <Reference>{book.author?.means?.identifier}</Reference>
                    {book.author?.name}
                </Author>
                {tagline === undefined ? null : <Tagline>{tagline.line}</Tagline>}
                <Imprint>
                    <Reference>{book.subject?.means?.identifier}</Reference>
                    {book.subject?.name}
                </Imprint>
                <Imprint>
                    <Means>$[[ Inexplicable Phenomena ]]</Means>
                </Imprint>
            </>
        );
    }
}

// THE NAVIGATION, Doug, 2026-11-16: "You need next and table of contents and previous on the top and bottom of
// every chapter in the library. We need to be able to move easily." One line of apparatus in the running head's
// register: the previous chapter's title on the left, Contents in the middle on the table's address, the next
// chapter's title on the right; an edge with no neighbour keeps its place empty so the line holds. Written into
// a chapter for now; the seam that puts it on every chapter of the library awaits his word on the layer.
// PROXY name. Styled by the theme as pd-navigation.
export class $Navigation extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-navigation');
    }

    // THE WORDS ARE MADE AT THE BOND, not in write(): Previous and Next take their references in their own bond,
    // and the bond reaches only the authored tree, so a word made at render stood on the page as plain text, seen
    // on the bound textbook page on 2026-11-16, Contents the only link of the three. At an edge the package
    // answers the chapter itself, never nothing, and Next means it as a Self; the theme keeps that edge's place
    // and hides it.
    protected override $Bound(): void {
        const chapter = this.chapter;
        const book = this.book;
        if (chapter !== undefined && book !== undefined && [...this.text].length === 0) {
            const Previous = $(previousWord);
            const Next = $(nextWord);
            const Word = $(word);
            const Reference = $(reference);
            const Self = $(selfReference);
            const table = book.table?.canonical;
            // THE TABLE IS NAVIGATED TOO, Doug, 2026-11-19: "Why doesn't the table have a front back navigation
            // or other controls" — superseding 2026-11-16's "WHAT IS THIS!!!", which had struck the table's
            // navigation whole. Both words hold: the table moves — back to the cover, on to the first chapter —
            // and its own door is a Self the theme keeps in place, grey and unpressable. The back arrow names the
            // cover itself, never chapter.previous, because the hidden synopsis stands between them.
            if (chapter.is($TableOfContents)) {
                this.text.add(this,
                    <Word>
                        <Reference>{book.means?.identifier}</Reference>
                        ◁
                    </Word>,
                    <Word>
                        <Self>{chapter.mention?.identifier}</Self>
                        ☐
                    </Word>,
                    <Next>▷</Next>
                );
                super.$Bound();
                return;
            }
            // THREE CHARACTERS IN A ROW, Doug, 2026-11-16, after the buttons were refused: "Not a button!! I
            // wanted in three characters a left triangle (not arrow) and then a square in the middle that goes
            // to table, then the right arrow as a triangle. Three characters in a row like the arrow we use in
            // catalogues to go straight to a book", and on sight: "ALL WHITE OUTLINE characters!! Just three
            // characters. left triangle square (not filled in!!!) right arrow. Grey it but don't hide it. Don't
            // make it take up the whole line" — ◁ □ ▷, outline glyphs, solid grey, a cluster of their own width.
            // LSR, Doug, 2026-11-16: "Three characters. Up against each other. Spaced like in text. Same height.
            // White with outline. Two triangles and a square. The ones we use in cataloguing pages and we used to
            // use in my library for a canonical reference." — and, on the plain square inking 8px against the
            // triangles' 13, "Not the same size!!", and on the rounded ▢, "It has rounded edges. Pretty sure
            // there is a character. But all three have to match": measured in Chrome, ☐ inks 12×13 at ascent 12
            // with sharp corners — the triangles' own metrics — so the trio is ◁ ☐ ▷, typed tight at text size;
            // no edge is ever hidden.
            this.text.add(this,
                <Previous>◁</Previous>,
                <Word>
                    <Reference>{table?.means?.identifier}</Reference>
                    ☐
                </Word>,
                <Next>▷</Next>
            );
        }
        super.$Bound();
    }
}

// NAVIGATED, said of a chapter by its book, the seam of 2026-11-16: a format whose layer wraps the chapter's
// element with the navigation above it and below it. The two lines are the format's own text, so the chapter's
// bond reaches them and their words take their links; the layer draws those two instances and makes nothing at
// render. A format's layer stands outside the chapter's element, which Paginated hides by a class on the element
// itself, so the layer hides itself whenever its page is not the open one. The book says it of every chapter but
// the cover, whose page is the front, and leaves alone a chapter that already says Navigation in its own text.
// PROXY name; reads "this chapter is Navigated".
export class $Navigated extends $Format {
    specification = new NavigatedSpecification();
    protected _layer?: ElementType;
    override style = selection.div\`
        &:not(:has(.pa-page.pa-open)) { display: none; }
    \`;

    protected override $Define(): void {
        super.$Define();
        const Navigation = $(navigation);
        this.text.add(this,
            <Navigation />,
            <Navigation />
        );
    }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-navigated');
        writing.containers.add(this, this.layer);
    }

    override erase(writing: $Writing): void {
        writing.containers.revert(this);
        writing.classes.revert(this);
    }

    protected get layer(): ElementType {
        if (this._layer !== undefined) return this._layer;
        const Style = this.style as ElementType;
        const [above, below] = [...this.text];
        const Above = $(above);
        const Below = $(below);
        return this._layer = ({ className, children }: { className?: string; children?: ReactNode }) => (
            <Style className={className}>
                <Above />
                {children}
                <Below />
            </Style>
        );
    }
}

export class NavigatedSpecification extends AnnotationSpecification {
    @specify('navigated is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'navigated is said of a chapter, and this is not one');
    }
}

export class $LibraryCover extends $Cover {
    override style = selection.header\`
        .pd-chapter.pa-cover { margin-block: \${({ theme }) => theme.space} calc(2 * \${({ theme }) => theme.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * \${({ theme }) => theme.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    \`;
}

export class $LibrarySynopsis extends $Synopsis {
    style = selection.div\`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    \`;
}

export class $LibraryTableOfContents extends $TableOfContents {

    // ONE VOICE FOR THE TABLE, Doug, 2026-11-19: "Your headings are smaller and different font than the links and the
    // links are blue which maybe isn't right?... I like subtlety in design and thoughtful choices about saliency,
    // accent, comfort on the eyes" — the headings in the text's own voice at its size, bold in the theme's slate,
    // and every row in ink: a list that is all links says nothing by colouring each one. Chosen from the sketch's
    // form d, "one row, headed", the same day.
    // THE VOICE IS SAID ON THE ANCHOR, Doug, 2026-11-19: "Why do the links on the table look so bad?" — the row's
    // anchor stands OUTSIDE its paragraph, so the paragraph-first rules inked the words while the anchor kept the
    // links' blue underline under them. The title draws its own words now, so the ::before label is struck.
    override style = selection.nav\`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(\${({ theme }) => theme.space} / 4); }
        .pa-table-of-contents .pd-heading { font-size: 1em; font-weight: bold; color: \${({ theme }) => theme.slate}; margin-block: \${({ theme }) => theme.space} calc(\${({ theme }) => theme.space} / 4); }
        .pa-table-of-contents .pd-section > .pd-heading { margin-block-start: 0; }
        .pa-table-of-contents a.pa-reference { color: \${({ theme }) => theme.ink}; text-decoration-line: none; }
        .pa-table-of-contents .pa-content { color: \${({ theme }) => theme.ink}; }
    \`;
}

export class $LibraryTable extends $Table {
    override style = selection(this.style)\`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * \${({ theme }) => theme.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(\${({ theme }) => theme.space} / 3) calc(0.75 * \${({ theme }) => theme.space}) calc(\${({ theme }) => theme.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 15%, \${({ theme }) => theme.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, \${({ theme }) => theme.ink} 35%, \${({ theme }) => theme.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 15%, \${({ theme }) => theme.paper}); }
    \`;
}

export const Cover = $($LibraryCover);
export const Synopsis = $($LibrarySynopsis);
export const TableOfContents = $($LibraryTableOfContents);
export const Table = $($LibraryTable);
export const FrontName = $($FrontName);
export const FrontAuthor = $($FrontAuthor);
export const FrontTagline = $($FrontTagline);
export const FrontImprint = $($FrontImprint);
export const Tagline = $($Tagline);
const frontName = FrontName;
const frontAuthor = FrontAuthor;
const frontTagline = FrontTagline;
const frontImprint = FrontImprint;
export const Front = $($Front);
export const Navigation = $($Navigation);
const navigation = Navigation;
export const Navigated = $($Navigated);
`})]}),"TheFaces4"),H=h(()=>n(l,{children:[e(p,{children:"[Developing the Library](/inexplicable-phenomena/our-reference/#developing-the-library)"}),n(i,{children:[e(o,{children:"1. The loop"}),n(a,{children:[e(s,{}),e(t,{children:"1.1 A save shows on an open page in under a second; a bind is the gate at the end of a piece of work and never the way to look during one."}),e(t,{children:"1.2 The workbench beside this chapter is the loop: it serves the library live from its sources, keeps one browser open on it, and answers a look with what it found and a photograph. Borrowed from the librarian's own library on 30 October 2026, its built address this library's."}),e(t,{children:"1.3 It is opened once and left open, node library/.reference/5-developing-the-library~workbench.mjs, and asked from another terminal with look and a book's address, phone for a phone's width, built for the site the last bind made, close at the end."})]})]}),n(i,{children:[e(o,{children:"2. The bind and the site"}),n(a,{children:[e(s,{}),e(t,{children:"2.1 In the binding beside the site, npm run bind binds every book and leaves the site under the base the configuration names, and npm run preview with its port, 4343 here, serves what the bind left."}),e(t,{children:"2.2 The site is committed as it is bound, and what is published is what was committed."})]})]}),n(i,{children:[e(o,{children:"3. Where a component goes"}),n(a,{children:[e(s,{}),e(t,{children:"3.1 A component lives beside the chapter that specifies it. What the whole library wears — the book, the theme, the running head, the faces, the content family — stands in this manual, one chapter and its code each."}),e(t,{children:`3.2 A subject's reference holds what speaks the subject's own language, as mathematics keeps Theorem and Proof, and nothing a second subject would borrow. The moment a second subject wants a component, it is lifted up to this manual and the subject re-exports it, so its books keep one door. On my word of 19 November 2026: "Yes you need to generalize... Time to bring them up."`}),e(t,{children:"3.3 A book's own one-off stands beside its appendix, the way the sketch's tools stand in The Design; it enters no reference until a second book asks for it."}),e(t,{children:"3.4 The dress of a special chapter belongs to its format in the faces, never to a book's hand: a book says what a chapter is, and the format says what that looks like, so saying it is enough in every book at once."})]})]}),e(m,{}),e(d,{identifier:"workbench",type:".mjs",children:`// The workbench: the library served live from its sources, a browser kept open on it, and a way to ask that
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
            const found = /http:\\/\\/localhost:\\d+\\/\\S*/u.exec(said.replace(/\\u001b\\[[0-9;]*m/gu, ''));
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
`})]}),"DevelopingTheLibrary5"),P=h(()=>n(l,{children:[e(p,{children:"[The Paper](/inexplicable-phenomena/our-reference/#the-paper)"}),n(i,{children:[e(o,{children:"1. A paper's page"}),n(a,{children:[e(s,{}),n(t,{children:["1.1 A paper is a citable publication held in the library as a resource: the file itself beside a chapter of ",e(r,{children:"[The Library of Mathematics](/inexplicable-phenomena/mathematical-library/)"}),", which carries the paper's citation and the notes its author writes on it, the paper signed by its own author."]}),e(t,{children:"1.2 The page is minimal, on my word of 10 November 2026: a small picture of the publication at the top left with the text flowing under it, the citation, the notes, and a link that opens the publication in another tab; the picture itself opens it. The page's form is sketch 002 of the design book, form a."})]})]}),n(i,{children:[e(o,{children:"2. The plate and the opening"}),n(a,{children:[e(s,{}),e(t,{children:"2.1 Two words in the file beside this chapter. A plate is the word that carries the picture, floated at the top left of the chapter by the theme; an opening is a reference that opens its address in another tab, a twin of the package's own reference with its anchor given a target."}),e(t,{children:"2.2 A chapter writes the plate first, before its title, as a word holding an opening whose text is the paper's literal and an image whose text is the picture's: the literals become the two files' addresses at the bind, so the picture is served beside the pages and the paper with it."})]})]}),n(i,{children:[e(o,{children:"3. The picture"}),n(a,{children:[e(s,{}),e(t,{children:"3.1 The picture is the paper's first page, made once by the tool beside this chapter: Chrome's own viewer draws the PDF with its toolbar and panes asked off, served to it by the tool since the viewer draws nothing opened from the disk as a file, photographed at a page's shape and cut to the page."}),e(t,{children:"3.2 The tool takes a page number for a scan of a bound book, which opens on its boards: Lobachevsky's title page is its fifth leaf. The picture stands beside the paper's chapter, named by the plate's literal, and is made again only when the paper changes."}),e(t,{children:"3.3 The listing beside this chapter shows both files, the code and the tool, a tab each, which is how a chapter with two files beside it reads in the manual."})]})]}),e(m,{}),e(d,{identifier:"code",type:".tsx",children:`import { ElementType } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Reference, $Word } from '@dna-platform/public';

// A PLATE IS THE SMALL PICTURE OF A PUBLICATION ON ITS PAGE, at the top left with the text flowing under it; the
// word carries the picture and the opening that takes a reader to the publication. Sprint 125, Doug, 2026-11-10:
// "a small picture of the publication... And then clicking it perhaps causes it to open in another tab". PROXY name.
export class $Plate extends $Word {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-plate');
    }
}

// AN OPENING IS A REFERENCE THAT OPENS ITS ADDRESS IN ANOTHER TAB, a twin of the package's Reference with the anchor
// given its target, in the library's own code and nowhere in the package. PROXY name.
export class $Opening extends $Reference {
    override anchor: ElementType = selection.a.attrs({ className: 'pa-reference pa-opening', target: '_blank', rel: 'noopener' })\`\`;
}

export const Plate = $($Plate);
export const Opening = $($Opening);
`}),e(d,{identifier:"preview",type:".mjs",children:`// Makes the small picture of a publication: its first page, drawn by Chrome's own viewer with the viewer's toolbar
// and panes asked off, photographed at a page's shape and cut to the page. The viewer draws a document served to
// it and not one opened from the disk as a file, so the tool serves the PDF itself for the moment of the
// photograph. Run once for a paper, and the picture stands beside the paper's chapter as any picture does.
//
//     node library/.reference/6-the-paper~preview.mjs <paper.pdf> <picture.png> [page]
//
// The page is the first unless said otherwise: a scan of a bound book opens on its boards, and its title page is
// the one to show.

import { readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const puppeteer = createRequire(resolve(repository, 'package.json'))('puppeteer');
const [paper, picture, pageNumber = '1'] = process.argv.slice(2);
if (paper === undefined || picture === undefined) { console.log('node 6-the-paper~preview.mjs <paper.pdf> <picture.png> [page]'); process.exit(1); }

// THE PAGE'S OWN SHAPE, read off the first page box the PDF declares, so a letter-size paper and an A4 one are each
// cut to their page; A4's shape where a PDF declares none. The viewer draws the page across the width and leaves a
// gutter of its own colour at the edges, which the cut leaves out.
const bytes = readFileSync(resolve(paper));
const box = /MediaBox\\s*\\[\\s*([\\d.-]+)\\s+([\\d.-]+)\\s+([\\d.-]+)\\s+([\\d.-]+)\\s*\\]/u.exec(bytes.toString('latin1'));
const shape = box === null ? 1.4142 : Math.abs(Number(box[4]) - Number(box[2])) / Math.abs(Number(box[3]) - Number(box[1]));
const width = 640;
const gutter = 10;
const height = Math.round((width - 2 * gutter) * shape) + 2 * gutter;

// THE WHOLE DOCUMENT AT ONCE, AND NO RANGES OFFERED: offered ranges, the viewer drew the page and cleared it again
// between two photographs, or never drew; given the whole file it draws and keeps it. Measured 2026-11-10.
const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Length', bytes.length);
    response.end(bytes);
});
await new Promise(ready => server.listen(0, '127.0.0.1', ready));
const { port } = server.address();

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width, height });
await page.goto(\`http://127.0.0.1:\${port}/paper.pdf#toolbar=0&navpanes=0&scrollbar=0&page=\${pageNumber}\`, { waitUntil: 'load', timeout: 60000 });
// THE VIEWER DRAWS WHEN IT DRAWS, and nothing in the page says when: a photograph of a page not yet drawn weighs a
// few kilobytes and one drawn weighs many, so the tool photographs until the weight says drawn, for twenty seconds
// at most, and says so when it gave up.
const clip = { x: gutter, y: 0, width: width - 2 * gutter, height: height - 2 * gutter };
let photograph;
let waited = 0;
for (;;) {
    await new Promise(settle => setTimeout(settle, 1000));
    waited += 1;
    photograph = await page.screenshot({ clip });
    if (photograph.length > 8000 || waited >= 20) break;
}
// THE PHOTOGRAPH THAT PASSED IS THE ONE KEPT, since the viewer may clear the page again between two photographs.
writeFileSync(picture, photograph);
console.log(\`\${paper} -> \${picture}, \${width - 2 * gutter} by \${height - 2 * gutter}, the page's shape \${shape.toFixed(3)}\${box === null ? ' assumed' : ''}, drawn after \${waited} s\${photograph.length > 8000 ? '' : ' — NOT DRAWN, the picture is blank'}\`);
await browser.close();
server.close();
`})]}),"ThePaper6"),W=h(()=>n(l,{children:[e(p,{children:"[The Reference Manual](/inexplicable-phenomena/our-reference/#the-reference-manual)"}),n(i,{children:[e(o,{children:"1. What a reference manual is"}),n(a,{children:[e(s,{}),e(t,{children:"1.1 Every subject carries a reference manual: the specification of that subject in this library. This book is the library's own. I ruled this on 12 November 2026, at the opening of the textbook's sprint."}),e(t,{children:"1.2 A subject's manual keeps a part for the books of its subject, one chapter per book, and that chapter tracks the book's idioms — the conventions its chapters follow."}),e(t,{children:"1.3 Where an idiom is enforced by code, the code stands with the chapter that states it, the way this book's theme and faces stand beside theirs; an idiom followed by hand is stated in the same place and marked so."}),n(t,{children:["1.4 A manual is written the way a specification is — numbered parts, referenced code — in the form of ",e(r,{children:"[The Specification](/inexplicable-phenomena/our-reference/#the-specification)"}),"; I asked for this on 16 November 2026, this chapter was the first so written, and since 19 November 2026 every chapter of this book is."]})]})]}),n(i,{children:[e(o,{children:"2. The three shelves"}),n(a,{children:[e(s,{}),e(t,{children:"2.1 What is true of every book in the library lives here, in Our Reference."}),n(t,{children:["2.2 What is true of a subject's books lives in that subject's manual. The first is ",e(r,{children:"[Referential Objectivity](/inexplicable-phenomena/mathematical-reference/)"}),", whose part The Books tracks the notebook, the textbook, the project, the library and the design."]}),e(t,{children:"2.3 What is true of one book alone stays beside that book, never in a manual."})]})]}),n(i,{children:[e(o,{children:"3. The listing"}),n(a,{children:[e(s,{}),n(t,{children:[`3.1 A listing looks identical to a listing in my own library's manual, on my word of 17 November 2026, "the code should probably look identical to what's in mine, but the container for the specification might not": JetBrains Mono at 12px on a 20.4px line, the ink pale on a night of deep teal, keywords sky, strings amber, names mint, comments dimmed, the numbers in a column of brass, the light palette behind the bar's light, wrap under its wrap, the numbers away under its lines. The numbers stand in `,e(r,{children:"[The Theme](/inexplicable-phenomena/our-reference/#the-theme)"}),", section 2."]}),e(t,{children:"3.2 The listing is the package's Code figure dressed: the highlighter's spans coloured, the lines numbered by the figure, nothing drawn that the figure does not already draw. It stands in a paragraph of its own, written in the chapter where the code figure stood, which shows the chapter's files as tabs on its bar, or the one file it names."}),e(t,{children:"3.3 The face is JetBrains Mono, taken from Google Fonts as my page takes it; the Content's source pane stays Consolas, so two monospaces live in the library, the listing's and the specification's."}),e(t,{children:"3.4 Code can be written anywhere it is needed, on my word of the same day: a listing stands in any chapter of any book, a manual's or not, and the dress and the modes follow the file beside the chapter, never the book's kind."}),n(t,{children:["3.5 An appended HTML has two faces: the listing of its source, as every file has, and the page itself run in a frame under the bar's run, which in the editor mode is the full screen. ",e(r,{children:"[The Specification](/inexplicable-phenomena/our-reference/#the-specification)"}),"'s tree is the manual's own case, section 9 there; the sketches of The Design are the others."]})]})]}),n(i,{children:[e(o,{children:"4. The modes"}),n(a,{children:[e(s,{}),e(t,{children:'4.1 The reference manual has two modes, as the code has, on my words of 17 November 2026, "a full screen versus page mode for the reference manual like you do for the code", "So it can be book like and editor like": the page, book-like, the chapter at the measure with the listing as a plate in it; and the editor, full screen and editor-like, which still feels bookish and paperly.'}),e(t,{children:"4.2 A mode is an annotation said of the book, one at a time; the options, light, wrap, lines and the words put away, are annotations beside it. A word on the bar sets the book's edit, the book wears the mode's class, and the sheet decides what shows, so a flip costs one paint and draws nothing twice."}),e(t,{children:"4.3 The bar stands as drawn: the file tabs, run for a page, light, wrap and lines, then words, the page and the editor, the one in force pressed; its word the page returns the chapter to the book-like mode."}),e(t,{children:`4.4 A reference manual opens in the editor; every other book opens on the page, and an appendix's author chooses by the same line in their book's class, on my answer "Reference manuals should default to full but maybe appendix authors can choose?".`}),e(t,{children:`4.5 The paper is unfinished: no shading, no rule but the running heads' hairlines; the white paper against the editor with its options is the contrast kept, on my words "Not bookish with shading. Paperish as in unfinished" and "The white paper and the vscode with UI options is absolutely breathtaking in contrast".`})]})]}),n(i,{children:[e(o,{children:"5. The tree and the file's page"}),n(a,{children:[e(s,{}),e(t,{children:`5.1 In the editor the table of contents is the file tree, on my word "the editor view does use the table as the file tree": it stands open down the left in the page's own voice, every chapter a row, the open chapter's row marked by a hairline of the link's teal, and every file a chapter appends written after its name on the same row as a parenthesis in the code's face, the little square before each file opening the page at that file and the name opening the editor, on my word of 19 November 2026; the open file stands in ink, underlined. A branch is said of each entry of the table by the book at its bond; the written table catalogues chapters and nothing else, and the parenthesis is the view's, on the table's page and in the tree alike.`}),e(t,{children:"5.2 The chapter's words stand beside the tree at a narrower measure, and the file's page stands beside the words at the right under a head naming the file, the open chapter's listing beneath it the height of the window. The book draws the file's page after its chapters, so every book has one, shown only while editing."}),e(t,{children:"5.3 The bar's word words puts the words away, so the tree and the file stand alone, as my library's words tab does."}),e(t,{children:"5.4 A book is editing while the editor mode is on and the open chapter holds a listing; a chapter without a file reads as the page whatever the mode, so a book is never gridded around an empty right-hand page. A leaf pressed opens its chapter in the editor turned to that file; the book's editor holds the open file, so the plate, the file's page and the tree agree on it."}),e(t,{children:"5.5 At a phone's width the three stand in one column, the tree put away, the file's page beneath the words with its pane at seven tenths of the window."})]})]}),n(i,{children:[e(o,{children:"6. The appendix"}),n(a,{children:[e(s,{}),e(t,{children:`6.1 An appendix is a special part of a book, written with the reference manual's components, that refers to the code specific to the book, the files beside its chapters, code, tools, documents, pictures, so an appendix catalogues what the book already holds and invents no second place for it; on my answer of 17 November 2026, "it uses reference manual components, and is like a special part of a book that can refer to code that is specific to the book".`}),e(t,{children:`6.2 The appendix is another part of the table of contents, on my answer "By default yeah it can be another part of the table, since it's kind of different": a section of the table wearing Appendix, headed with the part's name, its rows the part's chapters, each of which says the part at its head.`}),n(t,{children:["6.3 That section reads as any section of the table, the same heading, the same rows, the same voice, standing last because it is written last and taking no rule, no divider and no fade of its own, on my word of 19 November 2026; what marks it is its part alone, since every row of the table carries its chapter's files as a parenthesis, 5.1, the appendix's rows among them; a press on a file opens the chapter the file stands beside, turned to the file, the square on the page and the name in the editor. The components work for an appendix as they do in my personal library, where an appendix reads as its own reference manual inside the book it is in; ",e(r,{children:"[The Sketch's Tools](/inexplicable-phenomena/the-design/#the-sketchs-tools)"})," is the first."]}),e(t,{children:"6.4 A document opens as the Document figure shows it; code, a tool and a markdown file open as listings."})]})]}),e(m,{}),e(d,{identifier:"code",type:".tsx",children:`import { ElementType, ReactNode } from 'react';
import { $, $check, $Chemical, selection } from '@dna-platform/chemistry';
import { $Annotation, $Append, $Book, $Chapter, $Content, $Format, $Paragraph, $Section, $Word, $Writing, AnnotationSpecification, Code as code, ContainerProps, Given, html, specify } from '@dna-platform/public';

// THE LISTING IS HIS, Doug, 2026-11-17, Sprint 131: "the code should probably look identical to what's in mine, but
// the container for the specification might not" — measured off his manual the same day and carried into the theme's
// listing part: JetBrains Mono at 12 on 20.4, the ink on the night, the four colours, the numbers in their column, his
// light palette behind the bar's switch. The modes and the options are annotations said of the book, as his panel's
// states are: a word on the bar sets the book's edit, the book wears the mode's class, and the sheet decides what
// shows, so a flip costs one paint and draws nothing twice.
export class OfABookSpecification extends AnnotationSpecification {
    @specify('this is said of a book')
    $saidOfABook(writing: $Writing): void {
        $check(writing instanceof $Book, 'this is said of a book, and this is not one');
    }
}

// ONE MODE AT A TIME, Doug, 2026-11-17: "a full screen versus page mode for the reference manual like you do for the
// code", "So it can be book like and editor like". The page is the book-like mode, the chapter at the measure with the
// listing as its plate; the editor is the full screen, the table as the tree, the words beside it, the file's page at
// the right. A mode said later suppresses the one said earlier, so the book's own default yields to a press.
export class $Mode extends $Annotation {
    specification = new OfABookSpecification();

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Mode)
                writing.annotations.express(annotation, false);
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export class $PageMode extends $Mode {
    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-page-mode');
    }
}

export class $EditorMode extends $Mode {
    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-editor-mode');
    }
}

export class $Option extends $Annotation {
    specification = new OfABookSpecification();

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

// THE WORDS PUT AWAY, as his words tab does: the tree and the file stand alone.
export class $WordsAway extends $Option {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-words-away');
    }
}

export class $LightCode extends $Option {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-light-code');
    }
}

export class $WrappedCode extends $Option {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-wrapped-code');
    }
}

export class $UnnumberedCode extends $Option {
    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-unnumbered-code');
    }
}

// A SWITCH TOGGLES ONE ANNOTATION OF THE BOOK; pressed when the book carries it, or, inverted, when it does not, so
// that words reads pressed while the words show and lines while the numbers do.
export class $Switch extends $Word {
    $annotation: Given<$Annotation> | undefined = undefined;
    $inverse = false;
    get on(): boolean {
        const chosen = this.$annotation !== undefined && [this.book!.$is].flat().includes(this.$annotation);
        return chosen !== this.$inverse;
    }

    $Switch(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'button');
    }

    override container(props: ContainerProps): ReactNode {
        return super.container({ type: 'button', 'aria-pressed': this.on, onClick: () => this.press(), ...props });
    }

    press(): void {
        const book = this.book!;
        const chosen = this.$annotation;
        if (chosen === undefined) return;
        const annotations = [book.$is].flat();
        book.$is = annotations.includes(chosen)
            ? annotations.filter(annotation => annotation !== chosen)
            : [chosen, ...annotations];
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-switch');
    }
}

// A TAB CHOOSES ONE OF A FAMILY; pressed when the book's edit holds it, or, while the edit holds none of the family,
// when the book says it at its define, which is how a manual reads the editor pressed before any press.
export class $Tab extends $Switch {
    $family: Given<$Annotation>[] = [];
    override get on(): boolean {
        const book = this.book!;
        const own = this.$annotation;
        if (own === undefined) return false;
        const chosen = [book.$is].flat();
        if (chosen.some(annotation => this.$family.includes(annotation))) return chosen.includes(own);
        return book.annotations.expressed(own) !== undefined;
    }

    override press(): void {
        const book = this.book!;
        const own = this.$annotation;
        if (own === undefined) return;
        const annotations = [book.$is].flat().filter(annotation => !this.$family.includes(annotation));
        book.$is = [own, ...annotations];
    }
}

export const languages: Record<string, string> = { tsx: 'typescript', ts: 'typescript', mjs: 'javascript', js: 'javascript', css: 'css', html: 'xml', svg: 'xml', json: 'json', md: 'markdown' };

export const fileNameOf = (file: $Append): string => \`\${file.$identifier}\${file.$type}\`;

// An annotation added is prepended, so a chapter's appends are found newest first; the written order is the reverse.
export const filesOf = (chapter: $Chapter | undefined): $Append[] => [...(chapter?.annotations.find($Append) ?? [])].reverse();

// THE FACE, Doug, 2026-11-17: JetBrains Mono from Google Fonts, as his page takes it.
export const face = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap';

export const editorOf = (writing: $Writing): $Editor | undefined => writing.book?.annotations.expressed($Editor);

// THE LISTING, the package's Code figure dressed: one tab per file the chapter appends, or the one file it names, the
// open file numbered by the figure in the pane beneath the bar. CODE ANYWHERE IT IS NEEDED, Doug, 2026-11-17: "It is
// important to be able to write code anywhere it is needed" — a listing stands in any chapter of any book, and its
// dress follows the file, never the book's kind. AN APPENDED HTML HAS TWO FACES, his ruling lifted by Sprint 130's
// room the same day, "the reference manual should have this code": the listing of its source, and the page itself
// run in a frame, which in the editor mode is the full screen. The open file is the book's editor's, one for the
// book, so the chapter's plate, the file's page and the tree agree on it.
export class $Listing extends $Paragraph {
    $identifier = '';
    $type = '';
    $running = false;
    get files(): $Append[] {
        const appends = filesOf(this.chapter);
        if (this.$identifier === '') return appends;
        return appends.filter(append => append.$identifier === this.$identifier && (this.$type === '' || append.$type === this.$type));
    }
    get openFile(): $Append | undefined {
        const files = this.files;
        const wanted = editorOf(this)?.$openFile;
        return wanted !== undefined && files.includes(wanted) ? wanted : files[0];
    }
    get runs(): boolean { return this.openFile?.$type === '.html'; }

    $Listing(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'div');
    }

    override write(): ReactNode {
        const file = this.openFile;
        if (file === undefined) return null;
        const Bar = $(listingBar);
        const Code = $(code);
        const language = languages[file.$type.replace(/^\\./u, '')] ?? '';
        return (
            <>
                <Bar listing={this} />
                <div className="pd-pane">
                    {this.$running && this.runs ? (
                        <iframe
                            className="pd-run"
                            sandbox="allow-scripts"
                            srcDoc={html.copy(file.text)}
                            title={fileNameOf(file)}
                        />
                    ) : (
                        <Code
                            identifier={file.$identifier}
                            type={file.$type}
                            language={language}
                            numbered
                        />
                    )}
                </div>
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-listing');
    }
}

// THE BAR AS DRAWN, Doug, 2026-11-17: "I like the bar" — the file tabs, run for a page, then light, wrap and lines,
// then words, the page and the editor.
export class $ListingBar extends $Paragraph {
    $listing: $Listing | undefined = undefined;

    $ListingBar(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'div');
    }

    override write(): ReactNode {
        const listing = this.$listing;
        if (listing === undefined) return null;
        const FileTab = $(fileTab);
        const Run = $(run);
        const Switch = $(switchOf);
        const Tab = $(tab);
        return (
            <>
                {listing.files.map(file => (
                    <FileTab
                        key={fileNameOf(file)}
                        listing={listing}
                        file={file}
                    />
                ))}
                {listing.runs ? (
                    <span className="pd-faces">
                        <Run listing={listing} />
                    </span>
                ) : null}
                <span className="pd-options">
                    <Switch annotation={lightCode}>
                        light
                    </Switch>
                    <Switch annotation={wrappedCode}>
                        wrap
                    </Switch>
                    <Switch
                        annotation={unnumberedCode}
                        inverse
                    >
                        lines
                    </Switch>
                </span>
                <span className="pd-modes">
                    <Switch
                        annotation={wordsAway}
                        inverse
                    >
                        words
                    </Switch>
                    <Tab
                        annotation={pageMode}
                        family={modes}
                    >
                        the page
                    </Tab>
                    <Tab
                        annotation={editorMode}
                        family={modes}
                    >
                        the editor
                    </Tab>
                </span>
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-listing-bar');
    }
}

export class $FileTab extends $Word {
    $listing: $Listing | undefined = undefined;
    $file: $Append | undefined = undefined;
    get on(): boolean { return this.$file !== undefined && this.$listing?.openFile === this.$file; }

    $FileTab(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'button');
    }

    override container(props: ContainerProps): ReactNode {
        return super.container({ type: 'button', 'aria-pressed': this.on, onClick: () => this.press(), ...props });
    }

    press(): void {
        const listing = this.$listing;
        if (listing === undefined || this.$file === undefined) return;
        const editor = editorOf(listing);
        if (editor !== undefined) editor.$openFile = this.$file;
        listing.$running = false;
    }

    override write(): ReactNode {
        return (
            <>
                <span className="pd-mark">
                    ‹›
                </span>
                {this.$file === undefined ? '' : fileNameOf(this.$file)}
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-file-tab');
    }
}

export class $Run extends $Word {
    $listing: $Listing | undefined = undefined;

    $Run(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'button');
    }

    override container(props: ContainerProps): ReactNode {
        return super.container({ type: 'button', 'aria-pressed': this.$listing?.$running === true, onClick: () => this.press(), ...props });
    }

    press(): void {
        const listing = this.$listing;
        if (listing !== undefined) listing.$running = !listing.$running;
    }

    override write(): ReactNode {
        return 'run';
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-run-switch');
    }
}

// THE EDITOR, said of every book by the library's book class, before Paginated so its layer is the book's nearest:
// the format whose layer is the grid of the editor view, the table of contents as the tree at the left, the open
// chapter's words beside it, the file's page at the right the window's height, three pages of one sheet. Doug,
// 2026-11-17: "the editor view does use the table as the file tree", "Not bookish with shading. Paperish as in
// unfinished", "The white paper and the vscode with UI options is absolutely breathtaking in contrast" — no shadow,
// no rule but the running heads' hairlines. The book wears editing while the editor mode is on and the open chapter
// holds a listing; a chapter without a file reads as the page whatever the mode, so a book is never gridded around
// an empty right-hand page. The editor holds the book's open file, which the tree's leaves and the file tabs set.
export class $Editor extends $Format {
    specification = new OfABookSpecification();
    $openFile: $Append | undefined = undefined;
    override style: ElementType = selection.div\`
        &:has(> .pd-book.pa-editing) { display: grid; grid-template-columns: 13rem minmax(0, 36rem) minmax(0, 1fr); align-items: start; min-height: 100vh; }
        &:has(> .pd-book.pa-editing.pa-words-away) { grid-template-columns: 13rem minmax(0, 1fr); }
        & > .pd-book.pa-editing { display: contents; }
        & > .pd-book.pa-editing > * { grid-column: 2; box-sizing: border-box; min-width: 0; padding-inline: 1.5rem; }
        & > .pd-book.pa-editing > .pd-running-head { padding-block-start: calc(2 * \${({ theme }) => theme.space}); }
        & > .pd-book.pa-editing.pa-words-away > :not(.pd-file-page):not(.pd-container:has(> .pa-table-of-contents)) { display: none; }
        & > .pd-book.pa-editing .pa-page.pa-open > .pd-listing { display: none; }
        & > .pd-book.pa-editing > .pd-container:has(> .pa-table-of-contents) { grid-column: 1; grid-row: 1 / span 99; position: sticky; top: 0; height: 100vh; overflow: auto; padding: calc(2 * \${({ theme }) => theme.space}) \${({ theme }) => theme.space} \${({ theme }) => theme.space} 1.5rem; font-size: .86em; scrollbar-width: thin; scrollbar-color: transparent transparent; }
        & > .pd-book.pa-editing > .pd-container:has(> .pa-table-of-contents):hover { scrollbar-color: color-mix(in srgb, \${({ theme }) => theme.ink} 25%, transparent) transparent; }
        & > .pd-book.pa-editing .pa-table-of-contents.pa-page:not(.pa-open) { display: block; }
        & > .pd-book.pa-editing .pa-table-of-contents { margin-block: 0; }
        & > .pd-book.pa-editing .pa-table-of-contents > .pd-title, & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph:has(> .pa-parenthetical), & > .pd-book.pa-editing .pa-table-of-contents .pa-parenthetical { display: none; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-section { margin-block: 0 \${({ theme }) => theme.space}; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-heading { margin-block: 0 1rem; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph { margin: 0 0 .25rem -1.5rem; padding: .15rem 0 .15rem calc(1.5rem - 2px); border-inline-start: 2px solid transparent; color: color-mix(in srgb, \${({ theme }) => theme.ink} 72%, \${({ theme }) => theme.paper}); }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph.pa-open { border-inline-start-color: \${({ theme }) => theme.link}; color: \${({ theme }) => theme.ink}; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph.pa-reference, & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph .pa-reference { text-decoration: none; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-container.pa-reference { text-decoration: none; }
        & > .pd-book.pa-editing > .pd-file-page { display: grid; grid-column: 3; grid-row: 1 / span 99; grid-template-rows: auto minmax(0, 1fr); position: sticky; top: 0; height: 100vh; padding: calc(2 * \${({ theme }) => theme.space}) 2rem \${({ theme }) => theme.space}; margin-block: 0; background: \${({ theme }) => theme.paper}; }
        & > .pd-book.pa-editing > .pd-file-page .pd-listing { margin: 0; min-height: 0; }
        & > .pd-book.pa-editing > .pd-file-page .pd-pane { max-height: none; }
        & > .pd-book.pa-editing > .pd-file-page .pd-run { height: 100%; }
        .pd-file-page { display: none; }
        .pd-file-head { display: flex; justify-content: flex-end; align-items: center; gap: .6em; margin: 0 0 \${({ theme }) => theme.space}; padding-block-end: calc(\${({ theme }) => theme.space} / 4); border-block-end: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 30%, \${({ theme }) => theme.paper}); font-size: calc(0.7 * \${({ theme }) => theme.size}); letter-spacing: 0.08em; text-transform: uppercase; }
        .pd-file-head .pd-file-label { color: color-mix(in srgb, \${({ theme }) => theme.ink} 60%, \${({ theme }) => theme.paper}); }
        .pd-file-head .pd-file-name { font: 500 12px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0; text-transform: none; color: \${({ theme }) => theme.ink}; }
        /* the files, a parenthesis on the chapter's row in the code's face at the label's size: the square before
           each opens the page at the file, the name the editor; the open file in ink and underlined */
        .pa-table-of-contents .pd-container:has(> .pd-files) { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: .55em; }
        .pd-files { font: 400 12px 'JetBrains Mono', ui-monospace, monospace; color: color-mix(in srgb, \${({ theme }) => theme.ink} 50%, \${({ theme }) => theme.paper}); white-space: nowrap; }
        .pd-files .pd-square { font-family: \${({ theme }) => theme.font}; font-size: 13px; margin-inline-end: .3em; color: color-mix(in srgb, \${({ theme }) => theme.ink} 45%, \${({ theme }) => theme.paper}); text-decoration: none; }
        .pd-files .pd-square:hover { color: \${({ theme }) => theme.ink}; }
        .pd-files .pd-leaf { color: inherit; text-decoration: none; }
        .pd-files .pd-leaf:hover, .pd-files .pd-leaf.pa-open { color: \${({ theme }) => theme.ink}; text-decoration: underline; text-underline-offset: .15em; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-files { white-space: normal; }
        @media (max-width: 640px) {
            &:has(> .pd-book.pa-editing), &:has(> .pd-book.pa-editing.pa-words-away) { display: block; }
            & > .pd-book.pa-editing { display: block; }
            & > .pd-book.pa-editing > * { padding-inline: 0; }
            & > .pd-book.pa-editing > .pd-container:has(> .pa-table-of-contents) { display: none; }
            & > .pd-book.pa-editing.pa-words-away > :not(.pd-file-page):not(.pd-container:has(> .pa-table-of-contents)) { display: revert; }
            & > .pd-book.pa-editing > .pd-file-page { position: static; height: auto; padding: 0 0 \${({ theme }) => theme.space}; }
            & > .pd-book.pa-editing > .pd-file-page .pd-pane { max-height: 70vh; }
        }
    \`;

    // THE FACE COMES ONCE WITH THE EDITOR: one link to Google Fonts per book, in the editor's note, where a link per
    // listing had stood a dozen stylesheet links on a page and held its turn to the bookmark past a second.
    override note(): ReactNode {
        return (
            <link
                rel="stylesheet"
                href={face}
            />
        );
    }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-editor');
        if (!(writing instanceof $Book)) return;
        const open = writing.bookmark ?? writing.cover;
        if (writing.annotations.expressed($EditorMode) !== undefined && open !== undefined && open.text.find($Listing).length > 0)
            writing.classes.add(this, 'pa-editing');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

// THE FILE'S PAGE, drawn by the book after its chapters and shown by the editor's layer at the right: a head naming
// the file in the running head's voice, and the open chapter's listing beneath it the height of the page.
export class $FilePage extends $Paragraph {
    $FilePage(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.containers.replace(this, 'span', 'div');
    }

    override write(): ReactNode {
        const book = this.book;
        if (book === undefined) return null;
        const open = book.bookmark ?? book.cover;
        const written = open?.text.find($Listing)[0];
        if (open === undefined || written === undefined) return null;
        const files = filesOf(open);
        const wanted = editorOf(this)?.$openFile;
        const file = wanted !== undefined && files.includes(wanted) ? wanted : files[0];
        const Listing = $(listing);
        return (
            <>
                <div className="pd-file-head">
                    <span className="pd-file-label">
                        The file beside the chapter
                    </span>
                    <span className="pd-file-name">
                        {file === undefined ? '' : fileNameOf(file)}
                    </span>
                </div>
                <Listing
                    chapter={open}
                    identifier={written.$identifier}
                    type={written.$type}
                />
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-file-page');
    }
}

// A BRANCH, said of each entry of the table of contents by the book at its bond, as the binder's explorer did: it
// finds the chapter the entry means, marks the entry while that chapter is open, and hangs the chapter's files
// beneath it as leaves, each a press that opens the chapter in the editor turned to that file. The written table
// catalogues chapters and nothing else; the leaves are the view's, shown in the tree and under an appendix's rows.
export class $Branch extends $Format {
    get meant(): $Chapter | undefined {
        const identifier = this.parent?.annotations.expressed($Content)?.identifier;
        if (identifier === undefined || identifier === '') return undefined;
        return this.book?.text.find($Chapter).find(chapter => chapter.mention?.identifier === identifier);
    }

    $Branch(...chemicals: $Chemical[]) {
        this.$Format(...chemicals);
        this.style = ({ className, children }: { className?: string; children?: ReactNode }) => {
            const chapter = this.meant;
            const files = chapter === undefined || chapter.text.find($Listing).length === 0 ? [] : filesOf(chapter);
            const wanted = editorOf(this)?.$openFile;
            const current = wanted !== undefined && files.includes(wanted) ? wanted : files[0];
            const open = this.book?.bookmark === chapter;
            // THE FILES ARE A PARENTHESIS ON THE CHAPTER'S ROW, Doug, 2026-11-19: "Make resources parenthetical and
            // include them in the regular table with our little white square in the font perhaps or back (try
            // front) and have the square take them to the book view and the main link to the fullscreen view."
            return (
                <div className={className}>
                    {children}
                    {files.length === 0 ? null : (
                        <span className="pd-files">
                            (
                            {files.map((file, index) => (
                                <span
                                    key={fileNameOf(file)}
                                    className="pd-file"
                                >
                                    {index === 0 ? '' : ', '}
                                    <a
                                        className="pd-square"
                                        href={chapter?.mention?.identifier}
                                        title="the page"
                                        onClick={() => this.press(file, pageMode)}
                                    >
                                        ☐
                                    </a>
                                    <a
                                        className={open && current === file ? 'pd-leaf pa-open' : 'pd-leaf'}
                                        href={chapter?.mention?.identifier}
                                        title="the editor"
                                        onClick={() => this.press(file, editorMode)}
                                    >
                                        {fileNameOf(file)}
                                    </a>
                                </span>
                            ))}
                            )
                        </span>
                    )}
                </div>
            );
        };
    }

    press(file: $Append, mode: Given<$Annotation>): void {
        const book = this.book;
        if (book === undefined) return;
        const editor = editorOf(this);
        if (editor !== undefined) editor.$openFile = file;
        const annotations = [book.$is].flat().filter(annotation => !modes.includes(annotation));
        book.$is = [mode, ...annotations];
    }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-branch');
        const book = this.book;
        const chapter = this.meant;
        if (book === undefined) return;
        const open = chapter !== undefined && book.bookmark === chapter;
        const lit = [...writing.classes].includes('pa-open');
        if (open && !lit) writing.classes.add(book, 'pa-open');
        if (!open && lit) writing.classes.revert(book);
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

// THE APPENDIX, Doug, 2026-11-17: "it uses reference manual components, and is like a special part of a book that
// can refer to code that is specific to the book", "By default yeah it can be another part of the table, since it's
// kind of different" — said of a section of the table of contents whose heading is the part's name and whose rows
// are the part's chapters; the theme sets it at the table's foot in the smaller voice, and the branch hangs each
// row's files beneath it, so an appendix reads as its own reference manual inside the book it is in.
export class $Appendix extends $Annotation {
    specification = new AppendixSpecification();

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-appendix');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export class AppendixSpecification extends AnnotationSpecification {
    @specify('an appendix is said of a section')
    $saidOfASection(writing: $Writing): void {
        $check(writing instanceof $Section, 'an appendix is said of a section of the table of contents, and this is not a section');
    }
}

export const PageMode = $($PageMode);
export const EditorMode = $($EditorMode);
export const WordsAway = $($WordsAway);
export const LightCode = $($LightCode);
export const WrappedCode = $($WrappedCode);
export const UnnumberedCode = $($UnnumberedCode);
export const Switch = $($Switch);
export const Tab = $($Tab);
export const Listing = $($Listing);
export const ListingBar = $($ListingBar);
export const FileTab = $($FileTab);
export const Run = $($Run);
export const Editor = $($Editor);
export const FilePage = $($FilePage);
export const Branch = $($Branch);
export const Appendix = $($Appendix);
export const modes: Given<$Annotation>[] = [PageMode, EditorMode];
const pageMode = PageMode;
const editorMode = EditorMode;
const wordsAway = WordsAway;
const lightCode = LightCode;
const wrappedCode = WrappedCode;
const unnumberedCode = UnnumberedCode;
const switchOf = Switch;
const tab = Tab;
const listing = Listing;
const listingBar = ListingBar;
const fileTab = FileTab;
const run = Run;
`})]}),"TheReferenceManual7"),q=h(()=>n(l,{children:[e(p,{children:"[The Specification](/inexplicable-phenomena/our-reference/#the-specification)"}),n(a,{children:["The specification of a specification, written in its own form. I chose the form of a legal document on 16 November 2026, its anatomy the contract's — recitals, articles, clauses, defined terms, provisos, schedules — evolved for a library that specifies deliverables. The form is the library's; a subject may redress it to fit its style, as a theme redresses a page. Mathematics writes its own in ",e(r,{children:"[The Specification](/inexplicable-phenomena/mathematical-reference/#the-specification)"}),", and the first full instance is the statement of work of ",e(r,{children:"[The Symmetry of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/#the-symmetry-of-arithmetic)"}),"."]}),n(i,{children:[e(o,{children:"1. Purpose"}),n(a,{children:[e(s,{}),e(t,{children:"1.1 A specification is the formal identification of a deliverable — the thing agreed between buyer and seller in a service contract. It fixes what the deliverable must be, uniquely, so that candidates can be judged against it and the right one recognized when it is found. The specification is the legal document; the deliverable is not."}),e(t,{children:"1.2 The specification is the anchor for the work. The work meets the specification part by part, and the deliverable cites each part as it is met."}),e(t,{children:"1.3 A demand that cannot be checked has specified nothing, and a demand is stated so that it can fail."})]})]}),n(i,{children:[e(o,{children:"2. The parts"}),n(a,{children:[e(s,{}),e(t,{children:"2.1 The preamble — the contract's recitals. What the document is and the choice it records, standing before the numbered sections and carrying no number."}),e(t,{children:"2.2 The sections — the contract's articles. Each bears a number and a name, and the sections run in one sequence."}),e(t,{children:"2.3 The clauses. A section nests numbered parts: clause 2.3 is the third clause of section 2. A clause nests further where its matter requires it."}),e(t,{children:"2.4 The labels — the contract's defined terms. A recurring kind of clause carries a letter and a number, defined where the clause is stated; in the first instance, the known results K, the constraints C, and the open determinations O."}),e(t,{children:"2.5 The provisos. Where a demand is motivated, the motivation stands beside it and says so."}),e(t,{children:"2.6 The tables. A table states what a table states best — axioms, results, tests — and its rows are clauses carrying their labels."})]})]}),n(i,{children:[e(o,{children:"3. Citation"}),n(a,{children:[e(s,{}),e(t,{children:"3.1 The specification references itself. Any clause cites any other by its number or its label, in free-form citation language, and every citation is a link to the clause it names."}),e(t,{children:"3.2 A specification is highly connected: where a clause depends on another, motivates it, or constrains it, it says so by citation."}),e(t,{children:"3.3 Citation reaches across the project's documents: the specification cites the progress by its labels, and the progress cites the specification by its numbers."})]})]}),n(i,{children:[e(o,{children:"4. Boundary"}),n(a,{children:[e(s,{}),e(t,{children:"4.1 The specification states where it ends. Nothing outside the boundary binds the work."}),e(t,{children:"4.2 What stands after the end is the schedules — the contract's annexes: reference bearing on the work and binding none of it."})]})]}),n(i,{children:[e(o,{children:"5. Interpolation"}),n(a,{children:[e(s,{}),e(t,{children:"5.1 What is specified and not yet found stands as a placeholder for itself, in a brace naming the open determination it waits on."}),e(t,{children:"5.2 The work closes when the last placeholder is replaced by the thing it stands for."})]})]}),n(i,{children:[e(o,{children:"6. Permanence"}),n(a,{children:[e(s,{}),e(t,{children:"6.1 A specification is not thrown away. It is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing."}),e(t,{children:"6.2 A change is made by changing the specification, in the context of all its other parts."})]})]}),n(i,{children:[e(o,{children:"7. The implementation"}),n(a,{children:[e(s,{}),e(t,{children:"7.1 The implementation meets the specification part by part, and cites each part as it is met, by its number or its label."}),e(t,{children:"7.2 A citation from the implementation leads to the part it names, and the specification stands beside what implements it: the two forms are each reachable from the other."}),e(t,{children:"7.3 A justification is the annotation form of this relationship: it says how the implementation satisfies a part, citing the part by number."})]})]}),n(i,{children:[e(o,{children:"8. Format"}),n(a,{children:[e(s,{}),e(t,{children:"8.1 The format chosen here is the legal document, as this chapter is written: a preamble, then numbered, named sections of numbered clauses."}),e(t,{children:"8.2 A subject may change the format to fit its style. The form of sections 1 to 7 — purpose, parts, citation, boundary, interpolation, permanence, implementation — is kept, and the tree of section 9 with it; the dress is the subject's."})]})]}),n(i,{children:[e(o,{children:"9. The tree"}),n(a,{children:[e(s,{}),e(t,{children:"9.1 A specification always has numbers or codes, always has nesting, and the numbers nest — the anatomy of 2.3. It need not be only a list of lists, but it can be imagined as one."}),e(t,{children:"9.2 The tree is a projection of the document. Every operation below is an act on the projection, never on the document: a moved part keeps its code and its annotations, because the code carries identity, and permanence (6) is untouched."}),e(t,{children:"9.3 Unique showability: at any moment every part is on the page for exactly one reason or off it for exactly one reason — shown; folded away by an ancestor; hidden by the reader; or standing aside while one part shows alone. Each reason has exactly one control and one inverse, so any view can be read back, and any view can be left."}),e(t,{children:"9.4 The operations, each with its inverse, at every level of the tree:"}),e(t,{children:"9.4.1 Fold — a press on any part's heading folds its children beneath a quiet count; a second press unfolds."}),e(t,{children:"9.4.2 Hide — a part hides entirely from its gutter; show-all returns every hidden part."}),e(t,{children:"9.4.3 Only — a part stands alone, the one thing on the screen, its ancestors' headings standing as its path; at most one part stands alone at a time; pressing it again, or everything, returns the rest. A figure's mark (9.8) is a second door to this state, left by the same inverses."}),e(t,{children:"9.4.4 Move — parts move beside one another to compare, across sections and at any level; sections reorder among themselves."}),e(t,{children:"9.4.5 Reset — the strongest inverse: every part reseated in the document's own order, every fold, hide and alone-state cleared at once. Each part carries its home and its seat from the rendering, so the return is exact."}),e(t,{children:"9.5 The bar: the whole tree's verbs stand up top — the annotation layer's square, sections folding the tree to its headings where they can be cleared and reordered, expand unfolding every level, show all while something hides, everything while one part stands alone, and reset always."}),e(t,{children:"9.6 The annotations are consistent: one form for every subject — a one-line mark in a single rail at the writing's right edge, level with its subject, stacked so marks never collide, and the writing never moves to make room. The why stands on the mark's hover and the claim on its press; a relation's visible end still draws, citing across; a mark draws only while its subject stands and its section's square is on. No square starts checked — the layer stands dark until the bar's square lights every mark."}),e(t,{children:"9.7 The code of this tree stands in the appendix: the specification held as an object, its rendering operable — and the appendix page is that code run on this specification itself."}),e(t,{children:"9.8 The figure — an annotation naming an object of the specification by its code, with a title and a caption. Its mark rides the rail; its press is 9.4.3 performed on its object, dressed: the title above, the caption beneath, unshown until the title is pressed. A figure without a title is just the writing, alone."})]})]}),e(m,{}),e(d,{identifier:"tree",type:".html",children:`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Specification</title>
<style>
:root {
    --ink: rgb(27, 27, 27);
    --teal: rgb(31, 78, 121);
    --side: #fbfcfd;
    --serif: Georgia, "Times New Roman", serif;
    --mono: Consolas, "Courier New", monospace;
    --space: 20px;
}
* { box-sizing: border-box; }
body {
    margin: 0;
    background: var(--side);
    color: var(--ink);
    font-family: var(--serif);
    font-size: 17px;
    line-height: 27.2px;
}
.sheet { max-width: 1100px; margin: 0 auto; background: #fff; min-height: 100vh; padding: 56px 0 120px; }
.col { width: 640px; margin: 0 auto; }
.label { font-size: 11.9px; letter-spacing: 1.785px; text-transform: uppercase; opacity: .6; }
h1 { font-family: var(--mono); font-size: 25.5px; font-weight: 700; line-height: 1.3; margin: 2px 0 var(--space); }
h1 .hash { color: var(--teal); }
.bar {
    display: flex;
    align-items: center;
    gap: 22px;
    font-size: 11.9px;
    letter-spacing: 1.785px;
    text-transform: uppercase;
    margin-bottom: 36px;
}
.layer { display: flex; align-items: center; gap: 7px; opacity: .8; }
.layer input, .sq {
    appearance: none;
    width: 15.3px;
    height: 15.3px;
    border: 1px solid rgb(107, 107, 107);
    background: #fff;
    margin: 0;
    cursor: pointer;
}
.layer input:checked, .sq:checked { border-width: 3px; }
.layer label { cursor: pointer; }
.sq { width: 12px; height: 12px; margin-left: 12px; vertical-align: -1px; }
.verb { cursor: pointer; color: var(--teal); opacity: .75; }
.verb:hover { opacity: 1; }
.showall, .everything { display: none; }
body:has(.spart.hidden) .showall { display: inline; }
body:has(.the-one) .everything { display: inline; }

.tree { position: relative; font-family: var(--mono); font-size: 15.3px; line-height: 24px; }
.mdh {
    font-size: 15.3px;
    font-weight: 600;
    line-height: 24px;
    margin: var(--space) 0 calc(var(--space) / 4);
    cursor: pointer;
    user-select: none;
}
.mdh::before { content: "## "; color: var(--teal); }
.spart { position: relative; }
.skids { margin-left: 2ch; }
.spart.folded > .skids { display: none; }
.spart.folded > .mdh::after, .spart.folded > .chead::after { content: " · " attr(data-count); font-weight: 400; opacity: .45; }
.spart.hidden, .spart.dim { display: none; }
.hide, .only {
    position: absolute;
    top: 0;
    width: 2ch;
    text-align: center;
    text-indent: 0;
    opacity: 0;
    cursor: pointer;
}
.hide { left: -3ch; }
.only { left: -5ch; }
.sgroup > .hide, .sgroup > .only { top: calc(var(--space) + 2px); }
.spart:hover > .hide, .spart:hover > .only { opacity: .35; }
.spart > .hide:hover, .spart > .only:hover { opacity: .7; }
.dragging { opacity: .35; }
.drop-before { box-shadow: 0 -2px 0 0 rgba(31, 78, 121, .55); }
.drop-after { box-shadow: 0 2px 0 0 rgba(31, 78, 121, .55); }
.clause { position: relative; margin: 0; padding-left: 2ch; text-indent: -2ch; }
.clause + .clause, .clause + .cgroup, .cgroup + .clause { margin-top: 6px; }
.chead { cursor: pointer; user-select: none; }
a.cite { color: var(--teal); text-decoration: none; }

.anno {
    position: absolute;
    left: calc(100% + 32px);
    display: none;
    white-space: nowrap;
    font-family: var(--serif);
    font-size: 11.5px;
    line-height: 17px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    text-indent: 0;
    opacity: .85;
}
.anno.fig { cursor: pointer; }
.anno.fig:hover { opacity: 1; color: var(--teal); }
.fig-head { font-weight: 600; cursor: pointer; user-select: none; margin: var(--space) 0 0; }
.fig-cap { display: none; margin: 5px 0 var(--space); opacity: .7; }
.fig-cap.cap-shown { display: block; }
</style>
</head>
<body>

<div class="sheet">
<div class="col">

<header>
    <div class="label">Our Reference</div>
    <h1><span class="hash"># </span>The Specification</h1>
</header>

<nav class="bar">
    <span class="layer"><input type="checkbox" id="l-anno"><label for="l-anno">Annotations</label></span>
    <span class="verb" id="v-sections">Sections</span>
    <span class="verb" id="v-expand">Expand</span>
    <span class="verb showall" id="v-showall">Show all</span>
    <span class="verb everything" id="v-everything">Everything</span>
    <span class="verb" id="v-reset">Reset</span>
</nav>

<div class="tree" id="tree"></div>

</div>
</div>

<script>
const specification = {
    sections: [
        { code: '1', name: 'Purpose', clauses: [
            { code: '1.1', text: \`A specification is the formal identification of a deliverable — the thing agreed between buyer and seller in a service contract. It fixes what the deliverable must be, uniquely, so that candidates can be judged against it and the right one recognized when it is found. The specification is the legal document; the deliverable is not.\` },
            { code: '1.2', text: \`The specification is the anchor for the work. The work meets the specification part by part, and the deliverable cites each part as it is met.\` },
            { code: '1.3', text: \`A demand that cannot be checked has specified nothing, and a demand is stated so that it can fail.\` },
        ] },
        { code: '2', name: 'The parts', clauses: [
            { code: '2.1', text: \`The preamble — the contract's recitals. What the document is and the choice it records, standing before the numbered sections and carrying no number.\` },
            { code: '2.2', text: \`The sections — the contract's articles. Each bears a number and a name, and the sections run in one sequence.\` },
            { code: '2.3', text: \`The clauses. A section nests numbered parts: clause 2.3 is the third clause of section 2. A clause nests further where its matter requires it.\` },
            { code: '2.4', text: \`The labels — the contract's defined terms. A recurring kind of clause carries a letter and a number, defined where the clause is stated; in the first instance, the known results K, the constraints C, and the open determinations O.\` },
            { code: '2.5', text: \`The provisos. Where a demand is motivated, the motivation stands beside it and says so.\` },
            { code: '2.6', text: \`The tables. A table states what a table states best — axioms, results, tests — and its rows are clauses carrying their labels.\` },
        ] },
        { code: '3', name: 'Citation', clauses: [
            { code: '3.1', text: \`The specification references itself. Any clause cites any other by its number or its label, in free-form citation language, and every citation is a link to the clause it names.\` },
            { code: '3.2', text: \`A specification is highly connected: where a clause depends on another, motivates it, or constrains it, it says so by citation.\` },
            { code: '3.3', text: \`Citation reaches across the project's documents: the specification cites the progress by its labels, and the progress cites the specification by its numbers.\` },
        ] },
        { code: '4', name: 'Boundary', clauses: [
            { code: '4.1', text: \`The specification states where it ends. Nothing outside the boundary binds the work.\` },
            { code: '4.2', text: \`What stands after the end is the schedules — the contract's annexes: reference bearing on the work and binding none of it.\` },
        ] },
        { code: '5', name: 'Interpolation', clauses: [
            { code: '5.1', text: \`What is specified and not yet found stands as a placeholder for itself, in a brace naming the open determination it waits on.\` },
            { code: '5.2', text: \`The work closes when the last placeholder is replaced by the thing it stands for.\` },
        ] },
        { code: '6', name: 'Permanence', clauses: [
            { code: '6.1', text: \`A specification is not thrown away. It is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing.\` },
            { code: '6.2', text: \`A change is made by changing the specification, in the context of all its other parts.\` },
        ] },
        { code: '7', name: 'The implementation', clauses: [
            { code: '7.1', text: \`The implementation meets the specification part by part, and cites each part as it is met, by its number or its label.\` },
            { code: '7.2', text: \`A citation from the implementation leads to the part it names, and the specification stands beside what implements it: the two forms are each reachable from the other.\` },
            { code: '7.3', text: \`A justification is the annotation form of this relationship: it says how the implementation satisfies a part, citing the part by number.\` },
        ] },
        { code: '8', name: 'Format', clauses: [
            { code: '8.1', text: \`The format chosen here is the legal document, as this chapter is written: a preamble, then numbered, named sections of numbered clauses.\` },
            { code: '8.2', text: \`A subject may change the format to fit its style. The form of sections 1 to 7 — purpose, parts, citation, boundary, interpolation, permanence, implementation — is kept, and the tree of section 9 with it; the dress is the subject's.\` },
        ] },
        { code: '9', name: 'The tree', clauses: [
            { code: '9.1', text: \`A specification always has numbers or codes, always has nesting, and the numbers nest — the anatomy of 2.3. It need not be only a list of lists, but it can be imagined as one.\` },
            { code: '9.2', text: \`The tree is a projection of the document. Every operation below is an act on the projection, never on the document: a moved part keeps its code and its annotations, because the code carries identity, and permanence (6) is untouched.\` },
            { code: '9.3', text: \`Unique showability: at any moment every part is on the page for exactly one reason or off it for exactly one reason — shown; folded away by an ancestor; hidden by the reader; or standing aside while one part shows alone. Each reason has exactly one control and one inverse, so any view can be read back, and any view can be left.\` },
            { code: '9.4', text: \`The operations, each with its inverse, at every level of the tree:\`, clauses: [
                { code: '9.4.1', text: \`Fold — a press on any part's heading folds its children beneath a quiet count; a second press unfolds.\` },
                { code: '9.4.2', text: \`Hide — a part hides entirely from its gutter; show-all returns every hidden part.\` },
                { code: '9.4.3', text: \`Only — a part stands alone, the one thing on the screen, its ancestors' headings standing as its path; at most one part stands alone at a time; pressing it again, or everything, returns the rest. A figure's mark (9.8) is a second door to this state, left by the same inverses.\` },
                { code: '9.4.4', text: \`Move — parts move beside one another to compare, across sections and at any level; sections reorder among themselves.\` },
                { code: '9.4.5', text: \`Reset — the strongest inverse: every part reseated in the document's own order, every fold, hide and alone-state cleared at once. Each part carries its home and its seat from the rendering, so the return is exact.\` },
            ] },
            { code: '9.5', text: \`The bar: the whole tree's verbs stand up top — the annotation layer's square, sections folding the tree to its headings where they can be cleared and reordered, expand unfolding every level, show all while something hides, everything while one part stands alone, and reset always.\` },
            { code: '9.6', text: \`The annotations are consistent: one form for every subject — a one-line mark in a single rail at the writing's right edge, level with its subject, stacked so marks never collide, and the writing never moves to make room. The why stands on the mark's hover and the claim on its press; a relation's visible end still draws, citing across; a mark draws only while its subject stands and its section's square is on. No square starts checked — the layer stands dark until the bar's square lights every mark.\` },
            { code: '9.7', text: \`The code of this tree stands in the appendix: the specification held as an object, its rendering operable — and the appendix page is that code run on this specification itself.\` },
            { code: '9.8', text: \`The figure — an annotation naming an object of the specification by its code, with a title and a caption. Its mark rides the rail; its press is 9.4.3 performed on its object, dressed: the title above, the caption beneath, unshown until the title is pressed. A figure without a title is just the writing, alone.\` },
        ] },
    ],
};

const annotations = [
    { id: 'R1', sort: 'revision', subject: '9', writing: 'Put in at the twelfth round of Sprint 130 and made a formal contract at the sixteenth, 17 November 2026.' },
    { id: 'N1', sort: 'relation', subject: '2.3', objects: ['9.1'], writing: 'The nesting 2.3 states is the tree 9.1 operates.' },
    { id: 'F1', sort: 'figure', subject: '9.4', title: 'The operations', caption: 'The operations, each with its inverse, at every level of the tree.', writing: 'A figure of the specification; the mark shows its object alone.' },
];

const seat = (code) => \`c-\${code.replace(/\\./g, '-')}\`;
const tree = document.getElementById('tree');
let boxes = 0;

const leaves = (clause) => clause.clauses === undefined ? 1 : clause.clauses.reduce((sum, kid) => sum + leaves(kid), 0);
const gutter = \`<span class="hide" title="hide this part">&times;</span><span class="only" title="only this">&#9675;</span>\`;
const render = (clause, home, at) => {
    if (clause.clauses !== undefined) {
        const box = ++boxes;
        const kids = clause.clauses.map((kid, i) => render(kid, box, i)).join('');
        return \`<div class="spart cgroup" id="\${seat(clause.code)}" draggable="true" data-box="\${box}" data-home="\${home}" data-seat="\${at}">\${gutter}<p class="clause chead" data-count="\${leaves(clause)} parts">\${clause.code} \${clause.text}</p><div class="skids">\${kids}</div></div>\`;
    }
    return \`<p class="clause spart" id="\${seat(clause.code)}" draggable="true" data-home="\${home}" data-seat="\${at}">\${gutter}\${clause.code} \${clause.text}</p>\`;
};

specification.sections.forEach((section, at) => {
    const box = ++boxes;
    const group = document.createElement('div');
    group.className = 'spart sgroup';
    group.id = seat(section.code);
    group.draggable = true;
    group.setAttribute('data-box', box);
    group.setAttribute('data-home', 'root');
    group.setAttribute('data-seat', at);
    const kids = section.clauses.map((clause, i) => render(clause, box, i)).join('');
    const count = section.clauses.reduce((sum, clause) => sum + leaves(clause), 0);
    group.innerHTML = \`\${gutter}<div class="mdh" data-count="\${count} parts">\${section.code}. \${section.name}<input type="checkbox" class="sq"></div><div class="skids">\${kids}</div>\`;
    tree.appendChild(group);
});

const cite = (code) => \`<a class="cite" href="#\${seat(code)}">\${code}</a>\`;
const chip = (subjectCode, label, writing) => {
    const mark = document.createElement('span');
    mark.className = 'anno';
    mark.setAttribute('data-for', seat(subjectCode));
    mark.innerHTML = label;
    mark.title = writing;
    tree.appendChild(mark);
};

annotations.forEach((a) => {
    if (a.sort === 'relation') {
        chip(a.subject, \`\${a.id} &#8646; \${cite(a.objects[0])}\`, a.writing);
        a.objects.forEach((o) => chip(o, \`\${a.id} &#8646; \${cite(a.subject)}\`, a.writing));
        return;
    }
    if (a.sort === 'figure') {
        const mark = document.createElement('span');
        mark.className = 'anno fig';
        mark.setAttribute('data-for', seat(a.subject));
        mark.setAttribute('data-title', a.title);
        mark.setAttribute('data-caption', a.caption);
        mark.textContent = \`Figure · \${a.title}\`;
        mark.title = a.writing;
        tree.appendChild(mark);
        return;
    }
    chip(a.subject, \`\${a.id} &middot; \${a.sort}\`, a.writing);
});

const rail = () => {
    const frame = tree.getBoundingClientRect();
    const master = document.getElementById('l-anno');
    const standing = [];
    document.querySelectorAll('#tree > .anno').forEach((mark) => {
        const subject = document.getElementById(mark.getAttribute('data-for'));
        const sq = subject === null ? null : subject.closest('.sgroup')?.querySelector(':scope > .mdh > .sq');
        const seen = subject !== null && master.checked && (sq === null || sq === undefined || sq.checked) && subject.getClientRects().length > 0;
        mark.style.display = seen ? 'block' : 'none';
        if (seen) standing.push({ mark, at: subject.getBoundingClientRect().top - frame.top });
    });
    let floor = -Infinity;
    standing.sort((a, b) => a.at - b.at).forEach(({ mark, at }) => {
        const top = Math.max(at, floor);
        mark.style.top = top + 'px';
        floor = top + mark.offsetHeight + 2;
    });
};

document.querySelectorAll('.sgroup > .mdh, .cgroup > .chead').forEach((head) => {
    head.addEventListener('click', (press) => {
        if (press.target.classList.contains('sq')) return;
        head.parentElement.classList.toggle('folded');
        rail();
    });
});
document.querySelectorAll('.spart > .hide').forEach((x) => x.addEventListener('click', (press) => {
    press.stopPropagation();
    x.parentElement.classList.add('hidden');
    rail();
}));
const solo = (one) => {
    one.classList.add('the-one');
    const dim = (boxEl) => {
        [...boxEl.children].forEach((child) => {
            if (child === one) return;
            if (child.contains(one)) {
                const kids = child.querySelector(':scope > .skids');
                if (kids !== null) dim(kids);
                return;
            }
            if (child.classList.contains('spart')) child.classList.add('dim');
        });
    };
    dim(tree);
};
const clearSolo = () => {
    document.querySelectorAll('.dim, .the-one').forEach((el) => el.classList.remove('dim', 'the-one'));
    document.querySelectorAll('.fig-head, .fig-cap').forEach((el) => el.remove());
};
document.querySelectorAll('.spart > .only').forEach((o) => o.addEventListener('click', (press) => {
    press.stopPropagation();
    const one = o.parentElement;
    const was = one.classList.contains('the-one');
    clearSolo();
    if (!was) solo(one);
    rail();
}));
document.querySelectorAll('.anno.fig').forEach((mark) => mark.addEventListener('click', () => {
    const one = document.getElementById(mark.getAttribute('data-for'));
    if (one === null) return;
    const was = one.classList.contains('the-one');
    clearSolo();
    if (!was) {
        solo(one);
        const head = document.createElement('p');
        head.className = 'fig-head';
        head.textContent = mark.getAttribute('data-title');
        head.title = 'The caption stands beneath; press the title to show it.';
        head.addEventListener('click', () => head.parentElement.querySelector('.fig-cap')?.classList.toggle('cap-shown'));
        const cap = document.createElement('p');
        cap.className = 'fig-cap';
        cap.textContent = mark.getAttribute('data-caption');
        one.before(head);
        one.after(cap);
    }
    rail();
}));
document.getElementById('v-showall').addEventListener('click', () => {
    document.querySelectorAll('.spart.hidden').forEach((s) => s.classList.remove('hidden'));
    rail();
});
document.getElementById('v-everything').addEventListener('click', () => {
    clearSolo();
    rail();
});
document.getElementById('v-sections').addEventListener('click', () => {
    document.querySelectorAll('.sgroup, .cgroup').forEach((s) => s.classList.add('folded'));
    rail();
});
document.getElementById('v-expand').addEventListener('click', () => {
    document.querySelectorAll('.folded').forEach((s) => s.classList.remove('folded'));
    rail();
});
document.getElementById('v-reset').addEventListener('click', () => {
    document.querySelectorAll('.hidden, .folded').forEach((el) => el.classList.remove('hidden', 'folded'));
    clearSolo();
    const homes = new Map([['root', tree]]);
    document.querySelectorAll('#tree [data-box]').forEach((boxEl) => {
        const kids = boxEl.querySelector(':scope > .skids');
        if (kids !== null) homes.set(boxEl.getAttribute('data-box'), kids);
    });
    [...document.querySelectorAll('#tree [data-home]')]
        .sort((a, b) => Number(a.getAttribute('data-seat')) - Number(b.getAttribute('data-seat')))
        .forEach((node) => homes.get(node.getAttribute('data-home'))?.append(node));
    rail();
});
document.getElementById('l-anno').addEventListener('change', () => {
    const master = document.getElementById('l-anno');
    document.querySelectorAll('.sq').forEach((sq) => { sq.checked = master.checked; });
    rail();
});
document.querySelectorAll('.sq').forEach((sq) => sq.addEventListener('change', () => {
    const all = [...document.querySelectorAll('.sq')].every((each) => each.checked);
    document.getElementById('l-anno').checked = all;
    rail();
}));

let dragged = null;
const clearDrops = () => document.querySelectorAll('.drop-before, .drop-after').forEach((el) => el.classList.remove('drop-before', 'drop-after'));
const place = (target, e) => {
    if (!dragged || !target || dragged === target || dragged.contains(target)) return null;
    const box = target.getBoundingClientRect();
    return { target, before: e.clientY < box.top + box.height / 2 };
};
const aim = (e) => {
    const section = dragged && dragged.classList.contains('sgroup');
    return section
        ? e.target.closest('.sgroup')
        : (e.target.closest('.clause')?.closest('.spart') || e.target.closest('.spart'));
};
document.querySelectorAll('.spart').forEach((part) => {
    part.addEventListener('dragstart', (e) => {
        e.stopPropagation();
        dragged = part;
        part.classList.add('dragging');
        e.dataTransfer.setData('text/plain', part.id);
        e.dataTransfer.effectAllowed = 'move';
    });
    part.addEventListener('dragend', () => {
        part.classList.remove('dragging');
        clearDrops();
        dragged = null;
    });
});
tree.addEventListener('dragover', (e) => {
    e.preventDefault();
    const s = place(aim(e), e);
    clearDrops();
    if (s) s.target.classList.add(s.before ? 'drop-before' : 'drop-after');
});
tree.addEventListener('drop', (e) => {
    e.preventDefault();
    const s = place(aim(e), e);
    clearDrops();
    if (!s) return;
    const section = dragged.classList.contains('sgroup');
    if (!section && s.target.classList.contains('sgroup')) {
        const kids = s.target.querySelector(':scope > .skids');
        if (s.before) kids.prepend(dragged); else kids.append(dragged);
    } else {
        s.target.parentElement.insertBefore(dragged, s.before ? s.target : s.target.nextSibling);
    }
    rail();
});

rail();
<\/script>

</body>
</html>
`}),e(d,{identifier:"code",type:".tsx",children:`// THE SPECIFICATION'S OWN CODE, Doug, 2026-11-18: "Make sure code lives in the right place. The
// specifcation code is pretty general right?" — the passes that implement The Specification's contract
// stand beside their chapter: the citation language of section 3, the tree of 9.1 to 9.5, the coverage
// and the rail of 9.6, and the alone-state of 9.4.3 with the figure's door of 9.8. The Content keeps the
// format, the parts, the renderer and the components, and calls these; the appendix tree.html remains the
// contract run on itself.

// THE SPECIFICATION REFERENCES ITSELF, Doug, 2026-11-16: "the spec should reference itself ... The
// specification should be highly connected" — and verbatim stays verbatim: the document already speaks a
// citation language — numbered sections, dotted parts, the labels K, C and O, bracketed references — so the
// renderer learns that language rather than the document changing. Definitions receive ids; every mention
// becomes a link to its definition, across the project's documents, since both render on one page.
const cited = /\\[(\\d+(?:,\\s*\\d+)*)\\]|\\b[Ss]ections? \\d+(?: to \\d+)?\\b|\\b[KCOI]\\d+\\b|\\b\\d\\.\\d(?:\\.\\d)?\\b/g;

export const place = (citation: string): string => {
    const section = citation.match(/^[Ss]ections? (\\d+)/);
    if (section !== null) return \`cite-sec-\${section[1]}\`;
    const label = citation.match(/^([KCOI])(\\d+)$/);
    if (label !== null) return \`cite-\${label[1].toLowerCase()}\${label[2]}\`;
    return \`cite-\${citation.replace(/\\./g, '-')}\`;
};

const link = (citation: string): string => {
    if (citation.startsWith('[')) {
        return '[' + citation.slice(1, -1).split(',').map(number =>
            \`<a href="#cite-ref-\${number.trim()}">\${number.trim()}</a>\`).join(', ') + ']';
    }
    return \`<a href="#\${place(citation)}">\${citation}</a>\`;
};

const mention = (passage: string, sections: boolean): string =>
    passage.split(/(<[^>]*>)/).map((piece, index, pieces) => {
        if (piece.startsWith('<')) return piece;
        const previous = pieces[index - 1];
        const lead = previous !== undefined && previous.includes('id="cite-')
            ? (piece.match(/^(?:[KCOI]\\d+|\\d+\\.\\d+(?:\\.\\d+)?|\\d+\\.)/) ?? [''])[0]
            : '';
        return lead + piece.slice(lead.length).replace(cited, found =>
            !sections && /^[Ss]ection/.test(found) ? found : link(found));
    }).join('');

export const connect = (rendered: string): string => {
    const identified = rendered
        .replace(/<h2>(\\d+)\\. /g, (whole, section) => \`<h2 id="cite-sec-\${section}">\${section}. \`)
        .replace(/<h3>(\\d+)\\.(\\d+) /g, (whole, section, part) => \`<h3 id="cite-\${section}-\${part}">\${section}.\${part} \`)
        .replace(/<(strong|td)>(\\d+)\\.(\\d+)\\.(\\d+) /g, (whole, tag, section, part, clause) => \`<\${tag} id="cite-\${section}-\${part}-\${clause}">\${section}.\${part}.\${clause} \`)
        .replace(/<(strong|td)>(\\d+)\\.(\\d+) /g, (whole, tag, section, part) => \`<\${tag} id="cite-\${section}-\${part}">\${section}.\${part} \`)
        .replace(/<(strong|td)>([KCOI])(\\d+) /g, (whole, tag, letter, number) => \`<\${tag} id="cite-\${letter.toLowerCase()}\${number}">\${letter}\${number} \`);
    const boundary = identified.indexOf('<h2>Related work</h2>');
    if (boundary === -1) return mention(identified, true);
    let count = 0;
    const references = identified.slice(boundary).replace(/<li>/g, () => \`<li id="cite-ref-\${++count}">\`);
    return mention(identified.slice(0, boundary), true) + mention(references, false);
};

// THE TREE, Doug, 2026-11-17, Sprint 130's twelfth round: "Specifications should always have numbers or
// codes, always have nesting, and their numbers should nest... collapse a part with sub parts... hide
// (entirely) and show-all parts again... move them around to compare... toggle the annotations on what is
// visible" — and the fourteenth: "We have to implement this and it needs to be interactive and have great
// examples." The specification of the tree is this file's own chapter, section 9. This second pass nests
// what connect identified, and at the sixteenth round — "We need to be able to collapse and expand every
// level... collapse everything to just the sections... We need reset not just show all up top" — it nests
// recursively: a section gathers its sub-parts by their own headings, a sub-part gathers its clauses, and
// every node carries its home box and its seat so reset can return the document's own order exactly. The
// bar carries the whole tree's verbs; every press lands in the renderer's one dispatcher.
// THE LAYER STARTS DARK, Doug, 2026-11-18: "Can you make sure they aren't visible but can be made visible
// easily" — no square is checked at the draw; the bar's square is the one act that lights every mark.
export const treeify = (rendered: string): string => {
    const sections = rendered.split(/(?=<h2)/);
    const lead = sections.shift() ?? '';
    const bar = '<span class="pc-tree-bar"><label class="pc-layerbox"><input type="checkbox" class="pc-anno-master" />annotations</label><span class="pc-verb pc-sections">sections</span><span class="pc-verb pc-expand">expand</span><span class="pc-verb pc-showall">show all</span><span class="pc-verb pc-return">everything</span><span class="pc-verb pc-reset">reset</span></span>';
    let boxes = 0;
    const blocks = (passage: string): string[] =>
        passage.split(/(?=<(?:p|ul|ol|table|div|blockquote|pre)[ >])/).filter(block => block.trim() !== '');
    const leaf = (block: string, home: number | 'root', seat: number): string =>
        \`<div class="pc-part" draggable="true" data-home="\${home}" data-seat="\${seat}"><span class="pc-x" title="hide">×</span><span class="pc-o" title="only this">○</span>\${block}</div>\`;
    const group = (passage: string, level: number, home: number | 'root', seat: number): string => {
        const close = level === 1 ? '</h2>' : '</h3>';
        const at = passage.indexOf(close);
        const head = passage.slice(0, at);
        const body = passage.slice(at + close.length);
        const box = ++boxes;
        const kids: string[] = [];
        (level === 1 ? body.split(/(?=<h3)/) : [body]).forEach(piece => {
            if (piece.startsWith('<h3')) kids.push(group(piece, 2, box, kids.length));
            else blocks(piece).forEach(block => kids.push(leaf(block, box, kids.length)));
        });
        const inner = kids.join('');
        const parts = (inner.match(/class="pc-part"/g) ?? []).length;
        const square = level === 1 ? '<input type="checkbox" class="pc-sec-anno" />' : '';
        return \`<section class="pc-spart" draggable="true" data-level="\${level}" data-box="\${box}" data-home="\${home}" data-seat="\${seat}"><span class="pc-x pc-sec-x" title="hide">×</span><span class="pc-o pc-sec-o" title="only this">○</span>\${head}<span class="pc-count">\${parts} parts</span>\${square}\${close}<div class="pc-kids">\${inner}</div></section>\`;
    };
    return bar + lead + sections.map((section, seat) => group(section, 1, 'root', seat)).join('');
};

// COVERAGE FROM THE CITATIONS, clause 4.2 of Sprint 130's record made mechanism: "justifications frequently
// map to the citations on the project side." The deliverable already cites the specification through Cite,
// so the marks are computed from the page's own citations, never authored twice: a claimed clause wears
// Cited and the mark leads back to the claim; an unclaimed clause reads Open. Computed once, lazily, at the
// first flip — the client's own pass, nothing walked at the server's draw. The sixteenth round made the
// marks consistent — "The annotations are messy... Annotations need to be consistent" — one chip per
// subject, heading, clause and table row alike, laid out by the rail below. The figures of 9.8 join the
// same pass: an authored annotation's mark, one form with the coverage.
export const cover = (): void => {
    const tree = document.querySelector('.pc-tree');
    if (tree === null || tree.classList.contains('pc-covered')) return;
    tree.classList.add('pc-covered');
    const claims = new Map<string, { at: string; count: number }>();
    document.querySelectorAll('.pc-cite a').forEach(cite => {
        const id = place(cite.textContent ?? '');
        const claim = claims.get(id);
        if (claim === undefined) {
            cite.id = \`claim-\${id}\`;
            claims.set(id, { at: \`claim-\${id}\`, count: 1 });
        } else claim.count += 1;
    });
    tree.querySelectorAll('strong[id^="cite-"], td[id^="cite-"], h2[id^="cite-sec-"], h3[id^="cite-"]').forEach(clause => {
        const claim = claims.get(clause.id);
        const chip = document.createElement('span');
        chip.className = claim === undefined ? 'pc-anno pc-open' : 'pc-anno';
        chip.setAttribute('data-for', clause.id);
        chip.textContent = claim === undefined ? 'Open' : claim.count > 1 ? \`Cited ×\${claim.count}\` : 'Cited';
        chip.title = claim === undefined
            ? 'No part of the chapter cites this clause.'
            : 'The chapter claims this part; the mark leads to the claim.';
        if (claim !== undefined) chip.setAttribute('data-claim', claim.at);
        tree.appendChild(chip);
    });
    document.querySelectorAll('.pc-figure').forEach(figure => {
        const title = figure.getAttribute('data-title') ?? '';
        const chip = document.createElement('span');
        chip.className = 'pc-anno pc-fig';
        chip.setAttribute('data-for', place(figure.getAttribute('data-part') ?? ''));
        chip.setAttribute('data-fig-title', title);
        chip.setAttribute('data-fig-caption', figure.getAttribute('data-caption') ?? '');
        chip.textContent = title === '' ? 'Figure' : \`Figure · \${title}\`;
        chip.title = 'A figure of the specification; the mark shows its object alone.';
        tree.appendChild(chip);
    });
};

// THE RAIL, the sixteenth round's answer to the messy margin: one form for every subject — a one-line mark
// in a single lane at the writing's right edge, level with its subject, stacked so no mark ever collides
// with another — and one layout pass that re-lays the lane after every act on the tree. A mark draws only
// while its subject stands and its section's square is on; the writing never moves to make room, because
// the rail stands outside the measure.
export const rail = (): void => {
    const tree = document.querySelector<HTMLElement>('.pc-tree');
    if (tree === null) return;
    const master = tree.querySelector<HTMLInputElement>('.pc-anno-master');
    const frame = tree.getBoundingClientRect();
    const standing: { chip: HTMLElement; at: number }[] = [];
    tree.querySelectorAll<HTMLElement>(':scope > .pc-anno').forEach(chip => {
        const subject = document.getElementById(chip.getAttribute('data-for') ?? '');
        const square = subject?.closest('.pc-spart[data-level="1"]')?.querySelector<HTMLInputElement>(':scope > h2 > .pc-sec-anno');
        const seen = subject !== null && subject.getClientRects().length > 0 && (square?.checked ?? master?.checked ?? true);
        chip.style.display = seen ? 'block' : 'none';
        if (seen && subject !== null) standing.push({ chip, at: subject.getBoundingClientRect().top - frame.top });
    });
    let floor = -Infinity;
    standing.sort((a, b) => a.at - b.at).forEach(({ chip, at }) => {
        const top = Math.max(at, floor);
        chip.style.insetBlockStart = \`\${top}px\`;
        floor = top + chip.offsetHeight + 2;
    });
};

// THE ALONE-STATE IS ONE STATE with two doors — the gutter's ring and a figure's mark — and one inverse,
// everything. The figure dresses it and nothing else differs, so leaving it is always the same act.
export const alone = (root: Element, one: Element): void => {
    one.classList.add('pc-the-one');
    const dim = (box: Element): void => {
        [...box.children].forEach(child => {
            if (child === one) return;
            if (child.contains(one)) {
                const kids = child.querySelector(':scope > .pc-kids');
                if (kids !== null) dim(kids);
                return;
            }
            if (child.classList.contains('pc-part') || child.classList.contains('pc-spart')) child.classList.add('pc-dim');
        });
    };
    dim(root);
};

export const clearAlone = (root: Element): void => {
    root.querySelectorAll('.pc-dim, .pc-the-one').forEach(part => part.classList.remove('pc-dim', 'pc-the-one'));
    root.querySelectorAll('.pc-fig-head, .pc-fig-cap').forEach(plate => plate.remove());
};
`})]}),"TheSpecification8"),M=h(()=>n(l,{children:[e(p,{children:"[The Content](/inexplicable-phenomena/our-reference/#the-content)"}),n(a,{children:["A thing with a front and a back, lifted to the library level on 17 November 2026 because content with a project will stand in a lot of places. On the front the deliverable — the result of the effort, looking like what it is. On the back the project — the formal representation of the work, whose specification takes the form of ",e(r,{children:"[The Specification](/inexplicable-phenomena/our-reference/#the-specification)"}),". The first case and the mathematics specialization stand in ",e(r,{children:"[The Content](/inexplicable-phenomena/mathematical-reference/#the-content)"}),"."]}),n(i,{children:[e(o,{children:"1. The content"}),n(a,{children:[e(s,{}),e(t,{children:"1.1 A piece of content is the content of its chapter, starting below the title, like a section; it has a front and a back, and shows one side at a time."}),e(t,{children:"1.2 The front is the deliverable; the back is the project. One unlabelled control at the title's right flips them, explored rather than read."}),e(t,{children:"1.3 It opens on the deliverable; the canonical side is overridable."}),e(t,{children:"1.4 On the back the title turns into the literal — # Title in the source face, flush with the column — and that is the back's whole signal."})]})]}),n(i,{children:[e(o,{children:"2. The project"}),n(a,{children:[e(s,{}),e(t,{children:"2.1 The project's named parts are the specification, the identification, the justification, the intuition and the progress — the order of the work itself. Sections name themselves, nothing is mandatory, and every part is independently viewable; the specification stands as an operable tree, The Specification's section 9."}),e(t,{children:"2.2 The project's documents render verbatim through the markdown of the package, the specification in the source pane's register — the editor's face at the measured same-space settings, equations typeset into native MathML at bind time."}),e(t,{children:"2.3 The documents are highly connected: the renderer speaks the specification's own citation language, every mention a link to its definition across the documents, and a citation click turns the page itself, never the address."}),e(t,{children:"2.4 The implementation cites the specification by number or label, and the citation flips the content to the part it names — the relationship between the two forms."}),e(t,{children:"2.5 What is specified and not yet found stands interpolated, a word for the thing until the thing is found."})]})]}),n(i,{children:[e(o,{children:"3. The motion"}),n(a,{children:[e(s,{}),e(t,{children:"3.1 The flip is a permutation that preserves identity: one axis turns, writing to code; boxes, weights, gaps, palette and structure ride through unchanged, measured by rectangle."}),e(t,{children:"3.2 The transition is the plain text version of one: the chapter settles from dimmed ink, and the title's discrete changes — font, place, mark — happen together at the dip's hidden trough, dimmed by color so the chapter's label changes with nothing."})]})]}),n(i,{children:[e(o,{children:"4. The components"}),n(a,{children:[e(s,{}),e(t,{children:"4.1 Content, the format whose note is the toggle and whose style rules the sides. Project, the back's section; Specification, Identification, Intuition and Progress, its named parts in the order of the work — the justification is not a section, riding as annotations between the identification and the specification."}),e(t,{children:"4.2 Markdown, the document rendered verbatim and connected. Cite, the implementation's citation. Figure, the annotation that shows its object alone. Interpolated, the placeholder."}),e(t,{children:"4.3 A subject specializes the deliverable's dress — mathematics adds Theorem and Proof beside its own manual chapter — and re-exports the family so its books keep one door."})]})]}),n(i,{children:[e(o,{children:"5. The annotations"}),n(a,{children:[e(s,{}),e(t,{children:"5.1 Anything on a page can be annotated: whatever can be mentioned can carry an annotation, which finds its subject by mention, never by position or a runtime id."}),e(t,{children:"5.2 An annotation is writing said of a thing with a sort — Idea, Question, Revision, Archive, and the project's own, Justification among them. It is the infrastructure's annotation; there is no second species."}),e(t,{children:"5.3 A relation is a type of annotation between two things, finding both ends by mention: a justification relates an identification entry to a clause; a connecting principle relates two principles."}),e(t,{children:"5.4 An annotation is itself a thing — mentionable, so annotatable and relatable in turn. This closure lets a justification claim several clauses, lets a relationship between intuitions be an intuition, and lets the graph tangle."}),e(t,{children:"5.5 A section toggles its own annotations by a small square in its heading; the page's layer is every section's toggle at once. No square starts checked — the marks stand off the page until asked, and one press of the page's square shows them all."}),e(t,{children:"5.6 An annotation draws as a one-line mark in a single rail at the writing's right edge, level with its subject, stacked so marks never collide — one form whether the subject is a heading, a clause or a table row — in the small voice, the why on its hover, and the writing never moves to make room. A relation draws at both of its ends, each citing the other. Nothing draws while the toggle is off, and nothing draws where its subject does not stand."}),e(t,{children:"5.7 A figure is an annotation that names an object of the writing by mention, carrying a title and a caption. Its mark rides the rail; its press shows its object alone — the only-state dressed, the title above, the caption beneath, unshown until the title is pressed. A figure without a title is just the writing, alone."})]})]}),n(i,{children:[e(o,{children:"6. The open ends"}),n(a,{children:[e(s,{}),e(t,{children:"6.1 The names: Content collides with the package's word for a Word's content, and Specification with a package utility; both flagged, his to settle, likeliest when the family moves all the way into the package."}),e(t,{children:"6.2 A subclass cannot yet extend a format's style, so a subject's dress rides inert in the lifted style until the framework grows the composition seam; named, not hacked around."}),e(t,{children:"6.3 The justifications associate with the progress; the exact tie stands open."})]})]}),e(m,{}),e(d,{identifier:"code",type:".tsx",children:`import { DragEvent, MouseEvent, ReactNode } from 'react';
import katex from 'katex';
import { marked } from 'marked';
import { $, selection } from '@dna-platform/chemistry';
import { $Append, $Format, $Paragraph, $Section, $Word, html } from '@dna-platform/public';
import { alone, clearAlone, connect, cover, place, rail, treeify } from './8-the-specification~code.tsx';

// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15 and respecified from his answers of
// 2026-11-16: the content of a chapter, starting below the title, like a section. On the front the DELIVERABLE —
// the object, the result of the effort of the team, looking like what it is, a familiar chapter. On the back
// the PROJECT — the formal representation of the work: the statement of work, the progress, a plan, a
// discussion — the talk page behind a wikipedia article, and nothing is mandatory. The project side carries
// the formal visual language. The name Content is a PROXY until he keeps it. The content is a format said of
// its chapter: its note draws the one unlabelled toggle in place, and its style wraps the chapter, so the
// checked control rules what shows — everything that is not the project is the deliverable.
// LIFTED TO THE LIBRARY LEVEL, Doug, 2026-11-17: "Make sure this is in components that can be reused and at
// the right level reference manual. We will need this everywhere there is content with a project, which will
// be in a lot of places" — the general family lives here in Our Reference; a subject specializes the
// deliverable's dress, as mathematics does with Theorem and Proof beside its own manual chapter. One flagged
// wart rides with the lift: the theorem and proof rules stay in this style, inert until a subject's classes
// activate them, because a subclass cannot yet extend a format's style — the composition seam is an open
// question for the framework, named rather than hacked around.
export class $Content extends $Format {
    $canonical = 'deliverable';

    // THE DISSOLVE, Doug, 2026-11-17: "I still don't like the transition... It feels too slow. The flicker is
    // bad", "You must know what a good and a bad transition is", "It should be faster, less perceptible and
    // if there is a white flash, it is perceptible." The flipbook frames convicted the dip: an omitted
    // keyframe property interpolates to its base rather than stepping, so the out direction glided 28px over
    // six frames with the font swapping mid-slide and the label lurching when margin and padding fell out of
    // step — and the trough itself was the white flash, a title-shaped gap of paper. The good transition is
    // the platform's own cross-dissolve: the flip runs inside startViewTransition, the old frame never
    // leaving before the new covers it — no absence, no motion, one dissolve of the whole page at 140ms.
    // Every hand-rolled keyframe is retired; the states swap instantly inside the update and the browser
    // carries the blend. The duration rules ride a plain style tag because view-transition pseudos live at
    // the document root, beyond a scoped sheet's reach; reduced motion collapses the dissolve to the swap.
    flip = (press: MouseEvent<HTMLLabelElement>): void => {
        press.preventDefault();
        cover();
        const box = document.getElementById('pc-flip');
        if (!(box instanceof HTMLInputElement)) return;
        const turn = (): void => { box.checked = !box.checked; rail(); };
        const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
        if (doc.startViewTransition === undefined) turn();
        else doc.startViewTransition(turn);
    };

    override note(): ReactNode {
        return (
            <>
                <style>{'::view-transition-old(root), ::view-transition-new(root) { animation-duration: 0.14s; animation-timing-function: ease; } @media (prefers-reduced-motion: reduce) { ::view-transition-old(root), ::view-transition-new(root) { animation: none !important; } }'}</style>
                <label className="pc-content" onClick={this.flip}>
                    <input
                        type="checkbox"
                        id="pc-flip"
                        defaultChecked={this.$canonical === 'project'}
                    />
                    <span className="pc-flip" />
                </label>
            </>
        );
    }

    // ONE UNLABELLED CONTROL TO THE RIGHT OF THE TITLE, Doug, 2026-11-16: "how about a toggle to the right of
    // the title and it has no label. One can just explore" — and the back announces itself in the literal:
    // the title turns into # Title while the project side shows; the [Project] tag of the same day is struck.
    // THE FLIP SETTLES, Doug, 2026-11-16: "that has being aligned will cause a jump and it is the jump of
    // coming out of the matrix. Is there a slight transition... It would have to be very subtle because this
    // is a text-oriented site" — the frame holds still and the chapter's content alone eases from dimmed ink
    // to full, a print developing; nothing moves, since movement would break the sameness. Two identical
    // keyframes under two names so each direction restarts the settle; reduced motion is honored.
    // THE SOURCE PANE IS A WHITE VSCODE, his rulings of 2026-11-16: "a white vscode theme that feels natural.
    // Takes up the same space as the other side", then "sameness in layout — the same title in same place,
    // gets a # and changes font", then "choose a monospace that doesn't feel too hard". The elegance answer:
    // VS Code's own Windows default is Consolas, not the terminal's rounder, heavier Cascadia — so Consolas
    // leads the stack, at the same-space setting the sweep measured (the same passage at the column's 640px:
    // Georgia 17px on 27.2px stands 272px; Consolas 14.5px on 22.5px stands 270px), .85 of the book's size on
    // a 1.55 line. SAMENESS IN LAYOUT: the Chapter label's ::before is untouched and pinned to the book's
    // face and ink, so the title's box is identical on both sides; the # sits flush at the column's left
    // edge — his correction of the gutter: "the # has to be left aligned with everything else and the
    // transition was: Title to # Title" — the text easing right by the mark's exact width (Consolas advance
    // .55em, two characters of the title's 1.5 size = 1.65 * size), the Chapter label held still by an equal
    // negative margin animated on the same curve. The motion is his "canonical experience of moving from
    // literal to symbol. From object to its representation", pulled back on his "this is plain text. It
    // needs to be the plain text version of a transition": one clock, one curve, the staged delay of the
    // first cut retired as theater. THE GLIDE RETIRED, Doug, 2026-11-17: "There's a sort of jank when going
    // to specification mode" — photographed frame by frame, the title had already turned to Consolas and the
    // body to the specification at the first frame, and the title then slid right for 160ms after the fact;
    // a swap that lands at once and then moves is two events, and the second reads as the first stuttering.
    // Plain text has no tween: the title takes its code form and its place in the same frame, the mark with
    // it, and the settle alone is the transition — the whole chapter, title included, developing from dimmed
    // ink to full. THE DIP, Doug, the same night: "The appearance of the symbol and change in font is weird.
    // It feels off... Font and position can happen concurrently unless it's janky" — the one-frame swap was
    // still watchable, so it moves to where it cannot be watched: the title dims over 120ms, and at the
    // trough the font, the place, the label's hold and the mark all change together in one hidden instant —
    // concurrent, as he allows — then it rises as code over 120ms. The discrete steps live inside the
    // keyframes at 49.9/50.1 so nothing ever changes while visible; the glide stays retired. The dip dims by
    // COLOR, not opacity — his "You have chapter1 disappearing. Why?" — because element opacity sinks the
    // ::before label with the text; the text alone fades to transparent, the label's ink pinned on both
    // states, the # on its own clock. The frame never flickers, and the label changes with nothing.
    // The section headings keep the serif heading's box — 1.15 of the size, the section's margin. The palette
    // came from an eight-variant matrix photographed beside the serif reference, on his "Play around. Be
    // creative. Get it to match... Don't have the markdown be LOUD!!": the quiet winner keeps title, headings,
    // leads and body in the book's own ink at regular weight, and colors only the # and ## marks in the
    // theme's link — the color the citations already wear on both sides. His harmony rule finished it: the
    // italics too stay in the ink, italic their only voice; the one foreign magenta went with the blues.
    // THE PERMUTATION TEST, his anchor of 2026-11-16: "the same theme flipped over some axis of code to
    // writing, but occupying the same space and having the same feel... the feel of the permutation while
    // preserving identity." Measured type by type: weight is identity, so the title and the section headings
    // stay bold through the flip; and the tables shed the rendered-markdown cards for the front's own dress —
    // the browser read the book's table as an open grid, no borders, no backgrounds, header row regular —
    // which also obeys his oldest law of the night, no lines anywhere. Columns separate by air, rows by their
    // leading; the cards' ruling of the earlier evening is superseded by the test.
    // One palette across the two faces; the markdown-ness is the face and the marks. THE TRANSITION'S
    // STRETCH, measured on his "Still a stretchiness to the transition": the title's width was innocent
    // (Georgia bold 372px, Consolas regular 364px); the elastic was vertical — the spec's paragraph gaps ran
    // 13px against the serif's 20px and the opening text dropped 41px below the label — so the spec's
    // paragraphs take the theme's own space and the first tucks to a quarter-space under SPECIFICATION.
    override style = selection.div\`
        counter-reset: theorem;
        .pd-chapter { position: relative; }
        .pc-content { position: absolute; inset-block-start: 2.1rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; box-sizing: border-box; inline-size: 0.9em; block-size: 0.9em; border: 1.5px solid color-mix(in srgb, \${({ theme }) => theme.ink} 65%, \${({ theme }) => theme.paper}); background: \${({ theme }) => theme.paper}; transition: border-width .15s ease, border-color .15s ease; }
        .pc-content:hover .pc-flip { border-color: \${({ theme }) => theme.ink}; }
        .pc-content:has(input:checked) .pc-flip { border-width: 3px; }
        .pc-project { display: none; }
        &:has(#pc-flip:checked) .pc-project { display: block; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-paragraph:not(.pd-navigation) { display: none; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-section:not(.pc-project) { display: none; }
        .pc-project .pd-heading { display: block; font-size: calc(.8 * \${({ theme }) => theme.size}); font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, \${({ theme }) => theme.ink} 70%, \${({ theme }) => theme.paper}); margin-block: 0 .5em; }
        .pc-specification .pc-markdown { font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; font-size: calc(.9 * \${({ theme }) => theme.size}); line-height: calc(1.412 * \${({ theme }) => theme.size}); margin-block-start: calc(\${({ theme }) => theme.space} / 4); }
        .pc-specification .pc-markdown h2 { font-family: inherit; font-size: calc(.9 * \${({ theme }) => theme.size}); margin-block: \${({ theme }) => theme.space} 0; font-weight: 600; color: \${({ theme }) => theme.ink}; }
        .pc-specification .pc-markdown h2::before { content: '## '; color: \${({ theme }) => theme.link}; }
        .pc-specification .pc-markdown h3 { font-family: inherit; font-size: calc(.9 * \${({ theme }) => theme.size}); margin-block: calc(\${({ theme }) => theme.space} / 2) 0; font-weight: 600; color: \${({ theme }) => theme.ink}; }
        .pc-specification .pc-markdown h3::before { content: '### '; color: \${({ theme }) => theme.link}; }
        .pc-specification .pc-markdown > h2:first-of-type { display: none; }
        .pc-specification .pc-markdown p { margin-block: \${({ theme }) => theme.space}; }
        .pc-specification .pc-markdown > h2:first-of-type + p { margin-block-start: calc(\${({ theme }) => theme.space} / 4); }
        .pc-specification .pc-markdown .pc-spart:first-of-type > h2 { display: none; }
        .pc-specification .pc-markdown .pc-spart:first-of-type > .pc-kids { margin-inline-start: 0; }
        .pd-title { position: relative; }
        .pd-title::before { color: \${({ theme }) => theme.ink}; }
        .pd-title::after { content: '# '; position: absolute; inset-inline-start: 0; inset-block-end: 0; opacity: 0; font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: \${({ theme }) => theme.link}; }
        &:has(#pc-flip:checked) .pd-title { padding-inline-start: calc(1.65 * \${({ theme }) => theme.size}); font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: \${({ theme }) => theme.ink}; }
        &:has(#pc-flip:checked) .pd-title::before { margin-inline-start: calc(-1.65 * \${({ theme }) => theme.size}); font-family: \${({ theme }) => theme.font}; color: \${({ theme }) => theme.ink}; }
        &:has(#pc-flip:checked) .pd-title::after { opacity: 1; }
        .pd-section.pc-project { margin-block: calc(\${({ theme }) => theme.space} / 2) 0; }
        .pc-markdown h1 { display: none; }
        .pc-markdown h1 + p { display: none; }
        .pc-markdown h2 { font-family: \${({ theme }) => theme.font}; font-size: calc(1 * \${({ theme }) => theme.size}); font-weight: 600; margin-block: 1.1em .35em; color: color-mix(in srgb, \${({ theme }) => theme.ink} 76%, \${({ theme }) => theme.link} 24%); }
        .pc-markdown h3 { font-family: \${({ theme }) => theme.font}; font-size: calc(1 * \${({ theme }) => theme.size}); font-weight: 600; margin-block: .9em .3em; color: color-mix(in srgb, \${({ theme }) => theme.ink} 76%, \${({ theme }) => theme.link} 24%); }
        .pc-markdown p { margin-block: .9em; }
        .pc-markdown strong { font-weight: bold; }
        .pc-markdown a { color: \${({ theme }) => theme.link}; text-decoration: none; }
        .pc-markdown a:hover { text-decoration: underline; }
        .pc-cite a { color: \${({ theme }) => theme.link}; text-decoration: none; cursor: pointer; }
        .pc-cite a:hover { text-decoration: underline; }
        .pc-markdown table { width: 100%; border-collapse: collapse; margin-block: \${({ theme }) => theme.space}; }
        .pc-markdown th, .pc-markdown td { padding: .3em 1.2em .3em 0; text-align: start; vertical-align: top; }
        .pc-markdown th:last-child, .pc-markdown td:last-child { padding-inline-end: 0; }
        .pc-markdown thead th { font-weight: 400; }
        .pc-markdown math { font-family: 'Cambria Math', 'STIX Two Math', math; font-size: 1.08em; }
        .pc-markdown .pc-math-block { margin-block: calc(\${({ theme }) => theme.space} / 2); }
        .pc-markdown ol, .pc-markdown ul { padding-inline-start: 1.5em; margin-block: .9em; }
        .pc-markdown li { margin-block: .35em; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
        .pc-tree { position: relative; }
        .pc-tree-bar { display: flex; align-items: center; gap: 1.6em; font-size: calc(.7 * \${({ theme }) => theme.size}); letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, \${({ theme }) => theme.ink} 70%, \${({ theme }) => theme.paper}); margin-block-end: calc(\${({ theme }) => theme.space} / 2); user-select: none; }
        .pc-layerbox { display: inline-flex; align-items: center; gap: .6em; cursor: pointer; }
        .pc-anno-master, .pc-sec-anno { appearance: none; inline-size: .85em; block-size: .85em; border: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 65%, \${({ theme }) => theme.paper}); background: \${({ theme }) => theme.paper}; margin: 0; cursor: pointer; flex: none; }
        .pc-anno-master:checked, .pc-sec-anno:checked { border-width: 3px; }
        .pc-sec-anno { margin-inline-start: .9em; vertical-align: -1px; }
        .pc-verb { cursor: pointer; }
        .pc-verb:hover { color: \${({ theme }) => theme.link}; }
        .pc-showall { display: none; }
        .pc-tree:has(.pc-hidden) .pc-showall { display: inline; }
        .pc-return { display: none; }
        .pc-tree:has(.pc-the-one) .pc-return { display: inline; }
        .pc-spart { position: relative; }
        .pc-spart > h2, .pc-spart > h3 { cursor: pointer; user-select: none; }
        .pc-kids { margin-inline-start: 2ch; }
        .pc-folded > .pc-kids { display: none; }
        .pc-count { display: none; font-weight: 400; opacity: .5; margin-inline-start: .75em; }
        .pc-folded > :is(h2, h3) .pc-count { display: inline; }
        .pc-part { position: relative; }
        .pc-hidden, .pc-dim { display: none; }
        .pc-x, .pc-o { position: absolute; inset-block-start: 0; inline-size: 2ch; text-align: center; opacity: 0; cursor: pointer; }
        .pc-x { inset-inline-start: -2.6ch; }
        .pc-o { inset-inline-start: -4.8ch; }
        .pc-sec-x, .pc-sec-o { inset-block-start: calc(\${({ theme }) => theme.space} + .2em); }
        .pc-part:hover > .pc-x, .pc-part:hover > .pc-o, .pc-spart:hover > .pc-sec-x, .pc-spart:hover > .pc-sec-o { opacity: .35; }
        .pc-x:hover, .pc-o:hover { opacity: .7; }
        .pc-before { box-shadow: 0 -2px 0 0 color-mix(in srgb, \${({ theme }) => theme.link} 55%, transparent); }
        .pc-after { box-shadow: 0 2px 0 0 color-mix(in srgb, \${({ theme }) => theme.link} 55%, transparent); }
        .pc-anno { position: absolute; inset-inline-start: calc(100% + 32px); display: none; white-space: nowrap; font-family: \${({ theme }) => theme.font}; font-size: calc(.73 * \${({ theme }) => theme.size}); line-height: 1.45; letter-spacing: .12em; text-transform: uppercase; font-weight: 400; color: color-mix(in srgb, \${({ theme }) => theme.ink} 72%, \${({ theme }) => theme.paper}); }
        .pc-open { opacity: .55; }
        .pc-anno[data-claim] { cursor: pointer; }
        .pc-anno[data-claim]:hover { color: \${({ theme }) => theme.link}; }
        .pc-figure-seat { display: none; }
        .pc-anno.pc-fig { cursor: pointer; }
        .pc-anno.pc-fig:hover { color: \${({ theme }) => theme.link}; }
        .pc-fig-head { font-weight: 600; cursor: pointer; user-select: none; margin-block: \${({ theme }) => theme.space} 0; }
        .pc-fig-cap { display: none; margin-block: calc(\${({ theme }) => theme.space} / 4) \${({ theme }) => theme.space}; color: color-mix(in srgb, \${({ theme }) => theme.ink} 70%, \${({ theme }) => theme.paper}); }
        .pc-cap-shown { display: block; }
    \`;
}

// THE PROJECT IS THE BACK, Doug's answers, 2026-11-16: the specification is part of the project, an expression
// of a statement of work identifying the deliverable; the progress is a narrative of how the project has been
// going, its entries associated with an author; a plan may be expressed with teammates assigned, all to the
// author by default as read from the cover; a discussion may stand there. The parts beyond the specification
// are optional. One section of the chapter, the formal register.
// NOTHING COLLAPSES, Doug, 2026-11-16: "STOP MAKING THINGS COLLAPSE!!! VERBATIM!" — the project's parts stand
// open and whole, plain sections. SUPERSEDED FOR THE SPECIFICATION'S TREE, Doug, 2026-11-17, Sprint 130's
// twelfth round: "We should be able to collapse a part with sub parts... hide (entirely) and show-all parts
// again... move them around to compare... toggle the annotations on what is visible." The parts still stand
// open BY DEFAULT: the earlier ruling was against the page deciding for the reader, and the tree's fold is
// the reader deciding — Our Reference / The Specification, section 9, holds the tree's specification.
export class $Project extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-project');
    }
}

// THE PROJECT'S NAMED PARTS, Doug, 2026-11-16: "And then create the Specification?" — the specification and
// the progress are the project's parts, each a section naming itself in the formal dress. The specification
// dissolves its own first heading: its purpose reads as the introducing paragraph, not a second title.
export class $Specification extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-specification');
    }
}

// ALL THE PARTS AT THE TOP, Doug, 2026-11-17, Sprint 130's fifteenth round: "We should have this definitely
// in the library at the top - content with project and specification and all the other parts." The project's
// named parts stand complete in the general family — Specification, Identification, Intuition, Progress, the
// order of the work itself — each a section naming itself. The justification is deliberately NOT a section:
// by the record's 4.2 and 7.3 it is the manner of the identifying, carried as annotations between the
// identification and the specification, the computed coverage above its first sort.
export class $Identification extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-identification');
    }
}

export class $Intuition extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-intuition');
    }
}

export class $Progress extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-progress');
    }
}

// THE SPECIFICATION'S PASSES LIVE BESIDE THEIR CHAPTER, Doug, 2026-11-18: "Make sure code lives in the
// right place" — the citation language, the tree, the coverage, the rail and the alone-state stand in
// 8-the-specification~code.tsx, The Specification's own code; this renderer imports and wires them.
// EQUATIONS IN SPECIFICATIONS, Doug, 2026-11-16: "we need latex in the specification either rendered or in
// latex equation form", then "We need to see equations in specifications" — rendered, in a comparable font.
// The extension tokenizes $...$ and $$...$$ before markdown's emphasis can eat the underscores inside them,
// and KaTeX typesets at bind time into MathML, which the browser renders natively in its math face — no
// stylesheet, no font files shipped. The katex dependency entered the package on his word, beside marked.
const typeset = (passage: string, display: boolean): string =>
    katex.renderToString(passage, { output: 'mathml', throwOnError: false, displayMode: display });

marked.use({
    extensions: [
        {
            name: 'mathBlock',
            level: 'block',
            start(src: string) { const at = src.indexOf('$$'); return at < 0 ? undefined : at; },
            tokenizer(src: string) {
                const match = /^\\$\\$([\\s\\S]+?)\\$\\$/.exec(src);
                if (match !== null) return { type: 'mathBlock', raw: match[0], text: match[1] };
                return undefined;
            },
            renderer(token: { text: string }) { return \`<div class="pc-math-block">\${typeset(token.text, true)}</div>\`; },
        },
        {
            name: 'mathInline',
            level: 'inline',
            start(src: string) { const at = src.indexOf('$'); return at < 0 ? undefined : at; },
            tokenizer(src: string) {
                const match = /^\\$(?=\\S)([^$\\n]*?\\S)\\$/.exec(src);
                if (match !== null) return { type: 'mathInline', raw: match[0], text: match[1] };
                return undefined;
            },
            renderer(token: { text: string }) { return \`<span class="pc-math">\${typeset(token.text, false)}</span>\`; },
        },
    ],
});

let dragged: HTMLElement | null = null;

const aim = (over: Element | null): HTMLElement | null => {
    if (dragged === null || over === null) return null;
    const top = dragged.getAttribute('data-level') === '1';
    const target = top
        ? over.closest<HTMLElement>('.pc-spart[data-level="1"]')
        : over.closest<HTMLElement>('.pc-part') ?? over.closest<HTMLElement>('.pc-spart');
    if (target === null || target === dragged || dragged.contains(target)) return null;
    return target;
};

const unseat = (): void => {
    document.querySelectorAll('.pc-before, .pc-after').forEach(seat => seat.classList.remove('pc-before', 'pc-after'));
};

// THE DOCUMENT RENDERS VERBATIM, Doug, 2026-11-16: "This is what it looks like. Read the markdown. Render it
// like that. I said verbatim" — the chapter's appended markdown parsed by marked, the package's own dependency,
// and drawn as the document renders: the bold lead-ins, the tables, the lists, the document's own title.
// A citation click turns the page itself — the hash never moves, so the place in the address stays the chapter's.
// With tree on — the specification's document — the one click handler is the tree's dispatcher too, carrying
// the contract's operations of the sixteenth round: the gutter hides and the gutter's ring shows one part
// alone, show-all and everything are their inverses, sections folds the whole tree to its headings and
// expand unfolds every level, reset reseats the document's own order and clears every view state at once,
// the squares rule the annotation layer with the bar's square as every section's at once, a heading press
// folds at any level, a mark with a claim turns the page back to the citation that claims it, and a
// citation press lands as it always has. Every act that changes what stands re-lays the rail.
export class $Markdown extends $Paragraph {
    $identifier = '';
    $tree = false;

    follow = (press: MouseEvent<HTMLDivElement>): void => {
        const root = press.currentTarget;
        const pressed = press.target as Element;
        const x = pressed.closest('.pc-x');
        if (x !== null) {
            x.closest(x.classList.contains('pc-sec-x') ? '.pc-spart' : '.pc-part')?.classList.add('pc-hidden');
            rail();
            return;
        }
        const ring = pressed.closest('.pc-o');
        if (ring !== null) {
            const one = ring.closest('.pc-part, .pc-spart');
            const was = one?.classList.contains('pc-the-one') ?? false;
            clearAlone(root);
            if (!was && one !== null) alone(root, one);
            rail();
            return;
        }
        if (pressed.closest('.pc-showall') !== null) {
            root.querySelectorAll('.pc-hidden').forEach(part => part.classList.remove('pc-hidden'));
            rail();
            return;
        }
        if (pressed.closest('.pc-return') !== null) {
            clearAlone(root);
            rail();
            return;
        }
        if (pressed.closest('.pc-sections') !== null) {
            root.querySelectorAll('.pc-spart').forEach(part => part.classList.add('pc-folded'));
            rail();
            return;
        }
        if (pressed.closest('.pc-expand') !== null) {
            root.querySelectorAll('.pc-folded').forEach(part => part.classList.remove('pc-folded'));
            rail();
            return;
        }
        if (pressed.closest('.pc-reset') !== null) {
            root.querySelectorAll('.pc-hidden, .pc-folded').forEach(part => part.classList.remove('pc-hidden', 'pc-folded'));
            clearAlone(root);
            const boxes = new Map<string, Element>([['root', root]]);
            root.querySelectorAll('[data-box]').forEach(box => {
                const kids = box.querySelector(':scope > .pc-kids');
                if (kids !== null) boxes.set(box.getAttribute('data-box') ?? '', kids);
            });
            [...root.querySelectorAll<HTMLElement>('[data-home]')]
                .sort((a, b) => Number(a.getAttribute('data-seat')) - Number(b.getAttribute('data-seat')))
                .forEach(node => boxes.get(node.getAttribute('data-home') ?? '')?.append(node));
            rail();
            return;
        }
        const master = pressed.closest('.pc-anno-master');
        if (master instanceof HTMLInputElement) {
            root.querySelectorAll<HTMLInputElement>('.pc-sec-anno').forEach(box => { box.checked = master.checked; });
            rail();
            return;
        }
        if (pressed.closest('.pc-sec-anno') !== null) {
            const boxes = [...root.querySelectorAll<HTMLInputElement>('.pc-sec-anno')];
            const all = root.querySelector<HTMLInputElement>('.pc-anno-master');
            if (all !== null) all.checked = boxes.every(box => box.checked);
            rail();
            return;
        }
        const mark = pressed.closest('.pc-anno');
        if (mark !== null) {
            if (mark.classList.contains('pc-fig')) {
                const subject = document.getElementById(mark.getAttribute('data-for') ?? '');
                const one = subject?.closest('.pc-part, .pc-spart') ?? null;
                const was = one?.classList.contains('pc-the-one') ?? false;
                clearAlone(root);
                if (!was && one !== null) {
                    alone(root, one);
                    const title = mark.getAttribute('data-fig-title') ?? '';
                    if (title !== '') {
                        const head = document.createElement('p');
                        head.className = 'pc-fig-head';
                        head.textContent = title;
                        head.title = 'The caption stands beneath; press the title to show it.';
                        const caption = document.createElement('p');
                        caption.className = 'pc-fig-cap';
                        caption.textContent = mark.getAttribute('data-fig-caption') ?? '';
                        one.before(head);
                        one.after(caption);
                    }
                }
                rail();
                return;
            }
            const claim = mark.getAttribute('data-claim');
            if (claim !== null) {
                const turn = (): void => {
                    const flip = document.getElementById('pc-flip');
                    if (flip instanceof HTMLInputElement) flip.checked = false;
                    document.getElementById(claim)?.scrollIntoView({ block: 'center' });
                };
                const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
                if (doc.startViewTransition === undefined) turn();
                else doc.startViewTransition(turn);
            }
            return;
        }
        const head = pressed.closest('.pc-fig-head');
        if (head !== null) {
            head.parentElement?.querySelector('.pc-fig-cap')?.classList.toggle('pc-cap-shown');
            return;
        }
        const heading = pressed.closest('.pc-spart > h2, .pc-spart > h3');
        if (heading !== null) {
            heading.parentElement?.classList.toggle('pc-folded');
            rail();
            return;
        }
        const citation = pressed.closest('a[href^="#cite-"]');
        if (citation === null) return;
        press.preventDefault();
        const landing = document.getElementById(citation.getAttribute('href')?.slice(1) ?? '');
        landing?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    grab = (grip: DragEvent<HTMLDivElement>): void => {
        const part = (grip.target as Element).closest<HTMLElement>('.pc-part, .pc-spart');
        if (part === null) return;
        dragged = part;
        grip.dataTransfer.setData('text/plain', 'part');
        grip.dataTransfer.effectAllowed = 'move';
    };

    over = (drag: DragEvent<HTMLDivElement>): void => {
        const target = aim(drag.target as Element);
        unseat();
        if (target === null) return;
        drag.preventDefault();
        const box = target.getBoundingClientRect();
        target.classList.add(drag.clientY < box.top + box.height / 2 ? 'pc-before' : 'pc-after');
    };

    drop = (fall: DragEvent<HTMLDivElement>): void => {
        const target = aim(fall.target as Element);
        unseat();
        if (target === null || dragged === null) return;
        fall.preventDefault();
        const box = target.getBoundingClientRect();
        const before = fall.clientY < box.top + box.height / 2;
        if (dragged.getAttribute('data-level') !== '1' && target.classList.contains('pc-spart')) {
            const kids = target.querySelector(':scope > .pc-kids');
            if (kids !== null) {
                if (before) kids.prepend(dragged);
                else kids.append(dragged);
            }
        } else {
            target.parentElement?.insertBefore(dragged, before ? target : target.nextSibling);
        }
        dragged = null;
        rail();
    };

    settle = (): void => {
        unseat();
        dragged = null;
    };

    get append(): $Append | undefined {
        return this.chapter?.annotations.find($Append).find(append => append.$identifier === this.$identifier);
    }

    override write(): ReactNode {
        const append = this.append;
        if (append === undefined) return null;
        const connected = connect(marked.parse(html.copy(append.text), { async: false }));
        const rendered = this.$tree ? treeify(connected) : connected;
        return (
            <div
                className={this.$tree ? \`pc-doc-\${this.$identifier} pc-tree\` : \`pc-doc-\${this.$identifier}\`}
                onClick={this.follow}
                onDragStart={this.grab}
                onDragOver={this.over}
                onDrop={this.drop}
                onDragEnd={this.settle}
                dangerouslySetInnerHTML={{ __html: rendered }}
            />
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-markdown');
    }
}

// THE IMPLEMENTATION CITES THE SPECIFICATION, Doug, 2026-11-16: "there needs to be some relationship between
// the spec and the implementation" — the deliverable cites the part of the specification it meets, by number
// or label, and the citation leads there: it flips the content to the project side and lands on the part named.
export class $Cite extends $Word {
    $part = '';

    // The part is read back from the clicked anchor's own text: the handler's instance predates the pass
    // that applies props to the held one, so the rendered citation is the one source the click can trust.
    // The flip and the landing scroll both run inside the view transition's update, so the dissolve lands
    // directly on the cited clause.
    follow = (press: MouseEvent<HTMLAnchorElement>): void => {
        const part = press.currentTarget.textContent ?? '';
        const turn = (): void => {
            const flip = document.getElementById('pc-flip');
            if (flip instanceof HTMLInputElement) flip.checked = true;
            cover();
            rail();
            document.getElementById(place(part))?.scrollIntoView({ block: 'center' });
        };
        const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
        if (doc.startViewTransition === undefined) turn();
        else doc.startViewTransition(turn);
    };

    override write(): ReactNode {
        return <a onClick={this.follow}>{this.$part}</a>;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-cite');
    }
}

// THE FIGURE, Doug, 2026-11-18: "a type of annotation called a Figure (this is a new idea) that contains
// something object like that is in the spec as a reference, and when clicked, the thing should be the only
// thing visual with a title and caption or if it's more writing or it can just be the writing. Captions
// should not be shown to start" — an annotation said in the chapter, referring to its object by mention,
// never a runtime id. It draws nothing where it stands; its mark rides the rail beside the coverage, and
// its press is the only-operation performed on its referent, dressed — the title above, the caption
// beneath, unshown until the title is pressed. A figure without a title is just the writing, alone.
export class $Figure extends $Paragraph {
    $part = '';
    $title = '';
    $caption = '';

    override write(): ReactNode {
        return (
            <span
                className="pc-figure"
                data-part={this.$part}
                data-title={this.$title}
                data-caption={this.$caption}
            />
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-figure-seat');
    }
}

// THE INTERPOLATED PART, Doug, 2026-11-16: "interpolated string-like parts that might describe where something
// will go when we find it" — a word standing for the thing itself until the thing is found, by the interpolation
// rule of the specification's form.
export class $Interpolated extends $Word {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-interpolated');
    }
}

export const Content = $($Content);
export const Project = $($Project);
export const Specification = $($Specification);
export const Identification = $($Identification);
export const Intuition = $($Intuition);
export const Progress = $($Progress);
export const Markdown = $($Markdown);
export const Cite = $($Cite);
export const Figure = $($Figure);
export const Interpolated = $($Interpolated);
`})]}),"TheContent9"),B=k(g),J=h(()=>n(B,{children:[C(),I(),R(),L(),D(),O(),j(),H(),P(),W(),q(),M()]}),"book");export{J as book};
