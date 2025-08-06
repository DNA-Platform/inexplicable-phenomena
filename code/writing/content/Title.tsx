import { Paragraph } from './Paragraph';

export class Title extends Paragraph {
  content(): React.ReactNode {
    return <span className="title">{this.content}</span>;
  }
}