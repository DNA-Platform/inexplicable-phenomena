import { $, select, styled } from '@dna-platform/chemistry';
import { $Style } from './Style';

export class $Output extends $Style {
    selector = styled.div;
    @select('> *:first-child') marginTop = '0';
}

export const Output = $($Output);
