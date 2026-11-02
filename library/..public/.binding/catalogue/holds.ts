import type { Plugin } from 'vite';
import { problem, type Diagnostic, type Library } from '../inventory/library';
import { dotChapters } from '../inventory/filenames';
import type { Inventory } from '../inventory/retaken';
import type { Catalogue } from './catalogue';
import { wellformed } from './wellformed';

// WHETHER THE LIBRARY HOLDS TOGETHER — asked as one question, by both halves of the compiler.
//
// `catalogue/holds.ts` is a PROXY NAME, flagged for Doug.
//
// Doug, 2026-09-18: "We want compiler errors if this thing fails. I want to see them as errors
// preventing a compilation." A library that does not hold together is not a library to be served
// with a warning printed somewhere — it is a compile that must not finish.
//
// THE ORDER IS PART OF THE RULE AND SO IT LIVES HERE. The shape is asked before the references,
// because a book whose subject names nothing gets reported twice otherwise — once as a library
// that does not close and once as a name the catalogue cannot find — and the second is a symptom
// of the first. That ordering was written inside the binder's task, and the plugin below needed
// it too; a rule with two homes is a rule that will eventually disagree with itself.
export const holds = (found: Library, held: Catalogue): Diagnostic[] => {
    // THE SHAPE FIRST, THE ADDRESSES SECOND. A book whose catalogue names nothing would be reported
    // twice otherwise — once as a library that does not hold together and once as a name the
    // catalogue cannot find — and the second is a symptom of the first.
    const shape = wellformed(held.structure);
    if (shape.length > 0) return shape;

    // AND EVERY NAME THE PROSE USES RESOLVES TO AN ADDRESS. `wellformed` answers whether the library
    // is a library; this answers whether every page can be built from it.
    const wrong: Diagnostic[] = [];
    for (const key of held.keys()) if (held.where(key) === undefined) wrong.push({ at: found.root, file: found.root, says: `"${key}" is in the catalogue and stands at no address` });

    return wrong;
};

// THE SAME QUESTION, ASKED WHILE A PERSON IS TYPING — of the inventory `inventory/retaken.ts`
// keeps current, so a transform that follows a save pays for the retake and one that follows
// nothing pays for nothing.
//
// IT THROWS FROM `transform`, which is how a compile is stopped rather than commented on: vite puts
// a thrown transform error on the screen as the overlay, on the dot chapter the author just saved.
export const holding = (held: Inventory): Plugin => {
    const asked = (): Diagnostic[] => holds(held.library(), held.catalogue());

    const stops = (wrong: Diagnostic[]): void => {
        if (wrong.length === 0) return;
        throw new Error(`the library does not hold together\n${wrong.map(one => problem(one)).join('\n')}`);
    };

    return {
        name: 'binding:holds',
        enforce: 'pre',
        // BEFORE ANYTHING IS COMPILED AT ALL, which covers the bundle and the dev server's first
        // load. A library that is already broken never reaches a page.
        buildStart() {
            stops(asked());
        },
        transform(code: string, id: string) {
            const file = id.split('?')[0];
            if (!dotChapters.some(chapter => file.endsWith(chapter))) return null;
            stops(asked());

            return null;
        },
    };
};
