import { ReactNode, createElement } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Annotation, $Writing } from '@/writing/Writing';
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
        reduce: (tokens: (string | $Writing)[]) => T[]
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
            gathered.push(token);
        }
        reducing();
        for (const part of parts) if (!(part.parent instanceof $Writing)) part.parent = of;
        this.parts.set(of, parts);
        return parts;
    }

    sentences(tokens: (string | $Writing)[]): (string | $Writing)[][] {
        const lines: (string | $Writing)[][] = [[]];
        for (const token of tokens) {
            if (typeof token !== 'string' || !token.includes('\n')) {
                lines[lines.length - 1].push(token);
                continue;
            }
            token.split('\n').forEach((line, at, split) => {
                if (at < split.length - 1) {
                    lines[lines.length - 1].push(line + '\n');
                    lines.push([]);
                } else if (line !== '') {
                    lines[lines.length - 1].push(line);
                }
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
