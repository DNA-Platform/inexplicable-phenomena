import { $, $check, $Block, $Chemical } from '@dna-platform/chemistry';
import { $Writing, $Annotation, WritingSpecification } from './Writing';

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
    level = 1;

    $Level(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        const block = this.contents.at(0);
        if (block instanceof $Block) this.level = Number(block.elements.join(''));
    }
}

export class $Strict extends $Annotation {
    override defines(writing: $Writing): void {
        for (const permissive of writing.annotations.find($Permissive))
            permissive.express(false);
    }

    override specifies(composition: $Composition): void {
        $check(composition instanceof $Composition, 'strict is said of a composition, and this is not one');
        $check(composition.parts
            .every(part => part.level === composition.level || part.level === composition.level - 1),
            'a strict composition holds parts at its level or one below, and this one holds another');
    }
}

export class $Permissive extends $Annotation {
    override defines(writing: $Writing): void {
        for (const strict of writing.annotations.find($Strict))
            strict.express(false);
    }

    override specifies(composition: $Composition): void {
        $check(composition instanceof $Composition, 'permissive is said of a composition, and this is not one');
        $check(composition.parts
            .every(part => part.level <= composition.level),
            'a permissive composition holds parts at or below its level, and this one holds one above');
    }
}

export class $Open extends $Annotation {
    override defines(writing: $Writing): void {
        for (const closed of writing.annotations.find($Closed))
            closed.express(false);
    }
}

export class $Closed extends $Annotation {
    override defines(writing: $Writing): void {
        for (const open of writing.annotations.find($Open))
            open.express(false);
    }

    override specifies(writing: $Writing): void {
        $check(writing.contents
            .every(chemical => chemical instanceof $Writing),
            'a closed composition holds only writing, and this one holds something else');
    }
}

export class CompositionSpecification extends WritingSpecification { }

export const Composition = $($Composition);
export const Level = $($Level);
export const Strict = $($Strict);
export const Permissive = $($Permissive);
export const Open = $($Open);
export const Closed = $($Closed);
