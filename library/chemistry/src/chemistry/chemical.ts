import React, { ReactNode, useState, useEffect, useLayoutEffect } from "react";
import {
    $cid$, $symbol$, $type$, $molecule$, $reaction$, $template$, $isTemplate$, $derived$,
    $isBound$, $$parent$$, $parent$, $orchestrator$, $component$, $children$,
    $props$, $lastProps$, $apply$, $bond$, $createComponent$,
    $destroy$, $destroyed$, $remove$, $catalyst$, $isCatalyst$, $backing$,
    $$template$$, $$getNextCid$$, $$createSymbol$$, $$parseCid$$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$
} from "../symbols";
import { $symbolize } from "./helpers";
import type { $Component, $$Component, $Props, $ParameterType } from "../types";
import { $Particle, $phaseOrder, $lift } from "./particle";
import { diff } from "./reconcile";
import { augment } from "./augment";
import { Scope, currentScope, withScope } from "./scope";

// Re-export scope machinery for consumers that import from chemical.ts.
export { Scope, withScope } from "./scope";

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
        if (chemical === $Chemical.prototype) return undefined;
        const map = this.inertDecorators.get(chemical);
        return !map ?
            this.inertSpecifically(Object.getPrototypeOf(chemical), property, reactiveGenerally) :
            map.has(property);
    }
    static reactiveSpecifically(chemical: any, property: string, reactiveGenerally: boolean): boolean | undefined {
        if (reactiveGenerally) return true;
        if (chemical === $Chemical.prototype) return undefined;
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
            new $Bonding(chemical, property, descriptor) :
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
            }
        },
        enumerable: true,
        configurable: true,
    });
}

// $Bonding — method wrapper that triggers re-render
export class $Bonding extends $Bond {
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

// $Parent — parent property bond
export class $Parent extends $Bond {
    constructor(chemical: any, property: string, descriptor: PropertyDescriptor) {
        super(chemical, property, descriptor);
    }

