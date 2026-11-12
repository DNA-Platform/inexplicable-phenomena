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
            <Heading>The Formalism</Heading>
            <Paragraph>
                <Content>$[[ ./Formal Logic ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Logical Form ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Formal Arithmetic ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Arithmetic Form ]]</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Arithmetic Textbook ]]</Content>
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
