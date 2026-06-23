import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

class $Element extends $Chemical {
    number = 0;
    symbol = '';
    name = '';
    mass = 0;
    view() {
        return (
            <span data-number={this.number} data-symbol={this.symbol}>
                {this.symbol}
            </span>
        );
    }
}

class $Hydrogen extends $Element {
    number = 1; symbol = 'H'; name = 'Hydrogen'; mass = 1.008;
}

class $Oxygen extends $Element {
    number = 8; symbol = 'O'; name = 'Oxygen'; mass = 15.999;
}

describe('Smoke: $Chemistry renders through React', () => {
    it('renders hydrogen', () => {
        const Hydrogen = $($Hydrogen);
        const { container } = render(<Hydrogen />);
        const span = container.querySelector('span');
        expect(span).not.toBeNull();
        expect(span!.textContent).toBe('H');
        expect(span!.dataset.number).toBe('1');
    });

    it('renders oxygen', () => {
        const Oxygen = $($Oxygen);
        const { container } = render(<Oxygen />);
        const span = container.querySelector('span');
        expect(span).not.toBeNull();
        expect(span!.textContent).toBe('O');
    });
});
