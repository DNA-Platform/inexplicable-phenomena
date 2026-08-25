import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Theme, Book } from '@dna-platform/lib';
import * as lib from '@dna-platform/lib';

// THE COMPOSITION ROOT'S ONE JOB — the theme, the component, the registration.
//
// The framework ships a base theme and registers nothing, because a framework
// that configured itself could not be re-dressed from outside. This is the only
// file in the application that registers anything.
//
// AND IT IS THE ONE SOURCE FOR BOTH SIDES. The application's own chrome — its
// running head, its catalogue entries — reads the same object the books read,
// so a change here moves the whole page rather than half of it. That is not
// yet true of the entries themselves; see the note at the foot of this file.

export class $Library extends $Theme {
    override $measure? = '42rem';
    override $leading? = 1.65;
    override $rhythm? = '2.75rem';
    override $size? = 1.05;
}

const Dressing = $($Library);

/** The one held theme. The application reads it directly; the books resolve it. */
export const dressing = $(<Dressing />) as $Library;

export const dress = (): void => {
    // AND THE LIBRARY'S OWN CATALOGUE, so an annotation asking its scope for its
    // card finds one. The compiler cannot do this — scope registration needs a
    // render context — so the composition root does it.
    $(Book, lib.Theme)(Dressing);
};

// WHAT A THEME DOES NOT REACH YET, and it is worth knowing rather than
// discovering: a subject's catalogue ENTRIES are drawn by the application, not
// by the model, so a theme reaches their colours through the values below and
// not their arrangement. The route to closing that is for a synopsis carrying a
// card to draw itself as an entry — then a theme reaches the whole library by
// the same path it reaches a book. Named, not taken.
