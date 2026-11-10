import { Chapter, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Systems of Logic Based on Ordinals ]]( Turing 1939 )</Title>
        <Paragraph>
            A. M. Turing, Systems of Logic Based on Ordinals, Proceedings of the London Mathematical Society, second
            series, 45 (1939), 161–228, at <Word>
                <Reference>https://doi.org/10.1112/plms/s2-45.1.161</Reference>
                the Society
            </Word>; public domain in Britain since 2025 and under copyright in the United States until 2035, read
            there.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the adding of Gödel sentences, the progression of theories each taking the
            consistency of the last as an axiom, along the ordinals, which Feferman carried on. The paper reads the
            whole progression as one point: in the frontier's results of <Means>$[[ The Documents ]]( Arithmetic Notebook / The Documents )</Means>,
            result E, "the progression Con, Con(PA + Con), and on, lies in the frontier, pairwise inequivalent and
            one point under the identity, so Turing and Feferman were enumerating names of ε". On Doug's word of 10
            November 2026, Turing and Feferman are "the biggest names that my alternate interpretation of Godel
            chnages" (in the room, 10 November 2026).
        </Paragraph>
    </Chapter>
);
