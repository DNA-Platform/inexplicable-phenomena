import { Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

// LIBBY ON THE BOOK, and the file beside this chapter is the book class every book of the library extends —
// the binder appended it, and the Code figure below prints it. Doug, 2026-09-28: "have Libby document how
// she uses those tools in the context of being the Librarian of a Library, and how she uses them
// specifically for her Library."
export default () => (
    <Chapter>
        <Title>[[ The Book ]]</Title>
        <Section>
            <Heading>What a book is here</Heading>
            <Paragraph>
                Every book in a library extends the library's own, so what a book is here is decided once. Mine draws
                the masthead and the byline before its chapters, stands the library's dress and its theme on itself
                as defaults, and opens a cover's route at the top of the page. A book of mine that wants more adds
                to this in its own class, as <Means>$[ Some Projects ]</Means> adds its pages.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The book's file</Heading>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
