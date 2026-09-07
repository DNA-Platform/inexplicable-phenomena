import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $BodyFormat extends $Format {
    selector = styled.main;
    margin = '0 auto';
    padding = '0 3em';
    display = 'grid';
    boxSizing = 'border-box';
    gridTemplateColumns = 'minmax(0, 11em) minmax(0, 1fr) minmax(0, 11em)';
    gridTemplateAreas = "'left top right' 'left main right' 'bottom bottom bottom'";
    gap = '1em 2.5em';
    get maxWidth() { return '99.75em'; }
    get background() { return this.theme.paper; }
    get color() { return this.theme.ink; }
    get fontFamily() { return this.theme.body; }
    get fontSize() { return this.theme.size; }
    get lineHeight() { return this.theme.leading; }
    @select('> .pd-book') book_display = 'contents';
    @select('@media (max-width: 1119px)') narrow_gridTemplateColumns = '1fr';
    narrow_gridTemplateAreas = "'top' 'main' 'bottom'";
    narrow_padding = '1.5em';
}

export const BodyFormat = $($BodyFormat);
