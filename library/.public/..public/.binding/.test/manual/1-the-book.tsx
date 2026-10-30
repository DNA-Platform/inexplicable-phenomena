import { Append, Chapter, Code, Heading, Means, Paragraph, Part, Section, Title } from '@dna-platform/public';
import { Appendix, Catchword } from './.book';

export default () => (
    <Chapter>
        <Part>The tools</Part>
        <Title>[[ The Book ]]</Title>
        <Section>
            <Heading>What a book is here</Heading>
            <Paragraph>
                Every book in a library extends the library's own, the way every book in a real library extends
                the library's, so what a book is here is decided once and a change to it reaches all of them. The
                book class is the layout: the masthead, then the byline drawn from what the book exposes of its
                cover, then the chapters. And its file is where the library's theme is registered for the
                framework's, once, on the library's book class: every book of the library is a subclass of that
                class and inherits the registration, so the Theme the framework stands on every book is this
                library's here. A book that wants more adds to this in its own class, as
                <Means>$[[ Some Projects ]]</Means> adds its pages — and a book that wants another theme registers
                it on its own class in the same way, as <Means>$[[ Libby ]]</Means> registers a dark one and
                <Means>$[[ Some Projects ]]</Means> the framework's own, bare, to show what the base is.
            </Paragraph>
            <Paragraph>
                One thing it decides about turning. A cover's route opens at the top of the page, masthead and byline
                in view, rather than at the cover's title as the framework turns by default; every other bookmark
                turns as the framework does. How a book turns is the book's to configure, and this is where it is
                configured. The class is printed whole in the chapter's appendix, <Means>$[[ ./The book's file ]]</Means>.
            </Paragraph>
        </Section>
        <Section>
            <Appendix />
            <Heading>[[[ The book's file ]]]</Heading>
            <Paragraph>
                The file stands beside this chapter and is appended to it as its appendix, tucked away, since one
                engages with code differently than with a page; the figure prints it exactly as it is on disk. It
                is the book class every book of this library extends, and the same file is imported from the
                manual's door by every one of them.
            </Paragraph>
            <Paragraph>
                <Code
                    identifier="code"
                    numbered
                />
            </Paragraph>
        </Section>
        <Catchword />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
