import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, $Synopsis, TableOfContents } from '@dna-platform/lib';
import { PhilosophyCover } from './.cover';
import { PhilosophySynopsis } from './.synopsis';
import { HardProblemSynopsis } from '../the-hard-problem/.synopsis';

export const book: $Book = $(
    <Book>
        <PhilosophyCover />
        <TableOfContents />
        <PhilosophySynopsis />
        <HardProblemSynopsis />
    </Book>
) as $Book;

export const entries: $Synopsis[] = book.chapters.filter(
    (c): c is $Synopsis => c instanceof $Synopsis && c !== book.synopsis,
);
