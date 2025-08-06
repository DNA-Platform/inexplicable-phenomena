import { Section } from './Section';
import { Title } from './Title';
import { Next } from '../references/Next';
import { Previous } from '../references/Previous';
import { Up } from '../references/Up';

export class Chapter extends Section {
  number?: number;
  title?: Title;
  next?: Next;
  previous?: Previous;
  up?: Up;
  
  processChildren(children: React.ReactNode): void {
    super.processChildren(children);
    
    React.Children.forEach(children, (child: any) => {
      if (!React.isValidElement(child)) return;
      
      const instance = child.type;
      
      if (instance instanceof Next) {
        this.next = instance;
        this.next.target = this.findNextChapter();
      } else if (instance instanceof Previous) {
        this.previous = instance;
        this.previous.target = this.findPreviousChapter();
      } else if (instance instanceof Up) {
        this.up = instance;
        this.up.target = this.container;
      }
    });
  }
  
  validateTitle(): void {
    if (!this.title && this.container) {
      console.warn(`Chapter ${this.number || '?'} has no title`);
    }
  }
  
  findNextChapter(): Chapter | null {
    if (!this.container || !('chapters' in this.container)) return null;
    const book = this.container as any;
    const index = book.chapters.indexOf(this);
    return book.chapters[index + 1] || null;
  }
  
  findPreviousChapter(): Chapter | null {
    if (!this.container || !('chapters' in this.container)) return null;
    const book = this.container as any;
    const index = book.chapters.indexOf(this);
    return book.chapters[index - 1] || null;
  }
  
  // Granular style methods
  containerStyles(): string {
    return `
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    `;
  }
  
  headerStyles(): string {
    return `
      padding: 20px 40px;
      border-bottom: 1px solid var(--border-color, #e0e0e0);
      background: var(--header-bg, #f8f9fa);
    `;
  }
  
  contentStyles(): string {
    return `
      flex: 1;
      max-width: 860px;
      margin: 0 auto;
      padding: 40px 20px;
      width: 100%;
    `;
  }
  
  footerStyles(): string {
    return `
      padding: 20px 40px;
      border-top: 1px solid var(--border-color, #e0e0e0);
      background: var(--footer-bg, #f8f9fa);
      margin-top: auto;
    `;
  }
  
  component(): React.ReactNode {
    return (
      <article style={{ ...this.containerStyles() }}>
        <header style={{ ...this.headerStyles() }}>
          {this.renderHeader()}
        </header>
        
        <main style={{ ...this.contentStyles() }}>
          {super.content()}
        </main>
        
        <footer style={{ ...this.footerStyles() }}>
          {this.renderFooter()}
        </footer>
      </article>
    );
  }
  
  renderHeader(): React.ReactNode {
    return (
      <>
        <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
          {this.previous?.component()}
          {this.up?.component()}
          {this.next?.component()}
        </nav>
        {this.renderTitle()}
      </>
    );
  }
  
  renderTitle(): React.ReactNode {
    if (!this.title) return null;
    
    return (
      <h1 className="chapter-title">
        {this.number && `Chapter ${this.number}: `}
        {this.title.text()}
      </h1>
    );
  }
  
  renderFooter(): React.ReactNode {
    return null;
  }
}