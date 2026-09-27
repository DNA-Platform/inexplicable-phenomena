import { ComponentType, ReactNode } from 'react';
import { $, $Chemical, selection } from '@dna-platform/chemistry';
import { $Book, $Format, $Theme } from '@dna-platform/public';
import { at, Byline as byline, Navigable, RunningHead as runningHead } from './1-the-shelves.tsx.tsx';

// THE TEST LIBRARY'S OWN BOOK. Every book in this library extends this one, the way every book in a
// real library extends the library's — so a change to what a book is here reaches all five. It is
// the layout: the masthead, then the byline drawn from what the book exposes of its cover, then the
// chapters.
export default class $TheLibrary extends $Book {
    override write(): ReactNode {
        const RunningHead = $(runningHead);
        const Byline = $(byline);
        return (
            <>
                <RunningHead book={this} />
                <Byline book={this} />
                {super.write()}
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Navigable />,
            <LibraryTheme />
        );
    }
}

// AND ITS THEME: the library's own, a class under .public's Theme. It sets the eight, and in its bond it
// EXTENDS the default sheet rather than replacing it — the default comprehends every class the framework
// puts on an element, and this adds the library's look on top of those same marks: the cover a card whose
// head is the byline, a label above every chapter's title saying what the chapter is, ordinary chapters
// counted and ruled, the synopsis a ruled block, the table of contents boxed and its catalogue ruled. Every
// rule reads the theme's values, so a book that overrides them — Libby's dark one — keeps the look. Doug,
// 2026-09-27: "imagine having things in well defined bounding boxes with well defined spacing… use the
// theme and maybe visual cues to make things look distinct and natural to give me a visual language."
export class $LibraryTheme extends $Theme {
    font = "Georgia, 'Times New Roman', serif";
    leading = '1.7';
    measure = '42rem';
    space = '1.25rem';
    ink = '#23262a';
    paper = '#faf8f4';
    link = '#5b2f2a';

    $LibraryTheme(...chemicals: $Chemical[]) {
        this.$Theme(...chemicals);
        this.style = selection(this.style as ComponentType<{ className?: string }>)`
            .pd-book { counter-reset: chapter; }

            .pd-byline {
                margin-block: ${at('space')} 0;
                padding: calc(${at('space')} / 2) ${at('space')};
                background: color-mix(in srgb, ${at('ink')} 5%, ${at('paper')});
                border: 1px solid color-mix(in srgb, ${at('ink')} 18%, ${at('paper')});
                border-block-start: 3px solid ${at('link')};
            }
            header.pd-container:has(> .pa-cover) {
                display: block;
                margin-block: 0 calc(2 * ${at('space')});
                padding: ${at('space')};
                background: color-mix(in srgb, ${at('ink')} 5%, ${at('paper')});
                border: 1px solid color-mix(in srgb, ${at('ink')} 18%, ${at('paper')});
                border-block-start: 0;
            }
            :where(header, nav).pd-container:has(> .pa-page:not(.pa-open)) { display: none; }
            .pa-cover { margin-block: 0; }
            .pa-cover .pd-title { margin-block: 0 calc(${at('space')} / 2); }

            .pd-chapter .pd-title::before,
            .pd-title.pa-parenthetical,
            .pa-table-of-contents .pd-heading,
            .pa-row:first-child .pa-col {
                font-size: calc(0.7 * ${at('size')});
                font-weight: normal;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                opacity: 0.65;
            }
            .pd-chapter .pd-title::before {
                display: block;
                margin-block-end: calc(${at('space')} / 4);
                content: 'Chapter ' counter(chapter);
            }
            .pa-cover .pd-title::before { content: 'Cover'; }
            .pa-biography .pd-title::before { content: 'Biography'; }
            .pa-autobiography .pd-title::before { content: 'Autobiography'; }
            .pa-synopsis .pd-title::before { content: 'Synopsis'; }
            .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
            .pd-title.pa-parenthetical::before { content: none; }
            .pd-chapter:not(.pa-cover):not(.pa-synopsis):not(.pa-table-of-contents) { counter-increment: chapter; }
            .pd-book > .pd-chapter:not(.pa-cover):not(.pa-synopsis):not(.pa-table-of-contents) {
                border-block-start: 1px solid color-mix(in srgb, ${at('ink')} 18%, ${at('paper')});
                padding-block-start: ${at('space')};
            }

            .pa-synopsis {
                margin-block: calc(2 * ${at('space')});
                padding-inline-start: ${at('space')};
                border-inline-start: 3px solid ${at('link')};
            }

            nav.pd-container:has(> .pa-table-of-contents) {
                display: block;
                margin-block: calc(2 * ${at('space')});
                padding: ${at('space')};
                border: 1px solid color-mix(in srgb, ${at('ink')} 18%, ${at('paper')});
            }
            .pa-table-of-contents { margin-block: 0; }
            .pa-col {
                padding-block: calc(${at('space')} / 3);
                border-block-end: 1px solid color-mix(in srgb, ${at('ink')} 12%, ${at('paper')});
            }
            .pa-row:first-child .pa-col { border-block-end: 1px solid ${at('ink')}; }
        `;
    }
}

export const LibraryTheme = $($LibraryTheme);

// A FORMAT THAT WORKS IN DIFFERENT PLACES: a frame drawn from the theme's own values, stood by Some
// Projects on itself in its $Define and by the persona's book on each of its chapters at its bind — and
// in front of the theme where it stands beside one, since the front-most annotation draws innermost and a
// format reads the theme only from inside its provider. Doug, 2026-09-27: "Consider adding test formats
// for books and chapters, as annotations that work in different places, and maybe have them set in
// Define, and maybe all of them can work with the theme."
export class $Framed extends $Format {
    style = selection.div`
        border: 1px solid ${at('ink', 'currentColor')};
        padding: ${at('space', '1rem')};
        margin-block: ${at('space', '1rem')};
    `;
}

export const Framed = $($Framed);
