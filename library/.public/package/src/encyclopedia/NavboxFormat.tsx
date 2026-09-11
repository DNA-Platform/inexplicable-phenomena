import { $, styled } from '@dna-platform/chemistry';
import { $BoxFormat } from './BoxFormat';

export class $NavboxFormat extends $BoxFormat {
    override selector: any = styled.nav;
    clear = 'both';
    width = '100%';
    override margin = '1em 0 0';
}

export const NavboxFormat = $($NavboxFormat);
