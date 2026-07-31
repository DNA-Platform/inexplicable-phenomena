import { $, $check } from '@dna-platform/chemistry';
import { $Chapter } from './Chapter';
import { $Section } from '../writing/Section';

export class $Cover extends $Chapter {
    get summary(): $Section { return this.canonical; }

    $Cover(...sections: $Section[]) {
        this.parts = sections.length ? sections.map(s => $check(s, $Section)) : this.written();
        this.parts.forEach((s, i) => { if (s.$index === undefined) s.index = i + 1; });
        if (!this.valid()) throw new Error('A cover requires a title.');
    }
}

export const Cover = $($Cover);
