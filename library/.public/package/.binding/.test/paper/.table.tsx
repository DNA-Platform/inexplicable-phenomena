import { Chapter, Heading, Means, Paragraph, Parenthetical, Section, TableOfContents, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Means>$[ ./The Argument ]</Means></Paragraph>
            <Paragraph><Means>$[ ./The Evidence ]</Means></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Means>$[ A Paper ]</Means>
                <Means>$[ ./Synopsis ]</Means>
                <Means>$[ ./Table of Contents ]</Means>
            </Paragraph>
        </Section>
    </Chapter>
);
