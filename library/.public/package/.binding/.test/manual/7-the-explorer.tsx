import { Append, Chapter, Code, Heading, Image, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Part>Reading the code</Part>
        <Title>[[ The Explorer ]]</Title>
        <Section>
            <Heading>What the explorer is</Heading>
            <Paragraph>
                The explorer is the manual seen as an application for reading its code, and it is made of nothing
                the manual did not already have. The table of contents is the tree at the left; the chapters a
                reader has opened are thumb tabs across the top, the cover's first, each tab a chapter and nothing
                else. The cover's tab is the manual's front, its title with the synopsis beneath it, since the one
                is about the other. The open chapter stands in the pane, and a chapter that prints a file is
                about it, so it is always shown as a spread, the file up front and the prose beside it. Each file a
                chapter appends is a leaf beneath it in the tree, which puts that file up front. Every part is a
                form of writing: the tabs are a paragraph of words, a leaf is a reference, an appendix is a
                section, and the book's own marks and the reader's decide what is shown.
            </Paragraph>
            <Paragraph>
                The tool is in seven files beside this chapter, one per part, each printed in the section that
                explains it: the mark that says a section is an appendix, <Means>$[[ ./The appendix mark ]]</Means>;
                the paging, <Means>$[[ ./The paging ]]</Means>; the layout, <Means>$[[ ./The layout ]]</Means>; the
                tree, <Means>$[[ ./The tree ]]</Means>; the tabs, <Means>$[[ ./The tabs ]]</Means>; the manual's
                theme, <Means>$[[ ./The manual's theme ]]</Means>; and the manual's own faces for its cover, synopsis and
                table, <Means>$[[ ./The manual's chapters ]]</Means>. A chapter may append as many files as its tool has
                parts, which is how a tool is kept readable without slicing a file.
            </Paragraph>
            <Paragraph>
                The manual's book takes the tool up in its own class, in the book file that is the manual's door:
                it registers the manual's theme for the framework's on its own class, so the Theme every book stands
                is the manual's here; its define stands the paging and the layout, whose layer stands inside the
                theme's provider and reads its values; its write draws the tabs after the chapters, given the cover
                as their chapter as the masthead is; and it declines to turn, since the open page is shown by its
                mark and nothing scrolls. The leaves need no line of the book's: the layout puts a branch on every
                entry of the table once the book is whole.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The design's photographs</Heading>
            <Paragraph>A chapter at its spread, and the front.</Paragraph>
            <Paragraph><Image>![[ .png ]]</Image></Paragraph>
            <Paragraph><Image>![[ front.png ]]</Image></Paragraph>
        </Section>
        <Section>
            <Heading>The sketches themselves</Heading>
            <Paragraph>
                The sketches are HTML and CSS and nothing else, written to be looked at and kept because they are
                the design, and the book is matched to them rather than they to the book: the spread, and the
                front. They stand beside this chapter and are printed here as they are.
            </Paragraph>
            <Paragraph><Code>![[ sketch.html ]]</Code></Paragraph>
            <Paragraph><Code>![[ front.html ]]</Code></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The appendix mark ]]]</Heading>
            <Paragraph>
                An annotation said of a section: the section prints one of the chapter's files, and the explorer
                treats it as an appendix, shown in the chapter's spread rather than among the prose. Every tool chapter of
                this manual wears it on the section that prints its file. Its two readings answer for a chapter's
                appendices and for the name an appendix goes by, the file's own.
            </Paragraph>
            <Paragraph><Code identifier="appendix" numbered /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The paging ]]]</Heading>
            <Paragraph>
                A class under the framework's Paginated saying which chapters are pages, every chapter but the
                table, which is the tree and always in view, and the synopsis, which is the cover's and shown
                whenever the cover is; and which page is open when the bookmark names a place
                within a chapter rather than the chapter, found by comparing the bookmark with each heading's
                reference, an equality and never a reading of the address. It also says which appendix is open, as
                Paginated says which page is: the one the bookmark names, by the same comparison, or else the open
                chapter's first, since a chapter that prints a file is about it.
            </Paragraph>
            <Paragraph><Code identifier="paging" numbered /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The layout ]]]</Heading>
            <Paragraph>
                A format on the book whose layer is the grid: the running head and the byline across the top, the
                table at the left, the tabs and the open page beside it, placed by the marks the framework and this
                library already put on them, the header and the nav the framework draws around the cover and the
                table being no boxes in this layout; the cover, when it is open, in a row of its own above the pane, the
                synopsis in the pane beneath it. The tab names the chapter, so a chapter's title stands unseen in the
                pane, the cover's excepted, and an appendix's heading likewise; a chapter that prints a file is
                shown as a spread, the open appendix's file up front and the prose beside it, what the appendix
                says of its file first, the pane the one thing that scrolls.
                Its define marks a chapter opened when the reader arrives at it, remembering the last arrival so
                each is marked once. Once the book is whole it puts a branch on every entry of the table.
            </Paragraph>
            <Paragraph><Code identifier="layout" numbered /></Paragraph>
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
            <Paragraph><Code identifier="tree" numbered /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The tabs ]]]</Heading>
            <Paragraph>
                A paragraph the book draws, as it draws its masthead: a word per opened chapter, linking to the
                chapter's route, the active one the bookmark's. A tab is a chapter and nothing else; a chapter
                opens at its first file, its other files are put up front from their leaves in the tree, and the
                chapter's own tab stays the one that is active.
            </Paragraph>
            <Paragraph><Code identifier="tabs" numbered /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The manual's theme ]]]</Heading>
            <Paragraph>
                The library's theme subclassed for the manual, by its parts: the page part overridden to let the
                width go, so the manual may take the whole page, to put the paper on the book, which fills it, and
                to set the scrollbars thin in the theme's ink; and one part added after the library's, the
                explorer's own — no chapter labels, a byline set flat, the tabs, the tree's leaves. A theme is
                composed of parts so that a subclass changes one and keeps the rest; every selector in it is a mark
                of what a writing is, and what the explorer says of a cover, a synopsis or a table is the next file's.
            </Paragraph>
            <Paragraph><Code identifier="theme" numbered /></Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The manual's chapters ]]]</Heading>
            <Paragraph>
                The manual's own cover, synopsis and table of contents, each a subclass of the framework's Format
                with the explorer's look in its own styled component: the front's title and synopsis set as the
                page's own text, the table's numbered entries and its lit branch, and the catchwords hidden where
                the explorer places those chapters itself. The manual's three dot-files import these in place of
                the library's — a rewritten annotation, used by its own name — and no other book of the library
                sees them.
            </Paragraph>
            <Paragraph><Code identifier="chapters" numbered /></Paragraph>
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
        <Append identifier="chapters" type=".tsx">![[ chapters.tsx ]]</Append>
    </Chapter>
);