    form(): void {
        this._formed = true;
        this._isProp = false;
    }
}

// ===========================================================================
// $Molecule — structural description of a chemical
// ===========================================================================

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
        while (prototype && prototype !== $Chemical.prototype) {
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
    private _chemical: $Chemical;
    get system() { return this._system; }
    private _system: $Reaction;

    constructor(chemical: $Chemical, system?: $Reaction) {
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

    add(chemical: $Chemical) {
        chemical[$reaction$] = new $Reaction(chemical, this._system);
        this.system._reactions.set(chemical[$cid$], this);
    }

    destroy() {
        this._reactions?.clear();
        $Reaction._chemicals.delete(this._chemical?.[$cid$]);
        this._chemical = undefined as any;
    }

    private static _chemicals = new Map<number, $Chemical>();

    static find(cid: number): $Chemical | undefined {
        return this._chemicals.get(cid);
    }
}

// ===========================================================================
// Bond orchestration
// ===========================================================================

export interface $BondParameter {
    isArray: boolean;
    isSpread: boolean;
}

export class $BondArguments {
    values: any[] = [];
    parameters: $BondParameter[] = [];
    parameterIndex = -1;

    constructor(parameters: $BondParameter[]) {
        this.parameters = parameters;
    }
}

export class $BondOrchestrationContext {
    private parameters: $BondParameter[];
    private parameterIndex = -1;
    arguments: $BondArguments;
    args: any[] = [];
    chemical: $Chemical;
    node: any = undefined;
    children: ReactNode[] = [];
    childContexts: $BondOrchestrationContext[] = [];
    singleton: boolean = false;
    parameter?: $BondParameter;
    argsValid?: boolean = true;
    parent: $BondOrchestrationContext = this;
    get isElement() { return React.isValidElement(this.node); }

    private _isModified = false;
    get isModified() { return this._isModified; }
    set isModified(value: boolean) {
        this._isModified = value;
        if (value) this.parent?.isModified;
    }

    constructor(chemical: $Chemical, parameters: $BondParameter[] = []) {
        this.chemical = chemical;
        this.parameters = parameters;
        this.arguments = new $BondArguments(parameters || []);
        this.args = this.arguments.values;
    }

    next(node: any) {
        const context = this.clone();
        context.node = node;

        if (!context.parameter && context.parameterIndex == -1) {
            if (context.parameters && context.parameters.length > 0) {
                context.parameterIndex = 0;
                context.parameter = context.parameters[context.parameterIndex];
            } else {
                context.argsValid = false;
            }
        } else if (context.parameter && context.parameter.isSpread) {
            context.args = context.arguments.values;
        } else if (context.parameter && !context.parameter.isSpread) {
            context.parameterIndex++;
            if (context.parameters && context.parameterIndex < context.parameters.length) {
                context.parameter = context.parameters[context.parameterIndex];
                if (context.parameter && context.parameter.isSpread) {
                    context.args = context.arguments.values;
                }
            } else {
                context.parameter = undefined;
                context.argsValid = false;
            }
        }
        return context;
    }

    array() {
        const context = this.clone();
        context.parent = this;
        context.args = [];
        context.parameters = [];
        context.parameterIndex = -1;
        context.parameter = { isArray: true, isSpread: false };
        this.args.push(context.args);

        context.children = [];
        this.children.push(context.children);
        return context;
    }

    child(chemical: $Chemical, props: any): any {
        if ((chemical as any)[$lastProps$] === props) return props;
        props = (chemical as any)[$orchestrator$].bond(props, this);
        (chemical as any)[$lastProps$] = props;
        return props;
    }

    build(): any {
        if (!this.isModified) return undefined;
        return this.singleton && this.children.length === 1
            ? this.children[0]
            : this.children;
    }

    private clone(): this {
        const context = Object.create(Object.getPrototypeOf(this));
        Object.assign(context, this);
        context.parent = this;
        return context;
    }
}

const $htmlInstances = new Map<string, $Html$>();

export class $BondOrchestrator<T extends $Chemical = $Chemical> {
    private _chemical: T;
    private _bondConstructor?: Function;
    private _parameters: { isArray: boolean; isSpread: boolean }[] = [];

    get viewSymbol() { return `$${(this._chemical as any)[$symbol$]}`; }

    isViewSymbol(symbol: string): boolean {
        return symbol.startsWith('$$Chemistry.');
    }

    constructor(chemical: T) {
        this._chemical = chemical;
        const name = (chemical as any)[$type$].name;
        this._bondConstructor = (chemical as any)[name];
        this.parseBondConstructor();
    }

    bond(props: any, parentContext?: $BondOrchestrationContext): any {
        const chemical = this._chemical as any;
        let children: ReactNode = props.children;
        const context = new $BondOrchestrationContext(chemical, this._parameters);
        parentContext?.childContexts.push(context);

        for (const prop in props) {
            if (prop === 'children' || prop === 'key' || prop === 'ref') continue;
            chemical['$' + prop] = props[prop];
        }

        this.process(children, context);
        if (context.isModified) {
            children = context.build();
            props = { ...props, children: children || [] };
        }

        (chemical as any)[$children$] = props.children;

        if (this._bondConstructor && context.argsValid && context.arguments.values.length > 0) {
            $paramValidation.reset();
            $paramValidation.chemical = this._chemical;
            $paramValidation.count = this._parameters.length;
            this._bondConstructor!.apply(this._chemical, context.arguments.values);
            $paramValidation.evaluate();
        }

        return props;
    }

    private parseBondConstructor() {
        if (!this._bondConstructor) return;

        const match = this._bondConstructor.toString().match(/\(([^)]*)\)/);
        if (!match) throw new Error(`Cannot parse constructor for ${(this._chemical as any)[$type$].name}`);

        const paramString = match[1].trim();
        if (!paramString) return;

        this._parameters = paramString.split(',')
            .map(p => p.trim())
            .map(p => ({
                isSpread: p.startsWith('...'),
                isArray: false
            }));
    }

    private process(children: ReactNode, context: $BondOrchestrationContext) {
        const childArray = React.Children.toArray(children);
        context.singleton = !Array.isArray(children) && childArray.length === 1;
        const parent = this._chemical;
        let ctx = context;
        for (const child of childArray) {
            ctx = ctx.next(child);
            if (!React.isValidElement(child)) {
                if (typeof child === 'string') { ctx = ctx.parent; continue; }
                ctx.args.push(child);
                ctx.children.push(child);
                continue;
            }
            const element = child as React.ReactElement<any>;
            const type = element.type as any;
            const key = element.key?.toString() || '';
            if (this.isViewSymbol(key)) {
                const cid = $Particle[$$parseCid$$](key.slice(1))!;
                const chemical = $Reaction.find(cid)!;
                ctx.args.push(chemical);
                ctx.children.push(element);
            } else if (type === $Include || (type as any)?.$chemical instanceof $Include) {
                ctx.isModified = true;
                const arrayContext = ctx.array();
                this.processArray(React.Children.toArray(element.props?.children || []), arrayContext);
            } else if (type === $Exclude || (type as any)?.$chemical instanceof $Exclude) {
                ctx.args.push(undefined);
            } else if (typeof type === 'function') {
                let component: $$Component = type as any;
                if (!(component as any).$bind) component = $wrap(type as React.FC).$Component;
                if ((component as any).$chemical?.[$parent$] !== parent) component = (component as any).$bind(parent);
                const chemical = (component as any).$chemical;
                const props = ctx.child(chemical, element.props);
                ctx.args.push(chemical);
                if (props !== element.props || `${chemical[$cid$]}` !== element.key) {
                    ctx.children.push({ type: component, props, key: chemical[$symbol$] } as any);
                    ctx.isModified = true;
                }
            } else if (Array.isArray(child)) {
                const arrayContext = ctx.array();
                this.processArray(child as any, arrayContext);
            } else if (typeof type === 'string') {
                let html$Instance = $htmlInstances.get(type);
                if (!html$Instance) {
                    html$Instance = new $Html$(type as any);
                    $htmlInstances.set(type, html$Instance);
                }
                const $type = (html$Instance.Component as any).$bind(parent);
                const chemical = $type.$chemical;
                const props = ctx.child(chemical, element.props);
                ctx.isModified = true;
                ctx.args.push(chemical);
                ctx.children.push({ type: $type, props, key: chemical[$symbol$] } as any);
            } else {
                ctx.args.push(element.props);
                ctx.children.push(element);
            }
        }
    }

    private processArray(elements: any[], context: $BondOrchestrationContext) {
        for (const item of elements) {
            context.isModified = true;
            context = context.next(item);
            if (React.isValidElement(item)) {
                this.process([item], context);
            } else if (Array.isArray(item)) {
                const arrayContext = context.array();
                this.processArray(item, arrayContext);
            } else {
                context.args.push(item);
                context.children.push(item);
            }
        }
    }
}

// ===========================================================================
// $ParamValidation — runtime parameter type checking
// ===========================================================================

export class $ParamValidation {
    index = 0;
    count = -1;
    types: string[] = [];
    errors: string[] = [];
    chemical: $Chemical | null = null;
    validated = false;

