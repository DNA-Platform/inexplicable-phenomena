import { ReactNode } from "react";

// ===========================================================================
// Perspective — a lens popped off a chemical subclass, bound to a live instance.
//
// A perspective is a subclass of the chemical that overrides `view`. `reveal`
// pops that subclass's `view` off and holds it. When you read an instance's
// `perspectives`, the instance clones the lenses and stores ITSELF on each
// (`instance`), so a perspective is "this object, seen this way" — `render()`
// runs its view bound to that instance. The views are therefore bound; the
// thing rendering a perspective never has to hand it the object.
//
// `name` labels it for a menu; `default` marks the one a menu starts on.
// `T` is the chemical class being made perspectival.
// ===========================================================================

export class Perspective<T = any> {
    name: string;
    default: boolean;
    view?: (this: T) => ReactNode;   // popped off the subclass by reveal
    instance?: T;                     // the live instance this lens is bound to, set by get perspectives

    constructor(name: string = "", isDefault: boolean = false) {
        this.name = name;
        this.default = isDefault;
    }

    // Render this lens's view, bound to its instance — so it draws that object's
    // own live data the way this lens sees it.
    render(): ReactNode {
        return this.view && this.instance ? this.view.call(this.instance) : null;
    }
}
