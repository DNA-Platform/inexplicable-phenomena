import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { TableOfContents } from '@/book/TableOfContents';
import { $TheManifold } from '../../../the-manifold';
import { ManifoldCover } from './01-the-cover';
import { ManifoldSynopsis } from './02-the-synopsis';
import { TheFold } from './03-the-fold';
import { TheChart } from './04-the-chart';
import { Curvature } from './05-curvature';
import { TheGeodesic } from './06-the-geodesic';
import { TheReference } from './07-the-reference';
import { TheAtlas } from './08-the-atlas';

const TheManifold = $($TheManifold);

// The manifold is a book, and this is that book viewing itself — its pages,
// its modes and its marks are the book's own view.
export const manifold: $TheManifold = $(
    <TheManifold>
        <ManifoldCover />
        <TableOfContents />
        <ManifoldSynopsis />
        <TheFold />
        <TheChart />
        <Curvature />
        <TheGeodesic />
        <TheReference />
        <TheAtlas />
    </TheManifold>
) as $TheManifold;