    check<T>(arg: T, ...types: $ParameterType[]): T {
        const paramNumber = this.index++;
        const typeDescription = types.map(type => {
            if (Array.isArray(type))
                return `${$ParamValidation.describeType(type[0])}[]`;
            return $ParamValidation.describeType(type);
        }).join(' | ');

        this.types[paramNumber] = typeDescription;
        let valid = false;

        for (const type of types) {
            if ($ParamValidation.validateArgument(arg, type)) {
                valid = true;
                break;
            }
        }

        if (!valid) {
            this.errors.push(
                `Parameter ${paramNumber + 1}: expected ${typeDescription}, received ${$ParamValidation.describeActual(arg)}`
            );
        }

        if (this.count == this.index + 1)
            this.evaluate();

        return arg;
    }

    evaluate() {
        if (this.validated) return;
        if (this.errors.length === 0) {
            this.validated = true;
            return;
        }

        const className = this.chemical ? this.chemical.constructor.name : 'Unknown';
        let message = `\n$Chemistry Constructor Validation Failed: ${className}\n\n`;
        message += `Expected signature:\n`;
        message += `  ${className}(\n`;
        this.types.forEach((type, i) => {
            message += `    ${type}${i < this.types.length - 1 ? ',' : ''}\n`;
        });
        message += `  )\n\n`;
        message += this.errors.join('\n');

        this.validated = true;
        throw new Error(message);
    }

