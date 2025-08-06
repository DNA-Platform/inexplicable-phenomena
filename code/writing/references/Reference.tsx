import { Work } from '../../base/Work';

export class Reference extends Work {
  source?: Work | string;
  target: Work | string;
  
  component() {
    return <div className="reference"></div>;
  }
}