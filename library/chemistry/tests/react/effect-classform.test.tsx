import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('async bond constructor on class-form chemicals', () => {
    it('async bond ctor runs after mount for class-form $($X)', async () => {
        let ctorRan = false;
        class $E extends $Chemical {
            status = 'init';
            async $E() {
                ctorRan = true;
                await this.next('mount');
                this.status = 'mounted';
            }
            view() { return <span className="s">{this.status}</span>; }
        }
        const E = $($E);
        const { container } = render(<E />);
        expect(container.querySelector('.s')!.textContent).toBe('init');
        await act(async () => { await new Promise(r => setTimeout(r, 50)); });
        expect(ctorRan).toBe(true);
        expect(container.querySelector('.s')!.textContent).toBe('mounted');
    });
});
