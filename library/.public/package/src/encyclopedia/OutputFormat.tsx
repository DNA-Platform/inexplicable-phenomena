import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $OutputFormat extends $Format {
    selector = styled.div;
    @select('> *:first-child') marginTop = '0';
}

export const OutputFormat = $($OutputFormat);
