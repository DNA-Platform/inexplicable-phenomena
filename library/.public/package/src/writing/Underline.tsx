import { ElementType } from 'react';
import { $, selection } from '@dna-platform/chemistry';
import { $Format } from './Format';

export class $Underline extends $Format {
    style: ElementType = selection.u.attrs({ className: 'pa-underline' })``;
}

export const Underline = $($Underline);
