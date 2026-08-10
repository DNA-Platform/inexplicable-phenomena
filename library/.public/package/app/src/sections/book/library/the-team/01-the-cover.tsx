import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { theTeam, theShelf } from './card';

export class $TeamCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Team: An Account of Four Books, One of Them This One</Title>
                {'\n\nBy '}<Author for={theTeam}>The Team</Author>{'. Fiction, inspired by a true story, about the making of a shelf that turned out to be a library. It is on that shelf.'}
                {'\n\n'}<Subject for={theShelf}>Demonstration</Subject>
            </Section>
        );
    }
}

export const TeamCover = $($TeamCover);
