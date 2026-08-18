import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title } from '@dna-platform/lib';

export class $TheTeamSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nAn author is a book, and the book that authors itself is the one an author link may point at. This book exists so that rule has something true to be true of.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nThe book that wrote itself, so the others have somebody to name.'}
                </Section>
            </>
        );
    }
}

export const TheTeamSynopsis = $($TheTeamSynopsis);
