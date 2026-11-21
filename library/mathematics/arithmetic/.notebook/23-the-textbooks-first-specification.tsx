import { Chapter, Means, Paragraph, Part, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Part>The Formalism</Part>
        <Title>[[ The Textbook's First Specification ]]</Title>
        <Paragraph>
            What I had specified the Textbook of Arithmetic to be, ruled on 12 November 2026 and amended on
            15 and 20 November, retired to this note on my word of 21 November so
            that <Means>$[[ the textbook ]]( Arithmetic Textbook )</Means> starts from nothing. It had stood in
            that book's own synopsis, as a numbered list of lists, in the form I had chosen for a specification
            the same week; the form itself is struck with it, so what it said stands here in plain writing.
        </Paragraph>
        <Paragraph>
            The book was to hold the official results of arithmetic, stated and proved, a result entering only as
            I had ruled it, and its official form was to be the algebraic one. Every chapter was to be titled by
            the thing it attempted to specify — a mathematical object, taken as the starting point — and one
            chapter was to be one such attempt, bearing that object's name.
        </Paragraph>
        <Paragraph>
            An entry was to open with the specification of its object, which was the sovereign part, and then
            carry an explanation; the formalism, annotated with justifications saying how it satisfied the
            specification and citing its items by number; and presentations in contexts, each context itself
            specified. It was to cite into the subject's library and into these notes. It was to show one aspect
            at a time, and wherever something was specified and not yet built, a placeholder was to stand for it.
        </Paragraph>
        <Paragraph>
            The amendments are its history and the reason it is here. On 15 November the first object was named —
            X, the symmetry of arithmetic — and took the book's first chapter, further objects standing to be
            named under the placeholder rule. The four potential chapters of 12 November were retired to these
            notes as <Means>$[[ The Potential Chapters ]]( ./The Potential Chapters )</Means>. On 20 November the
            first chapter's own specification of X was retired
            as <Means>$[[ The Second Specification ]]( ./The Second Specification )</Means>, with the
            identification and the progress beside it cleared. This note is the fourth and last retirement: the
            book keeps its name, its author and its subject, and holds nothing else.
        </Paragraph>
    </Chapter>
);
