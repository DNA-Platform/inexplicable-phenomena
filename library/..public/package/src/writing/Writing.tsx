import { ReactNode, createElement } from 'react';
import { $, $Block, $check, $Chemical } from '@dna-platform/chemistry';
import type { $Written } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import type { $Annotation } from './Annotation';

export class $Writing extends $Chemical {
    $parenthetical?: boolean = false;
    $formal?: boolean;
    static declared: (new () => $Annotation)[] = [];
    protected source: $Written[] = [];
    protected specification: Specification<$Writing> = new WritingSpecification();
    private _formal = false;

    get $narrative(): boolean { return !this.$parenthetical; }
    set $narrative(narrative: boolean) { this.$parenthetical = !narrative; }
    get annotation(): boolean { return false; }
    get formal(): boolean { return this._formal; }
    set formal(formal: boolean) {
        this._formal = formal;
        for (const held of this.writing) held.formal = formal;
    }
    get contents(): $Written[] { return this.scan(piece => !(piece instanceof $Writing && piece.annotation)); }
    get annotations(): $Annotation[] { return this.scan(piece => piece instanceof $Writing && piece.annotation) as $Annotation[]; }
    get writing(): $Writing[] { return this.scan(piece => piece instanceof $Writing) as $Writing[]; }

    $Writing(...source: $Written[]) {
        this.source = [...source];
        if (this.$formal !== undefined) this.formal = this.$formal;
        for (const Kind of (this.constructor as typeof $Writing).declared) this.ensure($check(Kind, '!'));
        this.$Reorganize();
        this.specify();
    }

    add(held: $Annotation): void {
        this.source = [...this.source, held];
    }

    replace(held: $Annotation): void {
        const Kind = held.constructor as new () => $Annotation;
        let replaced = false;
        const swap = (piece: $Written): $Written => {
            if (replaced || !(piece instanceof Kind)) return piece;
            replaced = true;
            return held;
        };
        this.source = this.source.map(piece => piece instanceof $Block ? piece.map(swap) : swap(piece));
    }

    ensure(held: $Annotation): void {
        const Kind = held.constructor as new () => $Annotation;
        if (this.find(Kind).length > 0) return;
        const above = this.annotations.find(other => held instanceof (other.constructor as new () => $Annotation));
        if (above === undefined) return this.add(held);
        const swap = (piece: $Written): $Written => piece === above ? held : piece;
        this.source = this.source.map(piece => piece instanceof $Block ? piece.map(swap) : swap(piece));
    }

    remove<T extends $Annotation>(Kind: new () => T): void {
        const keep = (piece: $Written): boolean => !(piece instanceof Kind);
        this.source = this.source.flatMap(piece => piece instanceof $Block ? [piece.filter(keep)] : keep(piece) ? [piece] : []);
    }

    find<T extends $Annotation>(Kind: new () => T): T[] {
        return this.scan(piece => piece instanceof Kind) as T[];
    }

    specify(): void {
        this.specification.enforced = this.formal;
        this.specification.check(this);
        for (const held of this.annotations) held.specifically(this);
    }

    view(): ReactNode {
        const drawn = this.contents.map((piece, at) => typeof piece === 'object' ? createElement($(piece), { key: at }) : piece);

        return this.$parenthetical ? <span hidden>{drawn}</span> : <>{drawn}</>;
    }

    protected $Reorganize(): void { }

    protected scan(keep: (piece: $Written) => boolean): $Written[] {
        return this.source.flatMap(piece => piece instanceof $Block ? piece.elements.filter(keep) : keep(piece) ? [piece] : []);
    }
}

export class WritingSpecification extends Specification<$Writing> {
    @specify('a piece of writing holds only writing')
    $holdsOnlyWriting(writing: $Writing): void {
        $check(writing.contents.every(piece => piece instanceof $Writing),
            'a piece of writing holds only writing, and this one holds something else');
    }

    @specify('the annotations a piece of writing declares are built')
    $declaredAreBuilt(writing: $Writing): void {
        $check((writing.constructor as typeof $Writing).declared.every(Kind => writing.find(Kind).length > 0),
            'the annotations a piece of writing declares are built, and one of these is missing');
    }
}

export const Writing = $($Writing);
