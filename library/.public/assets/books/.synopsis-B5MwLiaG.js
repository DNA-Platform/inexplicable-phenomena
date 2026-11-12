var ne=Object.defineProperty;var a=(f,e)=>ne(f,"name",{value:e,configurable:!0});import{jsxs as i,Fragment as d,jsx as n}from"react/jsx-runtime";import{$ as t,selection as h,$check as ae}from"@dna-platform/chemistry";import{$Theme as ie,$Paragraph as q,Means as L,Word as _,Reference as N,$Word as m,specify as oe,$Cover as ee,$Synopsis as re,$TableOfContents as se,$Table as ce,$Annotation as pe,html as le,AnnotationSpecification as de,$Chapter as he,Theme as me,$Book as fe,Paginated as ue,Chapter as ge,Parenthetical as F,Title as be,Paragraph as xe}from"@dna-platform/public";import{css as p}from"styled-components";const G=class G extends ie{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=h.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate()]}front(){return p`
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
            .pd-front-tagline { font-style: italic; opacity: .75; margin-top: 1.1rem; font-size: .95rem; }
            .pd-front > :nth-last-child(2) { margin-top: auto; }
            .pd-front-imprint { font-size: calc(0.7 * ${({theme:e})=>e.size}); letter-spacing: .15em; text-transform: uppercase; opacity: .65; margin-top: .35rem; }
            .pa-page.pa-open { animation: come .5s ease; }
            @keyframes come { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: none; } }
            @media (max-width: 640px) {
                .pd-front { width: min(20rem, 86vw); margin-block: 1.5rem 2rem; padding: 2.25rem 1.25rem 1.25rem; }
                .pd-front-name { font-size: 2rem; }
            }
        `}plate(){return p`
            .pd-plate { float: inline-start; width: 11rem; margin: .25rem 1.5rem 1rem 0; }
            .pd-plate .pd-image img { margin-block: 0; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 20%, ${({theme:e})=>e.paper}); box-shadow: 0 1px 3px rgba(0, 0, 0, .12); }
            .pd-plate .pa-opening { text-decoration: none; color: inherit; }
            .pd-plate .pa-opening .pd-word { display: block; font-size: .8rem; margin-top: .4rem; opacity: .75; text-decoration: underline; }
            .pd-chapter:has(> .pd-paragraph > .pd-plate) > .pd-paragraph:first-child { margin-block: 0; }
            @media (max-width: 640px) { .pd-plate { width: 7rem; margin-right: 1rem; } }
        `}page(){return p`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
        `}levels(){return p`
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
        `}labels(){return p`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `}links(){return p`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return p`
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
        `}figures(){return p`
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
        `}};a(G,"$LibraryTheme");let x=G;const ke=t(x),S=class S extends q{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const o=e.table?.canonical,s=e.subject?.means?.identifier===e.title?.means?.identifier,r=t(L),c=t(_),l=t(N);return i(d,{children:[s?null:i(d,{children:[n(r,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),n(c,{children:e.title?.name}),": ",i(c,{children:[n(l,{children:o?.means?.identifier}),o?.name]})]})}};a(S,"$RunningHead");let k=S;const W=class W extends m{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};a(W,"$Label");let $=W;const I=class I extends q{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const o=t(ve),s=t(_),r=t(N);return i(d,{children:[n(o,{children:"Author"})," ",i(s,{children:[n(r,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:i(d,{children:[n(o,{children:"About"})," ",i(s,{children:[n(r,{children:e.about.means?.identifier}),e.about.name]})]}),n(o,{children:"Subject"})," ",i(s,{children:[n(r,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};a(I,"$Byline");let w=I;const $e=t(k),we=t($),ve=we,ye=t(w);var ze=Object.defineProperty,De=Object.getOwnPropertyDescriptor,je=a((f,e,o,s)=>{for(var r=De(e,o),c=f.length-1,l;c>=0;c--)(l=f[c])&&(r=l(e,o,r)||r);return r&&ze(e,o,r),r},"__decorateClass");const M=class M extends pe{constructor(){super(...arguments),this.specification=new g}get line(){return le.copy(this.text)}write(){return this.line}};a(M,"$Tagline");let u=M;const T=class T extends de{$saidOfACover(e){ae(e instanceof he&&e.is(ee),"a tagline is said of a cover, and this is not one")}};a(T,"TaglineSpecification");let g=T;je([oe("a tagline is said of a cover")],g.prototype,"$saidOfACover");const B=class B extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};a(B,"$FrontName");let v=B;const Y=class Y extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};a(Y,"$FrontAuthor");let y=Y;const E=class E extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};a(E,"$FrontTagline");let z=E;const H=class H extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};a(H,"$FrontImprint");let D=H;const J=class J extends q{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const o=t(qe),s=t(Ne),r=t(Ge),c=t(Se),l=t(L),b=t(N),Z=e.cover?.annotations.expressed(u),te=e.table?.canonical;return i(d,{children:[i(o,{children:[n(b,{children:te?.means?.identifier}),e.title?.name]}),i(s,{children:[n(b,{children:e.author?.means?.identifier}),e.author?.name]}),Z===void 0?null:n(r,{children:Z.line}),i(c,{children:[n(b,{children:e.subject?.means?.identifier}),e.subject?.name]}),n(c,{children:n(l,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};a(J,"$Front");let j=J;const K=class K extends ee{constructor(){super(...arguments),this.style=h.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};a(K,"$LibraryCover");let P=K;const Q=class Q extends re{constructor(){super(...arguments),this.style=h.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};a(Q,"$LibrarySynopsis");let A=Q;const U=class U extends se{constructor(){super(...arguments),this.style=h.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};a(U,"$LibraryTableOfContents");let C=U;const V=class V extends ce{constructor(){super(...arguments),this.style=h(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
    `}};a(V,"$LibraryTable");let O=V;const He=t(P),Pe=t(A),Je=t(C);t(O);const Ae=t(v),Ce=t(y),Oe=t(z),Re=t(D),Ke=t(u),qe=Ae,Ne=Ce,Ge=Oe,Se=Re,We=t(j),X=class X extends fe{write(){const e=t($e),o=t(ye),s=t(We);return i(d,{children:[n(e,{chapter:this.cover}),n(o,{chapter:this.cover}),n(s,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,n(ue,{}))}};a(X,"$TheLibrary");let R=X;const Ie=t(R);t(Ie,me)(ke);const Qe=a(()=>i(ge,{children:[n(Pe,{}),n(F,{}),i(be,{children:[n(F,{}),"[Synopsis](/inexplicable-phenomena/arithmetic-notebook/)"]}),n(xe,{children:"The notes of the paper, moved here from Doug's library and organized as the specification of a publication: its parts from the preface to Goldbach, each in the form that stands and citing what it deprecated; the rulings and the documents; the sketches set aside with his tag on each; and the formalism, the options the notes hold, the algebraic model of the subject of logic he stated on 9 November, toward a compact expression and its formalization in PA, the connection found on 12 November between the subjective reading of Gödel and Riemann's exchange of zero and infinity, the definition of Gödel's system P looked up from the held paper toward deciding the paper's PA, and the parts of the paper's argument, each with a sketch of its formalization and the references beside it."})]}),"ArithmeticNotebookSynopsis");export{R as $,Qe as A,He as C,Pe as S,Ke as T,Je as a};
