import { Append, Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Theme ]]</Title>
        <Section>
            <Heading>What the theme is</Heading>
            <Paragraph>
                The one thing every book here shares: a place for the library's properties, and the one styled
                component that dresses the framework's marks with them. The framework's Theme is bare, a place and
                nothing in it, so the properties are this library's own — the font, the size, the leading, the
                measure, the space, the ink, the paper and the link — declared as reactive fields and nothing else,
                the class typed once as the theme styled-components hands down, so that every style in the library
                reads them as the theme's and a book that overrides them keeps the look in another ink, which is what
                <Means>$[[ Libby ]]</Means> does to go dark. How they reach a style is the framework's own provision:
                the theme's layer answers for the theme, and the fields are templated into every rule beneath as
                themselves; a field written on the theme regenerates the rules that read it.
            </Paragraph>
            <Paragraph>
                The component is composed of parts, each a method returning a fragment of rules, so that a subclass
                changes one part and keeps the rest, as the manual does for its explorer: the page, which is the
                theme's own element; the levels, the margins and the titles and the chapters counted and labelled;
                the labels' one voice; the links, the anchors and the self-references the framework draws bare;
                the library's own apparatus, the running head, the byline and the catchword; and the figures, the
                code block and its line numbers from the data the framework leaves on each line, the highlighter's
                colours, the pictures, and an equation's number. Every rule names a mark on the writing's own
                element and never the box a format draws around it, since a format in front may stand any number
                of boxes between, and a chapter a face has framed is left to its frame. What a cover, a synopsis, a
                table of contents or a table looks like is not here: each is a face of its own, the next chapters.
                The file is printed whole in the chapter's appendix, <Means>$[[ ./The theme's file ]]</Means>.
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
