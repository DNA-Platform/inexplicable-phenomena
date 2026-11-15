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
            <Heading>The Objects</Heading>
            <Paragraph>
                <Content>$[[ ./The Symmetry of Arithmetic ]]</Content>
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
