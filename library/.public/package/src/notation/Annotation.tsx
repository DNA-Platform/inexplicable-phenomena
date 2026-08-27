import { $Writing } from '@/writing/Writing';

export class $Annotation extends $Writing {
    parenthetical = true;

    override get annotation(): boolean { return true; }
}
