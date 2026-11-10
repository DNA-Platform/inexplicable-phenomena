import { Append, Chapter, Heading, Image, Means, Paragraph, Section, Title } from '@dna-platform/public';

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
        <Section>
            <Heading>Sketch 002, the minimal page</Heading>
            <Paragraph>
                The second sketch follows his answer to the first, the same day: not a frame or a look to commit to,
                a library built as utility minimally and grown as needed; the table listing the publications in
                alphabetical order and reached easily, a nexus of catalogues eventually; a chapter a minimal place
                to write notes about the publication with a link that opens it, possibly in another tab; and the
                preview he liked kept as a small picture of the publication at the top left of the page, clicked to
                open it. The viewer at the measure comes out. The picture is the paper's first page, made once by
                Chrome's own viewer with its toolbar and panes asked off and cropped to the page, a tool of the
                sprint's scratch until a form is chosen. The forms: a, the picture floated at the top left with the
                title and the citation beside it and the notes flowing under it once past; b, the picture in a
                column of its own with nothing flowing under; t, the cover and the table on one page, the papers
                in alphabetical order, two rows the references entry names marked to come so the order shows.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The photographs of 002</Heading>
            <Paragraph>
                <Image>![[ 002-a-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 002-b-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 002-t-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 002-a-phone.png ]]</Image>
            </Paragraph>
        </Section>
        <Section>
            <Heading>Sketch 003, the cover</Heading>
            <Paragraph>
                His number on 002 was a, the picture at the top left with the text flowing under it; and on its table
                he asked instead for the cover: a transition when the book is first opened, the feel of a book, not
                unlike the paper's picture but bigger, in ideas that match the current theme's feel. The third sketch
                puts three ideas of the cover on a switch, each a board built from the page's own words in the theme's
                Georgia on white with its small spaced capitals and hairline rules, and each opening to the contents
                with a transition when clicked, the board giving way upward and the table coming in beneath; the
                switch's last press closes the book again. The forms: a, the front board, a panel tall as a book framed
                by a double rule with a spine's shadow at its left, the title large on it, the synopsis in italic, the
                author and the subject at its foot; b, the shelf, the same board carrying the publications as their
                pictures along a shelf at its foot, each a way into its chapter; c, the half-title, the title alone on
                a blank leaf with no frame, which turns rather than lifts when opened.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The photographs of 003</Heading>
            <Paragraph>
                <Image>![[ 003-a-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 003-b-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 003-c-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 003-aopen-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 003-a-phone.png ]]</Image>
            </Paragraph>
        </Section>
        <Section>
            <Heading>What was built</Heading>
            <Paragraph>
                Of the four, two moved into the manual by his number on 10 November 2026: the paper's page is 002's
                form a, the plate and the opening of <Means>$[[ Our Reference / The Paper ]]</Means>, and the cover
                is 004's form a, the front of <Means>$[[ Our Reference / The Faces ]]</Means>; 001 and 003 stand here
                as the questions they were. Two departures from the decided HTML, kept on purpose: the title stands
                whole on the front, in two lines, where the sketch set THE LIBRARY OF small above the name, since a
                title is one writing of the library's and not two; and the picture is cut to the paper's own page
                shape, read from the PDF, where the sketch's was cut to A4's.
            </Paragraph>
        </Section>
        <Append
            identifier="001"
            type=".html"
        >
            ![[ 001.html ]]
        </Append>
        <Append
            identifier="002"
            type=".html"
        >
            ![[ 002.html ]]
        </Append>
        <Section>
            <Heading>Sketch 004, the book's cover</Heading>
            <Paragraph>
                His word on 003, "It's good", and three corrections: the author and the subject on the cover itself,
                no header above it, the shape of a book cover, and a click anywhere on the book opening the contents.
                So the fourth sketch shows the cover alone on its page, the running head and the byline gone while the
                book is closed and back when it opens; the book two by three, narrower than the measure, standing in
                the middle of the page with a spine's shadow and a double rule, the title large on it, the author
                under the title as a reference to Our Team, the synopsis in italic, and at the foot the subject as a
                reference to Our Math and the library's name; a click anywhere on the book, save on a link, lifting it
                away as the contents come in beneath. Two forms kept, a the front board and b the shelf, which carries
                the publications as their pictures along a shelf above the foot; the half-title dropped, since it
                carried no author.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The photographs of 004</Heading>
            <Paragraph>
                <Image>![[ 004-a-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 004-b-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 004-aopen-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 004-a-phone.png ]]</Image>
            </Paragraph>
        </Section>
        <Append
            identifier="003"
            type=".html"
        >
            ![[ 003.html ]]
        </Append>
        <Append
            identifier="004"
            type=".html"
        >
            ![[ 004.html ]]
        </Append>
    </Chapter>
);
