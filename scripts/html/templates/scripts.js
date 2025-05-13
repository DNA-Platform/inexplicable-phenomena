/**
 * Interactive scripts for academic HTML pages
 */

document.addEventListener('DOMContentLoaded', function() {
  // Thoughts modal functionality
  const thoughtsButton = document.querySelector('.thoughts-button');
  const thoughtsModal = document.getElementById('thoughtsModal');
  const closeThoughts = document.querySelector('.close-thoughts');
  
  if (thoughtsButton && thoughtsModal) {
    thoughtsButton.addEventListener('click', function() {
      thoughtsModal.style.display = 'block';
    });
    
    if (closeThoughts) {
      closeThoughts.addEventListener('click', function() {
        thoughtsModal.style.display = 'none';
      });
    }
    
    window.addEventListener('click', function(event) {
      if (event.target === thoughtsModal) {
        thoughtsModal.style.display = 'none';
      }
    });
  }
  
  // Initialize KaTeX rendering for math expressions
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(document.body, {
      delimiters: [
        {left: "$", right: "$", display: true},
        {left: "$", right: "$", display: false}
      ],
      throwOnError: false,
      errorColor: "#cc0000",
      strict: false
    });
  }

  // Add title attribute to navigation arrows for tooltip
  const prevLink = document.querySelector('.prev-link');
  const nextLink = document.querySelector('.next-link');
  
  if (prevLink) {
    const title = prevLink.getAttribute('title');
    if (title) {
      // Already has tooltip from title attribute
    }
  }
  
  if (nextLink) {
    const title = nextLink.getAttribute('title');
    if (title) {
      // Already has tooltip from title attribute
    }
  }
});