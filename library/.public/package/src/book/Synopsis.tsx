import { $ } from '@dna-platform/chemistry';
import { $Chapter } from './Chapter';
import { $Section } from '../writing/Section';

export class $Synopsis extends $Chapter {
    $Synopsis(...sections: $Section[]) {
        this.$Chapter(...sections);
    }
}

export const Synopsis = $($Synopsis);
