import { Append, Chapter, Code, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Part>The tools</Part>
        <Title>[[ The Catchword ]]</Title>
        <Section>
            <Heading>What a catchword is</Heading>
            <Paragraph>
                The word at the foot of a page that anticipates the next, from the book arts. Here it is a Previous
                that shows the previous chapter's title and a Next that shows the next's, each linking to that
                chapter's route, and at the ends a self-reference to its own chapter, drawn in ink. Every chapter of
                every book here ends with one, and this chapter does.
            </Paragraph>
            <Paragraph>
                The words are this file's business and not the component's. A Next draws what is written in it; the
                two here draw the neighbour's title instead, which is what a catchword does and a Next need not. The
                file is printed whole in the chapter's appendix, <Means>$[[ ./The catchword's file ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The catchword's file ]]]</Heading>
            <Paragraph><Code identifier="code" numbered /></Paragraph>
        </Section>
        <Catchword />
        <Append identifier="code" type=".tsx">![[ code.tsx ]]</Append>
    </Chapter>
);
