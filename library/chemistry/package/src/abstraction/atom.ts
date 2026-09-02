import {
    $type$, $molecule$, $component$, $resolveComponent$, $template$, $isTemplate$,
    $formed$,
    $$template$$
} from "../implementation/symbols";
import { hydration } from "../implementation/hydration";
import { $Chemical } from "./chemical";

// $Atom — the singleton chemical: every construction answers the class's one
// template, and it is atomic — keyless, the class its aid — so using an atom
// means it simply appears with what the hydration cache remembers. Derived
// field initializers re-run on the template at every construction (the
// return-override makes the template `this` in derived constructors), so the
// overwrite lands again a microtask later.
export class $Atom extends $Chemical {
    constructor() {
        super();
        if (this[$isTemplate$]) {
            this[$molecule$].reactivate();
            if (!this[$component$])
                this[$component$] = this[$resolveComponent$]();
        }
        const target = ((this as any)[$type$][$$template$$] ?? this) as this;
        if (!(target as any)[$formed$]) {
            (target as any)[$formed$] = true;
            target.$aid ??= (target as any)[$type$].name;
            (target as any)._atomic = true;
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
