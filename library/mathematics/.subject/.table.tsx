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
            <Heading>Contents</Heading>
            <Paragraph>
                <Content>[[ Referential Objectivity ]]( Mathematical Reference )**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Subjective Design ]]( Mathematical Design )**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ Principia Veritatem Identificandi ]]( Mathematical Principles )**</Content>
            </Paragraph>
            <Paragraph>
                <Content>[[ The Biography of Subjective Identity ]]( Mathematical Identity )**</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Our Math ]]</Content>
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
