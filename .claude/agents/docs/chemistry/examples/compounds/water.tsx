// $Water — H₂O
//
// Demonstrates: binding constructor, typed children, $check.
//
// Concept: Water is a chemical. Two hydrogens bond to one oxygen.
// The binding constructor IS the molecular formula — its signature
// says H₂O in TypeScript. $check enforces the same at runtime.
// There is no $Compound base class. A chemical with bonds is a
// compound. That's what $Chemical means.
//
// Usage:
//   <Water>
//     <Hydrogen />
//     <Hydrogen />
//     <Oxygen />
//   </Water>

import React from 'react';
import { $, $Chemical, $check } from '@dna-platform/chemistry';
import { $Hydrogen } from '../elements/hydrogen';
import { $Oxygen } from '../elements/oxygen';

class $Water extends $Chemical {
    hydrogen: [$Hydrogen, $Hydrogen] = [undefined!, undefined!];
    oxygen!: $Oxygen;
    $Water(h1: $Hydrogen, h2: $Hydrogen, o: $Oxygen) {
        this.hydrogen = [$check(h1, $Hydrogen), $check(h2, $Hydrogen)];
        this.oxygen = $check(o, $Oxygen);
    }
    view() {
        return (
            <div className="compound">
                H{'\u2082'}O
            </div>
        );
    }
}

export const Water = $($Water);
