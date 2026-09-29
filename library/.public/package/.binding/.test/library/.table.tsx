import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Table, TableOfContents, Title, Word } from '@dna-platform/public';
import { Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Content>$[[ ./The Shelves ]]</Content></Paragraph>
            <Paragraph><Content>$[[ ./Of Libby ]]</Content></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word><Content>$[[ The Library ]]</Content></Word>
                <Word><Content>$[[ ./Synopsis ]]</Content></Word>
                <Word><Content>$[[ ./Table of Contents ]]</Content></Word>
            </Paragraph>
        </Section>
        <Section>
            <Table />
            <Heading>The Catalogue</Heading>
            <Paragraph><Word>Book</Word> <Word>What it is</Word></Paragraph>
            <Paragraph><Word><Content>[[ Libby ]]**</Content></Word> <Word><Content>$[[ the librarian's own account ]]( Libby / Synopsis )</Content></Word></Paragraph>
            <Paragraph><Word><Content>[[ Some Projects ]]**</Content></Word> <Word><Content>$[[ what she has worked on ]]( Some Projects / Synopsis )</Content></Word></Paragraph>
            <Paragraph><Word><Content>[[ A Paper ]]**</Content></Word> <Word><Content>$[[ a paper by a persona she vouched for ]]( A Paper / Synopsis )</Content></Word></Paragraph>
            <Paragraph><Word><Content>[[ The Library Reference Manual ]]**</Content></Word> <Word><Content>$[[ the tools every book here is built with ]]( The Library Reference Manual / Synopsis )</Content></Word></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
