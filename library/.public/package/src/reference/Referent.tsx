import { $Chemical } from '@dna-platform/chemistry';

export class $Referent extends $Chemical {
    $page = 0;

    get page(): number { return this.$page; }
    set page(at: number) { this.$page = at; }

    valid(): boolean {
        return true;
    }
}
