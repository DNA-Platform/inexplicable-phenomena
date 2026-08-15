import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, TableOfContents } from '@dna-platform/lib';
import { GaugeTheoryCover } from './.cover';
import { GaugeTheorySynopsis } from './.synopsis';
import { TheGaugePrinciple } from './the-gauge-principle';

export const book: $Book = $(
    <Book>
        <GaugeTheoryCover />
        <TableOfContents />
        <GaugeTheorySynopsis />
        <TheGaugePrinciple />
    </Book>
) as $Book;
