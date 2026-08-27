import { $, $Chemical } from '@dna-platform/chemistry';

export type Composed = {
    parts(): readonly Laid[];
    parenthetical: boolean;
};

export type Laid = {
    parenthetical: boolean;
};

export type Lay = 'run' | 'each' | 'one';

export class $Theme extends $Chemical {
    $ink? = '#14181d';
    $ground? = '#ffffff';
    $rule? = '#e2e6ea';
    $faint? = '#6a7480';
    $accent? = '#1a52c4';
    $face? = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    $mono? = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
    $measure? = '40rem';
    $leading? = 1.6;
    $weight? = 400;
    $tracking? = '0';
    $rhythm? = '2.5rem';
    $size? = 1;
    $ratio? = 1.25;

    get ink(): string { return this.$ink!; }

    get ground(): string { return this.$ground!; }

    get rule(): string { return this.$rule!; }

    get faint(): string { return this.$faint!; }

    get accent(): string { return this.$accent!; }

    get face(): string { return this.$face!; }

    get mono(): string { return this.$mono!; }

    get measure(): string { return this.$measure!; }

    get rhythm(): string { return this.$rhythm!; }

    step(at: number): string {
        return `${(this.$size! * this.$ratio! ** at).toFixed(3)}rem`;
    }

    // HOW TYPE IS SET AT A STEP. Larger type is set heavier, tighter and closer;
    // smaller type is set lighter and looser. Each is its OWN member over its own
    // base, so a theme that disagrees about tracking overrides tracking and
    // inherits the rest — the same shape `step` already had over `$size`.
    weight(at: number): number {
        return at > 0 ? 600 : this.$weight!;
    }

    tracking(at: number): string {
        if (at >= 3) return '-0.02em';
        if (at > 0) return '-0.01em';
        if (at <= -2) return '0.14em';
        return this.$tracking!;
    }

    leading(at: number): number {
        if (at >= 3) return 1.15;
        if (at > 0) return 1.25;
        return this.$leading!;
    }

    lay(of: Composed, uniform: boolean): Lay {
        return uniform ? 'run' : 'each';
    }

    view(): null {
        return null;
    }
}

export const Theme = $($Theme);
