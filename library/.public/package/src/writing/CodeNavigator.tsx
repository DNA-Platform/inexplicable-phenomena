import { ReactNode } from 'react';
import core from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Code$, $Code, $TypeOfCode, CodeSpecification } from '@/writing/Code';

// A CODE NAVIGATOR DRAWS A FILE THE LIBRARY DID NOT TYPE. A $Code is copy somebody wrote into a
// chapter; this is a whole file brought in under its own name, so the chapter and the file can be
// read side by side and neither can drift from the other.
//
// IT IS A BASE AND IS MEANT TO BE OVERRIDDEN. Doug, 2026-09-16: "we need a modular system. Someone
// shouldn't have to rewrite everything to replace how TypeScript is displayed. Having a base and
// then registering ones over those and specializations over those." A library registers its own
// navigator for a language, or for one extension, and what is registered nearest wins.

// ONLY THE LANGUAGES A LIBRARY WRITES IN. The whole of highlight.js is two hundred grammars and most
// of a megabyte; a library that writes TypeScript, reads JSON and is run from a shell needs three.
// Registered at module load, because a highlighter with no grammar draws plain text silently and
// that failure reads as a styling problem for an afternoon.
core.registerLanguage('typescript', typescript);
core.registerLanguage('json', json);
core.registerLanguage('bash', bash);

const known = new Set(['typescript', 'json', 'bash']);

// WHAT A FILE IS WRITTEN IN, READ OFF ITS NAME, because the file already says so and asking an
// author to say it again is a second place for it to be wrong.
const spoken = (file: string): string => {
    const end = file.slice(file.lastIndexOf('.') + 1).toLowerCase();

    return end === 'ts' || end === 'tsx' || end === 'js' || end === 'mjs' ? 'typescript'
        : end === 'json' ? 'json'
            : end === 'sh' ? 'bash' : '';
};

export interface $CodeNavigator$ extends $Code$ {
    file: string;
}

export class $CodeNavigator extends $Code implements $CodeNavigator$ {
    definition = 'figure';
    $file = '';

    get file(): string { return this.$file; }

    // READ OFF `file` AND NOT OFF THE PROP BEHIND IT, so a kind that answers its file some other way
    // — one that asks its chapter rather than being told — is highlighted like any other.
    override get language(): string {
        const said = this.$language !== '' ? this.$language : spoken(this.file);

        return known.has(said) ? said : '';
    }

    // THE FILE'S TEXT, WITH THE BLANK LINES AT EITHER END TAKEN OFF. A raw import keeps the trailing
    // newline every well-formed file ends with, which inside a <pre> is a blank line on every page.
    protected get source(): string { return html.text(this._block).replace(/^\n+|\s+$/gu, ''); }

    $CodeNavigator(block: $Block) {
        super.$Code(this.addType(block, $TypeOfCodeNavigator));
    }

    protected lit(): string {
        const said = this.language;

        return said === '' ? core.highlightAuto(this.source).value : core.highlight(this.source, { language: said }).value;
    }

    // A FIGURE CARRYING THE FILE'S NAME, which is what makes it navigable: a reader who wants to
    // change what they are looking at needs to know which file to open.
    override print(): ReactNode {
        return (
            <>
                <figcaption className="pd-caption">{this.$file}</figcaption>
                <pre className="pd-source">
                    <code className={this.language === '' ? 'hljs' : `hljs language-${this.language}`}
                        dangerouslySetInnerHTML={{ __html: this.lit() }} />
                </pre>
            </>
        );
    }
}

export class $TypeOfCodeNavigator extends $TypeOfCode {
    protected override specification: Specification<$Writing> = new CodeNavigatorSpecification();
}

export class CodeNavigatorSpecification extends CodeSpecification {
    @specify('a code navigator names the file it draws')
    $namesItsFile(writing: $Writing): void {
        $check((writing as $CodeNavigator).file.trim() !== '',
            'a code navigator names the file it draws, and this one names none');
    }

    @specify('a code navigator holds the text of its file')
    $holdsSomething(writing: $Writing): void {
        $check(html.text(writing._block).trim() !== '',
            `a code navigator holds the text of its file, and ${(writing as $CodeNavigator).file || 'this one'} came in empty`);
    }
}

export const CodeNavigator = $($CodeNavigator);
export const TypeOfCodeNavigator = $($TypeOfCodeNavigator);
