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
            <Heading>The Paper</Heading>
            <Paragraph>
                <Content>$[[ ./The Subject of Arithmetic ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Type of Result ]]</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Abstractions</Heading>
            <Paragraph>
                <Content>$[[ ./Semantic Reflection ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Finite Proof ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Circle ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Zero ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Subject ]]</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Results</Heading>
            <Paragraph>
                <Content>$[[ ./The Theorems ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Axiom ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Conjectures and Intuitions ]]</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>The Edge</Heading>
            <Paragraph>
                <Content>$[[ ./The Archive ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Questions ]]</Content>
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
