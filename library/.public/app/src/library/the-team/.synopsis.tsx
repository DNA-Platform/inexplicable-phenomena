import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis, Section, Title, Summary, Paragraph } from '@dna-platform/public';

export class $TheTeamSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'An author is a book, and the book that authors itself is the one an author link may point at. This book exists so that rule has something true to be true of.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'The book that wrote itself, so the others have somebody to name.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const TheTeamSynopsis = $($TheTeamSynopsis);
