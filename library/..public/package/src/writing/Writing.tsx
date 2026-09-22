import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $Chemical, reactive } from '@dna-platform/chemistry';
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

    is(given: Given<$Annotation>): boolean {
        return this.annotations.contains(given);
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

export class Annotations extends Collection<$Annotation> {
    private _is: Given<$Annotation> | Given<$Annotation>[] = [];
    edits: $Annotation[] = [];

    constructor(protected override parent: $Writing) {
        super(parent);
    }

    get is(): Given<$Annotation> | Given<$Annotation>[] { return this._is; }
    set is(given: Given<$Annotation> | Given<$Annotation>[]) {
        if (same(given, this._is)) return;
        for (const annotation of this.edits) {
            this.drop(annotation);
            annotation.erase(this.parent);
        }
        this._is = given;
        this.edits = this.prepend(...(Array.isArray(given) ? given : [given]));
    }

    define(): void {
        for (const annotation of this.edits)
            this.drop(annotation);
        this.prepend(...this.edits);
        for (const annotation of [...this])
            if (annotation.enforced)
                annotation.defines(this.parent);
            else
                annotation.erase(this.parent);
    }

    enforced<U extends $Annotation>(given: Given<U>): U | undefined {
        return this.find(given).find(annotation => annotation.enforced);
    }

    override add(...givens: Given<$Annotation>[]): $Annotation[] {
        return this.prepend(...givens);
    }

    override contains<U extends $Annotation>(given: Given<U>): boolean {
        return this.enforced(given) !== undefined;
    }

    override containsOne<U extends $Annotation>(given: Given<U>): boolean {
        return this.find(given).filter(annotation => annotation.enforced).length === 1;
    }

    override toString(): string {
        let text = '';
        for (const annotation of this) text += `${annotation}[${annotation.enforced}],`;
        return text;
    }
}

function same(given: Given<$Annotation> | Given<$Annotation>[], other: Given<$Annotation> | Given<$Annotation>[]): boolean {
    if (given === other) return true;
    return Array.isArray(given) && Array.isArray(other) && given.length === other.length && given.every((each, index) => each === other[index]);
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
