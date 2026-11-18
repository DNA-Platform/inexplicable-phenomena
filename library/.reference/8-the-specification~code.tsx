// THE SPECIFICATION'S OWN CODE, Doug, 2026-11-18: "Make sure code lives in the right place. The
// specifcation code is pretty general right?" — the passes that implement The Specification's contract
// stand beside their chapter: the citation language of section 3, the tree of 9.1 to 9.5, the coverage
// and the rail of 9.6, and the alone-state of 9.4.3 with the figure's door of 9.8. The Content keeps the
// format, the parts, the renderer and the components, and calls these; the appendix tree.html remains the
// contract run on itself.

// THE SPECIFICATION REFERENCES ITSELF, Doug, 2026-11-16: "the spec should reference itself ... The
// specification should be highly connected" — and verbatim stays verbatim: the document already speaks a
// citation language — numbered sections, dotted parts, the labels K, C and O, bracketed references — so the
// renderer learns that language rather than the document changing. Definitions receive ids; every mention
// becomes a link to its definition, across the project's documents, since both render on one page.
const cited = /\[(\d+(?:,\s*\d+)*)\]|\b[Ss]ections? \d+(?: to \d+)?\b|\b[KCOI]\d+\b|\b\d\.\d(?:\.\d)?\b/g;

export const place = (citation: string): string => {
    const section = citation.match(/^[Ss]ections? (\d+)/);
    if (section !== null) return `cite-sec-${section[1]}`;
    const label = citation.match(/^([KCOI])(\d+)$/);
    if (label !== null) return `cite-${label[1].toLowerCase()}${label[2]}`;
    return `cite-${citation.replace(/\./g, '-')}`;
};

const link = (citation: string): string => {
    if (citation.startsWith('[')) {
        return '[' + citation.slice(1, -1).split(',').map(number =>
            `<a href="#cite-ref-${number.trim()}">${number.trim()}</a>`).join(', ') + ']';
    }
    return `<a href="#${place(citation)}">${citation}</a>`;
};

const mention = (passage: string, sections: boolean): string =>
    passage.split(/(<[^>]*>)/).map((piece, index, pieces) => {
        if (piece.startsWith('<')) return piece;
        const previous = pieces[index - 1];
        const lead = previous !== undefined && previous.includes('id="cite-')
            ? (piece.match(/^(?:[KCOI]\d+|\d+\.\d+(?:\.\d+)?|\d+\.)/) ?? [''])[0]
            : '';
        return lead + piece.slice(lead.length).replace(cited, found =>
            !sections && /^[Ss]ection/.test(found) ? found : link(found));
    }).join('');

export const connect = (rendered: string): string => {
    const identified = rendered
        .replace(/<h2>(\d+)\. /g, (whole, section) => `<h2 id="cite-sec-${section}">${section}. `)
        .replace(/<h3>(\d+)\.(\d+) /g, (whole, section, part) => `<h3 id="cite-${section}-${part}">${section}.${part} `)
        .replace(/<(strong|td)>(\d+)\.(\d+)\.(\d+) /g, (whole, tag, section, part, clause) => `<${tag} id="cite-${section}-${part}-${clause}">${section}.${part}.${clause} `)
        .replace(/<(strong|td)>(\d+)\.(\d+) /g, (whole, tag, section, part) => `<${tag} id="cite-${section}-${part}">${section}.${part} `)
        .replace(/<(strong|td)>([KCOI])(\d+) /g, (whole, tag, letter, number) => `<${tag} id="cite-${letter.toLowerCase()}${number}">${letter}${number} `);
    const boundary = identified.indexOf('<h2>Related work</h2>');
    if (boundary === -1) return mention(identified, true);
    let count = 0;
    const references = identified.slice(boundary).replace(/<li>/g, () => `<li id="cite-ref-${++count}">`);
    return mention(identified.slice(0, boundary), true) + mention(references, false);
};

