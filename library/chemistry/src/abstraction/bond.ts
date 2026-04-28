import {
    $cid$, $type$, $backing$, $rendering$, $reaction$, $phase$, $isChemicalBase$
} from "../implementation/symbols";
import { currentScope, withScope, diffuse } from "../implementation/scope";

// ===========================================================================
// $Reflection — property annotation system
// ===========================================================================

// Module-private decorator registries. Hidden from the public class surface
// so they can't be mutated externally.
const inertDecorators = new Map<any, Set<string>>();
const reactiveDecorators = new Map<any, Set<string>>();

function inertOf(chemical: any, property: string, general: boolean): boolean | undefined {
    if (!general) return true;
    if (chemical?.[$isChemicalBase$]) return undefined;
    const map = inertDecorators.get(chemical);
    return !map ?
        inertOf(Object.getPrototypeOf(chemical), property, general) :
        map.has(property);
}

function reactiveOf(chemical: any, property: string, general: boolean): boolean | undefined {
    if (general) return true;
    if (chemical?.[$isChemicalBase$]) return undefined;
    const map = reactiveDecorators.get(chemical);
    return !map ?
        reactiveOf(Object.getPrototypeOf(chemical), property, general) :
        map.has(property);
}

export class $Reflection {
    chemical: any;
    property: string;
    get reactive(): boolean {
        if ($Reflection.isSpecial(this.property)) return true;
        const general = $Reflection.isReactive(this.property);
        return general ?
            !inertOf(this.chemical, this.property, general) :
            !!reactiveOf(this.chemical, this.property, general);
    }
    constructor(chemical: any, property: string) {
        this.chemical = chemical;
        this.property = property;
    }
    static isReactive(property: string): boolean {
        if (property === "constructor") return false;
        if (property.startsWith('_')) return false;
        if (!property.startsWith("$")) return true;
        return this.isSpecial(property);
    }
    static isSpecial(property: string): boolean {
        // Minimum is two chars: `$` plus one identifier char. `>= 2` lets
        // single-letter user props like `$v`, `$x` be reactive — `> 2`
        // silently demoted them to inert.
        return property.length >= 2 &&
            property[0] === '$' &&
            property[1] !== "$" &&
            property[1] !== "_" &&
            property[1] === property[1].toLowerCase();
    }
}

export function inert() {
    return function (prototype: any, property: string) {
        let properties = inertDecorators.get(prototype);
        if (!properties) inertDecorators.set(prototype, properties = new Set());
        properties.add(property);
    };
}

export function reactive() {
    return function (prototype: any, property: string) {
        let properties = reactiveDecorators.get(prototype);
        if (!properties) reactiveDecorators.set(prototype, properties = new Set());
        properties.add(property);
    };
}

// ===========================================================================
// $Bond — structural metadata for a property
// ===========================================================================

export class $Bond<T = any, P = any> {
    get formed() { return this._formed; }
    protected _formed = false;
    get getter() { return this._getter; }
    protected _getter?: () => any;
    get setter() { return this._setter; }
    protected _setter?: (value: any) => void;
    get chemical() { return this._chemical; }
    protected _chemical: any;
    get property() { return this._property; }
    protected _property: string;
    get descriptor() { return this._descriptor; }
    protected _descriptor: PropertyDescriptor;
    protected _id?: string;
    get id() {
        if (!this._id)
            this._id = `${this._chemical[$type$]?.name}[${this._chemical[$cid$]}].${this._property}`;
        return this._id;
    }
    get isMethod() { return this._isMethod; }
    protected _isMethod = false;
    get isField() { return !this.isProperty && !this.isMethod; }
    get isProperty() { return this.getter !== undefined || this.setter !== undefined; }
    get isReadable() { return this.isField || this.getter !== undefined; }
    get isWritable() { return this.isField || this.setter !== undefined; }

    protected constructor(chemical: any, property: string, descriptor: PropertyDescriptor) {
        this._property = property;
        this._chemical = chemical;
        this._descriptor = descriptor;
    }

    form() {
        if (this.formed) return;
        this._formed = true;
        this._getter = this._descriptor.get;
        this._setter = this._descriptor.set;
        // For plain fields (no user getter/setter, not a method), activate the
        // property — install a get/set accessor that participates in scope
        // tracking. An inert field becomes a reactive one.
        if (!this._getter && !this._setter && !$Bond.isMethod(this._descriptor)) {
            activate(this._chemical, this._property, this._descriptor.value);
        }
    }

    double(chemical: any): $Bond {
        const bond = Object.create(this) as $Bond;
        bond._chemical = chemical;
        bond._id = undefined;
        return bond;
    }

    static isMethod(descriptor: PropertyDescriptor) {
        return typeof descriptor.value === 'function';
    }

    static create(chemical: any, property: string, descriptor: PropertyDescriptor): $Bond {
        return $Bond.isMethod(descriptor) ?
            new $Reagent(chemical, property, descriptor) :
            new $Bond(chemical, property, descriptor);
    }
}

function backing(chemical: any): any {
    if (!Object.prototype.hasOwnProperty.call(chemical, $backing$)) {
        const parent = Object.getPrototypeOf(chemical)?.[$backing$] ?? null;
        Object.defineProperty(chemical, $backing$, {
            value: Object.create(parent),
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }
    return chemical[$backing$];
}

function activate(chemical: any, property: string, initial: any) {
    const store = backing(chemical);
    store[property] = initial;
    Object.defineProperty(chemical, property, {
        get() {
            const value = this[$backing$]?.[property];
            const scope = currentScope();
            if (scope) scope.recordRead(this, property, value);
            return value;
        },
        set(value) {
            const store = backing(this);
            store[property] = value;
            if (this[$rendering$]) return;
            const scope = currentScope();
            if (scope) {
                scope.recordWrite(this, property);
            } else {
                this[$reaction$]?.react();
                diffuse(this);
            }
        },
        enumerable: true,
        configurable: true,
    });
}


// $Reagent — a reactive method. A reagent participates in / drives a reaction;
// calling it runs user code in a scope, and any state changes it makes cause
// bonds to be reformed (which is what a reaction does to a chemical).
export class $Reagent extends $Bond {
    get action() { return this._action; }
    protected _action?: Function;

    constructor(chemical: any, method: string, descriptor: PropertyDescriptor) {
        super(chemical, method, descriptor);
        this._isMethod = true;
    }

    form() {
        if (this.formed) return;
        this._formed = true;
        this._action = this._descriptor.value;
        const action = this._action!;
        this._chemical[this._property] = function (this: any, ...args: any[]) {
            // Inside render or setup, methods run without a scope — those
            // contexts are already handled by the render pipeline.
            if (this[$rendering$] || this[$phase$] === 'setup') {
                return action.apply(this, args);
            }
            let result: any;
            withScope(() => { result = action.apply(this, args); });
            // For async methods, attach a continuation scope so post-await
            // mutations are caught too.
            if (result instanceof Promise) {
                result.then(
                    () => withScope(() => {}),
                    () => withScope(() => {})
                );
            }
            return result;
        };
    }
}

