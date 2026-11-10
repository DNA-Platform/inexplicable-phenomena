import { Chapter, Image, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening, Plate } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Paragraph>
            <Plate>
                <Opening>![[ halsted.pdf ]]</Opening>
                <Image>![[ halsted.png ]]</Image>
                <Word>Read the book ↗</Word>
            </Plate>
        </Paragraph>
        <Title>[[ Geometrical Researches on the Theory of Parallels ]]( Lobachevsky 1840 )</Title>
        <Paragraph>
            Nikolai Lobachevsky, Geometrische Untersuchungen zur Theorie der Parallellinien, Berlin: Fincke, 1840; in
            English as Geometrical Researches on the Theory of Parallels, translated by George Bruce Halsted, Austin:
            University of Texas, 1891, public domain, held beside this chapter from <Word>
                <Reference>https://arche.univ-lorraine.fr/pluginfile.php/4066298/mod_folder/content/0/Geometrical%20Researchs.pdf</Reference>
                a scan of the Austin printing at Lorraine
            </Word>.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the other postulate adopted outright and a geometry built on it, the
            precedent for reasoning about what an axiom is. On his word: "I would add work on geometry where
            different postulates were adopted to justify a different geometry because we need to talk about reasoning
            about what is an axiom" (in the room, 10 November 2026); in the precedents
            of <Means>$[[ The Mechanism ]]( Arithmetic Notebook / The Mechanism )</Means>, it stands beside Lambert's
            acute case and Beltrami's model.
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ halsted.pdf ]]</Opening>
                Read the book ↗
            </Word>, Halsted's English.
        </Paragraph>
    </Chapter>
);
