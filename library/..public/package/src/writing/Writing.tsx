import { ReactNode, createElement } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import { Specification, specify } from '@/utilities/Specification';

export class $Writing extends $Chemical {
    $parenthetical?: boolean = false;
    contents = new Collection<$Chemical>();
    annotations = new Collection<$Annotation>();
    protected _formal = false;

    get $narrative(): boolean { return !this.$parenthetical; }
    set $narrative(narrative: boolean) { this.$parenthetical = !narrative; }

    get $formal(): boolean { return this._formal; }
    set $formal(formal: boolean) {
        this._formal = formal;
        for (const chemical of this.contents)
            if (chemical instanceof $Writing)
                chemical.$formal = formal;
        for (const annotation of this.annotations)
            annotation.$formal = formal;
    }

    $Writing(...chemicals: $Chemical[]) {
        this.contents = new Collection<$Chemical>();
        this.annotations = new Collection<$Annotation>();
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(chemical);
            else
                this.contents.add(chemical);
        for (let ancestor = this.parent; ancestor instanceof $Writing; ancestor = ancestor.parent === ancestor ? undefined : ancestor.parent)
            if (ancestor.$formal) {
                this._formal = true;
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
    override $parenthetical?: boolean = true;

    specifically(writing: $Writing): void { }
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
