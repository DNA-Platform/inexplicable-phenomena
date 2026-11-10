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
        <Title>[[ Arithmetization of Metamathematics in a General Setting ]]( Feferman 1960 )</Title>
        <Paragraph>
            Solomon Feferman, Arithmetization of metamathematics in a general setting, Fundamenta Mathematicae 49
            (1960), 35–92; open at <Word>
                <Reference>http://matwbn.icm.edu.pl/ksiazki/fm/fm49/fm4914.pdf</Reference>
                the Polish digital mathematics library
            </Word>, from which the paper beside this chapter was taken.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the intensionality of the consistency statement, that which sentence Con
            is depends on how provability is arithmetized, and the predicate under which a theory proves its own
            consistency. On Doug's word of 10 November 2026, Feferman and Turing are "the biggest names that my
            alternate interpretation of Godel chnages" (in the room, 10 November 2026). In the formal core
            of <Means>$[[ The Documents ]]( Arithmetic Notebook / The Documents )</Means>, formal equality is "the third
            criterion after neutrality and the fixed point, which Gödel's Con fails by Feferman's result and ε
            satisfies"; and in the frontier's result E, the progression of consistency statements lies in the
            frontier, "pairwise inequivalent and one point under the identity, so Turing and Feferman were
            enumerating names of ε".
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ paper.pdf ]]</Opening>
                Read the paper ↗
            </Word>, 58 pages.
        </Paragraph>
    </Chapter>
);
