var H=Object.defineProperty;var i=(M,e)=>H(M,"name",{value:e,configurable:!0});import{jsxs as a,Fragment as b,jsx as n}from"react/jsx-runtime";import{$ as t,selection as l}from"@dna-platform/chemistry";import{$Theme as Y,$Paragraph as Q,Means as E,Word as c,Reference as F,$Word as J,Theme as K,$Book as O,$Cover as U,$Synopsis as V,$TableOfContents as X,$Table as Z,Chapter as u,Autobiography as L,Title as f,Author as _,Subject as ee,About as ne,Parenthetical as g,Paragraph as o,Section as k,Heading as $,Content as d}from"@dna-platform/public";import{css as s}from"styled-components";const j=class j extends Y{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1rem",this.leading="1.7",this.measure="42rem",this.space="1.25rem",this.ink="#23262a",this.paper="#faf8f4",this.link="#5b2f2a",this.style=l.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures()]}page(){return s`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
            @media (min-width: 64rem) { max-width: 52rem; }
        `}levels(){return s`
            .pd-book { margin-block: ${({theme:e})=>e.space}; counter-reset: chapter equation; }
            .pd-chapter { margin-block: calc(2 * ${({theme:e})=>e.space}); scroll-margin-block-start: calc(0.5 * ${({theme:e})=>e.space}); }
            .pd-section { margin-block: ${({theme:e})=>e.space}; }
            .pd-paragraph { margin-block: ${({theme:e})=>e.space}; }
            .pa-item { margin-block: calc(${({theme:e})=>e.space} / 4); }
            .pd-title { font-size: calc(1.5 * ${({theme:e})=>e.size}); font-weight: bold; margin-block-end: ${({theme:e})=>e.space}; }
            .pd-heading { font-weight: bold; margin-block: ${({theme:e})=>e.space} 0; }
            .pd-line { white-space: pre-wrap; }
            .pd-word { overflow-wrap: break-word; }
            .pd-canonical.pd-chapter { counter-increment: chapter; }
            .pd-canonical.pd-chapter:not(.pa-framed) {
                border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 10%, ${({theme:e})=>e.paper});
                padding-block-start: ${({theme:e})=>e.space};
            }
            .pd-chapter .pd-title::before { display: block; margin-block-end: calc(${({theme:e})=>e.space} / 4); }
            .pd-canonical.pd-chapter .pd-title::before { content: 'Chapter ' counter(chapter); }
        `}labels(){return s`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.65;
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
                padding: calc(${({theme:e})=>e.space} / 2) ${({theme:e})=>e.space};
                background: color-mix(in srgb, ${({theme:e})=>e.ink} 3%, ${({theme:e})=>e.paper});
                border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 10%, ${({theme:e})=>e.paper});
                border-block-start: 3px solid ${({theme:e})=>e.link};
            }
        `}figures(){return s`
            .pd-figure { max-width: 100%; }
            .pd-code {
                font-family: ui-monospace, monospace;
                font-size: calc(0.9 * ${({theme:e})=>e.size});
                line-height: 1.5;
                white-space: pre;
                overflow-x: auto;
                margin-block: ${({theme:e})=>e.space};
                padding: calc(0.75 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space};
                background: color-mix(in srgb, ${({theme:e})=>e.ink} 4%, ${({theme:e})=>e.paper});
                border-inline-start: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 25%, ${({theme:e})=>e.paper});
            }
            .pd-code-line::before { content: attr(data-line); display: inline-block; width: 3ch; margin-inline-end: 1.5ch; text-align: end; opacity: 0.4; user-select: none; }
            .pd-image img, .pd-svg svg { display: block; max-width: 100%; height: auto; margin-block: ${({theme:e})=>e.space}; }
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `}};i(j,"$LibraryTheme");let w=j;const te=t(w),C=class C extends Q{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const r=e.table?.canonical,p=e.subject?.means?.identifier===e.title?.means?.identifier,h=t(E),N=t(c),G=t(F);return a(b,{children:[p?null:a(b,{children:[n(h,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/reference/)"})," / "]}),n(N,{children:e.title?.name}),": ",a(N,{children:[n(G,{children:r?.means?.identifier}),r?.name]})]})}};i(C,"$RunningHead");let x=C;const S=class S extends J{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};i(S,"$Label");let y=S;const A=class A extends Q{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const r=t(oe),p=t(c),h=t(F);return a(b,{children:[n(r,{children:"Author"})," ",a(p,{children:[n(h,{children:e.author?.means?.identifier}),e.author?.name]}),n(r,{children:"Filed under"})," ",a(p,{children:[n(h,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};i(A,"$Byline");let v=A;const ae=t(x),ie=t(y),oe=ie,re=t(v),D=class D extends O{write(){const e=t(ae),r=t(re);return a(b,{children:[n(e,{chapter:this.cover}),n(r,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}};i(D,"$TheLibrary");let m=D;const se=t(m);t(se,K)(te);const P=class P extends U{constructor(){super(...arguments),this.style=l.header`
        .pd-chapter.pa-cover { margin-block: 0; }
        .pd-chapter.pa-cover:not(.pa-framed) {
            margin-block-end: calc(1.5 * ${({theme:e})=>e.space});
            padding: calc(0.75 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space};
            background: color-mix(in srgb, ${({theme:e})=>e.ink} 3%, ${({theme:e})=>e.paper});
            border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 10%, ${({theme:e})=>e.paper});
            border-block-start: 0;
            scroll-margin-block-start: calc(1.75 * ${({theme:e})=>e.space});
        }
        .pa-cover .pd-title { margin-block: 0 calc(${({theme:e})=>e.space} / 2); font-size: calc(2 * ${({theme:e})=>e.size}); }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};i(P,"$LibraryCover");let T=P;const R=class R extends V{constructor(){super(...arguments),this.style=l.div`
        .pd-chapter.pa-synopsis {
            margin-block: calc(1.5 * ${({theme:e})=>e.space});
            padding-inline-start: ${({theme:e})=>e.space};
            border-inline-start: 2px solid ${({theme:e})=>e.link};
        }
        .pa-synopsis .pd-paragraph { font-style: italic; }
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};i(R,"$LibrarySynopsis");let q=R;const B=class B extends X{constructor(){super(...arguments),this.style=l.nav`
        .pd-chapter.pa-table-of-contents { margin-block: 0; }
        .pd-chapter.pa-table-of-contents:not(.pa-framed) {
            margin-block: calc(1.5 * ${({theme:e})=>e.space});
            padding: calc(0.75 * ${({theme:e})=>e.space}) ${({theme:e})=>e.space};
            border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 10%, ${({theme:e})=>e.paper});
            scroll-margin-block-start: calc(1.75 * ${({theme:e})=>e.space});
        }
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.65;
        }
    `}};i(B,"$LibraryTableOfContents");let z=B;const I=class I extends Z{constructor(){super(...arguments),this.style=l(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-col {
            padding-block: calc(${({theme:e})=>e.space} / 3);
            border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 7%, ${({theme:e})=>e.paper});
        }
    `}};i(I,"$LibraryTable");let W=I;const ce=t(T),le=t(q),pe=t(z);t(W);const he=i(()=>a(u,{children:[n(ce,{}),n(L,{}),n(f,{children:"[The Team](/inexplicable-phenomena/the-team/)"}),n(_,{children:"[The Team](/inexplicable-phenomena/the-team/)"}),n(ee,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/reference/)"}),n(ne,{children:"[The Team](/inexplicable-phenomena/the-team/)"})]}),"Cover"),de=i(()=>a(u,{children:[n(le,{}),a(f,{children:[n(g,{}),"[Synopsis](/inexplicable-phenomena/the-team/)"]}),n(o,{children:"The people who work on inexplicable phenomena, in their own account, and the one book here that is by its own subject. Who qualifies as one of them is the book's first question, not a thing settled before it was opened; whoever stands in it may author the subjects they keep."})]}),"Synopsis"),be=i(()=>a(u,{children:[n(pe,{}),a(f,{children:[n(g,{}),"[Table of Contents](/inexplicable-phenomena/the-team/#table-of-contents)"]}),a(k,{children:[n($,{children:"Contents"}),n(o,{children:n(d,{children:"[Who Qualifies](/inexplicable-phenomena/the-team/#who-qualifies)"})}),a(o,{children:[n(g,{}),n(c,{children:n(d,{children:"[The Team](/inexplicable-phenomena/the-team/)"})}),n(c,{children:n(d,{children:"[Synopsis](/inexplicable-phenomena/the-team/#synopsis)"})}),n(c,{children:n(d,{children:"[Table of Contents](/inexplicable-phenomena/the-team/#table-of-contents)"})})]})]})]}),"Table"),me=i(()=>a(u,{children:[n(f,{children:"[Who Qualifies](/inexplicable-phenomena/the-team/#who-qualifies)"}),a(k,{children:[n($,{children:"The question this book opens on"}),n(o,{children:`When this library was started, on the night of 2026-10-29, its librarian was asked whose autobiography it would hold, and he answered that it describes the team of people who work on inexplicable phenomena, and then: "Wait, we don't know who qualifies as a teammate. That might be the subject of the book." So it is. This book is about the team, and its first question is who belongs to it.`})]}),a(k,{children:[n($,{children:"What we think, so far"}),n(o,{children:"Arthur: a teammate is someone whose work on these phenomena stands in this library under their own name, which means a book filed under this one. Nobody qualifies by being listed; they qualify by what they have written here."}),n(o,{children:"Libby: and the library's own rule agrees, since a book filed under the autobiography may author. Whoever is filed here can write the subjects they keep, and whoever is not, cannot. The question is settled book by book, not once."}),n(o,{children:"Cathy: the one who built the framework these ideas are painted in counts, and so does the one whose ideas they are. Whether the librarian himself stands here as a teammate, or above it as the one who vouches for everyone, is his to say."}),n(o,{children:"Nancy: I would add a test from the work itself. Someone qualifies when they have asked a question about an inexplicable phenomenon in a way that could be answered, and have taken an answer they did not want. The rest is bookkeeping."})]})]}),"WhoQualifies1"),ue=t(m),xe=i(()=>a(ue,{children:[he(),de(),be(),me()]}),"book");export{xe as book};
