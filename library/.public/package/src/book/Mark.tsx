import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Reference } from '../reference/Reference';
import { $Path } from '../reference/Path';
import { $Writing } from '../writing/Writing';
import { type $Section } from '../writing/Section';
import { $Chapter } from './Chapter';
import { $Book } from './Book';
import { $Footer } from './Footer';
import { $Footnote } from './Footnote';
import { $Bibliography } from './Bibliography';
import { $Citation } from './Citation';

export class $Mark extends $Writing implements $Reference<$Footnote | $Citation> {
    $label?: string;

    get label(): string {
        return this.$label ?? '';
    }

    get number(): number {
        return this.read()?.index ?? 0;
    }

    read(): $Footnote | $Citation | undefined {
        let scope: unknown = this.parent;
        while (scope) {
            const sections: $Section[] | undefined =
                scope instanceof $Chapter ? scope.sections
                    : scope instanceof $Book ? scope.sections
                        : undefined;
            for (const section of sections ?? []) {
                const entry = section instanceof $Footer ? section.entry(this.label)
                    : section instanceof $Bibliography ? section.entry(this.label)
                        : undefined;
                if (entry) return entry;
            }
            const above = (scope as { parent?: unknown }).parent;
            scope = above === scope ? undefined : above;
        }
        return undefined;
    }

    equals(ref: $Reference<$Footnote | $Citation>): boolean {
        const found = this.read();
        return found !== undefined && found === ref.read();
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<$Footnote | $Citation, U>(this, next);
    }

    view(): ReactNode {
        return <sup className="mark">{this.number || this.label}</sup>;
    }

    valid(): boolean {
        return this.label !== '' && this.read() !== undefined;
    }
}

export const Mark = $($Mark);
