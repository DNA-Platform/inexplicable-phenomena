import { Chapter, Emphasis, Means, Paragraph, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Relationship ]]</Title>
        <Paragraph>
            <Word>
                <Emphasis />
                Semantic.
            </Word>{' '}
            A relationship is a connection between <Means>$[[ ./Referent ]]</Means>s established through the
            ternary relation R(x,y,t). When referents x and y are distinct, t specifies the relationship type that
            connects them.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Formal.
            </Word>{' '}
            <Word>{'R(x,y,t) & x != y'}</Word>, creating a directed connection from a subject to an object through
            a specific type.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Graph theory.
            </Word>{' '}
            A relationship can be viewed as a labeled, directed edge in a graph, where referents are nodes and the
            relationship type is the edge label.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Linguistic.
            </Word>{' '}
            A relationship corresponds to the predicate in a subject-predicate-object grammatical structure,
            determining how subjects relate to objects.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Related.
            </Word>{' '}
            Ternary, <Means>$[[ ./Subject ]]</Means>, <Means>$[[ ./Object ]]</Means>, property, inheritance,{' '}
            <Means>$[[ ./Referent ]]</Means>, catalogue.
        </Paragraph>
    </Chapter>
);
