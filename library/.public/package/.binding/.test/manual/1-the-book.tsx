import { Chapter, Code, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Catchword } from './.book';

export default () => (
    <Chapter>
        <Title>[[ The Book ]]</Title>
        <Section>
            <Heading>What a book is here</Heading>
            <Paragraph>
                Every book in a library extends the library's own, the way every book in a real library extends
                the library's, so what a book is here is decided once and a change to it reaches all of them. Mine is
                the layout: the masthead, then the byline drawn from what the book exposes of its cover, then the
                chapters; and it stands the library's dress and its theme on itself as defaults. A book of mine that
                wants more adds to this in its own class, as <Means>$[ Some Projects ]</Means> adds its pages.
            </Paragraph>
            <Paragraph>
                One thing it decides about turning. A cover's route opens at the top of the page, masthead and byline
                in view, rather than at the cover's title as the framework turns by default; every other bookmark
                turns as the framework does. How a book turns is the book's to configure, and this is where I did.
            </Paragraph>
        </Section>
        <Section>
            <Heading>The book's file</Heading>
            <Paragraph>
                The file below stands beside this chapter, the binder appended it, and the figure prints it exactly
                as it is on disk. It is the book class every book of this library extends, and the same file is
                imported from the manual's door by every one of them.
            </Paragraph>
            <Paragraph><Code identifier="code" /></Paragraph>
        </Section>
        <Catchword />
    </Chapter>
);
