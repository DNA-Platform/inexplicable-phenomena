import { Append, Chapter, Means, Paragraph, Part, Title } from '@dna-platform/public';
import { Markdown } from '../../.reference/7-the-content~code.tsx';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The Second Specification ]]</Title>
        <Paragraph>
            My second attempt at specifying the new generalization method for my work on arithmetic, written on
            15 November 2026 and retired to this note on my word of 20 November, so that the specification is kept
            and the chapter of <Means>$[[ the textbook ]]( Arithmetic Textbook )</Means> starts fresh. The first
            attempt, Proof by Symmetry, fixed the form of the object as a rule of inference with its figure given;
            it stands outside the library, named in this document's eighteenth reference, where the candidate
            figures and the earlier statements are kept.
        </Paragraph>
        <Paragraph>
            The document stands here word for word as it stood in the textbook, and it stands apart: its citations
            by section, by clause and by the labels K and C land within it, and the twelve that named the
            identification by I1 to I20 and the progress by O1 to O11 read as the document wrote them, those two
            documents having been cleared with the chapter on the same word.
        </Paragraph>
        <Markdown
            apart
            identifier="statement-of-work"
        />
        <Append
            identifier="statement-of-work"
            type=".md"
        >
            ![[ statement-of-work.md ]]
        </Append>
    </Chapter>
);
