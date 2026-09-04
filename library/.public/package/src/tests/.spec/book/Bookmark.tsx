import { ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { Bookmark } from '@/book/Bookmark';
import { Path } from '@/reference/Path';

// A bookmark stands in a chapter, or — as here, rehydrated — carries the path
// it kept; inserted in prose it finds its chapter by grabbing its parent.
export class $BookmarkReferenceExample extends $Chemical {
    view(): ReactNode {
        return (
            <Bookmark>here<Path>Cr:1</Path></Bookmark>
        );
    }
}

export const BookmarkReferenceExample = $($BookmarkReferenceExample);
