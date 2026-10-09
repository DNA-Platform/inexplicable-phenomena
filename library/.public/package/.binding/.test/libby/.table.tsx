import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { Table, TableOfContents, Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title>
            <Parenthetical />
            [[ Table of Contents ]]
        </Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph>
                <Content>$[[ ./Who I Am ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Books I Keep ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Writing a Theme ]]</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Libby ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Synopsis ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Table of Contents ]]</Content>
                </Word>
            </Paragraph>
        </Section>
        <Section>
            <Table />
            <Heading>Filed under Libby</Heading>
            <Paragraph>
                <Word>Book</Word> <Word>What it is</Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ A Persona ]]**</Content>
                </Word> <Word>
                    <Content>$[[ a persona she vouches for, and its own account ]]( A Persona / Synopsis )</Content>
                </Word>
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
