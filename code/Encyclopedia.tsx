import React from 'react';
import { $Book, $Chapter } from './Book';

export class $EncyclopediaEntry extends $Chapter {
  synopsis?: string;
  relatedEntries?: string[];
  
  entryStyles(): string {
    return `
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
    `;
  }
  
  view(): React.ReactNode {
    return (
      <article className="encyclopedia-entry">
        <h1>{this.title?.text}</h1>
        {this.synopsis && (
          <div style={{ 
            fontStyle: 'italic', 
            marginBottom: '20px',
            color: '#666',
            borderLeft: '3px solid #ddd',
            paddingLeft: '15px'
          }}>
            {this.synopsis}
          </div>
        )}
{super.view()}
        {this.relatedEntries && (
          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd' }}>
            <strong>See also:</strong> {this.relatedEntries.join(', ')}
          </div>
        )}
      </article>
    );
  }
}

export class $Encyclopedia extends $Book {
  
  processChildren(): void {
    // Let Book handle its normal children (Cover, TitlePage, TableOfContents, etc.)
    super.processChildren();
    
    // Also process EncyclopediaEntry children
    if (!this.children) return;
    
    this.children.forEach(({ instance: child }) => {
      if (child instanceof $EncyclopediaEntry) {
        child.owner = this;
        this.chapters.push(child);
      }
    });
    
    // Encyclopedia alphabetizes its entries
    this.alphabetizeEntries();
  }
  
  alphabetizeEntries(): void {
    this.chapters.sort((a, b) => {
      const aTitle = a.title?.text || '';
      const bTitle = b.title?.text || '';
      return aTitle.localeCompare(bTitle);
    });
    
    // Re-number after sorting
    this.assignChapterNumbers();
  }
  
  assignChapterNumbers(): void {
    this.chapters.forEach((chapter, index) => {
      chapter.number = index + 1;
    });
  }
}

export const Encyclopedia = new $Encyclopedia().component();
export const EncyclopediaEntry = new $EncyclopediaEntry().component();