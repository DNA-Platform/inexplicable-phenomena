import { Append, Chapter, Heading, Image, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Top Page ]]</Title>
        <Section>
            <Heading>Sketch 001, three forms of the top page</Heading>
            <Paragraph>
                The first sketch asks what the top of the library should look like, from the bound print of the top
                book as the borrowed manual draws it. The page is appended to this chapter with its forms on a
                switch, and a form is a question, not a design. The forms: a, the page as bound, the cover in its
                box, the byline above it, the synopsis beside, the catalogue as a two-column table; b, a front, the
                masthead and the byline on one line, the name large, the synopsis as a standfirst, the catalogue as
                three shelves side by side and the chapter below; c, the subjects first, the catalogue standing above
                the synopsis in two columns under a small cover.
            </Paragraph>
            <Paragraph>
                What the sketch found on its first runs: the header row of the catalogue, Book and What it is, is a
                row like the others and became a shelf of its own in form b until the sheet hid it by a rule more
                specific than the one that made the shelves, since a later rule of equal weight had won. And form c
                misfired: the masthead, the byline and the chapters are not siblings on the page, each standing in a
                container of its own, so an order given to them put the masthead last and left the catalogue under
                the synopsis; a form that moves the parts needs another mechanism than order. Nothing here moved into
                the manual.
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
                <Image>![[ 001-b-phone.png ]]</Image>
            </Paragraph>
            <Paragraph>
                <Image>![[ 001-c-desk.png ]]</Image>
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
