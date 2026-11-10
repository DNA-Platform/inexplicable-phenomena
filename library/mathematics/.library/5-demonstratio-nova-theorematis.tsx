import { Chapter, Means, Paragraph, Reference, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Demonstratio nova theorematis ]]( Gauss 1799 )</Title>
        <Paragraph>
            Carl Friedrich Gauss, Demonstratio nova theorematis omnem functionem algebraicam rationalem integram
            unius variabilis in factores reales primi vel secundi gradus resolvi posse, Helmstedt: Fleckeisen, 1799,
            the dissertation; reprinted in Werke, volume III, Göttingen, 1866, pages 1–30. Public domain; the third
            volume of the Werke stands scanned at <Word>
                <Reference>https://archive.org/details/werkecarlf03gausrich</Reference>
                the Internet Archive
            </Word>, thirty-five megabytes for the thirty pages, so the text is read there.
        </Paragraph>
        <Paragraph>
            What the paper takes from it: the first proof of the fundamental theorem of algebra, the field's version
            of the geometric precedent, "where the limit is an object and the sentence is also a theorem of
            analysis", as the precedents of <Means>$[[ The Mechanism ]]( Arithmetic Notebook / The Mechanism )</Means> keep
            it; on his word, "We want Hilbert's sphere and the fundamental theorem of algebra" (in the room, 10
            November 2026).
        </Paragraph>
    </Chapter>
);
