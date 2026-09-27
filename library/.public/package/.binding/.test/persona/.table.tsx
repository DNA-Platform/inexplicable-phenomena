import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, TableOfContents, Title, Word } from '@dna-platform/public';
import { Catchword } from '../the-library/1-the-shelves.tsx.tsx';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Content>$[ ./Who Writes Here ]</Content></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word><Content>$[ A Persona ]</Content></Word>
                <Word><Content>$[ ./Synopsis ]</Content></Word>
                <Word><Content>$[ ./Table of Contents ]</Content></Word>
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
