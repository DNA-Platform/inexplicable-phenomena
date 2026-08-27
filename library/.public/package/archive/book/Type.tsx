import { $ } from '@dna-platform/chemistry';
import { $Annotation } from './Annotation';

// <Type>Autobiography</Type> — THE NAME IS THE CONTENT, exactly as an author's
// name is the content of an $Author. Doug: "I think we need
// <Type>Autobiography</Type>. And we will have to find a way to specify what that
// means in the books methinks. That is how we do other annotations like subject
// and object."
//
// So what `Autobiography` MEANS is written in the library rather than encoded in
// a class — which is why the four special book classes the derivation named are
// never built. A book CARRIES a type; it does not have to BE one.
export class $Type extends $Annotation {
    protected override get kind(): string { return 'type'; }

    // A type names itself and points at nothing, so it needs no card.
    override valid(): boolean {
        return this.copy.trim() !== '';
    }
}

export const Type = $($Type);
