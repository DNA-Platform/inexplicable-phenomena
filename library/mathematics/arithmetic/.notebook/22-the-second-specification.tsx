import { Append, Chapter, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The Second Specification ]]</Title>
        <Paragraph>
            My second attempt at specifying the new generalization method for my work on arithmetic, written on
            15 November 2026 and retired to this note on my word of 20 November, so that the specification is kept
            and the chapter of <Means>$[[ the textbook ]]( Arithmetic Textbook )</Means> starts fresh. The first
            attempt, Proof by Symmetry, fixed the form of the object as a rule of inference with its figure given;
            it stands outside the library, named in the document's eighteenth reference, where the candidate
            figures and the earlier statements are kept.
        </Paragraph>
        <Paragraph>
            The document stands beside this chapter as the file it is, word for word as it stood in the textbook,
            and it is not drawn here. It had been drawn on my word of 20 November, by a format built for it; that
            format and the whole form of a specification with it were struck from the library's manuals on my word
            of 21 November, to be specified again from nothing. So the document is kept and nothing renders it:
            its nine sections, its clauses and its tables read as it wrote them, including the citations to an
            identification of twenty entries and a progress of eleven open determinations that were cleared with
            the chapter. What the textbook itself had been specified to be is
            in <Means>$[[ The Textbook's First Specification ]]( ./The Textbook's First Specification )</Means>.
        </Paragraph>
        <Append
            identifier="statement-of-work"
            type=".md"
        >
            ![[ statement-of-work.md ]]
        </Append>
    </Chapter>
);
