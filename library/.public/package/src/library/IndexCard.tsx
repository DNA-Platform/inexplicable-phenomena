import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { $Path, Path } from '../reference/Path';
import { $Writing } from '../writing/Writing';

export type $Entry = { name: string; value: string };

export class $IndexCard<T extends $Referent$ = $Referent$> extends $Writing implements $Reference$<T> {
    $name = '';
    $of?: () => T = undefined;

    get name(): string { return this.$name; }

    get copy(): string { return this.entries().map(e => `${e.name}: ${e.value}`).join('\n'); }

    entries(): $Entry[] {
        const machinery = $IndexCard.machinery();
        const carried: string[] = [];
        for (const key in this) {
            if (!key.startsWith('$') || machinery.has(key) || carried.includes(key)) continue;
            carried.push(key);
        }
        return ['name', ...carried.map(key => key.slice(1))].map(name => ({ name, value: this.written((this as any)[name]) }));
    }

    static machinery(): Set<string> {
        if (!$IndexCard.$machinery$) {
            const bare: $IndexCard = $(<IndexCard name="" />);
            const names = new Set<string>();
            for (const key in bare) if (key.startsWith('$')) names.add(key);
            $IndexCard.$machinery$ = names;
        }
        return $IndexCard.$machinery$;
    }

    static $machinery$?: Set<string> = undefined;

    written(value: unknown): string {
        if (value === undefined || value === null) return '';
        if (value instanceof $IndexCard) return value.name;
        if (Array.isArray(value)) return value.map(v => this.written(v)).join(', ');
        return String(value);
    }

    read(): T {
        const of = this.$of?.();
        if (!of) throw new Error(`The card for ${JSON.stringify(this.name)} stands for nothing — it never pointed.`);
        return of;
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<T, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    view(): ReactNode {
        return (
            <dl className="card">
                <dt className="card-heading">{this.name}</dt>
                {this.entries().filter(e => e.name !== 'name').map(entry => (
                    <dd className="card-entry" key={entry.name} data-entry={entry.name}>
                        <span className="card-entry-name">{entry.name}</span>
                        <span className="card-entry-value">{entry.value}</span>
                    </dd>
                ))}
            </dl>
        );
    }

    valid(): boolean {
        return this.name !== '';
    }
}

export const IndexCard = $($IndexCard);
