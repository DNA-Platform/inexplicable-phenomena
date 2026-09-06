import { $, select } from '@dna-platform/chemistry';
import { $Book, $Theme, Theme } from '@dna-platform/public';
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
    @select('@media (max-width: 45em)') narrow_padding = '0 0.457em';
    override get maxWidth() { return 'none'; }
}

export class $HomeHeaderFormat extends $HeaderFormat {
    paddingTop = '2.86em';
    @select('.pd-title, .pd-author, .pd-subject') cover_display = 'none';
    @select('article') article_margin = '0 auto';
    @select('article') article_maxWidth = '39em';
    @select('p:has(img)') logo_margin = '0.857em 0 0';
    @select('p:has(img) + p') slogan_fontSize = '1.07em';
    @select('p:has(img) + p') slogan_lineHeight = '2.2';
    @select('p:has(img) + p') slogan_margin = '0';
    @select('@media (max-width: 45em)') narrow_padding = '2.29em 0.457em 0';
    @select('p:has(img) + p') get slogan_fontFamily() { return this.theme.display; }
}

export class $HomeSidebarFormat extends $SidebarFormat {
    display = 'none';
}

export class $HomeContentFormat extends $ContentFormat {
    display = 'grid';
    gridTemplateColumns = 'minmax(0, 7fr) minmax(0, 13fr)';
    gap = '0';
    textAlign = 'left';
    @select('article:first-of-type') languages_gridColumn = '1 / -1';
    @select('article:first-of-type') languages_textAlign = 'center';
    @select('article:first-of-type') languages_marginBottom = '2.64em';
    @select('article:first-of-type') languages_backgroundImage = 'linear-gradient(#c8ccd1, #c8ccd1)';
    @select('article:first-of-type') languages_backgroundRepeat = 'no-repeat';
    @select('article:first-of-type') languages_backgroundSize = 'min(88%, 32.86em) 1px';
    @select('article:first-of-type') languages_backgroundPosition = 'center 1.43em';
    @select('article:first-of-type h2') pill_fontSize = '1em';
    @select('article:first-of-type h2') pill_fontWeight = '700';
    @select('article:first-of-type h2') pill_lineHeight = '1.57';
    @select('article:first-of-type h2') pill_boxSizing = 'border-box';
    @select('article:first-of-type h2') pill_width = '21.43em';
    @select('article:first-of-type h2') pill_margin = '0 auto';
    @select('article:first-of-type h2') pill_padding = '0.43em 0.86em';
    @select('article:first-of-type h2') pill_borderRadius = '0.14em';
    @select('article:first-of-type h2') pill_backgroundImage = "url(\"data:image/svg+xml,%3Csvg width='22' height='22' viewBox='-1 -1 22 22' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2336d' fill-rule='evenodd' d='M20 18h-1.44a.61.61 0 0 1-.4-.12.81.81 0 0 1-.23-.31L17 15h-5l-1 2.54a.77.77 0 0 1-.22.3.59.59 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a11.62 11.62 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56-1.58 4.19zm-6.3-1.58a13.43 13.43 0 0 1-2.91-1.41 11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.19 17.19 0 0 1-5 2.1q.56.82.87 1.38a23.28 23.28 0 0 0 5.22-2.51 15.64 15.64 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.11 8.11 0 0 1-2.45 4.45 9.11 9.11 0 0 1-2.46-4.45z'/%3E%3C/svg%3E\"), url(\"data:image/svg+xml,%3Csvg width='14' height='14' viewBox='-1 -1 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2336d' d='M10.085 2.943 6.05 6.803l-3.947-3.86L1.05 3.996l5 5 5-5z'/%3E%3C/svg%3E\")";
    @select('article:first-of-type h2') pill_backgroundRepeat = 'no-repeat, no-repeat';
    @select('article:first-of-type h2') pill_backgroundSize = '1.57em 1.57em, 1em 1em';
    @select('article:first-of-type h2') pill_backgroundPosition = '0.86em center, calc(100% - 0.86em) center';
    @select('article:first-of-type p') prose_display = 'none';
    @select('article:nth-of-type(n+2)') footer_fontSize = '0.93em';
    @select('article:nth-of-type(n+2)') footer_lineHeight = '1.5';
    @select('article:nth-of-type(n+2)') footer_paddingTop = '3.2em';
    @select('article:nth-of-type(2)') hosted_marginBottom = '0';
    @select('article:nth-of-type(2) .pd-chapter') chapter_display = 'block';
    @select('article:nth-of-type(2) .pd-chapter') chapter_maxWidth = '26.9em';
    @select('article:nth-of-type(2) .pd-chapter') chapter_margin = '0 auto';
    @select('article:nth-of-type(2) .pd-section') section_display = 'block';
    @select('article:nth-of-type(2) .pd-section') section_position = 'relative';
    @select('article:nth-of-type(2) .pd-section') section_padding = '0 1.54em 0 4.6em';
    @select('article:nth-of-type(2) .pd-section') section_marginBottom = '2.46em';
    @select('article:nth-of-type(2) p:has(img)') icon_position = 'absolute';
    @select('article:nth-of-type(2) p:has(img)') icon_left = '0.62em';
    @select('article:nth-of-type(2) p:has(img)') icon_top = '0';
    @select('article:nth-of-type(2) h2') hosted_fontSize = '1em';
    @select('article:nth-of-type(2) h2') hosted_fontWeight = '400';
    @select('article:nth-of-type(2) h2') hosted_color = '#54595d';
    @select('article:nth-of-type(2) h2') hosted_borderBottom = 'none';
    @select('article:nth-of-type(2) h2') hosted_margin = '0';
    @select('article:nth-of-type(2) p') text_color = '#54595d';
    @select('article:nth-of-type(2) p') text_margin = '0';
    @select('article:nth-of-type(2) .pd-ref') links_margin = '0 0.8em 0 0';
    @select('article:nth-of-type(3)') projects_textAlign = 'left';
    @select('article:nth-of-type(3) .pd-chapter') projects_display = 'grid';
    @select('article:nth-of-type(3) .pd-chapter') projects_gridTemplateColumns = 'repeat(auto-fill, minmax(max(30%, 11em), 1fr))';
    @select('article:nth-of-type(3) .pd-chapter > .pd-section:not(.pd-index-card)') intro_display = 'none';
    @select('article:nth-of-type(4)') licence_gridColumn = '1 / -1';
    @select('article:nth-of-type(4)') licence_textAlign = 'center';
    @select('article:nth-of-type(4)') licence_paddingTop = '1em';
    @select('article:nth-of-type(4) h2') licence_display = 'inline';
    @select('article:nth-of-type(4) h2') licence_fontSize = '1em';
    @select('article:nth-of-type(4) h2') licence_fontWeight = '400';
    @select('article:nth-of-type(4) h2') licence_color = '#54595d';
    @select('article:nth-of-type(4) h2') licence_border = 'none';
    @select('article:nth-of-type(4) h2') licence_margin = '0';
    @select('article:nth-of-type(4) p') line_display = 'inline';
    @select('article:nth-of-type(4) p') line_margin = '0';
    @select('article:nth-of-type(4) .pd-ref') link_margin = '0 0 0 0.8em';
    @select('article:nth-of-type(4) .pd-ref::before') bullet_content = "'•'";
    @select('article:nth-of-type(4) .pd-ref::before') bullet_marginRight = '0.8em';
    @select('@media (max-width: 45em)') narrow_gridTemplateColumns = '1fr';
    @select('@media (max-width: 45em)') narrow_textAlign = 'center';
    @select('article:first-of-type h2') get pill_color() { return this.theme.link; }
    @select('article:first-of-type h2') get pill_backgroundColor() { return this.theme.quiet; }
    @select('article:first-of-type h2') get pill_border() { return `1px solid ${this.theme.rule}`; }
    @select('article:first-of-type h2') get pill_fontFamily() { return this.theme.body; }
    @select('article:nth-of-type(n+2)') get footer_borderTop() { return `1px solid ${this.theme.shade}`; }
    @select('article:nth-of-type(2) h2') get hosted_fontFamily() { return this.theme.body; }
    @select('article:nth-of-type(4) h2') get licence_fontFamily() { return this.theme.body; }
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
