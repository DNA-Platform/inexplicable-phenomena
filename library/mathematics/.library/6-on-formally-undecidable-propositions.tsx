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
            Propositions of Principia Mathematica and Related Systems I, the standard translation being van
            Heijenoort's as revised in Kurt Gödel, Collected Works, volume I, Oxford, 1986, pages 144–195, with the
            German facing; read here in B. Meltzer's of 1962, with an introduction by R. B. Braithwaite, Oliver &amp;
            Boyd and Basic Books, Dover 1992. The German original stands scanned at <Word>
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
            </Word>, Meltzer's English, 75 pages.
        </Paragraph>
    </Chapter>
);
