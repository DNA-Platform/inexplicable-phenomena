import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, TableOfContents } from '@dna-platform/public';
import { physicsGaugeTheory } from '../../cards';
import { GaugeTheoryCover } from './.cover';
import { GaugeTheorySynopsis } from './.synopsis';
import { TheGaugePrinciple } from './the-gauge-principle';

export const book: $Book = $(
    <Book card={physicsGaugeTheory}>
        <GaugeTheoryCover />
        <TableOfContents />
        <GaugeTheorySynopsis />
        <TheGaugePrinciple />
    </Book>
) as $Book;
