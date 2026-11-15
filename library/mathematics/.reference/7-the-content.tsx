import { Chapter, Line, List, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Forms</Part>
        <Title>[[ The Content ]]</Title>
        <Paragraph>
            Doug's idea, 15 November 2026: a sort of thing that holds content, with a front and a back — on
            the back the specification, on the front the identification — like the two sides of a wikipedia
            page, toggled back and forth. It is not a type of chapter. The name is his maybe, Content, and
            stands until he names it: the base library already exports a word Content, a Word's content, so
            the name is to be decided when the thing moves up — and it likely moves all the way up to the
            base library, played with here first. The specification it shows on its back takes the form
            of <Means>$[[ ./The Specification ]]</Means>.
        </Paragraph>
        <Paragraph>
            The object model he described, said back from his words of 15 November 2026, amendable in place.
        </Paragraph>
        <Paragraph>
            <List />
            <Line>1. The content</Line>
            <Line>1.1 A piece of content is one thing with a front and a back: the identification on the front, the specification on the back.</Line>
            <Line>1.2 It is not a type of chapter; it is a thing that holds content, and a chapter or a book carries one.</Line>
            <Line>1.3 It shows one side at a time and toggles back and forth between them.</Line>
            <Line>1.4 It opens in the object mode, the front; which side is canonical is overridable; and a book says in one word that it defaults to showing one.</Line>
        </Paragraph>
        <Paragraph>
            <List />
            <Line>2. The parts</Line>
            <Line>2.1 The identification, the front: the thing itself, as far as it is identified; where it is not yet identified, its placeholder stands — the interpolation.</Line>
            <Line>2.2 The specification, the back: what the thing must be, in the specification's form — a title with a numbered list of lists, items cited by number.</Line>
            <Line>2.3 The purpose: why the thing is specified, standing with the specification.</Line>
            <Line>2.4 The project: each piece of content has one — the work that moves from the specification toward the identification.</Line>
            <Line>2.5 The progress: the project has progress, the record of its determinations, open and closed.</Line>
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
            <Line>4.2 The toggle's mechanics: a turn of the book to the other side, or a flip in place.</Line>
            <Line>4.3 Whether the purpose, the project and the progress are sides of their own or parts standing with a side.</Line>
            <Line>4.4 Where it lives: played with at the library layer here, likely moved all the way up to the base library.</Line>
        </Paragraph>
        <Paragraph>
            The first case already stands: <Means>$[[ The Symmetry of Arithmetic ]]( Arithmetic Textbook / The Symmetry of Arithmetic )</Means>,
            whose back is a statement of work — a purpose, a specification in seven parts, a project in the
            search for X, a progress in the open determinations O1 to O11, and an author — and whose front,
            the identification of X, is its own placeholder. The model is read off that statement.
        </Paragraph>
    </Chapter>
);
