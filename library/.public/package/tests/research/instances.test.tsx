import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';

class $Leaf extends $Chemical {
    $label = '';

    view() {
        return <span className="leaf">{this.$label}</span>;
    }
}

describe('research: minting renderable instances on demand', () => {
    it.skip('PROBE 1 — uncached minting at render is FATAL (OOMs the worker; the crash is the finding)', () => {
        class $Owner extends $Chemical {
            get leaves(): $Leaf[] {
                return ['a', 'b', 'c'].map(l => { const x = new $Leaf(); x.$label = l; return x; });
            }

            view() {
                return <div>{this.leaves.map((x, i) => { const X = $(x); return <X key={i} />; })}</div>;
            }
        }
        const Owner = $($Owner);
        const { container } = render(<Owner />);
        expect([...container.querySelectorAll('.leaf')].map(n => n.textContent)).toEqual(['a', 'b', 'c']);
    });

    it('PROBE 2 — memoized children are created once and survive a parent re-render', async () => {
        let created = 0;
        class $Cached extends $Chemical {
            _leaves?: $Leaf[];
            tick = 0;

            bump() {
                this.tick++;
            }

            get leaves(): $Leaf[] {
                if (!this._leaves) {
                    created++;
                    this._leaves = ['x', 'y'].map(l => { const n = new $Leaf(); n.$label = l; return n; });
                }
                return this._leaves;
            }

            view() {
                return (
                    <div>
                        <button className="bump" onClick={this.bump}>b</button>
                        <span className="tick">{this.tick}</span>
                        {this.leaves.map((x, i) => { const X = $(x); return <X key={i} />; })}
                    </div>
                );
            }
        }
        const Cached = $($Cached);
        const { container } = render(<Cached />);
        expect(container.querySelector('.tick')!.textContent).toBe('0');
        expect([...container.querySelectorAll('.leaf')].map(n => n.textContent)).toEqual(['x', 'y']);

        await act(async () => { fireEvent.click(container.querySelector('.bump')!); });

        expect(container.querySelector('.tick')!.textContent).toBe('1');
        expect([...container.querySelectorAll('.leaf')].map(n => n.textContent)).toEqual(['x', 'y']);
        expect(created).toBe(1);
    });

    it('PROBE 3 — a minted child keeps its OWN reactive state across a parent re-render', async () => {
        class $Counter extends $Chemical {
            n = 0;

            inc() {
                this.n++;
            }

            view() {
                return <button className="ctr" onClick={this.inc}>{String(this.n)}</button>;
            }
        }
        class $Holder extends $Chemical {
            _child?: $Counter;
            tick = 0;

            get child(): $Counter { return this._child ??= new $Counter(); }

            bump() {
                this.tick++;
            }

            view() {
                const C = $(this.child);
                return (
                    <div>
                        <button className="bump" onClick={this.bump}>b</button>
                        <span className="tick">{this.tick}</span>
                        <C />
                    </div>
                );
            }
        }
        const Holder = $($Holder);
        const { container } = render(<Holder />);
        await act(async () => { fireEvent.click(container.querySelector('.ctr')!); });
        await act(async () => { fireEvent.click(container.querySelector('.ctr')!); });
        expect(container.querySelector('.ctr')!.textContent).toBe('2');

        await act(async () => { fireEvent.click(container.querySelector('.bump')!); });

        expect(container.querySelector('.tick')!.textContent).toBe('1');
        expect(container.querySelector('.ctr')!.textContent).toBe('2');
    });

    it('PROBE 8 — uncached fresh minting is fine when you QUERY, not mount (the "just don\'t cache" case)', async () => {
        class $W extends $Chemical {
            $label = '';

            view() {
                return <span>{this.$label}</span>;
            }
        }
        class $Line extends $Chemical {
            $text = 'a b';

            get words(): $W[] {
                return this.$text.split(' ').map(l => { const w = new $W(); w.$label = l; return w; });
            }

            view() {
                return (
                    <div>
                        <span className="copy">{this.$text}</span>
                        <span className="count">{this.words.length}</span>
                        <span className="first">{this.words[0].$label}</span>
                        <button className="chg" onClick={() => { this.$text = 'x y z'; }}>c</button>
                    </div>
                );
            }
        }
        const Line = $($Line);
        const { container } = render(<Line />);
        expect(container.querySelector('.copy')!.textContent).toBe('a b');
        expect(container.querySelector('.count')!.textContent).toBe('2');
        await act(async () => { fireEvent.click(container.querySelector('.chg')!); });
        expect(container.querySelector('.copy')!.textContent).toBe('x y z');
        expect(container.querySelector('.count')!.textContent).toBe('3');
        expect(container.querySelector('.first')!.textContent).toBe('x');
    });
});
