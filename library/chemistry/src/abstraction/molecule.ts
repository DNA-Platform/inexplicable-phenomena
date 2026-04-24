import { $template$, $molecule$, $isChemicalBase$ } from "../implementation/symbols";
import { $Bond, $Reflection } from "./bond";

// $Molecule — structural description of a chemical.
//
// Walks a chemical's prototype chain and derives the set of reactive bonds
// for it. The walk stops when it finds a prototype tagged with the
// $isChemicalBase$ sentinel — that's how we avoid importing $Chemical here
// (which would create a chemical ↔ molecule cycle).
export class $Molecule {
    get reactive() { return this._reactive; }
    private _reactive = false;
    get destroyed() { return this._destroyed; }
    private _destroyed = false;
    get chemical() { return this._chemical; }
    private _chemical: any;
    get bonds() { return this._bonds; }
    private _bonds: Map<string, $Bond> = new Map();
    private _inert = new Set<string>();

    constructor(chemical: any) {
        this._chemical = chemical;
    }

    destroy() {
        this._bonds.clear();
        this._destroyed = true;
    }

    reactivate(): void {
        this._reactivate(true);
    }

    protected _reactivate(refresh: boolean = false): void {
        if (this._destroyed) return;
        if (this._reactive && !refresh) return;
        const chemical = this._chemical;
        const template = chemical[$template$];
        const properties = new Map<string, PropertyDescriptor>();
        let templateBonds: $Bond[] = [];
        if (template !== chemical) {
            template[$molecule$]._reactivate(false);
            templateBonds = Array.from(template[$molecule$].bonds.values());
        } else if (!this.reactive) {
            this.collectProperties().forEach((d, p) => properties.set(p, d));
        }
        this.selectProperties(chemical).forEach((d, p) => properties.set(p, d));
        properties.forEach((descriptor, property) => {
            if (this._bonds.has(property)) return;
            if (this._inert.has(property)) return;
            if (property === 'view' || property === 'toString') return;
            const reflect = new $Reflection(chemical, property);
            if (!reflect.reactive) return this._inert.add(property);
            const bond = $Bond.create(chemical, property, descriptor);
            this._bonds.set(property, bond);
            bond.form();
        });
        for (const bond of templateBonds) {
            if (this._bonds.has(bond.property)) continue;
            this._bonds.set(bond.property, bond.double(chemical));
        }
        this._reactive = true;
    }

    private collectProperties(): Map<string, PropertyDescriptor> {
        const properties = new Map<string, PropertyDescriptor>();
        const prototypes: any[] = [];
        let prototype = Object.getPrototypeOf(this._chemical);
        while (prototype && !prototype[$isChemicalBase$]) {
            prototypes.unshift(prototype);
            prototype = Object.getPrototypeOf(prototype);
        }
        for (const proto of prototypes)
            this.selectProperties(proto).forEach((d, p) => properties.set(p, d));
        return properties;
    }

    private selectProperties(obj: any): Map<string, PropertyDescriptor> {
        const properties = new Map<string, PropertyDescriptor>();
        const descriptors = Object.getOwnPropertyDescriptors(obj);
        for (const property in descriptors)
            properties.set(property, descriptors[property]);
        return properties;
    }
}
