import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { inventory, type Inventory } from '../inventory/configuration';
import { resolution, type Resolution } from '../resolution/configuration';
import { rendering, type Rendering } from '../rendering/configuration';
import { specification, type Specification } from '../specification/configuration';
import { manifest, type Manifest } from '../manifest/configuration';

export type Slice<T> = {
    fields: (keyof T & string)[];
    defaults: T;
    check(value: T): string | undefined;
};

export type Configuration = {
    inventory: Inventory;
    resolution: Resolution;
    rendering: Rendering;
    specification: Specification;
    manifest: Manifest;
};

const slices: { [K in keyof Configuration]: Slice<Configuration[K]> } = { inventory, resolution, rendering, specification, manifest };

export const configure = (binding: string): Configuration => {
    const at = join(binding, '.pubconfig');
    const written: Record<string, Record<string, unknown>> = existsSync(at) ? JSON.parse(readFileSync(at, 'utf8')) : {};
    for (const key of Object.keys(written))
        if (!(key in slices)) throw new Error(`.pubconfig names "${key}", and no step of binding reads it`);

    const chosen = {} as Configuration;
    for (const key of Object.keys(slices) as (keyof Configuration)[]) {
        const slice = slices[key] as unknown as Slice<Record<string, unknown>>;
        const section = written[key] ?? {};
        for (const field of Object.keys(section))
            if (!slice.fields.includes(field)) throw new Error(`.pubconfig ${key} names "${field}", and ${key} reads no such field`);
        const value = { ...slice.defaults, ...section };
        const says = slice.check(value);
        if (says) throw new Error(`.pubconfig ${key}: ${says}`);
        (chosen as Record<string, unknown>)[key] = value;
    }
    return chosen;
};
