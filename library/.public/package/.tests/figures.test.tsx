import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, Chapter, Cover, Title, Author, Subject, Paragraph, Append, Code, Image, Svg, Highlighted, Numbered } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const served = (book: $Book): string => { const Drawn = $(book); return renderToString(<Drawn />); };

// THE THREE FIGURES .public SHIPS — Sprint 89, Doug, 2026-09-28: "Code, Image and SVG in .public, with appropriate
// configuration… all the symbols should all work with direct input or when configured for a resource so that the same
// tool can be used to express a literal in the code." Each from an append, and each from what the author wrote.
const shelf = (paragraph: React.ReactNode): $Book => built<$Book>(
    <Book>
        <Chapter><Cover /><Title>[A Paper](/a-paper/)</Title><Author>[A Persona](/a-persona/)</Author><Subject>[The Library](/the-library/)</Subject></Chapter>
        <Chapter>
            <Title>[The Plate](/a-paper/the-plate/)</Title>
            {paragraph}
            <Append type=".ts">{'export const field = 2;\nexport const wheel = 1;'}</Append>
            <Append type=".png">{'/assets/the-plate.png'}</Append>
            <Append identifier="mark" type=".svg">{'<svg viewBox="0 0 2 2"><rect width="2" height="2" /></svg>'}</Append>
        </Chapter>
    </Book>
);

describe('the figures', () => {
    it('Code prints an appended file as a listing, a block letter holding a code element, and prints what it is given the same way', () => {
        const appended = served(shelf(<Paragraph><Code type=".ts" /></Paragraph>));
        expect(appended).toMatch(/<div class="pd-letter pd-figure pd-code"><pre><code>export const field = 2;\nexport const wheel = 1;<\/code><\/pre>/u);
        const given = served(shelf(<Paragraph><Code>{'const x = 1;'}</Code></Paragraph>));
        expect(given).toContain('<pre><code>const x = 1;</code></pre>');
    });

    // THE VIEWER'S POWERS ARE ANNOTATIONS ON CODE — Sprint 92, Doug: "We should support syntax highlighting in code";
    // Lezer the viewer, ruled 2026-09-28. A keyword wears its mark whatever the theme, and the theme gives it ink.
    it('Code highlighted draws its lines as spans, each token wearing the mark of its tag, and the figure its own mark', () => {
        const drawn = served(shelf(<Paragraph><Code>{'const x = "one";\nexport class Y {}'}<Highlighted /></Code></Paragraph>));
        expect(drawn).toMatch(/<pre><code><span class="pd-line"><span class="tok-keyword">const<\/span> /u);
        expect(drawn).toContain('<span class="tok-string">&quot;one&quot;</span>');
        expect(drawn).toContain('<span class="tok-keyword">class</span>');
        expect(drawn).toMatch(/class="pd-letter pd-figure pd-code pa-highlighted"/u);
        expect(drawn).not.toContain('pd-line-number');
    });

    it('Code numbered gives each line its number, and a language it has no grammar for draws plain but numbered', () => {
        const numbered = served(shelf(<Paragraph><Code>{'one\ntwo\nthree\n'}<Numbered /></Code></Paragraph>));
        expect(numbered).toContain('<span class="pd-line"><span class="pd-line-number">1</span>one\n</span>');
        expect(numbered).toContain('<span class="pd-line-number">3</span>three\n</span></code></pre>');
        expect(numbered).not.toContain('<span class="pd-line-number">4</span>');
        const html = served(shelf(<Paragraph><Code>{'<p>hi</p>'}<Highlighted language="html" /><Numbered /></Code></Paragraph>));
        expect(html).toContain('<span class="pd-line-number">1</span>&lt;p&gt;hi&lt;/p&gt;');
        expect(html).not.toContain('tok-');
    });

    it('Code without either annotation draws exactly as it did', () => {
        const plain = served(shelf(<Paragraph><Code>{'const x = 1;\n'}</Code></Paragraph>));
        expect(plain).toContain('<pre><code>const x = 1;\n</code></pre>');
        expect(plain).not.toContain('pd-line');
    });

    it('Image draws the picture an append holds by its address, and one whose address the author wrote', () => {
        const appended = served(shelf(<Paragraph><Image type=".png" /></Paragraph>));
        expect(appended).toMatch(/<span class="pd-letter pd-figure pd-image"><img src="\/assets\/the-plate\.png" alt=""\/>/u);
        const given = served(shelf(<Paragraph><Image>{'/elsewhere.jpg'}</Image></Paragraph>));
        expect(given).toContain('<img src="/elsewhere.jpg"');
    });

    it('Svg draws an appended file\'s markup inline, and the author\'s own elements as written', () => {
        const appended = served(shelf(<Paragraph><Svg identifier="mark" /></Paragraph>));
        expect(appended).toContain('pd-svg"><span><svg viewBox="0 0 2 2"><rect width="2" height="2" /></svg></span>');
        const given = served(shelf(<Paragraph><Svg><svg viewBox="0 0 1 1"><circle r="1" /></svg></Svg></Paragraph>));
        expect(given).toContain('<svg viewBox="0 0 1 1"><circle r="1"></circle></svg>');
    });
});
