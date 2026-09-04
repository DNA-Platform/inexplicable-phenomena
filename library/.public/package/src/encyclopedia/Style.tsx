import { $, $Chemical } from '@dna-platform/chemistry';
import { $Theme, Theme } from '@/book/Theme';

export class $Style extends $Chemical {
    theme!: $Theme;

    $Style() {
        const Asked = $(Theme);

        this.theme = $(<Asked />) as $Theme;
    }
}

export const Style = $($Style);
