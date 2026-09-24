import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Collection, Compilation } from '@/utilities/Collection';
import type { Author, Given } from '@/utilities/Collection';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';

export class $Writing extends $Chemical {
    protected _contents?: Contents;
    protected _annotations?: Annotations;
    id!: Compilation<string>;
    classes!: Collection<string>;
    containers!: Collection<ElementType>;
    specification: Specification<$Writing> = new WritingSpecification();

    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this.annotations.is; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) { this.annotations.is = given; }

    get contents(): Contents {
        return this._contents ?? (this._contents = new Contents(this));
    }

    get annotations(): Annotations {
        return this._annotations ?? (this._annotations = new Annotations(this));
    }

    $Writing(...chemicals: $Chemical[]) {
        this.id = new Compilation<string>();
        this.classes = new Collection<string>();
        this.containers = new Collection<ElementType>();
        this.containers.add(this, 'span');
        for (const chemical of chemicals)
            if (!(chemical instanceof $Annotation))
                this.contents.add(this, chemical);
        this.$Define();
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(this, chemical);
        this.annotations.define();
    }

    view(): ReactNode {
        this.annotations.define();
        const [Container, ...layers] = [...this.containers];
        const [id] = this.id;
        const className = [...new Set(this.classes)].join(' ') || undefined;
        const drawing = layers.reduceRight<ReactNode>((node, Layer) => <Layer>{node}</Layer>, (
            <>
                {this.write()}
                {this.annotate([...this.annotations].reverse())}
            </>
        ));
        return (
            <Container id={id} className={className}>
                {drawing}
            </Container>
        );
    }

    specify(code = this.specification.code(this)): string[] {
        const failures = this.specification.check(this, code);
        for (const annotation of this.annotations)
            if (this.annotations.expressed(annotation))
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
        return [...this.contents].map((chemical, index) => {
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
    specification = new AnnotationSpecification();

    $Annotation(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.classes.add(this, 'pd-annotation');
    }

    override view(): ReactNode {
        const writing = this.parent;
        const expressed = writing instanceof $Writing && writing.annotations.expressed(this) !== undefined;
        return (
            <>
                {super.view()}
                {expressed ? this.note() : null}
            </>
        );
    }

    note(): ReactNode { return null; }
    defines(writing: $Writing): void { }
    erase(writing: $Writing): void { }
    specifies(writing: $Writing, code?: string): string[] { return this.specification.check(writing, code); }
}

export class Contents extends Collection<$Chemical> {
    constructor(protected writing: $Writing) {
        super();
    }

    override add(author: Author, ...givens: Given<$Chemical>[]): $Chemical[] {
        return this.append(author, ...givens);
    }

    override append(author: Author, ...givens: Given<$Chemical>[]): $Chemical[] {
        const chemicals = givens.map(given => reflection.chemical(given, this.writing));
        super.append(author, ...chemicals);
        return chemicals;
    }

    override prepend(author: Author, ...givens: Given<$Chemical>[]): $Chemical[] {
        const chemicals = givens.map(given => reflection.chemical(given, this.writing));
        super.prepend(author, ...chemicals);
        return chemicals;
    }
}

export class Annotations extends Collection<$Annotation> {
    private _is: Given<$Annotation> | Given<$Annotation>[] = [];
    private established: $Annotation[] = [];
    private run: $Annotation[] = [];
    private unexpressed = new Set<$Annotation>();
    private reached = 0;
    edits: $Annotation[] = [];

    constructor(protected writing: $Writing) {
        super();
    }

    get is(): Given<$Annotation> | Given<$Annotation>[] { return this._is; }
    set is(given: Given<$Annotation> | Given<$Annotation>[]) {
        if (reflection.same(given, this._is)) return;
        this._is = given;
        const givens = Array.isArray(given) ? given : [given];
        this.edits = givens.map(edit => reflection.chemical(edit, this.writing));
    }

    define(): void {
        for (const annotation of [...this.run].reverse())
            annotation.erase(this.writing);
        this.revert(this);
        super.prepend(this, ...this.edits);
        this.established = [...super[Symbol.iterator]()];
        this.unexpressed.clear();
        this.run = [];
        this.reached = 0;
        for (const [index, annotation] of this.established.entries()) {
            this.reached = index + 1;
            if (!this.unexpressed.has(annotation)) {
                this.run.push(annotation);
                annotation.defines(this.writing);
            }
        }
    }

    express(annotation: $Annotation, expressed = true): void {
        if (expressed)
            this.unexpressed.delete(annotation);
        else
            this.unexpressed.add(annotation);
    }

    expressed<U extends $Annotation>(given: Given<U>): U | undefined {
        const expressed = this.find(given).filter(annotation => this.established.indexOf(annotation) < this.reached
            ? this.run.includes(annotation)
            : !this.unexpressed.has(annotation));
        return given instanceof $Annotation ? expressed.find(annotation => annotation === given) : expressed[0];
    }

    override [Symbol.iterator](): IterableIterator<$Annotation> {
        return this.established[Symbol.iterator]();
    }

    override add(author: Author, ...givens: Given<$Annotation>[]): $Annotation[] {
        return this.prepend(author, ...givens);
    }

    override append(author: Author, ...givens: Given<$Annotation>[]): $Annotation[] {
        const annotations = givens.map(given => reflection.chemical(given, this.writing));
        super.append(author, ...annotations);
        return annotations;
    }

    override prepend(author: Author, ...givens: Given<$Annotation>[]): $Annotation[] {
        const annotations = givens.map(given => reflection.chemical(given, this.writing));
        super.prepend(author, ...annotations);
        return annotations;
    }

    override contains<U extends $Annotation>(given: Given<U>): boolean {
        return this.expressed(given) !== undefined;
    }

    override containsOne<U extends $Annotation>(given: Given<U>): boolean {
        return this.find(given).filter(annotation => this.expressed(annotation) !== undefined).length === 1;
    }
}


export class $Parenthetical extends $Annotation {
    style = createGlobalStyle`
        .pa-parenthetical { display: none; }
    `;

    override note(): ReactNode { return <this.style />; }

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-parenthetical'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class $Narrative extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Parenthetical)
                writing.annotations.express(annotation, false);
    }
}

export class WritingSpecification extends Specification<$Writing> { }
export class AnnotationSpecification extends WritingSpecification { }

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
