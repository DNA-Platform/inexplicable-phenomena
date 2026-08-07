import { type $Chemical } from '@dna-platform/chemistry';
import { type $Book } from '../book/Book';
import { type $Chapter } from '../book/Chapter';
import { type $Author } from '../book/Author';
import { type $Title } from '../writing/Title';
import { type $Subtitle } from '../writing/Subtitle';
import { $IndexCard } from './IndexCard';

export type $ChapterDescription = { name: string; index: number; parenthetical: boolean };

type Below = 'sections' | 'paragraphs' | 'sentences' | 'words' | 'letters' | 'copy';
type Itself = 'cover' | 'canonical' | 'ref' | 'tableOfContents';

type Named = Exclude<keyof $Book, keyof $Chemical | Below | Itself>;

type Carried<V> =
    [V] extends [string | number | boolean | undefined] ? V :
    [V] extends [$Title | undefined] ? $Title | undefined :
    [V] extends [$Subtitle | undefined] ? $Subtitle | undefined :
    [V] extends [$Author | undefined] ? $LibraryCard :
    [V] extends [$Chapter[]] ? $ChapterDescription[] :
    [V] extends [$Chapter | undefined] ? $ChapterDescription :
    never;

export type $LibraryCard = $IndexCard<$Book> & {
    [K in Named as K extends string ? (K extends `$${string}` ? never : $Book[K] extends Function ? never : K) : never]: Carried<$Book[K]>
};
