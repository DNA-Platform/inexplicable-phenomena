import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title } from '@dna-platform/lib';

export class $WhatPhysicsIs extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>What Physics Is</Title>
                    {'\n\nA subject is not a folder that announces itself. It is a folder that holds books, and holding them is the whole of what being a subject means.'}
                    {'\n\nThis chapter exists so that a subject has writing of its own, and not only a catalogue of other people’s.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA subject holds books, and a subject has writing of its own besides.'}
                </Section>
            </>
        );
    }
}

export const WhatPhysicsIs = $($WhatPhysicsIs);
