import { Append, Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Paper ]]</Title>
        <Section>
            <Heading>A paper's page</Heading>
            <Paragraph>
                A paper is a citable publication held in the library as a resource: the file itself beside a chapter
                of <Means>$[[ The Library of Mathematics ]]( Mathematical Library )</Means>, which carries the
                paper's citation and the notes its author writes on it, the paper signed by its own author. The page
                is minimal, on Doug's word of 10 November 2026: a small picture of the publication at the top left
                with the text flowing under it, the citation, the notes, and a link that opens the publication in
                another tab; the picture itself opens it. The page's form is sketch 002 of the design book, form a.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The plate and the opening</Heading>
            <Paragraph>
                Two words in the file beside this chapter. A plate is the word that carries the picture, floated at
                the top left of the chapter by the theme; an opening is a reference that opens its address in another
                tab, a twin of the package's own reference with its anchor given a target. A chapter writes the plate
                first, before its title, as a word holding an opening whose text is the paper's literal and an image
                whose text is the picture's: the literals become the two files' addresses at the bind, so the picture
                is served beside the pages and the paper with it.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The picture</Heading>
            <Paragraph>
                The picture is the paper's first page, made once by the tool beside this chapter: Chrome's own viewer
                draws the PDF with its toolbar and panes asked off, served to it by the tool since the viewer draws
                nothing opened from the disk as a file, photographed at a page's shape and cut to the page. The tool
                takes a page number for a scan of a bound book, which opens on its boards: Lobachevsky's title page
                is its fifth leaf. It stands beside the paper's chapter as a picture, named by the plate's literal,
                and is made again only when the paper changes.
            </Paragraph>
        </Section>
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
        <Append
            identifier="preview"
            type=".mjs"
        >
            ![[ preview.mjs ]]
        </Append>
    </Chapter>
);
