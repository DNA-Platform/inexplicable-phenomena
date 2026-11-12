var Z=Object.defineProperty;var i=(V,e)=>Z(V,"name",{value:e,configurable:!0});import{jsxs as r,Fragment as p,jsx as n}from"react/jsx-runtime";import{$ as t,selection as d}from"@dna-platform/chemistry";import{$Theme as F,$Paragraph as h,Means as Q,Word as U,Reference as C,$Word as m,$Cover as L,$Synopsis as _,$TableOfContents as ee,$Table as te,html as ne,Theme as ie,$Book as re,Paginated as oe}from"@dna-platform/public";import{css as s}from"styled-components";const P=class P extends F{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=d.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate()]}front(){return s`
            .pd-front { display: none; }
            .pd-book:has(.pa-cover.pa-open) .pd-front { display: flex; }
            .pd-book:has(.pa-cover.pa-open) .pd-running-head, .pd-book:has(.pa-cover.pa-open) .pd-byline, .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open { display: none; }
            .pd-front { position: relative; box-sizing: border-box; width: 22rem; max-width: 100%; flex-direction: column; align-items: center; text-align: center; aspect-ratio: 2 / 3; margin: 2.5rem auto 3rem; padding: 3rem 2rem 1.75rem; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 50%, ${({theme:e})=>e.paper}); box-shadow: inset 0 0 0 6px ${({theme:e})=>e.paper}, inset 0 0 0 7px color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}), 2px 12px 28px -12px rgba(0, 0, 0, .45); background: ${({theme:e})=>e.paper}; }
            .pd-front::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1.25rem; background: linear-gradient(to right, color-mix(in srgb, ${({theme:e})=>e.ink} 22%, transparent), color-mix(in srgb, ${({theme:e})=>e.ink} 5%, transparent) 55%, transparent); z-index: 1; pointer-events: none; }
            .pd-front > a, .pd-front .pd-word { display: block; }
            .pd-front .pa-reference { color: inherit; text-decoration: none; }
            .pd-front a:hover .pd-word { text-decoration: underline; text-underline-offset: 0.15em; }
            .pd-front-name { font-size: 2.4rem; line-height: 1.1; font-weight: bold; margin-block: .35rem .8rem; }
            .pd-front-name::after { content: ''; display: block; width: 3.5rem; border-top: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 50%, ${({theme:e})=>e.paper}); margin: .9rem auto 0; }
            .pd-front-author { font-size: 1.15rem; letter-spacing: .04em; }
            .pd-front-synopsis { font-style: italic; opacity: .75; margin-block: 1.1rem auto; font-size: .95rem; }
            .pd-front-imprint { font-size: calc(0.7 * ${({theme:e})=>e.size}); letter-spacing: .15em; text-transform: uppercase; opacity: .65; margin-top: .35rem; }
            .pa-page.pa-open { animation: come .5s ease; }
            @keyframes come { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: none; } }
            @media (max-width: 640px) {
                .pd-front { width: min(20rem, 86vw); margin-block: 1.5rem 2rem; padding: 2.25rem 1.25rem 1.25rem; }
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
        `}};i(P,"$LibraryTheme");let g=P;const ae=t(g),S=class S extends h{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const o=e.table?.canonical,a=e.subject?.means?.identifier===e.title?.means?.identifier,c=t(Q),l=t(U),f=t(C);return r(p,{children:[a?null:r(p,{children:[n(c,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),n(l,{children:e.title?.name}),": ",r(l,{children:[n(f,{children:o?.means?.identifier}),o?.name]})]})}};i(S,"$RunningHead");let b=S;const W=class W extends m{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};i(W,"$Label");let x=W;const I=class I extends h{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const o=t(pe),a=t(U),c=t(C);return r(p,{children:[n(o,{children:"Author"})," ",r(a,{children:[n(c,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:r(p,{children:[n(o,{children:"About"})," ",r(a,{children:[n(c,{children:e.about.means?.identifier}),e.about.name]})]}),n(o,{children:"Subject"})," ",r(a,{children:[n(c,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};i(I,"$Byline");let k=I;const se=t(b),ce=t(x),pe=ce,le=t(k),M=class M extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};i(M,"$FrontName");let $=M;const T=class T extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};i(T,"$FrontAuthor");let w=T;const B=class B extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-synopsis")}};i(B,"$FrontSynopsis");let y=B;const N=class N extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};i(N,"$FrontImprint");let v=N;const Y=class Y extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const o=t(ue),a=t(ge),c=t(be),l=t(xe),f=t(Q),u=t(C),O=e.synopsis?.text.find(h)[0],X=e.table?.canonical;return r(p,{children:[r(o,{children:[n(u,{children:X?.means?.identifier}),e.title?.name]}),r(a,{children:[n(u,{children:e.author?.means?.identifier}),e.author?.name]}),n(c,{children:O===void 0?"":ne.copy(O.text)}),r(l,{children:[n(u,{children:e.subject?.means?.identifier}),e.subject?.name]}),n(l,{children:n(f,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};i(Y,"$Front");let z=Y;const G=class G extends L{constructor(){super(...arguments),this.style=d.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};i(G,"$LibraryCover");let D=G;const E=class E extends _{constructor(){super(...arguments),this.style=d.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};i(E,"$LibrarySynopsis");let j=E;const H=class H extends ee{constructor(){super(...arguments),this.style=d.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};i(H,"$LibraryTableOfContents");let q=H;const J=class J extends te{constructor(){super(...arguments),this.style=d(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
    `}};i(J,"$LibraryTable");let R=J;const je=t(D),qe=t(j),Re=t(q);t(R);const de=t($),me=t(w),he=t(y),fe=t(v),ue=de,ge=me,be=he,xe=fe,ke=t(z),K=class K extends re{write(){const e=t(se),o=t(le),a=t(ke);return r(p,{children:[n(e,{chapter:this.cover}),n(o,{chapter:this.cover}),n(a,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,n(oe,{}))}};i(K,"$TheLibrary");let A=K;const $e=t(A);t($e,ie)(ae);export{A as $,je as C,qe as S,Re as T};
