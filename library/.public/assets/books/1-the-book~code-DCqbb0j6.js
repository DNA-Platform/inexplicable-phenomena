var he=Object.defineProperty;var i=(g,e)=>he(g,"name",{value:e,configurable:!0});import{jsxs as r,Fragment as m,jsx as n}from"react/jsx-runtime";import{$ as t,selection as h,$check as re}from"@dna-platform/chemistry";import{$Theme as me,$Paragraph as k,Word as I,Reference as v,$Word as f,specify as se,$Cover as S,$Synopsis as fe,$TableOfContents as ce,$Table as ge,$Annotation as ue,html as be,Means as xe,Previous as $e,Next as ke,$Format as ve,AnnotationSpecification as pe,$Chapter as W,Theme as we,$Book as ye,Paginated as ze}from"@dna-platform/public";import{css as p}from"styled-components";const H=class H extends me{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=h.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate(),this.navigation()]}navigation(){return p`
            .pd-navigation { display: flex; justify-content: center; align-items: baseline; gap: .15em; margin-block: calc(${({theme:e})=>e.space} / 2); }
            *:has(> .pd-navigation:first-child) { position: relative; }
            .pd-navigation:first-child { position: absolute; inset-block-start: .1rem; inset-inline-end: 0; margin-block: 0; z-index: 2; }
            .pd-navigation a { text-decoration: none; }
            .pd-navigation .pd-word { font-size: ${({theme:e})=>e.size}; line-height: 1; color: color-mix(in srgb, ${({theme:e})=>e.ink} 55%, ${({theme:e})=>e.paper}); transition: color .15s ease; }
            .pd-navigation a:hover .pd-word { color: ${({theme:e})=>e.ink}; }
            .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) { pointer-events: none; }
            .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word { color: color-mix(in srgb, ${({theme:e})=>e.ink} 22%, ${({theme:e})=>e.paper}); }
        `}front(){return p`
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
            .pd-heading { font-weight: bold; font-size: calc(1.15 * ${({theme:e})=>e.size}); margin-block: ${({theme:e})=>e.space} 0; }
            .pd-section > .pd-heading { margin-block-start: 0; }
            .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)) { display: none; }
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
            .pd-running-head a { text-decoration: none; color: color-mix(in srgb, ${({theme:e})=>e.ink} 70%, ${({theme:e})=>e.paper}); }
            .pd-running-head a:hover { color: ${({theme:e})=>e.ink}; }
            /* ONE HEADER, EVERY PAGE, ITS TABLE-NESS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of
               contents doesn't have the little square. Why isn't it the same thing as the others? Table of contents
               can be an attribute to capture polymorphism." — the same running head stands on every page, the square
               to the cover everywhere, the table's page included; only the title's destination flips, keyed here
               alone on the open table and the title's own data-to attribute. */
            .pd-running-head .pd-square { margin-inline-start: .6em; }
            .pd-running-head .pd-book-title[data-to="cover"] { display: none; }
            .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"] { display: none; }
            .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"] { display: inline; }
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
        `}};i(H,"$LibraryTheme");let w=H;const De=t(w),Y=class Y extends k{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const a=e.table?.canonical,s=t(I),o=t(v);return r(m,{children:[n("span",{className:"pd-book-title","data-to":"table",children:r(s,{children:[n(o,{children:a?.means?.identifier}),e.title?.name]})}),n("span",{className:"pd-book-title","data-to":"cover",children:r(s,{children:[n(o,{children:e.means?.identifier}),e.title?.name]})}),n("span",{className:"pd-square",children:r(s,{children:[n(o,{children:e.means?.identifier}),"☐"]})})]})}};i(Y,"$RunningHead");let y=Y;const M=class M extends f{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};i(M,"$Label");let z=M;const G=class G extends k{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const a=t(Re),s=t(I),o=t(v);return r(m,{children:[n(a,{children:"Author"})," ",r(s,{children:[n(o,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:r(m,{children:[n(a,{children:"About"})," ",r(s,{children:[n(o,{children:e.about.means?.identifier}),e.about.name]})]}),n(a,{children:"Subject"})," ",r(s,{children:[n(o,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};i(G,"$Byline");let D=G;const Ee=t(y),Ae=t(z),Re=Ae;t(D);var Ne=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,le=i((g,e,a,s)=>{for(var o=Pe(e,a),c=g.length-1,l;c>=0;c--)(l=g[c])&&(o=l(e,a,o)||o);return o&&Ne(e,a,o),o},"__decorateClass");const V=class V extends ue{constructor(){super(...arguments),this.specification=new b}get line(){return be.copy(this.text)}write(){return this.line}};i(V,"$Tagline");let u=V;const U=class U extends pe{$saidOfACover(e){re(e instanceof W&&e.is(S),"a tagline is said of a cover, and this is not one")}};i(U,"TaglineSpecification");let b=U;le([se("a tagline is said of a cover")],b.prototype,"$saidOfACover");const K=class K extends f{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};i(K,"$FrontName");let E=K;const J=class J extends f{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};i(J,"$FrontAuthor");let A=J;const Q=class Q extends f{$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};i(Q,"$FrontTagline");let R=Q;const X=class X extends f{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};i(X,"$FrontImprint");let N=X;const Z=class Z extends k{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const a=t(qe),s=t(Be),o=t(Ie),c=t(Se),l=t(xe),d=t(v),oe=e.cover?.annotations.expressed(u),de=e.table?.canonical;return r(m,{children:[r(a,{children:[n(d,{children:de?.means?.identifier}),e.title?.name]}),r(s,{children:[n(d,{children:e.author?.means?.identifier}),e.author?.name]}),oe===void 0?null:n(o,{children:oe.line}),r(c,{children:[n(d,{children:e.subject?.means?.identifier}),e.subject?.name]}),n(c,{children:n(l,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};i(Z,"$Front");let P=Z;const F=class F extends k{$Define(){super.$Define(),this.classes.add(this,"pd-navigation")}$Bound(){const e=this.chapter,a=this.book;if(e!==void 0&&a!==void 0&&[...this.text].length===0){const s=t($e),o=t(ke),c=t(I),l=t(v),d=a.table?.canonical;this.text.add(this,n(s,{children:"◁"}),r(c,{children:[n(l,{children:d?.means?.identifier}),"☐"]}),n(o,{children:"▷"}))}super.$Bound()}};i(F,"$Navigation");let x=F;const L=class L extends ve{constructor(){super(...arguments),this.specification=new $,this.style=h.div`
        &:not(:has(.pa-page.pa-open)) { display: none; }
    `}$Define(){super.$Define();const e=t(Ye);this.text.add(this,n(e,{}),n(e,{}))}defines(e){e.classes.add(this,"pa-navigated"),e.containers.add(this,this.layer)}erase(e){e.containers.revert(this),e.classes.revert(this)}get layer(){if(this._layer!==void 0)return this._layer;const e=this.style,[a,s]=[...this.text],o=t(a),c=t(s);return this._layer=({className:l,children:d})=>r(e,{className:l,children:[n(o,{}),d,n(c,{})]})}};i(L,"$Navigated");let T=L;const _=class _ extends pe{$saidOfAChapter(e){re(e instanceof W,"navigated is said of a chapter, and this is not one")}};i(_,"NavigatedSpecification");let $=_;le([se("navigated is said of a chapter")],$.prototype,"$saidOfAChapter");const ee=class ee extends S{constructor(){super(...arguments),this.style=h.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};i(ee,"$LibraryCover");let j=ee;const te=class te extends fe{constructor(){super(...arguments),this.style=h.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};i(te,"$LibrarySynopsis");let C=te;const ne=class ne extends ce{constructor(){super(...arguments),this.style=h.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};i(ne,"$LibraryTableOfContents");let O=ne;const ae=class ae extends ge{constructor(){super(...arguments),this.style=h(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:e})=>e.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:e})=>e.space} / 3) calc(0.75 * ${({theme:e})=>e.space}) calc(${({theme:e})=>e.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
    `}};i(ae,"$LibraryTable");let q=ae;const Xe=t(j),Ze=t(C),Fe=t(O),Le=t(q),Te=t(E),je=t(A),Ce=t(R),Oe=t(N),_e=t(u),qe=Te,Be=je,Ie=Ce,Se=Oe,We=t(P),He=t(x),Ye=He,Me=t(T),ie=class ie extends ye{write(){const e=t(Ee),a=t(We);return r(m,{children:[n(e,{chapter:this.cover}),n(a,{chapter:this.cover}),super.write()]})}turn(){window.scrollTo(0,0)}$Define(){super.$Define(),this.annotations.add(this,n(ze,{}))}$Bound(){const e=t(Me);for(const a of this.text.find(W))a.is(S)||a.is(ce)||a.text.find(x).length>0||(a.annotations.add(this,n(e,{})),a.annotations.define());super.$Bound()}};i(ie,"$TheLibrary");let B=ie;const Ge=t(B);t(Ge,we)(De);export{B as $,Xe as C,Ze as S,_e as T,Fe as a,Le as b};
