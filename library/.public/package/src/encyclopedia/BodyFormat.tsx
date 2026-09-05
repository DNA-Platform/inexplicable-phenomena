import { $, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $BodyFormat extends $Format {
    selector = styled.main;
    margin = '0 auto';
    padding = '1.5em';
    get maxWidth() { return this.theme.measure; }
    get background() { return this.theme.paper; }
    get color() { return this.theme.ink; }
    get fontFamily() { return this.theme.body; }
    get fontSize() { return this.theme.size; }
    get lineHeight() { return this.theme.leading; }
}

export const BodyFormat = $($BodyFormat);
