import { $check } from '@dna-platform/chemistry';
import type { $Writing } from '@/writing/Writing';
import type { $Type } from './Type';

export function specify(said: string) {
    return (target: object, key: string, descriptor: PropertyDescriptor): void => {
        Object.defineProperty(descriptor.value, 'said', { value: said, configurable: true });
    };
}

export class $Specification<T extends $Writing> {
    parent?: $Specification<T> = undefined;
    for?: $Type = undefined;

    rules(): [string, (writing: T) => boolean | void][] {
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
        const said: string[] = [];
        const ran: string[] = [];
        for (const [name, rule] of this.rules())
            try {
                if (rule.call(this, writing) !== false)
                    ran.push((rule as { said?: string }).said ?? name);
            } catch (raised) {
                said.push((raised as Error).message);
            }
        $check(said.length === 0, said.join(' · '));
        return ran;
    }
}
