// THE TEMPLATE IS THE FRAMEWORK'S. A class's template is the one instance the
// framework constructs for it — under this flag, for exactly that class — and an
// instance an author constructs is never one, whichever came first. Doug: "No
// first instance for the template! That means using the template isn't
// idempotent." Chemicals are not made with `new` by an author anyway; the bond
// constructor is for that, and `$(Constructor)` is the idiom.
let $templating: any = null;

export function templatingFor(): any {
    return $templating;
}

export function templating<T>(cls: any, make: () => T): T {
    const was = $templating;
    $templating = cls;
    try { return make(); } finally { $templating = was; }
}
