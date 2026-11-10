import { Chapter, Image, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';
import { Opening, Plate } from '../../.reference/6-the-paper~code.tsx';

export default () => (
    <Chapter>
        <Paragraph>
            <Plate>
                <Opening>![[ townsend.pdf ]]</Opening>
                <Image>![[ townsend.png ]]</Image>
                <Word>Read the book ↗</Word>
            </Plate>
        </Paragraph>
        <Title>[[ The Foundations of Geometry ]]( Hilbert 1899 )</Title>
        <Paragraph>
            David Hilbert, Grundlagen der Geometrie, Leipzig: Teubner, 1899; in English as The Foundations of
            Geometry, translated by E. J. Townsend, Chicago: Open Court, 1902, public domain, held beside this
            chapter from <Word>
                <Reference>https://www.gutenberg.org/ebooks/17384</Reference>
                Project Gutenberg
            </Word>.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the axioms of geometry proved independent of one another, each by a model
            in which it fails and the rest hold, which is what reasoning about an axiom looks like once the postulate
            is no longer Euclid's alone; the conversation's reading, that the Grundlagen "didn't just list axioms; it
            proved each one independent of the" others (Claude, The Shape of the Phantom Proof, 25 October 2026).
            In the precedents of <Means>$[[ The Mechanism ]]( Arithmetic Notebook / The Mechanism )</Means> it stands
            with Hilbert's sphere, the imaginary sphere shown no object in Euclidean space.
        </Paragraph>
        <Paragraph>
            <Word>
                <Opening>![[ townsend.pdf ]]</Opening>
                Read the book ↗
            </Word>, Townsend's English.
        </Paragraph>
    </Chapter>
);