// THE TREE, Doug, 2026-11-17, Sprint 130's twelfth round: "Specifications should always have numbers or
// codes, always have nesting, and their numbers should nest... collapse a part with sub parts... hide
// (entirely) and show-all parts again... move them around to compare... toggle the annotations on what is
// visible" — and the fourteenth: "We have to implement this and it needs to be interactive and have great
// examples." The specification of the tree is this file's own chapter, section 9. This second pass nests
// what connect identified, and at the sixteenth round — "We need to be able to collapse and expand every
// level... collapse everything to just the sections... We need reset not just show all up top" — it nests
// recursively: a section gathers its sub-parts by their own headings, a sub-part gathers its clauses, and
// every node carries its home box and its seat so reset can return the document's own order exactly. The
// bar carries the whole tree's verbs; every press lands in the renderer's one dispatcher.
// THE LAYER STARTS DARK, Doug, 2026-11-18: "Can you make sure they aren't visible but can be made visible
// easily" — no square is checked at the draw; the bar's square is the one act that lights every mark.
export const treeify = (rendered: string): string => {
    const sections = rendered.split(/(?=<h2)/);
    const lead = sections.shift() ?? '';
    const bar = '<span class="pc-tree-bar"><label class="pc-layerbox"><input type="checkbox" class="pc-anno-master" />annotations</label><span class="pc-verb pc-sections">sections</span><span class="pc-verb pc-expand">expand</span><span class="pc-verb pc-showall">show all</span><span class="pc-verb pc-return">everything</span><span class="pc-verb pc-reset">reset</span></span>';
    let boxes = 0;
    const blocks = (passage: string): string[] =>
        passage.split(/(?=<(?:p|ul|ol|table|div|blockquote|pre)[ >])/).filter(block => block.trim() !== '');
    const leaf = (block: string, home: number | 'root', seat: number): string =>
        `<div class="pc-part" draggable="true" data-home="${home}" data-seat="${seat}"><span class="pc-x" title="hide">×</span><span class="pc-o" title="only this">○</span>${block}</div>`;
    const group = (passage: string, level: number, home: number | 'root', seat: number): string => {
        const close = level === 1 ? '</h2>' : '</h3>';
        const at = passage.indexOf(close);
        const head = passage.slice(0, at);
        const body = passage.slice(at + close.length);
        const box = ++boxes;
        const kids: string[] = [];
        (level === 1 ? body.split(/(?=<h3)/) : [body]).forEach(piece => {
            if (piece.startsWith('<h3')) kids.push(group(piece, 2, box, kids.length));
            else blocks(piece).forEach(block => kids.push(leaf(block, box, kids.length)));
        });
        const inner = kids.join('');
        const parts = (inner.match(/class="pc-part"/g) ?? []).length;
        const square = level === 1 ? '<input type="checkbox" class="pc-sec-anno" />' : '';
        return `<section class="pc-spart" draggable="true" data-level="${level}" data-box="${box}" data-home="${home}" data-seat="${seat}"><span class="pc-x pc-sec-x" title="hide">×</span><span class="pc-o pc-sec-o" title="only this">○</span>${head}<span class="pc-count">${parts} parts</span>${square}${close}<div class="pc-kids">${inner}</div></section>`;
    };
    return bar + lead + sections.map((section, seat) => group(section, 1, 'root', seat)).join('');
};

