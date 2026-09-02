import { $cid$, $destroyed$, $phase$, $update$, $reaction$ } from "../implementation/symbols";
import type { $Particle } from "./particle";

export class $Reaction {
    private _reactions = new Map<number, $Reaction>();
    get chemical() { return this._chemical; }
    private _chemical: $Particle;
    get system() { return this._system; }
    private _system: $Reaction;

    constructor(chemical: $Particle, system?: $Reaction) {
        this._chemical = chemical;
        this._system = system || this;
        this._system._reactions.set(chemical[$cid$], this);
        $Reaction._chemicals.set(chemical[$cid$], chemical);
    }

    react(): void {
        const chemical = this._chemical;
        if (!chemical) return;
        if (chemical[$destroyed$]) return;
        if (chemical[$phase$] === 'unmount') return;
        const update = chemical[$update$];
        if (update) update();
    }

    add(chemical: $Particle) {
        chemical[$reaction$] = new $Reaction(chemical, this._system);
        this.system._reactions.set(chemical[$cid$], this);
    }

    destroy() {
        this._reactions?.clear();
        $Reaction._chemicals.delete(this._chemical?.[$cid$]);
        this._chemical = undefined as any;
    }

    private static _chemicals = new Map<number, $Particle>();

    static find(cid: number): $Particle | undefined {
        return this._chemicals.get(cid);
    }
}
