import type { $Chemical } from "../abstraction/chemical";
import type { $Bound } from "../implementation/types";

export function $lookup<T extends $Chemical>(module: any, type: '{}', parent?: $Chemical): T;
export function $lookup<T extends $Chemical>(modules: any, type: '[]', parent?: $Chemical): T[];
export function $lookup<T extends $Chemical>(modules: any, type: string, parent?: $Chemical): T | T[] {
    const collected: T[] = [];

    if (typeof modules === 'function' && typeof (modules as any).keys === 'function') {
        const keys = (modules as any).keys();
        if (type === '{}' && keys.length === 0) throw new Error('No modules found');
        for (const key of keys) {
            const chemical = extract(modules(key), parent);
            if (chemical) collected.push(chemical as T);
        }
    } else if (modules && typeof modules === 'object') {
        for (const value of Object.values(modules)) {
            const chemical = extract(value, parent);
            if (chemical) collected.push(chemical as T);
        }
        if (collected.length === 0) {
            const single = extract(modules, parent);
            if (single) collected.push(single as T);
        }
    } else {
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
