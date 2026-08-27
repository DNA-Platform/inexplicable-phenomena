import { $check, $Chemical, $Html } from '@dna-platform/chemistry';
import { $Referent$ } from '@/reference/Referent';
import { html } from '@/utilities/Html';

export type $Written = $Writing<any> | $Html<'block'>;

export class $Writing<P extends $Writing = $Writing<any>> extends $Chemical implements $Referent$ {
    inline = true;
    parenthetical = false;
    text?: $Html<'block'>;
    written: $Writing<any>[] = [];
    parts(): P[] { return []; }
    canonical(): P { return this.parts()[0]; }
    get specification(): $Writing<any>[] { return this.written; }
    get copy(): string { return this.text ? html.text(this.text) : this.written.map(one => one.copy).join(''); }

    $Writing(...writing: $Written[]) {
        const found: $Writing<any>[] = [];
        for (const one of writing) {
            if (one instanceof $Writing) { found.push(one); continue; }
            if (!html.block(one)) continue;
            this.text = one;
            for (const inside of one.$elements ?? []) {
                if (inside instanceof $Writing) found.push(inside);
            }
        }
        this.written = found;
    }

    where(match: (part: P) => boolean): P[] { return this.parts().filter(match); }
    select<U>(pick: (part: P) => U): U[] { return this.parts().map(pick); }
    selectMany<U>(pick: (part: P) => U[]): U[] { return this.parts().flatMap(pick); }
    single(match: (part: P) => boolean): P {
        const found = this.parts().filter(match);
        if (found.length !== 1) throw new Error(`single expected exactly one part and found ${found.length}.`);
        return found[0];
    }

    specify(): void {
        $check(this.specification.length > 0 || this.parenthetical, 'a piece of writing has a type, and this one has none');
    }
}
