import { $ } from '@dna-platform/chemistry';
import { $Chapter } from './Chapter';
import { $Section } from '../writing/Section';

// A synopsis is a parenthetical chapter carried on the book — the summary's
// pattern one grade up. It is essential (a book cannot be catalogued without
// one) and undisplayed by default; an author who wants it on the page writes
// parenthetical={false}.
export class $Synopsis extends $Chapter {
    constructor() {
        super();
        this.parenthetical = true;
    }
}

export const Synopsis = $($Synopsis);
