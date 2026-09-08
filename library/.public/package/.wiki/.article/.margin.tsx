import { ReactNode } from 'react';
import { $, select, styled } from '@dna-platform/chemistry';
import { $Chapter, $Format, $Paragraph, $Section, html } from '@dna-platform/public';

export class $Header extends $Section {
    override frame(drawn: ReactNode): ReactNode {
        const Masthead = $(HeaderFormat);

        return <Masthead>{super.frame(drawn)}</Masthead>;
    }
}

export class $Footer extends $Chapter {
    override frame(drawn: ReactNode): ReactNode {
        const Colophon = $(FooterFormat);

        return <Colophon>{super.frame(drawn)}</Colophon>;
    }
}

export class $Wordmark extends $Paragraph {
    $src = '';
    $width = '';

    override view(): ReactNode {
        return <img src={this.$src} width={this.$width} alt={html.text(this._block)} />;
    }
}

export class $HeaderFormat extends $Format {
    selector = styled.div;
    display = 'flex';
    alignItems = 'center';
    gap = '1.6em';
    padding = '0 0 0.9em';
    marginBottom = '1.4em';

    @select('.pd-heading')
    name_display = 'none';

    @select('img')
    mark_display = 'block';
    mark_height = '2.1em';
    mark_width = 'auto';

    @select('p')
    line_margin = '0';

    @select('.pd-ref')
    link_marginRight = '1.1em';

    @select('@media (max-width: 480px) {\n             & {')
    narrow_gap = '0.9em';
    narrow_flexWrap = 'wrap';

    get borderBottom() { return `1px solid ${this.theme.shade}`; }
}

export class $FooterFormat extends $Format {
    selector = styled.div;
    marginTop = '2.4em';
    paddingTop = '1.1em';
    fontSize = '0.87em';

    @select('.pd-heading')
    name_display = 'none';

    @select('p')
    line_margin = '0 0 0.4em';

    @select('.pd-ref')
    link_marginRight = '1.1em';

    get borderTop() { return `1px solid ${this.theme.shade}`; }
    get color() { return this.theme.pale; }
}

export const Header = $($Header);
export const Footer = $($Footer);
export const Wordmark = $($Wordmark);
export const HeaderFormat = $($HeaderFormat);
export const FooterFormat = $($FooterFormat);
