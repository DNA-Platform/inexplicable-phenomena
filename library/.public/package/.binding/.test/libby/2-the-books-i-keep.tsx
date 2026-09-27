import { Chapter, Emphasis, Heading, Means, Paragraph, Section, Title, Word } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

// LIBBY ON THE BOOKS SHE KEEPS: her story goes on through the library's books, each named where it stands,
// and what each shows of .public — a mention for every hop, to the book, to a chapter, to a heading in it.
// Doug, 2026-09-27: "As she writes her story, she can mention her work on the different books and the things
// in .public that they represent, and those links can be hops to the right sections in those books, to test
// out the mention system." Three headings here are mentions too, and the books they are about send a reader
// back to them; the compiler refuses a mention nobody refers to, since a library is compact.
export default () => (
    <Chapter>
        <Title>[[ The Books I Keep ]]</Title>
        <Section>
            <Heading>[[[ The library's own book ]]]</Heading>
            <Paragraph>
                The first thing I wrote was the library's own account of itself, <Means>$[ The Library ]</Means>, filed
                under what it is about. Its <Means>$[ shelves ]( The Library / What stands here )</Means> name the books
                that stand directly under it, and its table of contents is a <Word><Emphasis />Table</Word>: a
                catalogue with a row for every book and a link to that book's own synopsis, so the library never
                describes a book in words the book did not write.
            </Paragraph>
        </Section>
        <Section>
            <Heading>A book of pages</Heading>
            <Paragraph>
                <Means>$[ Some Projects ]</Means> is the one book I keep as pages. It stands <Word><Emphasis />Paginated</Word>,
                so one chapter shows at a time and the catchword turns the page in
                place; its <Means>$[ one chapter ]( Some Projects / The Work )</Means> names nothing, which is a thing a chapter is
                allowed to do. Its table of contents is not written but drawn, from what its chapters mention.
            </Paragraph>
        </Section>
        <Section>
            <Heading>[[[ A paper I did not write ]]]</Heading>
            <Paragraph>
                <Means>$[ A Paper ]</Means> is by the persona, and it is where the references live: it opens
                with <Means>$[ what is claimed ]( A Paper / What is claimed )</Means> and rests
                on <Means>$[ what was found ]( A Paper / What was found )</Means>, a heading that is referred to and refers
                to nothing. It is also where the basics stand — emphasis, bold, underline, a space that is counted and a
                break that is written — and it is typewritten, because a manuscript should look like one.
            </Paragraph>
        </Section>
        <Section>
            <Heading>[[[ A voice I lent out ]]]</Heading>
            <Paragraph>
                <Means>$[ A Persona ]</Means> is a biography, filed under me, and it may write because I catalogue it:
                that is the whole of <Means>$[ delegation ]( A Persona / Delegation )</Means>. Its one poem stands in
                Lines, each a sentence that is Block, so no break is written between them.
            </Paragraph>
        </Section>
        <Section>
            <Heading>This book</Heading>
            <Paragraph>
                My own is dark, because one book of a library should show its theme overwritten, and the theme is the
                one thing every book here shares: its values are read by every format in front of it, so the card, the
                labels and the rules you see are the same rules in another ink. What I say of myself is
                in <Means>$[ ./Who I Am ]</Means>; what is filed under me is in <Means>$[ ./Table of Contents ]</Means>.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
