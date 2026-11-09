import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents } from '../../../.reference/4-the-faces~code.tsx';

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
                    <Content>$[[ The Project of Arithmetic ]]( ./Arithmetic Project )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Arithmetic Project )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ The Textbook of Arithmetic ]]( ./Arithmetic Textbook )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Arithmetic Textbook )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ The Notebook of Arithmetic ]]( ./Arithmetic Notebook )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Arithmetic Notebook )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Arithmetic ]]</Content>
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
