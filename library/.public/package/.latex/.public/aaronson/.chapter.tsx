// The book's normal chapter (ch20's convention): subclass $Chapter, default-export its component, import as Chapter.
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@dna-platform/public';

export class $AaronsonChapter extends $Chapter { }

export default $($AaronsonChapter);
