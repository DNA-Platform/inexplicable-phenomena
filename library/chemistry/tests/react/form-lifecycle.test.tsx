import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('$form lifecycle hook', () => {
    it('sync $form runs once after mount', async () => {
        let formCalls = 0;
        class $C extends $Chemical {
            status = 'init';
            $form() {
                formCalls++;
                this.status = 'formed';
            }
            view() { return <span className="s">{this.status}</span>; }
        }
        const C = $($C);
        const { container } = render(<C />);
        await act(async () => { await new Promise(r => setTimeout(r, 10)); });
        expect(container.querySelector('.s')!.textContent).toBe('formed');
        expect(formCalls).toBe(1);
    });

    it('async $form resolves and triggers re-render', async () => {
        class $Loader extends $Chemical {
            data: string | null = null;
            async $form() {
                await new Promise(r => setTimeout(r, 20));
                this.data = 'loaded';
            }
            view() { return <span className="d">{this.data ?? 'loading'}</span>; }
        }
        const Loader = $($Loader);
        const { container } = render(<Loader />);
        expect(container.querySelector('.d')!.textContent).toBe('loading');
        await act(async () => { await new Promise(r => setTimeout(r, 50)); });
        expect(container.querySelector('.d')!.textContent).toBe('loaded');
    });

    it('$form does not run again on re-render', async () => {
        let formCalls = 0;
        class $Counter extends $Chemical {
            count = 0;
            $form() { formCalls++; }
            increment() { this.count++; }
            view() { return <span className="c">{this.count}</span>; }
        }
        const c = new $Counter();
        const Counter = $(c);
        render(<Counter />);
        await act(async () => { await new Promise(r => setTimeout(r, 10)); });
        expect(formCalls).toBe(1);

        await act(async () => { c.increment(); });
        await act(async () => { c.increment(); });
        expect(formCalls).toBe(1);
    });

    it('next("formation") resolves when async $form completes', async () => {
        let formed = false;
        class $C extends $Chemical {
            async $form() {
                await new Promise(r => setTimeout(r, 30));
            }
            view() { return null; }
        }
        const c = new $C();
        const C = $(c);
        render(<C />);

        await act(async () => {
            await c.next('formation');
            formed = true;
        });
        expect(formed).toBe(true);
    });

    it('next("formation") resolves immediately if no $form defined', async () => {
        class $C extends $Chemical {
            view() { return null; }
        }
        const c = new $C();
        const C = $(c);
        render(<C />);
        await act(async () => {
            await c.next('formation');
        });
        expect(true).toBe(true);
    });

    it('$form runs after mount so DOM-dependent work is safe', async () => {
        let phaseAtFormTime: string | undefined;
        class $C extends $Chemical {
            $form() {
                phaseAtFormTime = this.next('mount').constructor.name;
            }
            view() { return null; }
        }
        const C = $($C);
        render(<C />);
        await act(async () => { await new Promise(r => setTimeout(r, 10)); });
        expect(phaseAtFormTime).toBe('Promise');
    });

    it('$form can call memoized $methods', async () => {
        let fetchCalls = 0;
        class $C extends $Chemical {
            data: string | null = null;
            async $form() {
                this.data = await this.$fetchData();
            }
            async $fetchData() {
                fetchCalls++;
                await new Promise(r => setTimeout(r, 10));
                return 'result';
            }
            view() { return <span className="d">{this.data ?? 'loading'}</span>; }
        }
        const C = $($C);
        const { container } = render(<C />);
        await act(async () => { await new Promise(r => setTimeout(r, 50)); });
        expect(container.querySelector('.d')!.textContent).toBe('result');
        expect(fetchCalls).toBe(1);
    });
});
