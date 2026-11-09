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
                <Word>
                    <Content>$[[ Referential Objectivity ]]( ./Mathematical Reference )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Mathematical Reference )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ Subjective Design ]]( ./Mathematical Design )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Mathematical Design )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ Principia Veritatem Identificandi ]]( ./Mathematical Principles )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Mathematical Principles )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ The Biography of Subjective Identity ]]( ./Mathematical Identity )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Mathematical Identity )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ The Library of Mathematics ]]( ./Mathematical Library )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Mathematical Library )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ The Subject of Arithmetic ]]( ./Arithmetic )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Arithmetic )**</Content>
                </Word>
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
