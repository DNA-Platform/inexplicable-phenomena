import { $, styled } from '@dna-platform/chemistry';
import { $Style } from '@/writing/Writing';

export class $Bullets extends $Style {
    selector = styled.ul;
    margin = '0.3em 0 0 1.6em';
    padding = '0';
    get color() { return this.theme.ink; }
}

export const Bullets = $($Bullets);