// COVERAGE FROM THE CITATIONS, clause 4.2 of Sprint 130's record made mechanism: "justifications frequently
// map to the citations on the project side." The deliverable already cites the specification through Cite,
// so the marks are computed from the page's own citations, never authored twice: a claimed clause wears
// Cited and the mark leads back to the claim; an unclaimed clause reads Open. Computed once, lazily, at the
// first flip — the client's own pass, nothing walked at the server's draw. The sixteenth round made the
// marks consistent — "The annotations are messy... Annotations need to be consistent" — one chip per
// subject, heading, clause and table row alike, laid out by the rail below. The figures of 9.8 join the
// same pass: an authored annotation's mark, one form with the coverage.
export const cover = (): void => {
    const tree = document.querySelector('.pc-tree');
    if (tree === null || tree.classList.contains('pc-covered')) return;
    tree.classList.add('pc-covered');
    const claims = new Map<string, { at: string; count: number }>();
    document.querySelectorAll('.pc-cite a').forEach(cite => {
        const id = place(cite.textContent ?? '');
        const claim = claims.get(id);
        if (claim === undefined) {
            cite.id = `claim-${id}`;
            claims.set(id, { at: `claim-${id}`, count: 1 });
        } else claim.count += 1;
    });
    tree.querySelectorAll('strong[id^="cite-"], td[id^="cite-"], h2[id^="cite-sec-"], h3[id^="cite-"]').forEach(clause => {
        const claim = claims.get(clause.id);
        const chip = document.createElement('span');
        chip.className = claim === undefined ? 'pc-anno pc-open' : 'pc-anno';
        chip.setAttribute('data-for', clause.id);
        chip.textContent = claim === undefined ? 'Open' : claim.count > 1 ? `Cited ×${claim.count}` : 'Cited';
        chip.title = claim === undefined
            ? 'No part of the chapter cites this clause.'
            : 'The chapter claims this part; the mark leads to the claim.';
        if (claim !== undefined) chip.setAttribute('data-claim', claim.at);
        tree.appendChild(chip);
    });
    document.querySelectorAll('.pc-figure').forEach(figure => {
        const title = figure.getAttribute('data-title') ?? '';
        const chip = document.createElement('span');
        chip.className = 'pc-anno pc-fig';
        chip.setAttribute('data-for', place(figure.getAttribute('data-part') ?? ''));
        chip.setAttribute('data-fig-title', title);
        chip.setAttribute('data-fig-caption', figure.getAttribute('data-caption') ?? '');
        chip.textContent = title === '' ? 'Figure' : `Figure · ${title}`;
        chip.title = 'A figure of the specification; the mark shows its object alone.';
        tree.appendChild(chip);
    });
};

// THE RAIL, the sixteenth round's answer to the messy margin: one form for every subject — a one-line mark
// in a single lane at the writing's right edge, level with its subject, stacked so no mark ever collides
// with another — and one layout pass that re-lays the lane after every act on the tree. A mark draws only
// while its subject stands and its section's square is on; the writing never moves to make room, because
// the rail stands outside the measure.
export const rail = (): void => {
    const tree = document.querySelector<HTMLElement>('.pc-tree');
    if (tree === null) return;
    const master = tree.querySelector<HTMLInputElement>('.pc-anno-master');
    const frame = tree.getBoundingClientRect();
    const standing: { chip: HTMLElement; at: number }[] = [];
    tree.querySelectorAll<HTMLElement>(':scope > .pc-anno').forEach(chip => {
        const subject = document.getElementById(chip.getAttribute('data-for') ?? '');
        const square = subject?.closest('.pc-spart[data-level="1"]')?.querySelector<HTMLInputElement>(':scope > h2 > .pc-sec-anno');
        const seen = subject !== null && subject.getClientRects().length > 0 && (square?.checked ?? master?.checked ?? true);
        chip.style.display = seen ? 'block' : 'none';
        if (seen && subject !== null) standing.push({ chip, at: subject.getBoundingClientRect().top - frame.top });
    });
    let floor = -Infinity;
    standing.sort((a, b) => a.at - b.at).forEach(({ chip, at }) => {
        const top = Math.max(at, floor);
        chip.style.insetBlockStart = `${top}px`;
        floor = top + chip.offsetHeight + 2;
    });
};

// THE ALONE-STATE IS ONE STATE with two doors — the gutter's ring and a figure's mark — and one inverse,
// everything. The figure dresses it and nothing else differs, so leaving it is always the same act.
export const alone = (root: Element, one: Element): void => {
    one.classList.add('pc-the-one');
    const dim = (box: Element): void => {
        [...box.children].forEach(child => {
            if (child === one) return;
            if (child.contains(one)) {
                const kids = child.querySelector(':scope > .pc-kids');
                if (kids !== null) dim(kids);
                return;
            }
            if (child.classList.contains('pc-part') || child.classList.contains('pc-spart')) child.classList.add('pc-dim');
        });
    };
    dim(root);
};

export const clearAlone = (root: Element): void => {
    root.querySelectorAll('.pc-dim, .pc-the-one').forEach(part => part.classList.remove('pc-dim', 'pc-the-one'));
    root.querySelectorAll('.pc-fig-head, .pc-fig-cap').forEach(plate => plate.remove());
};
