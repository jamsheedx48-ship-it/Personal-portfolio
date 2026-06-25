// Custom Smooth cursor glow trail
document.addEventListener('DOMContentLoaded', () => {
  // Check if system settings prefer reduced motion or coarse pointer (mobile touch devices)
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  
  if (isReducedMotion || isTouchDevice) {
    return; // Skip cursor creation
  }

  // Create cursor elements dynamically
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('custom-cursor-glow');

  document.body.appendChild(cursor);
  document.body.appendChild(cursorGlow);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let glowX = 0;
  let glowY = 0;

  // Listen to mouse movement
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth translation loop using Linear Interpolation (lerp)
  function updateCursor() {
    // Lerp formulas
    // cursorX = cursorX + (mouseX - cursorX) * factor
    // Factor for the inner ring is high (fast response), for outer glow is small (smooth trail)
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    // Apply transform properties
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(updateCursor);
  }

  requestAnimationFrame(updateCursor);

  // Hover states using event delegation (highly performant)
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    // Check if the element or any of its parents is a link/button/input
    const isInteractive = target.closest('a, button, .btn, input, textarea, [role="button"], .project-card, .skills-category, .back-to-top-btn, .social-icon');
    
    if (isInteractive) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursor.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
      cursor.style.borderWidth = '1px';
      
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.4)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    const isInteractive = target.closest('a, button, .btn, input, textarea, [role="button"], .project-card, .skills-category, .back-to-top-btn, .social-icon');
    
    if (isInteractive) {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.borderWidth = '2px';
      
      cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });

  // Hide cursor on mouse leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorGlow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorGlow.style.opacity = '1';
  });
});
