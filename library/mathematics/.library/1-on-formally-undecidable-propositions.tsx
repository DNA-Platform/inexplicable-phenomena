import { Chapter, Emphasis, Image, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening, Plate } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Paragraph>
            <Plate>
                <Opening>![[ meltzer.pdf ]]</Opening>
                <Image>![[ meltzer.png ]]</Image>
                <Word>Read the paper ↗</Word>
            </Plate>
        </Paragraph>
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
            The notes on the paper are Doug's, to be written here; the team writes none of them.
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ meltzer.pdf ]]</Opening>
                Read the paper ↗
            </Word>, Meltzer's English, 75 pages; <Word>
                <Opening>![[ hirzel.pdf ]]</Opening>
                sections 1 and 2 in Hirzel's ↗
            </Word>, with his notice.
        </Paragraph>
    </Chapter>
);
