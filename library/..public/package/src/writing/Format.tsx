import { ElementType } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Annotation } from './Writing';

export class $Format extends $Annotation {
    format?: ElementType;
    protected replaced?: ElementType;

    override defines(writing: $Writing): void {
        if (this.format === undefined || writing.container === this.format) return;
        this.replaced = writing.container;
        writing.container = this.format;
    }

    override erase(writing: $Writing): void {
        if (this.replaced === undefined) return;
        writing.container = this.replaced;
        this.replaced = undefined;
    }
}

export const Format = $($Format);
