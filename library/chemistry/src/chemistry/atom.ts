import {
    $type$, $molecule$, $component$, $template$, $isTemplate$,
    $formed$, $formation$, $remembered$,
    $$template$$
} from "../symbols";
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

    static particle<T extends $Atom = $Atom>(): T {
        try {
            if (!this[$$template$$]) new (this as any)();
        } catch (error) {
            console.error(error);
        }
        return this[$$template$$] as any;
    }
}

export class $Persistent extends $Atom {
    [$formed$] = false;
    [$formation$]!: Promise<void>;
    get formed() { return this[$formed$]; }

    [$remembered$] = false;
    get remembered() { return this[$remembered$]; }

    async formation() {
        if (!this[$formed$])
            await this[$formation$];
    }

    constructor() {
        super();
        if (this[$isTemplate$]) {
            if (!this[$component$])
                this[$component$] = this.Component;
            this[$formation$] = this.reform().then(async (remembered) => {
                this[$formed$] = remembered;
                this[$remembered$] = remembered;
                if (!this[$formed$]) {
                    await this.form();
                    await this.reflect();
                    this[$molecule$].reactivate();
                    this[$formed$] = true;
                }
            });
        }
        return (this as any)[$type$][$$template$$] as this;
    }

    protected async form() { }

    protected async reform(): Promise<boolean> { return false; }
    protected async reflect(): Promise<void> { }

    static particle<T extends $Atom = $Atom>(): T {
        if (!this[$$template$$]) new (this as any)();
        return this[$$template$$] as any;
    }
}

export const Atom = new $Atom().Component;
