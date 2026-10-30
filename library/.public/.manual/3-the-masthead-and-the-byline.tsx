import { Append, Chapter, Heading, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Masthead and the Byline ]]</Title>
        <Section>
            <Heading>What a cover exposes</Heading>
            <Paragraph>
                The running head names the library, the book and its table of contents, and the byline says who
                wrote the book and what it is filed under, both read from the cover and nowhere else. Neither is
                written in a chapter; the book draws them above its chapters from what the cover says. The file
                beside this chapter is both, borrowed from the test library and pointed at this library's name.
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
