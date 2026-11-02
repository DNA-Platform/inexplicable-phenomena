import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';
import { inert, reactive } from '@/abstraction/bond';

// A DECORATOR OVERRIDES THE NAME'S DEFAULT, per property, filed by prototype.
// A bare name is live and `@inert()` stills it; an underscore name is still
// and `@reactive()` wakes it; the ruling holds up the chain, so a parent's
// decoration is not lost when a subclass decorates something else.

async function click(container: HTMLElement) {
    await act(async () => { fireEvent.click(container.querySelector('button')!); });
}

describe('@reactive() and @inert() are consulted', () => {
    it('@reactive() makes an underscore field live', async () => {
        class $R extends $Chemical {
            @reactive() _count = 0;
            view() {
                return <div>
                    <span className="n">{this._count}</span>
                    <button onClick={() => { this._count++; }}>+</button>
                </div>;
            }
        }
        const C = $($R);
        const { container } = render(<C />);
        expect(container.querySelector('.n')!.textContent).toBe('0');
        await click(container);
        expect(container.querySelector('.n')!.textContent).toBe('1');
    });

    it('@inert() stills a bare field: the write lands and wakes nothing', async () => {
        class $I extends $Chemical {
            @inert() count = 0;
            view() {
                return <div>
                    <span className="n">{this.count}</span>
                    <button onClick={() => { this.count++; }}>+</button>
                </div>;
            }
        }
        new $I();
        const i = new $I();
        const { container } = render(React.createElement($(i)));
        await click(container);
        expect(i.count).toBe(1);
        expect(container.querySelector('.n')!.textContent).toBe('0');
    });

    it('@inert() on a $-lowercase member is honoured too', async () => {
        class $S extends $Chemical {
            @inert() $cache = 0;
            view() {
                return <div>
                    <span className="n">{this.$cache}</span>
                    <button onClick={() => { this.$cache++; }}>+</button>
                </div>;
            }
        }
        new $S();
        const s = new $S();
        const { container } = render(React.createElement($(s)));
        await click(container);
        expect(s.$cache).toBe(1);
        expect(container.querySelector('.n')!.textContent).toBe('0');
    });

    it('a parent\'s decoration holds in a subclass that decorates another member', async () => {
        class $Base extends $Chemical {
            @inert() quiet = 0;
        }
        class $Sub extends $Base {
            @inert() other = 0;
            view() {
                return <div>
                    <span className="n">{this.quiet}</span>
                    <button onClick={() => { this.quiet++; }}>+</button>
                </div>;
            }
        }
        new $Sub();
        const s = new $Sub();
        const { container } = render(React.createElement($(s)));
        await click(container);
        expect(s.quiet).toBe(1);
        expect(container.querySelector('.n')!.textContent).toBe('0');
    });
});
