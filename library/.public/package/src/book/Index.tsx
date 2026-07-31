import { $ } from '@dna-platform/chemistry';
import { $Chapter } from './Chapter';
import { $Section } from '../writing/Section';

export class $Index extends $Chapter {
    $Index(...sections: $Section[]) {
        this.$Chapter(...sections);
    }
}

export const Index = $($Index);
