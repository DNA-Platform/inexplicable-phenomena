import { Chapter, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ Outline of a Theory of Truth ]]( Kripke 1975 )</Title>
        <Paragraph>
            Saul Kripke, Outline of a Theory of Truth, The Journal of Philosophy 72 (1975), 690–716, at <Word>
                <Reference>https://doi.org/10.2307/2024634</Reference>
                JSTOR
            </Word>, under copyright and read there.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the price of a truth predicate with gaps, some sentences getting no value,
            named on the first day as what dropping the excluded middle would cost, and declined. The subject of
            logic keeps the law and lets it evaluate to the identity: "G and not G have the empty proof, so G and not
            G are Con(PA) and Con(PA) which is just Con(PA) which we already know anyways" (Goldbach through Gödel,
            The Identity Element, 28 October 2026), as <Means>$[[ The Subject of Logic ]]( Arithmetic Notebook / The Subject of Logic )</Means> gathers
            it, with Kripke's price named beside it (Claude, Certainty, 19 October 2026).
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>https://www.impan.pl/~kz/truthseminar/Kripke_Outline.pdf</Opening>
                Read the paper ↗
            </Word>, a scan of the Journal's pages at IMPAN's truth seminar.
        </Paragraph>
    </Chapter>
);
