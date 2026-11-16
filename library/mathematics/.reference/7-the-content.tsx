import { Append, Code, Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Forms</Part>
        <Title>[[ The Content ]]</Title>
        <Paragraph>
            My idea, 15 November 2026, respecified from my answers of 16 November: a sort of thing that holds
            the content of a chapter, starting below the title — like a section — with a front and a back. On
            the front the deliverable: the object, the result of the effort of the team, looking like what it
            is, a chapter of a math textbook. On the back the project: the formal representation of the work —
            like the two sides of a wikipedia page, whose back is the talk page where the editors discuss the
            article. The name, Content, is my maybe and stands until I settle it: the base library already
            exports a word Content, a Word's content, so the name is to be decided when the thing moves up —
            and it likely moves all the way up to the base library, played with here first. My frame of
            16 November: the design is of the abstraction that applies to anything written in any book — a way
            of specifying anything a book holds — tested on the math textbook, with components for math
            textbooks specializing it where more structure is needed, and appendix chapters open to the
            textbook itself. The statement of work it shows on its back takes the form
            of <Means>$[[ ./The Specification ]]</Means>.
        </Paragraph>
        <Paragraph>
            The object model, said back to me from my words of 15 and 16 November 2026, amendable in place as
            I correct it.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>1. The content</Line>
            <Line>1.1 A piece of content is the content of its chapter, starting below the title, like a section; it has a front and a back.</Line>
            <Line>1.2 The front is the deliverable: the object, the result of the effort of the team; in the math textbook it looks like a familiar textbook chapter.</Line>
            <Line>1.3 The back is the project: the formal representation of the work, with attribution, self references, and references to the other side.</Line>
            <Line>1.4 It shows one side at a time and toggles back and forth — one unlabelled control to the right of the title, explored rather than read; a reference works across sides where possible.</Line>
            <Line>1.5 It opens on the deliverable; which side is canonical is overridable; and a book says in one word that it defaults to showing one.</Line>
            <Line>1.6 It is a way of specifying anything written in any book; the math textbook is its test, and math-textbook components specialize it where more structure is needed.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>2. The project</Line>
            <Line>2.1 Each piece of content has a project: the work whose deliverable the front presents.</Line>
            <Line>2.2 The specification is part of the project — an expression of a statement of work, identifying the project's deliverable; in the math textbook, the mathematical object to formalize that the chapter teaches.</Line>
            <Line>2.3 The progress is part of the project — a narrative of how the project has been going, its entries associated with an author; the justifications associate with the progress, since the progress is to be justified.</Line>
            <Line>2.4 A plan may be expressed there, teammates assigned — all to the author by default, read from the cover if unspecified.</Line>
            <Line>2.5 A discussion may stand there — the talk behind the page.</Line>
            <Line>2.6 The parts beyond the specification are optional — nothing is mandatory; the project makes sense with what it has, and today it holds exactly its two documents.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>3. The authors</Line>
            <Line>3.1 Every part has an author, so the team is embedded in the content.</Line>
            <Line>3.2 The author of the book is the default author of every part, read from the cover.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>4. The open determinations</Line>
            <Line>4.1 The name: Content collides with the base library's word for a Word's content.</Line>
            <Line>4.2 Answered 16 November: the toggle is one unlabelled control to the right of the title, explored; the visual language telling the project representation from the deliverable — formal against familiar — carries the rest.</Line>
            <Line>4.3 Answered 16 November: the purpose, the project and the progress are not sides or states; the project is the back, and the specification and the progress are its parts.</Line>
            <Line>4.4 Where it lives: played with at the library layer here, likely moved all the way up to the base library.</Line>
            <Line>4.5 Answered 16 November: the first play's four-mode bar made project and content states, and they are not states; the model above replaces it and the bar is withdrawn.</Line>
            <Line>4.6 The discussion rests, 16 November: we don't need it now, and nothing is mandatory.</Line>
            <Line>4.7 How a reference crosses sides; the justifications associate with the progress — does the progress have to be justified? — and the exact tie stands open.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>5. The components</Line>
            <Line>5.1 Components divide in two families: those that express things about the project — the subject of the project — and those that present the deliverable of the project, the object.</Line>
            <Line>5.2 In the math textbook the deliverable's components are the familiar ones, the theorem and the proof with the interpolated part among them; the project's are the formal ones, the statement of work's form first.</Line>
        </Paragraph>
        <Paragraph>
            The first case already stands: <Means>$[[ The Symmetry of Arithmetic ]]( Arithmetic Textbook / The Symmetry of Arithmetic )</Means>,
            whose front teaches the formalism with X in its place — the unfound parts interpolated — and whose
            back is the project: the statement of work in seven parts, the progress in the open
            determinations O1 to O11, the plan standing with the author, the discussion open. The model is
            read off that statement.
        </Paragraph>
        <Paragraph>
            The components stand beside this chapter as its code, rebuilt 16 November from my answers. The
            general ones: Content, the one unlabelled toggle at the title's right — a format said of its
            chapter, its note drawing the control in place and its style wrapping the chapter, so what is
            checked rules what shows, everything that is not the project being the deliverable — its
            canonical side a field a use overrides; and Project, the back's section, carrying the formal
            dress.
            The deliverable's family: Theorem, counted within the chapter; Proof, labelled; and Interpolated,
            the word that stands for a thing until the thing is found. The sides of the first play —
            Identification, Specification, Progress — are withdrawn with the four-mode bar.
        </Paragraph>
        <Code
            identifier="code"
            type=".tsx"
        />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
