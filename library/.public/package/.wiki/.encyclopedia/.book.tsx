import { $, select } from '@dna-platform/chemistry';
import { $Book, $Theme, Book } from '@dna-platform/public';
import { globe } from './.chapter';

export default class $Wikipedia extends $Book { }

export class $PortalTheme extends $Theme {
    override paper = '#ffffff';
    override desk = '#ffffff';
    override ink = '#202122';
    override quiet = '#f8f9fa';
    override shade = '#eaecf0';
    override rule = '#a2a9b1';
    override pale = '#54595d';
    override jet = '#101418';
    override pressed = '#3056a9';
    override link = '#3366cc';
    override size = '14px';
    override leading = '1.5';
    override body = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif";
    override face = "'Linux Libertine', 'Georgia', 'Times', 'Source Serif 4', serif";
    override get maxWidth() { return 'none'; }
    override padding = '0 0.914em';
    textAlign = 'center';
    override display = 'grid';
    boxSizing = 'border-box';
    gridTemplateColumns = 'minmax(0, 7fr) minmax(0, 13fr)';
    gridAutoRows = 'min-content';
    columnGap = '0';

    @select('> .pd-book') book_display = 'contents';
    @select('@media (max-width: 768px) {\n             .pd-book > * {') phoneAll_gridColumn = '1 / -1';

    @select('.pd-book > header') cover_paddingTop = '2.86em';
    cover_gridColumn = '1 / -1';
    cover_width = '100%';
    cover_margin = '0 auto';
    cover_boxSizing = 'border-box';
    cover_maxWidth = 'min(39em, 100%)';
    cover_display = 'flex';
    cover_flexDirection = 'column';
    @select('.pd-book > div') panel_textAlign = 'left';
    @select('.pd-book > footer') foot_gridColumn = '1 / -1';
    @select('header .pd-title, header .pd-author, header .pd-subject') coverParts_display = 'none';
    @select('header .pd-section > .pd-heading') label_display = 'none';
    @select('header > .pd-section:has(form)') search_display = 'contents';
    @select('header p:has(img)') logo_margin = '0.857em 0 0';
    logo_textAlign = 'center';
    @select('header p:has(img) + p') slogan_fontSize = '1.07em';
    slogan_lineHeight = '2.2';
    slogan_margin = '0';
    slogan_textAlign = 'center';
    get slogan_fontFamily() { return this.face; }
    @select('@media (max-width: 480px) {\n             .pd-book > header {') narrowHead_padding = '2.29em 0.457em 0';
    narrowHead_backgroundImage = `url(${globe})`;
    narrowHead_backgroundRepeat = 'no-repeat';
    narrowHead_backgroundSize = '3.43em';
    narrowHead_backgroundPosition = 'calc(50% - 8.6em) 2.35em';
}

export const PortalTheme = $($PortalTheme);
export const Wikipedia = $($Wikipedia);

$PortalTheme.$register(Book);
