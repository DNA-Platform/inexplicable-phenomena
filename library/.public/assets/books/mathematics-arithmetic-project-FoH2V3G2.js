var J=Object.defineProperty;var a=(E,e)=>J(E,"name",{value:e,configurable:!0});import{jsxs as n,Fragment as d,jsx as t}from"react/jsx-runtime";import{$ as i,selection as m}from"@dna-platform/chemistry";import{$Theme as K,$Paragraph as M,Means as l,Word as p,Reference as F,$Word as Y,Theme as O,$Book as Q,Paginated as U,$Cover as V,$Synopsis as X,$TableOfContents as Z,$Table as L,Chapter as g,Title as k,Author as _,Subject as ee,Parenthetical as b,Paragraph as r,Section as w,Heading as x,Content as f}from"@dna-platform/public";import{css as s}from"styled-components";const A=class A extends K{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=m.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures()]}page(){return s`
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
            .pd-math, .pd-date { white-space: nowrap; }
            .pd-equation { position: relative; counter-increment: equation; }
            .pd-equation::after { content: '(' counter(equation) ')'; position: absolute; inset-inline-end: 0; top: 50%; transform: translateY(-50%); }
        `}};a(A,"$LibraryTheme");let $=A;const te=i($),q=class q extends M{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const o=e.table?.canonical,c=e.subject?.means?.identifier===e.title?.means?.identifier,h=i(l),H=i(p),I=i(F);return n(d,{children:[c?null:n(d,{children:[t(h,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),t(H,{children:e.title?.name}),": ",n(H,{children:[t(I,{children:o?.means?.identifier}),o?.name]})]})}};a(q,"$RunningHead");let y=q;const P=class P extends Y{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};a(P,"$Label");let v=P;const G=class G extends M{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const o=i(ae),c=i(p),h=i(F);return n(d,{children:[t(o,{children:"Author"})," ",n(c,{children:[t(h,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:n(d,{children:[t(o,{children:"About"})," ",n(c,{children:[t(h,{children:e.about.means?.identifier}),e.about.name]})]}),t(o,{children:"Filed under"})," ",n(c,{children:[t(h,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};a(G,"$Byline");let j=G;const ne=i(y),ie=i(v),ae=ie,oe=i(j),R=class R extends Q{write(){const e=i(ne),o=i(oe);return n(d,{children:[t(e,{chapter:this.cover}),t(o,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,t(U,{}))}};a(R,"$TheLibrary");let u=R;const re=i(u);i(re,O)(te);const W=class W extends V{constructor(){super(...arguments),this.style=m.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};a(W,"$LibraryCover");let T=W;const N=class N extends X{constructor(){super(...arguments),this.style=m.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};a(N,"$LibrarySynopsis");let z=N;const S=class S extends Z{constructor(){super(...arguments),this.style=m.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};a(S,"$LibraryTableOfContents");let D=S;const B=class B extends L{constructor(){super(...arguments),this.style=m(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
    `}};a(B,"$LibraryTable");let C=B;const se=i(T),ce=i(z),he=i(D);i(C);const le=a(()=>n(g,{children:[t(se,{}),t(k,{children:"[The Project of Arithmetic](/inexplicable-phenomena/arithmetic-project/)"}),t(_,{children:"[Doug](/inexplicable-phenomena/our-team/)"}),t(ee,{children:"[Arithmetic](/inexplicable-phenomena/arithmetic/)"})]}),"Cover"),pe=a(()=>n(g,{children:[t(ce,{}),t(b,{}),n(k,{children:[t(b,{}),"[Synopsis](/inexplicable-phenomena/arithmetic-project/)"]}),t(r,{children:"Where the sprints and plans of arithmetic are kept."})]}),"Synopsis"),de=a(()=>n(g,{children:[t(he,{}),n(k,{children:[t(b,{}),"[Table of Contents](/inexplicable-phenomena/arithmetic-project/#table-of-contents)"]}),n(w,{children:[t(x,{children:"Contents"}),t(r,{children:t(f,{children:"[The Notes](/inexplicable-phenomena/arithmetic-project/#sprint-124)"})}),n(r,{children:[t(b,{}),t(p,{children:t(f,{children:"[Arithmetic Project](/inexplicable-phenomena/arithmetic-project/)"})}),t(p,{children:t(f,{children:"[Synopsis](/inexplicable-phenomena/arithmetic-project/#synopsis)"})}),t(p,{children:t(f,{children:"[Table of Contents](/inexplicable-phenomena/arithmetic-project/#table-of-contents)"})})]})]})]}),"Table"),me=a(()=>n(g,{children:[t(k,{children:"[The Notes](/inexplicable-phenomena/arithmetic-project/#sprint-124)"}),n(r,{children:["The first sprint of arithmetic, opened and closed on 9 November 2026, when Doug named the subject: a paper he is working on, once called Goldbach versus Gödel, now arithmetic, with this project beside it to keep its sprints and plans, ",t(l,{children:"[a textbook](/inexplicable-phenomena/arithmetic-textbook/)"})," for its results and, in Mathematics, ",t(l,{children:"[a library](/inexplicable-phenomena/mathematical-library/)"})," for the papers referenced."]}),n(w,{children:[t(x,{children:"What was accomplished"}),n(r,{children:["The structure, every book a stub that can be walked: the subject, this project, the textbook and the library, built and proven the day they were named. The team's book gained its chapter",t(l,{children:"[Doug](/inexplicable-phenomena/our-team/#doug)"}),", so that every book of this library is signed by him as the team's representative. Then ",t(l,{children:"[the notebook](/inexplicable-phenomena/arithmetic-notebook/)"}),", and the notes moved into it from Doug's own library, where the team had read and annotated six conversations with Claude, the planning of the paper, the semantics beside it, the symmetry of the coprimes, the long conversation from the finite proof to the paper's flow, the catalogue of a session with Gemini, and the logic axioms. The notebook is the specification of the publication, written from the most recent statement of the work backwards so that newer thoughts deprecate older ones: fifteen chapters in four parts, the publication's own parts from the preface to Goldbach, the standing rulings and documents, the sketches set aside beside the paper with his tag on each, and the formalism, the options the notes hold and the algebraic model of the subject of logic. Each note is his words in the form that stands, the spelling cleaned and nothing else changed, citing what it deprecated and the conversation and chapter it came from, and every quoted span is checked mechanically against the messages before the notebook is bound."]}),t(r,{children:"The formalism's part ended the sprint. His question on the running notebook, whether the algebraic model of the subject of logic had been captured, found it in his library in pieces and nowhere whole; it was written as the three identities, inferential, rational and logical, the excluded middle kept, the rules of inference under which consistency motivates the axioms on the page, soundness as the subject being formalizable, and his sharpening that the semantics are expressed through the identities and nothing else, an equivalent expression of logic except that consistency is not formalizable in it. The team's candidate for a compact expression of the model stands in that chapter, marked as the team's, for his correction."})]}),n(w,{children:[t(x,{children:"What it leaves for the next"}),t(r,{children:"The compact expression, to be accepted or corrected by him, and then its formalization in PA. The organizing of the notes, which waits until he is happy with them. The papers, which go to the library of Mathematics as they are referenced: the conversations already name Gödel's paper of 1931, Feferman, Löb, Rosser, Rogers, Detlefsen, Kripke, Hofstadter's TNT, Girard, Lambert, Beltrami, Hilbert, Dedekind and Jurkat and Richert, and the next sprint is to find them as potential citations. The results, which go to the textbook once the notes they come from are organized. And the form of this project's entries, which this one sets by being first."})]})]}),"TheNotes1"),fe=i(u),xe=a(()=>n(fe,{children:[le(),pe(),de(),me()]}),"book");export{xe as book};
