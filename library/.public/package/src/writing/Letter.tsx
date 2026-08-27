import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { $Composition$ } from './Composition';
import { $Type } from '@/notation/Type';

export class $Letter extends $Type implements $Composition$<$Letter> {
    resolve = false;

    constructor() {
        super();
        this.cache('Letter');
    }

    override view(): ReactNode {
        if (!this.instance) return null;
        const Instance = $(this.instance);
        return <Instance />;
    }

    parts(): $Letter[] {
        return [this];
    }

    get canonical(): $Letter {
        return this;
    }

    override specify(): void {
        super.specify();
        $check([...this.copy].length === 1, 'a letter is one grapheme, and this one is not');
    }
}
