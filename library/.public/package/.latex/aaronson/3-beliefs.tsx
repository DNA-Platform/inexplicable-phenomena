import { $ } from '@dna-platform/chemistry';
import { Heading, Paragraph, Section } from '@dna-platform/public';
import Chapter from './.chapter';

export default $(
    <Chapter>
        <Section>
            <Heading>Beliefs About P versus NP</Heading>
            <Paragraph>Almost everyone who works on the problem believes the classes are different, and it is worth being precise about what that belief rests on: the failure of fifty years of algorithmic effort against thousands of natural problems.</Paragraph>
            <Section>
                <Heading>Independent of Set Theory?</Heading>
                <Paragraph>It is sometimes suggested that the question is not merely open but formally independent of the axioms we reason with. This survey asks what such a claim would have to mean, and what would count as evidence for it.</Paragraph>
            </Section>
        </Section>
    </Chapter>,
    Chapter
);
