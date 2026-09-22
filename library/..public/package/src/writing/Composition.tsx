import { $, $check, $Block } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing, $Annotation, WritingSpecification } from './Writing';

export class $Composition extends $Writing {
    level = 0;
    override specification: Specification<$Writing> = new CompositionSpecification();

    get parts(): $Composition[] {
        return this.contents.find($Composition).flatMap(composition =>
            composition instanceof this.constructor ? composition.parts : [composition]);
    }

    get depth(): number {
        return this.parent instanceof this.constructor ? (this.parent as $Composition).depth + 1 : 0;
    }

    get canonical(): $Composition | undefined {
        return this.parts[0];
    }
}

export class $Level extends $Annotation {
    get level(): number {
        const block = this.contents.at(0);
        return block instanceof $Block ? Number(block.elements.join('')) : 0;
    }

    override defines(writing: $Writing): void {
        if (writing instanceof $Composition) writing.level = this.level;
    }

    override erase(writing: $Writing): void {
        if (writing instanceof $Composition) writing.level = 0;
    }
}

export class $Strict extends $Annotation {
    override defines(writing: $Writing): void {
        for (const permissive of writing.annotations.find($Permissive))
            permissive.enforced = false;
    }

    override specifies(writing: $Writing): void {
        const composition = writing as $Composition;
        $check(composition.parts.every(part => part.level === composition.level || part.level === composition.level - 1),
            'a strict composition holds parts at its level or one below, and this one holds another');
    }
}

export class $Permissive extends $Annotation {
    override defines(writing: $Writing): void {
        for (const strict of writing.annotations.find($Strict))
            strict.enforced = false;
    }

    override specifies(writing: $Writing): void {
        const composition = writing as $Composition;
        $check(composition.parts.every(part => part.level <= composition.level),
            'a permissive composition holds parts at or below its level, and this one holds one above');
    }
}

export class $Open extends $Annotation {
    override defines(writing: $Writing): void {
        for (const closed of writing.annotations.find($Closed))
            closed.enforced = false;
    }
}

export class $Closed extends $Annotation {
    override defines(writing: $Writing): void {
        for (const open of writing.annotations.find($Open))
            open.enforced = false;
    }

    override specifies(writing: $Writing): void {
        $check(writing.contents.every(chemical => chemical instanceof $Writing),
            'a closed composition holds only writing, and this one holds something else');
    }
}

export class CompositionSpecification extends WritingSpecification {
    override $holdsOnlyWriting(): void { }

    @specify('a composition has a level')
    $hasALevel(composition: $Composition): void {
        $check(composition.level > 0, 'a composition has a level above zero, and this one has none');
    }
}

export const Composition = $($Composition);
export const Level = $($Level);
export const Strict = $($Strict);
export const Permissive = $($Permissive);
export const Open = $($Open);
export const Closed = $($Closed);
