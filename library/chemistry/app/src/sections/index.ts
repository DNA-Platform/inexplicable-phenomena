import type { ComponentType } from 'react';
import { sectionData as iI1 } from './II-1-the-class';
import { sectionData as iI4 } from './II-4-the-lifecycle';
import { sectionData as iI5 } from './II-5-particularization';
import { sectionData as iII3 } from './III-3-binding-constructor';
import { sectionData as v1 } from './V-1-reactive-properties';
import { sectionData as v3 } from './V-3-cross-chemical-writes';
import { sectionData as v4 } from './V-4-collection-mutation';
import { sectionData as vi1 } from './VI-1-per-mount-derivatives';
import { sectionData as todo } from './todo-app';
import { sectionData as nested } from './nested-composition';
import { sectionData as form } from './form-validation';
import { sectionData as notif } from './notifications';
import { sectionData as stress } from './stress-test';
import { sectionData as mount } from './conditional-mount';
import { sectionData as propPass } from './prop-pass-chemical-as-prop';
import { sectionData as dynamic } from './dynamic-creation';
import { sectionData as rekey } from './rekey-list-reorder';
import { sectionData as propchange } from './propchange-over-time';
import { sectionData as asyncBind } from './async-bind-method';
import { sectionData as deepNest } from './deep-nest-propagation';
import { sectionData as errorRecover } from './error-recover-view';
import { sectionData as condSwap } from './cond-swap-components';
import { sectionData as methodFc } from './method-fc-passthrough';
import { sectionData as polyCards } from './polymorphism-cards';
import { sectionData as override } from './override-behavior';
import { sectionData as evolve } from './evolve-component';
import { sectionData as dashWidgets } from './dashboard-widgets';
import { sectionData as polyForm } from './poly-form-section';
import { sectionData as tabs } from './tabs-section';
import { sectionData as formLifecycle } from './form-lifecycle-section';
import { sectionData as dynamicNest } from './dynamic-nest-section';

export type SectionModule = {
    id: string;
    cases: number;
    Component: ComponentType;
};

const modules: SectionModule[] = [
    iI1,
    iI4,
    iI5,
    iII3,
    v1,
    v3,
    v4,
    vi1,
    todo,
    nested,
    form,
    notif,
    stress,
    mount,
    propPass,
    dynamic,
    rekey,
    propchange,
    asyncBind,
    deepNest,
    errorRecover,
    condSwap,
    methodFc,
    polyCards,
    override,
    evolve,
    dashWidgets,
    polyForm,
    tabs,
    formLifecycle,
    dynamicNest,
];

export const sectionModules: Record<string, SectionModule> = Object.fromEntries(
    modules.map(m => [m.id, m]),
);
