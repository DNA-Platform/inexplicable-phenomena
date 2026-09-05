import { $, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $CitedFormat extends $Format {
    selector = styled.ol;
    fontSize = '90%';
    margin = '0.3em 0 0 1.6em';
    padding = '0';
    get color() { return this.theme.ink; }
}

export const CitedFormat = $($CitedFormat);
