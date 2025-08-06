import { Writing } from '../Writing';
import katex from 'katex';

export class Math extends Writing {
  latex: string = '';
  
  text(): string {
    return this.latex;
  }
  
  component(): React.ReactNode {
    const html = katex.renderToString(this.latex, {
      throwOnError: false,
      displayMode: false
    });
    
    return (
      <span 
        className="math" 
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}