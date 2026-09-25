import { isValidElement } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import type { Component } from '@dna-platform/chemistry';
import type { Given } from './Collection';

export class Reflection {
    classOf<T extends object>(given: Given<T>): new () => T {
        if (typeof given === 'function') {
            const chemical = (given as { $chemical?: $Chemical }).$chemical;
            return chemical === undefined ? given as new () => T : chemical.constructor as new () => T;
        }
        if (isValidElement(given)) return this.classOf<T>(given.type as Component);
        return (given as object).constructor as new () => T;
    }

    chemical<T extends $Chemical>(given: Given<T>, parent?: $Chemical): T {
        const chemical = typeof given === 'function' ? $check(given as new () => T, '!')
            : isValidElement(given) ? $(given) as T
            : given as T;
        if (parent !== undefined && chemical.parent !== parent)
            chemical.parent = parent;
        return chemical;
    }


    name(given: Given<object>): string {
        return this.authored(this.classOf(given).name);
    }

    same(given: Given<object> | Given<object>[], other: Given<object> | Given<object>[]): boolean {
        if (given === other) return true;
        return Array.isArray(given) && Array.isArray(other) && given.length === other.length
            && given.every((each, index) => each === other[index]);
    }

    protected authored(name: string): string {
        return name.replace(/^_*\$?/u, '').replace(/\d+$/u, '');
    }
}

export const reflection = new Reflection();
