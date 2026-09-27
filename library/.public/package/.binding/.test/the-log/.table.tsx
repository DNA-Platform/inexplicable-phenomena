import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, TableOfContents, Title, Word } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Content>$[ ./Entries ]</Content></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word><Content>$[ The Log ]</Content></Word>
                <Word><Content>$[ ./Synopsis ]</Content></Word>
                <Word><Content>$[ ./Table of Contents ]</Content></Word>
            </Paragraph>
        </Section>
        <Section>
            <Heading>What stands under the log</Heading>
            <Paragraph><Word><Content>[[ A Persona ]]**</Content></Word>: <Word><Content>$[ A Persona / Synopsis ]</Content></Word></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
