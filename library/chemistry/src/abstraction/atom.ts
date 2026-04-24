import {
    $type$, $molecule$, $component$, $template$, $isTemplate$,
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
                this[$component$] = this.Component;
        }
        return (this as any)[$type$][$$template$$] as this;
    }
}
