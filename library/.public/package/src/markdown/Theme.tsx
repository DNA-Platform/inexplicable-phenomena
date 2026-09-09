// CREATED 2026-09-09 · rating 3. The markdown look, and every value in it is @tailwindcss/typography's
// — a real dependency of this package, read out of its own `styles.js` rather than guessed:
//
//   base            fontSize 1rem, lineHeight 1.75          DEFAULT.maxWidth 65ch
//   p               margin 1.25em                            ul/ol paddingInlineStart 1.625em
//   li              margin 0.5em                             blockquote paddingInlineStart 1em
//   h2              1.5em, 2em above, 1em below, lh 1.333    h3 1.25em, 1.6em above, 0.6em below
//   code            0.875em                                  pre 0.875em / 1.714, radius 0.375rem
//
// Its colours are oklch with a real hue rather than neutral greys, which is the difference Doug
// described as small and felt: --tw-prose-body is a warm-cool dark, --tw-prose-bullets is much
// paler than the text, and LINKS ARE THE HEADING COLOUR — Tailwind distinguishes a link by weight
// and underline, not by turning it blue. That is the single most considered decision in it.
//
// AND IT DRAWS NO RULE UNDER A HEADING. GitHub's rules are a README convention; prose has none,
// which is why `ruling` is 0 here and 1px in the base.
import { $, select } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import { $Theme as $Sheet, Theme as Base } from '@/formatting/Theme';

export class $Theme extends $Sheet {
    override measure = '65ch';
    override size = '16px';
    override leading = '1.75';
    override ink = 'oklch(37.3% 0.034 259.733)';
    override link = 'oklch(21% 0.034 264.665)';
    override rule = 'oklch(92.8% 0.006 264.531)';
    override pale = 'oklch(55.1% 0.027 264.364)';
    override shade = 'oklch(87.2% 0.01 258.338)';

    override indent = '0';
    override between = '1.25em';
    override titled = 'left';
    override ruling = '0';

    // THE SAME TWO GROUPS THE ARTICLE THEME USES, and that is the point of writing them together:
    // a desk with a sheet standing on it, and a strip above. Doug, 2026-09-09: *"The markdown and
    // the latex should be developed in parallel to prove to yourself that the abstraction handles
    // both… latex doesn't build on the markdown theme."* Neither does — both build on the base, and
    // what they share is the VOCABULARY rather than the values. Here the desk is a hair off white
    // and the sheet is a card on it, which is what a rendered document looks like on the web; there
    // it is a US Letter page on Chrome's #282828. One mechanism, two readings.
    override desk = 'oklch(98.4% 0.003 247.858)';
    override padding = '0';
    override margin = '0';
    // THE SAME ESCAPE THE ARTICLE THEME MAKES, and it is here for a reason worth recording rather
    // than for symmetry: latex.css is imported GLOBALLY, so `body { max-width: 80ch }` reached this
    // reading too and squeezed it to 600px — measured. A GLOBAL STYLESHEET CANNOT BE TOGGLED, which
    // is in tension with the anchor that the only difference between the two readings is the theme.
    // The better answer is for a theme to bring its own sheet and disable it when another is
    // applied — HTMLLinkElement.disabled does exactly that — and it is not done here because the
    // sheet arrives through the bundler as a <style> in dev and a file in production, so finding it
    // is fragile. Escaping body costs two lines and is honest about what it is working around.
    width = '100vw';
    marginLeft = 'calc(50% - 50vw)';
    // AND ITS PADDING. latex.css also sets `body { padding: 2rem 1.25rem }`, which the desk cannot
    // paint over and nothing here may write a rule for, so it is cancelled — measured, it pushed
    // the sheet 32px further from the strip than Chrome's own 3px.
    marginTop = '-2rem';
    marginBottom = '-2rem';
    override get maxWidth() { return '100vw'; }

    @select('.pd-book') sheet_maxWidth = 'min(72ch, 100%)';
    sheet_marginLeft = 'auto';
    sheet_marginRight = 'auto';
    sheet_marginTop = '4rem';
    sheet_marginBottom = '2.5rem';
    sheet_padding = '3rem';
    sheet_boxSizing = 'border-box';
    sheet_borderRadius = '.75rem';
    get sheet_border() { return `1px solid ${this.rule}`; }
    @select('@media (max-width: 768px) {\n            .pd-book {') tablet_padding = '2rem';
    tablet_marginTop = '3.5rem';
    @select('@media (max-width: 640px) {\n            .pd-book {') phone_padding = '1.25rem';
    phone_border = 'none';
    phone_borderRadius = '0';

    // THE STRIP IS THE SAME COMPONENT and it is not dark here, because nothing about a rendered
    // markdown document is dark. It is the page's own paper with a hairline under it.
    @select('.pd-header') override get strip_background() { return this.paper; }
    override get strip_borderBottom() { return `1px solid ${this.rule}`; }

    get headingColour() { return 'oklch(21% 0.034 264.665)'; }

    @select('.pd-heading') head_fontSize = '1.5em';
    head_marginTop = '2em';
    head_marginBottom = '1em';
    head_lineHeight = '1.3333333';
    head_fontWeight = '700';
    get head_color() { return this.headingColour; }

    @select('h3.pd-heading') deep_fontSize = '1.25em';
    deep_marginTop = '1.6em';
    deep_marginBottom = '.6em';
    deep_lineHeight = '1.6';

    @select('p.pd-paragraph') prose_marginTop = '1.25em';

    @select('.pd-list') list_marginTop = '1.25em';
    list_marginBottom = '1.25em';
    list_paddingInlineStart = '1.625em';

    @select('.pd-item') item_marginTop = '.5em';
    item_marginBottom = '.5em';

    @select('.pd-quote') quote_marginTop = '1.6em';
    quote_marginBottom = '1.6em';
    quote_paddingInlineStart = '1em';
    quote_paddingRight = '0';
    quote_fontStyle = 'italic';
    get quote_borderLeft() { return `.25rem solid ${this.shade}`; }

    @select('code') code_fontSize = '.875em';
    @select('pre') pre_fontSize = '.875em';
    pre_lineHeight = '1.7142857';
    pre_borderRadius = '.375rem';
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
