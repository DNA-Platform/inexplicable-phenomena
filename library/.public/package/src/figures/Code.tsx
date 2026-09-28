import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Block as block } from '@/writing/Composition';
import { $Figure } from './Figure';

// CODE IS A FIGURE THAT PRINTS ITS TEXT AS A LISTING: a block letter, the file's contents or the
// author's own inside a code element, whitespace kept. Doug, 2026-09-28: "all the symbols — <SVG />,
// <Image />, <Code /> maybe should all work with direct input or when configured for a resource so
// that the same tool can be used to express a literal in the code."
export class $Code extends $Figure {
    override write(): ReactNode {
        return (
            <pre><code>{super.write()}</code></pre>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-code');
        const Block = $(block);
        this.annotations.add(this,
            <Block />
        );
    }
}

export const Code = $($Code);
