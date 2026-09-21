import { ReactNode, createElement } from 'react';
import { $, $check, $Chemical, inert } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification, specify } from '@/utilities/Specification';

export class $Writing extends $Chemical {
    private _contents?: Collection<$Chemical>;
    private _annotations?: Collection<$Annotation>;
    protected _is: $Annotation[] = [];
    // ask: a trait the annotations define at every draw is inert, the framework's own word, so that defining it inside a view is not a change that redraws; is inert the right spelling here, or should the annotation system own a word for it?
    @inert() parenthetical = false;
    @inert() formal = false;

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

    get contents(): Collection<$Chemical> {
        const contents = Object.hasOwn(this, '_contents') ? this._contents : undefined;
        return contents ?? (this._contents = new Collection<$Chemical>(this));
    }

    get annotations(): Collection<$Annotation> {
        const annotations = Object.hasOwn(this, '_annotations') ? this._annotations : undefined;
        return annotations ?? (this._annotations = new Collection<$Annotation>(this));
    }

    // ask: an annotation enters at the front, so the later written has the last word (E26), and what $is stands is re-stood in front of them all; a class's own bond comes after this and stands in front of $is — should the dynamic form win there too?
    $Writing(...chemicals: $Chemical[]) {
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.prepend(chemical);
            else
                this.contents.add(chemical);
        this.$is = this._is;
    }

    // ask: the traits start from the class defaults and every enforced annotation defines over them, front last so what $is stands wins; a subclass with traits of its own resets them and then calls this. It runs where the traits are read, in view and in specify, and not in the bond, since a subclass adjusts its annotations after Writing's bond returns. Right?
    define(): void {
        this.parenthetical = false;
        this.formal = false;
        const annotations = [...this.annotations];
        for (let index = annotations.length - 1; index >= 0; index--)
            if (annotations[index].enforced)
                annotations[index].defines(this);
    }

    specify(): void {
        this.define();
        const specification = new WritingSpecification();
        specification.enforced = this.formal;
        specification.check(this);
        for (const annotation of [...this.annotations])
            if (annotation.enforced)
                annotation.specifies(this);
    }

    print(): ReactNode {
        return this.contents.map((chemical, index) => createElement($(chemical), { key: index }));
    }

    annotate(): ReactNode {
        return <span className="parenthetical">{this.annotations.map((annotation, index) => createElement($(annotation), { key: index }))}</span>;
    }

    view(): ReactNode {
        this.define();
        return <span className={this.parenthetical ? 'parenthetical' : undefined}>{this.print()}{this.annotate()}</span>;
    }
}

export class $Annotation extends $Writing {
    enforced = true;

    defines(writing: $Writing): void { }

    specifies(writing: $Writing): void { }
}

export class $Formal extends $Annotation {
    override defines(writing: $Writing): void { writing.formal = true; }
}

export class $Informal extends $Annotation {
    override defines(writing: $Writing): void { writing.formal = false; }
}

export class $Parenthetical extends $Annotation {
    override defines(writing: $Writing): void { writing.parenthetical = true; }
}

export class $Narrative extends $Annotation {
    override defines(writing: $Writing): void { writing.parenthetical = false; }
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
