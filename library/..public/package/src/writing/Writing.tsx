import { ReactNode, createElement } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification, specify } from '@/utilities/Specification';

export class $Writing extends $Chemical {
    private _contents?: Collection<$Chemical>;
    private _annotations?: Collection<$Annotation>;
    protected _annotated: $Annotation[] = [];

    get $parenthetical(): boolean { return this.annotations.contains($Parenthetical); }
    set $parenthetical(parenthetical: boolean) { this.annotations[parenthetical ? 'ensure' : 'remove']($Parenthetical); }
    get $narrative(): boolean { return !this.$parenthetical; }
    set $narrative(narrative: boolean) { this.$parenthetical = !narrative; }

    get $annotations(): Given<$Annotation>[] { return this._annotated; }
    set $annotations(given: Given<$Annotation>[]) {
        for (const annotation of this._annotated)
            this.annotations.drop(annotation);
        this._annotated = [...given].reverse().map(one => this.annotations.prepend(one)).reverse();
    }

    get $formal(): boolean { return this.annotations.contains($Formal); }
    set $formal(formal: boolean) {
        this.annotations[formal ? 'ensure' : 'remove']($Formal);
        for (const chemical of this.contents)
            if (chemical instanceof $Writing)
                chemical.$formal = formal;
    }

    get contents(): Collection<$Chemical> {
        const contents = Object.hasOwn(this, '_contents') ? this._contents : undefined;
        return contents ?? (this._contents = new Collection<$Chemical>(this));
    }

    get annotations(): Collection<$Annotation> {
        const annotations = Object.hasOwn(this, '_annotations') ? this._annotations : undefined;
        return annotations ?? (this._annotations = new Collection<$Annotation>(this));
    }

    $Writing(...chemicals: $Chemical[]) {
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(chemical);
            else
                this.contents.add(chemical);
        for (let ancestor = this.parent; ancestor instanceof $Writing; ancestor = ancestor.parent === ancestor ? undefined : ancestor.parent)
            if (ancestor.$formal) {
                this.annotations.ensure($Formal);
                break;
            }
        this.$Reorganize();
        this.specify();
    }

    specify(): void {
        const specification = new WritingSpecification();
        specification.enforced = this.$formal;
        specification.check(this);
        for (const annotation of this.annotations)
            annotation.specifically(this);
    }

    print(): ReactNode {
        return this.contents.map((chemical, index) => createElement($(chemical), { key: index }));
    }

    annotate(): ReactNode {
        return <span className="parenthetical">{this.annotations.map((annotation, index) => createElement($(annotation), { key: index }))}</span>;
    }

    view(): ReactNode {
        return <span className={this.$parenthetical ? 'parenthetical' : undefined}>{this.print()}{this.annotate()}</span>;
    }

    protected $Reorganize(): void { }
}

export class $Annotation extends $Writing {
    specifically(writing: $Writing): void { }
}

export class $Formal extends $Annotation { }

export class $Parenthetical extends $Annotation { }

export class WritingSpecification extends Specification<$Writing> {
    @specify('a piece of writing holds only writing')
    $holdsOnlyWriting(writing: $Writing): void {
        $check(writing.contents.every(chemical => chemical instanceof $Writing),
            'a piece of writing holds only writing, and this one holds something else');
    }
}

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Formal = $($Formal);
export const Parenthetical = $($Parenthetical);
