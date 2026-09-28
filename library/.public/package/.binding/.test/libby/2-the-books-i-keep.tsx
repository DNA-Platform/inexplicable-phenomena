import { Chapter, Emphasis, Heading, Means, Paragraph, Section, Title, Word } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <Title>[[ The Books I Keep ]]</Title>
        <Section>
            <Heading>[[[ The library's own book ]]]</Heading>
            <Paragraph>
                The first thing I wrote was the library's own account of itself, <Means>$[[ The Library ]]</Means>, filed
                under what it is about. Its <Means>$[[ shelves ]]( The Library / What stands here )</Means> name the books
                that stand directly under it, and its table of contents is a <Word><Emphasis />Table</Word>: a
                catalogue with a row for every book and a link to that book's own synopsis, so the library never
                describes a book in words the book did not write; a row of that shape is what the compiler requires
                of a catalogue. Its chapter <Means>$[[ Of Libby ]]( The Library / Of Libby )</Means> is my own synopsis,
                imported: a catalogue's chapter is a synopsis of another book, and the catalogue may print it or import
                it. The Synopsis keeps my chapter off that page, gives the library's chapter its parts under its own
                title, and sends that title to this book, as a synopsis's title goes to the book it is a synopsis of.
            </Paragraph>
            <Paragraph>
                My story goes on through the books, each named where it stands, and what each shows of the framework;
                every hop here is a mention, to a book, to a chapter, or to a heading in it. Three headings of this
                chapter are mentions too, and the books they are about send a reader back to them. The compiler
                refuses a mention nobody refers to, since a library is compact, so every one of these is spent.
            </Paragraph>
        </Section>
        <Section>
            <Heading>A book of pages</Heading>
            <Paragraph>
                <Means>$[[ Some Projects ]]</Means> is the one book I keep as pages. It stands <Word><Emphasis />Paginated</Word>,
                so one chapter shows at a time and the catchword turns the page in
                place; its <Means>$[[ one chapter ]]( Some Projects / The Work )</Means> names nothing, which is a thing a chapter is
                allowed to do. So its route shows the cover and the work's route shows the work, one page at a time,
                stood in the book's own class as the theme is. Its table of contents is not written but drawn, from
                what its chapters mention: a section beside the table, in a file accompanying it, writes an entry for
                each mention the book's table answers, the first three parenthetical, since every book's first three
                chapters are its cover, its synopsis and its table. A chapter added to the book is listed at the next
                draw, with no edit to the table. The other four books hand-write theirs.
            </Paragraph>
        </Section>
        <Section>
            <Heading>[[[ A paper I did not write ]]]</Heading>
            <Paragraph>
                <Means>$[[ A Paper ]]</Means> is by the persona, and it is where the references live: it opens
                with <Means>$[[ what is claimed ]]( A Paper / What is claimed )</Means> and rests
                on <Means>$[[ what was found ]]( A Paper / What was found )</Means>, a heading that is referred to and refers
                to nothing. It is also where the basics stand — emphasis, bold, underline, a space that is counted and a
                break that is written — and it is typewritten, because a manuscript should look like one.
            </Paragraph>
        </Section>
        <Section>
            <Heading>[[[ A voice I lent out ]]]</Heading>
            <Paragraph>
                <Means>$[[ A Persona ]]</Means> is a biography, filed under me, and it may write because I catalogue it:
                that is the whole of <Means>$[[ delegation ]]( A Persona / Delegation )</Means>. Its one poem stands in
                Lines, each a sentence that is Block, so no break is written between them.
            </Paragraph>
        </Section>
        <Section>
            <Heading>This book</Heading>
            <Paragraph>
                My own is dark, because one book of a library should show its theme overwritten, and the theme is the
                one thing every book here shares: its values are read by every format in front of it, so the card, the
                labels and the rules you see are the same rules in another ink. My theme stands in front of the
                library's, and a theme is singular, so the one in front takes the one behind out of expression. What I say of myself is
                in <Means>$[[ ./Who I Am ]]</Means>; what is filed under me is in <Means>$[[ ./Table of Contents ]]</Means>.
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
