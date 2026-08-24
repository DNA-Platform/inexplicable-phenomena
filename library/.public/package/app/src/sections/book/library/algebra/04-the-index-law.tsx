import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';

export class $TheIndexLaw extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Index Law: Numbers That Move</Title>
                    <Paragraph>{'The composition assigns the index. The cover is chapter zero, the rest count from one, and no author has to bookkeep: assembly numbers the parts the way a shelf numbers its spines — by where they stand.'}</Paragraph>
                    <Paragraph>{'The law reaches every level of writing. A book indexes its chapters, a chapter its sections, a section its paragraphs, a sentence its words. Ask any piece of writing where it stands and it answers with a number it did not choose.'}</Paragraph>
                </Section>
                <Section>
                    <Title>Decimals: The Latecomer’s Door</Title>
                    <Paragraph>{'A decimal slides a latecomer between neighbours without renaming a thing. Chapter one-point-five is a real address, and the library has always known this trick: the new book takes a shelf mark between two old ones, and nothing else moves.'}</Paragraph>
                    <Paragraph>{'An authored index survives assembly. Number a section nine by hand and the binding respects the hand; the law fills only what the author left unsaid.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'Assembly numbers the parts; decimals insert between them.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const TheIndexLaw = $($TheIndexLaw);
