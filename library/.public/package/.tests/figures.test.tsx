import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book, Chapter, Cover, Title, Author, Subject, Paragraph, Append, Code, Image, Svg } from '@dna-platform/public';

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
    it('Code prints an appended file as a listing, a block letter holding a code element, lit in the language of the file\'s type, and prints what it is given plain when it names no language', () => {
        const appended = served(shelf(<Paragraph><Code type=".ts" /></Paragraph>));
        expect(appended).toMatch(/<div class="pd-letter pd-figure pd-code"><pre><code class="language-ts"><span class="hljs-keyword">export<\/span> <span class="hljs-keyword">const<\/span> field = <span class="hljs-number">2<\/span>;\n/u);
        const given = served(shelf(<Paragraph><Code>{'const x = 1;'}</Code></Paragraph>));
        expect(given).toContain('<pre><code>const x = 1;</code></pre>');
    });

    // THE THREE PROPS — Doug, 2026-09-29: "Yes to the three props; highlight.js through its React wrapper, classes only"
    // and, on the grammars, "I want you to support the grammars of most, if not all code." A language given lights
    // what the author wrote; numbered, each line stands in a span the sheet counts, a token spanning lines carried
    // across them; a highlighter handed as a prop replaces highlight.js; a language nothing knows prints escaped.
    it('Code lights a language given as a prop, numbers its lines when asked, takes another highlighter, and escapes a language it does not know', () => {
        const lit = served(shelf(<Paragraph><Code language="python">{'def f():\n    return 1'}</Code></Paragraph>));
        expect(lit).toContain('<code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">f</span>');
        const numbered = served(shelf(<Paragraph><Code type=".ts" numbered /></Paragraph>));
        // THE LINE'S OWN CLASS since Sprint 95's U7, pd-code-line, Doug's name: pd-line is the Line's, a sentence on a
        // line of its own, and a poem's Lines are not counted by the code's rule.
        expect(numbered.match(/<span class="pd-code-line">/gu)).toHaveLength(2);
        expect(numbered).not.toContain('class="pd-line"');
        const carried = served(shelf(<Paragraph><Code language="ts" numbered>{'/* one\ntwo */ const x = 1;'}</Code></Paragraph>));
        expect(carried).toContain('<span class="pd-code-line"><span class="hljs-comment">/* one</span></span>\n<span class="pd-code-line"><span class="hljs-comment">two */</span> ');
        const shouted = served(shelf(<Paragraph><Code highlighter={(text: string) => text.toUpperCase()}>{'const x = 1;'}</Code></Paragraph>));
        expect(shouted).toContain('<pre><code>CONST X = 1;</code></pre>');
        const unknown = served(shelf(<Paragraph><Code language="no-such-language">{'a < b && c > d'}</Code></Paragraph>));
        expect(unknown).toContain('<code class="language-no-such-language">a &lt; b &amp;&amp; c &gt; d</code>');
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
