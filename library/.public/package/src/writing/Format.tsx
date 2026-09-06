import { $, $Chemical } from '@dna-platform/chemistry';
import type { $Theme$, $Theme } from './Writing';

export interface $Format$ extends $Chemical {
    readonly theme: $Theme$;
}

export class $Format extends $Chemical implements $Format$ {
    get theme(): $Theme {
        for (let at = this.parent; at !== undefined && at !== at.parent; at = at.parent)
            if ('theme' in at && typeof at.theme === 'function') return (at.theme as () => $Theme)();
        throw new Error('a format is worn by writing, and this one is worn by nothing that has a theme');
    }
}

export const Format = $($Format);
