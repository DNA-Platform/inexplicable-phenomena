import { Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Theme ]]</Title>
        <Section>
            <Heading>What the theme is</Heading>
            <Paragraph>
                The one thing every book here shares. It sets the eight values a theme has and extends the default
                sheet with the library's look on the framework's own marks: the cover a card, a label above every
                title, the synopsis ruled, the table boxed, a figure set off. A book that overrides a value keeps the
                look in another ink, which is what <Means>$[ Libby ]</Means> does to go dark.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The theme's file</Heading>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
