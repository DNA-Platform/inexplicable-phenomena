import { Chapter, Emphasis, Means, Paragraph, Title, Word } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ Referent ]]</Title>
        <Paragraph>
            <Word>
                <Emphasis />
                Semantic.
            </Word>{' '}
            A referent is an entity that can participate in the ternary relation R(x,y,t) as a subject, object,
            or relationship type. In the context of Semantic Reference Theory, a referent is defined as an object
            which could be assigned to a constant.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Formal.
            </Word>{' '}
            <Word>{'Referent(x) := "x can be substituted for a variable in SRT"'}</Word>
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Philosophical.
            </Word>{' '}
            A referent is the target of reference, the object to which a name, sign, or description refers.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Ontological.
            </Word>{' '}
            A referent is a basic entity in a catalogue that maintains its identity through the relationships it
            participates in.
        </Paragraph>
        <Paragraph>
            <Word>
                <Emphasis />
                Related.
            </Word>{' '}
            Catalogue, <Means>$[[ ./Relationship ]]</Means>, <Means>$[[ ./Subject ]]</Means>,{' '}
            <Means>$[[ ./Object ]]</Means>, constant, ternary, transduction.
        </Paragraph>
    </Chapter>
);
