import { $check, $Chemical, $Html } from '@dna-platform/chemistry';
import { $Referent$ } from '@/reference/Referent';
import { $Type } from '@/notation/Type';
import { html } from '@/utilities/Html';

export class $Writing extends $Chemical implements $Referent$ {
    inline = true;
    parenthetical = false;
    text!: $Html<'block'>;
    specification: $Type[] = [];

    // NAMING IS OWED. A written part says whether it annotates the writing it
    // stands in, and $Writing cannot ask `instanceof $Type` — $Annotation
    // extends $Writing, so naming the class closes the module cycle.
    get annotation(): boolean { return false; }

    $Writing(...writing: $Chemical[]) {
        this.text = $check(writing[0] as $Html<'block'>, 'block');
        this.specification = this.written().filter(one => (one as $Writing).annotation === true) as $Type[];
    }

    written(): (string | number | $Chemical)[] {
        return (this.text?.$elements ?? []) as (string | number | $Chemical)[];
    }

    get copy(): string {
        return html.text(this.text);
    }

    // WRITING IS TYPED, and an annotation is exempt because it IS the typing.
    specify(): void {
        $check(this.specification.length > 0 || this.annotation, 'a piece of writing has a type, and this one has none');
    }
}
