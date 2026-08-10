import { $, type $Chemical } from '@dna-platform/chemistry';
import { type $Book } from '../book/Book';
import { type $Chapter } from '../book/Chapter';
import { type $Reference$ } from '../reference/Reference';
import { $IndexCard } from './IndexCard';

type Composed = 'sections' | 'paragraphs' | 'sentences' | 'words' | 'letters' | 'copy';
type Reflexive = 'cover' | 'canonical' | 'ref' | 'tableOfContents';
type Recursive = 'library';

type Named = Exclude<keyof $Book, keyof $Chemical | Composed | Reflexive | Recursive>;

type Carried<V> =
    [V] extends [string | number | boolean | undefined] ? V :
    [V] extends [readonly $Chapter[]] ? string[] :
    [V] extends [$Reference$<$Book> | undefined] ? $LibraryCard | Extract<V, undefined> :
    string;

export type $LibraryCard = $IndexCard<$Book> & {
    [K in Named as K extends string ? (K extends `$${string}` ? never : $Book[K] extends Function ? never : K) : never]: Carried<$Book[K]>
} & {
    library: $LibraryCard | undefined
};

export class $LibraryCard$ extends $IndexCard<$Book> implements $LibraryCard {
    $title = '';
    $subtitle = '';
    $synopsis = '';
    $chapters: string[] = [];
    $author?: $LibraryCard = undefined;
    $subject?: $LibraryCard = undefined;

    get title(): string { return this.$title; }
    get subtitle(): string { return this.$subtitle; }
    get synopsis(): string { return this.$synopsis; }
    get chapters(): string[] { return this.$chapters; }
    get author(): $LibraryCard | undefined { return this.$author; }
    get subject(): $LibraryCard | undefined { return this.$subject; }
    get library(): $LibraryCard | undefined { return this.$subject === this ? (this as unknown as $LibraryCard) : this.$subject?.library; }
}

export const LibraryCard = $($LibraryCard$);
