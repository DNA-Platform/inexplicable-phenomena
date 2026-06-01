// $Element — the canonical $Chemical base class for elements
//
// Demonstrates: $Chemical subclass as a base class (intended to be extended,
// not rendered directly), intrinsic vs extrinsic properties, the $ membrane.
//
// $Element does NOT export a Component. It's a base class — its default
// view would render "0 0 0", which isn't useful. Subclasses ($Carbon,
// $Helium, etc.) override the intrinsic properties and export themselves
// as Components via `export const Carbon = $($Carbon)`.
//
// This is the rule for base classes generally: if a chemical is meant to
// be extended rather than rendered directly, do not export a Component
// from its file.

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
