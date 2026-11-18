import { Append, Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Listing } from './7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Book ]]</Title>
        <Section>
            <Heading>1. What a book is here</Heading>
            <Paragraph>
                <List />
                <Line>1.1 Every book in this library extends the library's own, so what a book is here is decided once and a change to it reaches all of them.</Line>
                <Line>1.2 The book class is the layout: the running head, the front drawn from what the book's cover says, then the chapters, and after them the file's page the editor shows. Its file is where the library's theme is registered, once, on the class every book extends.</Line>
                <Line>1.3 A cover's route opens at the top of the page; every other bookmark turns as the framework does, and a page opens at its top, never scrolled down, on my word of 16 November 2026.</Line>
                <Line>1.4 Every chapter but the cover and the table is navigated, said by the book at its bond before the bond reaches the chapters: the arrow looking back, the square to the table, the arrow looking on, above and below.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The book's class and what it says of every book</Heading>
            <Paragraph>
                <List />
                <Line>2.1 The class stands beside this chapter as its code, borrowed on 30 October 2026 from the binder's own test library, whose manual the team wrote, and rebuilt from here by sketches rather than kept.</Line>
                <Line>2.2 The theme it registers is <Means>$[[ ./The Theme ]]</Means>; the running head it draws is <Means>$[[ ./The Running Head and the Byline ]]</Means>; the front and the navigation are <Means>$[[ ./The Faces ]]</Means>.</Line>
                <Line>2.3 It says of every book the editor, the paging and the page mode, in that order, so the editor's layer is the book's nearest and the page is the mode a book opens in unless its own class says the editor after; and at its bond it hangs a branch on every entry of the table of contents, so the table can be the editor's tree. Both are <Means>$[[ ./The Reference Manual ]]</Means>'s, sections 4 and 5.</Line>
            </Paragraph>
        </Section>
        <Listing />
        <Append
            identifier="code"
            type=".tsx"
        >
            ![[ code.tsx ]]
        </Append>
    </Chapter>
);
