import { Window } from 'happy-dom';

export const window = new Window({ url: 'http://localhost/' });

// AND THE DOCUMENT SAYS IT IS IN STANDARDS MODE, BECAUSE IT IS. Every page this binder writes
// carries `<!doctype html>`, so standards mode is the true answer — happy-dom simply never
// implements the property that answers it, and a library reading it gets `undefined` and assumes
// the worst. KaTeX does exactly that, and warned five times a build, once per page: "KaTeX doesn't
// work in quirks mode. Make sure your website has a suitable doctype." The doctype was never
// missing. Written as a test rather than an assignment so it becomes a no-op the day happy-dom
// implements it, and with `in` because the property is absent from its types entirely.
if (!('compatMode' in window.document))
    Object.defineProperty(window.document, 'compatMode', { value: 'CSS1Compat', configurable: true });

const held = globalThis as unknown as Record<string, unknown>;
const own = window as unknown as Record<string, unknown>;

const define = (key: string, value: unknown): void => {
    try {
        Object.defineProperty(held, key, { value, configurable: true, writable: true, enumerable: true });
    } catch {
        // a global the runtime will not give up keeps the runtime's own
    }
};

for (const key of ['window', 'document', 'navigator', 'location', 'history', 'localStorage', 'sessionStorage', 'matchMedia', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame', 'customElements'])
    if (own[key] !== undefined) define(key, typeof own[key] === 'function' ? (own[key] as (...args: unknown[]) => unknown).bind(window) : own[key]);
for (const key of Object.getOwnPropertyNames(window))
    if (/^[A-Z]/.test(key) && held[key] === undefined) define(key, own[key]);

held.IS_REACT_ACT_ENVIRONMENT = true;
process.env.SC_DISABLE_SPEEDY = 'true';
