import { $, select } from '@dna-platform/chemistry';
import { $Book, $Theme, Theme } from '@dna-platform/public';
import { globe } from './.chapter';
import {
    $BodyFormat, BodyFormat, $HeaderFormat, HeaderFormat, $SidebarFormat, SidebarFormat, $ContentFormat, ContentFormat
} from '@dna-platform/public/encyclopedia';

export class $PortalTheme extends $Theme {
    override size = '14px';
    override leading = '1.5';
    override body = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif";
}

export default class $Wikipedia extends $Book { }

export class $HomeFormat extends $BodyFormat {
    gridTemplateColumns = '1fr';
    gridTemplateAreas = "'top' 'main' 'bottom'";
    textAlign = 'center';
    margin = '0 auto';
    padding = '0 0.914em';
    gap = '1.393em 2em';
    @select('@media (max-width: 1119px)') wide_padding = '0 0.914em';
    @select('@media (max-width: 768px)') narrow_padding = '0 0.457em';
    override get maxWidth() { return 'none'; }
}

export class $HomeHeaderFormat extends $HeaderFormat {
    paddingTop = '2.86em';
    @select('.pd-title, .pd-author, .pd-subject') cover_display = 'none';
    @select('.pd-cover .pd-section > .pd-heading') label_display = 'none';
    @select('.pd-cover') masthead_display = 'flex';
    masthead_flexDirection = 'column';
    @select('.pd-cover > .pd-section:has(form)') search_display = 'contents';
    @select('article') article_margin = '0 auto';
    article_maxWidth = '39em';
    @select('p:has(img)') logo_margin = '0.857em 0 0';
    @select('p:has(img) + p') slogan_fontSize = '1.07em';
    slogan_lineHeight = '2.2';
    slogan_margin = '0';
    @select('@media (max-width: 480px)') narrow_padding = '2.29em 0.457em 0';
    narrow_backgroundImage = `url(${globe})`;
    narrow_backgroundRepeat = 'no-repeat';
    narrow_backgroundSize = '3.43em';
    narrow_backgroundPosition = 'calc(50% - 8.6em) 2.35em';
    get slogan_fontFamily() { return this.theme.display; }
}

export class $HomeSidebarFormat extends $SidebarFormat {
    display = 'none';
}

export class $HomeContentFormat extends $ContentFormat {
    override get maxWidth() { return 'none'; }
    margin = '0 auto';
    width = '100%';
    display = 'grid';
    gridTemplateColumns = 'minmax(0, 7fr) minmax(0, 13fr)';
    gap = '2.64em 0';
    textAlign = 'left';
    @select('@media (max-width: 768px)') narrow_gridTemplateColumns = '1fr';
    narrow_textAlign = 'center';
}

export const PortalTheme = $($PortalTheme);
export const HomeFormat = $($HomeFormat);
export const HomeHeaderFormat = $($HomeHeaderFormat);
export const HomeSidebarFormat = $($HomeSidebarFormat);
export const HomeContentFormat = $($HomeContentFormat);
export const Wikipedia = $($Wikipedia);

$(Wikipedia, Theme)(PortalTheme);
$(Wikipedia, BodyFormat)(HomeFormat);
$(Wikipedia, HeaderFormat)(HomeHeaderFormat);
$(Wikipedia, SidebarFormat)(HomeSidebarFormat);
$(Wikipedia, ContentFormat)(HomeContentFormat);
