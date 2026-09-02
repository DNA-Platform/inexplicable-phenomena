import React, { ReactNode, JSX } from "react";
import {
    $cid$, $symbol$, $type$, $molecule$, $reaction$, $template$, $isTemplate$, $derived$,
    $isBound$, $$parent$$, $parent$, $synthesis$, $component$, $resolveComponent$, $children$,
    $props$, $lastProps$, $apply$, $bond$,
    $destroy$, $destroyed$, $remove$, $catalyst$, $isCatalyst$,
    $$template$$, $$getNextCid$$, $$createSymbol$$,
    $phase$, $phases$, $resolve$, $update$, $viewCache$, $rendering$,
    $isChemicalBase$, $lifted$, $construction$, $deriveInit$,
    $devError$, $devException$, $watched$,
    $registry$, $reference$, $cache$, $formula$, $keyOf$, $isFormulaBase$, $facade$, $facades$, cache, children, $formed$
} from "../implementation/symbols";
import { $symbolize } from "../implementation/representation";
import { $subject } from "../implementation/catalogue";
import { currentAsker, drawing, withAsker } from "../implementation/scope";
import { hydration } from "../implementation/hydration";
import type { Component, $Component, Element, $Element, $Props, $ParameterType, $HtmlTag } from "../implementation/types";
import { $Particle, $phaseOrder, $lift, applyRenderFilters, isParticle } from "./particle";
import { $Bond, $Reagent, $Reflection, inert, reactive } from "./bond";
import { $Molecule } from "./molecule";
import { $Reaction } from "./reaction";
import { dev, warn, $exceptions } from "../implementation/dev";
import { asking } from "../implementation/augment";

export { $Bond, $Reagent, $Reflection, inert, reactive } from "./bond";
export { $Molecule } from "./molecule";
export { $Reaction } from "./reaction";
export { $Scope, withScope } from "../implementation/scope";

export interface $BondParameter {
    isArray: boolean;
    isSpread: boolean;
}

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

const $chainReached = new WeakMap<object, Set<string>>();

export class $Synthesis<T extends $Chemical = $Chemical> {
    private _chemical: T;
    private _bondConstructor?: Function;
    private _declared: string[] = [];
    private _parameters: { isArray: boolean; isSpread: boolean }[] = [];
    private _boundChildren: Map<any, Map<string, any>> = new Map();
    private _lastBondArgs?: any[];

    constructor(chemical: T) {
        this._chemical = chemical;
        let cls: any = (chemical as any)[$type$];
        while (cls && cls.name) {
            const named = $Synthesis.bondName(cls);
            if (named) this._declared.push(named);
            if (!this._bondConstructor && named) this._bondConstructor = (chemical as any)[named];
            cls = Object.getPrototypeOf(cls);
        }
        this.parseBondConstructor();
    }

    private static bondName(cls: any): string | undefined {
        const proto = cls.prototype;
        if (!proto) return undefined;
        if (Object.prototype.hasOwnProperty.call(proto, cls.name)) return cls.name;

        const authored = $Synthesis.authored(cls.name);
        for (const name of Object.getOwnPropertyNames(proto)) {
            if (name === 'constructor' || $Synthesis.authored(name) !== authored) continue;
            if (typeof Object.getOwnPropertyDescriptor(proto, name)?.value === 'function') return name;
        }
        return undefined;
    }

    private static authored(name: string): string {
        return name.replace(/^_+/, '').replace(/\d+$/, '');
    }

    private watchChain(): { reached: Set<string>; restore: () => void } | undefined {
        if (this._declared.length < 2) return undefined;
        const chemical = this._chemical as any;
        let cls: any = chemical[$type$];
        while (cls && cls.name) {
            $Synthesis.watch(cls);
            cls = Object.getPrototypeOf(cls);
        }
        const reached = new Set<string>([this._declared[0]]);
        $chainReached.set(chemical, reached);
        return { reached, restore: () => { $chainReached.delete(chemical); } };
    }

