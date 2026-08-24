import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Cover } from '@/book/Cover';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Title } from '@/writing/Title';
import { Author } from '@/book/Author';
import { Subject } from '@/book/Subject';
import { Canonical } from '@/book/Canonical';

export class $ShelfCover extends $Cover {
    view(): ReactNode {
        return (
            <Section>
                <Title>The Shelf</Title>
                <Paragraph>{'A shelf is already a catalogue. Ordered references, standing in a row — each spine a name that stands for a book without being one, and pulling it is how you follow the reference to what it names.'}</Paragraph>
                <Paragraph>{'So this is not a second thing. It is the shelf, written down: the same references, met as writing instead of as spines.'}</Paragraph>
                <Paragraph>{'What is written down here is an account of each book it holds — the account that book gives of itself, standing in this one. A catalogue is not a list of names beside the books; it is the books saying, in their own words, what they are, gathered where they can be read together. That is why this book has chapters it did not write.'}</Paragraph>
                <Paragraph>{'And it stands among them. A shelf that catalogues four books is a book that catalogues four books, and there is nothing about that fact that puts it outside its own row. It gives its own account like the rest.'}</Paragraph>
                {''}<Author>The Team</Author>
                {''}<Subject>Demonstration</Subject>{' '}<Canonical>The Team</Canonical>
            </Section>
        );
    }
}

export const ShelfCover = $($ShelfCover);
