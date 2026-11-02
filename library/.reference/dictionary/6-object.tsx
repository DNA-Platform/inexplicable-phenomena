import { Chapter, Emphasis, Means, Paragraph, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Object ]]</Title>
        <Paragraph>
            <Word>
                <Emphasis />
                Linguistic.
            </Word>{' '}
            An object is an entity toward which action, thought, or emotion is directed, often functioning as
            the grammatical object in a sentence.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Semantic.
            </Word>{' '}
            An object is a <Means>$[[ ./Referent ]]</Means> that is the target of a{' '}
            <Means>$[[ ./Relationship ]]</Means>. In the ternary relation R(x,y,t), y is the object.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Formal.
            </Word>{' '}
            <Word>{'E[x,y]: x => y =|> E[O]: y.O'}</Word>
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Related.
            </Word>{' '}
            <Means>$[[ ./Subject ]]</Means>, ternary, <Means>$[[ ./Relationship ]]</Means>,{' '}
            <Means>$[[ ./Referent ]]</Means>, property.
        </Paragraph>
    </Chapter>
);
