import { Collection } from '../../../base/Collection';
import { Chapter } from '../../content/Chapter';

export class TableOfContents extends Collection<Chapter> {
  component(): React.ReactNode {
    const book = this.container; // Should be a Book
    if (!book || !('chapters' in book)) return null;
    
    return (
      <nav className="table-of-contents">
        <h2>Contents</h2>
        <ol>
          {(book as any).chapters.map((chapter: Chapter, i: number) => (
            <li key={chapter.id || i}>
              <a href={`#chapter-${chapter.number || i}`}>
                {chapter.number && `${chapter.number}. `}
                {chapter.title?.text()}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    );
  }
}