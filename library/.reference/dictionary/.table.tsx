import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents } from '../.manual/4-the-faces~code.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title>
            <Parenthetical />
            [[ Table of Contents ]]
        </Title>
        <Section>
            <Heading>The words</Heading>
            <Paragraph>
                <Content>$[[ ./Definition ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Dichotomy ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Identification ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Identity ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Individuality ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Object ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Reference ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Referent ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Relationship ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Representation ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Representative ]]</Content>
            </Paragraph>
            <Paragraph>
                <Content>$[[ ./Subject ]]</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Dictionary ]]</Content>
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
