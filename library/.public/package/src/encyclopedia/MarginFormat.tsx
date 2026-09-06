import { $, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $MarginFormat extends $Format {
    selector = styled.div;
    $at = 'top';
    get gridArea() { return this.$at; }
}

export const MarginFormat = $($MarginFormat);
