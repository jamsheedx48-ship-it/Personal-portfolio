// Typewriter effect logic
document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const roles = [
    'Python Full Stack Developer',
    'Django REST Expert',
    'React Developer',
    'AWS & DevOps Engineer'
  ];

  let currentRoleIdx = 0;
  let currentCharIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const fullText = roles[currentRoleIdx];
    
    if (isDeleting) {
      // Deleting character
      element.textContent = fullText.substring(0, currentCharIdx - 1);
      currentCharIdx--;
      typingSpeed = 50; // Faster deleting speed
    } else {
      // Adding character
      element.textContent = fullText.substring(0, currentCharIdx + 1);
      currentCharIdx++;
      typingSpeed = 100; // Normal typing speed
    }

    // Cursor tag append is handled inside css but we can add the character blink block
    
    // Check transitions
    if (!isDeleting && currentCharIdx === fullText.length) {
      // Pause at full word
      typingSpeed = 2000; 
      isDeleting = true;
    } else if (isDeleting && currentCharIdx === 0) {
      isDeleting = false;
      // Cycle next word
      currentRoleIdx = (currentRoleIdx + 1) % roles.length;
      typingSpeed = 500; // Small delay before starting next word
    }

    setTimeout(type, typingSpeed);
  }

  // Initial call
  setTimeout(type, 1000);
});
