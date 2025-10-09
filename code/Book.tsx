import React from 'react';
import { Chemical } from './chemistry';
import { $Collection, $Work } from './Collection';
import { $Writing } from './Writing';
import { $Title } from './Section';
import { $Author, $Next, $Previous, $Up } from './Reference';
import { $Organization } from './Organization';
import { $Section } from './Section';

export class $Cover extends $Work {
  book?: $Book;
  title?: $Title;
  author?: $Author;
  color: string = '#0f1419';
  accentColor: string = '#1e3a5f';
  visible: boolean = true;
  duration: number = 3000; // How long to show the cover
  fadeTime: number = 1500; // How long the fade takes
  
  setBook(book: $Book) {
    book.title = this.title;
    book.author = this.author;
    this.book = book;
  }
  
  componentDidMount(): void {
    // Auto-hide after duration
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }
  
  coverStyles(): React.CSSProperties {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: `linear-gradient(135deg, ${this.color} 0%, ${this.accentColor} 100%)`,
      display: this.visible ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      animation: this.visible ? 'fadeIn 0.5s ease-in' : `fadeOut ${this.fadeTime}ms ease-out`,
      pointerEvents: this.visible ? 'all' : 'none'
    };
  }
  
  titleStyles(): React.CSSProperties {
    return {
      fontSize: '5em',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: '20px',
      fontFamily: 'Merriweather, serif',
      textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(255,255,255,0.1)',
      fontWeight: 300,
      letterSpacing: '2px',
      animation: 'slideUp 1s ease-out'
    };
  }
  
  authorStyles(): React.CSSProperties {
    return {
      fontSize: '1.8em',
      color: '#ffffff',
      fontStyle: 'italic',
      opacity: 0.95,
      textShadow: '0 1px 10px rgba(0,0,0,0.3)',
      fontWeight: 300,
      animation: 'slideUp 1.2s ease-out'
    };
  }
  
  view(): React.ReactNode {
    // Only render if visible
    if (!this.visible) return null;
    
    return (
      <div style={this.coverStyles()}>
        <h1 style={this.titleStyles()}>
          {this.title?.text || this.book?.title?.text}
        </h1>
        <div style={this.authorStyles()}>
          by {this.author?.displayName || this.book?.author?.displayName}
        </div>
      </div>
    );
  }
}

export class $Chapter extends $Writing {
  number?: number;
  title?: $Title;
  book?: $Book;
  synopsis?: string;
  next?: $Next;
  previous?: $Previous;
  up?: $Up;
  
  setupNavigation(): void {
    if (!this.book) return;
    
    const isFirst = this.number === 1;
    const isLast = this.number === this.book.numberOfChapters;
    
    if (!isFirst) {
      this.previous = new $Previous();
      this.previous.target = this.book.chapters[this.number! - 2];
    }
    
    if (!isLast) {
      this.next = new $Next();
      this.next.target = this.book.chapters[this.number!];
    }
    
    this.up = new $Up();
    this.up.target = this.book.titlePage || this.book.cover || this.book;
  }
  
  renderHeader(): React.ReactNode {
    if (!this.book) return null;
    
    this.setupNavigation();
    
    const hasTableOfContents = !!this.book.tableOfContents;
    
    return (
      <header style={this.headerStyles()}>
        <div style={this.navBarStyles()}>
          <div style={this.leftNavStyles()}>
            {this.renderOrganizationLogo()}
            {this.previous?.view()}
            {hasTableOfContents && this.number! > 1 && this.renderTableOfContentsLink()}
          </div>
          
          <div style={this.centerNavStyles()}>
            {this.up?.view()}
          </div>
          
          <div style={this.rightNavStyles()}>
            {this.next?.view()}
          </div>
        </div>
        
        {this.renderChapterTitle()}
      </header>
    );
  }
  
  renderOrganizationLogo(): React.ReactNode {
    // Walk up: Chapter -> Book -> Library -> Organization
    const library = this.book?.owner;
    const organization = library?.owner;
    
    if (organization && organization instanceof $Organization && 'logo' in organization) {
      const logo = (organization as any).logo;
      return <div style={{ marginRight: '20px' }}>{logo.component()}</div>;
    }
    return null;
  }
  
