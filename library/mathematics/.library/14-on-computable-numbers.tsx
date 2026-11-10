import { Chapter, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ On Computable Numbers ]]( Turing 1936 )</Title>
        <Paragraph>
            A. M. Turing, On Computable Numbers, with an Application to the Entscheidungsproblem, Proceedings of the
            London Mathematical Society, second series, 42 (1937), 230–265, read in 1936, at <Word>
                <Reference>https://doi.org/10.1112/plms/s2-42.1.230</Reference>
                the Society
            </Word>; public domain in Britain since 2025 and under copyright in the United States until 2032, read
            there.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: computability, and the form of a thesis. The circular reasoning thesis is
            stated in Church and Turing's form: "Any universals that can be proven should literally be machine
            checkable. The Doug's Circular Reasoning Thesis should be like the Church Turing Thesis" (Goldbach through
            Gödel, The Circular Reasoning Thesis, 27 October 2026), as <Means>$[[ The Mechanism ]]( Arithmetic Notebook / The Mechanism )</Means> says;
            and the paper's reading of Goldbach's conjecture as an axiom is, as a deduction, "invalid and is meant to
            be: a thesis in the sense of Church and Turing, confirmed by every independent formalization through
            chart invariance and by every instance", as <Means>$[[ Goldbach ]]( Arithmetic Notebook / Goldbach )</Means> says.
            On Doug's word of 10 November 2026, Turing and Feferman are "the biggest names that my alternate
            interpretation of Godel chnages" (in the room, 10 November 2026).
        </Paragraph>
    </Chapter>
);
