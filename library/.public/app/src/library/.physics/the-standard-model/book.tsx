import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, TableOfContents } from '@dna-platform/lib';
import { StandardModelCover } from './.cover';
import { StandardModelSynopsis } from './.synopsis';
import { Symmetry } from './symmetry';

export const book: $Book = $(
    <Book>
        <StandardModelCover />
        <TableOfContents />
        <StandardModelSynopsis />
        <Symmetry />
    </Book>
) as $Book;
