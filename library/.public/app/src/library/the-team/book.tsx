import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, TableOfContents } from '@dna-platform/public';
import { theTeam } from '../cards';
import { TheTeamCover } from './.cover';
import { TheTeamSynopsis } from './.synopsis';
import { WhoWeAre } from './who-we-are';

export const book: $Book = $(
    <Book card={theTeam}>
        <TheTeamCover />
        <TableOfContents />
        <TheTeamSynopsis />
        <WhoWeAre />
    </Book>
) as $Book;
