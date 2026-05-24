import { describe, it, expect } from 'vitest';
import { render, act, fireEvent } from '@testing-library/react';
import React from 'react';
import { $, $Chemical, $check } from '@/abstraction/chemical';
import { $Function$, $Html$ } from '@/abstraction/chemical';

// =============================================================================
// Bond Constructor Composition
//
// Bond constructors can receive more than just $Chemical children. The
// synthesis processes:
//   - Reactive HTML elements ($Html$) — `<div>`, `<span>`, etc.
//   - Function component wrappers ($Function$) — plain React FCs
//   - Mixed compositions of all three
//
// These tests verify that FEATURE: you can compose chemicals, reactive HTML,
// and function components together through bond constructors, and the parent
// chemical sees the right types.
// =============================================================================


// =============================================================================
// 1. Reactive HTML in bond constructors
// =============================================================================

describe('reactive HTML elements in bond constructors', () => {
    it('parent receives $Html$ instances for plain HTML children', () => {
        let receivedTypes: string[] = [];

        class $Wrapper extends $Chemical {
            items: any[] = [];

            $Wrapper(...items: any[]) {
                this.items = items;
                receivedTypes = items.map(item => {
                    if (item instanceof $Html$) return `html:${item.type}`;
                    if (item instanceof $Chemical) return `chemical:${item.constructor.name}`;
                    return `unknown:${typeof item}`;
                });
            }

            view() {
                return (
                    <div className="wrapper">
                        {this.items.map((item, i) => {
                            const C = $(item);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Wrapper = $($Wrapper);

        const { container } = render(
            <Wrapper>
                <div className="inner-div">hello</div>
                <span className="inner-span">world</span>
            </Wrapper>
        );

        expect(receivedTypes).toEqual(['html:div', 'html:span']);
        expect(container.querySelector('.inner-div')?.textContent).toBe('hello');
        expect(container.querySelector('.inner-span')?.textContent).toBe('world');
    });

    it('HTML children render with their props and content', () => {
        class $Card extends $Chemical {
            header: any;
            body: any;

            $Card(header: any, body: any) {
                this.header = header;
                this.body = body;
            }

            view() {
                const H = $(this.header);
                const B = $(this.body);
                return (
                    <div className="card">
                        <H />
                        <B />
                    </div>
                );
            }
        }

        const Card = $($Card);

        const { container } = render(
            <Card>
                <h2 className="card-title">Title</h2>
                <p className="card-body">Body text</p>
            </Card>
        );

        expect(container.querySelector('.card-title')?.textContent).toBe('Title');
        expect(container.querySelector('.card-body')?.textContent).toBe('Body text');
    });
});


// =============================================================================
// 2. Function component wrappers in bond constructors
// =============================================================================

describe('function component wrappers in bond constructors', () => {
    it('parent receives $Function$ instances for FC children', () => {
        let receivedCount = 0;
        let gotFunction = false;

        function Badge({ label }: { label: string }) {
            return <span className="badge">{label}</span>;
        }

        class $Host extends $Chemical {
            children_: any[] = [];

            $Host(...items: any[]) {
                receivedCount = items.length;
                gotFunction = items.some(i => i instanceof $Function$);
                this.children_ = items;
            }

            view() {
                return (
                    <div className="host">
                        {this.children_.map((item, i) => {
                            const C = $(item);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Host = $($Host);

        const { container } = render(
            <Host>
                <Badge label="hello" />
            </Host>
        );

        expect(receivedCount).toBe(1);
        expect(gotFunction).toBe(true);
        expect(container.querySelector('.badge')?.textContent).toBe('hello');
    });

    it('multiple FC children each get their own wrapper', () => {
        function Red() { return <span className="red">R</span>; }
        function Green() { return <span className="green">G</span>; }
        function Blue() { return <span className="blue">B</span>; }

        let count = 0;

        class $Palette extends $Chemical {
            colors: any[] = [];

            $Palette(...colors: any[]) {
                count = colors.length;
                this.colors = colors;
            }

            view() {
                return (
                    <div className="palette">
                        {this.colors.map((c, i) => {
                            const C = $(c);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Palette = $($Palette);

        const { container } = render(
            <Palette>
                <Red />
                <Green />
                <Blue />
            </Palette>
        );

        expect(count).toBe(3);
        expect(container.querySelector('.red')).not.toBeNull();
        expect(container.querySelector('.green')).not.toBeNull();
        expect(container.querySelector('.blue')).not.toBeNull();
    });
});


// =============================================================================
// 3. Mixed composition — chemicals, HTML, and FCs together
// =============================================================================

describe('mixed composition in bond constructors', () => {
    it('bond ctor receives chemicals, HTML elements, and FCs in one set', () => {
        const typeLog: string[] = [];

        function StatusBadge() {
            return <span className="status-badge">active</span>;
        }

        class $InfoBox extends $Chemical {
            $title = '';
            view() {
                return <div className="info-box">{this.$title}</div>;
            }
        }

        class $Layout extends $Chemical {
            parts: any[] = [];

            $Layout(...parts: any[]) {
                this.parts = parts;
                typeLog.length = 0;
                for (const p of parts) {
                    if (p instanceof $Html$) typeLog.push('html');
                    else if (p instanceof $Function$) typeLog.push('fc');
                    else if (p instanceof $Chemical) typeLog.push('chemical');
                    else typeLog.push('other');
                }
            }

            view() {
                return (
                    <div className="layout">
                        {this.parts.map((p, i) => {
                            const C = $(p);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const InfoBox = $($InfoBox);
        const Layout = $($Layout);

        const { container } = render(
            <Layout>
                <InfoBox title="Hello" />
                <div className="separator" />
                <StatusBadge />
            </Layout>
        );

        expect(typeLog).toEqual(['chemical', 'html', 'fc']);
        expect(container.querySelector('.info-box')?.textContent).toBe('Hello');
        expect(container.querySelector('.separator')).not.toBeNull();
        expect(container.querySelector('.status-badge')?.textContent).toBe('active');
    });
});


// =============================================================================
// 4. $check type validation with $Html$ and $Function$
// =============================================================================

describe('$check validation with wrapped types', () => {
    it('$check validates $Html$ children against $Html$', () => {
        class $HtmlHost extends $Chemical {
            elements: $Html$[] = [];

            $HtmlHost(...elements: any[]) {
                this.elements = elements.map(e => $check(e, $Html$));
            }

            view() {
                return (
                    <div className="html-host">
                        {this.elements.map((e, i) => {
                            const E = $(e);
                            return <E key={i} />;
                        })}
                    </div>
                );
            }
        }

        const HtmlHost = $($HtmlHost);

        const { container } = render(
            <HtmlHost>
                <div>one</div>
                <span>two</span>
            </HtmlHost>
        );

        expect(container.querySelector('.html-host')).not.toBeNull();
    });

    it('$check validates $Function$ children against $Function$', () => {
        function Chip({ text }: { text: string }) {
            return <span className="chip">{text}</span>;
        }

        class $FnHost extends $Chemical {
            fns: $Function$[] = [];

            $FnHost(...fns: any[]) {
                this.fns = fns.map(f => $check(f, $Function$));
            }

            view() {
                return (
                    <div className="fn-host">
                        {this.fns.map((f, i) => {
                            const F = $(f);
                            return <F key={i} />;
                        })}
                    </div>
                );
            }
        }

        const FnHost = $($FnHost);

        const { container } = render(
            <FnHost>
                <Chip text="a" />
                <Chip text="b" />
            </FnHost>
        );

        expect(container.querySelectorAll('.chip').length).toBe(2);
    });
});


// =============================================================================
// 5. Reactive HTML elements participate in reactivity
// =============================================================================

describe('reactive HTML — props flow through synthesis', () => {
    it('HTML children receive props set via JSX', () => {
        class $Styled extends $Chemical {
            items: any[] = [];

            $Styled(...items: any[]) {
                this.items = items;
            }

            view() {
                return (
                    <div className="styled">
                        {this.items.map((item, i) => {
                            const C = $(item);
                            return <C key={i} />;
                        })}
                    </div>
                );
            }
        }

        const Styled = $($Styled);

        const { container } = render(
            <Styled>
                <button className="my-btn" type="button">Click me</button>
                <input className="my-input" type="text" placeholder="type here" />
            </Styled>
        );

        const btn = container.querySelector('.my-btn') as HTMLButtonElement;
        expect(btn).not.toBeNull();
        expect(btn.textContent).toBe('Click me');

        const input = container.querySelector('.my-input') as HTMLInputElement;
        expect(input).not.toBeNull();
        expect(input.placeholder).toBe('type here');
    });
});


// =============================================================================
// 6. $('tagName') catalogue — reactive HTML factory
// =============================================================================

describe('$("tagName") — HTML catalogue used in composition', () => {
    it('$("div") returns a usable component', () => {
        const Div = $('div');
        expect(typeof Div).toBe('function');

        const { container } = render(React.createElement(Div as any, { className: 'test-div' }, 'content'));
        expect(container.querySelector('.test-div')?.textContent).toBe('content');
    });

    it('catalogue caches per tag — same reference on repeated lookups', () => {
        const A = $('section');
        const B = $('section');
        expect(A).toBe(B);
    });

    it('different tags produce different components', () => {
        const Nav = $('nav');
        const Main = $('main');
        expect(Nav).not.toBe(Main);
    });
});
