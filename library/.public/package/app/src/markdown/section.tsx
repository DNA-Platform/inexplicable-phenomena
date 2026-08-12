import { $ } from '@dna-platform/chemistry';
import { $Section } from '@/writing/Section';

// What is left of this file after the notation moved into the framework, and
// it is the only thing here that was ever the demo's: what the reader is
// ATTENDING to. Everything else — fences, plates, breaks, quotes, items,
// display maths, the whole divide and compose — is `$Section`'s own now,
// because it is not a kind of writing, it is how writing is written.
//
// The part is held by the SECTION, the common renderer of both the prose and
// the figure that lists it. It is handed DOWN to both; neither climbs `parent`
// to find it, which would tell the truth at binding and lie on screen.
export class $MarkdownSection extends $Section {
    attending = -1;

    attend(position: number) {
        this.attending = this.attending === position ? -1 : position;
    }
}

export const MarkdownSection = $($MarkdownSection);
