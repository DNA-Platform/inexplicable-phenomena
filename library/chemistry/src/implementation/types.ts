import type { JSX, ReactNode } from "react";
import type { $Particle } from "../abstraction/particle";
import type { $Function$, $Html$, $Chemical } from "../abstraction/chemical";

// I<T> — the interface of T: every member declared on T and its prototype
// chain. TypeScript already collapses the chain into the instance type, so
// I<T> is just T. Named separately so intersections like `I<$Error> & I<Error>`
// read as "the union of these two surfaces."
export type I<T> = T;

export type Constructor<Result = any, Parameters extends any[] = any[]> = new (...args: Parameters) => Result;
export type Type<T = any> = Constructor<T> & { name: string };
export type Typeof = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
export type PrimitiveType = typeof String | typeof Number | typeof BigInt | typeof Boolean | typeof Symbol;
export const primitives = new Map<Typeof, PrimitiveType>([['string', String], ['number', Number], ['boolean', Boolean], ['bigint', BigInt], ['symbol', Symbol]] as any);
export const primitiveTypes = new Set<PrimitiveType>([String, Number, Boolean, BigInt, Symbol]);
export type TypeofType = PrimitiveType | typeof Object | typeof Function | null | undefined;
export const typeofTypes = new Set<TypeofType>([String, Number, Boolean, BigInt, Symbol, Object, Function, null, undefined]);


export type $SymbolFeature = 'fast' | 'slow' | 'self-contained' | 'referential';
export type $Phase = 'setup' | 'construction' | 'mount' | 'render' | 'layout' | 'effect' | 'unmount';
export type $Promise<T = any> = Promise<T> & {
    result: T,
    complete: boolean,
    then: <U>(action: (value: T) => U) => $Promise<U>,
    cancel: (action?: () => any) => any
}

export interface $Rep<T = any> {
    $ref: string;
}

export type $Props = {
    [key: string]: any;
    children?: ReactNode;
}

export type $View<T> = ((props?: $Props) => React.ReactNode) & {
    $view: $View<T>;
    $this: T;
};

export type $Properties<T> = {
    [K in keyof T as K extends `$${infer First}${infer Rest}` ?
    (K extends '$parent' ? never :  // Add this check
        First extends Lowercase<First> ?
        (First extends '_' | '$' ? never :
            (K extends keyof $Chemical ? never :
                (T[K] extends Function ? never : `${First}${Rest}`))) : never) : never]?:
    T[K]
} & {
    [K in keyof T as K extends `$${infer First}${infer Rest}` ?
    (K extends '$parent' ? never :  // Add this check
        First extends Lowercase<First> ?
        (First extends '_' | '$' ? never :
            (K extends keyof $Chemical ? never :
                (T[K] extends Function ? `${First}${Rest}` : never))) : never) : never]?:
    T[K]
} & {
    children?: React.ReactNode;
};

export type $MethodComponent<T, M extends (...args: any[]) => any> =
    (props: $Properties<T> & { call: Parameters<M> }) => ReturnType<M>;

// Element<T>, $Element<T>, Component<T>, $Component<T> moved to
// `../abstraction/element.ts`. (Re-exported for convenience.)
export type { Element, $Element, Component, $Component } from "../abstraction/element";

// $Bound<T> — the framework-attached surface a generated Component carries.
// (Placeholder name; final name TBD.)
export interface $Bound<T> {
    get $bound(): boolean;
    get $chemical(): T;
    $?(): import("../abstraction/element").$Component<T>;
    $new(parent: $Chemical): import("../abstraction/element").$Component<T>;
    $bind(parent: $Chemical): import("../abstraction/element").Component<T>;
}

export type $Function<T> = T extends React.FC<infer P>
    ? $Function$<P> & {
        [K in keyof P as K extends 'children' ? never : `$${string & K}`]: P[K];
    }
    : never;

export type $Html<T extends keyof JSX.IntrinsicElements = any> =
    $Html$<T> & {
        [K in keyof JSX.IntrinsicElements[T]as K extends 'children' ? never : `$${string & K}`]?: JSX.IntrinsicElements[T][K];
    }

export interface $Particular<T> {
    view(): ReactNode;
    $view?: import("../abstraction/element").Component<T>;
    $$view?: import("../abstraction/element").$Component<T>;
    frame($this: $Particular<T>): ReactNode;
    $frame?: import("../abstraction/element").Component<T & { $this: $Particular<T> }>;
}

export type $ParameterType =
    | Constructor<$Particle>
    | React.FC
    | Function
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | FunctionConstructor
    | ObjectConstructor
    | null
    | undefined
    | keyof JSX.IntrinsicElements
    | 'any'
    | [$ParameterType]
    | [[$ParameterType]]
    | [[[$ParameterType]]];

export type $Parameter<T = $ParameterType> =
    T extends readonly (infer U)[] ? $Parameter<U>[] :
    T extends Constructor<infer C> ? (C extends $Chemical ? C : never) :
    T extends React.FC<any> ? $Function<T> :
    T extends StringConstructor ? string :
    T extends NumberConstructor ? number :
    T extends BooleanConstructor ? boolean :
    T extends FunctionConstructor ? Function :
    T extends ObjectConstructor ? object :
    T extends keyof JSX.IntrinsicElements ? $Html<T> :
    T extends 'any' ? any :
    T;
