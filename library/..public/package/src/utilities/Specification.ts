import { reflection } from './Reflection';

type Rule<T> = ((writing: T) => boolean | void) & { description?: string };

export function specify(description: string) {
    return (target: object, key: string, descriptor: PropertyDescriptor): void => {
        Object.defineProperty(descriptor.value, 'description', { value: description, configurable: true });
    };
}

export class Specification<T extends object> {
    get rules(): [string, Rule<T>][] {
        const rules = new Map<string, Rule<T>>();
        const prototypes: object[] = [];
        for (let prototype = Object.getPrototypeOf(this); prototype !== null && prototype !== Object.prototype; prototype = Object.getPrototypeOf(prototype))
            prototypes.push(prototype);

        for (const prototype of prototypes.reverse())
            for (const name of Object.getOwnPropertyNames(prototype))
                if (name.startsWith('$') && typeof (this as never)[name] === 'function')
                    rules.set(name, (this as never)[name]);
        return [...rules.entries()];
    }

    code(writing: T, within?: string, index?: number): string {
        const name = reflection.name(writing);
        return within === undefined ? name : `${within} / ${name} ${index}`;
    }

    check(writing: T, code?: string): string[] {
        const failures: string[] = [];
        for (const [, rule] of this.rules)
            try {
                rule.call(this, writing);
            } catch (error) {
                failures.push(this.failure(error as Error, code));
            }
        return failures;
    }

    failure(error: Error, code?: string): string {
        return code === undefined ? error.message : `${code}: ${error.message}`;
    }
}
