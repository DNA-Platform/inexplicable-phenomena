import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { Canonical } from '@/book/Canonical';

export class $ShelfCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Shelf</Title>
                {'\n\nA shelf is already a catalogue. Ordered references, standing in a row — each spine a name that stands for a book without being one, and pulling it is how you follow the reference to what it names.'}
                {'\n\nSo this is not a second thing. It is the shelf, written down. The same references, met as writing instead of as spines, and it does not stand on itself: a catalogue is not one of its own entries.'}
                {'\n\n'}<Author>The Team</Author>
                {'\n\n'}<Subject>Demonstration</Subject>{' '}<Canonical>The Team</Canonical>
            </Section>
        );
    }
}

export const ShelfCover = $($ShelfCover);
