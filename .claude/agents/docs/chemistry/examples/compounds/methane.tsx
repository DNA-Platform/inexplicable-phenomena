// $Methane — CH₄
//
// Demonstrates: variadic binding constructor, spread parameters.
//
// Concept: Methane is one carbon bonded to four hydrogens.
// The spread parameter in the binding constructor means
// "any number of hydrogens" — the type system and $check
// enforce that each one is actually a $Hydrogen.
//
// Usage:
//   <Methane>
//     <Carbon />
//     <Hydrogen /><Hydrogen /><Hydrogen /><Hydrogen />
//   </Methane>

import React from 'react';
import { $, $Chemical, $check } from '@dna-platform/chemistry';
import { $Carbon } from '../elements/carbon';
import { $Hydrogen } from '../elements/hydrogen';

class $Methane extends $Chemical {
    carbon!: $Carbon;
    hydrogens: $Hydrogen[] = [];
    $Methane(c: $Carbon, ...hydrogens: $Hydrogen[]) {
        this.carbon = $check(c, $Carbon);
        this.hydrogens = hydrogens.map(h => $check(h, $Hydrogen));
    }
    view() {
        return (
            <div className="compound">
                CH{'\u2084'}
            </div>
        );
    }
}

export const Methane = $($Methane);
