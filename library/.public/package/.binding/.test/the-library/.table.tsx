import { Chapter, Heading, Means, Paragraph, Parenthetical, Section, TableOfContents, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Means>$[ ./The Shelves ]</Means></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Means>$[ The Library ]</Means>
                <Means>$[ ./Synopsis ]</Means>
                <Means>$[ ./Table of Contents ]</Means>
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Catalogue</Heading>
            <Paragraph><Means>[[ The Log ]]**</Means>: <Means>$[ The Log / Synopsis ]</Means></Paragraph>
            <Paragraph><Means>[[ Some Projects ]]**</Means>: <Means>$[ Some Projects / Synopsis ]</Means></Paragraph>
            <Paragraph><Means>[[ A Paper ]]**</Means>: <Means>$[ A Paper / Synopsis ]</Means></Paragraph>
        </Section>
    </Chapter>
);
