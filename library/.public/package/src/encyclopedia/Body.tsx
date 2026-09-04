import { $, styled } from '@dna-platform/chemistry';
import { $Style } from '@/writing/Writing';

export class $Body extends $Style {
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

export const Body = $($Body);
