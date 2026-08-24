import { library, theTeam } from '../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject, Paragraph } from '@dna-platform/lib';

export class $TheTeamCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Team: An Autobiography</Title>
                <Paragraph>{'The one book in this library that names itself as its own author, which is what makes it the book every other book can point at.'}</Paragraph>
                <Paragraph><Author for={theTeam}>The Team</Author></Paragraph>
                <Paragraph><Subject for={library}>A Test Library</Subject></Paragraph>
            </Section>
        );
    }
}

export const TheTeamCover = $($TheTeamCover);
