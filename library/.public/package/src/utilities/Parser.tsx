import { ReactNode, createElement } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';

const numbered = (part: $Writing): part is $Writing & { index: number } => 'index' in part;

export class Parser {
    makes = new Map<string, (held: (string | $Writing)[]) => $Writing[]>();

    private parsed = new WeakMap<$Writing, $Writing[]>();
    private graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

    tokens(of: $Writing): (string | $Writing)[] {
        return ((of.block?.$elements ?? []) as unknown[])
            .filter(one => one !== null && one !== undefined && typeof one !== 'boolean')
            .map(writing => writing instanceof $Writing ? writing : String(writing))
            .filter(writing => writing instanceof $Writing ? !writing.parenthetical : writing !== '');
    }

    parse<T extends $Writing>(
        of: $Writing,
        accept: (token: $Writing) => T | T[] | undefined,
        reduce: (held: (string | $Writing)[]) => T[],
        numbering = true
    ): T[] {
        const kept = this.parsed.get(of);
        if (kept !== undefined) return kept as T[];

        const parsed: T[] = [];
        let held: (string | $Writing)[] = [];
        const reducing = () => {
            if (held.some(token => typeof token !== 'string' || token.trim() !== ''))
                parsed.push(...reduce(held));
            held = [];
        };
        for (const token of this.tokens(of)) {
            const accepted = typeof token === 'string' ? undefined : accept(token);
            if (accepted !== undefined) {
                reducing();
                parsed.push(...(Array.isArray(accepted) ? accepted : [accepted]));
                continue;
            }
            held.push(token);
        }
        reducing();
        if (numbering) parsed.forEach((part, at) => {
            if (numbered(part)) part.index = at;
        });
        for (const part of parsed)
            if (!(part.parent instanceof $Writing)) part.parent = of;
        this.parsed.set(of, parsed);
        return parsed;
    }

    sentences(held: (string | $Writing)[]): (string | $Writing)[][] {
        const lines: (string | $Writing)[][] = [[]];
        for (const token of held) {
            if (typeof token !== 'string' || !token.includes('\n')) {
                lines[lines.length - 1].push(token);
                continue;
            }
            token.split('\n').forEach((piece, at, pieces) => {
                if (at < pieces.length - 1) {
                    lines[lines.length - 1].push(piece + '\n');
                    lines.push([]);
                } else if (piece !== '') {
                    lines[lines.length - 1].push(piece);
                }
            });
        }
        return lines.filter(line => line.some(token => typeof token !== 'string' || token.trim() !== ''));
    }

    words(held: (string | $Writing)[]): string[] {
        return this.text(held).split(/\s+/u).filter(one => one !== '');
    }

    letters(held: (string | $Writing)[]): string[] {
        return [...this.graphemes.segment(this.text(held))].map(({ segment }) => segment);
    }

    text(held: (string | $Writing)[]): string {
        return held.map(token => typeof token === 'string' ? token : token.copy).join('');
    }

    elements(held: (string | $Writing)[]): ReactNode[] {
        return held.map((token, at) => typeof token === 'string'
            ? token
            : createElement($(token) as never, { key: at }));
    }
}

export const parser = new Parser();
