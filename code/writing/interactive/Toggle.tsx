import { Work } from '../../base/Work';

export class Toggle extends Work {
  expanded: boolean = false;
  label: string = 'Show more';
  collapsedLabel: string = 'Show less';
  content?: Work;
  
  component(): React.ReactNode {
    return (
      <div className="toggle">
        <button 
          className="toggle-button"
          onClick={() => this.expanded = !this.expanded}
        >
          {this.expanded ? this.collapsedLabel : this.label}
        </button>
        {this.expanded && this.content && (
          <div className="toggle-content">
            {this.content.component()}
          </div>
        )}
      </div>
    );
  }
}