import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Writing } from '@/writing/Writing';
import { Title } from '@/writing/Title';
import { Paragraph } from '@/writing/Paragraph';
import { Type } from '@/notation/Type';

// Writing told it is a Section composes the paragraphs written inside it.
export class $WritingSpec extends $Chemical {
    view(): ReactNode {
        return (
            <Writing>
                <Title>
                    What a section is written as
                </Title>
                <Paragraph>
                    A section is written as paragraphs, and every one of them is delineated by whoever wrote it.
                </Paragraph>
                <Paragraph>
                    Nothing is divided at this level. A paragraph arrives already a paragraph, and the section only gathers what it was given.
                </Paragraph>
                <Type>Section</Type>
            </Writing>
        );
    }
}

export const WritingSpec = $($WritingSpec);
