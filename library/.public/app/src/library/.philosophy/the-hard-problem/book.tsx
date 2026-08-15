import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, TableOfContents } from '@dna-platform/lib';
import { HardProblemCover } from './.cover';
import { HardProblemSynopsis } from './.synopsis';
import { WhatItIsLike } from './what-it-is-like';

export const book: $Book = $(
    <Book>
        <HardProblemCover />
        <TableOfContents />
        <HardProblemSynopsis />
        <WhatItIsLike />
    </Book>
) as $Book;
