import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, $Synopsis, TableOfContents } from '@dna-platform/lib';
import { PhysicsCover } from './.cover';
import { PhysicsSynopsis } from './.synopsis';
import { WhatPhysicsIs } from './what-physics-is';
import { StandardModelSynopsis } from '../the-standard-model/.synopsis';
import { GaugeTheorySynopsis } from '../gauge-theory/.synopsis';

// A SUBJECT'S BOOK CATALOGUES ITS BOOKS BY STANDING THEIR SYNOPSES IN ITSELF.
// Its own account comes first: until the catalogue hands the others their cards
// every synopsis reads home, and the first reflexive one is what the book
// answers with.
export const book: $Book = $(
    <Book>
        <PhysicsCover />
        <TableOfContents />
        <PhysicsSynopsis />
        <WhatPhysicsIs />
        <StandardModelSynopsis />
        <GaugeTheorySynopsis />
    </Book>
) as $Book;

export const entries: $Synopsis[] = book.chapters.filter(
    (c): c is $Synopsis => c instanceof $Synopsis && c !== book.synopsis,
);
