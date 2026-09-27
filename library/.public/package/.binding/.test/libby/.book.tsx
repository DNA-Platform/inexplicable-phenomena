import { $ } from '@dna-platform/chemistry';
import $TheLibrary, { $LibraryTheme } from '../the-library/.book';

// LIBBY'S BOOK IS DARK: her own theme stood in front of the library's, which the singular Theme takes out
// of expression, so one book of the library shows a theme overwritten — Doug, 2026-09-27: "I hope that dark
// is something in the test library to test the ability of theme to be overwritten and I like that."
export default class $Libby extends $TheLibrary {
    protected override $Define(): void {
        super.$Define();
        this.annotations.add(this,
            <DarkTheme />
        );
    }
}

export class $DarkTheme extends $LibraryTheme {
    ink = 'ivory';
    paper = '#1f1f24';
    link = 'lightsteelblue';
}

export const DarkTheme = $($DarkTheme);
