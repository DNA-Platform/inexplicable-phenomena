import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title, Summary, Paragraph } from '@dna-platform/lib';

export class $WhatPhysicsIs extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>What Physics Is</Title>
                    <Paragraph>{'A subject is not a folder that announces itself. It is a folder that holds books, and holding them is the whole of what being a subject means.'}</Paragraph>
                    <Paragraph>{'This chapter exists so that a subject has writing of its own, and not only a catalogue of other people’s.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'A subject holds books, and a subject has writing of its own besides.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const WhatPhysicsIs = $($WhatPhysicsIs);
