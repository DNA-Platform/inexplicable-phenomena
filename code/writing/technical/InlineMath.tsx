import { Paragraph } from '../content/Paragraph';

export class InlineMath extends Paragraph {
  latex: string = '';
  
  component() {
    return <span className="inline-math"></span>;
  }
}