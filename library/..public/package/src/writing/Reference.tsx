import { ElementType, ReactNode } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';

export class $Reference extends $Annotation {
    specification = new ReferenceSpecification();
    protected _anchor!: ElementType;
    get identifier(): string { return html.copy(this.contents).trim(); }

    $Reference(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        this._anchor = (props: { children?: ReactNode }) => <a href={this.identifier} {...props} />;
    }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-reference');
        if (this.identifier.startsWith('#'))
            writing.classes.add(this, 'pa-self-reference');
        writing.containers.add(this, this._anchor);
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
        writing.containers.revert(this);
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
