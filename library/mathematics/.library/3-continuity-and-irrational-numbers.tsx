import { Chapter, Image, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening, Plate } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Paragraph>
            <Plate>
                <Opening>![[ beman.pdf ]]</Opening>
                <Image>![[ beman.png ]]</Image>
                <Word>Read the essays ↗</Word>
            </Plate>
        </Paragraph>
        <Title>[[ Continuity and Irrational Numbers ]]( Dedekind 1872 )</Title>
        <Paragraph>
            Richard Dedekind, Stetigkeit und irrationale Zahlen, Braunschweig: Vieweg, 1872; in English as
            Continuity and Irrational Numbers in Essays on the Theory of Numbers, translated by Wooster Woodruff
            Beman, Chicago: Open Court, 1901, public domain, held beside this chapter from <Word>
                <Reference>https://www.gutenberg.org/ebooks/21016</Reference>
                Project Gutenberg
            </Word>, with the second essay, The Nature and Meaning of Numbers, in the same file.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: continuity adopted as an axiom in the author's own words, "I am utterly
            unable to adduce any proof of its correctness, nor has anyone" (Goldbach through Gödel, The Geometric
            Precedent, 28 October 2026), the precedent for how such an adoption is received; in the precedents
            of <Means>$[[ The Mechanism ]]( Arithmetic Notebook / The Mechanism )</Means>, "Dedekind on continuity and
            Cauchy on Poncelet's principle stand as the precedents for how such adoptions are received".
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ beman.pdf ]]</Opening>
                Read the essays ↗
            </Word>, Beman's English.
        </Paragraph>
    </Chapter>
);
