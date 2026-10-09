import { ComponentType, ElementType, ReactNode } from 'react';
import { $, $check, $Chemical, selection } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';

export class $Reference extends $Annotation {
    specification = new ReferenceSpecification();
    anchor: ElementType = selection.a.attrs({ className: 'pa-reference' })``;
    protected _anchor!: ElementType;
    get identifier(): string { return html.copy(this.text).trim(); }

    $Reference(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        const Anchor = this.anchor;
        this._anchor = (props: { children?: ReactNode }) => (
            <Anchor
                href={this.identifier}
                {...props}
            />
        );
    }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-reference');
        writing.containers.add(this, this._anchor);
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
        writing.containers.revert(this);
    }
}

export class $SelfReference extends $Reference {
    override anchor: ElementType = selection(this.anchor as ComponentType<{ className?: string }>).attrs({ className: 'pa-self-reference' })``;

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-self-reference');
    }
}

export class ReferenceSpecification extends AnnotationSpecification {
    @specify('a reference holds the address its writing means')
    $holdsAnAddress(writing: $Writing): void {
        $check(writing.annotations.expressed($Reference)?.identifier !== '',
            'a reference is the address its writing means, and this one holds none');
    }
}

export const Reference = $($Reference);
export const Self = $($SelfReference);
