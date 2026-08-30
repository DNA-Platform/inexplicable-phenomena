import { ReactNode } from 'react';
import { $, $Block, $check, $Chemical, $Html, look } from '@dna-platform/chemistry';
import { $Referent$ } from '@/reference/Referent';
import type { $Type } from '@/notation/Type';
import { html } from '@/utilities/Html';

export class $Writing extends $Chemical implements $Referent$ {
    inline = true;
    index = 0;
    parenthetical = false;
    annotation = false;
    block: $Html<'block'> = new $Block();
    type!: $Type;
    protected inside?: $Writing = undefined;

    get copy(): string { return this.bound ? this.inside!.copy : html.text(this.block); }
    get canonical(): boolean { return true; }
    get annotations(): $Writing[] { return this.block.$elements!.filter((one): one is $Writing => one instanceof $Writing && one.annotation); }
    protected get bound() { return !!this.inside; }

    $Writing(block: $Html<'block'>) {
        this.block = $check(block, 'block');
        this.type = this.annotations.at(0) as unknown as $Type;
    }

    view(): ReactNode {
        return this.bound ? this.inside!.view() : this.block.view();
    }

    @look('back')
    $view(): ReactNode {
        return this.bound ? this.inside!.$view() : this.copy;
    }

    specify(): void {
        $check(!!this.type || this.parenthetical, 'a piece of writing has a type, and this one has none');
        this.type?.specifically(this);
    }

    bind(writing: $Writing) {
        this.inside = writing;
    }
}

export const Writing = $($Writing);
