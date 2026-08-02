import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { ManifoldCover } from './01-the-cover';
import { ManifoldSynopsis } from './02-the-synopsis';
import { TheFold } from './03-the-fold';
import { TheChart } from './04-the-chart';
import { Curvature } from './05-curvature';
import { TheGeodesic } from './06-the-geodesic';
import { TheReference } from './07-the-reference';
import { TheAtlas } from './08-the-atlas';

export const manifold: $Book = $(
    <Book>
        <ManifoldCover />
        <ManifoldSynopsis />
        <TheFold />
        <TheChart />
        <Curvature />
        <TheGeodesic />
        <TheReference />
        <TheAtlas />
    </Book>
);
