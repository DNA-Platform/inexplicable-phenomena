import { identifier } from '@dna-platform/public';

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
    return `cite-${identifier.slug(citation)}`;
};

// THE NAME IS A CITABLE IDENTITY BESIDE THE CODE, Doug, 2026-11-19: "Can't we use mentions for the names? We
// have a .public reference system" — so the name is minted by the package's own rule, identifier.slug, the one
// place a name becomes an address in this library, and not by a second rule invented here. Every part of these
// documents is already written as code, space, name — "1.1 The base", "K2 Zero of the sieve", "4.2.1 Singular."
// — so the name is a capture the pass used to discard, never new authoring. The code keeps the element's id, so
// nothing that cites a number moves; the name rides an empty anchor inside the part, so a citation that holds a
// name lands even after a renumbering, which is the whole point: a document rewritten four times in one night
// breaks every citation by number and none by name. A heading with no number at all — Purpose, Related work —
// takes the name as its own id, which is what gives those two sections an address for the first time.
const anchors = (passage: string): string => {
    const taken = new Set([...passage.matchAll(/ id="(cite-[^"]+)"/g)].map(found => found[1]));
    const name = (lead: string): string => {
        const said = lead.replace(/^(?:[KCOI]?\d+(?:\.\d+)*\.?)\s*/, '').trim();
        return said === '' ? '' : `cite-${identifier.slug(said)}`;
    };
    return passage
        .replace(/<(h[23]|strong|td) id="(cite-[^"]+)">([^<]*)/g, (whole, tag, id, lead) => {
            const slug = name(lead);
            if (slug === '' || taken.has(slug)) return whole;
            taken.add(slug);
            return `<${tag} id="${id}"><span class="pc-name" id="${slug}"></span>${lead}`;
        })
        .replace(/<(h[23])>([^<]*)/g, (whole, tag, lead) => {
            const slug = name(lead);
            if (slug === '' || taken.has(slug)) return whole;
            taken.add(slug);
            return `<${tag} id="${slug}">${lead}`;
        });
};

