// CREATED 2026-09-08 — Sprint 53 scaffold under public-code-design. CLAY. Built with Math and Equation.
// "a latex processing method that is efficient in components that represent equations" (Doug): ONE render per distinct TeX string, memoised, never per draw. katex is already a dependency (package.json) and is imported by nothing until this is built.
// DEPENDS ON: katex.renderToString — a dependency, not a framework feature. Sanitisation is a decision to take before any external content renders (ch02's open question).
export class TexRenderer {
    private rendered = new Map<string, string>();

    inline(tex: string): string {
        throw new Error('not implemented: tex.inline — katex.renderToString(tex, { displayMode: false }), memoised on the string');
    }

    display(tex: string): string {
        throw new Error('not implemented: tex.display — katex.renderToString(tex, { displayMode: true }), memoised on the string');
    }
}

export const tex = new TexRenderer();
