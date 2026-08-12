import { $ } from '@dna-platform/chemistry';
import { $Word } from './Word';

// A PHRASE is a kind of word — Doug's, 2026-08-12: "why not make a $Phrase a
// type of word — maybe it's a word that can contribute multiple words if that's
// possible (if not we treat it as one)". This is the second, and it is the one
// that needs no new machinery: a phrase is ONE word that admits what a name
// contains, spaces among them.
//
// It exists because a name was claiming to be a sentence. An author's name IS
// writing, but it sits INSIDE a sentence rather than standing as one, and the
// level it is written at is what the parse asks — so the misfit was never in
// the parse, it was in the level the name declared.
//
// $Cover is the precedent: a special kind of a level, playing a role at it.
export class $Phrase extends $Word {
    valid(): boolean {
        return this.copy !== '' && /[\p{L}\p{N}]/u.test(this.copy);
    }
}

export const Phrase = $($Phrase);
