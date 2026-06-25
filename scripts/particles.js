// Matrix/Code Falling Rain Background Effect
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  // Set dimensions
  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;

  // Characters to render (hex numbers, code statements, brackets, binary)
  const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[];:+=*%#@!$';
  const charArr = chars.split('');
  
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  
  // Array of drops - one per column
  let drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100; // Staggered entry heights
  }

  // Handle Resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      
      const newColumns = Math.floor(width / fontSize);
      // Adjust drops array size
      if (newColumns > columns) {
        for (let i = columns; i < newColumns; i++) {
          drops[i] = Math.random() * -100;
        }
      } else {
        drops = drops.slice(0, newColumns);
      }
      columns = newColumns;
    }, 200);
  });

  // Animation Loop
  function draw() {
    // Subtle overlay to create trailing fade effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
    ctx.fillRect(0, 0, width, height);

    // Font setting
    ctx.font = `500 ${fontSize}px 'JetBrains Mono', monospace`;
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      // Pick random character
      const text = charArr[Math.floor(Math.random() * charArr.length)];
      
      // Calculate coordinates
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Color fade gradient: bottom drops are brighter cyan, trailing are dimmer sky blue
      const randomVal = Math.random();
      if (randomVal > 0.98) {
        ctx.fillStyle = '#FFFFFF'; // White flash for leading characters
      } else if (randomVal > 0.7) {
        ctx.fillStyle = '#00FFFF'; // Bright Cyan
      } else {
        ctx.fillStyle = 'rgba(0, 191, 255, 0.4)'; // Dim Deep Sky Blue
      }

      // Draw character
      ctx.fillText(text, x, y);

      // Reset drop if it reaches bottom of canvas or randomly
      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Move drop down
      drops[i]++;
    }
  }

  // Set Interval for drawing to cap frame-rate at ~30 FPS for performance
  let nIntervId;
  function startRain() {
    if (!nIntervId) {
      nIntervId = setInterval(draw, 33);
    }
  }
  
  // Pause animation if tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(nIntervId);
      nIntervId = null;
    } else {
      startRain();
    }
  });

  startRain();
});
