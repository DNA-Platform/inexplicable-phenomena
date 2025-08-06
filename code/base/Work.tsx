import { Chemical } from '../chemistry';

export class Work extends Chemical {
  id?: string;
  container?: Work;
  
  component(): React.ReactNode {
    return (
      <div id={this.id} className={this.className()}>
        {this.content()}
      </div>
    );
  }
  
  className(): string {
    return 'work';
  }
  
  content(): React.ReactNode {
    return null;
  }
}