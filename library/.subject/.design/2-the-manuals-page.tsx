import { Append, Chapter, Heading, Image, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Manual's Page ]]</Title>
        <Section>
            <Heading>Sketch 001, five forms of the manual's page</Heading>
            <Paragraph>
                The first sketch of the manual's page asks how a chapter
                of <Means>$[[ Our Reference ]]</Means> shows the file beside it, the code that is the part the
                chapter specifies, now that the manual is written as a specification. The listing itself is to look
                as it does in my own library's manual, measured off it on 17 November 2026: JetBrains Mono at twelve
                pixels on a line of twenty, the ink pale on a night of deep teal, the keywords sky, the strings
                amber, the names mint, the comments dimmed, the numbers in a column of brass, and that manual's light
                palette behind a switch. The container is this page's own, the editor's bar speaking in the page's
                label voice. The page is snapshotted off 4343's print
                of <Means>$[[ Our Reference / The Faces ]]</Means>, its sheets inlined and its scripts stripped,
                and appended to this chapter with its forms on a switch; a form is a question, not a design. The
                forms: a, the plate, the editor standing in the chapter where the code figure stands today, at the
                measure, capped at seven tenths of the window and scrolling within, with light, wrap and lines on its
                bar and a full screen that takes the window; b, the back, the chapter's words alone on its front and
                the file on its back, flipped by the square at the title's right
                that <Means>$[[ Our Reference / The Content ]]</Means> flips with, the title turning into the file's
                own name in the editor's face as the content's title turns into its literal; c, the spread, my
                library's container on this paper, the words at the window's left and the editor beside them to its
                edge, the height of the window; and on the table's page, t, the appendix, a section at the foot of
                the contents in the smaller voice, one row a file under the chapter it stands beside, and u, each
                file as a press under its chapter's row with the file's mark. In t and u a press on a file opens its
                chapter turned to the file.
            </Paragraph>
            <Paragraph>
                What the sketch found on its first runs: the plate stood below the fold in every photograph until
                the switch learned to scroll to it, as a reader arriving at the code would; the spread gridded the
                pagination's container instead of the theme's and left the words centred, until the sheet was named
                by its place under the root; the figure on the print carries its highlighting already, 2,315 spans,
                and no line numbers, since the manual never asked for them, so the sketch numbers the lines as the
                code figure would; a chapter with two files beside it, The Paper's code and its preview tool, shows
                one tab, since only the code is a figure on the page; and on the phone the bar's four words wrap to a
                second line. Nothing here moved into the manual.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The photographs of 001</Heading>
            <Paragraph>
                <Image>![[ 001-a-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-alight-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-afull-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-b-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-bback-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-c-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-t-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-u-desk.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-a-phone.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-bback-phone.png ]]</Image>
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
