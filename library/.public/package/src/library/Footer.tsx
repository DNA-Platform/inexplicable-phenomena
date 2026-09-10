import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Document, $Document$, $TypeOfDocument, DocumentSpecification } from './Document';

export interface $Footer$ extends $Document$ { }

export class $Footer extends $Document implements $Footer$ {
    definition = 'footer';
    $Footer(block: $Block) {
        super.$Document(this.addType(block, $TypeOfFooter));
    }
}

export class $TypeOfFooter extends $TypeOfDocument {
    protected override specification: Specification<$Writing> = new FooterSpecification();
}

export class FooterSpecification extends DocumentSpecification {
    @specify('a footer may stand empty until something is written into it')
    override $saysSomething(): boolean | void {
        return false;
    }
}

export const Footer = $($Footer);
export const TypeOfFooter = $($TypeOfFooter);
