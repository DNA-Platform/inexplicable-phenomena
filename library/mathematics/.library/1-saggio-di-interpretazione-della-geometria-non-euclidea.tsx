import { Chapter, Image, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening, Plate } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Paragraph>
            <Plate>
                <Opening>![[ opere.pdf ]]</Opening>
                <Image>![[ opere.png ]]</Image>
                <Word>Read the paper ↗</Word>
            </Plate>
        </Paragraph>
        <Title>[[ Saggio di interpretazione della geometria non-euclidea ]]( Beltrami 1868 )</Title>
        <Paragraph>
            Eugenio Beltrami, Saggio di interpretazione della geometria non-euclidea, Giornale di Matematiche 6
            (1868), 284–312; in English in John Stillwell, Sources of Hyperbolic Geometry, American Mathematical
            Society, 1996. Public domain; held beside this chapter as reprinted in his Opere matematiche, volume I,
            Milan: Hoepli, 1902, pages 374–405, the thirty-two pages cut from <Word>
                <Reference>https://archive.org/details/operematematiche01beltuoft</Reference>
                the Archive's scan of the volume
            </Word>. The Giornale's own pages are digitized at Göttingen and listed at <Word>
                <Reference>https://www.deutsche-digitale-bibliothek.de/item/MQZMVOIGGGV6PZFABHMGW7ZFAUQR6QGF</Reference>
                the Deutsche Digitale Bibliothek
            </Word>, whose viewer answers a reader and refuses a script.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the model, a surface of constant negative curvature on which the other
            geometry holds, so that the fifth postulate is not provable from the rest. "It has to be from geometry
            because that is where mathematicians reasoned their way to axioms like we are" (Goldbach through Gödel,
            The Geometric Precedent, 28 October 2026); in the precedents of <Means>$[[ The Mechanism ]]( Arithmetic Notebook / The Mechanism )</Means>,
            "Beltrami showed V unprovable".
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ opere.pdf ]]</Opening>
                Read the paper ↗
            </Word>, the Opere's Italian, 32 pages.
        </Paragraph>
    </Chapter>
);
