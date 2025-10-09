import React from 'react';
import { Chemical } from './chemistry';
import { $Work, $Collection } from './Collection';
import { $Organization } from './Organization';
import { $Section } from './Section';
import { $Author } from './Reference';
import { $Book } from './Book';
import styled from 'styled-components';

const LibraryContainer = styled.div`
  min-height: 100vh;
  background: var(--background-color, #fff);
`;

const LibraryHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  background: var(--header-bg, #f8f9fa);
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 15px 20px;
    gap: 10px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const LibraryTitle = styled.h1`
  margin: 0;
  font-size: 1.8em;
  font-weight: 600;
  color: var(--primary-color, #2c3e50);
  font-family: 'Merriweather', serif;
`;

const CuratorInfo = styled.div`
  font-size: 14px;
  color: var(--text-color, #666);
  font-style: italic;
`;

const LibraryContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export class $Writing extends $Work {
  sections: $Section[] = [];
  
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
  
  text(): string {
    return this.sections.map(section => section.text()).join('\n\n');
  }
  
  view(): React.ReactNode {
    this.processChildren();
    
    return (
      <div className="writing markdown-body">
        {this.sections.map((section, i) => (
          <div key={section.id || i}>
            {section.view()}
          </div>
        ))}
      </div>
    );
  }
}

export class $Library extends Chemical {
  name?: string;
  librarian?: $Author;
  organization: $Organization;
  
  constructor() {
    super();
    this.organization = new $Organization();
  }
  
  view(): React.ReactNode {
    return (
      <LibraryContainer className="library">
        {this.renderHeader()}
        <LibraryContent className="library-content">
{super.view()}
        </LibraryContent>
      </LibraryContainer>
    );
  }
  
  renderHeader(): React.ReactNode {
    return (
      <LibraryHeader>
        <HeaderLeft>
          {this.organization.view()}
          {this.name && <LibraryTitle>{this.name}</LibraryTitle>}
        </HeaderLeft>
        {this.librarian && (
          <CuratorInfo>
            Curated by {this.librarian.view()}
          </CuratorInfo>
        )}
      </LibraryHeader>
    );
  }
}

export class $Bookshelf extends $Collection<$Book> {
  currentBook?: $Book;
  
  shelfStyles(): React.CSSProperties {
    return {
      minHeight: '100vh',
      background: 'var(--background-color)'
    };
  }
  
  view(): React.ReactNode {
    // For now, just show the first book
    if (this.items.length > 0) {
      this.currentBook = this.items[0];
      return (
        <div style={this.shelfStyles()}>
          {this.currentBook.view()}
        </div>
      );
    }
    
    return <div>No books on shelf</div>;
  }
}

export const Writing = new $Writing().component();
export const Library = new $Library().component();
export const Bookshelf = new $Bookshelf().component();