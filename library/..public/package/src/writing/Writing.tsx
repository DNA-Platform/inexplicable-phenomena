import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { Collection } from '@/utilities/Collection';
import type { Given } from '@/utilities/Collection';
import { Specification, specify } from '@/utilities/Specification';
import { Annotations } from './Annotations';

export class $Writing extends $Chemical {
    protected _contents?: Collection<$Chemical>;
    protected _annotations?: Annotations;
    protected is: $Annotation[] = [];
    container: ElementType = 'span';
    classes!: Set<string>;

    get $is(): Given<$Annotation> | Given<$Annotation>[] { return this.is; }
    set $is(given: Given<$Annotation> | Given<$Annotation>[]) {
        for (const annotation of this.is) {
            this.annotations.drop(annotation);
            annotation.erase(this);
        }
        this.is = this.annotations.prepend(...(Array.isArray(given) ? given : [given]));
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
        for (const chemical of chemicals)
            if (chemical instanceof $Annotation)
                this.annotations.add(chemical);
            else
                this.contents.add(chemical);
        this.$is = this.is;
        this.$Redefine();
        this.define();
    }

    view(): ReactNode {
        this.define();
        const Container = this.container;
        const classes = [...this.classes].join(' ') || undefined;
        return (
            <Container className={classes}>
                {this.write()}
                <span className="pd-annotations">
                    {this.annotate()}
                </span>
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
        return this.annotations.map((annotation, index) => {
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
    override view(): ReactNode { return null; }
    defines(writing: $Writing): void { }
    erase(writing: $Writing): void { }
    specifies(writing: $Writing): void { }
}

const ParentheticalStyle = createGlobalStyle`
    .pd-parenthetical { display: none; }
`;

export class $Parenthetical extends $Annotation {
    override view(): ReactNode { return <ParentheticalStyle />; }
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

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Parenthetical = $($Parenthetical);
export const Narrative = $($Narrative);
