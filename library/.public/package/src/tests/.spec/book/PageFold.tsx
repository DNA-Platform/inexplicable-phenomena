import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { PageFold } from '@/book/PageFold';
import { Path } from '@/reference/Path';

// A page fold — the dog-eared corner — is a reference to a chapter whose
// location models the view; its path must land on a chapter.
export class $PageFoldReferenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <PageFold>two<Path>Cr:1</Path></PageFold>
        );
    }
}

export const PageFoldReferenceExample = $($PageFoldReferenceExample);
