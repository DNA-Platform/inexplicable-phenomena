import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, AnnotationSpecification } from './Writing';
import { $Composition } from './Composition';
import { $Letter } from './Letter';
import { $Section } from './Section';

export class $List extends $Annotation {
    $ordered = false;
    specification = new ListSpecification();
    get composition(): $Composition | undefined { return this.parent instanceof $Composition ? this.parent : undefined; }
    get items(): $Composition[] { return this.composition?.parts.slice(this.composition instanceof $Section ? 1 : 0) ?? []; }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-list');
        if (this.$ordered) writing.classes.add(this, 'pa-ordered');
    }

    override erase(writing: $Writing): void {
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
