import { $, select } from '@dna-platform/chemistry';
import { $MarginFormat } from './MarginFormat';

export class $SidebarFormat extends $MarginFormat {
    override $at = 'left';
    alignSelf = 'start';
    position = 'sticky';
    top = '1.5em';
    marginTop = '2.8em';
    padding = '0 1em';
    maxHeight = 'calc(100vh - 3em)';
    overflowY = 'auto';
    @select('h2') heading_fontSize = '0.875em';
    @select('h2') heading_fontWeight = 'bold';
    @select('h2') heading_color = '#101418';
    @select('h2') heading_border = 'none';
    @select('h2') heading_margin = '0 0 0.9em';
    @select('p') entry_fontSize = '0.875em';
    @select('p') entry_margin = '0';
    @select('p') entry_lineHeight = '2';
    @select('a') entry_display = 'block';
    @select('a') entry_textDecoration = 'none';
    @select('a:hover') hover_color = '#3056a9';
    @select('@media (max-width: 1119px)') narrow_display = 'none';
    @select('h2') get heading_fontFamily() { return this.theme.body; }
}

export const SidebarFormat = $($SidebarFormat);
