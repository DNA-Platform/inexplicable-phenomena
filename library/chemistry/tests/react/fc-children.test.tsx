import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('Bug: FC children inside a chemical without a bond constructor', () => {
    // Sprint 32 bug C3: a chemical that takes children (no bond ctor)
    // should render plain function component children without crashing.
    // Currently crashes at synthesis (chemical.ts:268) because $wrap(fn)
    // produces a component without the expected .$Component property.
    it('chemical renders FC child via {this.children}', () => {
        function HelloFC() {
            return <span className="fc">hello from FC</span>;
        }

        class $Container extends $Chemical {
            view() {
                return <div className="container">{this.children}</div>;
            }
        }
        const Container = $($Container);
        const { container } = render(
            <Container>
                <HelloFC />
            </Container>
        );
        expect(container.querySelector('.container')).not.toBeNull();
        expect(container.querySelector('.fc')?.textContent).toBe('hello from FC');
    });
});
