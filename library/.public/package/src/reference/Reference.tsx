import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Annotation$, $Annotation, $Type, $Writing, WritingSpecification } from '@/writing/Writing';
import { $Path, $TypeOfPath, Path as path } from './Path';
import { AnchorFormat as anchor } from '@/encyclopedia/AnchorFormat';

export interface $Reference$ extends $Annotation$ {
    $focused: boolean;

    path(): $Path | undefined;
    focus(): void;
    unfocus(): void;
    read(): Promise<$Writing>;
}

export class $Reference extends $Annotation implements $Reference$ {
    $focused = false;

    path(): $Path | undefined { return this.searchForOne<$Path>($TypeOfPath); }

    $Reference(block: $Block) {
        super.$Writing(block);
        if (!reflection.is(this, $TypeOfReference))
            this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfReference, '!')];
        const copy = html.text(this._block);
        if (this.searchFor($TypeOfPath).length === 0 && this.reads(copy)) {
            const Path = $(path);
            this._block.$elements = [...(this._block.$elements ?? []), $<$Path>(<Path>{copy}</Path>)];
        }

        this.$pid ??= html.text(this.path()?._block);
    }

    protected reads(copy: string): boolean {
        return /^(?:[a-z][a-z0-9+.-]*:\/\/|\/|#)/iu.test(copy) && URL.canParse(copy, 'https://library');
    }

    override view(): ReactNode {
        const Anchor = $(anchor);
        const url = html.text(this.path()?._block);

        return <Anchor href={url} onClick={() => this.focus()}>{url}</Anchor>;
    }

    focus(): void {
        this.$pid ??= html.text(this.path()?._block);
        this.$focused = true;
        this.persist = true;
    }

    unfocus(): void {
        this.$focused = false;
        this.persist = false;
    }

    async read(): Promise<$Writing> {
        const referent = (this._block.$elements ?? [])
            .find((part): part is $Writing => reflection.writing(part) && !(part instanceof $Annotation));
        if (referent) return referent;
        throw new Error('a reference reads to what it means, and this one holds nothing to read');
    }
}

export class $TypeOfReference extends $Type {
    override name = 'Reference';
    protected override specification: Specification<$Writing> = new ReferenceSpecification();
}

export class ReferenceSpecification extends WritingSpecification {
    @specify('a reference carries a path')
    $carriesPath(writing: $Writing): boolean | void {
        $check(writing.searchFor($TypeOfPath).length > 0,
            'a reference carries a path, and this one carries none');
    }

    @specify('a reference lands on the kind it names')
    $landsOnIt(writing: $Writing): boolean | void {
        const code = reflection.code(writing.type());
        if (code === undefined) return false;
        const step = html.text(writing.searchForOne<$Path>($TypeOfPath)?._block).split('/').pop();
        $check(!!step && step.startsWith(`${code}:`),
            'a reference lands on the kind it names, and this path lands on something else');
    }

    @specify('a reference composes nothing of its own')
    override $composesWhatItHolds(writing: $Writing): boolean | void {
        return false;
    }
}

export const Reference = $($Reference);
export const TypeOfReference = $($TypeOfReference);
const typeOfReference = TypeOfReference;
