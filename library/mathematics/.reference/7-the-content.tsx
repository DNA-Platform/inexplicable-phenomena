import { Append, Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Forms</Part>
        <Title>[[ The Content ]]</Title>
        <Paragraph>
            My idea, 15 November 2026: a sort of thing that holds content, with a front and a back — on
            the back the specification, on the front the identification — like the two sides of a wikipedia
            page, toggled back and forth. It is not a type of chapter. The name, Content, is my maybe and
            stands until I settle it: the base library already exports a word Content, a Word's content, so
            the name is to be decided when the thing moves up — and it likely moves all the way up to the
            base library, played with here first. My frame of 16 November: the design is of the abstraction
            that applies to anything written in any book — a way of specifying anything a book holds — tested
            on the math textbook, with components for math textbooks specializing it where more structure is
            needed, and appendix chapters open to the textbook itself. The specification it shows on its back
            takes the form of <Means>$[[ ./The Specification ]]</Means>.
        </Paragraph>
        <Paragraph>
            The object model, said back to me from my words of 15 November 2026, amendable in place as I
            correct it.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>1. The content</Line>
            <Line>1.1 A piece of content is one thing with a front and a back: the identification on the front, the specification on the back.</Line>
            <Line>1.2 It is not a type of chapter; it is a thing that holds content, and a chapter or a book carries one.</Line>
            <Line>1.3 It shows one side at a time and toggles back and forth between them.</Line>
            <Line>1.4 It opens in the object mode, the front; which side is canonical is overridable; and a book says in one word that it defaults to showing one.</Line>
            <Line>1.5 It is a way of specifying anything written in any book; the math textbook is its test, and math-textbook components specialize it where more structure is needed.</Line>
            <Line>1.6 The back shows the specification alone, the progress alone, or the two one on top of the other.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>2. The parts</Line>
            <Line>2.1 The identification, the front: the thing itself, as far as it is identified; where it is not yet identified, its placeholder stands — the interpolation.</Line>
            <Line>2.2 The specification, the back: what the thing must be, in the specification's form — a title with a numbered list of lists, items cited by number.</Line>
            <Line>2.3 The purpose: why the thing is specified, standing with the specification.</Line>
            <Line>2.4 The project: each piece of content has one — the work that moves from the specification toward the identification.</Line>
            <Line>2.5 The progress: the project has progress, the record of its determinations, open and closed; its form a narrative of independent things, which may refer to each other.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>3. The authors</Line>
            <Line>3.1 Every part has an author, so the team is embedded in the content.</Line>
            <Line>3.2 The author of the book is the default author of every part.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>4. The open determinations</Line>
            <Line>4.1 The name: Content collides with the base library's word for a Word's content.</Line>
            <Line>4.2 The toggle's mechanics: a turn of the book to the other side, or a flip in place; played for now as a flip in place — labels over hidden inputs, the chapter ruled by what is checked, no script — the ruling still mine.</Line>
            <Line>4.3 Whether the purpose, the project and the progress are sides of their own or parts standing with a side.</Line>
            <Line>4.4 Where it lives: played with at the library layer here, likely moved all the way up to the base library.</Line>
            <Line>4.5 What a piece of content is and what its project is: the first play made them states of a four-mode bar, and they are not states — a project and a content are things, seen in the two sides of the chapter the content is in; the model stands to be respecified as I answer the team's questions, 16 November.</Line>
        </Paragraph>
        <Paragraph>
            The first case already stands: <Means>$[[ The Symmetry of Arithmetic ]]( Arithmetic Textbook / The Symmetry of Arithmetic )</Means>,
            whose back is a statement of work — a purpose, a specification in seven parts, a project in the
            search for X, a progress in the open determinations O1 to O11, and an author — and whose front,
            the identification of X, is a teaching sketch whose unfound parts stand interpolated. The model
            is read off that statement.
        </Paragraph>
        <Paragraph>
            The components stand beside this chapter as its code, the play of 16 November. The general ones:
            Content, the bar of modes — a format said of its chapter, its note drawing the bar in place and
            its style wrapping the chapter, so the checked mode rules the sides — its canonical side a field
            a use overrides; Identification,
            Specification and Progress, the sides, each a section of the chapter bearing its name; and
            Interpolated, the word that stands for a thing until the thing is found. The math textbook's
            specializations: Theorem, counted within the chapter, and Proof, labelled. The first chapter of
            the Textbook of Arithmetic writes with all of them.
        </Paragraph>
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
