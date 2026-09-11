// The .wiki application's own kinds — what every book in it is written with, and nothing a
// DIFFERENT Wikipedia-shaped application would need. The links were here already; the chrome
// joins them because BOTH books share it and alan-turing was reaching into .article's folder
// for it. A website has a header; a book does not — which is why none of this is framework.
import { ReactNode } from 'react';
import { $, $Block, $check, select, styled } from '@dna-platform/chemistry';
import { $Document, $Format, $Paragraph, $Ref, $Section, html } from '@dna-platform/public';

export class $BookLink extends $Ref { }
export class $SubjectLink extends $Ref { }
export class $AuthorLink extends $Ref { }
export class $OutwardLink extends $Ref { }

export class $Header extends $Section {
    $Header(block: $Block) {
        super.$Section($check(block, $Block, '!').concat($check(headerFormatLook, '!')));
    }
}

export class $Footer extends $Document {
    $Footer(block: $Block) {
        super.$Document($check(block, $Block, '!').concat($check(footerFormatLook, '!')));
    }
}

export class $HeaderFormat extends $Format {
    selector = styled.section;
    boxSizing = 'border-box';
    width = '100%';
    minHeight = '4.125em';
    display = 'flex';
    alignItems = 'center';
    justifyContent = 'space-between';
    gap = '1.6em';
    padding = '0 1em';
    marginBottom = '1.4em';

    @select('.pd-heading')
    name_display = 'none';

    @select('img')
    mark_display = 'block';
    mark_height = '1.25em';
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
export const HeaderFormat = $($HeaderFormat);
export const FooterFormat = $($FooterFormat);

export const BookLink = $($BookLink);
export const SubjectLink = $($SubjectLink);
export const AuthorLink = $($AuthorLink);
export const OutwardLink = $($OutwardLink);
const headerFormatLook = HeaderFormat;
const footerFormatLook = FooterFormat;
