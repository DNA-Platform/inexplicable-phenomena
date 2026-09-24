import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { ChemicalCollection, Collection } from '@/utilities/Collection';
import type { Author, Given, Side } from '@/utilities/Collection';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';

export class $Writing extends $Chemical {
    protected _contents?: ChemicalCollection<$Chemical>;
    protected _annotations?: Annotations;
    id?: string;
    classes!: Set<string>;
    containers!: Containers;
    specification: Specification<$Writing> = new WritingSpecification();

    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this.annotations.is; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) { this.annotations.is = given; }

    get contents(): ChemicalCollection<$Chemical> {
        return this._contents ?? (this._contents = new ChemicalCollection<$Chemical>(this));
    }

    get annotations(): Annotations {
        return this._annotations ?? (this._annotations = new Annotations(this));
    }

    $Writing(...chemicals: $Chemical[]) {
        this.classes = new Set<string>();
        this.containers = new Containers(this, 'span');
        for (const chemical of chemicals)
            if (!(chemical instanceof $Annotation))
                this.contents.add(chemical);
        this.$Define();
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(this, chemical);
        this.annotations.define();
    }

    view(): ReactNode {
        this.annotations.define();
        const [Container, ...layers] = [...this.containers];
        const className = [...this.classes].join(' ') || undefined;
        const drawing = layers.reduceRight<ReactNode>((node, Layer) => <Layer>{node}</Layer>, (
            <>
                {this.write()}
                {this.annotate([...this.annotations].reverse())}
            </>
        ));
        return (
            <Container id={this.id} className={className}>
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
    specification = new AnnotationSpecification();

    $Annotation(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this.classes.add('pd-annotation');
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

export class Annotations extends Collection<$Annotation> {
    private _is: Given<$Annotation> | Given<$Annotation>[] = [];
    private established: $Annotation[] = [];
    private run: $Annotation[] = [];
    private unexpressed = new Set<$Annotation>();
    private defining = false;
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
        this.change('left', this, ...this.edits);
        this.established = [...super[Symbol.iterator]()];
        this.unexpressed.clear();
        this.run = [];
        this.defining = true;
        for (const annotation of this.established)
            if (!this.unexpressed.has(annotation)) {
                this.run.push(annotation);
                annotation.defines(this.writing);
            }
        this.defining = false;
    }

    express(annotation: $Annotation, expressed = true): void {
        if (!this.defining || this.run.includes(annotation)) return;
        if (expressed)
            this.unexpressed.delete(annotation);
        else
            this.unexpressed.add(annotation);
    }

    expressed<U extends $Annotation>(given: Given<U>): U | undefined {
        return this.find(given).find(annotation => !this.unexpressed.has(annotation)
            && (!(given instanceof $Annotation) || annotation === given));
    }

    override [Symbol.iterator](): IterableIterator<$Annotation> {
        return this.established[Symbol.iterator]();
    }

    override add(author: Author, given: Given<$Annotation>, side: Side = 'left'): $Annotation {
        const annotation = reflection.chemical(given, this.writing);
        super.add(author, annotation, side);
        return annotation;
    }

    override contains<U extends $Annotation>(given: Given<U>): boolean {
        return this.expressed(given) !== undefined;
    }

    override containsOne<U extends $Annotation>(given: Given<U>): boolean {
        return this.find(given).filter(annotation => !this.unexpressed.has(annotation)).length === 1;
    }
}

type Layer = { key: object; container: ElementType };

export class Containers {
    private layers: Layer[] = [];

    constructor(key: object, container: ElementType) {
        this.add(key, container);
    }

    [Symbol.iterator](): IterableIterator<ElementType> {
        return this.layers.map(layer => layer.container)[Symbol.iterator]();
    }

    prepend(key: object, container: ElementType): void {
        const index = this.layers.findIndex(layer => layer.key === key);
        if (index < 0)
            this.layers.unshift({ key, container });
        else
            this.layers[index] = { key, container };
    }

    add(key: object, container: ElementType): void {
        const index = this.layers.findIndex(layer => layer.key === key);
        if (index < 0)
            this.layers.push({ key, container });
        else
            this.layers[index] = { key, container };
    }

    remove(key: object): void {
        this.layers = this.layers.filter(layer => layer.key !== key);
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
            writing.annotations.express(parenthetical, false);
    }
}

export class WritingSpecification extends Specification<$Writing> { }
export class AnnotationSpecification extends WritingSpecification { }

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
