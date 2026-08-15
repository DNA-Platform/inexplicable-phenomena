import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, $Chapter, $Bookmark, Bookmark, $Location, Location } from '@dna-platform/lib';
import { $Card, at } from './catalogue';
import { remember, recall } from './storage';

// WHAT A READER LEAVES BEHIND. A bookmark holds a LOCATION in a book, which is
// the model's own pair of words for it: a location is the one thing that carries
// a number, because a number is what it is. Following the bookmark reads back
// the chapter it was left in.
//
// One is kept per TOP-LEVEL subject, not per subject — a subject may catalogue
// other subjects, and a finger in every folder is not what anybody means by
// keeping their place.
export type Kept = { path: string; at: number };

export const topOf = (path: string): string | undefined => {
    let card: $Card | undefined = at(path);
    let top: $Card | undefined;
    while (card && card.subject && card.subject !== card) {
        top = card;
        card = card.subject;
    }
    return top?.path;
};

export const mark = (book: $Book, place: number): $Bookmark<$Chapter> => {
    const where = $(<Location i={place} of={book} />) as $Location<$Chapter>;
    const left = $(<Bookmark />) as $Bookmark<$Chapter>;
    left.$for = where;
    return left;
};

export const keep = (path: string, place: number): void => {
    const top = topOf(path);
    if (top) remember<Kept>(`bookmark${top}`, { path, at: place });
};

export const kept = (subject: string): Kept | undefined => recall<Kept>(`bookmark${subject}`);

export const slug = (chapter: $Chapter): string =>
    (chapter.title?.copy ?? '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
