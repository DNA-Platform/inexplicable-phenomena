import { $, selection } from '@dna-platform/chemistry';
import { $Format, $Writing } from '@dna-platform/public';
import { at } from './2-the-theme.code.tsx';

export class $Navigable extends $Format {
    style = selection.div`
        .pd-running-head {
            font-size: calc(0.75 * ${at('size', '1rem')});
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding-block-end: calc(${at('space', '1rem')} / 2);
            border-block-end: 1px solid ${at('ink', 'currentColor')};
        }
        .pd-byline {
            display: grid;
            grid-template-columns: max-content 1fr;
            column-gap: ${at('space', '1rem')};
            row-gap: calc(${at('space', '1rem')} / 4);
            align-items: baseline;
        }
        .pd-label {
            font-size: calc(0.7 * ${at('size', '1rem')});
            letter-spacing: 0.15em;
            text-transform: uppercase;
            opacity: 0.65;
        }
        .pd-catchword {
            font-size: calc(0.85 * ${at('size', '1rem')});
            text-align: end;
            margin-block-end: 0;
            padding-block-start: calc(${at('space', '1rem')} / 2);
            border-block-start: 1px solid ${at('ink', 'currentColor')};
        }
    `;
}

export class $Framed extends $Format {
    style = selection.div`
        border: 1px solid ${at('ink', 'currentColor')};
        padding: ${at('space', '1rem')};
        margin-block: ${at('space', '1rem')};
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
        .pd-paragraph:has(> .pd-line) { margin-block: ${at('space', '1rem')}; }
    `;
}

export class $Typewritten extends $Format {
    style = selection.div`
        font-family: monospace;
    `;
}

export const Navigable = $($Navigable);
export const Framed = $($Framed);
export const Literary = $($Literary);
export const Typewritten = $($Typewritten);