  renderTableOfContentsLink(): React.ReactNode {
    const toc = new $Previous();
    toc.target = this.book?.tableOfContents!;
    return toc.view();
  }
  
  renderChapterTitle(): React.ReactNode {
    if (!this.title) return null;
    
    return (
      <h1 style={this.chapterTitleStyles()}>
        Chapter {this.number}: {this.title.text}
      </h1>
    );
  }
  
  // Fixed style methods - return React.CSSProperties objects
  headerStyles(): React.CSSProperties {
    return {
      padding: '20px 40px',
      borderBottom: '1px solid #e0e0e0',
      background: '#f8f9fa'
    };
  }
  
  navBarStyles(): React.CSSProperties {
    return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    };
  }
  
  leftNavStyles(): React.CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    };
  }
  
  centerNavStyles(): React.CSSProperties {
    return {
      flex: 1,
      textAlign: 'center'
    };
  }
  
  rightNavStyles(): React.CSSProperties {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    };
  }
  
  chapterTitleStyles(): React.CSSProperties {
    return {
      margin: '20px 0 0 0',
      fontSize: '2em',
      color: '#333'
    };
  }
  
  containerStyles(): React.CSSProperties {
    return {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    };
  }
  
  contentStyles(): React.CSSProperties {
    return {
      flex: 1,
      maxWidth: '860px',
      margin: '0 auto',
      padding: '40px 20px',
      width: '100%'
    };
  }
  
  footerStyles(): React.CSSProperties {
    return {
      padding: '20px 40px',
      borderTop: '1px solid #e0e0e0',
      background: '#f8f9fa',
      marginTop: 'auto'
    };
  }
  
  renderFooter(): React.ReactNode {
    return null;
  }
  
  view(): React.ReactNode {
    return (
      <article style={this.containerStyles()}>
        {this.renderHeader()}
        
        <main style={this.contentStyles()}>
          {this.sections.map(section => (
            <>section</>
          ))}
        </main>
        
        <footer style={this.footerStyles()}>
          {this.renderFooter()}
        </footer>
      </article>
    );
  }
}

export class $Epilogue extends $Section {
  book?: $Book;
}

export class $Prologue extends $Section {
  book?: $Book;
}

export class $Synopsis extends $Section {
  book?: $Book;
}

export class $TableOfContents extends $Chapter {
  book?: $Book;
  tocStyles(): React.CSSProperties {
    return {
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px'
    };
  }
  
  entryStyles(): React.CSSProperties {
    return {
      marginBottom: '20px',
      padding: '15px',
      borderLeft: '3px solid var(--primary-color)',
      background: 'var(--header-bg)'
    };
  }
  
  view(): React.ReactNode {
    const book = this.owner;
    if (!book || !('chapters' in book)) return null;
    
    return (
      <nav style={this.tocStyles()}>
        <h2>Contents</h2>
        <div>
          {(book as any).chapters.map((chapter: $Chapter, i: number) => (
            <div key={chapter.id || i} style={this.entryStyles()}>
              <a href={`#chapter-${chapter.number || i}`}>
                <h3>{chapter.title?.text}</h3>
              </a>
              {(chapter as any).synopsis && (
                <p style={{ marginTop: '10px', color: '#666' }}>
                  {(chapter as any).synopsis}
                </p>
              )}
            </div>
          ))}
        </div>
      </nav>
    );
  }
}

export class $TitlePage extends $Chapter {
    additionalContent: $Writing[] = [];

    setupNavigation(): void {
        // Title page only has Next (to ToC or first chapter)
        if (!this.book) return;

        this.next = new $Next();
        this.next.target = this.book.tableOfContents || this.book.chapters[0];
        // No previous or up for title page
    }

    processChildren(): void {
        if (!this.children) return;
        this.children.forEach(({ instance: child }) => {
            if (child instanceof $Section) {
                child.owner = this;
                this.sections.push(child);
            } else if (child) {
                throw new Error(`Writing only accepts Section children, received ${child.constructor.name}`);
            }
        });
    }

    titlePageStyles(): React.CSSProperties {
        return {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#ffffff',
            padding: '40px',
            position: 'relative'
        };
    }

    titleStyles(): React.CSSProperties {
        return {
            fontSize: '4em',
            color: '#000000',
            textAlign: 'center',
            marginBottom: '30px',
            fontFamily: 'Merriweather, serif',
            fontWeight: 300
        };
    }

