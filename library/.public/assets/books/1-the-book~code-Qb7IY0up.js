var he=Object.defineProperty;var a=(g,e)=>he(g,"name",{value:e,configurable:!0});import{jsxs as r,Fragment as h,jsx as n}from"react/jsx-runtime";import{$ as t,selection as m,$check as re}from"@dna-platform/chemistry";import{$Theme as me,$Paragraph as k,Means as se,Word as M,Reference as v,$Word as f,specify as ce,$Cover as N,$Synopsis as fe,$TableOfContents as ge,$Table as be,$Annotation as ue,html as xe,Previous as $e,Next as ke,$Format as ve,AnnotationSpecification as pe,$Chapter as T,Theme as we,$Book as ye,Paginated as ze}from"@dna-platform/public";import{css as l}from"styled-components";const Y=class Y extends me{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=m.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate(),this.navigation()]}navigation(){return l`
            .pd-navigation { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; font-size: calc(0.7 * ${({theme:e})=>e.size}); letter-spacing: .12em; text-transform: uppercase; opacity: .8; margin-block: ${({theme:e})=>e.space}; }
            .pd-navigation > * { flex: 1; min-width: 0; white-space: nowrap; }
            .pd-navigation > :nth-child(1) { text-align: start; }
            .pd-navigation > :nth-child(2) { text-align: center; flex: 0 0 auto; }
            .pd-navigation > :nth-child(3) { text-align: end; }
            .pd-navigation :is(.pa-self-reference, a:has(> .pa-self-reference)) { visibility: hidden; }
            .pd-navigation a { text-decoration: none; color: inherit; }
            .pd-navigation .pd-word { font-size: calc(1.3 * ${({theme:e})=>e.size}); line-height: 1; letter-spacing: 0; opacity: .6; transition: opacity .15s ease; }
            .pd-navigation > :nth-child(2) .pd-word { font-size: ${({theme:e})=>e.size}; }
            .pd-navigation a:hover .pd-word { opacity: 1; }
            .pd-navigation { margin-block: calc(${({theme:e})=>e.space} / 2); }
        `}front(){return l`
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
        `}plate(){return l`
            .pd-plate { float: inline-start; width: 11rem; margin: .25rem 1.5rem 1rem 0; }
            .pd-plate .pd-image img { margin-block: 0; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 20%, ${({theme:e})=>e.paper}); box-shadow: 0 1px 3px rgba(0, 0, 0, .12); }
            .pd-plate .pa-opening { text-decoration: none; color: inherit; }
            .pd-plate .pa-opening .pd-word { display: block; font-size: .8rem; margin-top: .4rem; opacity: .75; text-decoration: underline; }
            .pd-chapter:has(> .pd-paragraph > .pd-plate) > .pd-paragraph:first-child { margin-block: 0; }
            @media (max-width: 640px) { .pd-plate { width: 7rem; margin-right: 1rem; } }
        `}page(){return l`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
        `}levels(){return l`
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
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(${({theme:e})=>e.space} / 4); }
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }
        `}labels(){return l`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `}links(){return l`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return l`
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
        `}figures(){return l`
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
        `}};a(Y,"$LibraryTheme");let w=Y;const De=t(w),H=class H extends k{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const i=e.table?.canonical,s=e.subject?.means?.identifier===e.title?.means?.identifier,o=t(se),c=t(M),p=t(v);return r(h,{children:[s?null:r(h,{children:[n(o,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),n(c,{children:e.title?.name}),": ",r(c,{children:[n(p,{children:i?.means?.identifier}),i?.name]})]})}};a(H,"$RunningHead");let y=H;const S=class S extends f{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};a(S,"$Label");let z=S;const G=class G extends k{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const i=t(Ce),s=t(M),o=t(v);return r(h,{children:[n(i,{children:"Author"})," ",r(s,{children:[n(o,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:r(h,{children:[n(i,{children:"About"})," ",r(s,{children:[n(o,{children:e.about.means?.identifier}),e.about.name]})]}),n(i,{children:"Subject"})," ",r(s,{children:[n(o,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};a(G,"$Byline");let D=G;const Ae=t(y),je=t(z),Ce=je,Pe=t(D);var Oe=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,le=a((g,e,i,s)=>{for(var o=Be(e,i),c=g.length-1,p;c>=0;c--)(p=g[c])&&(o=p(e,i,o)||o);return o&&Oe(e,i,o),o},"__decorateClass");const J=class J extends ue{constructor(){super(...arguments),this.specification=new u}get line(){return xe.copy(this.text)}write(){return this.line}};a(J,"$Tagline");let b=J;const K=class K extends pe{$saidOfACover(e){re(e instanceof T&&e.is(N),"a tagline is said of a cover, and this is not one")}};a(K,"TaglineSpecification");let u=K;le([ce("a tagline is said of a cover")],u.prototype,"$saidOfACover");const Q=class Q extends f{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};a(Q,"$FrontName");let A=Q;const U=class U extends f{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};a(U,"$FrontAuthor");let j=U;const V=class V extends f{$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};a(V,"$FrontTagline");let C=V;const X=class X extends f{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};a(X,"$FrontImprint");let P=X;const Z=class Z extends k{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const i=t(Ee),s=t(Me),o=t(Ne),c=t(Te),p=t(se),d=t(v),oe=e.cover?.annotations.expressed(b),de=e.table?.canonical;return r(h,{children:[r(i,{children:[n(d,{children:de?.means?.identifier}),e.title?.name]}),r(s,{children:[n(d,{children:e.author?.means?.identifier}),e.author?.name]}),oe===void 0?null:n(o,{children:oe.line}),r(c,{children:[n(d,{children:e.subject?.means?.identifier}),e.subject?.name]}),n(c,{children:n(p,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};a(Z,"$Front");let O=Z;const F=class F extends k{$Define(){super.$Define(),this.classes.add(this,"pd-navigation")}$Bound(){const e=this.chapter,i=this.book;if(e!==void 0&&i!==void 0&&[...this.text].length===0){const s=t($e),o=t(ke),c=t(M),p=t(v),d=i.table?.canonical;this.text.add(this,n(s,{children:"←"}),r(c,{children:[n(p,{children:d?.means?.identifier}),"■"]}),n(o,{children:"→"}))}super.$Bound()}};a(F,"$Navigation");let x=F;const L=class L extends ve{constructor(){super(...arguments),this.specification=new $,this.style=m.div`
        &:not(:has(.pa-page.pa-open)) { display: none; }
    `}$Define(){super.$Define();const e=t(Se);this.text.add(this,n(e,{}),n(e,{}))}defines(e){e.classes.add(this,"pa-navigated"),e.containers.add(this,this.layer)}erase(e){e.containers.revert(this),e.classes.revert(this)}get layer(){if(this._layer!==void 0)return this._layer;const e=this.style,[i,s]=[...this.text],o=t(i),c=t(s);return this._layer=({className:p,children:d})=>r(e,{className:p,children:[n(o,{}),d,n(c,{})]})}};a(L,"$Navigated");let B=L;const _=class _ extends pe{$saidOfAChapter(e){re(e instanceof T,"navigated is said of a chapter, and this is not one")}};a(_,"NavigatedSpecification");let $=_;le([ce("navigated is said of a chapter")],$.prototype,"$saidOfAChapter");const ee=class ee extends N{constructor(){super(...arguments),this.style=m.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};a(ee,"$LibraryCover");let R=ee;const te=class te extends fe{constructor(){super(...arguments),this.style=m.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};a(te,"$LibrarySynopsis");let W=te;const ne=class ne extends ge{constructor(){super(...arguments),this.style=m.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};a(ne,"$LibraryTableOfContents");let q=ne;const ie=class ie extends be{constructor(){super(...arguments),this.style=m(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:e})=>e.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:e})=>e.space} / 3) calc(0.75 * ${({theme:e})=>e.space}) calc(${({theme:e})=>e.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
    `}};a(ie,"$LibraryTable");let I=ie;const Ze=t(R),Fe=t(W),Le=t(q),_e=t(I),Re=t(A),We=t(j),qe=t(C),Ie=t(P),et=t(b),Ee=Re,Me=We,Ne=qe,Te=Ie,Ye=t(O),He=t(x),Se=He,Ge=t(B),ae=class ae extends ye{write(){const e=t(Ae),i=t(Pe),s=t(Ye);return r(h,{children:[n(e,{chapter:this.cover}),n(i,{chapter:this.cover}),n(s,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,n(ze,{}))}$Bound(){const e=t(Ge);for(const i of this.text.find(T))i.is(N)||i.text.find(x).length>0||(i.annotations.add(this,n(e,{})),i.annotations.define());super.$Bound()}};a(ae,"$TheLibrary");let E=ae;const Je=t(E);t(Je,we)(De);export{E as $,Ze as C,Fe as S,et as T,Le as a,_e as b};
