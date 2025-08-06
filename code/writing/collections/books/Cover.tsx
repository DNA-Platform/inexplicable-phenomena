import { Book } from './Book';

export class Cover extends Book {
  component() {
    return <div className="cover"></div>;
  }
}