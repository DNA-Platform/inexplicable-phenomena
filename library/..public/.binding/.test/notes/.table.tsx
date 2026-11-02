import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents, Catchword } from '../manual/.book';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title>
            <Parenthetical />
            [[ Table of Contents ]]
        </Title>
        <Section>
            <Heading>Содержание</Heading>
            <Paragraph>
                <Content>$[[ ./О книгах ]]</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Записки библиотекаря ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Synopsis ]]</Content>
                </Word>
                <Word>
                    <Content>$[[ ./Table of Contents ]]</Content>
                </Word>
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
