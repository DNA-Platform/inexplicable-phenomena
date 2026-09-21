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
        this.$Reorganize();
        this.specify();
    }

    // ask: public, run at the end of the bond and by the suite; and does the suite call this, or check on a specification of its own?
    specify(): void {
        const specification = new WritingSpecification();
        specification.enforced = this.$formal;
        specification.check(this);
        for (const annotation of this.annotations)
            annotation.specifically(this);
    }

    // ask: a span, hidden by the attribute — or is hiding a Format's to do, and the element the class's?
    view(): ReactNode {
        const elements = this.contents.map((chemical, index) => createElement($(chemical), { key: index }));

        return this.$parenthetical ? <span hidden>{elements}</span> : <>{elements}</>;
    }

    protected $Reorganize(): void { }
}

export class $Annotation extends $Writing {
    override $parenthetical?: boolean = true;

    specifically(writing: $Writing): void { }
}

export class WritingSpecification extends Specification<$Writing> {
    // ask: two strings per rule, the description and the refusal; should one do, and should the rule's name be the $-method or the decorator?
    @specify('a piece of writing holds only writing')
    $holdsOnlyWriting(writing: $Writing): void {
        $check(writing.contents.every(chemical => chemical instanceof $Writing),
            'a piece of writing holds only writing, and this one holds something else');
    }
}

export const Writing = $($Writing);
export const Annotation = $($Annotation);
