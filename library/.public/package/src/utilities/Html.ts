import { $Block, $Chemical } from '@dna-platform/chemistry';
import { Collection } from './Collection';

export class HtmlUtilities {
    copy(contents: Collection<$Chemical>): string {
        return [...contents].filter((chemical): chemical is $Block => chemical instanceof $Block)
            .flatMap(block => block.elements).join('');
    }
}

export const html = new HtmlUtilities();
