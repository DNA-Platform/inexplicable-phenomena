import { ElementType } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';
import { $Format } from './Format';

export class $Bold extends $Format {
    style: ElementType = 'b';

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-bold');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

export const Bold = $($Bold);
