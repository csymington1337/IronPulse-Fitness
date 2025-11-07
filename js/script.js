
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('#header .hamburger');
  const menu = document.querySelector('#header .nav-links ul');
  const menuLinks = document.querySelectorAll('#header .nav-links ul li a');
  const header = document.querySelector('#header .header-container');

  if (!hamburger || !menu) return; // guard if markup changes

  const isOpen = () => menu.classList.contains('active');

  function openMenu() {
    menu.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    // return focus to trigger if closed via keyboard
    if (document.activeElement && !hamburger.contains(document.activeElement)) {
      hamburger.focus();
    }
  }

  const toggleMenu = () => (isOpen() ? closeMenu() : openMenu());

  // Click to open/close
  hamburger.addEventListener('click', toggleMenu);

  // Click a link -> close
  menuLinks.forEach(a => a.addEventListener('click', closeMenu));

  // Escape to close
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) {
      e.preventDefault();
      closeMenu();
    }
  });

  // Header background on scroll (unchanged behavior)
  document.addEventListener('scroll', () => {
    if (!header) return;
    header.style.backgroundColor = window.scrollY > 100 ? '#000' : 'transparent';
  });
});