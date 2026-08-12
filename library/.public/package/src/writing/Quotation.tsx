import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from './Paragraph';

export class $Quotation extends $Paragraph {
    $mark? = '>';
}

export const Quotation = $($Quotation);
