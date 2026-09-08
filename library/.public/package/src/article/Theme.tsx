// CREATED 2026-09-08 · rating 3 · shell. The article's theme: the base sheet with LaTeX's groups re-said, installed by registration, carrying no formats. Groups owed against the paper.
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
