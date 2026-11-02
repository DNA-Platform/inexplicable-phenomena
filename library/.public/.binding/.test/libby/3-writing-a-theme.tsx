import { Append, Chapter, Code, Emphasis, Heading, Means, Paragraph, Section, Title, Word } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Title>[[ Writing a Theme ]]</Title>
        <Section>
            <Heading>This book is dark, and that is the whole of a theme</Heading>
            <Paragraph>
                You are reading ivory on charcoal, and nothing else about this book differs from the library's: the
                same card on the cover, the same labels, the same catchword at every foot. That is what a theme is
                here — a place for properties, and nothing more. The library's theme, printed in the manual's chapter
                <Means>$[[ The Theme ]]( The Library Reference Manual / The Theme )</Means>, declares its properties as
                reactive fields, the font, the size, the leading, the measure, the space, the ink, the paper and the
                link, and one styled component composed of parts that dresses every mark with them. Mine is a class
                under it that sets three of those fields and inherits all of the rest, which is why the look holds
                in another ink: every rule reads the properties through the provider, so a subclass that changes a
                property changes every rule that reads it and rewrites none.
            </Paragraph>
            <Paragraph>
                The framework's own <Word>
                    <Emphasis />
                    Theme
                </Word> is bare — no property, no style — so a library
                writes its theme once, and a book that wants another writes a subclass. How the properties reach a
                rule is not this library's doing: the theme's layer answers for the theme, and the framework hands
                its fields, live, to every styled component beneath it, templated into each rule as the value itself.
                Write a field on a theme and the rules that read it follow.
            </Paragraph>
        </Section>
        <Section>
            <Heading>How it is put on this book</Heading>
            <Paragraph>
                Every book stands a Theme, and asks for it, so a theme is put on a book by registering it on the
                book's own class — one line in this book's door, beside the class: for my book, a Theme is the dark
                one. The library registers its theme on the library's book class the same way, and every book of the
                library inherits that registration; mine, registered nearer, answers first. Nothing in my chapters
                knows which theme they are drawn in, and a theme is switched the way any annotation is, by standing
                another in front. The class is printed whole in this chapter's appendix,
                <Means>$[[ ./The theme's file ]]</Means>; the one line that registers it is in the door.
            </Paragraph>
        </Section>
        <Section>
            <Heading>[[[ The theme's file ]]]</Heading>
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
