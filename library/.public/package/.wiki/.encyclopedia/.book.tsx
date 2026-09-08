import { $, select } from '@dna-platform/chemistry';
import { $Book, Theme } from '@dna-platform/public';
import { $Theme } from '@dna-platform/public/encyclopedia';
import { globe } from './.chapter';

export default class $Wikipedia extends $Book { }

export class $PortalTheme extends $Theme {
    override size = '14px';
    override leading = '1.5';
    override body = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif";
    override get maxWidth() { return 'none'; }
    override gridTemplateColumns = 'minmax(0, 7fr) minmax(0, 13fr)';
    override columnGap = '0';
    override padding = '0 0.914em';
    textAlign = 'center';
    @select('@media (max-width: 768px)') phone_padding = '0 0.457em';
    @select('@media (max-width: 768px) {\n             .pd-book > * {') phoneAll_gridColumn = '1 / -1';
    @select('.pd-book > nav') side_display = 'none';
    @select('.pd-book > header') cover_paddingTop = '2.86em';
    cover_gridColumn = '1 / -1';
    cover_margin = '0 auto';
    cover_maxWidth = '39em';
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
    @select('@media (max-width: 480px) {\n             .pd-book > header {') narrowHead_padding = '2.29em 0.457em 0';
    narrowHead_backgroundImage = `url(${globe})`;
    narrowHead_backgroundRepeat = 'no-repeat';
    narrowHead_backgroundSize = '3.43em';
    narrowHead_backgroundPosition = 'calc(50% - 8.6em) 2.35em';
    @select('.pd-book > div') panel_textAlign = 'left';
    @select('.pd-book > footer') override foot_gridColumn = '1 / -1';
}

export const PortalTheme = $($PortalTheme);
export const Wikipedia = $($Wikipedia);

$(Wikipedia, Theme)(PortalTheme);
