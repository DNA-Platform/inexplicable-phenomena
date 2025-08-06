import { Writing } from '../Writing';
import hljs from 'highlight.js';

export class Code extends Writing {
  language: string = '';
  content: string = '';
  
  text(): string {
    return this.content;
  }
  
  highlight(): string {
    if (this.language) {
      return hljs.highlight(this.content, { language: this.language }).value;
    }
    return hljs.highlightAuto(this.content).value;
  }
  
  component(): React.ReactNode {
    return (
      <code 
        className={`hljs ${this.language ? `language-${this.language}` : ''}`}
        dangerouslySetInnerHTML={{ __html: this.highlight() }}
      />
    );
  }
}