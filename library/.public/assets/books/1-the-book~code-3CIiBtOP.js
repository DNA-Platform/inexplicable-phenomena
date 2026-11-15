var ie=Object.defineProperty;var i=(u,e)=>ie(u,"name",{value:e,configurable:!0});import{jsxs as r,Fragment as d,jsx as n}from"react/jsx-runtime";import{$ as t,selection as f,$check as ae}from"@dna-platform/chemistry";import{$Theme as oe,$Paragraph as k,Means as te,Word as B,Reference as v,$Word as g,specify as re,$Cover as ne,$Synopsis as se,$TableOfContents as ce,$Table as pe,$Annotation as le,html as de,Previous as he,Next as me,AnnotationSpecification as fe,$Chapter as ge,Theme as ue,$Book as be,Paginated as xe}from"@dna-platform/public";import{css as p}from"styled-components";const S=class S extends oe{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=f.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate(),this.navigation()]}navigation(){return p`
            .pd-navigation { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; font-size: calc(0.7 * ${({theme:e})=>e.size}); letter-spacing: .12em; text-transform: uppercase; opacity: .8; margin-block: ${({theme:e})=>e.space}; }
            .pd-navigation > * { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
            .pd-navigation .pd-previous { text-align: start; }
            .pd-navigation > .pd-word { text-align: center; flex: 0 0 auto; }
            .pd-navigation .pd-next { text-align: end; }
            .pd-navigation a { text-decoration: none; color: inherit; }
            .pd-navigation a:hover .pd-word, .pd-navigation a:hover { text-decoration: underline; text-underline-offset: .2em; }
            .pd-navigation .pd-previous .pd-word::before { content: '← '; }
            .pd-navigation .pd-next .pd-word::after { content: ' →'; }
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
        `}};i(S,"$LibraryTheme");let w=S;const $e=t(w),T=class T extends k{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const a=e.table?.canonical,s=e.subject?.means?.identifier===e.title?.means?.identifier,o=t(te),c=t(B),l=t(v);return r(d,{children:[s?null:r(d,{children:[n(o,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),n(c,{children:e.title?.name}),": ",r(c,{children:[n(l,{children:a?.means?.identifier}),a?.name]})]})}};i(T,"$RunningHead");let y=T;const Y=class Y extends g{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};i(Y,"$Label");let z=Y;const G=class G extends k{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const a=t(we),s=t(B),o=t(v);return r(d,{children:[n(a,{children:"Author"})," ",r(s,{children:[n(o,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:r(d,{children:[n(a,{children:"About"})," ",r(s,{children:[n(o,{children:e.about.means?.identifier}),e.about.name]})]}),n(a,{children:"Subject"})," ",r(s,{children:[n(o,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};i(G,"$Byline");let D=G;const ke=t(y),ve=t(z),we=ve,ye=t(D);var ze=Object.defineProperty,De=Object.getOwnPropertyDescriptor,je=i((u,e,a,s)=>{for(var o=De(e,a),c=u.length-1,l;c>=0;c--)(l=u[c])&&(o=l(e,a,o)||o);return o&&ze(e,a,o),o},"__decorateClass");const E=class E extends le{constructor(){super(...arguments),this.specification=new $}get line(){return de.copy(this.text)}write(){return this.line}};i(E,"$Tagline");let x=E;const H=class H extends fe{$saidOfACover(e){ae(e instanceof ge&&e.is(ne),"a tagline is said of a cover, and this is not one")}};i(H,"TaglineSpecification");let $=H;je([re("a tagline is said of a cover")],$.prototype,"$saidOfACover");const J=class J extends g{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};i(J,"$FrontName");let j=J;const K=class K extends g{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};i(K,"$FrontAuthor");let P=K;const Q=class Q extends g{$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};i(Q,"$FrontTagline");let C=Q;const U=class U extends g{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};i(U,"$FrontImprint");let A=U;const V=class V extends k{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const a=t(Oe),s=t(Re),o=t(qe),c=t(We),l=t(te),h=t(v),m=e.cover?.annotations.expressed(x),b=e.table?.canonical;return r(d,{children:[r(a,{children:[n(h,{children:b?.means?.identifier}),e.title?.name]}),r(s,{children:[n(h,{children:e.author?.means?.identifier}),e.author?.name]}),m===void 0?null:n(o,{children:m.line}),r(c,{children:[n(h,{children:e.subject?.means?.identifier}),e.subject?.name]}),n(c,{children:n(l,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};i(V,"$Front");let N=V;const X=class X extends k{$Define(){super.$Define(),this.classes.add(this,"pd-navigation")}write(){const e=this.chapter,a=this.book;if(e===void 0||a===void 0)return null;const s=t(he),o=t(me),c=t(B),l=t(v),h=a.table?.canonical,m=e.previous,b=e.next;return r(d,{children:[m===void 0?n("span",{className:"pd-previous"}):n(s,{children:m.canonical?.name}),r(c,{children:[n(l,{children:h?.means?.identifier}),"Contents"]}),b===void 0?n("span",{className:"pd-next"}):n(o,{children:b.canonical?.name})]})}};i(X,"$Navigation");let O=X;const Z=class Z extends ne{constructor(){super(...arguments),this.style=f.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};i(Z,"$LibraryCover");let R=Z;const F=class F extends se{constructor(){super(...arguments),this.style=f.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};i(F,"$LibrarySynopsis");let q=F;const L=class L extends ce{constructor(){super(...arguments),this.style=f.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};i(L,"$LibraryTableOfContents");let W=L;const _=class _ extends pe{constructor(){super(...arguments),this.style=f(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:e})=>e.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:e})=>e.space} / 3) calc(0.75 * ${({theme:e})=>e.space}) calc(${({theme:e})=>e.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
    `}};i(_,"$LibraryTable");let I=_;const Ee=t(R),He=t(q),Je=t(W),Ke=t(I),Pe=t(j),Ce=t(P),Ae=t(C),Ne=t(A),Qe=t(x),Oe=Pe,Re=Ce,qe=Ae,We=Ne,Ie=t(N),Ue=t(O),ee=class ee extends be{write(){const e=t(ke),a=t(ye),s=t(Ie);return r(d,{children:[n(e,{chapter:this.cover}),n(a,{chapter:this.cover}),n(s,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,n(xe,{}))}};i(ee,"$TheLibrary");let M=ee;const Me=t(M);t(Me,ue)($e);export{M as $,Ee as C,Ue as N,He as S,Qe as T,Je as a,Ke as b};
