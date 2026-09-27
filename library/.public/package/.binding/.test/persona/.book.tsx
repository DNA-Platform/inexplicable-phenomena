import { $ } from '@dna-platform/chemistry';
import { $Chapter, $Format } from '@dna-platform/public';
import { selection } from '@dna-platform/chemistry';
import $TheLibrary, { Framed } from '../the-library/.book';
import { at } from '../the-library/1-the-shelves.tsx.tsx';

// EVERY CHAPTER FRAMED, by the book at its bind, once the book is whole: the same Framed that Some Projects
// stands on itself, here said of each chapter — a format working in a different place, inside the theme's
// provider and reading its values. And the book LITERARY, a format of its own in front of the library's
// theme: a bookish face, paragraphs indented and set close, titles centred and unweighted, the poem's lines
// let breathe. Doug, 2026-09-27: "I like each book having slightly different feels. A more monospace
// programmery look somewhere, a more literary look somewhere else."
export default class $APersona extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <Literary />
        );
    }

    protected override $Bound(): void {
        for (const chapter of this.text.find($Chapter))
            chapter.annotations.add(this,
                <Framed />
            );
        super.$Bound();
    }
}

export class $Literary extends $Format {
    style = selection.div`
        font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif;
        .pd-title { text-align: center; font-weight: normal; font-variant: small-caps; letter-spacing: 0.06em; }
        .pd-chapter .pd-title::before { text-align: center; }
        .pd-heading { font-weight: normal; font-style: italic; }
        .pd-chapter:not(.pa-table-of-contents) .pd-section .pd-paragraph { margin-block: 0; text-indent: 1.5em; }
        .pd-section .pd-heading + .pd-paragraph, .pd-section .pd-container:has(> .pd-heading) + .pd-paragraph { text-indent: 0; }
        .pd-line { text-indent: 0; padding-inline-start: 1.5em; line-height: 1.9; }
        .pd-paragraph:has(> .pd-line) { margin-block: ${at('space', '1rem')}; }
    `;
}

export const Literary = $($Literary);
