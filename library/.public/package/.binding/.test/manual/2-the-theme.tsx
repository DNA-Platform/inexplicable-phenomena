import { Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Theme ]]</Title>
        <Section>
            <Heading>What the theme is</Heading>
            <Paragraph>
                The one thing every book here shares. It is a class under the framework's Theme; it sets the eight
                values a theme has, and in its define it extends the default sheet rather than replacing it, since
                the default comprehends every mark the framework puts on an element and mine adds the library's
                look on top of those same marks: the cover a card whose head is the byline, a label above every
                chapter's title saying what the chapter is, ordinary chapters counted and ruled, the synopsis a ruled
                block, the table of contents boxed and its catalogue ruled, a figure set off. Every rule reads the
                theme's values, so a book that overrides them keeps the look in another ink, which is
                what <Means>$[[ Libby ]]</Means> does to go dark.
            </Paragraph>
            <Paragraph>
                The file opens with a small helper every style in this library uses to read a value: the property
                named on the theme the format stands inside, or a fallback where no theme stands. A style is compiled
                once per class, so it must read the theme through the provider's props and never through a closure
                over the instance; the helper is where that rule lives once.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The theme's file</Heading>
            <Paragraph><Code>![[ code.tsx ]]</Code></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
