import type React from "react";
import type { ReactNode } from "react";
import type { $Properties, $$Properties, $Bound } from "../implementation/types";

// ===========================================================================
// The four React-FC types — where Chemistry meets React.
//
// Public, JSX-mountable forms (unprefixed):
//   Element<T>   — particle leaf. Self-closing JSX. No children prop.
//   Component<T> — chemical container. Has optional children prop.
//
// Framework-decorated, all-optional-props forms (returned by `$(x)`):
//   $Element<T>   — what `$(particle)` returns.
//   $Component<T> — what `$(chemical)` returns.
//
// `Component<T>` is `Element<T> & { children?: ReactNode }`.
// (And yes, this file lives in abstraction/ on purpose. Element.)
// ===========================================================================

export type Element<T = any> = React.FC<Omit<$Properties<T>, 'children'>> & $Bound<T>;
export type $Element<T = any> = React.FC<Omit<$$Properties<T>, 'children'>> & $Bound<T>;

export type Component<T = any> = React.FC<$Properties<T>> & $Bound<T>;
export type $Component<T = any> = React.FC<$$Properties<T>> & $Bound<T>;
