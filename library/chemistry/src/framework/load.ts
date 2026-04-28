import type { $Chemical } from "../abstraction/chemical";
import type { $Bound } from "../implementation/types";

// ===========================================================================
// $lookup / $load — discover $Chemical components across modules
//
// These are user-facing utilities that introspect module collections (single
// modules, Webpack require.context, Vite import.meta.glob, records of
// imported modules, or records of dynamic-import loaders) and extract
// $Chemical components from them.
//
// $lookup is synchronous — the caller hands in already-resolved modules.
// $load is asynchronous — the caller may hand in loader functions that the
// framework will await. The loaders themselves are caller-supplied; the
// framework does not resolve modules by name.
// ===========================================================================

/**
 * Looks up Chemistry classes from JavaScript modules and instantiates them.
 * Automatically detects ES modules, CommonJS, and bundler formats.
 *
 * @example
 * // Single module
 * import AppleModule from './apple';
 * const apple = $lookup<$Apple>(AppleModule, '{}');
 *
 * @example
 * // Vite
 * const modules = import.meta.glob('./entries/*.tsx', { eager: true });
 * const entries = $lookup<$DictionaryEntry>(modules, '[]');
 *
 * @example
 * // Webpack/Next.js
 * const ctx = require.context('./entries', false, /\.tsx$/);
 * const entries = $lookup<$DictionaryEntry>(ctx, '[]');
 *
 * @example
 * // Plain ESM
 * const modules = {
 *   'apple': await import('./apple.js'),
 *   'banana': await import('./banana.js')
 * };
 * const entries = $lookup<$DictionaryEntry>(modules, '[]');
 *
 * @param moduleOrModules - Single module, Webpack context, or Record<path, module>
 * @param type - '{}' for single result, '[]' for array
 * @param parent - Optional parent Chemical for binding
 */
export function $lookup<T extends $Chemical>(module: any, type: '{}', parent?: $Chemical): T;
export function $lookup<T extends $Chemical>(modules: any, type: '[]', parent?: $Chemical): T[];
export function $lookup<T extends $Chemical>(modules: any, type: string, parent?: $Chemical): T | T[] {
    const collected: T[] = [];

    if (typeof modules === 'function' && typeof (modules as any).keys === 'function') {
        // Webpack-style require.context
        const keys = (modules as any).keys();
        if (type === '{}' && keys.length === 0) throw new Error('No modules found');
        for (const key of keys) {
            const chemical = extract(modules(key), parent);
            if (chemical) collected.push(chemical as T);
        }
    } else if (modules && typeof modules === 'object') {
        // Prefer record-of-modules interpretation so `import.meta.glob` and
        // `{ path: module }` shapes keep working for multi-entry cases.
        for (const value of Object.values(modules)) {
            const chemical = extract(value, parent);
            if (chemical) collected.push(chemical as T);
        }
        // If nothing matched as a record, treat the object itself as a single
        // module — this handles `{ default: Component }` and `{ Name: Component }`.
        if (collected.length === 0) {
            const single = extract(modules, parent);
            if (single) collected.push(single as T);
        }
    } else {
        // Bare Component (e.g. default-imported module that IS the component).
        const single = extract(modules, parent);
        if (single) collected.push(single as T);
    }

    if (type === '{}') {
        if (collected.length > 1) throw new Error(`Expected single module but found ${collected.length} modules`);
        if (collected.length === 0) throw new Error('No Chemical class found in module');
        return collected[0];
    }
    if (type === '[]') return collected;
    throw new Error(`Invalid type parameter: ${type}`);
}

/**
 * Asynchronously loads Chemistry classes from modules with lazy-loading
 * support. Handles loader functions and promises automatically. The loaders
 * themselves are caller-supplied — $load just awaits whatever you give it
 * and then hands the resolved modules to $lookup.
 *
 * @example
 * // Vite lazy loading
 * const loaders = import.meta.glob('./entries/*.tsx');
 * const entries = await $load<$DictionaryEntry>(loaders, '[]');
 *
 * @example
 * // Dynamic imports
 * const modules = {
 *   'apple': () => import('./apple.js'),
 *   'banana': () => import('./banana.js')
 * };
 * const entries = await $load<$DictionaryEntry>(modules, '[]');
 */
export async function $load<T extends $Chemical>(module: any, type: '{}', parent?: $Chemical): Promise<T>;
export async function $load<T extends $Chemical>(modules: any, type: '[]', parent?: $Chemical): Promise<T[]>;
export async function $load<T extends $Chemical>(
    moduleOrModules: any,
    type: '{}' | '[]',
    parent?: $Chemical
): Promise<T | T[]> {
    if (typeof moduleOrModules === 'function' && !moduleOrModules.keys) {
        const module = await moduleOrModules();
        if (type === '{}') return $lookup<T>(module, '{}', parent);
        return $lookup<T>({ 'single': module }, '[]', parent);
    }

    if (typeof moduleOrModules === 'function' && moduleOrModules.keys) {
        if (type === '{}') return $lookup<T>(moduleOrModules, '{}', parent);
        return $lookup<T>(moduleOrModules, '[]', parent);
    }

    if (
        typeof moduleOrModules === 'object' &&
        !moduleOrModules.default &&
        !moduleOrModules.prototype
    ) {
        const keys = Object.keys(moduleOrModules);
        if (keys.length > 0) {
            const resolved: Record<string, any> = {};
            for (const [path, moduleOrLoader] of Object.entries(moduleOrModules)) {
                resolved[path] = typeof moduleOrLoader === 'function'
                    ? await (moduleOrLoader as () => Promise<any>)()
                    : moduleOrLoader;
            }
            if (type === '{}') return $lookup<T>(resolved, '{}', parent);
            return $lookup<T>(resolved, '[]', parent);
        }
    }

    if (type === '{}') return $lookup<T>(moduleOrModules, '{}', parent);
    const wrapped = { 'module': moduleOrModules };
    return $lookup<T>(wrapped, '[]', parent);
}

function extract(module: any, parent?: $Chemical): $Chemical | null {
    let Component: $Bound<any> | null = null;

    if (module?.default?.$bind) {
        Component = module.default;
    } else if (module?.$bind) {
        Component = module;
    } else {
        const keys = module ? Object.keys(module) : [];
        for (const key of keys) {
            if (module[key]?.$bind) {
                Component = module[key];
                break;
            }
        }
    }

    if (Component) {
        const bound = Component.$bind(parent!);
        return (bound as any).$chemical;
    }

    return null;
}
