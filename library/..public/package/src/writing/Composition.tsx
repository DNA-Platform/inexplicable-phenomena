import { $, $check, $Block, $Chemical } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { $Writing, $Annotation, WritingSpecification, AnnotationSpecification } from './Writing';

export class $Composition extends $Writing {
    specification = new CompositionSpecification();
    get level(): number { return this.annotations.expressed($Level)?.level ?? 1; }
    get composition(): $Composition | undefined { return this.parent instanceof $Composition ? this.parent : undefined; }
    get depth(): number { return this.composition instanceof this.constructor ? this.composition.depth + 1 : 0; }
    get canonical(): $Composition | undefined { return this.parts[0]; }
    get parts(): $Composition[] {
        return this.contents.find($Composition).flatMap(composition =>
            composition instanceof this.constructor ? composition.parts : [composition]);
    }
}

export class $Level extends $Annotation {
    specification = new LevelSpecification();
    level = 1;

    $Level(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        const block = this.contents.at(0);
        if (block instanceof $Block) this.level = Number(block.elements.join(''));
    }
}

export class $Strict extends $Annotation {
    specification = new StrictSpecification();

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Permissive)
                writing.annotations.express(annotation, false);
    }
}

export class $Permissive extends $Annotation {
    specification = new PermissiveSpecification();

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Strict)
                writing.annotations.express(annotation, false);
    }
}

export class $Open extends $Annotation {
    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Closed)
                writing.annotations.express(annotation, false);
    }
}

export class $Closed extends $Annotation {
    specification = new ClosedSpecification();

    override defines(writing: $Writing): void {
        for (const annotation of writing.annotations.after(this))
            if (annotation instanceof $Open)
                writing.annotations.express(annotation, false);
    }
}

export class CompositionSpecification extends WritingSpecification { }

export class LevelSpecification extends AnnotationSpecification {
    @specify('a level is said of a composition')
    $saidOfAComposition(writing: $Writing): void {
        $check(writing instanceof $Composition, 'a level is said of a composition, and this is not one');
    }

    @specify('a level is a number')
    $isANumber(writing: $Writing): void {
        $check(Number.isInteger(writing.annotations.expressed($Level)?.level ?? 1),
            'a level is a number, and this one was written as something else');
    }
}

export class StrictSpecification extends AnnotationSpecification {
    @specify('a strict composition holds parts at its level or one below')
    $holdsPartsAtOrOneBelow(composition: $Composition): void {
        $check(composition instanceof $Composition, 'strict is said of a composition, and this is not one');
        $check(composition.parts
            .every(part => part.level === composition.level || part.level === composition.level - 1),
            'a strict composition holds parts at its level or one below, and this one holds another');
    }
}

export class PermissiveSpecification extends AnnotationSpecification {
    @specify('a permissive composition holds parts at or below its level')
    $holdsPartsAtOrBelow(composition: $Composition): void {
        $check(composition instanceof $Composition, 'permissive is said of a composition, and this is not one');
        $check(composition.parts
            .every(part => part.level <= composition.level),
            'a permissive composition holds parts at or below its level, and this one holds one above');
    }
}

export class ClosedSpecification extends AnnotationSpecification {
    @specify('a closed composition holds only writing')
    $holdsOnlyWriting(writing: $Writing): void {
        $check([...writing.contents]
            .every(chemical => chemical instanceof $Writing),
            'a closed composition holds only writing, and this one holds something else');
    }
}

export const Composition = $($Composition);
export const Level = $($Level);
export const Strict = $($Strict);
export const Permissive = $($Permissive);
export const Open = $($Open);
export const Closed = $($Closed);
