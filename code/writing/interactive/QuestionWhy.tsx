import { Work } from '../../base/Work';

export class QuestionWhy extends Work {
  why: Work | null = null;
  
  component() {
    return <div className="question-why"></div>;
  }
}