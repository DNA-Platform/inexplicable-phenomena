import { $, $Block, $check, $Chemical } from '@dna-platform/chemistry';
import { $Theme$, $Theme, Theme } from './Theme';

export interface $Format$ extends $Chemical {
    readonly theme: $Theme$;
}

export class $Format extends $Chemical implements $Format$ {
    theme!: $Theme;

    $Format(block: $Block) {
        this.theme = $check((block?.$elements ?? []).find(part => part instanceof $Theme), Theme, '!');
    }
}

export const Format = $($Format);
