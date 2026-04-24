import type { $Promise } from './types';
import { $cancelled$ } from './symbols';

// ===========================================================================
// $promise — cancellable promise
// ===========================================================================

export function $promise<T = any>(executor: (resolve: (value?: T) => void) => void): $Promise<T> {
    let reject: ((reason?: any) => void) | undefined;
    let promise = new Promise<T>((res, rej) => {
        reject = rej;
        executor(res as any);
    }) as $Promise<T>;
    promise = promise
        .then(value => {
            promise.complete = true;
            promise.result = value;
            return value;
        }).catch(err => {
            promise.complete = true;
            if (err === $cancelled$) return undefined as T;
            throw err;
        }) as $Promise<T>;
    const then = promise.then.bind(promise);
    promise.complete = false;
    promise.cancel = (action?: () => any) => { reject?.($cancelled$); action?.(); };
    promise.then = (<U>(fulfilled?: (value: T) => U, rejected?: any) => {
        const next = $promise<U>(resolve => {
            then(
                value => {
                    if (!fulfilled) return resolve(value as any);
                    const result = fulfilled(value);
                    Promise.resolve(result).then(resolve);
                },
                err => {
                    if (err === $cancelled$) return reject?.(err);
                    if (rejected) return rejected(err);
                    throw err;
                }
            );
        });
        const cancel = next.cancel;
        next.cancel = (action?: () => any) => {
            cancel(action);
            promise.cancel(action);
        };
        return next;
    }) as any;
    return promise;
}

export function $await(future: Promise<void>): void;
export function $await<T>(future: Promise<T>): T | undefined;
export function $await(future: Promise<any>): any {
    return (future as $Promise<any>).result;
}
