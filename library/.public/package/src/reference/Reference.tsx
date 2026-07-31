import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from './Referent';
import { $Sentence } from '../writing/Sentence';

export class $Reference<T extends $Referent = $Referent> extends $Sentence {
    $for?: string;

    get for(): string {
        return this.$for ?? this.copy;
    }

    compose(key: number | string): $Reference {
        const base = this.for;
        const composed: $Reference = $(<Reference for={base.includes('#') ? `${base}.${key}` : `${base}#${key}`}>{this.copy || `${key}`}</Reference>);
        return composed;
    }

    lookup(): T | undefined {
        return undefined;
    }

    equals(other: $Reference): boolean {
        const a = this.lookup();
        const b = other.lookup();
        if (a === undefined || b === undefined) return false;
        if (a === b) return true;
        return a.constructor === b.constructor
            && (a as { copy?: string }).copy === (b as { copy?: string }).copy
            && (a as { index?: number }).index === (b as { index?: number }).index;
    }

    protected anchor(surface: ReactNode): ReactNode {
        return <a href={`#${this.for}`}>{surface}</a>;
    }

    frame(): ReactNode {
        return this.anchor(super.frame());
    }
}

export const Reference = $($Reference);
