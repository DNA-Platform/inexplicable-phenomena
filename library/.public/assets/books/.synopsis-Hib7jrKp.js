var ne=Object.defineProperty;var i=(f,e)=>ne(f,"name",{value:e,configurable:!0});import{jsxs as a,Fragment as d,jsx as n}from"react/jsx-runtime";import{$ as t,selection as h,$check as ie}from"@dna-platform/chemistry";import{$Theme as ae,$Paragraph as q,Means as L,Word as _,Reference as M,$Word as m,specify as oe,$Cover as ee,$Synopsis as re,$TableOfContents as se,$Table as ce,$Annotation as pe,html as le,AnnotationSpecification as de,$Chapter as he,Theme as me,$Book as fe,Paginated as be,Chapter as ge,Parenthetical as F,Title as ue,Paragraph as xe}from"@dna-platform/public";import{css as p}from"styled-components";const S=class S extends ae{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=h.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate()]}front(){return p`
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
            .pd-section { margin-block: calc(1.5 * ${({theme:e})=>e.space}); border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 12%, ${({theme:e})=>e.paper}); padding-block-start: ${({theme:e})=>e.space}; }
            .pd-paragraph { margin-block: ${({theme:e})=>e.space}; }
            .pa-item { margin-block: calc(${({theme:e})=>e.space} / 4); }
            .pa-list .pa-item { list-style-position: outside; margin-inline-start: 1.2em; }
            .pd-title { font-size: calc(1.5 * ${({theme:e})=>e.size}); font-weight: bold; margin-block-end: ${({theme:e})=>e.space}; }
            .pd-heading { font-weight: bold; font-size: calc(1.15 * ${({theme:e})=>e.size}); margin-block: ${({theme:e})=>e.space} 0; }
            .pd-section > .pd-heading { margin-block-start: 0; }
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
        `}};i(S,"$LibraryTheme");let x=S;const ke=t(x),W=class W extends q{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const o=e.table?.canonical,s=e.subject?.means?.identifier===e.title?.means?.identifier,r=t(L),c=t(_),l=t(M);return a(d,{children:[s?null:a(d,{children:[n(r,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),n(c,{children:e.title?.name}),": ",a(c,{children:[n(l,{children:o?.means?.identifier}),o?.name]})]})}};i(W,"$RunningHead");let k=W;const I=class I extends m{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};i(I,"$Label");let $=I;const N=class N extends q{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const o=t(ve),s=t(_),r=t(M);return a(d,{children:[n(o,{children:"Author"})," ",a(s,{children:[n(r,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:a(d,{children:[n(o,{children:"About"})," ",a(s,{children:[n(r,{children:e.about.means?.identifier}),e.about.name]})]}),n(o,{children:"Subject"})," ",a(s,{children:[n(r,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};i(N,"$Byline");let w=N;const $e=t(k),we=t($),ve=we,ye=t(w);var ze=Object.defineProperty,De=Object.getOwnPropertyDescriptor,je=i((f,e,o,s)=>{for(var r=De(e,o),c=f.length-1,l;c>=0;c--)(l=f[c])&&(r=l(e,o,r)||r);return r&&ze(e,o,r),r},"__decorateClass");const T=class T extends pe{constructor(){super(...arguments),this.specification=new g}get line(){return le.copy(this.text)}write(){return this.line}};i(T,"$Tagline");let b=T;const B=class B extends de{$saidOfACover(e){ie(e instanceof he&&e.is(ee),"a tagline is said of a cover, and this is not one")}};i(B,"TaglineSpecification");let g=B;je([oe("a tagline is said of a cover")],g.prototype,"$saidOfACover");const Y=class Y extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};i(Y,"$FrontName");let v=Y;const G=class G extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};i(G,"$FrontAuthor");let y=G;const E=class E extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};i(E,"$FrontTagline");let z=E;const H=class H extends m{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};i(H,"$FrontImprint");let D=H;const J=class J extends q{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const o=t(qe),s=t(Me),r=t(Se),c=t(We),l=t(L),u=t(M),Z=e.cover?.annotations.expressed(b),te=e.table?.canonical;return a(d,{children:[a(o,{children:[n(u,{children:te?.means?.identifier}),e.title?.name]}),a(s,{children:[n(u,{children:e.author?.means?.identifier}),e.author?.name]}),Z===void 0?null:n(r,{children:Z.line}),a(c,{children:[n(u,{children:e.subject?.means?.identifier}),e.subject?.name]}),n(c,{children:n(l,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};i(J,"$Front");let j=J;const K=class K extends ee{constructor(){super(...arguments),this.style=h.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};i(K,"$LibraryCover");let P=K;const Q=class Q extends re{constructor(){super(...arguments),this.style=h.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};i(Q,"$LibrarySynopsis");let C=Q;const U=class U extends se{constructor(){super(...arguments),this.style=h.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};i(U,"$LibraryTableOfContents");let A=U;const V=class V extends ce{constructor(){super(...arguments),this.style=h(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:e})=>e.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:e})=>e.space} / 3) calc(0.75 * ${({theme:e})=>e.space}) calc(${({theme:e})=>e.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
    `}};i(V,"$LibraryTable");let O=V;const He=t(P),Pe=t(C),Je=t(A);t(O);const Ce=t(v),Ae=t(y),Oe=t(z),Re=t(D),Ke=t(b),qe=Ce,Me=Ae,Se=Oe,We=Re,Ie=t(j),X=class X extends fe{write(){const e=t($e),o=t(ye),s=t(Ie);return a(d,{children:[n(e,{chapter:this.cover}),n(o,{chapter:this.cover}),n(s,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,n(be,{}))}};i(X,"$TheLibrary");let R=X;const Ne=t(R);t(Ne,me)(ke);const Qe=i(()=>a(ge,{children:[n(Pe,{}),n(F,{}),a(ue,{children:[n(F,{}),"[Synopsis](/inexplicable-phenomena/mathematical-reference/)"]}),n(xe,{children:"The specification of mathematics in this library: a part for the books of the subject — the notebook, the textbook, the project, the library and the design — one chapter per book, tracking the idioms its chapters follow, with the enforcing code standing with the chapter that states the idiom and the rest marked held by hand; and a part for the forms, opening with the specification of a specification — a title with a numbered list of lists, items cited by number, the specification and the thing it specifies moving back and forth, and never thrown away, a change made by changing the specification — written in its own form on Doug's rulings of 12 November 2026."})]}),"MathematicalReferenceSynopsis");export{R as $,He as C,Qe as M,Pe as S,Ke as T,Je as a};
