import { library, theTeam } from '../cards';
import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover, Section, Title, Author, Subject } from '@dna-platform/lib';

export class $TheTeamCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Team: An Autobiography</Title>
                {'\n\nThe one book in this library that names itself as its own author, which is what makes it the book every other book can point at.'}
                {'\n\n'}<Author for={theTeam}>The Team</Author>
                {'\n\n'}<Subject for={library}>A Test Library</Subject>
            </Section>
        );
    }
}

export const TheTeamCover = $($TheTeamCover);
