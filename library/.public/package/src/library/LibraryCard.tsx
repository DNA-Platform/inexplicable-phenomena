import { type $Chemical } from '@dna-platform/chemistry';
import { type $Book } from '../book/Book';
import { type $Author } from '../book/Author';
import { $IndexCard } from './IndexCard';

type Below = 'sections' | 'paragraphs' | 'sentences' | 'words' | 'letters';
type Itself = 'cover' | 'canonical' | 'ref' | 'tableOfContents';
type Owed = 'chapters' | 'synopsis' | 'title' | 'subtitle' | 'copy';

type Carries = Exclude<keyof $Book, keyof $Chemical | Below | Itself | Owed>;

type Carried<V> =
    [V] extends [string | number | boolean | undefined] ? V :
    [V] extends [$Author | undefined] ? $LibraryCard :
    never;

export type $LibraryCard = $IndexCard<$Book> & { [K in Carries]: Carried<$Book[K]> };
