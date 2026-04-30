// counter.tsx — a chemical with reactive state, exported via $()
//
// Demonstrates: declaring a chemical, reactive `$`-prefixed property,
// method binding (onClick={this.increment} works without bind()),
// and the canonical export form `export const Counter = $($Counter)`.

import React from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';

class $Counter extends $Chemical {
    $count = 0;
    $label = 'Count';
    increment() { this.$count++; }
    view() {
        return (
            <div>
                <span>{this.$label}: {this.$count}</span>
                <button onClick={this.increment}>+</button>
            </div>
        );
    }
}

export const Counter = $($Counter);