    private static watch(cls: any) {
        const name = $Synthesis.bondName(cls);
        if (!name) return;
        const existing = Object.getOwnPropertyDescriptor(cls.prototype, name);
        if (!existing || typeof existing.value !== 'function' || existing.value[$watched$]) return;
        const inner = existing.value;
        const wrapper = function (this: any, ...args: any[]) {
            $chainReached.get(this)?.add(name);
            return inner.apply(this, args);
        };
        (wrapper as any)[$watched$] = inner;
        Object.defineProperty(cls.prototype, name, { ...existing, value: wrapper });
    }

    private assertChainReached(watch?: { reached: Set<string> }) {
        if (!watch) return;
        const missed = this._declared.filter(name => !watch.reached.has(name));
        if (missed.length) throw new Error(`${this._declared[0]} did not call ${missed.join(', ')} — every declared bond constructor on the chain must be called.`);
    }

    bond(props: any, parentContext?: $SynthesisContext): any {
        const chemical = this._chemical as any;
        let children: ReactNode = props.children;
        const context = new $SynthesisContext(chemical, this._parameters);
        parentContext?.childContexts.push(context);

        const lastProps = chemical[$lastProps$] || {};
        const rendering = chemical[$rendering$];
        chemical[$rendering$] = true;
        try {
            for (const prop in props) {
                if (prop === 'children' || prop === 'key' || prop === 'ref') continue;
                const value = props[prop];
                if (prop in lastProps && lastProps[prop] == value) continue;
                chemical['$' + prop] = value;
            }
        } finally {
            chemical[$rendering$] = rendering;
        }

        const written = (props as any)?.[$written$] as any[] | undefined;
        this.process(written ?? children, context, !!written);
        if (context.isModified) {
            children = context.build();
            props = { ...props, children: children || [] };
        }

        (chemical as any)[$children$] = props.children;

        const c = this._chemical as any;

        if (this._bondConstructor && context.argsValid) {
            const newArgs = context.arguments.values;
            if (this._lastBondArgs && $Synthesis.sameArgs(newArgs, this._lastBondArgs)) {
            } else {
                this._lastBondArgs = $Synthesis.snapshotArgs(newArgs);
                $paramValidation.reset();
                $paramValidation.chemical = this._chemical;
                $paramValidation.count = this._parameters.length;
                let bondResult: any;
                const watch = this.watchChain();
                const bonding = c[$rendering$];
                c[$rendering$] = true;
                try {
                if (!dev && $exceptions.mode === 'throw') {
                    try {
                        bondResult = withAsker(c, () => this._bondConstructor!.apply(this._chemical, newArgs), true);
                        if (!(bondResult instanceof Promise)) this.assertChainReached(watch);
                        assertValid(c);
                        $paramValidation.evaluate();
                        if (!c[$formed$]) { c[$formed$] = true; hydration.overwrite(c); }
                    } finally {
                        watch?.restore();
                        $paramValidation.chemical = null;
                    }
                } else {
                    try {
                        bondResult = withAsker(c, () => this._bondConstructor!.apply(this._chemical, newArgs), true);
                        if (!(bondResult instanceof Promise)) this.assertChainReached(watch);
                        assertValid(c);
                        $paramValidation.evaluate();
                        if (!c[$formed$]) { c[$formed$] = true; hydration.overwrite(c); }
                        c[$devError$] = undefined;
                        c[$devException$] = undefined;
                    } catch (e: any) {
                        c[$devError$] = e?.message || String(e);
                        c[$devException$] = e instanceof Error ? e : new Error(String(e));
                        if (!dev) console.error('$Chemistry: Bond Constructor Failed —', e);
                    } finally {
                        watch?.restore();
                        $paramValidation.chemical = null;
                    }
                }
                } finally {
                    c[$rendering$] = bonding;
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

    private parseBondConstructor() {
        if (!this._bondConstructor) return;

        const written: Function = (this._bondConstructor as any)[$watched$] || this._bondConstructor;
        const match = written.toString().match(/\(([^)]*)\)/);
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

    private isInline(child: any): boolean {
        if (child == null || typeof child === 'boolean') return false;
        if (typeof child === 'string' || typeof child === 'number') return true;
        if (child instanceof $Chemical) return child.inline;
        if (!React.isValidElement(child)) return false;
        const type = (child as any).type;
        if (typeof type === 'string') return $inlineTypes.has(type);
        if (typeof type === 'function') return !!(type as any).$chemical?.inline;
        return false;
    }

    private groupInline(childArray: any[]): any[] {
        if (!childArray.some(c => this.isInline(c))) return childArray;
        const out: any[] = [];
        let run: any[] = [];
        const flush = () => {
            if (!run.length) return;
            const els = run.map(c =>
                (typeof c === 'string' || typeof c === 'number' || c instanceof $Chemical)
                    ? c
                    : evalElement(c, this._chemical));
            out.push(React.createElement('block' as any, { key: `$b${out.length}`, elements: els }));
            run = [];
        };
        for (const child of childArray) {
            if (this.isInline(child)) run.push(child);
            else { flush(); out.push(child); }
        }
        flush();
        return out;
    }

    private flatten(written: any): any[] {
        const out: any[] = [];
        const walk = (child: any): void => {
            if (child === null || child === undefined || typeof child === 'boolean') return;
            if (Array.isArray(child)) { child.forEach(walk); return; }
            out.push(child);
        };
        walk(written);
        return out;
    }

    private process(children: ReactNode, context: $SynthesisContext, written = false) {
        const raw = written ? this.flatten(children) : React.Children.toArray(children);
        const grouping = this._bondConstructor && !(this._chemical instanceof $Eval);
        const childArray = grouping ? this.groupInline(raw) : raw;
        context.singleton = !Array.isArray(children) && childArray.length === 1;
        const parent = (this._chemical instanceof $Eval && this._chemical.parentFor) || this._chemical;
        let ctx = context;
        const typeCounts: Map<any, number> | undefined = (dev && !this._bondConstructor) ? new Map() : undefined;
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
                    html$Instance = htmlFor(type);
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

export class $ParamValidation {
    index = 0;
    count = -1;
    types: string[] = [];
    errors: string[] = [];
    reasons: string[] = [];
    chemical: $Chemical | null = null;
    validated = false;

    reason(text: string) {
        this.reasons.push(text);
    }

    get bonding(): boolean {
        return this.chemical !== null;
    }

    raise(text: string) {
        this.reason(text);
        if (!this.bonding) throw new Error(text);
    }

    check<T>(arg: T, ...types: $ParameterType[]): T {
        const paramNumber = this.index++;
        if (arg === undefined && types.some(t => t === 'block' || t === ($Block as any))) {
            arg = new $Block() as any;
        }
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
        if (this.errors.length === 0 && this.reasons.length === 0) return;

        const className = this.chemical ? this.chemical.constructor.name : 'Unknown';
        let message = `\n$Chemistry Constructor Validation Failed: ${className}\n\n`;
        if (this.types.length) {
            message += `Expected signature:\n`;
            message += `  ${className}(\n`;
            this.types.forEach((type, i) => {
                message += `    ${type}${i < this.types.length - 1 ? ',' : ''}\n`;
            });
            message += `  )\n\n`;
        }
        if (this.errors.length) message += this.errors.join('\n');
        if (this.reasons.length) {
            if (this.errors.length) message += `\n`;
            message += `\nNot valid because:\n  ${this.reasons.join('\n  ')}`;
        }

        this.validated = true;
        throw new Error(message);
    }

    reset() {
        this.index = 0;
        this.count = -1;
        this.types = [];
        this.errors = [];
        this.reasons = [];
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
                return `$${type}`;
            }
        }

        if (type === $Block) return "$Block";
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

        if (arg instanceof $Block) return "$Block";
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

export function $check<T>(arg: T, ...types: $ParameterType[]): T;
export function $check(held: boolean, reason: string): boolean;

export function $check(arg: any, ...rest: any[]): any {
    if (typeof arg === 'boolean' && rest.length === 1 && typeof rest[0] === 'string') {
        if (!arg) $paramValidation.raise(rest[0]);
        return arg;
    }
    return $paramValidation.check(arg, ...rest);
}

export function $is<T>(ctor: abstract new (...args: any[]) => T): T {
    return ctor as any;
}

function assertValid(chemical: any) {
    if (chemical[$isTemplate$]) return;
    if (typeof chemical.valid === 'function' && !chemical.valid()) {
        if ($paramValidation.reasons.length === 0) {
            $paramValidation.reason(`${chemical.constructor.name} is not valid after its bond constructor.`);
        }
    }
}

const standing = { $ref: ' standing' };
const kept = { $ref: ' kept' };
const seeding = new Set<any>();

function templateOf(cls: any): any {
    if (Object.prototype.hasOwnProperty.call(cls, $$template$$)) return cls[$$template$$];
    if (typeof cls !== 'function' || seeding.has(cls)) return undefined;
    seeding.add(cls);
    try { new cls(); } finally { seeding.delete(cls); }
    return Object.prototype.hasOwnProperty.call(cls, $$template$$) ? cls[$$template$$] : undefined;
}

function isFormula(cls: any): boolean {
    return !!templateOf(cls)?.formula;
}

function branch(cls: any): any[] {
    const chain: any[] = [];
    let at = cls;
    while (at && isFormula(at) && !Object.prototype.hasOwnProperty.call(at, $isFormulaBase$)) {
        chain.push(at);
        at = Object.getPrototypeOf(at);
    }
    return chain;
}

const noFacades: any[] = [];

const worn = new WeakMap<any, any[]>();

function facadesOf(chemical: any): any[] {
    const cls = chemical?.[$type$];
    if (!cls) return noFacades;
    const known = worn.get(cls);
    if (known) return known;
    const declared = templateOf(cls) ?? chemical;
    const found: any[] = [];
    for (const name of Object.getOwnPropertyNames(declared)) {
        if (name.charCodeAt(0) === 36) continue;
        const value = (declared as any)[name];
        const held = typeof value === 'function' ? (value as any).$chemical : undefined;
        if (held) found.push(value);
    }
    worn.set(cls, found);
    return found;
}

const dressed = new WeakMap<any, Map<any, { component: any; chemical: any }>>();

function dress(chemical: any, declared: any): { component: any; chemical: any } {
    let held = dressed.get(chemical);
    if (!held) dressed.set(chemical, held = new Map());
    let made = held.get(declared);
    if (!made) {
        const component = bind(declared.$chemical, chemical) as any;
        made = { component, chemical: component.$chemical };
        held.set(declared, made);
    }
    return made;
}

function catalogueOf(cls: any): any {
    if (Object.prototype.hasOwnProperty.call(cls, $cache$)) return cls[$cache$];
    const held = $subject(`$Formula.${cls?.name ?? 'anonymous'}`);
    Object.defineProperty(cls, $cache$, { value: held, configurable: true });
    return held;
}

function seed(cls: any): void {
    for (const ancestor of branch(cls).slice(1).reverse()) {
        if (seeding.has(ancestor)) continue;
        if (Object.prototype.hasOwnProperty.call(ancestor, $$template$$)) continue;
        seeding.add(ancestor);
        try { new ancestor(); } finally { seeding.delete(ancestor); }
    }
}

function said(node: unknown): string {
    if (node == null || node === true || node === false) return '';
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(said).join('');
    const props = (node as any)?.props;
    return props && 'children' in props ? said(props.children) : '';
}

function missing(formula: any, asked: string, names: string[]): string {
    const whose = formula[$type$]?.name ?? 'a formula';
    return `${whose} stands for nothing called ${JSON.stringify(asked)} — it stands for ${names.join(', ')}.`;
}

export class $Chemical extends $Particle {
    resolve = true;
    formula = false;
    strict = true;
    names?: string[];
    $pid?: string;
    protected _persist = false;

    get persist(): boolean { return this._persist; }
    set persist(persist: boolean) {
        if (this._persist && !persist) hydration.clear(this);
        this._persist = persist;
        if (persist) {
            if (!(this as any)[$formed$]) {
                (this as any)[$formed$] = true;
                const was = (this as any)[$rendering$];
                (this as any)[$rendering$] = true;
                try { hydration.overwrite(this); } finally { (this as any)[$rendering$] = was; }
            }
            hydration.changed(this);
        }
    }

    get [$cache$]() { return catalogueOf((this as any)[$type$]); }

    [$keyOf$](written: unknown): string | undefined {
        const read = said(written).trim();
        return read === '' ? undefined : read;
    }

    protected [cache](key?: string): void {
        const chain = branch((this as any)[$type$]);
        const ref = key === undefined ? standing : { $ref: key };
        if (key !== undefined) (this.names ??= []).push(key);
        Object.defineProperty(this, $isTemplate$, { value: true, configurable: true });
        for (const cls of chain) {
            const held = catalogueOf(cls);
            if (held.$find(ref) !== undefined) continue;
            held.$index(ref, this);
            if (key === undefined) continue;
            const names: string[] = held.$find(kept) ?? [];
            names.push(key);
            held.$index(kept, names);
        }
    }

    [$formula$](element: React.ReactElement, asker?: any): any {
        if (!this.formula || !this.resolve) return undefined;
        seed((this as any)[$type$]);
        const key = (this as any)[$keyOf$]((element.props as any)?.children);
        if (key === undefined) return undefined;
        const held = catalogueOf((this as any)[$type$]);
        const found = held.$find({ $ref: key }) ?? held.$find(standing);
        if (found) {
            const component = found[$resolveComponent$]();
            return asker ? withAsker(asker, () => $(component)) : component;
        }
        const names: string[] = held.$find(kept) ?? [];
        if (names.length === 0 || !this.strict) return undefined;
        throw new Error(missing(this, key, names));
    }
    [$remove$] = false;

    $facade?: any;
    [$facade$]?: $Chemical;
    [$facades$]() { return facadesOf(this); }
    [$synthesis$]!: $Synthesis<any>;
    [$lastProps$]: any;

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

    declare [children]: ReactNode;

    get parent(): $Chemical | undefined { return this[$parent$]; }
    set parent(parent: $Chemical) { this[$parent$] = parent; }

    [$resolveComponent$](): Component<any> {
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
        return this[$children$];
    }

    override frame(): ReactNode {
        if (this[$isTemplate$]) return super.frame();
        const wearing = this.$facade === null ? noFacades
            : this.$facade ? [this.$facade] : facadesOf(this);
        if (wearing.length === 0) return super.frame();
        let out: ReactNode = super.frame();
        const outermost = dress(this, wearing[0]);
        for (let at = wearing.length - 1; at >= 0; at--) {
            const held = at === 0 ? outermost : dress(this, wearing[at]);
            const carries = at === 0 ? { of: this, on: this.$on, children: out } : { of: this, children: out };
            out = React.createElement(held.component, carries as any);
        }
        this[$facade$] = outermost.chemical;
        return out;
    }

    protected [$bond$]() {
        this[$molecule$].reactivate();
        this[$synthesis$].bond({ children: this[$children$] });
        this[$molecule$].reactivate();
    }

    [$props$](): any {
        const $this = this as any;
        const props: Record<string, any> = this[$children$] ?
            { key: this[$symbol$], children: this[$children$] } :
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
        if (Object.prototype.hasOwnProperty.call(this, $registry$)) (this as any)[$registry$]?.$deref?.();
        this[$destroyed$] = true;
    }

    private assertViewConstructors(prototype?: any) {
        if (!prototype) prototype = Object.getPrototypeOf(this[$template$]);
        if (!prototype || prototype === $Chemical.prototype) return;
        const className = prototype.constructor.name;
        const thisConstructor = prototype[className];
        if (thisConstructor && typeof thisConstructor !== 'function')
            throw new Error(`The ${className} class has property ${className} but it's not a function`);
        this.assertViewConstructors(Object.getPrototypeOf(prototype));
    }
}

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
    Object.defineProperty(component, '$', { get: () => child, configurable: true });
    child[$component$] = component;
    return component;
}

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

const $inlineTypes = new Set<string>([
    'a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'code', 'data', 'dfn', 'em', 'i',
    'kbd', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup',
    'time', 'u', 'var', 'wbr']);

export class $Html$<T extends $HtmlTag = any> extends $Chemical {
    get type() { return this._type; }
    protected _type: T;

    constructor(type: T) {
        super();
        this._type = type;
        this.inline = $inlineTypes.has(type as string);
    }

    view(): ReactNode {
        return React.createElement(this._type as any, (this as any)[$props$]());
    }
}

export class $Block extends $Html$<'block'> {
    $elements?: $Written[];
    get elements(): $Written[] { return this.$elements ?? []; }
    get length(): number { return this.elements.length; }

    constructor() {
        super('block');
    }

    [Symbol.iterator](): IterableIterator<$Written> {
        return this.elements[Symbol.iterator]();
    }

    where(match: (piece: $Written, at: number) => boolean): $Block {
        return block(this.elements.filter(match));
    }

    select(pick: (piece: $Written, at: number) => $Written): $Block {
        return block(this.elements.map(pick));
    }

    selectMany(pick: (piece: $Written, at: number) => $Written[]): $Block {
        return block(this.elements.flatMap(pick));
    }

    single(match: (piece: $Written, at: number) => boolean): $Written {
        const found = this.elements.filter(match);
        if (found.length !== 1)
            throw new Error(`single expected exactly one piece of the block and found ${found.length}.`);
        return found[0];
    }

    override view(): ReactNode {
        return this.elements.map((piece, at) =>
            typeof piece === 'object' ? React.createElement($(piece) as any, { key: at }) : piece);
    }
}

export type $Written = string | number | $Chemical;

function block(elements: $Written[]): $Block {
    const made = new $Block();
    made.$elements = elements;
    return made;
}

function htmlFor(type: string): $Html$ {
    return type === 'block' ? new $Block() : new $Html$(type as any);
}

export class $Include extends $Chemical {
    view(): ReactNode {
        return this[$children$];
    }
}

export function $wrap<P>(Component: React.FC<P>): any {
    if (typeof Component !== "function")
        throw new Error(`Expected a function component, got ${Component}`);
    return new $Function$(Component);
}

const $written$ = Symbol('$Chemistry.written');

class $Eval extends $Chemical {
    result: any;
    parentFor?: $Chemical;
    $Eval(...parts: any[]) { this.result = parts.length === 1 ? parts[0] : parts; }
    view(): ReactNode { return null; }
}

function evalElement(element: React.ReactElement, parent?: $Chemical, written?: any[]): any {
    const host = new $Eval();
    host.parentFor = parent;
    const described = written?.length
        ? { ...element, props: { ...(element.props as object), [$written$]: written } } as React.ReactElement
        : element;
    (host as any)[$synthesis$].bond({ children: described });
    return host.result;
}

export interface $Narrowing {
    reach?: 'self' | 'progeny';
    asker?: abstract new (...args: any[]) => any;
}

interface $Chemistry {
    <T = any>(element: React.ReactElement, ...written: (string | number | $Chemical)[]): T;
    (props: { children?: ReactNode; key?: any }): ReactNode;
    <T extends $Chemical>(chemical: T): $Component<T>;
    <T extends $Particle>(particle: T): $Element<T>;
    <T extends $Chemical>(klass: new () => T): Component<T>;
    <T extends $Particle>(klass: new () => T): Element<T>;
    <T extends $Chemical, A extends any[]>(klass: new (...args: A) => T): (...args: A) => Component<T>;
    <T extends $Particle, A extends any[]>(klass: new (...args: A) => T): (...args: A) => Element<T>;
    <T extends $Particle>(representative: $Chemistry, component: Component<T>): Component<T>;
    <T extends $Particle>(representative: $Chemistry, element: Element<T>): Element<T>;
    <T extends $Particle>(component: Component<T>): Component<T>;
    <T extends $Particle>(element: Element<T>): Element<T>;
    <P>(fc: React.FC<P>): Component<any>;
    <T extends $Particle>(component: Component<T> | Element<T>, representative: $Chemistry): T;
    <A extends $Particle, B extends $Particle>(
        scope: Component<A> | Element<A>,
        requested: Component<B> | Element<B>
    ): (replacement: Component<B> | Element<B>, options?: $Narrowing) => Component<B> | Element<B>;
    (scope: Component<any> | Element<any> | React.FC<any>, requested: React.FC<any>):
        (replacement: React.FC<any> | Component<any> | Element<any>, options?: $Narrowing) => any;
    <K extends keyof JSX.IntrinsicElements>(tag: K): Component<$Html$<K>>;
    <K extends keyof JSX.IntrinsicElements>(tag: K, override: any): any;
    (pid: string): any;
}

const $catalogue = new Map<string, any>();

function derivedFrom(chemical: any): any {
    const proto = Object.getPrototypeOf(chemical);
    if (!proto || Object.prototype.hasOwnProperty.call(proto, 'constructor')) return undefined;
    return proto;
}

const $wrappers = new WeakMap<Function, any>();

function wrapped(fn: any): any {
    if (!fn || typeof fn !== 'function') return fn;
    if (fn.$chemical) return fn;
    if (typeof fn.prototype?.view === 'function') return fn;
    let made = $wrappers.get(fn);
    if (!made) {
        made = ($wrap(fn) as any)[$resolveComponent$]();
        $wrappers.set(fn, made);
    }
    return made;
}

function reference(component: any): any {
    if (!component[$reference$])
        component[$reference$] = { $ref: `$Chemistry.component[${$Particle[$$getNextCid$$]()}]` };
    return component[$reference$];
}

function registry(chemical: any): any {
    if (Object.prototype.hasOwnProperty.call(chemical, $registry$)) return chemical[$registry$];
    const from = derivedFrom(chemical);
    const held = from ? registry(from).$new() : $subject(String(chemical[$symbol$]));
    Object.defineProperty(chemical, $registry$, { value: held, configurable: true });
    return held;
}

function entriesOf(held: any, key: any, own: boolean): any[] {
    const record = held?.$find(key);
    if (!record) return [];
    if (own && record.owner !== held) return [];
    return record.entries;
}

function chosen(entries: any[], asker: any, depth: number): any {
    let best: any;
    let rank = -1;
    for (const entry of entries) {
        if (entry.reach === 'self' && depth > 0) continue;
        if (entry.asker && !(asker instanceof entry.asker)) continue;
        const score = (entry.asker ? 2 : 0) + (entry.reach === 'self' ? 1 : 0);
        if (score >= rank) { rank = score; best = entry; }
    }
    return best?.replacement;
}

function registered(chemical: any, key: any, asker: any, depth: number): any {
    const own = chosen(entriesOf(chemical[$registry$], key, false), asker, depth);
    if (own !== undefined) return own;
    let cls = Object.getPrototypeOf(chemical[$type$]);
    while (cls && cls.name) {
        const template = cls[$$template$$];
        const found = chosen(entriesOf(template?.[$registry$], key, false), asker, depth);
        if (found !== undefined) return found;
        cls = Object.getPrototypeOf(cls);
    }
    return undefined;
}

function askedFor(component: any): any {
    const asker = currentAsker();
    if (!asker) return component;
    const key = component[$reference$];
    if (!key) return component;
    let chemical: any = asker;
    let depth = 0;
    const seen = new Set<any>();
    while (chemical && !seen.has(chemical)) {
        seen.add(chemical);
        const found = registered(chemical, key, asker, depth);
        if (found !== undefined) return found;
        const up = chemical[$parent$];
        chemical = up === chemical ? undefined : up;
        depth++;
    }
    return component;
}

function configuring(act: string) {
    if (!drawing()) return;
    const asker = currentAsker();
    const name = asker?.[$type$]?.name || 'a chemical';
    throw new Error(
        `\n$Chemistry: ${act} during a render.\n\n` +
        `  ${name} was being drawn when this ran.\n` +
        `  Configuration belongs before anything renders — in a configuration\n` +
        `  module, not inside a view, a bond constructor or a handler.\n`
    );
}

function registrar(scope: any, requested: any) {
    return (replacement: any, options?: { reach?: 'self' | 'progeny'; asker?: any }) => {
        configuring('a registration arrived');
        const held = registry(scope.$chemical);
        const key = reference(wrapped(requested));
        replacement = wrapped(replacement);
        const entries = entriesOf(held, key, true).slice();
        entries.push({ replacement, reach: options?.reach ?? 'progeny', asker: options?.asker });
        held.$index(key, { owner: held, entries });
        return replacement;
    };
}

function derive(component: any): any {
    configuring('a scope was created');
    const from = component.$chemical;
    registry(from);
    const child = Object.create(from);
    child[$cid$] = $Particle[$$getNextCid$$]();
    child[$symbol$] = $Particle[$$createSymbol$$](child);
    child[$template$] = child;
    child[$molecule$] = new $Molecule(child);
    child[$synthesis$] = new $Synthesis(child);
    child[$phases$] = new Map($phaseOrder.map(p => [p, []]));
    child[$phase$] = 'setup';
    child[$$parent$$] = child;
    child[$catalyst$] = child;
    child[$reaction$] = new $Reaction(child);
    const derived = $lift(child, undefined, true) as any;
    derived.$bind = (p?: $Chemical) => bind(child, p);
    child[$component$] = derived;
    return derived;
}

class $Chemistry$ extends $Chemical {
    view(arg?: any): any {
        if (arg === ($ as any)) return derive(arguments[1]);

        if (arg == null ||
            (Object.getPrototypeOf(arg) === Object.prototype &&
            (Object.keys(arg).length === 0 || 'children' in arg))
        ) {
            const children = React.Children.toArray(arg?.children);
            return React.createElement(React.Fragment, null,
                ...children.map((child, i) => {
                    if (React.isValidElement(child)) {
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

        if (React.isValidElement(arg)) {
            const written = Array.prototype.slice.call(arguments, 1);
            const asker = currentAsker();
            return evalElement(arg as React.ReactElement, asker instanceof $Chemical ? asker : undefined, written);
        }

        if (isParticle(arg)) {
            const inst = arg as any;
            if (Object.prototype.hasOwnProperty.call(inst, $lifted$)) return inst[$lifted$];
            return inst[$lifted$] = $lift(arg);
        }

        if (typeof arg === 'function' && !(arg as any).$chemical && typeof (arg as any).prototype?.view !== 'function') {
            arg = wrapped(arg);
        }

        if (typeof arg === 'function' && (arg as any).$chemical) {
            const second = arguments[1];
            if (second === undefined) return askedFor(arg);
            if (second === ($ as any)) return (arg as any).$chemical;
            return registrar(arg, second);
        }

        if (typeof arg === 'string') {
            const override = arguments[1];
            if (override !== undefined) {
                $catalogue.set(arg, override);
                return override;
            }
            const recalled = hydration.recollect(arg);
            if (recalled !== undefined) return recalled;
            if (!/^[a-z][a-z0-9-]*$/.test(arg)) return undefined;
            let cached = $catalogue.get(arg);
            if (!cached) {
                cached = htmlFor(arg)[$resolveComponent$]();
                $catalogue.set(arg, cached);
            }
            return cached;
        }

        if (typeof arg === 'function') {
            const cls = arg as any;
            if (cls.length === 0) {
                let template = cls[$$template$$];
                if (!template || !(template instanceof cls)) {
                    new cls();
                    template = cls[$$template$$];
                }
                return template[$resolveComponent$]();
            }
            return (...args: any[]) => new cls(...args)[$resolveComponent$]();
        }

        return null;
    }
}

export const $ = new $Chemistry$().view as any as $Chemistry;

asking((component: any) => ($ as any)(component));
