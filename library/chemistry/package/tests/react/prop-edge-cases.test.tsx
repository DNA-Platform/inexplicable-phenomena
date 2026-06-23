import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('Prop edge cases (unit-testable, moved from Lab catalog)', () => {
    it('default prop value is used when prop not passed', () => {
        class $WithDefault extends $Chemical {
            $size = 'medium';
            view() { return <span className="s">{this.$size}</span>; }
        }
        const C = $($WithDefault);
        const { container } = render(<C />);
        expect(container.querySelector('.s')!.textContent).toBe('medium');
    });

    it('default prop value is overridden when prop is passed', () => {
        class $WithDefault extends $Chemical {
            $size = 'medium';
            view() { return <span className="s">{this.$size}</span>; }
        }
        const C = $($WithDefault);
        const { container } = render(<C size="large" />);
        expect(container.querySelector('.s')!.textContent).toBe('large');
    });

    it('spread props arrive correctly', async () => {
        class $Multi extends $Chemical {
            $a = '';
            $b = 0;
            view() { return <span className="v">{this.$a}-{this.$b}</span>; }
        }
        const C = $($Multi);
        const props = { a: 'hello', b: 42 };
        const { container } = render(<C {...props} />);
        expect(container.querySelector('.v')!.textContent).toBe('hello-42');
    });

    it('null/undefined prop transitions work', async () => {
        class $Nullable extends $Chemical {
            $value?: string | null = 'initial';
            view() { return <span className="v">{this.$value ?? '(empty)'}</span>; }
        }
        const C = $($Nullable);
        const { container, rerender } = render(<C value="hello" />);
        expect(container.querySelector('.v')!.textContent).toBe('hello');
        rerender(<C value={null as any} />);
        expect(container.querySelector('.v')!.textContent).toBe('(empty)');
        rerender(<C value="back" />);
        expect(container.querySelector('.v')!.textContent).toBe('back');
    });

    it('nested object property mutation triggers re-render', async () => {
        class $Nested extends $Chemical {
            config = { theme: 'light', size: 12 };
            setDark() { this.config.theme = 'dark'; }
            view() {
                return <div>
                    <span className="t">{this.config.theme}</span>
                    <button onClick={this.setDark}>dark</button>
                </div>;
            }
        }
        const C = $($Nested);
        const { container } = render(<C />);
        expect(container.querySelector('.t')!.textContent).toBe('light');
        await act(async () => {
            const btn = container.querySelector('button')!;
            btn.click();
        });
        expect(container.querySelector('.t')!.textContent).toBe('dark');
    });
});
