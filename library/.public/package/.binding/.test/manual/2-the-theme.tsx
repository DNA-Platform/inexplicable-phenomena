import { Append, Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Theme ]]</Title>
        <Section>
            <Heading>What the theme is</Heading>
            <Paragraph>
                The one thing every book here shares, in two classes. The first, under the framework's Theme, sets
                the values a theme has and nothing else, so that a book may take the library's values without its
                look, as the manual does for its explorer. The second, under the first, is the library's look: in
                a field of its own it extends the default sheet rather than replacing it, since the default comprehends
                every mark the framework puts on an element and this one adds the library's look on top of those
                same marks: the cover a card whose head is the byline, a label above every
                chapter's title saying what the chapter is, chapters of the canonical type counted and ruled, the
                synopsis a ruled block, the table of contents boxed and its catalogue ruled, a figure set off. Every
                rule names a mark on the writing's own element and never the box a format draws around it, since a
                format in front may stand any number of boxes between, and a chapter a face has framed is left to
                its frame. Every rule reads the theme's values, so a book that overrides them keeps the look in
                another ink, which is what <Means>$[[ Libby ]]</Means> does to go dark.
            </Paragraph>
            <Paragraph>
                The file opens with a small helper every style in this library uses to read a value: the property
                named on the theme the format stands inside. A book always has a theme, so the fallback the helper
                still carries is never reached; what it reads is the theme's variable, since the framework declares
                its eight values as custom properties once and hands every style a reference, so a value changed on
                the theme moves one declaration and regenerates no class beneath it. A style is compiled once per
                class, so it must read the theme through the provider's props and never through a closure over the
                instance; the helper is where that rule lives once. The file is printed whole in the chapter's
                appendix, <Means>$[[ ./The theme's file ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The theme's file ]]]</Heading>
            <Paragraph><Code identifier="code" numbered /></Paragraph>
        </Section>
        <Catchword />
        <Append identifier="code" type=".tsx">![[ code.tsx ]]</Append>
    </Chapter>
);