    reset() {
        this.index = 0;
        this.count = -1;
        this.types = [];
        this.errors = [];
        this.chemical = null;
        this.validated = false;
    }

    static describeType(type: any): string {
        if (Array.isArray(type)) {
            return `${$ParamValidation.describeType(type[0])}[]`;
        }
        if (type === 'any') return 'any';
        if (type === undefined) return 'undefined';
        if (type === null) return 'null';
        if (type === String) return 'string';
        if (type === Number) return 'number';
        if (type === Boolean) return 'boolean';
        if (type === Function) return 'function';
        if (type === Object) return 'object';

        if (typeof type === 'string') {
            if ($ParamValidation.isPrimitiveType(type)) {
                return type;
            } else {
                return `$${type}'`;
            }
        }

        if (type?.prototype instanceof $Html$) return "$Html";
        if (type?.prototype instanceof $Function$) return "$Function";
        if (type?.prototype && typeof type.prototype.view === 'function') return type.name;
        if (typeof type === 'function') return type.name;
        return 'unknown';
    }

    static describeActual(arg: any, depth: number = 0): string {
        if (arg === null) return 'null';
        if (arg === undefined) return 'undefined';

        if (Array.isArray(arg)) {
            if (arg.length === 0) return '[]';
            if (depth > 2) return `array(${arg.length})`;

            const maxSample = 3;
            const samples = arg.slice(0, maxSample).map(el => {
                return $ParamValidation.describeActual(el, depth + 1);
            });

            const allSame = samples.every(s => s === samples[0]);

            if (allSame && arg.length <= maxSample) {
                return `${samples[0]}[${arg.length}]`;
            } else if (allSame && arg.length > maxSample) {
                return `${samples[0]}[${arg.length}]`;
            } else {
                const preview = samples.join(', ');
                if (arg.length > maxSample) {
                    return `[${preview}, ...](${arg.length} total)`;
                } else {
                    return `[${preview}]`;
                }
            }
        }

        if (arg instanceof $Html$) return `$${arg.type}`;
        if (arg instanceof $Function$) return `${(arg as any).__$Function?.name || '[Function]'}>`;
        if (arg && typeof arg.view === 'function' && $symbol$ in arg) return arg.constructor.name;
        if (React.isValidElement(arg)) {
            const elementType = arg.type;
            if (typeof elementType === 'string') return `<${elementType}>`;
            if (typeof elementType === 'function') return `<${elementType.name || 'Component'}>`;
            return 'ReactElement';
        }

        if (typeof arg === 'object') {
            const constructor = arg?.constructor?.name;
            if (constructor && constructor !== 'Object') {
                return `${constructor}`;
            }
            return 'object';
        }

        if (typeof arg === 'string' && depth > 0) return 'string';
        if (typeof arg === 'number' && depth > 0) return 'number';
        if (typeof arg === 'boolean' && depth > 0) return 'boolean';

        return typeof arg;
    }

    static isPrimitiveType(type: string): boolean {
        return ['string', 'number', 'boolean', 'object', 'function', 'undefined', 'bigint', 'symbol'].includes(type);
    }

    static isValidReactNode(arg: any): boolean {
        if (arg === null || arg === undefined) return true;
        if (typeof arg === 'string' || typeof arg === 'number') return true;
        if (typeof arg === 'boolean' || typeof arg === 'bigint') return true;
        if (arg && typeof arg.view === 'function' && $symbol$ in arg) return true;
        if (arg instanceof $Function$) return true;
        if (arg instanceof $Html$) return true;
        if (React.isValidElement(arg)) return true;
        if (Array.isArray(arg)) return arg.every($ParamValidation.isValidReactNode);
        return false;
    }

