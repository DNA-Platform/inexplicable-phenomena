import { basename, dirname } from 'node:path';
import type { Plugin } from 'vite';
import { accountOfFiles } from '../inventory/chapters';

const placement = /<Resource>\s*([^<\s]+)\s*<\/Resource>/gu;

// A CHAPTER'S OWN FILE IS PUT ON ITS PAGE HERE, BEFORE ANYTHING DRAWS. Doug, 2026-09-16: "Has to
// explicitly be somewhere, and the binder needs to find and replace it too." The binder knows every
// file standing beside every chapter before a page exists, so `<Resource>.ts</Resource>` is found in
// the chapter's own source and swapped for the file it names, read once by the bundler.
//
// AND ASKING FOR IT AT DRAW COST US A LIBRARY. Resolved at draw, the placement had to reach up for
// the chapter it stood in, and that walk re-entered the parse it was standing inside: `specify` ran
// 291 seconds on one book and died on a 4GB heap — allocating on every turn rather than merely
// recursing — and because every book extends the library's own, one book took all of .me with it.
// A resource is a BUILD-TIME fact. There is no disk at draw time and nothing to walk for.
//
// A FILE THAT IS NOT THERE STOPS THE BUILD, by name and by chapter, which is the whole reason to do
// it here: the failure a reader cannot see is a page with a silent hole in it.
//
// IT RUNS `pre`, so what the React plugin compiles is ordinary markup and nothing downstream needs to
// know a resource was ever written.
export const resources = (): Plugin => ({
    name: 'binding:resources',
    enforce: 'pre',
    transform(code: string, id: string) {
        const file = id.split('?')[0];
        if (!file.endsWith('.tsx') || !code.includes('<Resource>')) return null;

        const standing = accountOfFiles(dirname(file)).resources.get(basename(file)) ?? [];
        const imports: string[] = [];
        const drawn = code.replace(placement, (_, asked: string) => {
            const named = standing.find(one => one.endsWith(asked));
            if (named === undefined) throw new Error(missing(basename(file), asked, standing));
            const held = `resource${imports.length}`;
            imports.push(`import ${held} from './${named}?raw';`);

            return `<CodeNavigatorForResource file="${named}">{${held}}</CodeNavigatorForResource>`;
        });
        if (imports.length === 0) return null;

        return [`import { CodeNavigator as CodeNavigatorForResource } from '@dna-platform/public';`, ...imports, drawn].join('\n');
    },
});

// WHAT AN AUTHOR CAN ACT ON: which chapter asked, what it asked for, and what actually stands beside
// it. A message naming only the fault sends somebody to the wrong folder.
const missing = (chapter: string, asked: string, standing: string[]): string =>
    `${chapter} places a resource ending "${asked}", and nothing of that name stands beside it — ${standing.length === 0 ? 'no file does' : `these do: ${standing.join(', ')}`}`;
