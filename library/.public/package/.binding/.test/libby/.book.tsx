import { $ } from '@dna-platform/chemistry';
import { $LibraryTheme, $TheLibrary } from '../manual/.book';

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
