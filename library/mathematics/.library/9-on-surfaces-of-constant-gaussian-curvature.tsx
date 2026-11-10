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
        <Title>[[ On Surfaces of Constant Gaussian Curvature ]]( Hilbert 1901 )</Title>
        <Paragraph>
            David Hilbert, Ueber Flächen von constanter Gaussscher Krümmung, Transactions of the American
            Mathematical Society 2 (1901), 87–99, at <Word>
                <Reference>https://doi.org/10.1090/S0002-9947-1901-1500557-5</Reference>
                the Society
            </Word>; public domain, held beside this chapter from <Word>
                <Reference>https://archive.org/details/jstor-1986308</Reference>
                JSTOR's early journal copy at the Archive
            </Word>, which opens on JSTOR's sheet with the paper behind it; reprinted as Appendix V of the Grundlagen
            der Geometrie from its second edition.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: Hilbert's sphere, that no complete surface of constant negative curvature
            stands in Euclidean space, so the sphere of imaginary radius Lambert read the acute case off is no object
            there; in the precedents of <Means>$[[ The Mechanism ]]( Arithmetic Notebook / The Mechanism )</Means>,
            "Hilbert showed the imaginary sphere no object in Euclidean space"; on his word, "We want Hilbert's
            sphere and the fundamental theorem of algebra" (in the room, 10 November 2026).
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ paper.pdf ]]</Opening>
                Read the paper ↗
            </Word>, the Transactions' German.
        </Paragraph>
    </Chapter>
);
