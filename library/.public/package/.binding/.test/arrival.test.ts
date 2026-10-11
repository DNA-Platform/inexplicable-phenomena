// @vitest-environment happy-dom
import { describe, expect, it, beforeEach } from 'vitest';
import { arrival, arrive } from '../rendering/arrival';

// THE RIGHT CHAPTER AT FIRST PAINT — Doug, 2026-10-11: "when you go to a # chapter you see the latitude
// first. It is a bit jarring. Hard to feel like the links work." A page as printed, in the form the binder
// writes: the contents' rows in the holds, each an entry paragraph inside the anchor its reference draws
// around it, and the pages, the first open as the print left it, the second inside a layer drawn around it
// with a column between the two, as a spread puts its words.
const printed = `
<div class="pd-book">
  <div class="pd-holds">
    <a class="pa-reference pd-container" href="/a-book/#the-first"><div class="pd-paragraph pa-entry pa-reference pa-open">The First</div></a>
    <a class="pa-reference pd-container" href="/a-book/#the-second"><div class="pd-paragraph pa-entry pa-reference">The Second</div></a>
  </div>
  <div class="pd-pages">
    <div class="pd-chapter pa-page pa-open"><div class="pd-sentence pd-title" id="the-first">The First</div></div>
    <div class="pd-container pd-room">
      <div class="pd-words">
        <div class="pd-container pd-keyed">
          <div class="pd-chapter pa-page">
            <div class="pd-sentence pd-title" id="the-second">The Second</div>
            <div class="pd-section"><div class="pd-sentence pd-heading" id="a-section">A section</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

const open = (): string[] => Array.from(document.querySelectorAll('.pa-open')).map(one => `${one.tagName.toLowerCase()}.${Array.from(one.classList).filter(c => c !== 'pa-open' && c !== 'pa-reference').join('.')}`);
const openRow = (): string | null | undefined => document.querySelector('.pa-entry.pa-open')?.closest('a')?.getAttribute('href');

describe('the arrival', () => {
    beforeEach(() => { document.body.innerHTML = printed; document.documentElement.className = ''; });

    it('opens the chapter a fragment names, every layer drawn around it and its row, and closes what the print opened', () => {
        expect(arrive(document, '#the-second')).toBe('the-second');
        expect(open()).toEqual(['div.pd-paragraph.pa-entry', 'div.pd-container.pd-room', 'div.pd-container.pd-keyed', 'div.pd-chapter.pa-page']);
        expect(openRow()).toBe('/a-book/#the-second');
        expect(document.documentElement.classList.contains('pa-arriving')).toBe(false);
    });

    it('opens the chapter a section\'s fragment is in, and its row by the chapter\'s title', () => {
        expect(arrive(document, '#a-section')).toBe('the-second');
        expect(document.querySelector('.pd-chapter.pa-open .pd-title')?.id).toBe('the-second');
        expect(openRow()).toBe('/a-book/#the-second');
    });

    it('does nothing without a fragment, or when the fragment\'s chapter is the one the print opened', () => {
        expect(arrive(document, '')).toBeUndefined();
        expect(arrive(document, '#the-first')).toBeUndefined();
        expect(open()).toEqual(['div.pd-paragraph.pa-entry', 'div.pd-chapter.pa-page']);
        expect(document.documentElement.classList.contains('pa-arriving')).toBe(false);
    });

    it('leaves the pages as printed when the fragment names nothing on the page', () => {
        expect(arrive(document, '#nowhere')).toBeUndefined();
        expect(open()).toEqual(['div.pd-paragraph.pa-entry', 'div.pd-chapter.pa-page']);
    });

    it('is carried by the page\'s head as text, called with the document and the address, under the rule that holds the pages still', () => {
        const head = arrival();
        expect(head).toContain('<style>.pa-arriving .pd-pages{visibility:hidden}</style>');
        expect(head).toContain('(document,location.hash);</script>');
        expect(head).toContain('pa-arriving');
        expect(head).not.toContain('import ');
    });
});
