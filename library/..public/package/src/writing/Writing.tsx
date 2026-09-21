import { ReactNode, createElement } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import { Specification, specify } from '@/utilities/Specification';
// ask: Writing and Annotation are born together (E5) and refer to each other; one file, or two with the cycle declared as now?
import { $Annotation } from './Annotation';

export class $Writing extends $Chemical {
    $parenthetical?: boolean = false;
    contents = new Collection<$Chemical>();
    annotations = new Collection<$Annotation>();
    // ask: a proxy name, and a static list where E21 has a subclass add its annotations in its bond — should this go, and each class ensure its own in $Reorganize?
    static declared: (new () => $Annotation)[] = [];
    // ask: one instance on the template, shared by every mount, which is why enforced is echoed at specify — a static per class instead, or a getter?
    protected specification: Specification<$Writing> = new WritingSpecification();
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

    // ask: the two collections are fields, so each mount must get its own — made here rather than in the initializer, or is a field initializer per derivative?
    $Writing(...chemicals: $Chemical[]) {
        this.contents = new Collection<$Chemical>();
        this.annotations = new Collection<$Annotation>();
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(chemical);
            else
                this.contents.add(chemical);
        // ask: the framework's find-or-make builds a declared annotation; or $(<Annotation />)?
        for (const Annotation of (this.constructor as typeof $Writing).declared)
            this.annotations.ensure($check(Annotation, '!'));
        this.$Reorganize();
        this.specify();
    }

    // ask: public, run at the end of the bond and by the suite; and does the suite call this, or check on the specification?
    specify(): void {
        this.specification.enforced = this.$formal;
        this.specification.check(this);
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

export class WritingSpecification extends Specification<$Writing> {
    // ask: two strings per rule, the description and the refusal; should one do, and should the rule's name be the $-method or the decorator?
    @specify('a piece of writing holds only writing')
    $holdsOnlyWriting(writing: $Writing): void {
        $check(writing.contents.every(chemical => chemical instanceof $Writing),
            'a piece of writing holds only writing, and this one holds something else');
    }

    @specify('the annotations a piece of writing declares are built')
    $declaredAreBuilt(writing: $Writing): void {
        $check((writing.constructor as typeof $Writing).declared.every(Annotation => writing.annotations.find(Annotation).length > 0),
            'the annotations a piece of writing declares are built, and one of these is missing');
    }
}

export const Writing = $($Writing);
