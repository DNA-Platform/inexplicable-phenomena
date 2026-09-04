import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, $Synopsis, TableOfContents } from '@dna-platform/public';
import { physicsTheStandardModel, physicsGaugeTheory, physics } from '../../cards';
import { PhysicsCover } from './.cover';
import { PhysicsSynopsis } from './.synopsis';
import { WhatPhysicsIs } from './what-physics-is';
import { StandardModelSynopsis } from '../the-standard-model/.synopsis';
import { GaugeTheorySynopsis } from '../gauge-theory/.synopsis';

export const book: $Book = $(
    <Book card={physics}>
        <PhysicsCover />
        <TableOfContents />
        <PhysicsSynopsis />
        <WhatPhysicsIs />
        <StandardModelSynopsis for={physicsTheStandardModel} />
        <GaugeTheorySynopsis for={physicsGaugeTheory} />
    </Book>
) as $Book;

export const entries: $Synopsis[] = book.chapters.filter(
    (c): c is $Synopsis => c instanceof $Synopsis && c !== book.synopsis,
);
