import { Chapter, Emphasis, Means, Paragraph, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Definition ]]</Title>
        <Paragraph>
            <Word>
                <Emphasis />
                Semantic.
            </Word>{' '}
            A definition in Semantic Reference Theory is a statement that establishes the meaning of a term or
            concept by expressing its equivalence to a formal expression using the transduction operator.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Formal logic.
            </Word>{' '}
            A definition introduces a new symbol or term by asserting its logical equivalence to an expression
            containing only previously defined terms.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Linguistic.
            </Word>{' '}
            A definition establishes the semantic content of a word or phrase by stating its necessary and
            sufficient conditions.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Operational.
            </Word>{' '}
            A definition provides criteria for determining whether a concept applies to a given case, often
            through observable properties or procedures.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Related.
            </Word>{' '}
            Transduction, Semantic Reference Theory, <Means>$[[ ./Relationship ]]</Means>, property, inheritance.
        </Paragraph>
    </Chapter>
);
