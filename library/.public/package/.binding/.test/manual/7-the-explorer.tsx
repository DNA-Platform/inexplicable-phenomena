import { Append, Chapter, Code, Heading, Image, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Explorer ]]</Title>
        <Section>
            <Heading>What the explorer is</Heading>
            <Paragraph>
                The explorer is the manual seen as an application for reading its code, and it is made of nothing
                the manual did not already have. The table of contents is the tree at the left; the chapters a
                reader has opened are thumb tabs across the top, the cover's first; the open chapter stands in the
                pane, its prose as prose, and each file it appends is tucked away as an appendix a reader opens on
                purpose from the tree or the tabs, printed whole. Every part is a form of writing: the tabs are a
                paragraph of words, a leaf is a reference, an appendix is a section, and the book's own marks and
                the reader's decide what is shown.
            </Paragraph>
            <Paragraph>
                The tool is in six files beside this chapter, one per part, each printed in the section that
                explains it: the mark that says a section is an appendix, <Means>$[[ ./The appendix mark ]]</Means>;
                the paging, <Means>$[[ ./The paging ]]</Means>; the layout, <Means>$[[ ./The layout ]]</Means>; the
                tree, <Means>$[[ ./The tree ]]</Means>; the tabs, <Means>$[[ ./The tabs ]]</Means>; and the manual's
                theme, <Means>$[[ ./The manual's theme ]]</Means>. A chapter may append as many files as its tool has
                parts, which is how a tool is kept readable without slicing a file.
            </Paragraph>
            <Paragraph>
                The manual's book takes the tool up in its own class, in the book file that is the manual's door:
                its define stands the manual's theme first and then, in front of it, the paging and the layout, so
                the layout's layer stands inside the theme's provider and reads its values; its write draws the
                tabs after the chapters, lent the book as the masthead is; and it declines to turn, since the open
                page is shown by its mark and nothing scrolls. The leaves need no line of the book's: the layout
                puts a branch on every entry of the table once the book is whole.
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
            <Appendix />
            <Heading>[[[ The appendix mark ]]]</Heading>
            <Paragraph>
                An annotation said of a section: the section prints one of the chapter's files, and the explorer
                treats it as an appendix, a tab of its own rather than a part of the prose. Every tool chapter of
                this manual wears it on the section that prints its file. Its two readings answer for a chapter's
                appendices and for the name an appendix goes by, the file's own.
            </Paragraph>
            <Paragraph><Code identifier="appendix" /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The paging ]]]</Heading>
            <Paragraph>
                A class under the framework's Paginated saying which chapters are pages, every chapter but the
                table, which is the tree and always in view; and which page is open when the bookmark names a place
                within a chapter rather than the chapter, found by comparing the bookmark with each heading's
                reference, an equality and never a reading of the address. It also says which appendix is open,
                by the same comparison, as Paginated says which page is.
            </Paragraph>
            <Paragraph><Code identifier="paging" /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The layout ]]]</Heading>
            <Paragraph>
                A format on the book whose layer is the grid: the running head and the byline across the top, the
                table at the left, the tabs and the open page beside it, placed by the marks the framework and this
                library already put on them. Its define puts the reader's marks on the book: a chapter is opened
                when the reader arrives at it, and an appendix likewise, and the format remembers the last arrival
                so a tab closed stays closed. Once the book is whole it puts a branch on every entry of the table.
            </Paragraph>
            <Paragraph><Code identifier="layout" /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The tree ]]]</Heading>
            <Paragraph>
                A format on each entry of the table of contents, projecting the entry as a node of a tree: it
                finds the chapter the entry means, marks the entry when that chapter is open, and draws the
                chapter's appendices beneath it as leaves, each a link to the appendix's place. The written table
                catalogues chapters and nothing else; the leaves are the view's.
            </Paragraph>
            <Paragraph><Code identifier="tree" /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The tabs ]]]</Heading>
            <Paragraph>
                A paragraph the book draws, as it draws its masthead: a word per opened chapter, linking to the
                chapter's route, and beside it a word per opened appendix; the active one is the bookmark's. Each
                tab's close is a word wearing a format whose layer is the control, as a word wearing a reference is
                a link: it takes the reader's marks back and, when the tab was active, is a route to the neighbour.
            </Paragraph>
            <Paragraph><Code identifier="tabs" /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The manual's theme ]]]</Heading>
            <Paragraph>
                The library's theme with one value changed, the width, so the manual may take the whole page, and
                the look of the explorer's marks laid over it: the tabs, the tree's numbers and leaves, the label
                above a chapter's title without its number, since a counter cannot count a hidden page.
            </Paragraph>
            <Paragraph><Code identifier="theme" /></Paragraph>
        </Section>
        <Section>
            <Heading>Across four worlds</Heading>
            <Paragraph>
                A library is closed under books; a book is the unit where an author makes sense; a reference manual
                is a book that accompanies a subject's reference, and it has been kept a book. Code is the one thing
                here that a library never carried except as an example, because code was not meant to be read where
                it stands. The difficulty in the design was not fitting code into a book. It was that code has its
                own places, a file, a symbol, a line, and a book's places, a chapter, a heading, a mention, did not
                know them. Where the two met, the design stopped being borrowed from an editor and became a book's
                again, and every word reached for came from the book arts. That told which world is the stronger,
                and that the work is the same as tending a catalogue: keep what a thing is while it takes a new
                form. The librarian's own account of it is in her book, <Means>$[[ Libby ]]</Means>.
            </Paragraph>
        </Section>
        <Catchword />
        <Append identifier="appendix" type=".tsx">![[ appendix.tsx ]]</Append>
        <Append identifier="paging" type=".tsx">![[ paging.tsx ]]</Append>
        <Append identifier="layout" type=".tsx">![[ layout.tsx ]]</Append>
        <Append identifier="tree" type=".tsx">![[ tree.tsx ]]</Append>
        <Append identifier="tabs" type=".tsx">![[ tabs.tsx ]]</Append>
        <Append identifier="theme" type=".tsx">![[ theme.tsx ]]</Append>
    </Chapter>
);
