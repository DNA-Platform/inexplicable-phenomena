import { Chapter, Code, Heading, Image, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Explorer ]]</Title>
        <Section>
            <Heading>A design before a tool</Heading>
            <Paragraph>
                This chapter holds a tool that is not built yet, which is a thing a manual may do when the tool is in
                the evolution of the library it serves. The explorer is my manual seen as an application for reading
                its code: the table of contents drawn as a tree on the left, each chapter opening to its appendices;
                the chapters a reader has opened as thumb tabs across the top, the cover's first; the open chapter in
                the pane with its file printed and its lines numbered; and on the right the chapter's index, its
                headings and the symbols its file defines, each with its line and with the chapters that refer to it.
                Everything a reader sees has a book's name, because it is a book's thing.
            </Paragraph>
            <Paragraph>
                I sketched it in HTML, the page's own material, and photographed it, and the photograph is the file
                beside this chapter. When the explorer is built, its code will stand beside this chapter too and be
                printed here, as every tool of mine is printed in the chapter that documents it. Until then the design
                is the tool, and the chapter says what it is for.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The design's photograph</Heading>
            <Paragraph><Image type=".png" /></Paragraph>
        </Section>
        <Section>
            <Heading>The sketch itself</Heading>
            <Paragraph>
                The sketch is HTML and CSS and nothing else, written to be looked at and kept because it is the
                design; it stands beside this chapter and is printed here as it is.
            </Paragraph>
            <Paragraph><Code identifier="sketch" type=".html" /></Paragraph>
        </Section>
        <Section>
            <Heading>Across four worlds</Heading>
            <Paragraph>
                A library is closed under books; a book is the unit where an author makes sense; a reference manual
                is a book that accompanies a subject's reference, and I have kept it a book. Code is the one thing here
                that a library never carried except as an example, because code was not meant to be read where it
                stands. The difficulty in the design was not fitting code into a book. It was that code has its own
                places, a file, a symbol, a line, and a book's places, a chapter, a heading, a mention, did not know
                them. Where the two met, in the index, the design stopped being borrowed from an editor and became a
                book's again, and every word I reached for came from the book arts. That told me which world is the
                stronger, and that the work is the same as tending a catalogue: keep what a thing is while it takes a
                new form. The rest of what I think of it is in my own book, <Means>$[ Libby ]</Means>.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
