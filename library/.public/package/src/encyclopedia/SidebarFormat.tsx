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
    @select('h2') heading_fontWeight = 'bold';
    @select('h2') get heading_color() { return this.theme.jet; }
    @select('h2') heading_border = 'none';
    @select('h2') heading_margin = '0 0 0.9em';
    @select('p') entry_fontSize = '1em';
    @select('p') entry_margin = '0';
    @select('p') entry_lineHeight = '2';
    @select('a') entry_display = 'block';
    @select('a') entry_textDecoration = 'none';
    @select('a:hover') get hover_color() { return this.theme.pressed; }
    @select('@media (max-width: 1119px)') narrow_display = 'none';
    @select('h2') get heading_fontFamily() { return this.theme.body; }
}

export const SidebarFormat = $($SidebarFormat);
