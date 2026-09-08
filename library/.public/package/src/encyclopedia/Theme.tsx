// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built as U7 of this sprint.
// THE ENCYCLOPEDIA'S LOOK AS ONE THEME SUBCLASS: Wikipedia's values (the ones $Theme carried before 2026-09-08 — wikimedia-ui-base's tokens, MIT) and the groups the sixteen *Format.tsx files say today, folded in one by one as each format is deleted. The grid, the float and the attr(label) are all sayable on pd- classes at the sheet root, so the encyclopedia needs no format a sheet cannot give — measured in the register (cluster "encyclopedia").
// The demo installs it: `.wiki/.encyclopedia/.book.tsx` registers `$(Wikipedia, Theme)(encyclopedia/Theme)` (today it registers $PortalTheme extends $Theme with three overrides, plus four region formats — those four become groups here).
// DEPENDS ON: $Theme — designed for it. DEPENDS ON, in progress: $Book drawing flat with no region view (U4), every kind writing its element (U5), so the groups have elements to dress.
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
    maxWidth = '99.75em';
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
