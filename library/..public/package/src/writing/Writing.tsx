import { ReactNode, createElement } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification, specify } from '@/utilities/Specification';

export class $Writing extends $Chemical {
    private _contents?: Collection<$Chemical>;
    private _annotations?: Collection<$Annotation>;
    protected _is: $Annotation[] = [];

    get $parenthetical(): boolean { return this.annotations.contains($Parenthetical); }
    set $parenthetical(parenthetical: boolean) { this.annotations.enforce(parenthetical ? $Parenthetical : $Narrative); }
    get $narrative(): boolean { return !this.$parenthetical; }
    set $narrative(narrative: boolean) { this.$parenthetical = !narrative; }

    // ask: the JSX prop is typed from the read side, so the getter declares what the setter takes though it answers only annotations; a framework fact, or ours to change?
    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this._is; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) {
        for (const annotation of this._is)
            this.annotations.drop(annotation);
        this._is = [];
        const givens = Array.isArray(given) ? given : [given];
        for (let index = givens.length - 1; index >= 0; index--)
            this._is.unshift(this.annotations.prepend(givens[index]));
    }

    get $formal(): boolean { return this.annotations.contains($Formal); }
    set $formal(formal: boolean) {
        this.annotations.enforce(formal ? $Formal : $Informal);
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
    }

    specify(): void {
        const specification = new WritingSpecification();
        specification.enforced = this.$formal;
        specification.check(this);
        for (const annotation of this.annotations)
            if (annotation.enforced)
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
}

export class $Annotation extends $Writing {
    enforced = true;

    specifically(writing: $Writing): void { }
}

export class $Formal extends $Annotation { }

// ask: an opposite names the class it opposes and is filed under it, so it is found where its twin would be and reads as absence; is `opposite` the word?
export class $Informal extends $Annotation {
    get opposite(): Function { return $Formal; }
}

export class $Parenthetical extends $Annotation { }

export class $Narrative extends $Annotation {
    get opposite(): Function { return $Parenthetical; }
}

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
export const Informal = $($Informal);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
