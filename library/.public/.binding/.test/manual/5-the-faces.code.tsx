import { $, selection } from '@dna-platform/chemistry';
import { $Cover, $Format, $Synopsis, $Table, $TableOfContents, $Writing } from '@dna-platform/public';

export class $LibraryCover extends $Cover {
    override style = selection.header`
        .pd-chapter.pa-cover { margin-block: 0; }
        .pd-chapter.pa-cover:not(.pa-framed) {
            margin-block-end: calc(1.5 * ${({ theme }) => theme.space});
            padding: calc(0.75 * ${({ theme }) => theme.space}) ${({ theme }) => theme.space};
            background: color-mix(in srgb, ${({ theme }) => theme.ink} 3%, ${({ theme }) => theme.paper});
            border: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 10%, ${({ theme }) => theme.paper});
            border-block-start: 0;
            scroll-margin-block-start: calc(1.75 * ${({ theme }) => theme.space});
        }
        .pa-cover .pd-title { margin-block: 0 calc(${({ theme }) => theme.space} / 2); font-size: calc(2 * ${({ theme }) => theme.size}); }
        .pa-cover .pd-title::before { content: 'Cover'; }
        .pa-biography .pd-title::before { content: 'Biography'; }
        .pa-autobiography .pd-title::before { content: 'Autobiography'; }
    `;
}

export class $LibrarySynopsis extends $Synopsis {
    style = selection.div`
        .pd-chapter.pa-synopsis {
            margin-block: calc(1.5 * ${({ theme }) => theme.space});
            padding-inline-start: ${({ theme }) => theme.space};
            border-inline-start: 2px solid ${({ theme }) => theme.link};
        }
        .pa-synopsis .pd-paragraph { font-style: italic; }
        .pa-synopsis .pd-title::before { content: 'Synopsis'; }
    `;
}

export class $LibraryTableOfContents extends $TableOfContents {
    override style = selection.nav`
        .pd-chapter.pa-table-of-contents { margin-block: 0; }
        .pd-chapter.pa-table-of-contents:not(.pa-framed) {
            margin-block: calc(1.5 * ${({ theme }) => theme.space});
            padding: calc(0.75 * ${({ theme }) => theme.space}) ${({ theme }) => theme.space};
            border: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 10%, ${({ theme }) => theme.paper});
            scroll-margin-block-start: calc(1.75 * ${({ theme }) => theme.space});
        }
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({ theme }) => theme.space} / 4); }
        .pa-table-of-contents .pd-catchword { margin-block-end: 0; }
        .pa-table-of-contents .pd-title::before { content: 'Table of Contents'; }
        .pa-table-of-contents .pd-heading {
            font-size: calc(0.7 * ${({ theme }) => theme.size});
            font-weight: normal;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.65;
        }
    `;
}

export class $LibraryTable extends $Table {
    override style = selection(this.style)`
        .pa-table { column-gap: ${({ theme }) => theme.space}; row-gap: calc(${({ theme }) => theme.space} / 2); }
        .pa-table .pd-paragraph { margin-block: 0; }
        .pa-col {
            padding-block: calc(${({ theme }) => theme.space} / 3);
            border-block-end: 1px solid color-mix(in srgb, ${({ theme }) => theme.ink} 7%, ${({ theme }) => theme.paper});
        }
    `;
}

export class $Framed extends $Format {
    style = selection.div`
        border: 1px solid ${({ theme }) => theme.ink};
        padding: ${({ theme }) => theme.space};
        margin-block: ${({ theme }) => theme.space};
    `;

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-framed');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

export class $Literary extends $Format {
    style = selection.div`
        font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif;
        .pd-title { text-align: center; font-weight: normal; font-variant: small-caps; letter-spacing: 0.06em; }
        .pd-chapter .pd-title::before { text-align: center; }
        .pd-heading { font-weight: normal; font-style: italic; }
        .pd-canonical.pd-chapter .pd-section .pd-paragraph { margin-block: 0; text-indent: 1.5em; }
        .pd-section .pd-heading + .pd-paragraph, .pd-section .pd-container:has(> .pd-heading) + .pd-paragraph { text-indent: 0; }
        .pd-line { text-indent: 0; padding-inline-start: 1.5em; line-height: 1.9; }
        .pd-paragraph:has(> .pd-line) { margin-block: ${({ theme }) => theme.space}; }
    `;
}

export class $Typewritten extends $Format {
    style = selection.div`
        font-family: monospace;
    `;
}

export const Cover = $($LibraryCover);
export const Synopsis = $($LibrarySynopsis);
export const TableOfContents = $($LibraryTableOfContents);
export const Table = $($LibraryTable);
export const Framed = $($Framed);
export const Literary = $($Literary);
export const Typewritten = $($Typewritten);
