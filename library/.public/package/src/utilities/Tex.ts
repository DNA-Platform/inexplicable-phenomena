// CREATED 2026-09-08 · rating 1 · shell. One katex render per distinct TeX string, memoised — never per draw.
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
