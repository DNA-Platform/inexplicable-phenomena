import React from 'react';
import { Collection } from '../../../base/Collection';
import { Chapter } from '../../content/Chapter';
import { Title } from '../../content/Title';
import { Author } from '../../references/Author';
import { TableOfContents } from './TableOfContents';
import { Synopsis } from './Synopsis';
import { Prologue } from './Prologue';
import { Epilogue } from './Epilogue';

export class Book extends Collection<Chapter> {
  title?: Title;
  author?: Author;
  tableOfContents?: TableOfContents;
  synopsis?: Synopsis;
  prologue?: Prologue;
  epilogue?: Epilogue;
  chapters: Chapter[] = [];
  
  processChildren(children: React.ReactNode): void {
    React.Children.forEach(children, (child: any) => {
      if (!React.isValidElement(child)) return;
      
      const instance = child.type;
      
      if (instance instanceof Title && !this.title) {
        this.title = instance;
        this.title.container = this;
      } else if (instance instanceof Author && !this.author) {
        this.author = instance;
        this.author.container = this;
      } else if (instance instanceof TableOfContents && !this.tableOfContents) {
        this.tableOfContents = instance;
        this.tableOfContents.container = this;
      } else if (instance instanceof Synopsis && !this.synopsis) {
        this.synopsis = instance;
        this.synopsis.container = this;
      } else if (instance instanceof Prologue && !this.prologue) {
        this.prologue = instance;
        this.prologue.container = this;
      } else if (instance instanceof Epilogue && !this.epilogue) {
        this.epilogue = instance;
        this.epilogue.container = this;
      } else if (instance instanceof Chapter) {
        this.chapters.push(instance);
        instance.container = this;
      }
    });
  }
  
  validateChildren(): void {
    // Optional validation
    if (this.chapters.length === 0) {
      console.warn('Book has no chapters');
    }
  }
  
  component(): React.ReactNode {
    this.processChildren(this.children);
    this.validateChildren();
    
    return (
      <div className="book">
        {this.header()}
        {this.tableOfContents?.component()}
        {this.synopsis?.component()}
        {this.prologue?.component()}
        {this.chapterList()}
        {this.epilogue?.component()}
      </div>
    );
  }
  
  header(): React.ReactNode {
    return (
      <header className="book-header">
        <h1>{this.title?.text()}</h1>
        <div className="author">{this.author?.displayName}</div>
      </header>
    );
  }
  
  chapterList(): React.ReactNode {
    return (
      <div className="chapters">
        {this.chapters.map((ch, i) => (
          <article key={ch.id || i}>{ch.component()}</article>
        ))}
      </div>
    );
  }
}