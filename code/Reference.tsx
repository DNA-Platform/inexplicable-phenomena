import React from 'react';
import { $Item, $Work } from './Collection';

export class $Reference extends $Item {
  source?: $Work | string | null;
  target: $Work | string = '';
  
  view() {
    return <div className="reference"></div>;
  }
}

export class $Referent extends $Item {
  view() {
    return <div className="referent"></div>;
  }
}

export class $Author extends $Reference {
  displayName: string = '';
  
  view() {
    return <div className="author"></div>;
  }
}

export class $Bottom extends $Reference {
  
  handleClick = (): void => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
  }
  
  buttonStyles(): React.CSSProperties {
    return {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'var(--primary-color, #2c3e50)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      opacity: 0.8,
      zIndex: 100
    };
  }
  
  view() {
    return (
      <button 
        style={this.buttonStyles()}
        onClick={this.handleClick}
        title="Go to bottom"
      >
        ↓
      </button>
    );
  }
}

export class $Footnote extends $Reference {
  view() {
    return <div className="footnote"></div>;
  }
}

export class $Link extends $Reference {
  view() {
    return <div className="link"></div>;
  }
}

export class $Next extends $Reference {
  chapter?: any; // Will be resolved with proper import later
  view() {
    return <div className="next"></div>;
  }
}

export class $Previous extends $Reference {
  chapter?: any; // Will be resolved with proper import later
  view() {
    return <div className="previous"></div>;
  }
}

export class $Top extends $Reference {
  
  handleClick = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  buttonStyles(): React.CSSProperties {
    return {
      position: 'fixed',
      bottom: '60px',
      right: '20px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'var(--primary-color, #2c3e50)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      opacity: 0.8,
      zIndex: 100
    };
  }
  
  view() {
    return (
      <button 
        style={this.buttonStyles()}
        onClick={this.handleClick} 
        title="Back to top"
      >
        ↑
      </button>
    );
  }
}

export class $Up extends $Reference {
  view() {
    return <div className="up"></div>;
  }
}

export const Reference = new $Reference().component();
export const Referent = new $Referent().component();
export const Author = new $Author().component();
export const Bottom = new $Bottom().component();
export const Footnote = new $Footnote().component();
export const Link = new $Link().component();
export const Next = new $Next().component();
export const Previous = new $Previous().component();
export const Top = new $Top().component();
export const Up = new $Up().component();