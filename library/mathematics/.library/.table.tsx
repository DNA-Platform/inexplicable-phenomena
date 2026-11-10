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
            <Heading>The Papers</Heading>
            <Paragraph>
                <Content>$[[ On Formally Undecidable Propositions ]]( ./Gödel 1931 )</Content>
            </Paragraph>
        </Section>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Mathematical Library ]]</Content>
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
