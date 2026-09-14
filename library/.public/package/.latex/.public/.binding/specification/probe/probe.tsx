import { $ } from '@dna-platform/chemistry';
import { Aside, Author, Book, Cell, Citation, Code, Cover, Document, Equation, Figure, Heading, Highlight, Illustration, List, Math, Note, PageFold, Paragraph, Quote, Ref, Reference, References, Section, Subject, Summary, Synopsis, Table, Title } from '@dna-platform/public';
import { Appendix, Theorem } from '@dna-platform/public/article';

const document = (
    <Document>
        <Section>
            <Heading>Every kind, drawn at once</Heading>
            <Paragraph>
                This document exists to be looked at. It writes one of everything the library exports so
                that a theme can be judged on what it actually styles rather than on what it declares,
                and so that a kind nothing styles shows up as the plain thing it is.
            </Paragraph>

            <Section>
                <Heading>Prose, and the levels beneath it</Heading>
                <Paragraph>
                    A paragraph parses into sentences, a sentence into phrases, a phrase into words and a
                    word into letters. None of those are written here — the parse finds them — which is the
                    point: a creator of a paragraph does not specify sentences.
                </Paragraph>
                <Paragraph>
                    A second paragraph, so the space between them and the first line indent can be seen at
                    the same time. Inline mathematics stands here — <Math>{String.raw`e^{i\pi} + 1 = 0`}</Math> —
                    beside inline <Code>parts()</Code> and a <Ref>[plain link](https://example.org)</Ref>.
                </Paragraph>

                <Section>
                    <Heading>A third level of heading</Heading>
                    <Paragraph>So the scale can be judged over three levels rather than two.</Paragraph>
                </Section>
            </Section>

            <Section>
                <Heading>Code</Heading>
                <Code language="ts">{`override print(content: ReactNode): ReactNode {
    return <pre className={this.className}>{content}</pre>;
}`}</Code>
            </Section>

            <Section>
                <Heading>Lists</Heading>
                <List>
                    - the first item
                    - the second item, long enough to wrap on a narrow window so the hanging indent can be judged
                    - the third item
                </List>
            </Section>

            <Section>
                <Heading>A quotation</Heading>
                <Quote>
                    The question of whether a machine can think is about as interesting as the question of
                    whether a submarine can swim.
                </Quote>
            </Section>

            <Section>
                <Heading>Display mathematics</Heading>
                <Equation>{String.raw`\mathrm{IP} = \mathrm{PSPACE}`}</Equation>
                <Paragraph>An equation stands on its own line and a theme places its number.</Paragraph>
            </Section>

            <Section>
                <Heading>A figure and an illustration</Heading>
                <Figure source="/figure-1.png">P, NP, NP-hard, and NP-complete</Figure>
                <Paragraph>
                    A figure is numbered and referred to. An illustration is the same picture without
                    either, which is why they are two kinds and not one.
                </Paragraph>
                <Illustration source="/figure-2.png">The same drawing, standing as an illustration</Illustration>
            </Section>

            <Section>
                <Heading>A table</Heading>
                <Table columns={3}>
                    <Cell>Class</Cell>
                    <Cell>Resource</Cell>
                    <Cell>Bound</Cell>
                    <Cell>P</Cell>
                    <Cell>time</Cell>
                    <Cell>polynomial</Cell>
                    <Cell>PSPACE</Cell>
                    <Cell>space</Cell>
                    <Cell>polynomial</Cell>
                </Table>
            </Section>

            <Section>
                <Heading>Writing that stands away from the writing</Heading>
                <Paragraph>An aside stands beside, a note stands away, and a summary stands for the whole.</Paragraph>
                <Aside>
                    <Paragraph>An aside, which a paper sets in the margin and a README sets in a box.</Paragraph>
                </Aside>
                <Note>A note, which is a paragraph drawn away from where it stands.</Note>
                <Summary>A summary of everything above, in one sentence.</Summary>
            </Section>

            <Section>
                <Heading>A theorem</Heading>
                <Theorem>
                    <Paragraph>If P = NP then every language in NP has a polynomial-time decision procedure.</Paragraph>
                </Theorem>
            </Section>

            <Section>
                <Heading>Marks that point elsewhere</Heading>
                <Paragraph>
                    A citation is a mark in the prose reaching a place the bibliography
                    denotes<Citation>[1](turing)</Citation>, and a highlight marks a
                    stretch worth <Highlight>keeping</Highlight>.
                </Paragraph>
            </Section>
        </Section>
    </Document>
);

export const probe = $(
    <Book>
        <Cover>
            <Title>The Probe<Reference>https://localhost:5310/?probe</Reference></Title>
            <Author>The framework itself</Author>
            <Subject print={false}>Every kind at once</Subject>
        </Cover>
        <Synopsis print>
            <Section>
                <Heading>Abstract</Heading>
                <Paragraph>
                    One of everything, so a theme can be judged on what it styles. Toggle the reading and
                    every kind here should still look like something.
                </Paragraph>
            </Section>
        </Synopsis>
        {document}
        <References>
            <Section>
                <Heading>References</Heading>
                <Paragraph>Turing, A. M. On computable numbers. Proc. LMS, 1936.<PageFold>turing</PageFold></Paragraph>
            </Section>
        </References>
        <Appendix>
            <Section>
                <Heading>An appendix</Heading>
                <Paragraph>Which a paper leaves unnumbered.</Paragraph>
            </Section>
        </Appendix>
    </Book>,
    Book
);
