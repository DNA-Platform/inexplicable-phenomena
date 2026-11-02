import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@/abstraction/chemical';

describe('View augmentation: handlers that mutate directly', () => {
    it('direct field mutation in onClick triggers re-render', async () => {
        class $DirectCounter extends $Chemical {
            $count? = 0;
            view() {
                return (
                    <div>
                        <span className="count">{this.$count}</span>
                        <button onClick={() => { (this as any).$count++; }}>+</button>
                    </div>
                );
            }
        }
        const Counter = $($DirectCounter);
        const { container } = render(<Counter />);
        expect(container.querySelector('.count')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
    });

    it('array push in onClick triggers re-render', async () => {
        class $ListMutator extends $Chemical {
            $items: string[] = [];
            view() {
                return (
                    <div>
                        <span className="count">{this.$items.length}</span>
                        <button onClick={() => { this.$items.push('x'); }}>add</button>
                    </div>
                );
            }
        }
        const M = $($ListMutator);
        const { container } = render(<M />);
        expect(container.querySelector('.count')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
    });

    it('map set in onClick triggers re-render', async () => {
        class $MapMutator extends $Chemical {
            $map: Map<string, number> = new Map();
            view() {
                return (
                    <div>
                        <span className="count">{this.$map.size}</span>
                        <button onClick={() => { this.$map.set(String(this.$map.size), 1); }}>add</button>
                    </div>
                );
            }
        }
        const M = $($MapMutator);
        const { container } = render(<M />);
        expect(container.querySelector('.count')!.textContent).toBe('0');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('1');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
        });
        expect(container.querySelector('.count')!.textContent).toBe('2');
    });

    it('async handler triggers re-render after Promise resolves', async () => {
        class $AsyncMutator extends $Chemical {
            $data? = 'pending';
            view() {
                return (
                    <div>
                        <span className="data">{this.$data}</span>
                        <button onClick={async () => {
                            await new Promise(r => setTimeout(r, 0));
                            (this as any).$data = 'loaded';
                        }}>load</button>
                    </div>
                );
            }
        }
        const M = $($AsyncMutator);
        const { container } = render(<M />);
        expect(container.querySelector('.data')!.textContent).toBe('pending');
        await act(async () => {
            fireEvent.click(container.querySelector('button')!);
            await new Promise(r => setTimeout(r, 10));
        });
        expect(container.querySelector('.data')!.textContent).toBe('loaded');
    });
});
