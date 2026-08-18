import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, TableOfContents } from '@dna-platform/lib';
import { TheTeamCover } from './.cover';
import { TheTeamSynopsis } from './.synopsis';
import { WhoWeAre } from './who-we-are';

export const book: $Book = $(
    <Book>
        <TheTeamCover />
        <TableOfContents />
        <TheTeamSynopsis />
        <WhoWeAre />
    </Book>
) as $Book;
