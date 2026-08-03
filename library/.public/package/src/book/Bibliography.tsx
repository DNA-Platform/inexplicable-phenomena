import { $, $check, type $Html } from '@dna-platform/chemistry';
import { $Section } from '../writing/Section';
import { $Title } from '../writing/Title';
import { $Citation } from './Citation';

export class $Bibliography extends $Section {
    get entries(): $Citation[] {
        return (this.text?.$elements ?? []).filter((e): e is $Citation => e instanceof $Citation);
    }

    entry(label: string): $Citation | undefined {
        const found = this.entries.filter(e => e.label === label);
        return found.length === 1 ? found[0] : undefined;
    }

    $Bibliography(text?: $Html<'block'>) {
        this.text = $check(text, 'block');
        const first = this.text?.$elements?.[0];
        this.title = (first instanceof $Title ? first.text : first) as $Html<'block'>;
        this.entries.forEach((e, i) => { e.index = i + 1; });
    }
}

export const Bibliography = $($Bibliography);
