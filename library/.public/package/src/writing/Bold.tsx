import { ElementType } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Format } from './Format';

export class $Bold extends $Format {
    style: ElementType = selection.b.attrs({ className: 'pa-bold' })``;
}

export const Bold = $($Bold);
