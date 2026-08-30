import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

// A section may be written as a title and a string of text. That text is one paragraph and is not divided further.
export class $TextSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Section>
                <Title>
                    A section written as prose
                </Title>
                Everything after the title, first character to last, is ONE paragraph. It is not divided at this level, however many sentences it carries.
            </Section>
        );
    }
}

export const TextSpec = $($TextSpec);
