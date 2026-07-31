import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from './Referent';
import { $Sentence } from '../writing/Sentence';

export class $Reference<T extends $Referent = $Referent> extends $Sentence {
    $for?: string;

    compose(key: number | string): $Reference {
        const base = this.$for ?? '';
        const composed: $Reference = $(<Reference for={base.includes('#') ? `${base}.${key}` : `${base}#${key}`}>{this.copy || `${key}`}</Reference>);
        return composed;
    }

    lookup(): T | undefined {
        return undefined;
    }

    protected anchor(surface: ReactNode): ReactNode {
        return <a href={`#${this.$for ?? ''}`}>{surface}</a>;
    }

    frame(): ReactNode {
        return this.anchor(super.frame());
    }
}

export const Reference = $($Reference);
