import { Append, Chapter, Heading, Image, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Paper's Page ]]</Title>
        <Section>
            <Heading>Sketch 001, four forms of a paper's page</Heading>
            <Paragraph>
                The first sketch of The Library of Mathematics asks what a paper's page should look like, a paper being
                a citable publication held in the library as a resource beside a chapter that Doug writes, the chapter
                carrying the citation and the paper read on the page. The page is snapshotted off the bound library's
                stub, its sheets inlined and its scripts stripped, the paper's row put in the table and the paper's
                chapter after it, and appended to this chapter with its forms on a switch; a form is a question, not a
                design. The forms: a, the browser's own viewer in place, below the citation and the description, at the
                chapter's measure and four fifths of the window tall; b, the viewer above the fold at a page's height
                with the description beside it, and the title's citation opening the paper in a new tab; c, the first
                page as text, Hirzel's words through pdftotext in the code figure, the viewer behind a press; and t,
                the table, the paper's row as key, title and year under a heading of its own.
            </Paragraph>
            <Paragraph>
                What the sketch found on its first runs: the library opens one page at a time and hides the rest, the
                cover by default, so the first photographs showed the cover and nothing of the chapter or the row until
                the switch learned to open the page each form is about, the paper's for a, b and c and the table's for
                t, as a reader arriving at the address would see it. In headless Chrome the viewer's frame draws, its
                toolbar and its loading line, but the paper does not load from a page opened as a file, so every
                photograph shows the frame dark where the pages will be; opened in a browser from the file, the viewer
                loads the paper from its address on the web, which is how the sketch is to be looked at. Form c's text
                falls into the code figure's monospace and reads as a listing and not as a page, since the library has
                no figure for a page of prose taken from a file; if the text is wanted on the page, that figure is
                owed. The row's year doubles the key, Gödel 1931 and 1931 again. Nothing here moved into the manual.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The photographs</Heading>
            <Paragraph>
                <Image>![[ 001-a-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-b-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-c-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-t-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-a-phone.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-b-phone.png ]]</Image>
            </Paragraph>
        </Section>
        <Append
            identifier="001"
            type=".html"
        >
            ![[ 001.html ]]
        </Append>
    </Chapter>
);
