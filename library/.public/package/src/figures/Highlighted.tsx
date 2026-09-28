import { $ } from '@dna-platform/chemistry';
import { parser } from '@lezer/javascript';
import { classHighlighter, highlightTree } from '@lezer/highlight';
import { $Writing, $Annotation } from '@/writing/Writing';

export type Piece = { text: string; classes: string };

const parsed = ['js', 'jsx', 'ts', 'tsx'];

export class $Highlighted extends $Annotation {
    $language = 'tsx';

    tokens(text: string): Piece[] {
        if (!parsed.includes(this.$language)) return [{ text, classes: '' }];
        const dialect = [this.$language.startsWith('ts') ? 'ts' : '', this.$language.endsWith('x') ? 'jsx' : ''].filter(one => one !== '').join(' ');
        const tree = parser.configure({ dialect }).parse(text);
        const pieces: Piece[] = [];
        let at = 0;
        highlightTree(tree, classHighlighter, (from, to, classes) => {
            if (from > at) pieces.push({ text: text.slice(at, from), classes: '' });
            pieces.push({ text: text.slice(from, to), classes });
            at = to;
        });
        if (at < text.length) pieces.push({ text: text.slice(at), classes: '' });
        return pieces;
    }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-highlighted');
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
    }
}

export const Highlighted = $($Highlighted);
