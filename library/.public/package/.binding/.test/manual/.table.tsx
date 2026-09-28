import { Chapter, Content, Heading, Paragraph, Parenthetical, Section, TableOfContents, Title, Word } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <TableOfContents />
        <Title><Parenthetical />[[ Table of Contents ]]</Title>
        <Section>
            <Heading>Contents</Heading>
            <Paragraph><Content>$[ ./The Book ]</Content></Paragraph>
            <Paragraph><Content>$[ ./The Theme ]</Content></Paragraph>
            <Paragraph><Content>$[ ./The Masthead and the Byline ]</Content></Paragraph>
            <Paragraph><Content>$[ ./The Catchword ]</Content></Paragraph>
            <Paragraph><Content>$[ ./The Faces ]</Content></Paragraph>
            <Paragraph><Content>$[ ./The Mark and the Photograph ]</Content></Paragraph>
            <Paragraph>
                <Parenthetical />
                <Word><Content>$[ The Library Reference Manual ]</Content></Word>
                <Word><Content>$[ ./Synopsis ]</Content></Word>
                <Word><Content>$[ ./Table of Contents ]</Content></Word>
            </Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
