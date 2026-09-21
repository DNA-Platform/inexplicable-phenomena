import { ReactNode, createElement } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
// ask: Writing and Annotation are born together (E5) and refer to each other; one file, or two with the cycle declared as now?
import { $Annotation } from './Annotation';

export class $Writing extends $Chemical {
    $parenthetical?: boolean = false;
    // ask: a proxy name, and a static list where E21 has a subclass add its annotations in its bond — should this go, and each class ensure its own in $Reorganize?
    static declared: (new () => $Annotation)[] = [];
    protected source: $Chemical[] = [];
    // ask: one instance on the template, shared by every mount, which is why enforced is echoed at specify — a static per class instead, or a getter?
    protected specification: Specification<$Writing> = new WritingSpecification();
    protected _formal = false;

    get $narrative(): boolean { return !this.$parenthetical; }
    set $narrative(narrative: boolean) { this.$parenthetical = !narrative; }

    get $formal(): boolean { return this._formal; }
    set $formal(formal: boolean) {
        this._formal = formal;
        for (const chemical of this.source)
            if (chemical instanceof $Writing)
                chemical.$formal = formal;
    }

    get contents(): $Chemical[] {
        return this.source.filter(chemical => !(chemical instanceof $Annotation));
    }

    get annotations(): $Annotation[] {
        return this.source.filter((chemical): chemical is $Annotation => chemical instanceof $Annotation);
    }

    $Writing(...source: $Chemical[]) {
        // ask: the copy is defensive; does source take the arguments as they come?
        this.source = [...source];
        // ask: the framework's find-or-make builds a declared annotation; or $(<Annotation />)?
        for (const Annotation of (this.constructor as typeof $Writing).declared)
            this.ensure($check(Annotation, '!'));
        this.$Reorganize();
        this.specify();
    }

    // ask: E65's five are about annotations; does anything but an annotation ever enter source after the bond?
    add(annotation: $Annotation): void {
        this.source = [...this.source, annotation];
    }

    replace(annotation: $Annotation): void {
        // ask: the constructor cast stands three times; should an annotation answer its own class, or the class be handed in beside it?
        const Annotation = annotation.constructor as new () => $Annotation;
        const index = this.source.findIndex(chemical => chemical instanceof Annotation);
        if (index < 0) return;
        // ask: a new array on every change, or mutate in place, which the framework's collection tracking sees?
        this.source = this.source.map((chemical, at) => at === index ? annotation : chemical);
    }

    ensure(annotation: $Annotation): void {
        const Annotation = annotation.constructor as new () => $Annotation;
        if (this.find(Annotation).length > 0) return;
        const index = this.source.findIndex(chemical =>
            chemical instanceof $Annotation && annotation instanceof (chemical.constructor as new () => $Annotation));
        if (index < 0) return this.add(annotation);
        this.source = this.source.map((chemical, at) => at === index ? annotation : chemical);
    }

    remove<T extends $Annotation>(Annotation: new () => T): void {
        this.source = this.source.filter(chemical => !(chemical instanceof Annotation));
    }

    find<T extends $Annotation>(Annotation: new () => T): T[] {
        return this.source.filter((chemical): chemical is T => chemical instanceof Annotation);
    }

    // ask: public, run at the end of the bond and by the suite; and does the suite call this, or check on the specification?
    specify(): void {
        this.specification.enforced = this.$formal;
        this.specification.check(this);
        for (const annotation of this.annotations)
            annotation.specifically(this);
    }

    // ask: a span, hidden by the attribute — or is hiding a Format's to do, and the element the kind's?
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
        $check((writing.constructor as typeof $Writing).declared.every(Annotation => writing.find(Annotation).length > 0),
            'the annotations a piece of writing declares are built, and one of these is missing');
    }
}

export const Writing = $($Writing);
