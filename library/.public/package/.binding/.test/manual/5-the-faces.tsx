import { Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Faces ]]</Title>
        <Section>
            <Heading>Four faces</Heading>
            <Paragraph>
                Four formats, each a look a book or a chapter may take in front of the theme. Navigable dresses the
                library's own furniture, the masthead, the byline and the catchword, and every book wears it. Framed
                draws a frame from the theme's values and works wherever it is put: <Means>$[ Some Projects ]</Means>
                stands it on itself, <Means>$[ A Persona ]</Means> on each of its chapters. Literary is the persona's
                face and Typewritten the paper's. None of them touches the structure of a chapter; a feel is a format,
                and that is all a feel is allowed to be.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The faces' file</Heading>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
