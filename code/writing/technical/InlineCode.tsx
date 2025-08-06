import { Paragraph } from '../content/Paragraph';

export class InlineCode extends Paragraph {
  language?: string;
  
  component() {
    return <span className="inline-code"></span>;
  }
}