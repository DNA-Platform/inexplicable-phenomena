'use client'
import { Chemical, child } from '@/chemistry';
import { ReactNode } from 'react';

// Cover with its own button
class $Cover extends Chemical {
  $title: string = "The Chemistry Book";
  $author: string = "Unknown Author";
  visitCount: number = 0;
  book?: $Book;

  view() {
    console.log('Cover.view() - book is:', this.book);
    console.log('Cover instance:', this);

    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#f0f0f0' }}>
        <h1>{this.$title}</h1>
        <p>by {this.$author}</p>
        <p>Book ref: {this.book ? 'EXISTS' : 'MISSING'}</p>
        <button onClick={() => {
          console.log('Button clicked, book is:', this.book);
          this.book?.goToFirstChapter();
        }}>
          Start Reading →
        </button>
      </div>
    );
  }
}

// Chapter manages its own navigation
class $Chapter extends Chemical {
  $title: string = "Chapter";
  $content: string = "Chapter content here...";
  chapterNumber: number = 0;
  chapterIndex: number = 0;
  totalChapters: number = 0;
  visitCount: number = 0;
  book?: $Book;

  view() {
    const hasPrevious = this.chapterIndex > 0;
    const hasNext = this.chapterIndex < this.totalChapters - 1;

    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2>Chapter {this.chapterNumber}: {this.$title}</h2>
        <p>{this.$content}</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => this.book?.goToChapter(this.chapterIndex - 1)}
            disabled={!hasPrevious}
          >
            ← Previous
          </button>
          <button onClick={() => this.book?.goToCover()}>
            Cover
          </button>
          <button
            onClick={() => this.book?.goToChapter(this.chapterIndex + 1)}
            disabled={!hasNext}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }
}

// Book component with navigation methods - NOW AFTER Cover and Chapter
class $Book extends Chemical {
  @child($Cover)
  cover!: $Cover;

  @child($Chapter)
  chapters: $Chapter[] = [];

  currentView: 'cover' | number = 'cover';

  goToFirstChapter = () => {
    if (this.chapters.length > 0) {
      this.currentView = 0;
    }
  };

  goToCover = () => {
    this.currentView = 'cover';
  };

  goToChapter = (index: number) => {
    if (index >= 0 && index < this.chapters.length) {
      this.currentView = index;
    }
  };

  view(): ReactNode {
    console.log('Book.view() - this.cover is:', this.cover);

    if (this.cover) {
      this.cover.book = this;
      console.log('Set cover.book to:', this);
    }

    this.chapters.forEach((ch, i) => {
      ch.book = this;
      ch.chapterNumber = i + 1;
      ch.totalChapters = this.chapters.length;
      ch.chapterIndex = i;
    });

    // Determine what to show
    const currentComponent = this.currentView === 'cover'
      ? this.cover
      : this.chapters[this.currentView as number];

    if (currentComponent) {
      currentComponent.visitCount++;
    }

    return (
      <div>
        {currentComponent?.view()}

        {/* Visit counter metadata */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#333',
          color: 'white',
          fontSize: '12px'
        }}>
          <strong>Visit Counts:</strong>
          <div>Cover: {this.cover?.visitCount || 0} visits</div>
          {this.chapters.map((ch, i) => (
            <div key={i}>Chapter {i + 1}: {ch.visitCount || 0} visits</div>
          ))}
        </div>
      </div>
    );
  }
}

// Create components
const Cover = new $Cover().component();
const Chapter = new $Chapter().component();
const Book = new $Book().component();

export default function Page() {
  return (
    <div style={{ padding: '20px' }}>
      <Book>
        <Cover title="Chemistry Adventures" author="Dr. React" />
        <Chapter title="Getting Started" content="This is where our journey begins..." />
        <Chapter title="Props and State" content="Understanding the flow of data..." />
        <Chapter title="Advanced Patterns" content="Diving deeper into Chemical reactions..." />
      </Book>
    </div>
  );
}

// 'use client'
// import EncyclopediaSemantica from '../code/content/encyclopedia-semantica/EncyclopediaSemantica';

// export default function Page() {
//   return <EncyclopediaSemantica />;
// }
