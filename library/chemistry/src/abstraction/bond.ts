import {
    $cid$, $type$, $backing$, $rendering$, $reaction$, $phase$, $isChemicalBase$,
    $derivatives$
} from "../implementation/symbols";
import { currentScope, withScope } from "../implementation/scope";

// ===========================================================================
// $Reflection — property annotation system
// ===========================================================================

export class $Reflection {
    chemical: any;
    property: string;
    get reactive(): boolean {
        if ($Reflection.isSpecial(this.property)) return true;
        const reactiveGenerally = $Reflection.isReactive(this.property);
        return reactiveGenerally ?
            !$Reflection.inertSpecifically(this.chemical, this.property, reactiveGenerally) :
            !!$Reflection.reactiveSpecifically(this.chemical, this.property, reactiveGenerally);
    }
    constructor(chemical: any, property: string) {
        this.chemical = chemical;
        this.property = property;
    }
    static inertDecorators: Map<any, Set<string>> = new Map();
    static reactiveDecorators: Map<any, Set<string>> = new Map();
    static inertSpecifically(chemical: any, property: string, reactiveGenerally: boolean): boolean | undefined {
        if (!reactiveGenerally) return true;
        if (chemical?.[$isChemicalBase$]) return undefined;
        const map = this.inertDecorators.get(chemical);
        return !map ?
            this.inertSpecifically(Object.getPrototypeOf(chemical), property, reactiveGenerally) :
            map.has(property);
    }
    static reactiveSpecifically(chemical: any, property: string, reactiveGenerally: boolean): boolean | undefined {
        if (reactiveGenerally) return true;
        if (chemical?.[$isChemicalBase$]) return undefined;
        const map = this.reactiveDecorators.get(chemical);
        return !map ?
            this.reactiveSpecifically(Object.getPrototypeOf(chemical), property, reactiveGenerally) :
            map.has(property);
    }
    static isReactive(property: string): boolean {
        if (property === "constructor") return false;
        if (property.startsWith('_')) return false;
        if (!property.startsWith("$")) return true;
        return this.isSpecial(property);
    }
    static isSpecial(property: string): boolean {
        return property.length > 2 &&
            property[0] === '$' &&
            property[1] !== "$" &&
            property[1] !== "_" &&
            property[1] === property[1].toLowerCase();
    }
}

export function inert() {
    return function (prototype: any, property: string) {
        let properties = $Reflection.inertDecorators.get(prototype)!;
        if (!properties) {
            properties = new Set();
            $Reflection.inertDecorators.set(prototype, properties);
        }
        properties.add(property);
    };
}

export function reactive() {
    return function (prototype: any, property: string) {
        let properties = $Reflection.reactiveDecorators.get(prototype)!;
        if (!properties) {
            properties = new Set();
            $Reflection.reactiveDecorators.set(prototype, properties);
        }
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
    protected _bid?: string;
    get bid() {
        if (!this._bid)
            this._bid = `${this._chemical[$type$]?.name}[${this._chemical[$cid$]}].${this._property}`;
        return this._bid;
    }
    get isProp() { return this._isProp; }
    protected _isProp: boolean;
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
        this._isProp = $Reflection.isSpecial(property);
    }

    form() {
        if (this.formed) return;
        this._formed = true;
        this._getter = this._descriptor.get;
        this._setter = this._descriptor.set;
        // For plain fields (no user getter/setter, not a method), install an
        // accessor that tracks reads/writes with the current scope.
        if (!this._getter && !this._setter && !$Bond.isMethod(this._descriptor)) {
            installReactiveAccessor(this._chemical, this._property, this._descriptor.value);
        }
    }

    double(chemical: any): $Bond {
        const bond = Object.create(this) as $Bond;
        bond._chemical = chemical;
        bond._bid = undefined;
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

function ensureBacking(chemical: any): any {
    if (!Object.prototype.hasOwnProperty.call(chemical, $backing$)) {
        const parentBacking = Object.getPrototypeOf(chemical)?.[$backing$] ?? null;
        Object.defineProperty(chemical, $backing$, {
            value: Object.create(parentBacking),
            writable: false,
            enumerable: false,
            configurable: false,
        });
    }
    return chemical[$backing$];
}

function installReactiveAccessor(target: any, prop: string, initialValue: any) {
    const backing = ensureBacking(target);
    backing[prop] = initialValue;
    Object.defineProperty(target, prop, {
        get() {
            const value = this[$backing$]?.[prop];
            const scope = currentScope();
            if (scope) scope.recordRead(this, prop, value);
            return value;
        },
        set(value) {
            const backing = ensureBacking(this);
            backing[prop] = value;
            if (this[$rendering$]) return;
            const scope = currentScope();
            if (scope) {
                scope.recordWrite(this, prop);
            } else {
                this[$reaction$]?.react();
                fanOutToDerivatives(this);
            }
        },
        enumerable: true,
        configurable: true,
    });
}

// fanOutToDerivatives — when a bond is written, wake every derivative of this
// instance unconditionally. Shadowing is dynamic; React's reconciler short-
// circuits redundant renders, so we don't gate fan-out on shadow checks.
function fanOutToDerivatives(parent: any) {
    const derivatives: Set<any> | undefined = parent[$derivatives$];
    if (!derivatives) return;
    for (const d of derivatives) d[$reaction$]?.react();
}

// $Reagent — a reactive method. A reagent participates in / drives a reaction;
// calling it runs user code in a scope, and any state changes it makes cause
// bonds to be reformed (which is what a reaction does to a chemical).
export class $Reagent extends $Bond {
    get action() { return this._action; }
    protected _action?: Function;

    constructor(chemical: any, method: string, descriptor: PropertyDescriptor) {
        super(chemical, method, descriptor);
        this._isProp = false;
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

