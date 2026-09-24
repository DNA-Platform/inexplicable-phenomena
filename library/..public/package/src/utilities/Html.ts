import { $Block, $Chemical } from '@dna-platform/chemistry';
import { ChemicalCollection } from './Collection';

export class HtmlUtilities {
    copy(contents: ChemicalCollection<$Chemical>): string {
        return [...contents].filter((chemical): chemical is $Block => chemical instanceof $Block)
            .flatMap(block => block.elements).join('');
    }
}

export const html = new HtmlUtilities();
