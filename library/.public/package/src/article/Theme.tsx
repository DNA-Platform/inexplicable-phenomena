// CREATED 2026-09-08, WRITTEN 2026-09-09 · rating 3. The article's theme: the base sheet with LaTeX's groups re-said, installed by registration, carrying no formats. Groups owed against the paper.
import { $, select } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import { $Theme as $Sheet, Theme as Base } from '@/formatting/Theme';

export class $Theme extends $Sheet {
    // THE VALUES ARE LaTeX.css's, not invented — https://latex.vercel.app, a classless library that
    // styles semantic HTML, which is exactly what this framework emits. Read from its stylesheet:
    // the serif stack, 80ch rather than a pixel width, 1.8 leading, a near-black with a warm tint
    // instead of #000, hyperref's dark red for links, and a GROUND that is not white.
    override face = "'Latin Modern', 'Latin Modern Roman', 'CMU Serif', Georgia, Cambria, 'Times New Roman', Times, serif";
    override body = "'Latin Modern', 'Latin Modern Roman', 'CMU Serif', Georgia, Cambria, 'Times New Roman', Times, serif";
    override size = '16px';
    override leading = '1.8';
    // 58ch AND NOT LaTeX.css's 80ch. `ch` is the width of a ZERO, which in a serif is much narrower
    // than the average letter — measured, 80ch drew 102 characters a line against a readable 45–75.
    // A real article at 10pt on 6.5in sets about 72, which is what 58ch gives here.
    override measure = '58ch';
    override ink = 'hsl(0, 5%, 10%)';
    override paper = 'hsl(210, 20%, 98%)';
    override link = 'hsl(0, 100%, 33%)';
    override rule = 'hsl(0, 0%, 80%)';

    // THE FOUR LAYOUT VALUES THE BASE NOW CARRIES. Everything below them used to be written here as
    // CSS: a rule under every heading undone group by group, a paragraph's indent and spacing said
    // twice, the cover's alignment. Ten of sixteen groups became these four lines.
    override indent = '1.463rem';
    override between = '0';
    override titled = 'center';
    override ruling = '0';

    // THE TITLE BLOCK. A paper opens centred and unruled — the rules under every heading are
    // GitHub's, and LaTeX draws none. Written against the page rather than guessed: each group
    // below names a class the paper actually carries, counted in the browser.
    // A PAPER'S TITLE IS NOT A LINK EVEN WHEN IT IS ONE, and neither is a contents entry: hyperref's
    // red is for a CITATION in running text, where it has to be found. Set red, sixty-four contents
    // entries are the loudest thing on the page.
    // .pd-title IS A SECTION, and the anchor inside it is the MEANING anchor $Writing.view wraps a
    // printed element in when the writing means something — seen in the DOM rather than guessed:
    // <section class="pd-section pd-title"><a class="pd-meaning"><h2 class="pd-heading">. The whole
    // cover — the title's scale, the plain author, the italic subject line, the air around them —
    // MOVED TO THE BASE, because none of it is a thing LaTeX does; it is what a cover is. What is
    // left here is the one value a paper differs on, and it is `titled` above.

    // THE SCALE IS LaTeX.css's — h2 at 1.7rem with 3rem above it and .8rem below, h3 at 1.4rem
    // with 2.5rem above. It is more air than a README gives a heading, and it is what makes a page
    // read as sections rather than as a list.
    @select('h2.pd-heading') head_fontWeight = '700';
    head_fontSize = '1.7rem';
    head_marginTop = '3rem';
    head_marginBottom = '.8rem';
    @select('h3.pd-heading') deep_fontSize = '1.4rem';
    deep_marginTop = '2.5rem';
    deep_marginBottom = '.6rem';

    // A PAPER IS SET JUSTIFIED AND HYPHENATED, which is the difference nobody names when they say
    // a page looks typeset. LaTeX.css asks for both.
    @select('p.pd-paragraph, .pd-item') justified_textAlign = 'justify';
    justified_hyphens = 'auto';
    justified_textRendering = 'optimizeLegibility';

    // THE ABSTRACT is narrower than the text and labelled — what LaTeX's abstract environment does.
    @select('.pd-synopsis') abstract_maxWidth = '86%';
    abstract_margin = '0 auto 2.5rem';
    abstract_fontSize = '.95em';
    @select('.pd-synopsis .pd-heading') abstracted_fontSize = '1em';
    abstracted_textAlign = 'center';

    @select('.pd-heading + p.pd-paragraph') opening_textIndent = '0';
    contents_marginTop = '0';
    contents_lineHeight = '1.5';

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
    // A THEME DRESSES A SCOPE. Doug proposed $register for this and the name is already taken by a
    // different act: `static $register()` is the composition root's wiring hook — register.ts walks
    // src for it and EMITS the call into index.ts before every build — and it takes no scope, while
    // applying a theme is a per-book choice. So this is its own static, and `$dresses` is a proxy
    // name. Chemistry's registration is `$(A, B)(C)` — for A, a B is a C — and there is no bare
    // form: `$(B)(C)` CALLS the component and answers "Cannot read properties of null" from React.
    static $dresses(within: Component<never>): void {
        $(within, Base)(Theme);
    }
}

export const Theme = $($Theme);
