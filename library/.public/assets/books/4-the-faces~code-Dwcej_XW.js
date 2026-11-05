var F=Object.defineProperty;var a=(T,e)=>F(T,"name",{value:e,configurable:!0});import{jsxs as i,Fragment as l,jsx as n}from"react/jsx-runtime";import{$ as t,selection as p}from"@dna-platform/chemistry";import{$Theme as M,$Paragraph as W,Means as S,Word as A,Reference as P,$Word as G,Theme as I,$Book as N,Paginated as Y,$Cover as E,$Synopsis as H,$TableOfContents as J,$Table as K}from"@dna-platform/public";import{css as o}from"styled-components";const x=class x extends M{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=p.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures()]}page(){return o`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
        `}levels(){return o`
            .pd-book { margin-block: ${({theme:e})=>e.space}; counter-reset: chapter equation; }
            .pd-chapter { margin-block: calc(2 * ${({theme:e})=>e.space}); scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pd-section { margin-block: ${({theme:e})=>e.space}; }
            .pd-paragraph { margin-block: ${({theme:e})=>e.space}; }
            .pa-item { margin-block: calc(${({theme:e})=>e.space} / 4); }
            .pd-title { font-size: calc(1.5 * ${({theme:e})=>e.size}); font-weight: bold; margin-block-end: ${({theme:e})=>e.space}; }
            .pd-heading { font-weight: bold; margin-block: ${({theme:e})=>e.space} 0; }
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(${({theme:e})=>e.space} / 4); }
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }
        `}labels(){return o`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `}links(){return o`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return o`
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
            }
        `}figures(){return o`
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
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `}};a(x,"$LibraryTheme");let d=x;const O=t(d),w=class w extends W{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const s=e.table?.canonical,r=e.subject?.means?.identifier===e.title?.means?.identifier,c=t(S),R=t(A),B=t(P);return i(l,{children:[r?null:i(l,{children:[n(c,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),n(R,{children:e.title?.name}),": ",i(R,{children:[n(B,{children:s?.means?.identifier}),s?.name]})]})}};a(w,"$RunningHead");let h=w;const v=class v extends G{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};a(v,"$Label");let u=v;const z=class z extends W{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const s=t(V),r=t(A),c=t(P);return i(l,{children:[n(s,{children:"Author"})," ",i(r,{children:[n(c,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:i(l,{children:[n(s,{children:"About"})," ",i(r,{children:[n(c,{children:e.about.means?.identifier}),e.about.name]})]}),n(s,{children:"Filed under"})," ",i(r,{children:[n(c,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};a(z,"$Byline");let m=z;const Q=t(h),U=t(u),V=U,X=t(m),y=class y extends N{write(){const e=t(Q),s=t(X);return i(l,{children:[n(e,{chapter:this.cover}),n(s,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,n(Y,{}))}};a(y,"$TheLibrary");let f=y;const Z=t(f);t(Z,I)(O);const D=class D extends E{constructor(){super(...arguments),this.style=p.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};a(D,"$LibraryCover");let g=D;const j=class j extends H{constructor(){super(...arguments),this.style=p.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};a(j,"$LibrarySynopsis");let b=j;const q=class q extends J{constructor(){super(...arguments),this.style=p.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};a(q,"$LibraryTableOfContents");let $=q;const C=class C extends K{constructor(){super(...arguments),this.style=p(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
    `}};a(C,"$LibraryTable");let k=C;const ae=t(g),ie=t(b),se=t($);t(k);export{f as $,ae as C,ie as S,se as T};
