import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents } from './4-the-faces~code.tsx';

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
                <Content>$[[ ./The Book ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Theme ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Masthead and the Byline ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Faces ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Developing the Library ]]</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ our-reference ]]</Content>
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
