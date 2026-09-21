import { ElementType, ReactNode } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification, specify } from '@/utilities/Specification';

export class $Writing extends $Chemical {
    private _contents?: Collection<$Chemical>;
    private _annotations?: Collection<$Annotation>;
    container: ElementType = 'span';
    protected is: $Annotation[] = [];

    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this.is; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) {
        for (const annotation of this.is)
            this.annotations.drop(annotation);
        this.is = this.annotations.prepend(...(Array.isArray(given) ? given : [given]));
    }

    get contents(): Collection<$Chemical> {
        const contents = Object.hasOwn(this, '_contents') ? this._contents : undefined;
        return contents ?? (this._contents = new Collection<$Chemical>(this));
    }

    get annotations(): Collection<$Annotation> {
        const annotations = Object.hasOwn(this, '_annotations') ? this._annotations : undefined;
        return annotations ?? (this._annotations = new Collection<$Annotation>(this));
    }

    $Writing(...chemicals: $Chemical[]) {
        const annotations: $Annotation[] = [];
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                annotations.unshift(chemical);
            else
                this.contents.add(chemical);
        this.annotations.add(...annotations);
        this.define();
    }

    view(): ReactNode {
        this.define();
        const Container = this.container;
        const parenthetical = this.annotations.contains($Parenthetical);
        return (
            <Container className={parenthetical ? 'pd-parenthetical' : undefined}>
                {this.write()}
                {this.annotate()}
            </Container>
        );
    }

    specify(): string[] {
        const failures = new WritingSpecification().check(this);
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

    write(): ReactNode {
        return this.contents.map((chemical, index) => {
            const Chemical = $(chemical);
            return <Chemical key={index} />;
        });
    }

    annotate(): ReactNode {
        return (
            <span className="pd-annotations">
                {this.annotations.map((annotation, index) => {
                    const Annotation = $(annotation);
                    return <Annotation key={index} />;
                })}
            </span>
        );
    }

    protected define(): void {
        const annotations = [...this.annotations];
        for (let index = annotations.length - 1; index >= 0; index--)
            if (annotations[index].enforced)
                annotations[index].defines(this);
    }
}

export class $Annotation extends $Writing {
    enforced = true;
    defines(writing: $Writing): void { }
    specifies(writing: $Writing): void { }
}

export class $Parenthetical extends $Annotation { }

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

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
