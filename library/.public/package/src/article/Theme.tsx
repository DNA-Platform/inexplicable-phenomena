// CREATED 2026-09-08, WRITTEN 2026-09-09 · rating 3. The article's theme: the base sheet with LaTeX's groups re-said, installed by registration, carrying no formats. Groups owed against the paper.
import { $, select } from '@dna-platform/chemistry';
import { $Theme as $Sheet } from '@/formatting/Theme';

export class $Theme extends $Sheet {
    override face = "'Latin Modern Roman', 'CMU Serif', 'Computer Modern', Georgia, 'Times New Roman', serif";
    override body = "'Latin Modern Roman', 'CMU Serif', 'Computer Modern', Georgia, 'Times New Roman', serif";
    override size = '12px';
    override leading = '1.4';
    override measure = '6.5in';
    override ink = '#000000';
    override link = '#000000';

    // THE TITLE BLOCK. A paper opens centred and unruled — the rules under every heading are
    // GitHub's, and LaTeX draws none. Written against the page rather than guessed: each group
    // below names a class the paper actually carries, counted in the browser.
    @select('.pd-cover') cover_textAlign = 'center';
    cover_marginBottom = '2.5rem';
    @select('.pd-cover .pd-heading') covered_borderBottom = 'none';
    covered_paddingBottom = '0';
    covered_marginTop = '0';
    @select('a.pd-title') title_fontSize = '1.7em';
    title_fontWeight = '400';
    @select('.pd-author .pd-heading') author_fontSize = '1.05em';
    author_fontWeight = '400';
    // A PAPER DOES NOT PRINT ITS SUBJECT AS A HEADING — it is a keyword line, so it is set as one
    // rather than hidden, because hiding is losing.
    @select('.pd-subject .pd-heading') subject_fontSize = '.9em';
    subject_fontStyle = 'italic';
    subject_fontWeight = '400';

    // THE ABSTRACT is narrower than the text and labelled — egin{abstract}.
    @select('.pd-synopsis') abstract_maxWidth = '86%';
    abstract_margin = '0 auto 2.5rem';
    abstract_fontSize = '.95em';
    @select('.pd-synopsis .pd-heading') abstracted_fontSize = '1em';
    abstracted_textAlign = 'center';
    abstracted_borderBottom = 'none';
    abstracted_paddingBottom = '0';

    // HEADINGS bold and unruled.
    @select('.pd-heading') head_borderBottom = 'none';
    head_paddingBottom = '0';
    head_fontWeight = '700';
    head_marginTop = '1.4rem';
    head_marginBottom = '.4rem';

    // PARAGRAPHS run on, first line indented, no space between — \parindent. ON THE ELEMENT AND
    // NOT THE CLASS ALONE: a heading, a list and a contents entry are all .pd-paragraph by type
    // now, and an indent written for prose stepped every one of them in. Prose is what writes <p>.
    @select('p.pd-paragraph') para_marginBottom = '0';
    para_textIndent = '1.5em';
    @select('.pd-heading + p.pd-paragraph') opening_textIndent = '0';
    @select('.pd-table-of-contents .pd-paragraph') contents_marginBottom = '.1rem';

    // A CITATION IS SET AS [n], which is what \cite draws.
    @select('.pd-citation::before') opened_content = "'['";
    @select('.pd-citation::after') closed_content = "']'";

    // AN EQUATION stands centred on its own line.
    @select('.pd-equation') equation_textAlign = 'center';
    equation_margin = '1rem 0';
    equation_textIndent = '0';

    // A THEOREM states itself in italic under a bold label.
    @select('.pd-theorem .pd-paragraph') theorem_fontStyle = 'italic';

    // THE BIBLIOGRAPHY hangs.
    @select('.pd-references .pd-paragraph') bibliography_textIndent = '-1.5em';
    bibliography_paddingLeft = '1.5em';

    // OWED, and it needs a structural decision first: sections numbered "1", "1.1" by CSS counters.
    // Every part of a book is a .pd-chapter now — the cover, the abstract, the contents and the
    // bibliography included — so counting chapters would number the cover 1. What is missing is a
    // way to say which chapters are the BODY, and that is Doug's to rule rather than mine to invent.
}

export const Theme = $($Theme);
