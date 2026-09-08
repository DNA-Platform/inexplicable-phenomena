import { ReactNode } from 'react';
import { $, select, styled } from '@dna-platform/chemistry';
import { $Format, $Paragraph, $Section } from '@dna-platform/public';

export class $Sidebar extends $Section {
    override frame(drawn: ReactNode): ReactNode {
        const Box = $(SidebarFormat);

        return <Box>{super.frame(drawn)}</Box>;
    }
}

export class $Line extends $Paragraph {
    $label = '';

    override frame(drawn: ReactNode): ReactNode {
        const Row = $(LineFormat);

        return <Row label={this.$label}>{super.frame(drawn)}</Row>;
    }
}

export class $SidebarFormat extends $Format {
    selector = styled.div;
    float = 'right';
    clear = 'right';
    boxSizing = 'border-box';
    width = '22em';
    maxWidth = '100%';
    margin = '0 0 1em 1.4em';
    padding = '0.4em';
    fontSize = '0.88em';
    lineHeight = '1.4';

    @select('h2.pd-heading')
    name_display = 'block';
    name_fontSize = '1.3em';
    name_fontWeight = '700';
    name_textAlign = 'center';
    name_border = 'none';
    name_margin = '0';
    name_padding = '0.4em 0.5em';

    @select('@media (max-width: 480px) {\n             & {')
    narrow_float = 'none';
    narrow_width = '100%';
    narrow_margin = '0 0 1em';

    get background() { return this.theme.quiet; }
    get border() { return `1px solid ${this.theme.shade}`; }
    get name_fontFamily() { return this.theme.body; }
}

export class $LineFormat extends $Format {
    $label = '';
    selector = styled.div;
    display = 'grid';
    gridTemplateColumns = 'minmax(0, 6.5em) minmax(0, 1fr)';
    gap = '0 0.6em';
    padding = '0.35em 0.5em';
    alignItems = 'baseline';

    @select('&::before')
    label_content = 'attr(label)';
    label_fontWeight = '700';

    @select('p')
    line_margin = '0';

    get borderTop() { return `1px solid ${this.theme.shade}`; }
}

export const Sidebar = $($Sidebar);
export const Line = $($Line);
export const SidebarFormat = $($SidebarFormat);
export const LineFormat = $($LineFormat);
