import { ElementType, ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';

export class $Reference extends $Annotation {
    specification = new ReferenceSpecification();
    protected _anchor!: ElementType;
    get identifier(): string { return html.copy(this.text).trim(); }

    $Reference(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        this._anchor = (props: { children?: ReactNode }) => <a href={this.identifier} {...props} />;
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
    style = createGlobalStyle`
        @layer pd.invariants {
            .pd-container:has(> .pa-self-reference),
            .pd-container:has(> .pd-container > .pa-self-reference) {
                text-decoration: none !important;
            }
        }
    `;

    override note(): ReactNode { return <this.style />; }

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
