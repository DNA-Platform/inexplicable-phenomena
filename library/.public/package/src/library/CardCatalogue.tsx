import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { type $Referent$ } from '../reference/Referent';
import { type $Reference$ } from '../reference/Reference';
import { type $Catalogue$ } from '../reference/Catalogue';
import { $Location } from '../reference/Location';
import { $Composible$ } from '../utilities/Composible';
import { $Path, Path } from '../reference/Path';
import { type $Composition$ } from '../writing/Composition';
import { $IndexCard } from './IndexCard';

export class $CardCatalogue<T extends $Referent$ & { copy: string; index: number; parenthetical: boolean } = any> extends $Chemical implements $Catalogue$<T> {
    $parts: $IndexCard<T>[] = [];

    $index?: number = undefined;
    $parenthetical? = false;

    get index(): number { return this.$index ?? 0; }
    set index(value: number) { this.$index = value; }
    get parenthetical(): boolean { return !!this.$parenthetical; }
    set parenthetical(value: boolean) { this.$parenthetical = value; }

    get copy(): string { return this.cards.map(c => c.copy).join('\n\n'); }
    get canonical(): $Reference$<T> { return $Composible$.canonical(this); }
    get cards(): $IndexCard<T>[] { return this.$parts; }

    parts(): $IndexCard<T>[] {
        return this.$parts;
    }

    where(match: (reference: $Reference$<T>) => boolean): $Reference$<T>[] {
        return $Composible$.where(this, match);
    }

    select<U>(pick: (reference: $Reference$<T>) => U): U[] {
        return $Composible$.select(this, pick);
    }

    single(match: (reference: $Reference$<T>) => boolean): $Reference$<T> {
        return $Composible$.single(this, match);
    }

    at(index: number): $Location<$Reference$<T>> {
        return $Composible$.at(this, index);
    }

    follow(): $Composition$<T> {
        return $Composible$.follow(this);
    }

    read(): $Composition$<T> {
        return this.follow();
    }

    then<U extends $Referent$>(next: $Reference$<U>): $Reference$<U> {
        const path: $Path<$Composition$<T>, U> = $(<Path first={this} onward={next} />);
        return path;
    }

    card(name: string): $IndexCard<T> {
        const found = this.cards.find(c => c.name === name);
        if (!found) throw new Error(`The catalogue holds no card for ${JSON.stringify(name)}.`);
        return found;
    }

    holds(name: string): boolean {
        return this.cards.some(c => c.name === name);
    }

    $CardCatalogue(...cards: $IndexCard<T>[]) {
        this.$parts = cards.map(c => $check(c, $IndexCard));
        this.$parts.forEach((c, i) => { if (c.$index === undefined) c.index = i + 1; });
    }

    valid(): boolean {
        return true;
    }
}

export const CardCatalogue = $($CardCatalogue);
