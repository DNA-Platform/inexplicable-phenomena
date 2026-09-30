import { ElementType } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Format } from './Format';

export class $Emphasis extends $Format {
    style: ElementType = selection.em.attrs({ className: 'pa-emphasis' })``;
}

export const Emphasis = $($Emphasis);
