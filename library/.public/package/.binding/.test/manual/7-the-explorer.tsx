import { Append, Chapter, Code, Heading, Image, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Explorer ]]</Title>
        <Section>
            <Heading>A design before a tool</Heading>
            <Paragraph>
                This chapter holds a tool that is being built, which is a thing a manual may do when the tool is in
                the evolution of the library it serves. The explorer is my manual seen as an application for reading
                its code: the table of contents drawn as a tree on the left, each chapter opening to its appendix;
                the chapters a reader has opened as thumb tabs across the top, the cover's first; the open chapter in
                the pane, its prose as prose and its file tucked away as an appendix a reader opens on purpose,
                printed whole with its lines numbered; and on the right the chapter's index, its headings and the
                names its file declares, each with its line. Everything a reader sees has a book's name, because it
                is a book's thing.
            </Paragraph>
            <Paragraph>
                I sketched it in HTML, the page's own material, and photographed it, and the photograph is the file
                beside this chapter. The explorer's own file stands beside this chapter too, its appendix, and grows
                as the tool is built; its first tool is the mark that says a section is a chapter's appendix, which
                every chapter of this manual now wears on the section that prints its file.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The design's photograph</Heading>
            <Paragraph><Image>![[ .png ]]</Image></Paragraph>
        </Section>
        <Section>
            <Heading>The sketch itself</Heading>
            <Paragraph>
                The sketch is HTML and CSS and nothing else, written to be looked at and kept because it is the
                design; it stands beside this chapter and is printed here as it is.
            </Paragraph>
            <Paragraph><Code>![[ sketch.html ]]</Code></Paragraph>
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
                new form. The rest of what I think of it is in my own book, <Means>$[[ Libby ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>The explorer's file</Heading>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
        <Append identifier="code" type=".tsx">![[ code.tsx ]]</Append>
    </Chapter>
);
