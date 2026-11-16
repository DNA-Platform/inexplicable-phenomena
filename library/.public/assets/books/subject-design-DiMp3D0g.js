var ws=Object.defineProperty;var p=(T,s)=>ws(T,"name",{value:s,configurable:!0});import{jsxs as n,Fragment as v,jsx as e}from"react/jsx-runtime";import{$ as t,selection as k,$check as bs}from"@dna-platform/chemistry";import{$Theme as vs,$Paragraph as Y,Word as u,Reference as C,$Word as z,specify as us,$Cover as G,$Synopsis as zs,$TableOfContents as js,$Table as Ts,$Annotation as _s,html as Ss,Means as j,Previous as As,Next as Ws,$Format as $s,AnnotationSpecification as ks,$Chapter as V,Theme as Es,$Book as Ys,Paginated as Cs,Chapter as x,Title as y,Author as Ns,Subject as Is,Parenthetical as _,Paragraph as a,Section as c,Heading as h,Content as b,Image as l,Append as w}from"@dna-platform/public";import{css as f}from"styled-components";const U=class U extends vs{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=k.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate(),this.navigation()]}navigation(){return f`
            .pd-navigation { display: flex; justify-content: center; align-items: baseline; gap: .15em; margin-block: calc(${({theme:s})=>s.space} / 2); }
            *:has(> .pd-navigation:first-child) { position: relative; }
            .pd-navigation:first-child { position: absolute; inset-block-start: .1rem; inset-inline-end: 0; margin-block: 0; z-index: 2; }
            .pd-navigation a { text-decoration: none; }
            .pd-navigation .pd-word { font-size: ${({theme:s})=>s.size}; line-height: 1; color: color-mix(in srgb, ${({theme:s})=>s.ink} 55%, ${({theme:s})=>s.paper}); transition: color .15s ease; }
            .pd-navigation a:hover .pd-word { color: ${({theme:s})=>s.ink}; }
            .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) { pointer-events: none; }
            .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word { color: color-mix(in srgb, ${({theme:s})=>s.ink} 22%, ${({theme:s})=>s.paper}); }
        `}front(){return f`
            .pd-front { display: none; }
            .pd-book:has(.pa-cover.pa-open) .pd-front { display: flex; }
            .pd-book:has(.pa-cover.pa-open) .pd-running-head, .pd-book:has(.pa-cover.pa-open) .pd-byline, .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open { display: none; }
            /* THE BOARD FILLS THE SCREEN, Doug, 2026-11-17: "make the book bigger... as large as possible given
               that my screen looks like this" — the board stands as tall as the screen allows, the book's upper
               margin above it and the same air below, its width following at a book's proportion and capped at
               the column on a narrow screen; every length on the board is an em of the board's own size, one
               twenty-second of its width, the size the 22rem board of Sprint 125 was drawn at, so the type and the
               frame grow with it as a print enlarges. The seven spaces taken from the screen's height are the
               three above and the three below, and one for the page to breathe at the bottom without a scrollbar. */
            .pd-front { --front-width: min(calc((100vh - 7 * ${({theme:s})=>s.space}) * 2 / 3), calc(min(${({theme:s})=>s.measure}, 100vw) - 2 * ${({theme:s})=>s.space})); position: relative; box-sizing: border-box; width: var(--front-width); font-size: calc(var(--front-width) / 22); flex-direction: column; align-items: center; text-align: center; aspect-ratio: 2 / 3; margin: 0 auto calc(2 * ${({theme:s})=>s.space}); padding: 3em 2em 1.75em; border: 1px solid color-mix(in srgb, ${({theme:s})=>s.ink} 50%, ${({theme:s})=>s.paper}); box-shadow: inset 0 0 0 .375em ${({theme:s})=>s.paper}, inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, ${({theme:s})=>s.ink} 35%, ${({theme:s})=>s.paper}), 2px 12px 28px -12px rgba(0, 0, 0, .45); background: ${({theme:s})=>s.paper}; }
            .pd-front::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 1.25em; background: linear-gradient(to right, color-mix(in srgb, ${({theme:s})=>s.ink} 22%, transparent), color-mix(in srgb, ${({theme:s})=>s.ink} 5%, transparent) 55%, transparent); z-index: 1; pointer-events: none; }
            .pd-front > a, .pd-front .pd-word { display: block; }
            .pd-front .pa-reference { color: inherit; text-decoration: none; }
            .pd-front a:hover .pd-word { text-decoration: underline; text-underline-offset: 0.15em; }
            .pd-front-name { font-size: 2.4em; line-height: 1.1; font-weight: bold; margin-block: .15em .33em; }
            .pd-front-name::after { content: ''; display: block; width: 1.45em; border-top: 1px solid color-mix(in srgb, ${({theme:s})=>s.ink} 50%, ${({theme:s})=>s.paper}); margin: .375em auto 0; }
            .pd-front-author { font-size: 1.15em; letter-spacing: .04em; }
            .pd-front-tagline { font-style: italic; opacity: .75; margin-top: 1.15em; font-size: .95em; }
            .pd-front > :nth-last-child(2) { margin-top: auto; }
            .pd-front-imprint { font-size: .74em; letter-spacing: .15em; text-transform: uppercase; opacity: .65; margin-top: .47em; }
            .pa-page.pa-open { animation: come .5s ease; }
            @keyframes come { from { opacity: 0; transform: translateY(1rem); } to { opacity: 1; transform: none; } }
        `}plate(){return f`
            .pd-plate { float: inline-start; width: 11rem; margin: .25rem 1.5rem 1rem 0; }
            .pd-plate .pd-image img { margin-block: 0; border: 1px solid color-mix(in srgb, ${({theme:s})=>s.ink} 20%, ${({theme:s})=>s.paper}); box-shadow: 0 1px 3px rgba(0, 0, 0, .12); }
            .pd-plate .pa-opening { text-decoration: none; color: inherit; }
            .pd-plate .pa-opening .pd-word { display: block; font-size: .8rem; margin-top: .4rem; opacity: .75; text-decoration: underline; }
            .pd-chapter:has(> .pd-paragraph > .pd-plate) > .pd-paragraph:first-child { margin-block: 0; }
            @media (max-width: 640px) { .pd-plate { width: 7rem; margin-right: 1rem; } }
        `}page(){return f`
            font-family: ${({theme:s})=>s.font};
            font-size: ${({theme:s})=>s.size};
            line-height: ${({theme:s})=>s.leading};
            color: ${({theme:s})=>s.ink};
            background: ${({theme:s})=>s.paper};
            max-width: ${({theme:s})=>s.measure};
            margin-inline: auto;
            padding: ${({theme:s})=>s.space};
        `}levels(){return f`
            /* THE UPPER MARGIN STANDS EVERYWHERE, Doug, 2026-11-17: "No upper margin. That should be put back
               everywhere" — every page breathes above its first line. */
            .pd-book { margin-block: calc(2 * ${({theme:s})=>s.space}) ${({theme:s})=>s.space}; counter-reset: chapter equation; }
            .pd-chapter { margin-block: ${({theme:s})=>s.space}; scroll-margin-block-start: ${({theme:s})=>s.space}; }
            .pa-page.pa-open { margin-block-start: calc(${({theme:s})=>s.space} / 2); }
            /* NO LINE BREAKS, Doug, 2026-11-16: "No line break", then "Still breaks EVERYWHERE!!!" — a section
               carries no rule and no extra padding anywhere in the library; margins alone separate. */
            .pd-section { margin-block: ${({theme:s})=>s.space}; }
            .pd-paragraph { margin-block: ${({theme:s})=>s.space}; }
            .pa-item { margin-block: calc(${({theme:s})=>s.space} / 4); }
            .pa-list .pa-item { list-style-position: outside; margin-inline-start: 1.2em; }
            .pd-title { font-size: calc(1.5 * ${({theme:s})=>s.size}); font-weight: bold; margin-block-end: ${({theme:s})=>s.space}; }
            .pd-heading { font-weight: bold; font-size: calc(1.15 * ${({theme:s})=>s.size}); margin-block: ${({theme:s})=>s.space} 0; }
            .pd-section > .pd-heading { margin-block-start: 0; }
            .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)) { display: none; }
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(${({theme:s})=>s.space} / 4); }
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }
        `}labels(){return f`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:s})=>s.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `}links(){return f`
            .pa-reference { color: ${({theme:s})=>s.link}; text-decoration-color: ${({theme:s})=>s.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:s})=>s.space}; }
            .pa-content { color: ${({theme:s})=>s.link}; }
        `}apparatus(){return f`
            /* THE HEADER IS ONE COMPACT BAND, Doug, 2026-11-16: "You need to organize the header in the theme. It
               takes up too much space and isn't used. Look how far down the title of the chapter is. Wait are you
               making every chapter like a cover?!?" — the running head a bordered line with no paragraph margin, the
               byline one small line beneath it, author and subject side by side, not a title block of rows. */
            .pd-running-head {
                font-size: calc(0.7 * ${({theme:s})=>s.size});
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin-block: 0 calc(${({theme:s})=>s.space} / 2);
                padding-block-end: calc(${({theme:s})=>s.space} / 4);
                border-block-end: 1px solid color-mix(in srgb, ${({theme:s})=>s.ink} 30%, ${({theme:s})=>s.paper});
            }
            .pd-running-head a { text-decoration: none; color: color-mix(in srgb, ${({theme:s})=>s.ink} 70%, ${({theme:s})=>s.paper}); }
            .pd-running-head a:hover { color: ${({theme:s})=>s.ink}; }
            /* ONE HEADER, EVERY PAGE, ITS TABLE-NESS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of
               contents doesn't have the little square. Why isn't it the same thing as the others? Table of contents
               can be an attribute to capture polymorphism." — the same running head stands on every page, the square
               to the cover everywhere, the table's page included; only the title's destination flips, keyed here
               alone on the open table and the title's own data-to attribute. */
            .pd-running-head .pd-square { margin-inline-start: 0.6em; }
            .pd-running-head .pd-book-title[data-to="cover"] { display: none; }
            .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"] { display: none; }
            .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"] { display: inline; }
        `}figures(){return f`
            .pd-figure { max-width: 100%; }
            .pd-code {
                font-family: ui-monospace, monospace;
                font-size: calc(0.85 * ${({theme:s})=>s.size});
                line-height: 1.5;
                white-space: pre;
                overflow-x: auto;
                margin-block: ${({theme:s})=>s.space};
                padding: calc(0.75 * ${({theme:s})=>s.space}) ${({theme:s})=>s.space};
                border-inline-start: 2px solid color-mix(in srgb, ${({theme:s})=>s.ink} 25%, ${({theme:s})=>s.paper});
            }
            .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: ${({theme:s})=>s.space}; }
            .pd-document object { display: block; width: 100%; aspect-ratio: 1 / 1.4142; margin-block: ${({theme:s})=>s.space}; }
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `}};p(U,"$LibraryTheme");let N=U;const Rs=t(N),Z=class Z extends Y{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const s=this.book;if(s===void 0)return null;const i=s.table?.canonical,o=t(u),r=t(C);return n(v,{children:[e("span",{className:"pd-book-title","data-to":"table",children:n(o,{children:[e(r,{children:i?.means?.identifier}),s.title?.name]})}),e("span",{className:"pd-book-title","data-to":"cover",children:n(o,{children:[e(r,{children:s.means?.identifier}),s.title?.name]})}),e("span",{className:"pd-square",children:n(o,{children:[e(r,{children:s.means?.identifier}),"☐"]})})]})}};p(Z,"$RunningHead");let I=Z;const J=class J extends z{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};p(J,"$Label");let R=J;const Q=class Q extends Y{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const s=this.book;if(s===void 0)return null;const i=t(Fs),o=t(u),r=t(C);return n(v,{children:[e(i,{children:"Author"})," ",n(o,{children:[e(r,{children:s.author?.means?.identifier}),s.author?.name]}),s.about===void 0?null:n(v,{children:[e(i,{children:"About"})," ",n(o,{children:[e(r,{children:s.about.means?.identifier}),s.about.name]})]}),e(i,{children:"Subject"})," ",n(o,{children:[e(r,{children:s.subject?.means?.identifier}),s.subject?.name]})]})}};p(Q,"$Byline");let K=Q;const Ks=t(I),Ds=t(R),Fs=Ds;t(K);var Bs=Object.defineProperty,Xs=Object.getOwnPropertyDescriptor,xs=p((T,s,i,o)=>{for(var r=Xs(s,i),d=T.length-1,m;d>=0;d--)(m=T[d])&&(r=m(s,i,r)||r);return r&&Bs(s,i,r),r},"__decorateClass");const ss=class ss extends _s{constructor(){super(...arguments),this.specification=new A}get line(){return Ss.copy(this.text)}write(){return this.line}};p(ss,"$Tagline");let S=ss;const es=class es extends ks{$saidOfACover(s){bs(s instanceof V&&s.is(G),"a tagline is said of a cover, and this is not one")}};p(es,"TaglineSpecification");let A=es;xs([us("a tagline is said of a cover")],A.prototype,"$saidOfACover");const as=class as extends z{$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};p(as,"$FrontName");let D=as;const ns=class ns extends z{$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};p(ns,"$FrontAuthor");let F=ns;const ts=class ts extends z{$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};p(ts,"$FrontTagline");let B=ts;const ls=class ls extends z{$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};p(ls,"$FrontImprint");let X=ls;const ps=class ps extends Y{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const s=this.book;if(s===void 0)return null;const i=t(Us),o=t(Zs),r=t(Js),d=t(Qs),m=t(j),g=t(C),gs=s.cover?.annotations.expressed(S),ys=s.table?.canonical;return n(v,{children:[n(i,{children:[e(g,{children:ys?.means?.identifier}),s.title?.name]}),n(o,{children:[e(g,{children:s.author?.means?.identifier}),s.author?.name]}),gs===void 0?null:e(r,{children:gs.line}),n(d,{children:[e(g,{children:s.subject?.means?.identifier}),s.subject?.name]}),e(d,{children:e(m,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};p(ps,"$Front");let M=ps;const is=class is extends Y{$Define(){super.$Define(),this.classes.add(this,"pd-navigation")}$Bound(){const s=this.chapter,i=this.book;if(s!==void 0&&i!==void 0&&[...this.text].length===0){const o=t(As),r=t(Ws),d=t(u),m=t(C),g=i.table?.canonical;this.text.add(this,e(o,{children:"◁"}),n(d,{children:[e(m,{children:g?.means?.identifier}),"☐"]}),e(r,{children:"▷"}))}super.$Bound()}};p(is,"$Navigation");let W=is;const rs=class rs extends $s{constructor(){super(...arguments),this.specification=new $,this.style=k.div`
        &:not(:has(.pa-page.pa-open)) { display: none; }
    `}$Define(){super.$Define();const s=t(ae);this.text.add(this,e(s,{}),e(s,{}))}defines(s){s.classes.add(this,"pa-navigated"),s.containers.add(this,this.layer)}erase(s){s.containers.revert(this),s.classes.revert(this)}get layer(){if(this._layer!==void 0)return this._layer;const s=this.style,[i,o]=[...this.text],r=t(i),d=t(o);return this._layer=({className:m,children:g})=>n(s,{className:m,children:[e(r,{}),g,e(d,{})]})}};p(rs,"$Navigated");let O=rs;const os=class os extends ks{$saidOfAChapter(s){bs(s instanceof V,"navigated is said of a chapter, and this is not one")}};p(os,"NavigatedSpecification");let $=os;xs([us("navigated is said of a chapter")],$.prototype,"$saidOfAChapter");const cs=class cs extends G{constructor(){super(...arguments),this.style=k.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:s})=>s.space} calc(2 * ${({theme:s})=>s.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:s})=>s.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};p(cs,"$LibraryCover");let q=cs;const hs=class hs extends zs{constructor(){super(...arguments),this.style=k.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};p(hs,"$LibrarySynopsis");let L=hs;const ds=class ds extends js{constructor(){super(...arguments),this.style=k.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:s})=>s.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:s})=>s.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};p(ds,"$LibraryTableOfContents");let H=ds;const fs=class fs extends Ts{constructor(){super(...arguments),this.style=k(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:s})=>s.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:s})=>s.space} / 3) calc(0.75 * ${({theme:s})=>s.space}) calc(${({theme:s})=>s.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:s})=>s.ink} 15%, ${({theme:s})=>s.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:s})=>s.ink} 35%, ${({theme:s})=>s.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:s})=>s.ink} 15%, ${({theme:s})=>s.paper}); }
    `}};p(fs,"$LibraryTable");let P=fs;const Ms=t(q),Os=t(L),qs=t(H);t(P);const Ls=t(D),Hs=t(F),Ps=t(B),Gs=t(X),Vs=t(S),Us=Ls,Zs=Hs,Js=Ps,Qs=Gs,se=t(M),ee=t(W),ae=ee,ne=t(O),ms=class ms extends Ys{write(){const s=t(Ks),i=t(se);return n(v,{children:[e(s,{chapter:this.cover}),e(i,{chapter:this.cover}),super.write()]})}turn(){window.scrollTo(0,0)}$Define(){super.$Define(),this.annotations.add(this,e(Cs,{}))}$Bound(){const s=t(ne);for(const i of this.text.find(V))i.is(G)||i.is(js)||i.text.find(W).length>0||(i.annotations.add(this,e(s,{})),i.annotations.define());super.$Bound()}};p(ms,"$TheLibrary");let E=ms;const te=t(E);t(te,Es)(Rs);const le=p(()=>n(x,{children:[e(Ms,{}),e(y,{children:"[The Design](/inexplicable-phenomena/the-design/)"}),e(Ns,{children:"[Doug](/inexplicable-phenomena/our-team/)"}),e(Is,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"}),e(Vs,{children:"Sketches of how this library might look."})]}),"Cover"),pe=p(()=>n(x,{children:[e(Os,{}),e(_,{}),n(y,{children:[e(_,{}),"[Synopsis](/inexplicable-phenomena/the-design/)"]}),e(a,{children:"Sketches of how this library might look, each a page of HTML made from the bound print with its forms on a switch, photographed, and committed to nothing. A sketch asks a question of a page; the manual changes only when the librarian says a form is the one."})]}),"Synopsis"),ie=p(()=>n(x,{children:[e(qs,{}),n(y,{children:[e(_,{}),"[Table of Contents](/inexplicable-phenomena/the-design/#table-of-contents)"]}),n(c,{children:[e(h,{children:"Contents"}),e(a,{children:e(b,{children:"[The Top Page](/inexplicable-phenomena/the-design/#the-top-page)"})}),e(a,{children:e(b,{children:"[The Manual's Page](/inexplicable-phenomena/the-design/#the-manuals-page)"})}),e(a,{children:e(b,{children:"[The Project's Page](/inexplicable-phenomena/the-design/#the-projects-page)"})}),n(a,{children:[e(_,{}),e(u,{children:e(b,{children:"[The Design](/inexplicable-phenomena/the-design/)"})}),e(u,{children:e(b,{children:"[Synopsis](/inexplicable-phenomena/the-design/#synopsis)"})}),e(u,{children:e(b,{children:"[Table of Contents](/inexplicable-phenomena/the-design/#table-of-contents)"})})]})]})]}),"Table"),re=p(()=>n(x,{children:[e(y,{children:"[The Top Page](/inexplicable-phenomena/the-design/#the-top-page)"}),n(c,{children:[e(h,{children:"Sketch 001, three forms of the top page"}),e(a,{children:"The first sketch asks what the top of the library should look like, from the bound print of the top book as the borrowed manual draws it. The page is appended to this chapter with its forms on a switch, and a form is a question, not a design. The forms: a, the page as bound, the cover in its box, the byline above it, the synopsis beside, the catalogue as a two-column table; b, a front, the masthead and the byline on one line, the name large, the synopsis as a standfirst, the catalogue as three shelves side by side and the chapter below; c, the subjects first, the catalogue standing above the synopsis in two columns under a small cover."}),e(a,{children:"What the sketch found on its first runs: the header row of the catalogue, Book and What it is, is a row like the others and became a shelf of its own in form b until the sheet hid it by a rule more specific than the one that made the shelves, since a later rule of equal weight had won. And form c misfired: the masthead, the byline and the chapters are not siblings on the page, each standing in a container of its own, so an order given to them put the masthead last and left the catalogue under the synopsis; a form that moves the parts needs another mechanism than order. Nothing here moved into the manual."})]}),n(c,{children:[e(h,{children:"The photographs"}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/1-the-top-page~001-a-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/1-the-top-page~001-b-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/1-the-top-page~001-b-phone.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/1-the-top-page~001-c-desk.png"})})]}),e(w,{identifier:"001",type:".html",children:`<!doctype html>
<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inexplicable Phenomena</title>
    
    
    
  
  
  
  <style>@font-face { font-display: block; font-family: KaTeX_AMS; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_AMS-Regular-DMm9YOAa.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_AMS-Regular-DRggAlZN.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Caligraphic; font-style: normal; font-weight: 700; src: url("/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Caligraphic; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Fraktur; font-style: normal; font-weight: 700; src: url("/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Fraktur; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-CB_wures.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Main; font-style: normal; font-weight: 700; src: url("/inexplicable-phenomena/assets/KaTeX_Main-Bold-Cx986IdX.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Main-Bold-Jm3AIy58.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Main-Bold-waoOVXN0.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Main; font-style: italic; font-weight: 700; src: url("/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Main; font-style: italic; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Main-Italic-BMLOBm91.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Main-Italic-3WenGoN9.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Main; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Main-Regular-B22Nviop.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Main-Regular-Dr94JaBh.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Main-Regular-ypZvNtVU.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Math; font-style: italic; font-weight: 700; src: url("/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Math; font-style: italic; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Math-Italic-t53AETM-.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Math-Italic-DA0__PXp.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Math-Italic-flOr_0UB.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_SansSerif; font-style: normal; font-weight: 700; src: url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_SansSerif; font-style: italic; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_SansSerif; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Script; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Script-Regular-D3wIWfF6.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Script-Regular-D5yQViql.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Script-Regular-C5JkGWo-.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Size1; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Size1-Regular-C195tn64.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Size2; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Size2-Regular-oD1tc_U0.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Size3; font-style: normal; font-weight: 400; src: url("data:font/woff2;base64,d09GMgABAAAAAA4oAA4AAAAAHbQAAA3TAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAAgRQIDgmcDBEICo1oijYBNgIkA14LMgAEIAWJAAeBHAyBHBvbGiMRdnO0IkRRkiYDgr9KsJ1NUAf2kILNxgUmgqIgq1P89vcbIcmsQbRps3vCcXdYOKSWEPEKgZgQkprQQsxIXUgq0DqpGKmIvrgkeVGtEQD9DzAO29fM9jYhxZEsL2FeURH2JN4MIcTdO049NCVdxQ/w9NrSYFEBKTDKpLKfNkCGDc1RwjZLQcm3vqJ2UW9Xfa3tgAHz6ivp6vgC2yD4/6352ndnN0X0TL7seypkjZlMsjmZnf0Mm5Q+JykRWQBKCVCVPbARPXWyQtb5VgLB6Biq7/Uixcj2WGqdI8tGSgkuRG+t910GKP2D7AQH0DB9FMDW/obJZ8giFI3Wg8Cvevz0M+5m0rTh7XDBlvo9Y4vm13EXmfttwI4mBo1EG15fxJhUiCLbiiyCf/ZA6MFAhg3pGIZGdGIVjtPn6UcMk9A/UUr9PhoNsCENw1APAq0gpH73e+M+0ueyHbabc3vkbcdtzcf/fiy+NxQEjf9ud/ELBHAXJ0nk4z+MXH2Ev/kWyV4k7SkvpPc9Qr38F6RPWnM9cN6DJ0AdD1BhtgABtmoRoFCvPsBAumNm6soZG2Gk5GyVTo2sJncSyp0jQTYoR6WDvTwaaEcHsxHfvuWhHA3a6bN7twRKtcGok6NsCi7jYRrM2jExsUFMxMQYuJbMhuWNOumEJy9hi29Dmg5zMp/A5+hhPG19j1vBrq8JTLr8ki5VLPmG/PynJHVul440bxg5xuymHUFPBshC+nA9I1FmwbRBTNHAcik3Oae0cxKoI3MOriM42UrPe51nsaGxJ+WfXubAsP84aabUlQSJ1IiE0iPETLUU4CATgfXSCSpuRFRmCGbO+wSpAnzaeaCYW1VNEysRtuXCEL1kUFUbbtMv3Tilt/1c11jt3Q5bbMa84cpWipp8Elw3MZhOHsOlwwVUQM3lAR35JiFQbaYCRnMF2lxAWoOg2gyoIV4PouX8HytNIfLhqpJtXB4vjiViUI8IJ7bkC4ikkQvKksnOTKICwnqWSZ9YS5f0WCxmpgjbIq7EJcM4aI2nmhLNY2JIUgOjXZFWBHb+x5oh6cwb0Tv1ackHdKi0I9OO2wE9aogIOn540CCCziyhN+IaejtgAONKznHlHyutPrHGwCx9S6B8kfS4Mfi4Eyv7OU730bT1SCBjt834cXsf43zVjPUqqJjgrjeGnBxSG4aYAKFuVbeCfkDIjAqMb6yLNIbCuvXhMH2/+k2vkNpkORhR59N1CkzoOENvneIosjYmuTxlhUzaGEJQ/iWqx4dmwpmKjrwTiTGTCVozNAYqk/zXOndWxuWSmJkQpJw3pK5KX6QrLt5LATMqpmPAQhkhK6PUjzHUn7E0gHE0kPE0iKkolgkUx9SZmVAdDgpffdyJKg3k7VmzYGCwVXGz/tXmkOIp+vcWs+EMuhhvN0h9uhfzWJziBQmCREGSIFmQIkgVpAnSBRmC//6hkLZwaVhwxlrJSOdqlFtOYxlau9F2QN5Y98xmIAsiM1HVp2VFX+DHHGg6Ecjh3vmqtidX3qHI2qycTk/iwxSt5UzTmEP92ZBnEWTk4Mx8Mpl78ZDokxg/KWb+Q0QkvdKVmq3TMW+RXEgrsziSAfNXFMhDc60N5N9jQzjfO0kBKpUZl0ZmwJ41j/B9Hz6wmRaJB84niNmQrzp9eSlQCDDzazGDdVi3P36VZQ+Jy4f9UBNp+3zTjqI4abaFAm+GShVaXlsGdF3FYzZcDI6cori4kMxUECl9IjJZpzkvitAoxKue+90pDMvcKRxLl53TmOKCmV/xRolNKSqqUxc6LStOETmFOiLZZptlZepcKiAzteG8PEdpnQpbOMNcMsR4RR2Bs0cKFEvSmIjAFcnarqwUL4lDhHmnVkwu1IwshbiCcgvOheZuYyOteufZZwlcTlLgnZ3o/WcYdzZHW/WGaqaVfmTZ1aWCceJjkbZqsfbkOtcFlUZM/jy+hXHDbaUobWqqXaeWobbLO99yG5N3U4wxco0rQGGcOLASFMXeJoham8M+/x6O2WywK2l4HGbq1CoUyC/IZikQhdq3SiuNrvAEj0AVu9x2x3lp/xWzahaxidezFVtdcb5uEnzyl0ZmYiuKI0exvCd4Xc9CV1KB0db00z92wDPde0kukbvZIWN6jUWFTmPIC/Y4UPCm8UfDTFZpZNon1qLFTkBhxzB+FjQRA2Q/YRJT8pQigslMaUpFyAG8TMlXigiqmAZX4xgijKjRlGpLE0GdplRfCaJo0JQaSxNBk6ZmMzcya0FmrcisDdn0Q3HI2sWSppYigmlM1XT/kLQZSNpMJG0WkjYbSZuDpM1F0uYhFc1HxU4m1QJjDK6iL0S5uSj5rgXc3RejEigtcRBtqYPQsiTskmO5vosV+q4VGIKbOkDg0jtRrq+Em1YloaTFar3EGr1EUC8R0kus1Uus00usL97ABr2BjXoDm/QGNhuWtMVBKOwg/i78lT7hBsAvDmwHc/ao3vmUbBmhjeYySZNWvGkfZAgISDSaDo1SVpzGDsAEkF8B+gEapViUoZgUWXcRIGFZNm6gWbAKk0bp0k1MHG9fLYtV4iS2SmLEQFARzRcnf9PUS0LVn05/J9MiRRBU3v2IrvW974v4N00L7ZMk0wXP1409CHo/an8zTRHD3eSJ6m8D4YMkZNl3M79sqeuAsr/m3f+8/yl7A50aiAEJgeBeMWzu7ui9UfUBCe2TIqZIoOd/3/udRBOQidQZUERzb2/VwZN1H/Sju82ew2H2Wfr6qvfVf3hqwDvAIpkQVFy4B9Pe9e4/XvPeceu7h3dvO56iJPf0+A6cqA2ip18ER+iFgggiuOkvj24bby0N9j2UHIkgqIt+sVgfodC4YghLSMjSZbH0VR/6dMDrYJeKHilKTemt6v6kvzvn3/RrdWtr0GoN/xL+Sex/cPYLUpepx9cz/D46UPU5KXgAQa+NDps1v6J3xP1i2HtaDB0M9aX2deA7SYff//+gUCovMmIK/qfsFcOk+4Y5ZN97XlG6zebqtMbKgeRFi51vnxTQYBUik2rS/Cn6PC8ADR8FGxsRPB82dzfND90gIcshOcYUkfjherBz53odpm6TP8txlwOZ71xmfHHOvq053qFF/MRlS3jP0ELudrf2OeN8DHvp6ZceLe8qKYvWz/7yp0u4dKPfli3CYq0O13Ih71mylJ80tOi10On8wi+F4+LWgDPeJ30msSQt9/vkmHq9/Lvo2b461mP801v3W4xTcs6CbvF9UDdrSt+A8OUbpSh55qAUFXWznBBfdeJ8a4d7ugT5tvxUza3h9m4H7ptTqiG4z0g5dc0X29OcGlhpGFMpQo9ytTS+NViZpNdvU4kWx+LKxNY10kQ1yqGXrhe4/1nvP7E+nd5A92TtaRplbHSqoIdOqtRWti+fkB5/n1+/VvCmz12pG1kpQWsfi1ftlBobm0bpngs16CHkbIwdLnParxtTV3QYRlfJ0KFskH7pdN/YDn+yRuSd7sNH3aO0DYPggk6uWuXrfOc+fa3VTxFVvKaNxHsiHmsXyCLIE5yuOeN3/Jdf8HBL/5M6shjyhxHx9BjB1O0+4NLOnjLLSxwO7ukN4jMbOIcD879KLSi6Pk61Oqm2377n8079PXEEQ7cy7OKEC9nbpet118fxweTafpt69x/Bt8UqGzNQt7aelpc44dn5cqhwf71+qKp/Zf/+a0zcizOUWpl/iBcSXip0pplkatCchoH5c5aUM8I7/dWxAej8WicPL1URFZ9BDJelUwEwTkGqUhgSlydVes95YdXvhh9Gfz/aeFWvgVb4tuLbcv4+wLdutVZv/cUonwBD/6eDlE0aSiKK/uoH3+J1wDE/jMVqY2ysGufN84oIXB0sPzy8ollX/LegY74DgJXJR57sn+VGza0x3DnuIgABFM15LmajjjsNlYj+JEZGbuRYcAMOWxFkPN2w6Wd46xo4gVWQR/X4lyI/R6K/YK0110GzudPRW7Y+UOBGTfNNzHeYT0fiH0taunBpq9HEW8OKSaBGj21L0MqenEmNRWBAWDWAk4CpNoEZJ2tTaPFgbQYj8HxtFilErs3BTRwT8uO1NXQaWfIotchmPkAF5mMBAliEmZiOGVgCG9LgRzpscMAOOwowlT3JhusdazXGSC/hxR3UlmWVwWHpOIKheqONvjyhSiTHIkVUco5bnji8m//zL7PKaT1Vl5I6UE609f+gkr6MZKVyKc7zJRmCahLsdlyA5fdQkRSan9LgnnLEyGSkaKJCJog0wAgvepWBt80+1yKln1bMVtCljfNWDueKLsWwaEbBSfSPTEmVRsUcYYMnEjcjeyCZzBXK9E9BYBXLKjOSpUDR+nEV3TFSUdQaz+ot98QxgXwx0GQ+EEUAKB2qZPkQQ0GqFD8UPFMqyaCHM24BZmSGic9EYMagKizOw9Hz50DMrDLrqqLkTAhplMictiCAx5S3BIUQdeJeLnBy2CNtMfz6cV4u8XKoFZQesbf9YZiIERiHjaNodDW6LgcirX/mPnJIkBGDUpTBhSa0EIr38D5hCIszhCM8URGBqImoWjpvpt1ebu/v3Gl3qJfMnNM+9V+kiRFyROTPHQWOcs1dNW94/ukKMPZBvDi55i5CttdeJz84DLngLqjcdwEZ87bFFR8CIG35OAkDVN6VRDZ7aq67NteYqZ2lpT8oYB2CytoBd6VuAx4WgiAsnuj3WohG+LugzXiQRDeM3XYXlULv4dp5VFYC") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Size3-Regular-CTq5MqoE.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Size4; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Size4-Regular-BF-4gkZK.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Size4-Regular-DWFBv043.ttf") format("truetype"); }
@font-face { font-display: block; font-family: KaTeX_Typewriter; font-style: normal; font-weight: 400; src: url("/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2") format("woff2"), url("/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff") format("woff"), url("/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf") format("truetype"); }
.katex { font: 1.21em / 1.2 KaTeX_Main, "Times New Roman", serif; position: relative; text-indent: 0px; text-rendering: auto; }
.katex * { border-color: currentcolor; }
.katex .katex-version::after { content: "0.18.1"; }
.katex .katex-mathml { border: 0px; clip-path: inset(50%); height: 1px; overflow: hidden; padding: 0px; position: absolute; width: 1px; }
.katex .katex-html > .katex-newline { display: block; }
.katex .katex-base { position: relative; white-space: nowrap; width: min-content; }
.katex .katex-base, .katex .katex-strut { display: inline-block; }
.katex .textbf { font-weight: 700; }
.katex .textit { font-style: italic; }
.katex .textrm { font-family: KaTeX_Main; }
.katex .textsf { font-family: KaTeX_SansSerif; }
.katex .texttt { font-family: KaTeX_Typewriter; }
.katex .mathnormal { font-family: KaTeX_Math; font-style: italic; }
.katex .mathit { font-family: KaTeX_Main; font-style: italic; }
.katex .mathrm { font-style: normal; }
.katex .mathbf { font-family: KaTeX_Main; font-weight: 700; }
.katex .boldsymbol { font-family: KaTeX_Math; font-style: italic; font-weight: 700; }
.katex .amsrm, .katex .mathbb, .katex .textbb { font-family: KaTeX_AMS; }
.katex .mathcal { font-family: KaTeX_Caligraphic; }
.katex .mathfrak, .katex .textfrak { font-family: KaTeX_Fraktur; }
.katex .mathboldfrak, .katex .textboldfrak { font-family: KaTeX_Fraktur; font-weight: 700; }
.katex .mathtt { font-family: KaTeX_Typewriter; }
.katex .mathscr, .katex .textscr { font-family: KaTeX_Script; }
.katex .mathsf, .katex .textsf { font-family: KaTeX_SansSerif; }
.katex .mathboldsf, .katex .textboldsf { font-family: KaTeX_SansSerif; font-weight: 700; }
.katex .mathitsf, .katex .mathsfit, .katex .textitsf { font-family: KaTeX_SansSerif; font-style: italic; }
.katex .mainrm { font-family: KaTeX_Main; font-style: normal; }
.katex .vlist-t { border-collapse: collapse; display: inline-table; table-layout: fixed; }
.katex .vlist-r { display: table-row; }
.katex .vlist { display: table-cell; position: relative; vertical-align: bottom; }
.katex .vlist > span { display: block; height: 0px; position: relative; }
.katex .vlist > span > span { display: inline-block; }
.katex .vlist > span > .pstrut { overflow: hidden; width: 0px; }
.katex .vlist-t2 { margin-right: -2px; }
.katex .vlist-s { display: table-cell; font-size: 1px; min-width: 2px; vertical-align: bottom; width: 2px; }
.katex .katex-vbox { align-items: baseline; display: inline-flex; flex-direction: column; }
.katex .katex-thinbox { display: inline-flex; flex-direction: row; max-width: 0px; width: 0px; }
.katex .msupsub { text-align: left; }
.katex .mfrac > span > span { text-align: center; }
.katex .mfrac .frac-line { border-bottom-style: solid; display: inline-block; width: 100%; }
.katex .katex-hdashline, .katex .katex-hline, .katex .katex-overline .overline-line, .katex .katex-rule, .katex .katex-underline .underline-line, .katex .mfrac .frac-line { min-height: 1px; }
.katex .mspace { display: inline-block; }
.katex .katex-smash { display: inline; line-height: 0; }
.katex .clap, .katex .llap, .katex .rlap { position: relative; width: 0px; }
.katex .clap > .katex-inner, .katex .llap > .katex-inner, .katex .rlap > .katex-inner { position: absolute; }
.katex .clap > .katex-fix, .katex .llap > .katex-fix, .katex .rlap > .katex-fix { display: inline-block; }
.katex .llap > .katex-inner { right: 0px; }
.katex .clap > .katex-inner, .katex .rlap > .katex-inner { left: 0px; }
.katex .clap > .katex-inner > span { margin-left: -50%; margin-right: 50%; }
.katex .katex-rule { border: 0px solid; display: inline-block; position: relative; }
.katex .katex-hline, .katex .katex-overline .overline-line, .katex .katex-underline .underline-line { border-bottom-style: solid; display: inline-block; width: 100%; }
.katex .katex-hdashline { border-bottom-style: dashed; display: inline-block; width: 100%; }
.katex .sqrt > .katex-root { margin-left: 0.277778em; margin-right: -0.555556em; }
.katex .fontsize-ensurer.reset-size1.size1, .katex .katex-sizing.reset-size1.size1 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size1.size2, .katex .katex-sizing.reset-size1.size2 { font-size: 1.2em; }
.katex .fontsize-ensurer.reset-size1.size3, .katex .katex-sizing.reset-size1.size3 { font-size: 1.4em; }
.katex .fontsize-ensurer.reset-size1.size4, .katex .katex-sizing.reset-size1.size4 { font-size: 1.6em; }
.katex .fontsize-ensurer.reset-size1.size5, .katex .katex-sizing.reset-size1.size5 { font-size: 1.8em; }
.katex .fontsize-ensurer.reset-size1.size6, .katex .katex-sizing.reset-size1.size6 { font-size: 2em; }
.katex .fontsize-ensurer.reset-size1.size7, .katex .katex-sizing.reset-size1.size7 { font-size: 2.4em; }
.katex .fontsize-ensurer.reset-size1.size8, .katex .katex-sizing.reset-size1.size8 { font-size: 2.88em; }
.katex .fontsize-ensurer.reset-size1.size9, .katex .katex-sizing.reset-size1.size9 { font-size: 3.456em; }
.katex .fontsize-ensurer.reset-size1.size10, .katex .katex-sizing.reset-size1.size10 { font-size: 4.148em; }
.katex .fontsize-ensurer.reset-size1.size11, .katex .katex-sizing.reset-size1.size11 { font-size: 4.976em; }
.katex .fontsize-ensurer.reset-size2.size1, .katex .katex-sizing.reset-size2.size1 { font-size: 0.833333em; }
.katex .fontsize-ensurer.reset-size2.size2, .katex .katex-sizing.reset-size2.size2 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size2.size3, .katex .katex-sizing.reset-size2.size3 { font-size: 1.16667em; }
.katex .fontsize-ensurer.reset-size2.size4, .katex .katex-sizing.reset-size2.size4 { font-size: 1.33333em; }
.katex .fontsize-ensurer.reset-size2.size5, .katex .katex-sizing.reset-size2.size5 { font-size: 1.5em; }
.katex .fontsize-ensurer.reset-size2.size6, .katex .katex-sizing.reset-size2.size6 { font-size: 1.66667em; }
.katex .fontsize-ensurer.reset-size2.size7, .katex .katex-sizing.reset-size2.size7 { font-size: 2em; }
.katex .fontsize-ensurer.reset-size2.size8, .katex .katex-sizing.reset-size2.size8 { font-size: 2.4em; }
.katex .fontsize-ensurer.reset-size2.size9, .katex .katex-sizing.reset-size2.size9 { font-size: 2.88em; }
.katex .fontsize-ensurer.reset-size2.size10, .katex .katex-sizing.reset-size2.size10 { font-size: 3.45667em; }
.katex .fontsize-ensurer.reset-size2.size11, .katex .katex-sizing.reset-size2.size11 { font-size: 4.14667em; }
.katex .fontsize-ensurer.reset-size3.size1, .katex .katex-sizing.reset-size3.size1 { font-size: 0.714286em; }
.katex .fontsize-ensurer.reset-size3.size2, .katex .katex-sizing.reset-size3.size2 { font-size: 0.857143em; }
.katex .fontsize-ensurer.reset-size3.size3, .katex .katex-sizing.reset-size3.size3 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size3.size4, .katex .katex-sizing.reset-size3.size4 { font-size: 1.14286em; }
.katex .fontsize-ensurer.reset-size3.size5, .katex .katex-sizing.reset-size3.size5 { font-size: 1.28571em; }
.katex .fontsize-ensurer.reset-size3.size6, .katex .katex-sizing.reset-size3.size6 { font-size: 1.42857em; }
.katex .fontsize-ensurer.reset-size3.size7, .katex .katex-sizing.reset-size3.size7 { font-size: 1.71429em; }
.katex .fontsize-ensurer.reset-size3.size8, .katex .katex-sizing.reset-size3.size8 { font-size: 2.05714em; }
.katex .fontsize-ensurer.reset-size3.size9, .katex .katex-sizing.reset-size3.size9 { font-size: 2.46857em; }
.katex .fontsize-ensurer.reset-size3.size10, .katex .katex-sizing.reset-size3.size10 { font-size: 2.96286em; }
.katex .fontsize-ensurer.reset-size3.size11, .katex .katex-sizing.reset-size3.size11 { font-size: 3.55429em; }
.katex .fontsize-ensurer.reset-size4.size1, .katex .katex-sizing.reset-size4.size1 { font-size: 0.625em; }
.katex .fontsize-ensurer.reset-size4.size2, .katex .katex-sizing.reset-size4.size2 { font-size: 0.75em; }
.katex .fontsize-ensurer.reset-size4.size3, .katex .katex-sizing.reset-size4.size3 { font-size: 0.875em; }
.katex .fontsize-ensurer.reset-size4.size4, .katex .katex-sizing.reset-size4.size4 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size4.size5, .katex .katex-sizing.reset-size4.size5 { font-size: 1.125em; }
.katex .fontsize-ensurer.reset-size4.size6, .katex .katex-sizing.reset-size4.size6 { font-size: 1.25em; }
.katex .fontsize-ensurer.reset-size4.size7, .katex .katex-sizing.reset-size4.size7 { font-size: 1.5em; }
.katex .fontsize-ensurer.reset-size4.size8, .katex .katex-sizing.reset-size4.size8 { font-size: 1.8em; }
.katex .fontsize-ensurer.reset-size4.size9, .katex .katex-sizing.reset-size4.size9 { font-size: 2.16em; }
.katex .fontsize-ensurer.reset-size4.size10, .katex .katex-sizing.reset-size4.size10 { font-size: 2.5925em; }
.katex .fontsize-ensurer.reset-size4.size11, .katex .katex-sizing.reset-size4.size11 { font-size: 3.11em; }
.katex .fontsize-ensurer.reset-size5.size1, .katex .katex-sizing.reset-size5.size1 { font-size: 0.555556em; }
.katex .fontsize-ensurer.reset-size5.size2, .katex .katex-sizing.reset-size5.size2 { font-size: 0.666667em; }
.katex .fontsize-ensurer.reset-size5.size3, .katex .katex-sizing.reset-size5.size3 { font-size: 0.777778em; }
.katex .fontsize-ensurer.reset-size5.size4, .katex .katex-sizing.reset-size5.size4 { font-size: 0.888889em; }
.katex .fontsize-ensurer.reset-size5.size5, .katex .katex-sizing.reset-size5.size5 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size5.size6, .katex .katex-sizing.reset-size5.size6 { font-size: 1.11111em; }
.katex .fontsize-ensurer.reset-size5.size7, .katex .katex-sizing.reset-size5.size7 { font-size: 1.33333em; }
.katex .fontsize-ensurer.reset-size5.size8, .katex .katex-sizing.reset-size5.size8 { font-size: 1.6em; }
.katex .fontsize-ensurer.reset-size5.size9, .katex .katex-sizing.reset-size5.size9 { font-size: 1.92em; }
.katex .fontsize-ensurer.reset-size5.size10, .katex .katex-sizing.reset-size5.size10 { font-size: 2.30444em; }
.katex .fontsize-ensurer.reset-size5.size11, .katex .katex-sizing.reset-size5.size11 { font-size: 2.76444em; }
.katex .fontsize-ensurer.reset-size6.size1, .katex .katex-sizing.reset-size6.size1 { font-size: 0.5em; }
.katex .fontsize-ensurer.reset-size6.size2, .katex .katex-sizing.reset-size6.size2 { font-size: 0.6em; }
.katex .fontsize-ensurer.reset-size6.size3, .katex .katex-sizing.reset-size6.size3 { font-size: 0.7em; }
.katex .fontsize-ensurer.reset-size6.size4, .katex .katex-sizing.reset-size6.size4 { font-size: 0.8em; }
.katex .fontsize-ensurer.reset-size6.size5, .katex .katex-sizing.reset-size6.size5 { font-size: 0.9em; }
.katex .fontsize-ensurer.reset-size6.size6, .katex .katex-sizing.reset-size6.size6 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size6.size7, .katex .katex-sizing.reset-size6.size7 { font-size: 1.2em; }
.katex .fontsize-ensurer.reset-size6.size8, .katex .katex-sizing.reset-size6.size8 { font-size: 1.44em; }
.katex .fontsize-ensurer.reset-size6.size9, .katex .katex-sizing.reset-size6.size9 { font-size: 1.728em; }
.katex .fontsize-ensurer.reset-size6.size10, .katex .katex-sizing.reset-size6.size10 { font-size: 2.074em; }
.katex .fontsize-ensurer.reset-size6.size11, .katex .katex-sizing.reset-size6.size11 { font-size: 2.488em; }
.katex .fontsize-ensurer.reset-size7.size1, .katex .katex-sizing.reset-size7.size1 { font-size: 0.416667em; }
.katex .fontsize-ensurer.reset-size7.size2, .katex .katex-sizing.reset-size7.size2 { font-size: 0.5em; }
.katex .fontsize-ensurer.reset-size7.size3, .katex .katex-sizing.reset-size7.size3 { font-size: 0.583333em; }
.katex .fontsize-ensurer.reset-size7.size4, .katex .katex-sizing.reset-size7.size4 { font-size: 0.666667em; }
.katex .fontsize-ensurer.reset-size7.size5, .katex .katex-sizing.reset-size7.size5 { font-size: 0.75em; }
.katex .fontsize-ensurer.reset-size7.size6, .katex .katex-sizing.reset-size7.size6 { font-size: 0.833333em; }
.katex .fontsize-ensurer.reset-size7.size7, .katex .katex-sizing.reset-size7.size7 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size7.size8, .katex .katex-sizing.reset-size7.size8 { font-size: 1.2em; }
.katex .fontsize-ensurer.reset-size7.size9, .katex .katex-sizing.reset-size7.size9 { font-size: 1.44em; }
.katex .fontsize-ensurer.reset-size7.size10, .katex .katex-sizing.reset-size7.size10 { font-size: 1.72833em; }
.katex .fontsize-ensurer.reset-size7.size11, .katex .katex-sizing.reset-size7.size11 { font-size: 2.07333em; }
.katex .fontsize-ensurer.reset-size8.size1, .katex .katex-sizing.reset-size8.size1 { font-size: 0.347222em; }
.katex .fontsize-ensurer.reset-size8.size2, .katex .katex-sizing.reset-size8.size2 { font-size: 0.416667em; }
.katex .fontsize-ensurer.reset-size8.size3, .katex .katex-sizing.reset-size8.size3 { font-size: 0.486111em; }
.katex .fontsize-ensurer.reset-size8.size4, .katex .katex-sizing.reset-size8.size4 { font-size: 0.555556em; }
.katex .fontsize-ensurer.reset-size8.size5, .katex .katex-sizing.reset-size8.size5 { font-size: 0.625em; }
.katex .fontsize-ensurer.reset-size8.size6, .katex .katex-sizing.reset-size8.size6 { font-size: 0.694444em; }
.katex .fontsize-ensurer.reset-size8.size7, .katex .katex-sizing.reset-size8.size7 { font-size: 0.833333em; }
.katex .fontsize-ensurer.reset-size8.size8, .katex .katex-sizing.reset-size8.size8 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size8.size9, .katex .katex-sizing.reset-size8.size9 { font-size: 1.2em; }
.katex .fontsize-ensurer.reset-size8.size10, .katex .katex-sizing.reset-size8.size10 { font-size: 1.44028em; }
.katex .fontsize-ensurer.reset-size8.size11, .katex .katex-sizing.reset-size8.size11 { font-size: 1.72778em; }
.katex .fontsize-ensurer.reset-size9.size1, .katex .katex-sizing.reset-size9.size1 { font-size: 0.289352em; }
.katex .fontsize-ensurer.reset-size9.size2, .katex .katex-sizing.reset-size9.size2 { font-size: 0.347222em; }
.katex .fontsize-ensurer.reset-size9.size3, .katex .katex-sizing.reset-size9.size3 { font-size: 0.405093em; }
.katex .fontsize-ensurer.reset-size9.size4, .katex .katex-sizing.reset-size9.size4 { font-size: 0.462963em; }
.katex .fontsize-ensurer.reset-size9.size5, .katex .katex-sizing.reset-size9.size5 { font-size: 0.520833em; }
.katex .fontsize-ensurer.reset-size9.size6, .katex .katex-sizing.reset-size9.size6 { font-size: 0.578704em; }
.katex .fontsize-ensurer.reset-size9.size7, .katex .katex-sizing.reset-size9.size7 { font-size: 0.694444em; }
.katex .fontsize-ensurer.reset-size9.size8, .katex .katex-sizing.reset-size9.size8 { font-size: 0.833333em; }
.katex .fontsize-ensurer.reset-size9.size9, .katex .katex-sizing.reset-size9.size9 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size9.size10, .katex .katex-sizing.reset-size9.size10 { font-size: 1.20023em; }
.katex .fontsize-ensurer.reset-size9.size11, .katex .katex-sizing.reset-size9.size11 { font-size: 1.43981em; }
.katex .fontsize-ensurer.reset-size10.size1, .katex .katex-sizing.reset-size10.size1 { font-size: 0.24108em; }
.katex .fontsize-ensurer.reset-size10.size2, .katex .katex-sizing.reset-size10.size2 { font-size: 0.289296em; }
.katex .fontsize-ensurer.reset-size10.size3, .katex .katex-sizing.reset-size10.size3 { font-size: 0.337512em; }
.katex .fontsize-ensurer.reset-size10.size4, .katex .katex-sizing.reset-size10.size4 { font-size: 0.385728em; }
.katex .fontsize-ensurer.reset-size10.size5, .katex .katex-sizing.reset-size10.size5 { font-size: 0.433944em; }
.katex .fontsize-ensurer.reset-size10.size6, .katex .katex-sizing.reset-size10.size6 { font-size: 0.48216em; }
.katex .fontsize-ensurer.reset-size10.size7, .katex .katex-sizing.reset-size10.size7 { font-size: 0.578592em; }
.katex .fontsize-ensurer.reset-size10.size8, .katex .katex-sizing.reset-size10.size8 { font-size: 0.694311em; }
.katex .fontsize-ensurer.reset-size10.size9, .katex .katex-sizing.reset-size10.size9 { font-size: 0.833173em; }
.katex .fontsize-ensurer.reset-size10.size10, .katex .katex-sizing.reset-size10.size10 { font-size: 1em; }
.katex .fontsize-ensurer.reset-size10.size11, .katex .katex-sizing.reset-size10.size11 { font-size: 1.19961em; }
.katex .fontsize-ensurer.reset-size11.size1, .katex .katex-sizing.reset-size11.size1 { font-size: 0.200965em; }
.katex .fontsize-ensurer.reset-size11.size2, .katex .katex-sizing.reset-size11.size2 { font-size: 0.241158em; }
.katex .fontsize-ensurer.reset-size11.size3, .katex .katex-sizing.reset-size11.size3 { font-size: 0.28135em; }
.katex .fontsize-ensurer.reset-size11.size4, .katex .katex-sizing.reset-size11.size4 { font-size: 0.321543em; }
.katex .fontsize-ensurer.reset-size11.size5, .katex .katex-sizing.reset-size11.size5 { font-size: 0.361736em; }
.katex .fontsize-ensurer.reset-size11.size6, .katex .katex-sizing.reset-size11.size6 { font-size: 0.401929em; }
.katex .fontsize-ensurer.reset-size11.size7, .katex .katex-sizing.reset-size11.size7 { font-size: 0.482315em; }
.katex .fontsize-ensurer.reset-size11.size8, .katex .katex-sizing.reset-size11.size8 { font-size: 0.578778em; }
.katex .fontsize-ensurer.reset-size11.size9, .katex .katex-sizing.reset-size11.size9 { font-size: 0.694534em; }
.katex .fontsize-ensurer.reset-size11.size10, .katex .katex-sizing.reset-size11.size10 { font-size: 0.833601em; }
.katex .fontsize-ensurer.reset-size11.size11, .katex .katex-sizing.reset-size11.size11 { font-size: 1em; }
.katex .delimsizing.size1 { font-family: KaTeX_Size1; }
.katex .delimsizing.size2 { font-family: KaTeX_Size2; }
.katex .delimsizing.size3 { font-family: KaTeX_Size3; }
.katex .delimsizing.size4 { font-family: KaTeX_Size4; }
.katex .delimsizing.mult .delim-size1 > span { font-family: KaTeX_Size1; }
.katex .delimsizing.mult .delim-size4 > span { font-family: KaTeX_Size4; }
.katex .nulldelimiter { display: inline-block; width: 0.12em; }
.katex .delimcenter, .katex .op-symbol { position: relative; }
.katex .op-symbol.small-op { font-family: KaTeX_Size1; }
.katex .op-symbol.large-op { font-family: KaTeX_Size2; }
.katex .katex-accent > .vlist-t, .katex .op-limits > .vlist-t { text-align: center; }
.katex .katex-accent .accent-body { position: relative; }
.katex .katex-accent .accent-body:not(.accent-full) { width: 0px; }
.katex .katex-overlay { display: block; }
.katex .mtable .vertical-separator { display: inline-block; min-width: 1px; }
.katex .mtable .arraycolsep { display: inline-block; }
.katex .mtable .col-align-c > .vlist-t { text-align: center; }
.katex .mtable .col-align-l > .vlist-t { text-align: left; }
.katex .mtable .col-align-r > .vlist-t { text-align: right; }
.katex .svg-align { text-align: left; }
.katex svg { fill: currentcolor; stroke: currentcolor; display: block; height: inherit; position: absolute; width: 100%; }
.katex svg path { stroke: none; }
.katex svg { fill-rule: nonzero; fill-opacity: 1; stroke-width: 1; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-dashoffset: 0; stroke-opacity: 1; }
.katex img { border-style: none; max-height: none; max-width: none; min-height: 0px; min-width: 0px; }
.katex .katex-stretchy { display: block; overflow: hidden; position: relative; width: 100%; }
.katex .katex-stretchy::after, .katex .katex-stretchy::before { content: ""; }
.katex .hide-tail { overflow: hidden; position: relative; width: 100%; }
.katex .halfarrow-left { left: 0px; overflow: hidden; position: absolute; width: 50.2%; }
.katex .halfarrow-right { overflow: hidden; position: absolute; right: 0px; width: 50.2%; }
.katex .brace-left { left: 0px; overflow: hidden; position: absolute; width: 25.1%; }
.katex .brace-center { left: 25%; overflow: hidden; position: absolute; width: 50%; }
.katex .brace-right { overflow: hidden; position: absolute; right: 0px; width: 25.1%; }
.katex .x-arrow-pad { padding: 0px 0.5em; }
.katex .cd-arrow-pad { padding: 0px 0.55556em 0px 0.27778em; }
.katex .mover, .katex .munder, .katex .x-arrow { text-align: center; }
.katex .boxpad { padding: 0px 0.3em; }
.katex .fbox, .katex .fcolorbox { border: 0.04em solid; box-sizing: border-box; }
.katex .cancel-pad { padding: 0px 0.2em; }
.katex .cancel-lap { margin-left: -0.2em; margin-right: -0.2em; }
.katex .katex-sout { border-bottom-style: solid; border-bottom-width: 0.08em; }
.katex .angl { border-right: 0.049em solid; border-top: 0.049em solid; box-sizing: border-box; margin-right: 0.03889em; }
.katex .anglpad { padding: 0px 0.03889em; }
.katex .eqn-num::before { content: "(" counter(katexEqnNo) ")"; counter-increment: katexEqnNo 1; }
.katex .mml-eqn-num::before { content: "(" counter(mmlEqnNo) ")"; counter-increment: mmlEqnNo 1; }
.katex .mtr-glue { width: 50%; }
.katex .cd-vert-arrow { display: inline-block; position: relative; }
.katex .cd-label-left { display: inline-block; position: absolute; right: calc(50% + 0.3em); text-align: left; }
.katex .cd-label-right { display: inline-block; left: calc(50% + 0.3em); position: absolute; text-align: right; }
.katex-display { display: block; margin: 1em 0px; text-align: center; }
.katex-display > .katex { display: block; text-align: center; white-space: nowrap; }
.katex-display > .katex > .katex-html { display: block; position: relative; }
.katex-display > .katex > .katex-html > .katex-tag { position: absolute; right: 0px; }
.katex-display.leqno > .katex > .katex-html > .katex-tag { left: 0px; right: auto; }
.katex-display.fleqn > .katex { padding-left: 2em; text-align: left; }
body { counter-reset: katexEqnNo 0 mmlEqnNo 0; }
.dFGHfv { font-family: Georgia, "Times New Roman", serif; font-size: 1rem; line-height: 1.7; color: rgb(35, 38, 42); background: rgb(250, 248, 244); max-width: 42rem; margin-inline: auto; padding: 1.25rem; }
@media (min-width: 64rem) {
  .dFGHfv { max-width: 52rem; }
}
.dFGHfv .pd-book { margin-block: 1.25rem; counter-reset: chapter 0 equation 0; }
.dFGHfv .pd-chapter { margin-block: calc(2.5rem); scroll-margin-block-start: calc(0.625rem); }
.dFGHfv .pd-section { margin-block: 1.25rem; }
.dFGHfv .pd-paragraph { margin-block: 1.25rem; }
.dFGHfv .pa-item { margin-block: calc(0.3125rem); }
.dFGHfv .pd-title { font-size: calc(1.5rem); font-weight: bold; margin-block-end: 1.25rem; }
.dFGHfv .pd-heading { font-weight: bold; margin-block: 1.25rem 0px; }
.dFGHfv .pd-line { white-space: pre-wrap; }
.dFGHfv .pd-word { overflow-wrap: break-word; }
.dFGHfv .pd-canonical.pd-chapter { counter-increment: chapter 1; }
.dFGHfv .pd-canonical.pd-chapter:not(.pa-framed) { border-block-start: 1px solid color-mix(in srgb, rgb(35, 38, 42) 10%, rgb(250, 248, 244)); padding-block-start: 1.25rem; }
.dFGHfv .pd-chapter .pd-title::before { display: block; margin-block-end: calc(0.3125rem); }
.dFGHfv .pd-canonical.pd-chapter .pd-title::before { content: "Chapter " counter(chapter); }
.dFGHfv .pd-label, .dFGHfv .pd-chapter .pd-title::before { font-size: calc(0.7rem); font-weight: normal; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.65; }
.dFGHfv .pa-reference { color: rgb(91, 47, 42); text-decoration-color: rgb(91, 47, 42); text-underline-offset: 0.15em; }
.dFGHfv .pa-self-reference { color: inherit; text-decoration: none; }
.dFGHfv .pa-referent { scroll-margin-block-start: 1.25rem; }
.dFGHfv .pa-content { color: rgb(91, 47, 42); }
.dFGHfv .pd-running-head { font-size: calc(0.75rem); letter-spacing: 0.12em; text-transform: uppercase; padding-block-end: calc(0.625rem); border-block-end: 1px solid rgb(35, 38, 42); }
.dFGHfv .pd-byline { display: grid; grid-template-columns: max-content 1fr; gap: calc(0.3125rem) 1.25rem; align-items: baseline; margin-block: 1.25rem 0px; padding: calc(0.625rem) 1.25rem; background: color-mix(in srgb, rgb(35, 38, 42) 3%, rgb(250, 248, 244)); border: 1px solid color-mix(in srgb, rgb(35, 38, 42) 10%, rgb(250, 248, 244)); border-block-start: 3px solid rgb(91, 47, 42); }
.dFGHfv .pd-figure { max-width: 100%; }
.dFGHfv .pd-code { font-family: ui-monospace, monospace; font-size: calc(0.9rem); line-height: 1.5; white-space: pre; overflow-x: auto; margin-block: 1.25rem; padding: calc(0.9375rem) 1.25rem; background: color-mix(in srgb, rgb(35, 38, 42) 4%, rgb(250, 248, 244)); border-inline-start: 2px solid color-mix(in srgb, rgb(35, 38, 42) 25%, rgb(250, 248, 244)); }
.dFGHfv .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
.dFGHfv .pd-image img, .dFGHfv .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: 1.25rem; }
.dFGHfv .pd-math, .dFGHfv .pd-date { white-space: nowrap; }
.dFGHfv .pd-equation { position: relative; counter-increment: equation 1; }
.dFGHfv .pd-equation::after { content: "(" counter(equation) ")"; position: absolute; inset-inline-end: 0px; top: 50%; transform: translateY(-50%); }
data-styled.g18[id="sc-hBMXrk"] { content: "dFGHfv,"; }
.dpA-Ddh .pd-chapter.pa-cover { margin-block: 0px; }
.dpA-Ddh .pd-chapter.pa-cover:not(.pa-framed) { margin-block-end: calc(1.875rem); padding: calc(0.9375rem) 1.25rem; background: color-mix(in srgb, rgb(35, 38, 42) 3%, rgb(250, 248, 244)); border: 1px solid color-mix(in srgb, rgb(35, 38, 42) 10%, rgb(250, 248, 244)); border-block-start: 0px; scroll-margin-block-start: calc(2.1875rem); }
.dpA-Ddh .pa-cover .pd-title { margin-block: 0px calc(0.625rem); font-size: calc(2rem); }
.dpA-Ddh .pa-cover .pd-title::before { content: "Cover"; }
.dpA-Ddh .pa-biography .pd-title::before { content: "Biography"; }
.dpA-Ddh .pa-autobiography .pd-title::before { content: "Autobiography"; }
data-styled.g20[id="sc-fFSRQT"] { content: "dpA-Ddh,"; }
.bZLJFU .pd-chapter.pa-synopsis { margin-block: calc(1.875rem); padding-inline-start: 1.25rem; border-inline-start: 2px solid rgb(91, 47, 42); }
.bZLJFU .pa-synopsis .pd-paragraph { font-style: italic; }
.bZLJFU .pa-synopsis .pd-title::before { content: "Synopsis"; }
data-styled.g21[id="sc-bkbknG"] { content: "bZLJFU,"; }
.dNBEZA .pd-chapter.pa-table-of-contents { margin-block: 0px; }
.dNBEZA .pd-chapter.pa-table-of-contents:not(.pa-framed) { margin-block: calc(1.875rem); padding: calc(0.9375rem) 1.25rem; border: 1px solid color-mix(in srgb, rgb(35, 38, 42) 10%, rgb(250, 248, 244)); scroll-margin-block-start: calc(2.1875rem); }
.dNBEZA .pa-table-of-contents .pd-paragraph { margin-block: calc(0.3125rem); }
.dNBEZA .pa-table-of-contents .pd-title::before { content: "Table of Contents"; }
.dNBEZA .pa-table-of-contents .pd-heading { font-size: calc(0.7rem); font-weight: normal; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.65; }
data-styled.g23[id="sc-dIvsxA"] { content: "dNBEZA,"; }
.tFljl .pa-table { display: grid; grid-auto-columns: minmax(0px, 1fr); }
.tFljl .pa-table > .pd-heading, .tFljl .pa-table > .pa-self-reference { grid-column: 1 / -1; }
.tFljl .pa-row, .tFljl .pa-row > .pa-reference { display: contents; }
.tFljl .pa-col-start-1 { grid-column-start: 1; }
.tFljl .pa-col-span-1 { grid-column-end: span 1; }
.tFljl .pa-col-start-2 { grid-column-start: 2; }
.tFljl .pa-col-span-2 { grid-column-end: span 2; }
.tFljl .pa-col-start-3 { grid-column-start: 3; }
.tFljl .pa-col-span-3 { grid-column-end: span 3; }
.tFljl .pa-col-start-4 { grid-column-start: 4; }
.tFljl .pa-col-span-4 { grid-column-end: span 4; }
.tFljl .pa-col-start-5 { grid-column-start: 5; }
.tFljl .pa-col-span-5 { grid-column-end: span 5; }
.tFljl .pa-col-start-6 { grid-column-start: 6; }
.tFljl .pa-col-span-6 { grid-column-end: span 6; }
.tFljl .pa-col-start-7 { grid-column-start: 7; }
.tFljl .pa-col-span-7 { grid-column-end: span 7; }
.tFljl .pa-col-start-8 { grid-column-start: 8; }
.tFljl .pa-col-span-8 { grid-column-end: span 8; }
.tFljl .pa-col-start-9 { grid-column-start: 9; }
.tFljl .pa-col-span-9 { grid-column-end: span 9; }
.tFljl .pa-col-start-10 { grid-column-start: 10; }
.tFljl .pa-col-span-10 { grid-column-end: span 10; }
.tFljl .pa-col-start-11 { grid-column-start: 11; }
.tFljl .pa-col-span-11 { grid-column-end: span 11; }
.tFljl .pa-col-start-12 { grid-column-start: 12; }
.tFljl .pa-col-span-12 { grid-column-end: span 12; }
data-styled.g24[id="sc-hHEhmb"] { content: "tFljl,"; }
.cdjgPg .pa-table { gap: calc(0.625rem) 1.25rem; }
.cdjgPg .pa-table .pd-paragraph { margin-block: 0px; }
.cdjgPg .pa-col { padding-block: calc(0.416667rem); border-block-end: 1px solid color-mix(in srgb, rgb(35, 38, 42) 7%, rgb(250, 248, 244)); }
data-styled.g25[id="sc-dlMzIO"] { content: "cdjgPg,"; }
.pa-arriving .pd-pages { visibility: hidden; }
.dFGHfv { font-family: Georgia, "Times New Roman", serif; font-size: 1rem; line-height: 1.7; color: rgb(35, 38, 42); background: rgb(250, 248, 244); max-width: 42rem; margin-inline: auto; padding: 1.25rem; }
@media (min-width: 64rem) {
  .dFGHfv { max-width: 52rem; }
}
.dFGHfv .pd-book { margin-block: 1.25rem; counter-reset: chapter 0 equation 0; }
.dFGHfv .pd-chapter { margin-block: calc(2.5rem); scroll-margin-block-start: calc(0.625rem); }
.dFGHfv .pd-section { margin-block: 1.25rem; }
.dFGHfv .pd-paragraph { margin-block: 1.25rem; }
.dFGHfv .pa-item { margin-block: calc(0.3125rem); }
.dFGHfv .pd-title { font-size: calc(1.5rem); font-weight: bold; margin-block-end: 1.25rem; }
.dFGHfv .pd-heading { font-weight: bold; margin-block: 1.25rem 0px; }
.dFGHfv .pd-line { white-space: pre-wrap; }
.dFGHfv .pd-word { overflow-wrap: break-word; }
.dFGHfv .pd-canonical.pd-chapter { counter-increment: chapter 1; }
.dFGHfv .pd-canonical.pd-chapter:not(.pa-framed) { border-block-start: 1px solid color-mix(in srgb, rgb(35, 38, 42) 10%, rgb(250, 248, 244)); padding-block-start: 1.25rem; }
.dFGHfv .pd-chapter .pd-title::before { display: block; margin-block-end: calc(0.3125rem); }
.dFGHfv .pd-canonical.pd-chapter .pd-title::before { content: "Chapter " counter(chapter); }
.dFGHfv .pd-label, .dFGHfv .pd-chapter .pd-title::before { font-size: calc(0.7rem); font-weight: normal; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.65; }
.dFGHfv .pa-reference { color: rgb(91, 47, 42); text-decoration-color: rgb(91, 47, 42); text-underline-offset: 0.15em; }
.dFGHfv .pa-self-reference { color: inherit; text-decoration: none; }
.dFGHfv .pa-referent { scroll-margin-block-start: 1.25rem; }
.dFGHfv .pa-content { color: rgb(91, 47, 42); }
.dFGHfv .pd-running-head { font-size: calc(0.75rem); letter-spacing: 0.12em; text-transform: uppercase; padding-block-end: calc(0.625rem); border-block-end: 1px solid rgb(35, 38, 42); }
.dFGHfv .pd-byline { display: grid; grid-template-columns: max-content 1fr; gap: calc(0.3125rem) 1.25rem; align-items: baseline; margin-block: 1.25rem 0px; padding: calc(0.625rem) 1.25rem; background: color-mix(in srgb, rgb(35, 38, 42) 3%, rgb(250, 248, 244)); border: 1px solid color-mix(in srgb, rgb(35, 38, 42) 10%, rgb(250, 248, 244)); border-block-start: 3px solid rgb(91, 47, 42); }
.dFGHfv .pd-figure { max-width: 100%; }
.dFGHfv .pd-code { font-family: ui-monospace, monospace; font-size: calc(0.9rem); line-height: 1.5; white-space: pre; overflow-x: auto; margin-block: 1.25rem; padding: calc(0.9375rem) 1.25rem; background: color-mix(in srgb, rgb(35, 38, 42) 4%, rgb(250, 248, 244)); border-inline-start: 2px solid color-mix(in srgb, rgb(35, 38, 42) 25%, rgb(250, 248, 244)); }
.dFGHfv .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
.dFGHfv .pd-image img, .dFGHfv .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: 1.25rem; }
.dFGHfv .pd-math, .dFGHfv .pd-date { white-space: nowrap; }
.dFGHfv .pd-equation { position: relative; counter-increment: equation 1; }
.dFGHfv .pd-equation::after { content: "(" counter(equation) ")"; position: absolute; inset-inline-end: 0px; top: 50%; transform: translateY(-50%); }
.dpA-Ddh .pd-chapter.pa-cover { margin-block: 0px; }
.dpA-Ddh .pd-chapter.pa-cover:not(.pa-framed) { margin-block-end: calc(1.875rem); padding: calc(0.9375rem) 1.25rem; background: color-mix(in srgb, rgb(35, 38, 42) 3%, rgb(250, 248, 244)); border: 1px solid color-mix(in srgb, rgb(35, 38, 42) 10%, rgb(250, 248, 244)); border-block-start: 0px; scroll-margin-block-start: calc(2.1875rem); }
.dpA-Ddh .pa-cover .pd-title { margin-block: 0px calc(0.625rem); font-size: calc(2rem); }
.dpA-Ddh .pa-cover .pd-title::before { content: "Cover"; }
.dpA-Ddh .pa-biography .pd-title::before { content: "Biography"; }
.dpA-Ddh .pa-autobiography .pd-title::before { content: "Autobiography"; }
.bZLJFU .pd-chapter.pa-synopsis { margin-block: calc(1.875rem); padding-inline-start: 1.25rem; border-inline-start: 2px solid rgb(91, 47, 42); }
.bZLJFU .pa-synopsis .pd-paragraph { font-style: italic; }
.bZLJFU .pa-synopsis .pd-title::before { content: "Synopsis"; }
.dNBEZA .pd-chapter.pa-table-of-contents { margin-block: 0px; }
.dNBEZA .pd-chapter.pa-table-of-contents:not(.pa-framed) { margin-block: calc(1.875rem); padding: calc(0.9375rem) 1.25rem; border: 1px solid color-mix(in srgb, rgb(35, 38, 42) 10%, rgb(250, 248, 244)); scroll-margin-block-start: calc(2.1875rem); }
.dNBEZA .pa-table-of-contents .pd-paragraph { margin-block: calc(0.3125rem); }
.dNBEZA .pa-table-of-contents .pd-title::before { content: "Table of Contents"; }
.dNBEZA .pa-table-of-contents .pd-heading { font-size: calc(0.7rem); font-weight: normal; letter-spacing: 0.15em; text-transform: uppercase; opacity: 0.65; }
.tFljl .pa-table { display: grid; grid-auto-columns: minmax(0px, 1fr); }
.tFljl .pa-table > .pd-heading, .tFljl .pa-table > .pa-self-reference { grid-column: 1 / -1; }
.tFljl .pa-row, .tFljl .pa-row > .pa-reference { display: contents; }
.tFljl .pa-col-start-1 { grid-column-start: 1; }
.tFljl .pa-col-span-1 { grid-column-end: span 1; }
.tFljl .pa-col-start-2 { grid-column-start: 2; }
.tFljl .pa-col-span-2 { grid-column-end: span 2; }
.tFljl .pa-col-start-3 { grid-column-start: 3; }
.tFljl .pa-col-span-3 { grid-column-end: span 3; }
.tFljl .pa-col-start-4 { grid-column-start: 4; }
.tFljl .pa-col-span-4 { grid-column-end: span 4; }
.tFljl .pa-col-start-5 { grid-column-start: 5; }
.tFljl .pa-col-span-5 { grid-column-end: span 5; }
.tFljl .pa-col-start-6 { grid-column-start: 6; }
.tFljl .pa-col-span-6 { grid-column-end: span 6; }
.tFljl .pa-col-start-7 { grid-column-start: 7; }
.tFljl .pa-col-span-7 { grid-column-end: span 7; }
.tFljl .pa-col-start-8 { grid-column-start: 8; }
.tFljl .pa-col-span-8 { grid-column-end: span 8; }
.tFljl .pa-col-start-9 { grid-column-start: 9; }
.tFljl .pa-col-span-9 { grid-column-end: span 9; }
.tFljl .pa-col-start-10 { grid-column-start: 10; }
.tFljl .pa-col-span-10 { grid-column-end: span 10; }
.tFljl .pa-col-start-11 { grid-column-start: 11; }
.tFljl .pa-col-span-11 { grid-column-end: span 11; }
.tFljl .pa-col-start-12 { grid-column-start: 12; }
.tFljl .pa-col-span-12 { grid-column-end: span 12; }
.cdjgPg .pa-table { gap: calc(0.625rem) 1.25rem; }
.cdjgPg .pa-table .pd-paragraph { margin-block: 0px; }
.cdjgPg .pa-col { padding-block: calc(0.416667rem); border-block-end: 1px solid color-mix(in srgb, rgb(35, 38, 42) 7%, rgb(250, 248, 244)); }</style><style>
/* Sketch 001, the top page of the public library, three forms on a switch. Nothing here is a design; each form is a
   question asked of the bound print. */
.sk-switches { position: fixed; right: 16px; bottom: 16px; z-index: 9; display: flex; gap: 6px; padding: 8px 10px; background: #fff; border: 1px solid #e4e9f2; border-radius: 8px; box-shadow: 0 2px 10px rgba(11, 11, 11, .08); font: 500 12px/1 Inter, system-ui, sans-serif; color: #727d8c; }
.sk-switches b { color: #0b0b0b; font-weight: 600; margin-right: 4px; }
.sk-switches button { border: 1px solid #e4e9f2; background: #fff; color: #1a1f36; border-radius: 999px; padding: 5px 10px; cursor: pointer; font: inherit; }
.sk-switches button[aria-pressed="true"] { background: #1a1f36; color: #fff; border-color: #1a1f36; }

/* b: a front. The masthead and the byline as one line, the cover as the name, the synopsis as a standfirst, the
   catalogue as three shelves side by side, the chapter below. */
body[data-form="b"] .pd-book { max-width: 64rem; margin-inline: auto; }
body[data-form="b"] .pd-running-head { border: 0; padding: 0; font-size: .7rem; opacity: .6; }
body[data-form="b"] .pd-byline { background: none; border: 0; padding: 0; margin: 0; display: flex; gap: 1.5rem; font-size: .85rem; }
body[data-form="b"] .pd-chapter.pa-cover, body[data-form="b"] .pd-chapter.pa-cover:not(.pa-framed) { background: none; border: 0; padding: 0; margin: 2.5rem 0 1rem; }
body[data-form="b"] .pa-cover .pd-title { font-size: 3.2rem; line-height: 1.05; letter-spacing: -.01em; }
body[data-form="b"] .pa-cover .pd-title::before { content: none; }
body[data-form="b"] .pd-chapter.pa-synopsis { border: 0; padding: 0; margin: 0 0 2.5rem; max-width: 42rem; }
body[data-form="b"] .pa-synopsis .pd-paragraph { font-style: normal; font-size: 1.15rem; line-height: 1.55; }
body[data-form="b"] .pa-synopsis .pd-title { display: none; }
body[data-form="b"] .pd-chapter.pa-table-of-contents, body[data-form="b"] .pd-chapter.pa-table-of-contents:not(.pa-framed) { border: 0; padding: 0; margin: 0 0 3rem; }
body[data-form="b"] .pa-table-of-contents > .pd-section:not(.pa-table) { display: none; }
body[data-form="b"] .pa-table-of-contents .pa-table .pd-heading { margin: 0 0 .75rem; }
body[data-form="b"] .pa-table-of-contents .pa-table { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
body[data-form="b"] .pa-table-of-contents .pa-table .pd-heading { grid-column: 1 / -1; }
body[data-form="b"] .pa-table .pd-paragraph.pa-row.pa-row-start-1 { display: none; }
body[data-form="b"] .pa-table .pd-paragraph.pa-row { display: flex; flex-direction: column; gap: .35rem; padding: 1rem 1.1rem 1.1rem; border: 1px solid color-mix(in srgb, #23262a 12%, #faf8f4); border-radius: 6px; background: #fff; min-height: 7rem; }
body[data-form="b"] .pa-table .pa-row .pa-col { padding: 0; border: 0; }
body[data-form="b"] .pa-table .pa-row .pa-col-start-1 { font-size: 1.2rem; font-weight: 600; }
body[data-form="b"] .pa-table .pa-row .pa-col-start-2 { font-size: .95rem; opacity: .8; }
body[data-form="b"] .pd-chapter.pd-canonical:not(.pa-framed) { border-top: 1px solid color-mix(in srgb, #23262a 10%, #faf8f4); }

/* c: the subjects first. The catalogue stands above the synopsis, two columns, and the cover is small. */
body[data-form="c"] .pd-book { display: flex; flex-direction: column; max-width: 52rem; margin-inline: auto; }
body[data-form="c"] .pd-running-head { order: 1; }
body[data-form="c"] .pd-byline { order: 2; }
body[data-form="c"] .pd-chapter.pa-cover { order: 3; }
body[data-form="c"] .pd-chapter.pa-table-of-contents { order: 4; }
body[data-form="c"] .pd-chapter.pa-synopsis { order: 5; }
body[data-form="c"] .pd-chapter.pd-canonical { order: 6; }
body[data-form="c"] .pa-cover .pd-title { font-size: 1.6rem; }
body[data-form="c"] .pa-table-of-contents > .pd-section:not(.pa-table) { display: none; }
body[data-form="c"] .pa-table-of-contents .pa-table { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem 1.5rem; }
body[data-form="c"] .pa-table-of-contents .pa-table .pd-heading { grid-column: 1 / -1; }
body[data-form="c"] .pa-table .pd-paragraph.pa-row.pa-row-start-1 { display: none; }
body[data-form="c"] .pa-table .pd-paragraph.pa-row { display: block; padding: .5rem 0; border-bottom: 1px solid color-mix(in srgb, #23262a 10%, #faf8f4); }
body[data-form="c"] .pa-table .pa-row .pa-col { display: block; padding: 0; border: 0; }
body[data-form="c"] .pa-table .pa-row .pa-col-start-1 { font-weight: 600; }
body[data-form="c"] .pa-table .pa-row .pa-col-start-2 { font-size: .9rem; opacity: .8; }

@media (max-width: 640px) {
    body[data-form="b"] .pa-table-of-contents .pa-table { grid-template-columns: 1fr; }
    body[data-form="b"] .pa-cover .pd-title { font-size: 2.2rem; }
    body[data-form="c"] .pa-table-of-contents .pa-table { grid-template-columns: 1fr; }
}

</style>
</head>
  <body>
    <div id="root"><!--$--><div class="sc-hBMXrk dFGHfv pd-container"><div class="pd-book"><div class="pd-paragraph pd-running-head"><span class="pd-word">Inexplicable Phenomena</span>: <a href="http://localhost:4343/inexplicable-phenomena/inexplicable-phenomena/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Table of Contents</span></a></div><div class="pd-paragraph pd-byline"><span class="pd-word pd-label">Author</span> <a href="http://localhost:4343/inexplicable-phenomena/the-team/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Team</span></a><span class="pd-word pd-label">Filed under</span> <a href="http://localhost:4343/inexplicable-phenomena/inexplicable-phenomena/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Libraries</span></a></div><header class="sc-fFSRQT dpA-Ddh pd-container"><div class="pd-chapter pa-cover"><a href="http://localhost:4343/inexplicable-phenomena/inexplicable-phenomena/" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="inexplicable-phenomena" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">Inexplicable Phenomena</div></a></div></header><div class="sc-bkbknG bZLJFU pd-container"><div class="pd-chapter pa-synopsis"><a href="http://localhost:4343/inexplicable-phenomena/inexplicable-phenomena/" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span id="synopsis" class="pd-sentence pd-title pa-parenthetical pa-reference pa-self-reference pa-referent" hidden=""></span></a><div class="pd-paragraph">The library of inexplicable phenomena: the one book here filed under its own subject, which is what makes it the top of the library, and under it the team that works on these phenomena, the subjects their work falls into, and the manual the library is built with. A book here is a project or a catalogue of projects.</div></div></div><nav class="sc-dIvsxA dNBEZA pd-container"><div class="pd-chapter pa-table-of-contents"><a href="http://localhost:4343/inexplicable-phenomena/inexplicable-phenomena/#table-of-contents" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span id="table-of-contents" class="pd-sentence pd-title pa-parenthetical pa-reference pa-self-reference pa-referent" hidden=""></span></a><div class="pd-section"><a href="#contents" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="contents" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">Contents</div></a><a href="http://localhost:4343/inexplicable-phenomena/inexplicable-phenomena/#what-this-library-is" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">What This Library Is</span></div></a><span class="pd-paragraph pa-parenthetical" hidden=""></span></div><div class="sc-hHEhmb sc-dlMzIO tFljl cdjgPg pd-container"><div class="pd-section pa-table"><a href="#the-catalogue" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-catalogue" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The Catalogue</div></a><div class="pd-paragraph pa-row pa-row-start-1"><span class="pd-word pa-col pa-col-start-1">Book</span> <span class="pd-word pa-col pa-col-start-2">What it is</span></div><div class="pd-paragraph pa-row pa-row-start-2"><a href="http://localhost:4343/inexplicable-phenomena/the-team/" class="sc-dIrNh pa-reference pd-container"><span class="pd-word pa-col pa-col-start-1 pa-reference"><span class="sc-bqGEVu pa-content">The Team</span></span></a> <a href="http://localhost:4343/inexplicable-phenomena/the-team/#synopsis" class="sc-dIrNh pa-reference pd-container"><span class="pd-word pa-col pa-col-start-2 pa-reference"><span class="sc-bqGEVu pa-content">the people who work on inexplicable phenomena, in their own account</span></span></a></div><div class="pd-paragraph pa-row pa-row-start-3"><a href="http://localhost:4343/inexplicable-phenomena/mathematics/" class="sc-dIrNh pa-reference pd-container"><span class="pd-word pa-col pa-col-start-1 pa-reference"><span class="sc-bqGEVu pa-content">Mathematics</span></span></a> <a href="http://localhost:4343/inexplicable-phenomena/mathematics/#synopsis" class="sc-dIrNh pa-reference pd-container"><span class="pd-word pa-col pa-col-start-2 pa-reference"><span class="sc-bqGEVu pa-content">a subject of many books, each a project or a catalogue of them</span></span></a></div><div class="pd-paragraph pa-row pa-row-start-4"><a href="http://localhost:4343/inexplicable-phenomena/the-manual/" class="sc-dIrNh pa-reference pd-container"><span class="pd-word pa-col pa-col-start-1 pa-reference"><span class="sc-bqGEVu pa-content">The Manual</span></span></a> <a href="http://localhost:4343/inexplicable-phenomena/the-manual/#synopsis" class="sc-dIrNh pa-reference pd-container"><span class="pd-word pa-col pa-col-start-2 pa-reference"><span class="sc-bqGEVu pa-content">the least the library needs to bind</span></span></a></div><div class="pd-paragraph pa-row pa-row-start-5"><a href="http://localhost:4343/inexplicable-phenomena/the-design/" class="sc-dIrNh pa-reference pd-container"><span class="pd-word pa-col pa-col-start-1 pa-reference"><span class="sc-bqGEVu pa-content">The Design</span></span></a> <a href="http://localhost:4343/inexplicable-phenomena/the-design/#synopsis" class="sc-dIrNh pa-reference pd-container"><span class="pd-word pa-col pa-col-start-2 pa-reference"><span class="sc-bqGEVu pa-content">sketches of how the library might look, committed to nothing</span></span></a></div></div></div></div></nav><div class="pd-chapter pd-canonical"><a href="http://localhost:4343/inexplicable-phenomena/inexplicable-phenomena/#what-this-library-is" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="what-this-library-is" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">What This Library Is</div></a><div class="pd-section"><a href="#the-phenomena" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-phenomena" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The phenomena</div></a><div class="pd-paragraph">This library is about the hard problem of consciousness, the one self-evident and inexplicable phenomenon, and about the inexplicable phenomena that stand beside it in other fields. It is the public library of the repository that bears its name, bound from its source and published as it stands.</div></div><div class="pd-section"><a href="#what-stands-here" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="what-stands-here" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">What stands here</div></a><div class="pd-paragraph">A book here is a project, or a catalogue of projects. The people who work on these phenomena keep their own account in <a href="http://localhost:4343/inexplicable-phenomena/the-team/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Team</span></a>, and whoever stands in it may author. The subjects their work falls into are catalogues, <a href="http://localhost:4343/inexplicable-phenomena/mathematics/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Mathematics</span></a> the first, each to hold many books. The library is built with <a href="http://localhost:4343/inexplicable-phenomena/the-manual/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Manual</span></a>, the least it needs to bind, and its look is being sketched rather than settled.</div></div></div></div></div><!--/$--></div>
  

<script>
// The switch between the forms of sketch 001, remembered in the address's hash so a photograph can ask for one.
(() => {
    const forms = { a: 'as bound', b: 'a front', c: 'the subjects first' };
    const bar = document.createElement('div');
    bar.className = 'sk-switches';
    const label = document.createElement('b');
    label.textContent = 'form';
    bar.appendChild(label);
    const buttons = {};
    const choose = form => {
        document.body.dataset.form = form;
        for (const [key, button] of Object.entries(buttons)) button.setAttribute('aria-pressed', String(key === form));
        if (location.hash !== \`#\${form}\`) history.replaceState(null, '', \`#\${form}\`);
    };
    for (const [key, name] of Object.entries(forms)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = \`\${key} \${name}\`;
        button.addEventListener('click', () => choose(key));
        buttons[key] = button;
        bar.appendChild(button);
    }
    document.body.appendChild(bar);
    choose(forms[location.hash.slice(1)] ? location.hash.slice(1) : 'a');
    window.addEventListener('hashchange', () => { if (forms[location.hash.slice(1)]) choose(location.hash.slice(1)); });
})();

<\/script>
</body></html>`})]}),"TheTopPage1"),oe=p(()=>n(x,{children:[e(y,{children:"[The Manual's Page](/inexplicable-phenomena/the-design/#the-manuals-page)"}),n(c,{children:[e(h,{children:"The listing, five forms of the manual's page"}),n(a,{children:["The first sketch of the manual's page asks how a chapter of ",e(j,{children:"[Our Reference](/inexplicable-phenomena/our-reference/)"})," shows the file beside it, the code that is the part the chapter specifies, now that the manual is written as a specification. The listing itself is to look as it does in my own library's manual, measured off it on 17 November 2026: JetBrains Mono at twelve pixels on a line of twenty, the ink pale on a night of deep teal, the keywords sky, the strings amber, the names mint, the comments dimmed, the numbers in a column of brass, and that manual's light palette behind a switch. The container is this page's own, the editor's bar speaking in the page's label voice. The page is snapshotted off 4343's print of ",e(j,{children:"[The Faces](/inexplicable-phenomena/our-reference/#the-faces)"}),", its sheets inlined and its scripts stripped, and appended to this chapter with its forms on a switch, each form named for what it is since I asked for semantic names the same day; a form is a question, not a design. The forms: the plate, the editor standing in the chapter where the code figure stands today, at the measure, capped at seven tenths of the window and scrolling within, with light, wrap and lines on its bar and a full screen that takes the window; the back, the chapter's words alone on its front and the file on its back, flipped by the square at the title's right that ",e(j,{children:"[The Content](/inexplicable-phenomena/our-reference/#the-content)"})," flips with, the title turning into the file's own name in the editor's face as the content's title turns into its literal; the spread, my library's container on this paper, the words at the window's left and the editor beside them to its edge, the height of the window; and on the table's page, the foot, a section at the bottom of the contents in the smaller voice, one row a file under the chapter it stands beside, and under the chapters, each file a press under its chapter's row with the file's mark."]}),e(a,{children:"What the sketch found on its first runs: the plate stood below the fold in every photograph until the switch learned to scroll to it, as a reader arriving at the code would; the spread gridded the pagination's container instead of the theme's and left the words centred, until the sheet was named by its place under the root; the figure on the print carries its highlighting already, 2,315 spans, and no line numbers, since the manual never asked for them, so the sketch numbers the lines as the code figure would; a chapter with two files beside it, The Paper's code and its preview tool, shows one tab, since only the code is a figure on the page; and on the phone the bar's four words wrap to a second line. My word on it, the same day: the sketch is too linear; try full screen without breaking the feel; keep the paper yet have something more like mine without going into the web app. Nothing here moved into the manual."})]}),n(c,{children:[e(h,{children:"The photographs of the listing"}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-plate-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-plate-light-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-plate-full-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-back-front-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-back-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-spread-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-foot-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-under-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-plate-phone.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~listing-back-phone.png"})})]}),n(c,{children:[e(h,{children:"The opening, the two modes of the manual"}),e(a,{children:"The second sketch follows my answer to the first, the same day: a full screen versus a page mode for the reference manual, as the code has, so it can be book-like and editor-like, and as an editor it still needs to feel bookish and paperly; and the appendix is a special part of a book, written with the reference manual's components, that refers to the code specific to the book. The same print, with the modes on the editor's bar where the listing's full screen stood, the one in force pressed. The forms: the page, the book-like mode, the chapter as bound with the plate at its foot; the opening, the editor-like mode, the book open flat across the window, the chapter's words on the left page with the running head and the chapter's line as they are, and on the right a page of its own, a running head naming the file beside the chapter and the editor under it the height of the page; the leaf, the file as a page of the book alone, the running head over it and the chapter's line turned into the file's name, the editor across the window beneath; and on the table's page, the foot, the appendix as a part of the book at the bottom of the contents in the smaller voice, its chapters as rows and each file a press beneath its chapter. The opening and the leaf take the light palette behind the bar's switch, paper on both pages then."}),e(a,{children:"What the sketch found on its first runs: the leaf's running head, cloned outside the theme's own container, lost every rule the theme gives it and showed both of its titles at once, until the leaf's page was stood inside the sheet where the page's rules reach; the left page keeps the measure centred in its half of the window, so the words sit where a page's words sit; and the first drawing gave the two pages a gutter's shadow and the editor a drop shadow, which my word struck the same day: look at the other pages, not bookish with shading, paperish as in unfinished, the white paper and the editor with its options being the breathtaking contrast. My other answers: the appendix can be another part of the table, since it is kind of different; the editor view uses the table as the file tree; and the word recto goes as unclear. Nothing here moved into the manual."})]}),n(c,{children:[e(h,{children:"The photographs of the opening"}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~opening-page-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~opening-opening-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~opening-opening-light-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~opening-leaf-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~opening-leaf-light-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~opening-foot-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~opening-page-phone.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~opening-opening-phone.png"})})]}),n(c,{children:[e(h,{children:"The editor, the table as the tree"}),e(a,{children:"The third sketch follows my answers to the second, the same day, and the aesthetic of the library's other pages, captured off 4343: white, Georgia, one hairline under the running head, the teal on the head and the links alone, and the cover's board the one thing on any page with a shadow. So every shadow is struck from the three sketches, and the editor view is three columns of one sheet: the contents down the left in the page's own voice, every chapter a row and every file beneath its chapter with the file's mark, the open chapter marked by a hairline of the teal; the chapter's words beside them at a narrower measure; and the file's page at the right under a running head naming it, the editor the height of the window beneath. The modes on the editor's bar: words, which puts the words away so the tree and the file stand alone, as my library's words tab does; the page; and the editor. The forms: the editor, the editor with the words away, the page as bound with the plate, and the foot, the appendix as a part at the bottom of the table; the light palette behind the bar's switch as before."}),e(a,{children:"What the sketch found on its first runs: the editor's bar cannot shrink below its words, so the bar and the pane under it stretched past the editor's edge and the page past the window, measured at 578 in an editor 525 wide, until the editor's one column was told to shrink and the bar to wrap; at the desk's width the bar then wraps to two rows in the three-column view and stays on one in the opening; the file's page takes a little more of the window than the words, the tree thirteen rems and the words at most thirty-six, so a line of code has 570 pixels before it scrolls. Nothing here moved into the manual."})]}),n(c,{children:[e(h,{children:"The photographs of the editor"}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~editor-editor-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~editor-light-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~editor-code-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~editor-page-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~editor-foot-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/2-the-manuals-page~editor-editor-phone.png"})})]}),e(w,{identifier:"listing",type:".html",children:`<!doctype html>
<html lang="en" class=""><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Reference, the listing</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Crect width='28' height='28' fill='%23faf8f4'/%3E%3Ccircle cx='14' cy='14' r='8' fill='none' stroke='%2323262a' stroke-width='2'/%3E%3C/svg%3E">
    
    
    <style data-inlined="/inexplicable-phenomena/assets/index-CaH6IAI_.css">@font-face{font-display:block;font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-DMm9YOAa.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-DRggAlZN.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Caligraphic;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Caligraphic;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Fraktur;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Fraktur;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-CB_wures.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-Cx986IdX.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-Jm3AIy58.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-waoOVXN0.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:italic;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-BMLOBm91.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-3WenGoN9.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-B22Nviop.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-Dr94JaBh.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-ypZvNtVU.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Math;font-style:italic;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Math;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-t53AETM-.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-DA0__PXp.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-flOr_0UB.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Script;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-D3wIWfF6.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-D5yQViql.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-C5JkGWo-.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size1;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-C195tn64.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size2;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-oD1tc_U0.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(data:font/woff2;base64,d09GMgABAAAAAA4oAA4AAAAAHbQAAA3TAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAAgRQIDgmcDBEICo1oijYBNgIkA14LMgAEIAWJAAeBHAyBHBvbGiMRdnO0IkRRkiYDgr9KsJ1NUAf2kILNxgUmgqIgq1P89vcbIcmsQbRps3vCcXdYOKSWEPEKgZgQkprQQsxIXUgq0DqpGKmIvrgkeVGtEQD9DzAO29fM9jYhxZEsL2FeURH2JN4MIcTdO049NCVdxQ/w9NrSYFEBKTDKpLKfNkCGDc1RwjZLQcm3vqJ2UW9Xfa3tgAHz6ivp6vgC2yD4/6352ndnN0X0TL7seypkjZlMsjmZnf0Mm5Q+JykRWQBKCVCVPbARPXWyQtb5VgLB6Biq7/Uixcj2WGqdI8tGSgkuRG+t910GKP2D7AQH0DB9FMDW/obJZ8giFI3Wg8Cvevz0M+5m0rTh7XDBlvo9Y4vm13EXmfttwI4mBo1EG15fxJhUiCLbiiyCf/ZA6MFAhg3pGIZGdGIVjtPn6UcMk9A/UUr9PhoNsCENw1APAq0gpH73e+M+0ueyHbabc3vkbcdtzcf/fiy+NxQEjf9ud/ELBHAXJ0nk4z+MXH2Ev/kWyV4k7SkvpPc9Qr38F6RPWnM9cN6DJ0AdD1BhtgABtmoRoFCvPsBAumNm6soZG2Gk5GyVTo2sJncSyp0jQTYoR6WDvTwaaEcHsxHfvuWhHA3a6bN7twRKtcGok6NsCi7jYRrM2jExsUFMxMQYuJbMhuWNOumEJy9hi29Dmg5zMp/A5+hhPG19j1vBrq8JTLr8ki5VLPmG/PynJHVul440bxg5xuymHUFPBshC+nA9I1FmwbRBTNHAcik3Oae0cxKoI3MOriM42UrPe51nsaGxJ+WfXubAsP84aabUlQSJ1IiE0iPETLUU4CATgfXSCSpuRFRmCGbO+wSpAnzaeaCYW1VNEysRtuXCEL1kUFUbbtMv3Tilt/1c11jt3Q5bbMa84cpWipp8Elw3MZhOHsOlwwVUQM3lAR35JiFQbaYCRnMF2lxAWoOg2gyoIV4PouX8HytNIfLhqpJtXB4vjiViUI8IJ7bkC4ikkQvKksnOTKICwnqWSZ9YS5f0WCxmpgjbIq7EJcM4aI2nmhLNY2JIUgOjXZFWBHb+x5oh6cwb0Tv1ackHdKi0I9OO2wE9aogIOn540CCCziyhN+IaejtgAONKznHlHyutPrHGwCx9S6B8kfS4Mfi4Eyv7OU730bT1SCBjt834cXsf43zVjPUqqJjgrjeGnBxSG4aYAKFuVbeCfkDIjAqMb6yLNIbCuvXhMH2/+k2vkNpkORhR59N1CkzoOENvneIosjYmuTxlhUzaGEJQ/iWqx4dmwpmKjrwTiTGTCVozNAYqk/zXOndWxuWSmJkQpJw3pK5KX6QrLt5LATMqpmPAQhkhK6PUjzHUn7E0gHE0kPE0iKkolgkUx9SZmVAdDgpffdyJKg3k7VmzYGCwVXGz/tXmkOIp+vcWs+EMuhhvN0h9uhfzWJziBQmCREGSIFmQIkgVpAnSBRmC//6hkLZwaVhwxlrJSOdqlFtOYxlau9F2QN5Y98xmIAsiM1HVp2VFX+DHHGg6Ecjh3vmqtidX3qHI2qycTk/iwxSt5UzTmEP92ZBnEWTk4Mx8Mpl78ZDokxg/KWb+Q0QkvdKVmq3TMW+RXEgrsziSAfNXFMhDc60N5N9jQzjfO0kBKpUZl0ZmwJ41j/B9Hz6wmRaJB84niNmQrzp9eSlQCDDzazGDdVi3P36VZQ+Jy4f9UBNp+3zTjqI4abaFAm+GShVaXlsGdF3FYzZcDI6cori4kMxUECl9IjJZpzkvitAoxKue+90pDMvcKRxLl53TmOKCmV/xRolNKSqqUxc6LStOETmFOiLZZptlZepcKiAzteG8PEdpnQpbOMNcMsR4RR2Bs0cKFEvSmIjAFcnarqwUL4lDhHmnVkwu1IwshbiCcgvOheZuYyOteufZZwlcTlLgnZ3o/WcYdzZHW/WGaqaVfmTZ1aWCceJjkbZqsfbkOtcFlUZM/jy+hXHDbaUobWqqXaeWobbLO99yG5N3U4wxco0rQGGcOLASFMXeJoham8M+/x6O2WywK2l4HGbq1CoUyC/IZikQhdq3SiuNrvAEj0AVu9x2x3lp/xWzahaxidezFVtdcb5uEnzyl0ZmYiuKI0exvCd4Xc9CV1KB0db00z92wDPde0kukbvZIWN6jUWFTmPIC/Y4UPCm8UfDTFZpZNon1qLFTkBhxzB+FjQRA2Q/YRJT8pQigslMaUpFyAG8TMlXigiqmAZX4xgijKjRlGpLE0GdplRfCaJo0JQaSxNBk6ZmMzcya0FmrcisDdn0Q3HI2sWSppYigmlM1XT/kLQZSNpMJG0WkjYbSZuDpM1F0uYhFc1HxU4m1QJjDK6iL0S5uSj5rgXc3RejEigtcRBtqYPQsiTskmO5vosV+q4VGIKbOkDg0jtRrq+Em1YloaTFar3EGr1EUC8R0kus1Uus00usL97ABr2BjXoDm/QGNhuWtMVBKOwg/i78lT7hBsAvDmwHc/ao3vmUbBmhjeYySZNWvGkfZAgISDSaDo1SVpzGDsAEkF8B+gEapViUoZgUWXcRIGFZNm6gWbAKk0bp0k1MHG9fLYtV4iS2SmLEQFARzRcnf9PUS0LVn05/J9MiRRBU3v2IrvW974v4N00L7ZMk0wXP1409CHo/an8zTRHD3eSJ6m8D4YMkZNl3M79sqeuAsr/m3f+8/yl7A50aiAEJgeBeMWzu7ui9UfUBCe2TIqZIoOd/3/udRBOQidQZUERzb2/VwZN1H/Sju82ew2H2Wfr6qvfVf3hqwDvAIpkQVFy4B9Pe9e4/XvPeceu7h3dvO56iJPf0+A6cqA2ip18ER+iFgggiuOkvj24bby0N9j2UHIkgqIt+sVgfodC4YghLSMjSZbH0VR/6dMDrYJeKHilKTemt6v6kvzvn3/RrdWtr0GoN/xL+Sex/cPYLUpepx9cz/D46UPU5KXgAQa+NDps1v6J3xP1i2HtaDB0M9aX2deA7SYff//+gUCovMmIK/qfsFcOk+4Y5ZN97XlG6zebqtMbKgeRFi51vnxTQYBUik2rS/Cn6PC8ADR8FGxsRPB82dzfND90gIcshOcYUkfjherBz53odpm6TP8txlwOZ71xmfHHOvq053qFF/MRlS3jP0ELudrf2OeN8DHvp6ZceLe8qKYvWz/7yp0u4dKPfli3CYq0O13Ih71mylJ80tOi10On8wi+F4+LWgDPeJ30msSQt9/vkmHq9/Lvo2b461mP801v3W4xTcs6CbvF9UDdrSt+A8OUbpSh55qAUFXWznBBfdeJ8a4d7ugT5tvxUza3h9m4H7ptTqiG4z0g5dc0X29OcGlhpGFMpQo9ytTS+NViZpNdvU4kWx+LKxNY10kQ1yqGXrhe4/1nvP7E+nd5A92TtaRplbHSqoIdOqtRWti+fkB5/n1+/VvCmz12pG1kpQWsfi1ftlBobm0bpngs16CHkbIwdLnParxtTV3QYRlfJ0KFskH7pdN/YDn+yRuSd7sNH3aO0DYPggk6uWuXrfOc+fa3VTxFVvKaNxHsiHmsXyCLIE5yuOeN3/Jdf8HBL/5M6shjyhxHx9BjB1O0+4NLOnjLLSxwO7ukN4jMbOIcD879KLSi6Pk61Oqm2377n8079PXEEQ7cy7OKEC9nbpet118fxweTafpt69x/Bt8UqGzNQt7aelpc44dn5cqhwf71+qKp/Zf/+a0zcizOUWpl/iBcSXip0pplkatCchoH5c5aUM8I7/dWxAej8WicPL1URFZ9BDJelUwEwTkGqUhgSlydVes95YdXvhh9Gfz/aeFWvgVb4tuLbcv4+wLdutVZv/cUonwBD/6eDlE0aSiKK/uoH3+J1wDE/jMVqY2ysGufN84oIXB0sPzy8ollX/LegY74DgJXJR57sn+VGza0x3DnuIgABFM15LmajjjsNlYj+JEZGbuRYcAMOWxFkPN2w6Wd46xo4gVWQR/X4lyI/R6K/YK0110GzudPRW7Y+UOBGTfNNzHeYT0fiH0taunBpq9HEW8OKSaBGj21L0MqenEmNRWBAWDWAk4CpNoEZJ2tTaPFgbQYj8HxtFilErs3BTRwT8uO1NXQaWfIotchmPkAF5mMBAliEmZiOGVgCG9LgRzpscMAOOwowlT3JhusdazXGSC/hxR3UlmWVwWHpOIKheqONvjyhSiTHIkVUco5bnji8m//zL7PKaT1Vl5I6UE609f+gkr6MZKVyKc7zJRmCahLsdlyA5fdQkRSan9LgnnLEyGSkaKJCJog0wAgvepWBt80+1yKln1bMVtCljfNWDueKLsWwaEbBSfSPTEmVRsUcYYMnEjcjeyCZzBXK9E9BYBXLKjOSpUDR+nEV3TFSUdQaz+ot98QxgXwx0GQ+EEUAKB2qZPkQQ0GqFD8UPFMqyaCHM24BZmSGic9EYMagKizOw9Hz50DMrDLrqqLkTAhplMictiCAx5S3BIUQdeJeLnBy2CNtMfz6cV4u8XKoFZQesbf9YZiIERiHjaNodDW6LgcirX/mPnJIkBGDUpTBhSa0EIr38D5hCIszhCM8URGBqImoWjpvpt1ebu/v3Gl3qJfMnNM+9V+kiRFyROTPHQWOcs1dNW94/ukKMPZBvDi55i5CttdeJz84DLngLqjcdwEZ87bFFR8CIG35OAkDVN6VRDZ7aq67NteYqZ2lpT8oYB2CytoBd6VuAx4WgiAsnuj3WohG+LugzXiQRDeM3XYXlULv4dp5VFYC) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size3-Regular-CTq5MqoE.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size4;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-BF-4gkZK.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-DWFBv043.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Typewriter;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf) format("truetype")}.katex{font: 1.21em KaTeX_Main,math,Times New Roman,serif;line-height:1.2;position:relative;text-indent:0;text-rendering:auto}.katex *{-ms-high-contrast-adjust:none!important;border-color:currentColor}.katex .katex-version:after{content:"0.18.10"}.katex .katex-mathml{border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;overflow:hidden;padding:0;position:absolute;width:1px}.katex .katex-html>.katex-newline{display:block}.katex .katex-base{position:relative;white-space:nowrap;width:-webkit-min-content;width:-moz-min-content;width:min-content}.katex .katex-base,.katex .katex-strut{display:inline-block}.katex .textbf{font-weight:700}.katex .textit{font-style:italic}.katex .textrm{font-family:KaTeX_Main}.katex .textsf{font-family:KaTeX_SansSerif}.katex .texttt{font-family:KaTeX_Typewriter}.katex .mathnormal{font-family:KaTeX_Math;font-style:italic}.katex .mathit{font-family:KaTeX_Main;font-style:italic}.katex .mathrm{font-style:normal}.katex .mathbf{font-family:KaTeX_Main;font-weight:700}.katex .boldsymbol{font-family:KaTeX_Math;font-style:italic;font-weight:700}.katex .amsrm,.katex .mathbb,.katex .textbb{font-family:KaTeX_AMS}.katex .mathcal{font-family:KaTeX_Caligraphic}.katex .mathfrak,.katex .textfrak{font-family:KaTeX_Fraktur}.katex .mathboldfrak,.katex .textboldfrak{font-family:KaTeX_Fraktur;font-weight:700}.katex .mathtt{font-family:KaTeX_Typewriter}.katex .mathscr,.katex .textscr{font-family:KaTeX_Script}.katex .mathsf,.katex .textsf{font-family:KaTeX_SansSerif}.katex .mathboldsf,.katex .textboldsf{font-family:KaTeX_SansSerif;font-weight:700}.katex .mathitsf,.katex .mathsfit,.katex .textitsf{font-family:KaTeX_SansSerif;font-style:italic}.katex .mainrm{font-family:KaTeX_Main;font-style:normal}.katex .vlist-t{border-collapse:collapse;display:inline-table;table-layout:fixed}.katex .vlist-r{display:table-row}.katex .vlist{display:table-cell;position:relative;vertical-align:bottom}.katex .vlist>span{display:block;height:0;position:relative}.katex .vlist>span>span{display:inline-block}.katex .vlist>span>.pstrut{overflow:hidden;width:0}.katex .vlist-t2{margin-right:-2px}.katex .vlist-s{display:table-cell;font-size:1px;min-width:2px;vertical-align:bottom;width:2px}.katex .katex-vbox{align-items:baseline;display:inline-flex;flex-direction:column}.katex .katex-thinbox{display:inline-flex;flex-direction:row;max-width:0;width:0}.katex .msupsub{text-align:left}.katex .mfrac>span>span{text-align:center}.katex .mfrac .frac-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .katex-hdashline,.katex .katex-hline,.katex .katex-overline .overline-line,.katex .katex-rule,.katex .katex-underline .underline-line,.katex .mfrac .frac-line{min-height:1px}.katex .mspace{display:inline-block}.katex .katex-smash{display:inline;line-height:0}.katex .clap,.katex .llap,.katex .rlap{position:relative;width:0}.katex .clap>.katex-inner,.katex .llap>.katex-inner,.katex .rlap>.katex-inner{position:absolute}.katex .clap>.katex-fix,.katex .llap>.katex-fix,.katex .rlap>.katex-fix{display:inline-block}.katex .llap>.katex-inner{right:0}.katex .clap>.katex-inner,.katex .rlap>.katex-inner{left:0}.katex .clap>.katex-inner>span{margin-left:-50%;margin-right:50%}.katex .katex-rule{border:0 solid;display:inline-block;position:relative}.katex .katex-hline,.katex .katex-overline .overline-line,.katex .katex-underline .underline-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .katex-hdashline{border-bottom-style:dashed;display:inline-block;width:100%}.katex .sqrt>.katex-root{margin-left:.2777777778em;margin-right:-.5555555556em}.katex .fontsize-ensurer.reset-size1.size1,.katex .katex-sizing.reset-size1.size1{font-size:1em}.katex .fontsize-ensurer.reset-size1.size2,.katex .katex-sizing.reset-size1.size2{font-size:1.2em}.katex .fontsize-ensurer.reset-size1.size3,.katex .katex-sizing.reset-size1.size3{font-size:1.4em}.katex .fontsize-ensurer.reset-size1.size4,.katex .katex-sizing.reset-size1.size4{font-size:1.6em}.katex .fontsize-ensurer.reset-size1.size5,.katex .katex-sizing.reset-size1.size5{font-size:1.8em}.katex .fontsize-ensurer.reset-size1.size6,.katex .katex-sizing.reset-size1.size6{font-size:2em}.katex .fontsize-ensurer.reset-size1.size7,.katex .katex-sizing.reset-size1.size7{font-size:2.4em}.katex .fontsize-ensurer.reset-size1.size8,.katex .katex-sizing.reset-size1.size8{font-size:2.88em}.katex .fontsize-ensurer.reset-size1.size9,.katex .katex-sizing.reset-size1.size9{font-size:3.456em}.katex .fontsize-ensurer.reset-size1.size10,.katex .katex-sizing.reset-size1.size10{font-size:4.148em}.katex .fontsize-ensurer.reset-size1.size11,.katex .katex-sizing.reset-size1.size11{font-size:4.976em}.katex .fontsize-ensurer.reset-size2.size1,.katex .katex-sizing.reset-size2.size1{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size2.size2,.katex .katex-sizing.reset-size2.size2{font-size:1em}.katex .fontsize-ensurer.reset-size2.size3,.katex .katex-sizing.reset-size2.size3{font-size:1.1666666667em}.katex .fontsize-ensurer.reset-size2.size4,.katex .katex-sizing.reset-size2.size4{font-size:1.3333333333em}.katex .fontsize-ensurer.reset-size2.size5,.katex .katex-sizing.reset-size2.size5{font-size:1.5em}.katex .fontsize-ensurer.reset-size2.size6,.katex .katex-sizing.reset-size2.size6{font-size:1.6666666667em}.katex .fontsize-ensurer.reset-size2.size7,.katex .katex-sizing.reset-size2.size7{font-size:2em}.katex .fontsize-ensurer.reset-size2.size8,.katex .katex-sizing.reset-size2.size8{font-size:2.4em}.katex .fontsize-ensurer.reset-size2.size9,.katex .katex-sizing.reset-size2.size9{font-size:2.88em}.katex .fontsize-ensurer.reset-size2.size10,.katex .katex-sizing.reset-size2.size10{font-size:3.4566666667em}.katex .fontsize-ensurer.reset-size2.size11,.katex .katex-sizing.reset-size2.size11{font-size:4.1466666667em}.katex .fontsize-ensurer.reset-size3.size1,.katex .katex-sizing.reset-size3.size1{font-size:.7142857143em}.katex .fontsize-ensurer.reset-size3.size2,.katex .katex-sizing.reset-size3.size2{font-size:.8571428571em}.katex .fontsize-ensurer.reset-size3.size3,.katex .katex-sizing.reset-size3.size3{font-size:1em}.katex .fontsize-ensurer.reset-size3.size4,.katex .katex-sizing.reset-size3.size4{font-size:1.1428571429em}.katex .fontsize-ensurer.reset-size3.size5,.katex .katex-sizing.reset-size3.size5{font-size:1.2857142857em}.katex .fontsize-ensurer.reset-size3.size6,.katex .katex-sizing.reset-size3.size6{font-size:1.4285714286em}.katex .fontsize-ensurer.reset-size3.size7,.katex .katex-sizing.reset-size3.size7{font-size:1.7142857143em}.katex .fontsize-ensurer.reset-size3.size8,.katex .katex-sizing.reset-size3.size8{font-size:2.0571428571em}.katex .fontsize-ensurer.reset-size3.size9,.katex .katex-sizing.reset-size3.size9{font-size:2.4685714286em}.katex .fontsize-ensurer.reset-size3.size10,.katex .katex-sizing.reset-size3.size10{font-size:2.9628571429em}.katex .fontsize-ensurer.reset-size3.size11,.katex .katex-sizing.reset-size3.size11{font-size:3.5542857143em}.katex .fontsize-ensurer.reset-size4.size1,.katex .katex-sizing.reset-size4.size1{font-size:.625em}.katex .fontsize-ensurer.reset-size4.size2,.katex .katex-sizing.reset-size4.size2{font-size:.75em}.katex .fontsize-ensurer.reset-size4.size3,.katex .katex-sizing.reset-size4.size3{font-size:.875em}.katex .fontsize-ensurer.reset-size4.size4,.katex .katex-sizing.reset-size4.size4{font-size:1em}.katex .fontsize-ensurer.reset-size4.size5,.katex .katex-sizing.reset-size4.size5{font-size:1.125em}.katex .fontsize-ensurer.reset-size4.size6,.katex .katex-sizing.reset-size4.size6{font-size:1.25em}.katex .fontsize-ensurer.reset-size4.size7,.katex .katex-sizing.reset-size4.size7{font-size:1.5em}.katex .fontsize-ensurer.reset-size4.size8,.katex .katex-sizing.reset-size4.size8{font-size:1.8em}.katex .fontsize-ensurer.reset-size4.size9,.katex .katex-sizing.reset-size4.size9{font-size:2.16em}.katex .fontsize-ensurer.reset-size4.size10,.katex .katex-sizing.reset-size4.size10{font-size:2.5925em}.katex .fontsize-ensurer.reset-size4.size11,.katex .katex-sizing.reset-size4.size11{font-size:3.11em}.katex .fontsize-ensurer.reset-size5.size1,.katex .katex-sizing.reset-size5.size1{font-size:.5555555556em}.katex .fontsize-ensurer.reset-size5.size2,.katex .katex-sizing.reset-size5.size2{font-size:.6666666667em}.katex .fontsize-ensurer.reset-size5.size3,.katex .katex-sizing.reset-size5.size3{font-size:.7777777778em}.katex .fontsize-ensurer.reset-size5.size4,.katex .katex-sizing.reset-size5.size4{font-size:.8888888889em}.katex .fontsize-ensurer.reset-size5.size5,.katex .katex-sizing.reset-size5.size5{font-size:1em}.katex .fontsize-ensurer.reset-size5.size6,.katex .katex-sizing.reset-size5.size6{font-size:1.1111111111em}.katex .fontsize-ensurer.reset-size5.size7,.katex .katex-sizing.reset-size5.size7{font-size:1.3333333333em}.katex .fontsize-ensurer.reset-size5.size8,.katex .katex-sizing.reset-size5.size8{font-size:1.6em}.katex .fontsize-ensurer.reset-size5.size9,.katex .katex-sizing.reset-size5.size9{font-size:1.92em}.katex .fontsize-ensurer.reset-size5.size10,.katex .katex-sizing.reset-size5.size10{font-size:2.3044444444em}.katex .fontsize-ensurer.reset-size5.size11,.katex .katex-sizing.reset-size5.size11{font-size:2.7644444444em}.katex .fontsize-ensurer.reset-size6.size1,.katex .katex-sizing.reset-size6.size1{font-size:.5em}.katex .fontsize-ensurer.reset-size6.size2,.katex .katex-sizing.reset-size6.size2{font-size:.6em}.katex .fontsize-ensurer.reset-size6.size3,.katex .katex-sizing.reset-size6.size3{font-size:.7em}.katex .fontsize-ensurer.reset-size6.size4,.katex .katex-sizing.reset-size6.size4{font-size:.8em}.katex .fontsize-ensurer.reset-size6.size5,.katex .katex-sizing.reset-size6.size5{font-size:.9em}.katex .fontsize-ensurer.reset-size6.size6,.katex .katex-sizing.reset-size6.size6{font-size:1em}.katex .fontsize-ensurer.reset-size6.size7,.katex .katex-sizing.reset-size6.size7{font-size:1.2em}.katex .fontsize-ensurer.reset-size6.size8,.katex .katex-sizing.reset-size6.size8{font-size:1.44em}.katex .fontsize-ensurer.reset-size6.size9,.katex .katex-sizing.reset-size6.size9{font-size:1.728em}.katex .fontsize-ensurer.reset-size6.size10,.katex .katex-sizing.reset-size6.size10{font-size:2.074em}.katex .fontsize-ensurer.reset-size6.size11,.katex .katex-sizing.reset-size6.size11{font-size:2.488em}.katex .fontsize-ensurer.reset-size7.size1,.katex .katex-sizing.reset-size7.size1{font-size:.4166666667em}.katex .fontsize-ensurer.reset-size7.size2,.katex .katex-sizing.reset-size7.size2{font-size:.5em}.katex .fontsize-ensurer.reset-size7.size3,.katex .katex-sizing.reset-size7.size3{font-size:.5833333333em}.katex .fontsize-ensurer.reset-size7.size4,.katex .katex-sizing.reset-size7.size4{font-size:.6666666667em}.katex .fontsize-ensurer.reset-size7.size5,.katex .katex-sizing.reset-size7.size5{font-size:.75em}.katex .fontsize-ensurer.reset-size7.size6,.katex .katex-sizing.reset-size7.size6{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size7.size7,.katex .katex-sizing.reset-size7.size7{font-size:1em}.katex .fontsize-ensurer.reset-size7.size8,.katex .katex-sizing.reset-size7.size8{font-size:1.2em}.katex .fontsize-ensurer.reset-size7.size9,.katex .katex-sizing.reset-size7.size9{font-size:1.44em}.katex .fontsize-ensurer.reset-size7.size10,.katex .katex-sizing.reset-size7.size10{font-size:1.7283333333em}.katex .fontsize-ensurer.reset-size7.size11,.katex .katex-sizing.reset-size7.size11{font-size:2.0733333333em}.katex .fontsize-ensurer.reset-size8.size1,.katex .katex-sizing.reset-size8.size1{font-size:.3472222222em}.katex .fontsize-ensurer.reset-size8.size2,.katex .katex-sizing.reset-size8.size2{font-size:.4166666667em}.katex .fontsize-ensurer.reset-size8.size3,.katex .katex-sizing.reset-size8.size3{font-size:.4861111111em}.katex .fontsize-ensurer.reset-size8.size4,.katex .katex-sizing.reset-size8.size4{font-size:.5555555556em}.katex .fontsize-ensurer.reset-size8.size5,.katex .katex-sizing.reset-size8.size5{font-size:.625em}.katex .fontsize-ensurer.reset-size8.size6,.katex .katex-sizing.reset-size8.size6{font-size:.6944444444em}.katex .fontsize-ensurer.reset-size8.size7,.katex .katex-sizing.reset-size8.size7{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size8.size8,.katex .katex-sizing.reset-size8.size8{font-size:1em}.katex .fontsize-ensurer.reset-size8.size9,.katex .katex-sizing.reset-size8.size9{font-size:1.2em}.katex .fontsize-ensurer.reset-size8.size10,.katex .katex-sizing.reset-size8.size10{font-size:1.4402777778em}.katex .fontsize-ensurer.reset-size8.size11,.katex .katex-sizing.reset-size8.size11{font-size:1.7277777778em}.katex .fontsize-ensurer.reset-size9.size1,.katex .katex-sizing.reset-size9.size1{font-size:.2893518519em}.katex .fontsize-ensurer.reset-size9.size2,.katex .katex-sizing.reset-size9.size2{font-size:.3472222222em}.katex .fontsize-ensurer.reset-size9.size3,.katex .katex-sizing.reset-size9.size3{font-size:.4050925926em}.katex .fontsize-ensurer.reset-size9.size4,.katex .katex-sizing.reset-size9.size4{font-size:.462962963em}.katex .fontsize-ensurer.reset-size9.size5,.katex .katex-sizing.reset-size9.size5{font-size:.5208333333em}.katex .fontsize-ensurer.reset-size9.size6,.katex .katex-sizing.reset-size9.size6{font-size:.5787037037em}.katex .fontsize-ensurer.reset-size9.size7,.katex .katex-sizing.reset-size9.size7{font-size:.6944444444em}.katex .fontsize-ensurer.reset-size9.size8,.katex .katex-sizing.reset-size9.size8{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size9.size9,.katex .katex-sizing.reset-size9.size9{font-size:1em}.katex .fontsize-ensurer.reset-size9.size10,.katex .katex-sizing.reset-size9.size10{font-size:1.2002314815em}.katex .fontsize-ensurer.reset-size9.size11,.katex .katex-sizing.reset-size9.size11{font-size:1.4398148148em}.katex .fontsize-ensurer.reset-size10.size1,.katex .katex-sizing.reset-size10.size1{font-size:.2410800386em}.katex .fontsize-ensurer.reset-size10.size2,.katex .katex-sizing.reset-size10.size2{font-size:.2892960463em}.katex .fontsize-ensurer.reset-size10.size3,.katex .katex-sizing.reset-size10.size3{font-size:.337512054em}.katex .fontsize-ensurer.reset-size10.size4,.katex .katex-sizing.reset-size10.size4{font-size:.3857280617em}.katex .fontsize-ensurer.reset-size10.size5,.katex .katex-sizing.reset-size10.size5{font-size:.4339440694em}.katex .fontsize-ensurer.reset-size10.size6,.katex .katex-sizing.reset-size10.size6{font-size:.4821600771em}.katex .fontsize-ensurer.reset-size10.size7,.katex .katex-sizing.reset-size10.size7{font-size:.5785920926em}.katex .fontsize-ensurer.reset-size10.size8,.katex .katex-sizing.reset-size10.size8{font-size:.6943105111em}.katex .fontsize-ensurer.reset-size10.size9,.katex .katex-sizing.reset-size10.size9{font-size:.8331726133em}.katex .fontsize-ensurer.reset-size10.size10,.katex .katex-sizing.reset-size10.size10{font-size:1em}.katex .fontsize-ensurer.reset-size10.size11,.katex .katex-sizing.reset-size10.size11{font-size:1.1996142719em}.katex .fontsize-ensurer.reset-size11.size1,.katex .katex-sizing.reset-size11.size1{font-size:.2009646302em}.katex .fontsize-ensurer.reset-size11.size2,.katex .katex-sizing.reset-size11.size2{font-size:.2411575563em}.katex .fontsize-ensurer.reset-size11.size3,.katex .katex-sizing.reset-size11.size3{font-size:.2813504823em}.katex .fontsize-ensurer.reset-size11.size4,.katex .katex-sizing.reset-size11.size4{font-size:.3215434084em}.katex .fontsize-ensurer.reset-size11.size5,.katex .katex-sizing.reset-size11.size5{font-size:.3617363344em}.katex .fontsize-ensurer.reset-size11.size6,.katex .katex-sizing.reset-size11.size6{font-size:.4019292605em}.katex .fontsize-ensurer.reset-size11.size7,.katex .katex-sizing.reset-size11.size7{font-size:.4823151125em}.katex .fontsize-ensurer.reset-size11.size8,.katex .katex-sizing.reset-size11.size8{font-size:.578778135em}.katex .fontsize-ensurer.reset-size11.size9,.katex .katex-sizing.reset-size11.size9{font-size:.6945337621em}.katex .fontsize-ensurer.reset-size11.size10,.katex .katex-sizing.reset-size11.size10{font-size:.8336012862em}.katex .fontsize-ensurer.reset-size11.size11,.katex .katex-sizing.reset-size11.size11{font-size:1em}.katex .delimsizing.size1{font-family:KaTeX_Size1}.katex .delimsizing.size2{font-family:KaTeX_Size2}.katex .delimsizing.size3{font-family:KaTeX_Size3}.katex .delimsizing.size4{font-family:KaTeX_Size4}.katex .delimsizing.mult .delim-size1>span{font-family:KaTeX_Size1}.katex .delimsizing.mult .delim-size4>span{font-family:KaTeX_Size4}.katex .nulldelimiter{display:inline-block;width:.12em}.katex .delimcenter,.katex .op-symbol{position:relative}.katex .op-symbol.small-op{font-family:KaTeX_Size1}.katex .op-symbol.large-op{font-family:KaTeX_Size2}.katex .katex-accent>.vlist-t,.katex .op-limits>.vlist-t{text-align:center}.katex .katex-accent .accent-body{position:relative}.katex .katex-accent .accent-body:not(.accent-full){width:0}.katex .katex-overlay{display:block}.katex .mtable .vertical-separator{display:inline-block;min-width:1px}.katex .mtable .arraycolsep{display:inline-block}.katex .mtable .col-align-c>.vlist-t{text-align:center}.katex .mtable .col-align-l>.vlist-t{text-align:left}.katex .mtable .col-align-r>.vlist-t{text-align:right}.katex .svg-align{text-align:left}.katex svg{fill:currentColor;stroke:currentColor;display:block;height:inherit;position:absolute;width:100%}.katex svg path{stroke:none}.katex svg{fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1}.katex img{border-style:none;max-height:none;max-width:none;min-height:0;min-width:0}.katex .katex-stretchy{display:block;overflow:hidden;position:relative;width:100%}.katex .katex-stretchy:after,.katex .katex-stretchy:before{content:""}.katex .hide-tail{overflow:hidden;position:relative;width:100%}.katex .halfarrow-left{left:0;overflow:hidden;position:absolute;width:50.2%}.katex .halfarrow-right{overflow:hidden;position:absolute;right:0;width:50.2%}.katex .brace-left{left:0;overflow:hidden;position:absolute;width:25.1%}.katex .brace-center{left:25%;overflow:hidden;position:absolute;width:50%}.katex .brace-right{overflow:hidden;position:absolute;right:0;width:25.1%}.katex .x-arrow-pad{padding:0 .5em}.katex .cd-arrow-pad{padding:0 .55556em 0 .27778em}.katex .mover,.katex .munder,.katex .x-arrow{text-align:center}.katex .boxpad{padding:0 .3em}.katex .fbox,.katex .fcolorbox{border:.04em solid;box-sizing:border-box}.katex .cancel-pad{padding:0 .2em}.katex .cancel-lap{margin-left:-.2em;margin-right:-.2em}.katex .katex-sout{border-bottom-style:solid;border-bottom-width:.08em}.katex .angl{border-right:.049em solid;border-top:.049em solid;box-sizing:border-box;margin-right:.03889em}.katex .anglpad{padding:0 .03889em}.katex .reflectbox{display:inline-block;transform:scaleX(-1)}.katex .eqn-num:before{content:"(" counter(katexEqnNo) ")";counter-increment:katexEqnNo}.katex .mml-eqn-num:before{content:"(" counter(mmlEqnNo) ")";counter-increment:mmlEqnNo}.katex .mtr-glue{width:50%}.katex .cd-vert-arrow{display:inline-block;position:relative}.katex .cd-label-left{display:inline-block;position:absolute;right:calc(50% + .3em);text-align:left}.katex .cd-label-right{display:inline-block;left:calc(50% + .3em);position:absolute;text-align:right}.katex-display{display:block;margin:1em 0;text-align:center}.katex-display>.katex{display:block;text-align:center;white-space:nowrap}.katex-display>.katex>.katex-html{display:block;position:relative}.katex-display>.katex>.katex-html>.katex-tag{position:absolute;right:0}.katex-display.leqno>.katex>.katex-html>.katex-tag{left:0;right:auto}.katex-display.fleqn>.katex{padding-left:2em;text-align:left}body{counter-reset:katexEqnNo mmlEqnNo}
</style>
  <style data-inlined="/inexplicable-phenomena/sheets/f22699cbda8a.css">.ldScnz .pa-list{counter-reset:list-item;}/*!sc*/
.ldScnz .pa-item{display:list-item;list-style:disc inside;}/*!sc*/
.ldScnz .pa-ordered .pa-item{list-style-type:decimal;}/*!sc*/
data-styled.g12[id="sc-kEqYZi"]{content:"ldScnz,"}/*!sc*/
.ilUBoY .pa-page:not(.pa-open){display:none;}/*!sc*/
data-styled.g17[id="sc-kslsaH"]{content:"ilUBoY,"}/*!sc*/
.beYWyS{font-family:Georgia,'Times New Roman',serif;font-size:1.0625rem;line-height:1.6;color:#1b1b1b;background:#ffffff;max-width:40rem;margin-inline:auto;padding:1.25rem;}/*!sc*/
.beYWyS .pd-book{margin-block:calc(2 * 1.25rem) 1.25rem;counter-reset:chapter equation;}/*!sc*/
.beYWyS .pd-chapter{margin-block:1.25rem;scroll-margin-block-start:1.25rem;}/*!sc*/
.beYWyS .pa-page.pa-open{margin-block-start:calc(1.25rem / 2);}/*!sc*/
.beYWyS .pd-section{margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-paragraph{margin-block:1.25rem;}/*!sc*/
.beYWyS .pa-item{margin-block:calc(1.25rem / 4);}/*!sc*/
.beYWyS .pa-list .pa-item{list-style-position:outside;margin-inline-start:1.2em;}/*!sc*/
.beYWyS .pd-title{font-size:calc(1.5 * 1.0625rem);font-weight:bold;margin-block-end:1.25rem;}/*!sc*/
.beYWyS .pd-heading{font-weight:bold;font-size:calc(1.15 * 1.0625rem);margin-block:1.25rem 0;}/*!sc*/
.beYWyS .pd-section>.pd-heading{margin-block-start:0;}/*!sc*/
.beYWyS .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)){display:none;}/*!sc*/
.beYWyS .pd-line{white-space:pre-wrap;}/*!sc*/
.beYWyS .pd-word{overflow-wrap:break-word;}/*!sc*/
.beYWyS .pd-canonical.pd-chapter{counter-increment:chapter;}/*!sc*/
.beYWyS .pd-chapter .pd-title::before{display:block;margin-block-end:calc(1.25rem / 4);}/*!sc*/
.beYWyS .pd-canonical.pd-chapter .pd-title::before{content:'Chapter ' counter(chapter);}/*!sc*/
.beYWyS .pd-label,.beYWyS .pd-chapter .pd-title::before{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}/*!sc*/
.beYWyS .pa-reference{color:#1f4e79;text-decoration-color:#1f4e79;text-underline-offset:0.15em;}/*!sc*/
.beYWyS .pa-self-reference{color:inherit;text-decoration:none;}/*!sc*/
.beYWyS .pa-referent{scroll-margin-block-start:1.25rem;}/*!sc*/
.beYWyS .pa-content{color:#1f4e79;}/*!sc*/
.beYWyS .pd-running-head{font-size:calc(0.7 * 1.0625rem);letter-spacing:0.08em;text-transform:uppercase;margin-block:0 calc(1.25rem / 2);padding-block-end:calc(1.25rem / 4);border-block-end:1px solid color-mix(in srgb, #1b1b1b 30%, #ffffff);}/*!sc*/
.beYWyS .pd-running-head a{text-decoration:none;color:color-mix(in srgb, #1b1b1b 70%, #ffffff);}/*!sc*/
.beYWyS .pd-running-head a:hover{color:#1b1b1b;}/*!sc*/
.beYWyS .pd-running-head .pd-square{margin-inline-start:0.6em;}/*!sc*/
.beYWyS .pd-running-head .pd-book-title[data-to="cover"]{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"]{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"]{display:inline;}/*!sc*/
.beYWyS .pd-figure{max-width:100%;}/*!sc*/
.beYWyS .pd-code{font-family:ui-monospace,monospace;font-size:calc(0.85 * 1.0625rem);line-height:1.5;white-space:pre;overflow-x:auto;margin-block:1.25rem;padding:calc(0.75 * 1.25rem) 1.25rem;border-inline-start:2px solid color-mix(in srgb, #1b1b1b 25%, #ffffff);}/*!sc*/
.beYWyS .pd-code-line::before{content:attr(data-line);display:inline-block;width:3ch;margin-inline-end:1.5ch;text-align:end;opacity:0.4;user-select:none;}/*!sc*/
.beYWyS .pd-image img,.beYWyS .pd-svg svg{display:block;max-width:100%;height:auto;margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-document object{display:block;width:100%;aspect-ratio:1/1.4142;margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-math,.beYWyS .pd-date{white-space:nowrap;}/*!sc*/
.beYWyS .pd-equation{position:relative;counter-increment:equation;}/*!sc*/
.beYWyS .pd-equation::after{content:'(' counter(equation) ')';position:absolute;inset-inline-end:0;top:50%;transform:translateY(-50%);}/*!sc*/
.beYWyS .pd-front{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-front{display:flex;}/*!sc*/
.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-running-head,.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-byline,.beYWyS .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open{display:none;}/*!sc*/
.beYWyS .pd-front{--front-width:min(calc((100vh - 7 * 1.25rem) * 2 / 3), calc(min(40rem, 100vw) - 2 * 1.25rem));position:relative;box-sizing:border-box;width:var(--front-width);font-size:calc(var(--front-width) / 22);flex-direction:column;align-items:center;text-align:center;aspect-ratio:2/3;margin:0 auto calc(2 * 1.25rem);padding:3em 2em 1.75em;border:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);box-shadow:inset 0 0 0 .375em #ffffff,inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, #1b1b1b 35%, #ffffff),2px 12px 28px -12px rgba(0, 0, 0, .45);background:#ffffff;}/*!sc*/
.beYWyS .pd-front::before{content:'';position:absolute;inset:0 auto 0 0;width:1.25em;background:linear-gradient(to right, color-mix(in srgb, #1b1b1b 22%, transparent), color-mix(in srgb, #1b1b1b 5%, transparent) 55%, transparent);z-index:1;pointer-events:none;}/*!sc*/
.beYWyS .pd-front>a,.beYWyS .pd-front .pd-word{display:block;}/*!sc*/
.beYWyS .pd-front .pa-reference{color:inherit;text-decoration:none;}/*!sc*/
.beYWyS .pd-front a:hover .pd-word{text-decoration:underline;text-underline-offset:0.15em;}/*!sc*/
.beYWyS .pd-front-name{font-size:2.4em;line-height:1.1;font-weight:bold;margin-block:.15em .33em;}/*!sc*/
.beYWyS .pd-front-name::after{content:'';display:block;width:1.45em;border-top:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);margin:.375em auto 0;}/*!sc*/
.beYWyS .pd-front-author{font-size:1.15em;letter-spacing:.04em;}/*!sc*/
.beYWyS .pd-front-tagline{font-style:italic;opacity:.75;margin-top:1.15em;font-size:.95em;}/*!sc*/
.beYWyS .pd-front>:nth-last-child(2){margin-top:auto;}/*!sc*/
.beYWyS .pd-front-imprint{font-size:.74em;letter-spacing:.15em;text-transform:uppercase;opacity:.65;margin-top:.47em;}/*!sc*/
.beYWyS .pa-page.pa-open{animation:come .5s ease;}/*!sc*/
@keyframes come{from{opacity:0;transform:translateY(1rem);}to{opacity:1;transform:none;}}/*!sc*/
.beYWyS .pd-plate{float:inline-start;width:11rem;margin:.25rem 1.5rem 1rem 0;}/*!sc*/
.beYWyS .pd-plate .pd-image img{margin-block:0;border:1px solid color-mix(in srgb, #1b1b1b 20%, #ffffff);box-shadow:0 1px 3px rgba(0, 0, 0, .12);}/*!sc*/
.beYWyS .pd-plate .pa-opening{text-decoration:none;color:inherit;}/*!sc*/
.beYWyS .pd-plate .pa-opening .pd-word{display:block;font-size:.8rem;margin-top:.4rem;opacity:.75;text-decoration:underline;}/*!sc*/
.beYWyS .pd-chapter:has(> .pd-paragraph > .pd-plate)>.pd-paragraph:first-child{margin-block:0;}/*!sc*/
@media (max-width: 640px){.beYWyS .pd-plate{width:7rem;margin-right:1rem;}}/*!sc*/
.beYWyS .pd-navigation{display:flex;justify-content:center;align-items:baseline;gap:.15em;margin-block:calc(1.25rem / 2);}/*!sc*/
.beYWyS *:has(> .pd-navigation:first-child){position:relative;}/*!sc*/
.beYWyS .pd-navigation:first-child{position:absolute;inset-block-start:.1rem;inset-inline-end:0;margin-block:0;z-index:2;}/*!sc*/
.beYWyS .pd-navigation a{text-decoration:none;}/*!sc*/
.beYWyS .pd-navigation .pd-word{font-size:1.0625rem;line-height:1;color:color-mix(in srgb, #1b1b1b 55%, #ffffff);transition:color .15s ease;}/*!sc*/
.beYWyS .pd-navigation a:hover .pd-word{color:#1b1b1b;}/*!sc*/
.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)){pointer-events:none;}/*!sc*/
.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word{color:color-mix(in srgb, #1b1b1b 22%, #ffffff);}/*!sc*/
data-styled.g18[id="sc-hBMXrk"]{content:"beYWyS,"}/*!sc*/
.hKvrQA .pd-chapter.pa-cover{margin-block:1.25rem calc(2 * 1.25rem);}/*!sc*/
.hKvrQA .pa-cover .pd-title{margin-block:0;font-size:calc(2.25 * 1.0625rem);line-height:1.2;}/*!sc*/
.hKvrQA .pa-cover .pd-title::before{content:'Cover';}/*!sc*/
.hKvrQA .pa-biography .pd-title::before{content:'Biography';}/*!sc*/
.hKvrQA .pa-autobiography .pd-title::before{content:'Autobiography';}/*!sc*/
data-styled.g20[id="sc-fFSRQT"]{content:"hKvrQA,"}/*!sc*/
.clPWRv .pa-synopsis .pd-title::before{content:'Synopsis';}/*!sc*/
data-styled.g21[id="sc-bkbknG"]{content:"clPWRv,"}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-paragraph{margin-block:calc(1.25rem / 4);}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-title::before{content:'Table of Contents';}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-heading{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}/*!sc*/
data-styled.g23[id="sc-dIvsxA"]{content:"fpvZNQ,"}/*!sc*/
.gAJIDt:not(:has(.pa-page.pa-open)){display:none;}/*!sc*/
data-styled.g26[id="sc-kfYpvV"]{content:"gAJIDt,"}/*!sc*/
</style>
  
  <style>.pa-arriving .pd-pages{visibility:hidden}</style>
  <style data-styled="active" data-styled-version="6.4.0">.ldScnz .pa-list{counter-reset:list-item;}.ldScnz .pa-item{display:list-item;list-style:disc inside;}.ldScnz .pa-ordered .pa-item{list-style-type:decimal;}.ilUBoY .pa-page:not(.pa-open){display:none;}.beYWyS{font-family:Georgia,'Times New Roman',serif;font-size:1.0625rem;line-height:1.6;color:#1b1b1b;background:#ffffff;max-width:40rem;margin-inline:auto;padding:1.25rem;}.beYWyS .pd-book{margin-block:calc(2 * 1.25rem) 1.25rem;counter-reset:chapter equation;}.beYWyS .pd-chapter{margin-block:1.25rem;scroll-margin-block-start:1.25rem;}.beYWyS .pa-page.pa-open{margin-block-start:calc(1.25rem / 2);}.beYWyS .pd-section{margin-block:1.25rem;}.beYWyS .pd-paragraph{margin-block:1.25rem;}.beYWyS .pa-item{margin-block:calc(1.25rem / 4);}.beYWyS .pa-list .pa-item{list-style-position:outside;margin-inline-start:1.2em;}.beYWyS .pd-title{font-size:calc(1.5 * 1.0625rem);font-weight:bold;margin-block-end:1.25rem;}.beYWyS .pd-heading{font-weight:bold;font-size:calc(1.15 * 1.0625rem);margin-block:1.25rem 0;}.beYWyS .pd-section>.pd-heading{margin-block-start:0;}.beYWyS .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)){display:none;}.beYWyS .pd-line{white-space:pre-wrap;}.beYWyS .pd-word{overflow-wrap:break-word;}.beYWyS .pd-canonical.pd-chapter{counter-increment:chapter;}.beYWyS .pd-chapter .pd-title::before{display:block;margin-block-end:calc(1.25rem / 4);}.beYWyS .pd-canonical.pd-chapter .pd-title::before{content:'Chapter ' counter(chapter);}.beYWyS .pd-label,.beYWyS .pd-chapter .pd-title::before{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}.beYWyS .pa-reference{color:#1f4e79;text-decoration-color:#1f4e79;text-underline-offset:0.15em;}.beYWyS .pa-self-reference{color:inherit;text-decoration:none;}.beYWyS .pa-referent{scroll-margin-block-start:1.25rem;}.beYWyS .pa-content{color:#1f4e79;}.beYWyS .pd-running-head{font-size:calc(0.7 * 1.0625rem);letter-spacing:0.08em;text-transform:uppercase;margin-block:0 calc(1.25rem / 2);padding-block-end:calc(1.25rem / 4);border-block-end:1px solid color-mix(in srgb, #1b1b1b 30%, #ffffff);}.beYWyS .pd-running-head a{text-decoration:none;color:color-mix(in srgb, #1b1b1b 70%, #ffffff);}.beYWyS .pd-running-head a:hover{color:#1b1b1b;}.beYWyS .pd-running-head .pd-square{margin-inline-start:0.6em;}.beYWyS .pd-running-head .pd-book-title[data-to="cover"]{display:none;}.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"]{display:none;}.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"]{display:inline;}.beYWyS .pd-figure{max-width:100%;}.beYWyS .pd-code{font-family:ui-monospace,monospace;font-size:calc(0.85 * 1.0625rem);line-height:1.5;white-space:pre;overflow-x:auto;margin-block:1.25rem;padding:calc(0.75 * 1.25rem) 1.25rem;border-inline-start:2px solid color-mix(in srgb, #1b1b1b 25%, #ffffff);}.beYWyS .pd-code-line::before{content:attr(data-line);display:inline-block;width:3ch;margin-inline-end:1.5ch;text-align:end;opacity:0.4;user-select:none;}.beYWyS .pd-image img,.beYWyS .pd-svg svg{display:block;max-width:100%;height:auto;margin-block:1.25rem;}.beYWyS .pd-document object{display:block;width:100%;aspect-ratio:1/1.4142;margin-block:1.25rem;}.beYWyS .pd-math,.beYWyS .pd-date{white-space:nowrap;}.beYWyS .pd-equation{position:relative;counter-increment:equation;}.beYWyS .pd-equation::after{content:'(' counter(equation) ')';position:absolute;inset-inline-end:0;top:50%;transform:translateY(-50%);}.beYWyS .pd-front{display:none;}.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-front{display:flex;}.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-running-head,.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-byline,.beYWyS .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open{display:none;}.beYWyS .pd-front{--front-width:min(calc((100vh - 7 * 1.25rem) * 2 / 3), calc(min(40rem, 100vw) - 2 * 1.25rem));position:relative;box-sizing:border-box;width:var(--front-width);font-size:calc(var(--front-width) / 22);flex-direction:column;align-items:center;text-align:center;aspect-ratio:2/3;margin:0 auto calc(2 * 1.25rem);padding:3em 2em 1.75em;border:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);box-shadow:inset 0 0 0 .375em #ffffff,inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, #1b1b1b 35%, #ffffff),2px 12px 28px -12px rgba(0, 0, 0, .45);background:#ffffff;}.beYWyS .pd-front::before{content:'';position:absolute;inset:0 auto 0 0;width:1.25em;background:linear-gradient(to right, color-mix(in srgb, #1b1b1b 22%, transparent), color-mix(in srgb, #1b1b1b 5%, transparent) 55%, transparent);z-index:1;pointer-events:none;}.beYWyS .pd-front>a,.beYWyS .pd-front .pd-word{display:block;}.beYWyS .pd-front .pa-reference{color:inherit;text-decoration:none;}.beYWyS .pd-front a:hover .pd-word{text-decoration:underline;text-underline-offset:0.15em;}.beYWyS .pd-front-name{font-size:2.4em;line-height:1.1;font-weight:bold;margin-block:.15em .33em;}.beYWyS .pd-front-name::after{content:'';display:block;width:1.45em;border-top:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);margin:.375em auto 0;}.beYWyS .pd-front-author{font-size:1.15em;letter-spacing:.04em;}.beYWyS .pd-front-tagline{font-style:italic;opacity:.75;margin-top:1.15em;font-size:.95em;}.beYWyS .pd-front>:nth-last-child(2){margin-top:auto;}.beYWyS .pd-front-imprint{font-size:.74em;letter-spacing:.15em;text-transform:uppercase;opacity:.65;margin-top:.47em;}.beYWyS .pa-page.pa-open{animation:come .5s ease;}@keyframes come{from{opacity:0;transform:translateY(1rem);}to{opacity:1;transform:none;}}.beYWyS .pd-plate{float:inline-start;width:11rem;margin:.25rem 1.5rem 1rem 0;}.beYWyS .pd-plate .pd-image img{margin-block:0;border:1px solid color-mix(in srgb, #1b1b1b 20%, #ffffff);box-shadow:0 1px 3px rgba(0, 0, 0, .12);}.beYWyS .pd-plate .pa-opening{text-decoration:none;color:inherit;}.beYWyS .pd-plate .pa-opening .pd-word{display:block;font-size:.8rem;margin-top:.4rem;opacity:.75;text-decoration:underline;}.beYWyS .pd-chapter:has(> .pd-paragraph > .pd-plate)>.pd-paragraph:first-child{margin-block:0;}@media (max-width: 640px){.beYWyS .pd-plate{width:7rem;margin-right:1rem;}}.beYWyS .pd-navigation{display:flex;justify-content:center;align-items:baseline;gap:.15em;margin-block:calc(1.25rem / 2);}.beYWyS *:has(> .pd-navigation:first-child){position:relative;}.beYWyS .pd-navigation:first-child{position:absolute;inset-block-start:.1rem;inset-inline-end:0;margin-block:0;z-index:2;}.beYWyS .pd-navigation a{text-decoration:none;}.beYWyS .pd-navigation .pd-word{font-size:1.0625rem;line-height:1;color:color-mix(in srgb, #1b1b1b 55%, #ffffff);transition:color .15s ease;}.beYWyS .pd-navigation a:hover .pd-word{color:#1b1b1b;}.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)){pointer-events:none;}.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word{color:color-mix(in srgb, #1b1b1b 22%, #ffffff);}.hKvrQA .pd-chapter.pa-cover{margin-block:1.25rem calc(2 * 1.25rem);}.hKvrQA .pa-cover .pd-title{margin-block:0;font-size:calc(2.25 * 1.0625rem);line-height:1.2;}.hKvrQA .pa-cover .pd-title::before{content:'Cover';}.hKvrQA .pa-biography .pd-title::before{content:'Biography';}.hKvrQA .pa-autobiography .pd-title::before{content:'Autobiography';}.clPWRv .pa-synopsis .pd-title::before{content:'Synopsis';}.fpvZNQ .pa-table-of-contents .pd-paragraph{margin-block:calc(1.25rem / 4);}.fpvZNQ .pa-table-of-contents .pd-title::before{content:'Table of Contents';}.fpvZNQ .pa-table-of-contents .pd-heading{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}.gAJIDt:not(:has(.pa-page.pa-open)){display:none;}</style><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
  <body>
    <div id="root"><!--$--><div class="sc-hBMXrk beYWyS pd-container"><div class="sc-kslsaH ilUBoY pd-container"><div class="pd-book pa-paginated"><div class="pd-paragraph pd-running-head"><span class="pd-book-title" data-to="table"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Subjective Reference</span></a></span><span class="pd-book-title" data-to="cover"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Subjective Reference</span></a></span><span class="pd-square"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a></span></div><div class="pd-paragraph pd-front"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-name pa-reference">Subjective Reference</span></a><a href="/inexplicable-phenomena/our-team/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-author pa-reference">Doug</span></a><span class="pd-word pd-front-tagline">The least a library needs to bind.</span><a href="/inexplicable-phenomena/our-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-imprint pa-reference">Inexplicable Phenomena</span></a><span class="pd-word pd-front-imprint"><a href="/inexplicable-phenomena/our-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Inexplicable Phenomena</span></a></span></div><header class="sc-fFSRQT hKvrQA pd-container"><div class="pd-chapter pa-page pa-cover"><a href="/inexplicable-phenomena/our-reference/" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="subjective-reference" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">Subjective Reference</div></a></div></header><div class="sc-bkbknG clPWRv pd-container"><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><span class="pd-chapter pa-page pa-navigated pa-parenthetical pa-synopsis" hidden=""></span><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div></div><nav class="sc-dIvsxA fpvZNQ pd-container"><div class="pd-chapter pa-page pa-table-of-contents"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span id="table-of-contents" class="pd-sentence pd-title pa-parenthetical pa-reference pa-self-reference pa-referent" hidden=""></span></a><div class="pd-section"><a href="#contents" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="contents" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">Contents</div></a><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Book</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Theme</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Running Head and the Byline</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Faces</span></div></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">Developing the Library</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Paper</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Reference Manual</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Specification</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Content</span></div></a><span class="pd-paragraph pa-parenthetical" hidden=""></span></div></div></nav><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-book" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Book</div></a><div class="pd-section"><a href="#what-a-book-is-here" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="what-a-book-is-here" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">What a book is here</div></a><div class="pd-paragraph">Every book in this library extends the library's own, so what a book is here is decided once and a change to it reaches all of them. The book class is the layout: the running head, the byline drawn from what the book's cover says, then the chapters. Its file is where the library's theme is registered, once, on the class every book extends. A cover's route opens at the top of the page; every other bookmark turns as the framework does.</div><div class="pd-paragraph">The class stands beside this chapter as its code, borrowed on 2026-10-30 from the binder's own test library, whose manual the team wrote, and to be rebuilt from here by sketches rather than kept. The theme it registers is <a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Theme</span></a>; the running head and the byline it draws are <a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Running Head and the Byline</span></a>.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $ } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Book, $Chapter, $Cover, $TableOfContents, <span class="hljs-title class_">Paginated</span>, <span class="hljs-title class_">Theme</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">LibraryTheme</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./2-the-theme~code.tsx'</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">RunningHead</span> <span class="hljs-keyword">as</span> runningHead } <span class="hljs-keyword">from</span> <span class="hljs-string">'./3-the-running-head-and-the-byline~code.tsx'</span>;
<span class="hljs-keyword">import</span> { $Navigation, <span class="hljs-title class_">Front</span> <span class="hljs-keyword">as</span> front, <span class="hljs-title class_">Navigated</span> <span class="hljs-keyword">as</span> navigated } <span class="hljs-keyword">from</span> <span class="hljs-string">'./4-the-faces~code.tsx'</span>;

<span class="hljs-comment">// THE HEADING IS MINIMAL AND THE BYLINE IS NOT DRAWN, Doug, 2026-11-16: first "Why does every chapter need a</span>
<span class="hljs-comment">// title and author?!?", then "what happened to a minimal heading, at least with the book title" — the running</span>
<span class="hljs-comment">// head is the book's title alone, a way to the table and, from the table, to the cover; the author lives on the</span>
<span class="hljs-comment">// front and in the table of contents.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$TheLibrary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Book</span> {
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">RunningHead</span> = $(runningHead);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Front</span> = $(front);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">RunningHead</span> <span class="hljs-attr">chapter</span>=<span class="hljs-string">{this.cover}</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Front</span> <span class="hljs-attr">chapter</span>=<span class="hljs-string">{this.cover}</span> /&gt;</span>
                {super.write()}
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }

    <span class="hljs-comment">// A PAGE OPENS AT ITS TOP, Doug, 2026-11-16: "We need pages to open at the top... not scrolled down" — a</span>
    <span class="hljs-comment">// turn lands on the page's top with the running head in view, never past it.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> <span class="hljs-title function_">turn</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">scrollTo</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Paginated</span> /&gt;</span></span>
        );
    }

    <span class="hljs-comment">// EVERY CHAPTER BUT THE COVER IS NAVIGATED, said by the book at its bond and before the bond reaches the</span>
    <span class="hljs-comment">// chapters, so the lines the format holds are bound with them. The cover's page is the front; a chapter that</span>
    <span class="hljs-comment">// already says Navigation in its own text keeps its own. Doug, 2026-11-16: "You need next and table of</span>
    <span class="hljs-comment">// contents and previous on the top and bottom of every chapter in the library."</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Bound(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigated</span> = $(navigated);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> chapter <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">find</span>($Chapter)) {
            <span class="hljs-comment">// THE TABLE WEARS NO NAVIGATION, Doug, 2026-11-16, pressing the square and landing on the table's own</span>
            <span class="hljs-comment">// page: "WHAT IS THIS!!!" — the table of contents is the book's navigation and carries none of its own.</span>
            <span class="hljs-keyword">if</span> (chapter.<span class="hljs-title function_">is</span>($Cover) || chapter.<span class="hljs-title function_">is</span>($TableOfContents) || chapter.<span class="hljs-property">text</span>.<span class="hljs-title function_">find</span>($Navigation).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) <span class="hljs-keyword">continue</span>;
            chapter.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigated</span> /&gt;</span></span>);
            chapter.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">define</span>();
        }
        <span class="hljs-variable language_">super</span>.$Bound();
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">TheLibrary</span> = $($TheLibrary);
$(<span class="hljs-title class_">TheLibrary</span>, <span class="hljs-title class_">Theme</span>)(<span class="hljs-title class_">LibraryTheme</span>);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-theme" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Theme</div></a><div class="pd-section"><a href="#the-values-and-the-parts" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-values-and-the-parts" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The values and the parts</div></a><div class="pd-paragraph">A theme is a set of values, the font, the measure, the ink, the paper, the link, and the parts that use them: the page, the levels of a book, the labels, the links, the apparatus and the figures. The file beside this chapter is the one the book registers. It is the test library's theme as borrowed, a serif on warm paper, and it stands only until the sketches say what this library's own looks like.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { css, <span class="hljs-title class_">RuleSet</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'styled-components'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Theme } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'styled-components'</span> {
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">DefaultTheme</span> <span class="hljs-keyword">extends</span> $<span class="hljs-title class_">LibraryTheme</span> {}
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTheme</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Theme</span> {
    font = <span class="hljs-string">"Georgia, 'Times New Roman', serif"</span>;
    size = <span class="hljs-string">'1.0625rem'</span>;
    leading = <span class="hljs-string">'1.6'</span>;
    measure = <span class="hljs-string">'40rem'</span>;
    space = <span class="hljs-string">'1.25rem'</span>;
    ink = <span class="hljs-string">'#1b1b1b'</span>;
    paper = <span class="hljs-string">'#ffffff'</span>;
    link = <span class="hljs-string">'#1f4e79'</span>;
    <span class="hljs-attr">style</span>: <span class="hljs-title class_">ElementType</span> = selection.<span class="hljs-property">div</span><span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.parts()}</span>\`</span>;

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">parts</span>(): <span class="hljs-title class_">RuleSet</span>[] {
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">page</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">levels</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">labels</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">links</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">apparatus</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">figures</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">front</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">plate</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">navigation</span>()];
    }

    <span class="hljs-comment">// THE NAVIGATION, one line of apparatus at the top and bottom of a chapter, drawn around the chapter by the book's</span>
    <span class="hljs-comment">// Navigated format: three glyphs, the arrow looking back on the left, the square for the table of contents in the</span>
    <span class="hljs-comment">// middle, the arrow looking on at the right, on Doug's "left arrow, square, right arrow for the next previous and</span>
    <span class="hljs-comment">// table. Visually engaging" (2026-11-16); a self edge, the first or the last chapter's, keeps its place unseen.</span>
    <span class="hljs-comment">// Doug, the same day: "We need to be able to move easily."</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">navigation</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-navigation</span> { <span class="hljs-attribute">display</span>: flex; <span class="hljs-attribute">justify-content</span>: center; <span class="hljs-attribute">align-items</span>: baseline; <span class="hljs-attribute">gap</span>: .<span class="hljs-number">15em</span>; <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>); }
            *<span class="hljs-selector-pseudo">:has</span>(&gt; <span class="hljs-selector-class">.pd-navigation</span><span class="hljs-selector-pseudo">:first-child</span>) { <span class="hljs-attribute">position</span>: relative; }
            <span class="hljs-selector-class">.pd-navigation</span><span class="hljs-selector-pseudo">:first-child</span> { <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset-block-start</span>: .<span class="hljs-number">1rem</span>; <span class="hljs-attribute">inset-inline-end</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">font-size</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">55%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">transition</span>: color .<span class="hljs-number">15s</span> ease; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-pseudo">:is</span>(<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.pa-self-reference</span>, <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-self-reference</span>)) { <span class="hljs-attribute">pointer-events</span>: none; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-pseudo">:is</span>(<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.pa-self-reference</span>, <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-self-reference</span>)) <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">22%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); }
        \`</span>;
    }

    <span class="hljs-comment">// THE FRONT, the cover drawn as a book, Sprint 125: shown alone while the cover is the open page, the running</span>
    <span class="hljs-comment">// head, the byline and the cover chapter itself unseen then and back the moment another page opens; a page</span>
    <span class="hljs-comment">// that opens comes in with a short fade, the library's one transition. Sketch 004, form a.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">front</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attribute">display</span>: flex; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span>, <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-byline</span>, <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-comment">/* THE BOARD FILLS THE SCREEN, Doug, 2026-11-17: "make the book bigger... as large as possible given
               that my screen looks like this" — the board stands as tall as the screen allows, the book's upper
               margin above it and the same air below, its width following at a book's proportion and capped at
               the column on a narrow screen; every length on the board is an em of the board's own size, one
               twenty-second of its width, the size the 22rem board of Sprint 125 was drawn at, so the type and the
               frame grow with it as a print enlarges. The seven spaces taken from the screen's height are the
               three above and the three below, and one for the page to breathe at the bottom without a scrollbar. */</span>
            <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attr">--front-width</span>: <span class="hljs-built_in">min</span>(<span class="hljs-built_in">calc</span>((<span class="hljs-number">100vh</span> - <span class="hljs-number">7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) * <span class="hljs-number">2</span> / <span class="hljs-number">3</span>), <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">min</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.measure}</span><span class="language-css">, <span class="hljs-number">100vw</span>) - <span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">)); <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">box-sizing</span>: border-box; <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--front-width); <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--front-width) / <span class="hljs-number">22</span>); <span class="hljs-attribute">flex-direction</span>: column; <span class="hljs-attribute">align-items</span>: center; <span class="hljs-attribute">text-align</span>: center; <span class="hljs-attribute">aspect-ratio</span>: <span class="hljs-number">2</span> / <span class="hljs-number">3</span>; <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto <span class="hljs-built_in">calc</span>(<span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">); <span class="hljs-attribute">padding</span>: <span class="hljs-number">3em</span> <span class="hljs-number">2em</span> <span class="hljs-number">1.75em</span>; <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">50%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> .<span class="hljs-number">375em</span> </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">, inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-built_in">calc</span>(.<span class="hljs-number">375em</span> + <span class="hljs-number">1px</span>) <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">35%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">), <span class="hljs-number">2px</span> <span class="hljs-number">12px</span> <span class="hljs-number">28px</span> -<span class="hljs-number">12px</span> <span class="hljs-built_in">rgba</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, .<span class="hljs-number">45</span>); <span class="hljs-attribute">background</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-front</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>; <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset</span>: <span class="hljs-number">0</span> auto <span class="hljs-number">0</span> <span class="hljs-number">0</span>; <span class="hljs-attribute">width</span>: <span class="hljs-number">1.25em</span>; <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">22%</span>, transparent), <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">5%</span>, transparent) <span class="hljs-number">55%</span>, transparent); <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">pointer-events</span>: none; }
            <span class="hljs-selector-class">.pd-front</span> &gt; <span class="hljs-selector-tag">a</span>, <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">display</span>: block; }
            <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-class">.pa-reference</span> { <span class="hljs-attribute">color</span>: inherit; <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">text-decoration</span>: underline; <span class="hljs-attribute">text-underline-offset</span>: <span class="hljs-number">0.15em</span>; }
            <span class="hljs-selector-class">.pd-front-name</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2.4em</span>; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.1</span>; <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">margin-block</span>: .<span class="hljs-number">15em</span> .<span class="hljs-number">33em</span>; }
            <span class="hljs-selector-class">.pd-front-name</span><span class="hljs-selector-pseudo">::after</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>; <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">width</span>: <span class="hljs-number">1.45em</span>; <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">50%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">margin</span>: .<span class="hljs-number">375em</span> auto <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-front-author</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.15em</span>; <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">04em</span>; }
            <span class="hljs-selector-class">.pd-front-tagline</span> { <span class="hljs-attribute">font-style</span>: italic; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">75</span>; <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1.15em</span>; <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">95em</span>; }
            <span class="hljs-selector-class">.pd-front</span> &gt; <span class="hljs-selector-pseudo">:nth-last-child</span>(<span class="hljs-number">2</span>) { <span class="hljs-attribute">margin-top</span>: auto; }
            <span class="hljs-selector-class">.pd-front-imprint</span> { <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">74em</span>; <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">15em</span>; <span class="hljs-attribute">text-transform</span>: uppercase; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">65</span>; <span class="hljs-attribute">margin-top</span>: .<span class="hljs-number">47em</span>; }
            <span class="hljs-selector-class">.pa-page</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">animation</span>: come .<span class="hljs-number">5s</span> ease; }
            <span class="hljs-keyword">@keyframes</span> come { <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(<span class="hljs-number">1rem</span>); } <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">transform</span>: none; } }
        \`</span>;
    }

    <span class="hljs-comment">// THE PLATE, a publication's small picture at the top left of its page with the text flowing under it, Sprint</span>
    <span class="hljs-comment">// 125; its opening carries no underline, the picture being the link. Sketch 002, form a.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">plate</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-plate</span> { <span class="hljs-attribute">float</span>: inline-start; <span class="hljs-attribute">width</span>: <span class="hljs-number">11rem</span>; <span class="hljs-attribute">margin</span>: .<span class="hljs-number">25rem</span> <span class="hljs-number">1.5rem</span> <span class="hljs-number">1rem</span> <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pd-image</span> <span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">20%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-built_in">rgba</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, .<span class="hljs-number">12</span>); }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pa-opening</span> { <span class="hljs-attribute">text-decoration</span>: none; <span class="hljs-attribute">color</span>: inherit; }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pa-opening</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">8rem</span>; <span class="hljs-attribute">margin-top</span>: .<span class="hljs-number">4rem</span>; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">75</span>; <span class="hljs-attribute">text-decoration</span>: underline; }
            <span class="hljs-selector-class">.pd-chapter</span><span class="hljs-selector-pseudo">:has</span>(&gt; <span class="hljs-selector-class">.pd-paragraph</span> &gt; <span class="hljs-selector-class">.pd-plate</span>) &gt; <span class="hljs-selector-class">.pd-paragraph</span><span class="hljs-selector-pseudo">:first-child</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; }
            <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">max-width</span>: <span class="hljs-number">640px</span>) { <span class="hljs-selector-class">.pd-plate</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">7rem</span>; <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">1rem</span>; } }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">page</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-attribute">font-family</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span><span class="language-css">;
            <span class="hljs-attribute">font-size</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">;
            <span class="hljs-attribute">line-height</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.leading}</span><span class="language-css">;
            <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">;
            <span class="hljs-attribute">background</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">;
            <span class="hljs-attribute">max-width</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.measure}</span><span class="language-css">;
            <span class="hljs-attribute">margin-inline</span>: auto;
            <span class="hljs-attribute">padding</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">levels</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-comment">/* THE UPPER MARGIN STANDS EVERYWHERE, Doug, 2026-11-17: "No upper margin. That should be put back
               everywhere" — every page breathes above its first line. */</span>
            <span class="hljs-selector-class">.pd-book</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; <span class="hljs-attribute">counter-reset</span>: chapter equation; }
            <span class="hljs-selector-class">.pd-chapter</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; <span class="hljs-attribute">scroll-margin-block-start</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-page</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">margin-block-start</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>); }
            <span class="hljs-comment">/* NO LINE BREAKS, Doug, 2026-11-16: "No line break", then "Still breaks EVERYWHERE!!!" — a section
               carries no rule and no extra padding anywhere in the library; margins alone separate. */</span>
            <span class="hljs-selector-class">.pd-section</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-paragraph</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-item</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>); }
            <span class="hljs-selector-class">.pa-list</span> <span class="hljs-selector-class">.pa-item</span> { <span class="hljs-attribute">list-style-position</span>: outside; <span class="hljs-attribute">margin-inline-start</span>: <span class="hljs-number">1.2em</span>; }
            <span class="hljs-selector-class">.pd-title</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">1.5</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">); <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">margin-block-end</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-heading</span> { <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">1.15</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">); <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-section</span> &gt; <span class="hljs-selector-class">.pd-heading</span> { <span class="hljs-attribute">margin-block-start</span>: <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-section</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pd-paragraph</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-class">.pa-parenthetical</span>)))<span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pd-figure</span>)) { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-line</span> { <span class="hljs-attribute">white-space</span>: pre-wrap; }
            <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">overflow-wrap</span>: break-word; }
            <span class="hljs-selector-class">.pd-canonical</span><span class="hljs-selector-class">.pd-chapter</span> { <span class="hljs-attribute">counter-increment</span>: chapter; }
            <span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">margin-block-end</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>); }
            <span class="hljs-selector-class">.pd-canonical</span><span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">'Chapter '</span> <span class="hljs-built_in">counter</span>(chapter); }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">labels</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-label</span>, <span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> {
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">font-weight</span>: normal;
                <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.15em</span>;
                <span class="hljs-attribute">text-transform</span>: uppercase;
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.6</span>;
            }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">links</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pa-reference</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; <span class="hljs-attribute">text-decoration-color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; <span class="hljs-attribute">text-underline-offset</span>: <span class="hljs-number">0.15em</span>; }
            <span class="hljs-selector-class">.pa-self-reference</span> { <span class="hljs-attribute">color</span>: inherit; <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pa-referent</span> { <span class="hljs-attribute">scroll-margin-block-start</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-content</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">apparatus</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-comment">/* THE HEADER IS ONE COMPACT BAND, Doug, 2026-11-16: "You need to organize the header in the theme. It
               takes up too much space and isn't used. Look how far down the title of the chapter is. Wait are you
               making every chapter like a cover?!?" — the running head a bordered line with no paragraph margin, the
               byline one small line beneath it, author and subject side by side, not a title block of rows. */</span>
            <span class="hljs-selector-class">.pd-running-head</span> {
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.08em</span>;
                <span class="hljs-attribute">text-transform</span>: uppercase;
                <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span> <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>);
                <span class="hljs-attribute">padding-block-end</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>);
                <span class="hljs-attribute">border-block-end</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">30%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">);
            }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">text-decoration</span>: none; <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">70%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">; }
            <span class="hljs-comment">/* ONE HEADER, EVERY PAGE, ITS TABLE-NESS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of
               contents doesn't have the little square. Why isn't it the same thing as the others? Table of contents
               can be an attribute to capture polymorphism." — the same running head stands on every page, the square
               to the cover everywhere, the table's page included; only the title's destination flips, keyed here
               alone on the open table and the title's own data-to attribute. */</span>
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-square</span> { <span class="hljs-attribute">margin-inline-start</span>: <span class="hljs-number">0.6em</span>; }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"cover"</span>]</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-table-of-contents</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"table"</span>]</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-table-of-contents</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"cover"</span>]</span> { <span class="hljs-attribute">display</span>: inline; }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">figures</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-figure</span> { <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>; }
            <span class="hljs-selector-class">.pd-code</span> {
                <span class="hljs-attribute">font-family</span>: ui-monospace, monospace;
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.85</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.5</span>;
                <span class="hljs-attribute">white-space</span>: pre;
                <span class="hljs-attribute">overflow-x</span>: auto;
                <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
                <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.75</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
                <span class="hljs-attribute">border-inline-start</span>: <span class="hljs-number">2px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">25%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">);
            }
            <span class="hljs-selector-class">.pd-code-line</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(data-line); <span class="hljs-attribute">display</span>: inline-block; <span class="hljs-attribute">width</span>: <span class="hljs-number">3ch</span>; <span class="hljs-attribute">margin-inline-end</span>: <span class="hljs-number">1.5ch</span>; <span class="hljs-attribute">text-align</span>: end; <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.4</span>; <span class="hljs-attribute">user-select</span>: none; }
            <span class="hljs-selector-class">.pd-image</span> <span class="hljs-selector-tag">img</span>, <span class="hljs-selector-class">.pd-svg</span> <span class="hljs-selector-tag">svg</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">height</span>: auto; <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-document</span> <span class="hljs-selector-tag">object</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">aspect-ratio</span>: <span class="hljs-number">1</span> / <span class="hljs-number">1.4142</span>; <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-math</span>, <span class="hljs-selector-class">.pd-date</span> { <span class="hljs-attribute">white-space</span>: nowrap; }
            <span class="hljs-selector-class">.pd-equation</span> { <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">counter-increment</span>: equation; }
            <span class="hljs-selector-class">.pd-equation</span><span class="hljs-selector-pseudo">::after</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">'('</span> <span class="hljs-built_in">counter</span>(equation) <span class="hljs-string">')'</span>; <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset-inline-end</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>; <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-<span class="hljs-number">50%</span>); }
        \`</span>;
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">LibraryTheme</span> = $($LibraryTheme);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-running-head-and-the-byline" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Running Head and the Byline</div></a><div class="pd-section"><a href="#what-a-cover-exposes" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="what-a-cover-exposes" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">What a cover exposes</div></a><div class="pd-paragraph">The running head is the book's title alone, the minimal heading in the page's top margin, ruled 16 November 2026: pressed, it opens the table of contents — except on the table itself, where it opens the cover. The byline — who wrote the book, what it is about when the book is a subject's own, and its subject — is no longer drawn above the chapters; it lives on the front and in the table of contents. Both are read from the cover and nowhere else; neither is written in a chapter. A subject is a book made one by its About, so the four books whose subject is Mathematics resolve to the book that is about it. The file beside this chapter is both faces, borrowed from the test library.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $ } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Paragraph, $Word, <span class="hljs-title class_">Reference</span> <span class="hljs-keyword">as</span> reference, <span class="hljs-title class_">Word</span> <span class="hljs-keyword">as</span> word } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$RunningHead</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-running-head'</span>);
    }

    <span class="hljs-comment">// THE MINIMAL HEADING, Doug, 2026-11-16: "a minimal heading, at least with the book title and if you click it</span>
    <span class="hljs-comment">// it should go to the table of contents except the version on the table and that one takes you to the cover" —</span>
    <span class="hljs-comment">// just the book's title, both destinations bound, the theme showing the one the open page calls for.</span>
    <span class="hljs-comment">// THE TABLE-NESS IS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of contents doesn't have the</span>
    <span class="hljs-comment">// little square. Why isn't it the same thing as the others? Table of contents can be an attribute to capture</span>
    <span class="hljs-comment">// polymorphism." — one running head on every page: the title written twice, its destination carried by its</span>
    <span class="hljs-comment">// own data-to attribute and chosen by the theme in one place; the square to the cover always, the table's</span>
    <span class="hljs-comment">// page like any other.</span>
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-book-title"</span> <span class="hljs-attr">data-to</span>=<span class="hljs-string">"table"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.title?.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-book-title"</span> <span class="hljs-attr">data-to</span>=<span class="hljs-string">"cover"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.title?.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-square"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        ☐
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Label</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-label'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Byline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-byline'</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Label</span> = $(label);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Label</span>&gt;</span>Author<span class="hljs-tag">&lt;/<span class="hljs-name">Label</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.author?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.author?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                {book.about === undefined ? null : <span class="hljs-tag">&lt;&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Label</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">Label</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.about.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.about.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/&gt;</span></span>}
                &lt;<span class="hljs-title class_">Label</span>&gt;<span class="hljs-title class_">Subject</span>&lt;/<span class="hljs-title class_">Label</span>&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.subject?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.subject?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span></span>
            &lt;/&gt;
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">RunningHead</span> = $($RunningHead);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Label</span> = $($Label);
<span class="hljs-keyword">const</span> label = <span class="hljs-title class_">Label</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Byline</span> = $($Byline);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-open pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-faces" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Faces</div></a><div class="pd-section"><a href="#a-cover-a-synopsis-a-table" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="a-cover-a-synopsis-a-table" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">A cover, a synopsis, a table</div></a><div class="pd-paragraph">A face is how a book's apparatus looks: the cover a book opens on, the synopsis beside it, the table of contents that answers for its chapters and, when the book is a subject, for the books whose subject it is. Each is a word of the package dressed here, and every book of this library wears these four from the file beside this chapter, borrowed from the test library until a sketch replaces them.</div></div><div class="pd-section"><a href="#the-front" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-front" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The front</div></a><div class="pd-paragraph">Since 10 November 2026 the cover is drawn as a book: the front, in the file beside this chapter, a board of a book's shape standing alone on the page while the cover is the open page, as tall as the screen allows since 17 November 2026, its type growing with it, with the title, the author, the tagline and the imprint on it, read from what the cover already says, as the byline is; the tagline is one line of what the book is, said of the cover as its author is, and the synopsis's first paragraph stood in its place until 12 November 2026, when I struck it, "an extensive block is a synopsis", the synopsis being its own page, reached from the table; its words are its links, the title opening the table of contents, the author and the subject their books, the library's name the library, and the running head, the byline and the cover's own title stand unseen behind it until another page opens. The theme draws it and gives a page that opens its one transition, a short fade. Sketch 004 of <a href="/inexplicable-phenomena/mathematical-design/#the-papers-page" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Paper's Page</span></a>, form a, by my number.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $, $check, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Annotation, $Chapter, $Cover, $Format, $Paragraph, $Synopsis, $Table, $TableOfContents, $Word, $Writing, <span class="hljs-title class_">AnnotationSpecification</span>, <span class="hljs-title class_">Means</span> <span class="hljs-keyword">as</span> means, <span class="hljs-title class_">Next</span> <span class="hljs-keyword">as</span> nextWord, <span class="hljs-title class_">Previous</span> <span class="hljs-keyword">as</span> previousWord, <span class="hljs-title class_">Reference</span> <span class="hljs-keyword">as</span> reference, <span class="hljs-title class_">Word</span> <span class="hljs-keyword">as</span> word, html, specify } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// A TAGLINE IS ONE LINE OF WHAT THE BOOK IS, said of a cover as its author and its subject are, written in the cover</span>
<span class="hljs-comment">// file and drawn on the front; the synopsis is the block, and has its own page. Doug, 2026-11-12, Sprint 127: "You</span>
<span class="hljs-comment">// can add a one line note about what the book is. That would be a tagline, but an extensive block is a synopsis".</span>
<span class="hljs-comment">// PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Tagline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Annotation</span> {
    specification = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TaglineSpecification</span>();
    <span class="hljs-keyword">get</span> <span class="hljs-title function_">line</span>(): <span class="hljs-built_in">string</span> { <span class="hljs-keyword">return</span> html.<span class="hljs-title function_">copy</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>); }
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> { <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">line</span>; }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">TaglineSpecification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AnnotationSpecification</span> {
    <span class="hljs-meta">@specify</span>(<span class="hljs-string">'a tagline is said of a cover'</span>)
    $saidOfACover(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        $check(writing <span class="hljs-keyword">instanceof</span> $Chapter &amp;&amp; writing.<span class="hljs-title function_">is</span>($Cover), <span class="hljs-string">'a tagline is said of a cover, and this is not one'</span>);
    }
}

<span class="hljs-comment">// THE FRONT IS THE BOOK'S COVER DRAWN AS A BOOK: the title, the author, the tagline and the imprint on a board of a</span>
<span class="hljs-comment">// book's shape, standing alone on the page while the cover is open; its words are its links, the title to the table</span>
<span class="hljs-comment">// of contents, the author and the subject to their books, the library's name to the library. Drawn from what the</span>
<span class="hljs-comment">// cover already says, as the byline is. The synopsis's first paragraph stood on the board until 2026-11-12,</span>
<span class="hljs-comment">// Sprint 127, Doug: "get rid of the big wad of text on the cover... those notes are the synopsis, and they aren't</span>
<span class="hljs-comment">// bad, but then use the synopsis page"; the synopsis is its own chapter, reached from the table, and the tagline</span>
<span class="hljs-comment">// took its place on the board the same day. Sprint 125, Doug, 2026-11-10: "Give the cover the feel of a book... it</span>
<span class="hljs-comment">// should have the author and subject on the cover and not have the header", and on the first build, "various things</span>
<span class="hljs-comment">// should be clickable on the cover - author, subject and getting to the table", and "I don't like this 'Filed under'</span>
<span class="hljs-comment">// because that isn't about a subject", so the imprint names the subject plainly. Sketch 004 of the design book,</span>
<span class="hljs-comment">// form a. PROXY names: Front and its four words.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontName</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-name'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontAuthor</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-author'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontTagline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-tagline'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontImprint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-imprint'</span>); }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Front</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front'</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Name</span> = $(frontName);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Author</span> = $(frontAuthor);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Tagline</span> = $(frontTagline);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Imprint</span> = $(frontImprint);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Means</span> = $(means);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">const</span> tagline = book.<span class="hljs-property">cover</span>?.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">expressed</span>($Tagline);
        <span class="hljs-comment">// THE TABLE'S ADDRESS IS ITS TITLE'S, as the running head reads it: a chapter's means is the means its title</span>
        <span class="hljs-comment">// carries, and the table chapter itself carries none.</span>
        <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Name</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.title?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Name</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Author</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.author?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.author?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Author</span>&gt;</span>
                {tagline === undefined ? null : <span class="hljs-tag">&lt;<span class="hljs-name">Tagline</span>&gt;</span>{tagline.line}<span class="hljs-tag">&lt;/<span class="hljs-name">Tagline</span>&gt;</span>}
                <span class="hljs-tag">&lt;<span class="hljs-name">Imprint</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.subject?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.subject?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Imprint</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Imprint</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Means</span>&gt;</span>$[[ Inexplicable Phenomena ]]<span class="hljs-tag">&lt;/<span class="hljs-name">Means</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">Imprint</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }
}

<span class="hljs-comment">// THE NAVIGATION, Doug, 2026-11-16: "You need next and table of contents and previous on the top and bottom of</span>
<span class="hljs-comment">// every chapter in the library. We need to be able to move easily." One line of apparatus in the running head's</span>
<span class="hljs-comment">// register: the previous chapter's title on the left, Contents in the middle on the table's address, the next</span>
<span class="hljs-comment">// chapter's title on the right; an edge with no neighbour keeps its place empty so the line holds. Written into</span>
<span class="hljs-comment">// a chapter for now; the seam that puts it on every chapter of the library awaits his word on the layer.</span>
<span class="hljs-comment">// PROXY name. Styled by the theme as pd-navigation.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Navigation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-navigation'</span>);
    }

    <span class="hljs-comment">// THE WORDS ARE MADE AT THE BOND, not in write(): Previous and Next take their references in their own bond,</span>
    <span class="hljs-comment">// and the bond reaches only the authored tree, so a word made at render stood on the page as plain text, seen</span>
    <span class="hljs-comment">// on the bound textbook page on 2026-11-16, Contents the only link of the three. At an edge the package</span>
    <span class="hljs-comment">// answers the chapter itself, never nothing, and Next means it as a Self; the theme keeps that edge's place</span>
    <span class="hljs-comment">// and hides it.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Bound(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> chapter = <span class="hljs-variable language_">this</span>.<span class="hljs-property">chapter</span>;
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (chapter !== <span class="hljs-literal">undefined</span> &amp;&amp; book !== <span class="hljs-literal">undefined</span> &amp;&amp; [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>].<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Previous</span> = $(previousWord);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Next</span> = $(nextWord);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
            <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
            <span class="hljs-comment">// THREE CHARACTERS IN A ROW, Doug, 2026-11-16, after the buttons were refused: "Not a button!! I</span>
            <span class="hljs-comment">// wanted in three characters a left triangle (not arrow) and then a square in the middle that goes</span>
            <span class="hljs-comment">// to table, then the right arrow as a triangle. Three characters in a row like the arrow we use in</span>
            <span class="hljs-comment">// catalogues to go straight to a book", and on sight: "ALL WHITE OUTLINE characters!! Just three</span>
            <span class="hljs-comment">// characters. left triangle square (not filled in!!!) right arrow. Grey it but don't hide it. Don't</span>
            <span class="hljs-comment">// make it take up the whole line" — ◁ □ ▷, outline glyphs, solid grey, a cluster of their own width.</span>
            <span class="hljs-comment">// LSR, Doug, 2026-11-16: "Three characters. Up against each other. Spaced like in text. Same height.</span>
            <span class="hljs-comment">// White with outline. Two triangles and a square. The ones we use in cataloguing pages and we used to</span>
            <span class="hljs-comment">// use in my library for a canonical reference." — and, on the plain square inking 8px against the</span>
            <span class="hljs-comment">// triangles' 13, "Not the same size!!", and on the rounded ▢, "It has rounded edges. Pretty sure</span>
            <span class="hljs-comment">// there is a character. But all three have to match": measured in Chrome, ☐ inks 12×13 at ascent 12</span>
            <span class="hljs-comment">// with sharp corners — the triangles' own metrics — so the trio is ◁ ☐ ▷, typed tight at text size;</span>
            <span class="hljs-comment">// no edge is ever hidden.</span>
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Previous</span>&gt;</span>◁<span class="hljs-tag">&lt;/<span class="hljs-name">Previous</span>&gt;</span></span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    ☐
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span></span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Next</span>&gt;</span>▷<span class="hljs-tag">&lt;/<span class="hljs-name">Next</span>&gt;</span></span>
            );
        }
        <span class="hljs-variable language_">super</span>.$Bound();
    }
}

<span class="hljs-comment">// NAVIGATED, said of a chapter by its book, the seam of 2026-11-16: a format whose layer wraps the chapter's</span>
<span class="hljs-comment">// element with the navigation above it and below it. The two lines are the format's own text, so the chapter's</span>
<span class="hljs-comment">// bond reaches them and their words take their links; the layer draws those two instances and makes nothing at</span>
<span class="hljs-comment">// render. A format's layer stands outside the chapter's element, which Paginated hides by a class on the element</span>
<span class="hljs-comment">// itself, so the layer hides itself whenever its page is not the open one. The book says it of every chapter but</span>
<span class="hljs-comment">// the cover, whose page is the front, and leaves alone a chapter that already says Navigation in its own text.</span>
<span class="hljs-comment">// PROXY name; reads "this chapter is Navigated".</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Navigated</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Format</span> {
    specification = <span class="hljs-keyword">new</span> <span class="hljs-title class_">NavigatedSpecification</span>();
    <span class="hljs-keyword">protected</span> <span class="hljs-attr">_layer</span>?: <span class="hljs-title class_">ElementType</span>;
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        &amp;:not(:has(.pa-page.pa-open)) { display: none; }
    \`</span>;

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigation</span> = $(navigation);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span></span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span></span>
        );
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">defines</span>(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        writing.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pa-navigated'</span>);
        writing.<span class="hljs-property">containers</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">layer</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">erase</span>(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        writing.<span class="hljs-property">containers</span>.<span class="hljs-title function_">revert</span>(<span class="hljs-variable language_">this</span>);
        writing.<span class="hljs-property">classes</span>.<span class="hljs-title function_">revert</span>(<span class="hljs-variable language_">this</span>);
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">get</span> <span class="hljs-title function_">layer</span>(): <span class="hljs-title class_">ElementType</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span> !== <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Style</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">style</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">ElementType</span>;
        <span class="hljs-keyword">const</span> [above, below] = [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>];
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Above</span> = $(above);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Below</span> = $(below);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span> = <span class="hljs-function">(<span class="hljs-params">{ className, children }: { className?: <span class="hljs-built_in">string</span>; children?: ReactNode }</span>) =&gt;</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Style</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span><span class="language-css">
                &lt;Above /&gt;
                {children}
                &lt;Below /&gt;
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">Style</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">NavigatedSpecification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AnnotationSpecification</span> {
    <span class="hljs-meta">@specify</span>(<span class="hljs-string">'navigated is said of a chapter'</span>)
    $saidOfAChapter(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        $check(writing <span class="hljs-keyword">instanceof</span> $Chapter, <span class="hljs-string">'navigated is said of a chapter, and this is not one'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryCover</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Cover</span> {
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">header</span><span class="hljs-string">\`
        .pd-chapter.pa-cover { margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> calc(2 * <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibrarySynopsis</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Synopsis</span> {
    style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTableOfContents</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$TableOfContents</span> {

    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">nav</span><span class="hljs-string">\`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>);
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Table</span> {
    <span class="hljs-keyword">override</span> style = <span class="hljs-title function_">selection</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">style</span>)<span class="hljs-string">\`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 3) calc(0.75 * <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>) calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 3) 0; border-block-start: 1px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 15%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 35%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 15%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Cover</span> = $($LibraryCover);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Synopsis</span> = $($LibrarySynopsis);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">TableOfContents</span> = $($LibraryTableOfContents);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Table</span> = $($LibraryTable);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontName</span> = $($FrontName);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontAuthor</span> = $($FrontAuthor);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontTagline</span> = $($FrontTagline);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontImprint</span> = $($FrontImprint);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Tagline</span> = $($Tagline);
<span class="hljs-keyword">const</span> frontName = <span class="hljs-title class_">FrontName</span>;
<span class="hljs-keyword">const</span> frontAuthor = <span class="hljs-title class_">FrontAuthor</span>;
<span class="hljs-keyword">const</span> frontTagline = <span class="hljs-title class_">FrontTagline</span>;
<span class="hljs-keyword">const</span> frontImprint = <span class="hljs-title class_">FrontImprint</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Front</span> = $($Front);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigation</span> = $($Navigation);
<span class="hljs-keyword">const</span> navigation = <span class="hljs-title class_">Navigation</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigated</span> = $($Navigated);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="developing-the-library" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">Developing the Library</div></a><div class="pd-section"><a href="#the-loop" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-loop" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The loop</div></a><div class="pd-paragraph">A save shows on an open page in under a second; a bind is the gate at the end of a piece of work and never the way to look during one. The workbench beside this chapter is the loop: it serves the library live from its sources, keeps one browser open on it, and answers a look with what it found and a photograph. Borrowed from the librarian's own library on 2026-10-30, its built address this library's.</div><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">node library/.reference/5-developing-the-library~workbench.mjs, once, left open</div><div class="pd-sentence pd-line pa-item">node library/.reference/5-developing-the-library~workbench.mjs look the-team</div><div class="pd-sentence pd-line pa-item">the same with built for the site the last bind made, phone for a phone's width, close at the end</div></div></div></div><div class="pd-section"><a href="#the-bind-and-the-site" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-bind-and-the-site" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The bind and the site</div></a><div class="pd-paragraph">In the binding beside the site, npm run bind binds every book and leaves the site under the base the configuration names, and npm run preview with its port serves what the bind left. The site is committed as it is bound, and what is published is what was committed.</div><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">cd library/.public/.binding</div><div class="pd-sentence pd-line pa-item">npm run bind</div><div class="pd-sentence pd-line pa-item">npm run preview -- --port 4343 --strictPort</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-paper" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Paper</div></a><div class="pd-section"><a href="#a-papers-page" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="a-papers-page" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">A paper's page</div></a><div class="pd-paragraph">A paper is a citable publication held in the library as a resource: the file itself beside a chapter of <a href="/inexplicable-phenomena/mathematical-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Library of Mathematics</span></a>, which carries the paper's citation and the notes its author writes on it, the paper signed by its own author. The page is minimal, on my word of 10 November 2026: a small picture of the publication at the top left with the text flowing under it, the citation, the notes, and a link that opens the publication in another tab; the picture itself opens it. The page's form is sketch 002 of the design book, form a.</div></div><div class="pd-section"><a href="#the-plate-and-the-opening" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-plate-and-the-opening" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The plate and the opening</div></a><div class="pd-paragraph">Two words in the file beside this chapter. A plate is the word that carries the picture, floated at the top left of the chapter by the theme; an opening is a reference that opens its address in another tab, a twin of the package's own reference with its anchor given a target. A chapter writes the plate first, before its title, as a word holding an opening whose text is the paper's literal and an image whose text is the picture's: the literals become the two files' addresses at the bind, so the picture is served beside the pages and the paper with it.</div></div><div class="pd-section"><a href="#the-picture" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-picture" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The picture</div></a><div class="pd-paragraph">The picture is the paper's first page, made once by the tool beside this chapter: Chrome's own viewer draws the PDF with its toolbar and panes asked off, served to it by the tool since the viewer draws nothing opened from the disk as a file, photographed at a page's shape and cut to the page. The tool takes a page number for a scan of a bound book, which opens on its boards: Lobachevsky's title page is its fifth leaf. It stands beside the paper's chapter as a picture, named by the plate's literal, and is made again only when the paper changes.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Reference, $Word } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// A PLATE IS THE SMALL PICTURE OF A PUBLICATION ON ITS PAGE, at the top left with the text flowing under it; the</span>
<span class="hljs-comment">// word carries the picture and the opening that takes a reader to the publication. Sprint 125, Doug, 2026-11-10:</span>
<span class="hljs-comment">// "a small picture of the publication... And then clicking it perhaps causes it to open in another tab". PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Plate</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-plate'</span>);
    }
}

<span class="hljs-comment">// AN OPENING IS A REFERENCE THAT OPENS ITS ADDRESS IN ANOTHER TAB, a twin of the package's Reference with the anchor</span>
<span class="hljs-comment">// given its target, in the library's own code and nowhere in the package. PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Opening</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Reference</span> {
    <span class="hljs-keyword">override</span> <span class="hljs-attr">anchor</span>: <span class="hljs-title class_">ElementType</span> = selection.<span class="hljs-property">a</span>.<span class="hljs-title function_">attrs</span>({ <span class="hljs-attr">className</span>: <span class="hljs-string">'pa-reference pa-opening'</span>, <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>, <span class="hljs-attr">rel</span>: <span class="hljs-string">'noopener'</span> })<span class="hljs-string">\`\`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Plate</span> = $($Plate);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Opening</span> = $($Opening);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-reference-manual" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Reference Manual</div></a><div class="pd-section"><a href="#1-what-a-reference-manual-is" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-what-a-reference-manual-is" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. What a reference manual is</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 Every subject carries a reference manual: the specification of that subject in this library. This book is the library's own. I ruled this on 12 November 2026, at the opening of the textbook's sprint.</div><div class="pd-sentence pd-line pa-item">1.2 A subject's manual keeps a part for the books of its subject, one chapter per book, and that chapter tracks the book's idioms — the conventions its chapters follow.</div><div class="pd-sentence pd-line pa-item">1.3 Where an idiom is enforced by code, the code stands with the chapter that states it, the way this book's theme and faces stand beside theirs; an idiom followed by hand is stated in the same place and marked so.</div><div class="pd-sentence pd-line pa-item">1.4 A manual is written the way a specification is — numbered parts, referenced code — in the form of <a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>; I asked for this on 16 November 2026, and this chapter is the first so written.</div></div></div></div><div class="pd-section"><a href="#2-the-three-shelves" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-three-shelves" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The three shelves</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 What is true of every book in the library lives here, in Our Reference.</div><div class="pd-sentence pd-line pa-item">2.2 What is true of a subject's books lives in that subject's manual. The first is <a href="/inexplicable-phenomena/mathematical-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Referential Objectivity</span></a>, whose part The Books tracks the notebook, the textbook, the project, the library and the design.</div><div class="pd-sentence pd-line pa-item">2.3 What is true of one book alone stays beside that book, never in a manual.</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-specification" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Specification</div></a><div class="pd-paragraph">The specification of a specification, written in its own form. I chose the form of a legal document on 16 November 2026, its anatomy the contract's — recitals, articles, clauses, defined terms, provisos, schedules — evolved for a library that specifies deliverables. The form is the library's; a subject may redress it to fit its style, as a theme redresses a page. Mathematics writes its own in <a href="/inexplicable-phenomena/mathematical-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>, and the first full instance is the statement of work of <a href="/inexplicable-phenomena/arithmetic-textbook/#the-symmetry-of-arithmetic" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Symmetry of Arithmetic</span></a>.</div><div class="pd-section"><a href="#1-purpose" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-purpose" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. Purpose</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 A specification is the formal identification of a deliverable — the thing agreed between buyer and seller in a service contract. It fixes what the deliverable must be, uniquely, so that candidates can be judged against it and the right one recognized when it is found. The specification is the legal document; the deliverable is not.</div><div class="pd-sentence pd-line pa-item">1.2 The specification is the anchor for the work. The work meets the specification part by part, and the deliverable cites each part as it is met.</div><div class="pd-sentence pd-line pa-item">1.3 A demand that cannot be checked has specified nothing, and a demand is stated so that it can fail.</div></div></div></div><div class="pd-section"><a href="#2-the-parts" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-parts" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The parts</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 The preamble — the contract's recitals. What the document is and the choice it records, standing before the numbered sections and carrying no number.</div><div class="pd-sentence pd-line pa-item">2.2 The sections — the contract's articles. Each bears a number and a name, and the sections run in one sequence.</div><div class="pd-sentence pd-line pa-item">2.3 The clauses. A section nests numbered parts: clause 2.3 is the third clause of section 2. A clause nests further where its matter requires it.</div><div class="pd-sentence pd-line pa-item">2.4 The labels — the contract's defined terms. A recurring kind of clause carries a letter and a number, defined where the clause is stated; in the first instance, the known results K, the constraints C, and the open determinations O.</div><div class="pd-sentence pd-line pa-item">2.5 The provisos. Where a demand is motivated, the motivation stands beside it and says so.</div><div class="pd-sentence pd-line pa-item">2.6 The tables. A table states what a table states best — axioms, results, tests — and its rows are clauses carrying their labels.</div></div></div></div><div class="pd-section"><a href="#3-citation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="3-citation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">3. Citation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">3.1 The specification references itself. Any clause cites any other by its number or its label, in free-form citation language, and every citation is a link to the clause it names.</div><div class="pd-sentence pd-line pa-item">3.2 A specification is highly connected: where a clause depends on another, motivates it, or constrains it, it says so by citation.</div><div class="pd-sentence pd-line pa-item">3.3 Citation reaches across the project's documents: the specification cites the progress by its labels, and the progress cites the specification by its numbers.</div></div></div></div><div class="pd-section"><a href="#4-boundary" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="4-boundary" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">4. Boundary</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">4.1 The specification states where it ends. Nothing outside the boundary binds the work.</div><div class="pd-sentence pd-line pa-item">4.2 What stands after the end is the schedules — the contract's annexes: reference bearing on the work and binding none of it.</div></div></div></div><div class="pd-section"><a href="#5-interpolation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="5-interpolation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">5. Interpolation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">5.1 What is specified and not yet found stands as a placeholder for itself, in a brace naming the open determination it waits on.</div><div class="pd-sentence pd-line pa-item">5.2 The work closes when the last placeholder is replaced by the thing it stands for.</div></div></div></div><div class="pd-section"><a href="#6-permanence" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="6-permanence" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">6. Permanence</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">6.1 A specification is not thrown away. It is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing.</div><div class="pd-sentence pd-line pa-item">6.2 A change is made by changing the specification, in the context of all its other parts.</div></div></div></div><div class="pd-section"><a href="#7-the-implementation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="7-the-implementation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">7. The implementation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">7.1 The implementation meets the specification part by part, and cites each part as it is met, by its number or its label.</div><div class="pd-sentence pd-line pa-item">7.2 A citation from the implementation leads to the part it names, and the specification stands beside what implements it: the two forms are each reachable from the other.</div><div class="pd-sentence pd-line pa-item">7.3 A justification is the annotation form of this relationship: it says how the implementation satisfies a part, citing the part by number.</div></div></div></div><div class="pd-section"><a href="#8-format" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="8-format" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">8. Format</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">8.1 The format chosen here is the legal document, as this chapter is written: a preamble, then numbered, named sections of numbered clauses.</div><div class="pd-sentence pd-line pa-item">8.2 A subject may change the format to fit its style. The form of sections 1 to 7 — purpose, parts, citation, boundary, interpolation, permanence, implementation — is kept; the dress is the subject's.</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span class="pd-word pd-next pa-reference pa-self-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-content" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Content</div></a><div class="pd-paragraph">A thing with a front and a back, lifted to the library level on 17 November 2026 because content with a project will stand in a lot of places. On the front the deliverable — the result of the effort, looking like what it is. On the back the project — the formal representation of the work, whose specification takes the form of <a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>. The first case and the mathematics specialization stand in <a href="/inexplicable-phenomena/mathematical-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Content</span></a>.</div><div class="pd-section"><a href="#1-the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-the-content" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. The content</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 A piece of content is the content of its chapter, starting below the title, like a section; it has a front and a back, and shows one side at a time.</div><div class="pd-sentence pd-line pa-item">1.2 The front is the deliverable; the back is the project. One unlabelled control at the title's right flips them, explored rather than read.</div><div class="pd-sentence pd-line pa-item">1.3 It opens on the deliverable; the canonical side is overridable.</div><div class="pd-sentence pd-line pa-item">1.4 On the back the title turns into the literal — # Title in the source face, flush with the column — and that is the back's whole signal.</div></div></div></div><div class="pd-section"><a href="#2-the-project" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-project" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The project</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 The specification and the progress are the project's named parts, sections naming themselves; nothing is mandatory, and the parts stand open and whole — nothing collapses.</div><div class="pd-sentence pd-line pa-item">2.2 The project's documents render verbatim through the markdown of the package, the specification in the source pane's register — the editor's face at the measured same-space settings, equations typeset into native MathML at bind time.</div><div class="pd-sentence pd-line pa-item">2.3 The documents are highly connected: the renderer speaks the specification's own citation language, every mention a link to its definition across the documents, and a citation click turns the page itself, never the address.</div><div class="pd-sentence pd-line pa-item">2.4 The implementation cites the specification by number or label, and the citation flips the content to the part it names — the relationship between the two forms.</div><div class="pd-sentence pd-line pa-item">2.5 What is specified and not yet found stands interpolated, a word for the thing until the thing is found.</div></div></div></div><div class="pd-section"><a href="#3-the-motion" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="3-the-motion" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">3. The motion</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">3.1 The flip is a permutation that preserves identity: one axis turns, writing to code; boxes, weights, gaps, palette and structure ride through unchanged, measured by rectangle.</div><div class="pd-sentence pd-line pa-item">3.2 The transition is the plain text version of one: the chapter settles from dimmed ink, and the title's discrete changes — font, place, mark — happen together at the dip's hidden trough, dimmed by color so the chapter's label changes with nothing.</div></div></div></div><div class="pd-section"><a href="#4-the-components" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="4-the-components" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">4. The components</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">4.1 Content, the format whose note is the toggle and whose style rules the sides. Project, the back's section; Specification and Progress, its named parts.</div><div class="pd-sentence pd-line pa-item">4.2 Markdown, the document rendered verbatim and connected. Cite, the implementation's citation. Interpolated, the placeholder.</div><div class="pd-sentence pd-line pa-item">4.3 A subject specializes the deliverable's dress — mathematics adds Theorem and Proof beside its own manual chapter — and re-exports the family so its books keep one door.</div></div></div></div><div class="pd-section"><a href="#5-the-open-ends" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="5-the-open-ends" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">5. The open ends</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">5.1 The names: Content collides with the package's word for a Word's content, and Specification with a package utility; both flagged, his to settle, likeliest when the family moves all the way into the package.</div><div class="pd-sentence pd-line pa-item">5.2 A subclass cannot yet extend a format's style, so a subject's dress rides inert in the lifted style until the framework grows the composition seam; named, not hacked around.</div><div class="pd-sentence pd-line pa-item">5.3 The justifications associate with the progress; the exact tie stands open.</div></div></div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MouseEvent</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> katex <span class="hljs-keyword">from</span> <span class="hljs-string">'katex'</span>;
<span class="hljs-keyword">import</span> { marked } <span class="hljs-keyword">from</span> <span class="hljs-string">'marked'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Append, $Format, $Paragraph, $Section, $Word, html } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15 and respecified from his answers of</span>
<span class="hljs-comment">// 2026-11-16: the content of a chapter, starting below the title, like a section. On the front the DELIVERABLE —</span>
<span class="hljs-comment">// the object, the result of the effort of the team, looking like what it is, a familiar chapter. On the back</span>
<span class="hljs-comment">// the PROJECT — the formal representation of the work: the statement of work, the progress, a plan, a</span>
<span class="hljs-comment">// discussion — the talk page behind a wikipedia article, and nothing is mandatory. The project side carries</span>
<span class="hljs-comment">// the formal visual language. The name Content is a PROXY until he keeps it. The content is a format said of</span>
<span class="hljs-comment">// its chapter: its note draws the one unlabelled toggle in place, and its style wraps the chapter, so the</span>
<span class="hljs-comment">// checked control rules what shows — everything that is not the project is the deliverable.</span>
<span class="hljs-comment">// LIFTED TO THE LIBRARY LEVEL, Doug, 2026-11-17: "Make sure this is in components that can be reused and at</span>
<span class="hljs-comment">// the right level reference manual. We will need this everywhere there is content with a project, which will</span>
<span class="hljs-comment">// be in a lot of places" — the general family lives here in Our Reference; a subject specializes the</span>
<span class="hljs-comment">// deliverable's dress, as mathematics does with Theorem and Proof beside its own manual chapter. One flagged</span>
<span class="hljs-comment">// wart rides with the lift: the theorem and proof rules stay in this style, inert until a subject's classes</span>
<span class="hljs-comment">// activate them, because a subclass cannot yet extend a format's style — the composition seam is an open</span>
<span class="hljs-comment">// question for the framework, named rather than hacked around.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Content</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Format</span> {
    $canonical = <span class="hljs-string">'deliverable'</span>;

    <span class="hljs-comment">// THE DISSOLVE, Doug, 2026-11-17: "I still don't like the transition... It feels too slow. The flicker is</span>
    <span class="hljs-comment">// bad", "You must know what a good and a bad transition is", "It should be faster, less perceptible and</span>
    <span class="hljs-comment">// if there is a white flash, it is perceptible." The flipbook frames convicted the dip: an omitted</span>
    <span class="hljs-comment">// keyframe property interpolates to its base rather than stepping, so the out direction glided 28px over</span>
    <span class="hljs-comment">// six frames with the font swapping mid-slide and the label lurching when margin and padding fell out of</span>
    <span class="hljs-comment">// step — and the trough itself was the white flash, a title-shaped gap of paper. The good transition is</span>
    <span class="hljs-comment">// the platform's own cross-dissolve: the flip runs inside startViewTransition, the old frame never</span>
    <span class="hljs-comment">// leaving before the new covers it — no absence, no motion, one dissolve of the whole page at 140ms.</span>
    <span class="hljs-comment">// Every hand-rolled keyframe is retired; the states swap instantly inside the update and the browser</span>
    <span class="hljs-comment">// carries the blend. The duration rules ride a plain style tag because view-transition pseudos live at</span>
    <span class="hljs-comment">// the document root, beyond a scoped sheet's reach; reduced motion collapses the dissolve to the swap.</span>
    flip = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLLabelElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        press.<span class="hljs-title function_">preventDefault</span>();
        <span class="hljs-keyword">const</span> box = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'pc-flip'</span>);
        <span class="hljs-keyword">if</span> (!(box <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLInputElement</span>)) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">const</span> turn = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> { box.<span class="hljs-property">checked</span> = !box.<span class="hljs-property">checked</span>; };
        <span class="hljs-keyword">const</span> doc = <span class="hljs-variable language_">document</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Document</span> &amp; { <span class="hljs-attr">startViewTransition</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">update</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">unknown</span> };
        <span class="hljs-keyword">if</span> (doc.<span class="hljs-property">startViewTransition</span> === <span class="hljs-literal">undefined</span>) <span class="hljs-title function_">turn</span>();
        <span class="hljs-keyword">else</span> doc.<span class="hljs-title function_">startViewTransition</span>(turn);
    };

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">note</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="language-css">{'::<span class="hljs-built_in">view-transition-old</span>(root), ::<span class="hljs-built_in">view-transition-new</span>(root) { <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">0.14s</span>; <span class="hljs-attribute">animation-timing-function</span>: ease; } <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">prefers-reduced-motion</span>: reduce) { ::<span class="hljs-built_in">view-transition-old</span>(root), ::<span class="hljs-built_in">view-transition-new</span>(root) { <span class="hljs-attribute">animation</span>: none <span class="hljs-meta">!important</span>; } }'}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pc-content"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.flip}</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                        <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>
                        <span class="hljs-attr">id</span>=<span class="hljs-string">"pc-flip"</span>
                        <span class="hljs-attr">defaultChecked</span>=<span class="hljs-string">{this.$canonical</span> === <span class="hljs-string">'project'</span>}
                    /&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pc-flip"</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }

    <span class="hljs-comment">// ONE UNLABELLED CONTROL TO THE RIGHT OF THE TITLE, Doug, 2026-11-16: "how about a toggle to the right of</span>
    <span class="hljs-comment">// the title and it has no label. One can just explore" — and the back announces itself in the literal:</span>
    <span class="hljs-comment">// the title turns into # Title while the project side shows; the [Project] tag of the same day is struck.</span>
    <span class="hljs-comment">// THE FLIP SETTLES, Doug, 2026-11-16: "that has being aligned will cause a jump and it is the jump of</span>
    <span class="hljs-comment">// coming out of the matrix. Is there a slight transition... It would have to be very subtle because this</span>
    <span class="hljs-comment">// is a text-oriented site" — the frame holds still and the chapter's content alone eases from dimmed ink</span>
    <span class="hljs-comment">// to full, a print developing; nothing moves, since movement would break the sameness. Two identical</span>
    <span class="hljs-comment">// keyframes under two names so each direction restarts the settle; reduced motion is honored.</span>
    <span class="hljs-comment">// THE SOURCE PANE IS A WHITE VSCODE, his rulings of 2026-11-16: "a white vscode theme that feels natural.</span>
    <span class="hljs-comment">// Takes up the same space as the other side", then "sameness in layout — the same title in same place,</span>
    <span class="hljs-comment">// gets a # and changes font", then "choose a monospace that doesn't feel too hard". The elegance answer:</span>
    <span class="hljs-comment">// VS Code's own Windows default is Consolas, not the terminal's rounder, heavier Cascadia — so Consolas</span>
    <span class="hljs-comment">// leads the stack, at the same-space setting the sweep measured (the same passage at the column's 640px:</span>
    <span class="hljs-comment">// Georgia 17px on 27.2px stands 272px; Consolas 14.5px on 22.5px stands 270px), .85 of the book's size on</span>
    <span class="hljs-comment">// a 1.55 line. SAMENESS IN LAYOUT: the Chapter label's ::before is untouched and pinned to the book's</span>
    <span class="hljs-comment">// face and ink, so the title's box is identical on both sides; the # sits flush at the column's left</span>
    <span class="hljs-comment">// edge — his correction of the gutter: "the # has to be left aligned with everything else and the</span>
    <span class="hljs-comment">// transition was: Title to # Title" — the text easing right by the mark's exact width (Consolas advance</span>
    <span class="hljs-comment">// .55em, two characters of the title's 1.5 size = 1.65 * size), the Chapter label held still by an equal</span>
    <span class="hljs-comment">// negative margin animated on the same curve. The motion is his "canonical experience of moving from</span>
    <span class="hljs-comment">// literal to symbol. From object to its representation", pulled back on his "this is plain text. It</span>
    <span class="hljs-comment">// needs to be the plain text version of a transition": one clock, one curve, the staged delay of the</span>
    <span class="hljs-comment">// first cut retired as theater. THE GLIDE RETIRED, Doug, 2026-11-17: "There's a sort of jank when going</span>
    <span class="hljs-comment">// to specification mode" — photographed frame by frame, the title had already turned to Consolas and the</span>
    <span class="hljs-comment">// body to the specification at the first frame, and the title then slid right for 160ms after the fact;</span>
    <span class="hljs-comment">// a swap that lands at once and then moves is two events, and the second reads as the first stuttering.</span>
    <span class="hljs-comment">// Plain text has no tween: the title takes its code form and its place in the same frame, the mark with</span>
    <span class="hljs-comment">// it, and the settle alone is the transition — the whole chapter, title included, developing from dimmed</span>
    <span class="hljs-comment">// ink to full. THE DIP, Doug, the same night: "The appearance of the symbol and change in font is weird.</span>
    <span class="hljs-comment">// It feels off... Font and position can happen concurrently unless it's janky" — the one-frame swap was</span>
    <span class="hljs-comment">// still watchable, so it moves to where it cannot be watched: the title dims over 120ms, and at the</span>
    <span class="hljs-comment">// trough the font, the place, the label's hold and the mark all change together in one hidden instant —</span>
    <span class="hljs-comment">// concurrent, as he allows — then it rises as code over 120ms. The discrete steps live inside the</span>
    <span class="hljs-comment">// keyframes at 49.9/50.1 so nothing ever changes while visible; the glide stays retired. The dip dims by</span>
    <span class="hljs-comment">// COLOR, not opacity — his "You have chapter1 disappearing. Why?" — because element opacity sinks the</span>
    <span class="hljs-comment">// ::before label with the text; the text alone fades to transparent, the label's ink pinned on both</span>
    <span class="hljs-comment">// states, the # on its own clock. The frame never flickers, and the label changes with nothing.</span>
    <span class="hljs-comment">// The section headings keep the serif heading's box — 1.15 of the size, the section's margin. The palette</span>
    <span class="hljs-comment">// came from an eight-variant matrix photographed beside the serif reference, on his "Play around. Be</span>
    <span class="hljs-comment">// creative. Get it to match... Don't have the markdown be LOUD!!": the quiet winner keeps title, headings,</span>
    <span class="hljs-comment">// leads and body in the book's own ink at regular weight, and colors only the # and ## marks in the</span>
    <span class="hljs-comment">// theme's link — the color the citations already wear on both sides. His harmony rule finished it: the</span>
    <span class="hljs-comment">// italics too stay in the ink, italic their only voice; the one foreign magenta went with the blues.</span>
    <span class="hljs-comment">// THE PERMUTATION TEST, his anchor of 2026-11-16: "the same theme flipped over some axis of code to</span>
    <span class="hljs-comment">// writing, but occupying the same space and having the same feel... the feel of the permutation while</span>
    <span class="hljs-comment">// preserving identity." Measured type by type: weight is identity, so the title and the section headings</span>
    <span class="hljs-comment">// stay bold through the flip; and the tables shed the rendered-markdown cards for the front's own dress —</span>
    <span class="hljs-comment">// the browser read the book's table as an open grid, no borders, no backgrounds, header row regular —</span>
    <span class="hljs-comment">// which also obeys his oldest law of the night, no lines anywhere. Columns separate by air, rows by their</span>
    <span class="hljs-comment">// leading; the cards' ruling of the earlier evening is superseded by the test.</span>
    <span class="hljs-comment">// One palette across the two faces; the markdown-ness is the face and the marks. THE TRANSITION'S</span>
    <span class="hljs-comment">// STRETCH, measured on his "Still a stretchiness to the transition": the title's width was innocent</span>
    <span class="hljs-comment">// (Georgia bold 372px, Consolas regular 364px); the elastic was vertical — the spec's paragraph gaps ran</span>
    <span class="hljs-comment">// 13px against the serif's 20px and the opening text dropped 41px below the label — so the spec's</span>
    <span class="hljs-comment">// paragraphs take the theme's own space and the first tucks to a quarter-space under SPECIFICATION.</span>
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        counter-reset: theorem;
        .pd-chapter { position: relative; }
        .pc-content { position: absolute; inset-block-start: 2.1rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; box-sizing: border-box; inline-size: 0.9em; block-size: 0.9em; border: 1.5px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 65%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); background: <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>; transition: border-width .15s ease, border-color .15s ease; }
        .pc-content:hover .pc-flip { border-color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pc-content:has(input:checked) .pc-flip { border-width: 3px; }
        .pc-project { display: none; }
        &amp;:has(#pc-flip:checked) .pc-project { display: block; }
        &amp;:has(#pc-flip:checked) .pd-chapter &gt; .pd-paragraph:not(.pd-navigation) { display: none; }
        &amp;:has(#pc-flip:checked) .pd-chapter &gt; .pd-section:not(.pc-project) { display: none; }
        .pc-project .pd-heading { display: block; font-size: calc(.78 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 52%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); margin-block: 0 .5em; }
        .pc-specification .pc-markdown { font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; font-size: calc(.9 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: calc(1.412 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); margin-block-start: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pc-specification .pc-markdown h2 { font-family: inherit; font-size: calc(1.15 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> 0; font-weight: bold; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pc-specification .pc-markdown h2::before { content: '## '; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; }
        .pc-specification .pc-markdown h2:first-of-type { display: none; }
        .pc-specification .pc-markdown p { margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>; }
        .pc-specification .pc-markdown h2:first-of-type + p { margin-block-start: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pd-title { position: relative; }
        .pd-title::before { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pd-title::after { content: '# '; position: absolute; inset-inline-start: 0; inset-block-end: 0; opacity: 0; font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title { padding-inline-start: calc(1.65 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title::before { margin-inline-start: calc(-1.65 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-family: <span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span>; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title::after { opacity: 1; }
        .pd-section.pc-project { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 2) 0; }
        .pc-markdown h1 { display: none; }
        .pc-markdown h1 + p { display: none; }
        .pc-markdown h2 { font-family: <span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span>; font-size: calc(1.15 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-weight: bold; margin-block: 1.1em .35em; color: color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 76%, <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span> 24%); }
        .pc-markdown p { margin-block: .9em; }
        .pc-markdown strong { font-weight: bold; }
        .pc-markdown a { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; text-decoration: none; }
        .pc-markdown a:hover { text-decoration: underline; }
        .pc-cite a { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; text-decoration: none; cursor: pointer; }
        .pc-cite a:hover { text-decoration: underline; }
        .pc-markdown table { width: 100%; border-collapse: collapse; margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>; }
        .pc-markdown th, .pc-markdown td { padding: .3em 1.2em .3em 0; text-align: start; vertical-align: top; }
        .pc-markdown th:last-child, .pc-markdown td:last-child { padding-inline-end: 0; }
        .pc-markdown thead th { font-weight: 400; }
        .pc-markdown math { font-family: 'Cambria Math', 'STIX Two Math', math; font-size: 1.08em; }
        .pc-markdown .pc-math-block { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 2); }
        .pc-markdown ol, .pc-markdown ul { padding-inline-start: 1.5em; margin-block: .9em; }
        .pc-markdown li { margin-block: .35em; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
    \`</span>;
}

<span class="hljs-comment">// THE PROJECT IS THE BACK, Doug's answers, 2026-11-16: the specification is part of the project, an expression</span>
<span class="hljs-comment">// of a statement of work identifying the deliverable; the progress is a narrative of how the project has been</span>
<span class="hljs-comment">// going, its entries associated with an author; a plan may be expressed with teammates assigned, all to the</span>
<span class="hljs-comment">// author by default as read from the cover; a discussion may stand there. The parts beyond the specification</span>
<span class="hljs-comment">// are optional. One section of the chapter, the formal register.</span>
<span class="hljs-comment">// NOTHING COLLAPSES, Doug, 2026-11-16: "STOP MAKING THINGS COLLAPSE!!! VERBATIM!" — the project's parts stand</span>
<span class="hljs-comment">// open and whole, plain sections.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Project</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Section</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-project'</span>);
    }
}

<span class="hljs-comment">// THE PROJECT'S NAMED PARTS, Doug, 2026-11-16: "And then create the Specification?" — the specification and</span>
<span class="hljs-comment">// the progress are the project's parts, each a section naming itself in the formal dress. The specification</span>
<span class="hljs-comment">// dissolves its own first heading: its purpose reads as the introducing paragraph, not a second title.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Specification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Project</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-specification'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Progress</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Project</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-progress'</span>);
    }
}

<span class="hljs-comment">// THE SPECIFICATION REFERENCES ITSELF, Doug, 2026-11-16: "the spec should reference itself ... The</span>
<span class="hljs-comment">// specification should be highly connected" — and verbatim stays verbatim: the document already speaks a</span>
<span class="hljs-comment">// citation language — numbered sections, dotted parts, the labels K, C and O, bracketed references — so the</span>
<span class="hljs-comment">// renderer learns that language rather than the document changing. Definitions receive ids; every mention</span>
<span class="hljs-comment">// becomes a link to its definition, across the project's documents, since both render on one page.</span>
<span class="hljs-comment">// EQUATIONS IN SPECIFICATIONS, Doug, 2026-11-16: "we need latex in the specification either rendered or in</span>
<span class="hljs-comment">// latex equation form", then "We need to see equations in specifications" — rendered, in a comparable font.</span>
<span class="hljs-comment">// The extension tokenizes $...$ and $$...$$ before markdown's emphasis can eat the underscores inside them,</span>
<span class="hljs-comment">// and KaTeX typesets at bind time into MathML, which the browser renders natively in its math face — no</span>
<span class="hljs-comment">// stylesheet, no font files shipped. The katex dependency entered the package on his word, beside marked.</span>
<span class="hljs-keyword">const</span> typeset = (<span class="hljs-attr">passage</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">display</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span>
    katex.<span class="hljs-title function_">renderToString</span>(passage, { <span class="hljs-attr">output</span>: <span class="hljs-string">'mathml'</span>, <span class="hljs-attr">throwOnError</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">displayMode</span>: display });

marked.<span class="hljs-title function_">use</span>({
    <span class="hljs-attr">extensions</span>: [
        {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'mathBlock'</span>,
            <span class="hljs-attr">level</span>: <span class="hljs-string">'block'</span>,
            <span class="hljs-title function_">start</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) { <span class="hljs-keyword">const</span> at = src.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'$$'</span>); <span class="hljs-keyword">return</span> at &lt; <span class="hljs-number">0</span> ? <span class="hljs-literal">undefined</span> : at; },
            <span class="hljs-title function_">tokenizer</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) {
                <span class="hljs-keyword">const</span> match = <span class="hljs-regexp">/^\\$\\$([\\s\\S]+?)\\$\\$/</span>.<span class="hljs-title function_">exec</span>(src);
                <span class="hljs-keyword">if</span> (match !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">'mathBlock'</span>, <span class="hljs-attr">raw</span>: match[<span class="hljs-number">0</span>], <span class="hljs-attr">text</span>: match[<span class="hljs-number">1</span>] };
                <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
            },
            <span class="hljs-title function_">renderer</span>(<span class="hljs-params"><span class="hljs-attr">token</span>: { text: <span class="hljs-built_in">string</span> }</span>) { <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;div class="pc-math-block"&gt;<span class="hljs-subst">\${typeset(token.text, <span class="hljs-literal">true</span>)}</span>&lt;/div&gt;\`</span>; },
        },
        {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'mathInline'</span>,
            <span class="hljs-attr">level</span>: <span class="hljs-string">'inline'</span>,
            <span class="hljs-title function_">start</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) { <span class="hljs-keyword">const</span> at = src.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'$'</span>); <span class="hljs-keyword">return</span> at &lt; <span class="hljs-number">0</span> ? <span class="hljs-literal">undefined</span> : at; },
            <span class="hljs-title function_">tokenizer</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) {
                <span class="hljs-keyword">const</span> match = <span class="hljs-regexp">/^\\$(?=\\S)([^$\\n]*?\\S)\\$/</span>.<span class="hljs-title function_">exec</span>(src);
                <span class="hljs-keyword">if</span> (match !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">'mathInline'</span>, <span class="hljs-attr">raw</span>: match[<span class="hljs-number">0</span>], <span class="hljs-attr">text</span>: match[<span class="hljs-number">1</span>] };
                <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
            },
            <span class="hljs-title function_">renderer</span>(<span class="hljs-params"><span class="hljs-attr">token</span>: { text: <span class="hljs-built_in">string</span> }</span>) { <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;span class="pc-math"&gt;<span class="hljs-subst">\${typeset(token.text, <span class="hljs-literal">false</span>)}</span>&lt;/span&gt;\`</span>; },
        },
    ],
});

<span class="hljs-keyword">const</span> cited = <span class="hljs-regexp">/\\[(\\d+(?:,\\s*\\d+)*)\\]|\\b[Ss]ections? \\d+(?: to \\d+)?\\b|\\b[KCO]\\d+\\b|\\b\\d\\.\\d\\b/g</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> place = (<span class="hljs-attr">citation</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> section = citation.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^[Ss]ections? (\\d+)/</span>);
    <span class="hljs-keyword">if</span> (section !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-sec-<span class="hljs-subst">\${section[<span class="hljs-number">1</span>]}</span>\`</span>;
    <span class="hljs-keyword">const</span> label = citation.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^([KCO])(\\d+)$/</span>);
    <span class="hljs-keyword">if</span> (label !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-<span class="hljs-subst">\${label[<span class="hljs-number">1</span>].toLowerCase()}</span><span class="hljs-subst">\${label[<span class="hljs-number">2</span>]}</span>\`</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-<span class="hljs-subst">\${citation.replace(<span class="hljs-string">'.'</span>, <span class="hljs-string">'-'</span>)}</span>\`</span>;
};

<span class="hljs-keyword">const</span> link = (<span class="hljs-attr">citation</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (citation.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">'['</span>)) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'['</span> + citation.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>, -<span class="hljs-number">1</span>).<span class="hljs-title function_">split</span>(<span class="hljs-string">','</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span>
            <span class="hljs-string">\`&lt;a href="#cite-ref-<span class="hljs-subst">\${<span class="hljs-built_in">number</span>.trim()}</span>"&gt;<span class="hljs-subst">\${<span class="hljs-built_in">number</span>.trim()}</span>&lt;/a&gt;\`</span>).<span class="hljs-title function_">join</span>(<span class="hljs-string">', '</span>) + <span class="hljs-string">']'</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;a href="#<span class="hljs-subst">\${place(citation)}</span>"&gt;<span class="hljs-subst">\${citation}</span>&lt;/a&gt;\`</span>;
};

<span class="hljs-keyword">const</span> mention = (<span class="hljs-attr">passage</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">sections</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span>
    passage.<span class="hljs-title function_">split</span>(<span class="hljs-regexp">/(&lt;[^&gt;]*&gt;)/</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">piece, index, pieces</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (piece.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">'&lt;'</span>)) <span class="hljs-keyword">return</span> piece;
        <span class="hljs-keyword">const</span> previous = pieces[index - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">const</span> lead = previous !== <span class="hljs-literal">undefined</span> &amp;&amp; previous.<span class="hljs-title function_">includes</span>(<span class="hljs-string">'id="cite-'</span>)
            ? (piece.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^(?:[KCO]\\d+|\\d+\\.\\d+|\\d+\\.)/</span>) ?? [<span class="hljs-string">''</span>])[<span class="hljs-number">0</span>]
            : <span class="hljs-string">''</span>;
        <span class="hljs-keyword">return</span> lead + piece.<span class="hljs-title function_">slice</span>(lead.<span class="hljs-property">length</span>).<span class="hljs-title function_">replace</span>(cited, <span class="hljs-function"><span class="hljs-params">found</span> =&gt;</span>
            !sections &amp;&amp; <span class="hljs-regexp">/^[Ss]ection/</span>.<span class="hljs-title function_">test</span>(found) ? found : <span class="hljs-title function_">link</span>(found));
    }).<span class="hljs-title function_">join</span>(<span class="hljs-string">''</span>);

<span class="hljs-keyword">const</span> connect = (<span class="hljs-attr">rendered</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> identified = rendered
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;h2&gt;(\\d+)\\. /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, section</span>) =&gt;</span> <span class="hljs-string">\`&lt;h2 id="cite-sec-<span class="hljs-subst">\${section}</span>"&gt;<span class="hljs-subst">\${section}</span>. \`</span>)
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;(strong|td)&gt;(\\d+)\\.(\\d+) /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, tag, section, part</span>) =&gt;</span> <span class="hljs-string">\`&lt;<span class="hljs-subst">\${tag}</span> id="cite-<span class="hljs-subst">\${section}</span>-<span class="hljs-subst">\${part}</span>"&gt;<span class="hljs-subst">\${section}</span>.<span class="hljs-subst">\${part}</span> \`</span>)
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;(strong|td)&gt;([KCO])(\\d+) /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, tag, letter, <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-string">\`&lt;<span class="hljs-subst">\${tag}</span> id="cite-<span class="hljs-subst">\${letter.toLowerCase()}</span><span class="hljs-subst">\${<span class="hljs-built_in">number</span>}</span>"&gt;<span class="hljs-subst">\${letter}</span><span class="hljs-subst">\${<span class="hljs-built_in">number</span>}</span> \`</span>);
    <span class="hljs-keyword">const</span> boundary = identified.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'&lt;h2&gt;Related work&lt;/h2&gt;'</span>);
    <span class="hljs-keyword">if</span> (boundary === -<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-title function_">mention</span>(identified, <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> references = identified.<span class="hljs-title function_">slice</span>(boundary).<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;li&gt;/g</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`&lt;li id="cite-ref-<span class="hljs-subst">\${++count}</span>"&gt;\`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">mention</span>(identified.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, boundary), <span class="hljs-literal">true</span>) + <span class="hljs-title function_">mention</span>(references, <span class="hljs-literal">false</span>);
};

<span class="hljs-comment">// THE DOCUMENT RENDERS VERBATIM, Doug, 2026-11-16: "This is what it looks like. Read the markdown. Render it</span>
<span class="hljs-comment">// like that. I said verbatim" — the chapter's appended markdown parsed by marked, the package's own dependency,</span>
<span class="hljs-comment">// and drawn as the document renders: the bold lead-ins, the tables, the lists, the document's own title.</span>
<span class="hljs-comment">// A citation click turns the page itself — the hash never moves, so the place in the address stays the chapter's.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Markdown</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    $identifier = <span class="hljs-string">''</span>;

    follow = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> citation = (press.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Element</span>).<span class="hljs-title function_">closest</span>(<span class="hljs-string">'a[href^="#cite-"]'</span>);
        <span class="hljs-keyword">if</span> (citation === <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>;
        press.<span class="hljs-title function_">preventDefault</span>();
        <span class="hljs-keyword">const</span> landing = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(citation.<span class="hljs-title function_">getAttribute</span>(<span class="hljs-string">'href'</span>)?.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>) ?? <span class="hljs-string">''</span>);
        landing?.<span class="hljs-title function_">scrollIntoView</span>({ <span class="hljs-attr">behavior</span>: <span class="hljs-string">'smooth'</span>, <span class="hljs-attr">block</span>: <span class="hljs-string">'center'</span> });
    };

    <span class="hljs-keyword">get</span> <span class="hljs-title function_">append</span>(): $Append | <span class="hljs-literal">undefined</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">chapter</span>?.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">find</span>($Append).<span class="hljs-title function_">find</span>(<span class="hljs-function"><span class="hljs-params">append</span> =&gt;</span> append.<span class="hljs-property">$identifier</span> === <span class="hljs-variable language_">this</span>.<span class="hljs-property">$identifier</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> append = <span class="hljs-variable language_">this</span>.<span class="hljs-property">append</span>;
        <span class="hljs-keyword">if</span> (append === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> rendered = <span class="hljs-title function_">connect</span>(marked.<span class="hljs-title function_">parse</span>(html.<span class="hljs-title function_">copy</span>(append.<span class="hljs-property">text</span>), { <span class="hljs-attr">async</span>: <span class="hljs-literal">false</span> }));
        <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">pc-doc-</span>\${<span class="hljs-attr">this.</span>$<span class="hljs-attr">identifier</span>}\`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.follow}</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">rendered</span> }} /&gt;</span></span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-markdown'</span>);
    }
}

<span class="hljs-comment">// THE IMPLEMENTATION CITES THE SPECIFICATION, Doug, 2026-11-16: "there needs to be some relationship between</span>
<span class="hljs-comment">// the spec and the implementation" — the deliverable cites the part of the specification it meets, by number</span>
<span class="hljs-comment">// or label, and the citation leads there: it flips the content to the project side and lands on the part named.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Cite</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    $part = <span class="hljs-string">''</span>;

    <span class="hljs-comment">// The part is read back from the clicked anchor's own text: the handler's instance predates the pass</span>
    <span class="hljs-comment">// that applies props to the held one, so the rendered citation is the one source the click can trust.</span>
    <span class="hljs-comment">// The flip and the landing scroll both run inside the view transition's update, so the dissolve lands</span>
    <span class="hljs-comment">// directly on the cited clause.</span>
    follow = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLAnchorElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> part = press.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">textContent</span> ?? <span class="hljs-string">''</span>;
        <span class="hljs-keyword">const</span> turn = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
            <span class="hljs-keyword">const</span> flip = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'pc-flip'</span>);
            <span class="hljs-keyword">if</span> (flip <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLInputElement</span>) flip.<span class="hljs-property">checked</span> = <span class="hljs-literal">true</span>;
            <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-title function_">place</span>(part))?.<span class="hljs-title function_">scrollIntoView</span>({ <span class="hljs-attr">block</span>: <span class="hljs-string">'center'</span> });
        };
        <span class="hljs-keyword">const</span> doc = <span class="hljs-variable language_">document</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Document</span> &amp; { <span class="hljs-attr">startViewTransition</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">update</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">unknown</span> };
        <span class="hljs-keyword">if</span> (doc.<span class="hljs-property">startViewTransition</span> === <span class="hljs-literal">undefined</span>) <span class="hljs-title function_">turn</span>();
        <span class="hljs-keyword">else</span> doc.<span class="hljs-title function_">startViewTransition</span>(turn);
    };

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.follow}</span>&gt;</span>{this.$part}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-cite'</span>);
    }
}

<span class="hljs-comment">// THE INTERPOLATED PART, Doug, 2026-11-16: "interpolated string-like parts that might describe where something</span>
<span class="hljs-comment">// will go when we find it" — a word standing for the thing itself until the thing is found, by the interpolation</span>
<span class="hljs-comment">// rule of the specification's form.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Interpolated</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-interpolated'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Content</span> = $($Content);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Project</span> = $($Project);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Specification</span> = $($Specification);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Progress</span> = $($Progress);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Markdown</span> = $($Markdown);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Cite</span> = $($Cite);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Interpolated</span> = $($Interpolated);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span class="pd-word pd-next pa-reference pa-self-reference">▷</span></a></div></div></div></div></div><!--/$--></div>
  

<style id="sk-sheet">
/* THE SKETCH'S OWN RULES, sk- throughout, never the print's class names. The listing is his, measured off his
   manual on 2026-11-17: JetBrains Mono at 12px on a 20.4px line, the ink #d6e1e3 on the night, the number column
   44px in the dim brass, keywords #8ad7ff, strings #ffd48a, names #9be3d6, comments #5f8a86, and his light
   palette behind the light switch. The container is this page's: the bar's words in the page's own label voice. */
.sk-switches { position: fixed; left: 12px; bottom: 12px; z-index: 20; display: flex; gap: 6px; align-items: center; font: 12px Georgia, serif; }
.sk-switches b { font-weight: normal; letter-spacing: .15em; text-transform: uppercase; opacity: .6; margin-right: 4px; }
.sk-switches button { font: inherit; padding: 3px 8px; border: 1px solid rgba(27, 27, 27, .35); background: #fff; cursor: pointer; }
.sk-switches button[aria-pressed="true"] { background: #1b1b1b; color: #fff; border-color: #1b1b1b; }

.sk-editor {
    --night: oklch(0.294 0.028 222.6);
    --dusk-top: oklch(0.414 0.026 219.3);
    --dusk: oklch(0.334 0.030 219.3);
    --bar-line: oklch(0.472 0.042 183.1);
    --glow: #d6e1e3;
    --dim: oklch(0.508 0.053 170.2);
    --brass: #d8c48e;
    --keyword: #8ad7ff;
    --string: #ffd48a;
    --name: #9be3d6;
    --comment: #5f8a86;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    margin-block: 1.25rem;
    background: var(--night);
    color: var(--glow);
}
.sk-editor.sk-light {
    --night: #f6f7f4;
    --dusk-top: oklch(0.952 0.007 90);
    --dusk: #eceee8;
    --bar-line: oklch(0.912 0.027 90);
    --glow: #2b363c;
    --dim: oklch(0.738 0.033 88.3);
    --brass: #5d4a16;
    --keyword: #5a4fa8;
    --string: #2f7f6e;
    --name: #23407a;
    --comment: #8a94a3;
    box-shadow: inset 0 0 0 1px rgba(27, 27, 27, .12);
}
.sk-editor, .sk-pane { min-width: 0; }
.sk-editor { grid-template-columns: minmax(0, 1fr); }
.sk-bar { display: flex; min-width: 0; flex-wrap: wrap; align-items: stretch; gap: 1px; padding: 0 0 0 2px; background: linear-gradient(180deg, var(--dusk-top), var(--dusk)); border-block-end: thin solid var(--bar-line); }
.sk-tab { display: flex; align-items: center; gap: 7px; padding: 9px 14px 8px 12px; border: 0; border-block-start: 2px solid transparent; background: none; font: 500 12px/1 'JetBrains Mono', ui-monospace, monospace; color: color-mix(in oklch, var(--glow) 62%, var(--night)); cursor: pointer; }
.sk-tab[aria-pressed="true"] { color: var(--glow); background: var(--night); border-block-start-color: var(--brass); }
.sk-mark { color: #9aa4b3; font-size: 13px; letter-spacing: -1px; }
.sk-tab[aria-pressed="true"] .sk-mark { color: var(--brass); }
.sk-options { display: flex; align-items: center; gap: 2px; margin-inline-start: auto; padding: 0 8px 0 4px; border-inline-start: thin solid color-mix(in oklch, var(--glow) 12%, transparent); }
.sk-options button, .sk-dock { border: 0; background: none; padding: 5px 7px; font-family: Georgia, serif; font-size: 11.9px; letter-spacing: .15em; text-transform: uppercase; color: color-mix(in oklch, var(--glow) 55%, var(--night)); cursor: pointer; }
.sk-options button[aria-pressed="true"] { color: var(--glow); background: color-mix(in oklch, var(--glow) 10%, transparent); }
.sk-dock { color: var(--brass); padding-inline: 10px 14px; }
.sk-pane { max-height: 70vh; overflow: auto; scrollbar-width: thin; scrollbar-color: transparent transparent; }
.sk-pane:hover { scrollbar-color: var(--dim) transparent; }
.sk-pane pre.pd-code { margin: 0; padding: 14px 0; border: 0; font: 400 12px/20.4px 'JetBrains Mono', ui-monospace, monospace; color: var(--glow); background: transparent; white-space: normal; overflow: visible; }
.sk-line { display: block; white-space: pre; padding-inline-end: 18px; }
.sk-line::before { content: attr(data-line); display: inline-block; width: 44px; padding-inline-end: 14px; text-align: end; color: var(--dim); user-select: none; }
.sk-editor.sk-unnumbered .sk-line::before { content: ''; width: 14px; padding: 0; }
.sk-editor.sk-wrap .sk-line { white-space: pre-wrap; padding-inline-start: 58px; text-indent: -58px; }
.sk-editor.sk-wrap .sk-line::before { text-indent: 0; }
.sk-pane .hljs-keyword, .sk-pane .hljs-built_in, .sk-pane .hljs-literal { color: var(--keyword); }
.sk-pane .hljs-string, .sk-pane .hljs-regexp, .sk-pane .hljs-number { color: var(--string); }
.sk-pane .hljs-title, .sk-pane .hljs-type, .sk-pane .hljs-tag, .sk-pane .hljs-name, .sk-pane .hljs-attr { color: var(--name); }
.sk-pane .hljs-comment, .sk-pane .hljs-meta { color: var(--comment); }

/* full screen: the editor takes the window, as his code forward does */
body.sk-full .sk-editor.sk-front { position: fixed; inset: 0; z-index: 10; margin: 0; }
body.sk-full .sk-editor.sk-front .sk-pane { max-height: none; }

/* the flip, the Content's own square at the title's right */
.pd-chapter.sk-has-file { position: relative; }
.sk-flip { position: absolute; right: 0; width: .9em; height: .9em; box-sizing: border-box; border: 1.5px solid color-mix(in srgb, #1b1b1b 65%, #fff); background: none; padding: 0; cursor: pointer; }
.sk-flip:hover { border-color: #1b1b1b; }
.pd-chapter.sk-back .sk-flip { border-width: 3px; }
body:not([data-form="back"]) .sk-flip { display: none; }

/* the back: the words are the front, the file the back, the title turning into its literal */
body[data-form="back"] .sk-editor { display: none; }
body[data-form="back"] .pd-chapter.sk-back .sk-editor { display: grid; }
body[data-form="back"] .pd-chapter.sk-back > .pd-section { display: none; }
body[data-form="back"] .pd-chapter.sk-back .pd-title { font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 500; }
body[data-form="back"] .pd-chapter.sk-back .sk-pane { max-height: calc(100vh - 13rem); }

/* the spread: his container on this paper, the words at the left and the editor beside them to the window's edge */
body[data-form="spread"] .sk-sheet { max-width: none; display: grid; grid-template-columns: minmax(0, 40rem) minmax(0, 1fr); column-gap: 1.5rem; margin-inline: 0; padding-inline-end: 0; padding-block: 0; }
body[data-form="spread"] .sk-sheet > .pd-book { padding-block: 1.25rem; }
body[data-form="spread"] .sk-aside { position: sticky; top: 0; align-self: start; height: 100vh; display: grid; }
body[data-form="spread"] .sk-aside .sk-editor { margin: 0; height: 100vh; }
body[data-form="spread"] .sk-aside .sk-pane { max-height: none; }

/* the foot, the appendix at the foot of the table in a smaller voice; under, each file under its chapter's row */
.sk-appendix { display: none; }
body[data-form="foot"] .sk-appendix { display: block; margin-block-start: 2.5rem; padding-block-start: 1rem; border-block-start: 1px solid rgba(27, 27, 27, .15); font-size: .86em; opacity: .82; }
.sk-appendix .pd-heading { font-weight: bold; margin-block: 0 .6rem; }
.sk-appendix .pd-paragraph { display: flex; justify-content: space-between; gap: 1rem; margin-block: .3rem; }
.sk-appendix a { text-decoration: none; color: inherit; }
.sk-file { font: 400 12px 'JetBrains Mono', ui-monospace, monospace; color: rgba(27, 27, 27, .6); }
.sk-press { display: none; }
body[data-form="under"] .sk-press { display: flex; align-items: center; gap: .4rem; margin: -.7rem 0 .7rem 1.4rem; font: 400 12px 'JetBrains Mono', ui-monospace, monospace; color: rgba(27, 27, 27, .6); text-decoration: none; }
.sk-press .sk-mark { color: #9aa4b3; }

@media (max-width: 640px) {
    body[data-form="spread"] .sk-sheet { display: block; padding-inline: 1.25rem; }
    body[data-form="spread"] .sk-aside { position: static; height: auto; }
    body[data-form="spread"] .sk-aside .sk-editor { height: auto; }
    .sk-pane { max-height: 60vh; }
    .sk-bar { flex-wrap: wrap; }
}
</style>
<script>
// The switch between the forms of The Listing, remembered in the address's hash so a photograph can ask for one:
// plate, back and spread open the chapter The Faces, foot and under the table; a state follows a dash — plate-light,
// plate-full, back-front — as a reader would see it a press later.
(() => {
    const files = {
        'the-book': [1, 'code.tsx'], 'the-theme': [2, 'code.tsx'], 'the-running-head-and-the-byline': [3, 'code.tsx'],
        'the-faces': [4, 'code.tsx'], 'developing-the-library': [5, 'workbench.mjs'], 'the-paper': [6, 'code.tsx'],
        'the-reference-manual': [7], 'the-specification': [8], 'the-content': [9, 'code.tsx'],
    };
    const forms = { plate: 'the plate', back: 'the back', spread: 'the spread', foot: 'the foot', under: 'under the chapters' };
    // The sheet is the theme's own container, the outermost under the root, which holds the measure.
    const sheet = document.getElementById('root').firstElementChild;
    sheet.classList.add('sk-sheet');
    const chapters = [...document.querySelectorAll('.pd-chapter.pd-canonical')];
    const table = document.querySelector('.pd-chapter.pa-table-of-contents');
    const faces = chapters.find(chapter => chapter.querySelector('.pd-title')?.id === 'the-faces');

    // The lines numbered as the framework numbers them: each line a span carrying the spans still open.
    const numbered = code => {
        const open = [];
        return code.innerHTML.split('\\n').map((line, index) => {
            const carried = open.join('');
            for (const tag of line.match(/<\\/?span[^>]*>/g) ?? []) {
                if (tag.startsWith('</')) open.pop(); else open.push(tag);
            }
            return \`<span class="sk-line" data-line="\${index + 1}">\${carried}\${line}\${'</span>'.repeat(open.length)}</span>\`;
        }).join('\\n');
    };

    const toggleBack = (chapter, on) => {
        const back = on ?? !chapter.classList.contains('sk-back');
        chapter.classList.toggle('sk-back', back);
        const title = chapter.querySelector('.pd-title');
        if (title.dataset.words === undefined) title.dataset.words = title.textContent;
        title.textContent = back ? chapter.dataset.file : title.dataset.words;
    };

    const editors = new Map();
    for (const chapter of chapters) {
        const id = chapter.querySelector('.pd-title')?.id;
        const [number, name] = files[id] ?? [];
        const pre = chapter.querySelector(':scope > pre.pd-code');
        if (!pre || !name) continue;
        const editor = document.createElement('div');
        editor.className = 'sk-editor';
        editor.innerHTML = \`<div class="sk-bar"><button type="button" class="sk-tab" aria-pressed="true"><span class="sk-mark">&lsaquo;&rsaquo;</span>\${name}</button><span class="sk-options"><button type="button" data-option="light">light</button><button type="button" data-option="wrap">wrap</button><button type="button" data-option="lines" aria-pressed="true">lines</button></span><button type="button" class="sk-dock">full screen</button></div><div class="sk-pane"></div>\`;
        const code = pre.querySelector('code');
        code.innerHTML = numbered(code);
        pre.remove();
        editor.querySelector('.sk-pane').appendChild(pre);
        chapter.dataset.file = \`\${number}-\${id}~\${name}\`;
        chapter.classList.add('sk-has-file');
        chapter.appendChild(editor);
        editors.set(chapter, editor);
        const titleLink = chapter.querySelector(':scope > a');
        const flip = document.createElement('button');
        flip.type = 'button';
        flip.className = 'sk-flip';
        flip.setAttribute('aria-label', 'the implementation');
        titleLink.after(flip);
        const title = chapter.querySelector('.pd-title');
        flip.style.top = \`\${title.offsetTop + (title.offsetHeight - flip.offsetHeight) / 2}px\`;
        flip.addEventListener('click', () => toggleBack(chapter));
        const option = (word, className) => {
            const button = editor.querySelector(\`[data-option="\${word}"]\`);
            button.addEventListener('click', () => {
                editor.classList.toggle(className);
                button.setAttribute('aria-pressed', String(word === 'lines' ? !editor.classList.contains(className) : editor.classList.contains(className)));
            });
        };
        option('light', 'sk-light');
        option('wrap', 'sk-wrap');
        option('lines', 'sk-unnumbered');
        const dock = editor.querySelector('.sk-dock');
        dock.addEventListener('click', () => {
            const full = !document.body.classList.contains('sk-full');
            document.body.classList.toggle('sk-full', full);
            editor.classList.toggle('sk-front', full);
            dock.textContent = full ? 'the page' : 'full screen';
        });
    }

    const openPage = chapter => {
        for (const page of document.querySelectorAll('.pa-page.pa-open')) page.classList.remove('pa-open');
        chapter.classList.add('pa-open');
        window.scrollTo(0, 0);
    };
    const toFile = chapter => { choose('back', undefined, chapter); };

    // foot: the appendix at the foot of the table, every file of the book under the chapter it stands beside.
    const appendix = document.createElement('div');
    appendix.className = 'pd-section sk-appendix';
    appendix.innerHTML = '<div class="pd-sentence pd-heading">Appendix</div>';
    for (const chapter of editors.keys()) {
        const row = document.createElement('a');
        row.href = '#';
        row.className = 'pa-reference pd-container sk-row';
        row.innerHTML = \`<div class="pd-paragraph pa-reference"><span class="pa-content">\${chapter.querySelector('.pd-title').dataset.words ?? chapter.querySelector('.pd-title').textContent}</span><span class="sk-file">\${chapter.dataset.file.replace(/^.*~/, '')}</span></div>\`;
        row.addEventListener('click', event => { event.preventDefault(); toFile(chapter); });
        appendix.appendChild(row);
    }
    table.appendChild(appendix);

    // under: each file as a press under its chapter's row in the contents, with the file's mark.
    for (const link of table.querySelectorAll('.pd-section a.pa-reference[href*="#"]')) {
        const id = link.getAttribute('href').split('#')[1];
        const chapter = chapters.find(one => one.querySelector('.pd-title')?.id === id);
        if (!chapter || !editors.has(chapter)) continue;
        const press = document.createElement('a');
        press.href = '#';
        press.className = 'sk-press';
        press.innerHTML = \`<span class="sk-mark">&lsaquo;&rsaquo;</span>\${chapter.dataset.file.replace(/^.*~/, '')}\`;
        press.addEventListener('click', event => { event.preventDefault(); toFile(chapter); });
        link.after(press);
    }

    // The switch bar.
    const bar = document.createElement('div');
    bar.className = 'sk-switches';
    const label = document.createElement('b');
    label.textContent = 'the listing';
    bar.appendChild(label);
    const buttons = {};
    for (const [key, name] of Object.entries(forms)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = name;
        button.addEventListener('click', () => choose(key));
        buttons[key] = button;
        bar.appendChild(button);
    }
    document.body.appendChild(bar);

    let aside;
    const choose = (form, state, chapter = faces) => {
        document.body.dataset.form = form;
        document.body.classList.remove('sk-full');
        for (const [one, editor] of editors) {
            toggleBack(one, false);
            editor.classList.remove('sk-front', 'sk-light');
            editor.querySelector('[data-option="light"]').setAttribute('aria-pressed', 'false');
            editor.querySelector('.sk-dock').textContent = 'full screen';
            if (aside !== undefined && editor.parentElement === aside) one.appendChild(editor);
        }
        if (form === 'spread') {
            aside ??= document.createElement('div');
            aside.className = 'sk-aside';
            aside.appendChild(editors.get(chapter));
            sheet.appendChild(aside);
        } else aside?.remove();
        for (const [key, button] of Object.entries(buttons)) button.setAttribute('aria-pressed', String(key === form));
        openPage(form === 'foot' || form === 'under' ? table : chapter);
        if (form === 'back' && state !== 'front') toggleBack(chapter, true);
        if (state === 'full') editors.get(chapter).querySelector('.sk-dock').click();
        if (state === 'light') editors.get(chapter).querySelector('[data-option="light"]').click();
        if (form === 'plate' && state !== 'top' && state !== 'full') {
            const top = editors.get(chapter).getBoundingClientRect().top + window.scrollY - 24;
            window.scrollTo(0, top);
        }
        const hash = \`#\${form}\${state === undefined ? '' : \`-\${state}\`}\`;
        if (location.hash !== hash) history.replaceState(null, '', hash);
    };
    const asked = () => {
        const [form, state] = location.hash.slice(1).split('-');
        choose(forms[form] ? form : 'plate', state || undefined);
    };
    asked();
    window.addEventListener('hashchange', asked);
})();
<\/script>
</body></html>`}),e(w,{identifier:"opening",type:".html",children:`<!doctype html>
<html lang="en" class=""><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Reference, the opening</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Crect width='28' height='28' fill='%23faf8f4'/%3E%3Ccircle cx='14' cy='14' r='8' fill='none' stroke='%2323262a' stroke-width='2'/%3E%3C/svg%3E">
    
    
    <style data-inlined="/inexplicable-phenomena/assets/index-CaH6IAI_.css">@font-face{font-display:block;font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-DMm9YOAa.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-DRggAlZN.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Caligraphic;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Caligraphic;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Fraktur;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Fraktur;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-CB_wures.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-Cx986IdX.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-Jm3AIy58.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-waoOVXN0.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:italic;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-BMLOBm91.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-3WenGoN9.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-B22Nviop.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-Dr94JaBh.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-ypZvNtVU.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Math;font-style:italic;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Math;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-t53AETM-.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-DA0__PXp.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-flOr_0UB.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Script;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-D3wIWfF6.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-D5yQViql.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-C5JkGWo-.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size1;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-C195tn64.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size2;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-oD1tc_U0.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(data:font/woff2;base64,d09GMgABAAAAAA4oAA4AAAAAHbQAAA3TAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAAgRQIDgmcDBEICo1oijYBNgIkA14LMgAEIAWJAAeBHAyBHBvbGiMRdnO0IkRRkiYDgr9KsJ1NUAf2kILNxgUmgqIgq1P89vcbIcmsQbRps3vCcXdYOKSWEPEKgZgQkprQQsxIXUgq0DqpGKmIvrgkeVGtEQD9DzAO29fM9jYhxZEsL2FeURH2JN4MIcTdO049NCVdxQ/w9NrSYFEBKTDKpLKfNkCGDc1RwjZLQcm3vqJ2UW9Xfa3tgAHz6ivp6vgC2yD4/6352ndnN0X0TL7seypkjZlMsjmZnf0Mm5Q+JykRWQBKCVCVPbARPXWyQtb5VgLB6Biq7/Uixcj2WGqdI8tGSgkuRG+t910GKP2D7AQH0DB9FMDW/obJZ8giFI3Wg8Cvevz0M+5m0rTh7XDBlvo9Y4vm13EXmfttwI4mBo1EG15fxJhUiCLbiiyCf/ZA6MFAhg3pGIZGdGIVjtPn6UcMk9A/UUr9PhoNsCENw1APAq0gpH73e+M+0ueyHbabc3vkbcdtzcf/fiy+NxQEjf9ud/ELBHAXJ0nk4z+MXH2Ev/kWyV4k7SkvpPc9Qr38F6RPWnM9cN6DJ0AdD1BhtgABtmoRoFCvPsBAumNm6soZG2Gk5GyVTo2sJncSyp0jQTYoR6WDvTwaaEcHsxHfvuWhHA3a6bN7twRKtcGok6NsCi7jYRrM2jExsUFMxMQYuJbMhuWNOumEJy9hi29Dmg5zMp/A5+hhPG19j1vBrq8JTLr8ki5VLPmG/PynJHVul440bxg5xuymHUFPBshC+nA9I1FmwbRBTNHAcik3Oae0cxKoI3MOriM42UrPe51nsaGxJ+WfXubAsP84aabUlQSJ1IiE0iPETLUU4CATgfXSCSpuRFRmCGbO+wSpAnzaeaCYW1VNEysRtuXCEL1kUFUbbtMv3Tilt/1c11jt3Q5bbMa84cpWipp8Elw3MZhOHsOlwwVUQM3lAR35JiFQbaYCRnMF2lxAWoOg2gyoIV4PouX8HytNIfLhqpJtXB4vjiViUI8IJ7bkC4ikkQvKksnOTKICwnqWSZ9YS5f0WCxmpgjbIq7EJcM4aI2nmhLNY2JIUgOjXZFWBHb+x5oh6cwb0Tv1ackHdKi0I9OO2wE9aogIOn540CCCziyhN+IaejtgAONKznHlHyutPrHGwCx9S6B8kfS4Mfi4Eyv7OU730bT1SCBjt834cXsf43zVjPUqqJjgrjeGnBxSG4aYAKFuVbeCfkDIjAqMb6yLNIbCuvXhMH2/+k2vkNpkORhR59N1CkzoOENvneIosjYmuTxlhUzaGEJQ/iWqx4dmwpmKjrwTiTGTCVozNAYqk/zXOndWxuWSmJkQpJw3pK5KX6QrLt5LATMqpmPAQhkhK6PUjzHUn7E0gHE0kPE0iKkolgkUx9SZmVAdDgpffdyJKg3k7VmzYGCwVXGz/tXmkOIp+vcWs+EMuhhvN0h9uhfzWJziBQmCREGSIFmQIkgVpAnSBRmC//6hkLZwaVhwxlrJSOdqlFtOYxlau9F2QN5Y98xmIAsiM1HVp2VFX+DHHGg6Ecjh3vmqtidX3qHI2qycTk/iwxSt5UzTmEP92ZBnEWTk4Mx8Mpl78ZDokxg/KWb+Q0QkvdKVmq3TMW+RXEgrsziSAfNXFMhDc60N5N9jQzjfO0kBKpUZl0ZmwJ41j/B9Hz6wmRaJB84niNmQrzp9eSlQCDDzazGDdVi3P36VZQ+Jy4f9UBNp+3zTjqI4abaFAm+GShVaXlsGdF3FYzZcDI6cori4kMxUECl9IjJZpzkvitAoxKue+90pDMvcKRxLl53TmOKCmV/xRolNKSqqUxc6LStOETmFOiLZZptlZepcKiAzteG8PEdpnQpbOMNcMsR4RR2Bs0cKFEvSmIjAFcnarqwUL4lDhHmnVkwu1IwshbiCcgvOheZuYyOteufZZwlcTlLgnZ3o/WcYdzZHW/WGaqaVfmTZ1aWCceJjkbZqsfbkOtcFlUZM/jy+hXHDbaUobWqqXaeWobbLO99yG5N3U4wxco0rQGGcOLASFMXeJoham8M+/x6O2WywK2l4HGbq1CoUyC/IZikQhdq3SiuNrvAEj0AVu9x2x3lp/xWzahaxidezFVtdcb5uEnzyl0ZmYiuKI0exvCd4Xc9CV1KB0db00z92wDPde0kukbvZIWN6jUWFTmPIC/Y4UPCm8UfDTFZpZNon1qLFTkBhxzB+FjQRA2Q/YRJT8pQigslMaUpFyAG8TMlXigiqmAZX4xgijKjRlGpLE0GdplRfCaJo0JQaSxNBk6ZmMzcya0FmrcisDdn0Q3HI2sWSppYigmlM1XT/kLQZSNpMJG0WkjYbSZuDpM1F0uYhFc1HxU4m1QJjDK6iL0S5uSj5rgXc3RejEigtcRBtqYPQsiTskmO5vosV+q4VGIKbOkDg0jtRrq+Em1YloaTFar3EGr1EUC8R0kus1Uus00usL97ABr2BjXoDm/QGNhuWtMVBKOwg/i78lT7hBsAvDmwHc/ao3vmUbBmhjeYySZNWvGkfZAgISDSaDo1SVpzGDsAEkF8B+gEapViUoZgUWXcRIGFZNm6gWbAKk0bp0k1MHG9fLYtV4iS2SmLEQFARzRcnf9PUS0LVn05/J9MiRRBU3v2IrvW974v4N00L7ZMk0wXP1409CHo/an8zTRHD3eSJ6m8D4YMkZNl3M79sqeuAsr/m3f+8/yl7A50aiAEJgeBeMWzu7ui9UfUBCe2TIqZIoOd/3/udRBOQidQZUERzb2/VwZN1H/Sju82ew2H2Wfr6qvfVf3hqwDvAIpkQVFy4B9Pe9e4/XvPeceu7h3dvO56iJPf0+A6cqA2ip18ER+iFgggiuOkvj24bby0N9j2UHIkgqIt+sVgfodC4YghLSMjSZbH0VR/6dMDrYJeKHilKTemt6v6kvzvn3/RrdWtr0GoN/xL+Sex/cPYLUpepx9cz/D46UPU5KXgAQa+NDps1v6J3xP1i2HtaDB0M9aX2deA7SYff//+gUCovMmIK/qfsFcOk+4Y5ZN97XlG6zebqtMbKgeRFi51vnxTQYBUik2rS/Cn6PC8ADR8FGxsRPB82dzfND90gIcshOcYUkfjherBz53odpm6TP8txlwOZ71xmfHHOvq053qFF/MRlS3jP0ELudrf2OeN8DHvp6ZceLe8qKYvWz/7yp0u4dKPfli3CYq0O13Ih71mylJ80tOi10On8wi+F4+LWgDPeJ30msSQt9/vkmHq9/Lvo2b461mP801v3W4xTcs6CbvF9UDdrSt+A8OUbpSh55qAUFXWznBBfdeJ8a4d7ugT5tvxUza3h9m4H7ptTqiG4z0g5dc0X29OcGlhpGFMpQo9ytTS+NViZpNdvU4kWx+LKxNY10kQ1yqGXrhe4/1nvP7E+nd5A92TtaRplbHSqoIdOqtRWti+fkB5/n1+/VvCmz12pG1kpQWsfi1ftlBobm0bpngs16CHkbIwdLnParxtTV3QYRlfJ0KFskH7pdN/YDn+yRuSd7sNH3aO0DYPggk6uWuXrfOc+fa3VTxFVvKaNxHsiHmsXyCLIE5yuOeN3/Jdf8HBL/5M6shjyhxHx9BjB1O0+4NLOnjLLSxwO7ukN4jMbOIcD879KLSi6Pk61Oqm2377n8079PXEEQ7cy7OKEC9nbpet118fxweTafpt69x/Bt8UqGzNQt7aelpc44dn5cqhwf71+qKp/Zf/+a0zcizOUWpl/iBcSXip0pplkatCchoH5c5aUM8I7/dWxAej8WicPL1URFZ9BDJelUwEwTkGqUhgSlydVes95YdXvhh9Gfz/aeFWvgVb4tuLbcv4+wLdutVZv/cUonwBD/6eDlE0aSiKK/uoH3+J1wDE/jMVqY2ysGufN84oIXB0sPzy8ollX/LegY74DgJXJR57sn+VGza0x3DnuIgABFM15LmajjjsNlYj+JEZGbuRYcAMOWxFkPN2w6Wd46xo4gVWQR/X4lyI/R6K/YK0110GzudPRW7Y+UOBGTfNNzHeYT0fiH0taunBpq9HEW8OKSaBGj21L0MqenEmNRWBAWDWAk4CpNoEZJ2tTaPFgbQYj8HxtFilErs3BTRwT8uO1NXQaWfIotchmPkAF5mMBAliEmZiOGVgCG9LgRzpscMAOOwowlT3JhusdazXGSC/hxR3UlmWVwWHpOIKheqONvjyhSiTHIkVUco5bnji8m//zL7PKaT1Vl5I6UE609f+gkr6MZKVyKc7zJRmCahLsdlyA5fdQkRSan9LgnnLEyGSkaKJCJog0wAgvepWBt80+1yKln1bMVtCljfNWDueKLsWwaEbBSfSPTEmVRsUcYYMnEjcjeyCZzBXK9E9BYBXLKjOSpUDR+nEV3TFSUdQaz+ot98QxgXwx0GQ+EEUAKB2qZPkQQ0GqFD8UPFMqyaCHM24BZmSGic9EYMagKizOw9Hz50DMrDLrqqLkTAhplMictiCAx5S3BIUQdeJeLnBy2CNtMfz6cV4u8XKoFZQesbf9YZiIERiHjaNodDW6LgcirX/mPnJIkBGDUpTBhSa0EIr38D5hCIszhCM8URGBqImoWjpvpt1ebu/v3Gl3qJfMnNM+9V+kiRFyROTPHQWOcs1dNW94/ukKMPZBvDi55i5CttdeJz84DLngLqjcdwEZ87bFFR8CIG35OAkDVN6VRDZ7aq67NteYqZ2lpT8oYB2CytoBd6VuAx4WgiAsnuj3WohG+LugzXiQRDeM3XYXlULv4dp5VFYC) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size3-Regular-CTq5MqoE.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size4;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-BF-4gkZK.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-DWFBv043.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Typewriter;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf) format("truetype")}.katex{font: 1.21em KaTeX_Main,math,Times New Roman,serif;line-height:1.2;position:relative;text-indent:0;text-rendering:auto}.katex *{-ms-high-contrast-adjust:none!important;border-color:currentColor}.katex .katex-version:after{content:"0.18.10"}.katex .katex-mathml{border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;overflow:hidden;padding:0;position:absolute;width:1px}.katex .katex-html>.katex-newline{display:block}.katex .katex-base{position:relative;white-space:nowrap;width:-webkit-min-content;width:-moz-min-content;width:min-content}.katex .katex-base,.katex .katex-strut{display:inline-block}.katex .textbf{font-weight:700}.katex .textit{font-style:italic}.katex .textrm{font-family:KaTeX_Main}.katex .textsf{font-family:KaTeX_SansSerif}.katex .texttt{font-family:KaTeX_Typewriter}.katex .mathnormal{font-family:KaTeX_Math;font-style:italic}.katex .mathit{font-family:KaTeX_Main;font-style:italic}.katex .mathrm{font-style:normal}.katex .mathbf{font-family:KaTeX_Main;font-weight:700}.katex .boldsymbol{font-family:KaTeX_Math;font-style:italic;font-weight:700}.katex .amsrm,.katex .mathbb,.katex .textbb{font-family:KaTeX_AMS}.katex .mathcal{font-family:KaTeX_Caligraphic}.katex .mathfrak,.katex .textfrak{font-family:KaTeX_Fraktur}.katex .mathboldfrak,.katex .textboldfrak{font-family:KaTeX_Fraktur;font-weight:700}.katex .mathtt{font-family:KaTeX_Typewriter}.katex .mathscr,.katex .textscr{font-family:KaTeX_Script}.katex .mathsf,.katex .textsf{font-family:KaTeX_SansSerif}.katex .mathboldsf,.katex .textboldsf{font-family:KaTeX_SansSerif;font-weight:700}.katex .mathitsf,.katex .mathsfit,.katex .textitsf{font-family:KaTeX_SansSerif;font-style:italic}.katex .mainrm{font-family:KaTeX_Main;font-style:normal}.katex .vlist-t{border-collapse:collapse;display:inline-table;table-layout:fixed}.katex .vlist-r{display:table-row}.katex .vlist{display:table-cell;position:relative;vertical-align:bottom}.katex .vlist>span{display:block;height:0;position:relative}.katex .vlist>span>span{display:inline-block}.katex .vlist>span>.pstrut{overflow:hidden;width:0}.katex .vlist-t2{margin-right:-2px}.katex .vlist-s{display:table-cell;font-size:1px;min-width:2px;vertical-align:bottom;width:2px}.katex .katex-vbox{align-items:baseline;display:inline-flex;flex-direction:column}.katex .katex-thinbox{display:inline-flex;flex-direction:row;max-width:0;width:0}.katex .msupsub{text-align:left}.katex .mfrac>span>span{text-align:center}.katex .mfrac .frac-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .katex-hdashline,.katex .katex-hline,.katex .katex-overline .overline-line,.katex .katex-rule,.katex .katex-underline .underline-line,.katex .mfrac .frac-line{min-height:1px}.katex .mspace{display:inline-block}.katex .katex-smash{display:inline;line-height:0}.katex .clap,.katex .llap,.katex .rlap{position:relative;width:0}.katex .clap>.katex-inner,.katex .llap>.katex-inner,.katex .rlap>.katex-inner{position:absolute}.katex .clap>.katex-fix,.katex .llap>.katex-fix,.katex .rlap>.katex-fix{display:inline-block}.katex .llap>.katex-inner{right:0}.katex .clap>.katex-inner,.katex .rlap>.katex-inner{left:0}.katex .clap>.katex-inner>span{margin-left:-50%;margin-right:50%}.katex .katex-rule{border:0 solid;display:inline-block;position:relative}.katex .katex-hline,.katex .katex-overline .overline-line,.katex .katex-underline .underline-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .katex-hdashline{border-bottom-style:dashed;display:inline-block;width:100%}.katex .sqrt>.katex-root{margin-left:.2777777778em;margin-right:-.5555555556em}.katex .fontsize-ensurer.reset-size1.size1,.katex .katex-sizing.reset-size1.size1{font-size:1em}.katex .fontsize-ensurer.reset-size1.size2,.katex .katex-sizing.reset-size1.size2{font-size:1.2em}.katex .fontsize-ensurer.reset-size1.size3,.katex .katex-sizing.reset-size1.size3{font-size:1.4em}.katex .fontsize-ensurer.reset-size1.size4,.katex .katex-sizing.reset-size1.size4{font-size:1.6em}.katex .fontsize-ensurer.reset-size1.size5,.katex .katex-sizing.reset-size1.size5{font-size:1.8em}.katex .fontsize-ensurer.reset-size1.size6,.katex .katex-sizing.reset-size1.size6{font-size:2em}.katex .fontsize-ensurer.reset-size1.size7,.katex .katex-sizing.reset-size1.size7{font-size:2.4em}.katex .fontsize-ensurer.reset-size1.size8,.katex .katex-sizing.reset-size1.size8{font-size:2.88em}.katex .fontsize-ensurer.reset-size1.size9,.katex .katex-sizing.reset-size1.size9{font-size:3.456em}.katex .fontsize-ensurer.reset-size1.size10,.katex .katex-sizing.reset-size1.size10{font-size:4.148em}.katex .fontsize-ensurer.reset-size1.size11,.katex .katex-sizing.reset-size1.size11{font-size:4.976em}.katex .fontsize-ensurer.reset-size2.size1,.katex .katex-sizing.reset-size2.size1{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size2.size2,.katex .katex-sizing.reset-size2.size2{font-size:1em}.katex .fontsize-ensurer.reset-size2.size3,.katex .katex-sizing.reset-size2.size3{font-size:1.1666666667em}.katex .fontsize-ensurer.reset-size2.size4,.katex .katex-sizing.reset-size2.size4{font-size:1.3333333333em}.katex .fontsize-ensurer.reset-size2.size5,.katex .katex-sizing.reset-size2.size5{font-size:1.5em}.katex .fontsize-ensurer.reset-size2.size6,.katex .katex-sizing.reset-size2.size6{font-size:1.6666666667em}.katex .fontsize-ensurer.reset-size2.size7,.katex .katex-sizing.reset-size2.size7{font-size:2em}.katex .fontsize-ensurer.reset-size2.size8,.katex .katex-sizing.reset-size2.size8{font-size:2.4em}.katex .fontsize-ensurer.reset-size2.size9,.katex .katex-sizing.reset-size2.size9{font-size:2.88em}.katex .fontsize-ensurer.reset-size2.size10,.katex .katex-sizing.reset-size2.size10{font-size:3.4566666667em}.katex .fontsize-ensurer.reset-size2.size11,.katex .katex-sizing.reset-size2.size11{font-size:4.1466666667em}.katex .fontsize-ensurer.reset-size3.size1,.katex .katex-sizing.reset-size3.size1{font-size:.7142857143em}.katex .fontsize-ensurer.reset-size3.size2,.katex .katex-sizing.reset-size3.size2{font-size:.8571428571em}.katex .fontsize-ensurer.reset-size3.size3,.katex .katex-sizing.reset-size3.size3{font-size:1em}.katex .fontsize-ensurer.reset-size3.size4,.katex .katex-sizing.reset-size3.size4{font-size:1.1428571429em}.katex .fontsize-ensurer.reset-size3.size5,.katex .katex-sizing.reset-size3.size5{font-size:1.2857142857em}.katex .fontsize-ensurer.reset-size3.size6,.katex .katex-sizing.reset-size3.size6{font-size:1.4285714286em}.katex .fontsize-ensurer.reset-size3.size7,.katex .katex-sizing.reset-size3.size7{font-size:1.7142857143em}.katex .fontsize-ensurer.reset-size3.size8,.katex .katex-sizing.reset-size3.size8{font-size:2.0571428571em}.katex .fontsize-ensurer.reset-size3.size9,.katex .katex-sizing.reset-size3.size9{font-size:2.4685714286em}.katex .fontsize-ensurer.reset-size3.size10,.katex .katex-sizing.reset-size3.size10{font-size:2.9628571429em}.katex .fontsize-ensurer.reset-size3.size11,.katex .katex-sizing.reset-size3.size11{font-size:3.5542857143em}.katex .fontsize-ensurer.reset-size4.size1,.katex .katex-sizing.reset-size4.size1{font-size:.625em}.katex .fontsize-ensurer.reset-size4.size2,.katex .katex-sizing.reset-size4.size2{font-size:.75em}.katex .fontsize-ensurer.reset-size4.size3,.katex .katex-sizing.reset-size4.size3{font-size:.875em}.katex .fontsize-ensurer.reset-size4.size4,.katex .katex-sizing.reset-size4.size4{font-size:1em}.katex .fontsize-ensurer.reset-size4.size5,.katex .katex-sizing.reset-size4.size5{font-size:1.125em}.katex .fontsize-ensurer.reset-size4.size6,.katex .katex-sizing.reset-size4.size6{font-size:1.25em}.katex .fontsize-ensurer.reset-size4.size7,.katex .katex-sizing.reset-size4.size7{font-size:1.5em}.katex .fontsize-ensurer.reset-size4.size8,.katex .katex-sizing.reset-size4.size8{font-size:1.8em}.katex .fontsize-ensurer.reset-size4.size9,.katex .katex-sizing.reset-size4.size9{font-size:2.16em}.katex .fontsize-ensurer.reset-size4.size10,.katex .katex-sizing.reset-size4.size10{font-size:2.5925em}.katex .fontsize-ensurer.reset-size4.size11,.katex .katex-sizing.reset-size4.size11{font-size:3.11em}.katex .fontsize-ensurer.reset-size5.size1,.katex .katex-sizing.reset-size5.size1{font-size:.5555555556em}.katex .fontsize-ensurer.reset-size5.size2,.katex .katex-sizing.reset-size5.size2{font-size:.6666666667em}.katex .fontsize-ensurer.reset-size5.size3,.katex .katex-sizing.reset-size5.size3{font-size:.7777777778em}.katex .fontsize-ensurer.reset-size5.size4,.katex .katex-sizing.reset-size5.size4{font-size:.8888888889em}.katex .fontsize-ensurer.reset-size5.size5,.katex .katex-sizing.reset-size5.size5{font-size:1em}.katex .fontsize-ensurer.reset-size5.size6,.katex .katex-sizing.reset-size5.size6{font-size:1.1111111111em}.katex .fontsize-ensurer.reset-size5.size7,.katex .katex-sizing.reset-size5.size7{font-size:1.3333333333em}.katex .fontsize-ensurer.reset-size5.size8,.katex .katex-sizing.reset-size5.size8{font-size:1.6em}.katex .fontsize-ensurer.reset-size5.size9,.katex .katex-sizing.reset-size5.size9{font-size:1.92em}.katex .fontsize-ensurer.reset-size5.size10,.katex .katex-sizing.reset-size5.size10{font-size:2.3044444444em}.katex .fontsize-ensurer.reset-size5.size11,.katex .katex-sizing.reset-size5.size11{font-size:2.7644444444em}.katex .fontsize-ensurer.reset-size6.size1,.katex .katex-sizing.reset-size6.size1{font-size:.5em}.katex .fontsize-ensurer.reset-size6.size2,.katex .katex-sizing.reset-size6.size2{font-size:.6em}.katex .fontsize-ensurer.reset-size6.size3,.katex .katex-sizing.reset-size6.size3{font-size:.7em}.katex .fontsize-ensurer.reset-size6.size4,.katex .katex-sizing.reset-size6.size4{font-size:.8em}.katex .fontsize-ensurer.reset-size6.size5,.katex .katex-sizing.reset-size6.size5{font-size:.9em}.katex .fontsize-ensurer.reset-size6.size6,.katex .katex-sizing.reset-size6.size6{font-size:1em}.katex .fontsize-ensurer.reset-size6.size7,.katex .katex-sizing.reset-size6.size7{font-size:1.2em}.katex .fontsize-ensurer.reset-size6.size8,.katex .katex-sizing.reset-size6.size8{font-size:1.44em}.katex .fontsize-ensurer.reset-size6.size9,.katex .katex-sizing.reset-size6.size9{font-size:1.728em}.katex .fontsize-ensurer.reset-size6.size10,.katex .katex-sizing.reset-size6.size10{font-size:2.074em}.katex .fontsize-ensurer.reset-size6.size11,.katex .katex-sizing.reset-size6.size11{font-size:2.488em}.katex .fontsize-ensurer.reset-size7.size1,.katex .katex-sizing.reset-size7.size1{font-size:.4166666667em}.katex .fontsize-ensurer.reset-size7.size2,.katex .katex-sizing.reset-size7.size2{font-size:.5em}.katex .fontsize-ensurer.reset-size7.size3,.katex .katex-sizing.reset-size7.size3{font-size:.5833333333em}.katex .fontsize-ensurer.reset-size7.size4,.katex .katex-sizing.reset-size7.size4{font-size:.6666666667em}.katex .fontsize-ensurer.reset-size7.size5,.katex .katex-sizing.reset-size7.size5{font-size:.75em}.katex .fontsize-ensurer.reset-size7.size6,.katex .katex-sizing.reset-size7.size6{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size7.size7,.katex .katex-sizing.reset-size7.size7{font-size:1em}.katex .fontsize-ensurer.reset-size7.size8,.katex .katex-sizing.reset-size7.size8{font-size:1.2em}.katex .fontsize-ensurer.reset-size7.size9,.katex .katex-sizing.reset-size7.size9{font-size:1.44em}.katex .fontsize-ensurer.reset-size7.size10,.katex .katex-sizing.reset-size7.size10{font-size:1.7283333333em}.katex .fontsize-ensurer.reset-size7.size11,.katex .katex-sizing.reset-size7.size11{font-size:2.0733333333em}.katex .fontsize-ensurer.reset-size8.size1,.katex .katex-sizing.reset-size8.size1{font-size:.3472222222em}.katex .fontsize-ensurer.reset-size8.size2,.katex .katex-sizing.reset-size8.size2{font-size:.4166666667em}.katex .fontsize-ensurer.reset-size8.size3,.katex .katex-sizing.reset-size8.size3{font-size:.4861111111em}.katex .fontsize-ensurer.reset-size8.size4,.katex .katex-sizing.reset-size8.size4{font-size:.5555555556em}.katex .fontsize-ensurer.reset-size8.size5,.katex .katex-sizing.reset-size8.size5{font-size:.625em}.katex .fontsize-ensurer.reset-size8.size6,.katex .katex-sizing.reset-size8.size6{font-size:.6944444444em}.katex .fontsize-ensurer.reset-size8.size7,.katex .katex-sizing.reset-size8.size7{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size8.size8,.katex .katex-sizing.reset-size8.size8{font-size:1em}.katex .fontsize-ensurer.reset-size8.size9,.katex .katex-sizing.reset-size8.size9{font-size:1.2em}.katex .fontsize-ensurer.reset-size8.size10,.katex .katex-sizing.reset-size8.size10{font-size:1.4402777778em}.katex .fontsize-ensurer.reset-size8.size11,.katex .katex-sizing.reset-size8.size11{font-size:1.7277777778em}.katex .fontsize-ensurer.reset-size9.size1,.katex .katex-sizing.reset-size9.size1{font-size:.2893518519em}.katex .fontsize-ensurer.reset-size9.size2,.katex .katex-sizing.reset-size9.size2{font-size:.3472222222em}.katex .fontsize-ensurer.reset-size9.size3,.katex .katex-sizing.reset-size9.size3{font-size:.4050925926em}.katex .fontsize-ensurer.reset-size9.size4,.katex .katex-sizing.reset-size9.size4{font-size:.462962963em}.katex .fontsize-ensurer.reset-size9.size5,.katex .katex-sizing.reset-size9.size5{font-size:.5208333333em}.katex .fontsize-ensurer.reset-size9.size6,.katex .katex-sizing.reset-size9.size6{font-size:.5787037037em}.katex .fontsize-ensurer.reset-size9.size7,.katex .katex-sizing.reset-size9.size7{font-size:.6944444444em}.katex .fontsize-ensurer.reset-size9.size8,.katex .katex-sizing.reset-size9.size8{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size9.size9,.katex .katex-sizing.reset-size9.size9{font-size:1em}.katex .fontsize-ensurer.reset-size9.size10,.katex .katex-sizing.reset-size9.size10{font-size:1.2002314815em}.katex .fontsize-ensurer.reset-size9.size11,.katex .katex-sizing.reset-size9.size11{font-size:1.4398148148em}.katex .fontsize-ensurer.reset-size10.size1,.katex .katex-sizing.reset-size10.size1{font-size:.2410800386em}.katex .fontsize-ensurer.reset-size10.size2,.katex .katex-sizing.reset-size10.size2{font-size:.2892960463em}.katex .fontsize-ensurer.reset-size10.size3,.katex .katex-sizing.reset-size10.size3{font-size:.337512054em}.katex .fontsize-ensurer.reset-size10.size4,.katex .katex-sizing.reset-size10.size4{font-size:.3857280617em}.katex .fontsize-ensurer.reset-size10.size5,.katex .katex-sizing.reset-size10.size5{font-size:.4339440694em}.katex .fontsize-ensurer.reset-size10.size6,.katex .katex-sizing.reset-size10.size6{font-size:.4821600771em}.katex .fontsize-ensurer.reset-size10.size7,.katex .katex-sizing.reset-size10.size7{font-size:.5785920926em}.katex .fontsize-ensurer.reset-size10.size8,.katex .katex-sizing.reset-size10.size8{font-size:.6943105111em}.katex .fontsize-ensurer.reset-size10.size9,.katex .katex-sizing.reset-size10.size9{font-size:.8331726133em}.katex .fontsize-ensurer.reset-size10.size10,.katex .katex-sizing.reset-size10.size10{font-size:1em}.katex .fontsize-ensurer.reset-size10.size11,.katex .katex-sizing.reset-size10.size11{font-size:1.1996142719em}.katex .fontsize-ensurer.reset-size11.size1,.katex .katex-sizing.reset-size11.size1{font-size:.2009646302em}.katex .fontsize-ensurer.reset-size11.size2,.katex .katex-sizing.reset-size11.size2{font-size:.2411575563em}.katex .fontsize-ensurer.reset-size11.size3,.katex .katex-sizing.reset-size11.size3{font-size:.2813504823em}.katex .fontsize-ensurer.reset-size11.size4,.katex .katex-sizing.reset-size11.size4{font-size:.3215434084em}.katex .fontsize-ensurer.reset-size11.size5,.katex .katex-sizing.reset-size11.size5{font-size:.3617363344em}.katex .fontsize-ensurer.reset-size11.size6,.katex .katex-sizing.reset-size11.size6{font-size:.4019292605em}.katex .fontsize-ensurer.reset-size11.size7,.katex .katex-sizing.reset-size11.size7{font-size:.4823151125em}.katex .fontsize-ensurer.reset-size11.size8,.katex .katex-sizing.reset-size11.size8{font-size:.578778135em}.katex .fontsize-ensurer.reset-size11.size9,.katex .katex-sizing.reset-size11.size9{font-size:.6945337621em}.katex .fontsize-ensurer.reset-size11.size10,.katex .katex-sizing.reset-size11.size10{font-size:.8336012862em}.katex .fontsize-ensurer.reset-size11.size11,.katex .katex-sizing.reset-size11.size11{font-size:1em}.katex .delimsizing.size1{font-family:KaTeX_Size1}.katex .delimsizing.size2{font-family:KaTeX_Size2}.katex .delimsizing.size3{font-family:KaTeX_Size3}.katex .delimsizing.size4{font-family:KaTeX_Size4}.katex .delimsizing.mult .delim-size1>span{font-family:KaTeX_Size1}.katex .delimsizing.mult .delim-size4>span{font-family:KaTeX_Size4}.katex .nulldelimiter{display:inline-block;width:.12em}.katex .delimcenter,.katex .op-symbol{position:relative}.katex .op-symbol.small-op{font-family:KaTeX_Size1}.katex .op-symbol.large-op{font-family:KaTeX_Size2}.katex .katex-accent>.vlist-t,.katex .op-limits>.vlist-t{text-align:center}.katex .katex-accent .accent-body{position:relative}.katex .katex-accent .accent-body:not(.accent-full){width:0}.katex .katex-overlay{display:block}.katex .mtable .vertical-separator{display:inline-block;min-width:1px}.katex .mtable .arraycolsep{display:inline-block}.katex .mtable .col-align-c>.vlist-t{text-align:center}.katex .mtable .col-align-l>.vlist-t{text-align:left}.katex .mtable .col-align-r>.vlist-t{text-align:right}.katex .svg-align{text-align:left}.katex svg{fill:currentColor;stroke:currentColor;display:block;height:inherit;position:absolute;width:100%}.katex svg path{stroke:none}.katex svg{fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1}.katex img{border-style:none;max-height:none;max-width:none;min-height:0;min-width:0}.katex .katex-stretchy{display:block;overflow:hidden;position:relative;width:100%}.katex .katex-stretchy:after,.katex .katex-stretchy:before{content:""}.katex .hide-tail{overflow:hidden;position:relative;width:100%}.katex .halfarrow-left{left:0;overflow:hidden;position:absolute;width:50.2%}.katex .halfarrow-right{overflow:hidden;position:absolute;right:0;width:50.2%}.katex .brace-left{left:0;overflow:hidden;position:absolute;width:25.1%}.katex .brace-center{left:25%;overflow:hidden;position:absolute;width:50%}.katex .brace-right{overflow:hidden;position:absolute;right:0;width:25.1%}.katex .x-arrow-pad{padding:0 .5em}.katex .cd-arrow-pad{padding:0 .55556em 0 .27778em}.katex .mover,.katex .munder,.katex .x-arrow{text-align:center}.katex .boxpad{padding:0 .3em}.katex .fbox,.katex .fcolorbox{border:.04em solid;box-sizing:border-box}.katex .cancel-pad{padding:0 .2em}.katex .cancel-lap{margin-left:-.2em;margin-right:-.2em}.katex .katex-sout{border-bottom-style:solid;border-bottom-width:.08em}.katex .angl{border-right:.049em solid;border-top:.049em solid;box-sizing:border-box;margin-right:.03889em}.katex .anglpad{padding:0 .03889em}.katex .reflectbox{display:inline-block;transform:scaleX(-1)}.katex .eqn-num:before{content:"(" counter(katexEqnNo) ")";counter-increment:katexEqnNo}.katex .mml-eqn-num:before{content:"(" counter(mmlEqnNo) ")";counter-increment:mmlEqnNo}.katex .mtr-glue{width:50%}.katex .cd-vert-arrow{display:inline-block;position:relative}.katex .cd-label-left{display:inline-block;position:absolute;right:calc(50% + .3em);text-align:left}.katex .cd-label-right{display:inline-block;left:calc(50% + .3em);position:absolute;text-align:right}.katex-display{display:block;margin:1em 0;text-align:center}.katex-display>.katex{display:block;text-align:center;white-space:nowrap}.katex-display>.katex>.katex-html{display:block;position:relative}.katex-display>.katex>.katex-html>.katex-tag{position:absolute;right:0}.katex-display.leqno>.katex>.katex-html>.katex-tag{left:0;right:auto}.katex-display.fleqn>.katex{padding-left:2em;text-align:left}body{counter-reset:katexEqnNo mmlEqnNo}
</style>
  <style data-inlined="/inexplicable-phenomena/sheets/f22699cbda8a.css">.ldScnz .pa-list{counter-reset:list-item;}/*!sc*/
.ldScnz .pa-item{display:list-item;list-style:disc inside;}/*!sc*/
.ldScnz .pa-ordered .pa-item{list-style-type:decimal;}/*!sc*/
data-styled.g12[id="sc-kEqYZi"]{content:"ldScnz,"}/*!sc*/
.ilUBoY .pa-page:not(.pa-open){display:none;}/*!sc*/
data-styled.g17[id="sc-kslsaH"]{content:"ilUBoY,"}/*!sc*/
.beYWyS{font-family:Georgia,'Times New Roman',serif;font-size:1.0625rem;line-height:1.6;color:#1b1b1b;background:#ffffff;max-width:40rem;margin-inline:auto;padding:1.25rem;}/*!sc*/
.beYWyS .pd-book{margin-block:calc(2 * 1.25rem) 1.25rem;counter-reset:chapter equation;}/*!sc*/
.beYWyS .pd-chapter{margin-block:1.25rem;scroll-margin-block-start:1.25rem;}/*!sc*/
.beYWyS .pa-page.pa-open{margin-block-start:calc(1.25rem / 2);}/*!sc*/
.beYWyS .pd-section{margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-paragraph{margin-block:1.25rem;}/*!sc*/
.beYWyS .pa-item{margin-block:calc(1.25rem / 4);}/*!sc*/
.beYWyS .pa-list .pa-item{list-style-position:outside;margin-inline-start:1.2em;}/*!sc*/
.beYWyS .pd-title{font-size:calc(1.5 * 1.0625rem);font-weight:bold;margin-block-end:1.25rem;}/*!sc*/
.beYWyS .pd-heading{font-weight:bold;font-size:calc(1.15 * 1.0625rem);margin-block:1.25rem 0;}/*!sc*/
.beYWyS .pd-section>.pd-heading{margin-block-start:0;}/*!sc*/
.beYWyS .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)){display:none;}/*!sc*/
.beYWyS .pd-line{white-space:pre-wrap;}/*!sc*/
.beYWyS .pd-word{overflow-wrap:break-word;}/*!sc*/
.beYWyS .pd-canonical.pd-chapter{counter-increment:chapter;}/*!sc*/
.beYWyS .pd-chapter .pd-title::before{display:block;margin-block-end:calc(1.25rem / 4);}/*!sc*/
.beYWyS .pd-canonical.pd-chapter .pd-title::before{content:'Chapter ' counter(chapter);}/*!sc*/
.beYWyS .pd-label,.beYWyS .pd-chapter .pd-title::before{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}/*!sc*/
.beYWyS .pa-reference{color:#1f4e79;text-decoration-color:#1f4e79;text-underline-offset:0.15em;}/*!sc*/
.beYWyS .pa-self-reference{color:inherit;text-decoration:none;}/*!sc*/
.beYWyS .pa-referent{scroll-margin-block-start:1.25rem;}/*!sc*/
.beYWyS .pa-content{color:#1f4e79;}/*!sc*/
.beYWyS .pd-running-head{font-size:calc(0.7 * 1.0625rem);letter-spacing:0.08em;text-transform:uppercase;margin-block:0 calc(1.25rem / 2);padding-block-end:calc(1.25rem / 4);border-block-end:1px solid color-mix(in srgb, #1b1b1b 30%, #ffffff);}/*!sc*/
.beYWyS .pd-running-head a{text-decoration:none;color:color-mix(in srgb, #1b1b1b 70%, #ffffff);}/*!sc*/
.beYWyS .pd-running-head a:hover{color:#1b1b1b;}/*!sc*/
.beYWyS .pd-running-head .pd-square{margin-inline-start:0.6em;}/*!sc*/
.beYWyS .pd-running-head .pd-book-title[data-to="cover"]{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"]{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"]{display:inline;}/*!sc*/
.beYWyS .pd-figure{max-width:100%;}/*!sc*/
.beYWyS .pd-code{font-family:ui-monospace,monospace;font-size:calc(0.85 * 1.0625rem);line-height:1.5;white-space:pre;overflow-x:auto;margin-block:1.25rem;padding:calc(0.75 * 1.25rem) 1.25rem;border-inline-start:2px solid color-mix(in srgb, #1b1b1b 25%, #ffffff);}/*!sc*/
.beYWyS .pd-code-line::before{content:attr(data-line);display:inline-block;width:3ch;margin-inline-end:1.5ch;text-align:end;opacity:0.4;user-select:none;}/*!sc*/
.beYWyS .pd-image img,.beYWyS .pd-svg svg{display:block;max-width:100%;height:auto;margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-document object{display:block;width:100%;aspect-ratio:1/1.4142;margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-math,.beYWyS .pd-date{white-space:nowrap;}/*!sc*/
.beYWyS .pd-equation{position:relative;counter-increment:equation;}/*!sc*/
.beYWyS .pd-equation::after{content:'(' counter(equation) ')';position:absolute;inset-inline-end:0;top:50%;transform:translateY(-50%);}/*!sc*/
.beYWyS .pd-front{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-front{display:flex;}/*!sc*/
.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-running-head,.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-byline,.beYWyS .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open{display:none;}/*!sc*/
.beYWyS .pd-front{--front-width:min(calc((100vh - 7 * 1.25rem) * 2 / 3), calc(min(40rem, 100vw) - 2 * 1.25rem));position:relative;box-sizing:border-box;width:var(--front-width);font-size:calc(var(--front-width) / 22);flex-direction:column;align-items:center;text-align:center;aspect-ratio:2/3;margin:0 auto calc(2 * 1.25rem);padding:3em 2em 1.75em;border:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);box-shadow:inset 0 0 0 .375em #ffffff,inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, #1b1b1b 35%, #ffffff),2px 12px 28px -12px rgba(0, 0, 0, .45);background:#ffffff;}/*!sc*/
.beYWyS .pd-front::before{content:'';position:absolute;inset:0 auto 0 0;width:1.25em;background:linear-gradient(to right, color-mix(in srgb, #1b1b1b 22%, transparent), color-mix(in srgb, #1b1b1b 5%, transparent) 55%, transparent);z-index:1;pointer-events:none;}/*!sc*/
.beYWyS .pd-front>a,.beYWyS .pd-front .pd-word{display:block;}/*!sc*/
.beYWyS .pd-front .pa-reference{color:inherit;text-decoration:none;}/*!sc*/
.beYWyS .pd-front a:hover .pd-word{text-decoration:underline;text-underline-offset:0.15em;}/*!sc*/
.beYWyS .pd-front-name{font-size:2.4em;line-height:1.1;font-weight:bold;margin-block:.15em .33em;}/*!sc*/
.beYWyS .pd-front-name::after{content:'';display:block;width:1.45em;border-top:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);margin:.375em auto 0;}/*!sc*/
.beYWyS .pd-front-author{font-size:1.15em;letter-spacing:.04em;}/*!sc*/
.beYWyS .pd-front-tagline{font-style:italic;opacity:.75;margin-top:1.15em;font-size:.95em;}/*!sc*/
.beYWyS .pd-front>:nth-last-child(2){margin-top:auto;}/*!sc*/
.beYWyS .pd-front-imprint{font-size:.74em;letter-spacing:.15em;text-transform:uppercase;opacity:.65;margin-top:.47em;}/*!sc*/
.beYWyS .pa-page.pa-open{animation:come .5s ease;}/*!sc*/
@keyframes come{from{opacity:0;transform:translateY(1rem);}to{opacity:1;transform:none;}}/*!sc*/
.beYWyS .pd-plate{float:inline-start;width:11rem;margin:.25rem 1.5rem 1rem 0;}/*!sc*/
.beYWyS .pd-plate .pd-image img{margin-block:0;border:1px solid color-mix(in srgb, #1b1b1b 20%, #ffffff);box-shadow:0 1px 3px rgba(0, 0, 0, .12);}/*!sc*/
.beYWyS .pd-plate .pa-opening{text-decoration:none;color:inherit;}/*!sc*/
.beYWyS .pd-plate .pa-opening .pd-word{display:block;font-size:.8rem;margin-top:.4rem;opacity:.75;text-decoration:underline;}/*!sc*/
.beYWyS .pd-chapter:has(> .pd-paragraph > .pd-plate)>.pd-paragraph:first-child{margin-block:0;}/*!sc*/
@media (max-width: 640px){.beYWyS .pd-plate{width:7rem;margin-right:1rem;}}/*!sc*/
.beYWyS .pd-navigation{display:flex;justify-content:center;align-items:baseline;gap:.15em;margin-block:calc(1.25rem / 2);}/*!sc*/
.beYWyS *:has(> .pd-navigation:first-child){position:relative;}/*!sc*/
.beYWyS .pd-navigation:first-child{position:absolute;inset-block-start:.1rem;inset-inline-end:0;margin-block:0;z-index:2;}/*!sc*/
.beYWyS .pd-navigation a{text-decoration:none;}/*!sc*/
.beYWyS .pd-navigation .pd-word{font-size:1.0625rem;line-height:1;color:color-mix(in srgb, #1b1b1b 55%, #ffffff);transition:color .15s ease;}/*!sc*/
.beYWyS .pd-navigation a:hover .pd-word{color:#1b1b1b;}/*!sc*/
.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)){pointer-events:none;}/*!sc*/
.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word{color:color-mix(in srgb, #1b1b1b 22%, #ffffff);}/*!sc*/
data-styled.g18[id="sc-hBMXrk"]{content:"beYWyS,"}/*!sc*/
.hKvrQA .pd-chapter.pa-cover{margin-block:1.25rem calc(2 * 1.25rem);}/*!sc*/
.hKvrQA .pa-cover .pd-title{margin-block:0;font-size:calc(2.25 * 1.0625rem);line-height:1.2;}/*!sc*/
.hKvrQA .pa-cover .pd-title::before{content:'Cover';}/*!sc*/
.hKvrQA .pa-biography .pd-title::before{content:'Biography';}/*!sc*/
.hKvrQA .pa-autobiography .pd-title::before{content:'Autobiography';}/*!sc*/
data-styled.g20[id="sc-fFSRQT"]{content:"hKvrQA,"}/*!sc*/
.clPWRv .pa-synopsis .pd-title::before{content:'Synopsis';}/*!sc*/
data-styled.g21[id="sc-bkbknG"]{content:"clPWRv,"}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-paragraph{margin-block:calc(1.25rem / 4);}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-title::before{content:'Table of Contents';}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-heading{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}/*!sc*/
data-styled.g23[id="sc-dIvsxA"]{content:"fpvZNQ,"}/*!sc*/
.gAJIDt:not(:has(.pa-page.pa-open)){display:none;}/*!sc*/
data-styled.g26[id="sc-kfYpvV"]{content:"gAJIDt,"}/*!sc*/
</style>
  
  <style>.pa-arriving .pd-pages{visibility:hidden}</style>
  <style data-styled="active" data-styled-version="6.4.0">.ldScnz .pa-list{counter-reset:list-item;}.ldScnz .pa-item{display:list-item;list-style:disc inside;}.ldScnz .pa-ordered .pa-item{list-style-type:decimal;}.ilUBoY .pa-page:not(.pa-open){display:none;}.beYWyS{font-family:Georgia,'Times New Roman',serif;font-size:1.0625rem;line-height:1.6;color:#1b1b1b;background:#ffffff;max-width:40rem;margin-inline:auto;padding:1.25rem;}.beYWyS .pd-book{margin-block:calc(2 * 1.25rem) 1.25rem;counter-reset:chapter equation;}.beYWyS .pd-chapter{margin-block:1.25rem;scroll-margin-block-start:1.25rem;}.beYWyS .pa-page.pa-open{margin-block-start:calc(1.25rem / 2);}.beYWyS .pd-section{margin-block:1.25rem;}.beYWyS .pd-paragraph{margin-block:1.25rem;}.beYWyS .pa-item{margin-block:calc(1.25rem / 4);}.beYWyS .pa-list .pa-item{list-style-position:outside;margin-inline-start:1.2em;}.beYWyS .pd-title{font-size:calc(1.5 * 1.0625rem);font-weight:bold;margin-block-end:1.25rem;}.beYWyS .pd-heading{font-weight:bold;font-size:calc(1.15 * 1.0625rem);margin-block:1.25rem 0;}.beYWyS .pd-section>.pd-heading{margin-block-start:0;}.beYWyS .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)){display:none;}.beYWyS .pd-line{white-space:pre-wrap;}.beYWyS .pd-word{overflow-wrap:break-word;}.beYWyS .pd-canonical.pd-chapter{counter-increment:chapter;}.beYWyS .pd-chapter .pd-title::before{display:block;margin-block-end:calc(1.25rem / 4);}.beYWyS .pd-canonical.pd-chapter .pd-title::before{content:'Chapter ' counter(chapter);}.beYWyS .pd-label,.beYWyS .pd-chapter .pd-title::before{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}.beYWyS .pa-reference{color:#1f4e79;text-decoration-color:#1f4e79;text-underline-offset:0.15em;}.beYWyS .pa-self-reference{color:inherit;text-decoration:none;}.beYWyS .pa-referent{scroll-margin-block-start:1.25rem;}.beYWyS .pa-content{color:#1f4e79;}.beYWyS .pd-running-head{font-size:calc(0.7 * 1.0625rem);letter-spacing:0.08em;text-transform:uppercase;margin-block:0 calc(1.25rem / 2);padding-block-end:calc(1.25rem / 4);border-block-end:1px solid color-mix(in srgb, #1b1b1b 30%, #ffffff);}.beYWyS .pd-running-head a{text-decoration:none;color:color-mix(in srgb, #1b1b1b 70%, #ffffff);}.beYWyS .pd-running-head a:hover{color:#1b1b1b;}.beYWyS .pd-running-head .pd-square{margin-inline-start:0.6em;}.beYWyS .pd-running-head .pd-book-title[data-to="cover"]{display:none;}.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"]{display:none;}.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"]{display:inline;}.beYWyS .pd-figure{max-width:100%;}.beYWyS .pd-code{font-family:ui-monospace,monospace;font-size:calc(0.85 * 1.0625rem);line-height:1.5;white-space:pre;overflow-x:auto;margin-block:1.25rem;padding:calc(0.75 * 1.25rem) 1.25rem;border-inline-start:2px solid color-mix(in srgb, #1b1b1b 25%, #ffffff);}.beYWyS .pd-code-line::before{content:attr(data-line);display:inline-block;width:3ch;margin-inline-end:1.5ch;text-align:end;opacity:0.4;user-select:none;}.beYWyS .pd-image img,.beYWyS .pd-svg svg{display:block;max-width:100%;height:auto;margin-block:1.25rem;}.beYWyS .pd-document object{display:block;width:100%;aspect-ratio:1/1.4142;margin-block:1.25rem;}.beYWyS .pd-math,.beYWyS .pd-date{white-space:nowrap;}.beYWyS .pd-equation{position:relative;counter-increment:equation;}.beYWyS .pd-equation::after{content:'(' counter(equation) ')';position:absolute;inset-inline-end:0;top:50%;transform:translateY(-50%);}.beYWyS .pd-front{display:none;}.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-front{display:flex;}.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-running-head,.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-byline,.beYWyS .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open{display:none;}.beYWyS .pd-front{--front-width:min(calc((100vh - 7 * 1.25rem) * 2 / 3), calc(min(40rem, 100vw) - 2 * 1.25rem));position:relative;box-sizing:border-box;width:var(--front-width);font-size:calc(var(--front-width) / 22);flex-direction:column;align-items:center;text-align:center;aspect-ratio:2/3;margin:0 auto calc(2 * 1.25rem);padding:3em 2em 1.75em;border:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);box-shadow:inset 0 0 0 .375em #ffffff,inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, #1b1b1b 35%, #ffffff),2px 12px 28px -12px rgba(0, 0, 0, .45);background:#ffffff;}.beYWyS .pd-front::before{content:'';position:absolute;inset:0 auto 0 0;width:1.25em;background:linear-gradient(to right, color-mix(in srgb, #1b1b1b 22%, transparent), color-mix(in srgb, #1b1b1b 5%, transparent) 55%, transparent);z-index:1;pointer-events:none;}.beYWyS .pd-front>a,.beYWyS .pd-front .pd-word{display:block;}.beYWyS .pd-front .pa-reference{color:inherit;text-decoration:none;}.beYWyS .pd-front a:hover .pd-word{text-decoration:underline;text-underline-offset:0.15em;}.beYWyS .pd-front-name{font-size:2.4em;line-height:1.1;font-weight:bold;margin-block:.15em .33em;}.beYWyS .pd-front-name::after{content:'';display:block;width:1.45em;border-top:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);margin:.375em auto 0;}.beYWyS .pd-front-author{font-size:1.15em;letter-spacing:.04em;}.beYWyS .pd-front-tagline{font-style:italic;opacity:.75;margin-top:1.15em;font-size:.95em;}.beYWyS .pd-front>:nth-last-child(2){margin-top:auto;}.beYWyS .pd-front-imprint{font-size:.74em;letter-spacing:.15em;text-transform:uppercase;opacity:.65;margin-top:.47em;}.beYWyS .pa-page.pa-open{animation:come .5s ease;}@keyframes come{from{opacity:0;transform:translateY(1rem);}to{opacity:1;transform:none;}}.beYWyS .pd-plate{float:inline-start;width:11rem;margin:.25rem 1.5rem 1rem 0;}.beYWyS .pd-plate .pd-image img{margin-block:0;border:1px solid color-mix(in srgb, #1b1b1b 20%, #ffffff);box-shadow:0 1px 3px rgba(0, 0, 0, .12);}.beYWyS .pd-plate .pa-opening{text-decoration:none;color:inherit;}.beYWyS .pd-plate .pa-opening .pd-word{display:block;font-size:.8rem;margin-top:.4rem;opacity:.75;text-decoration:underline;}.beYWyS .pd-chapter:has(> .pd-paragraph > .pd-plate)>.pd-paragraph:first-child{margin-block:0;}@media (max-width: 640px){.beYWyS .pd-plate{width:7rem;margin-right:1rem;}}.beYWyS .pd-navigation{display:flex;justify-content:center;align-items:baseline;gap:.15em;margin-block:calc(1.25rem / 2);}.beYWyS *:has(> .pd-navigation:first-child){position:relative;}.beYWyS .pd-navigation:first-child{position:absolute;inset-block-start:.1rem;inset-inline-end:0;margin-block:0;z-index:2;}.beYWyS .pd-navigation a{text-decoration:none;}.beYWyS .pd-navigation .pd-word{font-size:1.0625rem;line-height:1;color:color-mix(in srgb, #1b1b1b 55%, #ffffff);transition:color .15s ease;}.beYWyS .pd-navigation a:hover .pd-word{color:#1b1b1b;}.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)){pointer-events:none;}.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word{color:color-mix(in srgb, #1b1b1b 22%, #ffffff);}.hKvrQA .pd-chapter.pa-cover{margin-block:1.25rem calc(2 * 1.25rem);}.hKvrQA .pa-cover .pd-title{margin-block:0;font-size:calc(2.25 * 1.0625rem);line-height:1.2;}.hKvrQA .pa-cover .pd-title::before{content:'Cover';}.hKvrQA .pa-biography .pd-title::before{content:'Biography';}.hKvrQA .pa-autobiography .pd-title::before{content:'Autobiography';}.clPWRv .pa-synopsis .pd-title::before{content:'Synopsis';}.fpvZNQ .pa-table-of-contents .pd-paragraph{margin-block:calc(1.25rem / 4);}.fpvZNQ .pa-table-of-contents .pd-title::before{content:'Table of Contents';}.fpvZNQ .pa-table-of-contents .pd-heading{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}.gAJIDt:not(:has(.pa-page.pa-open)){display:none;}</style><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
  <body>
    <div id="root"><!--$--><div class="sc-hBMXrk beYWyS pd-container"><div class="sc-kslsaH ilUBoY pd-container"><div class="pd-book pa-paginated"><div class="pd-paragraph pd-running-head"><span class="pd-book-title" data-to="table"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Subjective Reference</span></a></span><span class="pd-book-title" data-to="cover"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Subjective Reference</span></a></span><span class="pd-square"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a></span></div><div class="pd-paragraph pd-front"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-name pa-reference">Subjective Reference</span></a><a href="/inexplicable-phenomena/our-team/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-author pa-reference">Doug</span></a><span class="pd-word pd-front-tagline">The least a library needs to bind.</span><a href="/inexplicable-phenomena/our-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-imprint pa-reference">Inexplicable Phenomena</span></a><span class="pd-word pd-front-imprint"><a href="/inexplicable-phenomena/our-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Inexplicable Phenomena</span></a></span></div><header class="sc-fFSRQT hKvrQA pd-container"><div class="pd-chapter pa-page pa-cover"><a href="/inexplicable-phenomena/our-reference/" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="subjective-reference" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">Subjective Reference</div></a></div></header><div class="sc-bkbknG clPWRv pd-container"><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><span class="pd-chapter pa-page pa-navigated pa-parenthetical pa-synopsis" hidden=""></span><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div></div><nav class="sc-dIvsxA fpvZNQ pd-container"><div class="pd-chapter pa-page pa-table-of-contents"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span id="table-of-contents" class="pd-sentence pd-title pa-parenthetical pa-reference pa-self-reference pa-referent" hidden=""></span></a><div class="pd-section"><a href="#contents" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="contents" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">Contents</div></a><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Book</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Theme</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Running Head and the Byline</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Faces</span></div></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">Developing the Library</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Paper</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Reference Manual</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Specification</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Content</span></div></a><span class="pd-paragraph pa-parenthetical" hidden=""></span></div></div></nav><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-book" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Book</div></a><div class="pd-section"><a href="#what-a-book-is-here" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="what-a-book-is-here" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">What a book is here</div></a><div class="pd-paragraph">Every book in this library extends the library's own, so what a book is here is decided once and a change to it reaches all of them. The book class is the layout: the running head, the byline drawn from what the book's cover says, then the chapters. Its file is where the library's theme is registered, once, on the class every book extends. A cover's route opens at the top of the page; every other bookmark turns as the framework does.</div><div class="pd-paragraph">The class stands beside this chapter as its code, borrowed on 2026-10-30 from the binder's own test library, whose manual the team wrote, and to be rebuilt from here by sketches rather than kept. The theme it registers is <a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Theme</span></a>; the running head and the byline it draws are <a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Running Head and the Byline</span></a>.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $ } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Book, $Chapter, $Cover, $TableOfContents, <span class="hljs-title class_">Paginated</span>, <span class="hljs-title class_">Theme</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">LibraryTheme</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./2-the-theme~code.tsx'</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">RunningHead</span> <span class="hljs-keyword">as</span> runningHead } <span class="hljs-keyword">from</span> <span class="hljs-string">'./3-the-running-head-and-the-byline~code.tsx'</span>;
<span class="hljs-keyword">import</span> { $Navigation, <span class="hljs-title class_">Front</span> <span class="hljs-keyword">as</span> front, <span class="hljs-title class_">Navigated</span> <span class="hljs-keyword">as</span> navigated } <span class="hljs-keyword">from</span> <span class="hljs-string">'./4-the-faces~code.tsx'</span>;

<span class="hljs-comment">// THE HEADING IS MINIMAL AND THE BYLINE IS NOT DRAWN, Doug, 2026-11-16: first "Why does every chapter need a</span>
<span class="hljs-comment">// title and author?!?", then "what happened to a minimal heading, at least with the book title" — the running</span>
<span class="hljs-comment">// head is the book's title alone, a way to the table and, from the table, to the cover; the author lives on the</span>
<span class="hljs-comment">// front and in the table of contents.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$TheLibrary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Book</span> {
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">RunningHead</span> = $(runningHead);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Front</span> = $(front);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">RunningHead</span> <span class="hljs-attr">chapter</span>=<span class="hljs-string">{this.cover}</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Front</span> <span class="hljs-attr">chapter</span>=<span class="hljs-string">{this.cover}</span> /&gt;</span>
                {super.write()}
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }

    <span class="hljs-comment">// A PAGE OPENS AT ITS TOP, Doug, 2026-11-16: "We need pages to open at the top... not scrolled down" — a</span>
    <span class="hljs-comment">// turn lands on the page's top with the running head in view, never past it.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> <span class="hljs-title function_">turn</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">scrollTo</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Paginated</span> /&gt;</span></span>
        );
    }

    <span class="hljs-comment">// EVERY CHAPTER BUT THE COVER IS NAVIGATED, said by the book at its bond and before the bond reaches the</span>
    <span class="hljs-comment">// chapters, so the lines the format holds are bound with them. The cover's page is the front; a chapter that</span>
    <span class="hljs-comment">// already says Navigation in its own text keeps its own. Doug, 2026-11-16: "You need next and table of</span>
    <span class="hljs-comment">// contents and previous on the top and bottom of every chapter in the library."</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Bound(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigated</span> = $(navigated);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> chapter <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">find</span>($Chapter)) {
            <span class="hljs-comment">// THE TABLE WEARS NO NAVIGATION, Doug, 2026-11-16, pressing the square and landing on the table's own</span>
            <span class="hljs-comment">// page: "WHAT IS THIS!!!" — the table of contents is the book's navigation and carries none of its own.</span>
            <span class="hljs-keyword">if</span> (chapter.<span class="hljs-title function_">is</span>($Cover) || chapter.<span class="hljs-title function_">is</span>($TableOfContents) || chapter.<span class="hljs-property">text</span>.<span class="hljs-title function_">find</span>($Navigation).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) <span class="hljs-keyword">continue</span>;
            chapter.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigated</span> /&gt;</span></span>);
            chapter.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">define</span>();
        }
        <span class="hljs-variable language_">super</span>.$Bound();
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">TheLibrary</span> = $($TheLibrary);
$(<span class="hljs-title class_">TheLibrary</span>, <span class="hljs-title class_">Theme</span>)(<span class="hljs-title class_">LibraryTheme</span>);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-theme" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Theme</div></a><div class="pd-section"><a href="#the-values-and-the-parts" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-values-and-the-parts" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The values and the parts</div></a><div class="pd-paragraph">A theme is a set of values, the font, the measure, the ink, the paper, the link, and the parts that use them: the page, the levels of a book, the labels, the links, the apparatus and the figures. The file beside this chapter is the one the book registers. It is the test library's theme as borrowed, a serif on warm paper, and it stands only until the sketches say what this library's own looks like.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { css, <span class="hljs-title class_">RuleSet</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'styled-components'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Theme } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'styled-components'</span> {
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">DefaultTheme</span> <span class="hljs-keyword">extends</span> $<span class="hljs-title class_">LibraryTheme</span> {}
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTheme</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Theme</span> {
    font = <span class="hljs-string">"Georgia, 'Times New Roman', serif"</span>;
    size = <span class="hljs-string">'1.0625rem'</span>;
    leading = <span class="hljs-string">'1.6'</span>;
    measure = <span class="hljs-string">'40rem'</span>;
    space = <span class="hljs-string">'1.25rem'</span>;
    ink = <span class="hljs-string">'#1b1b1b'</span>;
    paper = <span class="hljs-string">'#ffffff'</span>;
    link = <span class="hljs-string">'#1f4e79'</span>;
    <span class="hljs-attr">style</span>: <span class="hljs-title class_">ElementType</span> = selection.<span class="hljs-property">div</span><span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.parts()}</span>\`</span>;

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">parts</span>(): <span class="hljs-title class_">RuleSet</span>[] {
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">page</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">levels</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">labels</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">links</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">apparatus</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">figures</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">front</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">plate</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">navigation</span>()];
    }

    <span class="hljs-comment">// THE NAVIGATION, one line of apparatus at the top and bottom of a chapter, drawn around the chapter by the book's</span>
    <span class="hljs-comment">// Navigated format: three glyphs, the arrow looking back on the left, the square for the table of contents in the</span>
    <span class="hljs-comment">// middle, the arrow looking on at the right, on Doug's "left arrow, square, right arrow for the next previous and</span>
    <span class="hljs-comment">// table. Visually engaging" (2026-11-16); a self edge, the first or the last chapter's, keeps its place unseen.</span>
    <span class="hljs-comment">// Doug, the same day: "We need to be able to move easily."</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">navigation</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-navigation</span> { <span class="hljs-attribute">display</span>: flex; <span class="hljs-attribute">justify-content</span>: center; <span class="hljs-attribute">align-items</span>: baseline; <span class="hljs-attribute">gap</span>: .<span class="hljs-number">15em</span>; <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>); }
            *<span class="hljs-selector-pseudo">:has</span>(&gt; <span class="hljs-selector-class">.pd-navigation</span><span class="hljs-selector-pseudo">:first-child</span>) { <span class="hljs-attribute">position</span>: relative; }
            <span class="hljs-selector-class">.pd-navigation</span><span class="hljs-selector-pseudo">:first-child</span> { <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset-block-start</span>: .<span class="hljs-number">1rem</span>; <span class="hljs-attribute">inset-inline-end</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">font-size</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">55%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">transition</span>: color .<span class="hljs-number">15s</span> ease; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-pseudo">:is</span>(<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.pa-self-reference</span>, <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-self-reference</span>)) { <span class="hljs-attribute">pointer-events</span>: none; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-pseudo">:is</span>(<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.pa-self-reference</span>, <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-self-reference</span>)) <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">22%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); }
        \`</span>;
    }

    <span class="hljs-comment">// THE FRONT, the cover drawn as a book, Sprint 125: shown alone while the cover is the open page, the running</span>
    <span class="hljs-comment">// head, the byline and the cover chapter itself unseen then and back the moment another page opens; a page</span>
    <span class="hljs-comment">// that opens comes in with a short fade, the library's one transition. Sketch 004, form a.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">front</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attribute">display</span>: flex; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span>, <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-byline</span>, <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-comment">/* THE BOARD FILLS THE SCREEN, Doug, 2026-11-17: "make the book bigger... as large as possible given
               that my screen looks like this" — the board stands as tall as the screen allows, the book's upper
               margin above it and the same air below, its width following at a book's proportion and capped at
               the column on a narrow screen; every length on the board is an em of the board's own size, one
               twenty-second of its width, the size the 22rem board of Sprint 125 was drawn at, so the type and the
               frame grow with it as a print enlarges. The seven spaces taken from the screen's height are the
               three above and the three below, and one for the page to breathe at the bottom without a scrollbar. */</span>
            <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attr">--front-width</span>: <span class="hljs-built_in">min</span>(<span class="hljs-built_in">calc</span>((<span class="hljs-number">100vh</span> - <span class="hljs-number">7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) * <span class="hljs-number">2</span> / <span class="hljs-number">3</span>), <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">min</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.measure}</span><span class="language-css">, <span class="hljs-number">100vw</span>) - <span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">)); <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">box-sizing</span>: border-box; <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--front-width); <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--front-width) / <span class="hljs-number">22</span>); <span class="hljs-attribute">flex-direction</span>: column; <span class="hljs-attribute">align-items</span>: center; <span class="hljs-attribute">text-align</span>: center; <span class="hljs-attribute">aspect-ratio</span>: <span class="hljs-number">2</span> / <span class="hljs-number">3</span>; <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto <span class="hljs-built_in">calc</span>(<span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">); <span class="hljs-attribute">padding</span>: <span class="hljs-number">3em</span> <span class="hljs-number">2em</span> <span class="hljs-number">1.75em</span>; <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">50%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> .<span class="hljs-number">375em</span> </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">, inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-built_in">calc</span>(.<span class="hljs-number">375em</span> + <span class="hljs-number">1px</span>) <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">35%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">), <span class="hljs-number">2px</span> <span class="hljs-number">12px</span> <span class="hljs-number">28px</span> -<span class="hljs-number">12px</span> <span class="hljs-built_in">rgba</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, .<span class="hljs-number">45</span>); <span class="hljs-attribute">background</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-front</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>; <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset</span>: <span class="hljs-number">0</span> auto <span class="hljs-number">0</span> <span class="hljs-number">0</span>; <span class="hljs-attribute">width</span>: <span class="hljs-number">1.25em</span>; <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">22%</span>, transparent), <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">5%</span>, transparent) <span class="hljs-number">55%</span>, transparent); <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">pointer-events</span>: none; }
            <span class="hljs-selector-class">.pd-front</span> &gt; <span class="hljs-selector-tag">a</span>, <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">display</span>: block; }
            <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-class">.pa-reference</span> { <span class="hljs-attribute">color</span>: inherit; <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">text-decoration</span>: underline; <span class="hljs-attribute">text-underline-offset</span>: <span class="hljs-number">0.15em</span>; }
            <span class="hljs-selector-class">.pd-front-name</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2.4em</span>; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.1</span>; <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">margin-block</span>: .<span class="hljs-number">15em</span> .<span class="hljs-number">33em</span>; }
            <span class="hljs-selector-class">.pd-front-name</span><span class="hljs-selector-pseudo">::after</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>; <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">width</span>: <span class="hljs-number">1.45em</span>; <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">50%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">margin</span>: .<span class="hljs-number">375em</span> auto <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-front-author</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.15em</span>; <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">04em</span>; }
            <span class="hljs-selector-class">.pd-front-tagline</span> { <span class="hljs-attribute">font-style</span>: italic; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">75</span>; <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1.15em</span>; <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">95em</span>; }
            <span class="hljs-selector-class">.pd-front</span> &gt; <span class="hljs-selector-pseudo">:nth-last-child</span>(<span class="hljs-number">2</span>) { <span class="hljs-attribute">margin-top</span>: auto; }
            <span class="hljs-selector-class">.pd-front-imprint</span> { <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">74em</span>; <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">15em</span>; <span class="hljs-attribute">text-transform</span>: uppercase; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">65</span>; <span class="hljs-attribute">margin-top</span>: .<span class="hljs-number">47em</span>; }
            <span class="hljs-selector-class">.pa-page</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">animation</span>: come .<span class="hljs-number">5s</span> ease; }
            <span class="hljs-keyword">@keyframes</span> come { <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(<span class="hljs-number">1rem</span>); } <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">transform</span>: none; } }
        \`</span>;
    }

    <span class="hljs-comment">// THE PLATE, a publication's small picture at the top left of its page with the text flowing under it, Sprint</span>
    <span class="hljs-comment">// 125; its opening carries no underline, the picture being the link. Sketch 002, form a.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">plate</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-plate</span> { <span class="hljs-attribute">float</span>: inline-start; <span class="hljs-attribute">width</span>: <span class="hljs-number">11rem</span>; <span class="hljs-attribute">margin</span>: .<span class="hljs-number">25rem</span> <span class="hljs-number">1.5rem</span> <span class="hljs-number">1rem</span> <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pd-image</span> <span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">20%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-built_in">rgba</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, .<span class="hljs-number">12</span>); }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pa-opening</span> { <span class="hljs-attribute">text-decoration</span>: none; <span class="hljs-attribute">color</span>: inherit; }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pa-opening</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">8rem</span>; <span class="hljs-attribute">margin-top</span>: .<span class="hljs-number">4rem</span>; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">75</span>; <span class="hljs-attribute">text-decoration</span>: underline; }
            <span class="hljs-selector-class">.pd-chapter</span><span class="hljs-selector-pseudo">:has</span>(&gt; <span class="hljs-selector-class">.pd-paragraph</span> &gt; <span class="hljs-selector-class">.pd-plate</span>) &gt; <span class="hljs-selector-class">.pd-paragraph</span><span class="hljs-selector-pseudo">:first-child</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; }
            <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">max-width</span>: <span class="hljs-number">640px</span>) { <span class="hljs-selector-class">.pd-plate</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">7rem</span>; <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">1rem</span>; } }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">page</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-attribute">font-family</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span><span class="language-css">;
            <span class="hljs-attribute">font-size</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">;
            <span class="hljs-attribute">line-height</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.leading}</span><span class="language-css">;
            <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">;
            <span class="hljs-attribute">background</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">;
            <span class="hljs-attribute">max-width</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.measure}</span><span class="language-css">;
            <span class="hljs-attribute">margin-inline</span>: auto;
            <span class="hljs-attribute">padding</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">levels</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-comment">/* THE UPPER MARGIN STANDS EVERYWHERE, Doug, 2026-11-17: "No upper margin. That should be put back
               everywhere" — every page breathes above its first line. */</span>
            <span class="hljs-selector-class">.pd-book</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; <span class="hljs-attribute">counter-reset</span>: chapter equation; }
            <span class="hljs-selector-class">.pd-chapter</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; <span class="hljs-attribute">scroll-margin-block-start</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-page</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">margin-block-start</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>); }
            <span class="hljs-comment">/* NO LINE BREAKS, Doug, 2026-11-16: "No line break", then "Still breaks EVERYWHERE!!!" — a section
               carries no rule and no extra padding anywhere in the library; margins alone separate. */</span>
            <span class="hljs-selector-class">.pd-section</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-paragraph</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-item</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>); }
            <span class="hljs-selector-class">.pa-list</span> <span class="hljs-selector-class">.pa-item</span> { <span class="hljs-attribute">list-style-position</span>: outside; <span class="hljs-attribute">margin-inline-start</span>: <span class="hljs-number">1.2em</span>; }
            <span class="hljs-selector-class">.pd-title</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">1.5</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">); <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">margin-block-end</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-heading</span> { <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">1.15</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">); <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-section</span> &gt; <span class="hljs-selector-class">.pd-heading</span> { <span class="hljs-attribute">margin-block-start</span>: <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-section</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pd-paragraph</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-class">.pa-parenthetical</span>)))<span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pd-figure</span>)) { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-line</span> { <span class="hljs-attribute">white-space</span>: pre-wrap; }
            <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">overflow-wrap</span>: break-word; }
            <span class="hljs-selector-class">.pd-canonical</span><span class="hljs-selector-class">.pd-chapter</span> { <span class="hljs-attribute">counter-increment</span>: chapter; }
            <span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">margin-block-end</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>); }
            <span class="hljs-selector-class">.pd-canonical</span><span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">'Chapter '</span> <span class="hljs-built_in">counter</span>(chapter); }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">labels</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-label</span>, <span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> {
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">font-weight</span>: normal;
                <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.15em</span>;
                <span class="hljs-attribute">text-transform</span>: uppercase;
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.6</span>;
            }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">links</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pa-reference</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; <span class="hljs-attribute">text-decoration-color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; <span class="hljs-attribute">text-underline-offset</span>: <span class="hljs-number">0.15em</span>; }
            <span class="hljs-selector-class">.pa-self-reference</span> { <span class="hljs-attribute">color</span>: inherit; <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pa-referent</span> { <span class="hljs-attribute">scroll-margin-block-start</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-content</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">apparatus</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-comment">/* THE HEADER IS ONE COMPACT BAND, Doug, 2026-11-16: "You need to organize the header in the theme. It
               takes up too much space and isn't used. Look how far down the title of the chapter is. Wait are you
               making every chapter like a cover?!?" — the running head a bordered line with no paragraph margin, the
               byline one small line beneath it, author and subject side by side, not a title block of rows. */</span>
            <span class="hljs-selector-class">.pd-running-head</span> {
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.08em</span>;
                <span class="hljs-attribute">text-transform</span>: uppercase;
                <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span> <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>);
                <span class="hljs-attribute">padding-block-end</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>);
                <span class="hljs-attribute">border-block-end</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">30%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">);
            }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">text-decoration</span>: none; <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">70%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">; }
            <span class="hljs-comment">/* ONE HEADER, EVERY PAGE, ITS TABLE-NESS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of
               contents doesn't have the little square. Why isn't it the same thing as the others? Table of contents
               can be an attribute to capture polymorphism." — the same running head stands on every page, the square
               to the cover everywhere, the table's page included; only the title's destination flips, keyed here
               alone on the open table and the title's own data-to attribute. */</span>
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-square</span> { <span class="hljs-attribute">margin-inline-start</span>: <span class="hljs-number">0.6em</span>; }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"cover"</span>]</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-table-of-contents</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"table"</span>]</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-table-of-contents</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"cover"</span>]</span> { <span class="hljs-attribute">display</span>: inline; }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">figures</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-figure</span> { <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>; }
            <span class="hljs-selector-class">.pd-code</span> {
                <span class="hljs-attribute">font-family</span>: ui-monospace, monospace;
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.85</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.5</span>;
                <span class="hljs-attribute">white-space</span>: pre;
                <span class="hljs-attribute">overflow-x</span>: auto;
                <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
                <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.75</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
                <span class="hljs-attribute">border-inline-start</span>: <span class="hljs-number">2px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">25%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">);
            }
            <span class="hljs-selector-class">.pd-code-line</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(data-line); <span class="hljs-attribute">display</span>: inline-block; <span class="hljs-attribute">width</span>: <span class="hljs-number">3ch</span>; <span class="hljs-attribute">margin-inline-end</span>: <span class="hljs-number">1.5ch</span>; <span class="hljs-attribute">text-align</span>: end; <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.4</span>; <span class="hljs-attribute">user-select</span>: none; }
            <span class="hljs-selector-class">.pd-image</span> <span class="hljs-selector-tag">img</span>, <span class="hljs-selector-class">.pd-svg</span> <span class="hljs-selector-tag">svg</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">height</span>: auto; <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-document</span> <span class="hljs-selector-tag">object</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">aspect-ratio</span>: <span class="hljs-number">1</span> / <span class="hljs-number">1.4142</span>; <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-math</span>, <span class="hljs-selector-class">.pd-date</span> { <span class="hljs-attribute">white-space</span>: nowrap; }
            <span class="hljs-selector-class">.pd-equation</span> { <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">counter-increment</span>: equation; }
            <span class="hljs-selector-class">.pd-equation</span><span class="hljs-selector-pseudo">::after</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">'('</span> <span class="hljs-built_in">counter</span>(equation) <span class="hljs-string">')'</span>; <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset-inline-end</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>; <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-<span class="hljs-number">50%</span>); }
        \`</span>;
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">LibraryTheme</span> = $($LibraryTheme);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-running-head-and-the-byline" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Running Head and the Byline</div></a><div class="pd-section"><a href="#what-a-cover-exposes" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="what-a-cover-exposes" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">What a cover exposes</div></a><div class="pd-paragraph">The running head is the book's title alone, the minimal heading in the page's top margin, ruled 16 November 2026: pressed, it opens the table of contents — except on the table itself, where it opens the cover. The byline — who wrote the book, what it is about when the book is a subject's own, and its subject — is no longer drawn above the chapters; it lives on the front and in the table of contents. Both are read from the cover and nowhere else; neither is written in a chapter. A subject is a book made one by its About, so the four books whose subject is Mathematics resolve to the book that is about it. The file beside this chapter is both faces, borrowed from the test library.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $ } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Paragraph, $Word, <span class="hljs-title class_">Reference</span> <span class="hljs-keyword">as</span> reference, <span class="hljs-title class_">Word</span> <span class="hljs-keyword">as</span> word } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$RunningHead</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-running-head'</span>);
    }

    <span class="hljs-comment">// THE MINIMAL HEADING, Doug, 2026-11-16: "a minimal heading, at least with the book title and if you click it</span>
    <span class="hljs-comment">// it should go to the table of contents except the version on the table and that one takes you to the cover" —</span>
    <span class="hljs-comment">// just the book's title, both destinations bound, the theme showing the one the open page calls for.</span>
    <span class="hljs-comment">// THE TABLE-NESS IS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of contents doesn't have the</span>
    <span class="hljs-comment">// little square. Why isn't it the same thing as the others? Table of contents can be an attribute to capture</span>
    <span class="hljs-comment">// polymorphism." — one running head on every page: the title written twice, its destination carried by its</span>
    <span class="hljs-comment">// own data-to attribute and chosen by the theme in one place; the square to the cover always, the table's</span>
    <span class="hljs-comment">// page like any other.</span>
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-book-title"</span> <span class="hljs-attr">data-to</span>=<span class="hljs-string">"table"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.title?.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-book-title"</span> <span class="hljs-attr">data-to</span>=<span class="hljs-string">"cover"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.title?.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-square"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        ☐
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Label</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-label'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Byline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-byline'</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Label</span> = $(label);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Label</span>&gt;</span>Author<span class="hljs-tag">&lt;/<span class="hljs-name">Label</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.author?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.author?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                {book.about === undefined ? null : <span class="hljs-tag">&lt;&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Label</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">Label</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.about.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.about.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/&gt;</span></span>}
                &lt;<span class="hljs-title class_">Label</span>&gt;<span class="hljs-title class_">Subject</span>&lt;/<span class="hljs-title class_">Label</span>&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.subject?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.subject?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span></span>
            &lt;/&gt;
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">RunningHead</span> = $($RunningHead);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Label</span> = $($Label);
<span class="hljs-keyword">const</span> label = <span class="hljs-title class_">Label</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Byline</span> = $($Byline);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-open pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-faces" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Faces</div></a><div class="pd-section"><a href="#a-cover-a-synopsis-a-table" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="a-cover-a-synopsis-a-table" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">A cover, a synopsis, a table</div></a><div class="pd-paragraph">A face is how a book's apparatus looks: the cover a book opens on, the synopsis beside it, the table of contents that answers for its chapters and, when the book is a subject, for the books whose subject it is. Each is a word of the package dressed here, and every book of this library wears these four from the file beside this chapter, borrowed from the test library until a sketch replaces them.</div></div><div class="pd-section"><a href="#the-front" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-front" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The front</div></a><div class="pd-paragraph">Since 10 November 2026 the cover is drawn as a book: the front, in the file beside this chapter, a board of a book's shape standing alone on the page while the cover is the open page, as tall as the screen allows since 17 November 2026, its type growing with it, with the title, the author, the tagline and the imprint on it, read from what the cover already says, as the byline is; the tagline is one line of what the book is, said of the cover as its author is, and the synopsis's first paragraph stood in its place until 12 November 2026, when I struck it, "an extensive block is a synopsis", the synopsis being its own page, reached from the table; its words are its links, the title opening the table of contents, the author and the subject their books, the library's name the library, and the running head, the byline and the cover's own title stand unseen behind it until another page opens. The theme draws it and gives a page that opens its one transition, a short fade. Sketch 004 of <a href="/inexplicable-phenomena/mathematical-design/#the-papers-page" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Paper's Page</span></a>, form a, by my number.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $, $check, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Annotation, $Chapter, $Cover, $Format, $Paragraph, $Synopsis, $Table, $TableOfContents, $Word, $Writing, <span class="hljs-title class_">AnnotationSpecification</span>, <span class="hljs-title class_">Means</span> <span class="hljs-keyword">as</span> means, <span class="hljs-title class_">Next</span> <span class="hljs-keyword">as</span> nextWord, <span class="hljs-title class_">Previous</span> <span class="hljs-keyword">as</span> previousWord, <span class="hljs-title class_">Reference</span> <span class="hljs-keyword">as</span> reference, <span class="hljs-title class_">Word</span> <span class="hljs-keyword">as</span> word, html, specify } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// A TAGLINE IS ONE LINE OF WHAT THE BOOK IS, said of a cover as its author and its subject are, written in the cover</span>
<span class="hljs-comment">// file and drawn on the front; the synopsis is the block, and has its own page. Doug, 2026-11-12, Sprint 127: "You</span>
<span class="hljs-comment">// can add a one line note about what the book is. That would be a tagline, but an extensive block is a synopsis".</span>
<span class="hljs-comment">// PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Tagline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Annotation</span> {
    specification = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TaglineSpecification</span>();
    <span class="hljs-keyword">get</span> <span class="hljs-title function_">line</span>(): <span class="hljs-built_in">string</span> { <span class="hljs-keyword">return</span> html.<span class="hljs-title function_">copy</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>); }
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> { <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">line</span>; }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">TaglineSpecification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AnnotationSpecification</span> {
    <span class="hljs-meta">@specify</span>(<span class="hljs-string">'a tagline is said of a cover'</span>)
    $saidOfACover(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        $check(writing <span class="hljs-keyword">instanceof</span> $Chapter &amp;&amp; writing.<span class="hljs-title function_">is</span>($Cover), <span class="hljs-string">'a tagline is said of a cover, and this is not one'</span>);
    }
}

<span class="hljs-comment">// THE FRONT IS THE BOOK'S COVER DRAWN AS A BOOK: the title, the author, the tagline and the imprint on a board of a</span>
<span class="hljs-comment">// book's shape, standing alone on the page while the cover is open; its words are its links, the title to the table</span>
<span class="hljs-comment">// of contents, the author and the subject to their books, the library's name to the library. Drawn from what the</span>
<span class="hljs-comment">// cover already says, as the byline is. The synopsis's first paragraph stood on the board until 2026-11-12,</span>
<span class="hljs-comment">// Sprint 127, Doug: "get rid of the big wad of text on the cover... those notes are the synopsis, and they aren't</span>
<span class="hljs-comment">// bad, but then use the synopsis page"; the synopsis is its own chapter, reached from the table, and the tagline</span>
<span class="hljs-comment">// took its place on the board the same day. Sprint 125, Doug, 2026-11-10: "Give the cover the feel of a book... it</span>
<span class="hljs-comment">// should have the author and subject on the cover and not have the header", and on the first build, "various things</span>
<span class="hljs-comment">// should be clickable on the cover - author, subject and getting to the table", and "I don't like this 'Filed under'</span>
<span class="hljs-comment">// because that isn't about a subject", so the imprint names the subject plainly. Sketch 004 of the design book,</span>
<span class="hljs-comment">// form a. PROXY names: Front and its four words.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontName</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-name'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontAuthor</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-author'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontTagline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-tagline'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontImprint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-imprint'</span>); }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Front</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front'</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Name</span> = $(frontName);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Author</span> = $(frontAuthor);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Tagline</span> = $(frontTagline);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Imprint</span> = $(frontImprint);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Means</span> = $(means);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">const</span> tagline = book.<span class="hljs-property">cover</span>?.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">expressed</span>($Tagline);
        <span class="hljs-comment">// THE TABLE'S ADDRESS IS ITS TITLE'S, as the running head reads it: a chapter's means is the means its title</span>
        <span class="hljs-comment">// carries, and the table chapter itself carries none.</span>
        <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Name</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.title?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Name</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Author</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.author?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.author?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Author</span>&gt;</span>
                {tagline === undefined ? null : <span class="hljs-tag">&lt;<span class="hljs-name">Tagline</span>&gt;</span>{tagline.line}<span class="hljs-tag">&lt;/<span class="hljs-name">Tagline</span>&gt;</span>}
                <span class="hljs-tag">&lt;<span class="hljs-name">Imprint</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.subject?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.subject?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Imprint</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Imprint</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Means</span>&gt;</span>$[[ Inexplicable Phenomena ]]<span class="hljs-tag">&lt;/<span class="hljs-name">Means</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">Imprint</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }
}

<span class="hljs-comment">// THE NAVIGATION, Doug, 2026-11-16: "You need next and table of contents and previous on the top and bottom of</span>
<span class="hljs-comment">// every chapter in the library. We need to be able to move easily." One line of apparatus in the running head's</span>
<span class="hljs-comment">// register: the previous chapter's title on the left, Contents in the middle on the table's address, the next</span>
<span class="hljs-comment">// chapter's title on the right; an edge with no neighbour keeps its place empty so the line holds. Written into</span>
<span class="hljs-comment">// a chapter for now; the seam that puts it on every chapter of the library awaits his word on the layer.</span>
<span class="hljs-comment">// PROXY name. Styled by the theme as pd-navigation.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Navigation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-navigation'</span>);
    }

    <span class="hljs-comment">// THE WORDS ARE MADE AT THE BOND, not in write(): Previous and Next take their references in their own bond,</span>
    <span class="hljs-comment">// and the bond reaches only the authored tree, so a word made at render stood on the page as plain text, seen</span>
    <span class="hljs-comment">// on the bound textbook page on 2026-11-16, Contents the only link of the three. At an edge the package</span>
    <span class="hljs-comment">// answers the chapter itself, never nothing, and Next means it as a Self; the theme keeps that edge's place</span>
    <span class="hljs-comment">// and hides it.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Bound(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> chapter = <span class="hljs-variable language_">this</span>.<span class="hljs-property">chapter</span>;
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (chapter !== <span class="hljs-literal">undefined</span> &amp;&amp; book !== <span class="hljs-literal">undefined</span> &amp;&amp; [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>].<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Previous</span> = $(previousWord);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Next</span> = $(nextWord);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
            <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
            <span class="hljs-comment">// THREE CHARACTERS IN A ROW, Doug, 2026-11-16, after the buttons were refused: "Not a button!! I</span>
            <span class="hljs-comment">// wanted in three characters a left triangle (not arrow) and then a square in the middle that goes</span>
            <span class="hljs-comment">// to table, then the right arrow as a triangle. Three characters in a row like the arrow we use in</span>
            <span class="hljs-comment">// catalogues to go straight to a book", and on sight: "ALL WHITE OUTLINE characters!! Just three</span>
            <span class="hljs-comment">// characters. left triangle square (not filled in!!!) right arrow. Grey it but don't hide it. Don't</span>
            <span class="hljs-comment">// make it take up the whole line" — ◁ □ ▷, outline glyphs, solid grey, a cluster of their own width.</span>
            <span class="hljs-comment">// LSR, Doug, 2026-11-16: "Three characters. Up against each other. Spaced like in text. Same height.</span>
            <span class="hljs-comment">// White with outline. Two triangles and a square. The ones we use in cataloguing pages and we used to</span>
            <span class="hljs-comment">// use in my library for a canonical reference." — and, on the plain square inking 8px against the</span>
            <span class="hljs-comment">// triangles' 13, "Not the same size!!", and on the rounded ▢, "It has rounded edges. Pretty sure</span>
            <span class="hljs-comment">// there is a character. But all three have to match": measured in Chrome, ☐ inks 12×13 at ascent 12</span>
            <span class="hljs-comment">// with sharp corners — the triangles' own metrics — so the trio is ◁ ☐ ▷, typed tight at text size;</span>
            <span class="hljs-comment">// no edge is ever hidden.</span>
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Previous</span>&gt;</span>◁<span class="hljs-tag">&lt;/<span class="hljs-name">Previous</span>&gt;</span></span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    ☐
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span></span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Next</span>&gt;</span>▷<span class="hljs-tag">&lt;/<span class="hljs-name">Next</span>&gt;</span></span>
            );
        }
        <span class="hljs-variable language_">super</span>.$Bound();
    }
}

<span class="hljs-comment">// NAVIGATED, said of a chapter by its book, the seam of 2026-11-16: a format whose layer wraps the chapter's</span>
<span class="hljs-comment">// element with the navigation above it and below it. The two lines are the format's own text, so the chapter's</span>
<span class="hljs-comment">// bond reaches them and their words take their links; the layer draws those two instances and makes nothing at</span>
<span class="hljs-comment">// render. A format's layer stands outside the chapter's element, which Paginated hides by a class on the element</span>
<span class="hljs-comment">// itself, so the layer hides itself whenever its page is not the open one. The book says it of every chapter but</span>
<span class="hljs-comment">// the cover, whose page is the front, and leaves alone a chapter that already says Navigation in its own text.</span>
<span class="hljs-comment">// PROXY name; reads "this chapter is Navigated".</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Navigated</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Format</span> {
    specification = <span class="hljs-keyword">new</span> <span class="hljs-title class_">NavigatedSpecification</span>();
    <span class="hljs-keyword">protected</span> <span class="hljs-attr">_layer</span>?: <span class="hljs-title class_">ElementType</span>;
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        &amp;:not(:has(.pa-page.pa-open)) { display: none; }
    \`</span>;

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigation</span> = $(navigation);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span></span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span></span>
        );
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">defines</span>(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        writing.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pa-navigated'</span>);
        writing.<span class="hljs-property">containers</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">layer</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">erase</span>(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        writing.<span class="hljs-property">containers</span>.<span class="hljs-title function_">revert</span>(<span class="hljs-variable language_">this</span>);
        writing.<span class="hljs-property">classes</span>.<span class="hljs-title function_">revert</span>(<span class="hljs-variable language_">this</span>);
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">get</span> <span class="hljs-title function_">layer</span>(): <span class="hljs-title class_">ElementType</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span> !== <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Style</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">style</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">ElementType</span>;
        <span class="hljs-keyword">const</span> [above, below] = [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>];
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Above</span> = $(above);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Below</span> = $(below);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span> = <span class="hljs-function">(<span class="hljs-params">{ className, children }: { className?: <span class="hljs-built_in">string</span>; children?: ReactNode }</span>) =&gt;</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Style</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span><span class="language-css">
                &lt;Above /&gt;
                {children}
                &lt;Below /&gt;
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">Style</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">NavigatedSpecification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AnnotationSpecification</span> {
    <span class="hljs-meta">@specify</span>(<span class="hljs-string">'navigated is said of a chapter'</span>)
    $saidOfAChapter(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        $check(writing <span class="hljs-keyword">instanceof</span> $Chapter, <span class="hljs-string">'navigated is said of a chapter, and this is not one'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryCover</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Cover</span> {
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">header</span><span class="hljs-string">\`
        .pd-chapter.pa-cover { margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> calc(2 * <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibrarySynopsis</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Synopsis</span> {
    style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTableOfContents</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$TableOfContents</span> {

    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">nav</span><span class="hljs-string">\`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>);
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Table</span> {
    <span class="hljs-keyword">override</span> style = <span class="hljs-title function_">selection</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">style</span>)<span class="hljs-string">\`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 3) calc(0.75 * <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>) calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 3) 0; border-block-start: 1px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 15%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 35%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 15%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Cover</span> = $($LibraryCover);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Synopsis</span> = $($LibrarySynopsis);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">TableOfContents</span> = $($LibraryTableOfContents);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Table</span> = $($LibraryTable);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontName</span> = $($FrontName);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontAuthor</span> = $($FrontAuthor);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontTagline</span> = $($FrontTagline);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontImprint</span> = $($FrontImprint);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Tagline</span> = $($Tagline);
<span class="hljs-keyword">const</span> frontName = <span class="hljs-title class_">FrontName</span>;
<span class="hljs-keyword">const</span> frontAuthor = <span class="hljs-title class_">FrontAuthor</span>;
<span class="hljs-keyword">const</span> frontTagline = <span class="hljs-title class_">FrontTagline</span>;
<span class="hljs-keyword">const</span> frontImprint = <span class="hljs-title class_">FrontImprint</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Front</span> = $($Front);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigation</span> = $($Navigation);
<span class="hljs-keyword">const</span> navigation = <span class="hljs-title class_">Navigation</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigated</span> = $($Navigated);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="developing-the-library" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">Developing the Library</div></a><div class="pd-section"><a href="#the-loop" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-loop" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The loop</div></a><div class="pd-paragraph">A save shows on an open page in under a second; a bind is the gate at the end of a piece of work and never the way to look during one. The workbench beside this chapter is the loop: it serves the library live from its sources, keeps one browser open on it, and answers a look with what it found and a photograph. Borrowed from the librarian's own library on 2026-10-30, its built address this library's.</div><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">node library/.reference/5-developing-the-library~workbench.mjs, once, left open</div><div class="pd-sentence pd-line pa-item">node library/.reference/5-developing-the-library~workbench.mjs look the-team</div><div class="pd-sentence pd-line pa-item">the same with built for the site the last bind made, phone for a phone's width, close at the end</div></div></div></div><div class="pd-section"><a href="#the-bind-and-the-site" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-bind-and-the-site" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The bind and the site</div></a><div class="pd-paragraph">In the binding beside the site, npm run bind binds every book and leaves the site under the base the configuration names, and npm run preview with its port serves what the bind left. The site is committed as it is bound, and what is published is what was committed.</div><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">cd library/.public/.binding</div><div class="pd-sentence pd-line pa-item">npm run bind</div><div class="pd-sentence pd-line pa-item">npm run preview -- --port 4343 --strictPort</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-paper" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Paper</div></a><div class="pd-section"><a href="#a-papers-page" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="a-papers-page" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">A paper's page</div></a><div class="pd-paragraph">A paper is a citable publication held in the library as a resource: the file itself beside a chapter of <a href="/inexplicable-phenomena/mathematical-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Library of Mathematics</span></a>, which carries the paper's citation and the notes its author writes on it, the paper signed by its own author. The page is minimal, on my word of 10 November 2026: a small picture of the publication at the top left with the text flowing under it, the citation, the notes, and a link that opens the publication in another tab; the picture itself opens it. The page's form is sketch 002 of the design book, form a.</div></div><div class="pd-section"><a href="#the-plate-and-the-opening" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-plate-and-the-opening" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The plate and the opening</div></a><div class="pd-paragraph">Two words in the file beside this chapter. A plate is the word that carries the picture, floated at the top left of the chapter by the theme; an opening is a reference that opens its address in another tab, a twin of the package's own reference with its anchor given a target. A chapter writes the plate first, before its title, as a word holding an opening whose text is the paper's literal and an image whose text is the picture's: the literals become the two files' addresses at the bind, so the picture is served beside the pages and the paper with it.</div></div><div class="pd-section"><a href="#the-picture" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-picture" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The picture</div></a><div class="pd-paragraph">The picture is the paper's first page, made once by the tool beside this chapter: Chrome's own viewer draws the PDF with its toolbar and panes asked off, served to it by the tool since the viewer draws nothing opened from the disk as a file, photographed at a page's shape and cut to the page. The tool takes a page number for a scan of a bound book, which opens on its boards: Lobachevsky's title page is its fifth leaf. It stands beside the paper's chapter as a picture, named by the plate's literal, and is made again only when the paper changes.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Reference, $Word } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// A PLATE IS THE SMALL PICTURE OF A PUBLICATION ON ITS PAGE, at the top left with the text flowing under it; the</span>
<span class="hljs-comment">// word carries the picture and the opening that takes a reader to the publication. Sprint 125, Doug, 2026-11-10:</span>
<span class="hljs-comment">// "a small picture of the publication... And then clicking it perhaps causes it to open in another tab". PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Plate</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-plate'</span>);
    }
}

<span class="hljs-comment">// AN OPENING IS A REFERENCE THAT OPENS ITS ADDRESS IN ANOTHER TAB, a twin of the package's Reference with the anchor</span>
<span class="hljs-comment">// given its target, in the library's own code and nowhere in the package. PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Opening</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Reference</span> {
    <span class="hljs-keyword">override</span> <span class="hljs-attr">anchor</span>: <span class="hljs-title class_">ElementType</span> = selection.<span class="hljs-property">a</span>.<span class="hljs-title function_">attrs</span>({ <span class="hljs-attr">className</span>: <span class="hljs-string">'pa-reference pa-opening'</span>, <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>, <span class="hljs-attr">rel</span>: <span class="hljs-string">'noopener'</span> })<span class="hljs-string">\`\`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Plate</span> = $($Plate);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Opening</span> = $($Opening);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-reference-manual" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Reference Manual</div></a><div class="pd-section"><a href="#1-what-a-reference-manual-is" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-what-a-reference-manual-is" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. What a reference manual is</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 Every subject carries a reference manual: the specification of that subject in this library. This book is the library's own. I ruled this on 12 November 2026, at the opening of the textbook's sprint.</div><div class="pd-sentence pd-line pa-item">1.2 A subject's manual keeps a part for the books of its subject, one chapter per book, and that chapter tracks the book's idioms — the conventions its chapters follow.</div><div class="pd-sentence pd-line pa-item">1.3 Where an idiom is enforced by code, the code stands with the chapter that states it, the way this book's theme and faces stand beside theirs; an idiom followed by hand is stated in the same place and marked so.</div><div class="pd-sentence pd-line pa-item">1.4 A manual is written the way a specification is — numbered parts, referenced code — in the form of <a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>; I asked for this on 16 November 2026, and this chapter is the first so written.</div></div></div></div><div class="pd-section"><a href="#2-the-three-shelves" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-three-shelves" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The three shelves</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 What is true of every book in the library lives here, in Our Reference.</div><div class="pd-sentence pd-line pa-item">2.2 What is true of a subject's books lives in that subject's manual. The first is <a href="/inexplicable-phenomena/mathematical-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Referential Objectivity</span></a>, whose part The Books tracks the notebook, the textbook, the project, the library and the design.</div><div class="pd-sentence pd-line pa-item">2.3 What is true of one book alone stays beside that book, never in a manual.</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-specification" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Specification</div></a><div class="pd-paragraph">The specification of a specification, written in its own form. I chose the form of a legal document on 16 November 2026, its anatomy the contract's — recitals, articles, clauses, defined terms, provisos, schedules — evolved for a library that specifies deliverables. The form is the library's; a subject may redress it to fit its style, as a theme redresses a page. Mathematics writes its own in <a href="/inexplicable-phenomena/mathematical-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>, and the first full instance is the statement of work of <a href="/inexplicable-phenomena/arithmetic-textbook/#the-symmetry-of-arithmetic" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Symmetry of Arithmetic</span></a>.</div><div class="pd-section"><a href="#1-purpose" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-purpose" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. Purpose</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 A specification is the formal identification of a deliverable — the thing agreed between buyer and seller in a service contract. It fixes what the deliverable must be, uniquely, so that candidates can be judged against it and the right one recognized when it is found. The specification is the legal document; the deliverable is not.</div><div class="pd-sentence pd-line pa-item">1.2 The specification is the anchor for the work. The work meets the specification part by part, and the deliverable cites each part as it is met.</div><div class="pd-sentence pd-line pa-item">1.3 A demand that cannot be checked has specified nothing, and a demand is stated so that it can fail.</div></div></div></div><div class="pd-section"><a href="#2-the-parts" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-parts" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The parts</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 The preamble — the contract's recitals. What the document is and the choice it records, standing before the numbered sections and carrying no number.</div><div class="pd-sentence pd-line pa-item">2.2 The sections — the contract's articles. Each bears a number and a name, and the sections run in one sequence.</div><div class="pd-sentence pd-line pa-item">2.3 The clauses. A section nests numbered parts: clause 2.3 is the third clause of section 2. A clause nests further where its matter requires it.</div><div class="pd-sentence pd-line pa-item">2.4 The labels — the contract's defined terms. A recurring kind of clause carries a letter and a number, defined where the clause is stated; in the first instance, the known results K, the constraints C, and the open determinations O.</div><div class="pd-sentence pd-line pa-item">2.5 The provisos. Where a demand is motivated, the motivation stands beside it and says so.</div><div class="pd-sentence pd-line pa-item">2.6 The tables. A table states what a table states best — axioms, results, tests — and its rows are clauses carrying their labels.</div></div></div></div><div class="pd-section"><a href="#3-citation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="3-citation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">3. Citation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">3.1 The specification references itself. Any clause cites any other by its number or its label, in free-form citation language, and every citation is a link to the clause it names.</div><div class="pd-sentence pd-line pa-item">3.2 A specification is highly connected: where a clause depends on another, motivates it, or constrains it, it says so by citation.</div><div class="pd-sentence pd-line pa-item">3.3 Citation reaches across the project's documents: the specification cites the progress by its labels, and the progress cites the specification by its numbers.</div></div></div></div><div class="pd-section"><a href="#4-boundary" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="4-boundary" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">4. Boundary</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">4.1 The specification states where it ends. Nothing outside the boundary binds the work.</div><div class="pd-sentence pd-line pa-item">4.2 What stands after the end is the schedules — the contract's annexes: reference bearing on the work and binding none of it.</div></div></div></div><div class="pd-section"><a href="#5-interpolation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="5-interpolation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">5. Interpolation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">5.1 What is specified and not yet found stands as a placeholder for itself, in a brace naming the open determination it waits on.</div><div class="pd-sentence pd-line pa-item">5.2 The work closes when the last placeholder is replaced by the thing it stands for.</div></div></div></div><div class="pd-section"><a href="#6-permanence" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="6-permanence" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">6. Permanence</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">6.1 A specification is not thrown away. It is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing.</div><div class="pd-sentence pd-line pa-item">6.2 A change is made by changing the specification, in the context of all its other parts.</div></div></div></div><div class="pd-section"><a href="#7-the-implementation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="7-the-implementation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">7. The implementation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">7.1 The implementation meets the specification part by part, and cites each part as it is met, by its number or its label.</div><div class="pd-sentence pd-line pa-item">7.2 A citation from the implementation leads to the part it names, and the specification stands beside what implements it: the two forms are each reachable from the other.</div><div class="pd-sentence pd-line pa-item">7.3 A justification is the annotation form of this relationship: it says how the implementation satisfies a part, citing the part by number.</div></div></div></div><div class="pd-section"><a href="#8-format" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="8-format" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">8. Format</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">8.1 The format chosen here is the legal document, as this chapter is written: a preamble, then numbered, named sections of numbered clauses.</div><div class="pd-sentence pd-line pa-item">8.2 A subject may change the format to fit its style. The form of sections 1 to 7 — purpose, parts, citation, boundary, interpolation, permanence, implementation — is kept; the dress is the subject's.</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span class="pd-word pd-next pa-reference pa-self-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-content" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Content</div></a><div class="pd-paragraph">A thing with a front and a back, lifted to the library level on 17 November 2026 because content with a project will stand in a lot of places. On the front the deliverable — the result of the effort, looking like what it is. On the back the project — the formal representation of the work, whose specification takes the form of <a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>. The first case and the mathematics specialization stand in <a href="/inexplicable-phenomena/mathematical-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Content</span></a>.</div><div class="pd-section"><a href="#1-the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-the-content" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. The content</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 A piece of content is the content of its chapter, starting below the title, like a section; it has a front and a back, and shows one side at a time.</div><div class="pd-sentence pd-line pa-item">1.2 The front is the deliverable; the back is the project. One unlabelled control at the title's right flips them, explored rather than read.</div><div class="pd-sentence pd-line pa-item">1.3 It opens on the deliverable; the canonical side is overridable.</div><div class="pd-sentence pd-line pa-item">1.4 On the back the title turns into the literal — # Title in the source face, flush with the column — and that is the back's whole signal.</div></div></div></div><div class="pd-section"><a href="#2-the-project" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-project" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The project</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 The specification and the progress are the project's named parts, sections naming themselves; nothing is mandatory, and the parts stand open and whole — nothing collapses.</div><div class="pd-sentence pd-line pa-item">2.2 The project's documents render verbatim through the markdown of the package, the specification in the source pane's register — the editor's face at the measured same-space settings, equations typeset into native MathML at bind time.</div><div class="pd-sentence pd-line pa-item">2.3 The documents are highly connected: the renderer speaks the specification's own citation language, every mention a link to its definition across the documents, and a citation click turns the page itself, never the address.</div><div class="pd-sentence pd-line pa-item">2.4 The implementation cites the specification by number or label, and the citation flips the content to the part it names — the relationship between the two forms.</div><div class="pd-sentence pd-line pa-item">2.5 What is specified and not yet found stands interpolated, a word for the thing until the thing is found.</div></div></div></div><div class="pd-section"><a href="#3-the-motion" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="3-the-motion" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">3. The motion</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">3.1 The flip is a permutation that preserves identity: one axis turns, writing to code; boxes, weights, gaps, palette and structure ride through unchanged, measured by rectangle.</div><div class="pd-sentence pd-line pa-item">3.2 The transition is the plain text version of one: the chapter settles from dimmed ink, and the title's discrete changes — font, place, mark — happen together at the dip's hidden trough, dimmed by color so the chapter's label changes with nothing.</div></div></div></div><div class="pd-section"><a href="#4-the-components" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="4-the-components" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">4. The components</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">4.1 Content, the format whose note is the toggle and whose style rules the sides. Project, the back's section; Specification and Progress, its named parts.</div><div class="pd-sentence pd-line pa-item">4.2 Markdown, the document rendered verbatim and connected. Cite, the implementation's citation. Interpolated, the placeholder.</div><div class="pd-sentence pd-line pa-item">4.3 A subject specializes the deliverable's dress — mathematics adds Theorem and Proof beside its own manual chapter — and re-exports the family so its books keep one door.</div></div></div></div><div class="pd-section"><a href="#5-the-open-ends" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="5-the-open-ends" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">5. The open ends</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">5.1 The names: Content collides with the package's word for a Word's content, and Specification with a package utility; both flagged, his to settle, likeliest when the family moves all the way into the package.</div><div class="pd-sentence pd-line pa-item">5.2 A subclass cannot yet extend a format's style, so a subject's dress rides inert in the lifted style until the framework grows the composition seam; named, not hacked around.</div><div class="pd-sentence pd-line pa-item">5.3 The justifications associate with the progress; the exact tie stands open.</div></div></div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MouseEvent</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> katex <span class="hljs-keyword">from</span> <span class="hljs-string">'katex'</span>;
<span class="hljs-keyword">import</span> { marked } <span class="hljs-keyword">from</span> <span class="hljs-string">'marked'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Append, $Format, $Paragraph, $Section, $Word, html } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15 and respecified from his answers of</span>
<span class="hljs-comment">// 2026-11-16: the content of a chapter, starting below the title, like a section. On the front the DELIVERABLE —</span>
<span class="hljs-comment">// the object, the result of the effort of the team, looking like what it is, a familiar chapter. On the back</span>
<span class="hljs-comment">// the PROJECT — the formal representation of the work: the statement of work, the progress, a plan, a</span>
<span class="hljs-comment">// discussion — the talk page behind a wikipedia article, and nothing is mandatory. The project side carries</span>
<span class="hljs-comment">// the formal visual language. The name Content is a PROXY until he keeps it. The content is a format said of</span>
<span class="hljs-comment">// its chapter: its note draws the one unlabelled toggle in place, and its style wraps the chapter, so the</span>
<span class="hljs-comment">// checked control rules what shows — everything that is not the project is the deliverable.</span>
<span class="hljs-comment">// LIFTED TO THE LIBRARY LEVEL, Doug, 2026-11-17: "Make sure this is in components that can be reused and at</span>
<span class="hljs-comment">// the right level reference manual. We will need this everywhere there is content with a project, which will</span>
<span class="hljs-comment">// be in a lot of places" — the general family lives here in Our Reference; a subject specializes the</span>
<span class="hljs-comment">// deliverable's dress, as mathematics does with Theorem and Proof beside its own manual chapter. One flagged</span>
<span class="hljs-comment">// wart rides with the lift: the theorem and proof rules stay in this style, inert until a subject's classes</span>
<span class="hljs-comment">// activate them, because a subclass cannot yet extend a format's style — the composition seam is an open</span>
<span class="hljs-comment">// question for the framework, named rather than hacked around.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Content</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Format</span> {
    $canonical = <span class="hljs-string">'deliverable'</span>;

    <span class="hljs-comment">// THE DISSOLVE, Doug, 2026-11-17: "I still don't like the transition... It feels too slow. The flicker is</span>
    <span class="hljs-comment">// bad", "You must know what a good and a bad transition is", "It should be faster, less perceptible and</span>
    <span class="hljs-comment">// if there is a white flash, it is perceptible." The flipbook frames convicted the dip: an omitted</span>
    <span class="hljs-comment">// keyframe property interpolates to its base rather than stepping, so the out direction glided 28px over</span>
    <span class="hljs-comment">// six frames with the font swapping mid-slide and the label lurching when margin and padding fell out of</span>
    <span class="hljs-comment">// step — and the trough itself was the white flash, a title-shaped gap of paper. The good transition is</span>
    <span class="hljs-comment">// the platform's own cross-dissolve: the flip runs inside startViewTransition, the old frame never</span>
    <span class="hljs-comment">// leaving before the new covers it — no absence, no motion, one dissolve of the whole page at 140ms.</span>
    <span class="hljs-comment">// Every hand-rolled keyframe is retired; the states swap instantly inside the update and the browser</span>
    <span class="hljs-comment">// carries the blend. The duration rules ride a plain style tag because view-transition pseudos live at</span>
    <span class="hljs-comment">// the document root, beyond a scoped sheet's reach; reduced motion collapses the dissolve to the swap.</span>
    flip = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLLabelElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        press.<span class="hljs-title function_">preventDefault</span>();
        <span class="hljs-keyword">const</span> box = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'pc-flip'</span>);
        <span class="hljs-keyword">if</span> (!(box <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLInputElement</span>)) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">const</span> turn = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> { box.<span class="hljs-property">checked</span> = !box.<span class="hljs-property">checked</span>; };
        <span class="hljs-keyword">const</span> doc = <span class="hljs-variable language_">document</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Document</span> &amp; { <span class="hljs-attr">startViewTransition</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">update</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">unknown</span> };
        <span class="hljs-keyword">if</span> (doc.<span class="hljs-property">startViewTransition</span> === <span class="hljs-literal">undefined</span>) <span class="hljs-title function_">turn</span>();
        <span class="hljs-keyword">else</span> doc.<span class="hljs-title function_">startViewTransition</span>(turn);
    };

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">note</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="language-css">{'::<span class="hljs-built_in">view-transition-old</span>(root), ::<span class="hljs-built_in">view-transition-new</span>(root) { <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">0.14s</span>; <span class="hljs-attribute">animation-timing-function</span>: ease; } <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">prefers-reduced-motion</span>: reduce) { ::<span class="hljs-built_in">view-transition-old</span>(root), ::<span class="hljs-built_in">view-transition-new</span>(root) { <span class="hljs-attribute">animation</span>: none <span class="hljs-meta">!important</span>; } }'}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pc-content"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.flip}</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                        <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>
                        <span class="hljs-attr">id</span>=<span class="hljs-string">"pc-flip"</span>
                        <span class="hljs-attr">defaultChecked</span>=<span class="hljs-string">{this.$canonical</span> === <span class="hljs-string">'project'</span>}
                    /&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pc-flip"</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }

    <span class="hljs-comment">// ONE UNLABELLED CONTROL TO THE RIGHT OF THE TITLE, Doug, 2026-11-16: "how about a toggle to the right of</span>
    <span class="hljs-comment">// the title and it has no label. One can just explore" — and the back announces itself in the literal:</span>
    <span class="hljs-comment">// the title turns into # Title while the project side shows; the [Project] tag of the same day is struck.</span>
    <span class="hljs-comment">// THE FLIP SETTLES, Doug, 2026-11-16: "that has being aligned will cause a jump and it is the jump of</span>
    <span class="hljs-comment">// coming out of the matrix. Is there a slight transition... It would have to be very subtle because this</span>
    <span class="hljs-comment">// is a text-oriented site" — the frame holds still and the chapter's content alone eases from dimmed ink</span>
    <span class="hljs-comment">// to full, a print developing; nothing moves, since movement would break the sameness. Two identical</span>
    <span class="hljs-comment">// keyframes under two names so each direction restarts the settle; reduced motion is honored.</span>
    <span class="hljs-comment">// THE SOURCE PANE IS A WHITE VSCODE, his rulings of 2026-11-16: "a white vscode theme that feels natural.</span>
    <span class="hljs-comment">// Takes up the same space as the other side", then "sameness in layout — the same title in same place,</span>
    <span class="hljs-comment">// gets a # and changes font", then "choose a monospace that doesn't feel too hard". The elegance answer:</span>
    <span class="hljs-comment">// VS Code's own Windows default is Consolas, not the terminal's rounder, heavier Cascadia — so Consolas</span>
    <span class="hljs-comment">// leads the stack, at the same-space setting the sweep measured (the same passage at the column's 640px:</span>
    <span class="hljs-comment">// Georgia 17px on 27.2px stands 272px; Consolas 14.5px on 22.5px stands 270px), .85 of the book's size on</span>
    <span class="hljs-comment">// a 1.55 line. SAMENESS IN LAYOUT: the Chapter label's ::before is untouched and pinned to the book's</span>
    <span class="hljs-comment">// face and ink, so the title's box is identical on both sides; the # sits flush at the column's left</span>
    <span class="hljs-comment">// edge — his correction of the gutter: "the # has to be left aligned with everything else and the</span>
    <span class="hljs-comment">// transition was: Title to # Title" — the text easing right by the mark's exact width (Consolas advance</span>
    <span class="hljs-comment">// .55em, two characters of the title's 1.5 size = 1.65 * size), the Chapter label held still by an equal</span>
    <span class="hljs-comment">// negative margin animated on the same curve. The motion is his "canonical experience of moving from</span>
    <span class="hljs-comment">// literal to symbol. From object to its representation", pulled back on his "this is plain text. It</span>
    <span class="hljs-comment">// needs to be the plain text version of a transition": one clock, one curve, the staged delay of the</span>
    <span class="hljs-comment">// first cut retired as theater. THE GLIDE RETIRED, Doug, 2026-11-17: "There's a sort of jank when going</span>
    <span class="hljs-comment">// to specification mode" — photographed frame by frame, the title had already turned to Consolas and the</span>
    <span class="hljs-comment">// body to the specification at the first frame, and the title then slid right for 160ms after the fact;</span>
    <span class="hljs-comment">// a swap that lands at once and then moves is two events, and the second reads as the first stuttering.</span>
    <span class="hljs-comment">// Plain text has no tween: the title takes its code form and its place in the same frame, the mark with</span>
    <span class="hljs-comment">// it, and the settle alone is the transition — the whole chapter, title included, developing from dimmed</span>
    <span class="hljs-comment">// ink to full. THE DIP, Doug, the same night: "The appearance of the symbol and change in font is weird.</span>
    <span class="hljs-comment">// It feels off... Font and position can happen concurrently unless it's janky" — the one-frame swap was</span>
    <span class="hljs-comment">// still watchable, so it moves to where it cannot be watched: the title dims over 120ms, and at the</span>
    <span class="hljs-comment">// trough the font, the place, the label's hold and the mark all change together in one hidden instant —</span>
    <span class="hljs-comment">// concurrent, as he allows — then it rises as code over 120ms. The discrete steps live inside the</span>
    <span class="hljs-comment">// keyframes at 49.9/50.1 so nothing ever changes while visible; the glide stays retired. The dip dims by</span>
    <span class="hljs-comment">// COLOR, not opacity — his "You have chapter1 disappearing. Why?" — because element opacity sinks the</span>
    <span class="hljs-comment">// ::before label with the text; the text alone fades to transparent, the label's ink pinned on both</span>
    <span class="hljs-comment">// states, the # on its own clock. The frame never flickers, and the label changes with nothing.</span>
    <span class="hljs-comment">// The section headings keep the serif heading's box — 1.15 of the size, the section's margin. The palette</span>
    <span class="hljs-comment">// came from an eight-variant matrix photographed beside the serif reference, on his "Play around. Be</span>
    <span class="hljs-comment">// creative. Get it to match... Don't have the markdown be LOUD!!": the quiet winner keeps title, headings,</span>
    <span class="hljs-comment">// leads and body in the book's own ink at regular weight, and colors only the # and ## marks in the</span>
    <span class="hljs-comment">// theme's link — the color the citations already wear on both sides. His harmony rule finished it: the</span>
    <span class="hljs-comment">// italics too stay in the ink, italic their only voice; the one foreign magenta went with the blues.</span>
    <span class="hljs-comment">// THE PERMUTATION TEST, his anchor of 2026-11-16: "the same theme flipped over some axis of code to</span>
    <span class="hljs-comment">// writing, but occupying the same space and having the same feel... the feel of the permutation while</span>
    <span class="hljs-comment">// preserving identity." Measured type by type: weight is identity, so the title and the section headings</span>
    <span class="hljs-comment">// stay bold through the flip; and the tables shed the rendered-markdown cards for the front's own dress —</span>
    <span class="hljs-comment">// the browser read the book's table as an open grid, no borders, no backgrounds, header row regular —</span>
    <span class="hljs-comment">// which also obeys his oldest law of the night, no lines anywhere. Columns separate by air, rows by their</span>
    <span class="hljs-comment">// leading; the cards' ruling of the earlier evening is superseded by the test.</span>
    <span class="hljs-comment">// One palette across the two faces; the markdown-ness is the face and the marks. THE TRANSITION'S</span>
    <span class="hljs-comment">// STRETCH, measured on his "Still a stretchiness to the transition": the title's width was innocent</span>
    <span class="hljs-comment">// (Georgia bold 372px, Consolas regular 364px); the elastic was vertical — the spec's paragraph gaps ran</span>
    <span class="hljs-comment">// 13px against the serif's 20px and the opening text dropped 41px below the label — so the spec's</span>
    <span class="hljs-comment">// paragraphs take the theme's own space and the first tucks to a quarter-space under SPECIFICATION.</span>
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        counter-reset: theorem;
        .pd-chapter { position: relative; }
        .pc-content { position: absolute; inset-block-start: 2.1rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; box-sizing: border-box; inline-size: 0.9em; block-size: 0.9em; border: 1.5px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 65%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); background: <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>; transition: border-width .15s ease, border-color .15s ease; }
        .pc-content:hover .pc-flip { border-color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pc-content:has(input:checked) .pc-flip { border-width: 3px; }
        .pc-project { display: none; }
        &amp;:has(#pc-flip:checked) .pc-project { display: block; }
        &amp;:has(#pc-flip:checked) .pd-chapter &gt; .pd-paragraph:not(.pd-navigation) { display: none; }
        &amp;:has(#pc-flip:checked) .pd-chapter &gt; .pd-section:not(.pc-project) { display: none; }
        .pc-project .pd-heading { display: block; font-size: calc(.78 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 52%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); margin-block: 0 .5em; }
        .pc-specification .pc-markdown { font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; font-size: calc(.9 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: calc(1.412 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); margin-block-start: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pc-specification .pc-markdown h2 { font-family: inherit; font-size: calc(1.15 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> 0; font-weight: bold; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pc-specification .pc-markdown h2::before { content: '## '; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; }
        .pc-specification .pc-markdown h2:first-of-type { display: none; }
        .pc-specification .pc-markdown p { margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>; }
        .pc-specification .pc-markdown h2:first-of-type + p { margin-block-start: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pd-title { position: relative; }
        .pd-title::before { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pd-title::after { content: '# '; position: absolute; inset-inline-start: 0; inset-block-end: 0; opacity: 0; font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title { padding-inline-start: calc(1.65 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title::before { margin-inline-start: calc(-1.65 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-family: <span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span>; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title::after { opacity: 1; }
        .pd-section.pc-project { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 2) 0; }
        .pc-markdown h1 { display: none; }
        .pc-markdown h1 + p { display: none; }
        .pc-markdown h2 { font-family: <span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span>; font-size: calc(1.15 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-weight: bold; margin-block: 1.1em .35em; color: color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 76%, <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span> 24%); }
        .pc-markdown p { margin-block: .9em; }
        .pc-markdown strong { font-weight: bold; }
        .pc-markdown a { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; text-decoration: none; }
        .pc-markdown a:hover { text-decoration: underline; }
        .pc-cite a { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; text-decoration: none; cursor: pointer; }
        .pc-cite a:hover { text-decoration: underline; }
        .pc-markdown table { width: 100%; border-collapse: collapse; margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>; }
        .pc-markdown th, .pc-markdown td { padding: .3em 1.2em .3em 0; text-align: start; vertical-align: top; }
        .pc-markdown th:last-child, .pc-markdown td:last-child { padding-inline-end: 0; }
        .pc-markdown thead th { font-weight: 400; }
        .pc-markdown math { font-family: 'Cambria Math', 'STIX Two Math', math; font-size: 1.08em; }
        .pc-markdown .pc-math-block { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 2); }
        .pc-markdown ol, .pc-markdown ul { padding-inline-start: 1.5em; margin-block: .9em; }
        .pc-markdown li { margin-block: .35em; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
    \`</span>;
}

<span class="hljs-comment">// THE PROJECT IS THE BACK, Doug's answers, 2026-11-16: the specification is part of the project, an expression</span>
<span class="hljs-comment">// of a statement of work identifying the deliverable; the progress is a narrative of how the project has been</span>
<span class="hljs-comment">// going, its entries associated with an author; a plan may be expressed with teammates assigned, all to the</span>
<span class="hljs-comment">// author by default as read from the cover; a discussion may stand there. The parts beyond the specification</span>
<span class="hljs-comment">// are optional. One section of the chapter, the formal register.</span>
<span class="hljs-comment">// NOTHING COLLAPSES, Doug, 2026-11-16: "STOP MAKING THINGS COLLAPSE!!! VERBATIM!" — the project's parts stand</span>
<span class="hljs-comment">// open and whole, plain sections.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Project</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Section</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-project'</span>);
    }
}

<span class="hljs-comment">// THE PROJECT'S NAMED PARTS, Doug, 2026-11-16: "And then create the Specification?" — the specification and</span>
<span class="hljs-comment">// the progress are the project's parts, each a section naming itself in the formal dress. The specification</span>
<span class="hljs-comment">// dissolves its own first heading: its purpose reads as the introducing paragraph, not a second title.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Specification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Project</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-specification'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Progress</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Project</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-progress'</span>);
    }
}

<span class="hljs-comment">// THE SPECIFICATION REFERENCES ITSELF, Doug, 2026-11-16: "the spec should reference itself ... The</span>
<span class="hljs-comment">// specification should be highly connected" — and verbatim stays verbatim: the document already speaks a</span>
<span class="hljs-comment">// citation language — numbered sections, dotted parts, the labels K, C and O, bracketed references — so the</span>
<span class="hljs-comment">// renderer learns that language rather than the document changing. Definitions receive ids; every mention</span>
<span class="hljs-comment">// becomes a link to its definition, across the project's documents, since both render on one page.</span>
<span class="hljs-comment">// EQUATIONS IN SPECIFICATIONS, Doug, 2026-11-16: "we need latex in the specification either rendered or in</span>
<span class="hljs-comment">// latex equation form", then "We need to see equations in specifications" — rendered, in a comparable font.</span>
<span class="hljs-comment">// The extension tokenizes $...$ and $$...$$ before markdown's emphasis can eat the underscores inside them,</span>
<span class="hljs-comment">// and KaTeX typesets at bind time into MathML, which the browser renders natively in its math face — no</span>
<span class="hljs-comment">// stylesheet, no font files shipped. The katex dependency entered the package on his word, beside marked.</span>
<span class="hljs-keyword">const</span> typeset = (<span class="hljs-attr">passage</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">display</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span>
    katex.<span class="hljs-title function_">renderToString</span>(passage, { <span class="hljs-attr">output</span>: <span class="hljs-string">'mathml'</span>, <span class="hljs-attr">throwOnError</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">displayMode</span>: display });

marked.<span class="hljs-title function_">use</span>({
    <span class="hljs-attr">extensions</span>: [
        {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'mathBlock'</span>,
            <span class="hljs-attr">level</span>: <span class="hljs-string">'block'</span>,
            <span class="hljs-title function_">start</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) { <span class="hljs-keyword">const</span> at = src.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'$$'</span>); <span class="hljs-keyword">return</span> at &lt; <span class="hljs-number">0</span> ? <span class="hljs-literal">undefined</span> : at; },
            <span class="hljs-title function_">tokenizer</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) {
                <span class="hljs-keyword">const</span> match = <span class="hljs-regexp">/^\\$\\$([\\s\\S]+?)\\$\\$/</span>.<span class="hljs-title function_">exec</span>(src);
                <span class="hljs-keyword">if</span> (match !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">'mathBlock'</span>, <span class="hljs-attr">raw</span>: match[<span class="hljs-number">0</span>], <span class="hljs-attr">text</span>: match[<span class="hljs-number">1</span>] };
                <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
            },
            <span class="hljs-title function_">renderer</span>(<span class="hljs-params"><span class="hljs-attr">token</span>: { text: <span class="hljs-built_in">string</span> }</span>) { <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;div class="pc-math-block"&gt;<span class="hljs-subst">\${typeset(token.text, <span class="hljs-literal">true</span>)}</span>&lt;/div&gt;\`</span>; },
        },
        {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'mathInline'</span>,
            <span class="hljs-attr">level</span>: <span class="hljs-string">'inline'</span>,
            <span class="hljs-title function_">start</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) { <span class="hljs-keyword">const</span> at = src.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'$'</span>); <span class="hljs-keyword">return</span> at &lt; <span class="hljs-number">0</span> ? <span class="hljs-literal">undefined</span> : at; },
            <span class="hljs-title function_">tokenizer</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) {
                <span class="hljs-keyword">const</span> match = <span class="hljs-regexp">/^\\$(?=\\S)([^$\\n]*?\\S)\\$/</span>.<span class="hljs-title function_">exec</span>(src);
                <span class="hljs-keyword">if</span> (match !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">'mathInline'</span>, <span class="hljs-attr">raw</span>: match[<span class="hljs-number">0</span>], <span class="hljs-attr">text</span>: match[<span class="hljs-number">1</span>] };
                <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
            },
            <span class="hljs-title function_">renderer</span>(<span class="hljs-params"><span class="hljs-attr">token</span>: { text: <span class="hljs-built_in">string</span> }</span>) { <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;span class="pc-math"&gt;<span class="hljs-subst">\${typeset(token.text, <span class="hljs-literal">false</span>)}</span>&lt;/span&gt;\`</span>; },
        },
    ],
});

<span class="hljs-keyword">const</span> cited = <span class="hljs-regexp">/\\[(\\d+(?:,\\s*\\d+)*)\\]|\\b[Ss]ections? \\d+(?: to \\d+)?\\b|\\b[KCO]\\d+\\b|\\b\\d\\.\\d\\b/g</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> place = (<span class="hljs-attr">citation</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> section = citation.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^[Ss]ections? (\\d+)/</span>);
    <span class="hljs-keyword">if</span> (section !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-sec-<span class="hljs-subst">\${section[<span class="hljs-number">1</span>]}</span>\`</span>;
    <span class="hljs-keyword">const</span> label = citation.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^([KCO])(\\d+)$/</span>);
    <span class="hljs-keyword">if</span> (label !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-<span class="hljs-subst">\${label[<span class="hljs-number">1</span>].toLowerCase()}</span><span class="hljs-subst">\${label[<span class="hljs-number">2</span>]}</span>\`</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-<span class="hljs-subst">\${citation.replace(<span class="hljs-string">'.'</span>, <span class="hljs-string">'-'</span>)}</span>\`</span>;
};

<span class="hljs-keyword">const</span> link = (<span class="hljs-attr">citation</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (citation.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">'['</span>)) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'['</span> + citation.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>, -<span class="hljs-number">1</span>).<span class="hljs-title function_">split</span>(<span class="hljs-string">','</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span>
            <span class="hljs-string">\`&lt;a href="#cite-ref-<span class="hljs-subst">\${<span class="hljs-built_in">number</span>.trim()}</span>"&gt;<span class="hljs-subst">\${<span class="hljs-built_in">number</span>.trim()}</span>&lt;/a&gt;\`</span>).<span class="hljs-title function_">join</span>(<span class="hljs-string">', '</span>) + <span class="hljs-string">']'</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;a href="#<span class="hljs-subst">\${place(citation)}</span>"&gt;<span class="hljs-subst">\${citation}</span>&lt;/a&gt;\`</span>;
};

<span class="hljs-keyword">const</span> mention = (<span class="hljs-attr">passage</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">sections</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span>
    passage.<span class="hljs-title function_">split</span>(<span class="hljs-regexp">/(&lt;[^&gt;]*&gt;)/</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">piece, index, pieces</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (piece.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">'&lt;'</span>)) <span class="hljs-keyword">return</span> piece;
        <span class="hljs-keyword">const</span> previous = pieces[index - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">const</span> lead = previous !== <span class="hljs-literal">undefined</span> &amp;&amp; previous.<span class="hljs-title function_">includes</span>(<span class="hljs-string">'id="cite-'</span>)
            ? (piece.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^(?:[KCO]\\d+|\\d+\\.\\d+|\\d+\\.)/</span>) ?? [<span class="hljs-string">''</span>])[<span class="hljs-number">0</span>]
            : <span class="hljs-string">''</span>;
        <span class="hljs-keyword">return</span> lead + piece.<span class="hljs-title function_">slice</span>(lead.<span class="hljs-property">length</span>).<span class="hljs-title function_">replace</span>(cited, <span class="hljs-function"><span class="hljs-params">found</span> =&gt;</span>
            !sections &amp;&amp; <span class="hljs-regexp">/^[Ss]ection/</span>.<span class="hljs-title function_">test</span>(found) ? found : <span class="hljs-title function_">link</span>(found));
    }).<span class="hljs-title function_">join</span>(<span class="hljs-string">''</span>);

<span class="hljs-keyword">const</span> connect = (<span class="hljs-attr">rendered</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> identified = rendered
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;h2&gt;(\\d+)\\. /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, section</span>) =&gt;</span> <span class="hljs-string">\`&lt;h2 id="cite-sec-<span class="hljs-subst">\${section}</span>"&gt;<span class="hljs-subst">\${section}</span>. \`</span>)
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;(strong|td)&gt;(\\d+)\\.(\\d+) /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, tag, section, part</span>) =&gt;</span> <span class="hljs-string">\`&lt;<span class="hljs-subst">\${tag}</span> id="cite-<span class="hljs-subst">\${section}</span>-<span class="hljs-subst">\${part}</span>"&gt;<span class="hljs-subst">\${section}</span>.<span class="hljs-subst">\${part}</span> \`</span>)
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;(strong|td)&gt;([KCO])(\\d+) /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, tag, letter, <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-string">\`&lt;<span class="hljs-subst">\${tag}</span> id="cite-<span class="hljs-subst">\${letter.toLowerCase()}</span><span class="hljs-subst">\${<span class="hljs-built_in">number</span>}</span>"&gt;<span class="hljs-subst">\${letter}</span><span class="hljs-subst">\${<span class="hljs-built_in">number</span>}</span> \`</span>);
    <span class="hljs-keyword">const</span> boundary = identified.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'&lt;h2&gt;Related work&lt;/h2&gt;'</span>);
    <span class="hljs-keyword">if</span> (boundary === -<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-title function_">mention</span>(identified, <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> references = identified.<span class="hljs-title function_">slice</span>(boundary).<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;li&gt;/g</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`&lt;li id="cite-ref-<span class="hljs-subst">\${++count}</span>"&gt;\`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">mention</span>(identified.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, boundary), <span class="hljs-literal">true</span>) + <span class="hljs-title function_">mention</span>(references, <span class="hljs-literal">false</span>);
};

<span class="hljs-comment">// THE DOCUMENT RENDERS VERBATIM, Doug, 2026-11-16: "This is what it looks like. Read the markdown. Render it</span>
<span class="hljs-comment">// like that. I said verbatim" — the chapter's appended markdown parsed by marked, the package's own dependency,</span>
<span class="hljs-comment">// and drawn as the document renders: the bold lead-ins, the tables, the lists, the document's own title.</span>
<span class="hljs-comment">// A citation click turns the page itself — the hash never moves, so the place in the address stays the chapter's.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Markdown</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    $identifier = <span class="hljs-string">''</span>;

    follow = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> citation = (press.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Element</span>).<span class="hljs-title function_">closest</span>(<span class="hljs-string">'a[href^="#cite-"]'</span>);
        <span class="hljs-keyword">if</span> (citation === <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>;
        press.<span class="hljs-title function_">preventDefault</span>();
        <span class="hljs-keyword">const</span> landing = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(citation.<span class="hljs-title function_">getAttribute</span>(<span class="hljs-string">'href'</span>)?.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>) ?? <span class="hljs-string">''</span>);
        landing?.<span class="hljs-title function_">scrollIntoView</span>({ <span class="hljs-attr">behavior</span>: <span class="hljs-string">'smooth'</span>, <span class="hljs-attr">block</span>: <span class="hljs-string">'center'</span> });
    };

    <span class="hljs-keyword">get</span> <span class="hljs-title function_">append</span>(): $Append | <span class="hljs-literal">undefined</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">chapter</span>?.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">find</span>($Append).<span class="hljs-title function_">find</span>(<span class="hljs-function"><span class="hljs-params">append</span> =&gt;</span> append.<span class="hljs-property">$identifier</span> === <span class="hljs-variable language_">this</span>.<span class="hljs-property">$identifier</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> append = <span class="hljs-variable language_">this</span>.<span class="hljs-property">append</span>;
        <span class="hljs-keyword">if</span> (append === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> rendered = <span class="hljs-title function_">connect</span>(marked.<span class="hljs-title function_">parse</span>(html.<span class="hljs-title function_">copy</span>(append.<span class="hljs-property">text</span>), { <span class="hljs-attr">async</span>: <span class="hljs-literal">false</span> }));
        <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">pc-doc-</span>\${<span class="hljs-attr">this.</span>$<span class="hljs-attr">identifier</span>}\`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.follow}</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">rendered</span> }} /&gt;</span></span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-markdown'</span>);
    }
}

<span class="hljs-comment">// THE IMPLEMENTATION CITES THE SPECIFICATION, Doug, 2026-11-16: "there needs to be some relationship between</span>
<span class="hljs-comment">// the spec and the implementation" — the deliverable cites the part of the specification it meets, by number</span>
<span class="hljs-comment">// or label, and the citation leads there: it flips the content to the project side and lands on the part named.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Cite</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    $part = <span class="hljs-string">''</span>;

    <span class="hljs-comment">// The part is read back from the clicked anchor's own text: the handler's instance predates the pass</span>
    <span class="hljs-comment">// that applies props to the held one, so the rendered citation is the one source the click can trust.</span>
    <span class="hljs-comment">// The flip and the landing scroll both run inside the view transition's update, so the dissolve lands</span>
    <span class="hljs-comment">// directly on the cited clause.</span>
    follow = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLAnchorElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> part = press.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">textContent</span> ?? <span class="hljs-string">''</span>;
        <span class="hljs-keyword">const</span> turn = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
            <span class="hljs-keyword">const</span> flip = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'pc-flip'</span>);
            <span class="hljs-keyword">if</span> (flip <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLInputElement</span>) flip.<span class="hljs-property">checked</span> = <span class="hljs-literal">true</span>;
            <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-title function_">place</span>(part))?.<span class="hljs-title function_">scrollIntoView</span>({ <span class="hljs-attr">block</span>: <span class="hljs-string">'center'</span> });
        };
        <span class="hljs-keyword">const</span> doc = <span class="hljs-variable language_">document</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Document</span> &amp; { <span class="hljs-attr">startViewTransition</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">update</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">unknown</span> };
        <span class="hljs-keyword">if</span> (doc.<span class="hljs-property">startViewTransition</span> === <span class="hljs-literal">undefined</span>) <span class="hljs-title function_">turn</span>();
        <span class="hljs-keyword">else</span> doc.<span class="hljs-title function_">startViewTransition</span>(turn);
    };

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.follow}</span>&gt;</span>{this.$part}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-cite'</span>);
    }
}

<span class="hljs-comment">// THE INTERPOLATED PART, Doug, 2026-11-16: "interpolated string-like parts that might describe where something</span>
<span class="hljs-comment">// will go when we find it" — a word standing for the thing itself until the thing is found, by the interpolation</span>
<span class="hljs-comment">// rule of the specification's form.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Interpolated</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-interpolated'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Content</span> = $($Content);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Project</span> = $($Project);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Specification</span> = $($Specification);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Progress</span> = $($Progress);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Markdown</span> = $($Markdown);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Cite</span> = $($Cite);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Interpolated</span> = $($Interpolated);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span class="pd-word pd-next pa-reference pa-self-reference">▷</span></a></div></div></div></div></div><!--/$--></div>
  

<style id="sk-sheet">
/* THE OPENING'S OWN RULES, sk- throughout, never the print's class names. The listing is his, the numbers as in
   The Listing's sheet; what this sketch asks is the paper around it: a leaf, the file as a page of the book with
   the book's running head over it; an opening, the book open flat, the words on the verso and the file on the
   recto with its own running head; and the appendix as a part of the book at the foot of the table. */
.sk-switches { position: fixed; left: 12px; bottom: 12px; z-index: 20; display: flex; gap: 6px; align-items: center; font: 12px Georgia, serif; }
.sk-switches b { font-weight: normal; letter-spacing: .15em; text-transform: uppercase; opacity: .6; margin-right: 4px; }
.sk-switches button { font: inherit; padding: 3px 8px; border: 1px solid rgba(27, 27, 27, .35); background: #fff; cursor: pointer; }
.sk-switches button[aria-pressed="true"] { background: #1b1b1b; color: #fff; border-color: #1b1b1b; }

.sk-editor {
    --night: oklch(0.294 0.028 222.6);
    --dusk-top: oklch(0.414 0.026 219.3);
    --dusk: oklch(0.334 0.030 219.3);
    --bar-line: oklch(0.472 0.042 183.1);
    --glow: #d6e1e3;
    --dim: oklch(0.508 0.053 170.2);
    --brass: #d8c48e;
    --keyword: #8ad7ff;
    --string: #ffd48a;
    --name: #9be3d6;
    --comment: #5f8a86;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    margin-block: 1.25rem;
    background: var(--night);
    color: var(--glow);
}
.sk-editor.sk-light {
    --night: #f6f7f4;
    --dusk-top: oklch(0.952 0.007 90);
    --dusk: #eceee8;
    --bar-line: oklch(0.912 0.027 90);
    --glow: #2b363c;
    --dim: oklch(0.738 0.033 88.3);
    --brass: #5d4a16;
    --keyword: #5a4fa8;
    --string: #2f7f6e;
    --name: #23407a;
    --comment: #8a94a3;
    box-shadow: inset 0 0 0 1px rgba(27, 27, 27, .12);
}
.sk-bar { display: flex; align-items: stretch; gap: 1px; padding: 0 0 0 2px; background: linear-gradient(180deg, var(--dusk-top), var(--dusk)); border-block-end: thin solid var(--bar-line); }
.sk-tab { display: flex; align-items: center; gap: 7px; padding: 9px 14px 8px 12px; border: 0; border-block-start: 2px solid transparent; background: none; font: 500 12px/1 'JetBrains Mono', ui-monospace, monospace; color: color-mix(in oklch, var(--glow) 62%, var(--night)); cursor: pointer; }
.sk-tab[aria-pressed="true"] { color: var(--glow); background: var(--night); border-block-start-color: var(--brass); }
.sk-mark { color: #9aa4b3; font-size: 13px; letter-spacing: -1px; }
.sk-tab[aria-pressed="true"] .sk-mark { color: var(--brass); }
.sk-options { display: flex; align-items: center; gap: 2px; margin-inline-start: auto; padding: 0 8px 0 4px; border-inline-start: thin solid color-mix(in oklch, var(--glow) 12%, transparent); }
.sk-options button, .sk-modes button { border: 0; background: none; padding: 5px 7px; font-family: Georgia, serif; font-size: 11.9px; letter-spacing: .15em; text-transform: uppercase; color: color-mix(in oklch, var(--glow) 55%, var(--night)); cursor: pointer; }
.sk-options button[aria-pressed="true"] { color: var(--glow); background: color-mix(in oklch, var(--glow) 10%, transparent); }
.sk-modes { display: flex; align-items: center; gap: 2px; padding: 0 8px 0 4px; border-inline-start: thin solid color-mix(in oklch, var(--glow) 12%, transparent); }
.sk-modes button { color: var(--brass); }
.sk-modes button[aria-pressed="true"] { color: var(--glow); background: color-mix(in oklch, var(--glow) 10%, transparent); }
.sk-pane { max-height: 70vh; overflow: auto; scrollbar-width: thin; scrollbar-color: transparent transparent; }
.sk-pane:hover { scrollbar-color: var(--dim) transparent; }
.sk-pane pre.pd-code { margin: 0; padding: 14px 0; border: 0; font: 400 12px/20.4px 'JetBrains Mono', ui-monospace, monospace; color: var(--glow); background: transparent; white-space: normal; overflow: visible; }
.sk-line { display: block; white-space: pre; padding-inline-end: 18px; }
.sk-line::before { content: attr(data-line); display: inline-block; width: 44px; padding-inline-end: 14px; text-align: end; color: var(--dim); user-select: none; }
.sk-editor.sk-unnumbered .sk-line::before { content: ''; width: 14px; padding: 0; }
.sk-editor.sk-wrap .sk-line { white-space: pre-wrap; padding-inline-start: 58px; text-indent: -58px; }
.sk-editor.sk-wrap .sk-line::before { text-indent: 0; }
.sk-pane .hljs-keyword, .sk-pane .hljs-built_in, .sk-pane .hljs-literal { color: var(--keyword); }
.sk-pane .hljs-string, .sk-pane .hljs-regexp, .sk-pane .hljs-number { color: var(--string); }
.sk-pane .hljs-title, .sk-pane .hljs-type, .sk-pane .hljs-tag, .sk-pane .hljs-name, .sk-pane .hljs-attr { color: var(--name); }
.sk-pane .hljs-comment, .sk-pane .hljs-meta { color: var(--comment); }

/* the page as bound keeps its plate at the foot of the chapter; the leaf and the opening take the plate elsewhere */
.sk-recto-head { display: flex; justify-content: flex-end; align-items: center; gap: .6em; margin: 0 0 1.25rem; padding-block-end: .5rem; border-block-end: 1px solid rgba(27, 27, 27, .18); font-size: 11.9px; letter-spacing: .15em; text-transform: uppercase; color: #1f4e79; }
.sk-recto-head .sk-recto-name { font: 500 12px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0; text-transform: none; color: #1b1b1b; }
.sk-recto-head .sk-recto-label { opacity: .6; color: #1b1b1b; }

/* the leaf: the file is a page of the book, full screen, the running head and the chapter's line kept over it */
.sk-leaf-page { display: none; }
body[data-form="leaf"] .sk-leaf-page { position: fixed; inset: 0; z-index: 10; display: grid; grid-template-rows: auto auto minmax(0, 1fr); box-sizing: border-box; padding: 1.25rem 2.5rem 0; background: #fff; }
body[data-form="leaf"] .sk-leaf-page .pd-running-head { margin-block: 2.5rem 0; }
body[data-form="leaf"] .sk-leaf-line { display: flex; align-items: baseline; justify-content: space-between; gap: 1.25rem; margin-block: 1.25rem .75rem; }
body[data-form="leaf"] .sk-leaf-title { font: 500 calc(1.5 * 1.0625rem)/1.2 'JetBrains Mono', ui-monospace, monospace; color: #1b1b1b; }
body[data-form="leaf"] .sk-leaf-title::before { content: 'Chapter 1'; display: block; margin-block-end: .3rem; font: normal calc(.7 * 1.0625rem) Georgia, serif; letter-spacing: .15em; text-transform: uppercase; opacity: .6; }
body[data-form="leaf"] .sk-leaf-page .sk-editor { margin: 0 0 1.25rem; min-height: 0; }
body[data-form="leaf"] .sk-leaf-page .sk-pane { max-height: none; }
body[data-form="leaf"] .sk-verso { visibility: hidden; }

/* the opening: the book open flat, the words on the verso, the file on the recto, a gutter between the pages */
body[data-form="opening"] .sk-sheet { max-width: none; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); margin-inline: 0; padding: 0; }
body[data-form="opening"] .sk-sheet > .sk-verso { box-sizing: border-box; min-width: 0; padding: 1.25rem 2.5rem; }
.sk-editor, .sk-pane { min-width: 0; }
.sk-editor { grid-template-columns: minmax(0, 1fr); }
.sk-bar { min-width: 0; flex-wrap: wrap; }
body[data-form="opening"] .sk-sheet > .sk-verso .pd-book { max-width: 40rem; margin-inline: auto; }
body[data-form="opening"] .sk-sheet > .sk-verso .sk-editor { display: none; }
body[data-form="opening"] .sk-recto { position: sticky; top: 0; align-self: start; box-sizing: border-box; min-width: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); height: 100vh; padding: 1.25rem 2.5rem; background: #fff; }
body[data-form="opening"] .sk-recto .sk-recto-head { margin-block: 2.5rem 1.25rem; }
body[data-form="opening"] .sk-recto .sk-editor { margin: 0 0 1.25rem; min-height: 0; }
body[data-form="opening"] .sk-recto .sk-pane { max-height: none; }

/* the foot: the appendix as a part of the book, its chapters at the foot of the table in the smaller voice, each file a press beneath its chapter */
.sk-appendix { display: none; }
body[data-form="foot"] .sk-appendix { display: block; margin-block-start: 2.5rem; padding-block-start: 1rem; border-block-start: 1px solid rgba(27, 27, 27, .15); font-size: .86em; opacity: .82; }
.sk-appendix .pd-heading { font-weight: bold; margin-block: 0 .6rem; }
.sk-appendix .pd-paragraph { margin-block: .3rem 0; }
.sk-appendix a { text-decoration: none; color: inherit; }
.sk-appendix .sk-press { display: flex; align-items: center; gap: .4rem; margin: 0 0 .5rem 1.4rem; font: 400 12px 'JetBrains Mono', ui-monospace, monospace; color: rgba(27, 27, 27, .6); }
.sk-press .sk-mark { color: #9aa4b3; }

@media (max-width: 640px) {
    body[data-form="opening"] .sk-sheet { display: block; }
    body[data-form="opening"] .sk-sheet > .sk-verso { padding: 1.25rem; }
    body[data-form="opening"] .sk-recto { position: static; height: auto; border: 0; box-shadow: none; padding: 0 1.25rem 1.25rem; }
    body[data-form="opening"] .sk-recto .sk-recto-head { margin-block: 0 1rem; }
    body[data-form="opening"] .sk-recto .sk-pane { max-height: 70vh; }
    body[data-form="leaf"] .sk-leaf-page { padding: 1.25rem 1.25rem 0; }
    .sk-bar { flex-wrap: wrap; }
}
</style>
<script>
// The switch between the forms of The Opening, remembered in the address's hash so a photograph can ask for one:
// leaf and opening open the chapter The Faces, foot the table; a state follows a dash, leaf-light and opening-light
// asking for the light palette, as a reader would see it a press later.
(() => {
    const files = {
        'the-book': [1, 'code.tsx'], 'the-theme': [2, 'code.tsx'], 'the-running-head-and-the-byline': [3, 'code.tsx'],
        'the-faces': [4, 'code.tsx'], 'developing-the-library': [5, 'workbench.mjs'], 'the-paper': [6, 'code.tsx'],
        'the-reference-manual': [7], 'the-specification': [8], 'the-content': [9, 'code.tsx'],
    };
    const forms = { page: 'the page', opening: 'the opening', leaf: 'the leaf', foot: 'the foot' };
    const sheet = document.getElementById('root').firstElementChild;
    sheet.classList.add('sk-sheet');
    const verso = sheet.firstElementChild;
    verso.classList.add('sk-verso');
    const chapters = [...document.querySelectorAll('.pd-chapter.pd-canonical')];
    const table = document.querySelector('.pd-chapter.pa-table-of-contents');
    const faces = chapters.find(chapter => chapter.querySelector('.pd-title')?.id === 'the-faces');
    const runningHead = document.querySelector('.pd-running-head');

    const numbered = code => {
        const open = [];
        return code.innerHTML.split('\\n').map((line, index) => {
            const carried = open.join('');
            for (const tag of line.match(/<\\/?span[^>]*>/g) ?? []) {
                if (tag.startsWith('</')) open.pop(); else open.push(tag);
            }
            return \`<span class="sk-line" data-line="\${index + 1}">\${carried}\${line}\${'</span>'.repeat(open.length)}</span>\`;
        }).join('\\n');
    };

    const editors = new Map();
    for (const chapter of chapters) {
        const id = chapter.querySelector('.pd-title')?.id;
        const [number, name] = files[id] ?? [];
        const pre = chapter.querySelector(':scope > pre.pd-code');
        if (!pre || !name) continue;
        const editor = document.createElement('div');
        editor.className = 'sk-editor';
        editor.innerHTML = \`<div class="sk-bar"><button type="button" class="sk-tab" aria-pressed="true"><span class="sk-mark">&lsaquo;&rsaquo;</span>\${name}</button><span class="sk-options"><button type="button" data-option="light">light</button><button type="button" data-option="wrap">wrap</button><button type="button" data-option="lines" aria-pressed="true">lines</button></span><span class="sk-modes"><button type="button" data-mode="page">the page</button><button type="button" data-mode="opening">the opening</button><button type="button" data-mode="leaf">the leaf</button></span></div><div class="sk-pane"></div>\`;
        const code = pre.querySelector('code');
        code.innerHTML = numbered(code);
        pre.remove();
        editor.querySelector('.sk-pane').appendChild(pre);
        chapter.dataset.file = \`\${number}-\${id}~\${name}\`;
        chapter.dataset.name = chapter.querySelector('.pd-title').textContent;
        chapter.appendChild(editor);
        editors.set(chapter, editor);
        const option = (word, className) => {
            const button = editor.querySelector(\`[data-option="\${word}"]\`);
            button.addEventListener('click', () => {
                editor.classList.toggle(className);
                button.setAttribute('aria-pressed', String(word === 'lines' ? !editor.classList.contains(className) : editor.classList.contains(className)));
            });
        };
        option('light', 'sk-light');
        option('wrap', 'sk-wrap');
        option('lines', 'sk-unnumbered');
        // The modes of the manual on the editor's bar: the page, the opening, the leaf — the one in force pressed.
        for (const button of editor.querySelectorAll('[data-mode]'))
            button.addEventListener('click', () => choose(button.dataset.mode, undefined, chapter));
    }

    const openPage = chapter => {
        for (const page of document.querySelectorAll('.pa-page.pa-open')) page.classList.remove('pa-open');
        chapter.classList.add('pa-open');
        window.scrollTo(0, 0);
    };

    // The leaf's page: the running head, the chapter's line with the file's name as its literal, and the file.
    const leaf = document.createElement('div');
    leaf.className = 'sk-leaf-page';
    const leafHead = runningHead.cloneNode(true);
    const leafLine = document.createElement('div');
    leafLine.className = 'sk-leaf-line';
    leafLine.innerHTML = '<div class="sk-leaf-title"></div>';
    leaf.append(leafHead, leafLine);
    // Inside the sheet, so the theme's rules reach the running head as they reach the page's.
    sheet.appendChild(leaf);

    // The recto: a page of its own with a running head naming the file, holding the editor.
    const recto = document.createElement('div');
    recto.className = 'sk-recto';
    recto.innerHTML = '<div class="sk-recto-head"><span class="sk-recto-label">The file beside the chapter</span><span class="sk-recto-name"></span></div>';

    // foot: the appendix as a part at the foot of the table, its chapters as rows and each file a press beneath.
    const appendix = document.createElement('div');
    appendix.className = 'pd-section sk-appendix';
    appendix.innerHTML = '<div class="pd-sentence pd-heading">Appendix</div>';
    for (const chapter of editors.keys()) {
        const row = document.createElement('a');
        row.href = '#';
        row.className = 'pa-reference pd-container';
        row.innerHTML = \`<div class="pd-paragraph pa-reference"><span class="pa-content">\${chapter.dataset.name}</span></div>\`;
        row.addEventListener('click', event => { event.preventDefault(); choose('opening', undefined, chapter); });
        const press = document.createElement('a');
        press.href = '#';
        press.className = 'sk-press';
        press.innerHTML = \`<span class="sk-mark">&lsaquo;&rsaquo;</span>\${chapter.dataset.file.replace(/^.*~/, '')}\`;
        press.addEventListener('click', event => { event.preventDefault(); choose('opening', undefined, chapter); });
        appendix.append(row, press);
    }
    table.appendChild(appendix);

    const bar = document.createElement('div');
    bar.className = 'sk-switches';
    const label = document.createElement('b');
    label.textContent = 'the opening';
    bar.appendChild(label);
    const buttons = {};
    for (const [key, name] of Object.entries(forms)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = name;
        button.addEventListener('click', () => choose(key));
        buttons[key] = button;
        bar.appendChild(button);
    }
    document.body.appendChild(bar);

    const choose = (form, state, chapter = faces) => {
        document.body.dataset.form = form;
        for (const [one, editor] of editors) {
            editor.classList.remove('sk-light');
            editor.querySelector('[data-option="light"]').setAttribute('aria-pressed', 'false');
            for (const button of editor.querySelectorAll('[data-mode]')) button.setAttribute('aria-pressed', String(button.dataset.mode === form));
            if (editor.parentElement !== one) one.appendChild(editor);
        }
        recto.remove();
        const editor = editors.get(chapter);
        if (form === 'leaf') {
            leafLine.querySelector('.sk-leaf-title').textContent = chapter.dataset.file;
            leaf.appendChild(editor);
        }
        if (form === 'opening') {
            recto.querySelector('.sk-recto-name').textContent = chapter.dataset.file;
            recto.appendChild(editor);
            sheet.appendChild(recto);
        }
        for (const [key, button] of Object.entries(buttons)) button.setAttribute('aria-pressed', String(key === form));
        openPage(form === 'foot' ? table : chapter);
        if (state === 'light') editor.querySelector('[data-option="light"]').click();
        if (form === 'page') window.scrollTo(0, editor.getBoundingClientRect().top + window.scrollY - 24);
        const hash = \`#\${form}\${state === undefined ? '' : \`-\${state}\`}\`;
        if (location.hash !== hash) history.replaceState(null, '', hash);
    };
    const asked = () => {
        const [form, state] = location.hash.slice(1).split('-');
        choose(forms[form] ? form : 'opening', state || undefined);
    };
    asked();
    window.addEventListener('hashchange', asked);
})();
<\/script>
</body></html>`}),e(w,{identifier:"editor",type:".html",children:`<!doctype html>
<html lang="en" class=""><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Reference, the editor</title>
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28'%3E%3Crect width='28' height='28' fill='%23faf8f4'/%3E%3Ccircle cx='14' cy='14' r='8' fill='none' stroke='%2323262a' stroke-width='2'/%3E%3C/svg%3E">
    
    
    <style data-inlined="/inexplicable-phenomena/assets/index-CaH6IAI_.css">@font-face{font-display:block;font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-BQhdFMY1.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-DMm9YOAa.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_AMS-Regular-DRggAlZN.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Caligraphic;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Caligraphic;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Fraktur;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-BsDP51OF.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Fraktur;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Fraktur-Regular-CB_wures.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-Cx986IdX.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-Jm3AIy58.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Bold-waoOVXN0.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:italic;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-SpSLRI95.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-NWA7e6Wa.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-BMLOBm91.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Italic-3WenGoN9.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Main;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-B22Nviop.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-Dr94JaBh.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Main-Regular-ypZvNtVU.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Math;font-style:italic;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Math;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-t53AETM-.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-DA0__PXp.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Math-Italic-flOr_0UB.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:normal;font-weight:700;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:italic;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-DN2j7dab.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_SansSerif;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Script;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-D3wIWfF6.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-D5yQViql.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Script-Regular-C5JkGWo-.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size1;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-mCD8mA8B.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-C195tn64.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size1-Regular-Dbsnue_I.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size2;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-Dy4dx90m.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-oD1tc_U0.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size2-Regular-B7gKUWhC.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(data:font/woff2;base64,d09GMgABAAAAAA4oAA4AAAAAHbQAAA3TAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAAgRQIDgmcDBEICo1oijYBNgIkA14LMgAEIAWJAAeBHAyBHBvbGiMRdnO0IkRRkiYDgr9KsJ1NUAf2kILNxgUmgqIgq1P89vcbIcmsQbRps3vCcXdYOKSWEPEKgZgQkprQQsxIXUgq0DqpGKmIvrgkeVGtEQD9DzAO29fM9jYhxZEsL2FeURH2JN4MIcTdO049NCVdxQ/w9NrSYFEBKTDKpLKfNkCGDc1RwjZLQcm3vqJ2UW9Xfa3tgAHz6ivp6vgC2yD4/6352ndnN0X0TL7seypkjZlMsjmZnf0Mm5Q+JykRWQBKCVCVPbARPXWyQtb5VgLB6Biq7/Uixcj2WGqdI8tGSgkuRG+t910GKP2D7AQH0DB9FMDW/obJZ8giFI3Wg8Cvevz0M+5m0rTh7XDBlvo9Y4vm13EXmfttwI4mBo1EG15fxJhUiCLbiiyCf/ZA6MFAhg3pGIZGdGIVjtPn6UcMk9A/UUr9PhoNsCENw1APAq0gpH73e+M+0ueyHbabc3vkbcdtzcf/fiy+NxQEjf9ud/ELBHAXJ0nk4z+MXH2Ev/kWyV4k7SkvpPc9Qr38F6RPWnM9cN6DJ0AdD1BhtgABtmoRoFCvPsBAumNm6soZG2Gk5GyVTo2sJncSyp0jQTYoR6WDvTwaaEcHsxHfvuWhHA3a6bN7twRKtcGok6NsCi7jYRrM2jExsUFMxMQYuJbMhuWNOumEJy9hi29Dmg5zMp/A5+hhPG19j1vBrq8JTLr8ki5VLPmG/PynJHVul440bxg5xuymHUFPBshC+nA9I1FmwbRBTNHAcik3Oae0cxKoI3MOriM42UrPe51nsaGxJ+WfXubAsP84aabUlQSJ1IiE0iPETLUU4CATgfXSCSpuRFRmCGbO+wSpAnzaeaCYW1VNEysRtuXCEL1kUFUbbtMv3Tilt/1c11jt3Q5bbMa84cpWipp8Elw3MZhOHsOlwwVUQM3lAR35JiFQbaYCRnMF2lxAWoOg2gyoIV4PouX8HytNIfLhqpJtXB4vjiViUI8IJ7bkC4ikkQvKksnOTKICwnqWSZ9YS5f0WCxmpgjbIq7EJcM4aI2nmhLNY2JIUgOjXZFWBHb+x5oh6cwb0Tv1ackHdKi0I9OO2wE9aogIOn540CCCziyhN+IaejtgAONKznHlHyutPrHGwCx9S6B8kfS4Mfi4Eyv7OU730bT1SCBjt834cXsf43zVjPUqqJjgrjeGnBxSG4aYAKFuVbeCfkDIjAqMb6yLNIbCuvXhMH2/+k2vkNpkORhR59N1CkzoOENvneIosjYmuTxlhUzaGEJQ/iWqx4dmwpmKjrwTiTGTCVozNAYqk/zXOndWxuWSmJkQpJw3pK5KX6QrLt5LATMqpmPAQhkhK6PUjzHUn7E0gHE0kPE0iKkolgkUx9SZmVAdDgpffdyJKg3k7VmzYGCwVXGz/tXmkOIp+vcWs+EMuhhvN0h9uhfzWJziBQmCREGSIFmQIkgVpAnSBRmC//6hkLZwaVhwxlrJSOdqlFtOYxlau9F2QN5Y98xmIAsiM1HVp2VFX+DHHGg6Ecjh3vmqtidX3qHI2qycTk/iwxSt5UzTmEP92ZBnEWTk4Mx8Mpl78ZDokxg/KWb+Q0QkvdKVmq3TMW+RXEgrsziSAfNXFMhDc60N5N9jQzjfO0kBKpUZl0ZmwJ41j/B9Hz6wmRaJB84niNmQrzp9eSlQCDDzazGDdVi3P36VZQ+Jy4f9UBNp+3zTjqI4abaFAm+GShVaXlsGdF3FYzZcDI6cori4kMxUECl9IjJZpzkvitAoxKue+90pDMvcKRxLl53TmOKCmV/xRolNKSqqUxc6LStOETmFOiLZZptlZepcKiAzteG8PEdpnQpbOMNcMsR4RR2Bs0cKFEvSmIjAFcnarqwUL4lDhHmnVkwu1IwshbiCcgvOheZuYyOteufZZwlcTlLgnZ3o/WcYdzZHW/WGaqaVfmTZ1aWCceJjkbZqsfbkOtcFlUZM/jy+hXHDbaUobWqqXaeWobbLO99yG5N3U4wxco0rQGGcOLASFMXeJoham8M+/x6O2WywK2l4HGbq1CoUyC/IZikQhdq3SiuNrvAEj0AVu9x2x3lp/xWzahaxidezFVtdcb5uEnzyl0ZmYiuKI0exvCd4Xc9CV1KB0db00z92wDPde0kukbvZIWN6jUWFTmPIC/Y4UPCm8UfDTFZpZNon1qLFTkBhxzB+FjQRA2Q/YRJT8pQigslMaUpFyAG8TMlXigiqmAZX4xgijKjRlGpLE0GdplRfCaJo0JQaSxNBk6ZmMzcya0FmrcisDdn0Q3HI2sWSppYigmlM1XT/kLQZSNpMJG0WkjYbSZuDpM1F0uYhFc1HxU4m1QJjDK6iL0S5uSj5rgXc3RejEigtcRBtqYPQsiTskmO5vosV+q4VGIKbOkDg0jtRrq+Em1YloaTFar3EGr1EUC8R0kus1Uus00usL97ABr2BjXoDm/QGNhuWtMVBKOwg/i78lT7hBsAvDmwHc/ao3vmUbBmhjeYySZNWvGkfZAgISDSaDo1SVpzGDsAEkF8B+gEapViUoZgUWXcRIGFZNm6gWbAKk0bp0k1MHG9fLYtV4iS2SmLEQFARzRcnf9PUS0LVn05/J9MiRRBU3v2IrvW974v4N00L7ZMk0wXP1409CHo/an8zTRHD3eSJ6m8D4YMkZNl3M79sqeuAsr/m3f+8/yl7A50aiAEJgeBeMWzu7ui9UfUBCe2TIqZIoOd/3/udRBOQidQZUERzb2/VwZN1H/Sju82ew2H2Wfr6qvfVf3hqwDvAIpkQVFy4B9Pe9e4/XvPeceu7h3dvO56iJPf0+A6cqA2ip18ER+iFgggiuOkvj24bby0N9j2UHIkgqIt+sVgfodC4YghLSMjSZbH0VR/6dMDrYJeKHilKTemt6v6kvzvn3/RrdWtr0GoN/xL+Sex/cPYLUpepx9cz/D46UPU5KXgAQa+NDps1v6J3xP1i2HtaDB0M9aX2deA7SYff//+gUCovMmIK/qfsFcOk+4Y5ZN97XlG6zebqtMbKgeRFi51vnxTQYBUik2rS/Cn6PC8ADR8FGxsRPB82dzfND90gIcshOcYUkfjherBz53odpm6TP8txlwOZ71xmfHHOvq053qFF/MRlS3jP0ELudrf2OeN8DHvp6ZceLe8qKYvWz/7yp0u4dKPfli3CYq0O13Ih71mylJ80tOi10On8wi+F4+LWgDPeJ30msSQt9/vkmHq9/Lvo2b461mP801v3W4xTcs6CbvF9UDdrSt+A8OUbpSh55qAUFXWznBBfdeJ8a4d7ugT5tvxUza3h9m4H7ptTqiG4z0g5dc0X29OcGlhpGFMpQo9ytTS+NViZpNdvU4kWx+LKxNY10kQ1yqGXrhe4/1nvP7E+nd5A92TtaRplbHSqoIdOqtRWti+fkB5/n1+/VvCmz12pG1kpQWsfi1ftlBobm0bpngs16CHkbIwdLnParxtTV3QYRlfJ0KFskH7pdN/YDn+yRuSd7sNH3aO0DYPggk6uWuXrfOc+fa3VTxFVvKaNxHsiHmsXyCLIE5yuOeN3/Jdf8HBL/5M6shjyhxHx9BjB1O0+4NLOnjLLSxwO7ukN4jMbOIcD879KLSi6Pk61Oqm2377n8079PXEEQ7cy7OKEC9nbpet118fxweTafpt69x/Bt8UqGzNQt7aelpc44dn5cqhwf71+qKp/Zf/+a0zcizOUWpl/iBcSXip0pplkatCchoH5c5aUM8I7/dWxAej8WicPL1URFZ9BDJelUwEwTkGqUhgSlydVes95YdXvhh9Gfz/aeFWvgVb4tuLbcv4+wLdutVZv/cUonwBD/6eDlE0aSiKK/uoH3+J1wDE/jMVqY2ysGufN84oIXB0sPzy8ollX/LegY74DgJXJR57sn+VGza0x3DnuIgABFM15LmajjjsNlYj+JEZGbuRYcAMOWxFkPN2w6Wd46xo4gVWQR/X4lyI/R6K/YK0110GzudPRW7Y+UOBGTfNNzHeYT0fiH0taunBpq9HEW8OKSaBGj21L0MqenEmNRWBAWDWAk4CpNoEZJ2tTaPFgbQYj8HxtFilErs3BTRwT8uO1NXQaWfIotchmPkAF5mMBAliEmZiOGVgCG9LgRzpscMAOOwowlT3JhusdazXGSC/hxR3UlmWVwWHpOIKheqONvjyhSiTHIkVUco5bnji8m//zL7PKaT1Vl5I6UE609f+gkr6MZKVyKc7zJRmCahLsdlyA5fdQkRSan9LgnnLEyGSkaKJCJog0wAgvepWBt80+1yKln1bMVtCljfNWDueKLsWwaEbBSfSPTEmVRsUcYYMnEjcjeyCZzBXK9E9BYBXLKjOSpUDR+nEV3TFSUdQaz+ot98QxgXwx0GQ+EEUAKB2qZPkQQ0GqFD8UPFMqyaCHM24BZmSGic9EYMagKizOw9Hz50DMrDLrqqLkTAhplMictiCAx5S3BIUQdeJeLnBy2CNtMfz6cV4u8XKoFZQesbf9YZiIERiHjaNodDW6LgcirX/mPnJIkBGDUpTBhSa0EIr38D5hCIszhCM8URGBqImoWjpvpt1ebu/v3Gl3qJfMnNM+9V+kiRFyROTPHQWOcs1dNW94/ukKMPZBvDi55i5CttdeJz84DLngLqjcdwEZ87bFFR8CIG35OAkDVN6VRDZ7aq67NteYqZ2lpT8oYB2CytoBd6VuAx4WgiAsnuj3WohG+LugzXiQRDeM3XYXlULv4dp5VFYC) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size3-Regular-CTq5MqoE.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size3-Regular-DgpXs0kz.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Size4;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-BF-4gkZK.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Size4-Regular-DWFBv043.ttf) format("truetype")}@font-face{font-display:block;font-family:KaTeX_Typewriter;font-style:normal;font-weight:400;src:url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2) format("woff2"),url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff) format("woff"),url(/inexplicable-phenomena/assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf) format("truetype")}.katex{font: 1.21em KaTeX_Main,math,Times New Roman,serif;line-height:1.2;position:relative;text-indent:0;text-rendering:auto}.katex *{-ms-high-contrast-adjust:none!important;border-color:currentColor}.katex .katex-version:after{content:"0.18.10"}.katex .katex-mathml{border:0;-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;overflow:hidden;padding:0;position:absolute;width:1px}.katex .katex-html>.katex-newline{display:block}.katex .katex-base{position:relative;white-space:nowrap;width:-webkit-min-content;width:-moz-min-content;width:min-content}.katex .katex-base,.katex .katex-strut{display:inline-block}.katex .textbf{font-weight:700}.katex .textit{font-style:italic}.katex .textrm{font-family:KaTeX_Main}.katex .textsf{font-family:KaTeX_SansSerif}.katex .texttt{font-family:KaTeX_Typewriter}.katex .mathnormal{font-family:KaTeX_Math;font-style:italic}.katex .mathit{font-family:KaTeX_Main;font-style:italic}.katex .mathrm{font-style:normal}.katex .mathbf{font-family:KaTeX_Main;font-weight:700}.katex .boldsymbol{font-family:KaTeX_Math;font-style:italic;font-weight:700}.katex .amsrm,.katex .mathbb,.katex .textbb{font-family:KaTeX_AMS}.katex .mathcal{font-family:KaTeX_Caligraphic}.katex .mathfrak,.katex .textfrak{font-family:KaTeX_Fraktur}.katex .mathboldfrak,.katex .textboldfrak{font-family:KaTeX_Fraktur;font-weight:700}.katex .mathtt{font-family:KaTeX_Typewriter}.katex .mathscr,.katex .textscr{font-family:KaTeX_Script}.katex .mathsf,.katex .textsf{font-family:KaTeX_SansSerif}.katex .mathboldsf,.katex .textboldsf{font-family:KaTeX_SansSerif;font-weight:700}.katex .mathitsf,.katex .mathsfit,.katex .textitsf{font-family:KaTeX_SansSerif;font-style:italic}.katex .mainrm{font-family:KaTeX_Main;font-style:normal}.katex .vlist-t{border-collapse:collapse;display:inline-table;table-layout:fixed}.katex .vlist-r{display:table-row}.katex .vlist{display:table-cell;position:relative;vertical-align:bottom}.katex .vlist>span{display:block;height:0;position:relative}.katex .vlist>span>span{display:inline-block}.katex .vlist>span>.pstrut{overflow:hidden;width:0}.katex .vlist-t2{margin-right:-2px}.katex .vlist-s{display:table-cell;font-size:1px;min-width:2px;vertical-align:bottom;width:2px}.katex .katex-vbox{align-items:baseline;display:inline-flex;flex-direction:column}.katex .katex-thinbox{display:inline-flex;flex-direction:row;max-width:0;width:0}.katex .msupsub{text-align:left}.katex .mfrac>span>span{text-align:center}.katex .mfrac .frac-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .katex-hdashline,.katex .katex-hline,.katex .katex-overline .overline-line,.katex .katex-rule,.katex .katex-underline .underline-line,.katex .mfrac .frac-line{min-height:1px}.katex .mspace{display:inline-block}.katex .katex-smash{display:inline;line-height:0}.katex .clap,.katex .llap,.katex .rlap{position:relative;width:0}.katex .clap>.katex-inner,.katex .llap>.katex-inner,.katex .rlap>.katex-inner{position:absolute}.katex .clap>.katex-fix,.katex .llap>.katex-fix,.katex .rlap>.katex-fix{display:inline-block}.katex .llap>.katex-inner{right:0}.katex .clap>.katex-inner,.katex .rlap>.katex-inner{left:0}.katex .clap>.katex-inner>span{margin-left:-50%;margin-right:50%}.katex .katex-rule{border:0 solid;display:inline-block;position:relative}.katex .katex-hline,.katex .katex-overline .overline-line,.katex .katex-underline .underline-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .katex-hdashline{border-bottom-style:dashed;display:inline-block;width:100%}.katex .sqrt>.katex-root{margin-left:.2777777778em;margin-right:-.5555555556em}.katex .fontsize-ensurer.reset-size1.size1,.katex .katex-sizing.reset-size1.size1{font-size:1em}.katex .fontsize-ensurer.reset-size1.size2,.katex .katex-sizing.reset-size1.size2{font-size:1.2em}.katex .fontsize-ensurer.reset-size1.size3,.katex .katex-sizing.reset-size1.size3{font-size:1.4em}.katex .fontsize-ensurer.reset-size1.size4,.katex .katex-sizing.reset-size1.size4{font-size:1.6em}.katex .fontsize-ensurer.reset-size1.size5,.katex .katex-sizing.reset-size1.size5{font-size:1.8em}.katex .fontsize-ensurer.reset-size1.size6,.katex .katex-sizing.reset-size1.size6{font-size:2em}.katex .fontsize-ensurer.reset-size1.size7,.katex .katex-sizing.reset-size1.size7{font-size:2.4em}.katex .fontsize-ensurer.reset-size1.size8,.katex .katex-sizing.reset-size1.size8{font-size:2.88em}.katex .fontsize-ensurer.reset-size1.size9,.katex .katex-sizing.reset-size1.size9{font-size:3.456em}.katex .fontsize-ensurer.reset-size1.size10,.katex .katex-sizing.reset-size1.size10{font-size:4.148em}.katex .fontsize-ensurer.reset-size1.size11,.katex .katex-sizing.reset-size1.size11{font-size:4.976em}.katex .fontsize-ensurer.reset-size2.size1,.katex .katex-sizing.reset-size2.size1{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size2.size2,.katex .katex-sizing.reset-size2.size2{font-size:1em}.katex .fontsize-ensurer.reset-size2.size3,.katex .katex-sizing.reset-size2.size3{font-size:1.1666666667em}.katex .fontsize-ensurer.reset-size2.size4,.katex .katex-sizing.reset-size2.size4{font-size:1.3333333333em}.katex .fontsize-ensurer.reset-size2.size5,.katex .katex-sizing.reset-size2.size5{font-size:1.5em}.katex .fontsize-ensurer.reset-size2.size6,.katex .katex-sizing.reset-size2.size6{font-size:1.6666666667em}.katex .fontsize-ensurer.reset-size2.size7,.katex .katex-sizing.reset-size2.size7{font-size:2em}.katex .fontsize-ensurer.reset-size2.size8,.katex .katex-sizing.reset-size2.size8{font-size:2.4em}.katex .fontsize-ensurer.reset-size2.size9,.katex .katex-sizing.reset-size2.size9{font-size:2.88em}.katex .fontsize-ensurer.reset-size2.size10,.katex .katex-sizing.reset-size2.size10{font-size:3.4566666667em}.katex .fontsize-ensurer.reset-size2.size11,.katex .katex-sizing.reset-size2.size11{font-size:4.1466666667em}.katex .fontsize-ensurer.reset-size3.size1,.katex .katex-sizing.reset-size3.size1{font-size:.7142857143em}.katex .fontsize-ensurer.reset-size3.size2,.katex .katex-sizing.reset-size3.size2{font-size:.8571428571em}.katex .fontsize-ensurer.reset-size3.size3,.katex .katex-sizing.reset-size3.size3{font-size:1em}.katex .fontsize-ensurer.reset-size3.size4,.katex .katex-sizing.reset-size3.size4{font-size:1.1428571429em}.katex .fontsize-ensurer.reset-size3.size5,.katex .katex-sizing.reset-size3.size5{font-size:1.2857142857em}.katex .fontsize-ensurer.reset-size3.size6,.katex .katex-sizing.reset-size3.size6{font-size:1.4285714286em}.katex .fontsize-ensurer.reset-size3.size7,.katex .katex-sizing.reset-size3.size7{font-size:1.7142857143em}.katex .fontsize-ensurer.reset-size3.size8,.katex .katex-sizing.reset-size3.size8{font-size:2.0571428571em}.katex .fontsize-ensurer.reset-size3.size9,.katex .katex-sizing.reset-size3.size9{font-size:2.4685714286em}.katex .fontsize-ensurer.reset-size3.size10,.katex .katex-sizing.reset-size3.size10{font-size:2.9628571429em}.katex .fontsize-ensurer.reset-size3.size11,.katex .katex-sizing.reset-size3.size11{font-size:3.5542857143em}.katex .fontsize-ensurer.reset-size4.size1,.katex .katex-sizing.reset-size4.size1{font-size:.625em}.katex .fontsize-ensurer.reset-size4.size2,.katex .katex-sizing.reset-size4.size2{font-size:.75em}.katex .fontsize-ensurer.reset-size4.size3,.katex .katex-sizing.reset-size4.size3{font-size:.875em}.katex .fontsize-ensurer.reset-size4.size4,.katex .katex-sizing.reset-size4.size4{font-size:1em}.katex .fontsize-ensurer.reset-size4.size5,.katex .katex-sizing.reset-size4.size5{font-size:1.125em}.katex .fontsize-ensurer.reset-size4.size6,.katex .katex-sizing.reset-size4.size6{font-size:1.25em}.katex .fontsize-ensurer.reset-size4.size7,.katex .katex-sizing.reset-size4.size7{font-size:1.5em}.katex .fontsize-ensurer.reset-size4.size8,.katex .katex-sizing.reset-size4.size8{font-size:1.8em}.katex .fontsize-ensurer.reset-size4.size9,.katex .katex-sizing.reset-size4.size9{font-size:2.16em}.katex .fontsize-ensurer.reset-size4.size10,.katex .katex-sizing.reset-size4.size10{font-size:2.5925em}.katex .fontsize-ensurer.reset-size4.size11,.katex .katex-sizing.reset-size4.size11{font-size:3.11em}.katex .fontsize-ensurer.reset-size5.size1,.katex .katex-sizing.reset-size5.size1{font-size:.5555555556em}.katex .fontsize-ensurer.reset-size5.size2,.katex .katex-sizing.reset-size5.size2{font-size:.6666666667em}.katex .fontsize-ensurer.reset-size5.size3,.katex .katex-sizing.reset-size5.size3{font-size:.7777777778em}.katex .fontsize-ensurer.reset-size5.size4,.katex .katex-sizing.reset-size5.size4{font-size:.8888888889em}.katex .fontsize-ensurer.reset-size5.size5,.katex .katex-sizing.reset-size5.size5{font-size:1em}.katex .fontsize-ensurer.reset-size5.size6,.katex .katex-sizing.reset-size5.size6{font-size:1.1111111111em}.katex .fontsize-ensurer.reset-size5.size7,.katex .katex-sizing.reset-size5.size7{font-size:1.3333333333em}.katex .fontsize-ensurer.reset-size5.size8,.katex .katex-sizing.reset-size5.size8{font-size:1.6em}.katex .fontsize-ensurer.reset-size5.size9,.katex .katex-sizing.reset-size5.size9{font-size:1.92em}.katex .fontsize-ensurer.reset-size5.size10,.katex .katex-sizing.reset-size5.size10{font-size:2.3044444444em}.katex .fontsize-ensurer.reset-size5.size11,.katex .katex-sizing.reset-size5.size11{font-size:2.7644444444em}.katex .fontsize-ensurer.reset-size6.size1,.katex .katex-sizing.reset-size6.size1{font-size:.5em}.katex .fontsize-ensurer.reset-size6.size2,.katex .katex-sizing.reset-size6.size2{font-size:.6em}.katex .fontsize-ensurer.reset-size6.size3,.katex .katex-sizing.reset-size6.size3{font-size:.7em}.katex .fontsize-ensurer.reset-size6.size4,.katex .katex-sizing.reset-size6.size4{font-size:.8em}.katex .fontsize-ensurer.reset-size6.size5,.katex .katex-sizing.reset-size6.size5{font-size:.9em}.katex .fontsize-ensurer.reset-size6.size6,.katex .katex-sizing.reset-size6.size6{font-size:1em}.katex .fontsize-ensurer.reset-size6.size7,.katex .katex-sizing.reset-size6.size7{font-size:1.2em}.katex .fontsize-ensurer.reset-size6.size8,.katex .katex-sizing.reset-size6.size8{font-size:1.44em}.katex .fontsize-ensurer.reset-size6.size9,.katex .katex-sizing.reset-size6.size9{font-size:1.728em}.katex .fontsize-ensurer.reset-size6.size10,.katex .katex-sizing.reset-size6.size10{font-size:2.074em}.katex .fontsize-ensurer.reset-size6.size11,.katex .katex-sizing.reset-size6.size11{font-size:2.488em}.katex .fontsize-ensurer.reset-size7.size1,.katex .katex-sizing.reset-size7.size1{font-size:.4166666667em}.katex .fontsize-ensurer.reset-size7.size2,.katex .katex-sizing.reset-size7.size2{font-size:.5em}.katex .fontsize-ensurer.reset-size7.size3,.katex .katex-sizing.reset-size7.size3{font-size:.5833333333em}.katex .fontsize-ensurer.reset-size7.size4,.katex .katex-sizing.reset-size7.size4{font-size:.6666666667em}.katex .fontsize-ensurer.reset-size7.size5,.katex .katex-sizing.reset-size7.size5{font-size:.75em}.katex .fontsize-ensurer.reset-size7.size6,.katex .katex-sizing.reset-size7.size6{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size7.size7,.katex .katex-sizing.reset-size7.size7{font-size:1em}.katex .fontsize-ensurer.reset-size7.size8,.katex .katex-sizing.reset-size7.size8{font-size:1.2em}.katex .fontsize-ensurer.reset-size7.size9,.katex .katex-sizing.reset-size7.size9{font-size:1.44em}.katex .fontsize-ensurer.reset-size7.size10,.katex .katex-sizing.reset-size7.size10{font-size:1.7283333333em}.katex .fontsize-ensurer.reset-size7.size11,.katex .katex-sizing.reset-size7.size11{font-size:2.0733333333em}.katex .fontsize-ensurer.reset-size8.size1,.katex .katex-sizing.reset-size8.size1{font-size:.3472222222em}.katex .fontsize-ensurer.reset-size8.size2,.katex .katex-sizing.reset-size8.size2{font-size:.4166666667em}.katex .fontsize-ensurer.reset-size8.size3,.katex .katex-sizing.reset-size8.size3{font-size:.4861111111em}.katex .fontsize-ensurer.reset-size8.size4,.katex .katex-sizing.reset-size8.size4{font-size:.5555555556em}.katex .fontsize-ensurer.reset-size8.size5,.katex .katex-sizing.reset-size8.size5{font-size:.625em}.katex .fontsize-ensurer.reset-size8.size6,.katex .katex-sizing.reset-size8.size6{font-size:.6944444444em}.katex .fontsize-ensurer.reset-size8.size7,.katex .katex-sizing.reset-size8.size7{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size8.size8,.katex .katex-sizing.reset-size8.size8{font-size:1em}.katex .fontsize-ensurer.reset-size8.size9,.katex .katex-sizing.reset-size8.size9{font-size:1.2em}.katex .fontsize-ensurer.reset-size8.size10,.katex .katex-sizing.reset-size8.size10{font-size:1.4402777778em}.katex .fontsize-ensurer.reset-size8.size11,.katex .katex-sizing.reset-size8.size11{font-size:1.7277777778em}.katex .fontsize-ensurer.reset-size9.size1,.katex .katex-sizing.reset-size9.size1{font-size:.2893518519em}.katex .fontsize-ensurer.reset-size9.size2,.katex .katex-sizing.reset-size9.size2{font-size:.3472222222em}.katex .fontsize-ensurer.reset-size9.size3,.katex .katex-sizing.reset-size9.size3{font-size:.4050925926em}.katex .fontsize-ensurer.reset-size9.size4,.katex .katex-sizing.reset-size9.size4{font-size:.462962963em}.katex .fontsize-ensurer.reset-size9.size5,.katex .katex-sizing.reset-size9.size5{font-size:.5208333333em}.katex .fontsize-ensurer.reset-size9.size6,.katex .katex-sizing.reset-size9.size6{font-size:.5787037037em}.katex .fontsize-ensurer.reset-size9.size7,.katex .katex-sizing.reset-size9.size7{font-size:.6944444444em}.katex .fontsize-ensurer.reset-size9.size8,.katex .katex-sizing.reset-size9.size8{font-size:.8333333333em}.katex .fontsize-ensurer.reset-size9.size9,.katex .katex-sizing.reset-size9.size9{font-size:1em}.katex .fontsize-ensurer.reset-size9.size10,.katex .katex-sizing.reset-size9.size10{font-size:1.2002314815em}.katex .fontsize-ensurer.reset-size9.size11,.katex .katex-sizing.reset-size9.size11{font-size:1.4398148148em}.katex .fontsize-ensurer.reset-size10.size1,.katex .katex-sizing.reset-size10.size1{font-size:.2410800386em}.katex .fontsize-ensurer.reset-size10.size2,.katex .katex-sizing.reset-size10.size2{font-size:.2892960463em}.katex .fontsize-ensurer.reset-size10.size3,.katex .katex-sizing.reset-size10.size3{font-size:.337512054em}.katex .fontsize-ensurer.reset-size10.size4,.katex .katex-sizing.reset-size10.size4{font-size:.3857280617em}.katex .fontsize-ensurer.reset-size10.size5,.katex .katex-sizing.reset-size10.size5{font-size:.4339440694em}.katex .fontsize-ensurer.reset-size10.size6,.katex .katex-sizing.reset-size10.size6{font-size:.4821600771em}.katex .fontsize-ensurer.reset-size10.size7,.katex .katex-sizing.reset-size10.size7{font-size:.5785920926em}.katex .fontsize-ensurer.reset-size10.size8,.katex .katex-sizing.reset-size10.size8{font-size:.6943105111em}.katex .fontsize-ensurer.reset-size10.size9,.katex .katex-sizing.reset-size10.size9{font-size:.8331726133em}.katex .fontsize-ensurer.reset-size10.size10,.katex .katex-sizing.reset-size10.size10{font-size:1em}.katex .fontsize-ensurer.reset-size10.size11,.katex .katex-sizing.reset-size10.size11{font-size:1.1996142719em}.katex .fontsize-ensurer.reset-size11.size1,.katex .katex-sizing.reset-size11.size1{font-size:.2009646302em}.katex .fontsize-ensurer.reset-size11.size2,.katex .katex-sizing.reset-size11.size2{font-size:.2411575563em}.katex .fontsize-ensurer.reset-size11.size3,.katex .katex-sizing.reset-size11.size3{font-size:.2813504823em}.katex .fontsize-ensurer.reset-size11.size4,.katex .katex-sizing.reset-size11.size4{font-size:.3215434084em}.katex .fontsize-ensurer.reset-size11.size5,.katex .katex-sizing.reset-size11.size5{font-size:.3617363344em}.katex .fontsize-ensurer.reset-size11.size6,.katex .katex-sizing.reset-size11.size6{font-size:.4019292605em}.katex .fontsize-ensurer.reset-size11.size7,.katex .katex-sizing.reset-size11.size7{font-size:.4823151125em}.katex .fontsize-ensurer.reset-size11.size8,.katex .katex-sizing.reset-size11.size8{font-size:.578778135em}.katex .fontsize-ensurer.reset-size11.size9,.katex .katex-sizing.reset-size11.size9{font-size:.6945337621em}.katex .fontsize-ensurer.reset-size11.size10,.katex .katex-sizing.reset-size11.size10{font-size:.8336012862em}.katex .fontsize-ensurer.reset-size11.size11,.katex .katex-sizing.reset-size11.size11{font-size:1em}.katex .delimsizing.size1{font-family:KaTeX_Size1}.katex .delimsizing.size2{font-family:KaTeX_Size2}.katex .delimsizing.size3{font-family:KaTeX_Size3}.katex .delimsizing.size4{font-family:KaTeX_Size4}.katex .delimsizing.mult .delim-size1>span{font-family:KaTeX_Size1}.katex .delimsizing.mult .delim-size4>span{font-family:KaTeX_Size4}.katex .nulldelimiter{display:inline-block;width:.12em}.katex .delimcenter,.katex .op-symbol{position:relative}.katex .op-symbol.small-op{font-family:KaTeX_Size1}.katex .op-symbol.large-op{font-family:KaTeX_Size2}.katex .katex-accent>.vlist-t,.katex .op-limits>.vlist-t{text-align:center}.katex .katex-accent .accent-body{position:relative}.katex .katex-accent .accent-body:not(.accent-full){width:0}.katex .katex-overlay{display:block}.katex .mtable .vertical-separator{display:inline-block;min-width:1px}.katex .mtable .arraycolsep{display:inline-block}.katex .mtable .col-align-c>.vlist-t{text-align:center}.katex .mtable .col-align-l>.vlist-t{text-align:left}.katex .mtable .col-align-r>.vlist-t{text-align:right}.katex .svg-align{text-align:left}.katex svg{fill:currentColor;stroke:currentColor;display:block;height:inherit;position:absolute;width:100%}.katex svg path{stroke:none}.katex svg{fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1}.katex img{border-style:none;max-height:none;max-width:none;min-height:0;min-width:0}.katex .katex-stretchy{display:block;overflow:hidden;position:relative;width:100%}.katex .katex-stretchy:after,.katex .katex-stretchy:before{content:""}.katex .hide-tail{overflow:hidden;position:relative;width:100%}.katex .halfarrow-left{left:0;overflow:hidden;position:absolute;width:50.2%}.katex .halfarrow-right{overflow:hidden;position:absolute;right:0;width:50.2%}.katex .brace-left{left:0;overflow:hidden;position:absolute;width:25.1%}.katex .brace-center{left:25%;overflow:hidden;position:absolute;width:50%}.katex .brace-right{overflow:hidden;position:absolute;right:0;width:25.1%}.katex .x-arrow-pad{padding:0 .5em}.katex .cd-arrow-pad{padding:0 .55556em 0 .27778em}.katex .mover,.katex .munder,.katex .x-arrow{text-align:center}.katex .boxpad{padding:0 .3em}.katex .fbox,.katex .fcolorbox{border:.04em solid;box-sizing:border-box}.katex .cancel-pad{padding:0 .2em}.katex .cancel-lap{margin-left:-.2em;margin-right:-.2em}.katex .katex-sout{border-bottom-style:solid;border-bottom-width:.08em}.katex .angl{border-right:.049em solid;border-top:.049em solid;box-sizing:border-box;margin-right:.03889em}.katex .anglpad{padding:0 .03889em}.katex .reflectbox{display:inline-block;transform:scaleX(-1)}.katex .eqn-num:before{content:"(" counter(katexEqnNo) ")";counter-increment:katexEqnNo}.katex .mml-eqn-num:before{content:"(" counter(mmlEqnNo) ")";counter-increment:mmlEqnNo}.katex .mtr-glue{width:50%}.katex .cd-vert-arrow{display:inline-block;position:relative}.katex .cd-label-left{display:inline-block;position:absolute;right:calc(50% + .3em);text-align:left}.katex .cd-label-right{display:inline-block;left:calc(50% + .3em);position:absolute;text-align:right}.katex-display{display:block;margin:1em 0;text-align:center}.katex-display>.katex{display:block;text-align:center;white-space:nowrap}.katex-display>.katex>.katex-html{display:block;position:relative}.katex-display>.katex>.katex-html>.katex-tag{position:absolute;right:0}.katex-display.leqno>.katex>.katex-html>.katex-tag{left:0;right:auto}.katex-display.fleqn>.katex{padding-left:2em;text-align:left}body{counter-reset:katexEqnNo mmlEqnNo}
</style>
  <style data-inlined="/inexplicable-phenomena/sheets/f22699cbda8a.css">.ldScnz .pa-list{counter-reset:list-item;}/*!sc*/
.ldScnz .pa-item{display:list-item;list-style:disc inside;}/*!sc*/
.ldScnz .pa-ordered .pa-item{list-style-type:decimal;}/*!sc*/
data-styled.g12[id="sc-kEqYZi"]{content:"ldScnz,"}/*!sc*/
.ilUBoY .pa-page:not(.pa-open){display:none;}/*!sc*/
data-styled.g17[id="sc-kslsaH"]{content:"ilUBoY,"}/*!sc*/
.beYWyS{font-family:Georgia,'Times New Roman',serif;font-size:1.0625rem;line-height:1.6;color:#1b1b1b;background:#ffffff;max-width:40rem;margin-inline:auto;padding:1.25rem;}/*!sc*/
.beYWyS .pd-book{margin-block:calc(2 * 1.25rem) 1.25rem;counter-reset:chapter equation;}/*!sc*/
.beYWyS .pd-chapter{margin-block:1.25rem;scroll-margin-block-start:1.25rem;}/*!sc*/
.beYWyS .pa-page.pa-open{margin-block-start:calc(1.25rem / 2);}/*!sc*/
.beYWyS .pd-section{margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-paragraph{margin-block:1.25rem;}/*!sc*/
.beYWyS .pa-item{margin-block:calc(1.25rem / 4);}/*!sc*/
.beYWyS .pa-list .pa-item{list-style-position:outside;margin-inline-start:1.2em;}/*!sc*/
.beYWyS .pd-title{font-size:calc(1.5 * 1.0625rem);font-weight:bold;margin-block-end:1.25rem;}/*!sc*/
.beYWyS .pd-heading{font-weight:bold;font-size:calc(1.15 * 1.0625rem);margin-block:1.25rem 0;}/*!sc*/
.beYWyS .pd-section>.pd-heading{margin-block-start:0;}/*!sc*/
.beYWyS .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)){display:none;}/*!sc*/
.beYWyS .pd-line{white-space:pre-wrap;}/*!sc*/
.beYWyS .pd-word{overflow-wrap:break-word;}/*!sc*/
.beYWyS .pd-canonical.pd-chapter{counter-increment:chapter;}/*!sc*/
.beYWyS .pd-chapter .pd-title::before{display:block;margin-block-end:calc(1.25rem / 4);}/*!sc*/
.beYWyS .pd-canonical.pd-chapter .pd-title::before{content:'Chapter ' counter(chapter);}/*!sc*/
.beYWyS .pd-label,.beYWyS .pd-chapter .pd-title::before{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}/*!sc*/
.beYWyS .pa-reference{color:#1f4e79;text-decoration-color:#1f4e79;text-underline-offset:0.15em;}/*!sc*/
.beYWyS .pa-self-reference{color:inherit;text-decoration:none;}/*!sc*/
.beYWyS .pa-referent{scroll-margin-block-start:1.25rem;}/*!sc*/
.beYWyS .pa-content{color:#1f4e79;}/*!sc*/
.beYWyS .pd-running-head{font-size:calc(0.7 * 1.0625rem);letter-spacing:0.08em;text-transform:uppercase;margin-block:0 calc(1.25rem / 2);padding-block-end:calc(1.25rem / 4);border-block-end:1px solid color-mix(in srgb, #1b1b1b 30%, #ffffff);}/*!sc*/
.beYWyS .pd-running-head a{text-decoration:none;color:color-mix(in srgb, #1b1b1b 70%, #ffffff);}/*!sc*/
.beYWyS .pd-running-head a:hover{color:#1b1b1b;}/*!sc*/
.beYWyS .pd-running-head .pd-square{margin-inline-start:0.6em;}/*!sc*/
.beYWyS .pd-running-head .pd-book-title[data-to="cover"]{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"]{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"]{display:inline;}/*!sc*/
.beYWyS .pd-figure{max-width:100%;}/*!sc*/
.beYWyS .pd-code{font-family:ui-monospace,monospace;font-size:calc(0.85 * 1.0625rem);line-height:1.5;white-space:pre;overflow-x:auto;margin-block:1.25rem;padding:calc(0.75 * 1.25rem) 1.25rem;border-inline-start:2px solid color-mix(in srgb, #1b1b1b 25%, #ffffff);}/*!sc*/
.beYWyS .pd-code-line::before{content:attr(data-line);display:inline-block;width:3ch;margin-inline-end:1.5ch;text-align:end;opacity:0.4;user-select:none;}/*!sc*/
.beYWyS .pd-image img,.beYWyS .pd-svg svg{display:block;max-width:100%;height:auto;margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-document object{display:block;width:100%;aspect-ratio:1/1.4142;margin-block:1.25rem;}/*!sc*/
.beYWyS .pd-math,.beYWyS .pd-date{white-space:nowrap;}/*!sc*/
.beYWyS .pd-equation{position:relative;counter-increment:equation;}/*!sc*/
.beYWyS .pd-equation::after{content:'(' counter(equation) ')';position:absolute;inset-inline-end:0;top:50%;transform:translateY(-50%);}/*!sc*/
.beYWyS .pd-front{display:none;}/*!sc*/
.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-front{display:flex;}/*!sc*/
.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-running-head,.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-byline,.beYWyS .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open{display:none;}/*!sc*/
.beYWyS .pd-front{--front-width:min(calc((100vh - 7 * 1.25rem) * 2 / 3), calc(min(40rem, 100vw) - 2 * 1.25rem));position:relative;box-sizing:border-box;width:var(--front-width);font-size:calc(var(--front-width) / 22);flex-direction:column;align-items:center;text-align:center;aspect-ratio:2/3;margin:0 auto calc(2 * 1.25rem);padding:3em 2em 1.75em;border:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);box-shadow:inset 0 0 0 .375em #ffffff,inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, #1b1b1b 35%, #ffffff),2px 12px 28px -12px rgba(0, 0, 0, .45);background:#ffffff;}/*!sc*/
.beYWyS .pd-front::before{content:'';position:absolute;inset:0 auto 0 0;width:1.25em;background:linear-gradient(to right, color-mix(in srgb, #1b1b1b 22%, transparent), color-mix(in srgb, #1b1b1b 5%, transparent) 55%, transparent);z-index:1;pointer-events:none;}/*!sc*/
.beYWyS .pd-front>a,.beYWyS .pd-front .pd-word{display:block;}/*!sc*/
.beYWyS .pd-front .pa-reference{color:inherit;text-decoration:none;}/*!sc*/
.beYWyS .pd-front a:hover .pd-word{text-decoration:underline;text-underline-offset:0.15em;}/*!sc*/
.beYWyS .pd-front-name{font-size:2.4em;line-height:1.1;font-weight:bold;margin-block:.15em .33em;}/*!sc*/
.beYWyS .pd-front-name::after{content:'';display:block;width:1.45em;border-top:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);margin:.375em auto 0;}/*!sc*/
.beYWyS .pd-front-author{font-size:1.15em;letter-spacing:.04em;}/*!sc*/
.beYWyS .pd-front-tagline{font-style:italic;opacity:.75;margin-top:1.15em;font-size:.95em;}/*!sc*/
.beYWyS .pd-front>:nth-last-child(2){margin-top:auto;}/*!sc*/
.beYWyS .pd-front-imprint{font-size:.74em;letter-spacing:.15em;text-transform:uppercase;opacity:.65;margin-top:.47em;}/*!sc*/
.beYWyS .pa-page.pa-open{animation:come .5s ease;}/*!sc*/
@keyframes come{from{opacity:0;transform:translateY(1rem);}to{opacity:1;transform:none;}}/*!sc*/
.beYWyS .pd-plate{float:inline-start;width:11rem;margin:.25rem 1.5rem 1rem 0;}/*!sc*/
.beYWyS .pd-plate .pd-image img{margin-block:0;border:1px solid color-mix(in srgb, #1b1b1b 20%, #ffffff);box-shadow:0 1px 3px rgba(0, 0, 0, .12);}/*!sc*/
.beYWyS .pd-plate .pa-opening{text-decoration:none;color:inherit;}/*!sc*/
.beYWyS .pd-plate .pa-opening .pd-word{display:block;font-size:.8rem;margin-top:.4rem;opacity:.75;text-decoration:underline;}/*!sc*/
.beYWyS .pd-chapter:has(> .pd-paragraph > .pd-plate)>.pd-paragraph:first-child{margin-block:0;}/*!sc*/
@media (max-width: 640px){.beYWyS .pd-plate{width:7rem;margin-right:1rem;}}/*!sc*/
.beYWyS .pd-navigation{display:flex;justify-content:center;align-items:baseline;gap:.15em;margin-block:calc(1.25rem / 2);}/*!sc*/
.beYWyS *:has(> .pd-navigation:first-child){position:relative;}/*!sc*/
.beYWyS .pd-navigation:first-child{position:absolute;inset-block-start:.1rem;inset-inline-end:0;margin-block:0;z-index:2;}/*!sc*/
.beYWyS .pd-navigation a{text-decoration:none;}/*!sc*/
.beYWyS .pd-navigation .pd-word{font-size:1.0625rem;line-height:1;color:color-mix(in srgb, #1b1b1b 55%, #ffffff);transition:color .15s ease;}/*!sc*/
.beYWyS .pd-navigation a:hover .pd-word{color:#1b1b1b;}/*!sc*/
.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)){pointer-events:none;}/*!sc*/
.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word{color:color-mix(in srgb, #1b1b1b 22%, #ffffff);}/*!sc*/
data-styled.g18[id="sc-hBMXrk"]{content:"beYWyS,"}/*!sc*/
.hKvrQA .pd-chapter.pa-cover{margin-block:1.25rem calc(2 * 1.25rem);}/*!sc*/
.hKvrQA .pa-cover .pd-title{margin-block:0;font-size:calc(2.25 * 1.0625rem);line-height:1.2;}/*!sc*/
.hKvrQA .pa-cover .pd-title::before{content:'Cover';}/*!sc*/
.hKvrQA .pa-biography .pd-title::before{content:'Biography';}/*!sc*/
.hKvrQA .pa-autobiography .pd-title::before{content:'Autobiography';}/*!sc*/
data-styled.g20[id="sc-fFSRQT"]{content:"hKvrQA,"}/*!sc*/
.clPWRv .pa-synopsis .pd-title::before{content:'Synopsis';}/*!sc*/
data-styled.g21[id="sc-bkbknG"]{content:"clPWRv,"}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-paragraph{margin-block:calc(1.25rem / 4);}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-title::before{content:'Table of Contents';}/*!sc*/
.fpvZNQ .pa-table-of-contents .pd-heading{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}/*!sc*/
data-styled.g23[id="sc-dIvsxA"]{content:"fpvZNQ,"}/*!sc*/
.gAJIDt:not(:has(.pa-page.pa-open)){display:none;}/*!sc*/
data-styled.g26[id="sc-kfYpvV"]{content:"gAJIDt,"}/*!sc*/
</style>
  
  <style>.pa-arriving .pd-pages{visibility:hidden}</style>
  <style data-styled="active" data-styled-version="6.4.0">.ldScnz .pa-list{counter-reset:list-item;}.ldScnz .pa-item{display:list-item;list-style:disc inside;}.ldScnz .pa-ordered .pa-item{list-style-type:decimal;}.ilUBoY .pa-page:not(.pa-open){display:none;}.beYWyS{font-family:Georgia,'Times New Roman',serif;font-size:1.0625rem;line-height:1.6;color:#1b1b1b;background:#ffffff;max-width:40rem;margin-inline:auto;padding:1.25rem;}.beYWyS .pd-book{margin-block:calc(2 * 1.25rem) 1.25rem;counter-reset:chapter equation;}.beYWyS .pd-chapter{margin-block:1.25rem;scroll-margin-block-start:1.25rem;}.beYWyS .pa-page.pa-open{margin-block-start:calc(1.25rem / 2);}.beYWyS .pd-section{margin-block:1.25rem;}.beYWyS .pd-paragraph{margin-block:1.25rem;}.beYWyS .pa-item{margin-block:calc(1.25rem / 4);}.beYWyS .pa-list .pa-item{list-style-position:outside;margin-inline-start:1.2em;}.beYWyS .pd-title{font-size:calc(1.5 * 1.0625rem);font-weight:bold;margin-block-end:1.25rem;}.beYWyS .pd-heading{font-weight:bold;font-size:calc(1.15 * 1.0625rem);margin-block:1.25rem 0;}.beYWyS .pd-section>.pd-heading{margin-block-start:0;}.beYWyS .pd-section:not(:has(.pd-paragraph:not(.pa-parenthetical))):not(:has(.pd-figure)){display:none;}.beYWyS .pd-line{white-space:pre-wrap;}.beYWyS .pd-word{overflow-wrap:break-word;}.beYWyS .pd-canonical.pd-chapter{counter-increment:chapter;}.beYWyS .pd-chapter .pd-title::before{display:block;margin-block-end:calc(1.25rem / 4);}.beYWyS .pd-canonical.pd-chapter .pd-title::before{content:'Chapter ' counter(chapter);}.beYWyS .pd-label,.beYWyS .pd-chapter .pd-title::before{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}.beYWyS .pa-reference{color:#1f4e79;text-decoration-color:#1f4e79;text-underline-offset:0.15em;}.beYWyS .pa-self-reference{color:inherit;text-decoration:none;}.beYWyS .pa-referent{scroll-margin-block-start:1.25rem;}.beYWyS .pa-content{color:#1f4e79;}.beYWyS .pd-running-head{font-size:calc(0.7 * 1.0625rem);letter-spacing:0.08em;text-transform:uppercase;margin-block:0 calc(1.25rem / 2);padding-block-end:calc(1.25rem / 4);border-block-end:1px solid color-mix(in srgb, #1b1b1b 30%, #ffffff);}.beYWyS .pd-running-head a{text-decoration:none;color:color-mix(in srgb, #1b1b1b 70%, #ffffff);}.beYWyS .pd-running-head a:hover{color:#1b1b1b;}.beYWyS .pd-running-head .pd-square{margin-inline-start:0.6em;}.beYWyS .pd-running-head .pd-book-title[data-to="cover"]{display:none;}.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="table"]{display:none;}.beYWyS .pd-book:has(.pa-table-of-contents.pa-open) .pd-running-head .pd-book-title[data-to="cover"]{display:inline;}.beYWyS .pd-figure{max-width:100%;}.beYWyS .pd-code{font-family:ui-monospace,monospace;font-size:calc(0.85 * 1.0625rem);line-height:1.5;white-space:pre;overflow-x:auto;margin-block:1.25rem;padding:calc(0.75 * 1.25rem) 1.25rem;border-inline-start:2px solid color-mix(in srgb, #1b1b1b 25%, #ffffff);}.beYWyS .pd-code-line::before{content:attr(data-line);display:inline-block;width:3ch;margin-inline-end:1.5ch;text-align:end;opacity:0.4;user-select:none;}.beYWyS .pd-image img,.beYWyS .pd-svg svg{display:block;max-width:100%;height:auto;margin-block:1.25rem;}.beYWyS .pd-document object{display:block;width:100%;aspect-ratio:1/1.4142;margin-block:1.25rem;}.beYWyS .pd-math,.beYWyS .pd-date{white-space:nowrap;}.beYWyS .pd-equation{position:relative;counter-increment:equation;}.beYWyS .pd-equation::after{content:'(' counter(equation) ')';position:absolute;inset-inline-end:0;top:50%;transform:translateY(-50%);}.beYWyS .pd-front{display:none;}.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-front{display:flex;}.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-running-head,.beYWyS .pd-book:has(.pa-cover.pa-open) .pd-byline,.beYWyS .pd-book:has(.pa-cover.pa-open) .pa-cover.pa-open{display:none;}.beYWyS .pd-front{--front-width:min(calc((100vh - 7 * 1.25rem) * 2 / 3), calc(min(40rem, 100vw) - 2 * 1.25rem));position:relative;box-sizing:border-box;width:var(--front-width);font-size:calc(var(--front-width) / 22);flex-direction:column;align-items:center;text-align:center;aspect-ratio:2/3;margin:0 auto calc(2 * 1.25rem);padding:3em 2em 1.75em;border:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);box-shadow:inset 0 0 0 .375em #ffffff,inset 0 0 0 calc(.375em + 1px) color-mix(in srgb, #1b1b1b 35%, #ffffff),2px 12px 28px -12px rgba(0, 0, 0, .45);background:#ffffff;}.beYWyS .pd-front::before{content:'';position:absolute;inset:0 auto 0 0;width:1.25em;background:linear-gradient(to right, color-mix(in srgb, #1b1b1b 22%, transparent), color-mix(in srgb, #1b1b1b 5%, transparent) 55%, transparent);z-index:1;pointer-events:none;}.beYWyS .pd-front>a,.beYWyS .pd-front .pd-word{display:block;}.beYWyS .pd-front .pa-reference{color:inherit;text-decoration:none;}.beYWyS .pd-front a:hover .pd-word{text-decoration:underline;text-underline-offset:0.15em;}.beYWyS .pd-front-name{font-size:2.4em;line-height:1.1;font-weight:bold;margin-block:.15em .33em;}.beYWyS .pd-front-name::after{content:'';display:block;width:1.45em;border-top:1px solid color-mix(in srgb, #1b1b1b 50%, #ffffff);margin:.375em auto 0;}.beYWyS .pd-front-author{font-size:1.15em;letter-spacing:.04em;}.beYWyS .pd-front-tagline{font-style:italic;opacity:.75;margin-top:1.15em;font-size:.95em;}.beYWyS .pd-front>:nth-last-child(2){margin-top:auto;}.beYWyS .pd-front-imprint{font-size:.74em;letter-spacing:.15em;text-transform:uppercase;opacity:.65;margin-top:.47em;}.beYWyS .pa-page.pa-open{animation:come .5s ease;}@keyframes come{from{opacity:0;transform:translateY(1rem);}to{opacity:1;transform:none;}}.beYWyS .pd-plate{float:inline-start;width:11rem;margin:.25rem 1.5rem 1rem 0;}.beYWyS .pd-plate .pd-image img{margin-block:0;border:1px solid color-mix(in srgb, #1b1b1b 20%, #ffffff);box-shadow:0 1px 3px rgba(0, 0, 0, .12);}.beYWyS .pd-plate .pa-opening{text-decoration:none;color:inherit;}.beYWyS .pd-plate .pa-opening .pd-word{display:block;font-size:.8rem;margin-top:.4rem;opacity:.75;text-decoration:underline;}.beYWyS .pd-chapter:has(> .pd-paragraph > .pd-plate)>.pd-paragraph:first-child{margin-block:0;}@media (max-width: 640px){.beYWyS .pd-plate{width:7rem;margin-right:1rem;}}.beYWyS .pd-navigation{display:flex;justify-content:center;align-items:baseline;gap:.15em;margin-block:calc(1.25rem / 2);}.beYWyS *:has(> .pd-navigation:first-child){position:relative;}.beYWyS .pd-navigation:first-child{position:absolute;inset-block-start:.1rem;inset-inline-end:0;margin-block:0;z-index:2;}.beYWyS .pd-navigation a{text-decoration:none;}.beYWyS .pd-navigation .pd-word{font-size:1.0625rem;line-height:1;color:color-mix(in srgb, #1b1b1b 55%, #ffffff);transition:color .15s ease;}.beYWyS .pd-navigation a:hover .pd-word{color:#1b1b1b;}.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)){pointer-events:none;}.beYWyS .pd-navigation :is(a.pa-self-reference, a:has(.pa-self-reference)) .pd-word{color:color-mix(in srgb, #1b1b1b 22%, #ffffff);}.hKvrQA .pd-chapter.pa-cover{margin-block:1.25rem calc(2 * 1.25rem);}.hKvrQA .pa-cover .pd-title{margin-block:0;font-size:calc(2.25 * 1.0625rem);line-height:1.2;}.hKvrQA .pa-cover .pd-title::before{content:'Cover';}.hKvrQA .pa-biography .pd-title::before{content:'Biography';}.hKvrQA .pa-autobiography .pd-title::before{content:'Autobiography';}.clPWRv .pa-synopsis .pd-title::before{content:'Synopsis';}.fpvZNQ .pa-table-of-contents .pd-paragraph{margin-block:calc(1.25rem / 4);}.fpvZNQ .pa-table-of-contents .pd-title::before{content:'Table of Contents';}.fpvZNQ .pa-table-of-contents .pd-heading{font-size:calc(0.7 * 1.0625rem);font-weight:normal;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;}.gAJIDt:not(:has(.pa-page.pa-open)){display:none;}</style><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</head>
  <body>
    <div id="root"><!--$--><div class="sc-hBMXrk beYWyS pd-container"><div class="sc-kslsaH ilUBoY pd-container"><div class="pd-book pa-paginated"><div class="pd-paragraph pd-running-head"><span class="pd-book-title" data-to="table"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Subjective Reference</span></a></span><span class="pd-book-title" data-to="cover"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Subjective Reference</span></a></span><span class="pd-square"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a></span></div><div class="pd-paragraph pd-front"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-name pa-reference">Subjective Reference</span></a><a href="/inexplicable-phenomena/our-team/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-author pa-reference">Doug</span></a><span class="pd-word pd-front-tagline">The least a library needs to bind.</span><a href="/inexplicable-phenomena/our-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-front-imprint pa-reference">Inexplicable Phenomena</span></a><span class="pd-word pd-front-imprint"><a href="/inexplicable-phenomena/our-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Inexplicable Phenomena</span></a></span></div><header class="sc-fFSRQT hKvrQA pd-container"><div class="pd-chapter pa-page pa-cover"><a href="/inexplicable-phenomena/our-reference/" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="subjective-reference" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">Subjective Reference</div></a></div></header><div class="sc-bkbknG clPWRv pd-container"><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><span class="pd-chapter pa-page pa-navigated pa-parenthetical pa-synopsis" hidden=""></span><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div></div><nav class="sc-dIvsxA fpvZNQ pd-container"><div class="pd-chapter pa-page pa-table-of-contents"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span id="table-of-contents" class="pd-sentence pd-title pa-parenthetical pa-reference pa-self-reference pa-referent" hidden=""></span></a><div class="pd-section"><a href="#contents" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="contents" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">Contents</div></a><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Book</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Theme</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Running Head and the Byline</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Faces</span></div></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">Developing the Library</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Paper</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Reference Manual</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Specification</span></div></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-dIrNh pa-reference pd-container"><div class="pd-paragraph pa-reference"><span class="sc-bqGEVu pa-content">The Content</span></div></a><span class="pd-paragraph pa-parenthetical" hidden=""></span></div></div></nav><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-book" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Book</div></a><div class="pd-section"><a href="#what-a-book-is-here" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="what-a-book-is-here" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">What a book is here</div></a><div class="pd-paragraph">Every book in this library extends the library's own, so what a book is here is decided once and a change to it reaches all of them. The book class is the layout: the running head, the byline drawn from what the book's cover says, then the chapters. Its file is where the library's theme is registered, once, on the class every book extends. A cover's route opens at the top of the page; every other bookmark turns as the framework does.</div><div class="pd-paragraph">The class stands beside this chapter as its code, borrowed on 2026-10-30 from the binder's own test library, whose manual the team wrote, and to be rebuilt from here by sketches rather than kept. The theme it registers is <a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Theme</span></a>; the running head and the byline it draws are <a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Running Head and the Byline</span></a>.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $ } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Book, $Chapter, $Cover, $TableOfContents, <span class="hljs-title class_">Paginated</span>, <span class="hljs-title class_">Theme</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">LibraryTheme</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./2-the-theme~code.tsx'</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">RunningHead</span> <span class="hljs-keyword">as</span> runningHead } <span class="hljs-keyword">from</span> <span class="hljs-string">'./3-the-running-head-and-the-byline~code.tsx'</span>;
<span class="hljs-keyword">import</span> { $Navigation, <span class="hljs-title class_">Front</span> <span class="hljs-keyword">as</span> front, <span class="hljs-title class_">Navigated</span> <span class="hljs-keyword">as</span> navigated } <span class="hljs-keyword">from</span> <span class="hljs-string">'./4-the-faces~code.tsx'</span>;

<span class="hljs-comment">// THE HEADING IS MINIMAL AND THE BYLINE IS NOT DRAWN, Doug, 2026-11-16: first "Why does every chapter need a</span>
<span class="hljs-comment">// title and author?!?", then "what happened to a minimal heading, at least with the book title" — the running</span>
<span class="hljs-comment">// head is the book's title alone, a way to the table and, from the table, to the cover; the author lives on the</span>
<span class="hljs-comment">// front and in the table of contents.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$TheLibrary</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Book</span> {
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">RunningHead</span> = $(runningHead);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Front</span> = $(front);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">RunningHead</span> <span class="hljs-attr">chapter</span>=<span class="hljs-string">{this.cover}</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Front</span> <span class="hljs-attr">chapter</span>=<span class="hljs-string">{this.cover}</span> /&gt;</span>
                {super.write()}
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }

    <span class="hljs-comment">// A PAGE OPENS AT ITS TOP, Doug, 2026-11-16: "We need pages to open at the top... not scrolled down" — a</span>
    <span class="hljs-comment">// turn lands on the page's top with the running head in view, never past it.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> <span class="hljs-title function_">turn</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">window</span>.<span class="hljs-title function_">scrollTo</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Paginated</span> /&gt;</span></span>
        );
    }

    <span class="hljs-comment">// EVERY CHAPTER BUT THE COVER IS NAVIGATED, said by the book at its bond and before the bond reaches the</span>
    <span class="hljs-comment">// chapters, so the lines the format holds are bound with them. The cover's page is the front; a chapter that</span>
    <span class="hljs-comment">// already says Navigation in its own text keeps its own. Doug, 2026-11-16: "You need next and table of</span>
    <span class="hljs-comment">// contents and previous on the top and bottom of every chapter in the library."</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Bound(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigated</span> = $(navigated);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> chapter <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">find</span>($Chapter)) {
            <span class="hljs-comment">// THE TABLE WEARS NO NAVIGATION, Doug, 2026-11-16, pressing the square and landing on the table's own</span>
            <span class="hljs-comment">// page: "WHAT IS THIS!!!" — the table of contents is the book's navigation and carries none of its own.</span>
            <span class="hljs-keyword">if</span> (chapter.<span class="hljs-title function_">is</span>($Cover) || chapter.<span class="hljs-title function_">is</span>($TableOfContents) || chapter.<span class="hljs-property">text</span>.<span class="hljs-title function_">find</span>($Navigation).<span class="hljs-property">length</span> &gt; <span class="hljs-number">0</span>) <span class="hljs-keyword">continue</span>;
            chapter.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigated</span> /&gt;</span></span>);
            chapter.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">define</span>();
        }
        <span class="hljs-variable language_">super</span>.$Bound();
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">TheLibrary</span> = $($TheLibrary);
$(<span class="hljs-title class_">TheLibrary</span>, <span class="hljs-title class_">Theme</span>)(<span class="hljs-title class_">LibraryTheme</span>);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-theme" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Theme</div></a><div class="pd-section"><a href="#the-values-and-the-parts" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-values-and-the-parts" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The values and the parts</div></a><div class="pd-paragraph">A theme is a set of values, the font, the measure, the ink, the paper, the link, and the parts that use them: the page, the levels of a book, the labels, the links, the apparatus and the figures. The file beside this chapter is the one the book registers. It is the test library's theme as borrowed, a serif on warm paper, and it stands only until the sketches say what this library's own looks like.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { css, <span class="hljs-title class_">RuleSet</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'styled-components'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Theme } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">'styled-components'</span> {
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> <span class="hljs-title class_">DefaultTheme</span> <span class="hljs-keyword">extends</span> $<span class="hljs-title class_">LibraryTheme</span> {}
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTheme</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Theme</span> {
    font = <span class="hljs-string">"Georgia, 'Times New Roman', serif"</span>;
    size = <span class="hljs-string">'1.0625rem'</span>;
    leading = <span class="hljs-string">'1.6'</span>;
    measure = <span class="hljs-string">'40rem'</span>;
    space = <span class="hljs-string">'1.25rem'</span>;
    ink = <span class="hljs-string">'#1b1b1b'</span>;
    paper = <span class="hljs-string">'#ffffff'</span>;
    link = <span class="hljs-string">'#1f4e79'</span>;
    <span class="hljs-attr">style</span>: <span class="hljs-title class_">ElementType</span> = selection.<span class="hljs-property">div</span><span class="hljs-string">\`<span class="hljs-subst">\${<span class="hljs-variable language_">this</span>.parts()}</span>\`</span>;

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">parts</span>(): <span class="hljs-title class_">RuleSet</span>[] {
        <span class="hljs-keyword">return</span> [<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">page</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">levels</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">labels</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">links</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">apparatus</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">figures</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">front</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">plate</span>(), <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">navigation</span>()];
    }

    <span class="hljs-comment">// THE NAVIGATION, one line of apparatus at the top and bottom of a chapter, drawn around the chapter by the book's</span>
    <span class="hljs-comment">// Navigated format: three glyphs, the arrow looking back on the left, the square for the table of contents in the</span>
    <span class="hljs-comment">// middle, the arrow looking on at the right, on Doug's "left arrow, square, right arrow for the next previous and</span>
    <span class="hljs-comment">// table. Visually engaging" (2026-11-16); a self edge, the first or the last chapter's, keeps its place unseen.</span>
    <span class="hljs-comment">// Doug, the same day: "We need to be able to move easily."</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">navigation</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-navigation</span> { <span class="hljs-attribute">display</span>: flex; <span class="hljs-attribute">justify-content</span>: center; <span class="hljs-attribute">align-items</span>: baseline; <span class="hljs-attribute">gap</span>: .<span class="hljs-number">15em</span>; <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>); }
            *<span class="hljs-selector-pseudo">:has</span>(&gt; <span class="hljs-selector-class">.pd-navigation</span><span class="hljs-selector-pseudo">:first-child</span>) { <span class="hljs-attribute">position</span>: relative; }
            <span class="hljs-selector-class">.pd-navigation</span><span class="hljs-selector-pseudo">:first-child</span> { <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset-block-start</span>: .<span class="hljs-number">1rem</span>; <span class="hljs-attribute">inset-inline-end</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">font-size</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">55%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">transition</span>: color .<span class="hljs-number">15s</span> ease; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-pseudo">:is</span>(<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.pa-self-reference</span>, <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-self-reference</span>)) { <span class="hljs-attribute">pointer-events</span>: none; }
            <span class="hljs-selector-class">.pd-navigation</span> <span class="hljs-selector-pseudo">:is</span>(<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.pa-self-reference</span>, <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-self-reference</span>)) <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">22%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); }
        \`</span>;
    }

    <span class="hljs-comment">// THE FRONT, the cover drawn as a book, Sprint 125: shown alone while the cover is the open page, the running</span>
    <span class="hljs-comment">// head, the byline and the cover chapter itself unseen then and back the moment another page opens; a page</span>
    <span class="hljs-comment">// that opens comes in with a short fade, the library's one transition. Sketch 004, form a.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">front</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attribute">display</span>: flex; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span>, <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-byline</span>, <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pa-cover</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-comment">/* THE BOARD FILLS THE SCREEN, Doug, 2026-11-17: "make the book bigger... as large as possible given
               that my screen looks like this" — the board stands as tall as the screen allows, the book's upper
               margin above it and the same air below, its width following at a book's proportion and capped at
               the column on a narrow screen; every length on the board is an em of the board's own size, one
               twenty-second of its width, the size the 22rem board of Sprint 125 was drawn at, so the type and the
               frame grow with it as a print enlarges. The seven spaces taken from the screen's height are the
               three above and the three below, and one for the page to breathe at the bottom without a scrollbar. */</span>
            <span class="hljs-selector-class">.pd-front</span> { <span class="hljs-attr">--front-width</span>: <span class="hljs-built_in">min</span>(<span class="hljs-built_in">calc</span>((<span class="hljs-number">100vh</span> - <span class="hljs-number">7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) * <span class="hljs-number">2</span> / <span class="hljs-number">3</span>), <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">min</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.measure}</span><span class="language-css">, <span class="hljs-number">100vw</span>) - <span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">)); <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">box-sizing</span>: border-box; <span class="hljs-attribute">width</span>: <span class="hljs-built_in">var</span>(--front-width); <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-built_in">var</span>(--front-width) / <span class="hljs-number">22</span>); <span class="hljs-attribute">flex-direction</span>: column; <span class="hljs-attribute">align-items</span>: center; <span class="hljs-attribute">text-align</span>: center; <span class="hljs-attribute">aspect-ratio</span>: <span class="hljs-number">2</span> / <span class="hljs-number">3</span>; <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto <span class="hljs-built_in">calc</span>(<span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">); <span class="hljs-attribute">padding</span>: <span class="hljs-number">3em</span> <span class="hljs-number">2em</span> <span class="hljs-number">1.75em</span>; <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">50%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> .<span class="hljs-number">375em</span> </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">, inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-built_in">calc</span>(.<span class="hljs-number">375em</span> + <span class="hljs-number">1px</span>) <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">35%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">), <span class="hljs-number">2px</span> <span class="hljs-number">12px</span> <span class="hljs-number">28px</span> -<span class="hljs-number">12px</span> <span class="hljs-built_in">rgba</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, .<span class="hljs-number">45</span>); <span class="hljs-attribute">background</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-front</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>; <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset</span>: <span class="hljs-number">0</span> auto <span class="hljs-number">0</span> <span class="hljs-number">0</span>; <span class="hljs-attribute">width</span>: <span class="hljs-number">1.25em</span>; <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">22%</span>, transparent), <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">5%</span>, transparent) <span class="hljs-number">55%</span>, transparent); <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">pointer-events</span>: none; }
            <span class="hljs-selector-class">.pd-front</span> &gt; <span class="hljs-selector-tag">a</span>, <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">display</span>: block; }
            <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-class">.pa-reference</span> { <span class="hljs-attribute">color</span>: inherit; <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pd-front</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">text-decoration</span>: underline; <span class="hljs-attribute">text-underline-offset</span>: <span class="hljs-number">0.15em</span>; }
            <span class="hljs-selector-class">.pd-front-name</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2.4em</span>; <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.1</span>; <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">margin-block</span>: .<span class="hljs-number">15em</span> .<span class="hljs-number">33em</span>; }
            <span class="hljs-selector-class">.pd-front-name</span><span class="hljs-selector-pseudo">::after</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>; <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">width</span>: <span class="hljs-number">1.45em</span>; <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">50%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">margin</span>: .<span class="hljs-number">375em</span> auto <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-front-author</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.15em</span>; <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">04em</span>; }
            <span class="hljs-selector-class">.pd-front-tagline</span> { <span class="hljs-attribute">font-style</span>: italic; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">75</span>; <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1.15em</span>; <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">95em</span>; }
            <span class="hljs-selector-class">.pd-front</span> &gt; <span class="hljs-selector-pseudo">:nth-last-child</span>(<span class="hljs-number">2</span>) { <span class="hljs-attribute">margin-top</span>: auto; }
            <span class="hljs-selector-class">.pd-front-imprint</span> { <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">74em</span>; <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">15em</span>; <span class="hljs-attribute">text-transform</span>: uppercase; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">65</span>; <span class="hljs-attribute">margin-top</span>: .<span class="hljs-number">47em</span>; }
            <span class="hljs-selector-class">.pa-page</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">animation</span>: come .<span class="hljs-number">5s</span> ease; }
            <span class="hljs-keyword">@keyframes</span> come { <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(<span class="hljs-number">1rem</span>); } <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>; <span class="hljs-attribute">transform</span>: none; } }
        \`</span>;
    }

    <span class="hljs-comment">// THE PLATE, a publication's small picture at the top left of its page with the text flowing under it, Sprint</span>
    <span class="hljs-comment">// 125; its opening carries no underline, the picture being the link. Sketch 002, form a.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">plate</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-plate</span> { <span class="hljs-attribute">float</span>: inline-start; <span class="hljs-attribute">width</span>: <span class="hljs-number">11rem</span>; <span class="hljs-attribute">margin</span>: .<span class="hljs-number">25rem</span> <span class="hljs-number">1.5rem</span> <span class="hljs-number">1rem</span> <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pd-image</span> <span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">20%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-built_in">rgba</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, .<span class="hljs-number">12</span>); }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pa-opening</span> { <span class="hljs-attribute">text-decoration</span>: none; <span class="hljs-attribute">color</span>: inherit; }
            <span class="hljs-selector-class">.pd-plate</span> <span class="hljs-selector-class">.pa-opening</span> <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">8rem</span>; <span class="hljs-attribute">margin-top</span>: .<span class="hljs-number">4rem</span>; <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">75</span>; <span class="hljs-attribute">text-decoration</span>: underline; }
            <span class="hljs-selector-class">.pd-chapter</span><span class="hljs-selector-pseudo">:has</span>(&gt; <span class="hljs-selector-class">.pd-paragraph</span> &gt; <span class="hljs-selector-class">.pd-plate</span>) &gt; <span class="hljs-selector-class">.pd-paragraph</span><span class="hljs-selector-pseudo">:first-child</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span>; }
            <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">max-width</span>: <span class="hljs-number">640px</span>) { <span class="hljs-selector-class">.pd-plate</span> { <span class="hljs-attribute">width</span>: <span class="hljs-number">7rem</span>; <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">1rem</span>; } }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">page</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-attribute">font-family</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span><span class="language-css">;
            <span class="hljs-attribute">font-size</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">;
            <span class="hljs-attribute">line-height</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.leading}</span><span class="language-css">;
            <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">;
            <span class="hljs-attribute">background</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">;
            <span class="hljs-attribute">max-width</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.measure}</span><span class="language-css">;
            <span class="hljs-attribute">margin-inline</span>: auto;
            <span class="hljs-attribute">padding</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">levels</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-comment">/* THE UPPER MARGIN STANDS EVERYWHERE, Doug, 2026-11-17: "No upper margin. That should be put back
               everywhere" — every page breathes above its first line. */</span>
            <span class="hljs-selector-class">.pd-book</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">2</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; <span class="hljs-attribute">counter-reset</span>: chapter equation; }
            <span class="hljs-selector-class">.pd-chapter</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; <span class="hljs-attribute">scroll-margin-block-start</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-page</span><span class="hljs-selector-class">.pa-open</span> { <span class="hljs-attribute">margin-block-start</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>); }
            <span class="hljs-comment">/* NO LINE BREAKS, Doug, 2026-11-16: "No line break", then "Still breaks EVERYWHERE!!!" — a section
               carries no rule and no extra padding anywhere in the library; margins alone separate. */</span>
            <span class="hljs-selector-class">.pd-section</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-paragraph</span> { <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-item</span> { <span class="hljs-attribute">margin-block</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>); }
            <span class="hljs-selector-class">.pa-list</span> <span class="hljs-selector-class">.pa-item</span> { <span class="hljs-attribute">list-style-position</span>: outside; <span class="hljs-attribute">margin-inline-start</span>: <span class="hljs-number">1.2em</span>; }
            <span class="hljs-selector-class">.pd-title</span> { <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">1.5</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">); <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">margin-block-end</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-heading</span> { <span class="hljs-attribute">font-weight</span>: bold; <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">1.15</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">); <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-section</span> &gt; <span class="hljs-selector-class">.pd-heading</span> { <span class="hljs-attribute">margin-block-start</span>: <span class="hljs-number">0</span>; }
            <span class="hljs-selector-class">.pd-section</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pd-paragraph</span><span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-class">.pa-parenthetical</span>)))<span class="hljs-selector-pseudo">:not</span>(<span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pd-figure</span>)) { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-line</span> { <span class="hljs-attribute">white-space</span>: pre-wrap; }
            <span class="hljs-selector-class">.pd-word</span> { <span class="hljs-attribute">overflow-wrap</span>: break-word; }
            <span class="hljs-selector-class">.pd-canonical</span><span class="hljs-selector-class">.pd-chapter</span> { <span class="hljs-attribute">counter-increment</span>: chapter; }
            <span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">margin-block-end</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>); }
            <span class="hljs-selector-class">.pd-canonical</span><span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">'Chapter '</span> <span class="hljs-built_in">counter</span>(chapter); }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">labels</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-label</span>, <span class="hljs-selector-class">.pd-chapter</span> <span class="hljs-selector-class">.pd-title</span><span class="hljs-selector-pseudo">::before</span> {
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">font-weight</span>: normal;
                <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.15em</span>;
                <span class="hljs-attribute">text-transform</span>: uppercase;
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.6</span>;
            }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">links</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pa-reference</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; <span class="hljs-attribute">text-decoration-color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; <span class="hljs-attribute">text-underline-offset</span>: <span class="hljs-number">0.15em</span>; }
            <span class="hljs-selector-class">.pa-self-reference</span> { <span class="hljs-attribute">color</span>: inherit; <span class="hljs-attribute">text-decoration</span>: none; }
            <span class="hljs-selector-class">.pa-referent</span> { <span class="hljs-attribute">scroll-margin-block-start</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pa-content</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span><span class="language-css">; }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">apparatus</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-comment">/* THE HEADER IS ONE COMPACT BAND, Doug, 2026-11-16: "You need to organize the header in the theme. It
               takes up too much space and isn't used. Look how far down the title of the chapter is. Wait are you
               making every chapter like a cover?!?" — the running head a bordered line with no paragraph margin, the
               byline one small line beneath it, author and subject side by side, not a title block of rows. */</span>
            <span class="hljs-selector-class">.pd-running-head</span> {
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.7</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0.08em</span>;
                <span class="hljs-attribute">text-transform</span>: uppercase;
                <span class="hljs-attribute">margin-block</span>: <span class="hljs-number">0</span> <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">2</span>);
                <span class="hljs-attribute">padding-block-end</span>: <span class="hljs-built_in">calc</span>(</span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css"> / <span class="hljs-number">4</span>);
                <span class="hljs-attribute">border-block-end</span>: <span class="hljs-number">1px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">30%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">);
            }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">text-decoration</span>: none; <span class="hljs-attribute">color</span>: <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">70%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">); }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> { <span class="hljs-attribute">color</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css">; }
            <span class="hljs-comment">/* ONE HEADER, EVERY PAGE, ITS TABLE-NESS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of
               contents doesn't have the little square. Why isn't it the same thing as the others? Table of contents
               can be an attribute to capture polymorphism." — the same running head stands on every page, the square
               to the cover everywhere, the table's page included; only the title's destination flips, keyed here
               alone on the open table and the title's own data-to attribute. */</span>
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-square</span> { <span class="hljs-attribute">margin-inline-start</span>: <span class="hljs-number">0.6em</span>; }
            <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"cover"</span>]</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-table-of-contents</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"table"</span>]</span> { <span class="hljs-attribute">display</span>: none; }
            <span class="hljs-selector-class">.pd-book</span><span class="hljs-selector-pseudo">:has</span>(<span class="hljs-selector-class">.pa-table-of-contents</span><span class="hljs-selector-class">.pa-open</span>) <span class="hljs-selector-class">.pd-running-head</span> <span class="hljs-selector-class">.pd-book-title</span><span class="hljs-selector-attr">[data-to=<span class="hljs-string">"cover"</span>]</span> { <span class="hljs-attribute">display</span>: inline; }
        \`</span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-title function_">figures</span>(): <span class="hljs-title class_">RuleSet</span> {
        <span class="hljs-keyword">return</span> css\`<span class="language-css">
            <span class="hljs-selector-class">.pd-figure</span> { <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>; }
            <span class="hljs-selector-class">.pd-code</span> {
                <span class="hljs-attribute">font-family</span>: ui-monospace, monospace;
                <span class="hljs-attribute">font-size</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.85</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span><span class="language-css">);
                <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.5</span>;
                <span class="hljs-attribute">white-space</span>: pre;
                <span class="hljs-attribute">overflow-x</span>: auto;
                <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
                <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">calc</span>(<span class="hljs-number">0.75</span> * </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">) </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">;
                <span class="hljs-attribute">border-inline-start</span>: <span class="hljs-number">2px</span> solid <span class="hljs-built_in">color-mix</span>(in srgb, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span><span class="language-css"> <span class="hljs-number">25%</span>, </span><span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span><span class="language-css">);
            }
            <span class="hljs-selector-class">.pd-code-line</span><span class="hljs-selector-pseudo">::before</span> { <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(data-line); <span class="hljs-attribute">display</span>: inline-block; <span class="hljs-attribute">width</span>: <span class="hljs-number">3ch</span>; <span class="hljs-attribute">margin-inline-end</span>: <span class="hljs-number">1.5ch</span>; <span class="hljs-attribute">text-align</span>: end; <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.4</span>; <span class="hljs-attribute">user-select</span>: none; }
            <span class="hljs-selector-class">.pd-image</span> <span class="hljs-selector-tag">img</span>, <span class="hljs-selector-class">.pd-svg</span> <span class="hljs-selector-tag">svg</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">height</span>: auto; <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-document</span> <span class="hljs-selector-tag">object</span> { <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">aspect-ratio</span>: <span class="hljs-number">1</span> / <span class="hljs-number">1.4142</span>; <span class="hljs-attribute">margin-block</span>: </span><span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span><span class="language-css">; }
            <span class="hljs-selector-class">.pd-math</span>, <span class="hljs-selector-class">.pd-date</span> { <span class="hljs-attribute">white-space</span>: nowrap; }
            <span class="hljs-selector-class">.pd-equation</span> { <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">counter-increment</span>: equation; }
            <span class="hljs-selector-class">.pd-equation</span><span class="hljs-selector-pseudo">::after</span> { <span class="hljs-attribute">content</span>: <span class="hljs-string">'('</span> <span class="hljs-built_in">counter</span>(equation) <span class="hljs-string">')'</span>; <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">inset-inline-end</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>; <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-<span class="hljs-number">50%</span>); }
        \`</span>;
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">LibraryTheme</span> = $($LibraryTheme);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-book" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-running-head-and-the-byline" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Running Head and the Byline</div></a><div class="pd-section"><a href="#what-a-cover-exposes" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="what-a-cover-exposes" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">What a cover exposes</div></a><div class="pd-paragraph">The running head is the book's title alone, the minimal heading in the page's top margin, ruled 16 November 2026: pressed, it opens the table of contents — except on the table itself, where it opens the cover. The byline — who wrote the book, what it is about when the book is a subject's own, and its subject — is no longer drawn above the chapters; it lives on the front and in the table of contents. Both are read from the cover and nowhere else; neither is written in a chapter. A subject is a book made one by its About, so the four books whose subject is Mathematics resolve to the book that is about it. The file beside this chapter is both faces, borrowed from the test library.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $ } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Paragraph, $Word, <span class="hljs-title class_">Reference</span> <span class="hljs-keyword">as</span> reference, <span class="hljs-title class_">Word</span> <span class="hljs-keyword">as</span> word } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$RunningHead</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-running-head'</span>);
    }

    <span class="hljs-comment">// THE MINIMAL HEADING, Doug, 2026-11-16: "a minimal heading, at least with the book title and if you click it</span>
    <span class="hljs-comment">// it should go to the table of contents except the version on the table and that one takes you to the cover" —</span>
    <span class="hljs-comment">// just the book's title, both destinations bound, the theme showing the one the open page calls for.</span>
    <span class="hljs-comment">// THE TABLE-NESS IS AN ATTRIBUTE, Doug, 2026-11-16: "I notice that your table of contents doesn't have the</span>
    <span class="hljs-comment">// little square. Why isn't it the same thing as the others? Table of contents can be an attribute to capture</span>
    <span class="hljs-comment">// polymorphism." — one running head on every page: the title written twice, its destination carried by its</span>
    <span class="hljs-comment">// own data-to attribute and chosen by the theme in one place; the square to the cover always, the table's</span>
    <span class="hljs-comment">// page like any other.</span>
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-book-title"</span> <span class="hljs-attr">data-to</span>=<span class="hljs-string">"table"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.title?.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-book-title"</span> <span class="hljs-attr">data-to</span>=<span class="hljs-string">"cover"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.title?.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pd-square"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        ☐
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Label</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-label'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Byline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-byline'</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Label</span> = $(label);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Label</span>&gt;</span>Author<span class="hljs-tag">&lt;/<span class="hljs-name">Label</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.author?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.author?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                {book.about === undefined ? null : <span class="hljs-tag">&lt;&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Label</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">Label</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.about.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                        {book.about.name}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span>
                <span class="hljs-tag">&lt;/&gt;</span></span>}
                &lt;<span class="hljs-title class_">Label</span>&gt;<span class="hljs-title class_">Subject</span>&lt;/<span class="hljs-title class_">Label</span>&gt; <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.subject?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.subject?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span></span>
            &lt;/&gt;
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">RunningHead</span> = $($RunningHead);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Label</span> = $($Label);
<span class="hljs-keyword">const</span> label = <span class="hljs-title class_">Label</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Byline</span> = $($Byline);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-theme" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-open pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-faces" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Faces</div></a><div class="pd-section"><a href="#a-cover-a-synopsis-a-table" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="a-cover-a-synopsis-a-table" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">A cover, a synopsis, a table</div></a><div class="pd-paragraph">A face is how a book's apparatus looks: the cover a book opens on, the synopsis beside it, the table of contents that answers for its chapters and, when the book is a subject, for the books whose subject it is. Each is a word of the package dressed here, and every book of this library wears these four from the file beside this chapter, borrowed from the test library until a sketch replaces them.</div></div><div class="pd-section"><a href="#the-front" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-front" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The front</div></a><div class="pd-paragraph">Since 10 November 2026 the cover is drawn as a book: the front, in the file beside this chapter, a board of a book's shape standing alone on the page while the cover is the open page, as tall as the screen allows since 17 November 2026, its type growing with it, with the title, the author, the tagline and the imprint on it, read from what the cover already says, as the byline is; the tagline is one line of what the book is, said of the cover as its author is, and the synopsis's first paragraph stood in its place until 12 November 2026, when I struck it, "an extensive block is a synopsis", the synopsis being its own page, reached from the table; its words are its links, the title opening the table of contents, the author and the subject their books, the library's name the library, and the running head, the byline and the cover's own title stand unseen behind it until another page opens. The theme draws it and gives a page that opens its one transition, a short fade. Sketch 004 of <a href="/inexplicable-phenomena/mathematical-design/#the-papers-page" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Paper's Page</span></a>, form a, by my number.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $, $check, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Annotation, $Chapter, $Cover, $Format, $Paragraph, $Synopsis, $Table, $TableOfContents, $Word, $Writing, <span class="hljs-title class_">AnnotationSpecification</span>, <span class="hljs-title class_">Means</span> <span class="hljs-keyword">as</span> means, <span class="hljs-title class_">Next</span> <span class="hljs-keyword">as</span> nextWord, <span class="hljs-title class_">Previous</span> <span class="hljs-keyword">as</span> previousWord, <span class="hljs-title class_">Reference</span> <span class="hljs-keyword">as</span> reference, <span class="hljs-title class_">Word</span> <span class="hljs-keyword">as</span> word, html, specify } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// A TAGLINE IS ONE LINE OF WHAT THE BOOK IS, said of a cover as its author and its subject are, written in the cover</span>
<span class="hljs-comment">// file and drawn on the front; the synopsis is the block, and has its own page. Doug, 2026-11-12, Sprint 127: "You</span>
<span class="hljs-comment">// can add a one line note about what the book is. That would be a tagline, but an extensive block is a synopsis".</span>
<span class="hljs-comment">// PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Tagline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Annotation</span> {
    specification = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TaglineSpecification</span>();
    <span class="hljs-keyword">get</span> <span class="hljs-title function_">line</span>(): <span class="hljs-built_in">string</span> { <span class="hljs-keyword">return</span> html.<span class="hljs-title function_">copy</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>); }
    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> { <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">line</span>; }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">TaglineSpecification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AnnotationSpecification</span> {
    <span class="hljs-meta">@specify</span>(<span class="hljs-string">'a tagline is said of a cover'</span>)
    $saidOfACover(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        $check(writing <span class="hljs-keyword">instanceof</span> $Chapter &amp;&amp; writing.<span class="hljs-title function_">is</span>($Cover), <span class="hljs-string">'a tagline is said of a cover, and this is not one'</span>);
    }
}

<span class="hljs-comment">// THE FRONT IS THE BOOK'S COVER DRAWN AS A BOOK: the title, the author, the tagline and the imprint on a board of a</span>
<span class="hljs-comment">// book's shape, standing alone on the page while the cover is open; its words are its links, the title to the table</span>
<span class="hljs-comment">// of contents, the author and the subject to their books, the library's name to the library. Drawn from what the</span>
<span class="hljs-comment">// cover already says, as the byline is. The synopsis's first paragraph stood on the board until 2026-11-12,</span>
<span class="hljs-comment">// Sprint 127, Doug: "get rid of the big wad of text on the cover... those notes are the synopsis, and they aren't</span>
<span class="hljs-comment">// bad, but then use the synopsis page"; the synopsis is its own chapter, reached from the table, and the tagline</span>
<span class="hljs-comment">// took its place on the board the same day. Sprint 125, Doug, 2026-11-10: "Give the cover the feel of a book... it</span>
<span class="hljs-comment">// should have the author and subject on the cover and not have the header", and on the first build, "various things</span>
<span class="hljs-comment">// should be clickable on the cover - author, subject and getting to the table", and "I don't like this 'Filed under'</span>
<span class="hljs-comment">// because that isn't about a subject", so the imprint names the subject plainly. Sketch 004 of the design book,</span>
<span class="hljs-comment">// form a. PROXY names: Front and its four words.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontName</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-name'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontAuthor</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-author'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontTagline</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-tagline'</span>); }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$FrontImprint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> { <span class="hljs-variable language_">super</span>.$Define(); <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front-imprint'</span>); }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Front</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-front'</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (book === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Name</span> = $(frontName);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Author</span> = $(frontAuthor);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Tagline</span> = $(frontTagline);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Imprint</span> = $(frontImprint);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Means</span> = $(means);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
        <span class="hljs-keyword">const</span> tagline = book.<span class="hljs-property">cover</span>?.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">expressed</span>($Tagline);
        <span class="hljs-comment">// THE TABLE'S ADDRESS IS ITS TITLE'S, as the running head reads it: a chapter's means is the means its title</span>
        <span class="hljs-comment">// carries, and the table chapter itself carries none.</span>
        <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Name</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.title?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Name</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Author</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.author?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.author?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Author</span>&gt;</span>
                {tagline === undefined ? null : <span class="hljs-tag">&lt;<span class="hljs-name">Tagline</span>&gt;</span>{tagline.line}<span class="hljs-tag">&lt;/<span class="hljs-name">Tagline</span>&gt;</span>}
                <span class="hljs-tag">&lt;<span class="hljs-name">Imprint</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{book.subject?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    {book.subject?.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Imprint</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Imprint</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Means</span>&gt;</span>$[[ Inexplicable Phenomena ]]<span class="hljs-tag">&lt;/<span class="hljs-name">Means</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">Imprint</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }
}

<span class="hljs-comment">// THE NAVIGATION, Doug, 2026-11-16: "You need next and table of contents and previous on the top and bottom of</span>
<span class="hljs-comment">// every chapter in the library. We need to be able to move easily." One line of apparatus in the running head's</span>
<span class="hljs-comment">// register: the previous chapter's title on the left, Contents in the middle on the table's address, the next</span>
<span class="hljs-comment">// chapter's title on the right; an edge with no neighbour keeps its place empty so the line holds. Written into</span>
<span class="hljs-comment">// a chapter for now; the seam that puts it on every chapter of the library awaits his word on the layer.</span>
<span class="hljs-comment">// PROXY name. Styled by the theme as pd-navigation.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Navigation</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-navigation'</span>);
    }

    <span class="hljs-comment">// THE WORDS ARE MADE AT THE BOND, not in write(): Previous and Next take their references in their own bond,</span>
    <span class="hljs-comment">// and the bond reaches only the authored tree, so a word made at render stood on the page as plain text, seen</span>
    <span class="hljs-comment">// on the bound textbook page on 2026-11-16, Contents the only link of the three. At an edge the package</span>
    <span class="hljs-comment">// answers the chapter itself, never nothing, and Next means it as a Self; the theme keeps that edge's place</span>
    <span class="hljs-comment">// and hides it.</span>
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Bound(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> chapter = <span class="hljs-variable language_">this</span>.<span class="hljs-property">chapter</span>;
        <span class="hljs-keyword">const</span> book = <span class="hljs-variable language_">this</span>.<span class="hljs-property">book</span>;
        <span class="hljs-keyword">if</span> (chapter !== <span class="hljs-literal">undefined</span> &amp;&amp; book !== <span class="hljs-literal">undefined</span> &amp;&amp; [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>].<span class="hljs-property">length</span> === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Previous</span> = $(previousWord);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Next</span> = $(nextWord);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Word</span> = $(word);
            <span class="hljs-keyword">const</span> <span class="hljs-title class_">Reference</span> = $(reference);
            <span class="hljs-keyword">const</span> table = book.<span class="hljs-property">table</span>?.<span class="hljs-property">canonical</span>;
            <span class="hljs-comment">// THREE CHARACTERS IN A ROW, Doug, 2026-11-16, after the buttons were refused: "Not a button!! I</span>
            <span class="hljs-comment">// wanted in three characters a left triangle (not arrow) and then a square in the middle that goes</span>
            <span class="hljs-comment">// to table, then the right arrow as a triangle. Three characters in a row like the arrow we use in</span>
            <span class="hljs-comment">// catalogues to go straight to a book", and on sight: "ALL WHITE OUTLINE characters!! Just three</span>
            <span class="hljs-comment">// characters. left triangle square (not filled in!!!) right arrow. Grey it but don't hide it. Don't</span>
            <span class="hljs-comment">// make it take up the whole line" — ◁ □ ▷, outline glyphs, solid grey, a cluster of their own width.</span>
            <span class="hljs-comment">// LSR, Doug, 2026-11-16: "Three characters. Up against each other. Spaced like in text. Same height.</span>
            <span class="hljs-comment">// White with outline. Two triangles and a square. The ones we use in cataloguing pages and we used to</span>
            <span class="hljs-comment">// use in my library for a canonical reference." — and, on the plain square inking 8px against the</span>
            <span class="hljs-comment">// triangles' 13, "Not the same size!!", and on the rounded ▢, "It has rounded edges. Pretty sure</span>
            <span class="hljs-comment">// there is a character. But all three have to match": measured in Chrome, ☐ inks 12×13 at ascent 12</span>
            <span class="hljs-comment">// with sharp corners — the triangles' own metrics — so the trio is ◁ ☐ ▷, typed tight at text size;</span>
            <span class="hljs-comment">// no edge is ever hidden.</span>
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Previous</span>&gt;</span>◁<span class="hljs-tag">&lt;/<span class="hljs-name">Previous</span>&gt;</span></span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Word</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Reference</span>&gt;</span>{table?.means?.identifier}<span class="hljs-tag">&lt;/<span class="hljs-name">Reference</span>&gt;</span>
                    ☐
                <span class="hljs-tag">&lt;/<span class="hljs-name">Word</span>&gt;</span></span>,
                <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Next</span>&gt;</span>▷<span class="hljs-tag">&lt;/<span class="hljs-name">Next</span>&gt;</span></span>
            );
        }
        <span class="hljs-variable language_">super</span>.$Bound();
    }
}

<span class="hljs-comment">// NAVIGATED, said of a chapter by its book, the seam of 2026-11-16: a format whose layer wraps the chapter's</span>
<span class="hljs-comment">// element with the navigation above it and below it. The two lines are the format's own text, so the chapter's</span>
<span class="hljs-comment">// bond reaches them and their words take their links; the layer draws those two instances and makes nothing at</span>
<span class="hljs-comment">// render. A format's layer stands outside the chapter's element, which Paginated hides by a class on the element</span>
<span class="hljs-comment">// itself, so the layer hides itself whenever its page is not the open one. The book says it of every chapter but</span>
<span class="hljs-comment">// the cover, whose page is the front, and leaves alone a chapter that already says Navigation in its own text.</span>
<span class="hljs-comment">// PROXY name; reads "this chapter is Navigated".</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Navigated</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Format</span> {
    specification = <span class="hljs-keyword">new</span> <span class="hljs-title class_">NavigatedSpecification</span>();
    <span class="hljs-keyword">protected</span> <span class="hljs-attr">_layer</span>?: <span class="hljs-title class_">ElementType</span>;
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        &amp;:not(:has(.pa-page.pa-open)) { display: none; }
    \`</span>;

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigation</span> = $(navigation);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span></span>,
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span></span>
        );
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">defines</span>(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        writing.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pa-navigated'</span>);
        writing.<span class="hljs-property">containers</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-variable language_">this</span>.<span class="hljs-property">layer</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">erase</span>(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        writing.<span class="hljs-property">containers</span>.<span class="hljs-title function_">revert</span>(<span class="hljs-variable language_">this</span>);
        writing.<span class="hljs-property">classes</span>.<span class="hljs-title function_">revert</span>(<span class="hljs-variable language_">this</span>);
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">get</span> <span class="hljs-title function_">layer</span>(): <span class="hljs-title class_">ElementType</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span> !== <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span>;
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Style</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">style</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">ElementType</span>;
        <span class="hljs-keyword">const</span> [above, below] = [...<span class="hljs-variable language_">this</span>.<span class="hljs-property">text</span>];
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Above</span> = $(above);
        <span class="hljs-keyword">const</span> <span class="hljs-title class_">Below</span> = $(below);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_layer</span> = <span class="hljs-function">(<span class="hljs-params">{ className, children }: { className?: <span class="hljs-built_in">string</span>; children?: ReactNode }</span>) =&gt;</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Style</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{className}</span>&gt;</span><span class="language-css">
                &lt;Above /&gt;
                {children}
                &lt;Below /&gt;
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">Style</span>&gt;</span></span>
        );
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">NavigatedSpecification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">AnnotationSpecification</span> {
    <span class="hljs-meta">@specify</span>(<span class="hljs-string">'navigated is said of a chapter'</span>)
    $saidOfAChapter(<span class="hljs-attr">writing</span>: $Writing): <span class="hljs-built_in">void</span> {
        $check(writing <span class="hljs-keyword">instanceof</span> $Chapter, <span class="hljs-string">'navigated is said of a chapter, and this is not one'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryCover</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Cover</span> {
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">header</span><span class="hljs-string">\`
        .pd-chapter.pa-cover { margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> calc(2 * <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibrarySynopsis</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Synopsis</span> {
    style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTableOfContents</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$TableOfContents</span> {

    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">nav</span><span class="hljs-string">\`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>);
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$LibraryTable</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Table</span> {
    <span class="hljs-keyword">override</span> style = <span class="hljs-title function_">selection</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">style</span>)<span class="hljs-string">\`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 3) calc(0.75 * <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>) calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 3) 0; border-block-start: 1px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 15%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 35%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 15%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); }
    \`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Cover</span> = $($LibraryCover);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Synopsis</span> = $($LibrarySynopsis);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">TableOfContents</span> = $($LibraryTableOfContents);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Table</span> = $($LibraryTable);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontName</span> = $($FrontName);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontAuthor</span> = $($FrontAuthor);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontTagline</span> = $($FrontTagline);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">FrontImprint</span> = $($FrontImprint);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Tagline</span> = $($Tagline);
<span class="hljs-keyword">const</span> frontName = <span class="hljs-title class_">FrontName</span>;
<span class="hljs-keyword">const</span> frontAuthor = <span class="hljs-title class_">FrontAuthor</span>;
<span class="hljs-keyword">const</span> frontTagline = <span class="hljs-title class_">FrontTagline</span>;
<span class="hljs-keyword">const</span> frontImprint = <span class="hljs-title class_">FrontImprint</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Front</span> = $($Front);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigation</span> = $($Navigation);
<span class="hljs-keyword">const</span> navigation = <span class="hljs-title class_">Navigation</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Navigated</span> = $($Navigated);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-running-head-and-the-byline" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="developing-the-library" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">Developing the Library</div></a><div class="pd-section"><a href="#the-loop" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-loop" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The loop</div></a><div class="pd-paragraph">A save shows on an open page in under a second; a bind is the gate at the end of a piece of work and never the way to look during one. The workbench beside this chapter is the loop: it serves the library live from its sources, keeps one browser open on it, and answers a look with what it found and a photograph. Borrowed from the librarian's own library on 2026-10-30, its built address this library's.</div><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">node library/.reference/5-developing-the-library~workbench.mjs, once, left open</div><div class="pd-sentence pd-line pa-item">node library/.reference/5-developing-the-library~workbench.mjs look the-team</div><div class="pd-sentence pd-line pa-item">the same with built for the site the last bind made, phone for a phone's width, close at the end</div></div></div></div><div class="pd-section"><a href="#the-bind-and-the-site" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-bind-and-the-site" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The bind and the site</div></a><div class="pd-paragraph">In the binding beside the site, npm run bind binds every book and leaves the site under the base the configuration names, and npm run preview with its port serves what the bind left. The site is committed as it is bound, and what is published is what was committed.</div><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">cd library/.public/.binding</div><div class="pd-sentence pd-line pa-item">npm run bind</div><div class="pd-sentence pd-line pa-item">npm run preview -- --port 4343 --strictPort</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-faces" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-paper" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Paper</div></a><div class="pd-section"><a href="#a-papers-page" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="a-papers-page" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">A paper's page</div></a><div class="pd-paragraph">A paper is a citable publication held in the library as a resource: the file itself beside a chapter of <a href="/inexplicable-phenomena/mathematical-library/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Library of Mathematics</span></a>, which carries the paper's citation and the notes its author writes on it, the paper signed by its own author. The page is minimal, on my word of 10 November 2026: a small picture of the publication at the top left with the text flowing under it, the citation, the notes, and a link that opens the publication in another tab; the picture itself opens it. The page's form is sketch 002 of the design book, form a.</div></div><div class="pd-section"><a href="#the-plate-and-the-opening" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-plate-and-the-opening" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The plate and the opening</div></a><div class="pd-paragraph">Two words in the file beside this chapter. A plate is the word that carries the picture, floated at the top left of the chapter by the theme; an opening is a reference that opens its address in another tab, a twin of the package's own reference with its anchor given a target. A chapter writes the plate first, before its title, as a word holding an opening whose text is the paper's literal and an image whose text is the picture's: the literals become the two files' addresses at the bind, so the picture is served beside the pages and the paper with it.</div></div><div class="pd-section"><a href="#the-picture" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-picture" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">The picture</div></a><div class="pd-paragraph">The picture is the paper's first page, made once by the tool beside this chapter: Chrome's own viewer draws the PDF with its toolbar and panes asked off, served to it by the tool since the viewer draws nothing opened from the disk as a file, photographed at a page's shape and cut to the page. The tool takes a page number for a scan of a bound book, which opens on its boards: Lobachevsky's title page is its fifth leaf. It stands beside the paper's chapter as a picture, named by the plate's literal, and is made again only when the paper changes.</div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">ElementType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Reference, $Word } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// A PLATE IS THE SMALL PICTURE OF A PUBLICATION ON ITS PAGE, at the top left with the text flowing under it; the</span>
<span class="hljs-comment">// word carries the picture and the opening that takes a reader to the publication. Sprint 125, Doug, 2026-11-10:</span>
<span class="hljs-comment">// "a small picture of the publication... And then clicking it perhaps causes it to open in another tab". PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Plate</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pd-plate'</span>);
    }
}

<span class="hljs-comment">// AN OPENING IS A REFERENCE THAT OPENS ITS ADDRESS IN ANOTHER TAB, a twin of the package's Reference with the anchor</span>
<span class="hljs-comment">// given its target, in the library's own code and nowhere in the package. PROXY name.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Opening</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Reference</span> {
    <span class="hljs-keyword">override</span> <span class="hljs-attr">anchor</span>: <span class="hljs-title class_">ElementType</span> = selection.<span class="hljs-property">a</span>.<span class="hljs-title function_">attrs</span>({ <span class="hljs-attr">className</span>: <span class="hljs-string">'pa-reference pa-opening'</span>, <span class="hljs-attr">target</span>: <span class="hljs-string">'_blank'</span>, <span class="hljs-attr">rel</span>: <span class="hljs-string">'noopener'</span> })<span class="hljs-string">\`\`</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Plate</span> = $($Plate);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Opening</span> = $($Opening);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#developing-the-library" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-reference-manual" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Reference Manual</div></a><div class="pd-section"><a href="#1-what-a-reference-manual-is" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-what-a-reference-manual-is" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. What a reference manual is</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 Every subject carries a reference manual: the specification of that subject in this library. This book is the library's own. I ruled this on 12 November 2026, at the opening of the textbook's sprint.</div><div class="pd-sentence pd-line pa-item">1.2 A subject's manual keeps a part for the books of its subject, one chapter per book, and that chapter tracks the book's idioms — the conventions its chapters follow.</div><div class="pd-sentence pd-line pa-item">1.3 Where an idiom is enforced by code, the code stands with the chapter that states it, the way this book's theme and faces stand beside theirs; an idiom followed by hand is stated in the same place and marked so.</div><div class="pd-sentence pd-line pa-item">1.4 A manual is written the way a specification is — numbered parts, referenced code — in the form of <a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>; I asked for this on 16 November 2026, and this chapter is the first so written.</div></div></div></div><div class="pd-section"><a href="#2-the-three-shelves" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-three-shelves" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The three shelves</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 What is true of every book in the library lives here, in Our Reference.</div><div class="pd-sentence pd-line pa-item">2.2 What is true of a subject's books lives in that subject's manual. The first is <a href="/inexplicable-phenomena/mathematical-reference/" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">Referential Objectivity</span></a>, whose part The Books tracks the notebook, the textbook, the project, the library and the design.</div><div class="pd-sentence pd-line pa-item">2.3 What is true of one book alone stays beside that book, never in a manual.</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-paper" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-specification" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Specification</div></a><div class="pd-paragraph">The specification of a specification, written in its own form. I chose the form of a legal document on 16 November 2026, its anatomy the contract's — recitals, articles, clauses, defined terms, provisos, schedules — evolved for a library that specifies deliverables. The form is the library's; a subject may redress it to fit its style, as a theme redresses a page. Mathematics writes its own in <a href="/inexplicable-phenomena/mathematical-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>, and the first full instance is the statement of work of <a href="/inexplicable-phenomena/arithmetic-textbook/#the-symmetry-of-arithmetic" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Symmetry of Arithmetic</span></a>.</div><div class="pd-section"><a href="#1-purpose" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-purpose" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. Purpose</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 A specification is the formal identification of a deliverable — the thing agreed between buyer and seller in a service contract. It fixes what the deliverable must be, uniquely, so that candidates can be judged against it and the right one recognized when it is found. The specification is the legal document; the deliverable is not.</div><div class="pd-sentence pd-line pa-item">1.2 The specification is the anchor for the work. The work meets the specification part by part, and the deliverable cites each part as it is met.</div><div class="pd-sentence pd-line pa-item">1.3 A demand that cannot be checked has specified nothing, and a demand is stated so that it can fail.</div></div></div></div><div class="pd-section"><a href="#2-the-parts" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-parts" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The parts</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 The preamble — the contract's recitals. What the document is and the choice it records, standing before the numbered sections and carrying no number.</div><div class="pd-sentence pd-line pa-item">2.2 The sections — the contract's articles. Each bears a number and a name, and the sections run in one sequence.</div><div class="pd-sentence pd-line pa-item">2.3 The clauses. A section nests numbered parts: clause 2.3 is the third clause of section 2. A clause nests further where its matter requires it.</div><div class="pd-sentence pd-line pa-item">2.4 The labels — the contract's defined terms. A recurring kind of clause carries a letter and a number, defined where the clause is stated; in the first instance, the known results K, the constraints C, and the open determinations O.</div><div class="pd-sentence pd-line pa-item">2.5 The provisos. Where a demand is motivated, the motivation stands beside it and says so.</div><div class="pd-sentence pd-line pa-item">2.6 The tables. A table states what a table states best — axioms, results, tests — and its rows are clauses carrying their labels.</div></div></div></div><div class="pd-section"><a href="#3-citation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="3-citation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">3. Citation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">3.1 The specification references itself. Any clause cites any other by its number or its label, in free-form citation language, and every citation is a link to the clause it names.</div><div class="pd-sentence pd-line pa-item">3.2 A specification is highly connected: where a clause depends on another, motivates it, or constrains it, it says so by citation.</div><div class="pd-sentence pd-line pa-item">3.3 Citation reaches across the project's documents: the specification cites the progress by its labels, and the progress cites the specification by its numbers.</div></div></div></div><div class="pd-section"><a href="#4-boundary" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="4-boundary" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">4. Boundary</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">4.1 The specification states where it ends. Nothing outside the boundary binds the work.</div><div class="pd-sentence pd-line pa-item">4.2 What stands after the end is the schedules — the contract's annexes: reference bearing on the work and binding none of it.</div></div></div></div><div class="pd-section"><a href="#5-interpolation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="5-interpolation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">5. Interpolation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">5.1 What is specified and not yet found stands as a placeholder for itself, in a brace naming the open determination it waits on.</div><div class="pd-sentence pd-line pa-item">5.2 The work closes when the last placeholder is replaced by the thing it stands for.</div></div></div></div><div class="pd-section"><a href="#6-permanence" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="6-permanence" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">6. Permanence</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">6.1 A specification is not thrown away. It is updated when its parts are found inconsistent, since an inconsistent specification has specified nothing.</div><div class="pd-sentence pd-line pa-item">6.2 A change is made by changing the specification, in the context of all its other parts.</div></div></div></div><div class="pd-section"><a href="#7-the-implementation" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="7-the-implementation" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">7. The implementation</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">7.1 The implementation meets the specification part by part, and cites each part as it is met, by its number or its label.</div><div class="pd-sentence pd-line pa-item">7.2 A citation from the implementation leads to the part it names, and the specification stands beside what implements it: the two forms are each reachable from the other.</div><div class="pd-sentence pd-line pa-item">7.3 A justification is the annotation form of this relationship: it says how the implementation satisfies a part, citing the part by number.</div></div></div></div><div class="pd-section"><a href="#8-format" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="8-format" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">8. Format</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">8.1 The format chosen here is the legal document, as this chapter is written: a preamble, then numbered, named sections of numbered clauses.</div><div class="pd-sentence pd-line pa-item">8.2 A subject may change the format to fit its style. The form of sections 1 to 7 — purpose, parts, citation, boundary, interpolation, permanence, implementation — is kept; the dress is the subject's.</div></div></div></div></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-reference-manual" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-next pa-reference">▷</span></a></div></div><div class="sc-kfYpvV gAJIDt pd-container"><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span class="pd-word pd-next pa-reference pa-self-reference">▷</span></a></div><div class="pd-chapter pd-canonical pa-page pa-navigated"><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="the-content" class="pd-sentence pd-title pa-reference pa-self-reference pa-referent">The Content</div></a><div class="pd-paragraph">A thing with a front and a back, lifted to the library level on 17 November 2026 because content with a project will stand in a lot of places. On the front the deliverable — the result of the effort, looking like what it is. On the back the project — the formal representation of the work, whose specification takes the form of <a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Specification</span></a>. The first case and the mathematics specialization stand in <a href="/inexplicable-phenomena/mathematical-reference/#the-content" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">The Content</span></a>.</div><div class="pd-section"><a href="#1-the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="1-the-content" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">1. The content</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">1.1 A piece of content is the content of its chapter, starting below the title, like a section; it has a front and a back, and shows one side at a time.</div><div class="pd-sentence pd-line pa-item">1.2 The front is the deliverable; the back is the project. One unlabelled control at the title's right flips them, explored rather than read.</div><div class="pd-sentence pd-line pa-item">1.3 It opens on the deliverable; the canonical side is overridable.</div><div class="pd-sentence pd-line pa-item">1.4 On the back the title turns into the literal — # Title in the source face, flush with the column — and that is the back's whole signal.</div></div></div></div><div class="pd-section"><a href="#2-the-project" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="2-the-project" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">2. The project</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">2.1 The specification and the progress are the project's named parts, sections naming themselves; nothing is mandatory, and the parts stand open and whole — nothing collapses.</div><div class="pd-sentence pd-line pa-item">2.2 The project's documents render verbatim through the markdown of the package, the specification in the source pane's register — the editor's face at the measured same-space settings, equations typeset into native MathML at bind time.</div><div class="pd-sentence pd-line pa-item">2.3 The documents are highly connected: the renderer speaks the specification's own citation language, every mention a link to its definition across the documents, and a citation click turns the page itself, never the address.</div><div class="pd-sentence pd-line pa-item">2.4 The implementation cites the specification by number or label, and the citation flips the content to the part it names — the relationship between the two forms.</div><div class="pd-sentence pd-line pa-item">2.5 What is specified and not yet found stands interpolated, a word for the thing until the thing is found.</div></div></div></div><div class="pd-section"><a href="#3-the-motion" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="3-the-motion" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">3. The motion</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">3.1 The flip is a permutation that preserves identity: one axis turns, writing to code; boxes, weights, gaps, palette and structure ride through unchanged, measured by rectangle.</div><div class="pd-sentence pd-line pa-item">3.2 The transition is the plain text version of one: the chapter settles from dimmed ink, and the title's discrete changes — font, place, mark — happen together at the dip's hidden trough, dimmed by color so the chapter's label changes with nothing.</div></div></div></div><div class="pd-section"><a href="#4-the-components" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="4-the-components" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">4. The components</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">4.1 Content, the format whose note is the toggle and whose style rules the sides. Project, the back's section; Specification and Progress, its named parts.</div><div class="pd-sentence pd-line pa-item">4.2 Markdown, the document rendered verbatim and connected. Cite, the implementation's citation. Interpolated, the placeholder.</div><div class="pd-sentence pd-line pa-item">4.3 A subject specializes the deliverable's dress — mathematics adds Theorem and Proof beside its own manual chapter — and re-exports the family so its books keep one door.</div></div></div></div><div class="pd-section"><a href="#5-the-open-ends" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><div id="5-the-open-ends" class="pd-sentence pd-heading pa-referent pa-reference pa-self-reference">5. The open ends</div></a><div class="sc-kEqYZi ldScnz pd-container"><div class="pd-paragraph pa-list"><div class="pd-sentence pd-line pa-item">5.1 The names: Content collides with the package's word for a Word's content, and Specification with a package utility; both flagged, his to settle, likeliest when the family moves all the way into the package.</div><div class="pd-sentence pd-line pa-item">5.2 A subclass cannot yet extend a format's style, so a subject's dress rides inert in the lifted style until the framework grows the composition seam; named, not hacked around.</div><div class="pd-sentence pd-line pa-item">5.3 The justifications associate with the progress; the exact tie stands open.</div></div></div></div><pre class="pd-letter pd-figure pd-code"><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">MouseEvent</span>, <span class="hljs-title class_">ReactNode</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> katex <span class="hljs-keyword">from</span> <span class="hljs-string">'katex'</span>;
<span class="hljs-keyword">import</span> { marked } <span class="hljs-keyword">from</span> <span class="hljs-string">'marked'</span>;
<span class="hljs-keyword">import</span> { $, selection } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/chemistry'</span>;
<span class="hljs-keyword">import</span> { $Append, $Format, $Paragraph, $Section, $Word, html } <span class="hljs-keyword">from</span> <span class="hljs-string">'@dna-platform/public'</span>;

<span class="hljs-comment">// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15 and respecified from his answers of</span>
<span class="hljs-comment">// 2026-11-16: the content of a chapter, starting below the title, like a section. On the front the DELIVERABLE —</span>
<span class="hljs-comment">// the object, the result of the effort of the team, looking like what it is, a familiar chapter. On the back</span>
<span class="hljs-comment">// the PROJECT — the formal representation of the work: the statement of work, the progress, a plan, a</span>
<span class="hljs-comment">// discussion — the talk page behind a wikipedia article, and nothing is mandatory. The project side carries</span>
<span class="hljs-comment">// the formal visual language. The name Content is a PROXY until he keeps it. The content is a format said of</span>
<span class="hljs-comment">// its chapter: its note draws the one unlabelled toggle in place, and its style wraps the chapter, so the</span>
<span class="hljs-comment">// checked control rules what shows — everything that is not the project is the deliverable.</span>
<span class="hljs-comment">// LIFTED TO THE LIBRARY LEVEL, Doug, 2026-11-17: "Make sure this is in components that can be reused and at</span>
<span class="hljs-comment">// the right level reference manual. We will need this everywhere there is content with a project, which will</span>
<span class="hljs-comment">// be in a lot of places" — the general family lives here in Our Reference; a subject specializes the</span>
<span class="hljs-comment">// deliverable's dress, as mathematics does with Theorem and Proof beside its own manual chapter. One flagged</span>
<span class="hljs-comment">// wart rides with the lift: the theorem and proof rules stay in this style, inert until a subject's classes</span>
<span class="hljs-comment">// activate them, because a subclass cannot yet extend a format's style — the composition seam is an open</span>
<span class="hljs-comment">// question for the framework, named rather than hacked around.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Content</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Format</span> {
    $canonical = <span class="hljs-string">'deliverable'</span>;

    <span class="hljs-comment">// THE DISSOLVE, Doug, 2026-11-17: "I still don't like the transition... It feels too slow. The flicker is</span>
    <span class="hljs-comment">// bad", "You must know what a good and a bad transition is", "It should be faster, less perceptible and</span>
    <span class="hljs-comment">// if there is a white flash, it is perceptible." The flipbook frames convicted the dip: an omitted</span>
    <span class="hljs-comment">// keyframe property interpolates to its base rather than stepping, so the out direction glided 28px over</span>
    <span class="hljs-comment">// six frames with the font swapping mid-slide and the label lurching when margin and padding fell out of</span>
    <span class="hljs-comment">// step — and the trough itself was the white flash, a title-shaped gap of paper. The good transition is</span>
    <span class="hljs-comment">// the platform's own cross-dissolve: the flip runs inside startViewTransition, the old frame never</span>
    <span class="hljs-comment">// leaving before the new covers it — no absence, no motion, one dissolve of the whole page at 140ms.</span>
    <span class="hljs-comment">// Every hand-rolled keyframe is retired; the states swap instantly inside the update and the browser</span>
    <span class="hljs-comment">// carries the blend. The duration rules ride a plain style tag because view-transition pseudos live at</span>
    <span class="hljs-comment">// the document root, beyond a scoped sheet's reach; reduced motion collapses the dissolve to the swap.</span>
    flip = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLLabelElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        press.<span class="hljs-title function_">preventDefault</span>();
        <span class="hljs-keyword">const</span> box = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'pc-flip'</span>);
        <span class="hljs-keyword">if</span> (!(box <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLInputElement</span>)) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">const</span> turn = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> { box.<span class="hljs-property">checked</span> = !box.<span class="hljs-property">checked</span>; };
        <span class="hljs-keyword">const</span> doc = <span class="hljs-variable language_">document</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Document</span> &amp; { <span class="hljs-attr">startViewTransition</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">update</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">unknown</span> };
        <span class="hljs-keyword">if</span> (doc.<span class="hljs-property">startViewTransition</span> === <span class="hljs-literal">undefined</span>) <span class="hljs-title function_">turn</span>();
        <span class="hljs-keyword">else</span> doc.<span class="hljs-title function_">startViewTransition</span>(turn);
    };

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">note</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">return</span> (
            <span class="language-xml"><span class="hljs-tag">&lt;&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="language-css">{'::<span class="hljs-built_in">view-transition-old</span>(root), ::<span class="hljs-built_in">view-transition-new</span>(root) { <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">0.14s</span>; <span class="hljs-attribute">animation-timing-function</span>: ease; } <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">prefers-reduced-motion</span>: reduce) { ::<span class="hljs-built_in">view-transition-old</span>(root), ::<span class="hljs-built_in">view-transition-new</span>(root) { <span class="hljs-attribute">animation</span>: none <span class="hljs-meta">!important</span>; } }'}</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pc-content"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.flip}</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
                        <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>
                        <span class="hljs-attr">id</span>=<span class="hljs-string">"pc-flip"</span>
                        <span class="hljs-attr">defaultChecked</span>=<span class="hljs-string">{this.$canonical</span> === <span class="hljs-string">'project'</span>}
                    /&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"pc-flip"</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/&gt;</span></span>
        );
    }

    <span class="hljs-comment">// ONE UNLABELLED CONTROL TO THE RIGHT OF THE TITLE, Doug, 2026-11-16: "how about a toggle to the right of</span>
    <span class="hljs-comment">// the title and it has no label. One can just explore" — and the back announces itself in the literal:</span>
    <span class="hljs-comment">// the title turns into # Title while the project side shows; the [Project] tag of the same day is struck.</span>
    <span class="hljs-comment">// THE FLIP SETTLES, Doug, 2026-11-16: "that has being aligned will cause a jump and it is the jump of</span>
    <span class="hljs-comment">// coming out of the matrix. Is there a slight transition... It would have to be very subtle because this</span>
    <span class="hljs-comment">// is a text-oriented site" — the frame holds still and the chapter's content alone eases from dimmed ink</span>
    <span class="hljs-comment">// to full, a print developing; nothing moves, since movement would break the sameness. Two identical</span>
    <span class="hljs-comment">// keyframes under two names so each direction restarts the settle; reduced motion is honored.</span>
    <span class="hljs-comment">// THE SOURCE PANE IS A WHITE VSCODE, his rulings of 2026-11-16: "a white vscode theme that feels natural.</span>
    <span class="hljs-comment">// Takes up the same space as the other side", then "sameness in layout — the same title in same place,</span>
    <span class="hljs-comment">// gets a # and changes font", then "choose a monospace that doesn't feel too hard". The elegance answer:</span>
    <span class="hljs-comment">// VS Code's own Windows default is Consolas, not the terminal's rounder, heavier Cascadia — so Consolas</span>
    <span class="hljs-comment">// leads the stack, at the same-space setting the sweep measured (the same passage at the column's 640px:</span>
    <span class="hljs-comment">// Georgia 17px on 27.2px stands 272px; Consolas 14.5px on 22.5px stands 270px), .85 of the book's size on</span>
    <span class="hljs-comment">// a 1.55 line. SAMENESS IN LAYOUT: the Chapter label's ::before is untouched and pinned to the book's</span>
    <span class="hljs-comment">// face and ink, so the title's box is identical on both sides; the # sits flush at the column's left</span>
    <span class="hljs-comment">// edge — his correction of the gutter: "the # has to be left aligned with everything else and the</span>
    <span class="hljs-comment">// transition was: Title to # Title" — the text easing right by the mark's exact width (Consolas advance</span>
    <span class="hljs-comment">// .55em, two characters of the title's 1.5 size = 1.65 * size), the Chapter label held still by an equal</span>
    <span class="hljs-comment">// negative margin animated on the same curve. The motion is his "canonical experience of moving from</span>
    <span class="hljs-comment">// literal to symbol. From object to its representation", pulled back on his "this is plain text. It</span>
    <span class="hljs-comment">// needs to be the plain text version of a transition": one clock, one curve, the staged delay of the</span>
    <span class="hljs-comment">// first cut retired as theater. THE GLIDE RETIRED, Doug, 2026-11-17: "There's a sort of jank when going</span>
    <span class="hljs-comment">// to specification mode" — photographed frame by frame, the title had already turned to Consolas and the</span>
    <span class="hljs-comment">// body to the specification at the first frame, and the title then slid right for 160ms after the fact;</span>
    <span class="hljs-comment">// a swap that lands at once and then moves is two events, and the second reads as the first stuttering.</span>
    <span class="hljs-comment">// Plain text has no tween: the title takes its code form and its place in the same frame, the mark with</span>
    <span class="hljs-comment">// it, and the settle alone is the transition — the whole chapter, title included, developing from dimmed</span>
    <span class="hljs-comment">// ink to full. THE DIP, Doug, the same night: "The appearance of the symbol and change in font is weird.</span>
    <span class="hljs-comment">// It feels off... Font and position can happen concurrently unless it's janky" — the one-frame swap was</span>
    <span class="hljs-comment">// still watchable, so it moves to where it cannot be watched: the title dims over 120ms, and at the</span>
    <span class="hljs-comment">// trough the font, the place, the label's hold and the mark all change together in one hidden instant —</span>
    <span class="hljs-comment">// concurrent, as he allows — then it rises as code over 120ms. The discrete steps live inside the</span>
    <span class="hljs-comment">// keyframes at 49.9/50.1 so nothing ever changes while visible; the glide stays retired. The dip dims by</span>
    <span class="hljs-comment">// COLOR, not opacity — his "You have chapter1 disappearing. Why?" — because element opacity sinks the</span>
    <span class="hljs-comment">// ::before label with the text; the text alone fades to transparent, the label's ink pinned on both</span>
    <span class="hljs-comment">// states, the # on its own clock. The frame never flickers, and the label changes with nothing.</span>
    <span class="hljs-comment">// The section headings keep the serif heading's box — 1.15 of the size, the section's margin. The palette</span>
    <span class="hljs-comment">// came from an eight-variant matrix photographed beside the serif reference, on his "Play around. Be</span>
    <span class="hljs-comment">// creative. Get it to match... Don't have the markdown be LOUD!!": the quiet winner keeps title, headings,</span>
    <span class="hljs-comment">// leads and body in the book's own ink at regular weight, and colors only the # and ## marks in the</span>
    <span class="hljs-comment">// theme's link — the color the citations already wear on both sides. His harmony rule finished it: the</span>
    <span class="hljs-comment">// italics too stay in the ink, italic their only voice; the one foreign magenta went with the blues.</span>
    <span class="hljs-comment">// THE PERMUTATION TEST, his anchor of 2026-11-16: "the same theme flipped over some axis of code to</span>
    <span class="hljs-comment">// writing, but occupying the same space and having the same feel... the feel of the permutation while</span>
    <span class="hljs-comment">// preserving identity." Measured type by type: weight is identity, so the title and the section headings</span>
    <span class="hljs-comment">// stay bold through the flip; and the tables shed the rendered-markdown cards for the front's own dress —</span>
    <span class="hljs-comment">// the browser read the book's table as an open grid, no borders, no backgrounds, header row regular —</span>
    <span class="hljs-comment">// which also obeys his oldest law of the night, no lines anywhere. Columns separate by air, rows by their</span>
    <span class="hljs-comment">// leading; the cards' ruling of the earlier evening is superseded by the test.</span>
    <span class="hljs-comment">// One palette across the two faces; the markdown-ness is the face and the marks. THE TRANSITION'S</span>
    <span class="hljs-comment">// STRETCH, measured on his "Still a stretchiness to the transition": the title's width was innocent</span>
    <span class="hljs-comment">// (Georgia bold 372px, Consolas regular 364px); the elastic was vertical — the spec's paragraph gaps ran</span>
    <span class="hljs-comment">// 13px against the serif's 20px and the opening text dropped 41px below the label — so the spec's</span>
    <span class="hljs-comment">// paragraphs take the theme's own space and the first tucks to a quarter-space under SPECIFICATION.</span>
    <span class="hljs-keyword">override</span> style = selection.<span class="hljs-property">div</span><span class="hljs-string">\`
        counter-reset: theorem;
        .pd-chapter { position: relative; }
        .pc-content { position: absolute; inset-block-start: 2.1rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; box-sizing: border-box; inline-size: 0.9em; block-size: 0.9em; border: 1.5px solid color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 65%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); background: <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>; transition: border-width .15s ease, border-color .15s ease; }
        .pc-content:hover .pc-flip { border-color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pc-content:has(input:checked) .pc-flip { border-width: 3px; }
        .pc-project { display: none; }
        &amp;:has(#pc-flip:checked) .pc-project { display: block; }
        &amp;:has(#pc-flip:checked) .pd-chapter &gt; .pd-paragraph:not(.pd-navigation) { display: none; }
        &amp;:has(#pc-flip:checked) .pd-chapter &gt; .pd-section:not(.pc-project) { display: none; }
        .pc-project .pd-heading { display: block; font-size: calc(.78 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 52%, <span class="hljs-subst">\${({ theme }) =&gt; theme.paper}</span>); margin-block: 0 .5em; }
        .pc-specification .pc-markdown { font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; font-size: calc(.9 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); line-height: calc(1.412 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); margin-block-start: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pc-specification .pc-markdown h2 { font-family: inherit; font-size: calc(1.15 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> 0; font-weight: bold; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pc-specification .pc-markdown h2::before { content: '## '; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; }
        .pc-specification .pc-markdown h2:first-of-type { display: none; }
        .pc-specification .pc-markdown p { margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>; }
        .pc-specification .pc-markdown h2:first-of-type + p { margin-block-start: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 4); }
        .pd-title { position: relative; }
        .pd-title::before { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        .pd-title::after { content: '# '; position: absolute; inset-inline-start: 0; inset-block-end: 0; opacity: 0; font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title { padding-inline-start: calc(1.65 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title::before { margin-inline-start: calc(-1.65 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-family: <span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span>; color: <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span>; }
        &amp;:has(#pc-flip:checked) .pd-title::after { opacity: 1; }
        .pd-section.pc-project { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 2) 0; }
        .pc-markdown h1 { display: none; }
        .pc-markdown h1 + p { display: none; }
        .pc-markdown h2 { font-family: <span class="hljs-subst">\${({ theme }) =&gt; theme.font}</span>; font-size: calc(1.15 * <span class="hljs-subst">\${({ theme }) =&gt; theme.size}</span>); font-weight: bold; margin-block: 1.1em .35em; color: color-mix(in srgb, <span class="hljs-subst">\${({ theme }) =&gt; theme.ink}</span> 76%, <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span> 24%); }
        .pc-markdown p { margin-block: .9em; }
        .pc-markdown strong { font-weight: bold; }
        .pc-markdown a { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; text-decoration: none; }
        .pc-markdown a:hover { text-decoration: underline; }
        .pc-cite a { color: <span class="hljs-subst">\${({ theme }) =&gt; theme.link}</span>; text-decoration: none; cursor: pointer; }
        .pc-cite a:hover { text-decoration: underline; }
        .pc-markdown table { width: 100%; border-collapse: collapse; margin-block: <span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span>; }
        .pc-markdown th, .pc-markdown td { padding: .3em 1.2em .3em 0; text-align: start; vertical-align: top; }
        .pc-markdown th:last-child, .pc-markdown td:last-child { padding-inline-end: 0; }
        .pc-markdown thead th { font-weight: 400; }
        .pc-markdown math { font-family: 'Cambria Math', 'STIX Two Math', math; font-size: 1.08em; }
        .pc-markdown .pc-math-block { margin-block: calc(<span class="hljs-subst">\${({ theme }) =&gt; theme.space}</span> / 2); }
        .pc-markdown ol, .pc-markdown ul { padding-inline-start: 1.5em; margin-block: .9em; }
        .pc-markdown li { margin-block: .35em; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
    \`</span>;
}

<span class="hljs-comment">// THE PROJECT IS THE BACK, Doug's answers, 2026-11-16: the specification is part of the project, an expression</span>
<span class="hljs-comment">// of a statement of work identifying the deliverable; the progress is a narrative of how the project has been</span>
<span class="hljs-comment">// going, its entries associated with an author; a plan may be expressed with teammates assigned, all to the</span>
<span class="hljs-comment">// author by default as read from the cover; a discussion may stand there. The parts beyond the specification</span>
<span class="hljs-comment">// are optional. One section of the chapter, the formal register.</span>
<span class="hljs-comment">// NOTHING COLLAPSES, Doug, 2026-11-16: "STOP MAKING THINGS COLLAPSE!!! VERBATIM!" — the project's parts stand</span>
<span class="hljs-comment">// open and whole, plain sections.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Project</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Section</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-project'</span>);
    }
}

<span class="hljs-comment">// THE PROJECT'S NAMED PARTS, Doug, 2026-11-16: "And then create the Specification?" — the specification and</span>
<span class="hljs-comment">// the progress are the project's parts, each a section naming itself in the formal dress. The specification</span>
<span class="hljs-comment">// dissolves its own first heading: its purpose reads as the introducing paragraph, not a second title.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Specification</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Project</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-specification'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Progress</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Project</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-progress'</span>);
    }
}

<span class="hljs-comment">// THE SPECIFICATION REFERENCES ITSELF, Doug, 2026-11-16: "the spec should reference itself ... The</span>
<span class="hljs-comment">// specification should be highly connected" — and verbatim stays verbatim: the document already speaks a</span>
<span class="hljs-comment">// citation language — numbered sections, dotted parts, the labels K, C and O, bracketed references — so the</span>
<span class="hljs-comment">// renderer learns that language rather than the document changing. Definitions receive ids; every mention</span>
<span class="hljs-comment">// becomes a link to its definition, across the project's documents, since both render on one page.</span>
<span class="hljs-comment">// EQUATIONS IN SPECIFICATIONS, Doug, 2026-11-16: "we need latex in the specification either rendered or in</span>
<span class="hljs-comment">// latex equation form", then "We need to see equations in specifications" — rendered, in a comparable font.</span>
<span class="hljs-comment">// The extension tokenizes $...$ and $$...$$ before markdown's emphasis can eat the underscores inside them,</span>
<span class="hljs-comment">// and KaTeX typesets at bind time into MathML, which the browser renders natively in its math face — no</span>
<span class="hljs-comment">// stylesheet, no font files shipped. The katex dependency entered the package on his word, beside marked.</span>
<span class="hljs-keyword">const</span> typeset = (<span class="hljs-attr">passage</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">display</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span>
    katex.<span class="hljs-title function_">renderToString</span>(passage, { <span class="hljs-attr">output</span>: <span class="hljs-string">'mathml'</span>, <span class="hljs-attr">throwOnError</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">displayMode</span>: display });

marked.<span class="hljs-title function_">use</span>({
    <span class="hljs-attr">extensions</span>: [
        {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'mathBlock'</span>,
            <span class="hljs-attr">level</span>: <span class="hljs-string">'block'</span>,
            <span class="hljs-title function_">start</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) { <span class="hljs-keyword">const</span> at = src.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'$$'</span>); <span class="hljs-keyword">return</span> at &lt; <span class="hljs-number">0</span> ? <span class="hljs-literal">undefined</span> : at; },
            <span class="hljs-title function_">tokenizer</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) {
                <span class="hljs-keyword">const</span> match = <span class="hljs-regexp">/^\\$\\$([\\s\\S]+?)\\$\\$/</span>.<span class="hljs-title function_">exec</span>(src);
                <span class="hljs-keyword">if</span> (match !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">'mathBlock'</span>, <span class="hljs-attr">raw</span>: match[<span class="hljs-number">0</span>], <span class="hljs-attr">text</span>: match[<span class="hljs-number">1</span>] };
                <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
            },
            <span class="hljs-title function_">renderer</span>(<span class="hljs-params"><span class="hljs-attr">token</span>: { text: <span class="hljs-built_in">string</span> }</span>) { <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;div class="pc-math-block"&gt;<span class="hljs-subst">\${typeset(token.text, <span class="hljs-literal">true</span>)}</span>&lt;/div&gt;\`</span>; },
        },
        {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'mathInline'</span>,
            <span class="hljs-attr">level</span>: <span class="hljs-string">'inline'</span>,
            <span class="hljs-title function_">start</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) { <span class="hljs-keyword">const</span> at = src.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'$'</span>); <span class="hljs-keyword">return</span> at &lt; <span class="hljs-number">0</span> ? <span class="hljs-literal">undefined</span> : at; },
            <span class="hljs-title function_">tokenizer</span>(<span class="hljs-params"><span class="hljs-attr">src</span>: <span class="hljs-built_in">string</span></span>) {
                <span class="hljs-keyword">const</span> match = <span class="hljs-regexp">/^\\$(?=\\S)([^$\\n]*?\\S)\\$/</span>.<span class="hljs-title function_">exec</span>(src);
                <span class="hljs-keyword">if</span> (match !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: <span class="hljs-string">'mathInline'</span>, <span class="hljs-attr">raw</span>: match[<span class="hljs-number">0</span>], <span class="hljs-attr">text</span>: match[<span class="hljs-number">1</span>] };
                <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
            },
            <span class="hljs-title function_">renderer</span>(<span class="hljs-params"><span class="hljs-attr">token</span>: { text: <span class="hljs-built_in">string</span> }</span>) { <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;span class="pc-math"&gt;<span class="hljs-subst">\${typeset(token.text, <span class="hljs-literal">false</span>)}</span>&lt;/span&gt;\`</span>; },
        },
    ],
});

<span class="hljs-keyword">const</span> cited = <span class="hljs-regexp">/\\[(\\d+(?:,\\s*\\d+)*)\\]|\\b[Ss]ections? \\d+(?: to \\d+)?\\b|\\b[KCO]\\d+\\b|\\b\\d\\.\\d\\b/g</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> place = (<span class="hljs-attr">citation</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> section = citation.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^[Ss]ections? (\\d+)/</span>);
    <span class="hljs-keyword">if</span> (section !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-sec-<span class="hljs-subst">\${section[<span class="hljs-number">1</span>]}</span>\`</span>;
    <span class="hljs-keyword">const</span> label = citation.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^([KCO])(\\d+)$/</span>);
    <span class="hljs-keyword">if</span> (label !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-<span class="hljs-subst">\${label[<span class="hljs-number">1</span>].toLowerCase()}</span><span class="hljs-subst">\${label[<span class="hljs-number">2</span>]}</span>\`</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`cite-<span class="hljs-subst">\${citation.replace(<span class="hljs-string">'.'</span>, <span class="hljs-string">'-'</span>)}</span>\`</span>;
};

<span class="hljs-keyword">const</span> link = (<span class="hljs-attr">citation</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (citation.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">'['</span>)) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'['</span> + citation.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>, -<span class="hljs-number">1</span>).<span class="hljs-title function_">split</span>(<span class="hljs-string">','</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">number</span> =&gt;</span>
            <span class="hljs-string">\`&lt;a href="#cite-ref-<span class="hljs-subst">\${<span class="hljs-built_in">number</span>.trim()}</span>"&gt;<span class="hljs-subst">\${<span class="hljs-built_in">number</span>.trim()}</span>&lt;/a&gt;\`</span>).<span class="hljs-title function_">join</span>(<span class="hljs-string">', '</span>) + <span class="hljs-string">']'</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-string">\`&lt;a href="#<span class="hljs-subst">\${place(citation)}</span>"&gt;<span class="hljs-subst">\${citation}</span>&lt;/a&gt;\`</span>;
};

<span class="hljs-keyword">const</span> mention = (<span class="hljs-attr">passage</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">sections</span>: <span class="hljs-built_in">boolean</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span>
    passage.<span class="hljs-title function_">split</span>(<span class="hljs-regexp">/(&lt;[^&gt;]*&gt;)/</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">piece, index, pieces</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (piece.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">'&lt;'</span>)) <span class="hljs-keyword">return</span> piece;
        <span class="hljs-keyword">const</span> previous = pieces[index - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">const</span> lead = previous !== <span class="hljs-literal">undefined</span> &amp;&amp; previous.<span class="hljs-title function_">includes</span>(<span class="hljs-string">'id="cite-'</span>)
            ? (piece.<span class="hljs-title function_">match</span>(<span class="hljs-regexp">/^(?:[KCO]\\d+|\\d+\\.\\d+|\\d+\\.)/</span>) ?? [<span class="hljs-string">''</span>])[<span class="hljs-number">0</span>]
            : <span class="hljs-string">''</span>;
        <span class="hljs-keyword">return</span> lead + piece.<span class="hljs-title function_">slice</span>(lead.<span class="hljs-property">length</span>).<span class="hljs-title function_">replace</span>(cited, <span class="hljs-function"><span class="hljs-params">found</span> =&gt;</span>
            !sections &amp;&amp; <span class="hljs-regexp">/^[Ss]ection/</span>.<span class="hljs-title function_">test</span>(found) ? found : <span class="hljs-title function_">link</span>(found));
    }).<span class="hljs-title function_">join</span>(<span class="hljs-string">''</span>);

<span class="hljs-keyword">const</span> connect = (<span class="hljs-attr">rendered</span>: <span class="hljs-built_in">string</span>): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> identified = rendered
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;h2&gt;(\\d+)\\. /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, section</span>) =&gt;</span> <span class="hljs-string">\`&lt;h2 id="cite-sec-<span class="hljs-subst">\${section}</span>"&gt;<span class="hljs-subst">\${section}</span>. \`</span>)
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;(strong|td)&gt;(\\d+)\\.(\\d+) /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, tag, section, part</span>) =&gt;</span> <span class="hljs-string">\`&lt;<span class="hljs-subst">\${tag}</span> id="cite-<span class="hljs-subst">\${section}</span>-<span class="hljs-subst">\${part}</span>"&gt;<span class="hljs-subst">\${section}</span>.<span class="hljs-subst">\${part}</span> \`</span>)
        .<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;(strong|td)&gt;([KCO])(\\d+) /g</span>, <span class="hljs-function">(<span class="hljs-params">whole, tag, letter, <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-string">\`&lt;<span class="hljs-subst">\${tag}</span> id="cite-<span class="hljs-subst">\${letter.toLowerCase()}</span><span class="hljs-subst">\${<span class="hljs-built_in">number</span>}</span>"&gt;<span class="hljs-subst">\${letter}</span><span class="hljs-subst">\${<span class="hljs-built_in">number</span>}</span> \`</span>);
    <span class="hljs-keyword">const</span> boundary = identified.<span class="hljs-title function_">indexOf</span>(<span class="hljs-string">'&lt;h2&gt;Related work&lt;/h2&gt;'</span>);
    <span class="hljs-keyword">if</span> (boundary === -<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-title function_">mention</span>(identified, <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> references = identified.<span class="hljs-title function_">slice</span>(boundary).<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/&lt;li&gt;/g</span>, <span class="hljs-function">() =&gt;</span> <span class="hljs-string">\`&lt;li id="cite-ref-<span class="hljs-subst">\${++count}</span>"&gt;\`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">mention</span>(identified.<span class="hljs-title function_">slice</span>(<span class="hljs-number">0</span>, boundary), <span class="hljs-literal">true</span>) + <span class="hljs-title function_">mention</span>(references, <span class="hljs-literal">false</span>);
};

<span class="hljs-comment">// THE DOCUMENT RENDERS VERBATIM, Doug, 2026-11-16: "This is what it looks like. Read the markdown. Render it</span>
<span class="hljs-comment">// like that. I said verbatim" — the chapter's appended markdown parsed by marked, the package's own dependency,</span>
<span class="hljs-comment">// and drawn as the document renders: the bold lead-ins, the tables, the lists, the document's own title.</span>
<span class="hljs-comment">// A citation click turns the page itself — the hash never moves, so the place in the address stays the chapter's.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Markdown</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Paragraph</span> {
    $identifier = <span class="hljs-string">''</span>;

    follow = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLDivElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> citation = (press.<span class="hljs-property">target</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Element</span>).<span class="hljs-title function_">closest</span>(<span class="hljs-string">'a[href^="#cite-"]'</span>);
        <span class="hljs-keyword">if</span> (citation === <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>;
        press.<span class="hljs-title function_">preventDefault</span>();
        <span class="hljs-keyword">const</span> landing = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(citation.<span class="hljs-title function_">getAttribute</span>(<span class="hljs-string">'href'</span>)?.<span class="hljs-title function_">slice</span>(<span class="hljs-number">1</span>) ?? <span class="hljs-string">''</span>);
        landing?.<span class="hljs-title function_">scrollIntoView</span>({ <span class="hljs-attr">behavior</span>: <span class="hljs-string">'smooth'</span>, <span class="hljs-attr">block</span>: <span class="hljs-string">'center'</span> });
    };

    <span class="hljs-keyword">get</span> <span class="hljs-title function_">append</span>(): $Append | <span class="hljs-literal">undefined</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">chapter</span>?.<span class="hljs-property">annotations</span>.<span class="hljs-title function_">find</span>($Append).<span class="hljs-title function_">find</span>(<span class="hljs-function"><span class="hljs-params">append</span> =&gt;</span> append.<span class="hljs-property">$identifier</span> === <span class="hljs-variable language_">this</span>.<span class="hljs-property">$identifier</span>);
    }

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">const</span> append = <span class="hljs-variable language_">this</span>.<span class="hljs-property">append</span>;
        <span class="hljs-keyword">if</span> (append === <span class="hljs-literal">undefined</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> rendered = <span class="hljs-title function_">connect</span>(marked.<span class="hljs-title function_">parse</span>(html.<span class="hljs-title function_">copy</span>(append.<span class="hljs-property">text</span>), { <span class="hljs-attr">async</span>: <span class="hljs-literal">false</span> }));
        <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>\`<span class="hljs-attr">pc-doc-</span>\${<span class="hljs-attr">this.</span>$<span class="hljs-attr">identifier</span>}\`} <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.follow}</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{</span> <span class="hljs-attr">__html:</span> <span class="hljs-attr">rendered</span> }} /&gt;</span></span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-markdown'</span>);
    }
}

<span class="hljs-comment">// THE IMPLEMENTATION CITES THE SPECIFICATION, Doug, 2026-11-16: "there needs to be some relationship between</span>
<span class="hljs-comment">// the spec and the implementation" — the deliverable cites the part of the specification it meets, by number</span>
<span class="hljs-comment">// or label, and the citation leads there: it flips the content to the project side and lands on the part named.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Cite</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    $part = <span class="hljs-string">''</span>;

    <span class="hljs-comment">// The part is read back from the clicked anchor's own text: the handler's instance predates the pass</span>
    <span class="hljs-comment">// that applies props to the held one, so the rendered citation is the one source the click can trust.</span>
    <span class="hljs-comment">// The flip and the landing scroll both run inside the view transition's update, so the dissolve lands</span>
    <span class="hljs-comment">// directly on the cited clause.</span>
    follow = (<span class="hljs-attr">press</span>: <span class="hljs-title class_">MouseEvent</span>&lt;<span class="hljs-title class_">HTMLAnchorElement</span>&gt;): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> part = press.<span class="hljs-property">currentTarget</span>.<span class="hljs-property">textContent</span> ?? <span class="hljs-string">''</span>;
        <span class="hljs-keyword">const</span> turn = (): <span class="hljs-function"><span class="hljs-params">void</span> =&gt;</span> {
            <span class="hljs-keyword">const</span> flip = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">'pc-flip'</span>);
            <span class="hljs-keyword">if</span> (flip <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTMLInputElement</span>) flip.<span class="hljs-property">checked</span> = <span class="hljs-literal">true</span>;
            <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-title function_">place</span>(part))?.<span class="hljs-title function_">scrollIntoView</span>({ <span class="hljs-attr">block</span>: <span class="hljs-string">'center'</span> });
        };
        <span class="hljs-keyword">const</span> doc = <span class="hljs-variable language_">document</span> <span class="hljs-keyword">as</span> <span class="hljs-title class_">Document</span> &amp; { <span class="hljs-attr">startViewTransition</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">update</span>: () =&gt; <span class="hljs-built_in">void</span></span>) =&gt;</span> <span class="hljs-built_in">unknown</span> };
        <span class="hljs-keyword">if</span> (doc.<span class="hljs-property">startViewTransition</span> === <span class="hljs-literal">undefined</span>) <span class="hljs-title function_">turn</span>();
        <span class="hljs-keyword">else</span> doc.<span class="hljs-title function_">startViewTransition</span>(turn);
    };

    <span class="hljs-keyword">override</span> <span class="hljs-title function_">write</span>(): <span class="hljs-title class_">ReactNode</span> {
        <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.follow}</span>&gt;</span>{this.$part}<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>;
    }

    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-cite'</span>);
    }
}

<span class="hljs-comment">// THE INTERPOLATED PART, Doug, 2026-11-16: "interpolated string-like parts that might describe where something</span>
<span class="hljs-comment">// will go when we find it" — a word standing for the thing itself until the thing is found, by the interpolation</span>
<span class="hljs-comment">// rule of the specification's form.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">$Interpolated</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">$Word</span> {
    <span class="hljs-keyword">protected</span> <span class="hljs-keyword">override</span> $Define(): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">super</span>.$Define();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">classes</span>.<span class="hljs-title function_">add</span>(<span class="hljs-variable language_">this</span>, <span class="hljs-string">'pc-interpolated'</span>);
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Content</span> = $($Content);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Project</span> = $($Project);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Specification</span> = $($Specification);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Progress</span> = $($Progress);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Markdown</span> = $($Markdown);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Cite</span> = $($Cite);
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-title class_">Interpolated</span> = $($Interpolated);
</code></pre></div><div class="pd-paragraph pd-navigation"><a href="/inexplicable-phenomena/our-reference/#the-specification" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pd-previous pa-reference">◁</span></a><a href="/inexplicable-phenomena/our-reference/#table-of-contents" class="sc-eCAoTo pa-reference pd-container"><span class="pd-word pa-reference">☐</span></a><a href="/inexplicable-phenomena/our-reference/#the-content" class="sc-jSFhYz sc-gKzYWW pa-reference pa-self-reference pd-container"><span class="pd-word pd-next pa-reference pa-self-reference">▷</span></a></div></div></div></div></div><!--/$--></div>
  

<style id="sk-sheet">
/* THE EDITOR'S OWN RULES, sk- throughout, never the print's class names. The listing is his, the numbers as in
   The Listing's sheet; what this sketch asks is the editor view: the table of contents as the tree at the left in
   the page's own voice, the chapter's words beside it, and the file beside the words, all on paper, with the
   words put away when the file is wanted alone. */
.sk-switches { position: fixed; left: 12px; bottom: 12px; z-index: 20; display: flex; gap: 6px; align-items: center; font: 12px Georgia, serif; }
.sk-switches b { font-weight: normal; letter-spacing: .15em; text-transform: uppercase; opacity: .6; margin-right: 4px; }
.sk-switches button { font: inherit; padding: 3px 8px; border: 1px solid rgba(27, 27, 27, .35); background: #fff; cursor: pointer; }
.sk-switches button[aria-pressed="true"] { background: #1b1b1b; color: #fff; border-color: #1b1b1b; }

.sk-editor {
    --night: oklch(0.294 0.028 222.6);
    --dusk-top: oklch(0.414 0.026 219.3);
    --dusk: oklch(0.334 0.030 219.3);
    --bar-line: oklch(0.472 0.042 183.1);
    --glow: #d6e1e3;
    --dim: oklch(0.508 0.053 170.2);
    --brass: #d8c48e;
    --keyword: #8ad7ff;
    --string: #ffd48a;
    --name: #9be3d6;
    --comment: #5f8a86;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    margin-block: 1.25rem;
    background: var(--night);
    color: var(--glow);
}
.sk-editor.sk-light {
    --night: #f6f7f4;
    --dusk-top: oklch(0.952 0.007 90);
    --dusk: #eceee8;
    --bar-line: oklch(0.912 0.027 90);
    --glow: #2b363c;
    --dim: oklch(0.738 0.033 88.3);
    --brass: #5d4a16;
    --keyword: #5a4fa8;
    --string: #2f7f6e;
    --name: #23407a;
    --comment: #8a94a3;
    box-shadow: inset 0 0 0 1px rgba(27, 27, 27, .12);
}
.sk-bar { display: flex; align-items: stretch; gap: 1px; padding: 0 0 0 2px; background: linear-gradient(180deg, var(--dusk-top), var(--dusk)); border-block-end: thin solid var(--bar-line); }
.sk-tab { display: flex; align-items: center; gap: 7px; padding: 9px 14px 8px 12px; border: 0; border-block-start: 2px solid transparent; background: none; font: 500 12px/1 'JetBrains Mono', ui-monospace, monospace; color: color-mix(in oklch, var(--glow) 62%, var(--night)); cursor: pointer; }
.sk-tab[aria-pressed="true"] { color: var(--glow); background: var(--night); border-block-start-color: var(--brass); }
.sk-mark { color: #9aa4b3; font-size: 13px; letter-spacing: -1px; }
.sk-tab[aria-pressed="true"] .sk-mark { color: var(--brass); }
.sk-options { display: flex; align-items: center; gap: 2px; margin-inline-start: auto; padding: 0 8px 0 4px; border-inline-start: thin solid color-mix(in oklch, var(--glow) 12%, transparent); }
.sk-options button, .sk-modes button { border: 0; background: none; padding: 5px 7px; font-family: Georgia, serif; font-size: 11.9px; letter-spacing: .15em; text-transform: uppercase; color: color-mix(in oklch, var(--glow) 55%, var(--night)); cursor: pointer; white-space: nowrap; }
.sk-options button[aria-pressed="true"] { color: var(--glow); background: color-mix(in oklch, var(--glow) 10%, transparent); }
.sk-modes { display: flex; align-items: center; gap: 2px; padding: 0 8px 0 4px; border-inline-start: thin solid color-mix(in oklch, var(--glow) 12%, transparent); }
.sk-modes button { color: var(--brass); }
.sk-modes button[aria-pressed="true"] { color: var(--glow); background: color-mix(in oklch, var(--glow) 10%, transparent); }
.sk-pane { max-height: 70vh; overflow: auto; scrollbar-width: thin; scrollbar-color: transparent transparent; }
.sk-pane:hover { scrollbar-color: var(--dim) transparent; }
.sk-pane pre.pd-code { margin: 0; padding: 14px 0; border: 0; font: 400 12px/20.4px 'JetBrains Mono', ui-monospace, monospace; color: var(--glow); background: transparent; white-space: normal; overflow: visible; }
.sk-line { display: block; white-space: pre; padding-inline-end: 18px; }
.sk-line::before { content: attr(data-line); display: inline-block; width: 44px; padding-inline-end: 14px; text-align: end; color: var(--dim); user-select: none; }
.sk-editor.sk-unnumbered .sk-line::before { content: ''; width: 14px; padding: 0; }
.sk-editor.sk-wrap .sk-line { white-space: pre-wrap; padding-inline-start: 58px; text-indent: -58px; }
.sk-editor.sk-wrap .sk-line::before { text-indent: 0; }
.sk-pane .hljs-keyword, .sk-pane .hljs-built_in, .sk-pane .hljs-literal { color: var(--keyword); }
.sk-pane .hljs-string, .sk-pane .hljs-regexp, .sk-pane .hljs-number { color: var(--string); }
.sk-pane .hljs-title, .sk-pane .hljs-type, .sk-pane .hljs-tag, .sk-pane .hljs-name, .sk-pane .hljs-attr { color: var(--name); }
.sk-pane .hljs-comment, .sk-pane .hljs-meta { color: var(--comment); }

/* the file's page: a running head naming the file, the editor under it */
.sk-file-head { display: flex; justify-content: flex-end; align-items: center; gap: .6em; margin: 0 0 1.25rem; padding-block-end: .5rem; border-block-end: 1px solid rgba(27, 27, 27, .18); font-size: 11.9px; letter-spacing: .15em; text-transform: uppercase; color: #1f4e79; }
.sk-file-head .sk-file-name { font: 500 12px 'JetBrains Mono', ui-monospace, monospace; letter-spacing: 0; text-transform: none; color: #1b1b1b; }
.sk-file-head .sk-file-label { opacity: .6; color: #1b1b1b; }

/* the tree: the table of contents down the left in the page's own voice, the open chapter marked, each file beneath its chapter */
.sk-tree { display: none; }
body[data-form^="editor"] .sk-tree { position: sticky; top: 0; align-self: start; display: block; box-sizing: border-box; height: 100vh; overflow: auto; padding: 1.25rem 1.25rem 1.25rem 1.5rem; font-size: .86em; scrollbar-width: thin; scrollbar-color: transparent transparent; }
body[data-form^="editor"] .sk-tree:hover { scrollbar-color: rgba(27, 27, 27, .25) transparent; }
.sk-tree .sk-tree-head { margin: 2.5rem 0 1rem; font-size: 11.9px; letter-spacing: .15em; text-transform: uppercase; opacity: .6; }
.sk-tree a { display: block; color: inherit; text-decoration: none; }
.sk-tree .sk-tree-chapter { margin: 0 0 .25rem -1.5rem; padding: .15rem 0 .15rem calc(1.5rem - 2px); border-inline-start: 2px solid transparent; color: rgba(27, 27, 27, .72); }
.sk-tree .sk-tree-chapter.sk-open { border-inline-start-color: #1f4e79; color: #1b1b1b; }
.sk-tree .sk-tree-file { display: flex; align-items: center; gap: .4rem; margin: 0 0 .45rem 1rem; font: 400 12px 'JetBrains Mono', ui-monospace, monospace; color: rgba(27, 27, 27, .55); }
.sk-tree .sk-tree-file.sk-open { color: #1f4e79; }
.sk-tree .sk-tree-file .sk-mark { color: #9aa4b3; }
.sk-tree .sk-tree-file.sk-open .sk-mark { color: #1f4e79; }

/* the editor: the tree, the words and the file across the window, three pages of one sheet */
body[data-form^="editor"] .sk-sheet { max-width: none; display: grid; grid-template-columns: 13rem minmax(0, 36rem) minmax(0, 1fr); margin-inline: 0; padding: 0; }
body[data-form^="editor"] .sk-sheet > .sk-words { box-sizing: border-box; min-width: 0; padding: 1.25rem 1.5rem; }
.sk-editor, .sk-pane { min-width: 0; }
.sk-editor { grid-template-columns: minmax(0, 1fr); }
.sk-bar { min-width: 0; flex-wrap: wrap; }
body[data-form^="editor"] .sk-sheet > .sk-words .pd-book { max-width: 40rem; margin-inline: auto; }
body[data-form^="editor"] .sk-sheet > .sk-words .sk-editor { display: none; }
body[data-form^="editor"] .sk-file { position: sticky; top: 0; align-self: start; box-sizing: border-box; min-width: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); height: 100vh; padding: 1.25rem 2rem; background: #fff; }
body[data-form^="editor"] .sk-file .sk-file-head { margin-block: 2.5rem 1.25rem; }
body[data-form^="editor"] .sk-file .sk-editor { margin: 0 0 1.25rem; min-height: 0; }
body[data-form^="editor"] .sk-file .sk-pane { max-height: none; }
/* the words put away: the tree and the file alone */
body[data-form="editor-code"] .sk-sheet { grid-template-columns: 13rem minmax(0, 1fr); }
body[data-form="editor-code"] .sk-sheet > .sk-words { display: none; }

/* the foot: the appendix as a part of the table, its chapters at the bottom in the smaller voice, each file a press beneath */
.sk-appendix { display: none; }
body[data-form="foot"] .sk-appendix { display: block; margin-block-start: 2.5rem; padding-block-start: 1rem; border-block-start: 1px solid rgba(27, 27, 27, .15); font-size: .86em; opacity: .82; }
.sk-appendix .pd-heading { font-weight: bold; margin-block: 0 .6rem; }
.sk-appendix .pd-paragraph { margin-block: .3rem 0; }
.sk-appendix a { text-decoration: none; color: inherit; }
.sk-appendix .sk-press { display: flex; align-items: center; gap: .4rem; margin: 0 0 .5rem 1.4rem; font: 400 12px 'JetBrains Mono', ui-monospace, monospace; color: rgba(27, 27, 27, .6); }
.sk-press .sk-mark { color: #9aa4b3; }

@media (max-width: 640px) {
    body[data-form^="editor"] .sk-sheet { display: block; }
    body[data-form^="editor"] .sk-tree { display: none; }
    body[data-form="editor-code"] .sk-sheet > .sk-words { display: block; }
    body[data-form^="editor"] .sk-sheet > .sk-words { padding: 1.25rem; }
    body[data-form^="editor"] .sk-file { position: static; height: auto; border: 0; box-shadow: none; padding: 0 1.25rem 1.25rem; }
    body[data-form^="editor"] .sk-file .sk-file-head { margin-block: 0 1rem; }
    body[data-form^="editor"] .sk-file .sk-pane { max-height: 70vh; }
    .sk-bar { flex-wrap: wrap; }
}
</style>
<script>
// The switch between the forms of The Editor, remembered in the address's hash so a photograph can ask for one:
// page opens the chapter The Faces as bound with its plate; editor opens it in the editor view, the table of
// contents as the tree at the left, the words beside it and the file beside the words; editor-code puts the words
// away; editor-light asks for the light palette; foot opens the table with the appendix as a part at its foot.
(() => {
    const files = {
        'the-book': [1, 'code.tsx'], 'the-theme': [2, 'code.tsx'], 'the-running-head-and-the-byline': [3, 'code.tsx'],
        'the-faces': [4, 'code.tsx'], 'developing-the-library': [5, 'workbench.mjs'], 'the-paper': [6, 'code.tsx'],
        'the-reference-manual': [7], 'the-specification': [8], 'the-content': [9, 'code.tsx'],
    };
    const forms = { page: 'the page', editor: 'the editor', 'editor-code': 'the editor, words away', foot: 'the foot' };
    const sheet = document.getElementById('root').firstElementChild;
    sheet.classList.add('sk-sheet');
    const words = sheet.firstElementChild;
    words.classList.add('sk-words');
    const chapters = [...document.querySelectorAll('.pd-chapter.pd-canonical')];
    const table = document.querySelector('.pd-chapter.pa-table-of-contents');
    const faces = chapters.find(chapter => chapter.querySelector('.pd-title')?.id === 'the-faces');

    const numbered = code => {
        const open = [];
        return code.innerHTML.split('\\n').map((line, index) => {
            const carried = open.join('');
            for (const tag of line.match(/<\\/?span[^>]*>/g) ?? []) {
                if (tag.startsWith('</')) open.pop(); else open.push(tag);
            }
            return \`<span class="sk-line" data-line="\${index + 1}">\${carried}\${line}\${'</span>'.repeat(open.length)}</span>\`;
        }).join('\\n');
    };

    const editors = new Map();
    for (const chapter of chapters) {
        const id = chapter.querySelector('.pd-title')?.id;
        const [number, name] = files[id] ?? [];
        chapter.dataset.name = chapter.querySelector('.pd-title').textContent;
        chapter.dataset.id = id;
        const pre = chapter.querySelector(':scope > pre.pd-code');
        if (!pre || !name) continue;
        const editor = document.createElement('div');
        editor.className = 'sk-editor';
        editor.innerHTML = \`<div class="sk-bar"><button type="button" class="sk-tab" aria-pressed="true"><span class="sk-mark">&lsaquo;&rsaquo;</span>\${name}</button><span class="sk-options"><button type="button" data-option="light">light</button><button type="button" data-option="wrap">wrap</button><button type="button" data-option="lines" aria-pressed="true">lines</button></span><span class="sk-modes"><button type="button" data-mode="words">words</button><button type="button" data-mode="page">the page</button><button type="button" data-mode="editor">the editor</button></span></div><div class="sk-pane"></div>\`;
        const code = pre.querySelector('code');
        code.innerHTML = numbered(code);
        pre.remove();
        editor.querySelector('.sk-pane').appendChild(pre);
        chapter.dataset.file = \`\${number}-\${id}~\${name}\`;
        chapter.appendChild(editor);
        editors.set(chapter, editor);
        const option = (word, className) => {
            const button = editor.querySelector(\`[data-option="\${word}"]\`);
            button.addEventListener('click', () => {
                editor.classList.toggle(className);
                button.setAttribute('aria-pressed', String(word === 'lines' ? !editor.classList.contains(className) : editor.classList.contains(className)));
            });
        };
        option('light', 'sk-light');
        option('wrap', 'sk-wrap');
        option('lines', 'sk-unnumbered');
        editor.querySelector('[data-mode="page"]').addEventListener('click', () => choose('page', undefined, chapter));
        editor.querySelector('[data-mode="editor"]').addEventListener('click', () => choose('editor', undefined, chapter));
        // The words: shown or put away within the editor, as his words tab does.
        editor.querySelector('[data-mode="words"]').addEventListener('click', () => choose(document.body.dataset.form === 'editor' ? 'editor-code' : 'editor', undefined, chapter));
    }

    const openPage = chapter => {
        for (const page of document.querySelectorAll('.pa-page.pa-open')) page.classList.remove('pa-open');
        chapter.classList.add('pa-open');
        window.scrollTo(0, 0);
    };

    // The tree: the contents down the left, every chapter a row and every file a press beneath its chapter.
    const tree = document.createElement('nav');
    tree.className = 'sk-tree';
    tree.innerHTML = '<div class="sk-tree-head">Contents</div>';
    for (const chapter of chapters) {
        const row = document.createElement('a');
        row.href = '#';
        row.className = 'sk-tree-chapter';
        row.textContent = chapter.dataset.name;
        row.dataset.id = chapter.dataset.id;
        row.addEventListener('click', event => { event.preventDefault(); choose(document.body.dataset.form.startsWith('editor') ? document.body.dataset.form : 'editor', undefined, chapter); });
        tree.appendChild(row);
        if (!editors.has(chapter)) continue;
        const press = document.createElement('a');
        press.href = '#';
        press.className = 'sk-tree-file';
        press.dataset.id = chapter.dataset.id;
        press.innerHTML = \`<span class="sk-mark">&lsaquo;&rsaquo;</span>\${chapter.dataset.file.replace(/^.*~/, '')}\`;
        press.addEventListener('click', event => { event.preventDefault(); choose('editor-code', undefined, chapter); });
        tree.appendChild(press);
    }

    // The file's page, beside the words: a running head naming the file, the editor under it.
    const file = document.createElement('div');
    file.className = 'sk-file';
    file.innerHTML = '<div class="sk-file-head"><span class="sk-file-label">The file beside the chapter</span><span class="sk-file-name"></span></div>';

    // foot: the appendix as a part at the foot of the table, its chapters as rows and each file a press beneath.
    const appendix = document.createElement('div');
    appendix.className = 'pd-section sk-appendix';
    appendix.innerHTML = '<div class="pd-sentence pd-heading">Appendix</div>';
    for (const chapter of editors.keys()) {
        const row = document.createElement('a');
        row.href = '#';
        row.className = 'pa-reference pd-container';
        row.innerHTML = \`<div class="pd-paragraph pa-reference"><span class="pa-content">\${chapter.dataset.name}</span></div>\`;
        row.addEventListener('click', event => { event.preventDefault(); choose('editor', undefined, chapter); });
        const press = document.createElement('a');
        press.href = '#';
        press.className = 'sk-press';
        press.innerHTML = \`<span class="sk-mark">&lsaquo;&rsaquo;</span>\${chapter.dataset.file.replace(/^.*~/, '')}\`;
        press.addEventListener('click', event => { event.preventDefault(); choose('editor', undefined, chapter); });
        appendix.append(row, press);
    }
    table.appendChild(appendix);

    const bar = document.createElement('div');
    bar.className = 'sk-switches';
    const label = document.createElement('b');
    label.textContent = 'the editor';
    bar.appendChild(label);
    const buttons = {};
    for (const [key, name] of Object.entries(forms)) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = name;
        button.addEventListener('click', () => choose(key));
        buttons[key] = button;
        bar.appendChild(button);
    }
    document.body.appendChild(bar);

    const choose = (form, state, chapter = faces) => {
        document.body.dataset.form = form;
        const inEditor = form.startsWith('editor');
        for (const [one, editor] of editors) {
            editor.classList.remove('sk-light');
            editor.querySelector('[data-option="light"]').setAttribute('aria-pressed', 'false');
            editor.querySelector('[data-mode="page"]').setAttribute('aria-pressed', String(form === 'page'));
            editor.querySelector('[data-mode="editor"]').setAttribute('aria-pressed', String(inEditor));
            editor.querySelector('[data-mode="words"]').setAttribute('aria-pressed', String(form === 'editor'));
            if (editor.parentElement !== one) one.appendChild(editor);
        }
        tree.remove();
        file.remove();
        const editor = editors.get(chapter);
        if (inEditor) {
            sheet.prepend(tree);
            file.querySelector('.sk-file-name').textContent = chapter.dataset.file;
            file.appendChild(editor);
            sheet.appendChild(file);
            for (const row of tree.querySelectorAll('[data-id]')) row.classList.toggle('sk-open', row.dataset.id === chapter.dataset.id);
        }
        for (const [key, button] of Object.entries(buttons)) button.setAttribute('aria-pressed', String(key === form));
        openPage(form === 'foot' ? table : chapter);
        if (state === 'light') editor.querySelector('[data-option="light"]').click();
        if (form === 'page') window.scrollTo(0, editor.getBoundingClientRect().top + window.scrollY - 24);
        const hash = \`#\${form}\${state === undefined ? '' : \`-\${state}\`}\`;
        if (location.hash !== hash) history.replaceState(null, '', hash);
    };
    const asked = () => {
        const said = location.hash.slice(1);
        const form = said.startsWith('editor-code') ? 'editor-code' : said.split('-')[0];
        const state = said.endsWith('-light') ? 'light' : undefined;
        choose(forms[form] ? form : 'editor', state);
    };
    asked();
    window.addEventListener('hashchange', asked);
})();
<\/script>
</body></html>`})]}),"TheManualsPage2"),ce=p(()=>n(x,{children:[e(y,{children:"[The Project's Page](/inexplicable-phenomena/the-design/#the-projects-page)"}),n(c,{children:[e(h,{children:"The sketch of the parts"}),n(a,{children:["The first sketch of the project's page asks how the five parts of a project — specification, identification, justification, intuition, progress — stand on one page in their own forms, with views chosen instead of scrolled. It is built from Sprint 130's own record, the sprint rendered as its own exploration. The views bar shows all of the parts or one; two squares in the toggle's dress switch the layers — justifications, each mark carrying the anchor it sits on and the clauses it claims, possibly several, with its line of argument, itself a thing to view in its own right, and references, the citations that join the parts and drain to ink when hidden. The specification renders its clauses in the literal markdown of ",e(j,{children:"[The Specification](/inexplicable-phenomena/our-reference/#the-specification)"}),", coverage in the margin reading satisfied or open; the identification is five anchored statements, each the form a part takes, a justified statement ruled at its left; the intuition is a small graph of principles, stated so they can be compared, where a relationship between two principles is itself a principle; the progress is a journal of bylined, dated entries, one really struck by the Archive mark that closed it. The forms: registers, each part in the voice its meaning first suggested — legal, formal, essay, journal; and integrated, on my word mid-sketch that everything in the project part should at least share a font, though not necessarily in markdown form — the parts in one source face, the markdown's dashes gone, its marks softened, the whole smoother and subtler. And the structure underneath is interactive: a press on a justification's mark turns the page into that justification in its own right — its clauses, possibly several, and its entry travelling to stand face to face with the argument between them — and a press on the connecting principle stands the edge between its ends; the page is one projection of the project's graph, and a press moves to another."]}),n(a,{children:["What the sketch found: a dotted underline across a justified statement read loud and became the pale rule at its left; with references off the teal drains to ink and every part still reads whole, which is the test that references are connection and not content; a citation pressed in one view turns the page to all of them and lands on its target, the two-way navigation a coverage view will need; the margin marks have no phone answer yet, since at the phone's width there is no margin to stand in; and the struck entry keeps its strike when the annotation layer is off, the strike being the entry's state and the note only its explanation. A ruling fell on hierarchy as the sketch was photographed: the title of a section needs to be more important, and markdown's own headings should hardly exceed the body — a little bold, not much, partially rendered — said for this page and for the arithmetic specification alike, so the correction went into ",e(j,{children:"[The Content](/inexplicable-phenomena/our-reference/#the-content)"})," in the same stroke. Nothing else here moved into the manual or the record's specification."]})]}),n(c,{children:[e(h,{children:"The photographs of the parts"}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-registers-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-integrated-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-specification-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-identification-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-intuition-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-progress-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-bare-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-justification-opened-desk.png"})}),e(a,{children:e(l,{children:"/inexplicable-phenomena/.subject/.design/3-the-projects-page~the-parts-edge-opened-desk.png"})})]}),e(w,{identifier:"the-parts",type:".html",children:`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The Parts of the Project</title>
<style>
:root {
    --ink: rgb(27, 27, 27);
    --teal: rgb(31, 78, 121);
    --side: #fbfcfd;
    --serif: Georgia, "Times New Roman", serif;
    --mono: Consolas, "Courier New", monospace;
    --space: 20px;
}
* { box-sizing: border-box; }
body {
    margin: 0;
    background: var(--side);
    color: var(--ink);
    font-family: var(--serif);
    font-size: 17px;
    line-height: 27.2px;
}
.sheet {
    max-width: 1100px;
    margin: 0 auto;
    background: #fff;
    min-height: 100vh;
    padding: 56px 0 120px;
}
.col { width: 640px; margin: 0 auto; }

input[type="radio"] { position: absolute; opacity: 0; pointer-events: none; }

.views {
    display: flex;
    flex-wrap: wrap;
    row-gap: 8px;
    align-items: center;
    gap: 22px;
    font-size: 11.9px;
    letter-spacing: 1.785px;
    text-transform: uppercase;
    margin-bottom: 56px;
}
.views label { cursor: pointer; opacity: .45; padding-bottom: 3px; border-bottom: 2px solid transparent; }
.views .gap { flex: 1; }
.views .cluster { display: flex; align-items: center; gap: 22px; white-space: nowrap; }
.views .layer { display: flex; align-items: center; gap: 7px; opacity: .8; }
.layer input {
    appearance: none;
    width: 15.3px;
    height: 15.3px;
    border: 1px solid rgb(107, 107, 107);
    background: #fff;
    margin: 0;
    cursor: pointer;
}
.layer input:checked { border-width: 3px; }

body:has(#f-a:checked) label[for="f-a"],
body:has(#f-b:checked) label[for="f-b"],
body:has(#v-all:checked) label[for="v-all"],
body:has(#v-spec:checked) label[for="v-spec"],
body:has(#v-ident:checked) label[for="v-ident"],
body:has(#v-int:checked) label[for="v-int"],
body:has(#v-prog:checked) label[for="v-prog"] { opacity: 1; border-bottom-color: var(--teal); }

body:has(#v-spec:checked) .part:not(#specification) { display: none; }
body:has(#v-ident:checked) .part:not(#identification) { display: none; }
body:has(#v-int:checked) .part:not(#intuition) { display: none; }
body:has(#v-prog:checked) .part:not(#progress) { display: none; }

.label {
    font-size: 11.9px;
    letter-spacing: 1.785px;
    text-transform: uppercase;
    opacity: .6;
}
h1 {
    font-family: var(--mono);
    font-size: 25.5px;
    font-weight: 700;
    line-height: 1.3;
    margin: 2px 0 var(--space);
}
h1 .hash { color: var(--teal); }

.part { margin-top: 56px; }
.part-head {
    font-size: 13.6px;
    font-weight: 600;
    letter-spacing: 1.785px;
    text-transform: uppercase;
    opacity: .8;
    margin: 0 0 var(--space);
}

a.cite { color: var(--teal); text-decoration: none; }
body:not(:has(#l-refs:checked)) a.cite { color: inherit; pointer-events: none; }

.md { font-family: var(--mono); font-size: 15.3px; line-height: 24px; }
.md .mdh {
    font-size: 15.3px;
    font-weight: 600;
    line-height: 24px;
    margin: var(--space) 0 calc(var(--space) / 4);
}
.md .mdh::before { content: "## "; color: var(--teal); }
.clause {
    position: relative;
    margin: 0;
    padding-left: 2ch;
    text-indent: -2ch;
}
.clause + .clause { margin-top: 6px; }

.anno {
    position: absolute;
    left: calc(100% + 32px);
    top: 2px;
    width: 196px;
    font-family: var(--serif);
    font-size: 12.5px;
    line-height: 18px;
    text-indent: 0;
    display: none;
}
body:has(#l-just:checked) .anno { display: block; }
.anno .tag {
    font-size: 10.5px;
    letter-spacing: 1.4px;
    text-transform: uppercase;
}
.anno .tag a, .anno .tag .open { letter-spacing: 1.4px; }
.anno .open { opacity: .45; }
.anno .why { opacity: .72; }

.statement { position: relative; margin-block: var(--space); }
.statement strong { font-style: normal; }
body:has(#l-just:checked) .statement.justified {
    border-left: 2px solid rgba(31, 78, 121, .28);
    padding-left: 16px;
    margin-left: -18px;
}

.entry { position: relative; margin-block: calc(var(--space) * 1.4); }
.byline {
    font-size: 11.9px;
    letter-spacing: 1.785px;
    text-transform: uppercase;
    opacity: .6;
    margin-bottom: 2px;
}
.ebody { margin: 0; }
.struck .ebody { text-decoration: line-through; opacity: .5; }
.struck .byline { opacity: .4; }

p { margin-block: var(--space); }

body:has(#f-b:checked) .statement,
body:has(#f-b:checked) #intuition p,
body:has(#f-b:checked) .ebody {
    font-family: var(--mono);
    font-size: 15.3px;
    line-height: 24px;
}
body:has(#f-b:checked) .dash { display: none; }

::view-transition-group(*) { animation-duration: .18s; }
@media (prefers-reduced-motion: reduce) {
    ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none; }
}
.press { cursor: pointer; }
#focus-back { display: none; }
body.focused #focus-back { display: block; margin-bottom: 36px; cursor: pointer; opacity: .6; }
body.focused .views, body.focused header { display: none; }
body.focused .part { display: none; }
body.focused .part.fshow { display: block; margin-top: 0; }
body.focused .part.fshow > * { display: none; }
body.focused .part.fshow .fkeep { display: block; }
body.focused .md.fkeep > * { display: none; }
body.focused .md.fkeep .clause.fkeep { display: block; padding-left: 0; text-indent: 0; }
body.focused .clause .anno { display: none !important; }
body.focused .clause.fkeep + .clause.fkeep { margin-top: 16px; }
body.focused .statement.fkeep { border-left: none; padding-left: 0; margin-left: 0; }
body.focused .statement.fkeep:has(.anno) { display: flex !important; flex-direction: column; }
body.focused .statement.fkeep .anno { display: block; position: static; width: auto; order: -1; font-size: 14.5px; line-height: 22px; margin: 32px 0; padding-left: 18px; border-left: 2px solid rgba(31, 78, 121, .35); }
body.focused .statement.fkeep .anno .why { opacity: .85; }
body.focused.focus-edge #intuition { display: flex !important; flex-direction: column; }
body.focused.focus-edge #p-1 { order: 1; }
body.focused.focus-edge #p-4 { order: 2; padding-left: 18px; border-left: 2px solid rgba(31, 78, 121, .35); margin-block: 32px; }
body.focused.focus-edge #p-2 { order: 3; }
body:has(#f-b:checked) .clause { padding-left: 0; text-indent: 0; }
body:has(#f-b:checked) .clause + .clause { margin-top: 10px; }
body:has(#f-b:checked) .md .mdh::before { opacity: .75; }
</style>
</head>
<body>

<input type="radio" name="view" id="v-all" checked>
<input type="radio" name="view" id="v-spec">
<input type="radio" name="view" id="v-ident">
<input type="radio" name="view" id="v-int">
<input type="radio" name="view" id="v-prog">
<input type="radio" name="form" id="f-a" checked>
<input type="radio" name="form" id="f-b">

<div class="sheet">
<div class="col">

<div id="focus-back" class="label">&larr; the page</div>

<nav class="views">
    <label for="v-all">All</label>
    <label for="v-spec">Specification</label>
    <label for="v-ident">Identification</label>
    <label for="v-int">Intuition</label>
    <label for="v-prog">Progress</label>
    <span class="gap"></span>
    <span class="cluster">
        <label for="f-a">Registers</label>
        <label for="f-b">Integrated</label>
        <span class="layer"><input type="checkbox" id="l-just" checked><label for="l-just" style="opacity:1;border:none;cursor:pointer">Justifications</label></span>
        <span class="layer"><input type="checkbox" id="l-refs" checked><label for="l-refs" style="opacity:1;border:none;cursor:pointer">References</label></span>
    </span>
</nav>

<header>
    <div class="label">Sprint 130</div>
    <h1><span class="hash"># </span>The Parts of the Project</h1>
</header>

<section class="part" id="specification" data-view="v-spec">
    <h2 class="part-head">Specification</h2>
    <div class="md">
        <div class="mdh" id="s-4">4. The parts</div>
        <p class="clause" id="s-4-1"><span class="dash">- </span>4.1 The parts, in the order of the work itself: you specify what you are looking for first; you try your best to identify the thing you are talking about justifiably; you build an intuition of what it might look like to find this blurry thing; and you express in narrative what it has meant to make progress.<span class="anno"><span class="tag"><span class="open">Open</span></span><span class="why"> — awaiting a justification on the rendered order.</span></span></p>
        <p class="clause" id="s-4-2"><span class="dash">- </span>4.2 A justification is an annotation on the identified formalism that proves the specification is satisfied — relatively, not completely formally — and justifications frequently map to the citations on the project side.<span class="anno"><span class="tag"><span class="open">Open</span></span><span class="why"> — satisfied when <a class="cite" href="#i-3">I3</a> carries its marks.</span></span></p>
        <div class="mdh" id="s-7">7. The structure of the parts</div>
        <p class="clause" id="s-7-1"><span class="dash">- </span>7.1 The specification is the agreement, so its unit is the clause — the atomic promise, uniquely numbered, citable; its form is the legal document. Satisfaction is judged clause by clause, which is why the clause is the unit.<span class="anno"><span class="tag"><a class="cite" href="#i-1">J1 · I1</a></span><span class="why"> — the clause form stands identified.</span></span></p>
        <p class="clause" id="s-7-2"><span class="dash">- </span>7.2 The identification states the thing, so its unit is the statement — a definition or a named object in the formal register, each carrying an anchor. It states and never narrates, because a justification must sit on a span that holds still.<span class="anno"><span class="tag"><a class="cite" href="#i-2">J2 · I2</a></span><span class="why"> — the statement form stands identified.</span></span></p>
        <p class="clause" id="s-7-3"><span class="dash">- </span>7.3 The justification is the justifiably, so its unit is the annotation with two mandatory references: the anchor it sits on in the identification, and the clause it claims satisfied — its writing arguing the claim in words. An annotation without a clause cite is an Idea, not a justification.<span class="anno"><span class="tag"><a class="cite" href="#i-3">J3 · I3</a></span><span class="why"> — the mark form stands identified.</span></span></p>
        <p class="clause" id="s-7-4"><span class="dash">- </span>7.4 The intuition pictures the blurry thing, so its unit is the essay paragraph in the deliverable's serif register, its references running outward to existing things and across to clauses and statements.<span class="anno"><span class="tag"><a class="cite" href="#i-4">J4 · I4</a></span><span class="why"> — the paragraph form stands identified.</span></span></p>
        <p class="clause" id="s-7-5"><span class="dash">- </span>7.5 The progress narrates, so its unit is the entry — byline and date as frontmatter, narrative prose as body, its references to the statements and clauses it narrates being its substance. Ruling out the past is an Archive mark that strikes an entry and never deletes it.<span class="anno"><span class="tag"><a class="cite" href="#i-5">J5 · I5</a></span><span class="why"> — the entry form stands identified.</span></span></p>
    </div>
</section>

<section class="part" id="identification" data-view="v-ident">
    <h2 class="part-head">Identification</h2>
    <div class="statement justified" id="i-1">
        <strong>I1 (The clause).</strong> <span class="jspan">A specification is a sequence of numbered, named sections holding dotted clauses; a clause is one promise, bearing one number, citable by it.</span> It renders in the legal register: literal markdown, the source face.
        <span class="anno"><span class="tag">J1 · satisfies <a class="cite" href="#s-7-1">7.1</a></span><br><span class="why">One number, one promise, citable — the clause as 7.1 asks it.</span></span>
    </div>
    <div class="statement justified" id="i-2">
        <strong>I2 (The statement).</strong> <span class="jspan">An identification is a sequence of anchored statements; a statement defines a term or names an object, and holds still under annotation.</span> It renders in the formal register: stated, never narrated.
        <span class="anno"><span class="tag">J2 · satisfies <a class="cite" href="#s-7-2">7.2</a></span><br><span class="why">Anchored and still — a span a mark can sit on, as 7.2 asks.</span></span>
    </div>
    <div class="statement justified" id="i-3">
        <strong>I3 (The justification mark).</strong> <span class="jspan">A justification is an annotation carrying two references — the anchor it sits on, the clause it claims — and a writing that argues the claim in words.</span> Missing its clause, it is an Idea; the marks on this page are the form shown on itself.
        <span class="anno"><span class="tag">J3 · satisfies <a class="cite" href="#s-7-3">7.3</a> · <a class="cite" href="#s-4-2">4.2</a></span><br><span class="why">Two references and an argument — relative proof, words plus citation; one mark may claim many clauses, and is a thing to view in its own right.</span></span>
    </div>
    <div class="statement justified" id="i-4">
        <strong>I4 (The essay paragraph).</strong> <span class="jspan">An intuition is serif prose in paragraphs, referencing outward to existing things and across to clauses and statements.</span> The loosest form, held only to its references resolving.
        <span class="anno"><span class="tag">J4 · satisfies <a class="cite" href="#s-7-4">7.4</a></span><br><span class="why">Paragraphs that cite — blurry words on firm anchors.</span></span>
    </div>
    <div class="statement justified" id="i-5">
        <strong>I5 (The entry).</strong> <span class="jspan">A progress is a time-ordered sequence of entries; an entry carries author and date as frontmatter, narrative as body, references as substance. A struck entry remains.</span>
        <span class="anno"><span class="tag">J5 · satisfies <a class="cite" href="#s-7-5">7.5</a></span><br><span class="why">Byline, date, narrative, references — and the past kept struck.</span></span>
    </div>
</section>

<section class="part" id="intuition" data-view="v-int">
    <h2 class="part-head">Intuition</h2>
    <div class="statement" id="p-1">
        <strong>P1 (The contract's ancestry).</strong> The specification descends from the service contract — agreed between buyer and seller, identifying the deliverable uniquely. A contract is honored or breached clause by clause, so the clause is the atom (<a class="cite" href="#s-7-1">7.1</a>).
    </div>
    <div class="statement" id="p-2">
        <strong>P2 (The talk page).</strong> The project stands to its deliverable as a talk page stands to its article — the same subject, the working face; the parts give it the spine a talk page never had (<a class="cite" href="#s-4-1">4.1</a>).
    </div>
    <div class="statement" id="p-3">
        <strong>P3 (The permutation).</strong> The parts keep recognizable forms inside one face — Sprint 129's test carried forward, identity preserved under the flip from writing to code (<a class="cite" href="#i-1">I1</a>–<a class="cite" href="#i-5">I5</a>).</div>
    <div class="statement" id="p-4">
        <strong>P4 (The borrowed form), connecting <a class="cite" href="#p-1">P1</a> · <a class="cite" href="#p-2">P2</a>.</strong> The back borrows an older form whose conventions already answer its questions — the contract for the specification, the talk page for the project. A relationship between intuitions is itself an intuition; the graph can tangle.
    </div>
    <div class="statement" id="p-5">
        <strong>P5 (What finding looks like).</strong> Blurry still: every clause of section 7 carrying at least one justification, the coverage reading satisfied all the way down, and this page — the sprint's own project — the first place that reading happens (<a class="cite" href="#s-7-3">7.3</a>).
    </div>
</section>

<section class="part" id="progress" data-view="v-prog">
    <h2 class="part-head">Progress</h2>
    <div class="entry">
        <div class="byline">Doug · 17 November</div>
        <p class="ebody">The sprint opened on the seed: refine the textbook chapter, say what progress means, make annotations toggleable, find the parts, and find views so we aren't scrolling constantly (<a class="cite" href="#s-4-1">4.1</a>).</p>
    </div>
    <div class="entry">
        <div class="byline">Arthur · 17 November</div>
        <p class="ebody">The first round landed: progress is the narrative glue; a justification proves the specification satisfied relatively, not completely formally (<a class="cite" href="#s-4-2">4.2</a>); intuition sits below identification, above progress.</p>
    </div>
    <div class="entry struck">
        <div class="byline">Arthur · 17 November</div>
        <p class="ebody">Open: whether identification stands among the project side's parts, or the ordering reads against the front.</p>
        <span class="anno"><span class="tag">Archived · ruled out by <a class="cite" href="#s-4-1">4.1</a></span><br><span class="why">The second round ruled the order of the work; the question closed.</span></span>
    </div>
    <div class="entry">
        <div class="byline">Arthur · 17 November</div>
        <p class="ebody">The second round ruled the order of the work itself: specify first, identify justifiably, picture the blurry thing, narrate what it has meant (<a class="cite" href="#s-4-1">4.1</a>).</p>
    </div>
    <div class="entry">
        <div class="byline">Arthur · 17 November</div>
        <p class="ebody">The third and fourth rounds handed the team the structural specifying and the ground: the units drafted from the semantics (<a class="cite" href="#s-7-1">7.1</a>–<a class="cite" href="#s-7-5">7.5</a>), the forms identified (<a class="cite" href="#i-1">I1</a>–<a class="cite" href="#i-5">I5</a>), and the sprint rendered as its own exploration — this page.</p>
    </div>
</section>

</div>
</div>

<script>
const vt = (fn) => (document.startViewTransition ? document.startViewTransition(fn) : fn());

const unfocus = () => {
    document.querySelectorAll('.fkeep').forEach((el) => { el.classList.remove('fkeep'); el.style.viewTransitionName = ''; });
    document.querySelectorAll('.fshow').forEach((el) => el.classList.remove('fshow'));
    document.body.classList.remove('focused', 'focus-edge');
};

const openJustification = (statement) => {
    const tag = statement.querySelector('.anno .tag');
    const clauses = [...tag.querySelectorAll('a.cite')]
        .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
        .filter((el) => el && el.classList.contains('clause'));
    vt(() => {
        unfocus();
        document.body.classList.add('focused');
        clauses.forEach((clause, i) => {
            clause.classList.add('fkeep');
            clause.style.viewTransitionName = \`focus-clause-\${i}\`;
            clause.closest('.md').classList.add('fkeep');
            clause.closest('.part').classList.add('fshow');
        });
        statement.classList.add('fkeep');
        statement.style.viewTransitionName = 'focus-entry';
        statement.closest('.part').classList.add('fshow');
        window.scrollTo(0, 0);
    });
};

document.querySelectorAll('.statement .anno .tag').forEach((tag) => {
    if (!tag.querySelector('a.cite')) return;
    tag.classList.add('press');
    tag.addEventListener('click', (press) => {
        if (press.target.closest('a')) return;
        openJustification(tag.closest('.statement'));
    });
});

const edge = document.querySelector('#p-4 strong');
edge.classList.add('press');
edge.addEventListener('click', (press) => {
    if (press.target.closest('a')) return;
    vt(() => {
        unfocus();
        document.body.classList.add('focused', 'focus-edge');
        ['p-1', 'p-4', 'p-2'].forEach((id, i) => {
            const node = document.getElementById(id);
            node.classList.add('fkeep');
            node.style.viewTransitionName = \`focus-node-\${i}\`;
        });
        document.getElementById('intuition').classList.add('fshow');
        window.scrollTo(0, 0);
    });
});

document.getElementById('focus-back').addEventListener('click', () => vt(unfocus));

document.querySelectorAll('a.cite').forEach((a) => {
    a.addEventListener('click', (e) => {
        const target = document.getElementById(a.getAttribute('href').slice(1));
        if (!target) return;
        e.preventDefault();
        const part = target.closest('.part');
        if (part && getComputedStyle(part).display === 'none') {
            document.getElementById('v-all').checked = true;
        }
        target.scrollIntoView({ block: 'center' });
    });
});
<\/script>

</body>
</html>
`})]}),"TheProjectsPage3"),he=t(E),ue=p(()=>n(he,{children:[le(),pe(),ie(),re(),oe(),ce()]}),"book");export{ue as book};
