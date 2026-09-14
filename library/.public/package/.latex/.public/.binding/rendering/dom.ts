import { Window } from 'happy-dom';

export const window = new Window({ url: 'http://localhost/' });

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
