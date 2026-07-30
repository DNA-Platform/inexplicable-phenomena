import { $, $check } from '@dna-platform/chemistry';
import { $Chapter } from './Chapter';
import { $Section } from '../text/Section';

export class $Synopsis extends $Chapter {
    $Synopsis(...sections: $Section[]) {
        this.sections = sections.map(s => $check(s, $Section));
    }
}

export const Synopsis = $($Synopsis);
