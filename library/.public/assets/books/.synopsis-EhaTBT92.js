var F=Object.defineProperty;var i=(X,e)=>F(X,"name",{value:e,configurable:!0});import{jsxs as o,Fragment as p,jsx as n}from"react/jsx-runtime";import{$ as t,selection as d}from"@dna-platform/chemistry";import{$Theme as L,$Paragraph as m,Means as U,Word as V,Reference as q,$Word as h,$Cover as _,$Synopsis as ee,$TableOfContents as te,$Table as ne,html as ie,Theme as oe,$Book as ae,Paginated as re,Chapter as se,Parenthetical as Q,Title as ce,Paragraph as pe}from"@dna-platform/public";import{css as s}from"styled-components";const C=class C extends L{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=d.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate()]}front(){return s`
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
        `}};i(C,"$LibraryTheme");let u=C;const le=t(u),N=class N extends m{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const a=e.table?.canonical,r=e.subject?.means?.identifier===e.title?.means?.identifier,c=t(U),l=t(V),f=t(q);return o(p,{children:[r?null:o(p,{children:[n(c,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),n(l,{children:e.title?.name}),": ",o(l,{children:[n(f,{children:a?.means?.identifier}),a?.name]})]})}};i(N,"$RunningHead");let b=N;const S=class S extends h{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};i(S,"$Label");let x=S;const T=class T extends m{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const a=t(me),r=t(V),c=t(q);return o(p,{children:[n(a,{children:"Author"})," ",o(r,{children:[n(c,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:o(p,{children:[n(a,{children:"About"})," ",o(r,{children:[n(c,{children:e.about.means?.identifier}),e.about.name]})]}),n(a,{children:"Filed under"})," ",o(r,{children:[n(c,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};i(T,"$Byline");let k=T;const de=t(b),he=t(x),me=he,fe=t(k),W=class W extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};i(W,"$FrontName");let $=W;const G=class G extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};i(G,"$FrontAuthor");let w=G;const I=class I extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front-synopsis")}};i(I,"$FrontSynopsis");let y=I;const M=class M extends h{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};i(M,"$FrontImprint");let v=M;const B=class B extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const a=t($e),r=t(we),c=t(ye),l=t(ve),f=t(U),g=t(q),O=e.synopsis?.text.find(m)[0],Z=e.table?.canonical;return o(p,{children:[o(a,{children:[n(g,{children:Z?.means?.identifier}),e.title?.name]}),o(r,{children:[n(g,{children:e.author?.means?.identifier}),e.author?.name]}),n(c,{children:O===void 0?"":ie.copy(O.text)}),o(l,{children:[n(g,{children:e.subject?.means?.identifier}),e.subject?.name]}),n(l,{children:n(f,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};i(B,"$Front");let z=B;const Y=class Y extends _{constructor(){super(...arguments),this.style=d.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};i(Y,"$LibraryCover");let D=Y;const E=class E extends ee{constructor(){super(...arguments),this.style=d.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};i(E,"$LibrarySynopsis");let j=E;const H=class H extends te{constructor(){super(...arguments),this.style=d.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};i(H,"$LibraryTableOfContents");let A=H;const J=class J extends ne{constructor(){super(...arguments),this.style=d(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
    `}};i(J,"$LibraryTable");let P=J;const Ce=t(D),ge=t(j),Ne=t(A);t(P);const ue=t($),be=t(w),xe=t(y),ke=t(v),$e=ue,we=be,ye=xe,ve=ke,ze=t(z),K=class K extends ae{write(){const e=t(de),a=t(fe),r=t(ze);return o(p,{children:[n(e,{chapter:this.cover}),n(a,{chapter:this.cover}),n(r,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,n(re,{}))}};i(K,"$TheLibrary");let R=K;const De=t(R);t(De,oe)(le);const Se=i(()=>o(se,{children:[n(ge,{}),n(Q,{}),o(ce,{children:[n(Q,{}),"[Synopsis](/inexplicable-phenomena/arithmetic-notebook/)"]}),n(pe,{children:"The notes of the paper, moved here from Doug's library and organized as the specification of a publication: its parts from the preface to Goldbach, each in the form that stands and citing what it deprecated; the rulings and the documents; the sketches set aside with his tag on each; and the formalism, the options the notes hold, the algebraic model of the subject of logic he stated on 9 November, toward a compact expression and its formalization in PA, and the connection found on 12 November between the subjective reading of Gödel and Riemann's exchange of zero and infinity."})]}),"ArithmeticNotebookSynopsis");export{R as $,Se as A,Ce as C,ge as S,Ne as T};
