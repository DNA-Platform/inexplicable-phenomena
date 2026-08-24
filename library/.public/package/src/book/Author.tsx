import { $ } from '@dna-platform/chemistry';
import { $valid } from '@dna-platform/chemistry';
import { $Annotation } from './Annotation';

export class $Author extends $Annotation {
    protected override get kind(): string { return 'author'; }

    // "THE CANONICAL AUTOBIOGRAPHY OF THE LIBRARY" — and BOTH halves are the
    // structure. Doug: "The author of a book should be a book that is of type
    // autobiography AND its author link should point to itself. That is
    // structural." A book that closes the loop and carries no type is not an
    // autobiography by name; one that carries the type and does not close it is
    // invalid. Both are readable off cards and neither opens a book.
    override valid(): boolean {
        const yours = this.card;
        if (!yours) return super.valid();
        return $valid(yours.author === yours, 'an author names a book that authors itself, and this one names a book somebody else wrote');
    }
}

export const Author = $($Author);
