import { $Type } from '@/notation/Type';
import { $Writing } from '@/writing/Writing';

export class $Lib {
    // ONE OF ITS TYPES HAS TO BE THE KIND YOU ASKED FOR. Nothing is made here:
    // a writing that does not already carry the type is not of that type.
    $$<T extends $Type>(type: new () => T, of: $Writing): T {
        const found = of.specification.find(one => one instanceof type) as T | undefined;
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
