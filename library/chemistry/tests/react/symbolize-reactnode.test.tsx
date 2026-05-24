import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('Bug: $symbolize(ReactNode) must not cause infinite re-render loops', () => {
    // Sprint 32 bug C1: passing ReactNode as a $-prefixed prop causes
    // infinite loop because $symbolize returns a new value on every render
    // (React elements have fresh object identity).
    it('chemical with $content ReactNode prop does not loop', async () => {
        let renderCount = 0;
        class $Wrapper extends $Chemical {
            $content?: React.ReactNode;
            view() {
                renderCount++;
                return <div>{this.$content}</div>;
            }
        }
        const Wrapper = $($Wrapper);
        const { container } = render(<Wrapper content={<span>hello</span>} />);
        await act(async () => { await new Promise(r => setTimeout(r, 100)); });
        expect(container.textContent).toBe('hello');
        expect(renderCount).toBeLessThan(10);
    });
});
