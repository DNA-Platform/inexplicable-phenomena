import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification, specify } from '@/utilities/Specification';
import { Annotations } from './Annotations';

export class $Writing extends $Chemical {
    protected _contents?: Collection<$Chemical>;
    protected _annotations?: Annotations;
    protected _is: Given<$Annotation> | Given<$Annotation>[] = [];
    edits!: $Annotation[];
    classes!: Set<string>;
    specification: Specification<$Writing> = new WritingSpecification();
    container: ElementType = 'span';

    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this._is; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) {
        this._is = given;
        if (this.edits === undefined) return;
        for (const annotation of this.edits) {
            this.annotations.drop(annotation);
            annotation.erase(this);
        }
        this.edits = this.annotations.prepend(...(Array.isArray(given) ? given : [given]));
    }

    get contents(): Collection<$Chemical> {
        const contents = Object.hasOwn(this, '_contents') ? this._contents : undefined;
        return contents ?? (this._contents = new Collection<$Chemical>(this));
    }

    get annotations(): Annotations {
        const annotations = Object.hasOwn(this, '_annotations') ? this._annotations : undefined;
        return annotations ?? (this._annotations = new Annotations(this));
    }

    $Writing(...chemicals: $Chemical[]) {
        this.classes = new Set<string>();
        this.edits = [];
        this.$Redefine();
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(chemical);
            else
                this.contents.add(chemical);
        this.$is = this._is;
        this.define();
    }

    view(): ReactNode {
        this.define();
        const Container = this.container;
        const classes = [...this.classes].join(' ') || undefined;
        return (
            <Container className={classes}>
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

    is(given: (new () => $Annotation) | Component): boolean {
        const chemical = (given as { $chemical?: $Chemical }).$chemical;
        const Class = chemical === undefined ? given as new () => $Annotation : chemical.constructor as new () => $Annotation;
        return this.annotations.contains(Class);
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

    protected $Redefine(): void { }

    protected define(): void {
        for (const annotation of [...this.annotations])
            if (annotation.enforced)
                annotation.defines(this);
            else
                annotation.erase(this);
    }
}

export class $Annotation extends $Writing {
    enforced = true;
    override specification: Specification<$Writing> = new AnnotationSpecification();

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

export class WritingSpecification extends Specification<$Writing> {
    @specify('a piece of writing holds only writing')
    $holdsOnlyWriting(writing: $Writing): void {
        $check(writing.contents.every(chemical => chemical instanceof $Writing),
            'a piece of writing holds only writing, and this one holds something else');
    }
}

export class AnnotationSpecification extends WritingSpecification {
    override $holdsOnlyWriting(): void { }
}

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
