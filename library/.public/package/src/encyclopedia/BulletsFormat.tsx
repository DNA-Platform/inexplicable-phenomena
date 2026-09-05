import { $, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $BulletsFormat extends $Format {
    selector = styled.ul;
    margin = '0.3em 0 0 1.6em';
    padding = '0';
    get color() { return this.theme.ink; }
}

export const BulletsFormat = $($BulletsFormat);
