import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';

export class $BuildCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Build: How a Folder Becomes a Library</Title>
                {'\n\nThe other books on this shelf were written by hand, one file at a time. This one describes the machine that will write them, and it was written by hand to find out what the machine must do.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject>Demonstration</Subject>
            </Section>
        );
    }
}

export const BuildCover = $($BuildCover);
