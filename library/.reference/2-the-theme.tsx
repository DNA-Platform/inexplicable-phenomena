import { Append, Chapter, Heading, Line, List, Means, Paragraph, Section, Title } from '@dna-platform/public';
import { Listing } from './7-the-reference-manual~code.tsx';

export default () => (
    <Chapter>
        <Title>[[ The Theme ]]</Title>
        <Section>
            <Heading>1. The values and the parts of a theme</Heading>
            <Paragraph>
                <List />
                <Line>1.1 A theme is a set of values, the font, the size, the leading, the measure, the space, the ink, the paper, the link, and the parts that use them: the page, the levels of a book, the labels, the links, the apparatus, the figures, the front, the plate, the navigation and the listing.</Line>
                <Line>1.2 The file beside this chapter is the one the book registers, <Means>$[[ ./The Book ]]</Means> 1.2. It began as the test library's theme as borrowed, a serif on warm paper, and has been rewritten part by part as the sketches said what this library's own looks like: white paper, Georgia at seventeen, one hairline under the running head, the link's teal on the running head and the links alone.</Line>
                <Line>1.3 A theme is composed of parts so that a subclass changes one and keeps the rest; every selector in it is a mark of what a writing is.</Line>
            </Paragraph>
        </Section>
        <Section>
            <Heading>2. The theme's listing part</Heading>
            <Paragraph>
                <List />
                <Line>2.1 The listing part dresses the reference manual's listing in the numbers measured off my own library's manual on 17 November 2026, <Means>$[[ ./The Reference Manual ]]</Means> 3.1: JetBrains Mono at 12px on a 20.4px line, the ink pale on a night of deep teal, keywords sky, strings amber, names mint, comments dimmed, the numbers in a 44px column of brass, and the light palette when the book wears the light switch.</Line>
                <Line>2.2 The same part lets the sheet's measure go while the book is editing, so the editor's layer may grid the window. The appendix section of a table takes no rule of its own: it is a section of the table like any other, in the same voice, <Means>$[[ ./The Reference Manual ]]</Means> 6.3, on my word of 19 November 2026 against a faded smaller section behind a divider.</Line>
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
