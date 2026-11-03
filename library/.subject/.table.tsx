import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { TableOfContents } from '../.reference/4-the-faces~code.tsx';

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
                    <Content>$[[ ./Our Team ]]</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Our Team )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ ./Dictionary ]]</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Dictionary )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ ./Chemistry ]]</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Chemistry )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ Subjective Mathematics ]]( ./Our Math )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Our Math )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ ./Pharmacology ]]</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Pharmacology )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ ./Philosophy ]]</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Philosophy )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ ./Physics ]]</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Physics )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ Subjective Reference ]]( ./Our Reference )</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( Our Reference )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>$[[ ./The Design ]]</Content>
                </Word> <Word>
                    <Content>[[ ▷ ]]( The Design )**</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Our Library ]]</Content>
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
