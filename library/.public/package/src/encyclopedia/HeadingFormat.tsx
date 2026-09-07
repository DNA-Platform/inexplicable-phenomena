import { $, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $HeadingFormat extends $Format {
    selector = styled.h2;
    $id: string | undefined = undefined;
    fontSize = '1.5em';
    fontWeight = 'normal';
    get color() { return this.theme.jet; }
    margin = '0 0 0.25em';
    padding = '0';
    get fontFamily() { return this.theme.display; }
    get borderBottom() { return `1px solid ${this.theme.rule}`; }
}

export const HeadingFormat = $($HeadingFormat);
