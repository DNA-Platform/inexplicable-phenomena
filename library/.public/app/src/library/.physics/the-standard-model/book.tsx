import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, TableOfContents } from '@dna-platform/lib';
import { physicsTheStandardModel } from '../../cards';
import { StandardModelCover } from './.cover';
import { StandardModelSynopsis } from './.synopsis';
import { Symmetry } from './symmetry';

export const book: $Book = $(
    <Book card={physicsTheStandardModel}>
        <StandardModelCover />
        <TableOfContents />
        <StandardModelSynopsis />
        <Symmetry />
    </Book>
) as $Book;
