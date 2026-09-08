// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built in the article sprint.
// THE OPTIONAL THEME OF THE ARTICLE BOOK TYPE: a subclass of the base sheet ($Theme, formatting/Theme) that re-says the groups a LaTeX article needs — a serif face, a narrow measure, numbered section headings, centred title block, the abstract set narrower, equation numbers right-aligned in parentheses — and leaves every other group to the base (the @select group override, chemistry/.lib/particle/11 § the override).
// Installed by the user or a module, globally `$(Book, Theme)(article/Theme)` or per book on its derived component (Doug: "registration is done by the user or by another module… either global or by book"). The theme never carries formats.
// DEPENDS ON: $Theme — designed for it: "the theme is the sheet" and a subclass moving groups is the feature styled particles exist for. OWED: the groups themselves, written against the Aaronson paper so it feels native; the values below are a guess at Computer Modern's neighbours.
import { $ } from '@dna-platform/chemistry';
import { $Theme as $Sheet } from '@/formatting/Theme';

export class $Theme extends $Sheet {
    override face = "'Latin Modern Roman', 'CMU Serif', 'Computer Modern', Georgia, 'Times New Roman', serif";
    override body = "'Latin Modern Roman', 'CMU Serif', 'Computer Modern', Georgia, 'Times New Roman', serif";
    override size = '12px';
    override leading = '1.4';
    override measure = '6.5in';
    override ink = '#000000';
    override link = '#000000';

    // OWED @select groups (each a guess until the paper is beside it):
    //   '.pd-cover'             — title centred, authors beneath, abstract narrower with a bold run-in "Abstract."
    //   '.pd-heading h2'        — "1  Introduction" via CSS counters on .pd-chapter, bold, no rule
    //   '.pd-indent-1 h2'       — "1.1" subsections
    //   '.pd-paragraph'         — first-line indent, no margin between paragraphs (LaTeX's \parindent)
    //   '.pd-equation'          — centred, the number right-aligned in parentheses
    //   '.pd-theorem'           — the label bold, the statement italic
    //   '.pd-footer, .pd-cited' — references numbered [1], hanging indent
}

export const Theme = $($Theme);