    static validateArgument(arg: any, type: any): boolean {
        if (Array.isArray(type)) {
            if (!Array.isArray(arg)) return false;
            const elementType = type[0];

            if (Array.isArray(elementType)) {
                return arg.every(element => $ParamValidation.validateArgument(element, elementType));
            }

            if (elementType === 'any') {
                return arg.every(element => $ParamValidation.isValidReactNode(element));
            } else if (elementType === String || elementType === Number || elementType === Boolean ||
                    elementType === Function || elementType === Object) {
                return arg.every(element => $ParamValidation.validatePrimitive(element, elementType));
            } else if (typeof elementType === 'string') {
                if ($ParamValidation.isPrimitiveType(elementType)) {
                    return arg.every(element => typeof element === elementType);
                } else {
                    return arg.every(element => element instanceof $Html$ && element.type === elementType);
                }
            } else if (elementType?.prototype && typeof elementType.prototype.view === 'function') {
                return arg.every(element => element instanceof elementType);
            } else if (typeof elementType === 'function') {
                return arg.every(element => element instanceof $Function$ && (element as any).__$Function === elementType);
            }
        } else if (type === 'any') {
            return $ParamValidation.isValidReactNode(arg);
        } else if (type === undefined) {
            return arg === undefined;
        } else if (type === null) {
            return arg === null;
        } else if (type === String || type === Number || type === Boolean ||
                type === Function || type === Object) {
            return $ParamValidation.validatePrimitive(arg, type);
        } else if (typeof type === 'string') {
            if ($ParamValidation.isPrimitiveType(type)) {
                return typeof arg === type;
            } else {
                return arg instanceof $Html$ && arg.type === type;
            }
        } else if (type?.prototype && typeof type.prototype.view === 'function') {
            return arg instanceof type;
        } else if (typeof type === 'function') {
            return arg instanceof $Function$ && (arg as any).__$Function === type;
        }
        return false;
    }

    static validatePrimitive(arg: any, type: any): boolean {
        if (type === String) return typeof arg === 'string';
        if (type === Number) return typeof arg === 'number';
        if (type === Boolean) return typeof arg === 'boolean';
        if (type === Function) return typeof arg === 'function' || arg instanceof $Function$;
        if (type === Object) return typeof arg === 'object' && arg !== null;
        return false;
    }
}

export const $paramValidation = new $ParamValidation();

export function $check<T>(arg: T, ...types: $ParameterType[]): T {
    return $paramValidation.check(arg, ...types);
}

export function $is<T>(ctor: abstract new (...args: any[]) => T): T {
    return ctor as any;
}

// ===========================================================================
// $Chemical
// ===========================================================================

export class $Chemical extends $Particle {
    [$template$]!: this;
    [$remove$] = false;
    [$destroyed$] = false;
    [$molecule$]!: $Molecule;
    [$reaction$]!: $Reaction;
    [$orchestrator$]!: $BondOrchestrator<any>;
    [$component$]?: $Component<this>;
    [$lastProps$]: any;
    static [$$template$$]: $Chemical;
    get [$isTemplate$]() { return this == (this as any)[$type$][$$template$$]; }
    get [$derived$]() { return this !== this[$template$]; }

    get [$isBound$]() { return this == this?.[$component$]?.$chemical; }

    [$catalyst$]!: $Chemical;
    get [$isCatalyst$]() { return this == this[$catalyst$]; }

    [$$parent$$]?: $Chemical;
    get [$parent$](): $Chemical | undefined { return this?.[$$parent$$]; }
    set [$parent$](parent: $Chemical) {
        parent = parent || this;
        const wasCatalyst = this[$isCatalyst$];
        this[$$parent$$] = parent;
        if (!wasCatalyst && this[$$parent$$] == this) {
            this[$catalyst$] = this;
            this[$reaction$] = new $Reaction(this);
        } else {
            this[$catalyst$] = parent[$catalyst$];
            this[$catalyst$][$reaction$].add(this);
        }
    }

    get children() { return this[$children$]; }

    get Component(): $Component<this> {
        if (this[$component$]) return this[$component$];
        if (this[$isTemplate$]) {
            this[$component$] = this[$createComponent$]() as any;
            return this[$component$]!;
        }
        this[$component$] = $lift(this) as any;
        return this[$component$]!;
    }

