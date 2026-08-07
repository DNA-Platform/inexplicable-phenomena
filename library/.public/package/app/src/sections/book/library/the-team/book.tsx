import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { shelve } from './card';
import { TeamCover } from './01-the-cover';
import { TeamSynopsis } from './02-the-synopsis';
import { TheFirstSheet } from './03-the-first-sheet';
import { NightWork } from './04-night-work';
import { TheShelfChapter } from './05-the-shelf';
import { TheDecision } from './06-the-decision';
import { TheAuthorInCode } from './07-the-author-in-code';
import { TheCardInCode } from './08-the-card-in-code';

export const team: $Book = $(
    <Book>
        <TeamCover />
        <TeamSynopsis />
        <TheFirstSheet />
        <NightWork />
        <TheShelfChapter />
        <TheDecision />
        <TheAuthorInCode />
        <TheCardInCode />
    </Book>
);

shelve(team);
