import { Reference } from './Reference';

export class Top extends Reference {
  
  handleClick = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  buttonStyles(): string {
    return `
      position: fixed;
      bottom: 60px;
      right: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color, #2c3e50);
      color: white;
      border: none;
      cursor: pointer;
      opacity: 0.8;
      z-index: 100;
    `;
  }
  
  component(): React.ReactNode {
    return (
      <button 
        style={{ ...this.buttonStyles() }}
        onClick={this.handleClick} 
        title="Back to top"
      >
        ↑
      </button>
    );
  }
}