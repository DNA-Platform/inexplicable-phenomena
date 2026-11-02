import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('Chemical with ReactNode $-prop (was the $CaseShell blocker)', () => {
    it('chemical accepts ReactNode via $demo prop without looping', async () => {
        let renderCount = 0;
        class $Shell extends $Chemical {
            $title?: string;
            $demo?: React.ReactNode;
            showCode = false;
            toggleCode() { this.showCode = !this.showCode; }
            view() {
                renderCount++;
                return (
                    <div>
                        <h3>{this.$title}</h3>
                        <div className="demo">{this.$demo}</div>
                        <button onClick={this.toggleCode}>
                            {this.showCode ? 'hide' : 'show'}
                        </button>
                        {this.showCode && <pre>code here</pre>}
                    </div>
                );
            }
        }
        const Shell = $($Shell);
        function Counter() {
            return <span className="c">I am a counter</span>;
        }
        const { container } = render(
            <Shell title="test" demo={<Counter />} />
        );
        await act(async () => { await new Promise(r => setTimeout(r, 200)); });
        expect(container.querySelector('.demo')?.textContent).toBe('I am a counter');
        expect(renderCount).toBeLessThan(10);
    });
});
