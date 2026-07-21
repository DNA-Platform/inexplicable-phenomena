import type { ReactNode } from 'react';
import { $Chemical } from '@dna-platform/chemistry';

/**
 * $Reference<T> — the act of pointing. A symbol is the minimal case of it, so
 * $Symbol will derive from here, not the reverse. A reference is a hyperlink, a
 * citation, a catalogue card: it names a target and shows a surface.
 *
 *   <Reference for="...">{whatever}</Reference>
 *
 * `$for` is the target — kept INDIRECT on purpose. A library that catalogues
 * itself cannot hold object references (they cycle, and cannot be serialized), so
 * `$for` is a string the catalogue resolves, never the held object. Following a
 * reference is a NAVIGATION — you look the target up and the library takes you to
 * it, the way you don't "resolve" a catalogue card, you go and get the book.
 *
 * `lookup(): T` is that dereference. `T` stays a real type — not a phantom — because
 * it is what the lookup YIELDS, not a field we store. `$Author = $Reference<$Autobiography>`
 * then means `lookup()` returns an `$Autobiography`, checked by the compiler, while
 * nothing but a string is ever held. The router/catalogue behind `lookup()` is not
 * wired yet (design record: library/.public/.lib/the-semantics-of-books).
 *
 * `frame()` wraps the surface in a clickable link and leaves `view()` free to evolve
 * the surface. It wraps `super.frame()` (the active view), so `look()`/perspectives
 * are preserved — a reference shown through any perspective is still a live link.
 */
export class $Reference<T extends $Chemical = $Chemical> extends $Chemical {
    /** The target — an indirect route/title/id the catalogue resolves. Never the object. */
    $for?: string;

    /**
     * Look the target up and go to it. Typed to `T` so the compiler checks what a
     * given reference may point at. Deferred: this is the seam where a reference
     * interfaces with the app's router — navigate to `$for`, the router resolves
     * the route to the target. Until that is wired, nothing resolves.
     */
    lookup(): T | undefined {
        return undefined;
    }

    /**
     * Wrap the surface in a clickable link. Following it navigates via lookup().
     * Wraps super.frame() — the active view — not this.view(), so a reference keeps
     * its look()/perspective behaviour while the link behaviour stays here.
     */
    frame(): ReactNode {
        return (
            <a href={`#${this.$for ?? ''}`} onClick={(e) => { e.preventDefault(); this.lookup(); }}>
                {super.frame()}
            </a>
        );
    }
}
