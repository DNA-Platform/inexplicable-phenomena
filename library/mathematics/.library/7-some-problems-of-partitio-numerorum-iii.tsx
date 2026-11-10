import { Chapter, Image, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening, Plate } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Paragraph>
            <Plate>
                <Opening>![[ paper.pdf ]]</Opening>
                <Image>![[ paper.png ]]</Image>
                <Word>Read the paper ↗</Word>
            </Plate>
        </Paragraph>
        <Title>[[ Some Problems of Partitio Numerorum, III ]]( Hardy and Littlewood 1923 )</Title>
        <Paragraph>
            G. H. Hardy and J. E. Littlewood, Some problems of 'Partitio numerorum'; III: On the expression of a
            number as a sum of primes, Acta Mathematica 44 (1923), 1–70; open access at <Word>
                <Reference>https://doi.org/10.1007/BF02403921</Reference>
                Acta Mathematica's archive
            </Word> and public domain in the United States, the paper beside this chapter taken from its mirror.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: Goldbach's problem as the circle method states it, and the singular series
            that the paper's count on the modular rings normalizes to; in the fourth movement
            of <Means>$[[ Two-Sided Arithmetic ]]( Arithmetic Notebook / Two-Sided Arithmetic )</Means>, "normalized,
            the count is the Hardy–Littlewood singular series" (Goldbach through Gödel, The Paper's Flow, 5 November
            2026).
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ paper.pdf ]]</Opening>
                Read the paper ↗
            </Word>, 70 pages.
        </Paragraph>
    </Chapter>
);
