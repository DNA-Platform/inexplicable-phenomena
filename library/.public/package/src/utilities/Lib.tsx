import { $check } from '@dna-platform/chemistry';
import { $Type } from '@/notation/Type';
import { $Writing } from '@/writing/Writing';

export class $Lib {
    $$(of: $Writing): (type: new () => $Type) => boolean;
    $$<T extends $Type>(of: $Writing, type: new () => T): T;
    $$(of: $Writing, type?: new () => $Type): unknown {
        if (type === undefined) return (asked: new () => $Type) => of instanceof asked || of.specification.some(one => one instanceof asked);
        if (of instanceof type) return of;
        const found = of.specification.find(one => one instanceof type);
        if (!found) {
            const names = of.specification.map(one => one.constructor.name).join(', ');
            const said = `This writing is not a ${type.name} — it carries ${names || 'no type at all'}.`;
            $check(false, said);
            throw new Error(said);
        }
        found.bind(of);
        found.specify();
        return found;
    }
}

export const $$ = new $Lib().$$;
