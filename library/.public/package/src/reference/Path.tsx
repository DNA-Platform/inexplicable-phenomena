import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, $Type, TypedSpecification } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';

export class $Path extends $Writing {
    override parenthetical = true;

    override get canonical(): boolean { return false; }

    get internal(): boolean {
        const copy = this.copy;
        return this.address || (URL.canParse(copy, 'https://library') && new URL(copy, 'https://library').origin === 'https://library');
    }

    get address(): boolean {
        return /^[A-Z][a-z]?:\d+(-\d+)?(\/[A-Z][a-z]?:\d+(-\d+)?)*$/.test(this.copy);
    }

    $Path(block: $Block) {
        super.$Writing(block);
        this._type = $(<TypeOfPath />);
    }

    read(from: $Writing): $Writing {
        if (!this.internal) throw new Error('a link reads outside the library, and only its reader can follow it there');
        const copy = this.copy;
        const fragment = this.address ? copy : new URL(copy, 'https://library').hash.slice(1);
        if (fragment === '') throw new Error('a route is followed by the application, and this path names no place within the book');
        const root = from.book();
        if (!(root instanceof $Composition)) throw new Error('a path is followed from a composition, and this one stands outside any');
        return root.catalogue().follow(fragment);
    }
}

export class $TypeOfPath extends $Type {
    resolve = false;

    override get canonicalForm(): typeof $Writing { return $Path; }

    constructor() {
        super();
        this[cache]('Path');
    }

    protected override specification: Specification<$Writing> = new PathSpecification();
}

export class PathSpecification extends TypedSpecification<$Writing> {
    @specify('a path reads as a url')
    $readsAsUrl(writing: $Writing): void {
        const copy = writing.copy;
        $check(!/\s/u.test(copy) && URL.canParse(copy, 'https://library'), 'a path reads as a url, and this one does not');
    }
}

export const Path = $($Path);
export const TypeOfPath = $($TypeOfPath);
