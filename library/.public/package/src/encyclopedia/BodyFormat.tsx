import { $, select, styled } from '@dna-platform/chemistry';
import { $Format } from '@/writing/Format';

export class $BodyFormat extends $Format {
    selector = styled.main;
    margin = '0';
    padding = '1.5em 2.75em';
    display = 'grid';
    gridTemplateColumns = 'minmax(0, 12.25em) minmax(0, 1fr)';
    gridTemplateAreas = "'left top' 'left main' 'bottom bottom'";
    gap = '1em 1.5em';
    get maxWidth() { return this.theme.measure; }
    get background() { return this.theme.paper; }
    get color() { return this.theme.ink; }
    get fontFamily() { return this.theme.body; }
    get fontSize() { return this.theme.size; }
    get lineHeight() { return this.theme.leading; }
    @select('> .pd-book') book_display = 'contents';
    @select('@media (max-width: 1119px)') narrow_gridTemplateColumns = '1fr';
    @select('@media (max-width: 1119px)') narrow_gridTemplateAreas = "'top' 'main' 'bottom'";
    @select('@media (max-width: 1119px)') narrow_padding = '1.5em';
}

export const BodyFormat = $($BodyFormat);
