import { $ } from '@dna-platform/chemistry';
import { Chapter, Section, Title, Paragraph, Sentence } from '@dna-platform/public';

export const Symmetry = $(
    <Chapter>
        <Section>
            <Title>Symmetry</Title>
            <Paragraph>
                <Sentence>A symmetry leaves the action unchanged.</Sentence>
                <Sentence>A local symmetry demands a field to carry it.</Sentence>
            </Paragraph>
        </Section>
    </Chapter>
);
