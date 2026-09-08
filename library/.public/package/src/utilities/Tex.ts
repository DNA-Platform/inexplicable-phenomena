// One katex render per distinct TeX string, memoised — never per draw. A view is read on every
// repaint, so rendering there would run katex hundreds of times for a paper that never changes;
// the string IS the key, because the same TeX always answers the same markup.
import katex from 'katex';

export class TexRenderer {
    private rendered = new Map<string, string>();

    inline(tex: string): string {
        return this.once('i' + tex, tex, false);
    }

    display(tex: string): string {
        return this.once('d' + tex, tex, true);
    }

    private once(key: string, tex: string, display: boolean): string {
        let held = this.rendered.get(key);
        if (held === undefined) this.rendered.set(key, held = katex.renderToString(tex, { displayMode: display, throwOnError: false }));

        return held;
    }
}

export const tex = new TexRenderer();
