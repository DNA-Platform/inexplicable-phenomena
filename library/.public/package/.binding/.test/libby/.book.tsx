import { $ } from '@dna-platform/chemistry';
import { Theme } from '@dna-platform/public';
import { $LibraryTheme, $TheLibrary } from '../manual/.book';

export default class $Libby extends $TheLibrary { }

export class $DarkTheme extends $LibraryTheme {
    ink = 'ivory';
    paper = '#1f1f24';
    link = 'lightsteelblue';
}

export const DarkTheme = $($DarkTheme);
const Libby = $($Libby);
$(Libby, Theme)(DarkTheme);
