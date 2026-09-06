import { $, $Chemical } from '@dna-platform/chemistry';
import type { $Theme$, $Theme, $Writing$ } from './Writing';

const themed = (one: unknown): one is $Writing$ => typeof (one as $Writing$)?.theme === 'function';

export interface $Format$ extends $Chemical {
    readonly theme: $Theme$;
}

export class $Format extends $Chemical implements $Format$ {
    _theme?: $Theme;

    get theme(): $Theme {
        if (this._theme !== undefined) return this._theme;
        for (let at = this.parent; at !== undefined && at !== at.parent; at = at.parent)
            if (themed(at)) return this._theme = at.theme();
        throw new Error('a format is worn by writing, and this one is worn by nothing that has a theme');
    }
}

export const Format = $($Format);
