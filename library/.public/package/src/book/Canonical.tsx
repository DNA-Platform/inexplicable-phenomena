import { $ } from '@dna-platform/chemistry';
import { $check } from '@dna-platform/chemistry';
import { $Annotation } from './Annotation';

export class $Canonical extends $Annotation {
    protected override get kind(): string { return 'canonical'; }

    // "YOU ARE AMONG WHAT I HOLD" — a canonical says which of the books a subject
    // holds speaks for it, so the one it names has to be one of them.
    override valid(): boolean {
        const mine = this.book?.card;
        const yours = this.card;
        if (!mine || !yours) return super.valid();
        return $check(mine.entries.some(held => held === yours), 'a canonical names one of the books its subject holds, and this one names a book it does not hold');
    }
}

export const Canonical = $($Canonical);
