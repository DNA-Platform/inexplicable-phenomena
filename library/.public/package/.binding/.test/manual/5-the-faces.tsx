import { Append, Chapter, Code, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Part>The tools</Part>
        <Title>[[ The Faces ]]</Title>
        <Section>
            <Heading>Seven faces</Heading>
            <Paragraph>
                Seven formats, each a shell of a class with a styled component for its style. Four of them are the
                framework's own faces made this library's by subclass: the Cover, a card whose head is the byline
                with a label above its title; the Synopsis, a ruled block set in italic; the TableOfContents, a box
                with its headings in the labels' voice; and the Table, which keeps the framework's grid and adds its
                gaps, its rules between rows and its header row. Each is exported from the manual's door under the
                framework's own name, so a chapter that writes a Cover or a Table writes the word it always wrote
                and gets this library's — the framework gives a face its element and the meaning of its marks, a
                header, a nav, a grid, and nothing of how it looks, which is the library's to say. Three more are
                looks of this library's own. Framed draws a frame from the theme's values and works wherever it is
                put, on each of <Means>$[[ A Persona ]]</Means>'s chapters at its bind; it marks what it frames, so the
                card and the rule stand down where a frame already stands. Literary is the persona's face, a bookish
                one, Palatino, paragraphs indented and set close, titles centred and unweighted, the poem's lines let
                breathe. Typewritten is the paper's, a manuscript's. None of them touches the structure of a chapter;
                a feel is a format, and that is all a feel is allowed to be. The seven are printed whole in the
                chapter's appendix, <Means>$[[ ./The faces' file ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The faces' file ]]]</Heading>
            <Paragraph>
                <Code
                    identifier="code"
                    numbered
                />
            </Paragraph>
        </Section>
        <Catchword />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
