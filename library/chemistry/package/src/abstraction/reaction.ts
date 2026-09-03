import { $cid$, $destroyed$, $phase$, $update$, $reaction$ } from "../implementation/symbols";
import type { $Particle } from "./particle";

// ===========================================================================
// $Reaction — chemical identity registry
// ===========================================================================

/**
 * $Reaction — the single semantic unit of reactivity for a chemical.
 *
 * Each chemical has exactly one $Reaction, created at construction, destroyed
 * when the chemical is destroyed. The reaction is the sole entry point for
 * requesting a re-render: `reaction.react()`.
 *
 * Everything that wants to cause a re-render calls `react()`:
 *   - View-augmented event handlers (wrapped by the framework).
 *   - The post-lifecycle view diff (when output changed).
 *   - Programmatic callers (tests, lifecycle continuations).
 *
 * react() is idempotent within a React batch tick — multiple calls collapse
 * into a single commit via React's automatic batching. No explicit dedup
 * machinery is needed.
 */
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

    /**
     * Request a re-render of the bound chemical. No-op during unmount phase
     * or if the chemical has been destroyed.
     */
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
