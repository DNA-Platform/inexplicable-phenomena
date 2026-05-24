import React, { ReactNode, JSX } from "react";
import {
    $cid$, $symbol$, $type$, $molecule$, $reaction$, $template$, $isTemplate$, $derived$,
    $isBound$, $$parent$$, $parent$, $synthesis$, $component$, $resolveComponent$, $children$,
    $props$, $lastProps$, $apply$, $bond$,
    $destroy$, $destroyed$, $remove$, $catalyst$, $isCatalyst$,
    $$template$$, $$getNextCid$$, $$createSymbol$$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$,
    $isChemicalBase$, $lifted$, $construction$, $deriveInit$,
    $devError$
} from "../implementation/symbols";
import { $symbolize } from "../implementation/representation";
import type { Component, $Component, Element, $Element, $Props, $ParameterType } from "../implementation/types";
import { $Particle, $phaseOrder, $lift, applyRenderFilters, isParticle } from "./particle";
import { $Bond, $Reagent, $Reflection, inert, reactive } from "./bond";
import { $Molecule } from "./molecule";
import { $Reaction } from "./reaction";
import { dev, warn } from "../implementation/dev";

// Re-export bond / reflection / molecule / reaction / scope machinery for
// consumers that import from chemical.ts.
export { $Bond, $Reagent, $Reflection, inert, reactive } from "./bond";
export { $Molecule } from "./molecule";
export { $Reaction } from "./reaction";
export { $Scope, withScope } from "../implementation/scope";


// ===========================================================================
// Bond orchestration
// ===========================================================================

export interface $BondParameter {
    isArray: boolean;
    isSpread: boolean;
}

// $Reactants — the information-hiding wrapper a bond ctor receives. Exposes
// only `.values` (the array of arguments). Narrower than $SynthesisContext on
// purpose: ctors should not be able to reach parent contexts, parameter
// parsing state, or sibling child contexts.
export class $Reactants {
    values: any[] = [];
}

export class $SynthesisContext {
    private parameters: $BondParameter[];
    private parameterIndex = -1;
    arguments: $Reactants;
    args: any[] = [];
    chemical: $Chemical;
    node: any = undefined;
    children: ReactNode[] = [];
    childContexts: $SynthesisContext[] = [];
    singleton: boolean = false;
    parameter?: $BondParameter;
    argsValid?: boolean = true;
    parent: $SynthesisContext = this;
    get isElement() { return React.isValidElement(this.node); }

    private _isModified = false;
    get isModified() { return this._isModified; }
    set isModified(value: boolean) {
        this._isModified = value;
    }

