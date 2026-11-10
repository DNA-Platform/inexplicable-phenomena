import { Chapter, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Extensions of Some Theorems of Gödel and Church ]]( Rosser 1936 )</Title>
        <Paragraph>
            J. Barkley Rosser, Extensions of some theorems of Gödel and Church, The Journal of Symbolic Logic 1
            (1936), 87–91, at <Word>
                <Reference>https://doi.org/10.2307/2269028</Reference>
                Cambridge
            </Word>, under copyright and read there.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the first theorem freed of ω-consistency by Rosser's sentence, which the
            paper reads as hiding the belief rather than removing it, since one cannot quantify over an infinite
            domain without a belief about representation (Goldbach through Gödel, Certainty, 19 October 2026). In
            the frontier's results of <Means>$[[ The Documents ]]( Arithmetic Notebook / The Documents )</Means>,
            result H: a sentence is in the frontier exactly when the theory with it and the theory with its negation
            are both consistent, "so undecidable means two subjects of one empty representation, and by Rosser every
            consistent subject has a name for its identity".
        </Paragraph>
    </Chapter>
);
