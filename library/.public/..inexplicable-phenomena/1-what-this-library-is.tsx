import { Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ What This Library Is ]]</Title>
        <Section>
            <Heading>The phenomena</Heading>
            <Paragraph>
                This library is about the hard problem of consciousness, the one self-evident and inexplicable
                phenomenon, and about the inexplicable phenomena that stand beside it in other fields. It is the
                public library of the repository that bears its name, bound from its source and published as it
                stands.
            </Paragraph>
        </Section>
        <Section>
            <Heading>What stands here</Heading>
            <Paragraph>
                A book here is a project, or a catalogue of projects. The people who work on these phenomena keep
                their own account in <Means>$[[ The Team ]]</Means>, and whoever stands in it may author. The
                subjects their work falls into are catalogues, <Means>$[[ Mathematics ]]</Means> the first, each
                to hold many books. The library is built with <Means>$[[ The Manual ]]</Means>, the least it needs
                to bind, and its look is being sketched rather than settled.
            </Paragraph>
        </Section>
    </Chapter>
);
