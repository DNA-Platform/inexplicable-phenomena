import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $Chemical, reactive } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification } from '@/utilities/Specification';

export class $Writing extends $Chemical {
    @reactive() protected _contents?: Collection<$Chemical>;
    @reactive() protected _annotations?: Annotations;
    classes!: Set<string>;
    specification: Specification<$Writing> = new WritingSpecification();
    container: ElementType = 'span';

    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this.annotations.is; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) { this.annotations.is = given; }

    get contents(): Collection<$Chemical> {
        return this._contents ?? (this._contents = new Collection<$Chemical>(this));
    }

    get annotations(): Annotations {
        return this._annotations ?? (this._annotations = new Annotations(this));
    }

    $Writing(...chemicals: $Chemical[]) {
        this.classes = new Set<string>();
        this.$Define();
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(chemical);
            else
                this.contents.add(chemical);
        this.annotations.define();
    }

    view(): ReactNode {
        this.annotations.define();
        const Container = this.container;
        const className = [...this.classes].join(' ') || undefined;
        return (
            <Container className={className}>
                {this.write()}
                {this.annotate([...this.annotations].reverse())}
            </Container>
        );
    }

    specify(): string[] {
        const failures = this.specification.check(this);
        for (const annotation of [...this.annotations])
            if (annotation.enforced)
                try {
                    annotation.specifies(this);
                } catch (error) {
                    failures.push((error as Error).message);
                }
        for (const chemical of [...this.contents, ...this.annotations])
            if (chemical instanceof $Writing)
                failures.push(...chemical.specify());
        return failures;
    }

    is(representation: Representation<$Annotation>): boolean {
        return this.annotations.contains(representation);
    }

    write(): ReactNode {
        return this.contents.map((chemical, index) => {
            const Chemical = $(chemical);
            return <Chemical key={index} />;
        });
    }

    annotate(annotations: $Annotation[]): ReactNode {
        return annotations.map((annotation, index) => {
            const Annotation = $(annotation);
            return <Annotation key={index} />;
        });
    }

    protected $Define(): void { }
}

export class $Annotation extends $Writing {
    enforced = true;
    specification = new AnnotationSpecification();

    $Annotation(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.classes.add('pd-annotation');
    }

    override view(): ReactNode {
        return (
            <>
                {super.view()}
                {this.enforced ? this.note() : null}
            </>
        );
    }

    note(): ReactNode { return null; }
    defines(writing: $Writing): void { }
    erase(writing: $Writing): void { }
    specifies(writing: $Writing): void { }
}

export type Representation<U extends $Annotation> = (new () => U) | Component;

export class Annotations extends Collection<$Annotation> {
    private applied?: Given<$Annotation> | Given<$Annotation>[];
    is: Given<$Annotation> | Given<$Annotation>[] = [];
    edits: $Annotation[] = [];

    constructor(protected override parent: $Writing) {
        super(parent);
    }

    define(): void {
        if (this.is !== this.applied) {
            for (const annotation of this.edits) {
                this.drop(annotation);
                annotation.erase(this.parent);
            }
            this.edits = this.prepend(...(Array.isArray(this.is) ? this.is : [this.is]));
            this.applied = this.is;
        }
        for (const annotation of [...this])
            if (annotation.enforced)
                annotation.defines(this.parent);
            else
                annotation.erase(this.parent);
    }

    enforced<U extends $Annotation>(representation: Representation<U>): U | undefined {
        return this.find(representation).find(annotation => annotation.enforced);
    }

    override add(...givens: Given<$Annotation>[]): $Annotation[] {
        return this.prepend(...givens);
    }

    override find<U extends $Annotation>(representation: Representation<U>): ReadonlyArray<U> {
        return super.find(classOf(representation));
    }

    override contains<U extends $Annotation>(representation: Representation<U>): boolean {
        return this.enforced(representation) !== undefined;
    }

    override containsOne<U extends $Annotation>(representation: Representation<U>): boolean {
        return this.find(representation).filter(annotation => annotation.enforced).length === 1;
    }

    override toString(): string {
        let text = '';
        for (const annotation of this) text += `${annotation}[${annotation.enforced}],`;
        return text;
    }
}

function classOf<U extends $Annotation>(representation: Representation<U>): new () => U {
    const chemical = (representation as { $chemical?: $Chemical }).$chemical;
    return chemical === undefined ? representation as new () => U : chemical.constructor as new () => U;
}

const ParentheticalStyle = createGlobalStyle`
    .pd-parenthetical { display: none; }
`;

export class $Parenthetical extends $Annotation {
    override note(): ReactNode { return <ParentheticalStyle />; }
    override defines(writing: $Writing): void { writing.classes.add('pd-parenthetical'); }
    override erase(writing: $Writing): void { writing.classes.delete('pd-parenthetical'); }
}

export class $Narrative extends $Annotation {
    override defines(writing: $Writing): void {
        for (const parenthetical of writing.annotations.find($Parenthetical))
            parenthetical.enforced = false;
    }
}

export class WritingSpecification extends Specification<$Writing> { }

export class AnnotationSpecification extends WritingSpecification { }

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
