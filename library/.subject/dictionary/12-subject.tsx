import { Chapter, Emphasis, Means, Paragraph, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Subject ]]</Title>
        <Paragraph>
            <Word>
                <Emphasis />
                Linguistic.
            </Word>{' '}
            In grammar, a subject is the person or thing that performs the action expressed by a verb or about
            which something is stated.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Semantic.
            </Word>{' '}
            A subject is a <Means>$[[ ./Referent ]]</Means> that participates in a direct{' '}
            <Means>$[[ ./Relationship ]]</Means> with a distinct <Means>$[[ ./Object ]]</Means>. In the ternary
            relation R(x,y,t), x is the subject when x and y differ.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Formal.
            </Word>{' '}
            <Word>{'E[x,y,t]: x =t> y =|> x != y =|> E[S]: x.S'}</Word>
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Related.
            </Word>{' '}
            Ternary, <Means>$[[ ./Object ]]</Means>, <Means>$[[ ./Relationship ]]</Means>,{' '}
            <Means>$[[ ./Referent ]]</Means>, perspective, property.
        </Paragraph>
    </Chapter>
);
