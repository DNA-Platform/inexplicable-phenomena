import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Annotation$, $Annotation, $Type, $Writing, WritingSpecification } from '@/writing/Writing';

export interface $Path$ extends $Annotation$ { }

export class $Path extends $Annotation implements $Path$ {
    $Path(block: $Block) {
        super.$Writing(block);
        if (reflection.is(this, $TypeOfPath)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfPath, '!')];
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
    protected patterns = {
        broken: /\s/u
    };

    @specify('a path reads as a url')
    $readsAsUrl(writing: $Writing): void {
        const copy = html.text(writing._block);
        $check(!this.patterns.broken.test(copy) && URL.canParse(copy, 'https://library'),
            'a path reads as a url, and this one does not');
    }

    @specify('a path composes nothing')
    override $composesWhatItHolds(writing: $Writing): boolean | void {
        return false;
    }
}

export const Path = $($Path);
export const TypeOfPath = $($TypeOfPath);
const typeOfPath = TypeOfPath;
