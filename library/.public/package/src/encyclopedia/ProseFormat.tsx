import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $ProseFormat extends $Format {
    selector = styled.p;
    margin = '0.5em 0 1em';
    @select('& &') nested_marginLeft = '1.6em';
    get color() { return this.theme.ink; }
}

export const ProseFormat = $($ProseFormat);
