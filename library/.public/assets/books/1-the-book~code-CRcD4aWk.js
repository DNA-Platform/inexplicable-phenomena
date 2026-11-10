var Q=Object.defineProperty;var a=(O,e)=>Q(O,"name",{value:e,configurable:!0});import{jsxs as r,Fragment as c,jsx as n}from"react/jsx-runtime";import{$ as t,selection as d}from"@dna-platform/chemistry";import{$Theme as U,$Paragraph as f,Means as V,Word as J,Reference as K,$Word as h,$Cover as X,$Synopsis as Z,$TableOfContents as F,$Table as L,html as _,Theme as ee,$Book as te,Paginated as ne}from"@dna-platform/public";import{css as s}from"styled-components";const C=class C extends U{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=d.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate()]}front(){return s`
            a:has(> .pd-front) { display: none; }
            .pd-book:has(.pa-cover.pa-open) a:has(> .pd-front) { display: block; width: 22rem; max-width: 100%; margin: 2.5rem auto 3rem; color: inherit; text-decoration: none; }
            .pd-book:has(.pa-cover.pa-open) .pd-running-head, .pd-book:has(.pa-cover.pa-open) .pd-byline, .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open { display: none; }
            .pd-front { position: relative; box-sizing: border-box; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; aspect-ratio: 2 / 3; margin-block: 0; padding: 3rem 2rem 1.75rem; cursor: pointer; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 50%, ${({theme:e})=>e.paper}); box-shadow: inset 0 0 0 6px ${({theme:e})=>e.paper}, inset 0 0 0 7px color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}), 2px 12px 28px -12px rgba(0, 0, 0, .45); background: ${({theme:e})=>e.paper}; }
            .pd-front::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1.25rem; background: linear-gradient(to right, color-mix(in srgb, ${({theme:e})=>e.ink} 22%, transparent), color-mix(in srgb, ${({theme:e})=>e.ink} 5%, transparent) 55%, transparent); z-index: 1; pointer-events: none; }
            .pd-front .pd-word { display: block; }
            .pd-front-name { font-size: 2.4rem; line-height: 1.1; font-weight: bold; margin-block: .35rem .8rem; }
            .pd-front-name::after { content: ''; display: block; width: 3.5rem; border-top: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 50%, ${({theme:e})=>e.paper}); margin: .9rem auto 0; }
            .pd-front-author { font-size: 1.15rem; letter-spacing: .04em; }
            .pd-front-synopsis { font-style: italic; opacity: .75; margin-block: 1.1rem auto; font-size: .95rem; }
            .pd-front-imprint { font-size: calc(0.7 * ${({theme:e})=>e.size}); letter-spacing: .15em; text-transform: uppercase; opacity: .65; margin-top: .35rem; }
            .pa-page.pa-open { animation: come .5s ease; }
            @keyframes come { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: none; } }
            @media (max-width: 640px) {
                .pd-book:has(.pa-cover.pa-open) a:has(> .pd-front) { width: min(20rem, 86vw); margin-block: 1.5rem 2rem; }
                .pd-front { padding: 2.25rem 1.25rem 1.25rem; }
                .pd-front-name { font-size: 2rem; }
            }
        `}plate(){return s`
            .pd-plate { float: inline-start; width: 11rem; margin: .25rem 1.5rem 1rem 0; }
            .pd-plate .pd-image img { margin-block: 0; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 20%, ${({theme:e})=>e.paper}); box-shadow: 0 1px 3px rgba(0, 0, 0, .12); }
            .pd-plate .pa-opening { text-decoration: none; color: inherit; }
            .pd-plate .pa-opening .pd-word { display: block; font-size: .8rem; margin-top: .4rem; opacity: .75; text-decoration: underline; }
            .pd-chapter:has(> .pd-paragraph > .pd-plate) > .pd-paragraph:first-child { margin-block: 0; }
            @media (max-width: 640px) { .pd-plate { width: 7rem; margin-right: 1rem; } }
        `}page(){return s`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
        `}levels(){return s`
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
        `}labels(){return s`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `}links(){return s`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return s`
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
        `}figures(){return s`
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
        `}};a(C,"$LibraryTheme");let u=C;const ae=t(u),P=class P extends f{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const i=e.table?.canonical,o=e.subject?.means?.identifier===e.title?.means?.identifier,p=t(V),l=t(J),m=t(K);return r(c,{children:[o?null:r(c,{children:[n(p,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),n(l,{children:e.title?.name}),": ",r(l,{children:[n(m,{children:i?.means?.identifier}),i?.name]})]})}};a(P,"$RunningHead");let g=P;const R=class R extends h{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};a(R,"$Label");let b=R;const W=class W extends f{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const i=t(oe),o=t(J),p=t(K);return r(c,{children:[n(i,{children:"Author"})," ",r(o,{children:[n(p,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:r(c,{children:[n(i,{children:"About"})," ",r(o,{children:[n(p,{children:e.about.means?.identifier}),e.about.name]})]}),n(i,{children:"Filed under"})," ",r(o,{children:[n(p,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};a(W,"$Byline");let k=W;const re=t(g),ie=t(b),oe=ie,se=t(k),I=class I extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};a(I,"$FrontName");let x=I;const N=class N extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};a(N,"$FrontAuthor");let $=N;const S=class S extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front-synopsis")}};a(S,"$FrontSynopsis");let w=S;const T=class T extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};a(T,"$FrontImprint");let y=T;const B=class B extends f{constructor(){super(...arguments),this._board=e=>n("a",{href:this.book?.table?.means?.identifier,className:"pa-reference pd-container",...e})}$Define(){super.$Define(),this.classes.add(this,"pd-front"),this.containers.add(this,this._board)}write(){const e=this.book;if(e===void 0)return null;const i=t(he),o=t(me),p=t(fe),l=t(ue),m=e.synopsis?.text.find(f)[0];return r(c,{children:[n(i,{children:e.title?.name}),n(o,{children:e.author?.name}),n(p,{children:m===void 0?"":_.copy(m.text)}),r(l,{children:["Filed under ",e.subject?.name]}),n(l,{children:"Inexplicable Phenomena"})]})}};a(B,"$Front");let v=B;const M=class M extends X{constructor(){super(...arguments),this.style=d.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};a(M,"$LibraryCover");let z=M;const Y=class Y extends Z{constructor(){super(...arguments),this.style=d.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};a(Y,"$LibrarySynopsis");let D=Y;const G=class G extends F{constructor(){super(...arguments),this.style=d.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};a(G,"$LibraryTableOfContents");let j=G;const E=class E extends L{constructor(){super(...arguments),this.style=d(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
    `}};a(E,"$LibraryTable");let q=E;const ve=t(z),ze=t(D),De=t(j);t(q);const pe=t(x),ce=t($),le=t(w),de=t(y),he=pe,me=ce,fe=le,ue=de,ge=t(v),H=class H extends te{write(){const e=t(re),i=t(se),o=t(ge);return r(c,{children:[n(e,{chapter:this.cover}),n(i,{chapter:this.cover}),n(o,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,n(ne,{}))}};a(H,"$TheLibrary");let A=H;const be=t(A);t(be,ee)(ae);export{A as $,ve as C,ze as S,De as T};
