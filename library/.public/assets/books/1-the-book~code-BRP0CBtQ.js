var ft=Object.defineProperty;var o=(l,e)=>ft(l,"name",{value:e,configurable:!0});import{jsxs as p,Fragment as f,jsx as a}from"react/jsx-runtime";import{$ as n,selection as u,$check as S}from"@dna-platform/chemistry";import{$Theme as gt,$Paragraph as g,Word as ge,Reference as P,$Word as m,specify as W,$Cover as me,$Synopsis as mt,$TableOfContents as at,$Table as bt,$Annotation as I,html as st,Means as ut,Previous as kt,Next as xt,Self as $t,$Format as be,AnnotationSpecification as q,$Chapter as F,Code as vt,$Book as ue,$Content as wt,$Append as yt,$Section as ot,Theme as Dt,Paginated as zt}from"@dna-platform/public";import{css as h}from"styled-components";const $e=class $e extends gt{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.slate="#3b4a55",this.paper="#ffffff",this.link="#1f4e79",this.style=u.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate(),this.navigation(),this.listing(),this.document()]}listing(){return h`
            .pd-listing { --night: oklch(0.294 0.028 222.6); --dusk-top: oklch(0.414 0.026 219.3); --dusk: oklch(0.334 0.030 219.3); --bar-line: oklch(0.472 0.042 183.1); --glow: #d6e1e3; --dim: oklch(0.508 0.053 170.2); --brass: #d8c48e; --keyword: #8ad7ff; --string: #ffd48a; --name: #9be3d6; --comment: #5f8a86; display: grid; grid-template-rows: auto minmax(0, 1fr); grid-template-columns: minmax(0, 1fr); min-width: 0; margin-block: ${({theme:e})=>e.space}; background: var(--night); color: var(--glow); }
            .pd-book.pa-light-code .pd-listing { --night: #f6f7f4; --dusk-top: oklch(0.952 0.007 90); --dusk: #eceee8; --bar-line: oklch(0.912 0.027 90); --glow: #2b363c; --dim: oklch(0.738 0.033 88.3); --brass: #5d4a16; --keyword: #5a4fa8; --string: #2f7f6e; --name: #23407a; --comment: #8a94a3; box-shadow: inset 0 0 0 1px color-mix(in srgb, ${({theme:e})=>e.ink} 12%, transparent); }
            .pd-listing-bar { display: flex; flex-wrap: wrap; align-items: stretch; gap: 1px; min-width: 0; margin-block: 0; padding: 0 0 0 2px; background: linear-gradient(180deg, var(--dusk-top), var(--dusk)); border-block-end: thin solid var(--bar-line); }
            .pd-listing-bar .pd-file-tab { display: flex; align-items: center; gap: 7px; padding: 9px 14px 8px 12px; border: 0; border-block-start: 2px solid transparent; background: none; font: 500 12px/1 'JetBrains Mono', ui-monospace, monospace; color: color-mix(in oklch, var(--glow) 62%, var(--night)); cursor: pointer; }
            .pd-listing-bar .pd-file-tab[aria-pressed='true'] { color: var(--glow); background: var(--night); border-block-start-color: var(--brass); }
            .pd-listing-bar .pd-mark { color: #9aa4b3; font-size: 13px; letter-spacing: -1px; }
            .pd-listing-bar .pd-file-tab[aria-pressed='true'] .pd-mark { color: var(--brass); }
            .pd-listing-bar .pd-faces, .pd-listing-bar .pd-options, .pd-listing-bar .pd-modes { display: flex; align-items: center; gap: 2px; padding: 0 8px 0 4px; border-inline-start: thin solid color-mix(in oklch, var(--glow) 12%, transparent); }
            .pd-listing-bar .pd-options { margin-inline-start: auto; }
            .pd-listing-bar .pd-switch, .pd-listing-bar .pd-run-switch { border: 0; background: none; padding: 5px 7px; font-family: ${({theme:e})=>e.font}; font-size: 11.9px; letter-spacing: .15em; text-transform: uppercase; color: color-mix(in oklch, var(--glow) 55%, var(--night)); cursor: pointer; white-space: nowrap; }
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
        `}navigation(){return h`
            .pd-navigation { display: flex; justify-content: center; align-items: baseline; gap: .15em; margin-block: calc(${({theme:e})=>e.space} / 2); }
            *:has(> .pd-navigation:first-child) { position: relative; }
            .pd-navigation:first-child { position: absolute; inset-block-start: .1rem; inset-inline-end: 0; margin-block: 0; z-index: 2; }
            .pd-navigation a { text-decoration: none; }
            .pd-navigation .pd-word { font-size: ${({theme:e})=>e.size}; line-height: 1; color: color-mix(in srgb, ${({theme:e})=>e.ink} 55%, ${({theme:e})=>e.paper}); transition: color .15s ease; }
            .pd-navigation a:hover .pd-word { color: ${({theme:e})=>e.ink}; }
            .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) { pointer-events: none; }
            .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word { color: color-mix(in srgb, ${({theme:e})=>e.ink} 22%, ${({theme:e})=>e.paper}); }
        `}front(){return h`
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
            .pd-front { --front-width: min(calc((100vh - 7 * ${({theme:e})=>e.space}) * 2 / 3), calc(min(${({theme:e})=>e.measure}, 100vw) - 2 * ${({theme:e})=>e.space})); position: relative; box-sizing: border-box; width: var(--front-width); font-size: calc(var(--front-width) / 22); flex-direction: column; align-items: center; text-align: center; aspect-ratio: 2 / 3; margin: 0 auto calc(2 * ${({theme:e})=>e.space}); padding: 3em 2em 1.75em; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 50%, ${({theme:e})=>e.paper}); box-shadow: inset 0 0 0 .375em ${({theme:e})=>e.paper}, inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}), 2px 12px 28px -12px rgba(0, 0, 0, .45); background: ${({theme:e})=>e.paper}; }
            .pd-front::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1.25em; background: linear-gradient(to right, color-mix(in srgb, ${({theme:e})=>e.ink} 22%, transparent), color-mix(in srgb, ${({theme:e})=>e.ink} 5%, transparent) 55%, transparent); z-index: 1; pointer-events: none; }
            .pd-front > a, .pd-front .pd-word { display: block; }
            .pd-front .pa-reference { color: inherit; text-decoration: none; }
            .pd-front a:hover .pd-word { text-decoration: underline; text-underline-offset: 0.15em; }
            .pd-front-name { font-size: 2.4em; line-height: 1.1; font-weight: bold; margin-block: .15em .33em; }
            .pd-front-name::after { content: ''; display: block; width: 1.45em; border-top: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 50%, ${({theme:e})=>e.paper}); margin: .375em auto 0; }
            .pd-front-author { font-size: 1.15em; letter-spacing: .04em; }
            .pd-front-tagline { font-style: italic; opacity: .75; margin-top: 1.15em; font-size: .95em; }
            .pd-front > :nth-last-child(2) { margin-top: auto; }
            .pd-front-imprint { font-size: .74em; letter-spacing: .15em; text-transform: uppercase; opacity: .65; margin-top: .47em; }
            .pa-page.pa-open { animation: come .5s ease; }
            @keyframes come { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: none; } }
        `}plate(){return h`
            .pd-plate { float: inline-start; width: 11rem; margin: .25rem 1.5rem 1rem 0; }
            .pd-plate .pd-image img { margin-block: 0; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 20%, ${({theme:e})=>e.paper}); box-shadow: 0 1px 3px rgba(0, 0, 0, .12); }
            .pd-plate .pa-opening { text-decoration: none; color: inherit; }
            .pd-plate .pa-opening .pd-word { display: block; font-size: .8rem; margin-top: .4rem; opacity: .75; text-decoration: underline; }
            .pd-chapter:has(> .pd-paragraph > .pd-plate) > .pd-paragraph:first-child { margin-block: 0; }
            @media (max-width: 640px) { .pd-plate { width: 7rem; margin-right: 1rem; } }
        `}page(){return h`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
        `}levels(){return h`
            /* THE UPPER MARGIN STANDS EVERYWHERE, Doug, 2026-11-17: "No upper margin. That should be put back
               everywhere" — every page breathes above its first line. */
            .pd-book { margin-block: calc(2 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space}; counter-reset: chapter equation; }
            .pd-chapter { margin-block: ${({theme:e})=>e.space}; scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-page.pa-open { margin-block-start: calc(${({theme:e})=>e.space} / 2); }
            /* NO LINE BREAKS, Doug, 2026-11-16: "No line break", then "Still breaks EVERYWHERE!!!" — a section
               carries no rule and no extra padding anywhere in the library; margins alone separate. */
            .pd-section { margin-block: ${({theme:e})=>e.space}; }
            .pd-paragraph { margin-block: ${({theme:e})=>e.space}; }
            .pa-item { margin-block: calc(${({theme:e})=>e.space} / 4); }
            .pa-list .pa-item { list-style-position: outside; margin-inline-start: 1.2em; }
            .pd-title { font-size: calc(1.5 * ${({theme:e})=>e.size}); font-weight: bold; margin-block-end: ${({theme:e})=>e.space}; }
            .pd-heading { font-weight: bold; font-size: calc(1.15 * ${({theme:e})=>e.size}); margin-block: ${({theme:e})=>e.space} 0; color: ${({theme:e})=>e.slate}; }
            .pd-section > .pd-heading { margin-block-start: 0; }
            .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)) { display: none; }
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(${({theme:e})=>e.space} / 4); }
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }
        `}labels(){return h`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `}links(){return h`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            /* a heading references itself, and the inheriting above would take the headings' slate from it */
            .pd-heading.pa-self-reference { color: ${({theme:e})=>e.slate}; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return h`
            /* THE HEADER IS ONE COMPACT BAND, Doug, 2026-11-16: "You need to organize the header in the theme. It
               takes up too much space and isn't used. Look how far down the title of the chapter is. Wait are you
               making every chapter like a cover?!?" — the running head a bordered line with no paragraph margin, the
               byline one small line beneath it, author and subject side by side, not a title block of rows. */
            .pd-running-head {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin-block: 0 calc(${({theme:e})=>e.space} / 2);
                padding-block-end: calc(${({theme:e})=>e.space} / 4);
                border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 30%, ${({theme:e})=>e.paper});
            }
            /* THE RUNNING HEAD IS GREY, not the links' teal: the word inside the anchor wears the reference class, and
               the links' colour beat this rule on it from 16 to 19 November; Doug, 2026-11-19: "Why color on the
               title at the top?... Yeah you can fix that." */
            .pd-running-head a, .pd-running-head .pa-reference { text-decoration: none; color: color-mix(in srgb, ${({theme:e})=>e.ink} 70%, ${({theme:e})=>e.paper}); }
            .pd-running-head a:hover, .pd-running-head a:hover .pa-reference { color: ${({theme:e})=>e.ink}; }
            /* ONE HEADER, EVERY PAGE, ITS TABLE-NESS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of
               contents doesn't have the little square. Why isn't it the same thing as the others? Table of contents
               can be an attribute to capture polymorphism." — the same running head stands on every page, the square
               to the cover everywhere, the table's page included; only the title's destination flips, keyed here
               alone on the open table and the title's own data-to attribute. */
            .pd-running-head .pd-square { margin-inline-start: 0.6em; }
            .pd-running-head .pd-book-title[data-to="cover"] { display: none; }
            .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"] { display: none; }
            .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"] { display: inline; }
        `}figures(){return h`
            .pd-figure { max-width: 100%; }
            .pd-code {
                font-family: ui-monospace, monospace;
                font-size: calc(0.85 * ${({theme:e})=>e.size});
                line-height: 1.5;
                white-space: pre;
                overflow-x: auto;
                margin-block: ${({theme:e})=>e.space};
                padding: calc(0.75 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space};
                border-inline-start: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 25%, ${({theme:e})=>e.paper});
            }
            .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: ${({theme:e})=>e.space}; }
            .pd-document object { display: block; width: 100%; aspect-ratio: 1 / 1.4142; margin-block: ${({theme:e})=>e.space}; }
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `}document(){return h`
            .pc-markdown h1 { display: none; }
            .pc-markdown h1 + p { display: none; }
            .pc-markdown h2 { font-family: ${({theme:e})=>e.font}; font-size: calc(1 * ${({theme:e})=>e.size}); font-weight: 600; margin-block: 1.1em .35em; color: color-mix(in srgb, ${({theme:e})=>e.ink} 76%, ${({theme:e})=>e.link} 24%); }
            .pc-markdown h3 { font-family: ${({theme:e})=>e.font}; font-size: calc(1 * ${({theme:e})=>e.size}); font-weight: 600; margin-block: .9em .3em; color: color-mix(in srgb, ${({theme:e})=>e.ink} 76%, ${({theme:e})=>e.link} 24%); }
            .pc-markdown p { margin-block: .9em; }
            .pc-markdown strong { font-weight: bold; }
            .pc-markdown a { color: ${({theme:e})=>e.link}; text-decoration: none; }
            .pc-markdown a:hover { text-decoration: underline; }
            .pc-markdown table { width: 100%; border-collapse: collapse; margin-block: ${({theme:e})=>e.space}; }
            .pc-markdown th, .pc-markdown td { padding: .3em 1.2em .3em 0; text-align: start; vertical-align: top; }
            .pc-markdown th:last-child, .pc-markdown td:last-child { padding-inline-end: 0; }
            .pc-markdown thead th { font-weight: 400; }
            .pc-markdown math { font-family: 'Cambria Math', 'STIX Two Math', math; font-size: 1.08em; }
            .pc-markdown .pc-math-block { margin-block: calc(${({theme:e})=>e.space} / 2); }
            .pc-markdown ol, .pc-markdown ul { padding-inline-start: 1.5em; margin-block: .9em; }
            .pc-markdown li { margin-block: .35em; }
        `}};o($e,"$LibraryTheme");let H=$e;const Nt=n(H),ve=class ve extends g{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const t=e.table?.canonical,s=n(ge),i=n(P);return p(f,{children:[a("span",{className:"pd-book-title","data-to":"table",children:p(s,{children:[a(i,{children:t?.means?.identifier}),e.title?.name]})}),a("span",{className:"pd-book-title","data-to":"cover",children:p(s,{children:[a(i,{children:e.means?.identifier}),e.title?.name]})}),a("span",{className:"pd-square",children:p(s,{children:[a(i,{children:e.means?.identifier}),"☐"]})})]})}};o(ve,"$RunningHead");let M=ve;const we=class we extends m{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};o(we,"$Label");let Y=we;const ye=class ye extends g{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const t=n(At),s=n(ge),i=n(P);return p(f,{children:[a(t,{children:"Author"})," ",p(s,{children:[a(i,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:p(f,{children:[a(t,{children:"About"})," ",p(s,{children:[a(i,{children:e.about.means?.identifier}),e.about.name]})]}),a(t,{children:"Subject"})," ",p(s,{children:[a(i,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};o(ye,"$Byline");let G=ye;const Et=n(M),jt=n(Y),At=jt;n(G);var Tt=Object.defineProperty,Ot=Object.getOwnPropertyDescriptor,rt=o((l,e,t,s)=>{for(var i=Ot(e,t),r=l.length-1,d;r>=0;r--)(d=l[r])&&(i=d(e,t,i)||i);return i&&Tt(e,t,i),i},"__decorateClass$1");const De=class De extends I{constructor(){super(...arguments),this.specification=new z}get line(){return st.copy(this.text)}write(){return this.line}};o(De,"$Tagline");let D=De;const ze=class ze extends q{$saidOfACover(e){S(e instanceof F&&e.is(me),"a tagline is said of a cover, and this is not one")}};o(ze,"TaglineSpecification");let z=ze;rt([W("a tagline is said of a cover")],z.prototype,"$saidOfACover");const Ne=class Ne extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};o(Ne,"$FrontName");let J=Ne;const Ee=class Ee extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};o(Ee,"$FrontAuthor");let V=Ee;const je=class je extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};o(je,"$FrontTagline");let K=je;const Ae=class Ae extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};o(Ae,"$FrontImprint");let U=Ae;const Te=class Te extends g{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const t=n(Pt),s=n(Wt),i=n(It),r=n(qt),d=n(ut),c=n(P),k=e.cover?.annotations.expressed(D),b=e.table?.canonical;return p(f,{children:[p(t,{children:[a(c,{children:b?.means?.identifier}),e.title?.name]}),p(s,{children:[a(c,{children:e.author?.means?.identifier}),e.author?.name]}),k===void 0?null:a(i,{children:k.line}),p(r,{children:[a(c,{children:e.subject?.means?.identifier}),e.subject?.name]}),a(r,{children:a(d,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};o(Te,"$Front");let X=Te;const Oe=class Oe extends g{$Define(){super.$Define(),this.classes.add(this,"pd-navigation")}$Bound(){const e=this.chapter,t=this.book;if(e!==void 0&&t!==void 0&&[...this.text].length===0){const s=n(kt),i=n(xt),r=n(ge),d=n(P),c=n($t),k=t.table?.canonical;if(e.is(at)){this.text.add(this,p(r,{children:[a(d,{children:t.means?.identifier}),"◁"]}),p(r,{children:[a(c,{children:e.mention?.identifier}),"☐"]}),a(i,{children:"▷"})),super.$Bound();return}this.text.add(this,a(s,{children:"◁"}),p(r,{children:[a(d,{children:k?.means?.identifier}),"☐"]}),a(i,{children:"▷"}))}super.$Bound()}};o(Oe,"$Navigation");let N=Oe;const Re=class Re extends be{constructor(){super(...arguments),this.specification=new E,this.style=u.div`
        &:not(:has(.pa-page.pa-open)) { display: none; }
    `}$Define(){super.$Define();const e=n(Mt);this.text.add(this,a(e,{}),a(e,{}))}defines(e){e.classes.add(this,"pa-navigated"),e.containers.add(this,this.layer)}erase(e){e.containers.revert(this),e.classes.revert(this)}get layer(){if(this._layer!==void 0)return this._layer;const e=this.style,[t,s]=[...this.text],i=n(t),r=n(s);return this._layer=({className:d,children:c})=>p(e,{className:d,children:[a(i,{}),c,a(r,{})]})}};o(Re,"$Navigated");let Q=Re;const Ce=class Ce extends q{$saidOfAChapter(e){S(e instanceof F,"navigated is said of a chapter, and this is not one")}};o(Ce,"NavigatedSpecification");let E=Ce;rt([W("navigated is said of a chapter")],E.prototype,"$saidOfAChapter");const Be=class Be extends me{constructor(){super(...arguments),this.style=u.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};o(Be,"$LibraryCover");let Z=Be;const Se=class Se extends mt{constructor(){super(...arguments),this.style=u.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};o(Se,"$LibrarySynopsis");let L=Se;const Pe=class Pe extends at{constructor(){super(...arguments),this.style=u.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-heading { font-size: 1em; font-weight: bold; color: ${({theme:e})=>e.slate}; margin-block: ${({theme:e})=>e.space} calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-section > .pd-heading { margin-block-start: 0; }
        .pa-table-of-contents a.pa-reference { color: ${({theme:e})=>e.ink}; text-decoration-line: none; }
        .pa-table-of-contents .pa-content { color: ${({theme:e})=>e.ink}; }
    `}};o(Pe,"$LibraryTableOfContents");let _=Pe;const We=class We extends bt{constructor(){super(...arguments),this.style=u(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:e})=>e.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:e})=>e.space} / 3) calc(0.75 * ${({theme:e})=>e.space}) calc(${({theme:e})=>e.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
    `}};o(We,"$LibraryTable");let ee=We;const Dn=n(Z),zn=n(L),Nn=n(_),En=n(ee),Rt=n(J),Ct=n(V),Bt=n(K),St=n(U),jn=n(D),Pt=Rt,Wt=Ct,It=Bt,qt=St,Ft=n(X),Ht=n(N),Mt=Ht,Yt=n(Q);var Gt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,pt=o((l,e,t,s)=>{for(var i=Jt(e,t),r=l.length-1,d;r>=0;r--)(d=l[r])&&(i=d(e,t,i)||i);return i&&Gt(e,t,i),i},"__decorateClass");const Ie=class Ie extends q{$saidOfABook(e){S(e instanceof ue,"this is said of a book, and this is not one")}};o(Ie,"OfABookSpecification");let x=Ie;pt([W("this is said of a book")],x.prototype,"$saidOfABook");const B=class B extends I{constructor(){super(...arguments),this.specification=new x}defines(e){for(const t of e.annotations.after(this))t instanceof B&&e.annotations.express(t,!1)}erase(e){e.classes.revert(this)}};o(B,"$Mode");let j=B;const qe=class qe extends j{defines(e){super.defines(e),e.classes.add(this,"pa-page-mode")}};o(qe,"$PageMode");let te=qe;const Fe=class Fe extends j{defines(e){super.defines(e),e.classes.add(this,"pa-editor-mode")}};o(Fe,"$EditorMode");let A=Fe;const He=class He extends I{constructor(){super(...arguments),this.specification=new x}erase(e){e.classes.revert(this)}};o(He,"$Option");let $=He;const Me=class Me extends ${defines(e){e.classes.add(this,"pa-words-away")}};o(Me,"$WordsAway");let ne=Me;const Ye=class Ye extends ${defines(e){e.classes.add(this,"pa-light-code")}};o(Ye,"$LightCode");let ie=Ye;const Ge=class Ge extends ${defines(e){e.classes.add(this,"pa-wrapped-code")}};o(Ge,"$WrappedCode");let ae=Ge;const Je=class Je extends ${defines(e){e.classes.add(this,"pa-unnumbered-code")}};o(Je,"$UnnumberedCode");let se=Je;const Ve=class Ve extends m{constructor(){super(...arguments),this.$annotation=void 0,this.$inverse=!1}get on(){return(this.$annotation!==void 0&&[this.book.$is].flat().includes(this.$annotation))!==this.$inverse}$Switch(...e){this.$Writing(...e),this.containers.replace(this,"span","button")}container(e){return super.container({type:"button","aria-pressed":this.on,onClick:o(()=>this.press(),"onClick"),...e})}press(){const e=this.book,t=this.$annotation;if(t===void 0)return;const s=[e.$is].flat();e.$is=s.includes(t)?s.filter(i=>i!==t):[t,...s]}$Define(){super.$Define(),this.classes.add(this,"pd-switch")}};o(Ve,"$Switch");let T=Ve;const Ke=class Ke extends T{constructor(){super(...arguments),this.$family=[]}get on(){const e=this.book,t=this.$annotation;if(t===void 0)return!1;const s=[e.$is].flat();return s.some(i=>this.$family.includes(i))?s.includes(t):e.annotations.expressed(t)!==void 0}press(){const e=this.book,t=this.$annotation;if(t===void 0)return;const s=[e.$is].flat().filter(i=>!this.$family.includes(i));e.$is=[t,...s]}};o(Ke,"$Tab");let oe=Ke;const Vt={tsx:"typescript",ts:"typescript",mjs:"javascript",js:"javascript",css:"css",html:"xml",svg:"xml",json:"json",md:"markdown"},v=o(l=>`${l.$identifier}${l.$type}`,"fileNameOf"),ke=o(l=>[...l?.annotations.find(yt)??[]].reverse(),"filesOf"),Kt="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap",y=o(l=>l.book?.annotations.expressed(O),"editorOf"),Ue=class Ue extends g{constructor(){super(...arguments),this.$identifier="",this.$type="",this.$running=!1}get files(){const e=ke(this.chapter);return this.$identifier===""?e:e.filter(t=>t.$identifier===this.$identifier&&(this.$type===""||t.$type===this.$type))}get openFile(){const e=this.files,t=y(this)?.$openFile;return t!==void 0&&e.includes(t)?t:e[0]}get runs(){return this.openFile?.$type===".html"}$Listing(...e){this.$Writing(...e),this.containers.replace(this,"span","div")}write(){const e=this.openFile;if(e===void 0)return null;const t=n(mn),s=n(vt),i=Vt[e.$type.replace(/^\./u,"")]??"";return p(f,{children:[a(t,{listing:this}),a("div",{className:"pd-pane",children:this.$running&&this.runs?a("iframe",{className:"pd-run",sandbox:"allow-scripts",srcDoc:st.copy(e.text),title:v(e)}):a(s,{identifier:e.$identifier,type:e.$type,language:i,numbered:!0})})]})}$Define(){super.$Define(),this.classes.add(this,"pd-listing")}};o(Ue,"$Listing");let w=Ue;const Xe=class Xe extends g{constructor(){super(...arguments),this.$listing=void 0}$ListingBar(...e){this.$Writing(...e),this.containers.replace(this,"span","div")}write(){const e=this.$listing;if(e===void 0)return null;const t=n(bn),s=n(un),i=n(hn),r=n(fn);return p(f,{children:[e.files.map(d=>a(t,{listing:e,file:d},v(d))),e.runs?a("span",{className:"pd-faces",children:a(s,{listing:e})}):null,p("span",{className:"pd-options",children:[a(i,{annotation:dn,children:"light"}),a(i,{annotation:ln,children:"wrap"}),a(i,{annotation:cn,inverse:!0,children:"lines"})]}),p("span",{className:"pd-modes",children:[a(i,{annotation:pn,inverse:!0,children:"words"}),a(r,{annotation:lt,family:he,children:"the page"}),a(r,{annotation:ct,family:he,children:"the editor"})]})]})}$Define(){super.$Define(),this.classes.add(this,"pd-listing-bar")}};o(Xe,"$ListingBar");let re=Xe;const Qe=class Qe extends m{constructor(){super(...arguments),this.$listing=void 0,this.$file=void 0}get on(){return this.$file!==void 0&&this.$listing?.openFile===this.$file}$FileTab(...e){this.$Writing(...e),this.containers.replace(this,"span","button")}container(e){return super.container({type:"button","aria-pressed":this.on,onClick:o(()=>this.press(),"onClick"),...e})}press(){const e=this.$listing;if(e===void 0||this.$file===void 0)return;const t=y(e);t!==void 0&&(t.$openFile=this.$file),e.$running=!1}write(){return p(f,{children:[a("span",{className:"pd-mark",children:"‹›"}),this.$file===void 0?"":v(this.$file)]})}$Define(){super.$Define(),this.classes.add(this,"pd-file-tab")}};o(Qe,"$FileTab");let pe=Qe;const Ze=class Ze extends m{constructor(){super(...arguments),this.$listing=void 0}$Run(...e){this.$Writing(...e),this.containers.replace(this,"span","button")}container(e){return super.container({type:"button","aria-pressed":this.$listing?.$running===!0,onClick:o(()=>this.press(),"onClick"),...e})}press(){const e=this.$listing;e!==void 0&&(e.$running=!e.$running)}write(){return"run"}$Define(){super.$Define(),this.classes.add(this,"pd-run-switch")}};o(Ze,"$Run");let de=Ze;const Le=class Le extends be{constructor(){super(...arguments),this.specification=new x,this.$openFile=void 0,this.style=u.div`
        &:has(> .pd-book.pa-editing) { display: grid; grid-template-columns: 13rem minmax(0, 36rem) minmax(0, 1fr); align-items: start; min-height: 100vh; }
        &:has(> .pd-book.pa-editing.pa-words-away) { grid-template-columns: 13rem minmax(0, 1fr); }
        & > .pd-book.pa-editing { display: contents; }
        & > .pd-book.pa-editing > * { grid-column: 2; box-sizing: border-box; min-width: 0; padding-inline: 1.5rem; }
        & > .pd-book.pa-editing > .pd-running-head { padding-block-start: calc(2 * ${({theme:e})=>e.space}); }
        & > .pd-book.pa-editing.pa-words-away > :not(.pd-file-page):not(.pd-container:has(.pa-table-of-contents)) { display: none; }
        & > .pd-book.pa-editing .pa-page.pa-open > .pd-listing { display: none; }
        & > .pd-book.pa-editing > .pd-container:has(.pa-table-of-contents) { grid-column: 1; grid-row: 1 / span 99; position: sticky; top: 0; height: 100vh; overflow: auto; padding: calc(2 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space} ${({theme:e})=>e.space} 1.5rem; font-size: .86em; scrollbar-width: thin; scrollbar-color: transparent transparent; }
        & > .pd-book.pa-editing > .pd-container:has(.pa-table-of-contents):hover { scrollbar-color: color-mix(in srgb, ${({theme:e})=>e.ink} 25%, transparent) transparent; }
        & > .pd-book.pa-editing .pa-table-of-contents.pa-page:not(.pa-open) { display: block; }
        & > .pd-book.pa-editing .pd-container:has(> .pa-table-of-contents) { display: block; }
        & > .pd-book.pa-editing .pd-container:has(> .pa-table-of-contents) > .pd-navigation { display: none; }
        & > .pd-book.pa-editing .pa-table-of-contents { margin-block: 0; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-title, & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph:has(> .pa-parenthetical), & > .pd-book.pa-editing .pa-table-of-contents .pa-parenthetical { display: none; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-section { margin-block: 0 ${({theme:e})=>e.space}; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-heading { margin-block: 0 1rem; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph { margin: 0 0 .25rem -1.5rem; padding: .15rem 0 .15rem calc(1.5rem - 2px); border-inline-start: 2px solid transparent; color: color-mix(in srgb, ${({theme:e})=>e.ink} 72%, ${({theme:e})=>e.paper}); }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-paragraph.pa-open { border-inline-start-color: ${({theme:e})=>e.link}; color: ${({theme:e})=>e.ink}; }
        & > .pd-book.pa-editing > .pd-file-page { display: grid; grid-column: 3; grid-row: 1 / span 99; grid-template-rows: auto minmax(0, 1fr); position: sticky; top: 0; height: 100vh; padding: calc(2 * ${({theme:e})=>e.space}) 2rem ${({theme:e})=>e.space}; margin-block: 0; background: ${({theme:e})=>e.paper}; }
        & > .pd-book.pa-editing > .pd-file-page .pd-listing { margin: 0; min-height: 0; }
        & > .pd-book.pa-editing > .pd-file-page .pd-pane { max-height: none; }
        & > .pd-book.pa-editing > .pd-file-page .pd-run { height: 100%; }
        .pd-file-page { display: none; }
        .pd-file-head { display: flex; justify-content: flex-end; align-items: center; gap: .6em; margin: 0 0 ${({theme:e})=>e.space}; padding-block-end: calc(${({theme:e})=>e.space} / 4); border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 30%, ${({theme:e})=>e.paper}); font-size: calc(0.7 * ${({theme:e})=>e.size}); letter-spacing: 0.08em; text-transform: uppercase; }
        .pd-file-head .pd-file-label { color: color-mix(in srgb, ${({theme:e})=>e.ink} 60%, ${({theme:e})=>e.paper}); }
        .pd-file-head .pd-file-name { font: 500 12px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0; text-transform: none; color: ${({theme:e})=>e.ink}; }
        /* the files, a parenthesis on the chapter's row in the code's face at the label's size: the square before
           each opens the page at the file, the name the editor; the open file in ink and underlined */
        .pa-table-of-contents .pd-container:has(> .pd-files) { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: .55em; }
        .pd-files { font: 400 12px 'JetBrains Mono', ui-monospace, monospace; color: color-mix(in srgb, ${({theme:e})=>e.ink} 50%, ${({theme:e})=>e.paper}); white-space: nowrap; }
        .pd-files .pd-square { font-family: ${({theme:e})=>e.font}; font-size: 13px; margin-inline-end: .3em; color: color-mix(in srgb, ${({theme:e})=>e.ink} 45%, ${({theme:e})=>e.paper}); text-decoration: none; }
        .pd-files .pd-square:hover { color: ${({theme:e})=>e.ink}; }
        .pd-files .pd-leaf { color: inherit; text-decoration: none; }
        .pd-files .pd-leaf:hover, .pd-files .pd-leaf.pa-open { color: ${({theme:e})=>e.ink}; text-decoration: underline; text-underline-offset: .15em; }
        & > .pd-book.pa-editing .pa-table-of-contents .pd-files { white-space: normal; }
        @media (max-width: 640px) {
            &:has(> .pd-book.pa-editing), &:has(> .pd-book.pa-editing.pa-words-away) { display: block; }
            & > .pd-book.pa-editing { display: block; }
            & > .pd-book.pa-editing > * { padding-inline: 0; }
            & > .pd-book.pa-editing > .pd-container:has(.pa-table-of-contents) { display: none; }
            & > .pd-book.pa-editing.pa-words-away > :not(.pd-file-page):not(.pd-container:has(.pa-table-of-contents)) { display: revert; }
            & > .pd-book.pa-editing > .pd-file-page { position: static; height: auto; padding: 0 0 ${({theme:e})=>e.space}; }
            & > .pd-book.pa-editing > .pd-file-page .pd-pane { max-height: 70vh; }
        }
    `}note(){return a("link",{rel:"stylesheet",href:Kt})}defines(e){if(super.defines(e),e.classes.add(this,"pa-editor"),!(e instanceof ue))return;const t=e.bookmark??e.cover;e.annotations.expressed(A)!==void 0&&t!==void 0&&t.text.find(w).length>0&&e.classes.add(this,"pa-editing")}erase(e){super.erase(e),e.classes.revert(this)}};o(Le,"$Editor");let O=Le;const _e=class _e extends g{$FilePage(...e){this.$Writing(...e),this.containers.replace(this,"span","div")}write(){const e=this.book;if(e===void 0)return null;const t=e.bookmark??e.cover,s=t?.text.find(w)[0];if(t===void 0||s===void 0)return null;const i=ke(t),r=y(this)?.$openFile,d=r!==void 0&&i.includes(r)?r:i[0],c=n(gn);return p(f,{children:[p("div",{className:"pd-file-head",children:[a("span",{className:"pd-file-label",children:"The file beside the chapter"}),a("span",{className:"pd-file-name",children:d===void 0?"":v(d)})]}),a(c,{chapter:t,identifier:s.$identifier,type:s.$type})]})}$Define(){super.$Define(),this.classes.add(this,"pd-file-page")}};o(_e,"$FilePage");let le=_e;const et=class et extends be{get meant(){const e=this.parent?.annotations.expressed(wt)?.identifier;if(!(e===void 0||e===""))return this.book?.text.find(F).find(t=>t.mention?.identifier===e)}$Branch(...e){this.$Format(...e),this.style=({className:t,children:s})=>{const i=this.meant,r=i===void 0||i.text.find(w).length===0?[]:ke(i),d=y(this)?.$openFile,c=d!==void 0&&r.includes(d)?d:r[0],k=this.book?.bookmark===i;return p("div",{className:t,children:[s,r.length===0?null:p("span",{className:"pd-files",children:["(",r.map((b,ht)=>p("span",{className:"pd-file",children:[ht===0?"":", ",a("a",{className:"pd-square",href:i?.mention?.identifier,title:"the page",onClick:o(()=>this.press(b,lt),"onClick"),children:"☐"}),a("a",{className:k&&c===b?"pd-leaf pa-open":"pd-leaf",href:i?.mention?.identifier,title:"the editor",onClick:o(()=>this.press(b,ct),"onClick"),children:v(b)})]},v(b))),")"]})]})}}press(e,t){const s=this.book;if(s===void 0)return;const i=y(this);i!==void 0&&(i.$openFile=e);const r=[s.$is].flat().filter(d=>!he.includes(d));s.$is=[t,...r]}defines(e){super.defines(e),e.classes.add(this,"pa-branch");const t=this.book,s=this.meant;if(t===void 0)return;const i=s!==void 0&&t.bookmark===s,r=[...e.classes].includes("pa-open");i&&!r&&e.classes.add(t,"pa-open"),!i&&r&&e.classes.revert(t)}erase(e){super.erase(e),e.classes.revert(this)}};o(et,"$Branch");let R=et;const tt=class tt extends I{constructor(){super(...arguments),this.specification=new C}defines(e){e.classes.add(this,"pa-appendix")}erase(e){e.classes.revert(this)}};o(tt,"$Appendix");let ce=tt;const nt=class nt extends q{$saidOfASection(e){S(e instanceof ot,"an appendix is said of a section of the table of contents, and this is not a section")}};o(nt,"AppendixSpecification");let C=nt;pt([W("an appendix is said of a section")],C.prototype,"$saidOfASection");const xe=n(te),dt=n(A),Ut=n(ne),Xt=n(ie),Qt=n(ae),Zt=n(se),Lt=n(T),_t=n(oe),en=n(w),tn=n(re),nn=n(pe),an=n(de),sn=n(O),on=n(le),rn=n(R),An=n(ce),he=[xe,dt],lt=xe,ct=dt,pn=Ut,dn=Xt,ln=Qt,cn=Zt,hn=Lt,fn=_t,gn=en,mn=tn,bn=nn,un=an,it=class it extends ue{write(){const e=n(Et),t=n(Ft),s=n(on);return p(f,{children:[a(e,{chapter:this.cover}),a(t,{chapter:this.cover}),super.write(),a(s,{chapter:this.cover})]})}turn(){window.scrollTo(0,0)}$Define(){super.$Define(),this.annotations.add(this,a(sn,{}),a(zt,{}),a(xe,{}))}$Bound(){const e=n(Yt),t=n(rn);for(const s of this.table?.text.find(ot)??[])for(const i of s.text.find(g))i.annotations.expressed(R)===void 0&&i.annotations.append(this,a(t,{}));for(const s of this.text.find(F))s.is(me)||s.text.find(N).length>0||(s.annotations.add(this,a(e,{})),s.annotations.define());super.$Bound()}};o(it,"$TheLibrary");let fe=it;const kn=n(fe);n(kn,Dt)(Nt);export{fe as $,An as A,Dn as C,dt as E,en as L,zn as S,jn as T,Nn as a,En as b};
