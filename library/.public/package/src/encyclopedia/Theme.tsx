// CREATED 2026-09-08 · rating 3 · in progress. The encyclopedia's theme: Wikipedia's values and its grid as groups; the sixteen *Format files fold in here one by one.
import { $, select } from '@dna-platform/chemistry';
import { $Theme as $Sheet } from '@/formatting/Theme';

export class $Theme extends $Sheet {
    override paper = '#ffffff';
    override ink = '#202122';
    override quiet = '#f8f9fa';
    override shade = '#eaecf0';
    override rule = '#a2a9b1';
    override pale = '#54595d';
    override jet = '#101418';
    override pressed = '#3056a9';
    override link = '#3366cc';
    override measure = '57em';
    override body = 'sans-serif';
    override face = "'Linux Libertine', 'Georgia', 'Times', 'Source Serif 4', serif";
    override size = '16px';
    override leading = '1.625';

    // IN PROGRESS — the root as the grid BodyFormat draws today (BodyFormat.tsx:5-25). The book's own children become the grid items through `.pd-book { display: contents }`, and each apparatus kind places itself by area — the four region formats (Header/Sidebar/Content/Footer) become the four groups below.
    display = 'grid';
    gridTemplateColumns = 'minmax(0, 11em) minmax(0, 1fr) minmax(0, 11em)';
    gridTemplateAreas = "'left top right' 'left main right' 'bottom bottom bottom'";
    gap = '1em 2.5em';
    padding = '0 3em';
    margin = '0 auto';
    override get maxWidth() { return '99.75em'; }
    @select('> .pd-book') book_display = 'contents';
    @select('.pd-cover, .pd-synopsis') top_gridArea = 'top';
    @select('.pd-table-of-contents') left_gridArea = 'left';
    @select('article, .pd-index') main_gridArea = 'main';
    @select('.pd-footer') bottom_gridArea = 'bottom';
    @select('@media (max-width: 1119px)') narrow_gridTemplateColumns = '1fr';
    narrow_gridTemplateAreas = "'top' 'main' 'bottom'";
    narrow_padding = '1.5em';

    // OWED, each a format file to fold and delete: HeadingFormat (serif h2 with the rule), ProseFormat, BulletsFormat, TableFormat (grid + display: contents — structural, may stay a format), IllustrationFormat (float right, figcaption), CitedFormat, ColumnsFormat (.pd-index), AnchorFormat (link colour, hover), HeaderFormat's title/byline groups, SidebarFormat's sticky contents, ContentFormat's measure, FooterFormat's index box, ArticleFormat/OutputFormat margins.
}

export const Theme = $($Theme);
