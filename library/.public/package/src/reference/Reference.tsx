import { $Referent } from './Referent';

export interface $Reference$<T extends $Referent = any> extends $Referent {
    copy: string;
    parenthetical: boolean;
    read(): T;
    then<U extends $Referent>(next: $Reference$<U>): $Reference$<U>;
}
