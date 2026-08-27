import { $Type } from '@/notation/Type';
import { $Writing } from '@/writing/Writing';

export class $Lib {
    // TWO READINGS OF ONE UTILITY, and they are the sentence you say out loud.
    //   $$(letter)($Letter)   — IS this writing a letter?
    //   $$(letter, $Letter)   — read this writing AS a letter.
    // Nothing is made either way: a writing that does not already carry the type
    // is not of that type, and the second form says so naming both sides.
    $$(of: $Writing): (type: new () => $Type) => boolean;
    $$<T extends $Type>(of: $Writing, type: new () => T): T;
    $$(of: $Writing, type?: new () => $Type): unknown {
        if (type === undefined) {
            return (asked: new () => $Type) => of.specification.some(one => one instanceof asked);
        }
        const found = of.specification.find(one => one instanceof type);
        if (!found) {
            const names = of.specification.map(one => one.constructor.name).join(', ');
            throw new Error(`This writing is not a ${type.name} — it carries ${names || 'no type at all'}.`);
        }
        found.bind(of);
        found.specify();
        return found;
    }
}

export const $$ = new $Lib().$$;
