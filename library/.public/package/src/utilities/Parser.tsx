import { ReactNode, createElement } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Annotation } from '@/writing/Annotation';
import { html } from '@/utilities/Html';

export class Parser {
    private parts = new WeakMap<$Writing, $Writing[]>();
    private graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    tokens(of: $Writing): (string | $Writing)[] {
        return ((of._block.$elements ?? []) as unknown[])
            .filter(node => node !== null && node !== undefined && typeof node !== 'boolean')
            .map(node => node instanceof $Writing ? node : String(node))
            .filter(node => node instanceof $Writing ? !(node instanceof $Annotation) : node !== '');
    }

    parse<T extends $Writing>(
        of: $Writing,
        accept: (token: $Writing) => T | T[] | undefined,
        reduce: (tokens: (string | $Writing)[]) => T[],
        supply?: (parts: T[]) => T[]
    ): T[] {
        if (this.parts.has(of)) return this.parts.get(of) as T[];

        const parts: T[] = [];
        let gathered: (string | $Writing)[] = [];
        const reducing = () => {
            if (gathered.some(token => typeof token !== 'string' || token.trim() !== ''))
                parts.push(...reduce(gathered));
            gathered = [];
        };
        for (const token of this.tokens(of)) {
            const part = typeof token === 'string' ? undefined : accept(token);
            if (part !== undefined) {
                reducing();
                parts.push(...(Array.isArray(part) ? part : [part]));
                continue;
            }
            if (typeof token !== 'string') {
                reducing();
                parts.push(...reduce([token]));
                continue;
            }
            gathered.push(token);
        }
        reducing();
        // SUPPLIED BEFORE THE MEMO, never around it — a reading added afterwards
        // would be decided by whoever asked first and then never asked again.
        const answered = supply === undefined ? parts : supply(parts);
        for (const part of answered) if (!(part.parent instanceof $Writing)) part.parent = of;
        this.parts.set(of, answered);
        return answered;
    }

    sentences(tokens: (string | $Writing)[]): (string | $Writing)[][] {
        const lines: (string | $Writing)[][] = [[]];
        for (const token of tokens) {
            if (typeof token !== 'string') {
                lines[lines.length - 1].push(token);
                continue;
            }
            token.split(/(?<=\n)|(?<=[.!?])[^\S\n]+(?=\S)/u).forEach((piece, at, split) => {
                const opened = lines[lines.length - 1].length === 0 ? piece.trimStart() : piece;
                if (opened !== '') lines[lines.length - 1].push(opened);
                if (at < split.length - 1) lines.push([]);
            });
        }
        return lines.filter(line => line.some(token => typeof token !== 'string' || token.trim() !== ''));
    }

    words(tokens: (string | $Writing)[]): string[] {
        return this.text(tokens).split(/\s+/u).filter(word => word !== '');
    }

    letters(tokens: (string | $Writing)[]): string[] {
        return [...this.graphemes.segment(this.text(tokens))].map(({ segment }) => segment);
    }

    text(tokens: (string | $Writing)[]): string {
        return tokens.map(token => typeof token === 'string' ? token : html.text(token._block)).join('');
    }

    elements(tokens: (string | $Writing)[]): ReactNode[] {
        return tokens.map((token, at) => typeof token === 'string'
            ? token
            : createElement($(token) as never, { key: at }));
    }
}

export const parser = new Parser();
