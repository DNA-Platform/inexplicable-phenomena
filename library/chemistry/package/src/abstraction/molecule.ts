import { $template$, $molecule$, $isChemicalBase$, looks } from "../implementation/symbols";
import { $Bond, $Reflection } from "./bond";

const universalProperties = ['$show', '$hide', '$look'];

const framework = new Set(['toString', '$form', '$new', '$on']);

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
        if (template !== chemical) {
            template[$molecule$]._reactivate(false);
            this.formBonds(this.selectProperties(chemical));
            this.inheritBonds(template[$molecule$].bonds);
        } else {
            const properties = new Map<string, PropertyDescriptor>();
            if (!this.reactive)
                this.collectProperties().forEach((d, p) => properties.set(p, d));
            this.selectProperties(chemical).forEach((d, p) => properties.set(p, d));
            this.formBonds(properties);
        }
        for (const prop of universalProperties) {
            if (this._bonds.has(prop) || this._inert.has(prop)) continue;
            const bond = $Bond.create(chemical, prop, {
                value: chemical[prop], writable: true, enumerable: true, configurable: true
            });
            this._bonds.set(prop, bond);
            bond.form();
        }
        this._reactive = true;
    }

    private formBonds(properties: Map<string, PropertyDescriptor>): void {
        const chemical = this._chemical;
        properties.forEach((descriptor, property) => {
            if (this._bonds.has(property)) return;
            if (this._inert.has(property)) return;
            if (looks.test(property) || framework.has(property)) return;
            const reflect = new $Reflection(chemical, property);
            if (!reflect.reactive) return this._inert.add(property);
            const bond = $Bond.create(chemical, property, descriptor);
            this._bonds.set(property, bond);
            bond.form();
        });
    }

    private inheritBonds(templateBonds: Map<string, $Bond>): void {
        const chemical = this._chemical;
        for (const bond of templateBonds.values()) {
            if (this._bonds.has(bond.property)) continue;
            this._bonds.set(bond.property, bond.double(chemical));
        }
    }

    private collectProperties(): Map<string, PropertyDescriptor> {
        const properties = new Map<string, PropertyDescriptor>();
        const prototypes: any[] = [];
        let prototype = Object.getPrototypeOf(this._chemical);
        while (prototype && !Object.hasOwn(prototype, $isChemicalBase$)) {
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
