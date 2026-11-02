import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, Title, Word } from '@dna-platform/public';
import { Table, TableOfContents } from '../.manual/4-the-faces~code.tsx';

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
                <Content>$[[ ./What This Library Is ]]</Content>
            </Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word>
                    <Content>$[[ Reference ]]</Content>
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
            <Table />
            <Heading>The Catalogue</Heading>
            <Paragraph>
                <Word>Book</Word> <Word>What it is</Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ The Team ]]**</Content>
                </Word> <Word>
                    <Content>$[[ the people who work on inexplicable phenomena, in their own account ]]( The Team / Synopsis )</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ Dictionary ]]**</Content>
                </Word> <Word>
                    <Content>$[[ a catalogue of definitions, one chapter a word ]]( Dictionary / Synopsis )</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ Chemistry ]]**</Content>
                </Word> <Word>
                    <Content>$[[ Objects that React!, the framework the library is documented with ]]( Chemistry / Synopsis )</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ Mathematics ]]**</Content>
                </Word> <Word>
                    <Content>$[[ a subject of many books, each a project or a catalogue of them ]]( Mathematics / Synopsis )</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ Pharmacology ]]**</Content>
                </Word> <Word>
                    <Content>$[[ a subject of the library, with nothing filed under it yet ]]( Pharmacology / Synopsis )</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ Philosophy ]]**</Content>
                </Word> <Word>
                    <Content>$[[ a subject of the library, with nothing filed under it yet ]]( Philosophy / Synopsis )</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ Physics ]]**</Content>
                </Word> <Word>
                    <Content>$[[ a subject of the library, with nothing filed under it yet ]]( Physics / Synopsis )</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ The Manual ]]**</Content>
                </Word> <Word>
                    <Content>$[[ the least the library needs to bind ]]( The Manual / Synopsis )</Content>
                </Word>
            </Paragraph>
            <Paragraph>
                <Word>
                    <Content>[[ The Design ]]**</Content>
                </Word> <Word>
                    <Content>$[[ sketches of how the library might look, committed to nothing ]]( The Design / Synopsis )</Content>
                </Word>
            </Paragraph>
        </Section>
    </Chapter>
);
