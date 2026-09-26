import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { CompositionSpecification } from './Composition';
import { $Word } from './Word';
import { $Reference, Reference as reference } from './Reference';

export class $Means extends $Word {
    specification = new MeansSpecification();
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    get means(): $Reference | undefined { return this.annotations.expressed($Reference); }

    protected override $Define(): void {
        super.$Define();
        const link = binder.reference(html.copy(this.text));
        if (link === undefined) return;
        const Reference = $(reference);
        this.annotations.add(this,
            <Reference>{link.identifier}</Reference>
        );
    }

    override write(): ReactNode { return this.name; }
}

export class MeansSpecification extends CompositionSpecification {
    @specify('a means says what it means')
    $saysWhatItMeans(means: $Means): void {
        $check(means.annotations.contains($Reference),
            'a means says its words and a url, and this one says no url');
    }
}

export const Means = $($Means);
