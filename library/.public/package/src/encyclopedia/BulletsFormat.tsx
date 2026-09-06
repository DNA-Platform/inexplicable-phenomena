import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $BulletsFormat extends $Format {
    selector = styled.ul;
    margin = '0.3em 0 0 1.6em';
    padding = '0';
    @select('li') item_marginBottom = '0.1em';
    @select('p + .pd-list > &') afterProse_marginTop = '-0.5em';
    get color() { return this.theme.ink; }
}

export const BulletsFormat = $($BulletsFormat);
