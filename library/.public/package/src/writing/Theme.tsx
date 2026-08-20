import { $, $Chemical } from '@dna-platform/chemistry';

// A theme holds what would be INCOHERENT if every view decided it alone, and
// nothing else. It names no writing class, imports none, renders nothing and
// returns no markup — a view asks it and decides what to do with the answer.

/** What a composition looks like from outside it. Declared here rather than
 *  imported, so this module knows nothing about writing and cannot cycle. */
export type Composed = {
    parts(): readonly Laid[];
    parenthetical: boolean;
};

export type Laid = {
    parenthetical: boolean;
};

/** As one run of its own text, each part separately, or one part at a time. */
export type Lay = 'run' | 'each' | 'one';

export class $Theme extends $Chemical {
    $ink? = '#1d2327';
    $ground? = '#f4f1ea';
    $rule? = '#d8d3ca';
    $faint? = '#6b7680';
    $mark? = '#1e3a4a';
    $measure? = '38rem';
    $leading? = 1.6;
    $rhythm? = '2.5rem';
    $size? = 1;
    $ratio? = 1.25;
    $reads? = false;

    get ink(): string { return this.$ink!; }

    get ground(): string { return this.$ground!; }

    get rule(): string { return this.$rule!; }

    get faint(): string { return this.$faint!; }

    get mark(): string { return this.$mark!; }

    get measure(): string { return this.$measure!; }

    get leading(): number { return this.$leading!; }

    /** The space between the parts of a reading. */
    get rhythm(): string { return this.$rhythm!; }

    /** Whether writing marked parenthetical is drawn. */
    get reads(): boolean { return !!this.$reads; }

    // Derived rather than authored: one base and one ratio move every step
    // together. A theme wanting something else overrides this and inherits
    // the rest.
    step(at: number): string {
        return `${(this.$size! * this.$ratio! ** at).toFixed(3)}rem`;
    }

    // THE ONE ANSWER THAT IS NOT A VALUE, and the reason the theme can stay
    // ignorant of every class: it is asked about the PARTS, not about the
    // asker. `uniform` is supplied by the composition, which is the only thing
    // that knows its own default kind — so this decides without ever naming it.
    lay(of: Composed, uniform: boolean): Lay {
        return uniform ? 'run' : 'each';
    }

    // A part the theme's `reads` leaves out is not drawn. Asked here so a
    // composition never has to know the policy, only the answer.
    draws(part: Laid): boolean {
        return this.reads || !part.parenthetical;
    }

    view(): null {
        return null;
    }
}

export const Theme = $($Theme);
