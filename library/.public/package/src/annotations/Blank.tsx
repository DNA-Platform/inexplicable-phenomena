import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Annotation } from './Annotation';

export class $Blank extends $Annotation {
    override defines(writing: $Writing): void { writing.classes.add(this, 'pa-blank'); }
    override erase(writing: $Writing): void { writing.classes.revert(this); }
}

export const Blank = $($Blank);
