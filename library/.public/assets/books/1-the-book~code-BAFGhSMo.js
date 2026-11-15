var ie=Object.defineProperty;var n=(m,e)=>ie(m,"name",{value:e,configurable:!0});import{jsxs as l,Fragment as Z,jsx as a}from"react/jsx-runtime";import{$ as t,selection as h,$check as F}from"@dna-platform/chemistry";import{$Theme as oe,specify as _,$Cover as B,$Synopsis as re,$TableOfContents as se,$Table as pe,$Word as $,$Annotation as ce,html as le,$Paragraph as L,Means as de,Reference as ee,Previous as he,Next as me,Word as fe,$Format as ge,AnnotationSpecification as te,$Chapter as q,Theme as be,$Book as ue,Paginated as $e}from"@dna-platform/public";import{css as s}from"styled-components";const R=class R extends oe{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=h.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate(),this.navigation()]}navigation(){return s`
            .pd-navigation { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-block: calc(${({theme:e})=>e.space} / 2); }
            .pd-navigation > :nth-child(2) { margin-inline: auto; }
            .pd-navigation :is(.pa-self-reference, a:has(> .pa-self-reference)) { visibility: hidden; }
            .pd-navigation a { display: inline-flex; align-items: center; justify-content: center; inline-size: 2.4rem; block-size: 2.4rem; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); border-radius: 50%; text-decoration: none; background: ${({theme:e})=>e.paper}; transition: border-color .15s ease, background .15s ease; }
            .pd-navigation a:hover { border-color: ${({theme:e})=>e.ink}; background: color-mix(in srgb, ${({theme:e})=>e.ink} 7%, ${({theme:e})=>e.paper}); }
            .pd-navigation .pd-word { font-size: calc(1.2 * ${({theme:e})=>e.size}); line-height: 1; color: ${({theme:e})=>e.ink}; opacity: .8; transition: opacity .15s ease; }
            .pd-navigation > :nth-child(2) .pd-word { font-size: ${({theme:e})=>e.size}; }
            .pd-navigation a:hover .pd-word { opacity: 1; }
        `}front(){return s`
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
            .pd-book { margin-block: calc(${({theme:e})=>e.space} / 2) ${({theme:e})=>e.space}; counter-reset: chapter equation; }
            .pd-chapter { margin-block: ${({theme:e})=>e.space}; scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-page.pa-open { margin-block-start: calc(${({theme:e})=>e.space} / 2); }
            .pd-section { margin-block: calc(1.5 * ${({theme:e})=>e.space}); border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 12%, ${({theme:e})=>e.paper}); padding-block-start: ${({theme:e})=>e.space}; }
            .pd-paragraph { margin-block: ${({theme:e})=>e.space}; }
            .pa-item { margin-block: calc(${({theme:e})=>e.space} / 4); }
            .pa-list .pa-item { list-style-position: outside; margin-inline-start: 1.2em; }
            .pd-title { font-size: calc(1.5 * ${({theme:e})=>e.size}); font-weight: bold; margin-block-end: ${({theme:e})=>e.space}; }
            .pd-heading { font-weight: bold; font-size: calc(1.15 * ${({theme:e})=>e.size}); margin-block: ${({theme:e})=>e.space} 0; }
            .pd-section > .pd-heading { margin-block-start: 0; }
            .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)) { display: none; }
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
            /* THE HEADER IS ONE COMPACT BAND, Doug, 2026-11-16: "You need to organize the header in the theme. It
               takes up too much space and isn't used. Look how far down the title of the chapter is. Wait are you
               making every chapter like a cover?!?" — the running head a bordered line with no paragraph margin, the
               byline one small line beneath it, author and subject side by side, not a title block of rows. */
            .pd-running-head {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin-block: 0;
                padding-block-end: calc(${({theme:e})=>e.space} / 4);
                border-block-end: 1px solid ${({theme:e})=>e.ink};
            }
            .pd-byline {
                display: flex;
                flex-wrap: wrap;
                align-items: baseline;
                column-gap: .5em;
                row-gap: 0;
                margin-block: calc(${({theme:e})=>e.space} / 4) 0;
                font-size: calc(0.75 * ${({theme:e})=>e.size});
            }
            .pd-byline .pd-label + .pd-word { margin-inline-end: calc(${({theme:e})=>e.space} / 2); }
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
        `}};n(R,"$LibraryTheme");let x=R;const xe=t(x);var ke=Object.defineProperty,ve=Object.getOwnPropertyDescriptor,ne=n((m,e,i,d)=>{for(var o=ve(e,i),r=m.length-1,p;r>=0;r--)(p=m[r])&&(o=p(e,i,o)||o);return o&&ke(e,i,o),o},"__decorateClass");const E=class E extends ce{constructor(){super(...arguments),this.specification=new g}get line(){return le.copy(this.text)}write(){return this.line}};n(E,"$Tagline");let f=E;const I=class I extends te{$saidOfACover(e){F(e instanceof q&&e.is(B),"a tagline is said of a cover, and this is not one")}};n(I,"TaglineSpecification");let g=I;ne([_("a tagline is said of a cover")],g.prototype,"$saidOfACover");const N=class N extends ${$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};n(N,"$FrontName");let k=N;const T=class T extends ${$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};n(T,"$FrontAuthor");let v=T;const W=class W extends ${$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};n(W,"$FrontTagline");let w=W;const M=class M extends ${$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};n(M,"$FrontImprint");let y=M;const Y=class Y extends L{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const i=t(Ae),d=t(Ce),o=t(je),r=t(Oe),p=t(de),c=t(ee),X=e.cover?.annotations.expressed(f),ae=e.table?.canonical;return l(Z,{children:[l(i,{children:[a(c,{children:ae?.means?.identifier}),e.title?.name]}),l(d,{children:[a(c,{children:e.author?.means?.identifier}),e.author?.name]}),X===void 0?null:a(o,{children:X.line}),l(r,{children:[a(c,{children:e.subject?.means?.identifier}),e.subject?.name]}),a(r,{children:a(p,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};n(Y,"$Front");let z=Y;const H=class H extends L{$Define(){super.$Define(),this.classes.add(this,"pd-navigation")}$Bound(){const e=this.chapter,i=this.book;if(e!==void 0&&i!==void 0&&[...this.text].length===0){const d=t(he),o=t(me),r=t(fe),p=t(ee),c=i.table?.canonical;this.text.add(this,a(d,{children:"←"}),l(r,{children:[a(p,{children:c?.means?.identifier}),"■"]}),a(o,{children:"→"}))}super.$Bound()}};n(H,"$Navigation");let b=H;const G=class G extends ge{constructor(){super(...arguments),this.specification=new u,this.style=h.div`
        &:not(:has(.pa-page.pa-open)) { display: none; }
    `}$Define(){super.$Define();const e=t(qe);this.text.add(this,a(e,{}),a(e,{}))}defines(e){e.classes.add(this,"pa-navigated"),e.containers.add(this,this.layer)}erase(e){e.containers.revert(this),e.classes.revert(this)}get layer(){if(this._layer!==void 0)return this._layer;const e=this.style,[i,d]=[...this.text],o=t(i),r=t(d);return this._layer=({className:p,children:c})=>l(e,{className:p,children:[a(o,{}),c,a(r,{})]})}};n(G,"$Navigated");let D=G;const S=class S extends te{$saidOfAChapter(e){F(e instanceof q,"navigated is said of a chapter, and this is not one")}};n(S,"NavigatedSpecification");let u=S;ne([_("navigated is said of a chapter")],u.prototype,"$saidOfAChapter");const J=class J extends B{constructor(){super(...arguments),this.style=h.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};n(J,"$LibraryCover");let A=J;const K=class K extends re{constructor(){super(...arguments),this.style=h.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};n(K,"$LibrarySynopsis");let C=K;const Q=class Q extends se{constructor(){super(...arguments),this.style=h.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};n(Q,"$LibraryTableOfContents");let j=Q;const U=class U extends pe{constructor(){super(...arguments),this.style=h(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:e})=>e.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:e})=>e.space} / 3) calc(0.75 * ${({theme:e})=>e.space}) calc(${({theme:e})=>e.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
    `}};n(U,"$LibraryTable");let O=U;const Ye=t(A),He=t(C),Ge=t(j),Se=t(O),we=t(k),ye=t(v),ze=t(w),De=t(y),Je=t(f),Ae=we,Ce=ye,je=ze,Oe=De,Pe=t(z),Be=t(b),qe=Be,Re=t(D),V=class V extends ue{write(){const e=t(Pe);return l(Z,{children:[a(e,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,a($e,{}))}$Bound(){const e=t(Re);for(const i of this.text.find(q))i.is(B)||i.text.find(b).length>0||(i.annotations.add(this,a(e,{})),i.annotations.define());super.$Bound()}};n(V,"$TheLibrary");let P=V;const Ee=t(P);t(Ee,be)(xe);export{P as $,Ye as C,He as S,Je as T,Ge as a,Se as b};
