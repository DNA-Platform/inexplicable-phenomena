import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Book } from '@dna-platform/public';
import $Wiki from '../.book';
import { Appearance } from '@dna-platform/public/application';
import { $EncyclopediaTheme } from '@dna-platform/public/encyclopedia';

export default class $Article extends $Wiki {
    override header(): ReactNode {
        const Panel = $(Appearance);

        return <Panel />;
    }
}

export const Article = $($Article);

$EncyclopediaTheme.$register(Book);
