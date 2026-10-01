import { $, $check, selection } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from './Writing';
import { $Composition } from './Composition';
import { $Format } from './Format';
import { $Letter } from './Letter';
import { $Section } from './Section';

export class $List extends $Format {
    $ordered = false;
    specification = new ListSpecification();
    style = selection.div`
        .pa-list { counter-reset: list-item; }
        .pa-item { display: list-item; list-style: disc inside; margin-block: calc(${({ theme }) => theme.space} / 4); }
        .pa-ordered .pa-item { list-style-type: decimal; }
    `;
    get composition(): $Composition | undefined { return this.parent instanceof $Composition ? this.parent : undefined; }
    get items(): $Composition[] { return this.composition?.parts.slice(this.composition instanceof $Section ? 1 : 0) ?? []; }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-list');
        if (this.$ordered) writing.classes.add(this, 'pa-ordered');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }

    protected override $Bound(): void {
        for (const item of this.items)
            item.classes.add(this, 'pa-item');
        super.$Bound();
    }
}

export class ListSpecification extends AnnotationSpecification {
    @specify('a list is said of a composition with parts')
    $saidOfACompositionWithParts(writing: $Writing): void {
        $check(writing instanceof $Composition && !(writing instanceof $Letter),
            'a list is said of a composition with parts, and a letter has none');
    }
}

export const List = $($List);
