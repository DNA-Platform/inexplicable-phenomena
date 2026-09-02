import { $, $check } from '@dna-platform/chemistry';
import { $Type, $Writing } from '@/writing/Writing';

export class $Lib {
    $$(of: $Writing): (kind: new () => $Writing) => boolean;
    $$<T extends $Writing>(of: $Writing, kind: new () => T): T;
    $$(of: $Writing, kind?: new () => $Writing): unknown {
        const carried = of.type;
        const stands = (one: $Type | undefined, asked: new () => $Writing) =>
            one !== undefined && (one.canonicalForm === asked || one.canonicalForm.prototype instanceof asked);
        const worn = (asked: new () => $Writing) => of.traits.find(one => stands(one, asked));
        if (kind === undefined)
            return (asked: new () => $Writing) => of instanceof asked || stands(carried as $Type, asked) || worn(asked) !== undefined;
        if (of instanceof kind) return of;
        const named = stands(carried as $Type, kind) ? carried as $Type : worn(kind);
        if (!named) {
            const said = `This writing is not a ${kind.name} — it carries ${carried?.constructor.name ?? 'no type at all'}.`;
            $check(false, said);
            throw new Error(said);
        }
        const Made = $(named.canonicalForm);
        const made = $(<Made />) as $Writing & { bind(writing: $Writing): unknown };
        made.bind(of);
        return made;
    }
}

export const $$ = new $Lib().$$;
