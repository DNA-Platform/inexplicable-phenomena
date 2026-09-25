import { Chapter, Heading, Means, Paragraph, Parenthetical, Section, TableOfContents, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Means>$[ ./Who Writes Here ]</Means></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Means>$[ A Persona ]</Means>
                <Means>$[ ./Synopsis ]</Means>
                <Means>$[ ./Table of Contents ]</Means>
            </Paragraph>
        </Section>
    </Chapter>
);
