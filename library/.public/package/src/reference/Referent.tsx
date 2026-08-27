import { $Type } from '@/notation/Type';
import { $Chemical } from '@dna-platform/chemistry';

export interface $Referent$ extends $Chemical {
    specify(): void;
    specification: $Type[];
}
