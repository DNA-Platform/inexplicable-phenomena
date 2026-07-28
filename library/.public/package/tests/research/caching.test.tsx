import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';

describe('research: caching a derivation across a reactive source change', () => {
    it('PROBE 4 — a naive `??=` memo goes STALE when the source changes', async () => {
        class $S extends $Chemical {
            $text = 'a b';
            _memo?: string[];

            get words(): string[] { return (this._memo ??= this.$text.split(' ')); }

            view() {
                return (
                    <div>
                        <span className="out">{this.words.join(',')}</span>
                        <button className="chg" onClick={() => { this.$text = 'x y z'; }}>c</button>
                    </div>
                );
            }
        }
        const S = $($S);
        const { container } = render(<S />);
        expect(container.querySelector('.out')!.textContent).toBe('a,b');
        await act(async () => { fireEvent.click(container.querySelector('.chg')!); });
        expect(container.querySelector('.out')!.textContent).toBe('a,b');
    });

    it('PROBE 5 — a cache KEYED to the source recomputes on change, not per render', async () => {
        let computes = 0;
        class $S extends $Chemical {
            $text = 'a b';
            tick = 0;
            _key?: string;
            _cache?: string[];

            get words(): string[] {
                if (this._key !== this.$text) {
                    computes++;
                    this._key = this.$text;
                    this._cache = this.$text.split(' ');
                }
                return this._cache!;
            }

            view() {
                return (
                    <div>
                        <span className="out">{this.words.join(',')}</span>
                        <span className="tk">{this.tick}</span>
                        <button className="bump" onClick={() => { this.tick++; }}>b</button>
                        <button className="chg" onClick={() => { this.$text = 'x y z'; }}>c</button>
                    </div>
                );
            }
        }
        const S = $($S);
        const { container } = render(<S />);
        expect(container.querySelector('.out')!.textContent).toBe('a,b');
        const afterMount = computes;

        await act(async () => { fireEvent.click(container.querySelector('.bump')!); });
        expect(container.querySelector('.tk')!.textContent).toBe('1');
        expect(computes).toBe(afterMount);

        await act(async () => { fireEvent.click(container.querySelector('.chg')!); });
        expect(container.querySelector('.out')!.textContent).toBe('x,y,z');
        expect(computes).toBe(afterMount + 1);
    });

    it('PROBE 6 — does a getter that WRITES during render break `onClick={this.method}` binding?', async () => {
        class $S extends $Chemical {
            $text = 'hi';
            _c?: string;

            get derived(): string { return (this._c = this.$text.toUpperCase()); }

            act() {
                this.$text = 'bye';
            }

            view() {
                return (
                    <div>
                        <span className="d">{this.derived}</span>
                        <button className="a" onClick={this.act}>a</button>
                    </div>
                );
            }
        }
        const S = $($S);
        const { container } = render(<S />);
        expect(container.querySelector('.d')!.textContent).toBe('HI');
        await act(async () => { fireEvent.click(container.querySelector('.a')!); });
        expect(container.querySelector('.d')!.textContent).toBe('BYE');
    });

    it('PROBE 7 — a keyed cache that MINTS parts re-mints on change, no runaway', async () => {
        class $Word extends $Chemical {
            $label = '';

            view() {
                return <span className="w">{this.$label}</span>;
            }
        }
        class $Line extends $Chemical {
            $text = 'a b';
            _key?: string;
            _words?: $Word[];

            get words(): $Word[] {
                if (this._key !== this.$text) {
                    this._key = this.$text;
                    this._words = this.$text.split(' ').map(l => { const w = new $Word(); w.$label = l; return w; });
                }
                return this._words!;
            }

            view() {
                return (
                    <div>
                        {this.words.map((w, i) => { const W = $(w); return <W key={i} />; })}
                        <button className="chg" onClick={() => { this.$text = 'x y z'; }}>c</button>
                    </div>
                );
            }
        }
        const Line = $($Line);
        const { container } = render(<Line />);
        expect([...container.querySelectorAll('.w')].map(n => n.textContent)).toEqual(['a', 'b']);
        await act(async () => { fireEvent.click(container.querySelector('.chg')!); });
        expect([...container.querySelectorAll('.w')].map(n => n.textContent)).toEqual(['x', 'y', 'z']);
    });
});
