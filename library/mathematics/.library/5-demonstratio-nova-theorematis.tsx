import { Chapter, Image, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening, Plate } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Paragraph>
            <Plate>
                <Opening>![[ dissertation.pdf ]]</Opening>
                <Image>![[ dissertation.png ]]</Image>
                <Word>Read the paper ↗</Word>
            </Plate>
        </Paragraph>
        <Title>[[ Demonstratio nova theorematis ]]( Gauss 1799 )</Title>
        <Paragraph>
            Carl Friedrich Gauss, Demonstratio nova theorematis omnem functionem algebraicam rationalem integram
            unius variabilis in factores reales primi vel secundi gradus resolvi posse, Helmstedt: Fleckeisen, 1799,
            the dissertation; reprinted in Werke, volume III, Göttingen, 1866, pages 1–30. Public domain; held
            beside this chapter in the first edition from <Word>
                <Reference>https://www.e-rara.ch/zut/content/titleinfo/1336299</Reference>
                e-rara's scan at ETH Zürich
            </Word>, which opens on e-rara's sheet with the dissertation behind it; the third volume of the Werke
            stands scanned at <Word>
                <Reference>https://archive.org/details/werkecarlf03gausrich</Reference>
                the Internet Archive
            </Word>.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the first proof of the fundamental theorem of algebra, the field's version
            of the geometric precedent, "where the limit is an object and the sentence is also a theorem of
            analysis", as the precedents of <Means>$[[ The Mechanism ]]( Arithmetic Notebook / The Mechanism )</Means> keep
            it; on his word, "We want Hilbert's sphere and the fundamental theorem of algebra" (in the room, 10
            November 2026).
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ dissertation.pdf ]]</Opening>
                Read the paper ↗
            </Word>, the first edition's Latin.
        </Paragraph>
    </Chapter>
);
