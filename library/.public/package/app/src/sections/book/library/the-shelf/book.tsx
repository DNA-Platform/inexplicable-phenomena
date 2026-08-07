import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { ShelfCover } from './01-the-cover';
import { ShelfSynopsis } from './02-the-synopsis';
import { TheAlgebraEntry } from './03-the-algebra';
import { TheManifoldEntry } from './04-the-manifold';
import { TheTeamEntry } from './05-the-team';

export const shelf: $Book = $(
    <Book>
        <ShelfCover />
        <ShelfSynopsis />
        <TheAlgebraEntry />
        <TheManifoldEntry />
        <TheTeamEntry />
    </Book>
);
