import { Append, Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Faces ]]</Title>
        <Section>
            <Heading>Four faces</Heading>
            <Paragraph>
                Four formats, each a look a book or a chapter may take in front of the theme. Navigable dresses the
                library's own furniture for finding one's way, the running head a masthead, the byline two labelled
                rows, the catchword a footer line, each by the mark its kind wears; the theme dresses the framework's
                marks and this dresses the library's own, and every book wears it. Framed draws a frame from the
                theme's own values and works wherever it is put: <Means>$[[ Some Projects ]]</Means> stands it on itself
                in its define, <Means>$[[ A Persona ]]</Means> on each of its chapters at its bind, a format working in
                different places. Literary is the persona's face, a bookish one, Palatino, paragraphs indented and
                set close, titles centred and unweighted, the poem's lines let breathe. Typewritten is the paper's, a
                manuscript's. None of them touches the structure of a chapter; a feel is a format, and that is all a
                feel is allowed to be.
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>The faces' file</Heading>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
        <Append identifier="code" type=".tsx">![[ code.tsx ]]</Append>
    </Chapter>
);