    constructor(chemical: $Chemical, parameters: $BondParameter[] = []) {
        this.chemical = chemical;
        this.parameters = parameters;
        this.arguments = new $Reactants();
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
        props = (chemical as any)[$synthesis$].bond(props, this);
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

export class $Synthesis<T extends $Chemical = $Chemical> {
    private _chemical: T;
    private _bondConstructor?: Function;
    private _parameters: { isArray: boolean; isSpread: boolean }[] = [];
    private _boundChildren: Map<any, Map<string, any>> = new Map();
    private _lastBondArgs?: any[];

    constructor(chemical: T) {
        this._chemical = chemical;
        const name = (chemical as any)[$type$].name;
        this._bondConstructor = (chemical as any)[name];
        this.parseBondConstructor();
    }

    bond(props: any, parentContext?: $SynthesisContext): any {
        const chemical = this._chemical as any;
        let children: ReactNode = props.children;
        const context = new $SynthesisContext(chemical, this._parameters);
        parentContext?.childContexts.push(context);

        const lastProps = chemical[$lastProps$] || {};
        for (const prop in props) {
            if (prop === 'children' || prop === 'key' || prop === 'ref') continue;
            const value = props[prop];
            if (prop in lastProps && lastProps[prop] == value) continue;
            chemical['$' + prop] = value;
        }

        this.process(children, context);
        if (context.isModified) {
            children = context.build();
            props = { ...props, children: children || [] };
        }

        (chemical as any)[$children$] = props.children;

        const c = this._chemical as any;

        if (this._bondConstructor && context.argsValid) {
            const newArgs = context.arguments.values;
            if (this._lastBondArgs && $Synthesis.sameArgs(newArgs, this._lastBondArgs)) {
                // Children unchanged — skip bond constructor
            } else {
                this._lastBondArgs = $Synthesis.snapshotArgs(newArgs);
                $paramValidation.reset();
                $paramValidation.chemical = this._chemical;
                $paramValidation.count = this._parameters.length;
                let bondResult: any;
                if (dev) {
                    try {
                        bondResult = this._bondConstructor!.apply(this._chemical, newArgs);
                        $paramValidation.evaluate();
                        c[$devError$] = undefined;
                    } catch (e: any) {
                        c[$devError$] = e?.message || String(e);
                    }
                } else {
                    bondResult = this._bondConstructor!.apply(this._chemical, newArgs);
                    $paramValidation.evaluate();
                }

                if (!c[$construction$]) {
                    const parentConstruction = Object.getPrototypeOf(c)?.[$construction$];
                    const promises: Promise<any>[] = [];
                    if (bondResult instanceof Promise) promises.push(bondResult);
                    if (parentConstruction) promises.push(parentConstruction);
                    if (promises.length > 0) {
                        c[$construction$] = Promise.allSettled(promises).then(() => {
                            c[$reaction$]?.react();
                        });
                    } else {
                        c[$construction$] = Promise.resolve();
                    }
                } else if (bondResult instanceof Promise) {
                    bondResult.catch(() => {});
                }
            }
        }

        return props;
    }

    private static sameArgs(a: any[], b: any[]): boolean {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] === b[i]) continue;
            if (Array.isArray(a[i]) && Array.isArray(b[i])) {
                if (!$Synthesis.sameArgs(a[i], b[i])) return false;
            } else {
                return false;
            }
        }
        return true;
    }

    private static snapshotArgs(args: any[]): any[] {
        return args.map(a => Array.isArray(a) ? $Synthesis.snapshotArgs(a) : a);
    }

    // AUDIT: brittle — regex-parses the bond constructor's source string to
    // discover parameter shape (spread vs. positional). Breaks under arrow-
    // function ctors, default values, destructured params, multiline params,
    // and TypeScript-emitted `__decorate` wrappers. A more robust approach:
    // Function.prototype.length for arity + an explicit `@spread` decorator
    // for spread params. See caveat: bond-ctor-source-parsing (TBD).
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

    private process(children: ReactNode, context: $SynthesisContext) {
        const childArray = React.Children.toArray(children);
        context.singleton = !Array.isArray(children) && childArray.length === 1;
        const parent = this._chemical;
        let ctx = context;
        const typeCounts: Map<any, number> | undefined = dev ? new Map() : undefined;
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
            const elementKey = element.key?.toString() || '';
            if (type === $Include || (type as any)?.$chemical instanceof $Include) {
                ctx.isModified = true;
                const arrayContext = ctx.array();
                this.processArray(React.Children.toArray(element.props?.children || []), arrayContext);
            } else if (typeof type === 'function') {
                let component: $Component = type as any;
                if (!(component as any).$bind) component = $wrap(type as React.FC)[$resolveComponent$]();
                if (typeCounts) typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
                let typeCache = this._boundChildren.get(type);
                if (!typeCache) {
                    typeCache = new Map();
                    this._boundChildren.set(type, typeCache);
                }
                const cached = typeCache.get(elementKey);
                if (cached && (cached as any).$chemical?.[$parent$] === parent) {
                    component = cached;
                } else if ((component as any).$chemical?.[$parent$] !== parent) {
                    component = (component as any).$bind(parent);
                    typeCache.set(elementKey, component);
                }
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
                let typeCache = this._boundChildren.get(type);
                if (!typeCache) {
                    typeCache = new Map();
                    this._boundChildren.set(type, typeCache);
                }
                const cached = typeCache.get(elementKey);
                let $type: any;
                if (cached && (cached as any).$chemical?.[$parent$] === parent) {
                    $type = cached;
                } else {
                    $type = (html$Instance[$resolveComponent$]() as any).$bind(parent);
                    typeCache.set(elementKey, $type);
                }
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
        if (typeCounts) {
            const parentName = (parent as any)[$type$]?.name || 'unknown';
            for (const [type, count] of typeCounts) {
                if (count < 2) continue;
                const childName = type.$chemical?.[$type$]?.name
                    || type.$chemical?.constructor?.name
                    || type.name
                    || 'unknown';
                warn(
                    `${parentName} has ${count} children of type ${childName} without explicit keys. ` +
                    `Same-type siblings need unique key props to preserve identity across re-renders. ` +
                    `Without keys, swapping or reordering children will swap their state.`
                );
            }
        }
    }

    private processArray(elements: any[], context: $SynthesisContext) {
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

    private static describeType(type: any): string {
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

    private static describeActual(arg: any, depth: number = 0): string {
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

    private static isPrimitiveType(type: string): boolean {
        return ['string', 'number', 'boolean', 'object', 'function', 'undefined', 'bigint', 'symbol'].includes(type);
    }

    private static isValidReactNode(arg: any): boolean {
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

    private static validateArgument(arg: any, type: any): boolean {
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

    private static validatePrimitive(arg: any, type: any): boolean {
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
    [$remove$] = false;
    [$synthesis$]!: $Synthesis<any>;
    [$lastProps$]: any;

    get [$isBound$]() { return this == this?.[$component$]?.$chemical; }

    [$catalyst$]!: $Chemical;
    get [$isCatalyst$]() { return this == this[$catalyst$]; }

    [$$parent$$]?: $Chemical;
    get [$parent$](): $Chemical | undefined { return this?.[$$parent$$]; }
    // Joining a catalyst graph: replace this chemical's default $Particle
    // reaction with one that shares the catalyst's reaction system, so writes
    // here propagate through the parent's tree. The default reaction created
    // in $Particle.constructor is correct for stand-alone chemicals; this
    // setter rewires when the chemical becomes part of a composition.
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

    [$resolveComponent$](): Component<this> {
        if (Object.prototype.hasOwnProperty.call(this, $component$)) return this[$component$]!;
        if (this[$isTemplate$]) {
            this.assertViewConstructors();
            this[$template$][$molecule$].reactivate();
        }
        const component = $lift(this, undefined, true) as any;
        component.$bind = (parent?: $Chemical) => bind(this, parent);
        this[$component$] = component;
        return this[$component$]!;
    }

    [$deriveInit$]() {
        this[$molecule$] = new $Molecule(this);
        this[$synthesis$] = new $Synthesis(this);
    }

    constructor() {
        super();
        this[$$parent$$] = this;
        this[$catalyst$] = this;
        this[$synthesis$] = new $Synthesis(this);
    }

    view(): ReactNode {
        return this.children;
    }

    protected [$bond$]() {
        this[$molecule$].reactivate();
        this[$synthesis$].bond({ children: this[$children$] });
        this[$molecule$].reactivate();
    }

    [$props$](): any {
        const $this = this as any;
        const props: Record<string, any> = this.children ?
            { key: this[$symbol$], children: this.children } :
            { key: this[$symbol$] };
        const seen = new Set<string>();
        for (const bond of this[$molecule$].bonds.values())
            if ($Reflection.isSpecial(bond.property)) {
                seen.add(bond.property);
                const value = $this[bond.property];
                if (value !== undefined) props[bond.property.slice(1)] = value;
            }
        for (const key of Object.keys($this)) {
            if (seen.has(key)) continue;
            if (!$Reflection.isSpecial(key)) continue;
            const value = $this[key];
            if (value !== undefined) props[key.slice(1)] = value;
        }
        return props;
    }

    $new(): this {
        const clone = super.$new();
        if (this[$$parent$$] && this[$$parent$$] !== this) {
            clone[$parent$] = this[$$parent$$]!;
        }
        return clone;
    }

    [$destroy$]() {
        if (this[$isTemplate$] || this[$isBound$]) return;
        this[$$parent$$] = undefined as any;
        this[$molecule$]?.destroy();
        this[$reaction$]?.destroy();
        this[$destroyed$] = true;
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

// Sentinel: marks $Chemical.prototype so $Molecule can stop its prototype
// walk at the framework boundary without importing $Chemical.
// $isChemicalBase$ now lives on $Particle.prototype (the framework root for
// reactive entities). Inherited transitively here.

// bind(chemical, parent?) — create a bound child instance of a chemical
export function bind<T extends $Chemical>(chemical: T, parent?: $Chemical): Component<T> {
    const template = chemical[$template$];
    const child = Object.create(template) as T;
    child[$cid$] = $Particle[$$getNextCid$$]();
    child[$symbol$] = $Particle[$$createSymbol$$](child);
    child[$molecule$] = new $Molecule(child);
    child[$synthesis$] = new $Synthesis(child);
    child[$phases$] = new Map($phaseOrder.map(p => [p, []]));
    child[$phase$] = 'setup';
    if (parent) child[$parent$] = parent;
    const component = $lift(child) as any;
    component.$bind = (p?: $Chemical) => bind(child, p);
    child[$component$] = component;
    return component;
}

// ===========================================================================
// Wrapped chemicals — $Function$, $Html$, $Include
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


export function $wrap<P>(Component: React.FC<P>): any {
    if (typeof Component !== "function")
        throw new Error(`Expected a function component, got ${Component}`);
    return new $Function$(Component);
}

// ===========================================================================
// $Chemistry — the multi-shape callable type, exported as `$`.
//
// Overloads:
//   $(props)              JSX:    <$>...</$> renders a fragment.
//   $(chemical)           inst:   returns $Component<T>.
//   $(particle)           inst:   returns $Element<T>.
//   $($ChemicalClass)     class:  Component<T> if empty ctor; else
//                                 (...args) => Component<T>.
//   $($ParticleClass)     class:  Element<T> if empty ctor; else
//                                 (...args) => Element<T>.
//
// Empty-vs-args is the JS constructor's arity, not the bond constructor.
// `$` has no `.foo` members yet — namespace reserved.
// ===========================================================================

interface $Chemistry {
    (props: { children?: ReactNode; key?: any }): ReactNode;
    <T extends $Chemical>(chemical: T): $Component<T>;
    <T extends $Particle>(particle: T): $Element<T>;
    <T extends $Chemical>(klass: new () => T): Component<T>;
    <T extends $Particle>(klass: new () => T): Element<T>;
    <T extends $Chemical, A extends any[]>(klass: new (...args: A) => T): (...args: A) => Component<T>;
    <T extends $Particle, A extends any[]>(klass: new (...args: A) => T): (...args: A) => Element<T>;
    // Inverse: Component → instance. $(Lab) returns the chemical Lab wraps.
    <T extends $Particle>(component: Component<T> | Element<T>): T;
    // HTML element catalogue — `$('div')` lazily creates a reactive $Html$
    // chemical for the tag, caches its Component, returns it. `$('div', X)`
    // registers `X` as the override for that tag — subsequent lookups
    // return the override.
    <K extends keyof JSX.IntrinsicElements>(tag: K): Component<$Html$<K>>;
    <K extends keyof JSX.IntrinsicElements>(tag: K, override: any): any;
}

// HTML catalogue — lazy registry of Components per tag name. Populated on
// first `$('div')`; overridable via `$('div', CoolDiv)`.
const $catalogue = new Map<string, any>();

// Chemistry — one class. Its view IS the dispatch. Typed `any` so the runtime
// can be dynamic; call-site types come from `$Chemistry` wrapping `$`.
class Chemistry extends $Chemical {
    view(arg?: any): any {
        // Fast path — JSX usage. null/undefined, or a plain object that is
        // empty (<$ />) or has children (<$>...</$>).
        if (arg == null ||
            (Object.getPrototypeOf(arg) === Object.prototype &&
            (Object.keys(arg).length === 0 || 'children' in arg))
        ) {
            const children = React.Children.toArray(arg?.children);
            return React.createElement(React.Fragment, null,
                ...children.map((child, i) => {
                    if (React.isValidElement(child)) {
                        // Auto-key by (chemical-symbol, position) so siblings
                        // sharing the same template chemical don't collide.
                        const chemical = (child.type as any)?.$chemical;
                        const key = chemical
                            ? `${chemical[$symbol$]}.${i}`
                            : child.key || `${i}`;
                        return React.cloneElement(child as React.ReactElement<any>, { key });
                    }
                    return child;
                })
            );
        }

        // Instance form — the particle/chemical was already constructed when
        // handed to us. Reusing it means rendering its view with optionally
        // overridden props; the bond constructor does NOT re-run. We route
        // through $lift, which skips $bond() entirely. Result is cached per
        // instance so React component identity is stable across $(x) calls.
        if (isParticle(arg)) {
            const inst = arg as any;
            if (Object.prototype.hasOwnProperty.call(inst, $lifted$)) return inst[$lifted$];
            return inst[$lifted$] = $lift(arg);
        }

        // Inverse form — $(Component) returns the chemical instance it wraps.
        // Components carry `.$chemical` (attached during $lift or
        // $lift). This is the inverse of $(instance) → Component.
        if (typeof arg === 'function' && (arg as any).$chemical) {
            return (arg as any).$chemical;
        }

        // String tag — HTML catalogue. `$('div')` looks up (or lazily
        // creates) the cached Component for that tag. `$('div', X)`
        // registers X as the override for that tag.
        if (typeof arg === 'string') {
            const override = arguments[1];
            if (override !== undefined) {
                $catalogue.set(arg, override);
                return override;
            }
            let cached = $catalogue.get(arg);
            if (!cached) {
                cached = new $Html$(arg as any)[$resolveComponent$]();
                $catalogue.set(arg, cached);
            }
            return cached;
        }

        // Class form — JS constructor arity picks the shape.
        if (typeof arg === 'function') {
            const cls = arg as any;
            if (cls.length === 0) {
                // Walk static prototype chain might find an ancestor's
                // template — verify it's actually OF this class.
                let template = cls[$$template$$];
                if (!template || !(template instanceof cls)) {
                    new cls();
                    template = cls[$$template$$];
                }
                return template[$resolveComponent$]();
            }
            return (...args: any[]) => new cls(...args)[$resolveComponent$]();
        }

        // Unrecognized arg — null is safer than re-entering JSX.
        return null;
    }
}

export const $ = new Chemistry().view as any as $Chemistry;
