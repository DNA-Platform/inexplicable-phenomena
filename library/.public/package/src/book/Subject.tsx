import { $ } from '@dna-platform/chemistry';
import { $check } from '@dna-platform/chemistry';
import { $Annotation } from './Annotation';

export class $Subject extends $Annotation {
    protected override get kind(): string { return 'subject'; }

    // "THE BOOK SHOULD BE IN ITS OWN SUBJECT" — my book's card computes one step
    // and arrives at yours. One comparison, and it opens nothing.
    override valid(): boolean {
        const mine = this.book?.card;
        const yours = this.card;
        if (!mine || !yours) return super.valid();
        return $check(mine.subject === yours, 'a subject names the book its own card is filed under, and this one names another');
    }
}

export const Subject = $($Subject);
