import { Math } from './Math';
import katex from 'katex';

export class DisplayMath extends Math {
  component(): React.ReactNode {
    const html = katex.renderToString(this.latex, {
      throwOnError: false,
      displayMode: true // This centers and enlarges it!
    });
    
    return (
      <div 
        className="katex-display math-display"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}