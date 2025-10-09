import React from 'react';
import { $Writing } from './Writing';
import hljs from 'highlight.js';
import katex from 'katex';
import { marked } from 'marked';

export class $Code extends $Writing {
  $language: string = '';
  
  get content(): string {
    // If we have string children, use them, otherwise use empty string
    const children = super.view();
    return typeof children === 'string' ? children : '';
  }
  
  text(): string {
    return this.content;
  }
  
  highlight(): string {
    if (this.$language) {
      return hljs.highlight(this.content, { language: this.$language }).value;
    }
    return hljs.highlightAuto(this.content).value;
  }
  
  view(): React.ReactNode {
    return (
      <code 
        className={`hljs ${this.$language ? `language-${this.$language}` : ''}`}
        dangerouslySetInnerHTML={{ __html: this.highlight() }}
      />
    );
  }
}

export class $CodeBlock extends $Code {
  filename?: string;
  lineNumbers: boolean = false;
  
  view(): React.ReactNode {
    const lines = this.content.split('\n');
    
    return (
      <div className="code-block">
        {this.filename && (
          <div className="code-filename">{this.filename}</div>
        )}
        <pre>
          <code 
            className={`hljs ${this.$language ? `language-${this.$language}` : ''}`}
            dangerouslySetInnerHTML={{ __html: this.highlight() }}
          />
        </pre>
      </div>
    );
  }
}

export class $Math extends $Writing {
  latex: string = '';
  
  text(): string {
    return this.latex;
  }
  
  view(): React.ReactNode {
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

export class $DisplayMath extends $Math {
  view(): React.ReactNode {
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

export class $InlineCode extends $Writing {
  $language?: string;
  
  view(): React.ReactNode {
    return <span className="inline-code">{super.view()}</span>;
  }
}

export class $InlineMath extends $Writing {
  latex: string = '';
  
  view(): React.ReactNode {
    const html = katex.renderToString(this.latex, {
      throwOnError: false,
      displayMode: false
    });
    
    return (
      <span 
        className="inline-math" 
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}

export class $Markdown extends $Writing {
  raw: string = '';
  
  text(): string {
    return this.raw;
  }
  
  view(): React.ReactNode {
    const html = marked(this.raw);
    
    return (
      <div 
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}

export const Code = new $Code().component();
export const CodeBlock = new $CodeBlock().component();
export const Math = new $Math().component();
export const DisplayMath = new $DisplayMath().component();
export const InlineCode = new $InlineCode().component();
export const InlineMath = new $InlineMath().component();
export const Markdown = new $Markdown().component();