import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents } from '../.reference/4-the-faces~code.tsx';

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
                <Content>[[ Our Team ]]**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Dictionary ]]**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Chemistry ]]**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Subjective Mathematics ]]( Our Math )**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Pharmacology ]]**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Philosophy ]]**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Physics ]]**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Subjective Reference ]]( Our Reference )**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ The Design ]]**</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Our Library ]]</Content>
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
