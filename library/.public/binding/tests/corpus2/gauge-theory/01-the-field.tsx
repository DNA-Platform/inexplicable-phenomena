import { $ } from '@dna-platform/chemistry';
import { Chapter, Section, Title, Paragraph, Sentence } from '@dna-platform/public';

export const TheField = $(
    <Chapter>
        <Section>
            <Title>The Field</Title>
            <Paragraph>
                <Sentence>A field assigns a value to every point of space.</Sentence>
            </Paragraph>
        </Section>
    </Chapter>
);
