import { Append, Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Listing } from './7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Reference Manual ]]</Title>
        <Section>
            <Heading>1. What a reference manual is</Heading>
            <Paragraph>
                <List />
                <Line>1.1 Every subject carries a reference manual: the specification of that subject in this library. This book is the library's own. I ruled this on 12 November 2026, at the opening of the textbook's sprint.</Line>
                <Line>1.2 A subject's manual keeps a part for the books of its subject, one chapter per book, and that chapter tracks the book's idioms — the conventions its chapters follow.</Line>
                <Line>1.3 Where an idiom is enforced by code, the code stands with the chapter that states it, the way this book's theme and faces stand beside theirs; an idiom followed by hand is stated in the same place and marked so.</Line>
                <Line>1.4 A manual is written the way a specification is — numbered parts, referenced code — in the form of <Means>$[[ ./The Specification ]]</Means>; I asked for this on 16 November 2026, this chapter was the first so written, and since 19 November 2026 every chapter of this book is.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The three shelves</Heading>
            <Paragraph>
                <List />
                <Line>2.1 What is true of every book in the library lives here, in Our Reference.</Line>
                <Line>2.2 What is true of a subject's books lives in that subject's manual. The first is <Means>$[[ Referential Objectivity ]]( Mathematical Reference )</Means>, whose part The Books tracks the notebook, the textbook, the project, the library and the design.</Line>
                <Line>2.3 What is true of one book alone stays beside that book, never in a manual.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3. The listing</Heading>
            <Paragraph>
                <List />
                <Line>3.1 A listing looks identical to a listing in my own library's manual, on my word of 17 November 2026, "the code should probably look identical to what's in mine, but the container for the specification might not": JetBrains Mono at 12px on a 20.4px line, the ink pale on a night of deep teal, keywords sky, strings amber, names mint, comments dimmed, the numbers in a column of brass, the light palette behind the bar's light, wrap under its wrap, the numbers away under its lines. The numbers stand in <Means>$[[ ./The Theme ]]</Means>, section 2.</Line>
                <Line>3.2 The listing is the package's Code figure dressed: the highlighter's spans coloured, the lines numbered by the figure, nothing drawn that the figure does not already draw. It stands in a paragraph of its own, written in the chapter where the code figure stood, which shows the chapter's files as tabs on its bar, or the one file it names.</Line>
                <Line>3.3 The face is JetBrains Mono, taken from Google Fonts as my page takes it; the Content's source pane stays Consolas, so two monospaces live in the library, the listing's and the specification's.</Line>
                <Line>3.4 Code can be written anywhere it is needed, on my word of the same day: a listing stands in any chapter of any book, a manual's or not, and the dress and the modes follow the file beside the chapter, never the book's kind.</Line>
                <Line>3.5 An appended HTML has two faces: the listing of its source, as every file has, and the page itself run in a frame under the bar's run, which in the editor mode is the full screen. <Means>$[[ ./The Specification ]]</Means>'s tree is the manual's own case, section 9 there; the sketches of The Design are the others.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>4. The modes</Heading>
            <Paragraph>
                <List />
                <Line>4.1 The reference manual has two modes, as the code has, on my words of 17 November 2026, "a full screen versus page mode for the reference manual like you do for the code", "So it can be book like and editor like": the page, book-like, the chapter at the measure with the listing as a plate in it; and the editor, full screen and editor-like, which still feels bookish and paperly.</Line>
                <Line>4.2 A mode is an annotation said of the book, one at a time; the options, light, wrap, lines and the words put away, are annotations beside it. A word on the bar sets the book's edit, the book wears the mode's class, and the sheet decides what shows, so a flip costs one paint and draws nothing twice.</Line>
                <Line>4.3 The bar stands as drawn: the file tabs, run for a page, light, wrap and lines, then words, the page and the editor, the one in force pressed; its word the page returns the chapter to the book-like mode.</Line>
                <Line>4.4 A reference manual opens in the editor; every other book opens on the page, and an appendix's author chooses by the same line in their book's class, on my answer "Reference manuals should default to full but maybe appendix authors can choose?".</Line>
                <Line>4.5 The paper is unfinished: no shading, no rule but the running heads' hairlines; the white paper against the editor with its options is the contrast kept, on my words "Not bookish with shading. Paperish as in unfinished" and "The white paper and the vscode with UI options is absolutely breathtaking in contrast".</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>5. The tree and the file's page</Heading>
            <Paragraph>
                <List />
                <Line>5.1 In the editor the table of contents is the file tree, on my word "the editor view does use the table as the file tree": it stands open down the left in the page's own voice, every chapter a row, the open chapter's row marked by a hairline of the link's teal, and every file a chapter appends a leaf beneath its row with the file's mark. A branch is said of each entry of the table by the book at its bond; the written table catalogues chapters and nothing else, and the leaves are the view's.</Line>
                <Line>5.2 The chapter's words stand beside the tree at a narrower measure, and the file's page stands beside the words at the right under a head naming the file, the open chapter's listing beneath it the height of the window. The book draws the file's page after its chapters, so every book has one, shown only while editing.</Line>
                <Line>5.3 The bar's word words puts the words away, so the tree and the file stand alone, as my library's words tab does.</Line>
                <Line>5.4 A book is editing while the editor mode is on and the open chapter holds a listing; a chapter without a file reads as the page whatever the mode, so a book is never gridded around an empty right-hand page. A leaf pressed opens its chapter in the editor turned to that file; the book's editor holds the open file, so the plate, the file's page and the tree agree on it.</Line>
                <Line>5.5 At a phone's width the three stand in one column, the tree put away, the file's page beneath the words with its pane at seven tenths of the window.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>6. The appendix</Heading>
            <Paragraph>
                <List />
                <Line>6.1 An appendix is a special part of a book, written with the reference manual's components, that refers to the code specific to the book, the files beside its chapters, code, tools, documents, pictures, so an appendix catalogues what the book already holds and invents no second place for it; on my answer of 17 November 2026, "it uses reference manual components, and is like a special part of a book that can refer to code that is specific to the book".</Line>
                <Line>6.2 The appendix is another part of the table of contents, on my answer "By default yeah it can be another part of the table, since it's kind of different": a section of the table wearing Appendix, headed with the part's name, its rows the part's chapters, each of which says the part at its head.</Line>
                <Line>6.3 The theme sets that section at the table's foot in the smaller voice, and the branch hangs each row's files beneath it as presses; a press opens the chapter the file stands beside, turned to the file, in the editor. The components work for an appendix as they do in my personal library, where an appendix reads as its own reference manual inside the book it is in; <Means>$[[ The Design / The Sketch's Tools ]]</Means> is the first.</Line>
                <Line>6.4 A document opens as the Document figure shows it; code, a tool and a markdown file open as listings.</Line>
            </Paragraph>
        </Section>
        <Listing />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
