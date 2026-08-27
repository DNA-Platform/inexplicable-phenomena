import { $Chemical } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';

export interface $Referent$ extends $Chemical {
    specify(): void;
    get specification(): $Writing<any>[];
}
