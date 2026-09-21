import { ReactNode, createElement } from 'react';
import { $, $Block, $check, $Chemical } from '@dna-platform/chemistry';
import type { $Written } from '@dna-platform/chemistry';
import type { $Annotation } from './Annotation';

export class $Writing extends $Chemical {
    $parenthetical?: boolean;
    $narrative?: boolean;
    $formal?: boolean;
    parenthetical = false;
    protected source: $Written[] = [];
    private _formal = false;
    protected static declared: (new () => $Annotation)[] = [];

    get narrative(): boolean { return !this.parenthetical; }
    get annotation(): boolean { return false; }
    get formal(): boolean { return this._formal; }
    set formal(formal: boolean) {
        this.formalize(formal);
        if (formal) this.specify();
    }
    get contents(): $Written[] { return this.scan(piece => !(piece instanceof $Writing && piece.annotation)); }
    get annotations(): $Annotation[] { return this.scan(piece => piece instanceof $Writing && piece.annotation) as $Annotation[]; }
    get writing(): $Writing[] { return this.scan(piece => piece instanceof $Writing) as $Writing[]; }

    $Writing(...source: $Written[]) {
        this.source = [...source];
        if (this.$narrative !== undefined) this.parenthetical = !this.$narrative;
        if (this.$parenthetical !== undefined) this.parenthetical = this.$parenthetical;
        if (this.$formal !== undefined) this.formalize(this.$formal);
        for (const Kind of (this.constructor as typeof $Writing).declared) this.ensure($check(Kind, '!'));
        this.$Reorganize();
        if (this.formal) this.specify();
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
        this.test('a piece of writing holds only writing', () => this.contents.every(piece => piece instanceof $Writing));
        this.test('the annotations a piece of writing declares are built', () =>
            (this.constructor as typeof $Writing).declared.every(Kind => this.find(Kind).length > 0));
        for (const held of this.annotations) held.specifically(this);
    }

    view(): ReactNode {
        const drawn = this.contents.map((piece, at) => typeof piece === 'object' ? createElement($(piece), { key: at }) : piece);

        return this.parenthetical ? <span hidden>{drawn}</span> : <>{drawn}</>;
    }

    protected $Reorganize(): void { }

    protected test(name: string, holds: () => boolean): void {
        $check(holds(), name);
    }

    protected scan(keep: (piece: $Written) => boolean): $Written[] {
        return this.source.flatMap(piece => piece instanceof $Block ? piece.elements.filter(keep) : keep(piece) ? [piece] : []);
    }

    private formalize(formal: boolean): void {
        this._formal = formal;
        for (const held of this.writing) held.formal = formal;
    }
}

export const Writing = $($Writing);
