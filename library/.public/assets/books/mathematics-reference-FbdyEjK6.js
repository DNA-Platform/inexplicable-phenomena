var g=Object.defineProperty;var a=(b,u)=>g(b,"name",{value:u,configurable:!0});import{jsxs as i,jsx as e}from"react/jsx-runtime";import{$ as w}from"@dna-platform/chemistry";import{C as k,T as y,S as T,a as v,$ as x}from"./1-the-book~code-pymkitcR.js";import{Chapter as h,Title as c,Author as $,Subject as j,Parenthetical as d,Paragraph as n,Section as m,Heading as f,Content as s,Word as p,Part as l,Means as r,List as o,Line as t,Code as E,Append as C}from"@dna-platform/public";import"styled-components";const A=a(()=>i(h,{children:[e(k,{}),e(c,{children:"[Referential Objectivity](/inexplicable-phenomena/mathematical-reference/)"}),e($,{children:"[Doug](/inexplicable-phenomena/our-team/)"}),e(j,{children:"[Mathematics](/inexplicable-phenomena/our-math/)"}),e(y,{children:"The specification of mathematics in this library."})]}),"Cover"),I=a(()=>i(h,{children:[e(T,{}),e(d,{}),i(c,{children:[e(d,{}),"[Synopsis](/inexplicable-phenomena/mathematical-reference/)"]}),e(n,{children:"The specification of mathematics in this library: a part for the books of the subject — the notebook, the textbook, the project, the library and the design — one chapter per book, tracking the idioms its chapters follow, with the enforcing code standing with the chapter that states the idiom and the rest marked held by hand; and a part for the forms, opening with the specification of a specification — a title with a numbered list of lists, items cited by number, the specification and the thing it specifies moving back and forth, and never thrown away, a change made by changing the specification — written in its own form on my rulings of 12 November 2026; and then the content of 15 November, the thing whose front is the deliverable — the result of the effort of the team, the familiar chapter — and whose back is the project: the statement of work, the progress, a plan, a discussion, an author on every part, its object model respecified in its chapter from my answers of 16 November."})]}),"Synopsis"),N=a(()=>i(h,{children:[e(v,{}),i(c,{children:[e(d,{}),"[Table of Contents](/inexplicable-phenomena/mathematical-reference/#table-of-contents)"]}),i(m,{children:[e(f,{children:"The Books"}),e(n,{children:e(s,{children:"[The Notebook](/inexplicable-phenomena/mathematical-reference/#the-notebook)"})}),e(n,{children:e(s,{children:"[The Textbook](/inexplicable-phenomena/mathematical-reference/#the-textbook)"})}),e(n,{children:e(s,{children:"[The Project](/inexplicable-phenomena/mathematical-reference/#the-project)"})}),e(n,{children:e(s,{children:"[The Library](/inexplicable-phenomena/mathematical-reference/#the-library)"})}),e(n,{children:e(s,{children:"[The Design](/inexplicable-phenomena/mathematical-reference/#the-design)"})})]}),i(m,{children:[e(f,{children:"The Forms"}),e(n,{children:e(s,{children:"[The Specification](/inexplicable-phenomena/mathematical-reference/#the-specification)"})}),e(n,{children:e(s,{children:"[The Content](/inexplicable-phenomena/mathematical-reference/#the-content)"})}),i(n,{children:[e(d,{}),e(p,{children:e(s,{children:"[Mathematical Reference](/inexplicable-phenomena/mathematical-reference/)"})}),e(p,{children:e(s,{children:"[Synopsis](/inexplicable-phenomena/mathematical-reference/#synopsis)"})}),e(p,{children:e(s,{children:"[Table of Contents](/inexplicable-phenomena/mathematical-reference/#table-of-contents)"})})]})]})]}),"Table"),S=a(()=>i(h,{children:[e(l,{children:"The Books"}),e(c,{children:"[The Notebook](/inexplicable-phenomena/mathematical-reference/#the-notebook)"}),i(n,{children:["The notebook takes the notes. Nothing in it is official: it is where rulings, analogies and specifications live while the textbook is not ready to state them. The notebook of the first subject is ",e(r,{children:"[The Notebook of Arithmetic](/inexplicable-phenomena/arithmetic-notebook/)"}),"."]}),i(n,{children:[e(o,{}),e(t,{children:"A chapter names its part with the Part annotation and opens with one provenance paragraph: where the note came from and on whose word it stands."}),e(t,{children:"Only I am quoted. Everyone else — a paper, a session, a teammate — is paraphrased, with the source named."}),e(t,{children:"Titles are short names, and no heading on the page repeats a title or another heading."}),e(t,{children:"Every chapter gets its row on the table of contents and its clause in the synopsis, written in the same act."}),e(t,{children:"A resource stands beside its chapter, named for it with a tilde."})]}),i(n,{children:["One idiom is enforced by code: every quoted span of four or more words must stand in a conversation's message or a sprint record, and the checker beside ",e(r,{children:"[The Sources](/inexplicable-phenomena/arithmetic-notebook/#the-sources)"})," proves it, failing the loop until every span is found. The rest are held by hand."]})]}),"TheNotebook1"),O=a(()=>i(h,{children:[e(l,{children:"The Books"}),e(c,{children:"[The Textbook](/inexplicable-phenomena/mathematical-reference/#the-textbook)"}),i(n,{children:["The textbook is the first place where official results go. A definition or a theorem enters it only as I have ruled it in the room; what I have not ruled stays a notebook note. The textbook of the first subject is ",e(r,{children:"[The Textbook of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/)"}),"."]}),i(n,{children:[e(o,{}),e(t,{children:"Official results only: every chapter stands on a ruling recorded verbatim in the sprint records."}),e(t,{children:"The official form is the algebraic one, ruled 12 November 2026; the prose stays in the notebook."}),e(t,{children:"Results are stated and proved, and their references resolve into the subject's library of publications."})]}),e(n,{children:"What a textbook entry is, as I have specified it so far, 12 and 15 November 2026: a chapter is an attempt to specify one mathematical object, and bears the object's title. It carries the specification of the object — the sovereign part, since we formalize specifications — an informal explanation, the formalism itself with a justification of how it satisfies the specification, and presentations in different contexts, each context itself specified. Citations run into the subject's library and into the subject's own notes. One aspect is viewable at a time. What is specified and not yet built stands as a placeholder for itself — the interpolation approach. The justification leans toward visible annotations, writing added to a part of a chapter and toggled in the UI; and the specification needs a form, since when it changes the formal structure and the justifications must change with it."}),e(n,{children:"The components foreseen and not yet ruled: a form for the specification whose clauses have identity; the justification as an annotation sort whose note answers with writing, toggled by the theme; a placeholder for the interpolation; a context specification for each presentation; and the theme's rule that shows one aspect alone, on the front's precedent. The classes will stand with this chapter as its code once they are ruled; until then every idiom here is held by hand. The potential four chapters of 12 November stand retired in the subject's notes, and the textbook's first object is named: X, the symmetry of arithmetic, specified by my statement of work of 15 November 2026, its chapter the textbook's first — the identification standing as its own placeholder."})]}),"TheTextbook2"),D=a(()=>i(h,{children:[e(l,{children:"The Books"}),e(c,{children:"[The Project](/inexplicable-phenomena/mathematical-reference/#the-project)"}),i(n,{children:["The project is the record of the work: what each sprint accomplished and what it leaves. The project of the first subject is ",e(r,{children:"[The Project of Arithmetic](/inexplicable-phenomena/arithmetic-project/)"}),"."]}),i(n,{children:[e(o,{}),e(t,{children:"One entry per sprint, written at the close, in the form of the entries before it."}),e(t,{children:"An entry names what was built, refers into the notebook and the library where the work landed, and says what the sprint leaves."}),e(t,{children:"Each entry has its row on the project's table; the sprint's full record lives in the branch library, not here."})]}),e(n,{children:"Held by hand; the loop's prover walks every reference an entry makes."})]}),"TheProject3"),P=a(()=>i(h,{children:[e(l,{children:"The Books"}),e(c,{children:"[The Library](/inexplicable-phenomena/mathematical-reference/#the-library)"}),i(n,{children:["The library of a subject holds the publications its work leans on. The first is ",e(r,{children:"[The Library of Mathematics](/inexplicable-phenomena/mathematical-library/)"}),"."]}),i(n,{children:[e(o,{}),e(t,{children:"A publication is a chapter, keyed by author and year in the form of Gödel 1931, and the table lists the rows alphabetically by key."}),e(t,{children:"A free text is held beside its chapter with its file and a plate of the first page; a copyrighted one is cited by address."}),e(t,{children:"The chapter carries the citation and the notes; the citing books refer in by the key, and the chapter's writeup refers back to them."})]}),e(n,{children:"Enforced by code: the prover in the branch library, the tool of the book Inexplicable Phenomena's third chapter, opens every row in a real browser, follows the plate to the held file or the address, and fails on a landing that does not answer. The keys and the rows are held by hand."})]}),"TheLibrary4"),L=a(()=>i(h,{children:[e(l,{children:"The Books"}),e(c,{children:"[The Design](/inexplicable-phenomena/mathematical-reference/#the-design)"}),i(n,{children:["The design book holds the subject's visual decisions as sketches. The first is ",e(r,{children:"[Subjective Design](/inexplicable-phenomena/mathematical-design/)"}),"."]}),i(n,{children:[e(o,{}),e(t,{children:"A sketch is an HTML page beside its chapter, its forms lettered, each photographed at a desk's width and a phone's."}),e(t,{children:"A sketch is drawn in the pages' own palette and never with the print's class names; the decided form is cited by its number when it is built."}),e(t,{children:"A built design refers to the chapters that exemplify it."})]}),e(n,{children:"Held by hand; the photographs stand beside the chapter as its record."})]}),"TheDesign5"),R=a(()=>i(h,{children:[e(l,{children:"The Forms"}),e(c,{children:"[The Specification](/inexplicable-phenomena/mathematical-reference/#the-specification)"}),i(n,{children:["The specification of a specification, which I ruled on 12 November 2026, written in its own form. For right now a synopsis is a title for the specification with a numbered list of lists, and in a book's synopsis we write the specification of what the book is supposed to be; the first is ",e(r,{children:"[The Textbook of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/)"}),"'s. The library's chosen format — the legal document, its parts and its relationship to the implementation — stands in ",e(r,{children:"[Subjective Reference](/inexplicable-phenomena/our-reference/)"}),", and this chapter is mathematics' redress of it."]}),i(n,{children:[e(o,{}),e(t,{children:"1. The form"}),e(t,{children:"1.1 A specification is a title with a numbered list of lists."}),e(t,{children:"1.2 Every item carries its number, and things are referenced across the specification by those numbers."}),e(t,{children:"1.3 For right now, the specification of a book is written in its synopsis."})]}),i(n,{children:[e(o,{}),e(t,{children:"2. The two forms"}),e(t,{children:"2.1 A thing shows in specification form or in implementation form."}),e(t,{children:"2.2 The specification and the thing it specifies move back and forth, each reachable from the other."}),e(t,{children:"2.3 In a chapter the formalization, the explanation and the presentation are each specified, and each moves back and forth with its specification."})]}),i(n,{children:[e(o,{}),e(t,{children:"3. The justification"}),e(t,{children:"3.1 The implementation is annotated with justifications."}),e(t,{children:"3.2 A justification says how the implementation satisfies the specification, citing items by number."}),e(t,{children:"3.3 A justification is a visible annotation, toggled in the UI."})]}),i(n,{children:[e(o,{}),e(t,{children:"4. The interpolation"}),e(t,{children:"4.1 What is specified and not yet built stands as a placeholder for itself."}),e(t,{children:"4.2 An item with no implementation to move to is the placeholder."})]}),i(n,{children:[e(o,{}),e(t,{children:"5. The permanence"}),e(t,{children:"5.1 Specifications are not thrown away; they stay, to be read and improved."}),e(t,{children:"5.2 A change is made by changing the specification, so changes are made in the context of all the other parts."})]}),e(n,{children:"The components of the library that show a thing in specification against implementation form, carry the movement between the two, and bear the justifications begin from this chapter, and they will stand beside it as its code. Until they do, the form is held by hand — the numbers written in the lines, the movement by mention."})]}),"TheSpecification6"),H=a(()=>i(h,{children:[e(l,{children:"The Forms"}),e(c,{children:"[The Content](/inexplicable-phenomena/mathematical-reference/#the-content)"}),i(n,{children:["My idea, 15 November 2026, respecified from my answers of 16 November: a sort of thing that holds the content of a chapter, starting below the title — like a section — with a front and a back. On the front the deliverable: the object, the result of the effort of the team, looking like what it is, a chapter of a math textbook. On the back the project: the formal representation of the work — like the two sides of a wikipedia page, whose back is the talk page where the editors discuss the article. The name, Content, is my maybe and stands until I settle it: the base library already exports a word Content, a Word's content, so the name is to be decided when the thing moves up — and it likely moves all the way up to the base library, played with here first. My frame of 16 November: the design is of the abstraction that applies to anything written in any book — a way of specifying anything a book holds — tested on the math textbook, with components for math textbooks specializing it where more structure is needed, and appendix chapters open to the textbook itself. The statement of work it shows on its back takes the form of ",e(r,{children:"[The Specification](/inexplicable-phenomena/mathematical-reference/#the-specification)"}),"; the library's chosen form — the legal document — stands in ",e(r,{children:"[Subjective Reference](/inexplicable-phenomena/our-reference/)"}),"."]}),e(n,{children:"The object model, said back to me from my words of 15 and 16 November 2026, amendable in place as I correct it."}),i(n,{children:[e(o,{}),e(t,{children:"1. The content"}),e(t,{children:"1.1 A piece of content is the content of its chapter, starting below the title, like a section; it has a front and a back."}),e(t,{children:"1.2 The front is the deliverable: the object, the result of the effort of the team; in the math textbook it looks like a familiar textbook chapter."}),e(t,{children:"1.3 The back is the project: the formal representation of the work, with attribution, self references, and references to the other side."}),e(t,{children:"1.4 It shows one side at a time and toggles back and forth — one unlabelled control to the right of the title, explored rather than read; a reference works across sides where possible."}),e(t,{children:"1.5 It opens on the deliverable; which side is canonical is overridable; and a book says in one word that it defaults to showing one."}),e(t,{children:"1.6 It is a way of specifying anything written in any book; the math textbook is its test, and math-textbook components specialize it where more structure is needed."}),e(t,{children:"1.7 The back names itself in the literal: the chapter's title turns into # Title while the project side shows — no further tag beside it."})]}),i(n,{children:[e(o,{}),e(t,{children:"2. The project"}),e(t,{children:"2.1 Each piece of content has a project: the work whose deliverable the front presents."}),e(t,{children:"2.2 The specification is part of the project — an expression of a statement of work, identifying the project's deliverable; in the math textbook, the mathematical object to formalize that the chapter teaches."}),e(t,{children:"2.3 The progress is part of the project — a narrative of how the project has been going, its entries associated with an author; the justifications associate with the progress, since the progress is to be justified."}),e(t,{children:"2.4 A plan may be expressed there, teammates assigned — all to the author by default, read from the cover if unspecified."}),e(t,{children:"2.5 A discussion may stand there — the talk behind the page."}),e(t,{children:"2.6 The parts beyond the specification are optional — nothing is mandatory; the project makes sense with what it has, and today it holds exactly its two documents."}),e(t,{children:"2.7 The project's documents are highly connected: the renderer speaks the specification's own citation language — numbered sections, dotted clauses, the labels, bracketed references — and every mention is a link to its definition, across the documents."}),e(t,{children:"2.8 The specification wears its source's own register — literal markdown: the monospace face, the heading marks shown, and the chapter's title turning into # Title while the back shows. The dress lives in this chapter's code and gives the specification a different feel from the writing around it."})]}),i(n,{children:[e(o,{}),e(t,{children:"3. The authors"}),e(t,{children:"3.1 Every part has an author, so the team is embedded in the content."}),e(t,{children:"3.2 The author of the book is the default author of every part, read from the cover."})]}),i(n,{children:[e(o,{}),e(t,{children:"4. The open determinations"}),e(t,{children:"4.1 The name: Content collides with the base library's word for a Word's content."}),e(t,{children:"4.2 Answered 16 November: the toggle is one unlabelled control to the right of the title, explored; the visual language telling the project representation from the deliverable — formal against familiar — carries the rest."}),e(t,{children:"4.3 Answered 16 November: the purpose, the project and the progress are not sides or states; the project is the back, and the specification and the progress are its parts."}),e(t,{children:"4.4 Where it lives: played with at the library layer here, likely moved all the way up to the base library."}),e(t,{children:"4.5 Answered 16 November: the first play's four-mode bar made project and content states, and they are not states; the model above replaces it and the bar is withdrawn."}),e(t,{children:"4.6 The discussion rests, 16 November: we don't need it now, and nothing is mandatory."}),e(t,{children:"4.7 How a reference crosses sides; the justifications associate with the progress — does the progress have to be justified? — and the exact tie stands open."})]}),i(n,{children:[e(o,{}),e(t,{children:"5. The components"}),e(t,{children:"5.1 Components divide in two families: those that express things about the project — the subject of the project — and those that present the deliverable of the project, the object."}),e(t,{children:"5.2 In the math textbook the deliverable's components are the familiar ones, the theorem and the proof with the interpolated part among them; the project's are the formal ones, the statement of work's form first."}),e(t,{children:"5.3 The project's named parts are components: the specification and the progress, each a section naming itself, the specification dissolving its first heading into the paragraph that introduces it."}),e(t,{children:"5.4 The specification is the legal document — the thing agreed between buyer and seller, identifying the deliverable uniquely — and its first paragraph is its preamble, set off by its margins; the deliverable is no contract, just the familiar chapter. Its citations are live — a citation in the implementation flips the content to the project side and lands on the part it names, the relationship between the specification and the implementation."})]}),i(n,{children:["The first case already stands: ",e(r,{children:"[The Symmetry of Arithmetic](/inexplicable-phenomena/arithmetic-textbook/#the-symmetry-of-arithmetic)"}),", whose front teaches the formalism with X in its place — the unfound parts interpolated — and whose back is the project: the statement of work in seven parts, the progress in the open determinations O1 to O11, the plan standing with the author, the discussion open. The model is read off that statement."]}),e(n,{children:"The components stand beside this chapter as its code, rebuilt 16 November from my answers. The general ones: Content, the one unlabelled toggle at the title's right — a format said of its chapter, its note drawing the control in place and its style wrapping the chapter, so what is checked rules what shows, everything that is not the project being the deliverable — its canonical side a field a use overrides; and Project, the back's section, carrying the formal dress. The project's named parts: Specification and Progress, returned from the first play as sections rather than sides; Markdown, the document rendered verbatim and connected, its citation language made live. The deliverable's family: Theorem, counted within the chapter; Proof, labelled; Interpolated, the word that stands for a thing until the thing is found; and Cite, the implementation's citation, which flips to the project side and lands on the part named. The name Specification shares its word with a package utility, noted beside Content's collision."}),e(E,{identifier:"code",type:".tsx"}),e(C,{identifier:"code",type:".tsx",children:`import { MouseEvent, ReactNode } from 'react';
import { marked } from 'marked';
import { $, selection } from '@dna-platform/chemistry';
import { $Append, $Format, $Paragraph, $Section, $Word, html } from '@dna-platform/public';

// THE CONTENT IS A THING WITH A FRONT AND A BACK, Doug, 2026-11-15 and respecified from his answers of
// 2026-11-16: the content of a chapter, starting below the title, like a section. On the front the DELIVERABLE —
// the object, the result of the effort of the team, looking like what it is, a familiar math textbook chapter.
// On the back the PROJECT — the formal representation of the work: the statement of work, the progress, a plan,
// a discussion — the talk page behind a wikipedia article, and nothing is mandatory. The project side carries
// the formal visual language. The name Content is a PROXY until he keeps it. The content is a format said of
// its chapter: its note draws the one unlabelled toggle in place, and its style wraps the chapter, so the
// checked control rules what shows — everything that is not the project is the deliverable.
export class $Content extends $Format {
    $canonical = 'deliverable';

    override note(): ReactNode {
        return (
            <label className="pc-content">
                <input
                    type="checkbox"
                    id="pc-flip"
                    defaultChecked={this.$canonical === 'project'}
                />
                <span className="pc-flip" />
            </label>
        );
    }

    // ONE UNLABELLED CONTROL TO THE RIGHT OF THE TITLE, Doug, 2026-11-16: "how about a toggle to the right of
    // the title and it has no label. One can just explore" — and the back announces itself in the literal:
    // the title turns into # Title while the project side shows; the [Project] tag of the same day is struck.
    // THE SOURCE PANE IS A WHITE VSCODE, his rulings of 2026-11-16: "a white vscode theme that feels natural.
    // Takes up the same space as the other side", then "sameness in layout — the same title in same place,
    // gets a # and changes font", then "choose a monospace that doesn't feel too hard". The elegance answer:
    // VS Code's own Windows default is Consolas, not the terminal's rounder, heavier Cascadia — so Consolas
    // leads the stack, at the same-space setting the sweep measured (the same passage at the column's 640px:
    // Georgia 17px on 27.2px stands 272px; Consolas 14.5px on 22.5px stands 270px), .85 of the book's size on
    // a 1.55 line. SAMENESS IN LAYOUT: the Chapter label's ::before is untouched and pinned to the book's
    // face and ink, so the title's box is identical on both sides; the # sits as an ::after hung 2ch into
    // the left gutter, the editor's margin decoration, so the title's text never moves at all; the
    // section headings keep the serif heading's box — 1.15 of the size, the section's margin. The mild
    // highlight is eyedroppered from the screenshot of his own editor, "We are talking about something like
    // that": headings and their marks #0c4c84, the quoted italic #840484, bold leads #000080, body the ink.
    override style = selection.div\`
        counter-reset: theorem;
        .pd-chapter { position: relative; }
        .pc-content { position: absolute; inset-block-start: 2.1rem; inset-inline-end: 0; cursor: pointer; padding: .25rem; }
        .pc-content input { position: absolute; opacity: 0; pointer-events: none; }
        .pc-flip { display: inline-block; inline-size: .9em; block-size: .9em; border: 1.5px solid color-mix(in srgb, \${({ theme }) => theme.ink} 65%, \${({ theme }) => theme.paper}); border-radius: 2px; background: \${({ theme }) => theme.paper}; transition: background .15s ease; }
        .pc-content:hover .pc-flip { border-color: \${({ theme }) => theme.ink}; }
        .pc-content:has(input:checked) .pc-flip { background: color-mix(in srgb, \${({ theme }) => theme.ink} 70%, \${({ theme }) => theme.paper}); }
        .pc-project { display: none; }
        &:has(#pc-flip:checked) .pc-project { display: block; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-paragraph:not(.pd-navigation) { display: none; }
        &:has(#pc-flip:checked) .pd-chapter > .pd-section:not(.pc-project) { display: none; }
        .pc-project .pd-heading { display: block; font-size: calc(.78 * \${({ theme }) => theme.size}); font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: color-mix(in srgb, \${({ theme }) => theme.ink} 52%, \${({ theme }) => theme.paper}); margin-block: 0 .5em; }
        .pc-specification .pc-markdown { font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; font-size: calc(.85 * \${({ theme }) => theme.size}); line-height: 1.55; }
        .pc-specification .pc-markdown h2 { font-family: inherit; font-size: calc(1.15 * \${({ theme }) => theme.size}); margin-block: \${({ theme }) => theme.space} 0; color: #0c4c84; }
        .pc-specification .pc-markdown h2::before { content: '## '; color: inherit; }
        .pc-specification .pc-markdown strong { color: #000080; }
        .pc-specification .pc-markdown em { color: #840484; }
        .pc-specification .pc-markdown h2:first-of-type { display: none; }
        .pc-specification .pc-markdown h2:first-of-type + p { margin-inline: 1.6em; }
        &:has(#pc-flip:checked) .pd-title { position: relative; font-family: Consolas, 'Cascadia Mono', 'Courier New', monospace; color: #0c4c84; }
        &:has(#pc-flip:checked) .pd-title::before { font-family: \${({ theme }) => theme.font}; color: \${({ theme }) => theme.ink}; }
        &:has(#pc-flip:checked) .pd-title::after { content: '# '; position: absolute; inset-inline-start: -2ch; inset-block-end: 0; }
        .pd-section.pc-project { margin-block: calc(\${({ theme }) => theme.space} / 2) 0; }
        .pc-markdown h1 { display: none; }
        .pc-markdown h1 + p { display: none; }
        .pc-markdown h2 { font-family: \${({ theme }) => theme.font}; font-size: calc(1.15 * \${({ theme }) => theme.size}); font-weight: bold; margin-block: 1.1em .35em; color: color-mix(in srgb, \${({ theme }) => theme.ink} 76%, \${({ theme }) => theme.link} 24%); }
        .pc-markdown p { margin-block: .9em; }
        .pc-markdown strong { font-weight: bold; }
        .pc-markdown a { color: \${({ theme }) => theme.link}; text-decoration: none; }
        .pc-markdown a:hover { text-decoration: underline; }
        .pc-cite a { color: \${({ theme }) => theme.link}; text-decoration: none; cursor: pointer; }
        .pc-cite a:hover { text-decoration: underline; }
        .pc-markdown table { width: 100%; border-collapse: separate; border-spacing: 0; margin-block: 1.2em; border: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 14%, \${({ theme }) => theme.paper}); border-radius: 8px; overflow: hidden; }
        .pc-markdown th, .pc-markdown td { padding: .55em .85em; text-align: start; vertical-align: top; }
        .pc-markdown thead th { background: color-mix(in srgb, \${({ theme }) => theme.ink} 4%, \${({ theme }) => theme.paper}); color: color-mix(in srgb, \${({ theme }) => theme.ink} 72%, \${({ theme }) => theme.paper}); font-weight: 600; }
        .pc-markdown tbody td, .pc-markdown tbody th { border-block-start: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 11%, \${({ theme }) => theme.paper}); }
        .pc-markdown th + th, .pc-markdown td + td { border-inline-start: 1px solid color-mix(in srgb, \${({ theme }) => theme.ink} 11%, \${({ theme }) => theme.paper}); }
        .pc-markdown ol, .pc-markdown ul { padding-inline-start: 1.5em; margin-block: .9em; }
        .pc-markdown li { margin-block: .35em; }
        .pc-interpolated { font-style: italic; opacity: .75; border-block-end: 1px dashed color-mix(in srgb, currentColor 60%, transparent); }
        .pc-theorem { counter-increment: theorem; }
        .pc-theorem::before { content: 'Theorem ' counter(theorem) '.'; font-weight: bold; margin-inline-end: .5em; }
        .pc-proof::before { content: 'Proof.'; font-style: italic; margin-inline-end: .5em; }
    \`;
}

// THE PROJECT IS THE BACK, Doug's answers, 2026-11-16: the specification is part of the project, an expression
// of a statement of work identifying the deliverable; the progress is a narrative of how the project has been
// going, its entries associated with an author; a plan may be expressed with teammates assigned, all to the
// author by default as read from the cover; a discussion may stand there. The parts beyond the specification
// are optional. One section of the chapter, the formal register.
// NOTHING COLLAPSES, Doug, 2026-11-16: "STOP MAKING THINGS COLLAPSE!!! VERBATIM!" — the project's parts stand
// open and whole, plain sections.
export class $Project extends $Section {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-project');
    }
}

// THE PROJECT'S NAMED PARTS, Doug, 2026-11-16: "And then create the Specification?" — the specification and
// the progress are the project's parts, each a section naming itself in the formal dress. The specification
// dissolves its own first heading: its purpose reads as the introducing paragraph, not a second title.
export class $Specification extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-specification');
    }
}

export class $Progress extends $Project {
    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-progress');
    }
}

// THE SPECIFICATION REFERENCES ITSELF, Doug, 2026-11-16: "the spec should reference itself ... The
// specification should be highly connected" — and verbatim stays verbatim: the document already speaks a
// citation language — numbered sections, dotted parts, the labels K, C and O, bracketed references — so the
// renderer learns that language rather than the document changing. Definitions receive ids; every mention
// becomes a link to its definition, across the project's documents, since both render on one page.
const cited = /\\[(\\d+(?:,\\s*\\d+)*)\\]|\\b[Ss]ections? \\d+(?: to \\d+)?\\b|\\b[KCO]\\d+\\b|\\b\\d\\.\\d\\b/g;

const place = (citation: string): string => {
    const section = citation.match(/^[Ss]ections? (\\d+)/);
    if (section !== null) return \`cite-sec-\${section[1]}\`;
    const label = citation.match(/^([KCO])(\\d+)$/);
    if (label !== null) return \`cite-\${label[1].toLowerCase()}\${label[2]}\`;
    return \`cite-\${citation.replace('.', '-')}\`;
};

const link = (citation: string): string => {
    if (citation.startsWith('[')) {
        return '[' + citation.slice(1, -1).split(',').map(number =>
            \`<a href="#cite-ref-\${number.trim()}">\${number.trim()}</a>\`).join(', ') + ']';
    }
    return \`<a href="#\${place(citation)}">\${citation}</a>\`;
};

const mention = (passage: string, sections: boolean): string =>
    passage.split(/(<[^>]*>)/).map((piece, index, pieces) => {
        if (piece.startsWith('<')) return piece;
        const previous = pieces[index - 1];
        const lead = previous !== undefined && previous.includes('id="cite-')
            ? (piece.match(/^(?:[KCO]\\d+|\\d+\\.\\d+|\\d+\\.)/) ?? [''])[0]
            : '';
        return lead + piece.slice(lead.length).replace(cited, found =>
            !sections && /^[Ss]ection/.test(found) ? found : link(found));
    }).join('');

const connect = (rendered: string): string => {
    const identified = rendered
        .replace(/<h2>(\\d+)\\. /g, (whole, section) => \`<h2 id="cite-sec-\${section}">\${section}. \`)
        .replace(/<(strong|td)>(\\d+)\\.(\\d+) /g, (whole, tag, section, part) => \`<\${tag} id="cite-\${section}-\${part}">\${section}.\${part} \`)
        .replace(/<(strong|td)>([KCO])(\\d+) /g, (whole, tag, letter, number) => \`<\${tag} id="cite-\${letter.toLowerCase()}\${number}">\${letter}\${number} \`);
    const boundary = identified.indexOf('<h2>Related work</h2>');
    if (boundary === -1) return mention(identified, true);
    let count = 0;
    const references = identified.slice(boundary).replace(/<li>/g, () => \`<li id="cite-ref-\${++count}">\`);
    return mention(identified.slice(0, boundary), true) + mention(references, false);
};

// THE DOCUMENT RENDERS VERBATIM, Doug, 2026-11-16: "This is what it looks like. Read the markdown. Render it
// like that. I said verbatim" — the chapter's appended markdown parsed by marked, the package's own dependency,
// and drawn as the document renders: the bold lead-ins, the tables, the lists, the document's own title.
// A citation click turns the page itself — the hash never moves, so the place in the address stays the chapter's.
export class $Markdown extends $Paragraph {
    $identifier = '';

    follow = (press: MouseEvent<HTMLDivElement>): void => {
        const citation = (press.target as Element).closest('a[href^="#cite-"]');
        if (citation === null) return;
        press.preventDefault();
        const place = document.getElementById(citation.getAttribute('href')?.slice(1) ?? '');
        place?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    get append(): $Append | undefined {
        return this.chapter?.annotations.find($Append).find(append => append.$identifier === this.$identifier);
    }

    override write(): ReactNode {
        const append = this.append;
        if (append === undefined) return null;
        const rendered = connect(marked.parse(html.copy(append.text), { async: false }));
        return <div className={\`pc-doc-\${this.$identifier}\`} onClick={this.follow} dangerouslySetInnerHTML={{ __html: rendered }} />;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-markdown');
    }
}

// THE IMPLEMENTATION CITES THE SPECIFICATION, Doug, 2026-11-16: "there needs to be some relationship between
// the spec and the implementation" — the deliverable cites the part of the specification it meets, by number
// or label, and the citation leads there: it flips the content to the project side and lands on the part named.
export class $Cite extends $Word {
    $part = '';

    // The part is read back from the clicked anchor's own text: the handler's instance predates the pass
    // that applies props to the held one, so the rendered citation is the one source the click can trust.
    follow = (press: MouseEvent<HTMLAnchorElement>): void => {
        const part = press.currentTarget.textContent ?? '';
        const flip = document.getElementById('pc-flip');
        if (flip instanceof HTMLInputElement) flip.checked = true;
        requestAnimationFrame(() =>
            document.getElementById(place(part))?.scrollIntoView({ block: 'center' }));
    };

    override write(): ReactNode {
        return <a onClick={this.follow}>{this.$part}</a>;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pc-cite');
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

// THE DELIVERABLE'S DRESS, Doug, 2026-11-16: components divide in two families — those that express the
// subject of the project and those that present the deliverable. These present: a theorem counted within the
// chapter and a proof labelled — the familiar dress of a math textbook. THE SPECIFICATION IS THE LEGAL
// DOCUMENT, his correction of the same day — the deliverable is not; the preamble is the specification's
// first paragraph, set off by its margins above.
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
export const Project = $($Project);
export const Specification = $($Specification);
export const Progress = $($Progress);
export const Markdown = $($Markdown);
export const Cite = $($Cite);
export const Interpolated = $($Interpolated);
export const Theorem = $($Theorem);
export const Proof = $($Proof);
`})]}),"TheContent7"),M=w(x),U=a(()=>i(M,{children:[A(),I(),N(),S(),O(),D(),P(),L(),R(),H()]}),"book");export{U as book};
