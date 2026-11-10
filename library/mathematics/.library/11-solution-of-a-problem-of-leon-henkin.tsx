import { Chapter, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ Solution of a Problem of Leon Henkin ]]( Löb 1955 )</Title>
        <Paragraph>
            M. H. Löb, Solution of a problem of Leon Henkin, The Journal of Symbolic Logic 20 (1955), 115–118, at <Word>
                <Reference>https://doi.org/10.2307/2266895</Reference>
                Cambridge
            </Word>, under copyright and read there.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the derivability conditions a provability predicate must satisfy, which the
            lifted predicate in PA and the identity's rule of <Means>$[[ The Options ]]( Arithmetic Notebook / The Options )</Means> are
            measured against, and Löb's theorem itself, that a theory proving its own reflection for a sentence proves
            the sentence. In the frontier's results of <Means>$[[ The Documents ]]( Arithmetic Notebook / The Documents )</Means>,
            result D: "for unprovable S, the reflection sentence Prov(S) → S is in the frontier, Löb's theorem as a
            closure property".
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>https://www.math.umd.edu/~laskow/Pubs/713/Lob.pdf</Opening>
                Read the paper ↗
            </Word>, a course copy of the Journal's pages at the University of Maryland.
        </Paragraph>
    </Chapter>
);
