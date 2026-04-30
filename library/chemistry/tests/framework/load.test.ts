import { describe, it, expect } from 'vitest';
import { $, $Chemical } from '@/abstraction/chemical';
import { $lookup, $load } from '@/framework/load';

// Helpers that build module-shaped fixtures. These mirror what Vite's
// import.meta.glob and Webpack's require.context hand back at runtime, so the
// tests exercise the same code paths the utility is advertised to support.
//
// Important: $Chemistry only attaches `$bind` to the *template* Component of
// a subclass (the first instance ever created). We therefore capture each
// subclass's template Component once, at module load time, and reuse it
// across every describe() block.

class $Apple extends $Chemical { $kind = 'apple'; }
class $Banana extends $Chemical { $kind = 'banana'; }
class $Cherry extends $Chemical { $kind = 'cherry'; }

const AppleComponent = $($Apple);
const BananaComponent = $($Banana);
const CherryComponent = $($Cherry);

function moduleWithDefault(Component: any): any {
    return { default: Component };
}

function moduleWithNamed(name: string, Component: any): any {
    return { [name]: Component };
}

function requireContext(entries: Record<string, any>): any {
    const ctx = (key: string) => entries[key];
    (ctx as any).keys = () => Object.keys(entries);
    return ctx;
}

// ---------------------------------------------------------------------------
// $lookup — '{}' single-module form
// ---------------------------------------------------------------------------

describe('$lookup with type "{}"', () => {
    it('extracts a chemical from a default export', () => {
        const chemical = $lookup<$Apple>(moduleWithDefault(AppleComponent), '{}');
        expect(chemical).toBeInstanceOf($Apple);
        expect(chemical.$kind).toBe('apple');
    });

    it('extracts a chemical from a named export', () => {
        const chemical = $lookup<$Apple>(moduleWithNamed('Apple', AppleComponent), '{}');
        expect(chemical).toBeInstanceOf($Apple);
    });

    it('extracts a chemical when the module itself is the component (default-imported form)', () => {
        const chemical = $lookup<$Apple>(AppleComponent, '{}');
        expect(chemical).toBeInstanceOf($Apple);
    });

    it('extracts a chemical from a single-entry require.context', () => {
        const ctx = requireContext({ './apple.ts': moduleWithDefault(AppleComponent) });
        const chemical = $lookup<$Apple>(ctx, '{}');
        expect(chemical).toBeInstanceOf($Apple);
    });

    it('throws when multiple modules are found with "{}"', () => {
        const ctx = requireContext({
            './apple.ts': moduleWithDefault(AppleComponent),
            './banana.ts': moduleWithDefault(BananaComponent),
        });
        expect(() => $lookup<$Apple>(ctx, '{}')).toThrow(/found 2 modules/);
    });

    it('throws when the context is empty', () => {
        const ctx = requireContext({});
        expect(() => $lookup<$Apple>(ctx, '{}')).toThrow(/No modules found/);
    });

    it('throws when no chemical is found in a module', () => {
        const module = { default: { notAComponent: true } };
        expect(() => $lookup<$Apple>(module, '{}')).toThrow(/No Chemical class found/);
    });
});

// ---------------------------------------------------------------------------
// $lookup — '[]' multi-module form
// ---------------------------------------------------------------------------

describe('$lookup with type "[]"', () => {
    it('extracts every chemical from a record of modules', () => {
        const modules = {
            './apple.ts': moduleWithDefault(AppleComponent),
            './banana.ts': moduleWithDefault(BananaComponent),
            './cherry.ts': moduleWithDefault(CherryComponent),
        };
        const chemicals = $lookup<$Chemical>(modules, '[]');
        expect(chemicals).toHaveLength(3);
        expect(chemicals.some(c => c instanceof $Apple)).toBe(true);
        expect(chemicals.some(c => c instanceof $Banana)).toBe(true);
        expect(chemicals.some(c => c instanceof $Cherry)).toBe(true);
    });

    it('extracts every chemical from a require.context', () => {
        const ctx = requireContext({
            './apple.ts': moduleWithDefault(AppleComponent),
            './banana.ts': moduleWithDefault(BananaComponent),
        });
        const chemicals = $lookup<$Chemical>(ctx, '[]');
        expect(chemicals).toHaveLength(2);
    });

    it('skips modules that contain no chemical', () => {
        const modules = {
            './apple.ts': moduleWithDefault(AppleComponent),
            './empty.ts': { default: { notAComponent: true } },
            './banana.ts': moduleWithDefault(BananaComponent),
        };
        const chemicals = $lookup<$Chemical>(modules, '[]');
        expect(chemicals).toHaveLength(2);
    });

    it('returns an empty array when no modules contain chemicals', () => {
        const modules = { './nothing.ts': { default: {} } };
        const chemicals = $lookup<$Chemical>(modules, '[]');
        expect(chemicals).toEqual([]);
    });
});

describe('$lookup error handling', () => {
    it('throws on an invalid type parameter', () => {
        expect(() => $lookup<$Apple>(moduleWithDefault(AppleComponent), 'bad' as any))
            .toThrow(/Invalid type parameter/);
    });
});

// ---------------------------------------------------------------------------
// $load — async wrapper
// ---------------------------------------------------------------------------

describe('$load with type "{}"', () => {
    it('awaits a single loader function that returns a module', async () => {
        const loader = async () => moduleWithDefault(AppleComponent);
        const chemical = await $load<$Apple>(loader, '{}');
        expect(chemical).toBeInstanceOf($Apple);
    });

    it('resolves loader functions inside a record', async () => {
        const modules = {
            './apple.ts': async () => moduleWithDefault(AppleComponent),
        };
        const chemical = await $load<$Apple>(modules, '{}');
        expect(chemical).toBeInstanceOf($Apple);
    });

    it('passes through already-resolved modules', async () => {
        const chemical = await $load<$Apple>(moduleWithDefault(AppleComponent), '{}');
        expect(chemical).toBeInstanceOf($Apple);
    });
});

describe('$load with type "[]"', () => {
    it('awaits every loader in a record and returns all chemicals', async () => {
        const modules = {
            './apple.ts': async () => moduleWithDefault(AppleComponent),
            './banana.ts': async () => moduleWithDefault(BananaComponent),
            './cherry.ts': async () => moduleWithDefault(CherryComponent),
        };
        const chemicals = await $load<$Chemical>(modules, '[]');
        expect(chemicals).toHaveLength(3);
    });

    it('mixes loader functions and already-resolved modules in one record', async () => {
        const modules = {
            './apple.ts': async () => moduleWithDefault(AppleComponent),
            './banana.ts': moduleWithDefault(BananaComponent),
        };
        const chemicals = await $load<$Chemical>(modules, '[]');
        expect(chemicals).toHaveLength(2);
    });

    it('wraps a bare single module as a one-entry array', async () => {
        const chemicals = await $load<$Chemical>(moduleWithDefault(AppleComponent), '[]');
        expect(chemicals).toHaveLength(1);
    });

    it('handles a require.context passed directly', async () => {
        const ctx = requireContext({
            './apple.ts': moduleWithDefault(AppleComponent),
            './banana.ts': moduleWithDefault(BananaComponent),
        });
        const chemicals = await $load<$Chemical>(ctx, '[]');
        expect(chemicals).toHaveLength(2);
    });
});
