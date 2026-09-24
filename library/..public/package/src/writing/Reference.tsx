import { ElementType, ReactNode } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';

export class $Reference extends $Annotation {
    specification = new ReferenceSpecification();
    identifier = '';
    protected _anchor!: ElementType;

    $Reference(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        this.identifier = html.copy(this.contents).trim();
        this._anchor = (props: { children?: ReactNode }) => <a href={this.identifier} {...props} />;
    }

    override defines(writing: $Writing): void {
        writing.classes.add('pa-reference');
        writing.containers.prepend(this, this._anchor);
    }

    override erase(writing: $Writing): void {
        writing.classes.delete('pa-reference');
        writing.containers.remove(this);
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
