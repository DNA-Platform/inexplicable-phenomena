import { ReactNode, createElement } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import type { $Annotation } from './Annotation';

export class $Writing extends $Chemical {
    $parenthetical?: boolean = false;
    formal = false;
    static declared: (new () => $Annotation)[] = [];
    protected source: $Chemical[] = [];
    protected specification: Specification<$Writing> = new WritingSpecification();

    get $narrative(): boolean { return !this.$parenthetical; }
    set $narrative(narrative: boolean) { this.$parenthetical = !narrative; }
    get annotation(): boolean { return false; }
    get contents(): $Chemical[] { return this.source.filter(chemical => !(chemical instanceof $Writing && chemical.annotation)); }
    get annotations(): $Annotation[] { return this.source.filter((chemical): chemical is $Annotation => chemical instanceof $Writing && chemical.annotation); }
    get writing(): $Writing[] { return this.source.filter((chemical): chemical is $Writing => chemical instanceof $Writing); }

    $Writing(...source: $Chemical[]) {
        this.source = [...source];
        for (const Annotation of (this.constructor as typeof $Writing).declared)
            this.ensure($check(Annotation, '!'));
        this.$Reorganize();
        this.specify();
    }

    add(annotation: $Annotation): void {
        this.source = [...this.source, annotation];
    }

    replace(annotation: $Annotation): void {
        const Annotation = annotation.constructor as new () => $Annotation;
        const index = this.source.findIndex(chemical => chemical instanceof Annotation);
        if (index < 0) return;
        this.source = this.source.map((chemical, at) => at === index ? annotation : chemical);
    }

    ensure(annotation: $Annotation): void {
        const Annotation = annotation.constructor as new () => $Annotation;
        if (this.find(Annotation).length > 0) return;
        const index = this.source.findIndex(chemical =>
            chemical instanceof $Writing && chemical.annotation && annotation instanceof (chemical.constructor as new () => $Annotation));
        if (index < 0) return this.add(annotation);
        this.source = this.source.map((chemical, at) => at === index ? annotation : chemical);
    }

    remove<T extends $Annotation>(Annotation: new () => T): void {
        this.source = this.source.filter(chemical => !(chemical instanceof Annotation));
    }

    find<T extends $Annotation>(Annotation: new () => T): T[] {
        return this.source.filter((chemical): chemical is T => chemical instanceof Annotation);
    }

    specify(): void {
        this.specification.enforced = this.formal;
        this.specification.check(this);
        for (const annotation of this.annotations)
            annotation.specifically(this);
    }

    view(): ReactNode {
        const elements = this.contents.map((chemical, index) => createElement($(chemical), { key: index }));

        return this.$parenthetical ? <span hidden>{elements}</span> : <>{elements}</>;
    }

    protected $Reorganize(): void { }
}

export class WritingSpecification extends Specification<$Writing> {
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
