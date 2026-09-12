import { $, select } from '@dna-platform/chemistry';
import { $Book, Theme } from '@dna-platform/public';
import { $EncyclopediaTheme } from '@dna-platform/public/encyclopedia';
import { globe } from './.document';

export default class $Wikipedia extends $Book { }

export class $PortalTheme extends $EncyclopediaTheme {
    override size = '14px';
    override leading = '1.5';
    override body = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif";
    override get maxWidth() { return 'none'; }
    override gridTemplateColumns = 'minmax(0, 7fr) minmax(0, 13fr)';
    override columnGap = '0';
    override padding = '0 0.914em';
    textAlign = 'center';
    @select('@media (max-width: 768px)') phone_padding = '0 0.457em';
    @select('@media (max-width: 768px) {\n             .pd-book > .pd-chapter > * {') phoneAll_gridColumn = '1 / -1';
    @select('.pd-book > .pd-chapter > nav') side_display = 'none';
    @select('.pd-book > .pd-chapter > header') cover_paddingTop = '2.86em';
    cover_gridColumn = '1 / -1';
    cover_margin = '0 auto';
    cover_boxSizing = 'border-box';
    cover_maxWidth = 'min(39em, 100%)';
    cover_display = 'flex';
    cover_flexDirection = 'column';
    @select('header .pd-title, header .pd-author, header .pd-subject') coverParts_display = 'none';
    @select('header .pd-section > .pd-heading') label_display = 'none';
    @select('header > .pd-section:has(form)') search_display = 'contents';
    @select('header p:has(img)') logo_margin = '0.857em 0 0';
    @select('header p:has(img) + p') slogan_fontSize = '1.07em';
    slogan_lineHeight = '2.2';
    slogan_margin = '0';
    get slogan_fontFamily() { return this.face; }
    @select('@media (max-width: 480px) {\n             .pd-book > .pd-chapter > header {') narrowHead_padding = '2.29em 0.457em 0';
    narrowHead_backgroundImage = `url(${globe})`;
    narrowHead_backgroundRepeat = 'no-repeat';
    narrowHead_backgroundSize = '3.43em';
    narrowHead_backgroundPosition = 'calc(50% - 8.6em) 2.35em';
    @select('.pd-book > .pd-chapter > .pd-document:not(.pd-cover):not(.pd-table-of-contents):not(.pd-chapter), .pd-book > .pd-chapter > .pd-synopsis, .pd-book > .pd-chapter > .pd-index') override text_gridColumn = '1 / -1';
    text_minWidth = '0';
    override get text_maxWidth() { return 'min(68.6rem, 100%)'; }
    text_marginLeft = 'auto';
    text_marginRight = 'auto';

    @select('.pd-level-1') override h2_fontSize = '1em';
    h2_fontWeight = '700';
    h2_padding = '0';
    h2_margin = '0 auto';
    h2_lineHeight = '1.5';
    override get h2_borderBottom() { return 'none'; }
    get h2_color() { return this.ink; }
    get h2_fontFamily() { return this.body; }
    @select('.pd-section .pd-section .pd-level-1') sub2_fontSize = '1em';
    sub2_fontWeight = '700';
    sub2_lineHeight = '1.5';
    sub2_padding = '0';
    sub2_borderBottom = 'none';
    get sub2_fontFamily() { return this.body; }
    @select('.pd-document') override document_marginBottom = '0';
    @select('.pd-document > *:first-child') opening_marginTop = '0';

    @select('.pd-book > .pd-chapter > div') panel_textAlign = 'left';
    @select('.pd-book > .pd-chapter > footer') override foot_gridColumn = '1 / -1';
}

export const PortalTheme = $($PortalTheme);
export const Wikipedia = $($Wikipedia);

$(Wikipedia, Theme)(PortalTheme);
