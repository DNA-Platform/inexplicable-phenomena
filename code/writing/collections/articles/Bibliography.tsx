import { Collection } from '../../../base/Collection';
import { Citation } from './Citation';

export class Bibliography extends Collection<Citation> {
  component(): React.ReactNode {
    return (
      <div className="bibliography">
        <h2>References</h2>
        <ol>
          {this.items.map((citation, i) => (
            <li key={citation.id || i} id={`citation-${citation.id}`}>
              {citation.component()}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}