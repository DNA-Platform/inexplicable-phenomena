import { $check } from '@dna-platform/chemistry';
import type { $Writing } from '@/writing/Writing';
import type { $Type } from './Type';

export function specify(description: string) {
    return (target: object, key: string, descriptor: PropertyDescriptor): void => {
        Object.defineProperty(descriptor.value, 'description', { value: description, configurable: true });
    };
}

export class Specification<T extends $Writing> {
    parent?: Specification<T> = undefined;
    for?: $Type = undefined;

    private cached?: [string, (writing: T) => boolean | void][] = undefined;

    rules(): [string, (writing: T) => boolean | void][] {
        return this.cached ??= this.collect();
    }

    private collect(): [string, (writing: T) => boolean | void][] {
        const found = new Map<string, (writing: T) => boolean | void>();
        const within = this.parent;
        for (const [name, rule] of within?.rules() ?? [])
            found.set(name, (writing: T) => rule.call(within, writing));

        const chain: object[] = [];
        let at: object | null = Object.getPrototypeOf(this);
        while (at !== null && at !== Object.prototype) {
            chain.push(at);
            at = Object.getPrototypeOf(at);
        }

        for (const proto of chain.reverse())
            for (const name of Object.getOwnPropertyNames(proto))
                if (name.startsWith('$') && typeof (this as never)[name] === 'function')
                    found.set(name, (this as never)[name]);
        return [...found.entries()];
    }

    check(writing: T): string[] {
        const failures: string[] = [];
        const ran: string[] = [];
        for (const [name, rule] of this.rules())
            try {
                if (rule.call(this, writing) !== false)
                    ran.push((rule as { description?: string }).description ?? name);
            } catch (raised) {
                failures.push((raised as Error).message);
            }
        $check(failures.length === 0, failures.join(' · '));
        return ran;
    }
}
