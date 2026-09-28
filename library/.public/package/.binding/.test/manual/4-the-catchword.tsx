import { Chapter, Code, Heading, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Catchword ]]</Title>
        <Section>
            <Heading>What a catchword is</Heading>
            <Paragraph>
                The word at the foot of a page that anticipates the next, from the book arts. Here it is a Previous
                and a Next that draw the neighbour's title instead of what was written in them, and at the ends a
                self-reference, drawn in ink. Every chapter of every book here ends with one, and this chapter does.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The catchword's file</Heading>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
