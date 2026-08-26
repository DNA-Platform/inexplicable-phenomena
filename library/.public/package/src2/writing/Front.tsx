import { $Chemical } from '@dna-platform/chemistry';
import { $Referent$ } from '@/reference/Referent';
import { $Type } from '@/notation/Type';

export class $Front extends $Chemical implements $Referent$ {
    specification: $Type[] = [];

    specify(): void {
    }
}
