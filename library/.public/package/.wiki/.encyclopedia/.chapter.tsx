import { ReactNode } from 'react';
import { $, select, styled } from '@dna-platform/chemistry';
import { $Format, $Chapter, $Section, $Paragraph, $IndexCard, html } from '@dna-platform/public';

export class $WikipediaChapter extends $Chapter { }

export class $Logo extends $Paragraph {
    $src = '';
    $width = '';

    override view(): ReactNode {
        return <img src={this.$src} width={this.$width} alt={html.text(this._block)} />;
    }
}

export class $Languages extends $Section {
    $globe = '';

    override frame(drawn: ReactNode): ReactNode {
        const Ring = $(RingFormat);

        return <Ring globe={this.$globe}>{super.frame(drawn)}</Ring>;
    }
}

export class $Language extends $Paragraph {
    $at = 1;

    override frame(drawn: ReactNode): ReactNode {
        const Place = $(LanguageFormat);

        return <Place at={this.$at}>{super.frame(drawn)}</Place>;
    }
}

export class $Project extends $IndexCard {
    override view(): ReactNode {
        const Card = $(CardFormat);
        const Block = $(this._block);

        return <Card><Block /></Card>;
    }
}

export class $RingFormat extends $Format {
    $globe = '';
    selector = styled.div;
    position = 'relative';
    height = '23.21em';
    maxWidth = '39em';
    margin = '0 auto';
    backgroundRepeat = 'no-repeat';
    backgroundPosition = 'center 4.36em';
    backgroundSize = '14.29em';
    @select('> .pd-section') section_display = 'contents';
    @select('@media (max-width: 45em)') narrow_height = 'auto';
    @select('@media (max-width: 45em)') narrow_display = 'grid';
    @select('@media (max-width: 45em)') narrow_gridTemplateColumns = 'repeat(3, minmax(0, 1fr))';
    @select('@media (max-width: 45em)') narrow_gap = '1.14em 0';
    @select('@media (max-width: 45em)') narrow_paddingTop = '4.86em';
    @select('@media (max-width: 45em)') narrow_backgroundPosition = 'top center';
    @select('@media (max-width: 45em)') narrow_backgroundSize = '4.07em';
    get backgroundImage() { return `url(${this.$globe})`; }
}

export class $LanguageFormat extends $Format {
    $at = 1;
    selector = styled.div;
    position = 'absolute';
    width = '11.14em';
    textAlign = 'center';
    @select('a') link_display = 'block';
    @select('a') link_fontSize = '1.23em';
    @select('a') link_fontWeight = '700';
    @select('a') link_lineHeight = '1.5';
    @select('a') link_textDecoration = 'none';
    @select('p') line_margin = '0';
    @select('p') line_fontSize = '0.93em';
    @select('p') get line_color() { return this.theme.pale; }
    @select('@media (max-width: 45em)') narrow_position = 'static';
    @select('@media (max-width: 45em)') narrow_width = 'auto';
    @select('@media (max-width: 45em)') narrow_padding = '0 1.14em';
    @select('@media (max-width: 45em)') narrow_lineHeight = '1.4';
    get top() { return `${Math.floor((this.$at - 1) / 2) * 20}%`; }
    get left() { return `${(this.$at % 2 === 1 ? [4.43, 0.57, -0.21, 0.57, 4.43] : [23.43, 27.29, 28.07, 27.29, 23.43])[Math.floor((this.$at - 1) / 2)]}em`; }
    @select('a') get link_color() { return this.theme.link; }
}

export class $CardFormat extends $Format {
    selector = styled.div;
    position = 'relative';
    display = 'grid';
    gridTemplateColumns = 'auto 1fr';
    gridTemplateRows = '1fr auto auto 1fr';
    gap = '0 0.23em';
    padding = '1em';
    minHeight = '4.9em';
    lineHeight = '1.5';
    @select('p') line_margin = '0';
    @select('p:first-child') logo_gridRow = '1 / -1';
    @select('.pd-title') name_gridRow = '2';
    @select('p:last-child') line_gridRow = '3';
    @select('p:last-child') get line_color() { return this.theme.pale; }
    @select('img') logo_display = 'block';
    @select('img') logo_width = '50px';
    @select('img') logo_height = '47px';
    @select('img') logo_objectFit = 'contain';
    @select('.pd-reference') meaning_display = 'none';
    @select('.pd-title a') link_textDecoration = 'none';
    @select('.pd-title > a::after') reach_content = "''";
    @select('.pd-title > a::after') reach_position = 'absolute';
    @select('.pd-title > a::after') reach_inset = '0';
    @select('.pd-heading h2') name_fontSize = '1.075em';
    @select('.pd-heading h2') name_fontWeight = '400';
    @select('.pd-heading h2') name_lineHeight = '1.5';
    @select('.pd-heading h2') name_border = 'none';
    @select('.pd-heading h2') name_margin = '0';
    @select('.pd-heading h2') name_padding = '0';
    @select('&:hover .pd-heading h2') hover_textDecoration = 'underline';
    @select('.pd-heading h2') get name_fontFamily() { return this.theme.body; }
    @select('.pd-heading h2') get name_color() { return this.theme.link; }
}

export default $($WikipediaChapter);
export const Logo = $($Logo);
export const Languages = $($Languages);
export const Language = $($Language);
export const Project = $($Project);
export const RingFormat = $($RingFormat);
export const LanguageFormat = $($LanguageFormat);
export const CardFormat = $($CardFormat);
