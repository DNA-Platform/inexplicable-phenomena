import { Chapter, Document, Emphasis, Heading, Paragraph, Reference, Section, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ On Formally Undecidable Propositions ]]( Gödel 1931 )</Title>
        <Paragraph>
            Kurt Gödel, <Word>
                <Emphasis />
                Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I
            </Word>, Monatshefte für Mathematik und Physik 38 (1931), 173–198. In English as On Formally Undecidable
            Propositions of Principia Mathematica and Related Systems I: the whole paper by B. Meltzer with an
            introduction by R. B. Braithwaite, Oliver &amp; Boyd and Basic Books, 1962, Dover 1992; and sections 1
            and 2 of its four by M. Hirzel, Boulder, 27 November 2000, reproduced with his notice as it asks. The
            German original stands scanned at <Word>
                <Reference>https://www.w-k-essler.de/pdfs/goedel.pdf</Reference>
                Essler's site
            </Word>.
        </Paragraph>
        <Paragraph>
            The description of the paper is Doug's, to be written here; the team writes none of it.
        </Paragraph>
        <Section>
            <Heading>The paper, in Meltzer's English</Heading>
            <Paragraph>
                <Document>![[ meltzer.pdf ]]</Document>
            </Paragraph>
        </Section>
        <Section>
            <Heading>Sections 1 and 2, in Hirzel's English</Heading>
            <Paragraph>
                <Document>![[ hirzel.pdf ]]</Document>
            </Paragraph>
        </Section>
    </Chapter>
);
