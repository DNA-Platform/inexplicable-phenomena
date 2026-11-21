var ut=Object.defineProperty;var a=(l,e)=>ut(l,"name",{value:e,configurable:!0});import{jsxs as p,Fragment as f,jsx as s}from"react/jsx-runtime";import{$ as n,selection as g,$check as x}from"@dna-platform/chemistry";import{$Theme as kt,$Paragraph as m,Word as ue,Reference as H,$Word as b,specify as D,$Cover as ke,$Synopsis as xt,$TableOfContents as lt,$Table as $t,$Annotation as N,html as xe,Means as vt,Previous as wt,Next as yt,Self as Dt,$Format as $e,AnnotationSpecification as j,$Chapter as Y,$Title as zt,Code as Et,$Book as ve,$Content as Nt,$Append as jt,$Section as ct,Theme as At,Paginated as Tt}from"@dna-platform/public";import{css as h}from"styled-components";const De=class De extends kt{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.slate="#3b4a55",this.paper="#ffffff",this.link="#1f4e79",this.style=g.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate(),this.navigation(),this.listing()]}listing(){return h`
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
            /* A SUBTITLE READS AS A SECOND LINE OF THE TITLE, Doug, 2026-11-21: "Figure out how to write a subtitle
               that looks good" — the book's own size, not the title's, so the title stays the loudest thing on the
               page; the weight dropped to normal and the ink mixed toward the slate the headings wear, so it reads
               as a line of writing rather than a smaller heading; italic, which is how a second line of a title has
               been set since the title page. */
            .pd-title .pa-subtitle { display: block; font-size: ${({theme:e})=>e.size}; font-weight: 400; font-style: italic; line-height: 1.4; margin-block-start: calc(${({theme:e})=>e.space} / 3); color: color-mix(in srgb, ${({theme:e})=>e.slate} 82%, ${({theme:e})=>e.paper}); }
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
        `}};a(De,"$LibraryTheme");let G=De;const Ot=n(G),ze=class ze extends m{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const t=e.table?.canonical,o=n(ue),i=n(H);return p(f,{children:[s("span",{className:"pd-book-title","data-to":"table",children:p(o,{children:[s(i,{children:t?.means?.identifier}),e.title?.name]})}),s("span",{className:"pd-book-title","data-to":"cover",children:p(o,{children:[s(i,{children:e.means?.identifier}),e.title?.name]})}),s("span",{className:"pd-square",children:p(o,{children:[s(i,{children:e.means?.identifier}),"☐"]})})]})}};a(ze,"$RunningHead");let J=ze;const Ee=class Ee extends b{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};a(Ee,"$Label");let U=Ee;const Ne=class Ne extends m{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const t=n(Bt),o=n(ue),i=n(H);return p(f,{children:[s(t,{children:"Author"})," ",p(o,{children:[s(i,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:p(f,{children:[s(t,{children:"About"})," ",p(o,{children:[s(i,{children:e.about.means?.identifier}),e.about.name]})]}),s(t,{children:"Subject"})," ",p(o,{children:[s(i,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};a(Ne,"$Byline");let V=Ne;const Rt=n(J),Ct=n(U),Bt=Ct;n(V);var It=Object.defineProperty,Pt=Object.getOwnPropertyDescriptor,M=a((l,e,t,o)=>{for(var i=Pt(e,t),r=l.length-1,d;r>=0;r--)(d=l[r])&&(i=d(e,t,i)||i);return i&&It(e,t,i),i},"__decorateClass$1");const je=class je extends N{constructor(){super(...arguments),this.specification=new T}get line(){return xe.copy(this.text)}write(){return this.line}};a(je,"$Tagline");let A=je;const Ae=class Ae extends j{$saidOfACover(e){x(e instanceof Y&&e.is(ke),"a tagline is said of a cover, and this is not one")}};a(Ae,"TaglineSpecification");let T=Ae;M([D("a tagline is said of a cover")],T.prototype,"$saidOfACover");const Te=class Te extends N{constructor(){super(...arguments),this.specification=new z,this.span=g.span.attrs({className:"pa-subtitle"})``}get line(){return xe.copy(this.text).trim()}note(){const e=this.span;return s(e,{children:this.line})}defines(e){e.classes.add(this,"pa-subtitled")}erase(e){e.classes.revert(this)}};a(Te,"$Subtitle");let O=Te;const Oe=class Oe extends j{$saidOfATitle(e){x(e instanceof zt,"a subtitle is said of a title, and this is not one")}$holdsItsLine(e){x(e.annotations.find(O).every(t=>t.line!==""),"a subtitle holds its line, and this one holds nothing")}};a(Oe,"SubtitleSpecification");let z=Oe;M([D("a subtitle is said of a title")],z.prototype,"$saidOfATitle");M([D("a subtitle holds its line")],z.prototype,"$holdsItsLine");const Re=class Re extends b{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};a(Re,"$FrontName");let K=Re;const Ce=class Ce extends b{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};a(Ce,"$FrontAuthor");let L=Ce;const Be=class Be extends b{$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};a(Be,"$FrontTagline");let Q=Be;const Ie=class Ie extends b{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};a(Ie,"$FrontImprint");let X=Ie;const Pe=class Pe extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const t=n(Ht),o=n(Yt),i=n(Mt),r=n(Gt),d=n(vt),c=n(H),k=e.cover?.annotations.expressed(A),u=e.table?.canonical;return p(f,{children:[p(t,{children:[s(c,{children:u?.means?.identifier}),e.title?.name]}),p(o,{children:[s(c,{children:e.author?.means?.identifier}),e.author?.name]}),k===void 0?null:s(i,{children:k.line}),p(r,{children:[s(c,{children:e.subject?.means?.identifier}),e.subject?.name]}),s(r,{children:s(d,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};a(Pe,"$Front");let Z=Pe;const Se=class Se extends m{$Define(){super.$Define(),this.classes.add(this,"pd-navigation")}$Bound(){const e=this.chapter,t=this.book;if(e!==void 0&&t!==void 0&&[...this.text].length===0){const o=n(wt),i=n(yt),r=n(ue),d=n(H),c=n(Dt),k=t.table?.canonical;if(e.is(lt)){this.text.add(this,p(r,{children:[s(d,{children:t.means?.identifier}),"◁"]}),p(r,{children:[s(c,{children:e.mention?.identifier}),"☐"]}),s(i,{children:"▷"})),super.$Bound();return}this.text.add(this,s(o,{children:"◁"}),p(r,{children:[s(d,{children:k?.means?.identifier}),"☐"]}),s(i,{children:"▷"}))}super.$Bound()}};a(Se,"$Navigation");let R=Se;const We=class We extends $e{constructor(){super(...arguments),this.specification=new C,this.style=g.div`
        &:not(:has(.pa-page.pa-open)) { display: none; }
    `}$Define(){super.$Define();const e=n(Vt);this.text.add(this,s(e,{}),s(e,{}))}defines(e){e.classes.add(this,"pa-navigated"),e.containers.add(this,this.layer)}erase(e){e.containers.revert(this),e.classes.revert(this)}get layer(){if(this._layer!==void 0)return this._layer;const e=this.style,[t,o]=[...this.text],i=n(t),r=n(o);return this._layer=({className:d,children:c})=>p(e,{className:d,children:[s(i,{}),c,s(r,{})]})}};a(We,"$Navigated");let _=We;const Fe=class Fe extends j{$saidOfAChapter(e){x(e instanceof Y,"navigated is said of a chapter, and this is not one")}};a(Fe,"NavigatedSpecification");let C=Fe;M([D("navigated is said of a chapter")],C.prototype,"$saidOfAChapter");const qe=class qe extends ke{constructor(){super(...arguments),this.style=g.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};a(qe,"$LibraryCover");let ee=qe;const He=class He extends xt{constructor(){super(...arguments),this.style=g.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};a(He,"$LibrarySynopsis");let te=He;const Ye=class Ye extends lt{constructor(){super(...arguments),this.style=g.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-heading { font-size: 1em; font-weight: bold; color: ${({theme:e})=>e.slate}; margin-block: ${({theme:e})=>e.space} calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-section > .pd-heading { margin-block-start: 0; }
        .pa-table-of-contents a.pa-reference { color: ${({theme:e})=>e.ink}; text-decoration-line: none; }
        .pa-table-of-contents .pa-content { color: ${({theme:e})=>e.ink}; }
    `}};a(Ye,"$LibraryTableOfContents");let ne=Ye;const Me=class Me extends $t{constructor(){super(...arguments),this.style=g(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:e})=>e.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:e})=>e.space} / 3) calc(0.75 * ${({theme:e})=>e.space}) calc(${({theme:e})=>e.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
    `}};a(Me,"$LibraryTable");let ie=Me;const An=n(ee),Tn=n(te),On=n(ne),Rn=n(ie),St=n(K),Wt=n(L),Ft=n(Q),qt=n(X),Cn=n(A),Bn=n(O),Ht=St,Yt=Wt,Mt=Ft,Gt=qt,Jt=n(Z),Ut=n(R),Vt=Ut,Kt=n(_);var Lt=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,ht=a((l,e,t,o)=>{for(var i=Qt(e,t),r=l.length-1,d;r>=0;r--)(d=l[r])&&(i=d(e,t,i)||i);return i&&Lt(e,t,i),i},"__decorateClass");const Ge=class Ge extends j{$saidOfABook(e){x(e instanceof ve,"this is said of a book, and this is not one")}};a(Ge,"OfABookSpecification");let $=Ge;ht([D("this is said of a book")],$.prototype,"$saidOfABook");const q=class q extends N{constructor(){super(...arguments),this.specification=new $}defines(e){for(const t of e.annotations.after(this))t instanceof q&&e.annotations.express(t,!1)}erase(e){e.classes.revert(this)}};a(q,"$Mode");let B=q;const Je=class Je extends B{defines(e){super.defines(e),e.classes.add(this,"pa-page-mode")}};a(Je,"$PageMode");let se=Je;const Ue=class Ue extends B{defines(e){super.defines(e),e.classes.add(this,"pa-editor-mode")}};a(Ue,"$EditorMode");let I=Ue;const Ve=class Ve extends N{constructor(){super(...arguments),this.specification=new $}erase(e){e.classes.revert(this)}};a(Ve,"$Option");let v=Ve;const Ke=class Ke extends v{defines(e){e.classes.add(this,"pa-words-away")}};a(Ke,"$WordsAway");let ae=Ke;const Le=class Le extends v{defines(e){e.classes.add(this,"pa-light-code")}};a(Le,"$LightCode");let oe=Le;const Qe=class Qe extends v{defines(e){e.classes.add(this,"pa-wrapped-code")}};a(Qe,"$WrappedCode");let re=Qe;const Xe=class Xe extends v{defines(e){e.classes.add(this,"pa-unnumbered-code")}};a(Xe,"$UnnumberedCode");let pe=Xe;const Ze=class Ze extends b{constructor(){super(...arguments),this.$annotation=void 0,this.$inverse=!1}get on(){return(this.$annotation!==void 0&&[this.book.$is].flat().includes(this.$annotation))!==this.$inverse}$Switch(...e){this.$Writing(...e),this.containers.replace(this,"span","button")}container(e){return super.container({type:"button","aria-pressed":this.on,onClick:a(()=>this.press(),"onClick"),...e})}press(){const e=this.book,t=this.$annotation;if(t===void 0)return;const o=[e.$is].flat();e.$is=o.includes(t)?o.filter(i=>i!==t):[t,...o]}$Define(){super.$Define(),this.classes.add(this,"pd-switch")}};a(Ze,"$Switch");let P=Ze;const _e=class _e extends P{constructor(){super(...arguments),this.$family=[]}get on(){const e=this.book,t=this.$annotation;if(t===void 0)return!1;const o=[e.$is].flat();return o.some(i=>this.$family.includes(i))?o.includes(t):e.annotations.expressed(t)!==void 0}press(){const e=this.book,t=this.$annotation;if(t===void 0)return;const o=[e.$is].flat().filter(i=>!this.$family.includes(i));e.$is=[t,...o]}};a(_e,"$Tab");let de=_e;const Xt={tsx:"typescript",ts:"typescript",mjs:"javascript",js:"javascript",css:"css",html:"xml",svg:"xml",json:"json",md:"markdown"},w=a(l=>`${l.$identifier}${l.$type}`,"fileNameOf"),we=a(l=>[...l?.annotations.find(jt)??[]].reverse(),"filesOf"),Zt="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap",E=a(l=>l.book?.annotations.expressed(S),"editorOf"),et=class et extends m{constructor(){super(...arguments),this.$identifier="",this.$type="",this.$running=!1}get files(){const e=we(this.chapter);return this.$identifier===""?e:e.filter(t=>t.$identifier===this.$identifier&&(this.$type===""||t.$type===this.$type))}get openFile(){const e=this.files,t=E(this)?.$openFile;return t!==void 0&&e.includes(t)?t:e[0]}get runs(){return this.openFile?.$type===".html"}$Listing(...e){this.$Writing(...e),this.containers.replace(this,"span","div")}write(){const e=this.openFile;if(e===void 0)return null;const t=n($n),o=n(Et),i=Xt[e.$type.replace(/^\./u,"")]??"";return p(f,{children:[s(t,{listing:this}),s("div",{className:"pd-pane",children:this.$running&&this.runs?s("iframe",{className:"pd-run",sandbox:"allow-scripts",srcDoc:xe.copy(e.text),title:w(e)}):s(o,{identifier:e.$identifier,type:e.$type,language:i,numbered:!0})})]})}$Define(){super.$Define(),this.classes.add(this,"pd-listing")}};a(et,"$Listing");let y=et;const tt=class tt extends m{constructor(){super(...arguments),this.$listing=void 0}$ListingBar(...e){this.$Writing(...e),this.containers.replace(this,"span","div")}write(){const e=this.$listing;if(e===void 0)return null;const t=n(vn),o=n(wn),i=n(un),r=n(kn);return p(f,{children:[e.files.map(d=>s(t,{listing:e,file:d},w(d))),e.runs?s("span",{className:"pd-faces",children:s(o,{listing:e})}):null,p("span",{className:"pd-options",children:[s(i,{annotation:gn,children:"light"}),s(i,{annotation:mn,children:"wrap"}),s(i,{annotation:bn,inverse:!0,children:"lines"})]}),p("span",{className:"pd-modes",children:[s(i,{annotation:fn,inverse:!0,children:"words"}),s(r,{annotation:gt,family:me,children:"the page"}),s(r,{annotation:mt,family:me,children:"the editor"})]})]})}$Define(){super.$Define(),this.classes.add(this,"pd-listing-bar")}};a(tt,"$ListingBar");let le=tt;const nt=class nt extends b{constructor(){super(...arguments),this.$listing=void 0,this.$file=void 0}get on(){return this.$file!==void 0&&this.$listing?.openFile===this.$file}$FileTab(...e){this.$Writing(...e),this.containers.replace(this,"span","button")}container(e){return super.container({type:"button","aria-pressed":this.on,onClick:a(()=>this.press(),"onClick"),...e})}press(){const e=this.$listing;if(e===void 0||this.$file===void 0)return;const t=E(e);t!==void 0&&(t.$openFile=this.$file),e.$running=!1}write(){return p(f,{children:[s("span",{className:"pd-mark",children:"‹›"}),this.$file===void 0?"":w(this.$file)]})}$Define(){super.$Define(),this.classes.add(this,"pd-file-tab")}};a(nt,"$FileTab");let ce=nt;const it=class it extends b{constructor(){super(...arguments),this.$listing=void 0}$Run(...e){this.$Writing(...e),this.containers.replace(this,"span","button")}container(e){return super.container({type:"button","aria-pressed":this.$listing?.$running===!0,onClick:a(()=>this.press(),"onClick"),...e})}press(){const e=this.$listing;e!==void 0&&(e.$running=!e.$running)}write(){return"run"}$Define(){super.$Define(),this.classes.add(this,"pd-run-switch")}};a(it,"$Run");let he=it;const st=class st extends $e{constructor(){super(...arguments),this.specification=new $,this.$openFile=void 0,this.style=g.div`
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
    `}note(){return s("link",{rel:"stylesheet",href:Zt})}defines(e){if(super.defines(e),e.classes.add(this,"pa-editor"),!(e instanceof ve))return;const t=e.bookmark??e.cover;e.annotations.expressed(I)!==void 0&&t!==void 0&&t.text.find(y).length>0&&e.classes.add(this,"pa-editing")}erase(e){super.erase(e),e.classes.revert(this)}};a(st,"$Editor");let S=st;const at=class at extends m{$FilePage(...e){this.$Writing(...e),this.containers.replace(this,"span","div")}write(){const e=this.book;if(e===void 0)return null;const t=e.bookmark??e.cover,o=t?.text.find(y)[0];if(t===void 0||o===void 0)return null;const i=we(t),r=E(this)?.$openFile,d=r!==void 0&&i.includes(r)?r:i[0],c=n(xn);return p(f,{children:[p("div",{className:"pd-file-head",children:[s("span",{className:"pd-file-label",children:"The file beside the chapter"}),s("span",{className:"pd-file-name",children:d===void 0?"":w(d)})]}),s(c,{chapter:t,identifier:o.$identifier,type:o.$type})]})}$Define(){super.$Define(),this.classes.add(this,"pd-file-page")}};a(at,"$FilePage");let fe=at;const ot=class ot extends $e{get meant(){const e=this.parent?.annotations.expressed(Nt)?.identifier;if(!(e===void 0||e===""))return this.book?.text.find(Y).find(t=>t.mention?.identifier===e)}$Branch(...e){this.$Format(...e),this.style=({className:t,children:o})=>{const i=this.meant,r=i===void 0||i.text.find(y).length===0?[]:we(i),d=E(this)?.$openFile,c=d!==void 0&&r.includes(d)?d:r[0],k=this.book?.bookmark===i;return p("div",{className:t,children:[o,r.length===0?null:p("span",{className:"pd-files",children:["(",r.map((u,bt)=>p("span",{className:"pd-file",children:[bt===0?"":", ",s("a",{className:"pd-square",href:i?.mention?.identifier,title:"the page",onClick:a(()=>this.press(u,gt),"onClick"),children:"☐"}),s("a",{className:k&&c===u?"pd-leaf pa-open":"pd-leaf",href:i?.mention?.identifier,title:"the editor",onClick:a(()=>this.press(u,mt),"onClick"),children:w(u)})]},w(u))),")"]})]})}}press(e,t){const o=this.book;if(o===void 0)return;const i=E(this);i!==void 0&&(i.$openFile=e);const r=[o.$is].flat().filter(d=>!me.includes(d));o.$is=[t,...r]}defines(e){super.defines(e),e.classes.add(this,"pa-branch");const t=this.book,o=this.meant;if(t===void 0)return;const i=o!==void 0&&t.bookmark===o,r=[...e.classes].includes("pa-open");i&&!r&&e.classes.add(t,"pa-open"),!i&&r&&e.classes.revert(t)}erase(e){super.erase(e),e.classes.revert(this)}};a(ot,"$Branch");let W=ot;const rt=class rt extends N{constructor(){super(...arguments),this.specification=new F}defines(e){e.classes.add(this,"pa-appendix")}erase(e){e.classes.revert(this)}};a(rt,"$Appendix");let ge=rt;const pt=class pt extends j{$saidOfASection(e){x(e instanceof ct,"an appendix is said of a section of the table of contents, and this is not a section")}};a(pt,"AppendixSpecification");let F=pt;ht([D("an appendix is said of a section")],F.prototype,"$saidOfASection");const ye=n(se),ft=n(I),_t=n(ae),en=n(oe),tn=n(re),nn=n(pe),sn=n(P),an=n(de),on=n(y),rn=n(le),pn=n(ce),dn=n(he),ln=n(S),cn=n(fe),hn=n(W),In=n(ge),me=[ye,ft],gt=ye,mt=ft,fn=_t,gn=en,mn=tn,bn=nn,un=sn,kn=an,xn=on,$n=rn,vn=pn,wn=dn,dt=class dt extends ve{write(){const e=n(Rt),t=n(Jt),o=n(cn);return p(f,{children:[s(e,{chapter:this.cover}),s(t,{chapter:this.cover}),super.write(),s(o,{chapter:this.cover})]})}turn(){window.scrollTo(0,0)}$Define(){super.$Define(),this.annotations.add(this,s(ln,{}),s(Tt,{}),s(ye,{}))}$Bound(){const e=n(Kt),t=n(hn);for(const o of this.table?.text.find(ct)??[])for(const i of o.text.find(m))i.annotations.expressed(W)===void 0&&i.annotations.append(this,s(t,{}));for(const o of this.text.find(Y))o.is(ke)||o.text.find(R).length>0||(o.annotations.add(this,s(e,{})),o.annotations.define());super.$Bound()}};a(dt,"$TheLibrary");let be=dt;const yn=n(be);n(yn,At)(Ot);export{be as $,In as A,An as C,ft as E,on as L,Tn as S,Cn as T,On as a,Bn as b,Rn as c};
