import { ElementType } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from './Writing';
import { $Format } from './Format';

export class $Emphasis extends $Format {
    style: ElementType = 'em';

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-emphasis');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

export const Emphasis = $($Emphasis);
