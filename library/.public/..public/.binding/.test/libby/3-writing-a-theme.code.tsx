import { $ } from '@dna-platform/chemistry';
import { $LibraryTheme } from '../manual/.book';

export class $DarkTheme extends $LibraryTheme {
    ink = 'ivory';
    paper = '#1f1f24';
    link = 'lightsteelblue';
}

export const DarkTheme = $($DarkTheme);
