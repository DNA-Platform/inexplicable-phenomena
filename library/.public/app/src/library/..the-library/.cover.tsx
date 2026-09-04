import { library, theTeam } from '../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Canonical, Paragraph } from '@dna-platform/public';

export class $TestLibraryCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>A Test Library</Title>
                <Paragraph>{'A corpus that exists to be compiled. Nothing here is published; everything here is authored the way real content would be.'}</Paragraph>
                <Paragraph><Author for={theTeam}>The Team</Author></Paragraph>
                <Paragraph><Subject for={library}>A Test Library</Subject></Paragraph>
            </Section>
        );
    }
}

export const TestLibraryCover = $($TestLibraryCover);