// A DOCUMENT APART CITES ONLY WHAT ITS PAGE ANSWERS TO, Doug, 2026-11-20: "Only the spec needs to be saved.
// Everything else can be deleted" — the statement of work cites the identification by I1 to I20 and the progress
// by O1 to O11, and both were cleared with the chapter it stood in, so twelve of its citations named clauses no
// page holds and the binder refused the page, rightly. A document standing with its companions keeps 3.3 and
// links across them, the binder still catching a label nothing defines; a document standing apart links what its
// own passage answers to and leaves the rest as the document wrote it, which is what a record is.
const answers = (passage: string): Set<string> =>
    new Set([...passage.matchAll(/ id="(cite-[^"]+)"/g)].map(found => found[1]));

const link = (citation: string, answered: Set<string> | undefined): string => {
    if (citation.startsWith('[')) {
        return '[' + citation.slice(1, -1).split(',').map(number => {
            const reference = `cite-ref-${number.trim()}`;
            return answered === undefined || answered.has(reference)
                ? `<a href="#${reference}">${number.trim()}</a>`
                : number.trim();
        }).join(', ') + ']';
    }
    const target = place(citation);
    if (answered !== undefined && !answered.has(target)) return citation;
    return `<a href="#${target}">${citation}</a>`;
};

const mention = (passage: string, sections: boolean, answered: Set<string> | undefined): string =>
    passage.split(/(<[^>]*>)/).map((piece, index, pieces) => {
        if (piece.startsWith('<')) return piece;
        const previous = pieces[index - 1];
        const lead = previous !== undefined && previous.includes('id="cite-')
            ? (piece.match(/^(?:[KCOI]\d+|\d+\.\d+(?:\.\d+)?|\d+\.)/) ?? [''])[0]
            : '';
        return lead + piece.slice(lead.length).replace(cited, found =>
            !sections && /^[Ss]ection/.test(found) ? found : link(found, answered));
    }).join('');

export const connect = (rendered: string, apart = false): string => {
    const identified = rendered
        .replace(/<h2>(\d+)\. /g, (whole, section) => `<h2 id="cite-sec-${section}">${section}. `)
        .replace(/<h3>(\d+)\.(\d+) /g, (whole, section, part) => `<h3 id="cite-${section}-${part}">${section}.${part} `)
        .replace(/<(strong|td)>(\d+)\.(\d+)\.(\d+) /g, (whole, tag, section, part, clause) => `<${tag} id="cite-${section}-${part}-${clause}">${section}.${part}.${clause} `)
        .replace(/<(strong|td)>(\d+)\.(\d+) /g, (whole, tag, section, part) => `<${tag} id="cite-${section}-${part}">${section}.${part} `)
        .replace(/<(strong|td)>([KCOI])(\d+) /g, (whole, tag, letter, number) => `<${tag} id="cite-${letter.toLowerCase()}${number}">${letter}${number} `);
    const boundary = identified.indexOf('<h2>Related work</h2>');
    if (boundary === -1) return anchors(mention(identified, true, apart ? answers(identified) : undefined));
    let count = 0;
    const references = identified.slice(boundary).replace(/<li>/g, () => `<li id="cite-ref-${++count}">`);
    const answered = apart ? answers(identified.slice(0, boundary) + references) : undefined;
    return anchors(mention(identified.slice(0, boundary), true, answered) + mention(references, false, answered));
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
    const bar = '<span class="pc-tree-bar"><label class="pc-layerbox"><input type="checkbox" class="pc-anno-master" />annotations</label><span class="pc-verb pc-contents">contents</span><span class="pc-verb pc-sections">sections</span><span class="pc-verb pc-expand">expand</span><span class="pc-verb pc-showall">show all</span><span class="pc-verb pc-return">everything</span><span class="pc-verb pc-reset">reset</span></span>';
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

// THE CONTENTS, Doug, 2026-11-19: "There should be a toggle that turns the specification into a table of
// contents - with nested links for each section and their numbers and names. That should help." The document
// is a long one — nine sections and four thousand words on the arithmetic statement — and nothing showed the
// whole of it at once. The entries are the nodes the coverage already rides, because connect stamped each with
// its code and the document wrote its name beside it: a section's heading, a sub-part's heading, a clause's
// lead, a table row's label, each reading "1.1 The base" or "K2 Zero of the sieve" with no second authoring.
// A mode of the whole and not a state of any part, so unique showability (9.3) gains no reason: nothing is on
// or off the page for a cause of its own, the document stands behind the list and comes back whole. The rail
// needs no case — every subject is off the page while the list stands, so the one layout pass hides every mark
// by the rule it already has.
const depth = (node: Element): number => {
    let count = 0;
    let at: Element | null = node.closest('.pc-spart');
    while (at !== null) {
        count += 1;
        at = at.parentElement?.closest('.pc-spart') ?? null;
    }
    return /^H[23]$/.test(node.tagName) ? count - 1 : count;
};

export const contents = (root: Element): void => {
    const list = document.createElement('nav');
    list.className = 'pc-contents-list';
    root.querySelectorAll('h2[id^="cite-"], h3[id^="cite-"], strong[id^="cite-"], td[id^="cite-"]').forEach(node => {
        const entry = document.createElement('a');
        entry.className = 'pc-entry';
        entry.setAttribute('data-depth', `${Math.min(depth(node), 3)}`);
        entry.setAttribute('data-for', node.id);
        entry.textContent = [...node.childNodes]
            .filter(piece => piece.nodeType === Node.TEXT_NODE)
            .map(piece => piece.textContent)
            .join('')
            .replace(/\s+/g, ' ')
            .trim();
        list.append(entry);
    });
    root.querySelector('.pc-tree-bar')?.after(list);
    root.classList.add('pc-listing');
};

export const clearContents = (root: Element): void => {
    root.classList.remove('pc-listing');
    root.querySelector('.pc-contents-list')?.remove();
};

// A PRESS ON AN ENTRY TURNS THE DOCUMENT BACK AT THAT PART: the list goes, and the book turns to the place.
// A turn has to land, so a part folded away by an ancestor or hidden by the reader is brought back first —
// the reader asked for this part by name, and answering with the place it would have stood is not answering.
export const turnTo = (root: Element, id: string): void => {
    clearContents(root);
    const landing = document.getElementById(id);
    if (landing === null) return;
    landing.closest('.pc-hidden')?.classList.remove('pc-hidden');
    let at: Element | null = landing.closest('.pc-spart');
    while (at !== null) {
        at.classList.remove('pc-folded');
        at = at.parentElement?.closest('.pc-spart') ?? null;
    }
    const seat = landing.getClientRects().length > 0 ? landing : landing.closest('.pc-spart, .pc-part') ?? landing;
    seat.scrollIntoView({ block: 'center' });
};

// THE OPERATIONS, Doug, 2026-11-20: "I want us to get everything implemented and all code abstracted and
// organized so we can work on the specification in the textbook." Section 9 of this chapter specifies every
// act below — the gutter's hide and ring, the bar's six words, the squares, the figure's mark, a heading's
// fold — and until now they were event handlers inside The Content's renderer, which is to say the two files
// were divided by their medium (strings and the DOM here, React components there) rather than by the rule the
// manual states: a component lives beside the chapter that specifies it. They answer here now, to one
// question each, so a reader of section 9 finds its mechanism in one file; what stays in The Content is what
// The Content specifies, the citation that turns the page. Every act that changes what stands re-lays the rail.
// The figure comes home with them: its mark is drawn in cover, its press dressed here, its plates torn down in
// clearAlone, where before those three stood in two files.
export const operate = (root: Element, pressed: Element): boolean => {
    const x = pressed.closest('.pc-x');
    if (x !== null) {
        x.closest(x.classList.contains('pc-sec-x') ? '.pc-spart' : '.pc-part')?.classList.add('pc-hidden');
        rail();
        return true;
    }
    const ring = pressed.closest('.pc-o');
    if (ring !== null) {
        const one = ring.closest('.pc-part, .pc-spart');
        const was = one?.classList.contains('pc-the-one') ?? false;
        clearAlone(root);
        if (!was && one !== null) alone(root, one);
        rail();
        return true;
    }
    const entry = pressed.closest('.pc-entry');
    if (entry !== null) {
        turnTo(root, entry.getAttribute('data-for') ?? '');
        rail();
        return true;
    }
    if (pressed.closest('.pc-contents') !== null) {
        if (root.classList.contains('pc-listing')) clearContents(root);
        else contents(root);
        rail();
        return true;
    }
    if (pressed.closest('.pc-showall') !== null) {
        root.querySelectorAll('.pc-hidden').forEach(part => part.classList.remove('pc-hidden'));
        rail();
        return true;
    }
    if (pressed.closest('.pc-return') !== null) {
        clearAlone(root);
        rail();
        return true;
    }
    if (pressed.closest('.pc-sections') !== null) {
        root.querySelectorAll('.pc-spart').forEach(part => part.classList.add('pc-folded'));
        rail();
        return true;
    }
    if (pressed.closest('.pc-expand') !== null) {
        root.querySelectorAll('.pc-folded').forEach(part => part.classList.remove('pc-folded'));
        rail();
        return true;
    }
    if (pressed.closest('.pc-reset') !== null) {
        root.querySelectorAll('.pc-hidden, .pc-folded').forEach(part => part.classList.remove('pc-hidden', 'pc-folded'));
        clearAlone(root);
        clearContents(root);
        const boxes = new Map<string, Element>([['root', root]]);
        root.querySelectorAll('[data-box]').forEach(box => {
            const kids = box.querySelector(':scope > .pc-kids');
            if (kids !== null) boxes.set(box.getAttribute('data-box') ?? '', kids);
        });
        [...root.querySelectorAll<HTMLElement>('[data-home]')]
            .sort((a, b) => Number(a.getAttribute('data-seat')) - Number(b.getAttribute('data-seat')))
            .forEach(node => boxes.get(node.getAttribute('data-home') ?? '')?.append(node));
        rail();
        return true;
    }
    const master = pressed.closest('.pc-anno-master');
    if (master instanceof HTMLInputElement) {
        root.querySelectorAll<HTMLInputElement>('.pc-sec-anno').forEach(box => { box.checked = master.checked; });
        rail();
        return true;
    }
    if (pressed.closest('.pc-sec-anno') !== null) {
        const boxes = [...root.querySelectorAll<HTMLInputElement>('.pc-sec-anno')];
        const all = root.querySelector<HTMLInputElement>('.pc-anno-master');
        if (all !== null) all.checked = boxes.every(box => box.checked);
        rail();
        return true;
    }
    const mark = pressed.closest('.pc-anno');
    if (mark !== null) {
        if (mark.classList.contains('pc-fig')) {
            const subject = document.getElementById(mark.getAttribute('data-for') ?? '');
            const one = subject?.closest('.pc-part, .pc-spart') ?? null;
            const was = one?.classList.contains('pc-the-one') ?? false;
            clearAlone(root);
            if (!was && one !== null) {
                alone(root, one);
                const title = mark.getAttribute('data-fig-title') ?? '';
                if (title !== '') {
                    const head = document.createElement('p');
                    head.className = 'pc-fig-head';
                    head.textContent = title;
                    head.title = 'The caption stands beneath; press the title to show it.';
                    const caption = document.createElement('p');
                    caption.className = 'pc-fig-cap';
                    caption.textContent = mark.getAttribute('data-fig-caption') ?? '';
                    one.before(head);
                    one.after(caption);
                }
            }
            rail();
            return true;
        }
        const claim = mark.getAttribute('data-claim');
        if (claim !== null) {
            const turn = (): void => {
                const flip = document.getElementById('pc-flip');
                if (flip instanceof HTMLInputElement) flip.checked = false;
                document.getElementById(claim)?.scrollIntoView({ block: 'center' });
            };
            const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
            if (doc.startViewTransition === undefined) turn();
            else doc.startViewTransition(turn);
        }
        return true;
    }
    const head = pressed.closest('.pc-fig-head');
    if (head !== null) {
        head.parentElement?.querySelector('.pc-fig-cap')?.classList.toggle('pc-cap-shown');
        return true;
    }
    const heading = pressed.closest('.pc-spart > h2, .pc-spart > h3');
    if (heading !== null) {
        heading.parentElement?.classList.toggle('pc-folded');
        rail();
        return true;
    }
    return false;
};

// MOVE, 9.4.4: the part under the hand, the seat it would take, and the drop that reseats it. The three
// questions the pointer asks are the specification's, so they answer here; The Content's renderer passes the
// pointer's target and its height and does nothing else with them.
let dragged: HTMLElement | null = null;

const aim = (over: Element | null): HTMLElement | null => {
    if (dragged === null || over === null) return null;
    const top = dragged.getAttribute('data-level') === '1';
    const target = top
        ? over.closest<HTMLElement>('.pc-spart[data-level="1"]')
        : over.closest<HTMLElement>('.pc-part') ?? over.closest<HTMLElement>('.pc-spart');
    if (target === null || target === dragged || dragged.contains(target)) return null;
    return target;
};

const unseat = (): void => {
    document.querySelectorAll('.pc-before, .pc-after').forEach(seat => seat.classList.remove('pc-before', 'pc-after'));
};

export const take = (target: Element, transfer: DataTransfer): void => {
    const part = target.closest<HTMLElement>('.pc-part, .pc-spart');
    if (part === null) return;
    dragged = part;
    transfer.setData('text/plain', 'part');
    transfer.effectAllowed = 'move';
};

export const seat = (target: Element, y: number): boolean => {
    const over = aim(target);
    unseat();
    if (over === null) return false;
    const box = over.getBoundingClientRect();
    over.classList.add(y < box.top + box.height / 2 ? 'pc-before' : 'pc-after');
    return true;
};

export const reseat = (target: Element, y: number): boolean => {
    const over = aim(target);
    unseat();
    if (over === null || dragged === null) return false;
    const box = over.getBoundingClientRect();
    const before = y < box.top + box.height / 2;
    if (dragged.getAttribute('data-level') !== '1' && over.classList.contains('pc-spart')) {
        const kids = over.querySelector(':scope > .pc-kids');
        if (kids !== null) {
            if (before) kids.prepend(dragged);
            else kids.append(dragged);
        }
    } else {
        over.parentElement?.insertBefore(dragged, before ? over : over.nextSibling);
    }
    dragged = null;
    rail();
    return true;
};

export const release = (): void => {
    unseat();
    dragged = null;
};
