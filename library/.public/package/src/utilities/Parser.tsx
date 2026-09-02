import { ReactNode, createElement } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';

const numbered = (part: $Writing): part is $Writing & { index: number } => 'index' in part;

export class Parser {
    private parsed = new WeakMap<$Writing, $Writing[]>();

    tokens(of: $Writing): (string | $Writing)[] {
        return ((of.block?.$elements ?? []) as unknown[])
            .filter(one => one !== null && one !== undefined && typeof one !== 'boolean')
            .map(one => one instanceof $Writing ? one : String(one))
            .filter(one => one instanceof $Writing ? !one.parenthetical : one !== '');
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
