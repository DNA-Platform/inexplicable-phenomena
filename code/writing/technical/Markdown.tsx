import { Writing } from '../Writing';
import { marked } from 'marked';

export class Markdown extends Writing {
  raw: string = '';
  
  text(): string {
    return this.raw;
  }
  
  component(): React.ReactNode {
    const html = marked(this.raw);
    
    return (
      <div 
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}