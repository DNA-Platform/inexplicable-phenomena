import { $ } from '@dna-platform/chemistry';
import { Citation, Heading, List, Math, Paragraph, Section } from '@dna-platform/public';
import { Footnote } from '@dna-platform/public/article';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Introduction</Heading>
            <Paragraph>
                The question of whether <Math>{String.raw`\mathsf{P} = \mathsf{NP}`}</Math> has been open since it was posed
                by Cook<Citation>[1](#cook)</Citation> and independently by Levin. A proof either way would settle
                whether every problem whose solutions can be checked quickly can also be solved quickly.
            </Paragraph>
            <Paragraph>
                It is sometimes suggested that the question is not merely open but formally independent of the axioms
                we reason with.<Footnote>The suggestion is older than it looks; Hartmanis and Hopcroft raised it in 1976.</Footnote>
                This paper asks what such a claim would have to mean, and what would count as evidence for it.
            </Paragraph>
            <Section>
                <Heading>What independence would mean</Heading>
                <Paragraph>
                    Three readings of the claim are usually run together, and they are not the same:
                </Paragraph>
                <List>
                    - that the question is undecidable in ZFC
                    - that no proof exists in any system we would accept
                    - that the answer depends on the model, as the continuum hypothesis does
                </List>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
