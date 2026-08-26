import { $, $check } from '@dna-platform/chemistry';
import { $Sentence } from './Sentence';

export class $Caption extends $Sentence {
    valid(): boolean {
        return $check(this.copy.trim() !== '', 'a caption is never absent, and this one says nothing');
    }
}

export const Caption = $($Caption);
