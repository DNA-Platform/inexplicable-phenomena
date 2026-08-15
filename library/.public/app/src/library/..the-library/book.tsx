import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, $Synopsis, TableOfContents } from '@dna-platform/lib';
import { TestLibraryCover } from './.cover';
import { TestLibrarySynopsis } from './.synopsis';
import { WhatThisLibraryIs } from './what-this-library-is';
import { WhatThisLibraryExercises } from './what-this-library-exercises';
import { PhysicsSynopsis } from '../.physics/.subject/.synopsis';
import { PhilosophySynopsis } from '../.philosophy/.subject/.synopsis';

export const book: $Book = $(
    <Book>
        <TestLibraryCover />
        <TableOfContents />
        <TestLibrarySynopsis />
        <WhatThisLibraryIs />
        <WhatThisLibraryExercises />
        <PhysicsSynopsis />
        <PhilosophySynopsis />
    </Book>
) as $Book;

export const entries: $Synopsis[] = book.chapters.filter(
    (c): c is $Synopsis => c instanceof $Synopsis && c !== book.synopsis,
);
