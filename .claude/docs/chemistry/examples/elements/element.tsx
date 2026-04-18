// $Element — the canonical $Chemical
//
// Demonstrates: $Chemical subclass, intrinsic vs extrinsic properties,
// the $ membrane, view as pure TSX.
//
// Concept: A chemical element has intrinsic identity (atomic number,
// symbol, name, mass) and extrinsic context ($highlighted). The $
// prefix marks the boundary. Intrinsic properties are set at construction.
// Extrinsic properties flow in from the consumer via props.

import React from 'react';
import { $Chemical } from '@dna-platform/chemistry';

export class $Element extends $Chemical {
    number = 0;
    symbol = '';
    name = '';
    mass = 0;
    $highlighted = false;
    view() {
        return (
            <div className={this.$highlighted ? 'element highlighted' : 'element'}>
                <span className="number">{this.number}</span>
                <span className="symbol">{this.symbol}</span>
                <span className="name">{this.name}</span>
                <span className="mass">{this.mass}</span>
            </div>
        );
    }
}

export const Element = new $Element().Component;
