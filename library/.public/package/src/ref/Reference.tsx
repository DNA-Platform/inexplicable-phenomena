import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Referent } from './Referent';

export class $Reference<T extends $Referent = $Referent> extends $Referent {
    $for?: string;

    lookup(): T | undefined {
        return undefined;
    }

    protected anchor(surface: ReactNode): ReactNode {
        return <a href={`#${this.$for ?? ''}`} onClick={(e) => { e.preventDefault(); this.lookup(); }}>{surface}</a>;
    }

    frame(): ReactNode {
        return this.anchor(super.frame());
    }
}

export const Reference = $($Reference);
