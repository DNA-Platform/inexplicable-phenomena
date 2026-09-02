import {
    $type$, $molecule$, $component$, $resolveComponent$, $template$, $isTemplate$,
    $formed$, $reinit$,
    $$template$$
} from "../implementation/symbols";
import { hydration } from "../implementation/hydration";
import { $Chemical } from "./chemical";

export class $Atom extends $Chemical {
    constructor() {
        super();
        if (this[$isTemplate$]) {
            this[$molecule$].reactivate();
            if (!this[$component$])
                this[$component$] = this[$resolveComponent$]();
        }
        const target = ((this as any)[$type$][$$template$$] ?? this) as this;
        if ((target as any)[$formed$]) {
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
