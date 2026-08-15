import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title } from '@dna-platform/lib';

export class $WhatThisLibraryIs extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>What This Library Is</Title>
                    {'\n\nA library is a folder of folders, and this one holds two: physics and philosophy. Neither was declared a subject anywhere. Each simply holds books, and a dot marks it so a compiler need not open it to know.'}
                    {'\n\nThe book you are reading is this library’s own — the entry with the most dots in its folder, which is how a container says something about itself rather than about what it holds.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA folder of folders, and the entry with the most dots is the folder speaking for itself.'}
                </Section>
            </>
        );
    }
}

export const WhatThisLibraryIs = $($WhatThisLibraryIs);
