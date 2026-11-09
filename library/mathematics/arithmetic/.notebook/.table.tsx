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
            <Heading>The Publication</Heading>
            <Paragraph>
                <Content>$[[ ./The Preface ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Object ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Mechanism ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Zero for Proof ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Zero as the Horizon ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Zero as the Counterexample ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Two-Sided Arithmetic ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Surviving Sentence ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Goldbach ]]</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Standing</Heading>
            <Paragraph>
                <Content>$[[ ./The Rulings ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Documents ]]</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>Beside the Paper</Heading>
            <Paragraph>
                <Content>$[[ ./The Sketches ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Sources ]]</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Arithmetic Notebook ]]</Content>
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
