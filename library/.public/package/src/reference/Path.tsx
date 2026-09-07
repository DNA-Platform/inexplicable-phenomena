import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { url } from '@/utilities/Url';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Annotation$, $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';

export interface $Path$ extends $Annotation$ { }

export class $Path extends $Annotation implements $Path$ {
    $Path(block: $Block) {
        super.$Writing($check(block, $Block).concat($check($TypeOfPath, '!')));
    }

    override view(): ReactNode {
        return html.text(this._block);
    }
}

export class $TypeOfPath extends $Type {
    override name = 'Path';
    protected override specification: Specification<$Writing> = new PathSpecification();
}

export class PathSpecification extends WritingSpecification {
    @specify('a path reads as a url')
    $readsAsUrl(writing: $Writing): void {
        const copy = html.text(writing._block);
        $check(url.reads(copy), 'a path reads as a url, and this one does not');
    }

    @specify('a path composes nothing')
    override $composesWhatItHolds(writing: $Writing): boolean | void {
        return false;
    }
}

export const Path = $($Path);
export const TypeOfPath = $($TypeOfPath);
