// Private marker for wrapped event handlers.
//
// augment.ts wraps user-supplied event handlers (onClick, etc.) and tags each
// wrapper with a reference to the original via this symbol. reconcile.ts reads
// the tag so that two wrappers of the same original compare equal — JSX
// reconstructs closures every render, but they're semantically identical when
// they came from the same source function.
//
// Kept in its own module so that augment (writer) and reconcile (reader) can
// share the convention without importing each other. That would introduce a
// cycle: reconcile → augment → scope → reconcile.

const __original = Symbol('$Chemistry.handlerOriginal');

export function markOriginal(wrapper: Function, original: Function): void {
    (wrapper as any)[__original] = original;
}

export function originalHandler(fn: Function): Function {
    return (fn as any)[__original] || fn;
}
