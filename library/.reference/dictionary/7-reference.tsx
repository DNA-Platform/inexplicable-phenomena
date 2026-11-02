import { Chapter, Emphasis, Means, Paragraph, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Reference ]]</Title>
        <Paragraph>
            <Word>
                <Emphasis />
                Linguistic.
            </Word>{' '}
            Reference is the relationship between a linguistic expression and the entity in the world that it
            identifies or denotes.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Semantic.
            </Word>{' '}
            Reference is the act by which a <Means>$[[ ./Subject ]]</Means> directs attention to an{' '}
            <Means>$[[ ./Object ]]</Means> through a specific <Means>$[[ ./Relationship ]]</Means> type.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Formal.
            </Word>{' '}
            <Word>{'E[x,y,t]: x =t> y & x != y =|> x =ref> y'}</Word>
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Related.
            </Word>{' '}
            <Means>$[[ ./Subject ]]</Means>, <Means>$[[ ./Object ]]</Means>, <Means>$[[ ./Relationship ]]</Means>,
            symbol, <Means>$[[ ./Referent ]]</Means>.
        </Paragraph>
    </Chapter>
);
