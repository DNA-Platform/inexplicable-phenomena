import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import * as paths from '../reference/Path';
import { $Writing } from '../writing/Writing';

export class $IndexCard<T extends $Referent$ = $Referent$> extends $Writing implements $Reference$<T> {
    $name = '';
    $of?: () => T = undefined;

    constructor() {
        super();
        this.inline = false;
    }

    get name(): string { return this.$name; }

    get copy(): string { return this.properties().map(name => `${name}: ${this.written(name)}`).join('\n'); }

    properties(): string[] {
        const carried: string[] = [];
        let proto = Object.getPrototypeOf(this);
        let reached = false;
        while (proto && !reached) {
            const keys = Object.getOwnPropertyNames(proto);
            const accessor = (key: string) => Object.getOwnPropertyDescriptor(proto, key)?.get !== undefined;
            const lifted = keys.some(key => key.startsWith('$') && accessor(key));
            if (!lifted) {
                reached = Object.prototype.hasOwnProperty.call(proto, 'properties');
                carried.unshift(...keys.filter(key => accessor(key) && !key.startsWith('$') && key !== 'copy' && !carried.includes(key)));
            }
            proto = Object.getPrototypeOf(proto);
        }
        return carried;
    }

    written(property: string): string {
        const value = (this as any)[property];
        if (value === undefined || value === null) return '';
        if (value instanceof $IndexCard) return value.name;
        if (value instanceof $Writing) return value.copy;
        if (Array.isArray(value)) return value.map(part => this.printed(part)).join(', ');
        return this.printed(value);
    }

    printed(value: unknown): string {
        if (value instanceof $IndexCard) return value.name;
        if (value instanceof $Writing) return value.copy;
        if (value && typeof value === 'object' && 'name' in value) return String((value as { name: unknown }).name);
        return String(value);
    }

    read(): T {
        const of = this.$of?.();
        if (!of) throw new Error(`The card for ${JSON.stringify(this.name)} stands for nothing — it never pointed.`);
        return of;
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const Path = $(paths.Path);
        return $(<Path first={this} onward={next} />);
    }

    view(): ReactNode {
        return this.copy;
    }

    valid(): boolean {
        return this.name !== '';
    }
}

export const IndexCard = $($IndexCard);
