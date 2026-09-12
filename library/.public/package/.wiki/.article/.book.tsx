import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Theme } from '@dna-platform/public';
import { Appearance, EncyclopediaTheme } from '@dna-platform/public/encyclopedia';

export default class $Article extends $Book {
    override header(): ReactNode {
        const Panel = $(Appearance);

        return <Panel />;
    }
}

export const Article = $($Article);

$(Article, Theme)(EncyclopediaTheme);
