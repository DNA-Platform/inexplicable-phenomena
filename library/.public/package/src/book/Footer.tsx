import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Section } from '../writing/Section';
import { $Title } from '../writing/Title';
import { $Footnote } from './Footnote';

export class $Footer extends $Section {
    get entries(): $Footnote[] {
        return (this.text?.$elements ?? []).filter((e): e is $Footnote => e instanceof $Footnote);
    }

    entry(label: string): $Footnote | undefined {
        const found = this.entries.filter(e => e.label === label);
        return found.length === 1 ? found[0] : undefined;
    }

    $Footer(text?: $Html<'block'>) {
        this.text = $check(text, 'block');
        const first = this.text?.$elements?.[0];
        this.title = (first instanceof $Title ? first.text : first) as $Html<'block'>;
        this.entries.forEach((e, i) => { e.index = i + 1; });
    }
}

export const Footer = $($Footer);
