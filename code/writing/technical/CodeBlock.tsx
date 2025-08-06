import { Code } from './Code';

export class CodeBlock extends Code {
  filename?: string;
  lineNumbers: boolean = false;
  
  component(): React.ReactNode {
    const lines = this.content.split('\n');
    
    return (
      <div className="code-block">
        {this.filename && (
          <div className="code-filename">{this.filename}</div>
        )}
        <pre>
          <code 
            className={`hljs ${this.language ? `language-${this.language}` : ''}`}
            dangerouslySetInnerHTML={{ __html: this.highlight() }}
          />
        </pre>
      </div>
    );
  }
}