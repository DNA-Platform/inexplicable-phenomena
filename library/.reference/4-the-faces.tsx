import { Append, Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Listing } from './7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Faces ]]</Title>
        <Section>
            <Heading>1. The four faces</Heading>
            <Paragraph>
                <List />
                <Line>1.1 A face is how a book's apparatus looks: the cover a book opens on, the synopsis beside it, the table of contents that answers for its chapters and, when the book is a subject, for the books whose subject it is, and the table drawn inside a chapter.</Line>
                <Line>1.2 Each is a word of the package dressed here, and every book of this library wears these four from the file beside this chapter, borrowed from the test library until a sketch replaced them.</Line>
                <Line>1.3 A tagline is one line of what the book is, said of a cover as its author and its subject are, written in the cover file and drawn on the front; the synopsis is the block, and has its own page, on my word of 12 November 2026.</Line>
                <Line>1.4 A subtitle is the second line of a chapter's title, said of the title as a tagline is said of a cover and drawn where it is written, on my word of 21 November 2026 opening the subject's blog. It is the tagline's shape one level down, and it had to be made: a title draws its name alone and discards whatever else stands inside it, a parenthetical inside a title hides the title rather than adding to it, and a tagline refuses to be said of anything but a cover. An annotation draws through its note and not through its write, which is why the tagline's own write is never called and the front reads its line by hand. Its face stands in the theme's levels beside the title's, <Means>$[[ ./The Theme ]]</Means> 1.1: the book's own size and not the title's, so the title stays the loudest thing on the page, the weight normal, the ink mixed toward the slate, and italic. The name is a proxy, and the component is likely the package's beside its title rather than this manual's — a change to the package is mine to approve.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The front</Heading>
            <Paragraph>
                <List />
                <Line>2.1 Since 10 November 2026 the cover is drawn as a book: the front, in the file beside this chapter, a board of a book's shape standing alone on the page while the cover is the open page, as tall as the screen allows since 17 November 2026, its type growing with it.</Line>
                <Line>2.2 On the board stand the title, the author, the tagline and the imprint, read from what the cover already says, as the byline is; the synopsis's first paragraph stood in the tagline's place until 12 November 2026, when I struck it, "an extensive block is a synopsis", the synopsis being its own page, reached from the table.</Line>
                <Line>2.3 Its words are its links, the title opening the table of contents, the author and the subject their books, the library's name the library; the running head, the byline and the cover's own title stand unseen behind it until another page opens. The theme draws it and gives a page that opens its one transition, a short fade. Sketch 004 of <Means>$[[ Mathematical Design / The Paper's Page ]]</Means>, form a, by my number.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3. The navigation</Heading>
            <Paragraph>
                <List />
                <Line>3.1 Every chapter but the cover carries one line of apparatus above and below, in the running head's register: the previous chapter's arrow looking back, the square to the table, the next chapter's arrow looking on, three outline characters typed tight at text size, on my words of 16 November 2026; an edge with no neighbour keeps its place and is greyed, never hidden. The table of contents stood excluded with the cover until 19 November 2026, when it took the line too — its back arrow naming the cover itself past the hidden synopsis, and its own square a dead self the theme keeps grey and unpressable, <Means>$[[ ./The Book ]]</Means> 1.4.</Line>
                <Line>3.2 The line is a format said of the chapter by the book, <Means>$[[ ./The Book ]]</Means> 1.4, whose layer wraps the chapter's element with the two lines; the words are made at the bond, since a word made at render stood on the page as plain text.</Line>
            </Paragraph>
        </Section>
        <Listing />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