    authorStyles(): React.CSSProperties {
        return {
            fontSize: '1.5em',
            color: '#333333',
            fontStyle: 'italic',
            marginBottom: '60px'
        };
    }

    additionalContentStyles(): React.CSSProperties {
        return {
            marginTop: '40px',
            textAlign: 'center',
            color: '#666666',
            maxWidth: '600px'
        };
    }

    renderHeader(): React.ReactNode {
        // Title page doesn't show the standard chapter header
        return null;
    }

    view(): React.ReactNode {
        if (!this.book) return null;

        this.setupNavigation();

        return (
            <div style={this.titlePageStyles()}>
                <h1 style={this.titleStyles()}>
                    {this.book.title?.text}
                </h1>

                <div style={this.authorStyles()}>
                    {this.book.author?.displayName}
                </div>

                {this.additionalContent.length > 0 && (
                    <div style={this.additionalContentStyles()}>
                        {this.additionalContent.map((content, i) => (
                            <div key={i}>{content.view()}</div>
                        ))}
                    </div>
                )}

                {this.next && (
                    <div style={{ position: 'absolute', bottom: '40px', right: '40px' }}>
                        {this.next.view()}
                    </div>
                )}
            </div>
        );
    }
}

export class $Book extends $Collection<$Chapter> {
  cover?: $Cover;
  title?: $Title;
  author?: $Author;
  titlePage?: $TitlePage;
  tableOfContents?: $TableOfContents;
  synopsis?: $Synopsis;
  prologue?: $Prologue;
  epilogue?: $Epilogue;
  chapters: $Chapter[] = [];
  get numberOfChapters() { return this.chapters.length; }
  
  processChildren(): void {
    if (!this.children) return;
    this.children.forEach(({ instance }) => {
      if (!instance) return;
      if (instance instanceof $Cover && !this.cover) {
        instance.owner = this;
        this.cover = instance;
        this.cover.setBook(this);
      } else if (instance instanceof $TitlePage && !this.titlePage) {
        instance.owner = this;
        this.titlePage = instance;
        this.titlePage.book = this;
      } else if (instance instanceof $TableOfContents && !this.tableOfContents) {
        instance.owner = this;
        this.tableOfContents = instance;
        this.tableOfContents.book = this;
      } else if (instance instanceof $Synopsis && !this.synopsis) {
        instance.owner = this;
        this.synopsis = instance;
        this.synopsis.book = this;
      } else if (instance instanceof $Prologue && !this.prologue) {
        instance.owner = this;
        this.prologue = instance;
        this.prologue.book = this;
      } else if (instance instanceof $Epilogue && !this.epilogue) {
        instance.owner = this;
        this.epilogue = instance;
        this.epilogue.book = this;
      } else if (instance instanceof $Chapter) {
        instance.owner = this;
        this.chapters.push(instance);
        instance.book = this;
        instance.number = this.chapters.length;
      }
    });
  }
  
  validateChildren(): void {
    // Optional validation
    if (this.chapters.length === 0) {
      console.warn('Book has no chapters');
    }
  }
  
  view(): React.ReactNode {
    this.processChildren();
    this.validateChildren();
    
    return (
      <div className="book">
        {this.cover?.view()}
        {this.header()}
        {this.tableOfContents?.view()}
        {this.synopsis?.view()}
        {this.prologue?.view()}
        {this.chapterList()}
        {this.epilogue?.view()}
      </div>
    );
  }
  
  header(): React.ReactNode {
    return (
      <header className="book-header">
        <h1>{this.title?.text}</h1>
        <div className="author">{this.author?.displayName}</div>
      </header>
    );
  }
  
  chapterList(): React.ReactNode {
    return (
      <div className="chapters">
        {this.chapters.map((ch, i) => (
          <article key={ch.id || i}>{ch.view()}</article>
        ))}
      </div>
    );
  }
}

export const Book = new $Book().component();
export const Cover = new $Cover().component();
export const Chapter = new $Chapter().component();
export const Epilogue = new $Epilogue().component();
export const Prologue = new $Prologue().component();
export const Synopsis = new $Synopsis().component();
export const TableOfContents = new $TableOfContents().component();
export const TitlePage = new $TitlePage().component();