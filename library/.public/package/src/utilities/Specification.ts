import { $check } from '@dna-platform/chemistry';
import type { $Writing } from '@/writing/Writing';

export function specify(description: string) {
    return (target: object, key: string, descriptor: PropertyDescriptor): void => {
        Object.defineProperty(descriptor.value, 'description', { value: description, configurable: true });
    };
}

export class Specification<T> {
    parent?: Specification<T> = undefined;

    private cached?: [string, (writing: T) => boolean | void][] = undefined;

    rules(): [string, (writing: T) => boolean | void][] {
        return this.cached ??= this.collect();
    }

    check(writing: T): string[] {
        const failures: string[] = [];
        const descriptions: string[] = [];
        for (const [name, rule] of this.rules())
            try {
                if (rule.call(this, writing) !== false)
                    descriptions.push((rule as { description?: string }).description ?? name);
            } catch (error) {
                failures.push((error as Error).message);
            }
        $check(failures.length === 0, failures.join(' · '));
        return descriptions;
    }

    private collect(): [string, (writing: T) => boolean | void][] {
        const rules = new Map<string, (writing: T) => boolean | void>();
        const parent = this.parent;
        for (const [name, rule] of parent?.rules() ?? [])
            rules.set(name, (writing: T) => rule.call(parent, writing));

        const prototypes: object[] = [];
        let prototype: object | null = Object.getPrototypeOf(this);
        for (; prototype !== null && prototype !== Object.prototype; prototype = Object.getPrototypeOf(prototype))
            prototypes.push(prototype);

        for (const prototype of prototypes.reverse())
            for (const name of Object.getOwnPropertyNames(prototype))
                if (name.startsWith('$') && typeof (this as never)[name] === 'function')
                    rules.set(name, (this as never)[name]);
        return [...rules.entries()];
    }
}