    get $Component(): $$Component<this> {
        return this.Component as any;
    }

    constructor() {
        super();
        const $this = this as any;
        if (!$this[$type$][$$template$$] || !($this[$type$][$$template$$] instanceof $this[$type$]))
            $this[$type$][$$template$$] = this;
        this[$template$] = this;
        this[$$parent$$] = this;
        this[$catalyst$] = this;
        this[$molecule$] = new $Molecule(this);
        this[$reaction$] = new $Reaction(this);
        this[$orchestrator$] = new $BondOrchestrator(this);
    }

    view(): ReactNode {
        return this.children;
    }

    toString() {
        if (this[$symbol$]) return this[$symbol$];
        return $Particle[$$createSymbol$$](this);
    }

    async mount() { return this.next('mount'); }
    async render() { return this.next('render'); }
    async layout() { return this.next('layout'); }
    async effect() { return this.next('effect'); }
    async unmount() { return this.next('unmount'); }

    protected [$bond$]() {
        this[$molecule$].reactivate();
        this[$orchestrator$].bond({ children: this[$children$] });
        this[$molecule$].reactivate();
    }

    [$props$](): any {
        const $this = this as any;
        const props: Record<string, any> = this.children ?
            { key: this[$symbol$], children: this.children } :
            { key: this[$symbol$] };
        for (const bond of this[$molecule$].bonds.values())
            if (bond.isProp) {
                const value = $this[bond.property];
                if (value !== undefined) props[bond.property.slice(1)] = value;
            }
        return props;
    }

    [$destroy$]() {
        if (this[$isTemplate$] || this[$isBound$]) return;
        this[$$parent$$] = undefined as any;
        this[$molecule$]?.destroy();
        this[$reaction$]?.destroy();
        this[$destroyed$] = true;
    }

    protected [$createComponent$](): $Component<this> {
        if (this[$component$])
            throw new Error(`The Component for ${this} has already been created`);
        this.assertViewConstructors();
        this[$template$][$molecule$].reactivate();
        const template = this[$template$];
        const Component = (props?: $Props): ReactNode => {
            const [cid, setCid] = useState(-1);
            let chemical: $Chemical;
            if (cid === -1) {
                chemical = Object.create(template) as $Chemical;
                chemical[$cid$] = $Particle[$$getNextCid$$]();
                chemical[$symbol$] = $Particle[$$createSymbol$$](chemical);
                chemical[$molecule$] = new $Molecule(chemical);
                chemical[$orchestrator$] = new $BondOrchestrator(chemical);
                chemical[$phases$] = new Map($phaseOrder.map(p => [p, []]));
                chemical[$phase$] = 'setup';
                chemical[$reaction$] = new $Reaction(chemical);
                setCid(chemical[$cid$]);
            } else {
                chemical = $Reaction.find(cid) as $Chemical;
                if (!chemical) throw new Error(`$Chemical[${cid}] not found`);
            }
            const [, update] = useState(0);
            chemical[$update$] = () => update((t: number) => t + 1);
            useEffect(() => {
                chemical[$resolve$]('mount');
                return () => {
                    chemical[$resolve$]('unmount');
                    if (!chemical[$remove$]) chemical[$remove$] = true;
                    else if (!chemical[$destroyed$]) chemical[$destroy$]();
                };
            }, [chemical]);
            useLayoutEffect(() => {
                chemical[$resolve$]('layout');
            });
            const react = () => chemical[$reaction$]?.react();
            useEffect(() => {
                chemical[$resolve$]('effect');
                chemical[$rendering$] = true;
                const current = augment(chemical.view(), react);
                chemical[$rendering$] = false;
                if (diff(current, chemical[$viewCache$])) {
                    chemical[$viewCache$] = current;
                    chemical[$update$]!();
                }
            });
            chemical[$rendering$] = true;
            chemical[$apply$](props);
            chemical[$bond$]();
            const output = augment(chemical.view(), react);
            chemical[$viewCache$] = output;
            chemical[$rendering$] = false;
            return output;
        };
        (Component as any).$chemical = template;
        (Component as any).$bound = false;
        (Component as any).$bind = (parent?: $Chemical) => bind(this, parent);
        return Component as any;
    }

