import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents } from '../.reference/4-the-faces~code.tsx';
import { Appendix } from '../.reference/7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title>
            [[ Table of Contents ]]
        </Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph>
                <Content>$[[ ./The Top Page ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Manual's Page ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./The Project's Page ]]</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ The Design ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Synopsis ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Table of Contents ]]</Content>
                </Word>
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>Appendix</Heading>
            <Paragraph>
                <Content>$[[ ./The Sketch's Tools ]]</Content>
            </Paragraph>
        </Section>
    </Chapter>
);
