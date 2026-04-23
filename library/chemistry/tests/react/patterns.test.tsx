import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $Chemical, react } from '@/chemistry/chemical';

describe('Patterns: common idioms work', () => {
    it('setInterval (started by a handler) calling a method updates view over time', async () => {
        class $Ticker extends $Chemical {
            $tick? = 0;
            _timer?: ReturnType<typeof setInterval>;
            startTicking() {
                if (!this._timer) this._timer = setInterval(() => this.tick(), 10);
            }
            tick() { this.$tick = (this.$tick ?? 0) + 1; }
            stopTicking() { if (this._timer) { clearInterval(this._timer); this._timer = undefined; } }
            view() {
                return <>
                    <span className="tick">{this.$tick}</span>
                    <button onClick={() => this.startTicking()}>start</button>
                </>;
            }
        }
        new $Ticker();
        const t = new $Ticker();
        const { container, unmount } = render(<t.Component />);
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
            await new Promise(r => setTimeout(r, 50));
        });
        const current = parseInt(container.querySelector('.tick')!.textContent!);
        t.stopTicking();
        expect(current).toBeGreaterThan(0);
        unmount();
    });

    it('async method called from a handler does data loading', async () => {
        class $Loader extends $Chemical {
            // Must have an initializer for the reactive accessor to install.
            $data? = 'pending';
            async load() {
                await new Promise(r => setTimeout(r, 5));
                this.$data = 'loaded';
            }
            view() {
                return <>
                    <span className="data">{this.$data}</span>
                    <button onClick={() => this.load()}>go</button>
                </>;
            }
        }
        new $Loader();
        const l = new $Loader();
        const { container } = render(<l.Component />);
        expect(container.querySelector('.data')!.textContent).toBe('pending');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        await act(async () => {
            await new Promise(r => setTimeout(r, 30));
        });
        expect(container.querySelector('.data')!.textContent).toBe('loaded');
    });

    it('Promise.then callback triggers re-render via direct write', async () => {
        class $Fetcher extends $Chemical {
            $status? = 'idle';
            _fetch() {
                return Promise.resolve('ok').then(val => { this.$status = val; });
            }
            view() {
                return <>
                    <span className="status">{this.$status}</span>
                    <button onClick={() => this._fetch()}>go</button>
                </>;
            }
        }
        new $Fetcher();
        const f = new $Fetcher();
        const { container } = render(<f.Component />);
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
            await new Promise(r => setTimeout(r, 20));
        });
        expect(container.querySelector('.status')!.textContent).toBe('ok');
    });

    it('Map and array in the same chemical both reactive', async () => {
        class $Combined extends $Chemical {
            $items: string[] = [];
            $counts: Map<string, number> = new Map();
            addItem(item: string) {
                this.$items.push(item);
                this.$counts.set(item, (this.$counts.get(item) ?? 0) + 1);
            }
            view() {
                return <>
                    <span className="items">{this.$items.length}</span>
                    <span className="keys">{this.$counts.size}</span>
                    <button onClick={() => this.addItem('x')}>add</button>
                </>;
            }
        }
        const C = new $Combined().Component;
        const { container } = render(<C />);
        expect(container.querySelector('.items')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.items')!.textContent).toBe('1');
        expect(container.querySelector('.keys')!.textContent).toBe('1');
    });

    it('form input two-way binding via direct onChange write', async () => {
        class $Input extends $Chemical {
            $text? = '';
            view() {
                return <>
                    <input
                        value={this.$text}
                        onChange={e => { this.$text = (e.target as HTMLInputElement).value; }}
                    />
                    <span className="echo">{this.$text}</span>
                </>;
            }
        }
        const C = new $Input().Component;
        const { container } = render(<C />);
        const input = container.querySelector('input')! as HTMLInputElement;
        await act(async () => {
            fireEvent.change(input, { target: { value: 'hello' } });
        });
        expect(container.querySelector('.echo')!.textContent).toBe('hello');
    });

    it('conditional render based on reactive state', async () => {
        class $Toggle extends $Chemical {
            $open? = false;
            view() {
                return <>
                    <button onClick={() => { this.$open = !this.$open; }}>toggle</button>
                    {this.$open && <div className="content">shown</div>}
                </>;
            }
        }
        const C = new $Toggle().Component;
        const { container } = render(<C />);
        expect(container.querySelector('.content')).toBeNull();
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.content')).not.toBeNull();
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.content')).toBeNull();
    });

    it('nested mutation inside a method triggers re-render', async () => {
        class $Cart extends $Chemical {
            $items: { name: string; qty: number }[] = [];
            add(name: string) { this.$items.push({ name, qty: 1 }); }
            incrementFirst() { if (this.$items[0]) this.$items[0].qty++; }
            view() {
                return <>
                    <span className="count">{this.$items.length}</span>
                    <span className="first-qty">{this.$items[0]?.qty ?? 0}</span>
                    <button className="add" onClick={() => this.add('item')}>add</button>
                    <button className="inc" onClick={() => this.incrementFirst()}>inc</button>
                </>;
            }
        }
        const C = new $Cart().Component;
        const { container } = render(<C />);
        await act(async () => {
            fireEvent.click(container.querySelector('.add')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
        expect(container.querySelector('.first-qty')!.textContent).toBe('1');
        await act(async () => {
            fireEvent.click(container.querySelector('.inc')!);
        });
        expect(container.querySelector('.first-qty')!.textContent).toBe('2');
    });
});

describe('Patterns: documented boundaries', () => {
    it('Map.set OUTSIDE any method/handler does NOT trigger re-render without react()', async () => {
        class $M extends $Chemical {
            $map: Map<string, number> = new Map();
            view() { return <span className="size">{this.$map.size}</span>; }
        }
        new $M();
        const m = new $M();
        const { container } = render(<m.Component />);
        expect(container.querySelector('.size')!.textContent).toBe('0');
        // Mutate outside any scope. Map.set internal mutation doesn't hit our setter.
        m.$map.set('k', 1);
        // Without react(), stale.
        await act(async () => { await new Promise(r => setTimeout(r, 5)); });
        expect(container.querySelector('.size')!.textContent).toBe('0');
        // With react(), updates.
        await act(async () => {
            react(m);
        });
        expect(container.querySelector('.size')!.textContent).toBe('1');
    });

    it('direct scalar write outside any method/handler TRIGGERS re-render automatically', async () => {
        class $S extends $Chemical {
            $count? = 0;
            view() { return <span className="n">{this.$count}</span>; }
        }
        new $S();
        const s = new $S();
        const { container } = render(<s.Component />);
        await act(async () => {
            // Direct scalar write. Setter fires react() on no-scope.
            s.$count = 42;
            await new Promise(r => setTimeout(r, 5));
        });
        expect(container.querySelector('.n')!.textContent).toBe('42');
    });
});
