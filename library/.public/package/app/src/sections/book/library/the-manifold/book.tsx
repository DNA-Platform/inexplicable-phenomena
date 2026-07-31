import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { ManifoldCover } from './01-the-cover';
import { ManifoldSynopsis } from './02-the-synopsis';
import { TheFold } from './03-the-fold';

export const manifold: $Book = $(
    <Book>
        <ManifoldCover />
        <ManifoldSynopsis />
        <TheFold />
    </Book>
);
