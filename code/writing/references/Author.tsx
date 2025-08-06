import { Reference } from './Reference';

export class Author extends Reference {
  displayName: string = '';
  
  component() {
    return <div className="author"></div>;
  }
}