import React from 'react';
import { Work } from './Work';

export class Collection<T extends Work = Work> extends Work {
  items: T[] = [];
  
  constructor() {
    super();
  }
  
  processChildren(children: React.ReactNode): void {
    React.Children.forEach(children, (child: any) => {
      if (React.isValidElement(child) && child.type instanceof Work) {
        this.add(child.type as T);
      }
    });
  }
  
  add(item: T): void {
    item.container = this;
    this.items = [...this.items, item];
  }
  
  content(): React.ReactNode {
    return (
      <>
        {this.items.map((item, i) => (
          <div key={item.id || i}>{item.component()}</div>
        ))}
      </>
    );
  }
}