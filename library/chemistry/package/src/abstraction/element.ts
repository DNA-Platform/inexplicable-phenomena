import type React from "react";
import type { ReactNode } from "react";
import type { $Properties, $Bound } from "../implementation/types";

export type Element<T = any> = React.FC<Omit<$Properties<T>, 'children'>> & $Bound<T>;
export type $Element<T = any> = React.FC<Omit<$Properties<T>, 'children'>> & $Bound<T>;

export type Component<T = any> = React.FC<$Properties<T>> & $Bound<T>;
export type $Component<T = any> = React.FC<$Properties<T>> & $Bound<T>;
