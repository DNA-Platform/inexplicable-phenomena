import {
    $type$, $molecule$, $component$, $resolveComponent$, $template$, $isTemplate$,
    $formed$, $formation$, $remembered$,
    $$template$$
} from "../implementation/symbols";
import { $Chemical } from "./chemical";

export class $Atom extends $Chemical {
    constructor() {
        super();
        if (this[$isTemplate$]) {
            this[$molecule$].reactivate();
            if (!this[$component$])
                this[$component$] = this[$resolveComponent$]();
        }
        return (this as any)[$type$][$$template$$] as this;
    }
}
