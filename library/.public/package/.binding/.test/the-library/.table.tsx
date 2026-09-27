import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Table, TableOfContents, Title, Word } from '@dna-platform/public';
import { Catchword } from './1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Content>$[ ./The Shelves ]</Content></Paragraph>
            <Paragraph><Content>$[ ./Of the Log ]</Content></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word><Content>$[ The Library ]</Content></Word>
                <Word><Content>$[ ./Synopsis ]</Content></Word>
                <Word><Content>$[ ./Table of Contents ]</Content></Word>
            </Paragraph>
        </Section>
        <Section>
            <Table />
            <Heading>The Catalogue</Heading>
            <Paragraph><Word><Content>[[ The Log ]]**</Content></Word> <Word><Content>$[ The Log / Synopsis ]</Content></Word></Paragraph>
            <Paragraph><Word><Content>[[ Some Projects ]]**</Content></Word> <Word><Content>$[ Some Projects / Synopsis ]</Content></Word></Paragraph>
            <Paragraph><Word><Content>[[ A Paper ]]**</Content></Word> <Word><Content>$[ A Paper / Synopsis ]</Content></Word></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
