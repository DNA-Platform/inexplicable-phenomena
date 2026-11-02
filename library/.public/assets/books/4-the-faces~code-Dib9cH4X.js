var M=Object.defineProperty;var a=(B,e)=>M(B,"name",{value:e,configurable:!0});import{jsxs as c,Fragment as l,jsx as n}from"react/jsx-runtime";import{$ as t,selection as s}from"@dna-platform/chemistry";import{$Theme as P,$Paragraph as T,Means as S,Word as W,Reference as A,$Word as G,Theme as I,$Book as N,$Cover as Y,$Synopsis as E,$TableOfContents as H,$Table as J}from"@dna-platform/public";import{css as i}from"styled-components";const x=class x extends P{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1rem",this.leading="1.7",this.measure="42rem",this.space="1.25rem",this.ink="#23262a",this.paper="#faf8f4",this.link="#5b2f2a",this.style=s.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures()]}page(){return i`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
            @media (min-width: 64rem) { max-width: 52rem; }
        `}levels(){return i`
            .pd-book { margin-block: ${({theme:e})=>e.space}; counter-reset: chapter equation; }
            .pd-chapter { margin-block: calc(2 * ${({theme:e})=>e.space}); scroll-margin-block-start: calc(0.5 * ${({theme:e})=>e.space}); }
            .pd-section { margin-block: ${({theme:e})=>e.space}; }
            .pd-paragraph { margin-block: ${({theme:e})=>e.space}; }
            .pa-item { margin-block: calc(${({theme:e})=>e.space} / 4); }
            .pd-title { font-size: calc(1.5 * ${({theme:e})=>e.size}); font-weight: bold; margin-block-end: ${({theme:e})=>e.space}; }
            .pd-heading { font-weight: bold; margin-block: ${({theme:e})=>e.space} 0; }
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-canonical.pd-chapter:not(.pa-framed) {
                border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 10%, ${({theme:e})=>e.paper});
                padding-block-start: ${({theme:e})=>e.space};
            }
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(${({theme:e})=>e.space} / 4); }
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }
        `}labels(){return i`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.65;
            }
        `}links(){return i`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return i`
            .pd-running-head {
                font-size: calc(0.75 * ${({theme:e})=>e.size});
                letter-spacing: 0.12em;
                text-transform: uppercase;
                padding-block-end: calc(${({theme:e})=>e.space} / 2);
                border-block-end: 1px solid ${({theme:e})=>e.ink};
            }
            .pd-byline {
                display: grid;
                grid-template-columns: max-content 1fr;
                column-gap: ${({theme:e})=>e.space};
                row-gap: calc(${({theme:e})=>e.space} / 4);
                align-items: baseline;
                margin-block: ${({theme:e})=>e.space} 0;
                padding: calc(${({theme:e})=>e.space} / 2) ${({theme:e})=>e.space};
                background: color-mix(in srgb, ${({theme:e})=>e.ink} 3%, ${({theme:e})=>e.paper});
                border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 10%, ${({theme:e})=>e.paper});
                border-block-start: 3px solid ${({theme:e})=>e.link};
            }
        `}figures(){return i`
            .pd-figure { max-width: 100%; }
            .pd-code {
                font-family: ui-monospace, monospace;
                font-size: calc(0.9 * ${({theme:e})=>e.size});
                line-height: 1.5;
                white-space: pre;
                overflow-x: auto;
                margin-block: ${({theme:e})=>e.space};
                padding: calc(0.75 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space};
                background: color-mix(in srgb, ${({theme:e})=>e.ink} 4%, ${({theme:e})=>e.paper});
                border-inline-start: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 25%, ${({theme:e})=>e.paper});
            }
            .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: ${({theme:e})=>e.space}; }
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `}};a(x,"$LibraryTheme");let d=x;const K=t(d),w=class w extends T{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const r=e.table?.canonical,o=e.subject?.means?.identifier===e.title?.means?.identifier,p=t(S),R=t(W),F=t(A);return c(l,{children:[o?null:c(l,{children:[n(p,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/reference/)"})," / "]}),n(R,{children:e.title?.name}),": ",c(R,{children:[n(F,{children:r?.means?.identifier}),r?.name]})]})}};a(w,"$RunningHead");let h=w;const v=class v extends G{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};a(v,"$Label");let m=v;const y=class y extends T{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const r=t(U),o=t(W),p=t(A);return c(l,{children:[n(r,{children:"Author"})," ",c(o,{children:[n(p,{children:e.author?.means?.identifier}),e.author?.name]}),n(r,{children:"Filed under"})," ",c(o,{children:[n(p,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};a(y,"$Byline");let g=y;const O=t(h),Q=t(m),U=Q,V=t(g),z=class z extends N{write(){const e=t(O),r=t(V);return c(l,{children:[n(e,{chapter:this.cover}),n(r,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}};a(z,"$TheLibrary");let b=z;const X=t(b);t(X,I)(K);const D=class D extends Y{constructor(){super(...arguments),this.style=s.header`
        .pd-chapter.pa-cover { margin-block: 0; }
        .pd-chapter.pa-cover:not(.pa-framed) {
            margin-block-end: calc(1.5 * ${({theme:e})=>e.space});
            padding: calc(0.75 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space};
            background: color-mix(in srgb, ${({theme:e})=>e.ink} 3%, ${({theme:e})=>e.paper});
            border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 10%, ${({theme:e})=>e.paper});
            border-block-start: 0;
            scroll-margin-block-start: calc(1.75 * ${({theme:e})=>e.space});
        }
        .pa-cover .pd-title { margin-block: 0 calc(${({theme:e})=>e.space} / 2); font-size: calc(2 * ${({theme:e})=>e.size}); }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};a(D,"$LibraryCover");let u=D;const j=class j extends E{constructor(){super(...arguments),this.style=s.div`
        .pd-chapter.pa-synopsis {
            margin-block: calc(1.5 * ${({theme:e})=>e.space});
            padding-inline-start: ${({theme:e})=>e.space};
            border-inline-start: 2px solid ${({theme:e})=>e.link};
        }
        .pa-synopsis .pd-paragraph { font-style: italic; }
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};a(j,"$LibrarySynopsis");let f=j;const q=class q extends H{constructor(){super(...arguments),this.style=s.nav`
        .pd-chapter.pa-table-of-contents { margin-block: 0; }
        .pd-chapter.pa-table-of-contents:not(.pa-framed) {
            margin-block: calc(1.5 * ${({theme:e})=>e.space});
            padding: calc(0.75 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space};
            border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 10%, ${({theme:e})=>e.paper});
            scroll-margin-block-start: calc(1.75 * ${({theme:e})=>e.space});
        }
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.65;
        }
    `}};a(q,"$LibraryTableOfContents");let $=q;const C=class C extends J{constructor(){super(...arguments),this.style=s(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-col {
            padding-block: calc(${({theme:e})=>e.space} / 3);
            border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 7%, ${({theme:e})=>e.paper});
        }
    `}};a(C,"$LibraryTable");let k=C;const ae=t(u),ne=t(f),re=t($),ce=t(k);export{b as $,ae as C,ne as S,re as T,ce as a};
