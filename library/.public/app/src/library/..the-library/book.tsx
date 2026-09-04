import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, $Synopsis, TableOfContents } from '@dna-platform/public';
import { physics, philosophy, theTeam, library } from '../cards';
import { TestLibraryCover } from './.cover';
import { TestLibrarySynopsis } from './.synopsis';
import { WhatThisLibraryIs } from './what-this-library-is';
import { WhatThisLibraryExercises } from './what-this-library-exercises';
import { PhysicsSynopsis } from '../.physics/.subject/.synopsis';
import { PhilosophySynopsis } from '../.philosophy/.subject/.synopsis';
import { TheTeamSynopsis } from '../the-team/.synopsis';

export const book: $Book = $(
    <Book card={library}>
        <TestLibraryCover />
        <TableOfContents />
        <TestLibrarySynopsis />
        <WhatThisLibraryIs />
        <WhatThisLibraryExercises />
        <PhysicsSynopsis for={physics} />
        <PhilosophySynopsis for={philosophy} />
        <TheTeamSynopsis for={theTeam} />
    </Book>
) as $Book;

export const entries: $Synopsis[] = book.chapters.filter(
    (c): c is $Synopsis => c instanceof $Synopsis && c !== book.synopsis,
);
