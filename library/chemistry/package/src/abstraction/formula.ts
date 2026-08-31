import type { ReactNode } from 'react';
import { $Chemical } from './chemical';
import { $children$, $isFormulaBase$ } from '../implementation/symbols';

export class $Formula extends $Chemical {
    override formula = true;

    override view(): ReactNode {
        return this[$children$] ?? null;
    }
}

Object.defineProperty($Formula, $isFormulaBase$, { value: true });
