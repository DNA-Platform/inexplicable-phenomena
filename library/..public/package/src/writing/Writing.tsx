import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification } from '@/utilities/Specification';
import { Annotations } from './Annotations';
import type { Kind } from './Annotations';

export class $Writing extends $Chemical {
    protected _contents?: Collection<$Chemical>;
    protected _annotations?: Annotations;
    classes!: Set<string>;
    specification: Specification<$Writing> = new WritingSpecification();
    container: ElementType = 'span';

    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this.annotations.is; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) { this.annotations.is = given; }

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

    is(kind: Kind<$Annotation>): boolean {
        return this.annotations.contains(kind);
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
