import { $, $Chemical } from '@dna-platform/chemistry';
import { reflection } from '@/utilities/Reflection';
import type { $Writing } from '@/writing/Writing';
import type { $Type } from '@/writing/Type';

export interface $Scratchpad$ extends $Chemical {
    keep(kind: new() => $Type, key: string, writing: $Writing): void;
    find<T extends $Writing = $Writing>(kind: new() => $Type, key: string): T | undefined;
}

export class $Scratchpad extends $Chemical implements $Scratchpad$ {
    _kept = new Map<string, $Writing>();

    keep(kind: new() => $Type, key: string, writing: $Writing): void {
        this._kept.set(this.ref(kind, key), writing);
    }

    find<T extends $Writing = $Writing>(kind: new() => $Type, key: string): T | undefined {
        return this._kept.get(this.ref(kind, key)) as T | undefined;
    }

    protected ref(kind: new() => $Type, key: string): string {
        return `${reflection.template(kind).name}(${key})`;
    }
}

export const Scratchpad = $($Scratchpad);
