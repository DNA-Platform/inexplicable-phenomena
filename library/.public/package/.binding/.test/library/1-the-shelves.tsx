import { Chapter, Heading, Line, List, Means, Mention, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Title>[[ The Shelves ]]</Title>
        <Section>
            <Heading>[[[ What stands here ]]]</Heading>
            <Paragraph>Three books stand directly under this one, and this shelf is a list of Lines:</Paragraph>
            <Paragraph>
                <List />
                <Line><Means>$[[ Libby ]]</Means> is the book that writes the others.</Line>
                <Line><Means>$[[ Some Projects ]]</Means> is what has been worked on.</Line>
                <Line><Means>$[[ A Paper ]]</Means> was written by a persona Libby vouched for.</Line>
            </Paragraph>
            <Paragraph>
                The persona itself, <Means>$[[ A Persona ]]</Means>, stands under Libby rather than here, which is the
                shape a library takes when one voice writes as two.
            </Paragraph>
            <Paragraph>
                <Mention>[[[ The First Shelf ]]]</Mention> is the one Libby stands on, and a reference reaches it by name.
            </Paragraph>
            <Paragraph>
                Libby says as much of herself: she stands on <Means>$[[ ./The First Shelf ]]</Means>, and this book is
                the first she wrote, <Means>$[[ the library's own ]]( Libby / The library's own book )</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Heading>How this library stands</Heading>
            <Paragraph>
                This is the top of the library, the catalogue every book is filed under, itself filed under what it is
                about, Libraries, which is its own name said as a subject. Its table of contents refers to every
                chapter of this book, itself among them, and has a row for every book that stands here, which are
                the two things the compiler requires of a catalogue's table. Each row gives the book's name and what
                it is, the second linking to the book's own synopsis. It is written by the librarian.
            </Paragraph>
            <Paragraph>
                Every tool this library is built with stands beside the chapter
                of <Means>$[[ The Library Reference Manual ]]</Means> that documents it, and is used from there: the
                library's own book class is the manual's first chapter's file, and this book's file does nothing but
                take it from the manual's door.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
