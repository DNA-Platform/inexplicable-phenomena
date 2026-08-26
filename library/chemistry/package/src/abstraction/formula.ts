import type { ReactNode } from 'react';
import { $Chemical } from './chemical';
import { $isFormulaBase$ } from '../implementation/symbols';

export class $Formula extends $Chemical {
    override get formula(): boolean { return true; }

    override view(): ReactNode {
        return this.children ?? null;
    }
}

Object.defineProperty($Formula, $isFormulaBase$, { value: true });
