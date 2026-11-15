var le=Object.defineProperty;var r=(v,e)=>le(v,"name",{value:e,configurable:!0});import{jsxs as n,Fragment as w,jsx as t}from"react/jsx-runtime";import{$ as a,selection as x,$check as pe}from"@dna-platform/chemistry";import{$Theme as fe,$Paragraph as q,Means as d,Word as y,Reference as X,$Word as $,specify as me,$Cover as he,$Synopsis as be,$TableOfContents as ge,$Table as ue,$Annotation as ke,html as we,AnnotationSpecification as ye,$Chapter as xe,Theme as $e,$Book as ve,Paginated as Te,Chapter as f,Title as m,Author as je,Subject as De,Parenthetical as T,Paragraph as o,Section as se,Heading as ce,Content as p,Part as u,List as h,Line as i,Append as Ae}from"@dna-platform/public";import{css as g}from"styled-components";const Y=class Y extends fe{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1.0625rem",this.leading="1.6",this.measure="40rem",this.space="1.25rem",this.ink="#1b1b1b",this.paper="#ffffff",this.link="#1f4e79",this.style=x.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures(),this.front(),this.plate()]}front(){return g`
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
        `}plate(){return g`
            .pd-plate { float: inline-start; width: 11rem; margin: .25rem 1.5rem 1rem 0; }
            .pd-plate .pd-image img { margin-block: 0; border: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 20%, ${({theme:e})=>e.paper}); box-shadow: 0 1px 3px rgba(0, 0, 0, .12); }
            .pd-plate .pa-opening { text-decoration: none; color: inherit; }
            .pd-plate .pa-opening .pd-word { display: block; font-size: .8rem; margin-top: .4rem; opacity: .75; text-decoration: underline; }
            .pd-chapter:has(> .pd-paragraph > .pd-plate) > .pd-paragraph:first-child { margin-block: 0; }
            @media (max-width: 640px) { .pd-plate { width: 7rem; margin-right: 1rem; } }
        `}page(){return g`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
        `}levels(){return g`
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
        `}labels(){return g`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.6;
            }
        `}links(){return g`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return g`
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
        `}figures(){return g`
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
        `}};r(Y,"$LibraryTheme");let C=Y;const ze=a(C),G=class G extends q{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const s=e.table?.canonical,l=e.subject?.means?.identifier===e.title?.means?.identifier,c=a(d),b=a(y),k=a(X);return n(w,{children:[l?null:n(w,{children:[t(c,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})," / "]}),t(b,{children:e.title?.name}),": ",n(b,{children:[t(k,{children:s?.means?.identifier}),s?.name]})]})}};r(G,"$RunningHead");let N=G;const U=class U extends ${$Define(){super.$Define(),this.classes.add(this,"pd-label")}};r(U,"$Label");let P=U;const K=class K extends q{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const s=a(Pe),l=a(y),c=a(X);return n(w,{children:[t(s,{children:"Author"})," ",n(l,{children:[t(c,{children:e.author?.means?.identifier}),e.author?.name]}),e.about===void 0?null:n(w,{children:[t(s,{children:"About"})," ",n(l,{children:[t(c,{children:e.about.means?.identifier}),e.about.name]})]}),t(s,{children:"Subject"})," ",n(l,{children:[t(c,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};r(K,"$Byline");let I=K;const Ce=a(N),Ne=a(P),Pe=Ne,Ie=a(I);var Se=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor,Ee=r((v,e,s,l)=>{for(var c=Oe(e,s),b=v.length-1,k;b>=0;b--)(k=v[b])&&(c=k(e,s,c)||c);return c&&Se(e,s,c),c},"__decorateClass");const Z=class Z extends ke{constructor(){super(...arguments),this.specification=new D}get line(){return we.copy(this.text)}write(){return this.line}};r(Z,"$Tagline");let j=Z;const J=class J extends ye{$saidOfACover(e){pe(e instanceof xe&&e.is(he),"a tagline is said of a cover, and this is not one")}};r(J,"TaglineSpecification");let D=J;Ee([me("a tagline is said of a cover")],D.prototype,"$saidOfACover");const Q=class Q extends ${$Define(){super.$Define(),this.classes.add(this,"pd-front-name")}};r(Q,"$FrontName");let S=Q;const V=class V extends ${$Define(){super.$Define(),this.classes.add(this,"pd-front-author")}};r(V,"$FrontAuthor");let O=V;const L=class L extends ${$Define(){super.$Define(),this.classes.add(this,"pd-front-tagline")}};r(L,"$FrontTagline");let E=L;const _=class _ extends ${$Define(){super.$Define(),this.classes.add(this,"pd-front-imprint")}};r(_,"$FrontImprint");let R=_;const ee=class ee extends q{$Define(){super.$Define(),this.classes.add(this,"pd-front")}write(){const e=this.book;if(e===void 0)return null;const s=a(Ye),l=a(Ge),c=a(Ue),b=a(Ke),k=a(d),z=a(X),re=e.cover?.annotations.expressed(j),de=e.table?.canonical;return n(w,{children:[n(s,{children:[t(z,{children:de?.means?.identifier}),e.title?.name]}),n(l,{children:[t(z,{children:e.author?.means?.identifier}),e.author?.name]}),re===void 0?null:t(c,{children:re.line}),n(b,{children:[t(z,{children:e.subject?.means?.identifier}),e.subject?.name]}),t(b,{children:t(k,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/our-library/)"})})]})}};r(ee,"$Front");let W=ee;const te=class te extends he{constructor(){super(...arguments),this.style=x.header`
        .pd-chapter.pa-cover { margin-block: ${({theme:e})=>e.space} calc(2 * ${({theme:e})=>e.space}); }
        .pa-cover .pd-title { margin-block: 0; font-size: calc(2.25 * ${({theme:e})=>e.size}); line-height: 1.2; }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `}};r(te,"$LibraryCover");let H=te;const ie=class ie extends be{constructor(){super(...arguments),this.style=x.div`
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};r(ie,"$LibrarySynopsis");let B=ie;const ne=class ne extends ge{constructor(){super(...arguments),this.style=x.nav`
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({theme:e})=>e.space} / 4); }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({theme:e})=>e.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.6;
        }
    `}};r(ne,"$LibraryTableOfContents");let F=ne;const oe=class oe extends ue{constructor(){super(...arguments),this.style=x(this.style)`
        .pa-table { column-gap: 0; row-gap: 0; grid-auto-columns: minmax(min-content, auto); font-size: calc(0.85 * ${({theme:e})=>e.size}); line-height: 1.5; }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-table .pa-col { padding: calc(${({theme:e})=>e.space} / 3) calc(0.75 * ${({theme:e})=>e.space}) calc(${({theme:e})=>e.space} / 3) 0; border-block-start: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
        .pa-table .pa-row-start-1 .pa-col { border-block-start: none; font-weight: bold; border-block-end: 2px solid color-mix(in srgb, ${({theme:e})=>e.ink} 35%, ${({theme:e})=>e.paper}); }
        .pa-table .pd-sentence:last-of-type .pa-col { border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 15%, ${({theme:e})=>e.paper}); }
    `}};r(oe,"$LibraryTable");let M=oe;const Re=a(H),We=a(B),He=a(F);a(M);const Be=a(S),Fe=a(O),Me=a(E),qe=a(R),Xe=a(j),Ye=Be,Ge=Fe,Ue=Me,Ke=qe,Ze=a(W),ae=class ae extends ve{write(){const e=a(Ce),s=a(Ie),l=a(Ze);return n(w,{children:[t(e,{chapter:this.cover}),t(s,{chapter:this.cover}),t(l,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}$Define(){super.$Define(),this.annotations.add(this,t(Te,{}))}};r(ae,"$TheLibrary");let A=ae;const Je=a(A);a(Je,$e)(ze);const Qe=r(()=>n(f,{children:[t(Re,{}),t(m,{children:"[Referential Objectivity](/inexplicable-phenomena/mathematical-reference/)"}),t(je,{children:"[Doug](/inexplicable-phenomena/our-team/)"}),t(De,{children:"[Mathematics](/inexplicable-phenomena/our-math/)"}),t(Xe,{children:"The specification of mathematics in this library."})]}),"Cover"),Ve=r(()=>n(f,{children:[t(We,{}),t(T,{}),n(m,{children:[t(T,{}),"[Synopsis](/inexplicable-phenomena/mathematical-reference/)"]}),t(o,{children:"The specification of mathematics in this library: a part for the books of the subject — the notebook, the textbook, the project, the library and the design — one chapter per book, tracking the idioms its chapters follow, with the enforcing code standing with the chapter that states the idiom and the rest marked held by hand; and a part for the forms, opening with the specification of a specification — a title with a numbered list of lists, items cited by number, the specification and the thing it specifies moving back and forth, and never thrown away, a change made by changing the specification — written in its own form on Doug's rulings of 12 November 2026; and then the content of 15 November, the thing that holds a specification on its back and an identification on its front, toggled, with a purpose, a project, the project's progress and an author on every part, its object model said back in its chapter for his corrections."})]}),"Synopsis"),Le=r(()=>n(f,{children:[t(He,{}),n(m,{children:[t(T,{}),"[Table of Contents](/inexplicable-phenomena/mathematical-reference/#table-of-contents)"]}),n(se,{children:[t(ce,{children:"The Books"}),t(o,{children:t(p,{children:"[The Notebook](/inexplicable-phenomena/mathematical-reference/#the-notebook)"})}),t(o,{children:t(p,{children:"[The Textbook](/inexplicable-phenomena/mathematical-reference/#the-textbook)"})}),t(o,{children:t(p,{children:"[The Project](/inexplicable-phenomena/mathematical-reference/#the-project)"})}),t(o,{children:t(p,{children:"[The Library](/inexplicable-phenomena/mathematical-reference/#the-library)"})}),t(o,{children:t(p,{children:"[The Design](/inexplicable-phenomena/mathematical-reference/#the-design)"})})]}),n(se,{children:[t(ce,{children:"The Forms"}),t(o,{children:t(p,{children:"[The Specification](/inexplicable-phenomena/mathematical-reference/#the-specification)"})}),t(o,{children:t(p,{children:"[The Content](/inexplicable-phenomena/mathematical-reference/#the-content)"})}),n(o,{children:[t(T,{}),t(y,{children:t(p,{children:"[Mathematical Reference](/inexplicable-phenomena/mathematical-reference/)"})}),t(y,{children:t(p,{children:"[Synopsis](/inexplicable-phenomena/mathematical-reference/#synopsis)"})}),t(y,{children:t(p,{children:"[Table of Contents](/inexplicable-phenomena/mathematical-reference/#table-of-contents)"})})]})]})]}),"Table"),_e=r(()=>n(f,{children:[t(u,{children:"The Books"}),t(m,{children:"[The Notebook](/inexplicable-phenomena/mathematical-reference/#the-notebook)"}),n(o,{children:["The notebook takes the notes. Nothing in it is official: it is where rulings, analogies and specifications live while the textbook is not ready to state them. The notebook of the first subject is ",t(d,{children:"[The Notebook of Arithmetic](/inexplicable-phenomena/arithmetic-notebook/)"}),"."]}),n(o,{children:[t(h,{}),t(i,{children:"A chapter names its part with the Part annotation and opens with one provenance paragraph: where the note came from and on whose word it stands."}),t(i,{children:"Only Doug is quoted. Everyone else — a paper, a session, a teammate — is paraphrased, with the source named."}),t(i,{children:"Titles are short names, and no heading on the page repeats a title or another heading."}),t(i,{children:"Every chapter gets its row on the table of contents and its clause in the synopsis, written in the same act."}),t(i,{children:"A resource stands beside its chapter, named for it with a tilde."})]}),n(o,{children:["One idiom is enforced by code: every quoted span of four or more words must stand in a conversation's message or a sprint record, and the checker beside ",t(d,{children:"[The Sources](/inexplicable-phenomena/arithmetic-notebook/#the-sources)"})," proves it, failing the loop until every span is found. The rest are held by hand."]})]}),"TheNotebook1"),et=r(()=>n(f,{children:[t(u,{children:"The Books"}),t(m,{children:"[The Textbook](/inexplicable-phenomena/mathematical-reference/#the-textbook)"}),n(o,{children:["The textbook is the first place where official results go. A definition or a theorem enters it only as Doug has ruled it in the room; what he has not ruled stays a notebook note. The textbook of the first subject is ",t(d,{children:"[The Textbook of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/)"}),"."]}),n(o,{children:[t(h,{}),t(i,{children:"Official results only: every chapter stands on a ruling recorded verbatim in the sprint records."}),t(i,{children:"The official form is the algebraic one, ruled 12 November 2026; the prose stays in the notebook."}),t(i,{children:"Results are stated and proved, and their references resolve into the subject's library of publications."})]}),t(o,{children:"What a textbook entry is, as Doug has specified it so far, 12 and 15 November 2026: a chapter is an attempt to specify one mathematical object, and bears the object's title. It carries the specification of the object — the sovereign part, since we formalize specifications — an informal explanation, the formalism itself with a justification of how it satisfies the specification, and presentations in different contexts, each context itself specified. Citations run into the subject's library and into the subject's own notes. One aspect is viewable at a time. What is specified and not yet built stands as a placeholder for itself — the interpolation approach. The justification leans toward visible annotations, writing added to a part of a chapter and toggled in the UI; and the specification needs a form, since when it changes the formal structure and the justifications must change with it."}),t(o,{children:"The components foreseen and not yet ruled: a form for the specification whose clauses have identity; the justification as an annotation sort whose note answers with writing, toggled by the theme; a placeholder for the interpolation; a context specification for each presentation; and the theme's rule that shows one aspect alone, on the front's precedent. The classes will stand with this chapter as its code once they are ruled; until then every idiom here is held by hand. The potential four chapters of 12 November stand retired in the subject's notes, and the textbook's first object is named: X, the symmetry of arithmetic, specified by his statement of work of 15 November 2026, its chapter the textbook's first — all back and no front, the identification its own placeholder."})]}),"TheTextbook2"),tt=r(()=>n(f,{children:[t(u,{children:"The Books"}),t(m,{children:"[The Project](/inexplicable-phenomena/mathematical-reference/#the-project)"}),n(o,{children:["The project is the record of the work: what each sprint accomplished and what it leaves. The project of the first subject is ",t(d,{children:"[The Project of Arithmetic](/inexplicable-phenomena/arithmetic-project/)"}),"."]}),n(o,{children:[t(h,{}),t(i,{children:"One entry per sprint, written at the close, in the form of the entries before it."}),t(i,{children:"An entry names what was built, refers into the notebook and the library where the work landed, and says what the sprint leaves."}),t(i,{children:"Each entry has its row on the project's table; the sprint's full record lives in the branch library, not here."})]}),t(o,{children:"Held by hand; the loop's prover walks every reference an entry makes."})]}),"TheProject3"),it=r(()=>n(f,{children:[t(u,{children:"The Books"}),t(m,{children:"[The Library](/inexplicable-phenomena/mathematical-reference/#the-library)"}),n(o,{children:["The library of a subject holds the publications its work leans on. The first is ",t(d,{children:"[The Library of Mathematics](/inexplicable-phenomena/mathematical-library/)"}),"."]}),n(o,{children:[t(h,{}),t(i,{children:"A publication is a chapter, keyed by author and year in the form of Gödel 1931, and the table lists the rows alphabetically by key."}),t(i,{children:"A free text is held beside its chapter with its file and a plate of the first page; a copyrighted one is cited by address."}),t(i,{children:"The chapter carries the citation and the notes; the citing books refer in by the key, and the chapter's writeup refers back to them."})]}),t(o,{children:"Enforced by code: the prover in the branch library, the tool of the book Inexplicable Phenomena's third chapter, opens every row in a real browser, follows the plate to the held file or the address, and fails on a landing that does not answer. The keys and the rows are held by hand."})]}),"TheLibrary4"),nt=r(()=>n(f,{children:[t(u,{children:"The Books"}),t(m,{children:"[The Design](/inexplicable-phenomena/mathematical-reference/#the-design)"}),n(o,{children:["The design book holds the subject's visual decisions as sketches. The first is ",t(d,{children:"[Subjective Design](/inexplicable-phenomena/mathematical-design/)"}),"."]}),n(o,{children:[t(h,{}),t(i,{children:"A sketch is an HTML page beside its chapter, its forms lettered, each photographed at a desk's width and a phone's."}),t(i,{children:"A sketch is drawn in the pages' own palette and never with the print's class names; the decided form is cited by its number when it is built."}),t(i,{children:"A built design refers to the chapters that exemplify it."})]}),t(o,{children:"Held by hand; the photographs stand beside the chapter as its record."})]}),"TheDesign5"),ot=r(()=>n(f,{children:[t(u,{children:"The Forms"}),t(m,{children:"[The Specification](/inexplicable-phenomena/mathematical-reference/#the-specification)"}),n(o,{children:["The specification of a specification, ruled by Doug on 12 November 2026 and written in its own form. For right now a synopsis is a title for the specification with a numbered list of lists, and in a book's synopsis we write the specification of what the book is supposed to be; the first is ",t(d,{children:"[The Textbook of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/)"}),"'s."]}),n(o,{children:[t(h,{}),t(i,{children:"1. The form"}),t(i,{children:"1.1 A specification is a title with a numbered list of lists."}),t(i,{children:"1.2 Every item carries its number, and things are referenced across the specification by those numbers."}),t(i,{children:"1.3 For right now, the specification of a book is written in its synopsis."})]}),n(o,{children:[t(h,{}),t(i,{children:"2. The two forms"}),t(i,{children:"2.1 A thing shows in specification form or in implementation form."}),t(i,{children:"2.2 The specification and the thing it specifies move back and forth, each reachable from the other."}),t(i,{children:"2.3 In a chapter the formalization, the explanation and the presentation are each specified, and each moves back and forth with its specification."})]}),n(o,{children:[t(h,{}),t(i,{children:"3. The justification"}),t(i,{children:"3.1 The implementation is annotated with justifications."}),t(i,{children:"3.2 A justification says how the implementation satisfies the specification, citing items by number."}),t(i,{children:"3.3 A justification is a visible annotation, toggled in the UI."})]}),n(o,{children:[t(h,{}),t(i,{children:"4. The interpolation"}),t(i,{children:"4.1 What is specified and not yet built stands as a placeholder for itself."}),t(i,{children:"4.2 An item with no implementation to move to is the placeholder."})]}),n(o,{children:[t(h,{}),t(i,{children:"5. The permanence"}),t(i,{children:"5.1 Specifications are not thrown away; they stay, to be read and improved."}),t(i,{children:"5.2 A change is made by changing the specification, so changes are made in the context of all the other parts."})]}),t(o,{children:"The components of the library that show a thing in specification against implementation form, carry the movement between the two, and bear the justifications begin from this chapter, and they will stand beside it as its code. Until they do, the form is held by hand — the numbers written in the lines, the movement by mention."})]}),"TheSpecification6"),at=r(()=>n(f,{children:[t(u,{children:"The Forms"}),t(m,{children:"[The Content](/inexplicable-phenomena/mathematical-reference/#the-content)"}),n(o,{children:["Doug's idea, 15 November 2026: a sort of thing that holds content, with a front and a back — on the back the specification, on the front the identification — like the two sides of a wikipedia page, toggled back and forth. It is not a type of chapter. The name is his maybe, Content, and stands until he names it: the base library already exports a word Content, a Word's content, so the name is to be decided when the thing moves up — and it likely moves all the way up to the base library, played with here first. His frame of 16 November: the design is of the abstraction that applies to anything written in any book — a way of specifying anything a book holds — tested on the math textbook, with components for math textbooks specializing it where more structure is needed, and appendix chapters open to the textbook itself. The specification it shows on its back takes the form of ",t(d,{children:"[The Specification](/inexplicable-phenomena/mathematical-reference/#the-specification)"}),"."]}),t(o,{children:"The object model he described, said back from his words of 15 November 2026, amendable in place."}),n(o,{children:[t(h,{}),t(i,{children:"1. The content"}),t(i,{children:"1.1 A piece of content is one thing with a front and a back: the identification on the front, the specification on the back."}),t(i,{children:"1.2 It is not a type of chapter; it is a thing that holds content, and a chapter or a book carries one."}),t(i,{children:"1.3 It shows one side at a time and toggles back and forth between them."}),t(i,{children:"1.4 It opens in the object mode, the front; which side is canonical is overridable; and a book says in one word that it defaults to showing one."}),t(i,{children:"1.5 It is a way of specifying anything written in any book; the math textbook is its test, and math-textbook components specialize it where more structure is needed."}),t(i,{children:"1.6 The back shows the specification alone, the progress alone, or the two one on top of the other."})]}),n(o,{children:[t(h,{}),t(i,{children:"2. The parts"}),t(i,{children:"2.1 The identification, the front: the thing itself, as far as it is identified; where it is not yet identified, its placeholder stands — the interpolation."}),t(i,{children:"2.2 The specification, the back: what the thing must be, in the specification's form — a title with a numbered list of lists, items cited by number."}),t(i,{children:"2.3 The purpose: why the thing is specified, standing with the specification."}),t(i,{children:"2.4 The project: each piece of content has one — the work that moves from the specification toward the identification."}),t(i,{children:"2.5 The progress: the project has progress, the record of its determinations, open and closed; its form a narrative of independent things, which may refer to each other."})]}),n(o,{children:[t(h,{}),t(i,{children:"3. The authors"}),t(i,{children:"3.1 Every part has an author, so the team is embedded in the content."}),t(i,{children:"3.2 The author of the book is the default author of every part."})]}),n(o,{children:[t(h,{}),t(i,{children:"4. The open determinations"}),t(i,{children:"4.1 The name: Content collides with the base library's word for a Word's content."}),t(i,{children:"4.2 The toggle's mechanics: a turn of the book to the other side, or a flip in place; played for now as a flip in place — labels over hidden inputs, the chapter ruled by what is checked, no script — the ruling still his."}),t(i,{children:"4.3 Whether the purpose, the project and the progress are sides of their own or parts standing with a side."}),t(i,{children:"4.4 Where it lives: played with at the library layer here, likely moved all the way up to the base library."})]}),n(o,{children:["The first case already stands: ",t(d,{children:"[The Symmetry of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/#the-symmetry-of-arithmetic)"}),", whose back is a statement of work — a purpose, a specification in seven parts, a project in the search for X, a progress in the open determinations O1 to O11, and an author — and whose front, the identification of X, is a teaching sketch whose unfound parts stand interpolated. The model is read off that statement."]}),t(o,{children:"The components stand beside this chapter as its code, the play of 16 November. The general ones: Content, the bar of modes — a format said of its chapter, its note drawing the bar in place and its style wrapping the chapter, so the checked mode rules the sides — its canonical side a field a use overrides; Identification, Specification and Progress, the sides, each a section of the chapter bearing its name; and Interpolated, the word that stands for a thing until the thing is found. The math textbook's specializations: Theorem, counted within the chapter, and Proof, labelled. The first chapter of the Textbook of Arithmetic writes with all of them."}),t(Ae,{identifier:"code",type:".tsx",children:`import { ReactNode } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Format, $Paragraph, $Section, $Word } from '@dna-platform/public';

// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15: "on the back is a specification, and on the
// front is the identification. It's like the two sides of a wikipedia page." Not a type of chapter; the design of
// the abstraction applies to anything written in any book, tested here on the math textbook, 2026-11-16. The names
// Content and Specification collide with the base library's own words and every name here is a PROXY until the
// thing moves up. The content is a format said of its chapter: its note draws the bar of modes in place, and its
// style wraps the chapter, so the checked mode rules the sides. It opens in the object mode — the front — with the
// canonical side overridable; the toggle is played as a flip in place, labels over hidden radio inputs and no
// script — whether the real movement is this flip or a turn of the book is still his to rule.
export class $Content extends $Format {
    $canonical = 'identification';

    override note(): ReactNode {
        return (
            <div className="pc-content">
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-mode"
                        id="pc-mode-identification"
                        defaultChecked={this.$canonical === 'identification'}
                    />
                    <label htmlFor="pc-mode-identification">identification</label>
                </span>
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-mode"
                        id="pc-mode-specification"
                        defaultChecked={this.$canonical === 'specification'}
                    />
                    <label htmlFor="pc-mode-specification">specification</label>
                </span>
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-mode"
                        id="pc-mode-progress"
                        defaultChecked={this.$canonical === 'progress'}
                    />
                    <label htmlFor="pc-mode-progress">progress</label>
                </span>
                <span className="pc-mode">
                    <input
                        type="radio"
                        name="pc-mode"
                        id="pc-mode-together"
                        defaultChecked={this.$canonical === 'together'}
                    />
                    <label htmlFor="pc-mode-together">together</label>
                </span>
            </div>
        );
    }

    override style = selection.div\`
        counter-reset: theorem;
        .pc-content { display: flex; gap: 1.75em; margin-block: \${({ theme }) => theme.space}; }
        .pc-mode input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-mode label { cursor: pointer; font-size: calc(0.7 * \${({ theme }) => theme.size}); letter-spacing: .15em; text-transform: uppercase; opacity: .55; }
        .pc-mode input:checked + label { opacity: 1; font-weight: bold; border-block-end: 2px solid currentColor; }
        &:has(#pc-mode-identification:checked) .pc-specification { display: none; }
        &:has(#pc-mode-identification:checked) .pc-progress { display: none; }
        &:has(#pc-mode-specification:checked) .pc-identification { display: none; }
        &:has(#pc-mode-specification:checked) .pc-progress { display: none; }
        &:has(#pc-mode-progress:checked) .pc-identification { display: none; }
        &:has(#pc-mode-progress:checked) .pc-specification { display: none; }
        &:has(#pc-mode-together:checked) .pc-identification { display: none; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
    \`;
}

// THE SIDES, the parts of the object model said back in the chapter: the identification on the front, the
// specification on the back, and the progress of the content's project — Doug, 2026-11-15: "progress can be more
// of a narrative of independent things, which perhaps refer to each other", shown alone or on top of the
// specification. Each side is a section of the chapter, its heading its name.
export class $Identification extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-identification');
    }
}

export class $Specification extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-specification');
    }
}

export class $Progress extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-progress');
    }
}

// THE INTERPOLATED PART, Doug, 2026-11-16: "interpolated string-like parts that might describe where something
// will go when we find it" — a word standing for the thing itself until the thing is found, by the interpolation
// rule of the textbook's specification, 2.7.
export class $Interpolated extends $Word {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-interpolated');
    }
}

// THE MATH TEXTBOOK'S SPECIALIZATIONS, Doug, 2026-11-16: "You can specialize them in components for math textbooks
// specifically if you need a bit more structure" — a theorem counted within the chapter and a proof labelled, the
// general content above knowing nothing of either.
export class $Theorem extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-theorem');
    }
}

export class $Proof extends $Paragraph {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-proof');
    }
}

export const Content = $($Content);
export const Identification = $($Identification);
export const Specification = $($Specification);
export const Progress = $($Progress);
export const Interpolated = $($Interpolated);
export const Theorem = $($Theorem);
export const Proof = $($Proof);
`})]}),"TheContent7"),rt=a(A),pt=r(()=>n(rt,{children:[Qe(),Ve(),Le(),_e(),et(),tt(),it(),nt(),ot(),at()]}),"book");export{pt as book};
