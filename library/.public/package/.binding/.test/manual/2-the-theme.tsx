import { Append, Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

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
                named on the theme the format stands inside. A book always has a theme, so the fallback the helper
                still carries is never reached; what it reads is the theme's variable, since the framework declares
                its eight values as custom properties once and hands every style a reference, so a value changed on
                the theme moves one declaration and regenerates no class beneath it. A style is compiled once per
                class, so it must read the theme through the provider's props and never through a closure over the
                instance; the helper is where that rule lives once.
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>The theme's file</Heading>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
        <Append identifier="code" type=".tsx">![[ code.tsx ]]</Append>
    </Chapter>
);
