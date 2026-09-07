import { $, select } from '@dna-platform/chemistry';
import { $MarginFormat } from './MarginFormat';

export class $SidebarFormat extends $MarginFormat {
    override $at = 'left';
    alignSelf = 'start';
    position = 'sticky';
    top = '1.5em';
    marginTop = '0';
    padding = '0';
    fontSize = '0.875em';
    maxHeight = 'calc(100vh - 3em)';
    overflowY = 'auto';
    @select('h2') heading_fontSize = '1em';
    heading_fontWeight = 'bold';
    get heading_color() { return this.theme.jet; }
    heading_border = 'none';
    heading_margin = '0 0 0.9em';
    @select('p') entry_fontSize = '1em';
    entry_margin = '0';
    entry_lineHeight = '2';
    @select('a') link_display = 'block';
    link_textDecoration = 'none';
    @select('a:hover') get hover_color() { return this.theme.pressed; }
    @select('@media (max-width: 1119px)') narrow_display = 'none';
    get heading_fontFamily() { return this.theme.body; }
}

export const SidebarFormat = $($SidebarFormat);