    private assertViewConstructors(prototype?: any, childConstructor?: any) {
        if (!prototype) prototype = Object.getPrototypeOf(this[$template$]);
        if (!prototype || prototype === $Chemical.prototype) return;
        const className = prototype.constructor.name;
        const thisConstructor = prototype[className];
        if (thisConstructor && typeof thisConstructor !== 'function')
            throw new Error(`The ${className} class has property ${className} but it's not a function`);
        if (childConstructor && !thisConstructor)
            throw new Error(`The ${className} class must have a constructor method named ${className} because child class has one`);
        this.assertViewConstructors(Object.getPrototypeOf(prototype), thisConstructor);
    }
}

/**
 * react(chemical) — request a re-render of this chemical.
 *
 * This is the escape hatch for programmatic state mutations that don't flow
 * through an event handler (augmented) or a reactive method (wrapped). Call
 * it when you've mutated chemical state from a context the framework can't
 * observe.
 *
 * Most code should not need this — mutations in handlers and methods
 * auto-react. It's documented for:
 *   - Tests that mutate chemical state directly for setup.
 *   - External subscriptions whose callbacks mutate without calling a method.
 *   - Advanced patterns where you want to coalesce updates manually.
 */
export function react(chemical: { [$reaction$]?: $Reaction }): void {
    chemical[$reaction$]?.react();
}

// bind(chemical, parent?) — create a bound child instance of a chemical
export function bind<T extends $Chemical>(chemical: T, parent?: $Chemical): $Component<T> {
    const template = chemical[$template$];
    const child = Object.create(template) as T;
    child[$cid$] = $Particle[$$getNextCid$$]();
    child[$symbol$] = $Particle[$$createSymbol$$](child);
    child[$molecule$] = new $Molecule(child);
    child[$orchestrator$] = new $BondOrchestrator(child);
    child[$phases$] = new Map($phaseOrder.map(p => [p, []]));
    child[$phase$] = 'setup';
    if (parent) child[$parent$] = parent;
    const component = $lift(child) as any;
    component.$bind = (p?: $Chemical) => bind(child, p);
    child[$component$] = component;
    return component;
}

// ===========================================================================
// Wrapped chemicals — $Function$, $Html$, $Include, $Exclude, $List
// ===========================================================================

export class $Function$<P = any> extends $Chemical {
    private _component: React.FC<P>;
    get __$Function() { return this._component; }
    get __name() { return this.__$Function.name; }

    constructor(component: React.FC<P>) {
        super();
        this._component = component;
    }

    view() {
        return React.createElement(this._component as any, (this as any)[$props$]());
    }
}

export class $Html$<T extends keyof React.JSX.IntrinsicElements = any> extends $Chemical {
    get type() { return this._type; }
    protected _type: T;

    constructor(type: T) {
        super();
        this._type = type;
    }

    view() {
        return React.createElement(this._type, (this as any)[$props$]());
    }
}

export class $Include extends $Chemical {
    view(): ReactNode {
        return this.children;
    }
}

export class $Exclude extends $Chemical {
    view(): ReactNode {
        return undefined;
    }
}

export class $List extends $Chemical {
    view(): ReactNode {
        const children = React.Children.toArray(this.children);
        return React.createElement(React.Fragment, null,
            ...children.map((child, i) => {
                if (React.isValidElement(child)) {
                    const chemical = (child.type as any)?.$chemical;
                    const key = chemical ? `${chemical[$symbol$]}` : child.key || `${i}`;
                    return React.cloneElement(child as React.ReactElement<any>, { key });
                }
                return child;
            })
        );
    }
}

export function $wrap<P>(Component: React.FC<P>): any {
    if (typeof Component !== "function")
        throw new Error(`Expected a function component, got ${Component}`);
    return new $Function$(Component);
}

// ===========================================================================
// Singletons
// ===========================================================================

export const Chemical = new $Chemical().Component;
export const $ = new $List().Component;
