import { $Writing } from '@/writing/Writing';

export class $Annotation<P extends $Writing = $Writing<any>> extends $Writing<P> {
    parenthetical = true;
}
