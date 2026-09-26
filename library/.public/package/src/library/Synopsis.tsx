import { ReactNode } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Reference, Reference as reference } from '@/writing/Reference';
import { $Chapter } from './Chapter';

export class $Synopsis extends $Format {
    specification = new SynopsisSpecification();
    protected _synopsis?: $Chapter;
    get chapter(): $Chapter | undefined { return this.parent instanceof $Chapter ? this.parent : undefined; }
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    get means(): $Reference | undefined { return this.annotations.expressed($Reference) ?? this._synopsis?.mention ?? this.chapter?.mention; }

    $Synopsis(...chemicals: $Chemical[]) {
        this._synopsis = chemicals.find((chemical): chemical is $Chapter => chemical instanceof $Chapter);
        this.$Format(...chemicals.filter(chemical => chemical !== this._synopsis));
    }

    override write(): ReactNode { return this.name; }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-synopsis');
        if (this._synopsis === undefined) return;
        const title = this._synopsis.canonical;
        writing.text.append(this, ...[...this._synopsis.text].filter(chemical => chemical !== title));
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
        writing.text.revert(this);
    }

    protected override $Define(): void {
        super.$Define();
        const link = binder.reference(html.copy(this.text));
        if (link === undefined) return;
        const Reference = $(reference);
        this.annotations.add(this,
            <Reference>{link.identifier}</Reference>
        );
    }

    protected override $Bound(): void {
        const title = this.chapter?.title;
        if (title?.means !== undefined && this.means !== undefined && this.means !== title.means) {
            const Reference = $(reference);
            title.annotations.replace(this, title.means, reflection.chemical(<Reference>{this.means.identifier}</Reference>, title));
            title.annotations.define();
        }
        super.$Bound();
    }
}

export class SynopsisSpecification extends AnnotationSpecification {
    @specify('a synopsis is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a synopsis is said of a chapter, and this is not one');
    }
}

export const Synopsis = $($Synopsis);
