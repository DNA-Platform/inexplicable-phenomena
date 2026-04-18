// counter.tsx — .Component hoists a particle into a React component
//
// Demonstrates: .Component as a property accessor, mutable state on the object,
// the Component membrane ($Counter → Counter).
//
// $Counter is a $Chemical with internal state (count) and a $label prop.
// .Component returns a React component function from the particle.
// The consumer writes <Counter label="Score" /> — no $ anywhere.

import React from 'react';
import { $Chemical } from '@dna-platform/chemistry';

export class $Counter extends $Chemical {
    count = 0;
    $label = 'Count';
    increment() { this.count++; }
    view() {
        return (
            <div>
                <span>{this.$label}: {this.count}</span>
                <button onClick={() => this.increment()}>+</button>
            </div>
        );
    }
}

export const Counter = new $Counter().Component;
