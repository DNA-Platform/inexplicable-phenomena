import { $check } from '@dna-platform/chemistry';

type Rule<T> = ((subject: T) => boolean | void) & { description?: string };

export function specify(description: string) {
    return (target: object, key: string, descriptor: PropertyDescriptor): void => {
        Object.defineProperty(descriptor.value, 'description', { value: description, configurable: true });
    };
}

export class Specification<T extends object> {
    enforced = false;
    parent?: Specification<T> = undefined;

    rules(): [string, Rule<T>][] {
        const rules = new Map<string, Rule<T>>();
        const parent = this.parent;
        for (const [name, rule] of parent?.rules() ?? [])
            rules.set(name, (subject: T) => rule.call(parent, subject));

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

    check(subject: T): string[] {
        if (!this.enforced) return [];
        const failures: string[] = [];
        const descriptions: string[] = [];
        for (const [name, rule] of this.rules())
            try {
                if (rule.call(this, subject) !== false)
                    descriptions.push(rule.description ?? name);
            } catch (error) {
                failures.push((error as Error).message);
            }
        $check(failures.length === 0, failures.join(' · '));
        return descriptions;
    }
}
