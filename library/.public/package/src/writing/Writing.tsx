import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Collection, Compilation } from '@/utilities/Collection';
import type { Author, Given } from '@/utilities/Collection';
import { Specification } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import type { $Book } from '@/library/Book';

export class $Writing extends $Chemical {
    protected _text?: Text;
    protected _annotations?: Annotations;
    protected _book?: $Book;
    id!: Compilation<string>;
    classes!: Collection<string>;
    containers!: Collection<ElementType>;
    specification: Specification<$Writing> = new WritingSpecification();

    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this.annotations.edit; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) { this.annotations.edit = given; }

    get $book(): $Book | undefined {
        return this._book ?? (this.parent instanceof $Writing && this.parent !== this ? this.parent.$book : undefined);
    }
    set $book(value: $Book) { this._book = value; }

    get text(): Text {
        return this._text ?? (this._text = new Text(this));
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
                this.text.add(this, chemical);
        this.$Define();
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(this, chemical);
        this.annotations.define();
    }

    view(): ReactNode {
        this.annotations.define();
        const [Container, ...layers] = [...this.containers];
        const className = [...new Set(this.classes)].join(' ') || undefined;
        return layers.reduce<ReactNode>((drawing, Layer) => <Layer className="pd-container">{drawing}</Layer>, (
            <Container id={this.id.value} className={className}>
                {this.write()}
                {this.annotate([...this.annotations].reverse())}
            </Container>
        ));
    }

    specify(code = this.specification.code(this)): string[] {
        const failures = this.specification.check(this, code);
        for (const annotation of this.annotations)
            if (this.annotations.expressed(annotation))
                failures.push(...annotation.specifies(this, code));
        for (const [index, chemical] of [...this.text].entries())
            if (chemical instanceof $Writing)
                failures.push(...chemical.specify(chemical.specification.code(chemical, code, index)));
        return failures;
    }

    is(given: Given<$Annotation>): boolean {
        return this.annotations.contains(given);
    }

    write(): ReactNode {
        return [...this.text].map((chemical, index) => {
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

    protected $Bound(): void {
        for (const chemical of this.text)
            if (chemical instanceof $Writing)
                chemical.$Bound();
        for (const annotation of this.annotations)
            annotation.$Bound();
    }
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

export class Text extends Collection<$Chemical> {
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
    protected _edit: Given<$Annotation> | Given<$Annotation>[] = [];
    protected _edits: $Annotation[] = [];
    protected established: $Annotation[] = [];
    protected defined: $Annotation[] = [];
    protected unexpressed = new Set<$Annotation>();
    protected reached = 0;

    get edits(): $Annotation[] { return this._edits; }

    get edit(): Given<$Annotation> | Given<$Annotation>[] { return this._edit; }
    set edit(given: Given<$Annotation> | Given<$Annotation>[]) {
        if (reflection.same(given, this._edit)) return;
        this._edit = given;
        this._edits = [given].flat().map(edit => reflection.chemical(edit, this.writing));
    }

    constructor(protected writing: $Writing) {
        super();
    }

    define(): void {
        for (const annotation of [...this.defined].reverse())
            annotation.erase(this.writing);
        this.revert(this);
        super.prepend(this, ...this._edits);
        this.established = [...this.values];
        this.defined = [];
        this.unexpressed.clear();
        this.reached = 0;
        for (const [index, annotation] of this.established.entries()) {
            this.reached = index + 1;
            if (this.unexpressed.has(annotation)) continue;
            this.defined.push(annotation);
            annotation.defines(this.writing);
        }
    }

    express(annotation: $Annotation, expressed = true): void {
        if (expressed)
            this.unexpressed.delete(annotation);
        else
            this.unexpressed.add(annotation);
    }

    expressed<U extends $Annotation>(given: Given<U>): U | undefined {
        const annotations = this.find(given).filter(annotation => this.expresses(annotation));
        return given instanceof $Annotation ? annotations.find(annotation => annotation === given) : annotations[0];
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
        return this.find(given).filter(annotation => this.expresses(annotation)).length === 1;
    }

    protected expresses(annotation: $Annotation): boolean {
        return this.established.indexOf(annotation) < this.reached
            ? this.defined.includes(annotation)
            : !this.unexpressed.has(annotation);
    }
}

export class $Parenthetical extends $Annotation {
    style = createGlobalStyle`
        .pa-parenthetical,
        .pd-container:has(> .pa-parenthetical),
        .pd-container:has(> .pd-container > .pa-parenthetical),
        .pd-container:has(> .pd-container > .pd-container > .pa-parenthetical),
        .pd-container:has(> .pd-container > .pd-container > .pd-container > .pa-parenthetical) {
            display: none;
        }
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

export class $Blank extends $Annotation {
    style = createGlobalStyle`
        .pa-blank {
            visibility: hidden;
        }
    `;

    override note(): ReactNode { return <this.style />; }

    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-blank'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export class WritingSpecification extends Specification<$Writing> { }
export class AnnotationSpecification extends WritingSpecification { }

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
export const Blank = $($Blank);
