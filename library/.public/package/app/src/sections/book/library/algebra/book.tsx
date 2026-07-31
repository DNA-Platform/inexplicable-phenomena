import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { AlgebraCover } from './01-the-cover';
import { AlgebraSynopsis } from './02-the-synopsis';
import { Coordinates } from './03-coordinates';
import { TheIndexLaw } from './04-the-index-law';
import { TheSummaryLaw } from './05-the-summary-law';
import { TheMeasure } from './06-the-measure';

export const algebra: $Book = $(
    <Book>
        <AlgebraCover />
        <AlgebraSynopsis />
        <Coordinates />
        <TheIndexLaw />
        <TheSummaryLaw />
        <TheMeasure />
    </Book>
);
