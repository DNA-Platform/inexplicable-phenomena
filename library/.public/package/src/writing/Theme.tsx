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
    $mark? = '#1a52c4';
    $face? = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    $mono? = 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';
    $measure? = '40rem';
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

    get face(): string { return this.$face!; }

    get mono(): string { return this.$mono!; }

    get measure(): string { return this.$measure!; }

    get leading(): number { return this.$leading!; }

    get rhythm(): string { return this.$rhythm!; }

    get reads(): boolean { return !!this.$reads; }

    step(at: number): string {
        return `${(this.$size! * this.$ratio! ** at).toFixed(3)}rem`;
    }

    lay(of: Composed, uniform: boolean): Lay {
        return uniform ? 'run' : 'each';
    }

    draws(part: Laid): boolean {
        return this.reads || !part.parenthetical;
    }

    view(): null {
        return null;
    }
}

export const Theme = $($Theme);
