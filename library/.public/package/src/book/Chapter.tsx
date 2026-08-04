import { $ } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { type $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path } from '../reference/Path';
import { type $Composition$ } from '../writing/Composition';
import { $Document } from '../document/Document';
import { $Section } from '../writing/Section';
import { type $Book } from './Book';

export class $Chapter extends $Document {
    get book(): $Book { return this.parent as $Book; }

    get ref(): $$Chapter { return new $$Chapter(this); }
}

export class $$Chapter implements $Catalogue$<$Section>, $Reference$<$Chapter> {
    index = 0;
    parenthetical = false;

    constructor(public of: $Chapter) { }

    get copy(): string { return this.parts().map(r => r.copy).join(' '); }
    get canonical(): $Reference$<$Section> { return $Composible$.canonical(this); }

    parts(): $Reference$<$Section>[] {
        return this.of.parts().map((section, slot) => {
            const reference = this.of.at(section.index);
            reference.index = slot + 1;
            return reference;
        });
    }

    where(match: (reference: $Reference$<$Section>) => boolean): $Reference$<$Section>[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (reference: $Reference$<$Section>) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (reference: $Reference$<$Section>) => boolean): $Reference$<$Section> {
        return $Composible$.single(this, match);
    }

    at(index: number): $Location<$Reference$<$Section>> {
        return $Composible$.at(this, index);
    }

    follow(): $Composition$<$Section> {
        return $Composible$.follow(this);
    }

    read(): $Chapter {
        return this.of;
    }

    valid(): boolean {
        return this.of.valid();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        return new $Path<$Chapter, U>(this, next);
    }
}

export const Chapter = $($Chapter);
