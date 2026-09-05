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
    $registry$, $reference$, $cache$, $formula$, $keyOf$, $isFormulaBase$, $facade$, $facades$, cache, children, resolved, $formed$, framework
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

    // A class names its bond constructor after itself, and the RUNTIME class
    // name cannot be trusted to find it. A decorator on any member makes the
    // emit wrap the class and rename its binding — `$Writing` becomes
    // `_$Writing` — while the method keeps the name it was written with. The
    // lookup then missed, no bond constructor was found, and a chemical
    // silently stopped grouping its own prose into a block.
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

    // What a name was written as, with a build's decoration taken off: esbuild
    // prefixes an underscore and suffixes a digit when it has to rename.
    private static authored(name: string): string {
        return name.replace(/^_+/, '').replace(/\d+$/, '');
    }

    // The wrapper sits on the prototype: `super.$Ancestor()` resolves there and never sees an instance property.
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
        // The wrapper HOLDS what it wraps rather than a flag. Its own signature
        // is `(...args)`, and parseBondConstructor reads a signature to learn
        // how many arguments a bond takes — so a synthesis built after a class
        // was watched would have read the wrapper's shape instead of the one
        // that was written.
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

        // Props are construction, not mutation. A chemical written inside
        // another chemical's writing is BUILT during that chemical's render and
        // handed its props here; recording those writes as changes marks the
        // running scope dirty, so the render runs again, the child is built
        // again, and nothing settles — the host loops and the child never
        // renders once. The rendering flag is the framework's own way of saying
        // "this write is not news", raised for exactly the assignment.
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

        // WRITTEN ARGUMENTS REPLACE CHILDREN. A bond constructor can be handed
        // what it composes directly — prose, numbers and chemicals already
        // built — without any of it having to survive React's own child
        // handling, which refuses an instance outright.
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
                // Children unchanged — skip bond constructor
            } else {
                this._lastBondArgs = $Synthesis.snapshotArgs(newArgs);
                $paramValidation.reset();
                $paramValidation.chemical = this._chemical;
                $paramValidation.count = this._parameters.length;
                let bondResult: any;
                const watch = this.watchChain();
                // A CHEMICAL'S OWN CONSTRUCTION IS NOT NEWS. Applying props is
                // already wrapped this way; the bond constructor was not, so a
                // field written here woke the composition tree and re-ran the
                // very bond that wrote it. Writes to OTHER chemicals still react.
                const bonding = c[$rendering$];
                c[$rendering$] = true;
                try {
                if (!dev && $exceptions.mode === 'throw') {
                    try {
                        // The asker is raised HERE, at the invocation, not only in
                        // $lift's wrapper — the eval path reaches this without $lift,
                        // and a bond constructor is user code of this chemical.
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

    // AUDIT: brittle — regex-parses the bond constructor's source string to
    // discover parameter shape (spread vs. positional). Breaks under arrow-
    // function ctors, default values, destructured params, multiline params,
    // and TypeScript-emitted `__decorate` wrappers. A more robust approach:
    // Function.prototype.length for arity + an explicit `@spread` decorator
    // for spread params. See caveat: bond-ctor-source-parsing (TBD).
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

    // Is this child inline (flows within a text block)? Read from the type: a tag in
    // the inline set, or a chemical whose template declares itself inline. Raw text
    // and numbers are inline. This is the only signal grouping has at runtime.
    private isInline(child: any): boolean {
        if (child == null || typeof child === 'boolean') return false;
        if (typeof child === 'string' || typeof child === 'number') return true;
        // An already-built chemical answers for itself.
        if (child instanceof $Chemical) return child.inline;
        if (!React.isValidElement(child)) return false;
        const type = (child as any).type;
        if (typeof type === 'string') return $inlineTypes.has(type);
        if (typeof type === 'function') return !!(type as any).$chemical?.inline;
        return false;
    }

    // Each maximal run of consecutive inline children becomes one <block>; block
    // children pass through. A lone inline still gets its block. No-op if nothing
    // is inline, so block-only bond constructors are untouched.
    private groupInline(childArray: any[]): any[] {
        if (!childArray.some(c => this.isInline(c))) return childArray;
        const out: any[] = [];
        let run: any[] = [];
        const flush = () => {
            if (!run.length) return;
            // Lift each inline node to an instance, once — parented to the chemical whose
            // bond is interpreting it: an element in a block reaches outside the block.
            // $BLOCK TAKES THEM AS THEY ARE: a raw string, a raw number, and a
            // chemical — in written order. Wrapping the raw ones is what made
            // prose indistinguishable from a written element.
            // $Block takes them as they are: a raw string, a raw number, and a
            // chemical — a built one whole, because rebuilding it would re-run
            // its bond constructor with nothing and empty it.
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

    // React refuses a chemical as a child — `Children.toArray` throws on any
    // object that is not an element. Written arguments are flattened here
    // instead, keeping an already-built chemical whole. The JSX path is
    // untouched and still goes through React exactly as it did.
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
        // Grouping runs only inside a bond constructor's own child interpretation —
        // which also keeps a block's run and a tag's text from being re-grouped.
        const raw = written ? this.flatten(children) : React.Children.toArray(children);
        const grouping = this._bondConstructor && !(this._chemical instanceof $Eval);
        const childArray = grouping ? this.groupInline(raw) : raw;
        context.singleton = !Array.isArray(children) && childArray.length === 1;
        const parent = (this._chemical instanceof $Eval && this._chemical.parentFor) || this._chemical;
        let ctx = context;
        // Same-type siblings need keys only where the AUTHOR is building the
        // list — a `.map()` inside view(). Children the bond constructor
        // interprets are keyed by chemistry itself, from the chemical's own
        // identity, and their order is preserved by the bond; asking an author
        // to key those is asking for what the framework already supplies.
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

// ===========================================================================
// $ParamValidation — runtime parameter type checking
// ===========================================================================

export class $ParamValidation {
    index = 0;
    count = -1;
    types: string[] = [];
    errors: string[] = [];
    // Why the INSTANCE is not valid, stated by the classes themselves as the
    // bond constructor runs. A parameter mismatch and a validity failure are
    // collected in one place and raised once, so a reader can see whether they
    // are related rather than learning one and then the other.
    reasons: string[] = [];
    chemical: $Chemical | null = null;
    validated = false;

    reason(text: string) {
        this.reasons.push(text);
    }

    // IS A BOND IN FLIGHT. Set when one starts, cleared when it ends, so a reason
    // knows whether anybody is listening for it.
    get bonding(): boolean {
        return this.chemical !== null;
    }

    // A REASON STATED OUTSIDE A BOND IS RAISED WHERE IT IS STATED. Inside one it is
    // collected, because a bond that raised on the first reason could never build an
    // INVALID PART — and an invalid part is still a part, carrying its failure where
    // it stands, rather than absent. Outside a bond nobody is collecting: the reason
    // used to sit in this object until the next reset() discarded it, unheard.
    raise(text: string) {
        this.reason(text);
        if (!this.bonding) throw new Error(text);
    }

    check<T>(arg: T, ...types: $ParameterType[]): T {
        const paramNumber = this.index++;
        // An empty inline run produces no block. A 'block' parameter materializes an
        // empty $Html<'block'> so callers can write $check(x, 'block') without a null
        // guard — the block is simply empty, and renders nothing.
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
        // Nothing to say yet — and NOT marked done, because a class states its
        // validity reasons after the parameters have already been checked.
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
        // Both kinds, in one raise, so a reader can see whether they are related.
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

// MAKING ONE IS ASKING FOR ONE THAT IS NOT THERE. '!' as the last argument says
// the caller wants an instance rather than a refusal: $check(Kind, '!') makes one,
// and $check(held, Kind, '!') keeps what was handed in when it fits and makes one
// when it does not. It is built through $, so the scope answers with whatever it
// has registered for that kind — the same door $(<Kind />) goes through, with the
// fetch and the evaluation in one call so neither can be forgotten. This
// generalizes what a 'block' already does: materialize when asked, rather than raise.
export function $check<T>(kind: Component<T> | (new () => T), made: '!'): T;
export function $check<T>(arg: unknown, kind: Component<T> | (new () => T), made: '!'): T;
export function $check<T>(arg: T, ...types: $ParameterType[]): T;
export function $check(held: boolean, reason: string): boolean;

export function $check(arg: any, ...rest: any[]): any {
    if (typeof arg === 'boolean' && rest.length === 1 && typeof rest[0] === 'string') {
        if (!arg) $paramValidation.raise(rest[0]);
        return arg;
    }
    if (rest[rest.length - 1] === '!') {
        const types = rest.slice(0, -1);
        const kind = types.length === 0 ? arg
            : arg === undefined || !types.some(type => $ParamValidation.validateArgument(arg, type)) ? types[0]
            : undefined;
        if (kind === undefined) return $paramValidation.check(arg, ...types);
        return $(React.createElement($(kind) as any));
    }
    return $paramValidation.check(arg, ...rest);
}

export function $is<T>(ctor: abstract new (...args: any[]) => T): T {
    return ctor as any;
}

// Ask the instance whether it is valid, and let it STATE why while it answers.
// A class that states its reason through $check raises THERE; one that simply
// answers false is given a reason here and raised by evaluate().
function assertValid(chemical: any) {
    if (chemical[$isTemplate$]) return;
    if (typeof chemical.valid === 'function' && !chemical.valid()) {
        if ($paramValidation.reasons.length === 0) {
            $paramValidation.reason(`${chemical.constructor.name} is not valid after its bond constructor.`);
        }
    }
}

// ===========================================================================
// $Chemical
// ===========================================================================

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

// `formula = 'new'` starts a catalogue of its own, so a name filed here never
// reaches the formulas this one inherits from. The declaring class is the one
// whose PARENT does not say it: a class field is initialized on every subclass's
// template too, so the value alone cannot say which class wrote it.
function fresh(cls: any): boolean {
    return templateOf(cls)?.formula === 'new'
        && templateOf(Object.getPrototypeOf(cls))?.formula !== 'new';
}

function branch(cls: any): any[] {
    const chain: any[] = [];
    let at = cls;
    while (at && isFormula(at) && !Object.prototype.hasOwnProperty.call(at, $isFormulaBase$)) {
        chain.push(at);
        if (fresh(at)) break;
        at = Object.getPrototypeOf(at);
    }
    return chain;
}

const noFacades: any[] = [];

// KEPT OFF THE CLASS OBJECT. A lazy stamp on the constructor would pile a symbol
// onto it at first render, which is exactly what the constructor-static
// invariant forbids.
const worn = new WeakMap<any, any[]>();


// A FACADE IS A MEMBER HOLDING A COMPONENT. `facade = Card` says this chemical is
// DRAWN AS a Card; nothing is asked of Card in return. The declaration is read off
// the class, because the walk decides before any instance of it exists.
function facadesOf(chemical: any): any[] {
    const cls = chemical?.[$type$];
    if (!cls) return noFacades;
    const known = worn.get(cls);
    if (known) return known;
    // READ THE TEMPLATE, NEVER THE DERIVATIVE. A per-mount derivative is
    // Object.create(template) and owns almost nothing; the declaration lives on
    // the template, which is the one instance of a class that has its fields.
    const declared = templateOf(cls) ?? chemical;
    const found: any[] = [];
    for (const name of Object.getOwnPropertyNames(declared)) {
        // A $-PREFIXED MEMBER IS A PROP — extrinsic context handed in from
        // outside. An assignment says what this thing IS, so it is never one.
        if (name.charCodeAt(0) === 36) continue;
        const value = (declared as any)[name];
        const held = typeof value === 'function' ? (value as any).$chemical : undefined;
        if (held) found.push(value);
    }
    worn.set(cls, found);
    return found;
}

// ONE FACADE PER CHEMICAL PER DECLARATION, kept rather than remade. It is bound
// to the chemical it stands for, so it is a real part of the graph, and it holds
// that chemical as `of` — which is what makes it addressable in its place.
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
    formula: boolean | 'new' = false;
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
            // MARKED ON THE TEMPLATE, which every derivative reads through. A
            // symbol is never bonded, so this is not a write into somebody
            // else's render.
            found[resolved] = true;
            const component = found[$resolveComponent$]();
            return asker ? withAsker(asker, () => $(component)) : component;
        }
        const names: string[] = held.$find(kept) ?? [];
        if (names.length === 0) return undefined;
        throw new Error(missing(this, key, names));
    }
    [$remove$] = false;

    // WHAT THIS SCOPE ANSWERED. `facade` is what the class declares; `$facade` is
    // what the walk resolved it to where the element was written, and it is a
    // prop for exactly the reason every `$` member is one — it is extrinsic.
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

    // WRAPPING HAPPENS BY INSTANCE, AND frame() IS WHERE A PARTICLE WRAPS WHAT
    // IT DRAWS. A chemical that declares a facade is drawn inside it — here, on
    // the per-mount derivative, so every mount site decides for itself and
    // nothing has to be stamped onto an element.
    //
    // THE FACADE IS HANDED THIS INSTANCE as `of`, and this instance's own
    // drawing as its children — so there is one object, and what the interface
    // reads and writes is what the screen shows. It arrives as an ordinary prop
    // because React's createElement copies its config with for...in, which does
    // not see symbol keys, so the written-arguments channel cannot be reached
    // from here.
    //
    // Nothing re-enters the view, so a stack of facades terminates on its own and
    // every one of them is handed the chemical rather than the one beneath.
    override frame(): ReactNode {
        if (this[$isTemplate$]) return super.frame();
        // What the scope answered stands in for what the class declared.
        // null is the walk saying it is ALREADY inside one; undefined is the walk
        // having nothing to say, so the declaration stands.
        const wearing = this.$facade === null ? noFacades
            : this.$facade ? [this.$facade] : facadesOf(this);
        if (wearing.length === 0) return super.frame();
        let out: ReactNode = super.frame();
        const outermost = dress(this, wearing[0]);
        for (let at = wearing.length - 1; at >= 0; at--) {
            const held = at === 0 ? outermost : dress(this, wearing[at]);
            // AND THE ASSIGNMENT MOVES WITH IT. A facade exists so callers hold IT
            // rather than what it stands for, so the outermost one carries the
            // `on` and assigns itself — which is why nothing downstream needs a
            // case for "unless it wears a facade".
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
                if (framework.has(bond.property)) continue;
                const value = $this[bond.property];
                if (value !== undefined) props[bond.property.slice(1)] = value;
            }
        for (const key of Object.keys($this)) {
            if (seen.has(key)) continue;
            if (!$Reflection.isSpecial(key) || framework.has(key)) continue;
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
        // A scope lets go with the chemical that held it. `$deref` is the only
        // release this design has, and a published component holding its
        // children forever is the leak it exists to prevent.
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
    Object.defineProperty(component, '$', { get: () => child, configurable: true });
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

// The tags that flow inline within a text block. Anything not here is a block.
// Raw strings and numbers flow inline too and are answered directly by isInline —
// $Block takes them as they are, so they are not types.
const $inlineTypes = new Set<string>([
    'a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'code', 'data', 'dfn', 'em', 'i',
    'kbd', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup',
    'time', 'u', 'var', 'wbr']);

// A tag, wrapping its content in the element it names.
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

// $Block — the one content kind, and the only thing a bond constructor is ever
// handed for prose: a maximal run of inline writing gathered into one argument.
//
// A block IS its contents rather than a wrapper around them, which is why it
// draws them directly. It carries what was written AS IT WAS WRITTEN — a raw
// string, a raw number, a chemical whole — because wrapping the raw ones is what
// made prose and a written element indistinguishable downstream.
//
// EVERY READING OF A BLOCK IS A BLOCK, and that is the point of the operator set
// below: a reading can be read again, so a caller composes readings instead of
// falling out into an array on the first one and hand-building a block to get
// back in.
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

    // THE ONE MEMBER THAT ANSWERS A PIECE RATHER THAN A BLOCK, and it is a
    // reading of the instruction rather than the instruction: a block of one and
    // the one are different things, and a caller who wanted the block wrote
    // `where`. Reversible in a line if the reading is wrong.
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

// What a block holds, named once so the union is stated in one place.
export type $Written = string | number | $Chemical;

function block(elements: $Written[]): $Block {
    const made = new $Block();
    made.$elements = elements;
    return made;
}

// The chemical for a tag. `block` is the one kind with behaviour of its own, so
// it is a class rather than a branch inside one.
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

// $Eval — a throwaway host whose bond constructor captures the single child handed
// to it. `$(<Word/>)` runs the real synthesis over the element and takes the
// materialized instance back — reusing process()'s exact dispatch (chemical, HTML,
// function component, text), never a parallel binding path.
// WHAT WAS WRITTEN, handed straight to a bond constructor. It travels as a
// symbol prop so it cannot collide with an author's, and `for...in` does not
// enumerate it, so it is never assigned onto the chemical as one.
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
    // The element keeps its own props; the written arguments ride beside them.
    // NOT cloneElement — it copies props with `for...in`, which does not
    // enumerate a symbol, so the mark was silently dropped.
    const described = written?.length
        ? { ...element, props: { ...(element.props as object), [$written$]: written } } as React.ReactElement
        : element;
    (host as any)[$synthesis$].bond({ children: described });
    return host.result;
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

// What narrows a registration: how far it reaches, and whose asks it answers.
// The plain form is the one that projects downward.
export interface $Narrowing {
    reach?: 'self' | 'progeny';
    asker?: abstract new (...args: any[]) => any;
}

interface $Chemistry {
    // Eval: $(<Word/>) → the live instance. Defaults to `any` — the honest type,
    // since JSX erased the real one and the result lands in an already-typed slot;
    // $<$Word>(<Word/>) narrows it. Must precede the props overload, which an
    // element structurally matches. The optional second argument assigns the
    // evaluated instance's parent — $(<Toc/>, book) adopts it into book's graph.
    // $(<Word/>) evaluates a description into a live instance. The rest of the
    // arguments are handed to its BOND CONSTRUCTOR — `$(<Sentence prop="x"/>,
    // ...written)` keeps its props and composes what it was given, which is how
    // a composition is built from the literal things that were written rather
    // than from their text. The position used to mean a PARENT; it had two
    // callers, both of which say it another way now, and a composition needing
    // its contents is the commoner thing by far.
    <T = any>(element: React.ReactElement, ...written: (string | number | $Chemical)[]): T;
    (props: { children?: ReactNode; key?: any }): ReactNode;
    <T extends $Chemical>(chemical: T): $Component<T>;
    <T extends $Particle>(particle: T): $Element<T>;
    <T extends $Chemical>(klass: new () => T): Component<T>;
    <T extends $Particle>(klass: new () => T): Element<T>;
    <T extends $Chemical, A extends any[]>(klass: new (...args: A) => T): (...args: A) => Component<T>;
    <T extends $Particle, A extends any[]>(klass: new (...args: A) => T): (...args: A) => Element<T>;
    // The representative FIRST — a new component derived from the one given,
    // whose scope falls back to it. `$` cannot be an element, a chemical or a
    // constructor, so this cannot shadow anything above it.
    <T extends $Particle>(representative: $Chemistry, component: Component<T>): Component<T>;
    <T extends $Particle>(representative: $Chemistry, element: Element<T>): Element<T>;
    // Resolve — the component to render HERE. Type-preserving, which is what
    // makes a substitution invisible to the caller and impossible to make with
    // anything that is not a subclass.
    <T extends $Particle>(component: Component<T>): Component<T>;
    <T extends $Particle>(element: Element<T>): Element<T>;
    // A plain function component is wrapped on the way in, memoised, so it can
    // be asked for and stood in for like any other. It carries no chemical of
    // its own, so what comes back is typed loosely — honestly.
    <P>(fc: React.FC<P>): Component<any>;
    // The representative LAST — what stands behind a component. Rare: this is
    // the debugging and test-harness form, and it has no callers in consumer code.
    <T extends $Particle>(component: Component<T> | Element<T>, representative: $Chemistry): T;
    // Register — `$(A,B)(C)` reads "for A, a B is a C". There is no form that
    // registers without naming a scope.
    <A extends $Particle, B extends $Particle>(
        scope: Component<A> | Element<A>,
        requested: Component<B> | Element<B>
    ): (replacement: Component<B> | Element<B>, options?: $Narrowing) => Component<B> | Element<B>;
    // …and the same, for scopes or parts that are plain function components.
    (scope: Component<any> | Element<any> | React.FC<any>, requested: React.FC<any>):
        (replacement: React.FC<any> | Component<any> | Element<any>, options?: $Narrowing) => any;
    // HTML element catalogue — `$('div')` lazily creates a reactive $Html$
    // chemical for the tag, caches its Component, returns it. `$('div', X)`
    // registers `X` as the override for that tag — subsequent lookups
    // return the override.
    <K extends keyof JSX.IntrinsicElements>(tag: K): Component<$Html$<K>>;
    <K extends keyof JSX.IntrinsicElements>(tag: K, override: any): any;
    // Hydration — `$(pid)` answers the LIVE chemical enrolled under that
    // persistence id, or undefined if none is alive. Checked before the HTML
    // catalogue, so a pid that shadows a real tag name wins: name pids like
    // names, not like tags.
    (pid: string): any;
}

// HTML catalogue — lazy registry of Components per tag name. Populated on
// first `$('div')`; overridable via `$('div', CoolDiv)`.
const $catalogue = new Map<string, any>();

// ===========================================================================
// The representative — `$` as an argument, and the scoping it selects.
//
// A component is a scope. What it registers lives on the chemical it wraps,
// in a catalogue, so a per-mount derivative reads its template's through the
// prototype chain and a derived scope's catalogue is the parent's `$new()` —
// which makes falling back the catalogue's own recursive `$find` rather than
// a walk we write. The only walk here is the composition lineage, because
// that one is dynamic.
// ===========================================================================

// The chemical a chemical derived from, or undefined for a template. A class's
// `.prototype` owns `constructor`; a chemical never does.
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

// A scope's entries are stamped with the catalogue that owns them. `$find`
// walks the topics chain, so without the stamp a registration would append to
// what a PARENT answered and copy it down — turning shadowing into merging,
// which is the opposite of what a derived scope promises.
function entriesOf(held: any, key: any, own: boolean): any[] {
    const record = held?.$find(key);
    if (!record) return [];
    if (own && record.owner !== held) return [];
    return record.entries;
}

// More specific wins, and specificity is stated rather than emergent: naming
// who asks beats not naming them, and a narrowed reach beats a projected one.
// Among equals the later registration wins.
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

// One chemical's answer: its own catalogue (which falls through its derivation
// chain by itself), then the class chain — a superclass's template scope, so a
// subclass inherits what was registered for what it extends.
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

// The asker first, then outward through the composition lineage, then the
// argument itself — because the default was never in the catalogue.
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

// Configuration is refused while DRAWING — inside a bond constructor or a
// view. A handler carries an asker so it can resolve, and runs after the
// paint, so it may configure: a scope that changed mid-paint would mean one
// component resolving two ways in a single frame.
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

// `$(A,B)(C)` — for A, a B is a C. `(C, {reach: 'self'})` narrows it to A's
// own asks rather than its progeny; `(C, {asker: $Class})` answers only that
// class's asks. The plain form is the one that projects downward, because the
// alternative would mean naming every class between a book and a sentence.
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

// $($,Component) — a new component derived from the one given, whose scope
// falls back to it. The chemical is derived so it inherits state the same way,
// and made its own template so it still derives per mount.
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

// $Chemistry$ — one class. Its view IS the dispatch. Typed `any` so the runtime
// can be dynamic; call-site types come from `$Chemistry` wrapping `$`.
class $Chemistry$ extends $Chemical {
    view(arg?: any): any {
        // The representative in the FIRST position — `$($,Component)`. `$` is
        // one unmistakable object carrying no `$chemical`, so identity is a
        // discriminator nothing else can satisfy.
        if (arg === ($ as any)) return derive(arguments[1]);

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

        // Eval form — $(<Word>hello</Word>) evaluates a description (an element)
        // into a live instance, through the same synthesis that binds a bond
        // constructor's children. Erased type is $Chemical; $<$Word>(...) narrows.
        // Created in an <X>, a child of X: the asker — raised around the bond
        // constructor, the view, and an augmented handler — is the element `$`
        // is operating in now, and what is evaluated here is parented to it.
        // Outside those windows there is no asker and the instance is a root.
        if (React.isValidElement(arg)) {
            const written = Array.prototype.slice.call(arguments, 1);
            const asker = currentAsker();
            return evalElement(arg as React.ReactElement, asker instanceof $Chemical ? asker : undefined, written);
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

        // A plain function component is still a component: it is a function
        // whose props are its parameters, and it may be side-effecting rather
        // than visual. Wrap it once, memoised, so it can be asked for,
        // registered, and stood in for exactly as any other component is.
        if (typeof arg === 'function' && !(arg as any).$chemical && typeof (arg as any).prototype?.view !== 'function') {
            arg = wrapped(arg);
        }

        // A component was handed in. What comes back depends on the second
        // argument: nothing resolves it in the scope being rendered, the
        // representative answers what stands behind it, and another component
        // opens a registration — `$(A,B)(C)`.
        if (typeof arg === 'function' && (arg as any).$chemical) {
            const second = arguments[1];
            if (second === undefined) return askedFor(arg);
            if (second === ($ as any)) return (arg as any).$chemical;
            return registrar(arg, second);
        }

        // String tag — a pid first, then the HTML catalogue. `$(pid)`
        // answers the live chemical enrolled under that persistence id.
        // `$('div')` looks up (or lazily creates) the cached Component for
        // that tag. `$('div', X)` registers X as the override for that tag.
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

export const $ = new $Chemistry$().view as any as $Chemistry;

// The walk resolves a facade in the scope of whoever wrote the element, and it
// does that through `$` like everything else — handed over here so the walk
// names nothing from this layer.
asking((component: any) => ($ as any)(component));
