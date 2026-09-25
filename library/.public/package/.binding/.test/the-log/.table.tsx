import { Chapter, Heading, Means, Paragraph, Parenthetical, Section, TableOfContents, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Means>$[ ./Entries ]</Means></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Means>$[ The Log ]</Means>
                <Means>$[ ./Synopsis ]</Means>
                <Means>$[ ./Table of Contents ]</Means>
            </Paragraph>
        </Section>
        <Section>
            <Heading>What stands under the log</Heading>
            <Paragraph><Means>[[ A Persona ]]**</Means>: <Means>$[ A Persona / Synopsis ]</Means></Paragraph>
        </Section>
    </Chapter>
);
