import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents } from '../../.reference/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title>
            <Parenthetical />
            [[ Table of Contents ]]
        </Title>
        <Section>
            <Heading>The Books</Heading>
            <Paragraph>
                <Content>$[[ ./The Notebook ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Textbook ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Project ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Library ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Design ]]</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Forms</Heading>
            <Paragraph>
                <Content>$[[ ./The Specification ]]</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Mathematical Reference ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Synopsis ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Table of Contents ]]</Content>
                </Word>
            </Paragraph>
        </Section>
    </Chapter>
);
