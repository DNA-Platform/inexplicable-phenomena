import { $, styled } from '@dna-platform/chemistry';
import { $Style } from './Style';

export class $Heading extends $Style {
    selector = styled.h2;
    fontSize = '1.5em';
    fontWeight = 'normal';
    margin = '0 0 0.25em';
    padding = '0';
    get fontFamily() { return this.theme.display; }
    get color() { return this.theme.ink; }
    get borderBottom() { return `1px solid ${this.theme.rule}`; }
}

export const Heading = $($Heading);
