import {
    $type$, $molecule$, $component$, $resolveComponent$, $template$, $isTemplate$,
    $formed$, $reinit$, $direct$,
    $$template$$
} from "../implementation/symbols";
import { hydration } from "../implementation/hydration";
import { templating } from "../implementation/template";
import { $Chemical } from "./chemical";

// $Atom — the singleton chemical: every construction answers the class's one
// template, and it persists — keyless, the class its aid — so using an atom
// means it simply appears with what the hydration cache remembers. Derived
// field initializers re-run on the template at every construction (the
// return-override makes the template `this` in derived constructors), so the
// overwrite lands again a microtask later.
export class $Atom extends $Chemical {
    constructor() {
        super();
        const cls = (this as any)[$type$];
        // THE SINGLETON IS THE CLASS'S TEMPLATE, MADE BY THE FRAMEWORK: an author's
        // construction asks for it, making it under the framework's flag when none
        // stands yet — and it MOUNTS ITSELF, the one instance and never a derivative
        // of it, since a singleton has no per-mount state by definition.
        if (this[$isTemplate$]) {
            (this as any)[$direct$] = true;
            this[$molecule$].reactivate();
            if (!this[$component$])
                this[$component$] = this[$resolveComponent$]();
        }
        let made = false;
        if (!this[$isTemplate$] && (!Object.prototype.hasOwnProperty.call(cls, $$template$$) || !(cls[$$template$$] instanceof cls))) {
            templating(cls, () => new cls());
            made = true;
        }
        const target = (cls[$$template$$] ?? this) as this;
        // A CONSTRUCTION THAT MADE THE TEMPLATE IS THE FIRST, not a re-construction:
        // the re-init guard is for the derived initializers of a LATER construction,
        // which must not clobber what was recalled.
        if (!made && (target as any)[$formed$]) {
            (target as any)[$molecule$].reactivate();
            (target as any)[$reinit$] = true;
        }
        if (!(target as any)[$formed$]) {
            (target as any)[$formed$] = true;
            target.$pid ??= (target as any)[$type$].name;
            (target as any)._persist = true;
            hydration.overwrite(target);
            queueMicrotask(() => {
                (target as any)[$molecule$].reactivate();
                hydration.overwrite(target);
                hydration.changed(target);
            });
        }
        return target;
    }
}
