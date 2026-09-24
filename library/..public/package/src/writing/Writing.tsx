import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';

export class $Writing extends $Chemical {
    protected _contents?: Collection<$Chemical>;
    protected _annotations?: Annotations;
    id?: string;
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
        for (const chemical of chemicals)
            if (!(chemical instanceof $Annotation))
                this.contents.add(chemical);
        this.$Define();
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(chemical);
        this.annotations.define();
    }

    view(): ReactNode {
        this.annotations.define();
        const Container = this.container;
        const className = [...this.classes].join(' ') || undefined;
        return (
            <Container id={this.id} className={className}>
                {this.write()}
                {this.annotate([...this.annotations].reverse())}
            </Container>
        );
    }

    specify(code = this.specification.code(this)): string[] {
        const failures = this.specification.check(this, code);
        for (const annotation of [...this.annotations])
            if (annotation.expressed)
                failures.push(...annotation.specifies(this, code));
        for (const [index, chemical] of [...this.contents].entries())
            if (chemical instanceof $Writing)
                failures.push(...chemical.specify(chemical.specification.code(chemical, code, index)));
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
    private _enforced = true;
    specification = new AnnotationSpecification();

    get expressed(): boolean { return this._enforced; }

    $Annotation(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.classes.add('pd-annotation');
    }

    override view(): ReactNode {
        return (
            <>
                {super.view()}
                {this.expressed ? this.note() : null}
            </>
        );
    }

    note(): ReactNode { return null; }
    express(expressed = true): void { this._enforced = expressed; }
    defines(writing: $Writing): void { }
    erase(writing: $Writing): void { }
    specifies(writing: $Writing, code?: string): string[] { return this.specification.check(writing, code); }
}

export class Annotations extends Collection<$Annotation> {
    private _is: Given<$Annotation> | Given<$Annotation>[] = [];
    edits: $Annotation[] = [];

    constructor(protected override parent: $Writing) {
        super(parent);
    }

    get is(): Given<$Annotation> | Given<$Annotation>[] { return this._is; }
    set is(given: Given<$Annotation> | Given<$Annotation>[]) {
        if (reflection.same(given, this._is)) return;
        for (const annotation of this.edits)
            this.leave(annotation);
        this._is = given;
        this.edits = this.prepend(...(Array.isArray(given) ? given : [given]));
    }

    define(): void {
        for (const annotation of this.edits)
            this.drop(annotation);
        this.prepend(...this.edits);
        for (const annotation of this)
            annotation.express();
        for (const annotation of [...this])
            if (annotation.expressed)
                annotation.defines(this.parent);
            else
                annotation.erase(this.parent);
    }

    expressed<U extends $Annotation>(given: Given<U>): U | undefined {
        return this.find(given).find(annotation => annotation.expressed);
    }

    override add(...givens: Given<$Annotation>[]): $Annotation[] {
        return this.prepend(...givens);
    }

    override remove<U extends $Annotation>(given: Given<U>): void {
        for (const annotation of this.find(given))
            this.leave(annotation);
    }

    protected leave(annotation: $Annotation): void {
        this.drop(annotation);
        annotation.erase(this.parent);
    }

    override contains<U extends $Annotation>(given: Given<U>): boolean {
        return this.expressed(given) !== undefined;
    }

    override containsOne<U extends $Annotation>(given: Given<U>): boolean {
        return this.find(given).filter(annotation => annotation.expressed).length === 1;
    }
}


export class $Parenthetical extends $Annotation {
    style = createGlobalStyle`
        .pa-parenthetical { display: none; }
    `;

    override note(): ReactNode { return <this.style />; }

    override defines(writing: $Writing): void { writing.classes.add('pa-parenthetical'); }
    override erase(writing: $Writing): void { writing.classes.delete('pa-parenthetical'); }
}

export class $Narrative extends $Annotation {
    override defines(writing: $Writing): void {
        for (const parenthetical of writing.annotations.find($Parenthetical))
            parenthetical.express(false);
    }
}

export class WritingSpecification extends Specification<$Writing> { }
export class AnnotationSpecification extends WritingSpecification { }

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
