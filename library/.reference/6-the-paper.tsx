import { Append, Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Listing } from './7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Paper ]]</Title>
        <Section>
            <Heading>1. A paper's page</Heading>
            <Paragraph>
                <List />
                <Line>1.1 A paper is a citable publication held in the library as a resource: the file itself beside a chapter of <Means>$[[ The Library of Mathematics ]]( Mathematical Library )</Means>, which carries the paper's citation and the notes its author writes on it, the paper signed by its own author.</Line>
                <Line>1.2 The page is minimal, on my word of 10 November 2026: a small picture of the publication at the top left with the text flowing under it, the citation, the notes, and a link that opens the publication in another tab; the picture itself opens it. The page's form is sketch 002 of the design book, form a.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The plate and the opening</Heading>
            <Paragraph>
                <List />
                <Line>2.1 Two words in the file beside this chapter. A plate is the word that carries the picture, floated at the top left of the chapter by the theme; an opening is a reference that opens its address in another tab, a twin of the package's own reference with its anchor given a target.</Line>
                <Line>2.2 A chapter writes the plate first, before its title, as a word holding an opening whose text is the paper's literal and an image whose text is the picture's: the literals become the two files' addresses at the bind, so the picture is served beside the pages and the paper with it.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>3. The picture</Heading>
            <Paragraph>
                <List />
                <Line>3.1 The picture is the paper's first page, made once by the tool beside this chapter: Chrome's own viewer draws the PDF with its toolbar and panes asked off, served to it by the tool since the viewer draws nothing opened from the disk as a file, photographed at a page's shape and cut to the page.</Line>
                <Line>3.2 The tool takes a page number for a scan of a bound book, which opens on its boards: Lobachevsky's title page is its fifth leaf. The picture stands beside the paper's chapter, named by the plate's literal, and is made again only when the paper changes.</Line>
                <Line>3.3 The listing beside this chapter shows both files, the code and the tool, a tab each, which is how a chapter with two files beside it reads in the manual.</Line>
            </Paragraph>
        </Section>
        <Listing />
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
