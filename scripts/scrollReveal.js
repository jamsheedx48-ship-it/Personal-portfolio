// Scroll reveal Intersection Observer & active link indicators
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport fully
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve after showing
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  // Apply staggered delay for elements that are inside grids or lists
  const grids = document.querySelectorAll('.reveal-grid');
  grids.forEach(grid => {
    const children = grid.querySelectorAll('.reveal-element');
    children.forEach((child, index) => {
      // Limit stagger to max 6 elements per sequence to avoid long loads
      const delay = (index % 6) * 100; 
      child.style.transitionDelay = `${delay}ms`;
    });
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Highlight navigation links on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a:not(.cv-btn)');
  
  const navOptions = {
    threshold: 0.4, // Highlight link when 40% of section is visible
    rootMargin: '-80px 0px -20% 0px' // Compensate navbar height
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });
});
