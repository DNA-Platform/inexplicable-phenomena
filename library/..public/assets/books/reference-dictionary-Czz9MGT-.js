var M=Object.defineProperty;var o=(B,e)=>M(B,"name",{value:e,configurable:!0});import{jsxs as n,Fragment as g,jsx as i}from"react/jsx-runtime";import{$ as l,selection as m}from"@dna-platform/chemistry";import{$Theme as H,$Paragraph as N,Means as c,Word as r,Reference as W,$Word as Y,Theme as J,$Book as K,$Cover as Q,$Synopsis as U,$TableOfContents as V,$Table as X,Chapter as d,Title as h,Author as Z,Subject as L,Parenthetical as x,Paragraph as t,Section as _,Heading as ee,Content as s,Emphasis as a}from"@dna-platform/public";import{css as b}from"styled-components";const T=class T extends H{constructor(){super(...arguments),this.font="Georgia, 'Times New Roman', serif",this.size="1rem",this.leading="1.7",this.measure="42rem",this.space="1.25rem",this.ink="#23262a",this.paper="#faf8f4",this.link="#5b2f2a",this.style=m.div`${this.parts()}`}parts(){return[this.page(),this.levels(),this.labels(),this.links(),this.apparatus(),this.figures()]}page(){return b`
            font-family: ${({theme:e})=>e.font};
            font-size: ${({theme:e})=>e.size};
            line-height: ${({theme:e})=>e.leading};
            color: ${({theme:e})=>e.ink};
            background: ${({theme:e})=>e.paper};
            max-width: ${({theme:e})=>e.measure};
            margin-inline: auto;
            padding: ${({theme:e})=>e.space};
            @media (min-width: 64rem) { max-width: 52rem; }
        `}levels(){return b`
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
        `}labels(){return b`
            .pd-label, .pd-chapter .pd-title::before {
                font-size: calc(0.7 * ${({theme:e})=>e.size});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.65;
            }
        `}links(){return b`
            .pa-reference { color: ${({theme:e})=>e.link}; text-decoration-color: ${({theme:e})=>e.link}; text-underline-offset: 0.15em; }
            .pa-self-reference { color: inherit; text-decoration: none; }
            .pa-referent { scroll-margin-block-start: ${({theme:e})=>e.space}; }
            .pa-content { color: ${({theme:e})=>e.link}; }
        `}apparatus(){return b`
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
        `}figures(){return b`
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
        `}};o(T,"$LibraryTheme");let $=T;const ie=l($),A=class A extends N{$Define(){super.$Define(),this.classes.add(this,"pd-running-head")}write(){const e=this.book;if(e===void 0)return null;const p=e.table?.canonical,f=e.subject?.means?.identifier===e.title?.means?.identifier,y=l(c),E=l(r),G=l(W);return n(g,{children:[f?null:n(g,{children:[i(y,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/reference/)"})," / "]}),i(E,{children:e.title?.name}),": ",n(E,{children:[i(G,{children:p?.means?.identifier}),p?.name]})]})}};o(A,"$RunningHead");let k=A;const z=class z extends Y{$Define(){super.$Define(),this.classes.add(this,"pd-label")}};o(z,"$Label");let w=z;const D=class D extends N{$Define(){super.$Define(),this.classes.add(this,"pd-byline")}write(){const e=this.book;if(e===void 0)return null;const p=l(re),f=l(r),y=l(W);return n(g,{children:[i(p,{children:"Author"})," ",n(f,{children:[i(y,{children:e.author?.means?.identifier}),e.author?.name]}),i(p,{children:"Filed under"})," ",n(f,{children:[i(y,{children:e.subject?.means?.identifier}),e.subject?.name]})]})}};o(D,"$Byline");let j=D;const ne=l(k),te=l(w),re=te,ae=l(j),O=class O extends K{write(){const e=l(ne),p=l(ae);return n(g,{children:[i(e,{chapter:this.cover}),i(p,{chapter:this.cover}),super.write()]})}turn(){if(this.bookmark!==void 0&&this.bookmark===this.cover){window.scrollTo(0,0);return}super.turn()}};o(O,"$TheLibrary");let u=O;const ce=l(u);l(ce,J)(ie);const q=class q extends Q{constructor(){super(...arguments),this.style=m.header`
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
    `}};o(q,"$LibraryCover");let R=q;const F=class F extends U{constructor(){super(...arguments),this.style=m.div`
        .pd-chapter.pa-synopsis {
            margin-block: calc(1.5 * ${({theme:e})=>e.space});
            padding-inline-start: ${({theme:e})=>e.space};
            border-inline-start: 2px solid ${({theme:e})=>e.link};
        }
        .pa-synopsis .pd-paragraph { font-style: italic; }
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `}};o(F,"$LibrarySynopsis");let v=F;const C=class C extends V{constructor(){super(...arguments),this.style=m.nav`
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
    `}};o(C,"$LibraryTableOfContents");let S=C;const P=class P extends X{constructor(){super(...arguments),this.style=m(this.style)`
        .pa-table { column-gap: ${({theme:e})=>e.space}; row-gap: calc(${({theme:e})=>e.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-col {
            padding-block: calc(${({theme:e})=>e.space} / 3);
            border-block-end: 1px solid color-mix(in srgb, ${({theme:e})=>e.ink} 7%, ${({theme:e})=>e.paper});
        }
    `}};o(P,"$LibraryTable");let I=P;const oe=l(R),le=l(v),se=l(S);l(I);const de=o(()=>n(d,{children:[i(oe,{}),i(h,{children:"[Dictionary](/inexplicable-phenomena/dictionary/)"}),i(Z,{children:"[The Team](/inexplicable-phenomena/the-team/)"}),i(L,{children:"[Inexplicable Phenomena](/inexplicable-phenomena/reference/)"})]}),"Cover"),he=o(()=>n(d,{children:[i(le,{}),n(h,{children:[i(x,{}),"[Synopsis](/inexplicable-phenomena/dictionary/)"]}),i(t,{children:"A dictionary, in the first dictionary's own words: colloquially, a canonical source of canonical definitions; semantically, a catalogue of definitions, and so the one entry of this book that is the book itself. Twelve words stand here, one chapter each, in the order of the alphabet: eight with the senses the first dictionary gave them, and four that stand so that their definitions have somewhere to go."})]}),"Synopsis"),pe=o(()=>n(d,{children:[i(se,{}),n(h,{children:[i(x,{}),"[Table of Contents](/inexplicable-phenomena/dictionary/#table-of-contents)"]}),n(_,{children:[i(ee,{children:"The words"}),i(t,{children:i(s,{children:"[Definition](/inexplicable-phenomena/dictionary/#definition)"})}),i(t,{children:i(s,{children:"[Dichotomy](/inexplicable-phenomena/dictionary/#dichotomy)"})}),i(t,{children:i(s,{children:"[Identification](/inexplicable-phenomena/dictionary/#identification)"})}),i(t,{children:i(s,{children:"[Identity](/inexplicable-phenomena/dictionary/#identity)"})}),i(t,{children:i(s,{children:"[Individuality](/inexplicable-phenomena/dictionary/#individuality)"})}),i(t,{children:i(s,{children:"[Object](/inexplicable-phenomena/dictionary/#object)"})}),i(t,{children:i(s,{children:"[Reference](/inexplicable-phenomena/dictionary/#reference)"})}),i(t,{children:i(s,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"})}),i(t,{children:i(s,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"})}),i(t,{children:i(s,{children:"[Representation](/inexplicable-phenomena/dictionary/#representation)"})}),i(t,{children:i(s,{children:"[Representative](/inexplicable-phenomena/dictionary/#representative)"})}),i(t,{children:i(s,{children:"[Subject](/inexplicable-phenomena/dictionary/#subject)"})}),n(t,{children:[i(x,{}),i(r,{children:i(s,{children:"[Dictionary](/inexplicable-phenomena/dictionary/)"})}),i(r,{children:i(s,{children:"[Synopsis](/inexplicable-phenomena/dictionary/#synopsis)"})}),i(r,{children:i(s,{children:"[Table of Contents](/inexplicable-phenomena/dictionary/#table-of-contents)"})})]})]})]}),"Table"),be=o(()=>n(d,{children:[i(h,{children:"[Definition](/inexplicable-phenomena/dictionary/#definition)"}),n(t,{children:[n(r,{children:[i(a,{}),"Semantic."]})," ","A definition in Semantic Reference Theory is a statement that establishes the meaning of a term or concept by expressing its equivalence to a formal expression using the transduction operator."]}),n(t,{children:[n(r,{children:[i(a,{}),"Formal logic."]})," ","A definition introduces a new symbol or term by asserting its logical equivalence to an expression containing only previously defined terms."]}),n(t,{children:[n(r,{children:[i(a,{}),"Linguistic."]})," ","A definition establishes the semantic content of a word or phrase by stating its necessary and sufficient conditions."]}),n(t,{children:[n(r,{children:[i(a,{}),"Operational."]})," ","A definition provides criteria for determining whether a concept applies to a given case, often through observable properties or procedures."]}),n(t,{children:[n(r,{children:[i(a,{}),"Related."]})," ","Transduction, Semantic Reference Theory, ",i(c,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"}),", property, inheritance."]})]}),"Definition1"),me=o(()=>n(d,{children:[i(h,{children:"[Dichotomy](/inexplicable-phenomena/dictionary/#dichotomy)"}),i(t,{children:"Not yet defined. The word stands in the dictionary so that its definition has somewhere to go."})]}),"Dichotomy2"),fe=o(()=>n(d,{children:[i(h,{children:"[Identification](/inexplicable-phenomena/dictionary/#identification)"}),n(t,{children:[n(r,{children:[i(a,{}),"Linguistic."]})," ","Identification is the process of recognizing or establishing the identity of something."]}),n(t,{children:[n(r,{children:[i(a,{}),"Semantic."]})," ","Identification is the process by which a perspective assigns identity to a referent, enabling it to possess its own identity intrinsically. It is the first fundamental operation of a perspective."]}),n(t,{children:[n(r,{children:[i(a,{}),"Formal."]})," ",i(r,{children:"(i) =(o)> (o) |=identify> (o) =(o)> o"})]}),n(t,{children:[n(r,{children:[i(a,{}),"Related."]})," ","Perspective, qualification, relation, ",i(c,{children:"[Identity](/inexplicable-phenomena/dictionary/#identity)"}),", transduction."]})]}),"Identification3"),ye=o(()=>n(d,{children:[i(h,{children:"[Identity](/inexplicable-phenomena/dictionary/#identity)"}),n(t,{children:[n(r,{children:[i(a,{}),"Linguistic."]})," ","Identity is the fact of being who or what a person or thing is; the characteristics determining this."]}),n(t,{children:[n(r,{children:[i(a,{}),"Semantic."]})," ","Identity is the intrinsic quality that enables a referent to be itself and to be distinguishable from other referents. It is established through the process of ",i(c,{children:"[Identification](/inexplicable-phenomena/dictionary/#identification)"})," ","within a perspective."]}),n(t,{children:[n(r,{children:[i(a,{}),"Formal."]})," ",i(r,{children:"(o) =(o)> o"})]}),n(t,{children:[n(r,{children:[i(a,{}),"Related."]})," ",i(c,{children:"[Identification](/inexplicable-phenomena/dictionary/#identification)"}),", self-reference, property, perspective."]})]}),"Identity4"),ge=o(()=>n(d,{children:[i(h,{children:"[Individuality](/inexplicable-phenomena/dictionary/#individuality)"}),i(t,{children:"Not yet defined. The word stands in the dictionary so that its definition has somewhere to go."})]}),"Individuality5"),ue=o(()=>n(d,{children:[i(h,{children:"[Object](/inexplicable-phenomena/dictionary/#object)"}),n(t,{children:[n(r,{children:[i(a,{}),"Linguistic."]})," ","An object is an entity toward which action, thought, or emotion is directed, often functioning as the grammatical object in a sentence."]}),n(t,{children:[n(r,{children:[i(a,{}),"Semantic."]})," ","An object is a ",i(c,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"})," that is the target of a"," ",i(c,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"}),". In the ternary relation R(x,y,t), y is the object."]}),n(t,{children:[n(r,{children:[i(a,{}),"Formal."]})," ",i(r,{children:"E[x,y]: x => y =|> E[O]: y.O"})]}),n(t,{children:[n(r,{children:[i(a,{}),"Related."]})," ",i(c,{children:"[Subject](/inexplicable-phenomena/dictionary/#subject)"}),", ternary, ",i(c,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"}),","," ",i(c,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"}),", property."]})]}),"Object6"),xe=o(()=>n(d,{children:[i(h,{children:"[Reference](/inexplicable-phenomena/dictionary/#reference)"}),n(t,{children:[n(r,{children:[i(a,{}),"Linguistic."]})," ","Reference is the relationship between a linguistic expression and the entity in the world that it identifies or denotes."]}),n(t,{children:[n(r,{children:[i(a,{}),"Semantic."]})," ","Reference is the act by which a ",i(c,{children:"[Subject](/inexplicable-phenomena/dictionary/#subject)"})," directs attention to an"," ",i(c,{children:"[Object](/inexplicable-phenomena/dictionary/#object)"})," through a specific ",i(c,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"})," type."]}),n(t,{children:[n(r,{children:[i(a,{}),"Formal."]})," ",i(r,{children:"E[x,y,t]: x =t> y & x != y =|> x =ref> y"})]}),n(t,{children:[n(r,{children:[i(a,{}),"Related."]})," ",i(c,{children:"[Subject](/inexplicable-phenomena/dictionary/#subject)"}),", ",i(c,{children:"[Object](/inexplicable-phenomena/dictionary/#object)"}),", ",i(c,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"}),", symbol, ",i(c,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"}),"."]})]}),"Reference7"),$e=o(()=>n(d,{children:[i(h,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"}),n(t,{children:[n(r,{children:[i(a,{}),"Semantic."]})," ","A referent is an entity that can participate in the ternary relation R(x,y,t) as a subject, object, or relationship type. In the context of Semantic Reference Theory, a referent is defined as an object which could be assigned to a constant."]}),n(t,{children:[n(r,{children:[i(a,{}),"Formal."]})," ",i(r,{children:'Referent(x) := "x can be substituted for a variable in SRT"'})]}),n(t,{children:[n(r,{children:[i(a,{}),"Philosophical."]})," ","A referent is the target of reference, the object to which a name, sign, or description refers."]}),n(t,{children:[n(r,{children:[i(a,{}),"Ontological."]})," ","A referent is a basic entity in a catalogue that maintains its identity through the relationships it participates in."]}),n(t,{children:[n(r,{children:[i(a,{}),"Related."]})," ","Catalogue, ",i(c,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"}),", ",i(c,{children:"[Subject](/inexplicable-phenomena/dictionary/#subject)"}),","," ",i(c,{children:"[Object](/inexplicable-phenomena/dictionary/#object)"}),", constant, ternary, transduction."]})]}),"Referent8"),ke=o(()=>n(d,{children:[i(h,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"}),n(t,{children:[n(r,{children:[i(a,{}),"Semantic."]})," ","A relationship is a connection between ",i(c,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"}),"s established through the ternary relation R(x,y,t). When referents x and y are distinct, t specifies the relationship type that connects them."]}),n(t,{children:[n(r,{children:[i(a,{}),"Formal."]})," ",i(r,{children:"R(x,y,t) & x != y"}),", creating a directed connection from a subject to an object through a specific type."]}),n(t,{children:[n(r,{children:[i(a,{}),"Graph theory."]})," ","A relationship can be viewed as a labeled, directed edge in a graph, where referents are nodes and the relationship type is the edge label."]}),n(t,{children:[n(r,{children:[i(a,{}),"Linguistic."]})," ","A relationship corresponds to the predicate in a subject-predicate-object grammatical structure, determining how subjects relate to objects."]}),n(t,{children:[n(r,{children:[i(a,{}),"Related."]})," ","Ternary, ",i(c,{children:"[Subject](/inexplicable-phenomena/dictionary/#subject)"}),", ",i(c,{children:"[Object](/inexplicable-phenomena/dictionary/#object)"}),", property, inheritance,"," ",i(c,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"}),", catalogue."]})]}),"Relationship9"),we=o(()=>n(d,{children:[i(h,{children:"[Representation](/inexplicable-phenomena/dictionary/#representation)"}),i(t,{children:"Not yet defined. The word stands in the dictionary so that its definition has somewhere to go."})]}),"Representation10"),je=o(()=>n(d,{children:[i(h,{children:"[Representative](/inexplicable-phenomena/dictionary/#representative)"}),i(t,{children:"Not yet defined. The word stands in the dictionary so that its definition has somewhere to go."})]}),"Representative11"),Re=o(()=>n(d,{children:[i(h,{children:"[Subject](/inexplicable-phenomena/dictionary/#subject)"}),n(t,{children:[n(r,{children:[i(a,{}),"Linguistic."]})," ","In grammar, a subject is the person or thing that performs the action expressed by a verb or about which something is stated."]}),n(t,{children:[n(r,{children:[i(a,{}),"Semantic."]})," ","A subject is a ",i(c,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"})," that participates in a direct"," ",i(c,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"})," with a distinct ",i(c,{children:"[Object](/inexplicable-phenomena/dictionary/#object)"}),". In the ternary relation R(x,y,t), x is the subject when x and y differ."]}),n(t,{children:[n(r,{children:[i(a,{}),"Formal."]})," ",i(r,{children:"E[x,y,t]: x =t> y =|> x != y =|> E[S]: x.S"})]}),n(t,{children:[n(r,{children:[i(a,{}),"Related."]})," ","Ternary, ",i(c,{children:"[Object](/inexplicable-phenomena/dictionary/#object)"}),", ",i(c,{children:"[Relationship](/inexplicable-phenomena/dictionary/#relationship)"}),","," ",i(c,{children:"[Referent](/inexplicable-phenomena/dictionary/#referent)"}),", perspective, property."]})]}),"Subject12"),ve=l(u),De=o(()=>n(ve,{children:[de(),he(),pe(),be(),me(),fe(),ye(),ge(),ue(),xe(),$e(),ke(),we(),je(),Re()]}),"book");export{De as book};
