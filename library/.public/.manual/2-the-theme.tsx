import { Append, Chapter, Heading, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Theme ]]</Title>
        <Section>
            <Heading>The values and the parts</Heading>
            <Paragraph>
                A theme is a set of values, the font, the measure, the ink, the paper, the link, and the parts that
                use them: the page, the levels of a book, the labels, the links, the apparatus and the figures. The
                file beside this chapter is the one the book registers. It is the test library's theme as borrowed,
                a serif on warm paper, and it stands only until the sketches say what this library's own looks like.
            </Paragraph>
        </Section>
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
