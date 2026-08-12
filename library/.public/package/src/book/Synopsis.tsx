import { $ } from '@dna-platform/chemistry';
import { $Chapter } from './Chapter';
import { $Book } from './Book';
import { $IndexCard } from '../library/IndexCard';

export class $Synopsis extends $Chapter {
    $parenthetical? = false;

    $for?: $IndexCard<$Book> = undefined;

    get card(): $IndexCard<$Book> | undefined { return this.$for; }

    read(): $Book {
        return this.$for ? this.$for.read() : super.read();
    }
}

export const Synopsis = $($Synopsis);
