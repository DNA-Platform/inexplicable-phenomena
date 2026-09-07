import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { $Theme$, $Theme, Theme as theme } from './Theme';

export interface $Format$ extends $Chemical {
    theme: $Theme$;
}

export class $Format extends $Chemical implements $Format$ {
    theme!: $Theme;

    $Format() {
        this.theme = $check(theme, '!');
    }
}

export const Format = $($Format);
