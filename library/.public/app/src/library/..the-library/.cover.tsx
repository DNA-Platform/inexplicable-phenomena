import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical } from '@dna-platform/lib';

export class $TestLibraryCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>A Test Library</Title>
                {'\n\nA corpus that exists to be compiled. Nothing here is published; everything here is authored the way real content would be.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject>A Test Library</Subject>
            </Section>
        );
    }
}

export const TestLibraryCover = $($TestLibraryCover);
