import { $, select, styled } from '@dna-platform/chemistry';
import { $Style } from '@/writing/Writing';

export class $Prose extends $Style {
    selector = styled.p;
    margin = '0.4em 0 0.5em';
    @select('& &') marginLeft = '1.6em';
    get color() { return this.theme.ink; }
}

export const Prose = $($Prose);
