import { $check, $Chemical, $Html } from '@dna-platform/chemistry';
import { $Referent$ } from '@/reference/Referent';
import { $Type } from '@/notation/Type';
import { html } from '@/utilities/Html';

export class $Writing extends $Chemical implements $Referent$ {
    inline = true;
    parenthetical = false;
    text?: $Html<'block'>;
    specification: $Type[] = [];

    $Writing(...writing: $Chemical[]) {
        this.text = $check(writing[0] as $Html<'block'>, 'block');
        this.specification = this.written().filter(one => (one as $Writing).parenthetical === true) as $Type[];
    }

    written(): (string | number | $Chemical)[] {
        return (this.text?.$elements ?? []) as (string | number | $Chemical)[];
    }

    get copy(): string {
        return html.text(this.text);
    }

    specify(): void {
        $check(this.specification.length > 0 || this.parenthetical, 'a piece of writing has a type, and this one has none');
    }
}
