var I=Object.defineProperty;var a=(H,e)=>I(H,"name",{value:e,configurable:!0});import{jsxs as n,Fragment as d,jsx as t}from"react/jsx-runtime";import{$ as i,selection as m}from"@dna-platform/chemistry";import{$Theme as Y,$Paragraph as B,Means as p,Word as h,Reference as M,$Word as E,Theme as J,$Book as K,Paginated as O,$Cover as Q,$Synopsis as U,$TableOfContents as V,$Table as X,Chapter as g,Title as k,Author as Z,Subject as _,Parenthetical as u,Paragraph as s,Section as L,Heading as ee,Content as b}from"@dna-platform/public";import{css as r}from"styled-components";const T=class T extends Y{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=m.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures()]}page(){return r`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
        `}levels(){return r`
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
        `}labels(){return r`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `}links(){return r`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return r`
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
        `}figures(){return r`
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
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `}};a(T,"$LibraryTheme");let $=T;const te=i($),C=class C extends B{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const o=e.table?.canonical,c=e.subject?.means?.identifier===e.title?.means?.identifier,l=i(p),R=i(h),N=i(M);return n(d,{children:[c?null:n(d,{children:[t(l,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),t(R,{children:e.title?.name}),": ",n(R,{children:[t(N,{children:o?.means?.identifier}),o?.name]})]})}};a(C,"$RunningHead");let x=C;const S=class S extends E{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};a(S,"$Label");let w=S;const A=class A extends B{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const o=i(ae),c=i(h),l=i(M);return n(d,{children:[t(o,{children:"Author"})," ",n(c,{children:[t(l,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:n(d,{children:[t(o,{children:"About"})," ",n(c,{children:[t(l,{children:e.about.means?.identifier}),e.about.name]})]}),t(o,{children:"Filed under"})," ",n(c,{children:[t(l,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};a(A,"$Byline");let v=A;const ne=i(x),ie=i(w),ae=ie,oe=i(v),P=class P extends K{write(){const e=i(ne),o=i(oe);return n(d,{children:[t(e,{chapter:this.cover}),t(o,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,t(O,{}))}};a(P,"$TheLibrary");let f=P;const re=i(f);i(re,J)(te);const W=class W extends Q{constructor(){super(...arguments),this.style=m.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};a(W,"$LibraryCover");let y=W;const q=class q extends U{constructor(){super(...arguments),this.style=m.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};a(q,"$LibrarySynopsis");let j=q;const F=class F extends V{constructor(){super(...arguments),this.style=m.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};a(F,"$LibraryTableOfContents");let z=F;const G=class G extends X{constructor(){super(...arguments),this.style=m(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
    `}};a(G,"$LibraryTable");let D=G;const se=i(y),ce=i(j),le=i(z);i(D);const pe=a(()=>n(g,{children:[t(se,{}),t(k,{children:"[The Project of Arithmetic](/inexplicable-phenomena/arithmetic-project/)"}),t(Z,{children:"[Doug](/inexplicable-phenomena/our-team/)"}),t(_,{children:"[Arithmetic](/inexplicable-phenomena/arithmetic/)"})]}),"Cover"),he=a(()=>n(g,{children:[t(ce,{}),t(u,{}),n(k,{children:[t(u,{}),"[Synopsis](/inexplicable-phenomena/arithmetic-project/)"]}),t(s,{children:"Where the sprints and plans of arithmetic are kept."})]}),"Synopsis"),de=a(()=>n(g,{children:[t(le,{}),n(k,{children:[t(u,{}),"[Table of Contents](/inexplicable-phenomena/arithmetic-project/#table-of-contents)"]}),n(L,{children:[t(ee,{children:"Contents"}),t(s,{children:t(b,{children:"[The First Sprint](/inexplicable-phenomena/arithmetic-project/#sprint-124)"})}),n(s,{children:[t(u,{}),t(h,{children:t(b,{children:"[Arithmetic Project](/inexplicable-phenomena/arithmetic-project/)"})}),t(h,{children:t(b,{children:"[Synopsis](/inexplicable-phenomena/arithmetic-project/#synopsis)"})}),t(h,{children:t(b,{children:"[Table of Contents](/inexplicable-phenomena/arithmetic-project/#table-of-contents)"})})]})]})]}),"Table"),me=a(()=>n(g,{children:[t(k,{children:"[The First Sprint](/inexplicable-phenomena/arithmetic-project/#sprint-124)"}),n(s,{children:["The first sprint of arithmetic, opened on 9 November 2026, when Doug named the subject: a paper he is working on, once called Goldbach versus Gödel, now arithmetic, with this project beside it to keep its sprints and plans, ",t(p,{children:"[a textbook](/inexplicable-phenomena/arithmetic-textbook/)"})," for its results and, in Mathematics, ",t(p,{children:"[a library](/inexplicable-phenomena/mathematical-library/)"})," for the papers referenced."]}),n(s,{children:["What this sprint does. The structure first, every book a stub that can be walked: the subject, this project, the textbook and the library, built and proven the day they were named. Then ",t(p,{children:"[a notebook](/inexplicable-phenomena/arithmetic-notebook/)"}),", and the notes on Goldbach versus Gödel moved into it from Doug's own library, where the team has read and annotated four conversations with Claude: the planning of the paper, the semantics beside it, the symmetry of the coprimes, and the long conversation from the finite proof to the paper's flow. How the notebook is organized was decided as the notes arrived: thirteen chapters in four parts, the paper, the abstractions, the results and the edge, each note Doug's exact words connected by the team's interpretation and cited to the conversation and chapter it came from. And the team's book gains its chapter ",t(p,{children:"[Doug](/inexplicable-phenomena/our-team/#doug)"}),", so that every book of this library is signed by him as the team's representative."]}),t(s,{children:"What it leaves for the next: the results, which go to the textbook once the notebook holds the notes they come from; the papers, which go to the library as they are referenced; and the form of this project's entries, which this one sets by being first."})]}),"TheFirstSprint1"),be=i(f),xe=a(()=>n(be,{children:[pe(),he(),de(),me()]}),"book");export{xe as book};
