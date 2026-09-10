import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { url } from '@/utilities/Url';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Annotation$, $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';
import { $Path, $TypeOfPath, Path as path } from './Path';

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
        super.$Writing(this.addType(block, $TypeOfReference));
        const copy = html.text(this._block);
        if (this.searchFor($TypeOfPath).length === 0 && this.reads(copy)) {
            const Path = $(path);
            this._block = this._block.concat($<$Path>(<Path>{copy}</Path>));
        }

        const at = html.text(this.path()?._block);
        if (at !== '') this.$pid ??= at;
    }

    protected reads(copy: string): boolean {
        return url.addresses(copy);
    }

    focus(): void {
        const at = html.text(this.path()?._block);
        if (at !== '') this.$pid ??= at;
        this.$focused = true;
        this.persist = true;
    }

    unfocus(): void {
        this.$focused = false;
        this.persist = false;
    }

    static $register(): void {
        reflection.knows({ reference: $Reference });
    }

    async read(): Promise<$Writing> {
        const referent = (this._block.$elements ?? [])
            .find((part): part is $Writing => reflection.writing(part) && !reflection.annotation(part));
        if (referent) return referent;
        throw new Error('a reference reads to what it means, and this one holds nothing to read');
    }
}

export class $TypeOfReference extends $Type {
    protected override specification: Specification<$Writing> = new ReferenceSpecification();
}

export class ReferenceSpecification extends WritingSpecification {
    // THREE WAYS TO ADSTYLE SOMETHING, and only the first was written down. A reference
    // CARRIES its path. A mention an author writes MEANS one — it holds the reference and
    // the path sits inside it, one level below a searchFor that does not recurse. And a
    // representative the parse MAKES — the $$Word behind every word — stands for the very
    // writing it holds and has nowhere to point. A rule the framework's own machinery
    // cannot satisfy is a rule stated too narrowly.
    @specify('a reference carries a path, means one, or stands for what it holds')
    $carriesPath(writing: $Writing): boolean | void {
        const meant = reflection.meaning(writing);
        $check(writing.searchFor($TypeOfPath).length > 0
            || (meant !== undefined && meant.searchFor($TypeOfPath).length > 0)
            || this.beside(writing).length > reflection.annotations(writing).length,
            'a reference carries a path, means one, or stands for what it holds, and this one does none');
    }


}

export const Reference = $($Reference);
export const TypeOfReference = $($TypeOfReference);
