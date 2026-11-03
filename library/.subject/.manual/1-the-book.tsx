import { Append, Chapter, Heading, Means, Paragraph, Section, Title } from '@dna-platform/public';

export default () => (
    <Chapter>
        <Title>[[ The Book ]]</Title>
        <Section>
            <Heading>What a book is here</Heading>
            <Paragraph>
                Every book in this library extends the library's own, so what a book is here is decided once and a
                change to it reaches all of them. The book class is the layout: the masthead, the byline drawn from
                what the book's cover says, then the chapters. Its file is where the library's theme is registered,
                once, on the class every book extends. A cover's route opens at the top of the page; every other
                bookmark turns as the framework does.
            </Paragraph>
            <Paragraph>
                The class stands beside this chapter as its code, borrowed on 2026-10-30 from the binder's own test
                library, whose manual the team wrote, and to be rebuilt from here by sketches rather than kept.
                The theme it registers is <Means>$[[ ./The Theme ]]</Means>; the masthead and the byline it draws
                are <Means>$[[ ./The Masthead and the Byline ]]</Means>.
            </Paragraph>
        </Section>
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
